# Arquitectura Técnica — Rallusigence
**Proyecto:** Sitio web Rallusigence (rallusigence.net)
**Fase:** 5 — Técnico
**Stack:** HTML5 + CSS3 + JavaScript ES6 vanilla
**Hosting:** Firebase Hosting
**Fecha:** 2026-04-25

---

## Sección 1 — Estructura de carpetas

```
rallusigence-web/
├── index.html                  # Home single-page con anclas
├── auditoria-gratis.html       # Landing page para ads
├── 404.html                    # Página de error personalizada
├── robots.txt                  # Indexación SEO
├── sitemap.xml                 # Mapa del sitio para buscadores
├── favicon.ico                 # Favicon multi-formato
├── site.webmanifest            # PWA manifest (instalable mobile)
│
├── css/
│   ├── variables.css           # Custom properties (colores, spacing, fuentes)
│   ├── reset.css               # Reset CSS moderno (modern-normalize)
│   ├── base.css                # Tipografía, body, html, links base
│   ├── components.css          # 20 componentes (botones, cards, forms, etc.)
│   ├── layout.css              # Grid, contenedores, secciones, header/footer
│   └── utilities.css           # Helpers (.hidden, .text-center, .mt-*, etc.)
│
├── js/
│   ├── main.js                 # Sticky header, smooth scroll, scroll reveal
│   ├── form.js                 # Validación + envío Formspree
│   └── analytics.js            # GA4 events
│
├── img/
│   ├── logo/
│   │   ├── logo.svg            # Logo principal vectorial
│   │   ├── logo-white.svg      # Versión para fondos oscuros
│   │   ├── logo-icon.svg       # Isotipo para favicon/social
│   │   └── apple-touch-icon.png # 180x180 iOS
│   ├── icons/
│   │   └── (iconos custom si los hay; mayoría via Lucide CDN)
│   ├── og/
│   │   ├── og-home.jpg         # 1200x630 Open Graph home
│   │   ├── og-auditoria.jpg    # 1200x630 OG landing
│   │   └── twitter-card.jpg    # 1200x675 Twitter
│   ├── hero/
│   │   ├── hero-desktop.webp   # Imagen hero principal
│   │   ├── hero-mobile.webp    # Versión mobile optimizada
│   │   └── hero-poster.jpg     # Fallback para WebP
│   ├── servicios/
│   │   ├── servicio-01.webp
│   │   ├── servicio-02.webp
│   │   └── servicio-03.webp
│   └── testimonios/
│       ├── cliente-01.webp     # Avatares clientes (cuadradas 200x200)
│       └── cliente-02.webp
│
├── fonts/                      # (opcional) Si se autohostean fuentes
│   └── (vacío si solo se usa Google Fonts via CDN)
│
├── firebase.json               # Configuración Firebase Hosting
├── .firebaserc                 # ID del proyecto Firebase
├── .gitignore                  # node_modules, .env, .firebase/
└── README.md                   # Setup local + deploy
```

### Justificación de cada archivo

| Archivo / carpeta | Justificación |
|---|---|
| `index.html` | Home single-page; todas las secciones del marketing en una sola URL para mejor SEO y experiencia. |
| `auditoria-gratis.html` | Landing dedicada con foco único (formulario), sin distracciones del nav. Necesaria para ads. |
| `404.html` | Mejor UX y SEO; Firebase la sirve automáticamente. |
| `robots.txt` + `sitemap.xml` | Indispensables para indexación en Google. |
| `site.webmanifest` | Permite "agregar a inicio" desde mobile; mejora Core Web Vitals score. |
| `css/` separados en 6 archivos | Permite cargar `variables.css` y `base.css` críticos primero; mantiene cada archivo <300 líneas. |
| `js/` modular | Separar concerns: navegación (`main`), formularios (`form`), tracking (`analytics`). Facilita mantenimiento y permite cargar `analytics.js` con `defer` sin bloquear. |
| `img/og/` | Imágenes Open Graph para WhatsApp, Facebook, Twitter cuando se comparta el link. |
| `img/hero/` con WebP + JPG fallback | WebP para navegadores modernos; fallback JPG en `<picture>` para compatibilidad. |
| `firebase.json` | Define headers de seguridad, caché y rewrites. |
| `.firebaserc` | Vincula carpeta local con proyecto Firebase. |

