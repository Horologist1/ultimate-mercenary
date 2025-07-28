/**
 * Sistema de widgets para Ultimate Mercenary
 * Este archivo permite la fácil integración de nuevos widgets al sistema
 */

// Registro de widgets disponibles
const UltimateWidgets = {
    // Almacena todos los widgets registrados
    registry: {},
    
    // Registra un nuevo widget
    register: function(name, config) {
        this.registry[name] = config;
        console.log(`Widget '${name}' registrado correctamente.`);
    },
    
    // Inicializa un widget específico
    init: function(name, element, options) {
        if (!this.registry[name]) {
            console.error(`Widget '${name}' no encontrado.`);
            return;
        }
        
        try {
            return this.registry[name].init(element, options || {});
        } catch (error) {
            console.error(`Error al inicializar widget '${name}':`, error);
        }
    },
    
    // Inicializa todos los widgets registrados en la página
    initAll: function() {
        document.querySelectorAll('[data-widget]').forEach(element => {
            const widgetName = element.dataset.widget;
            const widgetOptions = {};
            
            // Recopila opciones de atributos data-*
            for (const attr of element.attributes) {
                if (attr.name.startsWith('data-option-')) {
                    const optionName = attr.name.replace('data-option-', '');
                    widgetOptions[optionName] = attr.value;
                }
            }
            
            this.init(widgetName, element, widgetOptions);
        });
    }
};

// Widgets predefinidos

// 1. Widget de Dado Virtual
UltimateWidgets.register('dice-roller-mini', {
    init: function(element, options) {
        // Configuración por defecto
        const config = {
            diceType: options.diceType || 'd100',
            autoRoll: options.autoRoll === 'true',
            showDifficulty: options.showDifficulty === 'true',
            theme: options.theme || 'default'
        };
        
        // Crear la estructura del widget
        element.classList.add('dice-widget');
        element.classList.add(`theme-${config.theme}`);
        
        // Interfaz del widget
        element.innerHTML = `
            <div class="dice-widget-header">
                <h4>Lanzador Rápido</h4>
                <select class="dice-select">
                    <option value="d100" ${config.diceType === 'd100' ? 'selected' : ''}>d100</option>
                    <option value="d10" ${config.diceType === 'd10' ? 'selected' : ''}>d10</option>
                    <option value="d20" ${config.diceType === 'd20' ? 'selected' : ''}>d20</option>
                    <option value="d6" ${config.diceType === 'd6' ? 'selected' : ''}>d6</option>
                    <option value="2d10" ${config.diceType === '2d10' ? 'selected' : ''}>2d10</option>
                </select>
            </div>
            <div class="dice-widget-body">
                <div class="dice-result">-</div>
                ${config.showDifficulty ? `
                <div class="difficulty-container">
                    <label>Dificultad: </label>
                    <input type="number" class="difficulty-input" min="1" max="100" value="50">
                </div>` : ''}
            </div>
            <div class="dice-widget-footer">
                <button class="roll-button">Lanzar</button>
            </div>
        `;
        
        // Agregar funcionalidad
        const diceSelect = element.querySelector('.dice-select');
        const resultDiv = element.querySelector('.dice-result');
        const rollButton = element.querySelector('.roll-button');
        
        // Función de lanzamiento de dados
        const rollDice = () => {
            const diceType = diceSelect.value;
            let result = 0;
            
            switch (diceType) {
                case 'd100':
                    result = Math.floor(Math.random() * 100) + 1;
                    break;
                case 'd20':
                    result = Math.floor(Math.random() * 20) + 1;
                    break;
                case 'd10':
                    result = Math.floor(Math.random() * 10) + 1;
                    break;
                case 'd6':
                    result = Math.floor(Math.random() * 6) + 1;
                    break;
                case '2d10':
                    const d1 = Math.floor(Math.random() * 10) + 1;
                    const d2 = Math.floor(Math.random() * 10) + 1;
                    result = `${d1}+${d2}=${d1+d2}`;
                    break;
            }
            
            // Verificar éxito/fallo si es d100 y hay dificultad configurada
            if (diceType === 'd100' && config.showDifficulty) {
                const difficultyInput = element.querySelector('.difficulty-input');
                const difficulty = parseInt(difficultyInput.value);
                
                if (!isNaN(difficulty)) {
                    const success = result <= difficulty;
                    resultDiv.innerHTML = `<span class="${success ? 'success' : 'failure'}">${result}</span>`;
                    resultDiv.classList.add(success ? 'success-bg' : 'failure-bg');
                    
                    // Críticos
                    if (result <= 5) {
                        resultDiv.innerHTML += ' <span class="critical-success">(¡Crítico!)</span>';
                    } else if (result >= 95) {
                        resultDiv.innerHTML += ' <span class="critical-failure">(¡Pifia!)</span>';
                    }
                    
                    // Eliminar clases después de un tiempo
                    setTimeout(() => {
                        resultDiv.classList.remove('success-bg', 'failure-bg');
                    }, 1500);
                    
                    return;
                }
            }
            
            resultDiv.textContent = result;
        };
        
        // Eventos
        rollButton.addEventListener('click', rollDice);
        
        // Auto-roll si está configurado
        if (config.autoRoll) {
            rollDice();
        }
        
        // Exponer API
        return {
            roll: rollDice,
            setDiceType: (type) => {
                if (['d100', 'd20', 'd10', 'd6', '2d10'].includes(type)) {
                    diceSelect.value = type;
                }
            },
            getElement: () => element
        };
    }
});

