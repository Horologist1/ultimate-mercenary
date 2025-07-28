document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Tab functionality for character sheets
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and tab contents
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding tab content
            const contentId = this.getAttribute('data-tab');
            document.getElementById(contentId).classList.add('active');
        });
    });

    // Merit points calculator
    const meritCalculator = document.getElementById('merit-calculator');
    if (meritCalculator) {
        meritCalculator.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const basePoints = parseInt(document.getElementById('base-points').value) || 0;
            const tasksCompleted = parseInt(document.getElementById('tasks-completed').value) || 0;
            const bonusPoints = parseInt(document.getElementById('bonus-points').value) || 0;
            const penalties = parseInt(document.getElementById('penalties').value) || 0;
            
            const totalPoints = basePoints + (tasksCompleted * 50) + bonusPoints - penalties;
            
            document.getElementById('total-points').textContent = totalPoints;
            document.getElementById('result-container').style.display = 'block';
        });
    }

    // Random NPC generator
    const npcGenerator = document.getElementById('npc-generator');
    if (npcGenerator) {
        npcGenerator.addEventListener('click', function() {
            const names = [
                "Vex", "Scythe", "Chrome", "Pulse", "Nova", "Jinx", "Cipher", "Zero", "Eclipse", "Vortex",
                "Glitch", "Phantom", "Spectre", "Wraith", "Shade", "Circuit", "Wire", "Byte", "Dart", "Fuse"
            ];
            
            const archetypes = [
                "Tanque/Matón", "Técnico/Hacker", "Infiltrador/Asesino", "Superviviente Equilibrado", 
                "Combatiente Salvaje", "Netrunner Nervioso", "Mercenario Cínico", "Médico de Combate",
                "Tirador de Élite", "Negociador Astuto"
            ];
            
            const backgrounds = [
                "Ex-militar caído en desgracia", "Criminal de los barrios bajos", "Antiguo corporativo despojado",
                "Deudor con la mafia yakuza", "Adicto a modificaciones ilegales", "Fugitivo de un experimento",
                "Paciente terminal sin nada que perder", "Ex-guardaespaldas de un político asesinado",
                "Científico con secretos peligrosos", "Artista callejero con contactos en el bajo mundo"
            ];
            
            const traits = [
                "Nervioso y paranoico", "Frío y calculador", "Volátil e impredecible", "Disciplinado y metódico",
                "Sarcástico y mordaz", "Optimista a pesar de todo", "Vengativo y rencoroso", "Leal a sus aliados",
                "Pragmático ante todo", "Idealista oculto"
            ];
            
            const randomName = names[Math.floor(Math.random() * names.length)];
            const randomArchetype = archetypes[Math.floor(Math.random() * archetypes.length)];
            const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
            const randomTrait = traits[Math.floor(Math.random() * traits.length)];
            
            document.getElementById('npc-name').textContent = randomName;
            document.getElementById('npc-archetype').textContent = randomArchetype;
            document.getElementById('npc-background').textContent = randomBackground;
            document.getElementById('npc-trait').textContent = randomTrait;
            
            document.getElementById('npc-result').style.display = 'block';
        });
    }

    // Random event generator
    const eventGenerator = document.getElementById('event-generator');
    if (eventGenerator) {
        eventGenerator.addEventListener('click', function() {
            const events = [
                "Interferencia inesperada de Kaiser, quien cambia las reglas a mitad de la prueba.",
                "Un grupo de concursantes forma una alianza y planea una emboscada en el próximo área.",
                "OCE libera un 'cazador especial' para aumentar la emoción y eliminar a los rezagados.",
                "Fallo de sistemas: las cámaras se apagan temporalmente, creando un punto ciego de 5 minutos.",
                "Prueba sorpresa de resistencia: gas nervioso no letal inunda el área, -2 a todas las acciones.",
                "Oportunidad de mérito: OCE deja caer un contenedor de suministros exclusivos para el primero que lo alcance.",
                "Un concursante herido ofrece información valiosa a cambio de ayuda médica.",
                "Sistema de seguridad defectuoso ataca a todos los presentes indiscriminadamente.",
                "Aparece un terminal de OCE desprotegido, accesible para hackeo durante un breve periodo.",
                "Intervención médica: OCE ofrece curación completa al concursante más entretenido del día."
            ];
            
            const randomEvent = events[Math.floor(Math.random() * events.length)];
            document.getElementById('random-event').textContent = randomEvent;
            document.getElementById('event-result').style.display = 'block';
        });
    }

    // Tooltips for game terms
    document.querySelectorAll('.tooltip').forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function() {
            const tooltipText = this.querySelector('.tooltip-text');
            
            // Adjust position if tooltip would go off screen
            const rect = tooltipText.getBoundingClientRect();
            if (rect.left < 0) {
                tooltipText.style.marginLeft = -rect.left + 'px';
            } else if (rect.right > window.innerWidth) {
                tooltipText.style.marginLeft = -(rect.right - window.innerWidth) + 'px';
            }
        });
    });

    // Equipment cost calculator
    const equipmentSelects = document.querySelectorAll('.equipment-select');
    if (equipmentSelects.length > 0) {
        equipmentSelects.forEach(select => {
            select.addEventListener('change', calculateEquipmentTotal);
        });
        
        function calculateEquipmentTotal() {
            let total = 0;
            
            equipmentSelects.forEach(select => {
                const selectedOption = select.options[select.selectedIndex];
                const cost = parseInt(selectedOption.getAttribute('data-cost')) || 0;
                total += cost;
            });
            
            document.getElementById('equipment-total').textContent = total;
        }
        
        // Initial calculation
        calculateEquipmentTotal();
    }

    // Terminal effect animation
    const terminals = document.querySelectorAll('.data-terminal');
    if (terminals.length > 0) {
        terminals.forEach(terminal => {
            const text = terminal.textContent;
            terminal.innerHTML = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    terminal.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, Math.random() * 20 + 10);
                }
            }
            
            typeWriter();
        });
    }

    // Glitch text effect
    document.querySelectorAll('.glitch-text').forEach(element => {
        const text = element.textContent;
        element.setAttribute('data-text', text);
    });
});