---

## Sección 2 — HTML semántico: estructura base

### `index.html` — esqueleto completo

```html
<!DOCTYPE html>
<html lang="es-MX">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#0F172A">

  <!-- SEO Primary Meta Tags -->
  <title>Rallusigence — Automatizacion con IA para PyMEs en Mexico</title>
  <meta name="description" content="Implementamos agentes de IA y automatizaciones que ahorran 20+ horas semanales a PyMEs mexicanas. Agenda tu auditoria gratis.">
  <meta name="author" content="Rallusigence">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://rallusigence.net/">

  <!-- Open Graph / Facebook / WhatsApp -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://rallusigence.net/">
  <meta property="og:title" content="Rallusigence — Automatizacion con IA para PyMEs">
  <meta property="og:description" content="Agentes de IA que ahorran 20+ horas semanales a tu negocio. Auditoria gratis.">
  <meta property="og:image" content="https://rallusigence.net/img/og/og-home.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale" content="es_MX">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="https://rallusigence.net/">
  <meta name="twitter:title" content="Rallusigence — Automatizacion con IA para PyMEs">
  <meta name="twitter:description" content="Agentes de IA que ahorran 20+ horas semanales.">
  <meta name="twitter:image" content="https://rallusigence.net/img/og/twitter-card.jpg">

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/img/logo/logo-icon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="apple-touch-icon" href="/img/logo/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">

  <!-- Preconnect a Google Fonts (mejora LCP) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">

  <!-- Preload del logo (LCP candidate) -->
  <link rel="preload" as="image" href="/img/logo/logo.svg">

  <!-- CSS — orden importa: cascada de menor a mayor especificidad -->
  <link rel="stylesheet" href="/css/variables.css">
  <link rel="stylesheet" href="/css/reset.css">
  <link rel="stylesheet" href="/css/base.css">
  <link rel="stylesheet" href="/css/components.css">
  <link rel="stylesheet" href="/css/layout.css">
  <link rel="stylesheet" href="/css/utilities.css">

  <!-- Lucide Icons via CDN -->
  <script src="https://unpkg.com/lucide@latest" defer></script>

  <!-- Schema.org JSON-LD: LocalBusiness -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Rallusigence",
    "description": "Agencia de automatizacion con IA para PyMEs mexicanas",
    "url": "https://rallusigence.net",
    "telephone": "+52-XXX-XXX-XXXX",
    "email": "alfredimzero@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "MX",
      "addressLocality": "Mexico"
    },
    "priceRange": "$$",
    "areaServed": {
      "@type": "Country",
      "name": "Mexico"
    },
    "sameAs": [
      "https://www.linkedin.com/company/rallusigence",
      "https://www.instagram.com/rallusigence"
    ]
  }
  </script>

  <!-- Google Analytics 4 (cargado al final de head con async) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
</head>
<body>

  <!-- Skip to content (accesibilidad) -->
  <a href="#main-content" class="skip-link">Saltar al contenido</a>

  <!-- HEADER sticky -->
  <header class="header" id="site-header">
    <div class="container header__inner">
      <a href="/" class="header__logo" aria-label="Rallusigence inicio">
        <img src="/img/logo/logo.svg" alt="Rallusigence" width="160" height="40">
      </a>
      <nav class="nav" aria-label="Navegacion principal">
        <ul class="nav__list">
          <li><a href="#problema" class="nav__link">Problema</a></li>
          <li><a href="#servicios" class="nav__link">Servicios</a></li>
          <li><a href="#como-funciona" class="nav__link">Como funciona</a></li>
          <li><a href="#por-que-rallusigence" class="nav__link">Por que nosotros</a></li>
          <li><a href="#testimonios" class="nav__link">Testimonios</a></li>
        </ul>
      </nav>
      <a href="#contacto" class="btn btn--primary header__cta">Auditoria gratis</a>
      <button class="nav__toggle" aria-label="Abrir menu" aria-expanded="false">
        <i data-lucide="menu"></i>
      </button>
    </div>
  </header>

  <main id="main-content">

    <!-- HERO -->
    <section class="hero" id="hero" aria-labelledby="hero-title">
      <div class="container">
        <h1 id="hero-title">[Headline principal]</h1>
        <p class="hero__sub">[Subtitulo / value prop]</p>
        <div class="hero__ctas">
          <a href="#contacto" class="btn btn--primary btn--lg">[CTA primario]</a>
          <a href="#como-funciona" class="btn btn--ghost btn--lg">[CTA secundario]</a>
        </div>
      </div>
    </section>

    <!-- PROBLEMA -->
    <section class="section" id="problema" aria-labelledby="problema-title">
      <div class="container">
        <h2 id="problema-title">[Titulo del problema]</h2>
      </div>
    </section>

    <!-- SERVICIOS -->
    <section class="section section--alt" id="servicios" aria-labelledby="servicios-title">
      <div class="container">
        <h2 id="servicios-title">[Servicios]</h2>
      </div>
    </section>

    <!-- COMO FUNCIONA -->
    <section class="section" id="como-funciona" aria-labelledby="proceso-title">
      <div class="container">
        <h2 id="proceso-title">[Como funciona]</h2>
      </div>
    </section>

    <!-- POR QUE RALLUSIGENCE -->
    <section class="section section--alt" id="por-que-rallusigence" aria-labelledby="por-que-title">
      <div class="container">
        <h2 id="por-que-title">[Por que Rallusigence]</h2>
      </div>
    </section>

    <!-- TESTIMONIOS -->
    <section class="section" id="testimonios" aria-labelledby="testimonios-title">
      <div class="container">
        <h2 id="testimonios-title">[Testimonios]</h2>
      </div>
    </section>

    <!-- CONTACTO / FORMULARIO -->
    <section class="section section--cta" id="contacto" aria-labelledby="contacto-title">
      <div class="container">
        <h2 id="contacto-title">Agenda tu auditoria gratis</h2>
        <form class="form" id="form-auditoria" novalidate>
          <!-- campos -->
        </form>
      </div>
    </section>

  </main>

  <!-- BOTON STICKY WHATSAPP -->
  <a href="https://wa.me/52XXXXXXXXXX?text=Hola%20Rallusigence" class="float-cta" aria-label="Contactar por WhatsApp" id="whatsapp-float">
    <i data-lucide="message-circle"></i>
  </a>

  <!-- FOOTER -->
  <footer class="footer" role="contentinfo">
    <div class="container footer__inner">
      <p>&copy; 2026 Rallusigence. Todos los derechos reservados.</p>
      <ul class="footer__links">
        <li><a href="/aviso-privacidad.html">Aviso de privacidad</a></li>
      </ul>
    </div>
  </footer>

  <!-- JS al final del body con defer -->
  <script src="/js/analytics.js" defer></script>
  <script src="/js/main.js" defer></script>
  <script src="/js/form.js" defer></script>
</body>
</html>
```