// 2. Widget de Contador de PM (Puntos de Mérito)
UltimateWidgets.register('merit-counter', {
    init: function(element, options) {
        // Configuración
        const config = {
            initialValue: parseInt(options.initialValue) || 0,
            maxValue: parseInt(options.maxValue) || 999999,
            theme: options.theme || 'default'
        };
        
        // Estructura HTML
        element.classList.add('merit-widget');
        element.classList.add(`theme-${config.theme}`);
        
        element.innerHTML = `
            <div class="merit-widget-header">
                <h4>Puntos de Mérito</h4>
            </div>
            <div class="merit-widget-body">
                <div class="merit-display">${config.initialValue}</div>
                <div class="merit-controls">
                    <button class="merit-btn minus">-</button>
                    <input type="number" class="merit-input" value="${config.initialValue}" min="0" max="${config.maxValue}">
                    <button class="merit-btn plus">+</button>
                </div>
            </div>
            <div class="merit-widget-footer">
                <button class="history-button">Historial</button>
                <div class="history-log" style="display: none;">
                    <h5>Historial de PM</h5>
                    <ul class="history-list"></ul>
                </div>
            </div>
        `;
        
        // Funcionalidad
        const meritDisplay = element.querySelector('.merit-display');
        const meritInput = element.querySelector('.merit-input');
        const minusBtn = element.querySelector('.merit-btn.minus');
        const plusBtn = element.querySelector('.merit-btn.plus');
        const historyBtn = element.querySelector('.history-button');
        const historyLog = element.querySelector('.history-log');
        const historyList = element.querySelector('.history-list');
        
        // Histórico de transacciones
        const transactions = [];
        
        // Actualiza el contador y registra la transacción
        const updateMerit = (newValue, reason = '') => {
            const oldValue = parseInt(meritDisplay.textContent);
            const value = Math.max(0, Math.min(newValue, config.maxValue));
            
            if (oldValue !== value) {
                const change = value - oldValue;
                const transaction = {
                    previous: oldValue,
                    current: value,
                    change: change,
                    reason: reason,
                    timestamp: new Date().toLocaleTimeString()
                };
                
                transactions.push(transaction);
                
                // Actualizar la interfaz
                meritDisplay.textContent = value;
                meritInput.value = value;
                
                // Añadir al historial
                const listItem = document.createElement('li');
                listItem.classList.add(change > 0 ? 'gain' : 'loss');
                listItem.innerHTML = `[${transaction.timestamp}] ${change > 0 ? '+' : ''}${change} PM ${reason ? `(${reason})` : ''}`;
                historyList.prepend(listItem);
                
                // Limitar el historial a 10 elementos
                if (historyList.children.length > 10) {
                    historyList.removeChild(historyList.lastChild);
                }
            }
        };
        
        // Eventos
        minusBtn.addEventListener('click', () => {
            const currentValue = parseInt(meritDisplay.textContent);
            const amount = window.prompt('Cantidad a restar:', '10');
            
            if (amount !== null && !isNaN(parseInt(amount))) {
                const reason = window.prompt('Razón (opcional):', '');
                updateMerit(currentValue - parseInt(amount), reason);
            }
        });
        
        plusBtn.addEventListener('click', () => {
            const currentValue = parseInt(meritDisplay.textContent);
            const amount = window.prompt('Cantidad a añadir:', '10');
            
            if (amount !== null && !isNaN(parseInt(amount))) {
                const reason = window.prompt('Razón (opcional):', '');
                updateMerit(currentValue + parseInt(amount), reason);
            }
        });
        
        meritInput.addEventListener('change', () => {
            const newValue = parseInt(meritInput.value);
            if (!isNaN(newValue)) {
                updateMerit(newValue, 'Ajuste manual');
            }
        });
        
        historyBtn.addEventListener('click', () => {
            historyLog.style.display = historyLog.style.display === 'none' ? 'block' : 'none';
        });
        
        // API
        return {
            add: (amount, reason) => {
                const currentValue = parseInt(meritDisplay.textContent);
                updateMerit(currentValue + amount, reason);
            },
            subtract: (amount, reason) => {
                const currentValue = parseInt(meritDisplay.textContent);
                updateMerit(currentValue - amount, reason);
            },
            setValue: (value, reason) => {
                updateMerit(value, reason);
            },
            getValue: () => parseInt(meritDisplay.textContent),
            getElement: () => element
        };
    }
});

