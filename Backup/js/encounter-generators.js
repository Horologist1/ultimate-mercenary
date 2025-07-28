document.addEventListener('DOMContentLoaded', function() {
    // Generadores para Prueba 0: La Caída
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
    
    // Generadores para Prueba 1: Carrera de Obstáculos
    const encounterTypesPrueba1 = {
        obstacle: [
            "Foso Electrificado: Un abismo de 2 metros de ancho con agua electrificada en el fondo. (Atletismo TN 16 para saltar, 2d10 daño eléctrico por caída)",
            "Pasarela Colapsada: Una pasarela industrial parcialmente derrumbada. La sección central cuelga precariamente y podría ceder con peso adicional. (Atletismo TN 14, pero el segundo y posteriores sufren -5 acumulativo)",
            "Muro de Escombros: Una barricada de escombros metálicos y concreto, demasiado alta para saltarla. (Atletismo TN 16 para escalar, riesgo de cortes por bordes afilados)",
            "Cintas Transportadoras Cruzadas: Varias cintas transportadoras industriales en movimiento a diferentes velocidades y direcciones. (Atletismo TN 14, penalización de -10 a ataques mientras se está en las cintas)",
            "Túnel de Ventilación con Turbinas: Un estrecho túnel de mantenimiento con ventiladores industriales creando vientos fuertes y turbulencias. (Atletismo TN 15, personajes voluminosos o con mucho equipo sufren +5 dificultad)",
            "Campo de Tuberías de Vapor: Una red de tuberías industriales que liberan chorros de vapor a alta presión en intervalos semi-regulares. (Percepción TN 14 para predecir patrones, VIG×2 para resistir daño por quemaduras)"
        ],
        hazard: [
            "Área de Gas Tóxico: Una nube de gas irritante ocupa una sección de 10 metros. (VIG×3 para contener la respiración y cruzar rápido, o sufrir -20 a todas las acciones por 1d6 turnos)",
            "Prensa Hidráulica Automática: Una masiva prensa industrial que se activa en intervalos regulares, aplastando todo lo que esté debajo. (REF×3 para sincronizar y pasar entre ciclos)",
            "Zona de Gravedad Aumentada: Un área experimental donde la gravedad es 3 veces mayor. (VIG×2 para moverse a velocidad normal, fracaso significa velocidad reducida a 1/3)",
            "Red de Sensores Láser: Una matriz invisible de sensores que activan torretas cercanas cuando se interrumpen. (Sigilo TN 18 para pasar sin activarlos, o Hackeo TN 16 para desactivarlos temporalmente)",
            "Piso Magnético Electrificado: Una sección del suelo que alterna entre atraer objetos metálicos y electrificarlos. (REF×3 para sincronizar movimientos, o dejar todo equipamiento metálico atrás)",
            "Zona de Desechos Radiactivos: Un área contaminada con radiación residual moderada. (Exposición breve causa fatiga, exposición prolongada causa 1d10 daño por turno, ignorando armadura)"
        ],
        competitor: [
            "Goliath está bloqueando un pasaje estrecho, exigiendo \"peaje\" (equipo o PM prometidos) para dejar pasar. (Intimidación, Persuasión o Combate, cada opción con sus consecuencias)",
            "Un grupo de tres concursantes ha formado una barricada improvisada y embosca a quien pase solo. (Sigilo TN 16 para evitarlos, o enfrentar desventaja numérica)",
            "Raven ofrece una alianza temporal para superar un obstáculo particularmente difícil, pero su mirada calculadora sugiere que podría traicionarte después. (Dilema de confianza)",
            "Un concursante herido pide ayuda desesperadamente. Está atrapado bajo escombros y no puede liberarse solo. Ayudarlo costará tiempo valioso. (Decisión moral con consecuencias)",
            "Dos concursantes están luchando ferozmente sobre un puente estrecho, bloqueando el paso. (Puedes esperar, intentar pasar a través de ellos, o encontrar una ruta alternativa más larga)",
            "Un concursante parece estar sufriendo los efectos de algún gas tóxico y está disparando erráticamente en todas direcciones, creando una zona de peligro. (Sigilo o convencerlo para que se calme)"
        ],
        resource: [
            "Token de Datos OCE: Uno de los valiosos tokens mencionados en los objetivos secundarios. Está en una plataforma de difícil acceso, custodiado por una torreta automatizada. (Riesgo/Recompensa significativa)",
            "Kit Médico Completo: Un botiquín de primeros auxilios de alta calidad, probablemente dejado por algún técnico de OCE. Está en una zona parcialmente colapsada. (Atletismo TN 16 para alcanzarlo sin causar un derrumbe)",
            "Ración de Combate Premium: Una ración militar de alta calidad, mucho mejor que las básicas proporcionadas. Restauraría energía y eliminaría penalizadores por fatiga. (Escondida en un compartimento de mantenimiento)",
            "Herramientas de Hackeo Básicas: Un pequeño dispositivo que podría ayudar a manipular sistemas electrónicos simples. (Percepción TN 14 para notar el brillo de la pantalla entre los escombros)",
            "Munición Especial: Un pequeño paquete con 6 balas de alta penetración para la pistola estándar. (Pertenecían a un concursante ahora muerto, atrapado bajo una placa de metal)",
            "Mapa Parcial de la Instalación: Un PDA con información sobre la sección siguiente del recorrido, incluyendo ubicación de peligros. (En el bolsillo de un técnico de mantenimiento inconsciente o muerto)"
        ],
        critical: [
            "¡Colapso Estructural Inminente! La sección entera del recorrido empieza a temblar y mostrar signos de colapso. Tienes 3 turnos para cruzar antes de que todo se venga abajo. (Atletismo a máxima velocidad, decisiones rápidas)",
            "Dron Supervisor de OCE: Un dron especial transmitiendo en vivo para la audiencia está grabando esta sección. Buen momento para destacar con alguna hazaña impresionante. (Oportunidad para ganar popularidad)",
            "Punto de No Retorno: Llegas a una bifurcación donde uno de los caminos parece más seguro pero largo, y el otro más peligroso pero rápido. Una vez tomada la decisión, no podrás volver atrás. (Elección estratégica crítica)",
            "¡Sobrecarga del Sistema! Los sistemas eléctricos de la zona fallan catastróficamente, desactivando algunas defensas pero también creando nuevos peligros eléctricos. (Oportunidad y peligro simultáneos)",
            "Enfrentamiento con Dron Pastor: Uno de los temidos Drones Pastor ha fijado su atención en ti por quedarte atrás. Tienes segundos para acelerar o enfrentarlo. (Combate extremadamente peligroso)",
            "Momento de Audiencia: Las cámaras y la atención se centran brevemente en ti. Kaiser hace un comentario sobre tu desempeño que toda la audiencia escucha. (Momento para impactar en el rating, con posibles ofertas de PM en el chat)"
        ]
    };
    
    // Generadores para Prueba 2: Cosecha Sangrienta
    const encounterTypesPrueba2 = {
        creature: [
            "Enjambre de Cosechadores Reptantes: 2d6 de estas criaturas insectoides emergen de entre la vegetación modificada, moviéndose en un patrón de caza coordinado. (Combate contra múltiples objetivos, Intimidación ineficaz)",
            "Terror-Maíz Alfa: Una de las temidas criaturas alfa, más grande que las variantes estándar. Su coraza biomecánica refleja parcialmente la luz y muestra cicatrices de combates anteriores. (Combate extremadamente peligroso, mejor en grupo)",
            "Cosechador Gigante: Una variante enormemente aumentada de los Cosechadores estándar, del tamaño de un automóvil pequeño. Más lento pero muchísimo más fuerte. (Daño 3d10, Armadura 5, movilidad reducida)",
            "Simbiosis Vegetal-Insectoide: Una criatura que parece una fusión de planta e insecto, camuflada entre la vegetación. Ataca con zarcillos y secreciones paralizantes. (Percepción TN 18 para detectarla antes de acercarse demasiado)",
            "Larvas Parasitarias: Pequeñas criaturas que intentan adherirse a la piel o entrar por heridas abiertas. No son inmediatamente peligrosas, pero causan enfermedad gradual si no se eliminan. (VIG×3 cada hora para resistir efectos)",
            "Polinizadores Tóxicos: Criaturas voladoras similares a libélulas gigantes que dispersan un polen neurotóxico. No atacan directamente pero su presencia envenena el aire. (Contener respiración o improvisar máscara)"
        ],
        drone: [
            "Agro-Drones en Formación: Un grupo de 3-5 drones agrícolas rearmados que operan en perfecta sincronía, cubriendo los puntos débiles de cada uno. (Táctica recomendada: separación)",
            "Dron Fumigador: Una unidad de fumigación reprogramada que dispersa productos químicos dañinos en un radio de 10 metros. (VIG×2 para resistir efectos, puede ser hackeable con TN 16)",
            "Segador Automático: Un masivo dron de cosecha con cuchillas rotatorias, operando con patrones de movimiento erráticos. (Extremadamente peligroso en espacios confinados, pero predecible en campo abierto)",
            "Dron de Análisis Corrupto: Una unidad científica que intenta tomar \"muestras\" de tejido de los concursantes para análisis. (No letal inicialmente, pero causa heridas y atrae depredadores)",
            "Enjambre de Micro-Drones: Cientos de diminutos drones que forman una nube móvil. Individualmente inofensivos, pero pueden abrumar colectivamente y causar asfixia. (Vulnerables a pulsos electromagnéticos)",
            "Dron Centinela Camuflado: Una unidad de vigilancia avanzada disfrazada como vegetación. No ataca directamente, pero alerta a otros drones y criaturas hostiles. (Hackeo TN 14 para reprogramar a tu favor)"
        ],
        rival: [
            "Equipo Cazador: Un equipo rival ha adoptado una estrategia agresiva, emboscando a otros equipos para robar sus Neuro-Flores ya recolectadas. (Sigilo TN 16 para detectar la emboscada antes de caer en ella)",
            "Alianza Oportunista: Dos miembros de equipos distintos están cooperando temporalmente, violando las reglas del equipo. Podrías reportarlos a Kaiser (ganando PM) o unirte a su alianza. (Decisión estratégica)",
            "Equipo en Conflicto: Un equipo rival está teniendo una disputa interna violenta. Es una buena oportunidad para atacar o para pasar inadvertido. (También hay riesgo de que resuelvan diferencias y se unan contra un objetivo común)",
            "Francotirador Paciente: Un concursante de otro equipo con un arma de largo alcance está acechando desde una posición elevada, eliminando objetivos oportunistas. (Percepción TN 18 para detectar antes de entrar en su línea de tiro)",
            "Trampa Preparada: Un equipo ha colocado una trampa elaborada usando tecnología agrícola y conocimientos de ingeniería. (Percepción TN 16 para detectarla, o VIG×3 para minimizar daño si se activa)",
            "Equipo Diezmado: Encuentras lo que queda de un equipo rival masacrado por criaturas o drones. Uno está todavía con vida, rogando ayuda. Tiene información valiosa pero ralentizaría tu avance. (Dilema moral)"
        ],
        terrain: [
            "Campo de Esporas Alucinógenas: Un área donde crecen hongos que liberan esporas psicoactivas. Causan alucinaciones y confusión temporal. (WIL×3 para resistir efectos, duración 1d6×10 minutos)",
            "Invernadero Inundado: Una sección parcialmente sumergida debido a sistemas de irrigación dañados. El agua está contaminada con fertilizantes y productos químicos. (Nadar TN 14, riesgo de infección en heridas abiertas)",
            "Trampa de Arena Biotecnológica: Un área donde el suelo se comporta como arenas movedizas pero parece reaccionar activamente, casi con inteligencia, para atrapar a las presas. (Atletismo TN 16 para escapar, dificultad aumenta con tiempo)",
            "Zona de Radiación Experimental: Un sector donde se realizaban experimentos con cultivos resistentes a la radiación. Los niveles son bajos pero constantes, causando fatiga y mareos graduales. (VIG×2 cada 30 minutos de exposición)",
            "Pasaje de Zarzas Carnívoras: Una densa red de plantas similares a zarzas con espinas que parecen moverse para atrapar a quienes pasan. (Sigilo/Atletismo TN 15 para pasar sin heridas graves)",
            "Bolsillo de Gas Natural: Una zona donde el suelo libera constantemente gas natural. No es tóxico pero es altamente inflamable. Cualquier chispa o disparo podría causar una explosión. (Zona de alto riesgo para combate)"
        ],
        discovery: [
            "Neuro-Flor Mutante: Una variante rara de las Neuro-Flores objetivo que parece más grande y luminiscente. Vale por 2-3 flores normales pero emite una señal más fuerte que atrae criaturas. (Riesgo/Recompensa)",
            "Laboratorio Oculto: Un pequeño laboratorio de investigación camuflado donde se realizaban experimentos no autorizados. Contiene suministros médicos y posiblemente armas o datos valiosos. (Exploración con potenciales recompensas)",
            "Refugio de Emergencia: Un búnker de seguridad para el personal técnico, ahora abandonado. Ofrece un lugar seguro temporal pero está parcialmente comprometido. (Descanso seguro breve, posibles suministros)",
            "Terminal de Control Agrícola: Una estación de trabajo que permite controlar algunos sistemas de riego y nutrientes. Podría usarse para crear distracciones o trampas. (Hackeo TN 16 para manipular sistemas)",
            "Depósito Genético: Un almacén de muestras genéticas y compuestos experimentales. Podría contener potenciadores temporales de fuerza o resistencia, pero con efectos secundarios desconocidos. (Riesgo/Beneficio situacional)",
            "Nido de Cosechadores Abandonado: Un nido recientemente abandonado que contiene restos de presas anteriores, incluyendo equipo de concursantes eliminados y posiblemente algunas Neuro-Flores almacenadas. (Percepción TN 14 para encontrar objetos útiles)"
        ]
    };
    
    // Generadores para Prueba 3: Entrega Express
    const encounterTypesPrueba3 = {
        patrol: [
            "Patrulla Estándar OCE: Tres soldados 'Pacificador' con armamento y equipo estándar. Siguen un patrón de patrulla predecible. (Sigilo TN 16 para evitar, Combate táctico si se enfrentan)",
            "Equipo de Respuesta Rápida: Cinco soldados OCE en un vehículo ligero, respondiendo a una alerta cercana. No están buscándote específicamente pero están en alerta máxima. (Mejor evitar completamente)",
            "Patrulla de Reconocimiento: Dos soldados OCE 'Fantasma' con equipamiento para sigilo y detección avanzada. Mucho más difíciles de detectar y evadir. (Sigilo TN 20, Percepción TN 18 para detectarlos primero)",
            "Oficial de Élite con Escolta: Un oficial OCE de alto rango con dos guardaespaldas personales. Todos llevan equipamiento superior. El oficial tiene acceso a códigos de seguridad valiosos. (Objetivo de alto valor/riesgo)",
            "Patrulla Aérea con Dron: Dos soldados estándar coordinados con un dron Watcher que amplía significativamente su rango de detección. (Hackeo TN 18 para cegar al dron temporalmente)",
            "Patrulla de Perímetro: Cuatro soldados revisando y reforzando barricadas y puntos de control. Están distraídos con su tarea actual. (Oportunidad para pasar o eliminación silenciosa)"
        ],
        surveillance: [
            "Red de Cámaras Térmicas: Un conjunto de cámaras fijas que detectan calor corporal incluso a través de coberturas ligeras. (Hackeo TN 16 para crear bucle de grabación o punto ciego temporal)",
            "Dron Watcher Estacionario: Un dron de vigilancia en modo estático, cubriendo una intersección clave. Tiene un patrón de escaneo regular con un punto ciego temporal. (Tiempo preciso para pasar)",
            "Torre de Vigilancia Automatizada: Una estructura alta con sistemas de detección avanzados y una torreta ligera. Cubre un área amplia pero tiene limitaciones en clima adverso. (Explotar condiciones ambientales)",
            "Sistema de Sensores Sísmicos: Sensores en el suelo que detectan vibraciones de pasos y movimiento. Particularmente sensibles en áreas pavimentadas. (Movimiento extremadamente lento o usar escombros como cobertura)",
            "Escáner Biométrico de Área: Un dispositivo que analiza patrones biométricos en un radio medio. Puede distinguir entre personal OCE y concursantes. (Hackeo TN 20 o encontrar identificación OCE)",
            "Red de Comunicaciones Encriptadas: No es vigilancia directa, pero interceptar estas comunicaciones revelaría patrones de patrulla y respuesta. (Hackeo TN 18 con equipo especializado)"
        ],
        rival: [
            "Emboscada de Equipo Rival: Un equipo competidor ha preparado una emboscada en lo que parece un paso seguro. Esperan eliminar competencia o robar el maletín. (Percepción TN 16 para detectar señales)",
            "Francotirador Solitario: Un concursante con habilidades de tiro a distancia y un rifle apropiado está eliminando sistemáticamente a miembros de equipos rivales desde una posición elevada. (Sigilo o contraemboscada)",
            "Falsa Bandera: Un equipo usando uniformes o identificaciones OCE falsificadas para moverse más libremente. Podrían ser aliados potenciales o competidores engañosos. (Intuición TN 16 para evaluar intenciones)",
            "Equipo en Crisis: Un equipo rival ha perdido a varios miembros y está considerando retirarse. Podrían ofrecer información valiosa a cambio de paso seguro o alianza. (Negociación o eliminación de competencia debilitada)",
            "Trampa Tecnológica: Un equipo técnicamente hábil ha configurado una trampa electrónica que parece un terminal de acceso o punto de datos legítimo. (Hackeo TN 16 para detectar o desactivar)",
            "Señuelo y Emboscada: Un equipo ha dejado deliberadamente pistas falsas sobre la ubicación del objetivo, esperando que otros equipos pierdan tiempo o caigan en trampas. (Intuición/Análisis TN 14 para detectar inconsistencias)"
        ],
        urban: [
            "Edificio a Punto de Colapsar: Una estructura severamente dañada que podría derrumbarse en cualquier momento, especialmente con peso o vibraciones adicionales. (Ruta rápida pero extremadamente peligrosa)",
            "Zona de Radiación Residual: Un área con niveles elevados de radiación debido a daños en sistemas experimentales. Exposición prolongada causa náuseas y debilitamiento. (VIG×2 cada 10 minutos de exposición)",
            "Nube de Gas Tóxico: Una fuga de productos químicos industriales ha creado una nube densa y tóxica que causa daño respiratorio y dificulta la visión. (Improvisar protección respiratoria o buscar ruta alternativa)",
            "Campo de Escombros Inestable: Una zona donde los escombros están precariamente equilibrados, cualquier perturbación podría causar avalanchas o abrir huecos en el suelo. (Atletismo TN 16, minimizar ruido)",
            "Cableado Eléctrico Expuesto: Una red de cables de alta tensión dañados que ocasionalmente sueltan descargas eléctricas. (REF×3 para evitar descargas repentinas, o VIG×3 para resistir daño)",
            "Fosa Séptica Rota: Una sección donde las aguas residuales han inundado el nivel inferior. El agua está contaminada y posiblemente tóxica, pero ofrece una ruta alternativa poco vigilada. (VIG×2 para evitar enfermedades)"
        ],
        opportunity: [
            "Terminal de Seguridad Desatendido: Un puesto de control momentáneamente abandonado con acceso a sistemas de seguridad locales. (Hackeo TN 14, tiempo limitado antes del regreso del operador)",
            "Cambio de Guardia: Un momento breve donde los patrones de patrulla dejan un corredor temporalmente sin vigilancia durante el relevo. (Ventana de oportunidad de 2-3 minutos)",
            "Distracción Natural: Un incidente no relacionado (colapso estructural, incendio menor, etc.) ha atraído la atención de la seguridad lejos de tu ruta objetivo. (Oportunidad situacional)",
            "Credencial de Acceso: Un técnico OCE abatido o inconsciente con tarjeta de identificación de nivel medio. Usarla implica riesgo de ser descubierto, pero ofrece acceso a áreas restringidas. (Disfraz/Engaño)",
            "Conducto de Mantenimiento: Una entrada a la red de mantenimiento y servicios que corre paralela a la ruta principal. Estrecha y ocasionalmente peligrosa, pero sin vigilancia directa. (Atletismo TN 14 para navegar eficientemente)",
            "Informante Interno: Un empleado de OCE descontento ofrece información sobre rotaciones de seguridad y puntos débiles a cambio de garantía de extracción cuando finalice el programa. (Evaluación de confiabilidad)"
        ]
    };

    // Función auxiliar para inicializar generadores
    function initGenerator(buttonId, selectId, resultId, encounters, typeLabels) {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', function() {
                const select = document.getElementById(selectId);
                const resultElement = document.getElementById(resultId);
                
                if (!select || !resultElement) {
                    console.error('Elementos del generador no encontrados');
                    return;
                }
                
                const encounterType = select.value;
                
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
    
    initGenerator('generate-encounter-type-1', 'encounter-type-1', 'encounter-result-1', encounterTypesPrueba1, {
        obstacle: "Obstáculo físico",
        hazard: "Peligro ambiental",
        competitor: "Encuentro con otro concursante",
        resource: "Recurso u oportunidad",
        critical: "Momento crítico"
    });
    
    initGenerator('generate-encounter-type-2', 'encounter-type-2', 'encounter-result-2', encounterTypesPrueba2, {
        creature: "Criatura hostil",
        drone: "Dron defectuoso",
        rival: "Equipo rival",
        terrain: "Peligro del terreno",
        discovery: "Descubrimiento"
    });
    
    initGenerator('generate-encounter-type-3', 'encounter-type-3', 'encounter-result-3', encounterTypesPrueba3, {
        patrol: "Patrulla de OCE",
        surveillance: "Sistema de vigilancia",
        rival: "Equipo rival",
        urban: "Peligro urbano",
        opportunity: "Oportunidad"
    });
}); 