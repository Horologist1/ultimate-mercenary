/**
 * Utilidad para verificar enlaces y navegación
 * 
 * Este script ayuda a verificar todos los enlaces internos y externos
 * en el proyecto de Ultimate Mercenary.
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log("Iniciando verificación de enlaces...");
    
    // Agregar botón de verificación al final del documento para desarrolladores
    if (document.querySelector('body')) {
        const btn = document.createElement('button');
        btn.id = 'verify-links-btn';
        btn.textContent = 'Verificar Enlaces';
        btn.style.position = 'fixed';
        btn.style.bottom = '20px';
        btn.style.right = '20px';
        btn.style.zIndex = '9999';
        btn.style.background = '#333';
        btn.style.color = '#00ccff';
        btn.style.border = '1px solid #00ccff';
        btn.style.padding = '10px 15px';
        btn.style.borderRadius = '5px';
        btn.style.cursor = 'pointer';
        btn.style.display = 'none'; // Oculto por defecto, activar con ?debug=true en URL
        
        // Solo mostrar en modo debug
        if (window.location.search.includes('debug=true')) {
            btn.style.display = 'block';
        }
        
        btn.addEventListener('click', verifyAllLinks);
        document.body.appendChild(btn);
    }
    
    // Verificar si estamos en modo de prueba automática
    if (window.location.search.includes('autotest=true')) {
        setTimeout(verifyAllLinks, 1000); // Esperar 1 segundo para que cargue todo
    }
});

/**
 * Verifica todos los enlaces en la página actual
 */
function verifyAllLinks() {
    console.log("🔍 Verificando enlaces...");
    
    // Recopilar todos los enlaces
    const links = document.querySelectorAll('a');
    const results = {
        total: links.length,
        internal: 0,
        external: 0,
        broken: 0,
        brokenList: []
    };
    
    console.log(`Total de enlaces encontrados: ${links.length}`);
    
    // Crear un elemento para mostrar resultados
    let resultDiv = document.getElementById('link-verification-results');
    if (!resultDiv) {
        resultDiv = document.createElement('div');
        resultDiv.id = 'link-verification-results';
        resultDiv.style.position = 'fixed';
        resultDiv.style.top = '50%';
        resultDiv.style.left = '50%';
        resultDiv.style.transform = 'translate(-50%, -50%)';
        resultDiv.style.background = 'rgba(0, 0, 0, 0.9)';
        resultDiv.style.color = '#fff';
        resultDiv.style.padding = '20px';
        resultDiv.style.borderRadius = '10px';
        resultDiv.style.zIndex = '10000';
        resultDiv.style.maxWidth = '80%';
        resultDiv.style.maxHeight = '80vh';
        resultDiv.style.overflow = 'auto';
        resultDiv.style.border = '1px solid #00ccff';
        resultDiv.style.boxShadow = '0 0 20px rgba(0, 204, 255, 0.5)';
        document.body.appendChild(resultDiv);
    }
    
    resultDiv.innerHTML = '<h3 style="color: #00ccff; margin-top: 0;">Verificando Enlaces...</h3>';
    resultDiv.innerHTML += '<div id="verification-progress"></div>';
    
    // Verificar cada enlace
    let checkedCount = 0;
    
    links.forEach((link, index) => {
        const href = link.getAttribute('href');
        
        // Ignorar enlaces vacíos o anclas
        if (!href || href === '#' || href.startsWith('javascript:')) {
            updateProgress(++checkedCount, links.length);
            return;
        }
        
        // Clasificar como interno o externo
        if (href.startsWith('http://') || href.startsWith('https://')) {
            results.external++;
            // No verificamos enlaces externos para evitar llamadas de red
            updateProgress(++checkedCount, links.length);
        } else {
            results.internal++;
            
            // Verificar si el enlace interno es válido
            if (href.includes('#')) {
                // Enlace a una sección dentro de la página
                const parts = href.split('#');
                const file = parts[0];
                const section = parts[1];
                
                if (file && file !== window.location.pathname.split('/').pop()) {
                    // Enlace a sección en otra página, no podemos verificar directamente
                    updateProgress(++checkedCount, links.length);
                } else if (section && !document.getElementById(section)) {
                    // Sección no encontrada en esta página
                    results.broken++;
                    results.brokenList.push({
                        href: href,
                        text: link.textContent.trim() || '[Sin texto]',
                        reason: `La sección #${section} no existe en la página actual`
                    });
                    updateProgress(++checkedCount, links.length);
                } else {
                    updateProgress(++checkedCount, links.length);
                }
            } else {
                // Enlace a otra página, verificar si existe
                fetch(href)
                    .then(response => {
                        if (!response.ok) {
                            results.broken++;
                            results.brokenList.push({
                                href: href,
                                text: link.textContent.trim() || '[Sin texto]',
                                reason: `Error ${response.status}: ${response.statusText}`
                            });
                        }
                    })
                    .catch(error => {
                        results.broken++;
                        results.brokenList.push({
                            href: href,
                            text: link.textContent.trim() || '[Sin texto]',
                            reason: `Error al verificar: ${error.message}`
                        });
                    })
                    .finally(() => {
                        updateProgress(++checkedCount, links.length);
                        
                        // Si hemos verificado todos los enlaces, mostrar el resultado final
                        if (checkedCount === links.length) {
                            showFinalResults(results, resultDiv);
                        }
                    });
            }
        }
    });
    
    // Si no hay enlaces que verificar mediante fetch, mostrar resultados inmediatamente
    if (checkedCount === links.length) {
        showFinalResults(results, resultDiv);
    }
    
    function updateProgress(current, total) {
        const progressEl = document.getElementById('verification-progress');
        const percentage = Math.round((current / total) * 100);
        
        if (progressEl) {
            progressEl.innerHTML = `
                <div style="background: #333; border-radius: 5px; height: 20px; width: 100%; margin: 10px 0;">
                    <div style="background: #00ccff; width: ${percentage}%; height: 100%; border-radius: 5px;"></div>
                </div>
                <p>Progreso: ${current} de ${total} enlaces (${percentage}%)</p>
            `;
        }
    }
}

