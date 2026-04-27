# Guía de Accesibilidad (A11y) — Rallusigence

**Proyecto:** Sitio Rallusigence (Home single-page + /auditoria-gratis)
**Stack:** HTML5 + CSS3 + JS vanilla, Firebase Hosting
**Fecha:** 2026-04-25
**Responsable técnico:** Líder técnico — Agencia IA Alfredo
**Objetivo de cumplimiento:** WCAG 2.1 nivel AA + Lighthouse Accessibility ≥ 95

Esta guía es la referencia única para implementación accesible en Rallusigence. Cubre solo lo que aplica al sitio real — no hay teoría innecesaria.

La audiencia es dueños de negocios mexicanos de 35–50 años, principalmente en celular. Por eso priorizamos: tamaños tocables, zoom no bloqueado, jerarquía clara, formularios sin fricción.

---

## Sección 1 — WCAG 2.1 AA: Checklist de cumplimiento

Organizado por los 4 principios POUR. Cada criterio incluye: número, nivel, cómo se cumple en Rallusigence, dónde aplica y cómo se verifica.

### 1.1 PERCEPTIBLE — la información debe poder presentarse de formas que el usuario pueda percibir

| WCAG | Criterio | Nivel | Cómo se cumple en Rallusigence | Dónde aplica | Cómo verificar |
|---|---|---|---|---|---|
| 1.1.1 | Contenido no textual | A | Toda imagen `<img>` tiene `alt` descriptivo o `alt=""` si es decorativa. Iconos SVG inline llevan `aria-hidden="true"` cuando van junto a texto. | Logo header, imágenes hero, fotos testimonios, iconos servicios | WAVE → revisar "Missing alternative text" |
| 1.3.1 | Información y relaciones | A | HTML semántico (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`). Labels asociados a inputs con `for`/`id`. Headings jerarquizados. | Toda la estructura del sitio | Inspector → outline del documento |
| 1.3.2 | Secuencia significativa | A | Orden DOM = orden de lectura visual. No se usa `position: absolute` para reordenar contenido importante. | Hero, servicios, testimonios, footer | Desactivar CSS y leer orden |
| 1.3.4 | Orientación | AA | El sitio funciona en portrait y landscape. No se fuerza orientación con CSS. | Todo el sitio | Rotar dispositivo móvil |
| 1.3.5 | Identificar propósito de inputs | AA | `autocomplete="name"`, `autocomplete="email"`, `autocomplete="tel"` en formulario de auditoría. | /auditoria-gratis form | Inspector → atributos del input |
| 1.4.1 | Uso del color | A | Errores de formulario no se indican solo con color rojo: también con icono + texto + `aria-invalid`. Links subrayados o con peso distinto. | Formularios, links inline | Convertir a escala de grises |
| 1.4.3 | Contraste mínimo (texto) | AA | Texto #2C2C2C/#FFF = 15.73:1. Blanco/Teal = 8.75:1. Teal/Blanco = 5.02:1. Todos sobre 4.5:1 (texto normal) y 3:1 (texto grande). | Todo el texto del sitio | Lighthouse + axe DevTools |
| 1.4.4 | Cambio de tamaño del texto | AA | Layout funciona al hacer zoom 200% sin pérdida de contenido ni scroll horizontal. Usamos `rem` y `em`, no `px` fijos para fuentes. | Todo el sitio | Cmd/Ctrl + "+" hasta 200% |
| 1.4.5 | Imágenes de texto | AA | El texto es texto real (no imágenes con texto encima). El logo es la única excepción permitida. | Hero, CTAs, headlines | Inspector → seleccionar texto |
| 1.4.10 | Reflow | AA | Sin scroll horizontal en 320px. Diseño mobile-first con `max-width: 100%` en imágenes. | Todo el sitio | DevTools → 320px de ancho |
| 1.4.11 | Contraste no textual | AA | Bordes de inputs, focus rings y estados hover tienen contraste ≥ 3:1 con su entorno. | Botones, inputs, focus | axe DevTools |
| 1.4.12 | Espaciado del texto | AA | Permitir que el usuario sobrescriba `line-height: 1.5`, `letter-spacing: 0.12em`, `word-spacing: 0.16em`, `paragraph-spacing: 2em` sin romper layout. | Todo el sitio | Bookmarklet de espaciado WCAG |
| 1.4.13 | Contenido al pasar puntero/foco | AA | Tooltips (si los hubiera) son persistentes, descartables con Esc, y no obstruyen el contenido subyacente. | N/A si no se usan tooltips | Hover + Esc |

### 1.2 OPERABLE — la interfaz debe poder operarse

| WCAG | Criterio | Nivel | Cómo se cumple en Rallusigence | Dónde aplica | Cómo verificar |
|---|---|---|---|---|---|
| 2.1.1 | Teclado | A | Todos los elementos interactivos (links, botones, inputs) son accesibles con Tab, Enter y Space. No usamos `<div onclick>`. | Nav, botones, formulario | Navegar todo el sitio solo con teclado |
| 2.1.2 | Sin trampas de teclado | A | El foco nunca queda atrapado. El estado loading del formulario no atrapa el foco — solo deshabilita el submit. | Formulario auditoría | Tab por todo el sitio sin quedar atorado |
| 2.1.4 | Atajos de tecla | A | No usamos shortcuts de una sola tecla. Si se agregan, deberán poder desactivarse. | N/A actualmente | — |
| 2.4.1 | Bloques evitables | A | Skip link "Saltar al contenido principal" como primer elemento focusable. | Header de ambas páginas | Tab al cargar la página |
| 2.4.2 | Página titulada | A | `<title>` único y descriptivo en cada página: "Rallusigence — Marketing Digital para PyMES" / "Auditoría Gratis — Rallusigence". | Home y /auditoria-gratis | View source → `<title>` |
| 2.4.3 | Orden de foco | A | El orden de tab sigue el flujo visual: skip link → logo → nav → CTA header → contenido en orden DOM → footer. | Todo el sitio | Tab y observar el outline azul |
| 2.4.4 | Propósito del enlace | A | Cada link tiene texto descriptivo. Nada de "click aquí" o "leer más" sueltos. Si es necesario, `aria-label`. | Nav, CTAs, footer links | Listar todos los links con lector de pantalla |
| 2.4.5 | Múltiples vías | AA | El sitio es single-page con anchors + landing dedicada. La nav permite llegar a cada sección. Footer también linkea a secciones clave. | Nav header, footer | Inspección manual |
| 2.4.6 | Encabezados y etiquetas | AA | Headings describen su sección. Labels describen su input. Sin headings vacíos ni labels genéricos. | Toda la página | WAVE → outline de headings |
| 2.4.7 | Foco visible | AA | Focus ring de 2px sólido teal (#008B8B) con offset de 2px. Nunca `outline: none` sin reemplazo. | Todos los focusables | Tab y observar |
| 2.5.1 | Gestos del puntero | A | Toda funcionalidad multipuntero/gesto tiene alternativa de un solo toque. No hay gestos complejos. | Sliders/carousels (si los hay) | Probar con un dedo |
| 2.5.2 | Cancelación del puntero | A | Acciones críticas (envío form) se ejecutan en `click`/submit, no en `mousedown`. Permite cancelar arrastrando fuera. | Botón submit | Mantener clic + arrastrar fuera |
| 2.5.3 | Etiqueta en el nombre | A | El nombre accesible coincide con el texto visible del botón. Ej: si el botón dice "Solicitar auditoría", su `aria-label` (si existe) empieza igual. | Todos los botones | Lector de pantalla |
| 2.5.4 | Activación por movimiento | A | Ninguna funcionalidad depende de agitar el dispositivo. | N/A | — |
| 2.5.5 | Tamaño del objetivo (AAA, lo cumplimos por buena práctica) | AAA | Áreas tocables ≥ 44×44 px. | CTAs, nav links mobile, sticky button | Medir en DevTools |

### 1.3 COMPRENSIBLE — la información y operación deben ser comprensibles

| WCAG | Criterio | Nivel | Cómo se cumple en Rallusigence | Dónde aplica | Cómo verificar |
|---|---|---|---|---|---|
| 3.1.1 | Idioma de la página | A | `<html lang="es-MX">` en todas las páginas. | Home, /auditoria-gratis | View source |
| 3.1.2 | Idioma de las partes | AA | Si aparece texto en inglés (ej: "ROI", "marketing"), si es término adoptado se deja sin marcar. Si es frase larga: `<span lang="en">`. | Casos puntuales en copy | Revisar a mano |
| 3.2.1 | Al recibir el foco | A | Recibir el foco no dispara cambios de contexto (no abre modales, no navega). | Inputs, botones | Tab por todo el sitio |
| 3.2.2 | Al recibir entrada | A | Cambiar un input no envía el formulario ni navega. El submit es explícito. | Formulario auditoría | Llenar y observar |
| 3.2.3 | Navegación consistente | AA | El nav header es idéntico en Home y /auditoria-gratis (mismo orden, mismas etiquetas). | Header en ambas páginas | Comparar visualmente |
| 3.2.4 | Identificación consistente | AA | Iconos y botones con la misma función llevan el mismo nombre en todo el sitio. Ej: el botón "Solicitar auditoría" siempre se llama así. | Todos los CTAs | Inspección |
| 3.3.1 | Identificación de errores | A | Errores de formulario se identifican con texto + icono + `aria-invalid="true"` + `aria-describedby`. | Formulario | Enviar form vacío |
| 3.3.2 | Etiquetas o instrucciones | A | Cada input tiene `<label>` visible. Inputs requeridos llevan asterisco visible + `aria-required="true"`. | Formulario | Inspección |
| 3.3.3 | Sugerencia ante errores | AA | Mensajes de error indican cómo corregir: "El email debe incluir @". No solo "Error". | Formulario | Forzar errores |
| 3.3.4 | Prevención de errores (legal/financiero) | AA | El form de auditoría no es legal/financiero, pero igual mostramos confirmación de envío con resumen de datos. | Formulario | Enviar form |

### 1.4 ROBUSTO — el contenido debe ser lo bastante robusto para distintos agentes de usuario

| WCAG | Criterio | Nivel | Cómo se cumple en Rallusigence | Dónde aplica | Cómo verificar |
|---|---|---|---|---|---|
| 4.1.1 | Análisis sintáctico (obsoleto en 2.2 pero aplica en 2.1) | A | HTML válido, etiquetas cerradas, atributos sin duplicar, IDs únicos. | Todo el sitio | validator.w3.org |
| 4.1.2 | Nombre, función, valor | A | Cada componente interactivo tiene nombre accesible, rol claro y estado expuesto (ej: botón loading con `aria-busy="true"`). | Botones, inputs, nav | axe DevTools |
| 4.1.3 | Mensajes de estado | AA | Mensajes de éxito/error en el form usan `aria-live="polite"` para anunciarse al lector de pantalla sin recibir foco. | Formulario auditoría | NVDA/VoiceOver al enviar form |

---

## Sección 2 — HTML semántico: reglas de implementación

### 2.1 `<header>` + `<nav>`

**Regla:** un solo `<header>` principal por página (el del sitio). Dentro va el `<nav>` principal. Si hay un footer con links, lleva su propio `<nav>` con `aria-label` distinto.

```html
<header role="banner">
  <a href="#contenido-principal" class="skip-link">Saltar al contenido principal</a>

  <a href="/" class="logo" aria-label="Rallusigence — Inicio">
    <img src="/img/logo-rallusigence.svg" alt="" width="140" height="32">
  </a>

  <nav aria-label="Navegación principal">
    <ul>
      <li><a href="#servicios">Servicios</a></li>
      <li><a href="#casos">Casos</a></li>
      <li><a href="#contacto">Contacto</a></li>
    </ul>
  </nav>

  <a href="/auditoria-gratis" class="btn btn-primary">Auditoría gratis</a>
</header>
```

Notas:
- `role="banner"` es redundante en `<header>` directo de `<body>` en HTML5 moderno, pero lo dejamos como respaldo para lectores antiguos.
- El logo usa `alt=""` porque el `aria-label` del enlace ya describe el destino. Evita doble lectura.
- El `<nav>` siempre lleva `aria-label` cuando hay más de un nav en la página.

### 2.2 `<main>`

**Regla:** exactamente UN `<main>` por página. Empieza después del header. Termina antes del footer.

```html
<main id="contenido-principal" tabindex="-1">
  <!-- Todo el contenido único de la página -->
</main>
```

`tabindex="-1"` permite que el skip link mande el foco aquí.

### 2.3 `<section>` vs `<article>` vs `<div>`

**`<section>`:** bloques temáticos identificables con un heading. Cada sección de la home (Hero, Servicios, Casos, Testimonios, Contacto) es un `<section>` con su `<h2>`.

**`<article>`:** contenido autónomo y reutilizable. En este sitio: cada testimonio individual, cada card de servicio si tiene sentido propio.

**`<div>`:** solo para agrupación visual sin significado semántico. Layout, contenedores de estilo.

```html
<main id="contenido-principal" tabindex="-1">
  <section aria-labelledby="hero-title">
    <h1 id="hero-title">Marketing digital que sí trae clientes</h1>
    <p>...</p>
  </section>

  <section aria-labelledby="servicios-title">
    <h2 id="servicios-title">Nuestros servicios</h2>

    <div class="grid-servicios">
      <article class="card-servicio">
        <h3>SEO local</h3>
        <p>...</p>
      </article>
      <article class="card-servicio">
        <h3>Google Ads</h3>
        <p>...</p>
      </article>
    </div>
  </section>

  <section aria-labelledby="testimonios-title">
    <h2 id="testimonios-title">Lo que dicen nuestros clientes</h2>

    <article class="testimonio">
      <blockquote>
        <p>"Triplicamos las llamadas en 2 meses."</p>
      </blockquote>
      <footer>— Laura M., Restaurante La Casona</footer>
    </article>
  </section>
</main>
```

### 2.4 Jerarquía de headings

**Regla específica para Rallusigence:**

- Un solo `<h1>` por página: el headline principal del Hero.
- Cada `<section>` empieza con `<h2>`.
- Subsecciones dentro de section: `<h3>`.
- Nunca saltar niveles (no pasar de h2 a h4).
- Nunca usar headings solo por el estilo visual (eso es CSS).

```
Home:
h1 — "Marketing digital que sí trae clientes" (Hero)
  h2 — "Nuestros servicios"
    h3 — "SEO local"
    h3 — "Google Ads"
    h3 — "Redes sociales"
  h2 — "Casos de éxito"
    h3 — "Restaurante La Casona"
    h3 — "Clínica Dental Norte"
  h2 — "Lo que dicen nuestros clientes"
  h2 — "¿Listo para crecer?"

/auditoria-gratis:
h1 — "Recibe tu auditoría digital gratis en 48 horas"
  h2 — "Qué incluye tu auditoría"
  h2 — "Solicita tu auditoría"  (form)
  h2 — "Lo que dicen quienes ya la pidieron"
```

### 2.5 `<button>` vs `<a>`

**Regla simple:**
- `<a href="...">` → si NAVEGA a otra URL, ancla, o descarga.
- `<button>` → si EJECUTA una acción (submit, abrir modal, toggle).

Ejemplos en el sitio:

```html
<!-- CTA del Hero que va a /auditoria-gratis: es un LINK -->
<a href="/auditoria-gratis" class="btn btn-primary">Solicitar auditoría gratis</a>

<!-- CTA dentro de un anchor de la home: es un LINK -->
<a href="#contacto" class="btn btn-secondary">Hablemos</a>

<!-- Botón de envío del formulario: es un BUTTON -->
<button type="submit" class="btn btn-primary">Enviar solicitud</button>

<!-- Botón sticky mobile que hace scroll al form: es un LINK con anchor -->
<a href="#form-auditoria" class="btn-sticky-mobile">Auditoría gratis</a>

<!-- Toggle del menú móvil: es un BUTTON -->
<button type="button" aria-expanded="false" aria-controls="nav-menu" aria-label="Abrir menú">
  <span aria-hidden="true">☰</span>
</button>
```

Nunca:
```html
<!-- MAL: un div como botón -->
<div onclick="enviar()">Enviar</div>

<!-- MAL: un link sin href -->
<a onclick="abrir()">Abrir</a>

<!-- MAL: un button para navegar -->
<button onclick="location.href='/contacto'">Contacto</button>
```

### 2.6 Formulario

```html
<form id="form-auditoria" novalidate aria-labelledby="form-title">
  <h2 id="form-title">Solicita tu auditoría gratis</h2>

  <p id="form-instructions">Los campos con asterisco (<span aria-hidden="true">*</span>) son obligatorios.</p>

  <div class="campo">
    <label for="nombre">Tu nombre <span aria-hidden="true">*</span></label>
    <input
      type="text"
      id="nombre"
      name="nombre"
      autocomplete="name"
      required
      aria-required="true"
      aria-describedby="nombre-error">
    <span id="nombre-error" class="mensaje-error" aria-live="polite"></span>
  </div>

  <div class="campo">
    <label for="email">Email <span aria-hidden="true">*</span></label>
    <input
      type="email"
      id="email"
      name="email"
      autocomplete="email"
      required
      aria-required="true"
      aria-describedby="email-hint email-error"
      inputmode="email">
    <span id="email-hint" class="hint">Te enviaremos la auditoría a este correo.</span>
    <span id="email-error" class="mensaje-error" aria-live="polite"></span>
  </div>

  <div class="campo">
    <label for="telefono">Teléfono (WhatsApp)</label>
    <input
      type="tel"
      id="telefono"
      name="telefono"
      autocomplete="tel"
      aria-describedby="telefono-error"
      inputmode="tel">
    <span id="telefono-error" class="mensaje-error" aria-live="polite"></span>
  </div>

  <fieldset class="campo">
    <legend>¿Qué te interesa más?</legend>
    <label><input type="radio" name="interes" value="seo"> SEO local</label>
    <label><input type="radio" name="interes" value="ads"> Google Ads</label>
    <label><input type="radio" name="interes" value="redes"> Redes sociales</label>
    <label><input type="radio" name="interes" value="todo"> Todo lo anterior</label>
  </fieldset>

  <button type="submit" class="btn btn-primary">Enviar solicitud</button>

  <div id="form-status" role="status" aria-live="polite" class="form-status"></div>
</form>
```

Reglas clave:
- `<label>` siempre con `for` que coincide con `id` del input.
- `<fieldset>` + `<legend>` para grupos de radio o checkbox.
- `aria-describedby` apunta a hints y errores, separados por espacio si son varios.
- `novalidate` desactiva validación nativa para usar la nuestra (mejor consistencia y mensajes en español).
- `inputmode` mejora el teclado en móvil (numérico para tel, email-friendly para email).

---

## Sección 3 — ARIA labels obligatorios

Regla general: **HTML semántico primero, ARIA solo cuando sea necesario.** No agregues ARIA si el HTML ya lo expresa.

### 3.1 Navegación

```html
<!-- Nav principal -->
<nav aria-label="Navegación principal">
  <ul>
    <li><a href="#servicios" aria-current="page">Servicios</a></li>
    <li><a href="#casos">Casos</a></li>
  </ul>
</nav>

<!-- Nav del footer -->
<nav aria-label="Navegación del pie de página">
  <ul>
    <li><a href="/aviso-de-privacidad">Aviso de privacidad</a></li>
    <li><a href="/terminos">Términos</a></li>
  </ul>
</nav>
```

`aria-current="page"` se aplica al link de la sección actual (lo maneja JS al hacer scroll). En /auditoria-gratis no aplica porque no hay nav interno.

### 3.2 Botones sin texto visible

Cualquier botón que solo tiene icono debe tener `aria-label`:

```html
<!-- Toggle de menú móvil -->
<button type="button"
        class="btn-menu-mobile"
        aria-expanded="false"
        aria-controls="nav-menu"
        aria-label="Abrir menú de navegación">
  <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">...</svg>
</button>

<!-- Cerrar mensaje de éxito -->
<button type="button" aria-label="Cerrar mensaje" class="btn-cerrar">
  <svg aria-hidden="true" focusable="false">...</svg>
</button>
```

Cuando el menú se abre, JS debe cambiar:
- `aria-expanded="true"`
- `aria-label="Cerrar menú de navegación"`

### 3.3 Formulario

Ya cubierto en Sección 2.6, pero los atributos clave son:

| Atributo | Cuándo |
|---|---|
| `aria-required="true"` | Input obligatorio (acompaña a `required`) |
| `aria-invalid="true"` | Input con error de validación (set por JS al validar) |
| `aria-invalid="false"` | Input válido (set por JS) |
| `aria-describedby="id-hint id-error"` | Para asociar hints y mensajes de error |
| `aria-live="polite"` | En el contenedor de error para que el lector lo anuncie |

Ejemplo dinámico (JS pone `aria-invalid` y muestra el error):

```html
<div class="campo campo--error">
  <label for="email">Email *</label>
  <input
    type="email"
    id="email"
    name="email"
    required
    aria-required="true"
    aria-invalid="true"
    aria-describedby="email-error">
  <span id="email-error" class="mensaje-error" aria-live="polite">
    El email debe incluir el símbolo @.
  </span>
</div>
```

### 3.4 Imágenes: `alt` descriptivo vs `alt=""`

| Tipo de imagen | Atributo correcto |
|---|---|
| Logo dentro de link "ir a Home" con `aria-label="Rallusigence — Inicio"` | `alt=""` |
| Logo en footer sin link envolvente | `alt="Rallusigence"` |
| Foto de cliente en testimonio | `alt="Laura Martínez, dueña de Restaurante La Casona"` |
| Imagen hero ilustrativa decorativa | `alt=""` |
| Captura de pantalla mostrando resultado de un caso | `alt="Gráfica que muestra crecimiento del 240% en llamadas en 3 meses"` |
| Icono SVG inline junto a texto del botón | `aria-hidden="true"` en el SVG |

Reglas:
- Si la imagen aporta información que no está en el texto cercano → `alt` descriptivo.
- Si la imagen es decorativa o redundante con el texto → `alt=""` (vacío, no quitar el atributo).
- SVGs inline: `aria-hidden="true"` y `focusable="false"` cuando son decorativos.

### 3.5 Icono + texto

Cuando un botón tiene icono + texto visible, el icono es decorativo:

```html
<a href="https://wa.me/521..." class="btn-whatsapp">
  <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">...</svg>
  Habla con nosotros
</a>
```

Si el icono es lo único visible, el icono lleva el nombre vía `aria-label` en el botón:

```html
<a href="https://wa.me/521..." class="btn-whatsapp-icon" aria-label="Contactar por WhatsApp">
  <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">...</svg>
</a>
```

### 3.6 Mensajes de estado del formulario

Usa `role="status"` + `aria-live="polite"` en un contenedor que se llena con JS al enviar el form:

```html
<div id="form-status" role="status" aria-live="polite" class="form-status">
  <!-- vacío al inicio. JS pone:
       "Enviando solicitud..."
       "¡Listo! Recibimos tu solicitud, te contactamos en menos de 24 horas."
       "Hubo un error al enviar. Intenta de nuevo o escríbenos a hola@rallusigence.com."
  -->
</div>
```

Reglas:
- `polite` → no interrumpe lo que está leyendo el usuario, espera turno.
- `assertive` → solo para errores muy críticos (no usar acá).
- `role="status"` lo hace una landmark que el lector de pantalla anuncia.

---

## Sección 4 — Navegación por teclado

### 4.1 Orden de tab stops en Home

```
1.  Skip link "Saltar al contenido principal"  (visible solo al recibir foco)
2.  Logo Rallusigence (link a #inicio)
3.  Link Nav: Servicios
4.  Link Nav: Casos
5.  Link Nav: Contacto
6.  CTA Header: "Auditoría gratis"  →  /auditoria-gratis
7.  CTA Hero: "Solicitar auditoría gratis"  →  /auditoria-gratis
8.  CTA Hero secundario: "Ver servicios"  →  #servicios
9.  Cards de servicios (si tienen link, en orden visual)
10. Cards de casos
11. Links a redes en testimonios (si los hay)
12. CTA final: "Quiero mi auditoría"
13. Links del footer en orden
14. (Mobile) Botón sticky: NO entra al tab order — ver 4.5
```

### 4.2 Orden de tab stops en /auditoria-gratis

```
1.  Skip link
2.  Logo (link a /)
3.  CTA header secundario (si lo hay)
4.  Input: Nombre
5.  Input: Email
6.  Input: Teléfono
7.  Radios: Qué te interesa (un solo tab stop, navegación con flechas)
8.  Botón: Enviar solicitud
9.  Links del footer
```

Notas:
- Los radio buttons en HTML estándar comparten un solo tab stop. Una vez dentro del grupo, las flechas navegan entre opciones.
- El skip link salta al `<main>` que contiene el form.

### 4.3 Estado loading del formulario

Cuando el usuario presiona "Enviar solicitud", el botón entra en estado loading. **No atrapamos el foco**. Lo que hacemos:

```js
// Al enviar:
btnEnviar.disabled = true;
btnEnviar.setAttribute('aria-busy', 'true');
btnEnviar.querySelector('.btn-text').textContent = 'Enviando...';

formStatus.textContent = 'Enviando tu solicitud...';

// Al éxito:
btnEnviar.disabled = false;
btnEnviar.removeAttribute('aria-busy');
btnEnviar.querySelector('.btn-text').textContent = 'Enviar solicitud';
formStatus.textContent = '¡Listo! Recibimos tu solicitud. Te contactamos en menos de 24 horas.';

// Mover foco al mensaje de éxito para que el usuario sepa qué pasó:
formStatus.setAttribute('tabindex', '-1');
formStatus.focus();
```

`aria-busy="true"` indica al lector que el botón está procesando. `disabled` evita doble submit. El foco al mensaje de éxito ayuda a usuarios de teclado a saber el resultado.

### 4.4 Skip link — implementación completa

```html
<!-- Como primer elemento dentro del <body> -->
<a href="#contenido-principal" class="skip-link">Saltar al contenido principal</a>
```

```css
/* Skip link: oculto visualmente pero focusable. Aparece al recibir foco. */
.skip-link {
  position: absolute;
  top: -40px;
  left: 8px;
  z-index: 1000;

  background-color: var(--color-teal, #008B8B);
  color: #FFFFFF;
  padding: 12px 20px;
  border-radius: 4px;

  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;

  transition: top 0.15s ease-in-out;
}

.skip-link:focus {
  top: 8px;
  outline: 2px solid #FFFFFF;
  outline-offset: 2px;
}
```

Y en el `<main>`:

```html
<main id="contenido-principal" tabindex="-1">
```

`tabindex="-1"` hace que `<main>` pueda recibir foco programáticamente sin entrar en el tab order normal.

### 4.5 Botón sticky mobile: ¿en tab order?

**Decisión: SÍ entra en tab order, pero al final del documento.**

Razones:
- Es una acción importante (CTA principal).
- Si lo sacamos del tab order, los usuarios de teclado nunca lo accionarían.
- En desktop el botón sticky no se muestra (CSS lo oculta), así que no afecta.

Implementación:

```html
<!-- Justo antes del cierre de </body>, después del footer -->
<a href="/auditoria-gratis" class="btn-sticky-mobile">
  Auditoría gratis
</a>
```

```css
.btn-sticky-mobile {
  display: none;
}

@media (max-width: 767px) {
  .btn-sticky-mobile {
    display: block;
    position: fixed;
    bottom: 16px;
    left: 16px;
    right: 16px;
    z-index: 100;

    background: var(--color-teal);
    color: #FFFFFF;
    text-align: center;
    padding: 14px 20px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    min-height: 48px;

    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .btn-sticky-mobile:focus-visible {
    outline: 2px solid #FFFFFF;
    outline-offset: 2px;
    box-shadow: 0 0 0 4px var(--color-teal);
  }
}
```

Excepción: en /auditoria-gratis, el sticky se oculta cuando el form está en viewport (JS con IntersectionObserver) para no obstruir.

---

## Sección 5 — Mobile y touch accessibility

### 5.1 Tamaño mínimo de áreas tocables: 44×44 px

| Elemento | Tamaño mínimo | Riesgo en Rallusigence |
|---|---|---|
| Botones primarios (CTA Hero, submit) | 48×48 mínimo, normal 56×48 | Bajo: ya son grandes |
| Links de nav header mobile | 44×44 con padding | **Riesgo medio**: links de texto suelo ser apretados, agregar `padding: 12px 16px` |
| Botón hamburguesa | 48×48 | Bajo, es un cuadrado |
| Botón sticky mobile | 100% width × 48 height | Bajo |
| Inputs del formulario | 48 height + 16 padding | Bajo |
| Radio buttons | input nativo + label clickeable con padding 12px | **Riesgo alto**: el círculo nativo es chico → toda la fila label debe ser clickeable |
| Links del footer | 44×44 con padding 12px 0 | **Riesgo medio**: revisar |
| Logo (link Home) | 44 height mínimo | Bajo |

CSS de seguridad para garantizar mínimos:

```css
.btn,
.nav-link,
.footer-link,
button,
input[type="submit"] {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 20px;
}

/* Radios y checkboxes: hacer toda la línea clickeable */
.radio-group label {
  display: flex;
  align-items: center;
  min-height: 44px;
  padding: 8px 0;
  cursor: pointer;
}
```

### 5.2 Espaciado entre elementos tocables

Mínimo recomendado: 8 px entre objetivos tocables. En Rallusigence:

```css
.nav-mobile li + li {
  margin-top: 8px;
}

.btn + .btn {
  margin-top: 12px;
}

.radio-group label + label {
  margin-top: 8px;
}

.footer-nav a {
  display: block;
  padding: 12px 0;
}
```

### 5.3 Zoom: NO bloquear

El meta viewport correcto:

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Lo que **NUNCA** hacemos:

```html
<!-- MAL: bloquea zoom -->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
```

Razón: usuarios mayores y con baja visión necesitan hacer zoom para leer. Bloquearlo es una violación directa de WCAG 1.4.4.

### 5.4 Orientación: portrait y landscape

El sitio funciona en ambas orientaciones. NO usamos:

```css
/* MAL: forzar orientación */
@media screen and (orientation: portrait) {
  .container { display: none; }
}
```

Sí podemos ajustar layout en landscape para tablets:

```css
@media (min-width: 768px) and (orientation: landscape) {
  .hero {
    /* layout más horizontal aprovechando ancho */
  }
}
```

Verificación: rotar el dispositivo en cada página y comprobar que el contenido reflowa sin pérdidas.

---

## Sección 6 — Herramientas de verificación

Antes de cada deploy a producción, Alfredo (o quien suba) corre este protocolo en orden:

### 6.1 Herramientas automáticas (3–5 min)

1. **Lighthouse (Chrome DevTools)**
   - DevTools → Lighthouse → seleccionar "Accessibility" + "Mobile" → Generate report.
   - **Criterio de aprobación: Accessibility ≥ 95.** Idealmente 100.
   - Si baja de 95: revisar cada issue antes de publicar.

2. **axe DevTools (extensión Chrome/Firefox)**
   - Más detallado que Lighthouse. Detecta issues que Lighthouse omite.
   - Correr "Scan all of my page".
   - **Criterio: 0 issues críticos. 0 serios.** Issues "moderate" se evalúan caso por caso.

3. **WAVE (extensión)**
   - Vista visual de errores y warnings sobre la página.
   - **Criterio: 0 errores rojos.** Warnings amarillos se revisan.

### 6.2 Pruebas manuales (10–15 min)

**Test de teclado (sin tocar el mouse):**
1. Cargar la página, presionar Tab.
2. Verificar que el primer focus es el skip link (debe verse).
3. Presionar Enter en skip link → foco va al `<main>`.
4. Tab por toda la página: cada elemento focusable es visible (focus ring teal).
5. En el formulario: completar usando solo teclado. Submit con Enter.
6. En menú móvil: abrir con Enter, navegar con Tab, cerrar con Esc.
7. Pasada completa por la página sin perder el foco ni quedar atrapado.

**Test de zoom:**
1. Ctrl/Cmd + "+" hasta 200%.
2. Verificar: sin scroll horizontal, todo el contenido sigue siendo legible y operable.

**Test sin CSS:**
1. DevTools → desactivar todas las stylesheets.
2. La página debe seguir teniendo sentido: orden lógico, jerarquía visible por headings.

### 6.3 Test con VoiceOver (iOS) — 3 pasos

VoiceOver es el lector de pantalla nativo de iPhone. Es el más relevante para la audiencia mexicana en celular.

**Activarlo:**
- Ajustes → Accesibilidad → VoiceOver → Activado.
- Tip: configurar el "Atajo de Accesibilidad" para activar/desactivar con triple clic en el botón lateral.

**Probar el sitio (3 pasos):**

1. **Abrir el sitio en Safari móvil.** Apenas carga, VoiceOver lee el `<title>`. Verifica que sea descriptivo.

2. **Deslizar a la derecha con un dedo** para ir avanzando elemento por elemento. Verifica:
   - El skip link se anuncia.
   - El logo se anuncia como "Rallusigence — Inicio, link".
   - Los headings se anuncian con su nivel ("Encabezado nivel 1: Marketing digital que sí trae clientes").
   - Los botones dicen "botón" y los links dicen "link".
   - Las imágenes decorativas NO se anuncian (si tienen `alt=""`).

3. **Probar el formulario:** doble tap en el primer input, escribir con el teclado, deslizar al siguiente. Al enviar, verificar que el mensaje de éxito SE ANUNCIA solo (gracias a `aria-live="polite"`).

**Atajos útiles VoiceOver iOS:**
- Deslizar 3 dedos arriba/abajo: scroll.
- Doble tap: activar elemento.
- Rotor (girar 2 dedos): navegar por headings, links, etc.

### 6.4 Criterio final de aprobación

Para considerar un deploy "accesible":

- [ ] Lighthouse Accessibility ≥ 95 en mobile y desktop.
- [ ] axe DevTools: 0 críticos, 0 serios.
- [ ] WAVE: 0 errores rojos.
- [ ] Navegación completa por teclado funciona en Home y /auditoria-gratis.
- [ ] Skip link funciona y es visible al recibir foco.
- [ ] Formulario completable solo con teclado, mensajes de error se leen con lector.
- [ ] VoiceOver iOS: anuncia headings, links, form labels, mensaje de éxito tras submit.
- [ ] Zoom 200% sin scroll horizontal.
- [ ] Funciona en portrait y landscape.

Si cualquier punto falla → no se publica hasta corregir.

---

## Sección 7 — Código de referencia (copiar/pegar)

### 7.1 Skip link completo

**HTML** (primer hijo de `<body>`):

```html
<a href="#contenido-principal" class="skip-link">Saltar al contenido principal</a>
```

**HTML** (en el `<main>`):

```html
<main id="contenido-principal" tabindex="-1">
  <!-- ... -->
</main>
```

**CSS:**

```css
.skip-link {
  position: absolute;
  top: -48px;
  left: 8px;
  z-index: 9999;

  display: inline-block;
  padding: 12px 20px;

  background-color: #008B8B;
  color: #FFFFFF;

  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;

  border-radius: 4px;
  transition: top 0.15s ease-in-out;
}

.skip-link:focus {
  top: 8px;
  outline: 3px solid #FFFFFF;
  outline-offset: 2px;
  box-shadow: 0 0 0 5px #008B8B;
}
```

### 7.2 Formulario accesible completo

```html
<form id="form-auditoria" class="form-auditoria" novalidate aria-labelledby="form-title">

  <h2 id="form-title">Solicita tu auditoría gratis</h2>

  <p class="form-instructions" id="form-instructions">
    Los campos con asterisco (<span aria-hidden="true">*</span>) son obligatorios.
    Te contactamos en menos de 24 horas.
  </p>

  <!-- Campo: Nombre -->
  <div class="campo">
    <label for="nombre">
      Tu nombre <span aria-hidden="true" class="requerido">*</span>
    </label>
    <input
      type="text"
      id="nombre"
      name="nombre"
      autocomplete="name"
      required
      aria-required="true"
      aria-describedby="nombre-error"
      maxlength="80">
    <span id="nombre-error" class="mensaje-error" aria-live="polite"></span>
  </div>

  <!-- Campo: Email -->
  <div class="campo">
    <label for="email">
      Email <span aria-hidden="true" class="requerido">*</span>
    </label>
    <input
      type="email"
      id="email"
      name="email"
      autocomplete="email"
      inputmode="email"
      required
      aria-required="true"
      aria-describedby="email-hint email-error"
      maxlength="120">
    <span id="email-hint" class="hint">
      Te enviaremos la auditoría a este correo.
    </span>
    <span id="email-error" class="mensaje-error" aria-live="polite"></span>
  </div>

  <!-- Campo: Teléfono -->
  <div class="campo">
    <label for="telefono">Teléfono (WhatsApp)</label>
    <input
      type="tel"
      id="telefono"
      name="telefono"
      autocomplete="tel"
      inputmode="tel"
      aria-describedby="telefono-error"
      maxlength="20">
    <span id="telefono-error" class="mensaje-error" aria-live="polite"></span>
  </div>

  <!-- Campo: Negocio -->
  <div class="campo">
    <label for="negocio">Nombre de tu negocio</label>
    <input
      type="text"
      id="negocio"
      name="negocio"
      autocomplete="organization"
      maxlength="80">
  </div>

  <!-- Grupo: Interés -->
  <fieldset class="campo campo-grupo">
    <legend>¿Qué te interesa más?</legend>
    <label class="radio-label">
      <input type="radio" name="interes" value="seo">
      <span>SEO local (Google Maps)</span>
    </label>
    <label class="radio-label">
      <input type="radio" name="interes" value="ads">
      <span>Google Ads</span>
    </label>
    <label class="radio-label">
      <input type="radio" name="interes" value="redes">
      <span>Redes sociales</span>
    </label>
    <label class="radio-label">
      <input type="radio" name="interes" value="todo" checked>
      <span>Todo lo anterior</span>
    </label>
  </fieldset>

  <!-- Submit -->
  <button type="submit" class="btn btn-primary btn-submit" id="btn-submit">
    <span class="btn-text">Enviar solicitud</span>
    <span class="btn-spinner" aria-hidden="true"></span>
  </button>

  <!-- Status accesible -->
  <div id="form-status" class="form-status" role="status" aria-live="polite"></div>

</form>
```

**CSS mínimo de accesibilidad para el form:**

```css
.campo {
  margin-bottom: 24px;
}

.campo label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #2C2C2C;
}

.campo input,
.campo textarea {
  width: 100%;
  min-height: 48px;
  padding: 12px 16px;

  font-family: inherit;
  font-size: 1rem;
  color: #2C2C2C;

  background-color: #FFFFFF;
  border: 2px solid #CCCCCC;
  border-radius: 6px;
}

.campo input:focus-visible,
.campo textarea:focus-visible {
  outline: 3px solid #008B8B;
  outline-offset: 2px;
  border-color: #008B8B;
}

.campo input[aria-invalid="true"] {
  border-color: #C0392B;
}

.mensaje-error {
  display: block;
  margin-top: 6px;
  min-height: 1.2em;
  color: #C0392B;
  font-size: 0.9rem;
}

.mensaje-error::before {
  content: "";
}

.campo input[aria-invalid="true"] + .mensaje-error::before,
.campo input[aria-invalid="true"] ~ .mensaje-error::before {
  content: "⚠ ";
  speak: never;
}

.hint {
  display: block;
  margin-top: 4px;
  color: #666666;
  font-size: 0.875rem;
}

.requerido {
  color: #C0392B;
}

fieldset.campo-grupo {
  border: none;
  padding: 0;
  margin: 0 0 24px 0;
}

fieldset.campo-grupo legend {
  font-weight: 600;
  margin-bottom: 12px;
  padding: 0;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 44px;
  padding: 8px 0;
  cursor: pointer;
}

.radio-label input[type="radio"] {
  width: 24px;
  height: 24px;
  margin: 0;
  flex-shrink: 0;
}

.form-status {
  margin-top: 16px;
  padding: 0;
}

.form-status:not(:empty) {
  padding: 12px 16px;
  border-radius: 6px;
}

.form-status.exito {
  background-color: #E8F5E9;
  color: #1B5E20;
  border-left: 4px solid #2E7D32;
}

.form-status.error {
  background-color: #FFEBEE;
  color: #B71C1C;
  border-left: 4px solid #C62828;
}
```

### 7.3 Manejo de errores con ARIA live regions (JS vanilla)

```js
const form = document.getElementById('form-auditoria');
const formStatus = document.getElementById('form-status');
const btnSubmit = document.getElementById('btn-submit');

function mostrarErrorCampo(input, mensaje) {
  input.setAttribute('aria-invalid', 'true');
  const errorId = input.getAttribute('aria-describedby').split(' ').pop();
  const errorEl = document.getElementById(errorId);
  if (errorEl) {
    errorEl.textContent = mensaje;
  }
}

function limpiarErrorCampo(input) {
  input.setAttribute('aria-invalid', 'false');
  const errorId = input.getAttribute('aria-describedby').split(' ').pop();
  const errorEl = document.getElementById(errorId);
  if (errorEl) {
    errorEl.textContent = '';
  }
}

function validarCampo(input) {
  limpiarErrorCampo(input);

  if (input.required && !input.value.trim()) {
    mostrarErrorCampo(input, 'Este campo es obligatorio.');
    return false;
  }

  if (input.type === 'email' && input.value) {
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
    if (!emailValido) {
      mostrarErrorCampo(input, 'El email debe incluir @ y un dominio válido.');
      return false;
    }
  }

  return true;
}

// Validar al perder foco
form.querySelectorAll('input[required], input[type="email"]').forEach(input => {
  input.addEventListener('blur', () => validarCampo(input));
  input.addEventListener('input', () => {
    if (input.getAttribute('aria-invalid') === 'true') {
      validarCampo(input);
    }
  });
});

// Submit
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Validar todos los campos requeridos
  const inputs = form.querySelectorAll('input[required], input[type="email"]');
  let todoValido = true;
  inputs.forEach(input => {
    if (!validarCampo(input)) todoValido = false;
  });

  if (!todoValido) {
    formStatus.className = 'form-status error';
    formStatus.textContent = 'Revisa los campos marcados antes de enviar.';
    // Mover foco al primer input inválido
    const primerError = form.querySelector('[aria-invalid="true"]');
    if (primerError) primerError.focus();
    return;
  }

  // Estado loading
  btnSubmit.disabled = true;
  btnSubmit.setAttribute('aria-busy', 'true');
  btnSubmit.querySelector('.btn-text').textContent = 'Enviando...';
  formStatus.className = 'form-status';
  formStatus.textContent = 'Enviando tu solicitud...';

  try {
    const formData = new FormData(form);
    const response = await fetch('/api/auditoria', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) throw new Error('Network error');

    // Éxito
    formStatus.className = 'form-status exito';
    formStatus.textContent = '¡Listo! Recibimos tu solicitud. Te contactamos en menos de 24 horas en el correo que diste.';
    formStatus.setAttribute('tabindex', '-1');
    formStatus.focus();
    form.reset();

  } catch (err) {
    formStatus.className = 'form-status error';
    formStatus.textContent = 'Hubo un error al enviar. Intenta de nuevo o escríbenos a hola@rallusigence.com.';
  } finally {
    btnSubmit.disabled = false;
    btnSubmit.removeAttribute('aria-busy');
    btnSubmit.querySelector('.btn-text').textContent = 'Enviar solicitud';
  }
});
```

### 7.4 Botón con estado loading accesible

**HTML:**

```html
<button type="submit" class="btn btn-primary" id="btn-submit">
  <span class="btn-text">Enviar solicitud</span>
  <span class="btn-spinner" aria-hidden="true"></span>
</button>
```

**CSS:**

```css
.btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  min-height: 48px;
  padding: 14px 28px;

  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1;

  background-color: #008B8B;
  color: #FFFFFF;
  border: 2px solid #008B8B;
  border-radius: 6px;
  cursor: pointer;

  transition: background-color 0.15s, border-color 0.15s;
}

