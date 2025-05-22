# Ultimate Mercenary: La Forja del Acero Callejero
## Manual de Usuario

![OCE Logo](images/oce_logo.png)

## Contenido

1. [Introducción](#introducción)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Guía de Inicio Rápido](#guía-de-inicio-rápido)
4. [Componentes Principales](#componentes-principales)
   - [Página Principal (index.html)](#página-principal)
   - [Hoja de Personaje (character-sheet.html)](#hoja-de-personaje)
   - [Lanzador de Dados (dice-roller.html)](#lanzador-de-dados)
   - [Generador de Encuentros (encounter-generator.html)](#generador-de-encuentros)
5. [Consejos para Directores de Juego](#consejos-para-directores-de-juego)
6. [Ideas para Expansión](#ideas-para-expansión)
7. [Sistema de Widgets](#sistema-de-widgets)
8. [Solución de Problemas](#solución-de-problemas)

---

## Introducción

Bienvenido a **Ultimate Mercenary: La Forja del Acero Callejero**, un juego de rol cyberpunk donde 100 concursantes desesperados compiten por su supervivencia en un brutal reality show. Este paquete contiene todos los recursos necesarios para dirigir una campaña completa en este oscuro futuro.

El juego está basado en el sistema **Eclipse Phase Segunda Edición** con adaptaciones para facilitar su uso. Todos los recursos se presentan como un sitio web interactivo que incluye la ambientación, personajes, reglas y herramientas digitales.

---

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

- `index.html`: Página principal con toda la información del juego
- `character-sheet.html`: Hoja de personaje digital interactiva
- `dice-roller.html`: Herramienta para tiradas de dados
- `encounter-generator.html`: Generador de encuentros aleatorios
- `instrucciones.html`: Versión web de este manual de usuario
- `widgets-demo.html`: Demostración de los widgets interactivos básicos
- `widgets-nuevos.html`: Demostración de los widgets interactivos avanzados
- `images/`: Carpeta con todas las imágenes del juego
- `styles.css`, `styles_additional.css`, etc.: Archivos de estilos visuales
- `script.js`, `character-sheet.js`, `widgets.js`: Scripts para funcionalidades interactivas

---

## Guía de Inicio Rápido

1. Abre el archivo `index.html` en cualquier navegador web moderno.
2. Explora las diferentes secciones desde el menú de navegación superior.
3. Familiarízate con la ambientación, personajes y reglas.
4. Utiliza las herramientas adicionales para preparar tu sesión de juego.

> **Nota**: Todos los archivos deben mantenerse en su estructura original para que funcionen correctamente.

---

## Componentes Principales

### Página Principal

La página principal (`index.html`) contiene toda la información necesaria para dirigir el juego, organizada en secciones:

- **Introducción y Ambientación**: Contexto y trasfondo del mundo.
- **Facciones y Personajes Clave**: OmniCorp Entertainment y PNJs importantes.
- **El Programa Ultimate Mercenary**: Reglas y mecánicas.
- **Concursantes Destacados**: PNJs para interacción con los jugadores.
- **Las Pruebas**: Escenarios de juego detallados.
- **Tienda de Méritos OCE**: Equipamiento y mejoras disponibles.
- **Fichas de Personajes**: Arquetipos y estadísticas.
- **Recursos Adicionales**: Herramientas interactivas.

### Hoja de Personaje

La hoja de personaje digital (`character-sheet.html`) permite gestionar todos los aspectos de tu personaje:

1. **Datos Básicos**: Nombre, concepto, trasfondo y razón para estar en el programa.
2. **Aptitudes**: Valores de VIG, COO, INT, REF, WIL y SAV que determinan las capacidades base.
3. **Habilidades**: Lista de competencias con sus especializaciones.
4. **Equipo**: Gestión de armas, armadura y equipo misceláneo.
5. **Implantes**: Control de mejoras cibernéticas y sus efectos.
6. **Notas**: Espacio para información adicional y contactos.

Funcionalidades:
- Cálculo automático de estadísticas derivadas
- Sistema para guardar y cargar personajes
- Exportación a formato JSON

### Lanzador de Dados

La herramienta de dados (`dice-roller.html`) facilita todas las tiradas necesarias durante el juego:

1. **Tiradas de Habilidad**: Sistema d100 donde debes obtener un resultado menor o igual que tu valor de habilidad.
2. **Tiradas de Daño**: Cálculo automático del daño basado en diferentes armas.
3. **Enfrentamientos**: Resolución de conflictos entre PJs y PNJs.
4. **Generador de Encuentros Rápidos**: Creación de situaciones aleatorias.

Características:
- Historial de tiradas con resultados detallados
- Cálculo automático de éxitos/fallos críticos
- Modificadores y condiciones especiales

### Generador de Encuentros

El generador de encuentros (`encounter-generator.html`) te permite crear situaciones de juego completas:

1. **Configuración**: Selección de escenario, tipo, dificultad y elementos especiales.
2. **Generación**: Creación automática de participantes, desafíos y recompensas.
3. **Estadísticas**: Valores recomendados para cada encuentro.
4. **Guardado**: Exportación de encuentros individuales o en conjunto.

Opciones de personalización:
- 5 tipos de escenarios (Carrera de Obstáculos, Invernaderos, etc.)
- 5 tipos de encuentros (Combate, Exploración, Social, etc.)
- 4 niveles de dificultad
- Elementos especiales (trampas, recompensas, etc.)

---

## Consejos para Directores de Juego

### Gestión de 100 Concursantes

No es necesario rastrear a todos los concursantes individualmente:
- Enfócate en los 8-10 PNJs destacados con perfiles detallados.
- Usa concursantes genéricos como "carne de cañón" para aumentar la tensión.
- Reduce el número de participantes a medida que avanza la historia.
- El generador de PNJs aleatorios puede crear nuevos personajes rápidamente.

### Estructura de Sesiones

Organiza tus sesiones siguiendo la estructura de pruebas:
- **Sesión 1**: Introducción y Prueba 1 (eliminación de ~50 concursantes)
- **Sesión 2**: Interacción social en dormitorios y Prueba 2
- **Sesión 3**: Prueba 3 y más interacción con supervivientes
- **Sesiones posteriores**: Pruebas personalizadas con menos concursantes

### El Factor Kaiser

Kaiser (el anfitrión) es tu herramienta para ajustar la dificultad sobre la marcha:
- Úsalo para cambiar reglas si los jugadores tienen demasiada ventaja.
- Introduce elementos imprevistos para mantener la tensión.
- Otorga ventajas inesperadas a personajes "entretenidos".
- Sirve como Deus Ex Machina si los jugadores están completamente atascados.

### Equilibrio de Juego

Mantén el equilibrio entre supervivencia y progresión:
- Ajusta los PM ganados según el rendimiento del grupo.
- Personaliza las pruebas para destacar las fortalezas de los PJs.
- Utiliza la Tienda de Méritos para controlar la progresión.
- Balancea los encuentros con el generador basándote en el equipo actual.

---

## Ideas para Expansión

Si deseas expandir o personalizar "Ultimate Mercenary", aquí tienes algunas ideas:

1. **Pruebas Adicionales**: Crea nuevas pruebas usando el mismo formato que las existentes.
2. **Facciones Ocultas**: Introduce grupos secretos dentro de OCE u otras corporaciones.
3. **Modo Rebelde**: Desarrolla una subtrama donde los jugadores intentan sabotear el programa.
4. **Evento Catástrofe**: Un desastre o ataque interrumpe el programa, cambiando las dinámicas.
5. **Flashbacks**: Explora el pasado de los personajes y cómo llegaron al programa.
6. **Audiencia Interactiva**: La audiencia puede votar o influir en las pruebas.
7. **Segunda Temporada**: Los supervivientes podrían convertirse en "mentores" o "cazadores".

---

## Sistema de Widgets

"Ultimate Mercenary" incluye un potente sistema de widgets interactivos para mejorar la experiencia de juego. Estos componentes pueden integrarse fácilmente en cualquier página web y proporcionan diversas herramientas útiles para jugadores y Directores de Juego.

### Uso Básico de Widgets

Para utilizar un widget, simplemente añade un elemento HTML con el atributo `data-widget` establecido al nombre del widget que deseas usar:

```html
<div data-widget="dice-roller-mini"></div>
```

Cada widget acepta parámetros adicionales mediante atributos `data-option-*`:

```html
<div data-widget="dice-roller-mini" 
     data-option-diceType="d100" 
     data-option-showDifficulty="true"></div>
```

### Widgets Principales

1. **Lanzador de Dados Rápido** (`dice-roller-mini`): Realiza tiradas rápidas de dados con diferentes opciones.
2. **Contador de Puntos de Mérito** (`merit-counter`): Contador interactivo para gestionar puntos de mérito con historial.
3. **Temporizador** (`time-tracker`): Cronómetro o cuenta atrás configurable para gestionar el tiempo en las pruebas.
4. **Notas Rápidas** (`quick-notes`): Bloc de notas con autoguardado para apuntes.
5. **Encuestas/Votaciones** (`poll-widget`): Sistema de votación interactivo para tomar decisiones grupales.
6. **Generador de Eventos Aleatorios** (`random-event`): Generador dinámico de eventos aleatorios para añadir sorpresas.
7. **Seguimiento de Concursantes** (`contestant-tracker`): Sistema para realizar seguimiento del progreso de concursantes.

Para una documentación completa, consulta los archivos:
- `widgets-demo.html`: Documentación y ejemplos de los widgets básicos
- `widgets-nuevos.html`: Documentación y ejemplos de los widgets avanzados
- `widgets-README.md`: Documentación técnica del sistema

### Personalización y Extensión

El sistema es completamente extensible. Los desarrolladores pueden crear nuevos widgets registrándolos en el objeto `UltimateWidgets`:

```javascript
UltimateWidgets.register('mi-widget', {
    init: function(element, options) {
        // Código de inicialización
        return {
            // API expuesta
        };
    }
});
```

Todos los widgets pueden personalizarse visualmente mediante temas y CSS personalizado.

### Integración en tu Campaña

Experimenta con diferentes combinaciones de widgets según las necesidades de tu mesa:

- Añade un temporizador y contador de PM durante una prueba
- Usa el lanzador de dados rápido para resolver conflictos menores
- Integra notas rápidas para registrar eventos importantes
- Crea un panel de control para el Director de Juego con múltiples widgets
- Utiliza las encuestas para que los jugadores voten en decisiones importantes
- Genera eventos aleatorios para mantener las partidas dinámicas
- Realiza seguimiento visual de los concursantes eliminados

Para ver ejemplos prácticos y el código necesario, consulta las páginas de demostración:
- `widgets-demo.html` para widgets básicos
- `widgets-nuevos.html` para widgets avanzados

---

## Solución de Problemas

### Problemas Comunes

1. **Las imágenes no se muestran**
   - Verifica que la carpeta `images/` esté en el mismo directorio que los archivos HTML.
   - Comprueba que los nombres de archivo coincidan con las referencias en el código.

2. **Las herramientas interactivas no funcionan**
   - Asegúrate de que JavaScript esté habilitado en tu navegador.
   - Verifica que todos los archivos JS estén en la ubicación correcta.

3. **Errores al guardar personajes**
   - La función de guardado utiliza localStorage, que debe estar habilitado en tu navegador.
   - Algunos navegadores en modo incógnito pueden bloquear esta función.

4. **Problemas de visualización**
   - Utiliza un navegador actualizado (Chrome, Firefox, Edge, Safari).
   - Si hay problemas con los estilos, verifica que todos los archivos CSS estén presentes.

5. **Widgets no funcionan correctamente**
   - Asegúrate de que `widgets.js` y `widgets.css` estén incluidos en tu HTML.
   - Verifica la sintaxis de los atributos `data-widget` y `data-option-*`.
   - Comprueba la consola del navegador (F12) para posibles errores.

### Contacto y Soporte

Si encuentras problemas adicionales o necesitas asistencia, puedes contactar al equipo de desarrollo.

---

*Ultimate Mercenary: La Forja del Acero Callejero © 2025*
*Basado en Eclipse Phase Segunda Edición*