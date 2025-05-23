document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
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

    // Character Sheet Core Logic
    class CharacterSheet {
        constructor() {
            this.initialize();
            this.setupEventListeners();
        }

        initialize() {
            // Initialize aptitudes
            this.aptitudes = {
                vig: 10,
                coo: 10,
                int: 10,
                ref: 10,
                wil: 10,
                sav: 10
            };
            
            // Initialize attribute points
            this.attributePoints = 20;
            this.updateAttributePoints();
            
            // Initialize skills
            this.skills = {};
            this.skillPoints = 400;
            this.updateSkillPoints();
            
            // Initialize equipment
            this.weapons = [];
            this.armor = [];
            this.gear = [];
            
            // Initialize implants
            this.implants = [];
            this.updateCyberMetrics();
            
            // Initialize health
            this.updateDerivedStats();
            
            // Initialize contacts
            this.allies = [];
            this.enemies = [];

            // Inicializar el mapa de atributos para habilidades
            this.skillAttributeMap = {
                // Combate
                'Armas Cuerpo a Cuerpo': 'ref',
                'Pistolas': 'ref',
                'Rifles': 'ref',
                'Subfusiles': 'ref',
                'Escopetas': 'ref',
                'Arcos': 'ref',
                'Lanzamiento': 'ref',
                'Esquivar': 'ref',
                
                // Físicas
                'Atletismo': 'coo',
                'Fuerza': 'vig',
                'Infiltración': 'coo',
                'Sigilo': 'coo',
                
                // Sociales
                'Engaño': 'sav',
                'Intimidación': 'sav',
                'Persuación': 'sav',
                'Protocolo': 'sav',
                
                // Técnicas
                'Conocimiento': 'int',
                'Interfaz': 'int',
                'Medicina': 'int',
                'Percepción': 'int',
                'Profesión': 'int',
                'Programación': 'int',
                'Psicología': 'int',
                'Resistencia': 'vig',
                'Sabiduría': 'int',
                'Tecnología': 'int'
            };

            // Inicializar habilidades personalizadas
            this.customSkills = [];
        }

        setupEventListeners() {
            // Aptitude buttons
            document.querySelectorAll('.aptitude-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const aptitude = e.target.getAttribute('data-aptitude');
                    const operation = e.target.classList.contains('plus') ? 'plus' : 'minus';
                    this.modifyAptitude(aptitude, operation);
                });
            });
            
            // Aptitude direct input
            document.querySelectorAll('.aptitude-value').forEach(input => {
                input.addEventListener('change', (e) => {
                    const aptitude = e.target.getAttribute('data-aptitude');
                    const oldValue = this.aptitudes[aptitude];
                    const newValue = parseInt(e.target.value);
                    
                    if (isNaN(newValue) || newValue < 5) {
                        e.target.value = oldValue;
                        return;
                    }
                    
                    if (newValue > 20) {
                        e.target.value = 20;
                        this.aptitudes[aptitude] = 20;
                    } else {
                        const diff = newValue - oldValue;
                        if (diff > this.attributePoints) {
                            e.target.value = oldValue + this.attributePoints;
                            this.aptitudes[aptitude] = oldValue + this.attributePoints;
                            this.attributePoints = 0;
                        } else {
                            this.aptitudes[aptitude] = newValue;
                            this.attributePoints -= diff;
                        }
                    }
                    
                    this.updateAttributePoints();
                    this.updateDerivedStats();
                });
            });
            
            // Health tracker
            document.getElementById('current-health').addEventListener('change', (e) => {
                const value = parseInt(e.target.value);
                const maxHealth = this.aptitudes.vig * 2;
                
                if (isNaN(value) || value < 0) {
                    e.target.value = 0;
                    this.updateHealthBar(0, maxHealth);
                } else if (value > maxHealth) {
                    e.target.value = maxHealth;
                    this.updateHealthBar(maxHealth, maxHealth);
                } else {
                    this.updateHealthBar(value, maxHealth);
                }
            });
            
            // Wound checkboxes
            document.querySelectorAll('.wound-checkbox input').forEach(checkbox => {
                checkbox.addEventListener('change', () => {
                    // Logic for wound effects could go here
                });
            });
            
            // Merit points
            document.getElementById('merit-points').addEventListener('change', (e) => {
                const value = parseInt(e.target.value);
                if (isNaN(value) || value < 0) {
                    e.target.value = 0;
                }
            });
            
            // Skill values
            document.querySelectorAll('.skill-value').forEach(input => {
                input.addEventListener('change', (e) => {
                    const skillName = e.target.getAttribute('data-skill');
                    const oldValue = this.skills[skillName] || 0;
                    const newValue = parseInt(e.target.value);
                    
                    if (isNaN(newValue) || newValue < 0) {
                        e.target.value = oldValue;
                        return;
                    }
                    
                    if (newValue > 80) {
                        e.target.value = 80;
                        this.skills[skillName] = 80;
                    } else {
                        const diff = newValue - oldValue;
                        if (diff > this.skillPoints) {
                            e.target.value = oldValue + this.skillPoints;
                            this.skills[skillName] = oldValue + this.skillPoints;
                            this.skillPoints = 0;
                        } else {
                            this.skills[skillName] = newValue;
                            this.skillPoints -= diff;
                        }
                    }
                    
                    this.updateSkillPoints();
                });
            });
            
            // Add item buttons
            document.querySelectorAll('.add-item').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const type = e.target.getAttribute('data-type');
                    this.showAddItemDialog(type);
                });
            });
            
            // Add contact buttons
            document.querySelectorAll('.add-contact').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const type = e.target.getAttribute('data-type');
                    this.showAddContactDialog(type);
                });
            });
            
            // Save button
            document.getElementById('save-sheet').addEventListener('click', () => {
                this.saveCharacterSheet();
            });
            
            // Load button
            document.getElementById('load-sheet').addEventListener('click', () => {
                this.loadCharacterSheet();
            });
            
            // Print button
            document.getElementById('print-sheet').addEventListener('click', () => {
                window.print();
            });
            
            // Export button
            document.getElementById('export-sheet').addEventListener('click', () => {
                this.exportCharacterSheet();
            });
            
            // New button
            document.getElementById('new-sheet').addEventListener('click', () => {
                if (confirm('¿Estás seguro de que quieres crear una nueva hoja? Se perderán todos los datos no guardados.')) {
                    this.resetCharacterSheet();
                }
            });
            
            // Random avatar
            document.getElementById('randomize-avatar').addEventListener('click', () => {
                this.randomizeAvatar();
            });

            // Botón para añadir habilidad personalizada
            const addCustomSkillBtn = document.getElementById('add-custom-skill');
            if (addCustomSkillBtn) {
                addCustomSkillBtn.addEventListener('click', () => this.addCustomSkill());
            }

            // Actualizar totales cuando cambien los atributos
            document.querySelectorAll('.aptitude-value').forEach(input => {
                input.addEventListener('change', () => this.updateSkillTotals());
            });

            // Actualizar totales cuando cambien las habilidades
            document.querySelectorAll('.skill-item input').forEach(input => {
                input.addEventListener('change', () => {
                    this.updateSkillTotals();
                    this.saveCharacterSheet();
                });
            });
        }

        modifyAptitude(aptitude, operation) {
            if (operation === 'plus') {
                if (this.aptitudes[aptitude] < 20 && this.attributePoints > 0) {
                    this.aptitudes[aptitude]++;
                    this.attributePoints--;
                    document.getElementById(aptitude).value = this.aptitudes[aptitude];
                }
            } else {
                if (this.aptitudes[aptitude] > 5) {
                    this.aptitudes[aptitude]--;
                    this.attributePoints++;
                    document.getElementById(aptitude).value = this.aptitudes[aptitude];
                }
            }
            
            this.updateAttributePoints();
            this.updateDerivedStats();
        }

        updateAttributePoints() {
            document.getElementById('attribute-points').textContent = this.attributePoints;
        }

        updateSkillPoints() {
            document.getElementById('skill-points').textContent = this.skillPoints;
        }

        updateDerivedStats() {
            // Calculate health points
            const healthPoints = this.aptitudes.vig * 2;
            document.getElementById('health-points').textContent = healthPoints;
            document.getElementById('current-health').value = healthPoints;
            this.updateHealthBar(healthPoints, healthPoints);
            
            // Calculate initiative
            const initiative = Math.floor((this.aptitudes.ref + this.aptitudes.int) / 3);
            document.getElementById('initiative').textContent = initiative;
            
            // Calculate wound threshold
            const woundThreshold = Math.floor((this.aptitudes.vig + this.aptitudes.wil) / 5);
            document.getElementById('wound-threshold').textContent = woundThreshold;
            
            // Update trauma threshold
            const maxTraumas = Math.floor(this.aptitudes.wil / 2);
            document.getElementById('traumas').textContent = `0/${maxTraumas}`;
            
            // Update wound checkboxes
            this.updateWoundCheckboxes(woundThreshold);
        }

        updateHealthBar(current, max) {
            const percentage = (current / max) * 100;
            const healthBar = document.querySelector('.health-bar-fill');
            healthBar.style.width = `${percentage}%`;
            
            // Update color based on health percentage
            if (percentage <= 25) {
                healthBar.style.background = 'red';
            } else if (percentage <= 50) {
                healthBar.style.background = 'orange';
            } else if (percentage <= 75) {
                healthBar.style.background = 'yellow';
            } else {
                healthBar.style.background = 'linear-gradient(90deg, #ff0, #0f0)';
            }
        }

        updateWoundCheckboxes(threshold) {
            const woundContainer = document.querySelector('.wounds-tracker');
            woundContainer.innerHTML = '';
            
            for (let i = 1; i <= threshold; i++) {
                const woundDiv = document.createElement('div');
                woundDiv.className = 'wound-checkbox';
                woundDiv.setAttribute('data-wound', i);
                
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = `wound-${i}`;
                
                const label = document.createElement('label');
                label.htmlFor = `wound-${i}`;
                label.textContent = `Herida ${i}`;
                
                woundDiv.appendChild(checkbox);
                woundDiv.appendChild(label);
                woundContainer.appendChild(woundDiv);
            }
        }

        updateCyberMetrics() {
            const implantCount = this.implants.length;
            const maxImplants = 10;
            
            document.getElementById('cyber-count').textContent = `${implantCount}/${maxImplants}`;
            
            // Calculate cyber level (infection)
            const cyberLevel = implantCount * 10;
            document.getElementById('cyber-level').textContent = `${cyberLevel}%`;
            
            // Calculate vulnerability
            let vulnLevel = 'Baja';
            if (cyberLevel > 60) {
                vulnLevel = 'Alta';
            } else if (cyberLevel > 30) {
                vulnLevel = 'Media';
            }
            document.getElementById('cyber-vuln').textContent = vulnLevel;
            
            // Update markers on the body diagram
            this.updateCyberMarkers();
        }

        updateCyberMarkers() {
            const markersContainer = document.querySelector('.cyber-markers');
            markersContainer.innerHTML = '';
            
            // Define body part positions (percentages)
            const positions = {
                'head': { x: 50, y: 15 },
                'eyes': { x: 50, y: 10 },
                'ears': { x: 65, y: 15 },
                'arm-r': { x: 70, y: 35 },
                'arm-l': { x: 30, y: 35 },
                'torso': { x: 50, y: 40 },
                'leg-r': { x: 60, y: 70 },
                'leg-l': { x: 40, y: 70 },
                'skin': { x: 50, y: 90 }
            };
            
            // Create markers for each implant
            this.implants.forEach(implant => {
                const location = implant.location;
                if (positions[location]) {
                    const marker = document.createElement('div');
                    marker.className = 'cyber-marker';
                    marker.style.left = `${positions[location].x}%`;
                    marker.style.top = `${positions[location].y}%`;
                    marker.setAttribute('data-implant', implant.name);
                    marker.title = implant.name;
                    
                    // Set color based on implant status
                    if (implant.status === 'damaged') {
                        marker.style.backgroundColor = 'orange';
                    } else if (implant.status === 'disabled') {
                        marker.style.backgroundColor = 'red';
                    }
                    
                    markersContainer.appendChild(marker);
                }
            });
        }

        showAddItemDialog(type) {
            // Create overlay
            const overlay = document.createElement('div');
            overlay.className = 'dialog-overlay';
            
            // Clone the appropriate template
            let template;
            switch (type) {
                case 'weapon':
                    template = document.getElementById('weapon-dialog-template').cloneNode(true);
                    break;
                case 'armor':
                    template = document.getElementById('armor-dialog-template').cloneNode(true);
                    break;
                case 'misc':
                    template = document.getElementById('gear-dialog-template').cloneNode(true);
                    break;
                case 'cyber':
                    template = document.getElementById('implant-dialog-template').cloneNode(true);
                    break;
                default:
                    return;
            }
            
            // Create dialog from template
            const dialog = document.createElement('div');
            dialog.className = 'dialog';
            dialog.innerHTML = template.innerHTML;
            
            // Add dialog to overlay
            overlay.appendChild(dialog);
            document.body.appendChild(overlay);
            
            // Setup buttons
            dialog.querySelector('.cancel-button').addEventListener('click', () => {
                document.body.removeChild(overlay);
            });
            
            dialog.querySelector('.confirm-button').addEventListener('click', () => {
                // Process form data based on type
                switch (type) {
                    case 'weapon':
                        this.addWeapon(dialog);
                        break;
                    case 'armor':
                        this.addArmor(dialog);
                        break;
                    case 'misc':
                        this.addGear(dialog);
                        break;
                    case 'cyber':
                        this.addImplant(dialog);
                        break;
                }
                
                document.body.removeChild(overlay);
            });
        }

        showAddContactDialog(type) {
            // Create overlay
            const overlay = document.createElement('div');
            overlay.className = 'dialog-overlay';
            
            // Clone the template
            const template = document.getElementById('contact-dialog-template').cloneNode(true);
            
            // Create dialog from template
            const dialog = document.createElement('div');
            dialog.className = 'dialog';
            dialog.innerHTML = template.innerHTML;
            
            // Update dialog title based on type
            dialog.querySelector('.dialog-header h4').textContent = type === 'ally' ? 'Añadir Aliado' : 'Añadir Enemigo';
            
            // Add dialog to overlay
            overlay.appendChild(dialog);
            document.body.appendChild(overlay);
            
            // Setup buttons
            dialog.querySelector('.cancel-button').addEventListener('click', () => {
                document.body.removeChild(overlay);
            });
            
            dialog.querySelector('.confirm-button').addEventListener('click', () => {
                this.addContact(dialog, type);
                document.body.removeChild(overlay);
            });
        }

        addWeapon(dialog) {
            const name = dialog.querySelector('#weapon-name').value;
            if (!name) return;
            
            const type = dialog.querySelector('#weapon-type').value;
            const damage = dialog.querySelector('#weapon-damage').value;
            const range = dialog.querySelector('#weapon-range').value;
            const notes = dialog.querySelector('#weapon-notes').value;
            
            const weapon = { name, type, damage, range, notes };
            this.weapons.push(weapon);
            
            // Update the weapons list
            this.updateWeaponsList();
        }

        addArmor(dialog) {
            const name = dialog.querySelector('#armor-name').value;
            if (!name) return;
            
            const location = dialog.querySelector('#armor-location').value;
            const kinetic = dialog.querySelector('#armor-kinetic').value;
            const energy = dialog.querySelector('#armor-energy').value;
            const notes = dialog.querySelector('#armor-notes').value;
            
            const armor = { name, location, kinetic, energy, notes };
            this.armor.push(armor);
            
            // Update the armor list
            this.updateArmorList();
            
            // Update the armor stat display
            this.updateArmorStat();
        }

        addGear(dialog) {
            const name = dialog.querySelector('#gear-name').value;
            if (!name) return;
            
            const type = dialog.querySelector('#gear-type').value;
            const description = dialog.querySelector('#gear-desc').value;
            
            const gear = { name, type, description };
            this.gear.push(gear);
            
            // Update the gear list
            this.updateGearList();
        }

        addImplant(dialog) {
            const name = dialog.querySelector('#implant-name').value;
            if (!name) return;
            
            const location = dialog.querySelector('#implant-location').value;
            const level = dialog.querySelector('#implant-level').value;
            const effects = dialog.querySelector('#implant-effects').value;
            const status = dialog.querySelector('#implant-status').value;
            
            const implant = { name, location, level, effects, status };
            this.implants.push(implant);
            
            // Update the implants list and metrics
            this.updateImplantsList();
            this.updateCyberMetrics();
        }

        addContact(dialog, type) {
            const name = dialog.querySelector('#contact-name').value;
            if (!name) return;
            
            const relation = dialog.querySelector('#contact-relation').value;
            const description = dialog.querySelector('#contact-desc').value;
            
            const contact = { name, relation, description };
            
            if (type === 'ally') {
                this.allies.push(contact);
                this.updateAlliesList();
            } else {
                this.enemies.push(contact);
                this.updateEnemiesList();
            }
        }

        updateWeaponsList() {
            const list = document.getElementById('weapons-list');
            list.innerHTML = '';
            
            if (this.weapons.length === 0) {
                const row = document.createElement('tr');
                row.className = 'empty-row';
                row.innerHTML = '<td colspan="5"><em>Sin armas equipadas</em></td>';
                list.appendChild(row);
                return;
            }
            
            this.weapons.forEach((weapon, index) => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${weapon.name}</td>
                    <td>${this.getWeaponTypeName(weapon.type)}</td>
                    <td>${weapon.damage}</td>
                    <td>${weapon.range}</td>
                    <td>
                        <span>${weapon.notes}</span>
                        <button class="button small-button delete-item" data-type="weapon" data-index="${index}">✕</button>
                    </td>
                `;
                
                list.appendChild(row);
            });
            
            // Add event listeners to delete buttons
            list.querySelectorAll('.delete-item').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const type = e.target.getAttribute('data-type');
                    const index = parseInt(e.target.getAttribute('data-index'));
                    this.deleteItem(type, index);
                });
            });
        }

        updateArmorList() {
            const list = document.getElementById('armor-list');
            list.innerHTML = '';
            
            if (this.armor.length === 0) {
                const row = document.createElement('tr');
                row.className = 'empty-row';
                row.innerHTML = '<td colspan="4"><em>Sin armadura equipada</em></td>';
                list.appendChild(row);
                return;
            }
            
            this.armor.forEach((armor, index) => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${armor.name}</td>
                    <td>${this.getArmorLocationName(armor.location)}</td>
                    <td>${armor.kinetic}/${armor.energy}</td>
                    <td>
                        <span>${armor.notes}</span>
                        <button class="button small-button delete-item" data-type="armor" data-index="${index}">✕</button>
                    </td>
                `;
                
                list.appendChild(row);
            });
            
            // Add event listeners to delete buttons
            list.querySelectorAll('.delete-item').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const type = e.target.getAttribute('data-type');
                    const index = parseInt(e.target.getAttribute('data-index'));
                    this.deleteItem(type, index);
                });
            });
        }

        updateGearList() {
            const list = document.getElementById('misc-list');
            list.innerHTML = '';
            
            if (this.gear.length === 0) {
                const row = document.createElement('tr');
                row.className = 'empty-row';
                row.innerHTML = '<td colspan="3"><em>Sin equipo adicional</em></td>';
                list.appendChild(row);
                return;
            }
            
            this.gear.forEach((gear, index) => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${gear.name}</td>
                    <td>${this.getGearTypeName(gear.type)}</td>
                    <td>
                        <span>${gear.description}</span>
                        <button class="button small-button delete-item" data-type="gear" data-index="${index}">✕</button>
                    </td>
                `;
                
                list.appendChild(row);
            });
            
            // Add event listeners to delete buttons
            list.querySelectorAll('.delete-item').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const type = e.target.getAttribute('data-type');
                    const index = parseInt(e.target.getAttribute('data-index'));
                    this.deleteItem(type, index);
                });
            });
        }

        updateImplantsList() {
            const list = document.getElementById('implants-list');
            list.innerHTML = '';
            
            if (this.implants.length === 0) {
                const row = document.createElement('tr');
                row.className = 'empty-row';
                row.innerHTML = '<td colspan="5"><em>Sin implantes cibernéticos</em></td>';
                list.appendChild(row);
                return;
            }
            
            this.implants.forEach((implant, index) => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${implant.name}</td>
                    <td>${this.getImplantLocationName(implant.location)}</td>
                    <td>${this.getImplantLevelName(implant.level)}</td>
                    <td>${implant.effects}</td>
                    <td>
                        <span class="status-${implant.status}">${this.getImplantStatusName(implant.status)}</span>
                        <button class="button small-button delete-item" data-type="implant" data-index="${index}">✕</button>
                    </td>
                `;
                
                list.appendChild(row);
            });
            
            // Add event listeners to delete buttons
            list.querySelectorAll('.delete-item').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const type = e.target.getAttribute('data-type');
                    const index = parseInt(e.target.getAttribute('data-index'));
                    this.deleteItem(type, index);
                });
            });
        }

        updateAlliesList() {
            const list = document.getElementById('allies-list');
            list.innerHTML = '';
            
            if (this.allies.length === 0) {
                list.innerHTML = '<div class="empty-contacts">Sin aliados registrados</div>';
                return;
            }
            
            this.allies.forEach((ally, index) => {
                const card = document.createElement('div');
                card.className = 'contact-card';
                
                card.innerHTML = `
                    <div class="contact-name">${ally.name}</div>
                    <div class="contact-relation">${ally.relation}</div>
                    <div class="contact-desc">${ally.description}</div>
                    <button class="delete-contact" data-type="ally" data-index="${index}">✕</button>
                `;
                
                list.appendChild(card);
            });
            
            // Add event listeners to delete buttons
            list.querySelectorAll('.delete-contact').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const type = e.target.getAttribute('data-type');
                    const index = parseInt(e.target.getAttribute('data-index'));
                    this.deleteContact(type, index);
                });
            });
        }

        updateEnemiesList() {
            const list = document.getElementById('enemies-list');
            list.innerHTML = '';
            
            if (this.enemies.length === 0) {
                list.innerHTML = '<div class="empty-contacts">Sin enemigos registrados</div>';
                return;
            }
            
            this.enemies.forEach((enemy, index) => {
                const card = document.createElement('div');
                card.className = 'contact-card';
                
                card.innerHTML = `
                    <div class="contact-name">${enemy.name}</div>
                    <div class="contact-relation">${enemy.relation}</div>
                    <div class="contact-desc">${enemy.description}</div>
                    <button class="delete-contact" data-type="enemy" data-index="${index}">✕</button>
                `;
                
                list.appendChild(card);
            });
            
            // Add event listeners to delete buttons
            list.querySelectorAll('.delete-contact').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const type = e.target.getAttribute('data-type');
                    const index = parseInt(e.target.getAttribute('data-index'));
                    this.deleteContact(type, index);
                });
            });
        }

        updateArmorStat() {
            let highestKinetic = 0;
            let highestEnergy = 0;
            
            // Calculate the best armor values based on coverage
            // This is a simplified version, a real implementation would need to handle overlapping armor
            this.armor.forEach(armor => {
                const kinetic = parseInt(armor.kinetic) || 0;
                const energy = parseInt(armor.energy) || 0;
                
                if (armor.location === 'full') {
                    // Full body armor provides base protection everywhere
                    highestKinetic = Math.max(highestKinetic, kinetic);
                    highestEnergy = Math.max(highestEnergy, energy);
                } else {
                    // Other armor pieces provide additional protection to specific areas
                    // For simplicity, we're just taking the highest values here
                    highestKinetic = Math.max(highestKinetic, kinetic);
                    highestEnergy = Math.max(highestEnergy, energy);
                }
            });
            
            document.getElementById('armor').textContent = `${highestKinetic}/${highestEnergy}`;
        }

        deleteItem(type, index) {
            switch (type) {
                case 'weapon':
                    this.weapons.splice(index, 1);
                    this.updateWeaponsList();
                    break;
                case 'armor':
                    this.armor.splice(index, 1);
                    this.updateArmorList();
                    this.updateArmorStat();
                    break;
                case 'gear':
                    this.gear.splice(index, 1);
                    this.updateGearList();
                    break;
                case 'implant':
                    this.implants.splice(index, 1);
                    this.updateImplantsList();
                    this.updateCyberMetrics();
                    break;
            }
        }

        deleteContact(type, index) {
            if (type === 'ally') {
                this.allies.splice(index, 1);
                this.updateAlliesList();
            } else {
                this.enemies.splice(index, 1);
                this.updateEnemiesList();
            }
        }

        getWeaponTypeName(type) {
            const types = {
                'melee': 'Cuerpo a Cuerpo',
                'pistol': 'Pistola',
                'smg': 'Subfusil',
                'shotgun': 'Escopeta',
                'rifle': 'Rifle',
                'heavy': 'Arma Pesada',
                'exotic': 'Exótica'
            };
            return types[type] || type;
        }

        getArmorLocationName(location) {
            const locations = {
                'full': 'Cuerpo Completo',
                'torso': 'Torso',
                'head': 'Cabeza',
                'arms': 'Brazos',
                'legs': 'Piernas'
            };
            return locations[location] || location;
        }

        getGearTypeName(type) {
            const types = {
                'medical': 'Médico',
                'tech': 'Tecnología',
                'survival': 'Supervivencia',
                'tools': 'Herramientas',
                'comms': 'Comunicaciones',
                'misc': 'Misceláneo'
            };
            return types[type] || type;
        }

        getImplantLocationName(location) {
            const locations = {
                'head': 'Cabeza/Cerebro',
                'eyes': 'Ojos',
                'ears': 'Oídos',
                'arm-r': 'Brazo Derecho',
                'arm-l': 'Brazo Izquierdo',
                'torso': 'Torso',
                'leg-r': 'Pierna Derecha',
                'leg-l': 'Pierna Izquierda',
                'skin': 'Piel/Sistema'
            };
            return locations[location] || location;
        }

        getImplantLevelName(level) {
            const levels = {
                'basic': 'Básico',
                'standard': 'Estándar',
                'advanced': 'Avanzado',
                'bleeding': 'Bleeding Edge'
            };
            return levels[level] || level;
        }

        getImplantStatusName(status) {
            const statuses = {
                'active': 'Activo',
                'damaged': 'Dañado',
                'disabled': 'Desactivado'
            };
            return statuses[status] || status;
        }

        calculateSkillTotal(skillName, skillValue) {
            const attribute = this.skillAttributeMap[skillName];
            if (!attribute) return skillValue; // Para habilidades personalizadas
            
            const attributeValue = parseInt(document.getElementById(attribute).value) || 0;
            return skillValue + attributeValue;
        }

        updateSkillTotals() {
            document.querySelectorAll('.skill-item').forEach(item => {
                const skillName = item.querySelector('label').textContent;
                const skillValue = parseInt(item.querySelector('input').value) || 0;
                const total = this.calculateSkillTotal(skillName, skillValue);
                
                // Actualizar o crear el elemento que muestra el total
                let totalElement = item.querySelector('.skill-total');
                if (!totalElement) {
                    totalElement = document.createElement('span');
                    totalElement.className = 'skill-total';
                    item.appendChild(totalElement);
                }
                totalElement.textContent = `(${total})`;
            });
        }

        addCustomSkill(name = '', value = '0') {
            const customSkillsContainer = document.getElementById('custom-skills');
            const customSkillDiv = document.createElement('div');
            customSkillDiv.className = 'custom-skill-item';
            customSkillDiv.innerHTML = `
                <input type="text" class="custom-skill-name" value="${name}" placeholder="Nombre de la habilidad">
                <input type="number" class="custom-skill-value" value="${value}" min="0" max="60">
                <button class="remove-skill-btn"><i class="fas fa-times"></i></button>
            `;

            customSkillsContainer.appendChild(customSkillDiv);

            // Añadir eventos
            const removeBtn = customSkillDiv.querySelector('.remove-skill-btn');
            removeBtn.addEventListener('click', () => {
                customSkillDiv.remove();
                this.saveCharacterSheet();
            });

            const inputs = customSkillDiv.querySelectorAll('input');
            inputs.forEach(input => {
                input.addEventListener('change', () => {
                    this.saveCharacterSheet();
                    this.updateSkillTotals();
                });
            });

            // Guardar la habilidad personalizada
            this.customSkills.push({ name, value });
            this.saveCharacterSheet();
        }

        saveCharacterSheet() {
            const user = localStorage.getItem('currentUser');
            if (!user) return;

            const characterData = {
                basics: {
                    name: document.getElementById('character-name').value,
                    concept: document.getElementById('character-concept').value,
                    background: document.getElementById('character-background').value,
                    debt: document.getElementById('character-debt').value
                },
                attributes: {
                    vig: document.getElementById('vig').value,
                    coo: document.getElementById('coo').value,
                    int: document.getElementById('int').value,
                    ref: document.getElementById('ref').value,
                    wil: document.getElementById('wil').value,
                    sav: document.getElementById('sav').value
                },
                skills: {},
                customSkills: this.customSkills
            };

            // Guardar habilidades normales
            document.querySelectorAll('.skill-item').forEach(item => {
                const skillName = item.querySelector('label').textContent;
                const skillValue = item.querySelector('input').value;
                characterData.skills[skillName] = skillValue;
            });

            // Guardar en localStorage con el prefijo del usuario
            localStorage.setItem(`characterSheet_${user}`, JSON.stringify(characterData));
        }

        loadCharacterSheet() {
            const user = localStorage.getItem('currentUser');
            if (!user) return;

            const savedData = localStorage.getItem(`characterSheet_${user}`);
            if (!savedData) return;

            const characterData = JSON.parse(savedData);

            // Cargar datos básicos
            document.getElementById('character-name').value = characterData.basics.name || '';
            document.getElementById('character-concept').value = characterData.basics.concept || '';
            document.getElementById('character-background').value = characterData.basics.background || '';
            document.getElementById('character-debt').value = characterData.basics.debt || '';

            // Cargar atributos
            Object.entries(characterData.attributes).forEach(([attr, value]) => {
                document.getElementById(attr).value = value;
            });

            // Cargar habilidades normales
            Object.entries(characterData.skills).forEach(([skill, value]) => {
                const skillInput = document.querySelector(`.skill-item input[data-skill="${skill}"]`);
                if (skillInput) {
                    skillInput.value = value;
                }
            });

            // Cargar habilidades personalizadas
            this.customSkills = characterData.customSkills || [];
            const customSkillsContainer = document.getElementById('custom-skills');
            customSkillsContainer.innerHTML = '';
            this.customSkills.forEach(skill => {
                this.addCustomSkill(skill.name, skill.value);
            });

            // Actualizar totales
            this.updateSkillTotals();
        }

        exportCharacterSheet() {
            // Gather all data from form fields (same as saveCharacterSheet)
            const characterData = {
                name: document.getElementById('character-name').value,
                concept: document.getElementById('character-concept').value,
                background: document.getElementById('character-background').value,
                debt: document.getElementById('character-debt').value,
                aptitudes: this.aptitudes,
                attributePoints: this.attributePoints,
                skills: this.skills,
                skillPoints: this.skillPoints,
                weapons: this.weapons,
                armor: this.armor,
                gear: this.gear,
                implants: this.implants,
                meritPoints: document.getElementById('merit-points').value,
                currentHealth: document.getElementById('current-health').value,
                allies: this.allies,
                enemies: this.enemies,
                notes: document.getElementById('character-notes').value
            };
            
            // Convert to JSON string
            const jsonData = JSON.stringify(characterData, null, 2);
            
            // Create blob and download link
            const blob = new Blob([jsonData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `${characterData.name || 'personaje'}_ultimate_mercenary.json`;
            document.body.appendChild(a);
            a.click();
            
            // Clean up
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 100);
        }

        resetCharacterSheet() {
            // Reset all fields to default values
            document.getElementById('character-name').value = '';
            document.getElementById('character-concept').value = '';
            document.getElementById('character-background').value = '';
            document.getElementById('character-debt').value = '';
            
            // Reset aptitudes
            this.aptitudes = {
                vig: 10, coo: 10, int: 10, ref: 10, wil: 10, sav: 10
            };
            this.attributePoints = 20;
            
            // Update aptitude display
            for (const apt in this.aptitudes) {
                document.getElementById(apt).value = this.aptitudes[apt];
            }
            this.updateAttributePoints();
            
            // Reset skills
            this.skills = {};
            this.skillPoints = 400;
            
            // Update skill display
            document.querySelectorAll('.skill-value').forEach(input => {
                input.value = 0;
            });
            this.updateSkillPoints();
            
            // Reset equipment
            this.weapons = [];
            this.armor = [];
            this.gear = [];
            
            // Update equipment display
            this.updateWeaponsList();
            this.updateArmorList();
            this.updateGearList();
            
            // Reset implants
            this.implants = [];
            
            // Update implants display
            this.updateImplantsList();
            this.updateCyberMetrics();
            
            // Reset status
            document.getElementById('merit-points').value = 0;
            document.getElementById('current-health').value = this.aptitudes.vig * 2;
            this.updateHealthBar(this.aptitudes.vig * 2, this.aptitudes.vig * 2);
            
            // Reset contacts
            this.allies = [];
            this.enemies = [];
            
            // Update contacts display
            this.updateAlliesList();
            this.updateEnemiesList();
            
            // Reset notes
            document.getElementById('character-notes').value = '';
            
            // Update derived stats
            this.updateDerivedStats();
            document.getElementById('armor').textContent = '0/0';
            
            alert('Nueva hoja de personaje creada.');
        }

        randomizeAvatar() {
            // This is a placeholder for a more advanced avatar generation feature
            // In a real application, this might use an API to generate a character portrait
            alert('Función no implementada - En una versión completa, esta función generaría un avatar aleatorio para tu personaje.');
        }
    }

    // Initialize the character sheet
    const characterSheet = new CharacterSheet();

    // Add missing cyber diagram image
    const cyberDiagram = document.querySelector('.body-image');
    if (cyberDiagram) {
        cyberDiagram.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMzAwIj48c3R5bGU+LmJvZHktb3V0bGluZXtmaWxsOm5vbmU7c3Ryb2tlOiMwMGYyZmY7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO30uYm9keS1wYXJ0e2ZpbGw6cmdiYSgwLDI0MiwyNTUsMC4xKTtzdHJva2U6IzAwZjJmZjtzdHJva2Utd2lkdGg6MTt9PC9zdHlsZT48cGF0aCBjbGFzcz0iYm9keS1vdXRsaW5lIiBkPSJNMTAwLDI4MCBMMTAwLDI0MCBMNjAsMTYwIEw2MCw3MCBBNDAsNDAgMCAwIDEgMTAwLDMwIEwxMDAsMTAgTDEwMCwzMCBBNDAsNDAgMCAwIDEgMTQwLDcwIEwxNDAsODAgTDE0MCwxNjAgTDEwMCwyNDAgTDEwMCwyODAiIC8+PHBhdGggY2xhc3M9ImJvZHktb3V0bGluZSIgZD0iTTYwLDgwIEw1MCw4MCBMNDA8MTAwIEwyMCwxMDAgTDQwLDEwMCBMNDAsMTMwIEw2MCwxNDAiIC8+PHBhdGggY2xhc3M9ImJvZHktb3V0bGluZSIgZD0iTTE0MCw4MCBMMTUwLDgwIEwxNjA8MTAwIEwxODAsMTAwIEwxNjAsMTAwIEwxNjAsMTMwIEwxNDAsODAiIC8+PHBhdGggY2xhc3M9ImJvZHktb3V0bGluZSIgZD0iTTEwMCwyNDAgTDcwLDI0MCBMNjAsMjgwIiBkPSJNMTAwLDI0MCBMMTMwLDI0MCBMMTQwLDI4MCIgLz48Y2lyY2xlIGNsYXNzPSJib2R5LXBhcnQiIGN4PSIxMDAiIGN5PSIzMCIgcj0iMjAiIC8+PHJlY3QgY2xhc3M9ImJvZHktcGFydCIgeD0iNzAiIHk9IjgwIiB3aWR0aD0iNjAiIGhlaWdodD0iODAiIHJ4PSIxMCIgLz48cmVjdCBjbGFzcz0iYm9keS1wYXJ0IiB4PSI3MCIgeT0iMTYwIiB3aWR0aD0iNjAiIGhlaWdodD0iODAiIHJ4PSIxMCIgLz48cGF0aCBjbGFzcz0iYm9keS1wYXJ0IiBkPSJNNjAsODAgTDIwLDEwMCBMMzAsMTMwIEw2MCwxNDAiIC8+PHBhdGggY2xhc3M9ImJvZHktcGFydCIgZD0iTTE0MCw4MCBMMTgwLDEwMCBMMTcwLDEzMCBMMTQwLDE0MCIgLz48cGF0aCBjbGFzcz0iYm9keS1wYXJ0IiBkPSJNNzAsMjQwIEw1MCwyODAgTDcwLDI5MCBMODAsMjUwIiBkPSJNMTMwLDI0MCBMMTUwLDI4MCBMMTMwLDI5MCBMMTIwLDI1MCIgLz48L3N2Zz4=';
    }
});