// 3. Widget de Contador de Tiempo
UltimateWidgets.register('time-tracker', {
    init: function(element, options) {
        // Configuración
        const config = {
            countdownMode: options.countdownMode === 'true',
            initialMinutes: parseInt(options.initialMinutes) || 30,
            warnAt: parseInt(options.warnAt) || 5, // minutos restantes para advertencia
            theme: options.theme || 'default'
        };
        
        // Estructura
        element.classList.add('timer-widget');
        element.classList.add(`theme-${config.theme}`);
        
        element.innerHTML = `
            <div class="timer-widget-header">
                <h4>${config.countdownMode ? 'Cuenta Atrás' : 'Cronómetro'}</h4>
            </div>
            <div class="timer-widget-body">
                <div class="timer-display">
                    <span class="minutes">${String(config.countdownMode ? config.initialMinutes : 0).padStart(2, '0')}</span>:
                    <span class="seconds">00</span>
                </div>
                <div class="timer-progress">
                    <div class="progress-bar"></div>
                </div>
            </div>
            <div class="timer-widget-footer">
                <button class="timer-btn start">${config.countdownMode ? 'Iniciar Cuenta Atrás' : 'Iniciar'}</button>
                <button class="timer-btn pause" disabled>Pausar</button>
                <button class="timer-btn reset">Reiniciar</button>
            </div>
        `;
        
        // Funcionalidad
        const minutesDisplay = element.querySelector('.minutes');
        const secondsDisplay = element.querySelector('.seconds');
        const progressBar = element.querySelector('.progress-bar');
        const startBtn = element.querySelector('.timer-btn.start');
        const pauseBtn = element.querySelector('.timer-btn.pause');
        const resetBtn = element.querySelector('.timer-btn.reset');
        
        let totalSeconds = config.countdownMode ? config.initialMinutes * 60 : 0;
        let currentSeconds = totalSeconds;
        let timerInterval = null;
        let isRunning = false;
        
        // Actualiza el display
        const updateDisplay = () => {
            const minutes = Math.floor(currentSeconds / 60);
            const seconds = currentSeconds % 60;
            
            minutesDisplay.textContent = String(minutes).padStart(2, '0');
            secondsDisplay.textContent = String(seconds).padStart(2, '0');
            
            // Actualizar barra de progreso
            if (config.countdownMode) {
                const percentage = (currentSeconds / totalSeconds) * 100;
                progressBar.style.width = `${percentage}%`;
                
                // Advertencia cuando queda poco tiempo
                if (minutes <= config.warnAt) {
                    element.classList.add('warning');
                } else {
                    element.classList.remove('warning');
                }
            } else {
                // En modo cronómetro, la barra se llena gradualmente
                // Limitamos a un máximo visual de 2 horas
                const maxSeconds = 2 * 60 * 60;
                const percentage = Math.min((currentSeconds / maxSeconds) * 100, 100);
                progressBar.style.width = `${percentage}%`;
            }
        };
        
        // Inicia el timer
        const startTimer = () => {
            if (isRunning) return;
            
            isRunning = true;
            startBtn.disabled = true;
            pauseBtn.disabled = false;
            
            timerInterval = setInterval(() => {
                if (config.countdownMode) {
                    currentSeconds--;
                    
                    if (currentSeconds <= 0) {
                        stopTimer();
                        element.classList.add('completed');
                        
                        // Efecto de notificación
                        element.classList.add('blink');
                        setTimeout(() => element.classList.remove('blink'), 3000);
                        
                        // Sonido de alarma si está disponible
                        const alarm = new Audio('data:audio/wav;base64,UklGRigBAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQBAAAAAAAAAAAAAAAAAAAAAADffvd/J38yfyp/In8efx9/JX8kfx5/GX8gfyF/GX8SfxZ/GH8Zfxp/Fn8Qfwx/Dn8Wfy6HS69f1XPteIuBWYgCkH+ZAaD/pS2qs67iswu4JbtivXLAu8O2yM3NL9F801jVT9c62RDb7NzS3pXgKOKl4xDlbOa657TowOmq6pLrDuyp6B/hV9ddzMTAwrWSrYio26TKo86kb6eroK6kr+L5Df82UF99fp+Aq4H3giKExoVQhwGI44X0gk9/i3xeec515nG9bottu22lbltvkW/ab/Vv4m+9b4JvQG/wbqhuYW4eb8NvK3BDcCdw6W97bwFvi278bltuBG6xbZ9tyW0Nbk1uoG7ubj9vUW+ab5pxbHUYePp5BHpfeP93ZXeYdiV1HA==');
                        alarm.play().catch(e => console.log('No se pudo reproducir sonido:', e));
                    }
                } else {
                    currentSeconds++;
                }
                
                updateDisplay();
            }, 1000);
        };
        
        // Pausa el timer
        const pauseTimer = () => {
            if (!isRunning) return;
            
            clearInterval(timerInterval);
            isRunning = false;
            startBtn.disabled = false;
            pauseBtn.disabled = true;
        };
        
        // Detiene y reinicia el timer
        const stopTimer = () => {
            pauseTimer();
            currentSeconds = config.countdownMode ? config.initialMinutes * 60 : 0;
            element.classList.remove('warning', 'completed');
            updateDisplay();
        };
        
        // Eventos
        startBtn.addEventListener('click', startTimer);
        pauseBtn.addEventListener('click', pauseTimer);
        resetBtn.addEventListener('click', stopTimer);
        
        // Inicializar display
        updateDisplay();
        
        // API
        return {
            start: startTimer,
            pause: pauseTimer,
            reset: stopTimer,
            setTime: (minutes, seconds = 0) => {
                pauseTimer();
                currentSeconds = (minutes * 60) + seconds;
                if (config.countdownMode) {
                    totalSeconds = currentSeconds;
                }
                updateDisplay();
            },
            getTimeRemaining: () => {
                return {
                    minutes: Math.floor(currentSeconds / 60),
                    seconds: currentSeconds % 60,
                    totalSeconds: currentSeconds
                };
            },
            isRunning: () => isRunning,
            getElement: () => element
        };
    }
});