### Notas semánticas clave

- `lang="es-MX"`: importante para SEO local y screen readers en español de Mexico.
- Un solo `<h1>` por pagina (en hero).
- Cada `<section>` lleva `aria-labelledby` apuntando al `id` de su `<h2>`.
- `<main id="main-content">` permite el skip-link de accesibilidad.
- `role="contentinfo"` redundante pero explicito en footer.
- `novalidate` en form porque la validacion es manual en JS (mejor UX que la nativa).

---

## Sección 3 — JavaScript: funcionalidades requeridas

### `js/main.js` — Navegacion e interacciones

#### Función 1: `initStickyHeader()`
- **Parametros:** ninguno
- **Que hace:** observa scroll. Cuando `scrollY > 80`, agrega clase `header--scrolled` (sombra + fondo solido). Si el usuario scrollea hacia abajo, oculta header (`transform: translateY(-100%)`); si scrollea hacia arriba, lo muestra.
- **Throttling:** usa `requestAnimationFrame` para evitar 60+ ejecuciones/segundo.

#### Función 2: `initStickyCTA()`
- **Parametros:** ninguno
- **Que hace:** muestra el boton flotante de WhatsApp despues de 600px de scroll. Agrega clase `float-cta--visible` con animacion de fade-in.

#### Función 3: `initSmoothScroll()`
- **Parametros:** ninguno
- **Que hace:** intercepta clics en `<a href="#...">`, hace `preventDefault()` y llama a `element.scrollIntoView({ behavior: 'smooth', block: 'start' })`. Compensa la altura del header sticky con `scroll-margin-top` (en CSS).

