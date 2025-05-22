// Elementos del DOM
const addItemButton = document.querySelector('.add-item-button');
const modal = document.getElementById('addItemModal');
const closeButton = document.querySelector('.close');
const cancelButton = document.querySelector('.cancel-btn');
const addItemForm = document.getElementById('addItemForm');
const notification = document.getElementById('notification');

// Función para mostrar el modal
function showModal() {
    if (!modal) {
        console.error('Modal no encontrado');
        return;
    }
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Previene el scroll
}

// Función para ocultar el modal
function hideModal() {
    if (!modal) {
        console.error('Modal no encontrado');
        return;
    }
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaura el scroll
    if (addItemForm) {
        addItemForm.reset(); // Limpia el formulario
    }
}

// Función para mostrar notificaciones
function showNotification(message, type = 'success') {
    if (!notification) {
        console.error('Elemento de notificación no encontrado');
        return;
    }
    notification.textContent = message;
    notification.style.borderLeftColor = type === 'success' ? 'var(--secondary-color)' : '#ff4444';
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Función para guardar items en localStorage
function saveItem(item) {
    const items = JSON.parse(localStorage.getItem('shopItems') || '[]');
    items.push({
        ...item,
        id: Date.now(), // Identificador único
        dateAdded: new Date().toISOString()
    });
    localStorage.setItem('shopItems', JSON.stringify(items));
}

// Función para cargar items desde localStorage
function loadItems() {
    return JSON.parse(localStorage.getItem('shopItems') || '[]');
}

// Función para añadir un item a la tabla correspondiente
function addItemToTable(item) {
    const table = document.querySelector(`#${item.category} table.shop-table`);
    if (!table) {
        console.error(`Tabla para categoría ${item.category} no encontrada`);
        return;
    }

    const tbody = table.querySelector('tbody');
    if (!tbody) {
        console.error('Tbody no encontrado en la tabla');
        return;
    }

    const row = document.createElement('tr');
    
    // Crear las celdas según la categoría
    switch(item.category) {
        case 'armas':
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.description}</td>
                <td>-</td>
                <td>-</td>
                <td class="price">${item.price} PM</td>
            `;
            break;
        case 'armaduras':
            row.innerHTML = `
                <td>${item.name}</td>
                <td>-</td>
                <td>${item.description}</td>
                <td>-</td>
                <td class="price">${item.price} PM</td>
            `;
            break;
        case 'equipment':
        case 'implants':
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.description}</td>
                <td>-</td>
                <td class="price">${item.price} PM</td>
            `;
            break;
        case 'services':
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.description}</td>
                <td class="price">${item.price} PM</td>
            `;
            break;
        default:
            console.error(`Categoría desconocida: ${item.category}`);
            return;
    }

    tbody.appendChild(row);
}

// Función para cargar todos los items guardados
function loadAllItems() {
    const items = loadItems();
    items.forEach(item => addItemToTable(item));
}

// Inicialización de event listeners
function initializeEventListeners() {
    if (addItemButton) {
        addItemButton.addEventListener('click', showModal);
    } else {
        console.error('Botón de añadir item no encontrado');
    }

    if (closeButton) {
        closeButton.addEventListener('click', hideModal);
    }

    if (cancelButton) {
        cancelButton.addEventListener('click', hideModal);
    }

    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            hideModal();
        }
    });

    if (addItemForm) {
        addItemForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = {
                name: document.getElementById('itemName').value,
                category: document.getElementById('itemCategory').value,
                price: document.getElementById('itemPrice').value,
                description: document.getElementById('itemDescription').value
            };

            try {
                // Guardar el item
                saveItem(formData);
                
                // Añadir el item a la tabla correspondiente
                addItemToTable(formData);
                
                showNotification('Item añadido exitosamente');
                hideModal();
            } catch (error) {
                console.error('Error al añadir item:', error);
                showNotification('Error al añadir el item', 'error');
            }
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    loadAllItems();
});

// Funcionalidades para el editor de la tienda y la visualización de imágenes

document.addEventListener('DOMContentLoaded', function() {
    // 1. Funcionalidad para agregar botones de edición a cada sección de la tienda
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabContents.forEach(tab => {
        // Crear botón de añadir para cada sección
        const addButton = document.createElement('button');
        addButton.className = 'add-item-button';
        addButton.innerHTML = '<i class="fas fa-plus"></i>';
        addButton.title = 'Añadir nuevo item';
        
        // Añadir evento al botón
        addButton.addEventListener('click', function() {
            const tabId = tab.id;
            showAddItemForm(tabId);
        });
        
        // Añadir el botón a la sección
        tab.appendChild(addButton);
    });

    // Cargar items guardados al iniciar
    loadSavedItems();
});

// Función para mostrar el formulario de añadir item
function showAddItemForm(tabId) {
    // Crear el modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    
    let formTitle = '';
    let formFields = '';
    
    // Ajustar los campos según la categoría
    switch(tabId) {
        case 'weapons':
            formTitle = 'Añadir Nueva Arma';
            formFields = `
                <div class="form-group">
                    <label for="item-name">Nombre del Arma:</label>
                    <input type="text" id="item-name" required>
                </div>
                <div class="form-group">
                    <label for="item-description">Descripción:</label>
                    <input type="text" id="item-description" required>
                </div>
                <div class="form-group">
                    <label for="item-damage">Daño:</label>
                    <input type="text" id="item-damage" placeholder="Ej: 2d10+2">
                </div>
                <div class="form-group">
                    <label for="item-notes">Notas:</label>
                    <input type="text" id="item-notes">
                </div>
                <div class="form-group">
                    <label for="item-cost">Coste (PM):</label>
                    <input type="number" id="item-cost" min="1" required>
                </div>
            `;
            break;
        case 'armor':
            formTitle = 'Añadir Nueva Armadura';
            formFields = `
                <div class="form-group">
                    <label for="item-name">Nombre de la Armadura:</label>
                    <input type="text" id="item-name" required>
                </div>
                <div class="form-group">
                    <label for="item-armor">Armadura (K/E):</label>
                    <input type="text" id="item-armor" placeholder="Ej: 4/6">
                </div>
                <div class="form-group">
                    <label for="item-description">Descripción:</label>
                    <input type="text" id="item-description" required>
                </div>
                <div class="form-group">
                    <label for="item-coverage">Cobertura:</label>
                    <input type="text" id="item-coverage" placeholder="Ej: Torso, Cuerpo completo">
                </div>
                <div class="form-group">
                    <label for="item-cost">Coste (PM):</label>
                    <input type="number" id="item-cost" min="1" required>
                </div>
            `;
            break;
        case 'equipment':
            formTitle = 'Añadir Nuevo Equipamiento';
            formFields = `
                <div class="form-group">
                    <label for="item-name">Nombre del Equipamiento:</label>
                    <input type="text" id="item-name" required>
                </div>
                <div class="form-group">
                    <label for="item-description">Descripción:</label>
                    <input type="text" id="item-description" required>
                </div>
                <div class="form-group">
                    <label for="item-effects">Efectos:</label>
                    <input type="text" id="item-effects">
                </div>
                <div class="form-group">
                    <label for="item-cost">Coste (PM):</label>
                    <input type="number" id="item-cost" min="1" required>
                </div>
            `;
            break;
        case 'implants':
            formTitle = 'Añadir Nuevo Implante';
            formFields = `
                <div class="form-group">
                    <label for="item-name">Nombre del Implante:</label>
                    <input type="text" id="item-name" required>
                </div>
                <div class="form-group">
                    <label for="item-description">Descripción:</label>
                    <input type="text" id="item-description" required>
                </div>
                <div class="form-group">
                    <label for="item-effects">Efectos:</label>
                    <input type="text" id="item-effects" required>
                </div>
                <div class="form-group">
                    <label for="item-level">Nivel:</label>
                    <select id="item-level">
                        <option value="básico">Básico</option>
                        <option value="medio">Medio</option>
                        <option value="avanzado">Avanzado</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="item-cost">Coste (PM):</label>
                    <input type="number" id="item-cost" min="1" required>
                </div>
            `;
            break;
        case 'services':
            formTitle = 'Añadir Nuevo Servicio';
            formFields = `
                <div class="form-group">
                    <label for="item-name">Nombre del Servicio:</label>
                    <input type="text" id="item-name" required>
                </div>
                <div class="form-group">
                    <label for="item-description">Descripción:</label>
                    <input type="text" id="item-description" required>
                </div>
                <div class="form-group">
                    <label for="item-cost">Coste (PM):</label>
                    <input type="text" id="item-cost" required>
                </div>
            `;
            break;
    }
    
    // Crear contenido del modal
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>${formTitle}</h2>
            <form id="add-item-form">
                ${formFields}
                <div class="button-group">
                    <button type="button" class="cancel-btn">Cancelar</button>
                    <button type="submit" class="save-btn">Guardar</button>
                </div>
            </form>
        </div>
    `;
    
    // Añadir el modal al documento
    document.body.appendChild(modal);
    
    // Configurar eventos del modal
    const closeBtn = modal.querySelector('.close');
    const cancelBtn = modal.querySelector('.cancel-btn');
    const form = modal.querySelector('form');
    
    // Cerrar modal
    closeBtn.addEventListener('click', function() {
        modal.remove();
    });
    
    cancelBtn.addEventListener('click', function() {
        modal.remove();
    });
    
    // Cerrar al hacer clic fuera del modal
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.remove();
        }
    });
    
    // Manejar envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores del formulario
        const formData = {
            name: form.querySelector('#item-name').value,
            description: form.querySelector('#item-description').value,
            cost: form.querySelector('#item-cost').value
        };
        
        // Añadir campos específicos según la categoría
        switch(tabId) {
            case 'weapons':
                formData.damage = form.querySelector('#item-damage').value;
                formData.notes = form.querySelector('#item-notes').value;
                break;
            case 'armor':
                formData.armor = form.querySelector('#item-armor').value;
                formData.coverage = form.querySelector('#item-coverage').value;
                break;
            case 'equipment':
                formData.effects = form.querySelector('#item-effects').value;
                break;
            case 'implants':
                formData.effects = form.querySelector('#item-effects').value;
                formData.level = form.querySelector('#item-level').value;
                break;
        }
        
        // Guardar el item
        saveItem(formData);
        
        // Añadir el item a la tabla
        addItemToTable(formData, tabId);
        
        // Mostrar notificación
        showNotification('Item añadido correctamente');
        
        // Cerrar modal
        modal.remove();
    });
}

