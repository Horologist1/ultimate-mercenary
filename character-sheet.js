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
    
    // Normalizar el item
    const normalizedItem = {
        nombre: item.nombre || item.name || 'Item sin nombre',
        tipo: item.tipo || 'equipo',
        descripcion: item.descripcion || item.description || '',
        id: Date.now() + Math.random() // ID único
    };
    
    // Añadir al array local
    window.inventory.push(normalizedItem);
    
    // Actualizar Firebase
    if (window.database) {
        window.database.ref('itemsComprados').set(window.inventory).then(() => {
            console.log('✅ Item guardado en Firebase');
        }).catch(error => {
            console.error('❌ Error guardando en Firebase:', error);
        });
    }
    
    // Notificar a modales
    notifyModals();
    
    return normalizedItem;
};

// Función para limpiar inventario
window.clearInventory = function() {
    if (confirm('¿Limpiar todo el inventario?')) {
        window.inventory = [];
        
        if (window.database) {
            window.database.ref('itemsComprados').set(null);
        }
        
        notifyModals();
        console.log('🧹 Inventario limpiado');
    }
};

// Función para eliminar item específico
window.removeItemFromInventory = function(index) {
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
    
    // Listener de Firebase - SIMPLE Y DIRECTO
    const itemsRef = window.database.ref('itemsComprados');
    itemsRef.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log('📡 Datos de Firebase recibidos:', data);
        
        if (data && Array.isArray(data)) {
            window.inventory = data;
            console.log('📦 Inventario actualizado:', window.inventory.length, 'items');
            notifyModals();
        } else if (!data) {
            window.inventory = [];
            notifyModals();
        }
    });
    
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
    // Esta función debe existir para la tienda
    console.log('💰 Comprando item:', itemId, 'por', precio, 'PM');
    return true; // Simplificamos para testing
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
        window.database.ref('characterSheet').set(data).then(() => {
            console.log('✅ Ficha guardada en Firebase');
        }).catch(error => {
            console.error('❌ Error guardando ficha en Firebase:', error);
        });
    }
} 