// 4. Widget de Notas Rápidas
UltimateWidgets.register('quick-notes', {
    init: function(element, options) {
        // Configuración
        const config = {
            placeholder: options.placeholder || 'Escribe tus notas aquí...',
            autoSave: options.autoSave !== 'false',
            saveKey: options.saveKey || 'quickNotes',
            theme: options.theme || 'default'
        };
        
        // Estructura
        element.classList.add('notes-widget');
        element.classList.add(`theme-${config.theme}`);
        
        element.innerHTML = `
            <div class="notes-widget-header">
                <h4>Notas Rápidas</h4>
            </div>
            <div class="notes-widget-body">
                <textarea class="notes-textarea" placeholder="${config.placeholder}"></textarea>
            </div>
            <div class="notes-widget-footer">
                <button class="notes-btn save">Guardar</button>
                <button class="notes-btn clear">Limpiar</button>
            </div>
        `;
        
        // Funcionalidad
        const textarea = element.querySelector('.notes-textarea');
        const saveBtn = element.querySelector('.notes-btn.save');
        const clearBtn = element.querySelector('.notes-btn.clear');
        
        // Cargar notas guardadas
        if (config.autoSave && localStorage.getItem(config.saveKey)) {
            textarea.value = localStorage.getItem(config.saveKey);
        }
        
        // Eventos
        saveBtn.addEventListener('click', () => {
            localStorage.setItem(config.saveKey, textarea.value);
            // Efecto visual de confirmación
            saveBtn.classList.add('saved');
            setTimeout(() => saveBtn.classList.remove('saved'), 1000);
        });
        
        clearBtn.addEventListener('click', () => {
            if (confirm('¿Seguro que quieres borrar todas las notas?')) {
                textarea.value = '';
                if (config.autoSave) {
                    localStorage.removeItem(config.saveKey);
                }
            }
        });
        
        // Auto-guardado
        if (config.autoSave) {
            textarea.addEventListener('input', () => {
                localStorage.setItem(config.saveKey, textarea.value);
            });
        }
        
        // API
        return {
            getNotes: () => textarea.value,
            setNotes: (text) => {
                textarea.value = text;
                if (config.autoSave) {
                    localStorage.setItem(config.saveKey, text);
                }
            },
            clearNotes: () => {
                textarea.value = '';
                if (config.autoSave) {
                    localStorage.removeItem(config.saveKey);
                }
            },
            getElement: () => element
        };
    }
});

