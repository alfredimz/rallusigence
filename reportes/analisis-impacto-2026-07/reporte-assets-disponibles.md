# REPORTE DE ASSETS DISPONIBLES — RALLUSIGENCE
**Fecha de generación:** 20 julio 2026
**Elaborado por:** Inventario automatizado — Agencia IA Alfredo
**Directorio base:** `E:\AlfreditosDrive\Proyectos\clientes\rallusigence\rallusigence\`

---

## 1. ASSETS DEL DESIGN SYSTEM

### 1.1 Logos y marca (`Rallusigence Design System/assets/`)

| Archivo | Tipo | Descripción | Peso | Copiado a `/public` |
|---|---|---|---|---|
| `icono.svg` | SVG | Ícono del logo (kiwi) solo | 10.8 KB | Sí (`/public/assets/icono.svg`) |
| `icono.png` | PNG | Ícono del logo (kiwi) solo | 6.0 KB | Sí |
| `kiwi-icon.svg` | SVG | Mascota Kiwi — variante icono | 10.0 KB | Sí (`/public/assets/kiwi-icon.svg`) |
| `letras-icono-horizontal.svg` | SVG | Logo completo composición horizontal | 21.4 KB | Sí |
| `letras-icono-horizontal.png` | PNG | Logo completo composición horizontal | 3.9 KB | Sí |
| `letras-icono-vertical.svg` | SVG | Logo completo composición vertical | 21.4 KB | Sí |
| `letras-icono-vertical.png` | PNG | Logo completo composición vertical | 8.3 KB | Sí |
| `letras.svg` | SVG | Solo wordmark "Rallusigence" sin ícono | 11.0 KB | Sí |
| `letras.png` | PNG | Solo wordmark "Rallusigence" sin ícono | 2.3 KB | Sí |

> Nota: El `/public/assets/` del sitio es un espejo exacto del `Design System/assets/`. Ambas carpetas tienen los mismos 9 archivos.

---

## 2. VARIABLES CSS DISPONIBLES (`colors_and_type.css`)

El archivo canónico está en:
- **Fuente:** `Rallusigence Design System/colors_and_type.css`
- **Publicado:** `desarrollo/rallusigence-web/public/design-system/colors_and_type.css`
- **Importado en sitio:** `app/globals.css` línea 1

### 2.1 Colores de Marca (Primarios)

| Variable | Valor HEX | En uso en sitio |
|---|---|---|
| `--rs-primary` | `#20B4B1` | SÍ |
| `--rs-primary-dark` | `#198C76` | SÍ |
| `--rs-primary-alt` | `#029E81` | NO |
| `--rs-blue` | `#1078BC` | NO |
| `--rs-green-mid` | `#10AE8F` | SÍ |

### 2.2 Colores Secundarios

| Variable | Valor HEX | En uso |
|---|---|---|
| `--rs-blue-light` | `#1B8CCD` | NO |
| `--rs-blue-dark` | `#1E5F90` | NO |
| `--rs-blue-intense` | `#2B378C` | NO |
| `--rs-green-blue` | `#34A2A7` | NO |
| `--rs-blue-mid` | `#3D53A0` | NO |
| `--rs-gray-blue` | `#54949A` | NO |
| `--rs-gray-blue2` | `#58639B` | NO |
| `--rs-gray-warm` | `#594B4B` | NO |
| `--rs-sky` | `#5AC1D2` | SÍ (un gradiente en globals) |
| `--rs-teal-light` | `#6EC5CC` | NO |

### 2.3 Colores de Acento (15 variables — ninguna en uso)

| Variable | Valor HEX | | Variable | Valor HEX |
|---|---|---|---|---|
| `--rs-olive` | `#739341` | | `--rs-brick` | `#C14725` |
| `--rs-green-vibrant` | `#76B72A` | | `--rs-pink` | `#D8676E` |
| `--rs-lime` | `#9DC53C` | | `--rs-orange-strong` | `#DC4A21` |
| `--rs-red-soft` | `#B34E50` | | `--rs-gold` | `#DDAE29` |
| `--rs-orange-dark` | `#B57130` | | `--rs-red-vivid` | `#EB5B5B` |
| `--rs-mustard` | `#BA9A36` | | `--rs-orange-red` | `#EB5E39` |
| | | | `--rs-orange-bright` | `#F39323` |
| | | | `--rs-orange-light` | `#F5A153` |
| | | | `--rs-yellow` | `#FFD31B` |

