// =================== SISTEMA UNIFICADO DE INVENTARIO ===================
// ESTE ES EL ÚNICO ARCHIVO QUE MANEJA EL INVENTARIO Y FIREBASE
// Todos los demás archivos SOLO reciben datos de aquí
//
// ARQUITECTURA SIMPLIFICADA:
// 1. character-sheet.js: MAESTRO - Único listener de Firebase + lógica de inventario
// 2. character-sheet-modal.html: ESCLAVO - Solo recibe datos via postMessage
// 3. tienda.html: CLIENTE - Solo escribe a Firebase, no lee
// 4. index-user.html: PM ONLY - Solo maneja sistema de PM, NO inventario
//
// FLUJO DE DATOS:
// Firebase → character-sheet.js → postMessage → Modales
// Tienda → Firebase → character-sheet.js → Modales
//
// FUNCIONES PÚBLICAS:
// - clearPurchasedItems(): Limpiar items comprados
// - debugInventorySystem(): Diagnosticar estado
// - saveCharacterSheet(): Guardar ficha completa
// - loadCharacterSheet(): Cargar ficha desde Firebase
// =======================================================================

// Variables globales
window.inventory = [];
window.firebaseInitialized = false;
window.characterSheetData = null;

// Debug function - disponible inmediatamente
window.debugInventorySystem = function() {
    console.group('🔍 DEBUG: Sistema Completo');
    console.log('📦 Items en inventario:', window.inventory.length);
    console.log('🔥 Firebase inicializado:', window.firebaseInitialized);
    console.log('📊 Items:', window.inventory.map(item => item.nombre || item.name || 'Sin nombre'));
    console.log('📋 Ficha cargada:', !!window.characterSheetData);
    console.log('📋 Datos de ficha:', window.characterSheetData);
    console.groupEnd();
    return {
        inventoryCount: window.inventory.length,
        firebaseReady: window.firebaseInitialized,
        items: window.inventory,
        characterSheet: window.characterSheetData
    };
};

