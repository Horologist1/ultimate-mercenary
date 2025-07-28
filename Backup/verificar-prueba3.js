// =================== VERIFICACIÓN PRUEBA 3 ===================
// Script para verificar que los mensajes contextuales de la Prueba 3 funcionan correctamente

console.log('🧪 Iniciando verificación de Prueba 3...');

// Configurar contexto de prueba
localStorage.setItem('currentTest', 'prueba3');
localStorage.setItem('timeOfDay', 'dia');
localStorage.setItem('rating', '8.0');

// Verificar carga de archivos
console.log('📦 Verificando archivos cargados:');
console.log('   CONTEXTUAL_MESSAGES:', typeof window.CONTEXTUAL_MESSAGES !== 'undefined');
console.log('   PRUEBA2_MESSAGES:', typeof window.PRUEBA2_MESSAGES !== 'undefined');
console.log('   PRUEBA3_MESSAGES:', typeof window.PRUEBA3_MESSAGES !== 'undefined');

// Verificar integración
if (window.CONTEXTUAL_MESSAGES) {
    console.log('📦 Pruebas disponibles en CONTEXTUAL_MESSAGES:', Object.keys(window.CONTEXTUAL_MESSAGES));
    
    if (window.CONTEXTUAL_MESSAGES.prueba3) {
        console.log('✅ Prueba 3 integrada correctamente');
        console.log('📦 Contextos de Prueba 3:', Object.keys(window.CONTEXTUAL_MESSAGES.prueba3));
        
        // Verificar contexto específico
        const contextKey = 'dia_alto';
        if (window.CONTEXTUAL_MESSAGES.prueba3[contextKey]) {
            const messages = window.CONTEXTUAL_MESSAGES.prueba3[contextKey];
            console.log(`✅ Contexto ${contextKey} encontrado con ${messages.length} mensajes`);
            
            // Mostrar algunos mensajes de ejemplo
            console.log('📨 Ejemplos de mensajes:');
            messages.slice(0, 3).forEach((msg, index) => {
                const text = typeof msg === 'object' ? msg.text : msg;
                console.log(`   ${index + 1}. ${text}`);
            });
        } else {
            console.log(`❌ Contexto ${contextKey} no encontrado`);
        }
    } else {
        console.log('❌ Prueba 3 NO está integrada en CONTEXTUAL_MESSAGES');
    }
} else {
    console.log('❌ CONTEXTUAL_MESSAGES no disponible');
}

// Verificar funciones
console.log('🔧 Verificando funciones:');
console.log('   getContextualMessages:', typeof window.getContextualMessages === 'function');
console.log('   getCurrentContextualMessages:', typeof window.getCurrentContextualMessages === 'function');

// Probar obtención de mensajes
if (typeof window.getCurrentContextualMessages === 'function') {
    try {
        const messages = window.getCurrentContextualMessages();
        console.log(`✅ Función getCurrentContextualMessages devolvió ${messages.length} mensajes`);
        
        if (messages.length > 0) {
            console.log('📨 Primeros 3 mensajes obtenidos:');
            messages.slice(0, 3).forEach((msg, index) => {
                console.log(`   ${index + 1}. ${msg}`);
            });
        }
    } catch (error) {
        console.error('❌ Error obteniendo mensajes:', error);
    }
}

// Verificar filtros
if (window.MESSAGE_FILTERS) {
    console.log('🎛️ Sistema de filtros disponible');
    console.log('   Filtros activos:', window.MESSAGE_FILTERS.enabledCategories);
} else {
    console.log('⚠️ Sistema de filtros no disponible');
}

console.log('✅ Verificación completada'); 