// Character Sheet Manager
class CharacterSheet {
    constructor() {
        this.aptitudes = {
            vig: 10,
            coo: 10,
            int: 10,
            ref: 10,
            wil: 10,
            sav: 10
        };
        
        this.skills = {};
        this.equipment = [];
        this.implants = [];
    }
    
    updateAptitude(apt, value) {
        this.aptitudes[apt] = value;
        this.updateDerivedStats();
    }
    
    addSkill(name, value) {
        this.skills[name] = value;
    }
    
    addEquipment(item) {
        this.equipment.push(item);
    }
    
    addImplant(implant) {
        this.implants.push(implant);
    }
    
    updateDerivedStats() {
        // HP calculation based on VIG
        this.healthPoints = this.aptitudes.vig * 2;
        
        // Initiative based on REF and INT
        this.initiative = Math.floor((this.aptitudes.ref + this.aptitudes.int) / 3);
        
        // Wound threshold based on VIG and WIL
        this.woundThreshold = Math.floor((this.aptitudes.vig + this.aptitudes.wil) / 5);
    }
    
    exportToJSON() {
        return JSON.stringify({
            aptitudes: this.aptitudes,
            skills: this.skills,
            equipment: this.equipment,
            implants: this.implants,
            healthPoints: this.healthPoints,
            initiative: this.initiative,
            woundThreshold: this.woundThreshold
        });
    }
    
    importFromJSON(json) {
        const data = JSON.parse(json);
        this.aptitudes = data.aptitudes;
        this.skills = data.skills;
        this.equipment = data.equipment;
        this.implants = data.implants;
        this.healthPoints = data.healthPoints;
        this.initiative = data.initiative;
        this.woundThreshold = data.woundThreshold;
    }
}