#### Función 4: `initScrollReveal()`
- **Parametros:** ninguno
- **Que hace:** usa `IntersectionObserver` para detectar cuando una `.section` entra al viewport. Agrega clase `is-visible` que dispara animaciones (fade-in, slide-up) definidas en `components.css`. Una sola vez por elemento (`unobserve`).

#### Función 5: `initMobileNav()`
- **Parametros:** ninguno
- **Que hace:** toggle del menu mobile. Maneja `aria-expanded`, bloquea scroll del body cuando esta abierto, cierra al hacer clic en un link.

#### Función 6: `initLucideIcons()`
- **Parametros:** ninguno
- **Que hace:** llama a `lucide.createIcons()` cuando el CDN termina de cargar. Reemplaza `<i data-lucide="...">` por SVGs.

```javascript
// js/main.js — esqueleto
document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initStickyCTA();
  initSmoothScroll();
  initScrollReveal();
  initMobileNav();
});

window.addEventListener('load', () => {
  if (window.lucide) lucide.createIcons();
});

function initStickyHeader() {
  const header = document.getElementById('site-header');
  let lastScroll = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const currentScroll = window.scrollY;
        header.classList.toggle('header--scrolled', currentScroll > 80);

        if (currentScroll > lastScroll && currentScroll > 200) {
          header.classList.add('header--hidden');
        } else {
          header.classList.remove('header--hidden');
        }
        lastScroll = currentScroll;
        ticking = false;
      });
      ticking = true;
    }
  });
}

function initStickyCTA() {
  const cta = document.getElementById('whatsapp-float');
  if (!cta) return;

  window.addEventListener('scroll', () => {
    cta.classList.toggle('float-cta--visible', window.scrollY > 600);
  }, { passive: true });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', targetId);
    });
  });
}

function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.section, .reveal').forEach(el => observer.observe(el));
}

function initMobileNav() {
  const toggle = document.querySelector('.nav__toggle');
  const nav = document.querySelector('.nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav--open');
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.classList.toggle('no-scroll', isOpen);
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav--open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('no-scroll');
    });
  });
}
```

### `js/form.js` — Formulario de auditoria

#### Función 1: `validateField(field)`
- **Parametros:** elemento `<input>` o `<textarea>`
- **Que hace:** valida segun el `name` del campo. Devuelve `{ valid: bool, error: string }`.
- **Reglas:**
  - `nombre`: minimo 2 caracteres, solo letras y espacios.
  - `whatsapp`: regex MX `^(\+52\s?)?(\d{2,3}[\s-]?)?\d{3,4}[\s-]?\d{4}$`. Normaliza a 10 digitos.
  - `email`: regex estandar HTML5.
  - `negocio`: minimo 2 caracteres.

#### Función 2: `validateForm(form)`
- **Parametros:** elemento `<form>`
- **Que hace:** itera todos los campos requeridos, llama a `validateField`, muestra/oculta mensajes de error en `<span class="form__error">`. Devuelve `true` si todo OK.

