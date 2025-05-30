// =================== SISTEMA DE INVENTARIO ROBUSTO ===================
// Sistema simple y funcional para gestionar items comprados
// =======================================================================

// Variables globales
window.inventory = [];
window.firebaseInitialized = false;

// Debug function - disponible inmediatamente
window.debugInventorySystem = function() {
    console.group('🔍 DEBUG: Sistema de Inventario');
    console.log('📦 Items en inventario:', window.inventory.length);
    console.log('🔥 Firebase inicializado:', window.firebaseInitialized);
    console.log('📊 Items:', window.inventory.map(item => item.nombre || item.name || 'Sin nombre'));
    console.groupEnd();
    return {
        inventoryCount: window.inventory.length,
        firebaseReady: window.firebaseInitialized,
        items: window.inventory
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

console.log('🎮 Sistema básico cargado. Usa debugInventorySystem() para diagnosticar.'); 