// 5. Widget de Encuesta/Votación
UltimateWidgets.register('poll-widget', {
    init: function(element, options) {
        // Configuración
        const config = {
            question: options.question || '¿Qué opción prefieres?',
            options: options.options ? options.options.split('|') : ['Opción 1', 'Opción 2', 'Opción 3'],
            multiSelect: options.multiSelect === 'true',
            showResults: options.showResults !== 'false',
            theme: options.theme || 'default'
        };
        
        // Estructura
        element.classList.add('poll-widget');
        element.classList.add(`theme-${config.theme}`);
        
        // Generar opciones HTML
        const optionsHtml = config.options.map((option, index) => {
            const inputType = config.multiSelect ? 'checkbox' : 'radio';
            return `
                <div class="poll-option">
                    <input type="${inputType}" name="poll-${Date.now()}" id="poll-option-${index}" value="${option}">
                    <label for="poll-option-${index}">${option}</label>
                    ${config.showResults ? '<div class="poll-bar"><div class="poll-progress" style="width: 0%"></div></div>' : ''}
                    ${config.showResults ? '<span class="poll-percentage">0%</span>' : ''}
                </div>
            `;
        }).join('');
        
        element.innerHTML = `
            <div class="poll-widget-header">
                <h4>Encuesta</h4>
            </div>
            <div class="poll-widget-body">
                <div class="poll-question">${config.question}</div>
                <div class="poll-options">
                    ${optionsHtml}
                </div>
            </div>
            <div class="poll-widget-footer">
                <button class="poll-btn vote">Votar</button>
                ${config.showResults ? '<button class="poll-btn results">Ver Resultados</button>' : ''}
                <button class="poll-btn reset">Reiniciar</button>
            </div>
        `;
        
        // Funcionalidad
        const voteButton = element.querySelector('.poll-btn.vote');
        const resultsButton = element.querySelector('.poll-btn.results');
        const resetButton = element.querySelector('.poll-btn.reset');
        const options = element.querySelectorAll('input[type="radio"], input[type="checkbox"]');
        
        // Estado actual
        const votes = new Array(config.options.length).fill(0);
        let totalVotes = 0;
        
        // Actualiza la visualización de resultados
        const updateResults = () => {
            if (!config.showResults) return;
            
            element.querySelectorAll('.poll-progress').forEach((bar, index) => {
                const percentage = totalVotes > 0 ? (votes[index] / totalVotes) * 100 : 0;
                bar.style.width = `${percentage}%`;
                element.querySelectorAll('.poll-percentage')[index].textContent = `${Math.round(percentage)}%`;
            });
        };
        
        // Evento de votar
        voteButton.addEventListener('click', () => {
            let hasSelection = false;
            
            options.forEach((option, index) => {
                if (option.checked) {
                    votes[index]++;
                    totalVotes++;
                    hasSelection = true;
                    
                    // Desmarcar si es radio (para permitir nuevos votos)
                    if (!config.multiSelect) {
                        option.checked = false;
                    }
                }
            });
            
            if (hasSelection) {
                updateResults();
                
                // Efecto visual
                voteButton.classList.add('voted');
                setTimeout(() => voteButton.classList.remove('voted'), 1000);
            } else {
                alert('Por favor selecciona una opción.');
            }
        });
        
        // Evento de ver resultados
        if (resultsButton) {
            resultsButton.addEventListener('click', () => {
                element.classList.toggle('show-results');
                
                if (element.classList.contains('show-results')) {
                    resultsButton.textContent = 'Ocultar Resultados';
                } else {
                    resultsButton.textContent = 'Ver Resultados';
                }
            });
        }
        
        // Evento de reinicio
        resetButton.addEventListener('click', () => {
            if (confirm('¿Reiniciar todos los votos?')) {
                votes.fill(0);
                totalVotes = 0;
                updateResults();
                
                // Desmarcar todas las opciones
                options.forEach(option => {
                    option.checked = false;
                });
                
                // Resetear visualización
                if (resultsButton && element.classList.contains('show-results')) {
                    element.classList.remove('show-results');
                    resultsButton.textContent = 'Ver Resultados';
                }
            }
        });
        
        // API
        return {
            getVotes: () => [...votes],
            getTotalVotes: () => totalVotes,
            getQuestion: () => config.question,
            getOptions: () => [...config.options],
            setQuestion: (question) => {
                config.question = question;
                element.querySelector('.poll-question').textContent = question;
            },
            reset: () => {
                votes.fill(0);
                totalVotes = 0;
                updateResults();
                options.forEach(option => {
                    option.checked = false;
                });
            },
            getElement: () => element
        };
    }
});