### 2.4 Neutros

| Variable | Valor HEX | En uso |
|---|---|---|
| `--rs-white` | `#FFFFFF` | NO (se usa `#fff` literal) |
| `--rs-text` | `#2C2C2C` | NO (heredado por `--color-fg`) |
| `--rs-text-muted` | `#6B7280` | NO |
| `--rs-text-subtle` | `#9CA3AF` | SÍ |
| `--rs-border` | `#E5E5E5` | NO |
| `--rs-border-soft` | `#F3F4F6` | SÍ |
| `--rs-bg-soft` | `#F9FAFB` | SÍ |

### 2.5 Colores Semánticos

| Variable | Valor | En uso |
|---|---|---|
| `--rs-success` | `#10B981` | SÍ |
| `--rs-success-bg` | `#ECFDF5` | NO |
| `--rs-success-border` | `#A7F3D0` | NO |
| `--rs-error` | `#EF4444` | SÍ |
| `--rs-error-bg` | `#FEF2F2` | NO |
| `--rs-error-border` | `#FECACA` | NO |

### 2.6 Tokens de Tipografía, Espaciado y Movimiento

| Grupo | Variables | En uso en sitio |
|---|---|---|
| Familias tipográficas | `--font-primary`, `--font-elegant`, `--font-creative`, `--font-informal`, `--font-accent`, `--font-mono` | Solo `--font-primary` y `--font-mono`. Las otras 4 sin uso. |
| Pesos | `--weight-regular/medium/semibold/bold/extrabold` | Todos usados |
| Escala tipográfica | `--text-h1/h2/h3/h4/body/small/label/micro` | Todos usados |
| Espaciado (8px grid) | `--space-1/2/3/4/5` | Solo `--space-3` y `--space-4` |
| Sombras | `--shadow-light/card/hover/sticky/cta` | `card/cta/sticky`. `light/hover` sin uso. |
| Motion | `--duration-fast/normal/slow/intro`, `--ease-out-cubic/in-out-cubic/bounce` | `normal/slow/intro` y `out-cubic/bounce` usados |

**Ratio de adopción de colores: 23% (11 de 47 variables usadas)**

---

## 3. FUENTES DISPONIBLES

### Design System (local TTF)

| Familia | Variantes disponibles | Pesos |
|---|---|---|
| **Montserrat** | Regular, Medium, SemiBold, Bold, ExtraBold | 400, 500, 600, 700, 800 |
| **Playfair Display** | Regular, Bold | 400, 700 |
| **Pacifico** | Regular | 400 |
| **Patrick Hand** | Regular | 400 |
| **Amatic SC** | Regular, Bold | 400, 700 |

> Nota: El `brand-manual.md` menciona "Lobster" pero NO existe en los directorios de fuentes.

---

## 4. COMPONENTES PREVIEW DEL DESIGN SYSTEM

Ubicación: `Rallusigence Design System/preview/` — 38 archivos HTML

### Grupo: Brand (7)
`brand-icons.html`, `brand-kiwi-mascot.html` (el más pesado: 26.8 KB), `brand-logo-horizontal.html`, `brand-logo-vertical.html`, `brand-voice.html`, `_base.html`, `_interactions.js`

### Grupo: Colors (4)
`colors-primary.html`, `colors-secondary.html`, `colors-accent.html`, `colors-neutral-semantic.html`

### Grupo: Components (19)