// Initialize character sheet if form exists
const characterForm = document.getElementById('character-form');
if (characterForm) {
    const characterSheet = new CharacterSheet();
    
    // Update character sheet when form changes
    characterForm.addEventListener('change', function(e) {
        const target = e.target;
        
        if (target.classList.contains('aptitude-input')) {
            const aptitude = target.getAttribute('data-aptitude');
            const value = parseInt(target.value) || 10;
            characterSheet.updateAptitude(aptitude, value);
            
            // Update derived stats display
            document.getElementById('hp-display').textContent = characterSheet.healthPoints;
            document.getElementById('init-display').textContent = characterSheet.initiative;
            document.getElementById('wt-display').textContent = characterSheet.woundThreshold;
        }
    });
    
    // Save character sheet
    document.getElementById('save-character').addEventListener('click', function() {
        const json = characterSheet.exportToJSON();
        localStorage.setItem('savedCharacter', json);
        alert('¡Personaje guardado correctamente!');
    });
    
    // Load character sheet
    document.getElementById('load-character').addEventListener('click', function() {
        const saved = localStorage.getItem('savedCharacter');
        if (saved) {
            characterSheet.importFromJSON(saved);
            
            // Update form with loaded values
            for (const apt in characterSheet.aptitudes) {
                document.querySelector(`[data-aptitude="${apt}"]`).value = characterSheet.aptitudes[apt];
            }
            
            // Update derived stats display
            document.getElementById('hp-display').textContent = characterSheet.healthPoints;
            document.getElementById('init-display').textContent = characterSheet.initiative;
            document.getElementById('wt-display').textContent = characterSheet.woundThreshold;
            
            alert('¡Personaje cargado correctamente!');
        } else {
            alert('No hay ningún personaje guardado.');
        }
    });
}
// Generadores de encuentros específicos para cada prueba
document.addEventListener('DOMContentLoaded', function() {
    // Prueba 0: La Caída
    const generateBtn0 = document.getElementById('generate-prueba0');
    if (generateBtn0) {
        generateBtn0.addEventListener('click', function() {
            const encounterType = document.getElementById('encounter-type-prueba0').value;
            const resultDiv = document.getElementById('encounter-result-prueba0');
            
            let encounters = {
                social: [
                    "Un concursante asustado se acerca a pedir alianza, pero actúa sospechosamente.",
                    "Silas 'Glitch' ofrece información a cambio de protección en la primera prueba.",
                    "Un grupo de 3 concursantes está intimidando a Lin Mayfair en un rincón del hangar.",
                    "Chispa está intentando abrir un panel de mantenimiento y te ve observándola.",
                    "Un hombre mayor con aire militar (Marcus Thorne) está evaluando silenciosamente a los demás concursantes."
                ],
                information: [
                    "Escuchas a dos guardias hablar sobre 'las zonas sin cámaras' en el próximo desafío.",
                    "Encuentras un mensaje oculto en tu equipo básico advirtiendo sobre una emboscada en la primera prueba.",
                    "Un concursante con aspecto enfermizo menciona haber sido un técnico de mantenimiento de OCE antes de ser 'reclutado'.",
                    "Ves a Kaiser hablando en privado con uno de los concursantes, parecen conocerse de antes.",
                    "Notas que algunos monos tienen una marca discreta diferente, podría indicar algo especial."
                ],
                threat: [
                    "Jinx está probando su cuchillo nuevo muy cerca de ti, con una sonrisa inquietante.",
                    "Goliath está estableciendo su dominio amenazando a cualquiera que se acerque a su espacio.",
                    "Los drones de vigilancia parecen seguirte específicamente a ti durante más tiempo que a otros.",
                    "Un guardia de OCE parece tenerte especial antipatía y te empuja al pasar.",
                    "Te das cuenta de que alguien ha manipulado la funda de tu arma, haciéndola más difícil de desenvainar."
                ],
                opportunity: [
                    "Descubres un compartimento oculto en tu mono con un pequeño kit médico básico.",
                    "Observas que uno de los paneles de ventilación parece estar suelto, podría ofrecer un camino alternativo.",
                    "Un técnico de OCE deja caer accidentalmente una tarjeta de acceso cerca de ti.",
                    "Mientras todos están distraídos con el discurso de Kaiser, notas un terminal desatendido.",
                    "Encuentras un mapa parcial del complejo esbozado en la pared de un baño."
                ]
            };
            
            const randomIndex = Math.floor(Math.random() * encounters[encounterType].length);
            const selectedEncounter = encounters[encounterType][randomIndex];
            
            resultDiv.innerHTML = `<h4>Encuentro: ${encounterType.charAt(0).toUpperCase() + encounterType.slice(1)}</h4>
                                 <p>${selectedEncounter}</p>`;
        });
    }
    
    // Prueba 1: Carrera de Obstáculos
    const generateBtn1 = document.getElementById('generate-prueba1');
    if (generateBtn1) {
        generateBtn1.addEventListener('click', function() {
            const encounterType = document.getElementById('encounter-type-prueba1').value;
            const resultDiv = document.getElementById('encounter-result-prueba1');
            
            let encounters = {
                obstacle: [
                    "Una serie de cuchillas rotativas bloquea el camino, activándose en un patrón que debe ser estudiado para atravesarlas.",
                    "Un puente colapsado sobre un foso electrificado, con solo una viga estrecha para cruzar (Atletismo TN 15).",
                    "Varias prensas hidráulicas que se activan y desactivan, requiriendo un timing perfecto para pasar.",
                    "Suelo inestable que se hunde progresivamente, obligando a correr rápido o quedar atrapado.",
                    "Una pared de contenedores que se mueve, creando un laberinto que cambia constantemente."
                ],
                environmental: [
                    "Una nube de gas irritante reduce la visibilidad a 2 metros y causa tos incontrolable (-10 a todas las acciones).",
                    "Zona inundada con agua electrificada, los cables expuestos causan descargas aleatorias.",
                    "Tubería sobrecalentada que explota, liberando vapor a presión causando quemaduras graves.",
                    "Sección con gravedad reducida debido a un generador de campo experimental, altera el salto y el movimiento.",
                    "Fuego que se propaga rápidamente bloqueando una ruta que parecía segura."
                ],
                contestant: [
                    "Goliath empuja a los concursantes más débiles hacia las trampas para abrirse paso.",
                    "Un grupo de concursantes desesperados ha formado una barricada para ganar tiempo.",
                    "Jinx ha saboteado una sección del recorrido, riéndose mientras observa desde lejos.",
                    "Un concursante herido suplica ayuda, bloqueando parcialmente un pasaje estrecho.",
                    "Dos concursantes luchan por un token de datos OCE, ignorando el peligro a su alrededor."
                ],
                equipment: [
                    "Tu pistola se encasquilla debido a un defecto de fabricación justo cuando la necesitas.",
                    "La suela de una de tus botas se desprende, reduciendo tu estabilidad y velocidad.",
                    "El mono protector tiene una rasgadura que se agrava con el movimiento, exponiendo tu piel.",
                    "Tu comunicador emite un pitido intermitente que atrae la atención de las torretas automáticas.",
                    "La linterna incorporada en tu equipo básico parpadea y falla en una zona oscura."
                ],
                opportunity: [
                    "Descubres un conducto de mantenimiento no vigilado que permite evitar una sección peligrosa.",
                    "Una torreta defectuosa puede ser hackeada para que ataque a otros concursantes (Interfaz TN 12).",
                    "Un guardia distraído ha dejado un kit médico avanzado al alcance.",
                    "Un panel suelto revela un espacio con un token de datos OCE oculto deliberadamente por OCE.",
                    "Un fallo en el sistema de seguridad ha dejado una puerta de acceso directo desbloqueada temporalmente."
                ]
            };
            
            const randomIndex = Math.floor(Math.random() * encounters[encounterType].length);
            const selectedEncounter = encounters[encounterType][randomIndex];
            
            resultDiv.innerHTML = `<h4>Encuentro: ${encounterType.charAt(0).toUpperCase() + encounterType.slice(1)}</h4>
                                 <p>${selectedEncounter}</p>`;
        });
    }
    
    // Prueba 2: Cosecha Sangrienta
    const generateBtn2 = document.getElementById('generate-prueba2');
    if (generateBtn2) {
        generateBtn2.addEventListener('click', function() {
            const encounterType = document.getElementById('encounter-type-prueba2').value;
            const resultDiv = document.getElementById('encounter-result-prueba2');
            
            let encounters = {
                creature: [
                    "Un Terror-Maíz juvenil, más pequeño pero extremadamente ágil, embosca desde el maizal.",
                    "Enjambre de Cosechadores Reptantes emergiendo de un nido subterráneo, rodeando a los concursantes.",
                    "Criatura anfibia mutante acecha en una zona inundada, arrastrando a sus presas bajo el agua.",
                    "Planta carnívora híbrida que camufla sus tentáculos como enredaderas normales.",
                    "Ser bioluminiscente que flota entre la niebla, emitiendo esporas paralizantes."
                ],
                drone: [
                    "Agro-Drone con sierra circular que funciona erráticamente, atacando todo lo que detecta.",
                    "Drone de fumigación liberando sustancias tóxicas que causan alucinaciones temporales.",
                    "Unidad de riego reconfigurada para disparar agua a presión capaz de cortar metal.",
                    "Drone de polinización que inyecta toxinas mediante aguijones metálicos extensibles.",
                    "Sistema de vigilancia aéreo que marca objetivos para otros drones mediante láser."
                ],
                team: [
                    "Equipo liderado por Raven que ha establecido una emboscada en un cruce estratégico.",
                    "Grupo desesperado que intenta robar las Neuro-Flores ya recolectadas por otros.",
                    "Alianza temporal de supervivientes que intercambian flores por protección.",
                    "Equipo traicionado desde dentro, uno de sus miembros trabaja secretamente para otro grupo.",
                    "Concursantes que han domesticado parcialmente a un Cosechador Reptante y lo usan como guardia."
                ],
                hazard: [
                    "Niebla espesa con esporas neurotóxicas que causan desorientación progresiva.",
                    "Sección de laboratorio con contenedores de patógenos rotos, requiere máscara respiratoria.",
                    "Campo de plantas que liberan polen altamente inflamable, cualquier chispa causaría una explosión.",
                    "Zona de radiación residual que daña equipos electrónicos y causa náuseas.",
                    "Suelo saturado de sustancias químicas corrosivas que dañan el calzado y eventualmente la piel."
                ],
                resource: [
                    "Clúster de Neuro-Flores particularmente densas, pero custodiado por un Terror-Maíz dormido.",
                    "Laboratorio abandonado con equipo médico avanzado y algunas muestras de antitoxinas.",
                    "Drone de mantenimiento desactivado que podría ser reparado y reprogramado (Interfaz/Hardware TN 14).",
                    "Alijo de armas escondido por concursantes anteriores, incluyendo munición especial.",
                    "Terminal de investigación aún funcional con datos sobre las debilidades de las criaturas mutantes."
                ]
            };
            
            const randomIndex = Math.floor(Math.random() * encounters[encounterType].length);
            const selectedEncounter = encounters[encounterType][randomIndex];
            
            resultDiv.innerHTML = `<h4>Encuentro: ${encounterType.charAt(0).toUpperCase() + encounterType.slice(1)}</h4>
                                 <p>${selectedEncounter}</p>`;
        });
    }
    
    // Prueba 3: Entrega Express
    const generateBtn3 = document.getElementById('generate-prueba3');
    if (generateBtn3) {
        generateBtn3.addEventListener('click', function() {
            const encounterType = document.getElementById('encounter-type-prueba3').value;
            const resultDiv = document.getElementById('encounter-result-prueba3');
            
            let encounters = {
                patrol: [
                    "Escuadra de 3 soldados Pacificadores con un dron Watcher, patrullando metódicamente.",
                    "Unidad de Élite OCE con armadura pesada y visión térmica, buscando activamente intrusos.",
                    "Patrulla mixta de humanos y drones en formación de búsqueda en cuadrícula.",
                    "Equipo de reconocimiento ligero con equipo de sigilo y rifles de precisión.",
                    "Unidad de respuesta rápida descendiendo de un AV, desplegándose agresivamente."
                ],
                rival: [
                    "Equipo liderado por Subject Omega emboscando desde una posición elevada.",
                    "Grupo que ya ha obtenido un maletín y está siendo perseguido, pueden servir como distracción.",
                    "Alianza rota: concursantes en pleno conflicto interno por el maletín que acaban de recuperar.",
                    "Supervivientes heridos que ofrecen información sobre rutas seguras a cambio de suministros médicos.",
                    "Francotirador solitario (posiblemente Raven) que elimina objetivos estratégicamente."
                ],
                civilian: [
                    "Trabajador de mantenimiento atrapado que conoce códigos de acceso a zonas restringidas.",
                    "Investigador corporativo escondido con información sobre qué contienen realmente los maletines.",
                    "Familia local que sobrevive en la zona de cuarentena, pueden ofrecer refugio temporal.",
                    "Ex-guardia OCE herido que revela los patrones de las patrullas por venganza.",
                    "Periodista infiltrado recopilando pruebas sobre las actividades ilegales de OCE."
                ],
                tactical: [
                    "Centro de comunicaciones abandonado que permite interceptar transmisiones de OCE.",
                    "Depósito de agua elevado que ofrece posición de ventaja y visibilidad sobre la zona.",
                    "Túnel de mantenimiento que conecta varios edificios, evitando exposición en calles.",
                    "Clínica clandestina con suministros médicos y equipo para tratar heridas graves.",
                    "Vehículo blindado abandonado que puede ofrecer cobertura o incluso ser reparado."
                ],
                tech: [
                    "Sistema de cámaras de seguridad hackeable que permite observar movimientos enemigos.",
                    "Torretas automáticas que pueden ser reprogramadas para atacar a las patrullas OCE.",
                    "Generador de interferencia que crea una zona muerta para comunicaciones y sensores.",
                    "Sistema de puertas de seguridad con fallos que permite acceso a zonas restringidas.",
                    "Terminal conectada a la red interna de OCE, con potencial para acceder a información clasificada."
                ]
            };
            
            const randomIndex = Math.floor(Math.random() * encounters[encounterType].length);
            const selectedEncounter = encounters[encounterType][randomIndex];
            
            resultDiv.innerHTML = `<h4>Encuentro: ${encounterType.charAt(0).toUpperCase() + encounterType.slice(1)}</h4>
                                 <p>${selectedEncounter}</p>`;
        });
    }
});

// Botón para volver arriba
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
