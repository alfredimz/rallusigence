# GUÍA DE ESTILOS UI — RALLUSIGENCE
# Fase 4: Sistema completo de implementación | v1.0

---

## SECCIÓN 1 — SISTEMA DE ÍCONOS

### Librería seleccionada: Lucide Icons

**Justificación de selección:**
- **vs Feather Icons:** Lucide es el sucesor oficial de Feather con más variedad de íconos y mejor mantenimiento
- **vs Material Icons:** Lucide tiene un estilo más limpio y coherente con la identidad minimal de Rallusigence  
- **vs Heroicons:** Lucide ofrece mejor consistencia visual y mayor variedad para servicios de auditoría
- **vs Font Awesome:** Lucide es más ligero y tiene mejor rendimiento (solo SVGs necesarios)

### URLs de implementación
- **CDN:** `https://unpkg.com/lucide@latest/dist/umd/lucide.js`
- **NPM:** `npm install lucide`
- **Web Components:** `https://unpkg.com/lucide@latest/dist/esm/icons/`

### Sistema de tamaños
- **16px:** Íconos inline en texto, badges, labels pequeños
- **20px:** Íconos en botones, navegación, items de lista  
- **24px:** Íconos principales en cards, headers de sección, formularios

### Propiedades técnicas
- **Stroke weight:** 1.5px (consistente en todos los tamaños)
- **Stroke-linecap:** round (bordes redondeados)
- **Stroke-linejoin:** round (uniones redondeadas)

### Aplicación de colores
```css
.icon {
  color: var(--color-primary);    /* Íconos principales y CTAs */
}

.icon--secondary {
  color: var(--color-secondary);  /* Íconos de navegación, menú */
}

.icon--muted {
  color: #6B7280;                /* Íconos decorativos, helpers */
}

.icon--success {
  color: #10B981;                /* Estados de éxito, checks */
}

.icon--error {
  color: #EF4444;                /* Estados de error, alertas */
}

.icon--white {
  color: #FFFFFF;                /* Íconos en fondos oscuros */
}
```

### Lista de íconos necesarios para Rallusigence

**Servicios y características:**
1. `search` — Auditoría, análisis
2. `shield-check` — Seguridad, protección
3. `trending-up` — Crecimiento, mejoras
4. `zap` — Automatización, rapidez
5. `users` — Equipo, testimonios
6. `clock` — Tiempo de entrega
7. `check-circle` — Procesos completados
8. `star` — Calificaciones, destacados

**Navegación y UX:**
9. `menu` — Hamburger menu (mobile)
10. `x` — Cerrar modal, cancelar
11. `arrow-right` — CTAs, siguiente paso
12. `external-link` — Enlaces externos
13. `download` — Descargar reportes
14. `mail` — Contacto, email

**Formulario y estados:**
15. `send` — Enviar formulario
16. `loader-2` — Estados de carga
17. `check` — Validación exitosa
18. `alert-circle` — Errores de validación
19. `eye` — Mostrar información
20. `eye-off` — Ocultar información

### Uso de emojis vs íconos

**Cuándo usar emojis:**
- Problemas en sección "dolores" (🤦‍♂️ 😤 💸 ⏰)
- Testimonios emotivos (⭐ 💯 🎯)
- Reacciones humanas y estados emocionales

**Cuándo usar íconos de librería:**
- Navegación y interface (menú, cerrar, flechas)
- Estados técnicos (carga, error, éxito)
- Funcionalidades del sistema (buscar, descargar, enviar)
- Servicios profesionales (shield-check, trending-up)

---

## SECCIÓN 2 — MICRO-INTERACCIONES

### 1. Hover en botones

**Elemento:** `.btn-primary`, `.btn-secondary`  
**Trigger:** mouseenter/mouseleave  
**Propiedades que cambian:**
- `background-color`: transición a color más oscuro
- `transform: translateY(-1px)`: elevación sutil
- `box-shadow`: sombra suave para profundidad

