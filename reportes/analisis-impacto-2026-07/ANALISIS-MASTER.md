# ANÁLISIS MASTER — Rallusigence
## De "sitio funcional" a "sitio impresionante"
**Fecha:** 2026-07-20
**Agentes:** UI Experto · IXD/Animaciones · SEO Técnico · AEO/IA Search · Inventario de Assets

---

## Estado actual en una línea

> El sitio está bien construido técnicamente pero usa <25% de su Design System, tiene el hero en blanco plano cuando debería ser oscuro y luminoso, y tiene 7 bloqueadores críticos que impiden el deploy y el posicionamiento en buscadores.

---

## BLOQUEADORES DE DEPLOY (resolver ANTES de lanzar)

| # | Bloqueador | Archivo | Tiempo |
|---|-----------|---------|--------|
| 1 | Formspree ID placeholder `XXXXXXXX` | `ContactSection.tsx`, `AuditoriaForm.tsx` | 15 min |
| 2 | WhatsApp `52XXXXXXXXXX` en 4 lugares | `HeroSection.tsx`, `Header.tsx`, `Footer.tsx`, `/gracias` | 10 min |
| 3 | GA4 ID `G-XXXXXXXXXX` | `layout.tsx` | 5 min |
| 4 | Meta Pixel `TU_PIXEL_ID` | `layout.tsx` | 5 min |
| 5 | Crear cuenta Firebase + `firebase deploy` | — | 1-2 horas |
| 6 | Comprar dominio rallusigence.net | — | 30 min |
| 7 | Sitemap.xml y robots.txt ausentes | `public/` | 30 min |

---

## QUICK WINS — Cambios de alto impacto en <2 horas totales

### QW1: Gradiente de texto en H1 (20 min)
```css
/* HeroSection.module.css */
.highlight {
  background: linear-gradient(135deg, var(--rs-primary) 0%, var(--rs-sky) 60%, var(--rs-blue-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```
En JSX: `en <span className={styles.highlight}>3 días.</span>`

### QW2: Botones con glow y radio pill (25 min)
```css
/* globals.css */
.rs-btn { border-radius: var(--radius-pill); }
.rs-btn--primary:hover {
  box-shadow: 0 4px 16px rgba(32,180,177,0.50), 0 8px 48px rgba(32,180,177,0.30);
}
```

### QW3: Variables dark y glow (nuevas tokens) (30 min)
```css
/* globals.css — bloque :root */
--rs-dark-bg: #080C14;
--rs-dark-text: #E8EDF5;
--rs-dark-muted: rgba(232, 237, 245, 0.55);
--rs-glow-sm: 0 0 12px rgba(32, 180, 177, 0.35);
--rs-glow-md: 0 0 32px rgba(32, 180, 177, 0.40), 0 0 80px rgba(32, 180, 177, 0.15);
--rs-glow-lg: 0 0 60px rgba(32, 180, 177, 0.50), 0 0 120px rgba(32, 180, 177, 0.20);
```

### QW4: Fix `transition: all` en botones (10 min)
```css
/* globals.css — reemplazar en .rs-btn--primary */
transition: background-color var(--duration-fast) var(--ease-out-cubic),
            transform var(--duration-fast) var(--ease-out-cubic),
            box-shadow var(--duration-fast) var(--ease-out-cubic);
```

### QW5: Orbe hero animado (2 horas)
Ver `reporte-ixd-animaciones.md` → Sección 2. Reemplaza el `::before/::after` estático del hero con orbes 3D que flotan.

### QW6: Kiwi flotando (2 horas)
Ver `reporte-ixd-animaciones.md` → Sección 4. Anima la mascota con float + entry + shadow sincronizada.

---

## HALLAZGOS POR ÁREA

### UI — Diseño Visual
**Reporte completo:** `reporte-ui-experto.md`