#### Función 3: `submitForm(form)`
- **Parametros:** elemento `<form>`
- **Que hace:** previene doble envio (flag `isSubmitting`). Hace `fetch` a Formspree con `Content-Type: application/json` y `Accept: application/json`. Maneja estados: loading, success, error.

#### Función 4: `setFormState(form, state)`
- **Parametros:** form, string (`'idle'|'loading'|'success'|'error'`)
- **Que hace:** agrega clase `form--<state>` al form. Cambia texto del boton submit, muestra mensajes contextuales.

```javascript
// js/form.js — implementacion completa
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/XXXXXXXX'; // reemplazar
let isSubmitting = false;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-auditoria');
  if (!form) return;

  form.addEventListener('submit', handleSubmit);
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => clearError(field));
  });
});

function validateField(field) {
  const value = field.value.trim();
  const name = field.name;
  let valid = true;
  let error = '';

  if (field.required && !value) {
    valid = false;
    error = 'Este campo es obligatorio';
  } else if (name === 'nombre' && value.length < 2) {
    valid = false;
    error = 'Ingresa un nombre valido';
  } else if (name === 'whatsapp') {
    const digits = value.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 13) {
      valid = false;
      error = 'WhatsApp debe tener 10 digitos (MX)';
    }
  } else if (name === 'email') {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(value)) {
      valid = false;
      error = 'Email no valido';
    }
  } else if (name === 'negocio' && value.length < 2) {
    valid = false;
    error = 'Indica tu tipo de negocio';
  }

  showFieldError(field, valid ? '' : error);
  return valid;
}

function showFieldError(field, message) {
  const errorEl = field.parentElement.querySelector('.form__error');
  if (errorEl) errorEl.textContent = message;
  field.classList.toggle('input--error', !!message);
  field.setAttribute('aria-invalid', !!message);
}

function clearError(field) {
  showFieldError(field, '');
}

function validateForm(form) {
  let allValid = true;
  form.querySelectorAll('input[required], textarea[required]').forEach(field => {
    if (!validateField(field)) allValid = false;
  });
  return allValid;
}

async function handleSubmit(e) {
  e.preventDefault();
  if (isSubmitting) return;

  const form = e.target;
  if (!validateForm(form)) {
    form.querySelector('.input--error')?.focus();
    return;
  }

  isSubmitting = true;
  setFormState(form, 'loading');

  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      setFormState(form, 'success');
      form.reset();
      if (window.gtag) {
        gtag('event', 'form_submit', {
          form_name: 'auditoria_gratis',
          tipo_negocio: payload.negocio
        });
      }
    } else {
      throw new Error('Server error');
    }
  } catch (err) {
    console.error('Form submit error:', err);
    setFormState(form, 'error');
  } finally {
    isSubmitting = false;
  }
}

function setFormState(form, state) {
  form.classList.remove('form--loading', 'form--success', 'form--error');
  form.classList.add(`form--${state}`);
  const submitBtn = form.querySelector('button[type="submit"]');
  if (!submitBtn) return;

  const labels = {
    idle: 'Solicitar auditoria gratis',
    loading: 'Enviando...',
    success: 'Recibido — te contactamos en 24h',
    error: 'Error — intenta de nuevo'
  };
  submitBtn.textContent = labels[state];
  submitBtn.disabled = state === 'loading';
}
```

### `js/analytics.js` — GA4

#### Función 1: `initGA4(measurementId)`
- **Parametros:** string (ID de medicion `G-XXXXXXXXXX`)
- **Que hace:** inicializa `dataLayer` y configura gtag con el ID.

#### Función 2: `trackCTAClicks()`
- **Parametros:** ninguno
- **Que hace:** delega clics en elementos `[data-track-cta]`. Envia evento `cta_click` con label.