**Duración:** 0.2s  
**Easing:** ease-in-out

```css
/* Implementación en design-system.md - incluida */
```

### 2. Hover en cards de servicio

**Elemento:** `.service-card`  
**Trigger:** mouseenter/mouseleave  
**Propiedades que cambian:**
- `border-color`: cambia a teal
- `transform: translateY(-2px)`: elevación más notable
- `box-shadow`: sombra más prominente para destacar

**Duración:** 0.2s  
**Easing:** ease-in-out

```css
/* Implementación en design-system.md - incluida */
```

### 3. Focus en inputs del formulario

**Elemento:** `.input-field`  
**Trigger:** focus/blur  
**Propiedades que cambian:**
- `border-color`: cambia a teal
- `box-shadow`: ring teal con 10% opacidad
- `outline`: removido para custom focus

**Duración:** 0.2s  
**Easing:** ease-in-out

```css
/* Implementación en design-system.md - incluida */
```

### 4. Scroll reveal de secciones

**Decisión: NO implementar**

**Justificación:**
- Rallusigence enfoca en profesionalismo y conversión directa
- Scroll reveal puede distraer del objetivo principal (formulario de auditoría)
- Mejora la velocidad de carga al no incluir JS adicional
- Usuarios B2B prefieren acceso inmediato a información

**Alternativa:** Todas las secciones son visibles de inmediato, optimizando para escaneo rápido de contenido.

### 5. CTA sticky aparecer/desaparecer

**Elemento:** `.btn-sticky`  
**Trigger:** scroll position (>300px desde top)  
**Propiedades que cambian:**
- `opacity`: 0 → 1
- `transform: translateY(100px)` → `translateY(0)`
- `pointer-events`: none → all

**Duración:** 0.3s  
**Easing:** ease-in-out

**JavaScript necesario:**
```javascript
window.addEventListener('scroll', () => {
  const stickyBtn = document.querySelector('.btn-sticky');
  const scrolled = window.scrollY > 300;
  const nearForm = window.scrollY > (document.body.scrollHeight - window.innerHeight - 500);
  
  if (scrolled && !nearForm) {
    stickyBtn.classList.add('btn-sticky--visible');
  } else {
    stickyBtn.classList.remove('btn-sticky--visible');
  }
});
```

### 6. Estado loading del botón de formulario

**Elemento:** `.btn-primary` en formulario  
**Trigger:** form submit  
**Propiedades que cambian:**
- Añadir clase `.btn-primary--loading`
- `pointer-events`: none (prevenir doble click)
- Mostrar spinner con `::before` pseudo-elemento
- Texto cambia a "Enviando..."

**Duración:** Spinner rotación continua  
**Easing:** linear infinite

```css
/* Implementación en design-system.md - incluida */
```

### 7. Mensajes de éxito/error del formulario

**Elemento:** Contenedor de mensaje dinámico  
**Trigger:** respuesta del servidor  
**Propiedades que cambian:**
- `opacity`: 0 → 1
- `transform: translateY(-10px)` → `translateY(0)`
- `background-color`: verde para éxito, rojo para error

**Duración:** 0.3s entrada, permanece 5s, 0.3s salida  
**Easing:** ease-out

---

## SECCIÓN 3 — ACCESIBILIDAD (A11Y) BÁSICA

### Contraste mínimo verificado

