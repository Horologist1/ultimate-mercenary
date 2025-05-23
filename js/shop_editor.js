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
        
        // Añadir el botón después del primer h3 de la sección
        const firstH3 = tab.querySelector('h3');
        if (firstH3) {
            firstH3.parentNode.insertBefore(addButton, firstH3.nextSibling);
        } else {
            // Si no hay h3, añadir al principio de la sección
            tab.insertBefore(addButton, tab.firstChild);
        }
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

    // Obtener la estructura de columnas según la sección
    const columns = getColumnsForSection(tabId);

    // Crear el contenido del modal
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Añadir nuevo item</h2>
            <form id="addItemForm">
                ${columns.map(col => `
                    <div class="form-group">
                        <label for="${col.toLowerCase()}">${col}</label>
                        <input type="text" id="${col.toLowerCase()}" name="${col.toLowerCase()}" required>
                    </div>
                `).join('')}
                <div class="button-group">
                    <button type="button" class="cancel-button">Cancelar</button>
                    <button type="submit" class="confirm-button">Añadir</button>
                </div>
            </form>
        </div>
    `;

    // Añadir el modal al body
    document.body.appendChild(modal);

    // Evento para cerrar el modal
    const closeBtn = modal.querySelector('.close');
    const cancelBtn = modal.querySelector('.cancel-button');
    const closeModal = () => {
        document.body.removeChild(modal);
    };

    closeBtn.onclick = closeModal;
    cancelBtn.onclick = closeModal;

    // Evento para enviar el formulario
    const form = modal.querySelector('#addItemForm');
    form.onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const itemData = {};
        formData.forEach((value, key) => {
            itemData[key] = value;
        });
        
        // Guardar el nuevo item
        saveNewItem(tabId, itemData);
        closeModal();
    };
}

// Función para obtener las columnas según la sección
function getColumnsForSection(tabId) {
    switch(tabId) {
        case 'shop-armas':
            return ['Artículo', 'Descripción', 'Daño', 'Notas', 'Coste'];
        case 'shop-municion':
            return ['Artículo', 'Compatible con', 'Cantidad', 'Coste'];
        case 'shop-armaduras':
            return ['Artículo', 'Armadura (K/E)', 'Descripción', 'Cobertura', 'Coste'];
        case 'shop-cyberware':
            return ['Artículo', 'Descripción', 'Efectos', 'Coste'];
        case 'shop-equipo':
            return ['Artículo', 'Descripción', 'Efectos', 'Coste'];
        case 'shop-servicios':
            return ['Servicio', 'Descripción', 'Coste'];
        default:
            return ['Artículo', 'Descripción', 'Coste'];
    }
}

// Función para guardar un nuevo item
function saveNewItem(tabId, itemData) {
    // Obtener items existentes
    let savedItems = JSON.parse(localStorage.getItem('shopItems') || '{}');
    
    // Inicializar el array para la sección si no existe
    if (!savedItems[tabId]) {
        savedItems[tabId] = [];
    }
    
    // Añadir el nuevo item
    savedItems[tabId].push(itemData);
    
    // Guardar en localStorage
    localStorage.setItem('shopItems', JSON.stringify(savedItems));
    
    // Actualizar la visualización
    updateShopDisplay(tabId);
}

// Función para cargar items guardados
function loadSavedItems() {
    const savedItems = JSON.parse(localStorage.getItem('shopItems') || '{}');
    
    // Actualizar cada sección
    Object.keys(savedItems).forEach(tabId => {
        updateShopDisplay(tabId);
    });
}

// Función para actualizar la visualización de la tienda
function updateShopDisplay(tabId) {
    const tab = document.getElementById(tabId);
    if (!tab) return;

    const savedItems = JSON.parse(localStorage.getItem('shopItems') || '{}');
    const items = savedItems[tabId] || [];
    
    // Encontrar la tabla en la sección
    const table = tab.querySelector('table');
    if (!table) return;

    // Obtener el tbody existente
    const tbody = table.querySelector('tbody');
    if (!tbody) return;

    // Guardar los items predefinidos
    const predefinedRows = Array.from(tbody.querySelectorAll('tr'));
    
    // Limpiar la tabla
    tbody.innerHTML = '';

    // Primero añadir los items predefinidos
    predefinedRows.forEach(row => {
        tbody.appendChild(row.cloneNode(true));
    });

    // Luego añadir los items guardados
    items.forEach((item, index) => {
        const row = document.createElement('tr');
        row.className = 'custom-item'; // Añadir clase para estilos específicos
        const columns = getColumnsForSection(tabId);
        
        columns.forEach(col => {
            const cell = document.createElement('td');
            const value = item[col.toLowerCase()];
            if (col === 'Coste') {
                cell.className = 'price';
                cell.textContent = `${value} PM`;
            } else {
                cell.textContent = value;
            }
            row.appendChild(cell);
        });

        // Añadir botón de eliminar
        const deleteCell = document.createElement('td');
        deleteCell.className = 'delete-cell';
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-item-button';
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.title = 'Eliminar item';
        deleteButton.onclick = () => deleteItem(tabId, index);
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        tbody.appendChild(row);
    });
}

// Función para eliminar un item
function deleteItem(tabId, index) {
    // Obtener items existentes
    let savedItems = JSON.parse(localStorage.getItem('shopItems') || '{}');
    
    // Verificar que la sección existe
    if (!savedItems[tabId]) return;
    
    // Eliminar el item del array
    savedItems[tabId].splice(index, 1);
    
    // Guardar en localStorage
    localStorage.setItem('shopItems', JSON.stringify(savedItems));
    
    // Eliminar la fila directamente del DOM
    const table = document.querySelector(`#${tabId} table`);
    if (table) {
        const tbody = table.querySelector('tbody');
        if (tbody) {
            // Obtener todas las filas personalizadas
            const customRows = tbody.querySelectorAll('tr.custom-item');
            if (customRows[index]) {
                // Añadir una clase para la animación de salida
                customRows[index].classList.add('removing');
                // Eliminar la fila después de la animación
                setTimeout(() => {
                    customRows[index].remove();
                }, 300);
            }
        }
    }
}