/**
 * Muestra los resultados finales de la verificación
 */
function showFinalResults(results, container) {
    let statusColor = results.broken > 0 ? '#ff4757' : '#2ed573';
    let statusIcon = results.broken > 0 ? '❌' : '✅';
    
    container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3 style="color: #00ccff; margin-top: 0;">Resultados de la Verificación</h3>
            <button id="close-verification" style="background: none; border: none; color: #fff; font-size: 1.5rem; cursor: pointer;">×</button>
        </div>
        <div style="background: rgba(0, 0, 0, 0.3); padding: 15px; border-radius: 5px; margin-bottom: 15px;">
            <p style="color: ${statusColor}; font-size: 1.2rem; font-weight: bold; margin-top: 0;">${statusIcon} Estado: ${results.broken > 0 ? 'Problemas Encontrados' : 'Todos los Enlaces Funcionan'}</p>
            <p>Total de Enlaces: <strong>${results.total}</strong></p>
            <p>Enlaces Internos: <strong>${results.internal}</strong></p>
            <p>Enlaces Externos: <strong>${results.external}</strong></p>
            <p>Enlaces con Problemas: <strong style="color: ${results.broken > 0 ? '#ff4757' : '#2ed573'}">${results.broken}</strong></p>
        </div>
    `;
    
    if (results.broken > 0) {
        container.innerHTML += `
            <h4 style="color: #ff4757;">Enlaces con Problemas:</h4>
            <div style="max-height: 300px; overflow-y: auto; background: rgba(0, 0, 0, 0.3); padding: 10px; border-radius: 5px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr>
                            <th style="text-align: left; padding: 8px; border-bottom: 1px solid #444;">Enlace</th>
                            <th style="text-align: left; padding: 8px; border-bottom: 1px solid #444;">Texto</th>
                            <th style="text-align: left; padding: 8px; border-bottom: 1px solid #444;">Problema</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${results.brokenList.map(link => `
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #333;"><code>${link.href}</code></td>
                                <td style="padding: 8px; border-bottom: 1px solid #333;">${link.text}</td>
                                <td style="padding: 8px; border-bottom: 1px solid #333;">${link.reason}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    } else {
        container.innerHTML += `
            <p style="color: #2ed573;">¡No se encontraron problemas con los enlaces! Todo funciona correctamente.</p>
        `;
    }
    
    // Agregar sugerencias de acción
    if (results.broken > 0) {
        container.innerHTML += `
            <div style="margin-top: 15px; background: rgba(255, 71, 87, 0.1); padding: 15px; border-radius: 5px; border-left: 3px solid #ff4757;">
                <h4 style="margin-top: 0; color: #ff4757;">Acciones Recomendadas:</h4>
                <ul style="margin-bottom: 0;">
                    <li>Verifica que los archivos referenciados existan en las ubicaciones correctas</li>
                    <li>Asegúrate de que los IDs de sección (#seccion) sean correctos</li>
                    <li>Revisa la ortografía de los nombres de archivo</li>
                    <li>Si utilizas rutas relativas, confirma que la estructura de directorios sea correcta</li>
                </ul>
            </div>
        `;
    }
    
    // Botón para exportar resultados
    container.innerHTML += `
        <div style="margin-top: 15px; display: flex; justify-content: space-between;">
            <button id="export-results" style="background: #00ccff; color: #000; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer;">Exportar Resultados</button>
            <button id="hide-results" style="background: #444; color: #fff; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer;">Cerrar</button>
        </div>
    `;
    
    // Añadir eventos a los botones
    setTimeout(() => {
        document.getElementById('close-verification')?.addEventListener('click', () => {
            container.remove();
        });
        
        document.getElementById('hide-results')?.addEventListener('click', () => {
            container.remove();
        });
        
        document.getElementById('export-results')?.addEventListener('click', () => {
            exportResults(results);
        });
    }, 100);
}

/**
 * Exporta los resultados a un archivo JSON
 */
function exportResults(results) {
    const data = JSON.stringify(results, null, 2);
    const blob = new Blob([data], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'verificacion-enlaces.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}