#### Función 3: `trackWhatsAppClick()`
- **Parametros:** ninguno
- **Que hace:** detecta clics en links `wa.me`. Envia evento `whatsapp_click`.

#### Función 4: `trackServiceView()`
- **Parametros:** ninguno
- **Que hace:** IntersectionObserver sobre `#servicios`. Cuando entra al viewport (50%), dispara evento `service_view` una sola vez.

```javascript
// js/analytics.js
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
window.gtag = gtag;

gtag('js', new Date());
gtag('config', GA_MEASUREMENT_ID, {
  page_title: document.title,
  page_path: window.location.pathname
});

document.addEventListener('DOMContentLoaded', () => {
  trackCTAClicks();
  trackWhatsAppClick();
  trackServiceView();
});

function trackCTAClicks() {
  document.addEventListener('click', (e) => {
    const cta = e.target.closest('[data-track-cta]');
    if (!cta) return;
    gtag('event', 'cta_click', {
      cta_label: cta.dataset.trackCta,
      cta_location: cta.closest('section')?.id || 'unknown'
    });
  });
}

function trackWhatsAppClick() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href*="wa.me"]');
    if (!link) return;
    gtag('event', 'whatsapp_click', {
      link_location: link.id || 'inline'
    });
  });
}

function trackServiceView() {
  const section = document.getElementById('servicios');
  if (!section) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        gtag('event', 'service_view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  observer.observe(section);
}
```

---

## Sección 4 — Firebase Hosting: setup y deploy

### Pasos exactos

#### 1. Instalar Firebase CLI
```bash
npm install -g firebase-tools
firebase --version   # verificar (>=13.x)
```

#### 2. Login y crear proyecto en consola
```bash
firebase login
# crear proyecto en https://console.firebase.google.com → "rallusigence-web"
```

#### 3. Inicializar proyecto local
```bash
cd rallusigence-web
firebase init hosting
```

Responder al wizard:
- **Use an existing project:** `rallusigence-web`
- **Public directory:** `.` (raiz, ya que tenemos archivos estaticos sin build)
- **Single-page app:** `No` (es multi-pagina)
- **Set up automatic builds with GitHub:** `No` (manual por ahora)
- **404.html:** `No` (la creamos manual)

Esto genera `firebase.json` y `.firebaserc`.

#### 4. Configurar `firebase.json`

```json
{
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**",
      "**/.git/**",
      "**/README.md",
      "**/PROYECTO.md"
    ],
    "cleanUrls": true,
    "trailingSlash": false,
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "**/*.@(jpg|jpeg|gif|png|webp|svg|ico|woff2)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "**/*.html",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=3600, must-revalidate"
          }
        ]
      },
      {
        "source": "**",
        "headers": [
          {
            "key": "X-Content-Type-Options",
            "value": "nosniff"
          },
          {
            "key": "X-Frame-Options",
            "value": "SAMEORIGIN"
          },
          {
            "key": "Referrer-Policy",
            "value": "strict-origin-when-cross-origin"
          },
          {
            "key": "Permissions-Policy",
            "value": "geolocation=(), microphone=(), camera=()"
          },
          {
            "key": "Strict-Transport-Security",
            "value": "max-age=31536000; includeSubDomains; preload"
          },
          {
            "key": "Content-Security-Policy",
            "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://unpkg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://formspree.io https://www.google-analytics.com https://*.google-analytics.com; frame-ancestors 'self';"
          }
        ]
      }
    ],
    "redirects": [
      {
        "source": "/auditoria",
        "destination": "/auditoria-gratis.html",
        "type": 301
      }
    ],
    "rewrites": [
      {
        "source": "/sitemap.xml",
        "destination": "/sitemap.xml"
      }
    ]
  }
}
```

#### 5. Deploy

```bash
# Preview en canal temporal (URL de prueba con expiracion)
firebase hosting:channel:deploy preview --expires 7d

# Deploy a produccion
firebase deploy --only hosting
```

#### 6. Dominio personalizado (`rallusigence.net`)

