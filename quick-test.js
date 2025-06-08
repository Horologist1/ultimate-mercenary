// QUICK TEST - Ultimate Mercenary Contexto
console.log('🧪 QUICK TEST - Verificando contexto de mensajes');

// Simular filtros
window.MESSAGE_FILTERS = {
    enabledCategories: {
        'fan': true,
        'picante': true,
        'humillante': true,
        'relleno': true,
        'queja': true,
        'divertido': true,
        'insulto': true
    }
};

// Configurar contexto problemático
localStorage.setItem('currentTest', 'prueba1');
localStorage.setItem('timeOfDay', 'dia');
localStorage.setItem('rating', '7.5');

console.log('📊 Contexto configurado:', {
    prueba: localStorage.getItem('currentTest'),
    momento: localStorage.getItem('timeOfDay'),
    rating: localStorage.getItem('rating')
});

// Verificar datos directos
setTimeout(() => {
    console.log('\n🔍 Verificando datos directos...');
    
    if (window.CONTEXTUAL_MESSAGES) {
        const contextKey = 'dia_alto';
        const prueba1Data = window.CONTEXTUAL_MESSAGES.prueba1;
        
        console.log('📦 CONTEXTUAL_MESSAGES.prueba1:', prueba1Data ? 'Disponible' : 'No disponible');
        
        if (prueba1Data && prueba1Data[contextKey]) {
            const messages = prueba1Data[contextKey];
            console.log(`📨 Mensajes en prueba1.${contextKey}:`, messages.length);
            
            // Buscar contenido sensual
            const palabrasSensuales = ['sensual', 'erótic', 'sexual', 'íntim', 'seduc', 'atractiv'];
            let sensualCount = 0;
            
            messages.forEach((msg, i) => {
                const texto = typeof msg === 'object' ? msg.text : msg;
                palabrasSensuales.forEach(palabra => {
                    if (texto.toLowerCase().includes(palabra)) {
                        sensualCount++;
                        console.log(`🚨 CONTENIDO SENSUAL [${i+1}]: ${texto.substring(0, 80)}...`);
                    }
                });
            });
            
            if (sensualCount === 0) {
                console.log('✅ No se detectó contenido sensual en DATOS DIRECTOS');
            } else {
                console.log(`❌ ${sensualCount} mensajes con contenido sensual en DATOS DIRECTOS`);
            }
        }
    }
    
    // Verificar función de obtención
    console.log('\n🔧 Verificando funciones...');
    
    if (typeof window.getContextualMessages === 'function') {
        const messages = window.getContextualMessages();
        console.log(`📨 getContextualMessages() devuelve: ${messages.length} mensajes`);
        
        // Buscar contenido sensual en resultado de función
        const palabrasSensuales = ['sensual', 'erótic', 'sexual', 'íntim', 'seduc', 'atractiv'];
        let sensualCount = 0;
        
        messages.forEach((msg, i) => {
            palabrasSensuales.forEach(palabra => {
                if (msg.toLowerCase().includes(palabra)) {
                    sensualCount++;
                    console.log(`🚨 FUNCIÓN - CONTENIDO SENSUAL [${i+1}]: ${msg.substring(0, 80)}...`);
                }
            });
        });
        
        if (sensualCount === 0) {
            console.log('✅ No se detectó contenido sensual en RESULTADO DE FUNCIÓN');
        } else {
            console.log(`❌ ${sensualCount} mensajes con contenido sensual en RESULTADO DE FUNCIÓN`);
        }
        
        // Mostrar primeros mensajes para comparar
        console.log('\n📝 Primeros 5 mensajes del resultado:');
        messages.slice(0, 5).forEach((msg, i) => {
            console.log(`[${i+1}] ${msg}`);
        });
    }
    
}, 1000);

console.log('⏱️ Verificación en 1 segundo...'); 