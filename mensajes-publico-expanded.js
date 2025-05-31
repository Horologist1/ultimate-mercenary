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
    "ConsoleKid", "BloodSport_Queen", "ThirstyForBlood", "MeatGrinder69",
    "DeathDealerPRO", "ChromeAddict", "Zer0Mercy", "CyberDom",
    "WetWare_Fetish", "SyntheticPleasure", "BladeWorship", "NeonDreamer",
    "VRDancer", "Neural_Link", "DeadlyDiva", "ChaosMaker",
    "FatalBeauty", "LastHope77", "BionicLust", "KillerInstinct",
    "WaifuHunter", "TechnoShaman", "BloodQueen", "MechanicalHeart", 
    "ImmortalDesire", "BitchInMatrix", "CyberGigoló", "MercWithAMouth"
];

const colorPaleta = [
    "#ff4757", "#2ed573", "#1e90ff", "#ffa502", "#7bed9f", 
    "#70a1ff", "#ff6b81", "#a4b0be", "#f368e0", "#ff9ff3", 
    "#00d2d3", "#5352ed", "#6087FF", "#FEC777", "#00bfff",
    "#FF1493", "#FF00FF", "#FF69B4", "#8B008B", "#9932CC",
    "#00FF7F", "#00FFFF", "#00CED1", "#1E90FF", "#FF8C00"
];

// Lista actualizada de participantes con números
const participantesDisponibles = [
    "#13 (protagonista)", 
    "#01 Goliath", "#02 Silas", "#03 Raven", "#04 Chispa", 
    "#05 Marcus", "#06 Jinx", "#07 Lin", "#08 Subject Omega",
    "#09 Echo", "#10 Compound", "#11 Los Gemelos", "#12 Viper", 
    "#14 Phantom", "#15 Titan", "#16 Oracle", "#17 Thunder Fist",
    "#18 Maven", "#19 Nano", "#20", "#21", "#22", "#23", "#24", "#25", 
    "#26", "#27", "#28", "#29", "#30", "#31", "#32", "#33", "#34", 
    "#35", "#36", "#37", "#38", "#39", "#40", "#41", "#42", "#43", 
    "#44", "#45", "#46", "#47", "#48", "#49", "#50", "#51", "#52", 
    "#53", "#54", "#55", "#56", "#57", "#58", "#59", "#60", "#61", 
    "#62", "#63", "#64", "#65", "#66", "#67", "#68", "#69", "#70", 
    "#71", "#72", "#73", "#74", "#75", "#76", "#77", "#78", "#79", 
    "#80", "#81", "#82", "#83", "#84", "#85", "#86", "#87", "#88", 
    "#89", "#90", "#91", "#92", "#93", "#94", "#95", "#96", "#97", 
    "#98", "#99", "#100"
];