1. Firebase Console → Hosting → "Agregar dominio personalizado".
2. Ingresar `rallusigence.net` y `www.rallusigence.net`.
3. Firebase entrega registros DNS:
   - **A records** (apex domain): dos IPs de Firebase.
   - **TXT record** (verificacion).
4. En el proveedor de dominio (GoDaddy, Cloudflare, etc.) agregar esos registros.
5. Esperar propagacion DNS (15 min a 24 hrs).
6. Firebase aprovisiona certificado SSL automaticamente (Let's Encrypt).
7. Verificar `https://rallusigence.net` redirige a HTTPS.

---

## Sección 5 — Performance: checklist de optimización

### Imagenes
- [ ] Todas las imagenes en formato **WebP** (con `<picture>` y fallback JPG).
- [ ] Imagenes hero: max **150 KB** (WebP calidad 80).
- [ ] Imagenes de seccion/contenido: max **80 KB**.
- [ ] Avatares testimonios: max **30 KB**.
- [ ] **Lazy loading** en todas excepto hero (`loading="lazy"`).
- [ ] Hero usa `fetchpriority="high"` para LCP.
- [ ] Atributos `width` y `height` siempre presentes (evita CLS).
- [ ] `srcset` para responsive (`hero-mobile.webp 480w, hero-desktop.webp 1200w`).

### CSS
- [ ] CSS minificado para produccion (cssnano o build manual).
- [ ] CSS critico inline en `<head>` (above-the-fold del hero) — opcional si LCP < 2.5s.
- [ ] Sin `@import` en CSS (rompe paralelismo).
- [ ] `font-display: swap` en Google Fonts (ya en URL).
- [ ] Custom properties solo en `:root` (no recalcular en cada elemento).

### JavaScript
- [ ] Todos los `<script>` con `defer` excepto GA4 (`async`).
- [ ] No hay JS bloqueante en `<head>`.
- [ ] Lucide cargado con `defer` y `lucide.createIcons()` en `load`.
- [ ] Event listeners con `{ passive: true }` en scroll/touch.
- [ ] `requestAnimationFrame` para handlers de scroll.

### Fonts
- [ ] `preconnect` a `fonts.googleapis.com` y `fonts.gstatic.com` (con crossorigin).
- [ ] Solo 2 familias maximo (Inter + Space Grotesk).
- [ ] Solo pesos necesarios (400, 500, 600, 700).
- [ ] `font-display: swap` para evitar FOIT.

### Caching (Firebase)
- [ ] Assets `.js`/`.css`/`.webp`/`.woff2`: cache 1 año + `immutable`.
- [ ] HTML: cache 1 hora + `must-revalidate`.

### Core Web Vitals targets
| Metrica | Target | Critico |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | < 4s |
| CLS (Cumulative Layout Shift) | < 0.1 | < 0.25 |
| INP (Interaction to Next Paint, reemplaza FID) | < 200ms | < 500ms |
| FCP (First Contentful Paint) | < 1.8s | < 3s |
| TTFB (Time to First Byte) | < 800ms | < 1.8s |

### Validaciones pre-deploy
- [ ] Lighthouse mobile: 90+ en Performance, Accessibility, Best Practices, SEO.
- [ ] PageSpeed Insights: green en todos los Core Web Vitals (mobile).
- [ ] WAVE accessibility: 0 errores.
- [ ] HTML W3C validator: 0 errores.
- [ ] Test en 320px / 768px / 1200px.
- [ ] Test en Chrome, Firefox, Safari, Edge.
- [ ] Test en Android Chrome y iOS Safari real (no solo emulador).
- [ ] Sin errores en consola del navegador.
- [ ] Formspree recibe submission de prueba.
- [ ] GA4 muestra `page_view` y `form_submit` en DebugView.
- [ ] Boton WhatsApp abre conversacion correcta.
- [ ] Sin credenciales hardcodeadas (revisar `git grep` antes de deploy).
