# PLAN DE DESARROLLO — RALLUSIGENCE WEB
# Actualizado: 2026-05-20 | Versión: 1.0
# Si retomas este trabajo en otro chat, lee este archivo PRIMERO.

---

## CONTEXTO RÁPIDO

**Qué es Rallusigence:** Agencia de Alfredo para construir sitios web con IA para PYMEs mexicanas.
Modelo anónimo, sin RFC, pago por retiro cajero sin tarjeta, entrega total al cliente.
Evolución de KIWINET (2017) → APTERYNET → Rallusigence.

**MVP:** Solo sitios web — 3 paquetes: Lanzamiento $6k/3d · Profesional $12k/7d · Avanzado $20k/12d

**Ruta del proyecto:** `E:\AlfreditosDrive\Proyectos\clientes\rallusigence\rallusigence\`

**Documentación de referencia (leer antes de tocar código):**
- `PROYECTO.md` — overview completo del proyecto
- `fase-2-identidad/copywriting-sitio.md` — TODO el copy del sitio (usar verbatim)
- `fase-2-identidad/brand-manual.md` — identidad visual
- `fase-3-ux/wireframes.md` — wireframes mobile-first de cada sección
- `fase-3-ux/sitemap.md` — arquitectura de páginas
- `fase-4-design-system/design-system.md` — specs CSS de TODOS los componentes
- `fase-5-tecnico/arquitectura-tecnica.md` — estructura de carpetas Next.js y decisiones técnicas
- `fase-6-marketing/seo-onpage.md` — meta tags y SEO
- `Rallusigence Design System/README.md` — Design System completo (colores, tipografía, animaciones)
- `Rallusigence Design System/colors_and_type.css` — CSS CANÓNICO (variables --rs-* y clases .rs-*)

---

## STACK

| Capa | Tecnología |
|---|---|
| Framework | Next.js 15 (App Router) |
| Lenguaje | TypeScript |
| Estilos | CSS canónico `--rs-*` + CSS Modules por componente |
| Íconos | lucide-react (npm, no CDN) |
| Blog | @next/mdx (stub vacío en MVP) |
| Forms | Formspree (endpoint placeholder XXXXXXXX) |
| Analytics | GA4 placeholder G-XXXXXXXXXX |
| Hosting | Firebase Hosting — output estático `out/` |

**Carpeta del proyecto Next.js:** `desarrollo/rallusigence-web/`

---

## DECISIONES TOMADAS (no revertir sin consultar a Alfredo)

1. `output: 'export'` en next.config.ts → genera `out/` para Firebase Hosting estático
2. `images: { unoptimized: true }` → necesario con export estático
3. `lucide-react` por npm, no CDN → bundle más limpio
4. Fuentes auto-hosteadas (TTF en `public/design-system/fonts/`) — NO Google Fonts
5. `@import url('/design-system/colors_and_type.css')` en globals.css como punto de entrada CSS
6. Blog: stub vacío en MVP — ruta `/blog` devuelve "próximamente"
7. Intro overlay de 5.5s: SÍ construirlo en MVP (Alfredo lo confirmó)
8. No Tailwind, no ESLint, no src/ directory en el scaffold
9. Firebase public dir: `out/` (Next.js static export)

---

## ESTADO DE FASES

| Fase | Descripción | Estado |
|---|---|---|
| 0 | Scaffold Next.js 15 | ✅ Completo |
| 1 | Design System → public/ | ✅ Completo |
| 2 | Layout (Header + Footer) | ✅ Completo |
| 3 | Componentes UI | ✅ Completo |
| 4 | Home page (7 secciones) | ✅ Completo |
| 5 | Páginas adicionales (/auditoria-gratis, /gracias, legal, 404, blog stub) | ✅ Completo |
| 6 | Animaciones + Intro overlay | ✅ Completo |
| 7 | Config (next.config, firebase, gitignore) | ✅ Completo |
| 8 | SEO técnico (robots.txt, sitemap.xml, OG image, favicon, GA4 base) | ✅ Completo |
| 9 | Analytics: Meta Pixel + GA4 custom events | ✅ Completo |
| 10 | Páginas: /paquetes, /como-funciona, /portafolio | ✅ Completo |
| 11 | Blog: infraestructura MDX + /blog/[slug] + artículo SEO | ✅ Completo |
| 12 | README.md del proyecto | ✅ Completo |

---

## FASE 9 — ANALYTICS COMPLETO

### Meta Pixel (Facebook/Instagram)
Archivo: `app/layout.tsx`

Agregar después del script de GA4 usando `next/script`:
```tsx
const META_PIXEL_ID = 'TU_PIXEL_ID' // Alfredo reemplaza con ID real

