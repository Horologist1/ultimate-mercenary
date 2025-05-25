// Funcionalidades para el editor de la tienda y la visualización de imágenes

document.addEventListener('DOMContentLoaded', function() {
    // Cargar items guardados al iniciar
    loadSavedItems();
});

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
        row.className = 'custom-item';
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