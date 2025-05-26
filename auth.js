// Función para verificar la autenticación
function checkAuth() {
    const user = localStorage.getItem('user');
    const role = localStorage.getItem('role');
    
    // Si no hay usuario, redirigir al login
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    // Obtener la página actual
    const currentPage = window.location.pathname.split('/').pop();
    
    // Definir las páginas permitidas para cada rol
    const adminPages = ['index.html', 'concursantes_numerados.html', 'character-customizer.html', 
                       'prueba0.html', 'prueba1.html', 'prueba2.html', 'prueba3.html', 
                       'control-panel.html'];
    const userPages = ['index-user.html', 'prueba0.html', 'prueba1.html', 'prueba2.html', 
                      'prueba3.html', 'tienda.html'];
    
    // Verificar si el usuario tiene acceso a la página actual
    const allowedPages = role === 'admin' ? adminPages : userPages;
    if (!allowedPages.includes(currentPage)) {
        // Redirigir a la página principal según el rol
        window.location.href = role === 'admin' ? 'index.html' : 'index-user.html';
    }

    // Añadir botón de logout y navegación según el rol
    if (currentPage !== 'login.html') {
        const header = document.querySelector('header');
        if (header) {
            // Crear contenedor para la navegación
            const navContainer = document.createElement('div');
            navContainer.className = 'nav-container';

            // Añadir enlaces de navegación según el rol
            if (role === 'admin') {
                const controlPanelLink = document.createElement('a');
                controlPanelLink.href = 'control-panel.html';
                controlPanelLink.className = 'nav-link';
                controlPanelLink.innerHTML = '<i class="fas fa-cogs"></i> Panel de Control';
                navContainer.appendChild(controlPanelLink);
            } else {
                const tiendaLink = document.createElement('a');
                tiendaLink.href = 'tienda.html';
                tiendaLink.className = 'nav-link';
                tiendaLink.innerHTML = '<i class="fas fa-shopping-cart"></i> Tienda';
                navContainer.appendChild(tiendaLink);
            }

            // Añadir botón de logout
            const logoutBtn = document.createElement('button');
            logoutBtn.className = 'logout-btn';
            logoutBtn.innerHTML = `<i class="fas fa-sign-out-alt"></i> Cerrar Sesión (${user})`;
            logoutBtn.onclick = function() {
                localStorage.removeItem('user');
                localStorage.removeItem('role');
                window.location.href = 'login.html';
            };
            navContainer.appendChild(logoutBtn);

            header.appendChild(navContainer);
        }
    }
}

// Ejecutar la verificación cuando se carga la página
document.addEventListener('DOMContentLoaded', checkAuth); 