<Script id="meta-pixel" strategy="afterInteractive">
  {`
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window,document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${META_PIXEL_ID}');
    fbq('track', 'PageView');
  `}
</Script>
<noscript>
  <img height="1" width="1" style={{display:'none'}}
    src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
    alt=""
  />
</noscript>
```

### GA4 Custom Events + Meta Pixel Events — crear `lib/analytics.ts`

Este archivo exporta funciones que disparan GA4 + Meta Pixel simultáneamente:

```typescript
// Declaraciones globales para TypeScript
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    fbq: (...args: unknown[]) => void
  }
}

// form_submit → GA4 + Meta Lead
export function trackFormSubmit(formType: string) {
  if (typeof window === 'undefined') return
  window.gtag?.('event', 'form_submit', {
    form_type: formType,
    page_location: window.location.pathname,
    success: true,
    user_type: 'lead',
  })
  window.fbq?.('track', 'Lead', {
    content_category: 'auditoria_digital',
    content_name: 'formulario_auditoria_gratis',
    value: 1500,
    currency: 'MXN',
  })
}

// whatsapp_click → GA4 + Meta InitiateCheckout
export function trackWhatsAppClick(location: string) {
  if (typeof window === 'undefined') return
  window.gtag?.('event', 'whatsapp_click', {
    button_location: location,
    page_location: window.location.pathname,
    cta_text: 'WhatsApp',
  })
  window.fbq?.('track', 'InitiateCheckout', {
    content_category: 'contacto_directo',
    content_name: 'whatsapp_business',
    value: 800,
    currency: 'MXN',
  })
}

// cta_click → GA4
export function trackCtaClick(ctaType: string, position: string, text: string) {
  if (typeof window === 'undefined') return
  window.gtag?.('event', 'cta_click', {
    cta_type: ctaType,
    cta_position: position,
    cta_text: text,
  })
}

// service_view → GA4 + Meta ViewContent
export function trackServiceView() {
  if (typeof window === 'undefined') return
  window.gtag?.('event', 'service_view', {
    scroll_depth: Math.round((window.scrollY / document.body.scrollHeight) * 100),
  })
  window.fbq?.('track', 'ViewContent', {
    content_type: 'service',
    content_name: 'servicios_sitio_web',
    content_category: 'servicios_ia',
  })
}

// scroll_depth → GA4 (disparar a 25, 50, 75, 100%)
export function trackScrollDepth(percentage: number) {
  if (typeof window === 'undefined') return
  window.gtag?.('event', 'scroll_depth', {
    page_type: window.location.pathname === '/' ? 'home' : 'auditoria',
    scroll_percentage: percentage,
  })
}