| Hallazgo | Prioridad | Esfuerzo |
|----------|-----------|---------|
| Hero en fondo oscuro (#080C14) con orbe 3D | Alta | 3h |
| Tipografía editorial — Playfair Display en H1 (actualmente ausente) | Alta | 2h |
| Variables dark + glow (prerequisito de todo) | Alta | 1h |
| Cards glassmorphism dark para PackagesSection | Alta | 2.5h |
| Whitespace variable — secciones con ritmo diferente | Media | 1.5h |
| Uso sofisticado del kiwi (orbe hero + eyebrow + footer) | Media | 2h |
| Eyebrow labels como chips luminosos | Media | 2h |
| ProcessSection timeline horizontal con orbes | Media | 3h |
| ContactSection dark con glass form | Media | 4h |
| OrbitalRings componente reutilizable | Media | 2h |

**Quick wins visuales (30 min c/u):** gradiente texto H1, glow CTA, botones pill.

**Tiempo total:** ~23.5 horas para transformación completa.

---

### IXD — Animaciones e Interacción
**Reporte completo:** `reporte-ixd-animaciones.md`

| Hallazgo | Prioridad | WOW | Esfuerzo |
|----------|-----------|-----|---------|
| Orbes 3D animados (float + pulse) | Alta | 9/10 | 2h |
| Kiwi float + entry + shadow | Alta | 9/10 | 2h |
| Hero entrance orquestada (3 actos) | Alta | 8/10 | 1.5h |
| Fix `transition: all` en botones | Alta | correctivo | 0.5h |
| Button micro-interactions mejorados | Alta | 7/10 | 1h |
| Stagger delay-4/5/6 (falta en ProcessSection) | Alta | 5/10 | 0.25h |
| ProcessSection conector de timeline | Media | 8/10 | 2h |
| DiffSection checkmarks animados | Media | 6/10 | 0.5h |
| IntroOverlay clip-path reveal | Media | 7/10 | 1.5h |
| Scroll-driven animations (CSS nativo) | Media | 7/10 | 3h |

**Nota clave:** No se necesita Framer Motion para Sprint 1-3. CSS nativo es suficiente.

---

### SEO Técnico
**Reporte completo:** `reporte-seo-tecnico.md`

| Hallazgo | Prioridad | Esfuerzo |
|----------|-----------|---------|
| Crear sitemap.xml y robots.txt (ausentes) | Alta | 30 min |
| OG Image faltante (sin preview en WhatsApp/redes) | Alta | 1h |
| Metadata en 4 páginas sin metadata propia | Alta | 1h |
| H1 del home sin keywords de búsqueda | Alta | 15 min |
| JSON-LD enriquecido (solo 6 campos actuales) | Alta | 2h |
| "sitio web barato" en meta keywords (daña E-E-A-T) | Alta | 5 min |
| Twitter Card configuración | Media | 20 min |
| Google Business Profile | Media | 1h |
| Testimonios con identidad verificable | Media | diseño |
| CTAs internos apuntan a `/#contacto` no a `/auditoria-gratis` | Media | 30 min |
| Artículos de blog (estructura lista, cero contenido) | Media | 3h/artículo |

**Oportunidad única detectada:** Keywords "sitio web precio fijo México", "página web en 3 días" y "diseño web sin mensualidades" tienen alta intención de compra y **competencia casi nula**.

**20 keywords prioritarias** documentadas en el reporte con volumen y dificultad.

---

### AEO — Búsqueda por IA (Perplexity, ChatGPT, Gemini)
**Reporte completo:** `reporte-aeo-ia-search.md`

| Hallazgo | Prioridad | Esfuerzo |
|----------|-----------|---------|
| FAQPage schema (sin él, 3.2x menos prob. en AI Overviews) | Alta | 1h |
| JSON-LD @graph completo (listo en el reporte) | Alta | 1h |
| Verificar que Next.js exporta HTML estático (sin CSR puro) | Alta | 30 min |
| 15 FAQs con respuestas de 100-150 palabras | Alta | 2h |
| Person schema para el fundador | Alta | 30 min |
| HowTo schema del proceso de 4 pasos | Alta | 30 min |
| Plan de 12 artículos de blog con formato AEO-first | Media | plan listo |
| E-E-A-T: testimonios con nombre real + foto | Media | diseño |

**Bloqueador #0 de AEO:** Si el sitio usa Client-Side Rendering, Perplexity y ChatGPT via Bing no pueden leer el contenido. Verificar que el build produce HTML estático (debería ser correcto con Next.js export).

**Roadmap AEO 90 días** documentado en el reporte con hitos semanales.

---

### Assets — Inventario
**Reporte completo:** `reporte-assets-disponibles.md`

**Datos clave:**
- **47 variables de color** definidas → solo **11 en uso (23%)**
- **5 familias tipográficas** disponibles → solo **1 en uso** (Montserrat)
- **19 componentes preview** en Design System → **9 sin implementar** en el sitio
- Todos los logos (SVG + PNG) ya están en `/public/assets/` — listos para usar
- `animaciones-componentes.md` (49.7 KB) es la especificación de animaciones más completa del proyecto — no se ha leído ni implementado

**Componentes preview no implementados de alto impacto:**

| Componente | Impacto |
|-----------|---------|
| `components-accordion.html` | FAQ interactivo — reduce longitud, mejora UX |
| `components-counter.html` | Contadores animados — credibilidad ("600+ negocios") |
| `components-48h-badge.html` | Badge de urgencia/confianza |
| `components-toast.html` | Feedback al enviar formulario |
| `components-whatsapp-preview.html` | Demo visual del bot |

---

## PLAN DE SPRINTS RECOMENDADO

### Sprint 0 — Deploy (1 día)
Resolver los 7 bloqueadores de deploy. Sin esto, nada lo demás importa.

### Sprint 1 — Quick Wins (1 día)
QW1-QW6 de arriba. Transformación visible sin riesgos.

### Sprint 2 — Hero + Animaciones (2-3 días)
- Hero oscuro con orbe 3D y anillos SVG
- Kiwi flotando con sombra
- Hero entrance animation orquestada
- Variables dark + glow tokens

### Sprint 3 — SEO Base (1 día)
- Sitemap.xml + robots.txt
- Metadata en todas las páginas
- JSON-LD @graph completo (copiar del reporte AEO)
- OG Image + Twitter Card

### Sprint 4 — Dark Sections (2-3 días)
- PackagesSection glassmorphism dark
- ContactSection dark con glass form
- Eyebrow chips en secciones clave
- ProcessSection timeline horizontal

### Sprint 5 — AEO + Blog (ongoing)
- FAQPage schema
- Primer artículo de blog AEO-first
- Testimonios con identidad real
- Google Business Profile

---

## MÉTRICAS DE ADOPCIÓN DEL DESIGN SYSTEM

| Métrica | Actual | Objetivo post-sprint |
|---------|--------|---------------------|
| Variables de color en uso | 23% (11/47) | 50%+ |
| Familias tipográficas | 1/5 | 3/5 |
| Componentes DS implementados | ~53% | 75%+ |
| Tokens de animación usados | 40% | 80%+ |

---

## REFERENCIAS

| Reporte | Tamaño | Contenido |
|---------|--------|-----------|
| `reporte-ui-experto.md` | 19 KB | 10 hallazgos UI, CSS snippets, visión completa |
| `reporte-ixd-animaciones.md` | 17 KB | 12 oportunidades de animación, CSS completo por hallazgo |
| `reporte-seo-tecnico.md` | 25 KB | Auditoría SEO completa, 20 keywords, código de sitemap |
| `reporte-aeo-ia-search.md` | 38 KB | JSON-LD @graph listo, 15 FAQs, roadmap 90 días |
| `reporte-assets-disponibles.md` | 12 KB | Inventario completo del Design System |