// Función para añadir item al inventario
window.addItemToInventory = function(item) {
    console.log('📦 Añadiendo item:', item.nombre || item.name);
    
    // Normalizar el item con más campos y asegurar ID único
    const normalizedItem = {
        id: item.id || `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        nombre: item.nombre || item.name || 'Item sin nombre',
        tipo: item.tipo || 'equipo',
        descripcion: item.descripcion || item.description || '',
        // Campos específicos para armas
        dano: item.dano || item.damage || item.daño || item['Daño'] || '',
        ap: item.ap || item.AP || '',
        alcance: item.alcance || item.range || item['Alcance'] || '',
        municion: item.municion || item.ammo || item['Munición'] || '',
        // Campos específicos para armaduras
        proteccion: item.proteccion || item.protection || item.armor || item['Armadura (K/E)'] || '',
        cobertura: item.cobertura || item.coverage || item['Cobertura'] || '',
        // Campos específicos para equipo general
        efectos: item.efectos || item.effects || item['Efectos'] || '',
        notas: item.notas || item.notes || item['Notas'] || item.detalles || '',
        coste: item.coste || item.price || item['Coste'] || 0,
        // Campos adicionales
        compatible: item.compatible || item['Compatible con'] || '',
        cantidad: item.cantidad || item['Cantidad'] || '',
        servicio: item.servicio || item['Servicio'] || '',
        // Metadatos
        fechaCompra: item.fechaCompra || new Date().toISOString(),
        origen: item.origen || 'manual'
    };
    
    // Verificar duplicados basándose en nombre, tipo y timestamp (evitar duplicados inmediatos)
    const tiempoActual = Date.now();
    const existeReciente = window.inventory.find(existingItem => {
        const mismoNombre = existingItem.nombre === normalizedItem.nombre;
        const mismoTipo = existingItem.tipo === normalizedItem.tipo;
        const tiempoItem = new Date(existingItem.fechaCompra).getTime();
        const diferenciaSegundos = (tiempoActual - tiempoItem) / 1000;
        
        // Detectar duplicados exactos en los últimos 3 segundos
        return mismoNombre && mismoTipo && diferenciaSegundos < 3;
    });
    
    if (existeReciente) {
        console.warn('🚫 Item duplicado detectado (mismo nombre y tipo en <3s), ignorando:', normalizedItem.nombre);
        return existeReciente;
    }
    
    // Añadir al array local
    window.inventory.push(normalizedItem);
    console.log('✅ Item añadido al inventario local:', normalizedItem.nombre);
    
    // Actualizar Firebase usando la función helper
    if (window.database && window.updateFirebaseInventory) {
        window.updateFirebaseInventory();
    }
    
    // Notificar a modales
    notifyModals();
    
    // Si es un implante, forzar recálculo de bonuses
    if (normalizedItem.tipo === 'cyberware' || normalizedItem.tipo === 'implant') {
        setTimeout(() => {
            // Intentar acceder a la función del modal si está disponible
            const modal = document.querySelector('iframe[src*="character-sheet-modal"]');
            if (modal && modal.contentWindow && modal.contentWindow.calculateImplantBonuses) {
                modal.contentWindow.calculateImplantBonuses();
                console.log('🔧 Bonuses de implante recalculados automáticamente');
            }
        }, 500);
    }
    
    return normalizedItem;
};

// Función para detectar y limpiar duplicados existentes
window.cleanDuplicates = function() {
    const originalLength = window.inventory.length;
    const seen = new Map();
    
    window.inventory = window.inventory.filter((item, index) => {
        // Crear una clave única basada en nombre, tipo y datos principales
        const key = `${item.nombre}-${item.tipo}-${item.dano}-${item.proteccion}`;
        
        if (seen.has(key)) {
            console.log('🗑️ Eliminando duplicado:', item.nombre);
            return false; // Eliminar duplicado
        }
        
        seen.set(key, true);
        
        // Asegurar que todos los items tienen ID único
        if (!item.id) {
            item.id = `cleanup-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            console.log('🔧 ID añadido a item sin ID:', item.nombre);
        }
        
        return true; // Mantener item
    });
    
    const cleaned = originalLength - window.inventory.length;
    
    if (cleaned > 0) {
        console.log(`🧹 ${cleaned} duplicados eliminados`);
        
        // Actualizar Firebase
        if (window.database && window.updateFirebaseInventory) {
            window.updateFirebaseInventory();
        }
        
        // Notificar a modales
        notifyModals();
        
        return `${cleaned} duplicados eliminados`;
    } else {
        console.log('✅ No se encontraron duplicados');
        return 'No se encontraron duplicados';
    }
};

// Función para limpiar todo el inventario
window.clearInventory = function() {
    if (confirm('¿Estás seguro de que quieres limpiar TODO el inventario? Esta acción no se puede deshacer.')) {
        window.inventory = [];
        console.log('🧹 Inventario limpiado localmente');
        
        // Actualizar Firebase usando la función helper
        if (window.database && window.updateFirebaseInventory) {
            window.updateFirebaseInventory();
        }
        
        // Notificar a modales
        notifyModals();
    }
};

// Función para eliminar item del inventario por ID
window.removeItemFromInventoryById = function(itemId) {
    console.log('🗑️ Eliminando item con ID:', itemId);
    
    // Encontrar el índice del item por su ID
    const itemIndex = window.inventory.findIndex(item => item.id === itemId);
    
    if (itemIndex === -1) {
        console.error('❌ Item no encontrado con ID:', itemId);
        return;
    }
    
    // Eliminar del array local
    const removedItem = window.inventory.splice(itemIndex, 1)[0];
    console.log('🗑️ Item eliminado:', removedItem);
    
    // Actualizar Firebase usando la función helper
    if (window.database && window.updateFirebaseInventory) {
        window.updateFirebaseInventory();
    }
    
    // Notificar a modales
    notifyModals();
    
    return removedItem;
};

