// Datos para mensajes del público
const nombresUsuarios = [
    "Neo_Kyoto_Fan42", "SamuraiStalker", "EdgerunnerGirl", "MercenaryCrazy", 
    "BloodMoney99", "ChromeHeart", "WiredNinja", "NeonShadow",
    "CyberSlice", "DeathMatch_Lover", "KatanaQueen", "StreetHunter22",
    "RazorGirl", "BlackICE", "HologramGhost", "PunisherX",
    "RealityShow_Addict", "VoidWalker", "SilverHand_Jr", "ChromeKid",
    "JapantownRat", "NightCityDreamer", "StimJunkie", "ArasaxaCorp",
    "SteelSamurai", "NetRunnerWannabe", "FutureShock", "DigitalAssassin",
    "KaiserFan01", "OCE_VIP", "BioHacker", "SyntheticLover",
    "CyberPsycho", "MeatSpace", "DigitalNomad", "TechnoMancer",
    "RichCorp_Kid", "WastelandPunk", "BodyModder", "MilSpecGear",
    "RetroBlade", "SoloOperative", "Flatline_Prophet", "CHOOMBA_45",
    "ShadowRunner", "DataPirate", "ToxicWasteland", "DeckHead",
    "ConsoleKid", "BloodSport_Queen"
];

const colorPaleta = [
    "#ff4757", "#2ed573", "#1e90ff", "#ffa502", "#7bed9f", 
    "#70a1ff", "#ff6b81", "#a4b0be", "#f368e0", "#ff9ff3", 
    "#00d2d3", "#5352ed", "#6087FF", "#FEC777", "#00bfff"
];

const mensajesGenerales = [
    "¡Vamos, no decepciones a tus fans!",
    "¡Estoy apostando todo por ti, no me falles!",
    "Mira esos reflejos, ¡eres una máquina!",
    "Mi IA predictiva dice que no llegarás a la siguiente ronda...",
    "Acabo de apostar 5000 créditos a que sobrevives esta prueba",
    "OCE debería ponerte un reto REAL",
    "Ese cromo que llevas parece de segunda mano...",
    "¡Eres mi favorito desde el principio!",
    "Solo los débiles usan tanto equipo. Demuestra tu valor real.",
    "Por dios, alguien dé algo de equipo decente a este participante",
    "Sácale los ojos al siguiente que veas",
    "Mi hijo te adora, no mueras por favor",
    "Ese último movimiento fue ÉPICO",
    "Tu puntuación de audiencia acaba de subir un 15%",
    "Kaiser está evaluando tus movimientos, impresiónalos",
    "A este ritmo acabarás como carne picada",
    "Empiezo a creer que realmente tienes posibilidades",
    "Nadie ha pasado la siguiente prueba con vida, serás el primero?",
    "Llevo viendo este programa 5 temporadas y eres el mejor hasta ahora",
    "¿Has considerado aliarte con el tipo del brazo biónico?",
    "Esa cicatriz te queda genial en cámara",
    "¡La audiencia de Neo-Kyoto Norte te adora!",
    "Baja el ritmo o te quemarás antes de la prueba final",
    "Acabo de hackear las cámaras de la arena, cuidado con el sector 7",
    "¡MÁTALOS A TODOS!",
    "¿Por qué no intentas algo más arriesgado? Aburres...",
    "Usa ese implante que conseguiste, ¡para eso gastaste PM!",
    "Realmente impresionante tu técnica con esa katana",
    "Mi IA predice un 32% de posibilidades de supervivencia",
    "Tu puntuación en las apuestas acaba de duplicarse"
];

