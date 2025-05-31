# Sistema de Mensajes Contextuales - Ultimate Mercenary v0.92

## 📋 Descripción General

El sistema de mensajes contextuales es una innovación que reemplaza los mensajes fijos del chat con contenido adaptativo que cambia según:

- **Prueba actual** (Prueba 0: La Caída, Prueba 1: Carrera de Obstáculos, Prueba 2: La Cosecha, Prueba 3: La Entrega)
- **Momento del día** (Día/Noche)
- **Rating del jugador** (Alto >6 / Bajo ≤6)

## 🎯 Características del Sistema

### **16 Contextos Únicos**
- 4 Pruebas × 2 Momentos × 2 Niveles de Rating = 16 variaciones
- Cada contexto tiene 100+ mensajes únicos
- Mensajes de apoyo, críticas, desafíos y comentarios temáticos

### **Tipos de Mensajes por Contexto**

#### **DÍA + RATING ALTO (>6)**
- Mensajes de admiración y apoyo
- Desafíos emocionantes con altos PM
- Comentarios sobre técnica y habilidad
- Mensajes de patrocinadores y fans

#### **DÍA + RATING BAJO (≤6)**
- Críticas constructivas y directas
- Desafíos para mejora con PM moderados
- Comentarios sobre necesidad de mejorar
- Mensajes de espectadores decepcionados

#### **NOCHE + RATING ALTO (>6)**
- Mensajes sensuales y seductores
- Contenido más íntimo y personal
- Desafíos picantes con PM altos
- Admiradores nocturnos obsesivos

#### **NOCHE + RATING BAJO (≤6)**
- Críticas nocturnas más duras
- Contenido despectivo y trolling
- Mensajes de rechazo y decepción
- Desafíos humillantes con PM bajos

## 📁 Arquitectura del Sistema

### **Archivos Principales**
```
contextual-messages.js          # Prueba 0 y 1
contextual-messages-p2.js       # Prueba 2: La Cosecha
contextual-messages-p3.js       # Prueba 3: La Entrega
contextual-system-integration.js # Sistema de integración
```

### **Estructura de Datos**
```javascript
const CONTEXTUAL_MESSAGES = {
    prueba0: {
        dia_alto: [mensajes...],
        dia_bajo: [mensajes...],
        noche_alto: [mensajes...],
        noche_bajo: [mensajes...]
    }
    // ... otras pruebas
}
```

## 🔧 Funciones Principales

### **getCurrentContextualMessages()**
Obtiene los mensajes según el contexto actual:
```javascript
const messages = getCurrentContextualMessages();
// Retorna array de mensajes para el contexto actual
```

### **getContextualUsernames()**
Obtiene nombres de usuario apropiados para el contexto:
```javascript
const usernames = getContextualUsernames();
// Retorna array de nombres contextuales
```

### **updateContextualSystem()**
Actualiza el sistema cuando cambia el contexto:
```javascript
updateContextualSystem();
// Se ejecuta automáticamente al cambiar prueba, momento o rating
```

## ⚙️ Integración con el Sistema Existente

### **Variables Globales**
- `window.CONTEXTUAL_EXAMPLES` - Mensajes actuales
- `window.CONTEXTUAL_USERNAMES` - Nombres de usuario actuales

### **Detección de Cambios**
El sistema escucha cambios en:
- `localStorage.currentTest`
- `localStorage.timeOfDay`
- `localStorage.rating`

### **Actualización Automática**
Cuando cambia algún parámetro:
1. Se recalculan los mensajes contextuales
2. Se actualiza `window.CONTEXTUAL_EXAMPLES`
3. Se reinicia el sistema de mensajes automáticos
4. Los nuevos mensajes aparecen inmediatamente

## 🎮 Control desde Panel de Administración

### **Selector de Momento del Día**
- Ubicado junto al selector de prueba actual
- Opciones: "Día" / "Noche"
- Se sincroniza automáticamente vía Firebase

### **Impacto del Rating**
- Rating >6: Mensajes de apoyo y admiración
- Rating ≤6: Mensajes de crítica y desafío
- Se actualiza automáticamente al cambiar el rating

