// Generador de eventos para las pruebas
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar secciones colapsables
    const collapsibleSections = document.querySelectorAll('.collapsible');
    collapsibleSections.forEach(section => {
        const header = section.querySelector('.section-header');
        if (header) {
            header.addEventListener('click', () => {
                section.classList.toggle('collapsed');
            });
        }
        // Inicializar como colapsado
        section.classList.add('collapsed');
    });

    // Inicializar modal de imágenes
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close-modal');

    // Función para abrir el modal
    window.openImageModal = function(imgSrc) {
        modal.classList.add('show');
        modalImg.src = imgSrc;
        document.body.style.overflow = 'hidden'; // Prevenir scroll
    }

    // Cerrar modal al hacer clic en la X
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('show');
            document.body.style.overflow = ''; // Restaurar scroll
        });
    }

    // Cerrar modal al hacer clic fuera de la imagen
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }

    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    const eventTypeSelect = document.getElementById('event-type');
    const generateEventButton = document.getElementById('generate-event');
    const eventResult = document.getElementById('event-result');

    // Definición de eventos por tipo con sus dificultades
    const events = {
        environmental: [
            {
                description: "Una nube de gas tóxico se desliza por el área, reduciendo la visibilidad y causando daño por turno.",
                difficulty: "DC 20",
                effects: "Daño 1d10 por turno, -2 a Percepción"
            },
            {
                description: "El suelo comienza a vibrar, indicando la activación de trampas ocultas en los próximos 30 segundos.",
                difficulty: "DC 25",
                effects: "Daño 2d10 si falla, derribo"
            },
            {
                description: "Las luces se apagan, dejando solo el resplandor de las pantallas holográficas y los indicadores de peligro.",
                difficulty: "DC 15",
                effects: "-2 a Percepción, +2 a Sigilo"
            },
            {
                description: "Una sección del curso se inunda con agua electrificada, forzando a los concursantes a buscar rutas alternativas.",
                difficulty: "DC 28",
                effects: "Daño Eléctrico 2d10, derribo"
            },
            {
                description: "Las paredes del hangar comienzan a moverse, cambiando la configuración del curso en tiempo real.",
                difficulty: "DC 22",
                effects: "Cambio de ruta, posible atrapamiento"
            }
        ],
        competitor: [
            {
                description: "Un grupo de concursantes forma una alianza temporal para superar un obstáculo particularmente difícil.",
                difficulty: "DC 18",
                effects: "+2 a pruebas de grupo, riesgo de traición"
            },
            {
                description: "Un concursante intenta sabotear a otro, creando una situación de confrontación directa.",
                difficulty: "DC 22",
                effects: "Combate no letal, posible eliminación"
            },
            {
                description: "Un concursante herido pide ayuda, presentando una decisión moral a los demás.",
                difficulty: "DC 15",
                effects: "Opción de ayuda o abandono, impacto en reputación"
            },
            {
                description: "Un grupo de concursantes bloquea un paso estrecho, forzando a los demás a encontrar una ruta alternativa.",
                difficulty: "DC 25",
                effects: "Retraso significativo, posible confrontación"
            },
            {
                description: "Un concursante descubre un atajo secreto y debe decidir si compartirlo o mantenerlo en secreto.",
                difficulty: "DC 20",
                effects: "Ventaja temporal, riesgo de ser descubierto"
            }
        ],
        resource: [
            {
                description: "Se descubre un botiquín de emergencia en una zona de alto riesgo.",
                difficulty: "DC 22",
                effects: "Curación 2d10, +2 a pruebas de Medicina"
            },
            {
                description: "Un terminal de OCE revela información sobre los próximos obstáculos.",
                difficulty: "DC 25",
                effects: "+2 a Percepción, conocimiento de trampas"
            },
            {
                description: "Un dron averiado contiene partes útiles que pueden ser utilizadas para mejorar el equipo.",
                difficulty: "DC 22",
                effects: "Mejora temporal de equipo, +1 a pruebas"
            },
            {
                description: "Se encuentra un mapa parcial del curso en los restos de un concursante eliminado.",
                difficulty: "DC 18",
                effects: "+2 a navegación, conocimiento de atajos"
            },
            {
                description: "Un panel de control permite desactivar temporalmente algunas trampas.",
                difficulty: "DC 28",
                effects: "Desactivación de trampas, ventaja temporal"
            }
        ],
        hazard: [
            {
                description: "Una serie de láseres de seguridad se activa, creando un patrón mortal que debe ser evadido.",
                difficulty: "DC 28",
                effects: "Daño 3d10, muerte instantánea si falla"
            },
            {
                description: "Un grupo de drones de mantenimiento se vuelve hostil, atacando a cualquier concursante que se acerque.",
                difficulty: "DC 25",
                effects: "Daño 2d10, posible derribo"
            },
            {
                description: "Una sección del suelo se vuelve inestable, colapsando bajo el peso de múltiples concursantes.",
                difficulty: "DC 22",
                effects: "Daño 1d10, derribo, posible atrapamiento"
            },
            {
                description: "Un sistema de ventilación expulsa gas tóxico en intervalos aleatorios.",
                difficulty: "DC 20",
                effects: "Daño 1d10 por turno, -2 a todas las pruebas"
            },
            {
                description: "Las torretas de seguridad detectan movimiento y comienzan a disparar munición no letal.",
                difficulty: "DC 22",
                effects: "Daño 2d10, derribo, posible eliminación"
            }
        ],
        security: [
            {
                description: "Una patrulla de guardias de seguridad se acerca a tu posición, realizando una inspección rutinaria.",
                difficulty: "DC 28",
                effects: "Posible detección, interrogatorio"
            },
            {
                description: "Un dron de vigilancia detecta movimiento sospechoso y comienza a escanear el área.",
                difficulty: "DC 25",
                effects: "Alerta de seguridad, posible refuerzos"
            },
            {
                description: "Un guardia de seguridad está distraído con su terminal, presentando una oportunidad para el sigilo.",
                difficulty: "DC 20",
                effects: "Ventana de oportunidad, riesgo de detección"
            },
            {
                description: "Una unidad de respuesta rápida se despliega en el área, aumentando la presencia de seguridad.",
                difficulty: "DC 30",
                effects: "Aumento de patrullas, mayor riesgo"
            },
            {
                description: "Un sistema de reconocimiento facial se activa, escaneando a todos los que pasan por el área.",
                difficulty: "DC 25",
                effects: "Posible identificación, alerta de seguridad"
            }
        ]
    };

    // Función para generar un evento aleatorio
    function generateEvent() {
        const selectedType = eventTypeSelect.value;
        
        if (!selectedType) {
            eventResult.innerHTML = '<p class="error">Por favor, selecciona un tipo de evento.</p>';
            return;
        }

        const eventList = events[selectedType];
        const randomIndex = Math.floor(Math.random() * eventList.length);
        const event = eventList[randomIndex];

        // Crear una animación de "carga" antes de mostrar el resultado
        eventResult.innerHTML = '<p class="loading">Generando evento...</p>';
        
        setTimeout(() => {
            eventResult.innerHTML = `
                <div class="event-content">
                    <h4>${getEventTypeTitle(selectedType)}</h4>
                    <div class="event-details">
                        <p class="event-description">${event.description}</p>
                        <div class="event-stats">
                            <span class="difficulty"><i class="fas fa-skull"></i> Dificultad: ${event.difficulty}</span>
                            <span class="effects"><i class="fas fa-bolt"></i> Efectos: ${event.effects}</span>
                        </div>
                    </div>
                </div>
            `;
        }, 500);
    }

    // Función para obtener el título del tipo de evento
    function getEventTypeTitle(type) {
        const titles = {
            environmental: "Cambio Ambiental Detectado",
            competitor: "Interacción Competitiva",
            resource: "Recurso Descubierto",
            hazard: "¡Peligro Inminente!",
            security: "Seguridad Detectada"
        };
        return titles[type] || "Evento Generado";
    }

    // Agregar evento al botón
    if (generateEventButton) {
        generateEventButton.addEventListener('click', generateEvent);
    }

    // Agregar estilos dinámicos
    const style = document.createElement('style');
    style.textContent = `
        .event-content {
            animation: fadeIn 0.5s ease-in;
        }
        
        .event-details {
            margin-top: 1rem;
        }
        
        .event-description {
            font-size: 1.1rem;
            margin-bottom: 1rem;
            color: #00ffff;
        }
        
        .event-stats {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            background: rgba(0, 0, 0, 0.5);
            padding: 1rem;
            border-radius: 4px;
            border: 1px solid #ff00ff;
        }
        
        .difficulty, .effects {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .difficulty i, .effects i {
            color: #ff00ff;
        }
        
        .loading {
            color: #00ffff;
            font-style: italic;
        }
        
        .error {
            color: #ff00ff;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
}); 