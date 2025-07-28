// Generadores de encuentros para las distintas pruebas de Ultimate Mercenary
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    // Prueba 0: La Caída
    const encounterTypesPrueba0 = {
        conflict: [
            "Dos concursantes se pelean por un pequeño kit médico que alguien dejó caer. La pelea está escalando rápidamente. (Intimidación TN 14 para detenerlos, o puedes intentar robar el kit durante la confusión)",
            "Goliath está intimidando a un concursante más débil, exigiéndole que le entregue su cuchillo de combate básico. (Intervenir podría ganarte un enemigo poderoso o un aliado agradecido)",
            "Un grupo de 3 concursantes está formando una alianza y parece que están evaluando a quién reclutar o atacar a continuación. (Sigilo TN 12 para escuchar sus planes sin ser detectado)",
            "Dos concursantes están discutiendo sobre una interpretación de las reglas de Kaiser. La discusión se está calentando y podría volverse violenta. (Persuasión TN 14 para calmar los ánimos)",
            "Un concursante acusa a otro de haberle robado su equipo inicial durante el transporte. No está claro quién dice la verdad. (Observación TN 16 para detectar quién miente)",
            "Una pelea a puñetazos ha estallado entre dos concursantes. Uno claramente tiene ventaja y podría matar al otro si nadie interviene. (Decisión moral: intervenir o aprovechar la distracción)"
        ],
        npc: [
            "Raven observa fríamente desde una esquina. Parece estar evaluando metódicamente a cada concursante. Si te acercas, te ofrece una alianza pragmática basada en capacidades complementarias, no en confianza.",
            "Chispa está reuniendo a un pequeño grupo, prometiendo que juntos tienen más posibilidades. Parece sincera pero ingenua. (Intuición TN 14 para evaluar si su optimismo es una desventaja)",
            "Lin está teniendo un ataque de pánico en un rincón. Claramente no pertenece a este lugar. Ayudarla podría garantizarte lealtad, pero también sería una carga. (Primeros Auxilios o Persuasión TN 12)",
            "Silas está examinando disimuladamente los sistemas de seguridad. Si te acercas con cautela, podría compartir información sobre posibles puntos débiles a cambio de protección inicial.",
            "Subject Omega está absolutamente inmóvil, observando todo con una mirada inquietante. Si intentas interactuar, apenas responde, pero parece registrar cada detalle sobre ti. (Intimidación inefectiva)",
            "Un miembro del personal de OCE con traje de mantenimiento está comprobando algunos sistemas. No debería estar interactuando con los concursantes, pero parece dispuesto a vender información por el cuchillo inicial de alguien."
        ],
        info: [
            "Escuchas a un técnico de OCE hablando con otro sobre un fallo en la sección este del sistema de seguridad que será reparado después de la primera prueba. Podrías explotar esta vulnerabilidad. (Sigilo/Hackeo)",
            "Encuentras un PDA olvidado por un trabajador. Contiene un mapa parcial de la instalación, incluyendo algunas rutas de servicio no mencionadas en la introducción oficial. (Hackeo TN 14 para desbloquear más información)",
            "Un concursante que parece tener experiencia militar susurra a su nuevo aliado algo sobre \"puntos ciegos en las torretas del nivel 1\". No te ha visto escuchando. (Información útil para la Prueba 1)",
            "Notas que uno de los concursantes parece demasiado cómodo, como si ya conociera el lugar. Observándolo disimuladamente, lo ves hacer un gesto de reconocimiento sutil a uno de los guardias. (¿Infiltrado de OCE?)",
            "Al examinar el equipo inicial, descubres que el mono gris tiene un bolsillo oculto con un pequeño compartimento. El tuyo está vacío, pero quizás otros no revisaron este detalle. (Hurto TN 14 para revisar otros monos)",
            "Un concursante veterano de aspecto curtido comparte con un pequeño grupo: \"El truco está en los Puntos de Mérito. He visto programas similares. OCE siempre pone trampas en la tienda—cosas que parecen útiles pero tienen desventajas ocultas.\" (Consejo valioso)"
        ],
        resource: [
            "Ves que uno de los técnicos de OCE dejó olvidada una pequeña bolsa de herramientas básicas durante la preparación. Está parcialmente oculta debajo de una consola. (Sigilo TN 16 para recuperarla sin ser visto)",
            "Uno de los concursantes parece enfermo y debilitado. Está disimulando, pero podría ser fácil convencerlo de entregarte su cuchillo a cambio de protección. (Persuasión/Engaño TN 12)",
            "Descubres que uno de los paneles de la pared está suelto. Detrás hay un pequeño espacio que podría servir como escondite para objetos pequeños. (Recurso estratégico para más adelante)",
            "Un concursante acaba de morir de lo que parece un ataque cardíaco o una complicación médica. Nadie está prestando atención a su equipo en este momento. (Oportunidad con riesgo moral)",
            "Has notado que el sistema de distribución de agua tiene un filtro que podría ser convertido en un improvisado purificador químico. Sería útil en futuras pruebas. (Ingeniería TN 16 para extraerlo sin dañarlo)",
            "Un pequeño grupo de concursantes ha encontrado una manera de abrir las raciones de emergencia ocultas en uno de los paneles. Están distraídos repartiéndoselas. (Oportunidad para robo o negociación)"
        ],
        threat: [
            "Un dron de seguridad está haciendo un barrido no programado del área. Parece tener sensores más avanzados que los drones estándar mencionados en la introducción. (Sigilo TN 18 para evitar detección)",
            "El comportamiento de Kaiser en la pantalla cambia sutilmente. Parece estar observando específicamente tu sección. Ha notado algo que le interesa. (Sensación inquietante de ser vigilado)",
            "Un guardia de seguridad de OCE con equipamiento pesado entra para escoltar a un técnico. No debería interactuar con los concursantes, pero parece particularmente agresivo y busca pretextos para intervenir.",
            "El sistema de ventilación hace un ruido extraño y comienza a liberar un gas ligeramente brumoso. Probablemente sea inofensivo, pero algunos concursantes ya están mostrando signos de paranoia. (VIG×3 para resistir ansiedad)",
            "Escuchas una conversación entre dos guardias sobre \"activar el protocolo de limpieza\" para los concursantes que parezcan demasiado débiles para la primera prueba. (Amenaza inminente para los vulnerables)",
            "Notas que los implantes de monitorización inyectados durante el \"reclutamiento\" emiten un pulso ocasional. Un concursante con conocimientos médicos susurra que podrían hacer más que solo monitorizar. (Posible medio de control o eliminación)"
        ]
    };

    // Función auxiliar para inicializar generadores
    function initGenerator(buttonId, selectId, resultId, encounters, typeLabels) {
        console.log('Initializing generator:', buttonId, selectId, resultId);
        const button = document.getElementById(buttonId);
        console.log('Button found:', button);
        
        if (button) {
            button.addEventListener('click', function() {
                console.log('Button clicked');
                const select = document.getElementById(selectId);
                const resultElement = document.getElementById(resultId);
                
                console.log('Select found:', select);
                console.log('Result element found:', resultElement);
                
                if (!select || !resultElement) {
                    console.error('Elementos del generador no encontrados');
                    return;
                }
                
                const encounterType = select.value;
                console.log('Selected encounter type:', encounterType);
                
                if (!encounterType) {
                    resultElement.innerHTML = '<p>Por favor, selecciona un tipo de encuentro primero.</p>';
                    return;
                }
                
                // Seleccionar un encuentro aleatorio del tipo elegido
                const selectedEncounters = encounters[encounterType];
                if (!selectedEncounters || selectedEncounters.length === 0) {
                    resultElement.innerHTML = '<p>No hay encuentros disponibles para este tipo.</p>';
                    return;
                }
                
                const randomEncounter = selectedEncounters[Math.floor(Math.random() * selectedEncounters.length)];
                console.log('Random encounter selected:', randomEncounter);
                
                // Obtener el texto del tipo de encuentro
                const typeText = typeLabels[encounterType] || "Encuentro";
                
                // Extraer TNs y datos específicos del encuentro
                const tnMatch = randomEncounter.match(/\(([^)]+)\)/);
                const tnInfo = tnMatch ? tnMatch[1] : '';
                
                // Separar la descripción del encuentro de los datos técnicos
                const description = randomEncounter.split('(')[0].trim();
                
                // Mostrar el resultado con formato mejorado
                resultElement.innerHTML = `
                    <div class="encounter-result-content">
                        <p><strong>${typeText}:</strong> ${description}</p>
                        ${tnInfo ? `<p class="encounter-details"><strong>Detalles Técnicos:</strong> ${tnInfo}</p>` : ''}
                    </div>
                `;
                console.log('Result updated');
            });
        }
    }

    // Inicializar generadores para cada prueba
    initGenerator('generate-encounter-type-0', 'encounter-type-0', 'encounter-result-0', encounterTypesPrueba0, {
        conflict: "Conflicto entre concursantes",
        npc: "Interacción con PNJ destacado",
        info: "Descubrimiento de información",
        resource: "Oportunidad de recursos",
        threat: "Amenaza inmediata"
    });

    // Prueba 1: Carrera de Obstáculos Infernal
    initGenerator('generate-encounter-type-1', 'encounter-type-1', 'encounter-result-1', {
        obstacle: [
            "Un puente de metal oxidado que cruza sobre un foso. Tiene secciones visiblemente debilitadas y se balancea al pisarlo.",
            "Una pared vertical de 5 metros con escasos puntos de agarre. El suelo detrás de ti empieza a calentarse peligrosamente.",
            "Un túnel estrecho con ventiladores industriales que amenazan con succionar cualquier cosa que pase por él.",
            "Una serie de plataformas móviles sobre un abismo. Cada plataforma solo soporta peso durante 3 segundos antes de caer.",
            "Una sección donde el techo está descendiendo lentamente, obligando a todos a pasar arrastrándose cada vez más rápido.",
            "Un laberinto de contenedores con paredes que cambian de posición aleatoriamente cada 30 segundos."
        ],
        hazard: [
            "Chorros de vapor supercalentado que emergen aleatoriamente del suelo (Daño 1d10, Quemaduras).",
            "Una sección donde el suelo está electrificado. Hay cables colgando que podrían usarse para balancearse por encima.",
            "Una sala llena de gas somnífero. Cada turno requiere una tirada de VIG (TN 10+) para no caer dormido.",
            "Paneles de suelo que se activan con el peso y disparan dardos desde las paredes (Daño 1d10, posible veneno).",
            "Una cascada de aceite industrial inflamable. Al fondo hay chispas eléctricas que amenazan con incendiarlo todo.",
            "Un campo de minas sónicas no letales. Cada explosión aturde a todos en un radio de 3 metros durante 1d6 segundos."
        ],
        competitor: [
            "Goliath está usando su fuerza para mover un obstáculo. Podría ayudarte... o lanzártelo encima si le molestas.",
            "Un grupo de concursantes está trabajando juntos para superar un obstáculo. Puedes unirte o intentar pasar por tu cuenta.",
            "Alguien ha caído y está colgando de una cornisa, pidiendo ayuda desesperadamente.",
            "Un concursante herido te ofrece sus tokens de datos si le ayudas a llegar a la meta.",
            "Descubres a alguien saboteando un puente justo cuando estás a punto de cruzarlo.",
            "Jinx está causando caos, activando deliberadamente trampas y riendo maniacamente."
        ],
        resource: [
            "Un técnico muerto con su kit de herramientas intacto. Podría usarse para desactivar algunas trampas.",
            "Un botiquín de primeros auxilios caído de algún concursante previo.",
            "Un atajo potencialmente peligroso que podría ahorrarte minutos cruciales.",
            "Un panel de control que podría desactivar temporalmente las trampas en una sección cercana.",
            "Un dron de mantenimiento dañado que aún podría funcionar para reconocimiento si se repara rápidamente.",
            "Una reserva de bebidas energéticas experimentales (+1 a todas las tiradas físicas durante 10 minutos, luego -1 durante 20)."
        ],
        critical: [
            "Una sección del techo colapsa repentinamente, bloqueando el camino principal y obligando a tomar una ruta alternativa más peligrosa.",
            "Los drones pastores comienzan a volverse más agresivos, ahora atacando incluso a quienes no están rezagados.",
            "Kaiser anuncia que solo quedan 5 minutos para que se cierre la meta, acelerando desesperadamente a todos.",
            "Un Token de Datos especial (¡vale 100 PM!) aparece en una zona extremadamente peligrosa.",
            "Una pelea masiva estalla en un embotellamiento, convirtiéndose en un todos contra todos.",
            "Un sistema de eliminación automatizado se activa, anunciando que en 60 segundos eliminará a todos los que estén en determinada sección."
        ]
    }, {
        obstacle: "Obstáculo físico",
        hazard: "Peligro ambiental",
        competitor: "Encuentro con otro concursante",
        resource: "Recurso u oportunidad",
        critical: "Momento crítico"
    });

    // Prueba 2: Cosecha Sangrienta
    initGenerator('generate-encounter-type-2', 'encounter-type-2', 'encounter-result-2', {
        creature: [
            "Un enjambre de 2d6 Cosechadores Reptantes emerge de entre la vegetación, atraídos por el movimiento.",
            "Un Terror-Maíz está patrullando cerca. Su visor biomecánico escanea el área periódicamente.",
            "Murciélagos modificados genéticamente con aguijones venenosos anidan en el techo del invernadero.",
            "Una criatura parecida a una planta carnívora ha crecido enormemente y tiene movilidad limitada.",
            "Ratas del tamaño de perros pequeños con implantes cibernéticos visibles, aparentemente recolectando muestras.",
            "Un híbrido entre mantis religiosa y maquinaria agrícola, de unos 2 metros de alto, con brazos-guadaña."
        ],
        drone: [
            "Un Agro-Dron que dispara pesticidas tóxicos en un patrón aleatorio.",
            "Dron fumigador que está emitiendo una nube de esporas paralizantes.",
            "Dron de seguridad con visión nocturna que patrulla buscando intrusos.",
            "Un enjambre de mini-drones polinizadores que ahora atacan cualquier cosa que se mueva.",
            "Dron cosechador con cuchillas giratorias que corta indiscriminadamente plantas y carne.",
            "Un dron de mantenimiento parcialmente dañado que podría ser reprogramado si alguien tiene habilidades técnicas."
        ],
        rival: [
            "Un equipo rival ha tendido una emboscada cerca de un grupo de Neuro-Flores.",
            "Dos miembros de otro equipo están heridos y proponen una alianza temporal.",
            "Un equipo completo está cazando sistemáticamente a otros concursantes en lugar de recolectar flores.",
            "Un miembro de otro equipo ofrece información valiosa a cambio de medicinas o protección.",
            "Un grupo ha encontrado un almacén de herramientas y está defendiéndolo agresivamente.",
            "Señales de una batalla reciente entre equipos: sangre, casquillos de bala y equipo abandonado."
        ],
        terrain: [
            "Un sector del invernadero con cristales rotos que llueven desde arriba con cada ráfaga de viento.",
            "Una sección inundada con agua que muestra signos de contaminación química.",
            "Espinas genéticamente modificadas que pueden atravesar ropa normal y contienen sedante.",
            "Un campo de plantas que liberan esporas alucinógenas cuando se las molesta.",
            "Suelo inestable que puede colapsar a pozos de compostaje industrial de 3 metros de profundidad.",
            "Una zona donde la vegetación ha sido alterada para crecer a velocidad visible, pudiendo enredar a quienes se quedan quietos."
        ],
        discovery: [
            "Un pequeño invernadero intacto con una concentración inusual de Neuro-Flores (1d6+2).",
            "El cadáver de un investigador con notas sobre la ubicación de un laboratorio secreto con equipo valioso.",
            "Un terminal activo que muestra mapas detallados de toda la instalación.",
            "Un cultivo experimental de plantas medicinales que podrían usarse como curativo de emergencia.",
            "Equipo agrícola abandonado que podría modificarse como armas improvisadas.",
            "Un sistema de riego que podría activarse para eliminar las esporas tóxicas del aire en una sección grande."
        ]
    }, {
        creature: "Criatura hostil",
        drone: "Dron defectuoso",
        rival: "Equipo rival",
        terrain: "Peligro del terreno",
        discovery: "Descubrimiento"
    });

    // Prueba 3: Entrega Express
    initGenerator('generate-encounter-type-3', 'encounter-type-3', 'encounter-result-3', {
        patrol: [
            "Una patrulla de 3 soldados Pacificador OCE está realizando un registro sistemático de un edificio cercano.",
            "Dos soldados escoltan a un oficial de mayor rango que lleva información que podría ser valiosa.",
            "Una patrulla completa (3 soldados) descansa en un puesto de control, con la guardia relativamente baja.",
            "Un soldado solitario realiza mantenimiento a un dron Watcher. Su equipo está a un minuto de distancia.",
            "Una patrulla herida que ha tenido un encuentro con otro equipo. Están alertas pero debilitados.",
            "Una unidad de élite (4 soldados con mejor equipo) que ejecuta una misión especial no relacionada con los concursantes."
        ],
        surveillance: [
            "Cámaras de seguridad activas que cubren la entrada principal de un edificio estratégico.",
            "Un dron Watcher patrulla en un patrón predecible, con un punto ciego evidente en su ruta.",
            "Sensores de movimiento camuflados que dispararán una alarma silenciosa si se activan.",
            "Un puesto de escucha automatizado que analiza todas las comunicaciones en el área.",
            "Torretas de defensa automáticas (actualmente en modo inactivo) que podrían activarse remotamente.",
            "Un sistema de seguridad biométrico que requiere identificación OCE para acceder a un área restringida."
        ],
        rival: [
            "Un equipo rival ha establecido una posición defensiva cerca del objetivo, esperando emboscar a otros.",
            "Dos miembros de un equipo rival están heridos y podrían negociar o ser emboscados fácilmente.",
            "Un francotirador solitario de otro equipo vigila una ruta clave desde una posición elevada.",
            "Un equipo completo avanza hacia la misma ubicación, aún no han notado vuestra presencia.",
            "Señales de un conflicto reciente entre equipos rivales, con rastros de sangre que llevan a una posición potencialmente ventajosa.",
            "Un miembro de otro equipo ofrece una alianza temporal contra un tercer equipo especialmente bien equipado."
        ],
        urban: [
            "Un edificio parcialmente colapsado con suelos inestables que podrían ceder con peso adicional.",
            "Una fuga de gas en un área cerrada, creando riesgo de explosión con cualquier chispa o disparo.",
            "Cables eléctricos caídos que han formado charcos electrificados después de la lluvia reciente.",
            "Un nido de ratas mutadas que atacan cualquier cosa que entre en su territorio.",
            "Una zona con alta radiación residual que causa daño gradual sin protección adecuada.",
            "Un estrecho pasaje entre edificios que ofrece un atajo pero es extremadamente vulnerable a emboscadas."
        ],
        opportunity: [
            "Un depósito de suministros OCE sin vigilancia con medicinas y munición.",
            "Un punto elevado con excelente visibilidad sobre múltiples rutas de aproximación al objetivo.",
            "Un terminal de seguridad abandonado que aún tiene acceso a algunas cámaras y puertas del sector.",
            "Un túnel de mantenimiento que permite bypass completamente un área fuertemente vigilada.",
            "Un vehículo OCE dañado pero funcional que podría utilizarse para una extracción rápida.",
            "Un antiguo búnker civil que proporciona un lugar seguro para descansar y planificar el siguiente movimiento."
        ]
    }, {
        patrol: "Patrulla OCE",
        surveillance: "Sistema de vigilancia",
        rival: "Equipo rival",
        urban: "Peligro urbano",
        opportunity: "Oportunidad táctica"
    });
});