// 6. Widget de Generador de Eventos Aleatorios
UltimateWidgets.register('random-event', {
    init: function(element, options) {
        // Configuración
        const config = {
            title: options.title || 'Eventos Aleatorios',
            categories: options.categories ? options.categories.split('|') : ['Combate', 'Social', 'Ambiental'],
            defaultCategory: options.defaultCategory || '',
            theme: options.theme || 'default',
            events: {}
        };
        
        // Eventos por defecto si no se proporcionan
        const defaultEvents = {
            'Combate': [
                'Un dron de seguridad se activa repentinamente',
                'Se escucha el sonido de disparos cercanos',
                'Un concursante herido aparece pidiendo ayuda',
                'Las luces parpadean y se escuchan sirenas de alarma',
                'Un grupo de 1d3+1 guardias OCE aparece en patrulla',
                'Llega un aviso: la zona entrará en cuarentena en 10 minutos'
            ],
            'Social': [
                'Un concursante ofrece un trato sospechoso',
                'Llega información sobre una alianza secreta entre otros concursantes',
                'Se detecta que alguien está hackeando el sistema de seguridad',
                'Kaiser hace un anuncio especial para todos los concursantes',
                'Un guardia OCE parece dispuesto a aceptar un soborno',
                'Dos concursantes discuten y están a punto de llegar a las manos'
            ],
            'Ambiental': [
                'Fuga de gas tóxico en una sección cercana',
                'Sistema de aspersores activado, visibilidad reducida',
                'Interferencia electrónica, los dispositivos fallan temporalmente',
                'Terremoto menor, los objetos caen de las estanterías',
                'Fallo de energía, las luces se apagan durante 1d6 minutos',
                'Temperatura extrema repentina (calor o frío)'
            ]
        };
        
        // Cargar eventos por defecto si no hay personalizados
        config.categories.forEach(category => {
            config.events[category] = defaultEvents[category] || [
                'Evento aleatorio 1',
                'Evento aleatorio 2',
                'Evento aleatorio 3'
            ];
        });
        
        // Estructura
        element.classList.add('event-widget');
        element.classList.add(`theme-${config.theme}`);
        
        // Generar selector de categorías
        const categoriesOptions = config.categories.map(category => 
            `<option value="${category}" ${category === config.defaultCategory ? 'selected' : ''}>${category}</option>`
        ).join('');
        
        element.innerHTML = `
            <div class="event-widget-header">
                <h4>${config.title}</h4>
            </div>
            <div class="event-widget-body">
                <div class="event-controls">
                    <select class="event-category">
                        <option value="">Todas las categorías</option>
                        ${categoriesOptions}
                    </select>
                    <button class="event-btn generate">Generar Evento</button>
                </div>
                <div class="event-display">
                    <div class="event-category-display"></div>
                    <div class="event-text">Presiona "Generar Evento" para comenzar</div>
                </div>
                <div class="event-history">
                    <h5>Historial de Eventos</h5>
                    <ul class="history-list"></ul>
                </div>
            </div>
            <div class="event-widget-footer">
                <button class="event-btn toggle-history">Mostrar Historial</button>
                <button class="event-btn clear-history">Limpiar Historial</button>
            </div>
        `;
        
        // Funcionalidad
        const categorySelect = element.querySelector('.event-category');
        const generateButton = element.querySelector('.event-btn.generate');
        const eventCategoryDisplay = element.querySelector('.event-category-display');
        const eventText = element.querySelector('.event-text');
        const historyList = element.querySelector('.history-list');
        const toggleHistoryBtn = element.querySelector('.event-btn.toggle-history');
        const clearHistoryBtn = element.querySelector('.event-btn.clear-history');
        const eventHistory = element.querySelector('.event-history');
        
        // Ocultar historial inicialmente
        eventHistory.style.display = 'none';
        
        // Historial de eventos
        const history = [];
        
        // Generar un evento aleatorio
        const generateEvent = () => {
            const selectedCategory = categorySelect.value;
            let category, event;
            
            if (selectedCategory) {
                // Categoría específica
                category = selectedCategory;
                const events = config.events[category];
                event = events[Math.floor(Math.random() * events.length)];
            } else {
                // Categoría aleatoria
                const categories = Object.keys(config.events);
                category = categories[Math.floor(Math.random() * categories.length)];
                const events = config.events[category];
                event = events[Math.floor(Math.random() * events.length)];
            }
            
            // Actualizar visualización
            eventCategoryDisplay.textContent = category;
            eventCategoryDisplay.className = 'event-category-display'; // Resetear clases
            eventCategoryDisplay.classList.add(`category-${category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`);
            eventText.textContent = event;
            
            // Añadir al historial
            const timestamp = new Date().toLocaleTimeString();
            const historyItem = { timestamp, category, event };
            history.push(historyItem);
            
            // Actualizar lista de historial
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>[${timestamp}]</strong> <span class="event-cat">${category}</span>: ${event}`;
            historyList.prepend(listItem);
            
            // Limitar historial a 10 elementos
            if (historyList.children.length > 10) {
                historyList.removeChild(historyList.lastChild);
            }
            
            // Animar
            element.classList.add('event-generated');
            setTimeout(() => element.classList.remove('event-generated'), 1000);
            
            return historyItem;
        };
        
        // Eventos
        generateButton.addEventListener('click', generateEvent);
        
        toggleHistoryBtn.addEventListener('click', () => {
            const isVisible = eventHistory.style.display !== 'none';
            eventHistory.style.display = isVisible ? 'none' : 'block';
            toggleHistoryBtn.textContent = isVisible ? 'Mostrar Historial' : 'Ocultar Historial';
        });
        
        clearHistoryBtn.addEventListener('click', () => {
            if (confirm('¿Borrar todo el historial de eventos?')) {
                history.length = 0;
                historyList.innerHTML = '';
            }
        });
        
        // API
        return {
            generateEvent,
            getHistory: () => [...history],
            clearHistory: () => {
                history.length = 0;
                historyList.innerHTML = '';
            },
            addEventCategory: (category, events) => {
                if (!config.categories.includes(category)) {
                    config.categories.push(category);
                    
                    // Actualizar el selector
                    const option = document.createElement('option');
                    option.value = category;
                    option.textContent = category;
                    categorySelect.appendChild(option);
                }
                
                config.events[category] = events;
            },
            getElement: () => element
        };
    }
});

// 7. Widget de Seguimiento de Concursantes
UltimateWidgets.register('contestant-tracker', {
    init: function(element, options) {
        // Configuración
        const config = {
            initialContestants: parseInt(options.initialContestants) || 100,
            eliminated: parseInt(options.eliminated) || 0,
            showDetails: options.showDetails === 'true',
            theme: options.theme || 'default'
        };
        
        // Estructura
        element.classList.add('tracker-widget');
        element.classList.add(`theme-${config.theme}`);
        
        // Preparar algunos PNJ destacados predefinidos
        const featuredContestants = [
            { name: 'Boris "Goliath" Volkov', status: 'vivo', specialty: 'Combate', threat: 'alta', notes: 'Ex-Spetsnaz, implantes de fuerza' },
            { name: 'Silas "Glitch" Vance', status: 'vivo', specialty: 'Hacker', threat: 'media', notes: 'Evita confrontación directa' },
            { name: 'Mizuki "Raven" Tanaka', status: 'vivo', specialty: 'Sigilo', threat: 'alta', notes: 'Asesina silenciosa' },
            { name: 'Anya "Chispa" Sharma', status: 'vivo', specialty: 'Técnico', threat: 'baja', notes: 'Experta en mecanismos' },
            { name: 'Marcus "Old Man" Thorne', status: 'vivo', specialty: 'Táctico', threat: 'media', notes: 'Ex-seguridad corporativa' },
            { name: 'Jinx', status: 'vivo', specialty: 'Impredecible', threat: 'alta', notes: 'Posiblemente inestable' },
            { name: 'Lin Mayfair', status: 'vivo', specialty: 'Desconocida', threat: 'baja', notes: 'Aparentemente inofensiva' },
            { name: 'Subject Omega', status: 'vivo', specialty: 'Desconocida', threat: 'desconocida', notes: 'Implantes avanzados, origen misterioso' }
        ];
        
        element.innerHTML = `
            <div class="tracker-widget-header">
                <h4>Seguimiento de Concursantes</h4>
            </div>
            <div class="tracker-widget-body">
                <div class="tracker-summary">
                    <div class="tracker-counts">
                        <div class="tracker-count total">
                            <span class="count-label">Total Inicial:</span>
                            <span class="count-value">${config.initialContestants}</span>
                        </div>
                        <div class="tracker-count alive">
                            <span class="count-label">Supervivientes:</span>
                            <span class="count-value">${config.initialContestants - config.eliminated}</span>
                        </div>
                        <div class="tracker-count eliminated">
                            <span class="count-label">Eliminados:</span>
                            <span class="count-value">${config.eliminated}</span>
                        </div>
                    </div>
                    <div class="tracker-progress">
                        <div class="progress-bar" style="width: ${(config.eliminated / config.initialContestants) * 100}%"></div>
                    </div>
                </div>
                ${config.showDetails ? `
                <div class="tracker-details">
                    <h5>PNJs Destacados</h5>
                    <div class="contestant-list">
                        ${featuredContestants.map(c => `
                            <div class="contestant-item" data-name="${c.name}">
                                <div class="contestant-header">
                                    <span class="contestant-name">${c.name}</span>
                                    <span class="contestant-status ${c.status}">${c.status}</span>
                                </div>
                                <div class="contestant-info">
                                    <div><strong>Especialidad:</strong> ${c.specialty}</div>
                                    <div><strong>Amenaza:</strong> <span class="threat threat-${c.threat}">${c.threat}</span></div>
                                    <div><strong>Notas:</strong> ${c.notes}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>` : ''}
            </div>
            <div class="tracker-widget-footer">
                <div class="tracker-controls">
                    <button class="tracker-btn eliminate">+ Eliminar</button>
                    <button class="tracker-btn resurrect">- Revivir</button>
                    ${config.showDetails ? '<button class="tracker-btn toggle-details">Ocultar Detalles</button>' : ''}
                    <button class="tracker-btn manage">Gestionar PNJs</button>
                </div>
            </div>
        `;
        
        // Funcionalidad
        const eliminateBtn = element.querySelector('.tracker-btn.eliminate');
        const resurrectBtn = element.querySelector('.tracker-btn.resurrect');
        const toggleDetailsBtn = element.querySelector('.tracker-btn.toggle-details');
        const manageBtn = element.querySelector('.tracker-btn.manage');
        const trackerDetails = element.querySelector('.tracker-details');
        const aliveCount = element.querySelector('.tracker-count.alive .count-value');
        const eliminatedCount = element.querySelector('.tracker-count.eliminated .count-value');
        const progressBar = element.querySelector('.progress-bar');
        
        // Estado actual
        let currentAlive = config.initialContestants - config.eliminated;
        let currentEliminated = config.eliminated;
        let contestants = [...featuredContestants];
        
        // Actualiza los contadores y la barra de progreso
        const updateCounts = () => {
            aliveCount.textContent = currentAlive;
            eliminatedCount.textContent = currentEliminated;
            progressBar.style.width = `${(currentEliminated / config.initialContestants) * 100}%`;
            
            // Efectos visuales según la progresión
            if (currentEliminated >= config.initialContestants * 0.75) {
                progressBar.classList.add('critical');
            } else if (currentEliminated >= config.initialContestants * 0.5) {
                progressBar.classList.add('warning');
                progressBar.classList.remove('critical');
            } else {
                progressBar.classList.remove('warning', 'critical');
            }
        };
        
        // Actualiza la lista de concursantes
        const updateContestantList = () => {
            if (!config.showDetails) return;
            
            const contestantList = element.querySelector('.contestant-list');
            contestantList.innerHTML = contestants.map(c => `
                <div class="contestant-item" data-name="${c.name}">
                    <div class="contestant-header">
                        <span class="contestant-name">${c.name}</span>
                        <span class="contestant-status ${c.status}">${c.status}</span>
                    </div>
                    <div class="contestant-info">
                        <div><strong>Especialidad:</strong> ${c.specialty}</div>
                        <div><strong>Amenaza:</strong> <span class="threat threat-${c.threat}">${c.threat}</span></div>
                        <div><strong>Notas:</strong> ${c.notes}</div>
                    </div>
                </div>
            `).join('');
            
            // Añadir eventos para cambiar estado
            contestantList.querySelectorAll('.contestant-item').forEach(item => {
                item.addEventListener('click', () => {
                    const name = item.dataset.name;
                    const contestant = contestants.find(c => c.name === name);
                    
                    if (contestant) {
                        // Alternar entre vivo/eliminado
                        if (contestant.status === 'vivo') {
                            contestant.status = 'eliminado';
                            item.querySelector('.contestant-status').textContent = 'eliminado';
                            item.querySelector('.contestant-status').className = 'contestant-status eliminado';
                        } else {
                            contestant.status = 'vivo';
                            item.querySelector('.contestant-status').textContent = 'vivo';
                            item.querySelector('.contestant-status').className = 'contestant-status vivo';
                        }
                    }
                });
            });
        };
        
        // Eventos
        eliminateBtn.addEventListener('click', () => {
            if (currentAlive > 0) {
                const amount = window.prompt('Número de concursantes a eliminar:', '1');
                if (amount === null) return;
                
                const elimCount = Math.min(parseInt(amount) || 1, currentAlive);
                currentEliminated += elimCount;
                currentAlive -= elimCount;
                updateCounts();
                
                // Efecto visual
                eliminateBtn.classList.add('active');
                setTimeout(() => eliminateBtn.classList.remove('active'), 500);
            } else {
                alert('Todos los concursantes han sido eliminados.');
            }
        });
        
        resurrectBtn.addEventListener('click', () => {
            if (currentEliminated > 0) {
                const amount = window.prompt('Número de concursantes a revivir:', '1');
                if (amount === null) return;
                
                const reviveCount = Math.min(parseInt(amount) || 1, currentEliminated);
                currentEliminated -= reviveCount;
                currentAlive += reviveCount;
                updateCounts();
                
                // Efecto visual
                resurrectBtn.classList.add('active');
                setTimeout(() => resurrectBtn.classList.remove('active'), 500);
            } else {
                alert('No hay concursantes eliminados para revivir.');
            }
        });
        
        if (toggleDetailsBtn) {
            toggleDetailsBtn.addEventListener('click', () => {
                if (trackerDetails.style.display === 'none') {
                    trackerDetails.style.display = 'block';
                    toggleDetailsBtn.textContent = 'Ocultar Detalles';
                } else {
                    trackerDetails.style.display = 'none';
                    toggleDetailsBtn.textContent = 'Mostrar Detalles';
                }
            });
        }
        
        manageBtn.addEventListener('click', () => {
            alert('Funcionalidad de gestión avanzada disponible en la próxima actualización.');
        });
        
        // Inicializar componentes
        updateContestantList();
        
        // API
        return {
            eliminate: (count = 1) => {
                if (currentAlive >= count) {
                    currentEliminated += count;
                    currentAlive -= count;
                    updateCounts();
                    return true;
                }
                return false;
            },
            resurrect: (count = 1) => {
                if (currentEliminated >= count) {
                    currentEliminated -= count;
                    currentAlive += count;
                    updateCounts();
                    return true;
                }
                return false;
            },
            setContestantStatus: (name, status) => {
                const contestant = contestants.find(c => c.name === name);
                if (contestant) {
                    contestant.status = status;
                    updateContestantList();
                    return true;
                }
                return false;
            },
            getContestantCount: () => ({
                total: config.initialContestants,
                alive: currentAlive,
                eliminated: currentEliminated
            }),
            getContestants: () => [...contestants],
            addContestant: (contestant) => {
                contestants.push(contestant);
                updateContestantList();
            },
            getElement: () => element
        };
    }
});

// Inicializar automáticamente todos los widgets cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    UltimateWidgets.initAll();
});