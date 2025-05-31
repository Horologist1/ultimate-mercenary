// =================== SISTEMA DE INTEGRACIÓN CONTEXTUAL ===================
// Ultimate Mercenary v0.93 - Sistema de integración de mensajes contextuales
// Reemplaza el sistema de mensajes fijo por uno adaptativo
// =======================================================================

// Importar todos los archivos de mensajes contextuales
let PRUEBA2_MESSAGES, PRUEBA3_MESSAGES;

// Cargar los archivos de mensajes dinámicamente
function loadContextualMessages() {
    return Promise.all([
        loadScript('contextual-messages.js'),
        loadScript('contextual-messages-p2.js'),
        loadScript('contextual-messages-p3.js')
    ]).then(() => {
        // Los mensajes están ahora disponibles globalmente
        PRUEBA2_MESSAGES = window.PRUEBA2_MESSAGES;
        PRUEBA3_MESSAGES = window.PRUEBA3_MESSAGES;
        console.log('✅ Sistema contextual cargado completamente');
    });
}

function loadScript(src) {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// =================== SISTEMA DE SELECCIÓN CONTEXTUAL ===================

function getCurrentContextualMessages() {
    const currentTest = localStorage.getItem('currentTest') || 'prueba0';
    const timeOfDay = localStorage.getItem('timeOfDay') || 'dia';
    const rating = parseFloat(localStorage.getItem('rating') || '7.0');
    const isRatingHigh = rating > 6;
    
    // Determinar la clave del contexto
    const ratingKey = isRatingHigh ? 'alto' : 'bajo';
    const contextKey = `${timeOfDay}_${ratingKey}`;
    
    console.log(`🎯 Contexto actual: ${currentTest} - ${timeOfDay} - ${ratingKey} (rating: ${rating})`);
    
    // Obtener los mensajes según la prueba
    let messages = [];
    
    switch(currentTest) {
        case 'prueba0':
            if (window.CONTEXTUAL_MESSAGES && window.CONTEXTUAL_MESSAGES.prueba0 && window.CONTEXTUAL_MESSAGES.prueba0[contextKey]) {
                messages = window.CONTEXTUAL_MESSAGES.prueba0[contextKey];
            }
            break;
        case 'prueba1':
            if (window.CONTEXTUAL_MESSAGES && window.CONTEXTUAL_MESSAGES.prueba1 && window.CONTEXTUAL_MESSAGES.prueba1[contextKey]) {
                messages = window.CONTEXTUAL_MESSAGES.prueba1[contextKey];
            }
            break;
        case 'prueba2':
            if (PRUEBA2_MESSAGES && PRUEBA2_MESSAGES[contextKey]) {
                messages = PRUEBA2_MESSAGES[contextKey];
            }
            break;
        case 'prueba3':
            if (PRUEBA3_MESSAGES && PRUEBA3_MESSAGES[contextKey]) {
                messages = PRUEBA3_MESSAGES[contextKey];
            }
            break;
        default:
            console.warn(`⚠️ Prueba no reconocida: ${currentTest}`);
            // Fallback a prueba0
            if (window.CONTEXTUAL_MESSAGES && window.CONTEXTUAL_MESSAGES.prueba0 && window.CONTEXTUAL_MESSAGES.prueba0[contextKey]) {
                messages = window.CONTEXTUAL_MESSAGES.prueba0[contextKey];
            }
    }
    
    // Si no hay mensajes específicos, usar fallback
    if (!messages || messages.length === 0) {
        console.warn(`⚠️ No se encontraron mensajes para ${currentTest} - ${contextKey}, usando fallback`);
        messages = getFallbackMessages();
    }
    
    console.log(`📨 Mensajes disponibles: ${messages.length}`);
    return messages;
}

function getFallbackMessages() {
    return [
        "¡Vamos XIII, no decepciones a tus fans!",
        "¡Estoy apostando todo por ti, no me falles!",
        "Mira esos reflejos, ¡eres una máquina!",
        "Mi IA predictiva dice que no llegarás a la siguiente ronda, XIII...",
        "Acabo de apostar 5000 créditos a que sobrevives esta prueba",
        "OCE debería ponerte un reto REAL, XIII",
        "Ese cromo que llevas parece de segunda mano...",
        "¡Eres mi favorita desde el principio!",
        "Solo las débiles usan tanto equipo. Demuestra tu valor real.",
        "Por dios, alguien dé algo de equipo decente a la XIII",
        "¡Actúa como si tuvieras múltiples personalidades por 12 horas! ¡+70 PM!",
        "¡Marca territorios con sangre como un animal y defiéndelos a muerte! ¡+80 PM!"
    ];
}

// =================== NOMBRES CONTEXTUALES ===================

function getContextualUsernames() {
    const timeOfDay = localStorage.getItem('timeOfDay') || 'dia';
    const rating = parseFloat(localStorage.getItem('rating') || '7.0');
    const isRatingHigh = rating > 6;
    
    if (timeOfDay === 'noche') {
        if (isRatingHigh) {
            return [
                "NightWatcher_VIP", "MidnightFan", "DarkDesire_Premium", "ShadowLover69",
                "NocturnaObsessed", "DreamCatcher_XIII", "NightQueen_Fan", "MoonlightStalker",
                "SilentAdmirer", "DarkAngel_Support", "MysteriousWatcher", "NightTime_Patron"
            ];
        } else {
            return [
                "NightCritic_Anon", "MidnightTroll", "DarkHater_666", "ShadowBooing",
                "NocturnaDisgusted", "NightmareFuel", "DarkSide_Critic", "MidnightDisappoint",
                "SilentJudge", "DarkAngel_Hate", "MysteriousHater", "NightTime_Troll"
            ];
        }
    } else {
        if (isRatingHigh) {
            return [
                "Neo_Kyoto_Fan42", "SamuraiStalker", "EdgerunnerGirl", "MercenaryCrazy", 
                "BloodMoney99", "ChromeHeart", "WiredNinja", "NeonShadow",
                "CyberSlice", "DeathMatch_Lover", "KatanaQueen", "StreetHunter22"
            ];
        } else {
            return [
                "Disappointed_Viewer", "FailedInvestment", "BoringShow_Critic", "WastedCredits",
                "AmateurHour", "LowExpectations", "UnimpressedFan", "MediocreViewer",
                "CasualCritic", "BasicViewer", "SimpleWatcher", "LowStandards"
            ];
        }
    }
}

// =================== FUNCIÓN PRINCIPAL DE REEMPLAZO ===================

function getContextualMessageExample() {
    const messages = getCurrentContextualMessages();
    const usernames = getContextualUsernames();
    
    if (messages.length === 0) {
        console.error('❌ No hay mensajes contextuales disponibles');
        return {
            messages: getFallbackMessages(),
            usernames: getContextualUsernames()
        };
    }
    
    return {
        messages: messages,
        usernames: usernames
    };
}

// =================== INTEGRACIÓN CON SISTEMA EXISTENTE ===================

// Override del array de ejemplos original
function replaceOriginalExamples() {
    const contextualData = getContextualMessageExample();
    
    // Reemplazar globalmente
    window.CONTEXTUAL_EXAMPLES = contextualData.messages;
    window.CONTEXTUAL_USERNAMES = contextualData.usernames;
    
    console.log('🔄 Sistema de mensajes reemplazado con contexto:', {
        prueba: localStorage.getItem('currentTest'),
        momento: localStorage.getItem('timeOfDay'),
        rating: localStorage.getItem('rating'),
        mensajes: contextualData.messages.length,
        usuarios: contextualData.usernames.length
    });
}

// =================== SISTEMA DE ACTUALIZACIÓN AUTOMÁTICA ===================

function updateContextualSystem() {
    try {
        replaceOriginalExamples();
        
        // Actualizar los mensajes automáticos si están activos
        if (window.updateAutoMessages) {
            window.updateAutoMessages();
        }
        
        console.log('✅ Sistema contextual actualizado');
    } catch (error) {
        console.error('❌ Error actualizando sistema contextual:', error);
    }
}

// Escuchar cambios en localStorage
function watchContextChanges() {
    let currentTest = localStorage.getItem('currentTest');
    let currentTimeOfDay = localStorage.getItem('timeOfDay');
    let currentRating = localStorage.getItem('rating');
    
    setInterval(() => {
        const newTest = localStorage.getItem('currentTest');
        const newTimeOfDay = localStorage.getItem('timeOfDay');
        const newRating = localStorage.getItem('rating');
        
        if (newTest !== currentTest || newTimeOfDay !== currentTimeOfDay || newRating !== currentRating) {
            console.log('🔄 Cambio de contexto detectado');
            currentTest = newTest;
            currentTimeOfDay = newTimeOfDay;
            currentRating = newRating;
            updateContextualSystem();
        }
    }, 1000); // Verificar cada segundo
}

// =================== INICIALIZACIÓN ===================

function initContextualSystem() {
    console.log('🚀 Inicializando sistema contextual...');
    
    loadContextualMessages().then(() => {
        updateContextualSystem();
        watchContextChanges();
        
        console.log('✅ Sistema contextual completamente inicializado');
        
        // Exponer funciones globalmente para debugging
        window.getCurrentContextualMessages = getCurrentContextualMessages;
        window.getContextualUsernames = getContextualUsernames;
        window.updateContextualSystem = updateContextualSystem;
        window.getContextualMessageExample = getContextualMessageExample;
    }).catch(error => {
        console.error('❌ Error inicializando sistema contextual:', error);
    });
}

// =================== FUNCIONES DE UTILIDAD ===================

function logCurrentContext() {
    const currentTest = localStorage.getItem('currentTest') || 'prueba0';
    const timeOfDay = localStorage.getItem('timeOfDay') || 'dia';
    const rating = parseFloat(localStorage.getItem('rating') || '7.0');
    
    console.log('📊 Estado actual del contexto:', {
        prueba: currentTest,
        momento: timeOfDay,
        rating: rating,
        isRatingHigh: rating > 6,
        contextKey: `${timeOfDay}_${rating > 6 ? 'alto' : 'bajo'}`
    });
    
    const messages = getCurrentContextualMessages();
    console.log(`📨 Mensajes disponibles: ${messages.length}`);
    console.log('🎯 Muestra de mensajes:', messages.slice(0, 3));
}

function testContextualSystem() {
    console.log('🧪 Probando sistema contextual...');
    
    const tests = ['prueba0', 'prueba1', 'prueba2', 'prueba3'];
    const times = ['dia', 'noche'];
    const ratings = [5.0, 8.0];
    
    tests.forEach(test => {
        times.forEach(time => {
            ratings.forEach(rating => {
                localStorage.setItem('currentTest', test);
                localStorage.setItem('timeOfDay', time);
                localStorage.setItem('rating', rating.toString());
                
                const messages = getCurrentContextualMessages();
                console.log(`${test} - ${time} - ${rating > 6 ? 'alto' : 'bajo'}: ${messages.length} mensajes`);
            });
        });
    });
    
    console.log('✅ Test completado');
}

// Exportar funciones principales
window.initContextualSystem = initContextualSystem;
window.updateContextualSystem = updateContextualSystem;
window.getContextualUsernames = getContextualUsernames;
window.logCurrentContext = logCurrentContext;
window.testContextualSystem = testContextualSystem;

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContextualSystem);
} else {
    initContextualSystem();
} 