// Función para guardar un item en localStorage
function saveItem(item) {
    // Obtener items existentes
    let items = JSON.parse(localStorage.getItem('shopItems') || '[]');
    
    // Añadir nuevo item con ID único
    item.id = Date.now();
    item.createdAt = new Date().toISOString();
    items.push(item);
    
    // Guardar en localStorage
    localStorage.setItem('shopItems', JSON.stringify(items));
}

// Función para añadir un item a la tabla
function addItemToTable(item, category) {
    const tabSection = document.getElementById(category);
    const tables = tabSection.querySelectorAll('table');
    
    if (tables.length > 0) {
        const targetTable = tables[0];
        const tbody = targetTable.querySelector('tbody') || targetTable;
        
        // Crear nueva fila
        const row = document.createElement('tr');
        
        // Añadir celdas según la categoría
        switch(category) {
            case 'weapons':
                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.description}</td>
                    <td>${item.damage}</td>
                    <td>${item.notes}</td>
                    <td class="price">${item.cost} PM</td>
                `;
                break;
            case 'armor':
                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.armor}</td>
                    <td>${item.description}</td>
                    <td>${item.coverage}</td>
                    <td class="price">${item.cost} PM</td>
                `;
                break;
            case 'equipment':
                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.description}</td>
                    <td>${item.effects}</td>
                    <td class="price">${item.cost} PM</td>
                `;
                break;
            case 'implants':
                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.description}</td>
                    <td>${item.effects}</td>
                    <td>${item.level}</td>
                    <td class="price">${item.cost} PM</td>
                `;
                break;
            case 'services':
                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.description}</td>
                    <td class="price">${item.cost} PM</td>
                `;
                break;
        }
        
        // Añadir la fila a la tabla
        tbody.appendChild(row);
    }
}

// Función para mostrar notificaciones
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Mostrar la notificación
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Ocultar y eliminar la notificación después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Función para cargar items guardados al iniciar
function loadSavedItems() {
    const items = JSON.parse(localStorage.getItem('shopItems') || '[]');
    
    items.forEach(item => {
        // Determinar la categoría del item
        let category = '';
        if (item.damage) category = 'weapons';
        else if (item.armor) category = 'armor';
        else if (item.level) category = 'implants';
        else if (item.effects) category = 'equipment';
        else category = 'services';
        
        // Añadir el item a la tabla correspondiente
        addItemToTable(item, category);
    });
} 