| Archivo | Componente | Equivalente en sitio |
|---|---|---|
| `components-buttons.html` | Botones primary, ghost, sm, lg | `Button.tsx` ✓ |
| `components-button-fx.html` | Botones con efectos especiales (pulse, partículas) | NO |
| `components-cards.html` | Cards de servicios con hover | `ServiceCard.tsx` ✓ |
| `components-testimonial.html` | Tarjeta de testimonio | `TestimonialCard.tsx` ✓ |
| `components-pricing-card.html` | Card de precios con badge popular | `PackagesSection.tsx` (parcial) |
| `components-form.html` | Formulario completo con validación | `AuditoriaForm.tsx` ✓ |
| `components-intro-overlay.html` | Overlay de intro con animación | `IntroOverlay.tsx` ✓ |
| `components-accordion.html` | Acordeón expand/collapse (FAQ) | **NO** |
| `components-tabs.html` | Navegación por tabs | **NO** |
| `components-steps.html` | Proceso paso a paso con números | `ProcessSection.tsx` (parcial) |
| `components-counter.html` | Contador animado de estadísticas | **NO** |
| `components-48h-badge.html` | Badge "respuesta en 48h" | **NO** |
| `components-tags-diff.html` | Tags de diferenciadores | `DiffSection.tsx` (similar) |
| `components-toast.html` | Notificaciones toast | **NO** |
| `components-skeleton.html` | Skeleton loading states | **NO** |
| `components-scroll-reveal.html` | Animaciones scroll reveal | `ScrollRevealProvider.tsx` ✓ |
| `components-scroll-progress.html` | Barra de progreso de scroll | **NO** |
| `components-section-dividers.html` | Divisores decorativos entre secciones | **NO** |
| `components-whatsapp-preview.html` | Preview de conversación WhatsApp | **NO** |

### Grupo: Motion (1)
`motion-tokens.html`

### Grupo: Spacing (3)
`spacing-scale.html`, `spacing-radius.html`, `spacing-shadow.html`

### Grupo: Typography (4)
`type-headings.html`, `type-body.html`, `type-weights.html`, `type-display-accents.html`

### UI Kit Marketing Website (`ui_kits/marketing-website/`)
`index.html` (demo completa, 14.4 KB), `components.jsx` (13.3 KB), `README.md`

---

## 5. DOCUMENTOS DE RESEARCH

### Fase 1 — Research

| Documento | Resumen |
|---|---|
| `buyer-personas.md` | Dos personas: Dr. Roberto (clínica dental, León Gto, 42 años) y María Elena (restaurante, Mérida, 38 años). Presupuesto: $10k-$30k setup + $3k-$8k/mes. |
| `benchmark-competitivo.md` | Análisis de competidores en automatización para PYMEs mexicanas |
| `customer-journey-map.md` | Journey del cliente desde awareness hasta retención |
| `propuesta-de-valor.md` | Propuesta de valor diferenciadora |

### Fase 2 — Identidad

| Documento | Resumen |
|---|---|
| `brand-manual.md` | Manual completo: paleta teal #20B4B1 como primario, Montserrat principal + Playfair Display elegante, mascota kiwi geométrico flat, 3 composiciones de logo |
| `copywriting-sitio.md` | Copy final para todas las secciones |
| `voz-y-tono.md` | Guía de voz: directa, cercana, sin jerga técnica |

### Fase 3 — UX

| Documento | Resumen |
|---|---|
| `wireframes.md` | Wireframes ASCII mobile-first: Hero, Problema, Servicios, Cómo funciona, Por qué Rallusigence, Testimonios, Contacto. CTA sticky fijo. |
| `user-flows.md` | Flujos de usuario desde entrada hasta conversión |
| `sitemap.md` | Mapa del sitio completo con páginas y rutas |
| `inventario-contenido.md` | Inventario de contenido necesario por página |

### Fase 4 — Design System

| Documento | Tamaño | Resumen |
|---|---|---|
| `design-system.md` | mediano | Specs CSS de todos los componentes |
| `animaciones-componentes.md` | 49.7 KB (el más grande) | Especificación completa de animaciones, motion tokens, scroll reveal, hover |
| `guia-estilos-ui.md` | — | Estados de componentes, accesibilidad visual |

### Fase 5 — Técnico