const retosEspecificos = [
    "¡Haz un striptease para la cámara! ¡+10 PM si lo haces!",
    "¡Besa al próximo participante que veas! El público lo pide",
    "Reta a [PARTICIPANTE] a un duelo cuerpo a cuerpo, sin armas",
    "Haz 20 flexiones ahora mismo para demostrar tu fuerza",
    "Rompe tu arma principal - si te atreves, OCE te dará una mejor",
    "Confiesa tu mayor miedo a la cámara, ¡el público quiere drama!",
    "Háblale a la cámara sobre por qué entraste al programa",
    "¡Intenta hackear el siguiente terminal sin protección!",
    "Cuéntanos tu peor secreto, ¡la audiencia lo exige!",
    "Sabotea el equipo de [PARTICIPANTE] cuando no esté mirando",
    "Llora ante la cámara, real o falso, ¡sube tu popularidad!",
    "Grita el nombre de tu amor a la cámara - ¿alguien especial fuera?",
    "Forma una alianza con el participante que más odias",
    "Traiciona a tu aliado actual - el público quiere drama",
    "Realiza una danza de la victoria cada vez que elimines a alguien",
    "Intenta robar un objeto de la Tienda de Méritos",
    "Cuenta una historia triste de tu pasado - real o inventada",
    "Provoca a Goliath o a Jinx - ¡a ver qué pasa!",
    "Canta el himno de Neo-Kyoto para Kaiser",
    "Intenta contactar con alguien del exterior durante la prueba",
    "Da la mitad de tus PM al participante más débil - ¡generosidad!",
    "Haz una imitación de Kaiser frente a una cámara",
    "Declara tu amor eterno al siguiente participante que veas",
    "Actúa como si tuvieras un brote de ciberpsicosis por 5 minutos",
    "Intenta sobornar a un guardia de OCE frente a la cámara",
    "Insulta a OCE directamente - ¡a ver si te atreves!",
    "Finge tu propia muerte en la próxima prueba - ¡engáñalos a todos!",
    "Revela las debilidades de tu aliado actual a la cámara",
    "Haz un pacto de sangre con otro concursante frente a la cámara",
    "Realiza un discurso político radical contra las corporaciones",
    "Intenta robar el implante personal de [PARTICIPANTE] - ¡+50 PM!",
    "Bebe la misteriosa sustancia que Compound ofrece - ¡+25 PM!",
    "Desafía a Echo a una competición de tiro - si ganas: ¡+100 PM!",
    "¡Intenta separar a Los Gemelos por al menos 5 minutos!",
    "Intercambia tu mejor implante con otro concursante por 24 horas",
    "Derrama tu sangre en el suelo y grita '¡Por los dioses del acero!'",
    "Crea una falsa rivalidad romántica con [PARTICIPANTE] para las cámaras",
    "¡Engaña a Nano para que te dé un implante experimental!",
    "Prueba a combatir con los ojos vendados la próxima prueba",
    "Convence a Kaiser de que eres un espía encubierto del gobierno",
    "Hackea el servicio de mensajería de OCE para enviar un mensaje propio",
    "Escóndete en los dormitorios por 24 horas - ¡sin que nadie te encuentre!",
    "Convence a [PARTICIPANTE] de que tiene un admirador secreto fuera",
    "Simula una lesión para conseguir atención médica - ¡y medicamentos!",
    "Intenta reclutar concursantes para un motín planificado",
    "Confiesa a las cámaras que planeabas traicionar a tu aliado",
    "Crea y comparte tu propio cóctel de drogas de combate con [PARTICIPANTE]",
    "¡Baila sensualmente con [PARTICIPANTE] durante la pausa entre pruebas!",
    "Cambia tu look completamente - ¡irreconocible para las cámaras!",
    "¡Declara que puedes ver el futuro y profetiza la muerte de [PARTICIPANTE]!"
];

const participantesDisponibles = [
    "Goliath", "Silas", "Raven", "Chispa", "Marcus", "Jinx", "Lin", "Subject Omega",
    "Echo", "Compound", "Los Gemelos", "Viper", "Phantom", "Titan", "Oracle", "Thunder Fist",
    "Maven", "Nano", "Participante #23", "Participante #45", "Participante #17", "Participante #9", 
    "Participante #31", "Participante #8", "Participante #14", "Participante #27",
    "Participante #36", "Participante #22", "Participante #41", "Participante #7"
];

// Función para generar mensajes aleatorios
function generarMensajeAleatorio() {
    const usuario = nombresUsuarios[Math.floor(Math.random() * nombresUsuarios.length)];
    const color = colorPaleta[Math.floor(Math.random() * colorPaleta.length)];
    let mensaje;
    
    // 70% mensajes generales, 30% retos específicos
    if (Math.random() < 0.7) {
        mensaje = mensajesGenerales[Math.floor(Math.random() * mensajesGenerales.length)];
    } else {
        mensaje = retosEspecificos[Math.floor(Math.random() * retosEspecificos.length)];
        // Reemplazar [PARTICIPANTE] si existe en el mensaje
        if (mensaje.includes("[PARTICIPANTE]")) {
            const participante = participantesDisponibles[Math.floor(Math.random() * participantesDisponibles.length)];
            mensaje = mensaje.replace("[PARTICIPANTE]", participante);
        }
    }
    
    return {
        usuario: usuario,
        color: color,
        mensaje: mensaje,
        destacado: Math.random() < 0.2, // 20% de mensajes destacados
        esReto: mensaje.includes("¡+") || mensaje.includes("PM si") || mensaje.includes("OCE te dará")
    };
}

// Función para inicializar el widget de chat
function inicializarChatWidget() {
    const chatContainer = document.getElementById('live-chat-container');
    if (!chatContainer) return;
    
    // Generar mensajes iniciales
    for (let i = 0; i < 8; i++) {
        agregarMensaje(chatContainer);
    }
    
    // Configurar el intervalo para añadir nuevos mensajes
    setInterval(() => {
        agregarMensaje(chatContainer);
        
        // Mantener solo los últimos 12 mensajes
        const mensajes = chatContainer.querySelectorAll('.chat-message');
        if (mensajes.length > 12) {
            mensajes[0].remove();
        }
    }, 5000); // Nuevo mensaje cada 5 segundos
}

// Función para agregar un mensaje al chat
function agregarMensaje(container) {
    const mensajeData = generarMensajeAleatorio();
    const mensajeElement = document.createElement('div');
    mensajeElement.className = `chat-message ${mensajeData.destacado ? 'destacado' : ''} ${mensajeData.esReto ? 'reto' : ''}`;
    
    mensajeElement.innerHTML = `
        <span class="usuario" style="color: ${mensajeData.color}">${mensajeData.usuario}:</span>
        <span class="texto">${mensajeData.mensaje}</span>
    `;
    
    // Añadir animación de entrada
    mensajeElement.style.opacity = '0';
    container.appendChild(mensajeElement);
    
    // Trigger animation
    setTimeout(() => {
        mensajeElement.style.opacity = '1';
    }, 50);
}

// Inicializar el widget cuando la página se cargue
window.addEventListener('DOMContentLoaded', inicializarChatWidget);