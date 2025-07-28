// Script para manejar las pestañas internas de implantes
document.addEventListener('DOMContentLoaded', function() {
    // Manejar pestañas internas para implantes
    const tabsInternal = document.querySelectorAll('.tab-internal');
    if (tabsInternal.length > 0) {
        tabsInternal.forEach(tab => {
            tab.addEventListener('click', function() {
                // Quitar clase activa de todas las pestañas internas
                document.querySelectorAll('.tab-internal').forEach(t => t.classList.remove('active'));
                // Quitar clase activa de todos los contenidos de pestañas internas
                document.querySelectorAll('.tab-content-internal').forEach(content => content.classList.remove('active'));
                
                // Añadir clase activa a la pestaña seleccionada
                this.classList.add('active');
                
                // Mostrar contenido correspondiente
                const tabId = this.getAttribute('data-tab-internal');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Agregar datos de implantes a la calculadora de equipamiento
    const implantSelect = document.getElementById('implant-select');
    if (implantSelect) {
        // Limpiar opciones existentes
        implantSelect.innerHTML = '<option data-cost="0">Ninguno</option>';
        
        // Agregar opciones nuevas de implantes
        const implantes = [
            { name: "Cerebro Básico", cost: 100 },
            { name: "Memoria Mejorada", cost: 200 },
            { name: "Cortex de Combate I", cost: 300 },
            { name: "Interfaz DNI", cost: 250 },
            { name: "Ojos Cibernéticos Básicos", cost: 200 },
            { name: "Reflejos Cableados I", cost: 350 },
            { name: "Refuerzos Dérmicos", cost: 300 },
            { name: "Filtros Respiratorios", cost: 200 },
            { name: "Cuchillas Retráctiles", cost: 250 }
        ];
        
        implantes.forEach(implante => {
            const option = document.createElement('option');
            option.textContent = `${implante.name} (${implante.cost} PM)`;
            option.setAttribute('data-cost', implante.cost);
            implantSelect.appendChild(option);
        });
    }
});