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
    const adminPages = ['index.html', 'concursantes_numerados.html', 'character-customizer.html', 'prueba0.html', 'prueba1.html', 'prueba2.html', 'prueba3.html'];
    const userPages = ['index.html', 'prueba0.html', 'prueba1.html', 'prueba2.html', 'prueba3.html'];
    
    // Verificar si el usuario tiene acceso a la página actual
    const allowedPages = role === 'admin' ? adminPages : userPages;
    if (!allowedPages.includes(currentPage)) {
        window.location.href = 'index.html';
    }

    // Añadir botón de logout si no estamos en la página de login
    if (currentPage !== 'login.html') {
        const header = document.querySelector('header');
        if (header) {
            const logoutBtn = document.createElement('button');
            logoutBtn.className = 'logout-btn';
            logoutBtn.innerHTML = `<i class="fas fa-sign-out-alt"></i> Cerrar Sesión (${user})`;
            logoutBtn.onclick = function() {
                localStorage.removeItem('user');
                localStorage.removeItem('role');
                window.location.href = 'login.html';
            };
            header.appendChild(logoutBtn);
        }
    }
}

// Ejecutar la verificación cuando se carga la página
document.addEventListener('DOMContentLoaded', checkAuth); 