// Función para eliminar item del inventario (mantenida por compatibilidad)
window.removeItemFromInventory = function(index) {
    console.warn('⚠️ removeItemFromInventory(index) está deprecated, usar removeItemFromInventoryById(id)');
    if (index >= 0 && index < window.inventory.length) {
        const removedItem = window.inventory.splice(index, 1)[0];
        console.log('🗑️ Item eliminado:', removedItem.nombre);
        
        // Actualizar Firebase
        if (window.database) {
            window.database.ref('itemsComprados').set(window.inventory);
        }
        
        notifyModals();
    }
};

// Función para notificar a modales
function notifyModals() {
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        if (iframe.contentWindow) {
            iframe.contentWindow.postMessage({
                type: 'updateInventory',
                items: window.inventory
            }, '*');
        }
    });
}

// Inicializar Firebase y sistema
function initializeInventorySystem() {
    console.log('🎮 Inicializando sistema de inventario...');
    
    // Firebase config
    const firebaseConfig = {
        apiKey: "AIzaSyBVc1a4E4_y-YJZV5ZqFQzTr1T8Txe8TmQ",
        authDomain: "ultimatemercenary-1e212.firebaseapp.com",
        projectId: "ultimatemercenary-1e212",
        storageBucket: "ultimatemercenary-1e212.appspot.com",
        messagingSenderId: "683730871364",
        appId: "1:683730871364:web:350aaf7a296ad34db28811",
        databaseURL: "https://ultimatemercenary-1e212-default-rtdb.firebaseio.com/"
    };

    // Inicializar Firebase si no está ya inicializado
    if (!window.firebaseApp) {
        window.firebaseApp = firebase.initializeApp(firebaseConfig);
        window.database = firebase.database();
    }
    
    window.firebaseInitialized = true;
    
    // Listener de Firebase - SIMPLE Y DIRECTO con prevención de loops
    let isUpdatingFromFirebase = false;
    const itemsRef = window.database.ref('itemsComprados');
    itemsRef.on('value', (snapshot) => {
        if (isUpdatingFromFirebase) {
            console.log('🔄 Ignorando update de Firebase (loop prevention)');
            return;
        }
        
        const data = snapshot.val();
        console.log('📡 Datos de Firebase recibidos:', data);
        
        if (data && Array.isArray(data)) {
            // Verificar si realmente hay cambios
            const currentItemsStr = JSON.stringify(window.inventory);
            const newItemsStr = JSON.stringify(data);
            
            if (currentItemsStr !== newItemsStr) {
                window.inventory = data;
                console.log('📦 Inventario actualizado:', window.inventory.length, 'items');
                notifyModals();
            } else {
                console.log('📦 Sin cambios en el inventario, omitiendo actualización');
            }
        } else if (!data) {
            if (window.inventory.length > 0) {
                window.inventory = [];
                notifyModals();
            }
        }
    });
    
    // Función helper para actualizar Firebase sin triggear el listener
    window.updateFirebaseInventory = function() {
        isUpdatingFromFirebase = true;
        window.database.ref('itemsComprados').set(window.inventory).then(() => {
            console.log('✅ Inventario actualizado en Firebase');
            setTimeout(() => { isUpdatingFromFirebase = false; }, 100);
        }).catch(error => {
            console.error('❌ Error actualizando Firebase:', error);
            isUpdatingFromFirebase = false;
        });
    };
    
    // Listener para la ficha de personaje
    const characterSheetRef = window.database.ref('characterSheet');
    characterSheetRef.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log('📋 Datos de ficha recibidos de Firebase:', data);
        
        if (data) {
            window.characterSheetData = data;
            console.log('📋 Ficha de personaje actualizada');
            
            // Notificar al modal que hay nuevos datos
            const modal = document.querySelector('iframe[src*="character-sheet-modal"]');
            if (modal && modal.contentWindow) {
                modal.contentWindow.postMessage({
                    type: 'loadCharacterData',
                    data: window.characterSheetData
                }, '*');
            }
        }
    });
    
    // Listener para mensajes del modal de ficha
    window.addEventListener('message', function(event) {
        if (event.data && event.data.type === 'characterDataGathered') {
            // El modal ha recopilado los datos de la ficha
            window.characterSheetData = event.data.data;
            console.log('📋 Datos de ficha recibidos del modal:', window.characterSheetData);
            
            // Guardar en Firebase
            updateCharacterSheetInFirebase(window.characterSheetData);
        } else if (event.data && event.data.type === 'requestCharacterData') {
            // El modal solicita los datos actuales
            if (window.characterSheetData) {
                const modal = document.querySelector('iframe[src*="character-sheet-modal"]');
                if (modal && modal.contentWindow) {
                    modal.contentWindow.postMessage({
                        type: 'loadCharacterData',
                        data: window.characterSheetData
                    }, '*');
                }
            }
        }
    });
    
    console.log('✅ Sistema de inventario inicializado');
}