| Documento | Tamaño | Resumen |
|---|---|---|
| `arquitectura-tecnica.md` | 32.6 KB | Arquitectura Next.js, Firebase, estructura de carpetas |
| `guia-accesibilidad.md` | 43.7 KB (el más grande del proyecto) | Guía completa WCAG |
| `documentacion-api.md` | — | Endpoints y APIs |

### Fase 6 — Marketing

`keyword-research.md`, `seo-onpage.md`, `tracking-plan.md`

---

## 6. COMPONENTES DEL SITIO ACTUAL

### Layout (2)
`Header.tsx` + `Header.module.css`, `Footer.tsx` + `Footer.module.css`

### Sections (8)
`HeroSection`, `PainSection`, `DiffSection`, `ProcessSection`, `PackagesSection`, `TestimonialsSection`, `ContactSection`, `IntroOverlay`

### UI (6 atómicos)
`Button`, `FormField`, `AuditoriaForm`, `ServiceCard`, `StickyCTA`, `TestimonialCard`

### Rutas App (`app/`)
`/`, `/auditoria-gratis`, `/como-funciona`, `/paquetes`, `/portafolio`, `/blog`, `/blog/[slug]`, `/gracias`, `/aviso-de-privacidad`, `/terminos-y-condiciones`, `/not-found`

---

## 7. ASSETS HISTÓRICOS KIWINET

Ruta: `E:\AlfreditosDrive\Proyectos\KIWINET\`
Archivos maestros en Adobe Illustrator (.ai): `DiseñosKiwinet.ai`, `DiseñosKiwinet2.ai`, `DiseñosKiwinet3.ai`
Proyecto After Effects: `kiwi.aep` (animación del kiwi)
Subcarpetas de diseño: KiwiBanner, KiwiCards, KiwiCátalogo, KiwiIcons, KiwiSites, KiwiRedes, KiwiVideo y más.

---

## 8. GAP ANALYSIS — Oportunidades inmediatas

### 8.1 Componentes del DS no implementados en el sitio (alta prioridad)

| Componente | Impacto | Prioridad |
|---|---|---|
| `components-accordion.html` | FAQ interactivo — reduce longitud, mejora UX | ALTA |
| `components-counter.html` | Contadores animados — credibilidad ("600+ negocios") | ALTA |
| `components-48h-badge.html` | Badge urgencia — confianza y conversión | ALTA |
| `components-toast.html` | Feedback al enviar formulario | ALTA |
| `components-whatsapp-preview.html` | Demo visual del bot | MEDIA |
| `components-tabs.html` | Útil en página de paquetes | MEDIA |
| `components-section-dividers.html` | Separación visual entre secciones | MEDIA |
| `components-scroll-progress.html` | Engagement en páginas largas | BAJA |

### 8.2 Tipografías disponibles sin ningún uso

| Familia | Variable CSS | Uso recomendado |
|---|---|---|
| **Playfair Display** | `--font-elegant` | Taglines premium, subtítulos elegantes |
| **Pacifico** | `--font-creative` | Frases llamativas, branding visual |
| **Patrick Hand** | `--font-informal` | Comunicación cercana, notas |
| **Amatic SC** | `--font-accent` | Acentos visuales, etiquetas creativas |

> Inconsistencia detectada: `globals.css` usa Playfair Display en `.rs-h2`, pero el DS canónico define `.rs-h2` en Montserrat.

### 8.3 Resumen de adopción del Design System

| Métrica | Valor |
|---|---|
| Variables de color definidas | 47 |
| Variables de color en uso | 11 (23%) |
| Clases semánticas `.rs-*` definidas | 10 |
| Clases semánticas en uso | 3 (`.rs-h1`, `.rs-h2`, `.rs-h3`) |
| Familias tipográficas disponibles | 5 |
| Familias tipográficas en uso | 1 (Montserrat) + Playfair en H2 |
| Componentes preview disponibles | 19 |
| Componentes implementados en sitio | 10 (~53%) |

**Conclusión:** El Design System tiene el doble de capacidad que lo actualmente utilizado. Hay una enorme reserva de recursos visuales listos para usar sin costo adicional de diseño.