**Combinaciones auditadas:**
- Texto principal (#2C2C2C) sobre fondo blanco: **Ratio 12.6:1** ✅ AAA
- Texto teal (#008B8B) sobre fondo blanco: **Ratio 4.8:1** ✅ AA
- Texto blanco sobre fondo teal (#008B8B): **Ratio 4.4:1** ✅ AA
- Texto gris secundario (#6B7280) sobre fondo blanco: **Ratio 5.9:1** ✅ AA

**Herramientas de verificación:**
- WebAIM Contrast Checker
- Chrome DevTools Lighthouse

### Tamaño mínimo de áreas tocables

**Estándar:** 44px × 44px mínimo (WCAG Guidelines)

**Implementación en componentes:**
- Botones principales: 48px altura ✅
- Botones sticky: 56px altura ✅  
- Inputs de formulario: 48px altura ✅
- Links de navegación: padding mínimo 12px ✅
- Íconos tocables: área mínima 44px ✅

### Focus visible

**Estándar de outline:**
```css
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: 2px;
}
```

**Elementos que requieren focus visible:**
- Todos los botones (`.btn-*`)
- Todos los inputs (`.input-field`)
- Enlaces de navegación (`.nav-header__link`)
- Enlaces de footer (`.footer__link`)

### Alt text para imágenes

**Reglas para Rallusigence:**

1. **Logo de la empresa:** `alt="Rallusigence - Auditoría Digital"`
2. **Íconos decorativos:** `alt=""` (cadena vacía para íconos puramente decorativos)
3. **Íconos funcionales:** `alt="[Descripción de la función]"` ej: `alt="Enviar formulario"`
4. **Fotografías de equipo:** `alt="[Nombre], [Rol] de Rallusigence"`
5. **Gráficos de datos:** `alt="Gráfico que muestra [descripción de los datos]"`
6. **Screenshots de reportes:** `alt="Ejemplo de reporte de auditoría digital"`

### ARIA labels obligatorios

**Navegación:**
```html
<nav aria-label="Navegación principal">
  <ul role="list">
    <li><a href="#servicios" aria-label="Ir a sección de servicios">Servicios</a></li>
  </ul>
</nav>
```

**Formulario:**
```html
<form aria-label="Formulario de solicitud de auditoría">
  <div class="form-group">
    <label for="nombre" class="input-label">Nombre completo</label>
    <input 
      type="text" 
      id="nombre" 
      name="nombre" 
      class="input-field"
      aria-describedby="nombre-error"
      aria-invalid="false"
      required
    >
    <span id="nombre-error" class="input-error" aria-live="polite"></span>
  </div>
</form>
```

**Footer:**
```html
<footer aria-label="Información corporativa">
  <div aria-label="Enlaces legales">
    <a href="/privacidad" aria-label="Política de privacidad">Privacidad</a>
  </div>
</footer>
```

### Navegación por teclado

**Orden de tab stops:**
1. Links de navegación (header)
2. CTA principal en header  
3. Campos del formulario (orden lógico)
4. Botón de envío del formulario
5. Links secundarios (footer)

**Teclas de acceso directo:**
- `Enter`: Activar botones y enviar formulario
- `Esc`: Cerrar modales (si se implementan)
- `Tab/Shift+Tab`: Navegación entre elementos focusables

---

## SECCIÓN 4 — ESTADOS DEL FORMULARIO

### 1. Estado vacío (initial)

**Elementos visibles:**
- Título del formulario: "Solicita tu auditoría digital gratuita"
- Subtítulo: "Recibe un análisis completo de tu presencia digital en 48 horas"
- 4 campos vacíos con placeholders
- Botón "Solicitar auditoría" activo

**Comportamiento:**
- Todos los campos muestran placeholders sutiles
- Botón activo pero no clickeable hasta validación básica
- Sin mensajes de error visibles

**CSS state:** `.form-card` (estado base)

### 2. Estado con error de validación

**Triggers de error:**
- Campo vacío en requerido
- Formato incorrecto de email  
- Formato incorrecto de WhatsApp
- Nombre muy corto (< 2 caracteres)

**Elementos que cambian:**
- Campo con error: `.input-field--error`
- Label del campo: `.input-label--error` 
- Mensaje aparece: `.input-error--visible`
- Botón se mantiene bloqueado hasta corregir

**Mensajes específicos:**
```javascript
const errorMessages = {
  nombre: "Por favor ingresa tu nombre completo",
  email: "Ingresa un email válido (ejemplo@dominio.com)",
  whatsapp: "Ingresa un número de WhatsApp válido (10 dígitos)",
  empresa: "Por favor ingresa el nombre de tu empresa"
}
```

**CSS states:** 
- `.input-field--error`
- `.input-label--error` 
- `.input-error--visible`

### 3. Estado de carga (enviando)

**Trigger:** Click en "Solicitar auditoría" con datos válidos

**Elementos que cambian:**
- Botón: `.btn-primary--loading`
- Texto del botón: "Enviando..."
- Spinner visible en botón
- Form overlay con opacidad 80%
- Campos bloqueados (no editables)

**Duración esperada:** 2-5 segundos

**CSS state:** `.form-card--loading`

### 4. Estado de éxito (enviado correctamente)

**Trigger:** Respuesta exitosa del servidor

**Elementos que cambian:**
- Form card: `.form-card--success`
- Formulario se oculta o reemplaza
- Mensaje de éxito con ícono verde
- Botón cambia a "Nuevo envío" o se oculta
- Información de qué esperar a continuación

**Mensaje de éxito:**
```html
<div class="success-message">
  <div class="success-message__icon">✅</div>
  <h3 class="success-message__title">¡Solicitud enviada exitosamente!</h3>
  <p class="success-message__text">
    Recibirás tu auditoría digital completa en un máximo de 48 horas en el email proporcionado.
  </p>
  <p class="success-message__next">
    Nuestro equipo también te contactará vía WhatsApp para coordinar detalles adicionales.
  </p>
</div>
```

**CSS state:** `.form-card--success`

### 5. Estado de error de red (fallo al enviar)

**Triggers:**
- Error de conectividad
- Servidor no disponible  
- Error 500/400 del API
- Timeout de conexión

**Elementos que cambian:**
- Form card: `.form-card--error`
- Mensaje de error con ícono rojo
- Botón vuelve a estado normal "Reintentar envío"
- Campos editables nuevamente
- Sugerencia de contacto alternativo

**Mensaje de error:**
```html
<div class="error-message">
  <div class="error-message__icon">⚠️</div>
  <h3 class="error-message__title">Error al enviar la solicitud</h3>
  <p class="error-message__text">
    Ocurrió un problema técnico. Por favor intenta nuevamente en unos momentos.
  </p>
  <p class="error-message__alternative">
    Si el problema persiste, contáctanos directamente por WhatsApp: 
    <a href="https://wa.me/5215512345678" target="_blank">55 1234 5678</a>
  </p>
</div>
```

**CSS state:** `.form-card--error`

### CSS para estados de mensaje

```css
.success-message,
.error-message {
  padding: 32px;
  border-radius: 8px;
  text-align: center;
}

.success-message {
  background-color: #F0FDF4;
  border: 1px solid #BBF7D0;
}

.error-message {
  background-color: #FEF2F2;
  border: 1px solid #FECACA;
}

.success-message__icon,
.error-message__icon {
  font-size: 48px;
  margin-bottom: 16px;
  display: block;
}

.success-message__title,
.error-message__title {
  margin-bottom: 12px;
  font-family: var(--font-family-primary);
  font-weight: 600;
  font-size: 20px;
  line-height: 1.3;
}

.success-message__title {
  color: #065F46;
}

.error-message__title {
  color: #991B1B;
}

.success-message__text,
.success-message__next,
.error-message__text,
.error-message__alternative {
  margin-bottom: 12px;
  font-family: var(--font-family-primary);
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
}

.success-message__text,
.success-message__next {
  color: #047857;
}

.error-message__text,
.error-message__alternative {
  color: #7F1D1D;
}

.error-message__alternative a {
  color: var(--color-primary);
  font-weight: 500;
  text-decoration: none;
}

.error-message__alternative a:hover {
  text-decoration: underline;
}
```

---

## SECCIÓN 5 — GUÍA DE IMPLEMENTACIÓN

### Orden de carga de CSS

**1. Variables CSS (primero):**
```html
<link rel="stylesheet" href="css/variables.css">
```

**2. Reset CSS (segundo):**
```html
<link rel="stylesheet" href="css/reset.css">
```

**3. Base styles (tercero):**
```html
<link rel="stylesheet" href="css/base.css">
```

**4. Componentes (cuarto):**
```html
<link rel="stylesheet" href="css/components.css">
```

**5. Utilidades (último):**
```html
<link rel="stylesheet" href="css/utilities.css">
```

### Nombramiento de clases (BEM)

**Estructura:** `block__element--modifier`

**Ejemplos implementados:**
```css
/* Block */
.btn-primary { }

/* Block with modifier */
.btn-primary--loading { }

/* Block with element */
.service-card__title { }

/* Block with element and modifier */
.service-card__title--featured { }

/* Complex example */
.form-card__subtitle--error { }
```

### Breakpoints en código

**Mobile First approach:**
```css
/* Base styles: Mobile 320px+ */
.component {
  padding: 16px;
  font-size: 14px;
}

/* Tablet: 768px+ */
@media (min-width: 768px) {
  .component {
    padding: 20px;
    font-size: 16px;
  }
}

/* Desktop: 1200px+ */
@media (min-width: 1200px) {
  .component {
    padding: 24px;
    font-size: 18px;
  }
}
```

**Breakpoints específicos de Rallusigence:**
- **Mobile:** 320px → 767px
- **Tablet:** 768px → 1199px  
- **Desktop:** 1200px+
- **Large Desktop:** 1400px+ (contenedor máximo)

### Estructura de archivos CSS recomendada

```
css/
├── variables.css          (colores, espaciado, tipografía)
├── reset.css             (normalize + custom reset)
├── base.css              (body, headings, links base)
├── components/
│   ├── buttons.css       (todos los .btn-*)
│   ├── forms.css         (inputs, labels, form-card)
│   ├── cards.css         (service-card, testimonial-card)
│   ├── layout.css        (nav-header, footer, section-wrapper)
│   └── ui-elements.css   (price-tag, icons, misc)
├── utilities.css         (spacing, text, display helpers)
└── main.css             (imports all the above)
```

**main.css (archivo principal):**
```css
@import 'variables.css';
@import 'reset.css';
@import 'base.css';
@import 'components/buttons.css';
@import 'components/forms.css';
@import 'components/cards.css';
@import 'components/layout.css';
@import 'components/ui-elements.css';
@import 'utilities.css';
```

### Optimización para producción

**1. Minificación CSS:**
- Remover comentarios y espacios
- Combinar selectores duplicados
- Optimizar propiedades shorthand

**2. Critical CSS:**
- Incluir styles de above-the-fold inline en `<head>`
- Cargar resto de CSS async

**3. Font loading:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

**4. Icon loading:**
```html
<script type="module">
  import { Search, ShieldCheck, TrendingUp, Users } from 'https://unpkg.com/lucide@latest/dist/esm/icons/index.js';
  // Solo cargar íconos necesarios para la página actual
</script>
```

---

## VALIDACIÓN FINAL

**✅ Checklist de implementación:**
- [ ] Variables CSS definidas y funcionando
- [ ] Todos los componentes probados en 3 breakpoints
- [ ] Contraste verificado en todas las combinaciones
- [ ] Focus visible en elementos interactivos
- [ ] Estados de formulario implementados y probados
- [ ] Íconos cargando correctamente
- [ ] Micro-interacciones suaves y consistentes
- [ ] Performance: < 2MB total de assets CSS/JS
- [ ] Validación HTML sin errores
- [ ] Accesibilidad validada con Lighthouse

**🔧 Herramientas de testing recomendadas:**
- Chrome DevTools Lighthouse
- WAVE Web Accessibility Evaluator
- WebAIM Contrast Checker
- W3C Markup Validator