// Funciones del sistema de PM (mantener compatibilidad)
window.comprarItem = function(itemId, precio) {
    console.log('💰 Comprando item:', itemId, 'por', precio, 'PM');
    
    // Verificar si hay suficientes PM
    const currentPM = window.pmTransactions ? window.pmTransactions.getTotal() : 0;
    
    if (currentPM < precio) {
        console.error('❌ PM insuficientes. Actual:', currentPM, 'Necesario:', precio);
        return false;
    }
    
    // Restar PM usando el sistema de transacciones
    if (window.pmTransactions) {
        window.pmTransactions.addTransaction(-precio, `Compra: ${itemId}`);
        console.log('✅ PM restados:', precio, 'PM restantes:', window.pmTransactions.getTotal());
        return true;
    } else {
        console.error('❌ Sistema de PM no disponible');
        return false;
    }
};

// Función simple para limpiar items (botón del modal)
window.clearPurchasedItems = function() {
    window.clearInventory();
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeInventorySystem();
});

// Sistema de character sheet básico para compatibilidad
class CharacterSheet {
    constructor() {
        this.aptitudes = {
            cog: 10, int: 10, ref: 10, sav: 10, som: 10, wil: 10
        };
        this.skills = {};
        this.equipment = [];
        this.implants = [];
    }
    
    exportToJSON() {
        return JSON.stringify(this);
    }
}

// Inicializar character sheet
window.characterSheet = new CharacterSheet();

// Función de test para verificar comunicación con la tienda
window.testInventorySystem = function() {
    console.log('🧪 Probando sistema de inventario...');
    
    // Test 1: Añadir item de prueba
    const testItem = {
        nombre: "Item de Prueba",
        tipo: "equipo", 
        descripcion: "Este es un item de prueba"
    };
    
    const result = window.addItemToInventory(testItem);
    console.log('✅ Item de prueba añadido:', result);
    
    // Test 2: Verificar estado
    const debug = window.debugInventorySystem();
    
    return debug;
};

// Función de test para el sistema completo
window.testCompleteSystem = function() {
    console.log('🧪 Probando sistema completo...');
    
    // Test inventario
    const inventoryTest = window.testInventorySystem();
    
    // Test guardado de ficha
    console.log('💾 Probando guardado de ficha...');
    const saveResult = window.saveCharacterSheet();
    
    // Test carga de ficha
    console.log('📂 Probando carga de ficha...');
    const loadResult = window.loadCharacterSheet();
    
    return {
        inventory: inventoryTest,
        save: saveResult,
        load: loadResult,
        systemReady: window.firebaseInitialized
    };
};

console.log('🎮 Sistema básico cargado. Usa debugInventorySystem() para diagnosticar.');

// =================== SISTEMA DE GUARDADO DE FICHA COMPLETA ===================

// Función para guardar la ficha completa
window.saveCharacterSheet = function() {
    console.log('💾 Guardando ficha de personaje completa...');
    
    // Recopilar todos los datos del modal
    const modal = document.querySelector('iframe[src*="character-sheet-modal"]');
    if (!modal || !modal.contentWindow) {
        console.error('❌ Modal de ficha no encontrado');
        return false;
    }
    
    try {
        // Enviar mensaje al modal para que recopile sus datos
        modal.contentWindow.postMessage({
            type: 'gatherCharacterData'
        }, '*');
        
        return true;
    } catch (error) {
        console.error('❌ Error al guardar ficha:', error);
        return false;
    }
};