// form_error → GA4
export function trackFormError(fieldName: string) {
  if (typeof window === 'undefined') return
  window.gtag?.('event', 'form_error', {
    form_type: 'auditoria',
    error_type: 'validation',
    field_error: fieldName,
  })
}
```

### Dónde usar cada función:

| Función | Componente | Cuándo |
|---|---|---|
| `trackFormSubmit` | `ContactSection.tsx`, `AuditoriaForm.tsx` | En el `if (response.ok)` del submit |
| `trackFormError` | `ContactSection.tsx`, `AuditoriaForm.tsx` | Cuando `validateForm()` falla |
| `trackWhatsAppClick` | `Header.tsx`, `Footer.tsx`, `ContactSection.tsx` | En `onClick` de todos los links wa.me |
| `trackCtaClick` | `HeroSection.tsx`, `PackagesSection.tsx` | En `onClick` de CTAs primarios |
| `trackServiceView` | `PackagesSection.tsx` | Cuando la sección entra al viewport (IntersectionObserver) |
| `trackScrollDepth` | `ScrollRevealProvider.tsx` o hook nuevo | A 25%, 50%, 75%, 100% de scroll |

---

## FASE 10 — PÁGINAS: /paquetes, /como-funciona, /portafolio

### `/paquetes` — `app/paquetes/page.tsx`
Metadata: title "Paquetes de sitio web — Rallusigence"
Contenido (del copywriting-sitio.md):
- H1: "Elige tu paquete. Precio fijo. Sin sorpresas."
- Los 3 paquetes en detalle con TODA la información del copywriting (los mismos ServiceCard que en home pero más expandidos)
- Sección FAQ debajo con las preguntas de copywriting-sitio.md sección 7
- CTA final: formulario o link a /#contacto
- Breadcrumb: Inicio > Paquetes

### `/como-funciona` — `app/como-funciona/page.tsx`
Metadata: title "Cómo funciona — Rallusigence"
Contenido (del copywriting-sitio.md secciones 4 y 6):
- H1: "De cero a tu sitio en línea. Sin reuniones, sin esperas."
- Los 4 pasos del proceso con más detalle que en home
- Sección "Modelo de pago" con copywriting EXACTO de sección 6:
  "Manejamos pagos por retiro sin tarjeta en cajero automático."
  Los 4 pasos del pago (banco → código → compartir → retirar)
  Bancos compatibles: BBVA, Banorte, HSBC, Santander, Banamex, Scotiabank
- CTA final: "¿Listo? Solicita tu auditoría gratis"

### `/portafolio` — `app/portafolio/page.tsx`
Metadata: title "Portafolio — Rallusigence"
Contenido (PLACEHOLDER — primeros clientes llenan esto):
- H1: "Trabajos realizados"
- Subtítulo: "Cada sitio entregado es tuyo para siempre."
- 2 casos placeholder con los personajes del copy:
  - Dr. Roberto (consultorio dental, León GTO) — mockup + resultado "40% más pacientes"
  - María Elena (restaurante familiar, Mérida) — mockup + resultado "60% más ventas"
- Nota honesta: "¿Quieres ver más? Estamos construyendo nuestro portafolio. Contáctanos y te mostramos ejemplos relevantes para tu industria."
- CTA: "Quiero mi sitio"

Todos usan los estilos globales del design system, Mobile-first, Server Components.

---

## FASE 11 — BLOG CON MDX

### Estructura a crear:
```
app/
  blog/
    page.tsx              ← REEMPLAZAR el stub actual por listado real
    [slug]/
      page.tsx            ← Artículo individual con generateStaticParams

content/
  blog/
    como-conseguir-clientes-internet.mdx   ← Primer artículo SEO real

lib/
  mdx.ts                  ← Helper para leer y parsear MDX
```

### `lib/mdx.ts`
Funciones:
- `getAllPosts()` → lee todos los .mdx de content/blog/, devuelve array de {slug, frontmatter}
- `getPostBySlug(slug)` → lee un .mdx, devuelve {frontmatter, content}

Frontmatter estándar de cada artículo:
```
---
title: "Cómo conseguir más clientes por internet sin gastar en publicidad"
description: "5 estrategias probadas para PYMEs mexicanas que quieren aparecer en Google"
date: "2026-05-21"
author: "Rallusigence"
keywords: ["clientes por internet", "SEO para negocios", "sitio web México"]
---
```

### `app/blog/page.tsx` — Listado de artículos
- Reemplazar el stub actual
- Lee todos los posts con `getAllPosts()`
- Cards con: título, descripción, fecha, link
- H1: "Blog — Sitios web e IA para tu negocio"

### `app/blog/[slug]/page.tsx`
- `generateStaticParams()` → genera rutas estáticas para cada .mdx
- Lee el post con `getPostBySlug(slug)`
- Renderiza MDX con `@next/mdx`
- Metadata dinámica desde el frontmatter
- Breadcrumb: Inicio > Blog > Título del artículo

### Primer artículo: `content/blog/como-conseguir-clientes-internet.mdx`
Keyword principal: "cómo conseguir clientes por internet" (alta intención, México)
Longitud: 800-1200 palabras
Estructura:
- Intro con el problema (dueños de negocio que no aparecen en Google)
- 5 estrategias concretas y accionables
- CTA al final: "¿Quieres aplicar esto en tu negocio? Te hacemos una auditoría gratis"
- Tono: español mexicano, tuteo, sin tecnicismos
- Usar las keywords del keyword-research.md de la Fase 6

---

## FASE 12 — README.md DEL PROYECTO

Archivo: `desarrollo/rallusigence-web/README.md`
Reemplazar el default de Next.js con documentación real:

```markdown
# Rallusigence — Sitio web oficial