// Mensajes generales originales
const mensajesGeneralesOriginales = [
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

// 100 Nuevos mensajes generales con temas diversos
const mensajesGeneralesNuevos = [
    // --- Mensajes divertidos ---
    "¿Viste la cara de #06 Jinx cuando casi te corta la cabeza? ¡Impagable!",
    "Tu última caída fue TAN patética que subiste 5 puntos de rating. ¡El público ama a los perdedores graciosos!",
    "¿Puedes saludar a mi abuela? ¡Es tu fan #1 y tiene 102 años y un arsenal de implantes militares!",
    "Acabo de hacer una mezcla de tus mejores gritos. ¡Ya es mi tono de alarma!",
    "Intenta no morir de forma tan aburrida como el #78, por favor. Al menos sé creativo.",
    "Si sobrevives, ¡te invito a una cita virtual! (Términos y condiciones aplican)",
    "¡Tu cara cuando viste al Terror-Maíz! JAJAJA. ¡La he puesto como mi avatar en todas mis redes!",
    "Esa pose heroica que hiciste... ¿la ensayaste o eres así de ridículo naturalmente?",
    "¡Menos poses y más acción! ¡Esto no es un desfile de modas futuristas!",
    "La forma en que esquivaste esa trampa... mi gato se mueve con más gracia, ¡y tiene artrosis!",
    
    // --- Mensajes picantes/sugerentes ---
    "Ese traje de combate se te ve TAN bien... ¿tienes planes después del show?",
    "Acabo de subir un fanedit tuyo a la red. Ya tiene 1M de vistas. De nada. ;)",
    "La forma en que manejas ese cuchillo... me pregunto qué más sabes manejar así... ;)",
    "Tus movimientos son tan fluidos que me haces pensar en cosas... fluidas.",
    "¿Es eso sudor o estás feliz de vernos a todos observándote?",
    "#13 y #02 Silas harían una pareja *tan* hot. ¿No crees? ¡El público lo pide!",
    "Por cada enemigo que elimines, me quitaré una prenda. Y estoy viendo esto en público. ;)",
    "Hay un club de fans dedicado a tus \"atributos físicos\". Soy el presidente, por cierto.",
    "Tus movimientos de combate son como un baile erótico con la muerte. ¡Sigue así!",
    "La forma en que respiras agitadamente después de correr... ¿haces ese mismo sonido en otras... situaciones?",
    
    // --- Mensajes violentos ---
    "¡Quiero ver sangre! Preferiblemente la de alguien más, no la tuya.",
    "¡Córtale los implantes a #05 Marcus! ¡Se los robó a mi primo!",
    "Esa lesión que le causaste a #81 fue asombrosa. ¿Puedes hacer lo mismo pero en la cara la próxima vez?",
    "Si le arrancas el brazo cibernético a alguien, ¡te pagaré 25,000 créditos!",
    "Rompe algo. O a alguien. Da igual. Solo quiero ver destrucción.",
    "Ese disparo a la cabeza de ayer fue BRUTAL. ¿Puedes superar tu propia marca?",
    "Técnicamente, si rompes el cuello de alguien lo suficientemente rápido, ni siquiera lo sentirá. Solo digo...",
    "Apuesto 10,000 créditos a que no puedes destrozar los implantes neurales de #06 Jinx sin matarla.",
    "¿Quién necesita programas de cocina cuando podemos ver tus entrañas por todo el suelo?",
    "La mejor forma de ganar es apagar permanentemente a tus oponentes. ¿Entiendes lo que digo?",
    
    // --- Llamadas a la acción ---
    "¡Demuestra quién manda! ¡Marca tu territorio en la arena como los animales!",
    "¡Haz el famoso grito de guerra de los Dragones de Jade! ¡La audiencia enloquecerá!",
    "Silba el himno de Neo-Kyoto antes de cada kill. ¡Será tu firma personal!",
    "¿Puedes hacer un backflip mientras disparas? El rating subiría como la espuma.",
    "Dibuja tu símbolo personal con la sangre de tus enemigos. ¡Branding, amigo!",
    "Grábate un mensaje en la piel con tu cuchillo. Los fans locos como yo lo reproduciremos.",
    "Usa la cabeza de un drone como casco. ¡Intimidación nivel dios!",
    "Colecciona un 'trofeo' de cada oponente que elimines. ¡Como una oreja o un dedo!",
    "¡Cuenta un chiste malo cada vez que elimines a alguien! El contraste es hilarante.",
    "¡Deja un ramo de flores junto a cada cadáver que hagas! El romanticismo nunca pasa de moda.",
    
    // --- Mensajes motivacionales/estratégicos ---
    "Usa los conductos de ventilación del sector 4. Nadie los vigila. De nada.",
    "Kaiser tiene debilidad por los concursantes que muestran compasión. Es su secreto mejor guardado.",
    "Las cámaras del sector 9 tienen un punto ciego de 3 segundos cada 2 minutos.",
    "Los implantes de #14 Phantom tienen un defecto. Apunta a su nuca si te enfrentas a él.",
    "¡Confía en tus instintos! Te han mantenido vivo hasta ahora.",
    "A veces sobrevivir significa saber cuándo NO luchar. Estrategia, amigo.",
    "El código de acceso de la puerta sur es 3479. Dijiste que lo olvidarías y... lo olvidaste.",
    "¡NO confíes en #07 Lin! Está trabajando para OCE como informante.",
    "El arma que encontraste tiene un compartimento secreto en la culata. Revísalo.",
    "¡Para ganar no necesitas matar a todos, solo sobrevivir a todos!",
    
    // --- Mensajes de fans ---
    "Mi hija tiene tu mismo implante ocular. Le salvaste la vida al mostrarle que puede ser fuerte como tú.",
    "Llevo siguiéndote desde la primera prueba. No me defraudes ahora.",
    "Mi clan entero está viendo esto. ¡Somos 200 y todos apostamos por ti!",
    "Tengo un póster tuyo en tamaño real en mi habitación. Mi pareja está celosa.",
    "¡Acabo de tatuarme tu cara en mi espalda! ¿Te gusta? ¡Puedo mostrártelo cuando salgas!",
    "He creado una IA basada en tus patrones de movimiento. ¡Predice que ganarás!",
    "Mi familia completa se ha puesto tu nombre. Incluso el perro. No estoy bromeando.",
    "He nombrado a mi hijo recién nacido como tú. No me hagas arrepentirme.",
    "Tengo una colección de todos tus momentos. 247 horas de metraje. Sé lo que hiciste en el sector 12.",
    "¡Hay un templo dedicado a ti en el Barrio 44! La gente ya te venera como a un dios viviente.",
    
    // --- Mensajes de crítica ---
    "Mi abuela con artritis se mueve mejor que tú en combate.",
    "¿Llamas a eso una estrategia? Mi tostadora tiene mejor planificación.",
    "Todos mis amigos dicen que eres el peor de la temporada. Demuéstrales que se equivocan.",
    "¿Te entrenó un niño de 5 años? Porque tus movimientos lo sugieren.",
    "Si tu puntería fuera un restaurante, tendría cero estrellas y una investigación sanitaria.",
    "Tu último combate fue tan aburrido que mi IA de entretenimiento se apagó sola.",
    "Ese implante que llevas tan orgulloso está obsoleto desde hace 3 años. Actualízate.",
    "¿Sabes que existe el sigilo, verdad? No todo es entrar disparando como un demente.",
    "Tu estilo de combate es como una mala película de los 2000. Predecible y con malos efectos.",
    "No sé qué es peor, tu estrategia o tu peinado. Ambos parecen decisiones impulsivas.",
    
    // --- Mensajes del programa ---
    "ACTUALIZACIÓN: Los ratings han subido un 23% en la última hora. ¡Sigan así, concursantes!",
    "ALERTA: La zona norte será inundada con gas nervioso en 30 minutos. Planeen en consecuencia.",
    "BONUS: El primer concursante en llegar al sector 7 recibirá un paquete especial de equipo.",
    "RECORDATORIO: No hay reglas contra el canibalismo en Ultimate Mercenary. Solo decimos...",
    "PATROCINADOR: Este segmento es patrocinado por NeoTech Implants. \"Para matar mejor.\"",
    "ESTADÍSTICA: El 68% de los espectadores predice que no sobrevivirás más de 24 horas.",
    "AVISO: Kaiser ha autorizado el uso de armas experimentales en el sector 4. Alto riesgo, alta recompensa.",
    "PROMOCIÓN: La sangre de los participantes #45 y #67 ha sido embotellada y ya está a la venta.",
    "TRIVIA: La temporada pasada, un concursante sobrevivió 72 horas sin dormir. ¿Puedes superarlo?",
    "ANUNCIO: La línea de figuras de acción de los concursantes ya está disponible. Colecciónalas todas.",
    
    // --- Mensajes con bonus de PM ---
    "¡Si eliminas a 3 concursantes en los próximos 30 minutos, OCE te dará +75 PM extra!",
    "¡Besa a otro concursante en los próximos 10 minutos para un bonus de +25 PM!",
    "¡Haz el baile viral 'Chrome Shuffle' y gana instantáneamente +15 PM!",
    "¡Si puedes recitar el lema completo de OCE, te darán +20 PM ahora mismo!",
    "¡Rompe tu propio equipo en cámara para demostrar tu confianza! +40 PM de recompensa.",
    "¡Desafía públicamente a #01 Goliath y recibirás +50 PM solo por tu audacia!",
    "¡Aplica primeros auxilios a un concursante herido y gana +30 PM por compasión!",
    "¡Cuéntanos tu historia más oscura para un bonus inmediato de +35 PM!",
    "¡Grita 'OCE es mi dios ahora' para un rápido bonus de +10 PM!",
    "¡Lleva a cabo un ritual improvisado con la sangre de un enemigo caído para +45 PM!"
];

// Combinamos los mensajes originales con los nuevos
const mensajesGenerales = [...mensajesGeneralesOriginales, ...mensajesGeneralesNuevos];

// Retos específicos originales
const retosEspecificosOriginales = [
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
    "Provoca a #01 Goliath o a #06 Jinx - ¡a ver qué pasa!",
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
    "Bebe la misteriosa sustancia que #10 Compound ofrece - ¡+25 PM!",
    "Desafía a #09 Echo a una competición de tiro - si ganas: ¡+100 PM!",
    "¡Intenta separar a #11 Los Gemelos por al menos 5 minutos!",
    "Intercambia tu mejor implante con otro concursante por 24 horas",
    "Derrama tu sangre en el suelo y grita '¡Por los dioses del acero!'",
    "Crea una falsa rivalidad romántica con [PARTICIPANTE] para las cámaras",
    "¡Engaña a #19 Nano para que te dé un implante experimental!",
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

// 100 Nuevos retos específicos (más picantes, violentos, divertidos y con llamadas a la acción)
const retosEspecificosNuevos = [
    // --- Retos picantes ---
    "¡Llévate a [PARTICIPANTE] al baño ahora mismo! El público quiere ver qué pasa. ¡+50 PM!",
    "Realiza un baile erótico para [PARTICIPANTE] con tu arma. ¡+25 PM si lo haces!",
    "Describe tu fantasía más salvaje mientras miras directamente a la cámara. ¡+30 PM!",
    "Intenta seducir a un guardia de OCE. ¡+40 PM si logras un beso!",
    "Pídele a [PARTICIPANTE] que te ayude a 'ajustar' tu implante en una zona íntima. ¡+35 PM!",
    "Da un masaje sensual a [PARTICIPANTE] después de la prueba. ¡+20 PM!",
    "¡Quítate la parte superior de tu ropa durante todo el próximo combate! ¡+45 PM!",
    "Susurra algo sucio al oído de [PARTICIPANTE] mientras estén en cámara. ¡+15 PM!",
    "Convence a [PARTICIPANTE] de hacer un 'baño de sangre' juntos después de una victoria. ¡+55 PM!",
    "Finge un orgasmo cada vez que elimines a alguien en la próxima prueba. ¡+40 PM por cada uno!",
    "Dibuja un corazón con sangre (tuya o de otros) en el pecho de [PARTICIPANTE]. ¡+30 PM!",
    "¡Propón matrimonio a [PARTICIPANTE] en medio de la próxima prueba! ¡+60 PM!",
    "Simula una escena de celos con [PARTICIPANTE] y [PARTICIPANTE]. ¡Drama triangular! ¡+45 PM!",
    "Recita poesía erótica mientras realizas un asesinato. ¡Contraste artístico! ¡+50 PM!",
    "Convence a dos participantes para hacer un 'sándwich' contigo en cámara. ¡+70 PM!",
    
    // --- Retos violentos ---
    "Arranca un implante ocular de un concursante caído y úsalo como amuleto. ¡+65 PM!",
    "Dibuja una 'sonrisa' con tu cuchillo en el rostro de tu próxima víctima. ¡+70 PM!",
    "Decapita a tu próximo oponente y usa su cabeza como trofeo. ¡+100 PM!",
    "Desafía a #01 Goliath a una pelea de sangre: el primero en sangrar pierde. ¡+80 PM si ganas!",
    "Aplasta los implantes neurales de tu próximo enemigo caído. ¡+60 PM!",
    "Crea una 'obra de arte' macabra con partes de tus enemigos. ¡+75 PM!",
    "¡Extrae la columna vertebral cibernética de un oponente derrotado! ¡+90 PM!",
    "Usa los huesos de un enemigo para crear un arma improvisada. ¡+55 PM!",
    "Realiza el antiguo ritual 'ShinkuKiri' (corte profundo): heridas rituales en brazos con [PARTICIPANTE]. ¡+85 PM!",
    "Crea una 'trampa humana' usando un cadáver como cebo. ¡+70 PM!",
    "Marca tu símbolo personal en los cuerpos de 5 oponentes derrotados. ¡+100 PM!",
    "Consume un trozo de carne de un oponente caído. ¡+120 PM por este acto extremo!",
    "Crea un collar con dientes de tus víctimas. ¡+90 PM!",
    "Graba un mensaje en la piel de un enemigo derrotado para el siguiente que lo encuentre. ¡+65 PM!",
    "¡Realiza una ejecución al estilo antiguo samurái (seppuku) a un oponente! ¡+110 PM!",
    
    // --- Retos humorísticos ---
    "¡Imita a un pollo cada vez que elimines a alguien por 24 horas! ¡+25 PM!",
    "Convence a [PARTICIPANTE] de que eres un agente encubierto de un reality show DENTRO del reality show. ¡+30 PM!",
    "Finge que tienes un amigo imaginario que te da consejos durante toda la prueba. ¡+35 PM!",
    "¡Narra TODAS tus acciones en tercera persona por una hora! ¡+20 PM!",
    "¡Comunícate SOLO por mímica con tu equipo durante la próxima prueba! ¡+40 PM!",
    "Convence a [PARTICIPANTE] de que tienes visiones del futuro... ¡basadas en sus flatulencias! ¡+45 PM!",
    "¡Actúa como si tu arma fuera tu pareja romántica por 24 horas! ¡+50 PM!",
    "Inventa un idioma nuevo y úsalo exclusivamente con [PARTICIPANTE]. ¡+30 PM!",
    "¡Realiza un noticiero improvisado narrando las muertes de otros concursantes! ¡+40 PM!",
    "Convence a tres concursantes de que tienen implantes secretos de control mental. ¡+60 PM!",
    "¡Crea un musical improvisado durante un tiroteo! ¡+70 PM!",
    "¡Declara que tu implante te permite hablar con los muertos y 'transmite' mensajes de concursantes caídos! ¡+55 PM!",
    "¡Convierte tu próxima misión en un tutorial estilo influencer! ¡+45 PM!",
    "¡Establece un 'puesto de besos' en medio de la zona de combate! ¡+60 PM por cada cliente!",
    "¡Realiza una subasta falsa vendiendo partes corporales de otros concursantes! ¡+50 PM!",
    
    // --- Retos de llamada a la acción ---
    "Comienza una revuelta contra OCE reuniendo a 5 concursantes. ¡+200 PM si sobrevives!",
    "Graba un mensaje para tu familia como si fuera tu último día (podría serlo). ¡+40 PM!",
    "¡Realiza un sacrificio ritual a los 'Dioses de Battle Royale' usando sangre y tecnología! ¡+85 PM!",
    "Intenta establecer un 'territorio neutral' donde los concursantes puedan comerciar. ¡+120 PM!",
    "¡Forma una 'banda' con otros 3 concursantes y den un 'concierto' en plena zona de batalla! ¡+95 PM!",
    "¡Establece tu propia religión con al menos 3 seguidores! ¡+150 PM!",
    "¡Haz una transmisión pirata al público revelando secretos de OCE! ¡+180 PM si lo logras!",
    "¡Desafía públicamente a Kaiser a participar en una prueba! ¡+100 PM!",
    "¡Organiza un 'juicio' para [PARTICIPANTE] con jurado y todo! ¡+90 PM!",
    "¡Convence a 10 concursantes de intercambiar implantes entre sí! ¡+130 PM!",
    "¡Establece un sistema de gobierno democrático entre los concursantes! ¡+160 PM!",
    "¡Crea tu propia prueba alternativa y convence a otros de participar! ¡+140 PM!",
    "¡Establece un 'muro de los caídos' honrando a los concursantes eliminados! ¡+70 PM!",
    "¡Organiza una 'olimpiada' con competencias absurdas entre pruebas! ¡+110 PM!",
    "¡Crea y distribuye tu propio periódico con chismes y noticias del programa! ¡+80 PM!",
    
    // --- Retos adicionales ---
    "Cámbialo todo: tu nombre, apariencia, personalidad y equipo por 24 horas. ¡+50 PM!",
    "¡Inventa una trágica historia de amor con [PARTICIPANTE] que acabó en tragedia! ¡+35 PM!",
    "¡Actúa como si fueras un robot con errores de programación por 6 horas! ¡+45 PM!",
    "¡Convence a [PARTICIPANTE] de que ambos eran pareja antes del programa pero le borraron la memoria! ¡+60 PM!",
    "¡Realiza una 'sesión de terapia' para [PARTICIPANTE] en medio del caos! ¡+40 PM!",
    "¡Crea un altar con tecnología de concursantes caídos! ¡+55 PM!",
    "¡Actúa como si tuvieras múltiples personalidades por 12 horas! ¡+70 PM!",
    "¡Marca territorios con sangre como un animal y defiéndelos a muerte! ¡+80 PM!",
    "¡Busca a todos los concursantes con un número par y ofréceles una alianza especial! ¡+50 PM!",
    "¡Redecora tu zona de descanso con partes de androides y drones destruidos! ¡+45 PM!",
    "Envía un 'mensaje de amor' a [PARTICIPANTE] a través del sistema de comunicación principal. ¡+40 PM!",
    "¡Crea una 'tienda' alternativa intercambiando objetos personales con otros! ¡+60 PM!",
    "¡Trata de convencer a todos de que eres un infiltrado de OCE! ¡+65 PM!",
    "¡Finge tu propia 'ascensión' espiritual a una forma de vida superior! ¡+70 PM!",
    "¡Actúa como locutor deportivo narrando tus propias batallas! ¡+35 PM!",
    "¡Establece un código de honor personal y síguelo estrictamente! ¡+55 PM!",
    "¡Realiza un 'talk show' improvisado entrevistando a otros concursantes! ¡+65 PM!",
    "¡Crea una coreografía de combate con [PARTICIPANTE] y ejecútenla en su próxima batalla! ¡+75 PM!",
    "¡Haz que [PARTICIPANTE] y [PARTICIPANTE] compitan por tu afecto! ¡+80 PM!",
    "¡Finge ser un viajero del tiempo enviado para prevenir una catástrofe! ¡+60 PM!",
    "¡Lánzate a un ataque suicida contra 3 oponentes a la vez mientras gritas tu nombre! ¡+95 PM si sobrevives!",
    "¡Realiza un 'intercambio de cuerpos' falso con [PARTICIPANTE]! ¡+55 PM!",
    "¡Investiga y revela un 'complot' ficticio entre concursantes! ¡+70 PM!",
    "¡Empieza a hablar en rimas durante 24 horas! ¡+45 PM!",
    "¡Comienza tu propia secta tecnológica adorando los implantes! ¡+85 PM!"
];

// Combinamos los retos originales con los nuevos
const retosEspecificos = [...retosEspecificosOriginales, ...retosEspecificosNuevos];

// Función para generar mensajes aleatorios
function generarMensajeAleatorio() {
    let usuario, color, mensaje;
    
    // Intentar usar el sistema contextual si está disponible
    if (window.getCurrentContextualMessages && window.getContextualUsernames) {
        try {
            const contextualMessages = window.getCurrentContextualMessages();
            const contextualUsernames = window.getContextualUsernames();
            
            if (contextualMessages && contextualMessages.length > 0) {
                // Usar sistema contextual
                usuario = contextualUsernames[Math.floor(Math.random() * contextualUsernames.length)];
                color = colorPaleta[Math.floor(Math.random() * colorPaleta.length)];
                
                // 80% mensajes contextuales, 20% retos específicos (para mantener variedad)
                if (Math.random() < 0.8) {
                    mensaje = contextualMessages[Math.floor(Math.random() * contextualMessages.length)];
                } else {
                    mensaje = retosEspecificos[Math.floor(Math.random() * retosEspecificos.length)];
                    // Reemplazar [PARTICIPANTE] si existe en el mensaje
                    if (mensaje.includes("[PARTICIPANTE]")) {
                        const participante = participantesDisponibles[Math.floor(Math.random() * participantesDisponibles.length)];
                        mensaje = mensaje.replace("[PARTICIPANTE]", participante);
                        // Si hay un segundo [PARTICIPANTE], reemplazarlo con otro distinto
                        if (mensaje.includes("[PARTICIPANTE]")) {
                            let segundoParticipante;
                            do {
                                segundoParticipante = participantesDisponibles[Math.floor(Math.random() * participantesDisponibles.length)];
                            } while (segundoParticipante === participante);
                            mensaje = mensaje.replace("[PARTICIPANTE]", segundoParticipante);
                        }
                    }
                }
            } else {
                throw new Error('No hay mensajes contextuales disponibles');
            }
        } catch (error) {
            console.warn('⚠️ Sistema contextual no disponible, usando mensajes de fallback:', error.message);
            // Fallback al sistema original
            usuario = nombresUsuarios[Math.floor(Math.random() * nombresUsuarios.length)];
            color = colorPaleta[Math.floor(Math.random() * colorPaleta.length)];
            
            // 70% mensajes generales, 30% retos específicos
            if (Math.random() < 0.7) {
                mensaje = mensajesGenerales[Math.floor(Math.random() * mensajesGenerales.length)];
            } else {
                mensaje = retosEspecificos[Math.floor(Math.random() * retosEspecificos.length)];
                if (mensaje.includes("[PARTICIPANTE]")) {
                    const participante = participantesDisponibles[Math.floor(Math.random() * participantesDisponibles.length)];
                    mensaje = mensaje.replace("[PARTICIPANTE]", participante);
                    if (mensaje.includes("[PARTICIPANTE]")) {
                        let segundoParticipante;
                        do {
                            segundoParticipante = participantesDisponibles[Math.floor(Math.random() * participantesDisponibles.length)];
                        } while (segundoParticipante === participante);
                        mensaje = mensaje.replace("[PARTICIPANTE]", segundoParticipante);
                    }
                }
            }
        }
    } else {
        // Fallback al sistema original si no hay sistema contextual
        usuario = nombresUsuarios[Math.floor(Math.random() * nombresUsuarios.length)];
        color = colorPaleta[Math.floor(Math.random() * colorPaleta.length)];
        
        // 70% mensajes generales, 30% retos específicos
        if (Math.random() < 0.7) {
            mensaje = mensajesGenerales[Math.floor(Math.random() * mensajesGenerales.length)];
        } else {
            mensaje = retosEspecificos[Math.floor(Math.random() * retosEspecificos.length)];
            if (mensaje.includes("[PARTICIPANTE]")) {
                const participante = participantesDisponibles[Math.floor(Math.random() * participantesDisponibles.length)];
                mensaje = mensaje.replace("[PARTICIPANTE]", participante);
                if (mensaje.includes("[PARTICIPANTE]")) {
                    let segundoParticipante;
                    do {
                        segundoParticipante = participantesDisponibles[Math.floor(Math.random() * participantesDisponibles.length)];
                    } while (segundoParticipante === participante);
                    mensaje = mensaje.replace("[PARTICIPANTE]", segundoParticipante);
                }
            }
        }
    }
    
    return {
        usuario: usuario,
        color: color,
        mensaje: mensaje,
        destacado: Math.random() < 0.2, // 20% de mensajes destacados
        esReto: mensaje.includes("¡+") || mensaje.includes("PM si") || mensaje.includes("PM!") || mensaje.includes("PM.")
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
        
        // Mantener solo los últimos 15 mensajes (aumentado para mostrar más variedad)
        const mensajes = chatContainer.querySelectorAll('.chat-message');
        if (mensajes.length > 15) {
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

// Función global para actualizar mensajes automáticos (usada por el sistema contextual)
window.updateAutoMessages = function() {
    console.log('🔄 Actualizando mensajes automáticos con nuevo contexto');
    // No necesitamos hacer nada especial aquí - generarMensajeAleatorio() 
    // ya usa el sistema contextual automáticamente
};

// Función para verificar el sistema contextual
function verificarSistemaContextual() {
    setTimeout(() => {
        console.log('🎭 Verificando integración del sistema contextual en mensajes públicos...');
        
        if (window.getCurrentContextualMessages && window.getContextualUsernames) {
            try {
                const mensajes = window.getCurrentContextualMessages();
                const usuarios = window.getContextualUsernames();
                
                console.log(`✅ Sistema contextual integrado correctamente`);
                console.log(`📨 ${mensajes.length} mensajes contextuales disponibles`);
                console.log(`👥 ${usuarios.length} usuarios contextuales disponibles`);
                
                // Verificar ofertas de PM
                const pmMessages = mensajes.filter(msg => msg.includes('+') && msg.includes('PM!'));
                console.log(`💰 ${pmMessages.length} mensajes con ofertas PM detectados`);
                
                // Mostrar ejemplo
                if (mensajes.length > 0) {
                    console.log('🎯 Ejemplo de mensaje contextual:', mensajes[0]);
                }
                
            } catch (error) {
                console.warn('⚠️ Error verificando sistema contextual:', error);
            }
        } else {
            console.warn('⚠️ Sistema contextual no disponible aún, usando mensajes de fallback');
        }
    }, 3000); // Esperar 3 segundos para que se cargue todo
}

// Inicializar el widget cuando la página se cargue
window.addEventListener('DOMContentLoaded', () => {
    inicializarChatWidget();
    verificarSistemaContextual();
});