// Función para cargar la ficha completa
window.loadCharacterSheet = function() {
    console.log('📂 Cargando ficha de personaje...');
    
    if (!window.characterSheetData) {
        console.log('📂 No hay datos de ficha guardados');
        return null;
    }
    
    // Enviar datos al modal
    const modal = document.querySelector('iframe[src*="character-sheet-modal"]');
    if (modal && modal.contentWindow) {
        modal.contentWindow.postMessage({
            type: 'loadCharacterData',
            data: window.characterSheetData
        }, '*');
    }
    
    return window.characterSheetData;
};

// Función interna para actualizar la ficha en Firebase
function updateCharacterSheetInFirebase(data) {
    if (window.database) {
        window.database.ref('characterSheet').set({
            ...data,
            // Timestamp de guardado
            lastSaved: new Date().toISOString(),
            version: '0.82'
        }).then(() => {
            console.log('✅ Ficha guardada en Firebase');
        }).catch(error => {
            console.error('❌ Error guardando ficha en Firebase:', error);
        });
    }
}

// =================== FUNCIONES ADMINISTRATIVAS DE FIREBASE ===================

// Función para limpiar completamente el inventario de Firebase
window.clearFirebaseInventory = function() {
    if (!confirm('⚠️ ATENCIÓN: Esto eliminará TODOS los items del inventario en Firebase.\n¿Estás completamente seguro?')) {
        return 'Operación cancelada';
    }
    
    if (!confirm('🚨 ÚLTIMA CONFIRMACIÓN: Se perderán TODOS los items.\n¿Continuar?')) {
        return 'Operación cancelada';
    }
    
    console.log('🧹 Limpiando inventario de Firebase...');
    
    if (window.database) {
        return window.database.ref('itemsComprados').set(null).then(() => {
            window.inventory = [];
            notifyModals();
            console.log('✅ Inventario de Firebase completamente limpio');
            return 'Inventario de Firebase limpiado completamente';
        }).catch(error => {
            console.error('❌ Error limpiando Firebase:', error);
            return 'Error al limpiar Firebase';
        });
    }
    
    return 'Firebase no disponible';
};