Next.js 15 + TypeScript + CSS Modules + Firebase Hosting

## Stack
- Framework: Next.js 15 (App Router, output: export)
- Lenguaje: TypeScript
- Estilos: CSS canónico --rs-* + CSS Modules
- Iconos: lucide-react
- Formularios: Formspree
- Hosting: Firebase Hosting (carpeta out/)

## Comandos
npm run dev      → desarrollo local
npm run build    → build + export estático a out/
firebase deploy  → deploy a Firebase Hosting

## Variables a configurar antes del deploy
- GA4: app/layout.tsx → GA_ID = 'G-XXXXXXXXXX'
- Meta Pixel: app/layout.tsx → META_PIXEL_ID = 'TU_PIXEL_ID'
- Formspree: ContactSection.tsx y AuditoriaForm.tsx → endpoint XXXXXXXX
- WhatsApp: buscar 52XXXXXXXXXX en todo el proyecto y reemplazar

## Estructura
app/              → rutas y páginas (App Router)
components/       → componentes reutilizables
content/blog/     → artículos MDX
lib/              → helpers (mdx.ts, analytics.ts)
public/           → assets estáticos (design system, logos)

## Design System
CSS canónico: public/design-system/colors_and_type.css
Variables: prefijo --rs-*
Clases: prefijo .rs-*
Fuentes: auto-hosteadas en public/design-system/fonts/
```

---

## PENDIENTES DE ALFREDO (no bloquean build, sí bloquean launch)

| Item | Archivo | Reemplazar |
|---|---|---|
| GA4 ID real | `app/layout.tsx` | `G-XXXXXXXXXX` |
| Meta Pixel ID | `app/layout.tsx` | `TU_PIXEL_ID` |
| Formspree endpoint | `ContactSection.tsx` y `AuditoriaForm.tsx` | `XXXXXXXX` |
| WhatsApp número | Todo el proyecto (buscar `52XXXXXXXXXX`) | Tu número real |
| Cuenta Firebase | Terminal | `firebase login && firebase deploy` |
| Dominio | Firebase Console | Configurar DNS de `rallusigence.net` |

Actualizar este archivo marcando ✅ al completar cada fase.

---

## FASE 0 — SCAFFOLD

**Comando:**
```bash
cd "E:\AlfreditosDrive\Proyectos\clientes\rallusigence\rallusigence\desarrollo"
npx create-next-app@15 rallusigence-web --typescript --no-eslint --no-tailwind --no-src-dir --app --no-turbopack --import-alias "@/*"
```

**Resultado esperado:** carpeta `desarrollo/rallusigence-web/` con estructura App Router estándar.

**Paquetes adicionales a instalar:**
```bash
cd desarrollo/rallusigence-web
npm install lucide-react
npm install @next/mdx @mdx-js/loader @mdx-js/react
```

---

## FASE 1 — DESIGN SYSTEM

**Archivos a copiar:**

| Origen | Destino |
|---|---|
| `Rallusigence Design System/colors_and_type.css` | `public/design-system/colors_and_type.css` |
| `Rallusigence Design System/fonts/*.ttf` (11 archivos) | `public/design-system/fonts/` |
| `Rallusigence Design System/assets/*.svg` y `*.png` | `public/assets/` |
| `brief/icono.svg` | `public/assets/` |
| `brief/letras-icono-horizontal.svg` | `public/assets/` |
| `brief/letras-icono-vertical.svg` | `public/assets/` |
| `brief/letras.svg` | `public/assets/` |
| `brief/kiwi-icon.svg` | `public/assets/` |

**IMPORTANTE al copiar `colors_and_type.css`:**
Cambiar los `url('fonts/...')` a `url('/design-system/fonts/...')` (rutas absolutas)
para que funcionen correctamente desde `app/globals.css`.

**`app/globals.css` estructura:**
```css
@import url('/design-system/colors_and_type.css');

/* === RESET === */
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: var(--font-primary); ... }
/* ... (ver design-system.md → UTILIDADES GLOBALES) */