.btn:hover {
  background-color: #006666;
  border-color: #006666;
}

.btn:focus-visible {
  outline: 3px solid #008B8B;
  outline-offset: 3px;
}

.btn:disabled,
.btn[aria-busy="true"] {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-spinner {
  display: none;
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #FFFFFF;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.btn[aria-busy="true"] .btn-spinner {
  display: inline-block;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Respeta usuarios que prefieren menos movimiento */
@media (prefers-reduced-motion: reduce) {
  .btn-spinner {
    animation: none;
  }
  .btn[aria-busy="true"] .btn-spinner {
    border-top-color: rgba(255, 255, 255, 0.6);
  }
}
```

Notas clave del botón loading:
- `aria-busy="true"` lo expone al lector como "ocupado".
- `disabled` evita re-clicks. JS lo deshabilita mientras envía.
- El spinner es decorativo (`aria-hidden="true"`).
- El cambio del texto "Enviando..." es leído por el lector si tiene foco.
- `prefers-reduced-motion`: respetamos a usuarios con vestibular issues.

---

## Anexo: convenciones rápidas

| Acción | Atajo |
|---|---|
| Texto e imagen | usar `alt` real, no `alt=""` |
| Imagen decorativa | `alt=""` (vacío, no quitar) |
| Icono junto a texto visible | `aria-hidden="true"` en el icono |
| Botón solo icono | `aria-label="acción"` |
| Link a otra URL | `<a href>` |
| Acción en la página | `<button type="button">` |
| Submit | `<button type="submit">` |
| Heading saltado | NO. Mantener jerarquía. |
| `outline: none` sin reemplazo | NO. Siempre dar focus visible. |
| `user-scalable=no` | NO. Permitir zoom. |
| Touch target < 44px | NO. Mínimo 44×44. |

Cualquier excepción a esta guía debe documentarse en `desarrollo/DEUDA-TECNICA.md` con justificación, fecha y plazo de remediación.

---

**Fin de la guía. Próximo paso técnico:** integrar este checklist al pre-deploy de Firebase Hosting (script que corre Lighthouse CI antes de publicar).