// Función para eliminar duplicados de Firebase manteniendo solo una copia de cada item
window.cleanFirebaseDuplicates = function() {
    console.log('🔍 Analizando duplicados en Firebase...');
    
    if (!window.database) {
        return 'Firebase no disponible';
    }
    
    return window.database.ref('itemsComprados').once('value').then(snapshot => {
        const data = snapshot.val();
        
        if (!data || !Array.isArray(data)) {
            console.log('📦 No hay items en Firebase para limpiar');
            return 'No hay items para limpiar';
        }
        
        const originalLength = data.length;
        const seen = new Map();
        const cleanedItems = [];
        
        data.forEach((item, index) => {
            if (!item || !item.nombre) {
                console.log(`🗑️ Eliminando item inválido en índice ${index}`);
                return; // Skip invalid items
            }
            
            // Crear clave única basada en propiedades principales
            const key = `${item.nombre}-${item.tipo}-${item.dano || ''}-${item.proteccion || ''}`;
            
            if (seen.has(key)) {
                console.log('🗑️ Duplicado encontrado:', item.nombre);
                return; // Skip duplicate
            }
            
            // Asegurar que el item tiene ID único
            if (!item.id) {
                item.id = `fixed-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
                console.log('🔧 ID asignado a:', item.nombre);
            }
            
            // Asegurar que tiene fecha de compra
            if (!item.fechaCompra) {
                item.fechaCompra = new Date().toISOString();
            }
            
            seen.set(key, true);
            cleanedItems.push(item);
        });
        
        const removedCount = originalLength - cleanedItems.length;
        
        if (removedCount > 0) {
            console.log(`🧹 Eliminando ${removedCount} duplicados de Firebase...`);
            
            return window.database.ref('itemsComprados').set(cleanedItems).then(() => {
                window.inventory = cleanedItems;
                notifyModals();
                const message = `✅ ${removedCount} duplicados eliminados de Firebase`;
                console.log(message);
                return message;
            });
        } else {
            console.log('✅ No se encontraron duplicados en Firebase');
            return 'No se encontraron duplicados';
        }
    }).catch(error => {
        console.error('❌ Error limpiando duplicados:', error);
        return 'Error al limpiar duplicados';
    });
};

// Función para mostrar estadísticas del inventario
window.showInventoryStats = function() {
    if (!window.database) {
        console.log('Firebase no disponible');
        return;
    }
    
    return window.database.ref('itemsComprados').once('value').then(snapshot => {
        const data = snapshot.val();
        
        if (!data || !Array.isArray(data)) {
            console.log('📊 Inventario vacío');
            return;
        }
        
        const stats = {
            total: data.length,
            armas: 0,
            armaduras: 0,
            equipo: 0,
            cyberware: 0,
            municion: 0,
            sinID: 0,
            duplicados: 0
        };
        
        const seen = new Map();
        
        data.forEach(item => {
            if (!item || !item.nombre) return;
            
            // Contar por tipo
            const tipo = item.tipo || 'desconocido';
            if (stats[tipo] !== undefined) {
                stats[tipo]++;
            }
            
            // Contar items sin ID
            if (!item.id) {
                stats.sinID++;
            }
            
            // Detectar duplicados
            const key = `${item.nombre}-${item.tipo}`;
            if (seen.has(key)) {
                stats.duplicados++;
            } else {
                seen.set(key, true);
            }
        });
        
        console.log('📊 Estadísticas del Inventario:');
        console.log(`   Total de items: ${stats.total}`);
        console.log(`   Armas: ${stats.armas}`);
        console.log(`   Armaduras: ${stats.armaduras}`);
        console.log(`   Equipo: ${stats.equipo}`);
        console.log(`   Cyberware: ${stats.cyberware}`);
        console.log(`   Munición: ${stats.municion}`);
        console.log(`   Sin ID: ${stats.sinID}`);
        console.log(`   Duplicados: ${stats.duplicados}`);
        
        return stats;
    });
};

// Función para listar todos los items con detalles
window.listAllItems = function() {
    if (!window.database) {
        console.log('Firebase no disponible');
        return;
    }
    
    return window.database.ref('itemsComprados').once('value').then(snapshot => {
        const data = snapshot.val();
        
        if (!data || !Array.isArray(data)) {
            console.log('📦 No hay items en Firebase');
            return;
        }
        
        console.log('📋 Lista completa de items:');
        data.forEach((item, index) => {
            if (!item) {
                console.log(`${index}: [ITEM NULO]`);
                return;
            }
            
            const id = item.id || 'SIN ID';
            const name = item.nombre || 'SIN NOMBRE';
            const type = item.tipo || 'SIN TIPO';
            
            console.log(`${index}: [${id}] ${name} (${type})`);
        });
        
        return data;
    });
};

console.log('🔧 Funciones administrativas disponibles:');
console.log('   clearFirebaseInventory() - Limpia todo el inventario');
console.log('   cleanFirebaseDuplicates() - Elimina solo duplicados');
console.log('   showInventoryStats() - Muestra estadísticas');
console.log('   listAllItems() - Lista todos los items');

// Función para limpiar todo el inventario
window.clearInventory = function() {
    if (confirm('¿Estás seguro de que quieres limpiar TODO el inventario? Esta acción no se puede deshacer.')) {
        window.inventory = [];
        console.log('🧹 Inventario limpiado localmente');
        
        // Actualizar Firebase usando la función helper
        if (window.database && window.updateFirebaseInventory) {
            window.updateFirebaseInventory();
        }
        
        // Notificar a modales
        notifyModals();
    }
}; 