/* === COMPONENTES GLOBALES === */
/* Copiar todas las clases de design-system.md:
   .rs-btn, .rs-btn--primary, .rs-btn--ghost, .rs-btn--sm, .rs-btn--lg
   .btn-sticky, .btn-sticky--visible
   .input-field, .input-label, .input-error, .form-group, .form-card
   .service-card, .service-card--featured
   .testimonial-card
   .pain-item
   .step-item
   .differentiator-item
   .section-title, .section-wrapper
   .nav-header
   .footer
   .price-tag
   Utilidades: .sr-only, .text-center, .mb-*, .mt-*
*/
```

---

## FASE 2 — LAYOUT

### `app/layout.tsx`
- Metadata: title "Rallusigence — Tu sitio web en 3 días", description del copywriting
- JSON-LD `ProfessionalService` con datos de Rallusigence
- GA4 placeholder (comentado hasta tener ID real)
- Imports: globals.css, Header, Footer
- `<html lang="es-MX">`

### `components/layout/Header.tsx` + `Header.module.css`
Ver wireframes.md y design-system.md → `nav-header`
- Logo: `<Image src="/assets/letras-icono-horizontal.svg">` con alt="Rallusigence"
- Nav links (desktop): Inicio · Paquetes · Cómo funciona · Contacto
- CTA header: "Ver paquetes" → `.rs-btn .rs-btn--primary .rs-btn--sm`
- Hamburger (mobile): toggle con aria-expanded
- Menú mobile: overlay que cae desde arriba con links + CTA "Auditoría gratis"
- Comportamiento scroll: clase `nav-header--scrolled` + hide/show

### `components/layout/Footer.tsx` + `Footer.module.css`
Ver wireframes.md y design-system.md → `footer`
- 3 columnas desktop: brand (logo + tagline) · Servicios · Contacto
- Stack mobile
- Texto legal: "© 2026 Rallusigence. Operamos como grupo de profesionistas independientes."
- Links: Paquetes · Cómo funciona · Blog · Aviso de privacidad · Términos

---

## FASE 3 — COMPONENTES UI

Todos en `components/ui/`. Usar clases globales del design system + CSS Module solo para ajustes locales.

### `Button.tsx`
Props: `variant: 'primary' | 'ghost'`, `size: 'sm' | 'md' | 'lg'`, `full?: boolean`, `href?: string`, `onClick?`, `disabled?`, `loading?`
Renderiza `<a>` si tiene href, `<button>` si no.

### `ServiceCard.tsx`
Props: `icon: LucideIcon`, `title: string`, `description: string`, `price: string`, `delivery: string`, `features: string[]`, `featured?: boolean`, `cta: string`
Usa clases `.service-card` + `.service-card--featured`

### `TestimonialCard.tsx`
Props: `quote: string`, `author: string`, `business: string`, `location: string`
Usa `.testimonial-card`

### `FormField.tsx`
Props: `label: string`, `name: string`, `type: string`, `placeholder?: string`, `required?: boolean`, `error?: string`
Usa `.form-group`, `.input-label`, `.input-field`, `.input-error`
Nota: font-size mínimo 16px en mobile para evitar zoom en iOS Safari

---

## FASE 4 — HOME PAGE

**Archivo:** `app/page.tsx` — importa todas las secciones

**Secciones en `components/sections/`:**

### `HeroSection.tsx`
- H1: "Tu negocio en internet en 3 días."
- Subtítulo: "Sitio web profesional hecho con IA. Precio fijo. Tú eres el dueño desde el primer día. Sin mensualidades, sin letra chica."
- CTA primario: "Ver paquetes" → scroll a #paquetes
- CTA secundario: "Escríbenos por WhatsApp" → wa.me link
- Imagen: placeholder `<div>` teal 400×300 con ícono kiwi centrado (hasta que Alfredo genere hero image)
- Clase `reveal` para scroll animation

### `PainSection.tsx`
- Título: "Cada día sin sitio web es un cliente que se fue con la competencia"
- 3 dolores (ver copywriting-sitio.md sección 2):
  1. "Tu negocio no aparece en Google..."
  2. "Tienes un sitio de 2018 que no se ve bien en celular..."
  3. "Pediste cotizaciones a agencias y te dijeron 30 a 60 días..."
- Componente `.pain-item` con emoji (permitidos en esta sección)

### `PackagesSection.tsx`
- Título: "Elige tu paquete. Precio fijo. Sin sorpresas."
- 3 `ServiceCard` con los paquetes del copywriting-sitio.md:
  - Lanzamiento $6,000 MXN / 3 días / 7 features
  - Profesional $12,000 MXN / 7 días / 8 features (featured=true)
  - Avanzado $20,000 MXN / 12 días / 9 features
- Íconos Lucide: `Rocket` · `Briefcase` · `Zap`

### `ProcessSection.tsx`
- Título: "De cero a tu sitio en línea. Sin reuniones, sin esperas."
- 4 `.step-item` (ver copywriting-sitio.md sección 4):
  1. Escríbenos → menos de 2 horas
  2. Pagas el 50% → retiro sin tarjeta → arrancamos
  3. Construimos → 3-12 días
  4. Te entregamos todo → código + hosting + dominio

### `DiffSection.tsx`
- Título: "No somos una agencia tradicional. Y eso es una ventaja para ti."
- 3 `.differentiator-item` (ver copywriting-sitio.md sección 5):
  1. "3 días, no 30."
  2. "Sin cotizaciones que duran semanas."
  3. "Sin dependencias, sin mensualidades."

### `TestimonialsSection.tsx`
- Título: "Clientes reales"
- 1 `TestimonialCard` placeholder: "Tenía 3 años queriendo hacer mi sitio web..." — Restaurante familiar, Puebla

### `ContactSection.tsx`
- Título: "¿Listo para tener tu sitio esta semana?"
- `.form-card` con 4 campos: nombre*, tipo negocio*, WhatsApp*, email*
- Envío a Formspree (endpoint XXXXXXXX placeholder)
- Validación inline: nombre mínimo 2 chars, WhatsApp 10 dígitos MX, email regex, negocio requerido
- Estados: idle → loading → success/error
- En success: redirigir a `/gracias`
- Datos de contacto alternativo: WhatsApp + email (placeholder)
- Novalidate + validación manual en JS (mejor UX que nativa del browser)

---

## FASE 5 — PÁGINAS ADICIONALES

### `app/auditoria-gratis/page.tsx`
- Header simplificado (solo logo + WhatsApp, sin nav)
- Hero: "Auditoría digital GRATIS para tu negocio" — con 3 bullets de beneficios
- Formulario igual al de home (mismo ContactSection o copia)
- Prueba social: "600+ negocios mejorados" (placeholder)
- Footer mínimo (solo logo + legal)
- Sin sticky header behavior (es landing de ads)

### `app/gracias/page.tsx`
- Confirmación: "Solicitud recibida"
- Texto: "Te contactamos en menos de 24 horas"
- CTA WhatsApp prellenado: "Hola Rallusigence, acabo de solicitar mi auditoría..."
- GA4 conversion event (placeholder gtag)

### `app/aviso-de-privacidad/page.tsx`
- Texto legal placeholder sobre tratamiento de datos

### `app/terminos-y-condiciones/page.tsx`
- Texto legal placeholder

### `app/not-found.tsx`
- Título: "Página no encontrada"
- CTA a home

### `app/blog/page.tsx`
- Stub: "Blog próximamente" con nota de que el contenido llega pronto

---

## FASE 6 — ANIMACIONES + INTRO OVERLAY

### Scroll Reveal
**Hook `hooks/useScrollReveal.ts`** (client-side):
- `IntersectionObserver` con `threshold: 0.1` y `rootMargin: '0px 0px -50px 0px'`
- Agrega clase `.visible` a elementos con `.reveal`
- Unobserve después del primer trigger
- Soporta `.reveal--left`, `.reveal--right`, `.reveal--scale`
- Soporta `.reveal--delay-1`, `.reveal--delay-2`, `.reveal--delay-3` (cascade)

**CSS en globals.css:**
```css
.reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.4s var(--ease-out-cubic), transform 0.4s var(--ease-out-cubic); }
.reveal--left { transform: translateX(-24px); }
.reveal--right { transform: translateX(24px); }
.reveal--scale { transform: scale(0.96); }
.reveal.visible { opacity: 1; transform: none; }
.reveal--delay-1 { transition-delay: 0.1s; }
.reveal--delay-2 { transition-delay: 0.2s; }
.reveal--delay-3 { transition-delay: 0.3s; }
@media (prefers-reduced-motion: reduce) { .reveal { opacity: 1; transform: none; transition: none; } }
```

### Sticky Header
**`hooks/useStickyHeader.ts`**:
- Clase `nav-header--scrolled` cuando scrollY > 100 (blur + sombra)
- Hide cuando scroll-down > 200px, show en scroll-up
- `requestAnimationFrame` para no calcular 60×/seg

### Mobile Nav
**En `Header.tsx`** (cliente):
- Toggle `nav--open` con `aria-expanded`
- Bloquea scroll del body cuando está abierto (`overflow: hidden`)
- Cierra al hacer clic en cualquier link
- Animación: `max-height 0 → 400px` con cascade de links

### Sticky CTA Mobile
**`components/ui/StickyCTA.tsx`**:
- Fixed bottom, solo en < 1024px
- Aparece después de 300px scroll
- Clase `btn-sticky--visible`
- Texto: "Ver paquetes"

### Intro Overlay (Homepage only)
**`components/sections/IntroOverlay.tsx`** — 'use client'
- Se muestra UNA VEZ POR DÍA (localStorage `rallusigence_intro_shown` = toDateString())
- Duración total: 5.5s → auto-dismiss
- Fondo: `linear-gradient(135deg, #2C2C2C, #1E1E1E)` — z-index: 9999
- Secuencia (fade-in + slide-up con 0.8s cada una):
  1. 0.0s → "¿Tu negocio no aparece en Google?" — color: `#EB5B5B`
  2. 1.5s → "Lo construimos en 3 días con IA." — color: `#20B4B1`
  3. 3.0s → "Rallusigence." — color: `#FFFFFF`, font-size mayor
  4. 4.0s → CTA pulsante: "Ver paquetes →" — botón teal con `ease-bounce`
- Botón Skip bottom-right: "Saltar →" — aparece inmediatamente
- `prefers-reduced-motion: reduce` → no mostrar overlay (`display: none`)
- Al cerrar: fade-out 0.4s → `display: none`

---

## FASE 7 — CONFIGURACIÓN

### `next.config.ts`
```typescript
import type { NextConfig } from 'next'
const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // MDX habilitado para blog futuro
}
export default nextConfig
```

### `firebase.json`
```json
{
  "hosting": {
    "public": "out",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "cleanUrls": true,
    "trailingSlash": false,
    "headers": [
      { "source": "**/*.@(js|css|ttf|woff2|webp|svg|png)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] },
      { "source": "**/*.html", "headers": [{ "key": "Cache-Control", "value": "public, max-age=3600, must-revalidate" }] },
      { "source": "**", "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]}
    ]
  }
}
```

### `.firebaserc`
```json
{ "projects": { "default": "rallusigence-web" } }
```

### `.gitignore`
Estándar Next.js + `out/` + `.env.local`

---

## PENDIENTES POST-MVP (no bloquean build)

| Item | Acción | Quién |
|---|---|---|
| Formspree endpoint | Crear cuenta en formspree.io, reemplazar XXXXXXXX | Alfredo |
| GA4 Measurement ID | Crear propiedad, reemplazar G-XXXXXXXXXX | Alfredo |
| Imagen hero | Generar en Claude Design, guardar en public/assets/ | Alfredo |
| OG images (1200×630) | Generar antes del launch | Claude/Alfredo |
| Favicon .ico | Derivar de icono.svg (tiene hexágono teal) | Claude |
| WhatsApp número real | Reemplazar `52XXXXXXXXXX` en todos los wa.me links | Alfredo |

---

## COMANDOS ÚTILES

```bash
# Desarrollo local
cd desarrollo/rallusigence-web
npm run dev

# Build + preview estático
npm run build
npx serve out/

# Deploy a Firebase (cuando esté lista la cuenta)
firebase deploy --only hosting
```

---

## HISTORIAL DE ESTE PLAN

| Fecha | Cambio |
|---|---|
| 2026-05-20 | Plan inicial creado — sesión con Alfredo |
