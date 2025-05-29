    class CharacterSheet {
        constructor() {
            this.aptitudes = {
            cog: 10,
                int: 10,
                ref: 10,
            sav: 10,
            som: 10,
            wil: 10
            };
            
            this.skills = {};
            this.skillFields = {}; // Para almacenar los campos de las habilidades [Field]
            this.customSkills = []; // Para habilidades personalizadas
        this.equipment = [];
            this.implants = [];
        this.attributePoints = 20; // Customization Points para atributos (1 CP = 1 punto de aptitud)
        this.skillPoints = 400; // Total de puntos de habilidades (Background + Career + Interest, sin CP)
        this.aptitudeTemplate = 'actioneer'; // Plantilla seleccionada por defecto
        
        // Aplicar plantilla por defecto
        this.applyAptitudeTemplate('actioneer');
    }
    
    updateAptitude(apt, value) {
        const oldValue = this.aptitudes[apt];
        const newValue = parseInt(value) || 10;
        
        // Calcular cuántos puntos se están usando actualmente
        const templates = this.getAptitudeTemplates();
        const currentTemplate = templates[this.aptitudeTemplate];
        
        // Calcular puntos usados por encima de la plantilla base
        let totalUsed = 0;
        for (const attribute in this.aptitudes) {
            if (attribute === apt) {
                // Para el atributo que estamos cambiando, usar el nuevo valor
                totalUsed += Math.max(0, newValue - currentTemplate[attribute]);
                    } else {
                // Para los demás, usar el valor actual
                totalUsed += Math.max(0, this.aptitudes[attribute] - currentTemplate[attribute]);
            }
        }
        
        // Verificar si hay suficientes puntos (máximo 20)
        if (totalUsed > 20) {
            return false; // No hay suficientes puntos
        }
        
        this.aptitudes[apt] = newValue;
        this.attributePoints = 20 - totalUsed;
        this.updateDerivedStats();
        return true;
    }
    
    addSkill(name, value) {
        const oldValue = this.skills[name] || 0;
        const diff = value - oldValue;
        
        // Verificar si hay suficientes puntos
        if (diff > 0 && diff > this.skillPoints) {
            return false; // No hay suficientes puntos
        }
        
        this.skills[name] = value;
                            this.skillPoints -= diff;
        return true;
    }
    
    updateDerivedStats() {
        // Initiative: (REF + INT) ÷ 5
        this.initiative = Math.floor((this.aptitudes.ref + this.aptitudes.int) / 5);
        // DUR editable, por defecto 30
        this.dur = typeof this.dur === 'number' ? this.dur : 30;
        // Wound Threshold (WT): DUR ÷ 5
        this.woundThreshold = Math.floor(this.dur / 5);
        // Death Rating (DR): DUR × 1.5 (biomorph estándar)
        this.deathRating = Math.floor(this.dur * 1.5);
        // Movement estándar
        this.movement = 4;
        // Pools y otros stats
        this.insightPool = Math.floor(this.aptitudes.int / 5);
        this.moxyPool = Math.floor(this.aptitudes.wil / 5);
        this.vigorPool = Math.floor(this.aptitudes.som / 5);
        this.flexPool = 1;
        this.lucidity = this.aptitudes.wil * 2;
        this.traumaThreshold = Math.floor(this.lucidity / 5);
        this.insanityRating = this.lucidity * 2;
    }
    
    exportToJSON() {
        return JSON.stringify({
            aptitudes: this.aptitudes,
            skills: this.skills,
            skillFields: this.skillFields,
            customSkills: this.customSkills,
            equipment: this.equipment,
            implants: this.implants,
            dur: this.dur,
            initiative: this.initiative,
            woundThreshold: this.woundThreshold,
            deathRating: this.deathRating,
            attributePoints: this.attributePoints,
            skillPoints: this.skillPoints,
            aptitudeTemplate: this.aptitudeTemplate
        });
    }
    
    // Recalcular puntos disponibles basándose en la plantilla actual
    recalculateAttributePoints() {
        const templates = this.getAptitudeTemplates();
        const currentTemplate = templates[this.aptitudeTemplate];
        
        let totalUsed = 0;
        for (const attribute in this.aptitudes) {
            totalUsed += Math.max(0, this.aptitudes[attribute] - currentTemplate[attribute]);
        }
        
        this.attributePoints = 20 - totalUsed;
    }
    
    importFromJSON(json) {
        const data = JSON.parse(json);
        this.aptitudes = data.aptitudes || { cog: 10, int: 10, ref: 10, sav: 10, som: 10, wil: 10 };
        this.skills = data.skills || {};
        this.skillFields = data.skillFields || {};
        this.customSkills = data.customSkills || {};
        this.equipment = data.equipment || [];
        this.implants = data.implants || [];
        this.dur = data.dur || 30;
        this.initiative = data.initiative || 7;
        this.woundThreshold = data.woundThreshold || 6;
        this.deathRating = data.deathRating || Math.floor(this.dur * 1.5);
        this.skillPoints = data.skillPoints || 400;
        this.aptitudeTemplate = data.aptitudeTemplate || 'actioneer';
        
        // Recalcular puntos de atributos basándose en la plantilla actual
        this.recalculateAttributePoints();
            this.updateDerivedStats();
        }

    // Plantillas de atributos disponibles
    getAptitudeTemplates() {
        return {
            actioneer: { cog: 15, int: 15, ref: 20, sav: 10, som: 15, wil: 15 },
            extrovert: { cog: 15, int: 15, ref: 15, sav: 20, som: 15, wil: 15 },
            facilitator: { cog: 10, int: 15, ref: 10, sav: 20, som: 20, wil: 20 },
            factotum: { cog: 15, int: 15, ref: 15, sav: 15, som: 10, wil: 15 },
            inquirer: { cog: 10, int: 20, ref: 10, sav: 15, som: 15, wil: 15 },
            survivor: { cog: 20, int: 10, ref: 15, sav: 10, som: 20, wil: 20 },
            'thrill-seeker': { cog: 20, int: 15, ref: 20, sav: 15, som: 10, wil: 15 }
        };
    }
    
    // Aplicar plantilla de atributos
    applyAptitudeTemplate(templateName) {
        const templates = this.getAptitudeTemplates();
        if (templates[templateName]) {
            this.aptitudeTemplate = templateName;
            this.aptitudes = { ...templates[templateName] };
            
            // Calcular puntos disponibles (siempre empezamos con 20 puntos disponibles)
            this.attributePoints = 20;
            
            this.updateDerivedStats();
            return true;
        }
        return false;
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyBVc1a4E4_y-YJZV5ZqFQzTr1T8Txe8TmQ",
        authDomain: "ultimatemercenary-1e212.firebaseapp.com",
        projectId: "ultimatemercenary-1e212",
        storageBucket: "ultimatemercenary-1e212.appspot.com",
        messagingSenderId: "683730871364",
        appId: "1:683730871364:web:350aaf7a296ad34db28811",
        databaseURL: "https://ultimatemercenary-1e212-default-rtdb.firebaseio.com/"
    };

    // Inicializar Firebase si no está ya inicializado
    if (!window.firebaseApp) {
        window.firebaseApp = firebase.initializeApp(firebaseConfig);
        window.database = firebase.database();
    }

    // Referencia a itemsComprados en Firebase
    const itemsCompradosRef = window.database.ref('itemsComprados');

    // Función para sincronizar el inventario con Firebase
    function syncInventoryToFirebase() {
        const allItems = [...window.characterSheet.equipment, ...window.characterSheet.implants];
        itemsCompradosRef.set(allItems);
    }

    // Listener para cambios en Firebase
    itemsCompradosRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            // Separar items por tipo
            const items = Array.isArray(data) ? data : Object.values(data);
            window.characterSheet.equipment = items.filter(item => 
                item.tipo === 'arma' || item.tipo === 'armadura' || item.tipo === 'equipo'
            );
            window.characterSheet.implants = items.filter(item => 
                item.tipo === 'implant' || item.tipo === 'implante'
            );
            
            // Guardar en localStorage para compatibilidad
            localStorage.setItem('characterSheet', window.characterSheet.exportToJSON());
            
            // Actualizar UI
            if (typeof updateEquipmentUI === 'function') {
                updateEquipmentUI();
            }
            if (typeof updateUI === 'function') {
                updateUI();
            }
        }
    });

    // Tab switching functionality
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            this.classList.add('active');
            const contentId = this.getAttribute('data-tab');
            document.getElementById(contentId).classList.add('active');
        });
    });

    // Initialize character sheet
    window.characterSheet = new CharacterSheet();

    // Añadir arma inicial si no existe
    function addInitialWeapon() {
        const exists = (window.characterSheet.equipment||[]).some(e => e.tipo === 'arma' && e.nombre && e.nombre.toLowerCase().includes('pocket pal'));
        if (!exists) {
            window.characterSheet.equipment = window.characterSheet.equipment || [];
            window.characterSheet.equipment.push({
                tipo: 'arma',
                nombre: 'Pistola de Autodefensa "Pocket Pal Mk.II"',
                dano: '1d10',
                notas: '6 balas, básica',
                descripcion: 'Arma básica de autodefensa entregada a todos los concursantes'
            });
            updateEquipmentUI();
            syncInventoryToFirebase(); // Sincronizar después de añadir
        }
    }

    // Load saved data if exists
    const savedData = localStorage.getItem('characterSheet');
    if (savedData) {
        try {
            window.characterSheet.importFromJSON(savedData);
        } catch (e) {
            console.error('Error loading saved data:', e);
                }
            } else {
        addInitialWeapon();
    }

    // --- NUEVO: Procesar objetos pendientes de la tienda ---
    const pending = JSON.parse(localStorage.getItem('pendingItems') || '[]');
    if (pending.length > 0) {
        pending.forEach(item => {
            if (item.tipo === 'arma' || item.tipo === 'armadura' || item.tipo === 'equipo') {
                window.characterSheet.equipment = window.characterSheet.equipment || [];
                window.characterSheet.equipment.push(item);
            } else if (item.tipo === 'implant' || item.tipo === 'implante') {
                window.characterSheet.implants = window.characterSheet.implants || [];
                window.characterSheet.implants.push(item);
            }
        });
        localStorage.removeItem('pendingItems');
        updateEquipmentUI();
        updateUI();
    }

    // Update attribute points counter
    function updateAttributePoints() {
        document.getElementById('attribute-points').textContent = window.characterSheet.attributePoints;
        
        // Los puntos totales siempre son 20 (Customization Points)
        document.getElementById('attribute-points-total').textContent = '/20';
        
        // Change color if points are negative
        const pointsElement = document.getElementById('attribute-points');
        if (window.characterSheet.attributePoints < 0) {
            pointsElement.style.color = '#ff4757';
        } else {
            pointsElement.style.color = '#00ccff';
        }
    }

    // Update skill points counter
    function updateSkillPoints() {
        document.getElementById('skill-points').textContent = window.characterSheet.skillPoints;
        
        // Change color if points are negative
        const pointsElement = document.getElementById('skill-points');
        if (window.characterSheet.skillPoints < 0) {
            pointsElement.style.color = '#ff4757';
            } else {
            pointsElement.style.color = '#00ccff';
        }
    }

    // Update UI with current values
    function updateUI() {
        // Sumar efectos de implantes
        const {mods, skillMods} = getImplantModsSum();
        // Update template selector
        document.getElementById('aptitude-template').value = window.characterSheet.aptitudeTemplate;
        // Update attributes (con mods)
        for (const apt in window.characterSheet.aptitudes) {
            const input = document.getElementById(apt);
            if (input) {
                input.value = window.characterSheet.aptitudes[apt] + (mods[apt]||0);
            }
        }
        // Update skill fields
        for (const fieldName in window.characterSheet.skillFields) {
            const input = document.querySelector(`[data-field="${fieldName}"]`);
            if (input) {
                input.value = window.characterSheet.skillFields[fieldName];
            }
        }
        // Restore custom skills
        restoreCustomSkills();
        // Renderizar equipo y armas (asegura persistencia visual)
        updateEquipmentUI();
        // Mapeo de habilidades a atributos según Eclipse Phase 2e
        const skillToAttribute = {
            'Esquivar': 'ref', 'Armas de Fuego': 'ref', 'Infiltración': 'ref', 'Pilotar': 'ref',
            'Hardware': 'cog', 'Infosec': 'cog', 'Interfaz': 'cog', 'Medicina': 'cog', 'Programación': 'cog',
            'Atletismo': 'som', 'Caída Libre': 'som', 'Combate Cuerpo a Cuerpo': 'som',
            'Percepción': 'int', 'Investigación': 'int', 'Supervivencia': 'int',
            'Engaño': 'sav', 'Kinésica': 'sav', 'Persuasión': 'sav', 'Provocación': 'sav',
            'Psi': 'wil', 'Exótica': 'ref', 'Académico': 'cog', 'Arte': 'int', 'Interés': 'cog', 'Profesional': 'cog'
        };
        // Update skills and their totals
        for (const skill in window.characterSheet.skills) {
            const input = document.querySelector(`[data-skill="${skill}"]`);
            if (input) {
                let base = window.characterSheet.skills[skill];
                input.value = base; // Solo el valor base editable
                // Get the attribute for this skill
                const attribute = skillToAttribute[skill];
                if (attribute && window.characterSheet.aptitudes[attribute]) {
                    const attributeValue = (parseInt(window.characterSheet.aptitudes[attribute])||0) + (mods[attribute]||0);
                    const skillValue = parseInt(base) || 0;
                    const bonus = skillMods[skill]||0;
                    const total = attributeValue + skillValue + bonus;
                    // Update the total display
                    const totalElement = document.querySelector(`[data-skill-total="${skill}"]`);
                    if (totalElement) {
                        totalElement.textContent = total;
                    }
                }
            }
        }
        // Update all skill totals even if they're not in the skills object
        document.querySelectorAll('.skill-value').forEach(input => {
            const skill = input.dataset.skill;
            if (skill.startsWith('custom-')) return; // Skip custom skills, handled separately
            const attribute = skillToAttribute[skill];
            if (attribute && window.characterSheet.aptitudes[attribute]) {
                const attributeValue = (parseInt(window.characterSheet.aptitudes[attribute])||0) + (mods[attribute]||0);
                const skillValue = parseInt(input.value) || 0;
                const bonus = skillMods[skill]||0;
                const total = attributeValue + skillValue + bonus;
                // Update the total display
                const totalElement = document.querySelector(`[data-skill-total="${skill}"]`);
                if (totalElement) {
                    totalElement.textContent = total;
                }
            }
        });
        // Update custom skills
        for (const skillId in window.characterSheet.customSkills) {
            updateCustomSkillTotal(skillId);
        }
        // Update derived stats (con mods)
        document.getElementById('dur').value = (window.characterSheet.dur||30) + (mods.dur||0);
        document.getElementById('wound-threshold').textContent = (window.characterSheet.woundThreshold||0) + (mods.woundThreshold||0);
        document.getElementById('death-rating').textContent = (window.characterSheet.deathRating||0);
        document.getElementById('initiative').textContent = (window.characterSheet.initiative||0) + (mods.initiative||0);
        document.getElementById('movement').textContent = (window.characterSheet.movement||0) + (mods.movement||0);
        // Update points counters
        updateAttributePoints();
        updateSkillPoints();
        // Save to localStorage
        try {
            localStorage.setItem('characterSheet', window.characterSheet.exportToJSON());
        } catch (e) {
            console.error('Error saving data:', e);
        }
    }

    // Función para restaurar habilidades personalizadas
    function restoreCustomSkills() {
        const container = document.getElementById('custom-skills-container');
        // Limpiar habilidades existentes
        container.innerHTML = '';
        
        // Recrear cada habilidad personalizada
        for (const skillId in window.characterSheet.customSkills) {
            const customSkill = window.characterSheet.customSkills[skillId];
            createCustomSkillElement(skillId, customSkill);
        }
    }

    // Función para crear elemento de habilidad personalizada
    function createCustomSkillElement(skillId, customSkill = null) {
        const container = document.getElementById('custom-skills-container');
        
        const skillDiv = document.createElement('div');
        skillDiv.className = 'custom-skill-item';
        skillDiv.innerHTML = `
            <input type="text" placeholder="Nombre de la habilidad" class="custom-skill-name" data-skill-id="${skillId}" value="${customSkill ? customSkill.name || '' : ''}">
            <select class="custom-skill-attribute" data-skill-id="${skillId}">
                <option value="cog" ${customSkill && customSkill.attribute === 'cog' ? 'selected' : ''}>COG</option>
                <option value="int" ${customSkill && customSkill.attribute === 'int' ? 'selected' : ''}>INT</option>
                <option value="ref" ${customSkill && customSkill.attribute === 'ref' ? 'selected' : ''}>REF</option>
                <option value="sav" ${customSkill && customSkill.attribute === 'sav' ? 'selected' : ''}>SAV</option>
                <option value="som" ${customSkill && customSkill.attribute === 'som' ? 'selected' : ''}>SOM</option>
                <option value="wil" ${customSkill && customSkill.attribute === 'wil' ? 'selected' : ''}>WIL</option>
            </select>
            <input type="number" class="skill-value custom-skill-value" data-skill="${skillId}" value="${customSkill ? customSkill.value || 0 : 0}" min="0" max="60">
            <span class="skill-total">Total: <span class="value" data-skill-total="${skillId}">0</span></span>
            <button class="remove-skill" onclick="removeCustomSkill('${skillId}')">×</button>
        `;
        
        container.appendChild(skillDiv);
        
        // Añadir event listeners
        const nameInput = skillDiv.querySelector('.custom-skill-name');
        const attrSelect = skillDiv.querySelector('.custom-skill-attribute');
        const valueInput = skillDiv.querySelector('.custom-skill-value');
        
        nameInput.addEventListener('change', function() {
            if (!window.characterSheet.customSkills[skillId]) {
                window.characterSheet.customSkills[skillId] = {
                    name: '',
                    attribute: 'cog',
                    value: 0
                };
            }
            window.characterSheet.customSkills[skillId].name = this.value;
            updateUI();
        });
        
        attrSelect.addEventListener('change', function() {
            if (!window.characterSheet.customSkills[skillId]) {
                window.characterSheet.customSkills[skillId] = {
                    name: nameInput.value,
                    attribute: 'cog',
                    value: 0
                };
            }
            window.characterSheet.customSkills[skillId].attribute = this.value;
            updateCustomSkillTotal(skillId);
            updateUI();
        });
        
        valueInput.addEventListener('change', function() {
            const oldValue = window.characterSheet.customSkills[skillId] ? window.characterSheet.customSkills[skillId].value : 0;
            const newValue = parseInt(this.value) || 0;
            const diff = newValue - oldValue;
            
            if (diff > 0 && diff > window.characterSheet.skillPoints) {
                this.value = oldValue;
                alert('No tienes suficientes puntos de habilidad disponibles');
                return;
            }
            
            if (!window.characterSheet.customSkills[skillId]) {
                window.characterSheet.customSkills[skillId] = {
                    name: nameInput.value,
                    attribute: attrSelect.value,
                    value: 0
                };
            }
            
            window.characterSheet.customSkills[skillId].value = newValue;
            window.characterSheet.skillPoints -= diff;
            updateCustomSkillTotal(skillId);
            updateSkillPoints();
            updateUI();
        });
        
        // Actualizar el total inicial si ya existe la habilidad
        if (customSkill) {
            updateCustomSkillTotal(skillId);
        }
    }

    // Add event listeners for attribute changes
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('change', function() {
            if (this.id in window.characterSheet.aptitudes) {
                const success = window.characterSheet.updateAptitude(this.id, parseInt(this.value) || 10);
                if (!success) {
                    // Si no hay suficientes puntos, revertir el cambio
                    this.value = window.characterSheet.aptitudes[this.id];
                    alert('No tienes suficientes puntos de atributo disponibles');
                }
            } else if (this.classList.contains('skill-value')) {
                const success = window.characterSheet.addSkill(this.dataset.skill, parseInt(this.value) || 0);
                if (!success) {
                    // Si no hay suficientes puntos, revertir el cambio
                    this.value = window.characterSheet.skills[this.dataset.skill] || 0;
                    alert('No tienes suficientes puntos de habilidad disponibles');
                }
            }
            updateUI();
        });
    });

    // Event listener para plantilla de atributos
    document.getElementById('aptitude-template').addEventListener('change', function() {
        window.characterSheet.applyAptitudeTemplate(this.value);
        updateUI();
    });

    // Event listeners para campos de texto de habilidades
    document.querySelectorAll('.field-input').forEach(input => {
        input.addEventListener('change', function() {
            const fieldName = this.dataset.field;
            window.characterSheet.skillFields[fieldName] = this.value;
            updateUI();
                });
            });

    // Event listener para botón de añadir habilidad personalizada
    document.getElementById('add-custom-skill').addEventListener('click', addCustomSkill);

    // Save button functionality
    const saveButton = document.getElementById('saveButton');
    saveButton.addEventListener('click', function() {
        try {
            localStorage.setItem('characterSheet', window.characterSheet.exportToJSON());
            this.textContent = '¡GUARDADO!';
            setTimeout(() => {
                this.textContent = 'GUARDAR FICHA';
            }, 2000);
        } catch (e) {
            console.error('Error saving data:', e);
            this.textContent = 'ERROR AL GUARDAR';
            setTimeout(() => {
                this.textContent = 'GUARDAR FICHA';
            }, 2000);
        }
    });

    // Reset button functionality
    const resetButton = document.getElementById('resetButton');
    resetButton.addEventListener('click', function() {
        if (confirm('¿Estás seguro de que quieres reiniciar la ficha? Se perderán todos los datos actuales.')) {
            // Limpiar localStorage
            localStorage.removeItem('characterSheet');
            
            // Reiniciar el objeto characterSheet
            window.characterSheet = new CharacterSheet();
            
            // Limpiar habilidades personalizadas del DOM
            const customSkillsContainer = document.getElementById('custom-skills-container');
            customSkillsContainer.innerHTML = '';
            
            // Actualizar la interfaz
            updateUI();
            
            // Mostrar mensaje de confirmación
            this.textContent = '¡REINICIADO!';
            setTimeout(() => {
                this.textContent = 'REINICIAR FICHA';
            }, 2000);
        }
    });

    // Función para añadir habilidad personalizada
    function addCustomSkill() {
        const skillId = 'custom-' + Date.now();
        
        // Crear la habilidad en el objeto
        window.characterSheet.customSkills[skillId] = {
            name: '',
            attribute: 'cog',
            value: 0
        };
        
        // Crear el elemento visual
        createCustomSkillElement(skillId, window.characterSheet.customSkills[skillId]);
    }

    // Función para eliminar habilidad personalizada
    function removeCustomSkill(skillId) {
        if (window.characterSheet.customSkills[skillId]) {
            window.characterSheet.skillPoints += window.characterSheet.customSkills[skillId].value;
            delete window.characterSheet.customSkills[skillId];
        }
        
        const skillDiv = document.querySelector(`[data-skill-id="${skillId}"]`).closest('.custom-skill-item');
        if (skillDiv) {
            skillDiv.remove();
        }
        updateSkillPoints();
        updateUI();
    }

    // Función para actualizar total de habilidad personalizada
    function updateCustomSkillTotal(skillId) {
        const customSkill = window.characterSheet.customSkills[skillId];
        if (customSkill) {
            const attributeValue = window.characterSheet.aptitudes[customSkill.attribute] || 0;
            const total = attributeValue + customSkill.value;
            const totalElement = document.querySelector(`[data-skill-total="${skillId}"]`);
            if (totalElement) {
                totalElement.textContent = total;
            }
        }
    }

    // --- NUEVO: Eliminar ítems de equipo/implantes ---
    window.removeEquipmentItem = function(index) {
        window.characterSheet.equipment.splice(index, 1);
        updateEquipmentUI();
        syncInventoryToFirebase(); // Sincronizar después de eliminar
    };
    function removeImplant(index) {
        window.characterSheet.implants.splice(index, 1);
        updateEquipmentUI();
        syncInventoryToFirebase(); // Sincronizar después de eliminar
    }

    // --- NUEVO: Efectos de implantes ---
    function getImplantEffectFields(effects = {}) {
        // Atributos primarios
        const attrs = ['cog','int','ref','sav','som','wil'];
        // Derivados
        const derived = ['healthPoints','initiative','woundThreshold','movement'];
        // Habilidades oficiales
        const skills = [
            'Esquivar','Armas de Fuego','Infiltración','Pilotar','Hardware','Infosec','Interfaz','Medicina','Programación',
            'Atletismo','Caída Libre','Combate Cuerpo a Cuerpo','Percepción','Investigación','Supervivencia',
            'Engaño','Kinésica','Persuasión','Provocación','Psi','Exótica','Académico','Arte','Interés','Profesional'
        ];
        let html = `<div style='margin-top:8px;'><b>Efectos sobre atributos/habilidades:</b></div>`;
        html += attrs.map(a => `<label style='margin-right:8px;'>${a.toUpperCase()}: <input type='number' style='width:40px' class='effect-input' data-effect='${a}' value='${effects[a]||0}'></label>`).join('');
        html += '<br>';
        html += derived.map(a => `<label style='margin-right:8px;'>${a}: <input type='number' style='width:40px' class='effect-input' data-effect='${a}' value='${effects[a]||0}'></label>`).join('');
        html += `<div style='margin-top:6px;'>Habilidad: <select class='effect-skill-name' style='width:120px'>`;
        html += `<option value=''>--Selecciona--</option>`;
        skills.forEach(skill => {
            html += `<option value='${skill}'${effects.skillName===skill?" selected":''}>${skill}</option>`;
        });
        html += `</select> <input type='number' class='effect-skill-value' style='width:40px' value='${effects.skillValue||0}'> </div>`;
        return html;
    }

    // --- MODIFICADO: Añadir equipo, armas, armaduras, implantes ---
    const addItemButtons = document.querySelectorAll('.add-item');
    let currentForm = null;

    addItemButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (currentForm) return; // Solo un formulario a la vez
            const type = btn.getAttribute('data-type');
            let container, fields, suggestEffects = {};
            if (type === 'weapon') {
                container = document.getElementById('weapons-list');
                fields = [
                    {label: 'Nombre', id: 'weapon-name'},
                    {label: 'Daño', id: 'weapon-damage'},
                    {label: 'Notas', id: 'weapon-notes'}
                ];
            } else if (type === 'armor') {
                container = document.getElementById('armor-list');
                fields = [
                    {label: 'Nombre', id: 'armor-name'},
                    {label: 'Protección', id: 'armor-prot'},
                    {label: 'Notas', id: 'armor-notes'}
                ];
            } else if (type === 'misc') {
                container = document.getElementById('misc-list');
                fields = [
                    {label: 'Nombre', id: 'misc-name'},
                    {label: 'Descripción', id: 'misc-desc'}
                ];
            } else if (type === 'implant') {
                container = document.getElementById('implants-list');
                fields = [
                    {label: 'Nombre', id: 'implant-name'},
                    {label: 'Efectos', id: 'implant-effects'}
                ];
                // Sugerir efectos si el nombre coincide con uno conocido
                // (ejemplo simple, puedes ampliar la lógica)
                setTimeout(() => {
                    const nameInput = document.getElementById('implant-name');
                    if (nameInput) {
                        nameInput.addEventListener('input', function() {
                            if (this.value.toLowerCase().includes('reflejos cableados')) {
                                // Ejemplo: Reflejos Cableados
                                document.querySelector(".effect-input[data-effect='ref']").value = 5;
                                document.querySelector(".effect-input[data-effect='initiative']").value = 5;
                                document.querySelector(".effect-skill-name").value = 'Atletismo';
                                document.querySelector(".effect-skill-value").value = 10;
                                document.querySelectorAll('.effect-input').forEach(inp => inp.dispatchEvent(new Event('change')));
                            }
                        });
                    }
                }, 100);
            }
            // Crear formulario
            const form = document.createElement('div');
            form.className = 'add-item-form';
            form.style.margin = '10px 0';
            form.style.background = 'rgba(30,30,30,0.8)';
            form.style.padding = '10px';
            form.style.borderRadius = '6px';
            form.innerHTML = fields.map(f => `<label style='display:block;margin-bottom:4px;'>${f.label}: <input type='text' id='${f.id}' style='margin-left:5px;'></label>`).join('');
            if (type === 'implant') form.innerHTML += getImplantEffectFields();
            form.innerHTML += `<button class='button' id='confirm-add-item' style='margin-right:8px;'>Añadir</button><button class='button' id='cancel-add-item'>Cancelar</button>`;
            container.appendChild(form);
            currentForm = form;
            // Cancelar
            form.querySelector('#cancel-add-item').onclick = function() {
                form.remove();
                currentForm = null;
            };
            // Confirmar
            form.querySelector('#confirm-add-item').onclick = function() {
                // Recoger datos
                const values = {};
                fields.forEach(f => { values[f.id] = form.querySelector(`#${f.id}`).value.trim(); });
                if (!values[fields[0].id]) { alert('El nombre es obligatorio'); return; }
                // Efectos de implante
                let effects = {};
                if (type === 'implant') {
                    form.querySelectorAll('.effect-input').forEach(inp => { effects[inp.dataset.effect] = parseInt(inp.value)||0; });
                    effects.skillName = form.querySelector('.effect-skill-name').value.trim();
                    effects.skillValue = parseInt(form.querySelector('.effect-skill-value').value)||0;
                }
                // Añadir a la ficha
                if (type === 'weapon') {
                    window.characterSheet.equipment = window.characterSheet.equipment || [];
                    window.characterSheet.equipment.push({tipo: 'arma', nombre: values['weapon-name'], dano: values['weapon-damage'], notas: values['weapon-notes']});
                } else if (type === 'armor') {
                    window.characterSheet.equipment = window.characterSheet.equipment || [];
                    window.characterSheet.equipment.push({tipo: 'armadura', nombre: values['armor-name'], proteccion: values['armor-prot'], notas: values['armor-notes']});
                } else if (type === 'misc') {
                    window.characterSheet.equipment = window.characterSheet.equipment || [];
                    window.characterSheet.equipment.push({tipo: 'equipo', nombre: values['misc-name'], descripcion: values['misc-desc']});
                } else if (type === 'implant') {
                    window.characterSheet.implants = window.characterSheet.implants || [];
                    window.characterSheet.implants.push({nombre: values['implant-name'], efectos: values['implant-effects'], mod: effects});
                }
                // Guardar y actualizar UI
                localStorage.setItem('characterSheet', window.characterSheet.exportToJSON());
                updateEquipmentUI();
                updateUI();
                form.remove();
                currentForm = null;
            };
        });
    });

    // --- MODIFICADO: Renderizar equipo y armas con botón eliminar y efectos de implantes ---
    function updateEquipmentUI() {
        // Armas
        const weaponsList = document.getElementById('weapons-list');
        weaponsList.innerHTML = '';
        const armas = (window.characterSheet.equipment||[]).filter(e => e.tipo === 'arma');
        if (armas.length === 0) weaponsList.innerHTML = '<p>Sin armas equipadas</p>';
        else armas.forEach((a,i) => {
            const div = document.createElement('div');
            div.className = 'gear-item';
            div.style.display = 'flex';
            div.style.alignItems = 'center';
            div.style.gap = '18px';
            div.style.padding = '8px 0';
            div.innerHTML = `
                <span style='font-weight:bold; color:#ff4757; min-width:120px;'>${a.nombre}</span>
                <span style='color:#00ccff; min-width:80px;'>${a.dano ? 'Daño: ' + a.dano : ''}</span>
                <span style='color:#aaa; min-width:120px;'>${a.notas ? 'Notas: ' + a.notas : ''}</span>
                <button class='remove-skill' title='Eliminar' style='margin-left:auto;' onclick='removeEquipmentItem(${i})'>🗑️</button>
            `;
            weaponsList.appendChild(div);
        });
        // Armaduras
        const armorList = document.getElementById('armor-list');
        armorList.innerHTML = '';
        const armaduras = (window.characterSheet.equipment||[]).filter(e => e.tipo === 'armadura');
        if (armaduras.length === 0) armorList.innerHTML = '<p>Sin armadura equipada</p>';
        else armaduras.forEach((a,i) => {
            const div = document.createElement('div');
            div.className = 'gear-item';
            div.style.display = 'flex';
            div.style.alignItems = 'center';
            div.style.gap = '18px';
            div.style.padding = '8px 0';
            div.innerHTML = `
                <span style='font-weight:bold; color:#ff4757; min-width:120px;'>${a.nombre}</span>
                <span style='color:#00ccff; min-width:80px;'>${a.proteccion ? 'Protección: ' + a.proteccion : ''}</span>
                <span style='color:#aaa; min-width:120px;'>${a.notas ? 'Notas: ' + a.notas : ''}</span>
                <button class='remove-skill' title='Eliminar' style='margin-left:auto;' onclick='removeEquipmentItem(${i})'>🗑️</button>
            `;
            armorList.appendChild(div);
        });
        // Equipo
        const miscList = document.getElementById('misc-list');
        miscList.innerHTML = '';
        const equipos = (window.characterSheet.equipment||[]).filter(e => e.tipo === 'equipo');
        if (equipos.length === 0) miscList.innerHTML = '<p>Sin equipo adicional</p>';
        else equipos.forEach((a,i) => {
            const div = document.createElement('div');
            div.className = 'gear-item';
            div.style.display = 'flex';
            div.style.alignItems = 'center';
            div.style.gap = '18px';
            div.style.padding = '8px 0';
            // Detectar si es munición
            const isAmmo = /cargador|cartucho|munici[óo]n|balas|escopeta|rifle|pistola|subfusil|cal\.?/i.test(a.nombre);
            let ammoField = '';
            if (isAmmo) {
                // Campo editable para balas restantes
                if (a.balasRestantes === undefined) a.balasRestantes = '';
                ammoField = `<label style='margin-left:10px;'>Balas: <input type='number' min='0' max='999' value='${a.balasRestantes}' data-ammo-index='${i}' style='width:50px;'></label>`;
            }
            div.innerHTML = `
                <span style='font-weight:bold; color:#ff4757; min-width:120px;'>${a.nombre}</span>
                <span style='color:#aaa; min-width:220px;'>${a.descripcion ? 'Descripción: ' + a.descripcion : ''}</span>
                ${ammoField}
                <button class='remove-skill' title='Eliminar' style='margin-left:auto;' onclick='removeEquipmentItem(${i})'>🗑️</button>
            `;
            miscList.appendChild(div);
        });
        // Listener para campos de balas
        document.querySelectorAll('input[data-ammo-index]').forEach(input => {
            input.addEventListener('change', function() {
                const idx = parseInt(this.getAttribute('data-ammo-index'));
                const value = this.value;
                if (window.characterSheet.equipment[idx]) {
                    window.characterSheet.equipment[idx].balasRestantes = value;
                    localStorage.setItem('characterSheet', window.characterSheet.exportToJSON());
                }
                });
            });
        // Implantes
        const implantsList = document.getElementById('implants-list');
        implantsList.innerHTML = '';
        const implantes = (window.characterSheet.implants||[]);
        if (implantes.length === 0) implantsList.innerHTML = '<p>Sin implantes instalados</p>';
        else implantes.forEach((a,i) => {
            const div = document.createElement('div');
            div.className = 'gear-item';
            div.style.display = 'flex';
            div.style.alignItems = 'center';
            div.style.gap = '18px';
            div.style.padding = '8px 0';
            let modStr = '';
            if (a.mod) {
                modStr = Object.entries(a.mod).filter(([k,v])=>v&&k!=='skillName'&&k!=='skillValue').map(([k,v])=>`${k.toUpperCase()}: ${v>0?'+':''}${v}`).join(' ');
                if (a.mod.skillName && a.mod.skillValue) modStr += ` ${a.mod.skillName}: ${a.mod.skillValue>0?'+':''}${a.mod.skillValue}`;
            }
            div.innerHTML = `
                <span style='font-weight:bold; color:#ff4757; min-width:120px;'>${a.nombre}</span>
                <span style='color:#aaa; min-width:220px;'>${a.efectos ? 'Efectos: ' + a.efectos : ''}</span>
                <span style='color:#00ccff; min-width:120px;'>${modStr}</span>
                <button class='remove-skill' title='Eliminar' style='margin-left:auto;' onclick='removeImplant(${i})'>🗑️</button>
            `;
            implantsList.appendChild(div);
        });
        
        // Sincronizar con Firebase después de actualizar la UI
        syncInventoryToFirebase();
    }

    // --- MODIFICADO: Aplicar efectos de implantes a la ficha ---
    function getImplantModsSum() {
        // Devuelve un objeto con la suma de todos los mods de implantes
        const mods = {cog:0,int:0,ref:0,sav:0,som:0,wil:0,healthPoints:0,initiative:0,woundThreshold:0,movement:0};
        (window.characterSheet.implants||[]).forEach(imp => {
            if (imp.mod) {
                Object.keys(mods).forEach(k => { mods[k] += parseInt(imp.mod[k]||0); });
            }
        });
        // Habilidades: suma por nombre
        const skillMods = {};
        (window.characterSheet.implants||[]).forEach(imp => {
            if (imp.mod && imp.mod.skillName && imp.mod.skillValue) {
                const n = imp.mod.skillName.trim();
                if (n) skillMods[n] = (skillMods[n]||0) + parseInt(imp.mod.skillValue||0);
            }
        });
        return {mods, skillMods};
    }

    // Initial UI update
    updateUI();

    // Hacer funciones globales
    window.addCustomSkill = addCustomSkill;
    window.removeCustomSkill = removeCustomSkill;
    window.removeEquipmentItem = removeEquipmentItem;
    window.removeImplant = removeImplant;

    // Listener para mensajes del padre
    window.addEventListener('message', function(event) {
        if (event.data && event.data.type === 'addItem' && event.data.item) {
            const item = event.data.item;
            if (item.tipo === 'arma' || item.tipo === 'armadura' || item.tipo === 'equipo') {
                window.characterSheet.equipment = window.characterSheet.equipment || [];
                window.characterSheet.equipment.push(item);
                console.log('Añadido a equipment:', item);
            } else if (item.tipo === 'implant' || item.tipo === 'implante') {
                window.characterSheet.implants = window.characterSheet.implants || [];
                window.characterSheet.implants.push(item);
                console.log('Añadido a implants:', item);
            }
            
            // Guardar en localStorage
            localStorage.setItem('characterSheet', window.characterSheet.exportToJSON());
            
            // Actualizar UI
            if (typeof updateEquipmentUI === 'function') {
                updateEquipmentUI();
            }
            if (typeof updateUI === 'function') {
                updateUI();
            }
        }
    });

    // Listener para DUR editable
    const durInput = document.getElementById('dur');
    if (durInput) {
        durInput.addEventListener('change', function() {
            const val = parseInt(this.value) || 30;
            window.characterSheet.dur = val;
            window.characterSheet.updateDerivedStats();
            updateUI();
        });
    }
});