## 🚀 Uso y Testing

### **Página de Pruebas Completa: `test-contextual-system.html`**

Se incluye una página de pruebas interactiva que permite:

- **🎯 Control contextual en tiempo real**: Seleccionar prueba, momento del día y rating
- **📨 Visualización de mensajes**: Ver ejemplos de mensajes para cada contexto
- **🧪 Test automático**: Probar todas las combinaciones posibles (16 contextos)
- **🔍 Debug completo**: Información detallada del estado del sistema
- **📊 Estadísticas**: Ver cantidad de mensajes por contexto

**Para usar la página de pruebas:**
1. Abrir `test-contextual-system.html` en el navegador
2. Usar los controles para cambiar el contexto
3. Ver los mensajes adaptativos en tiempo real
4. Usar "Probar Todas las Combinaciones" para verificar cobertura completa

### **Funciones de Debug en Consola**
```javascript
// Ver contexto actual
logCurrentContext();

// Probar todos los contextos
testContextualSystem();

// Actualizar manualmente
updateContextualSystem();

// Cambiar contexto programáticamente
localStorage.setItem('currentTest', 'prueba2');
localStorage.setItem('timeOfDay', 'noche');
localStorage.setItem('rating', '8.5');
updateContextualSystem();
```

### **Verificación de Funcionamiento**
1. Abrir `test-contextual-system.html` para pruebas completas
2. O usar consola del navegador con `logCurrentContext()`
3. Cambiar prueba/momento/rating desde el panel
4. Verificar que los mensajes del chat cambian automáticamente

## 📊 Contenido por Prueba

### **Prueba 0: La Caída (Hangar Subterráneo)**
- **Día**: Supervivencia, adaptación, equipo básico
- **Noche**: Soledad, vulnerabilidad, estrategia nocturna

### **Prueba 1: Carrera de Obstáculos**
- **Día**: Agilidad, parkour, coordinación atlética
- **Noche**: Movimientos sensuales, gracia felina

### **Prueba 2: La Cosecha (Jardín Vertical)**
- **Día**: Conocimiento botánico, precisión científica
- **Noche**: Conexión con la naturaleza, recolección íntima

### **Prueba 3: La Entrega (Distrito Industrial)**
- **Día**: Eficiencia logística, navegación urbana
- **Noche**: Rutas misteriosas, entregas clandestinas

## 🔄 Flujo de Datos

```
[Panel Admin] 
    ↓ (Cambio momento/prueba)
[Firebase]
    ↓ (Sincronización)
[localStorage]
    ↓ (Detección de cambio)
[Sistema Contextual]
    ↓ (Selección de mensajes)
[Chat Display]
```

## 💡 Beneficios del Sistema

### **Para el Jugador**
- Experiencia más inmersiva
- Mensajes relevantes al contexto actual
- Mayor variedad y rejugabilidad

### **Para el Administrador**
- Control granular del tono del juego
- Adaptación automática al rendimiento
- Herramientas de debugging integradas

### **Para el Sistema**
- Escalabilidad fácil (añadir nuevas pruebas)
- Mantenimiento modular
- Compatibilidad con sistema existente

## 🛠️ Mantenimiento y Expansión

### **Añadir Nueva Prueba**
1. Crear archivo `contextual-messages-pX.js`
2. Definir los 4 contextos (día/noche × alto/bajo)
3. Añadir al sistema de integración
4. Actualizar documentación

### **Modificar Mensajes Existentes**
1. Localizar archivo correspondiente
2. Editar array de mensajes del contexto
3. Recargar página para ver cambios

### **Debugging**
- Usar `logCurrentContext()` para diagnosticar
- Verificar carga de archivos en Network tab
- Comprobar errores en Console

## 📈 Métricas de Contenido

- **Total de mensajes**: ~1,600 mensajes únicos
- **Promedio por contexto**: 100+ mensajes
- **Variedad de PM**: +30 a +200 PM por desafío
- **Tipos de usuarios**: 48 nombres contextuales diferentes

---

*Sistema implementado en Ultimate Mercenary v0.93*
*Última actualización: Diciembre 2024* 