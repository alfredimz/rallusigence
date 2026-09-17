# Reporte IXD: Oportunidades de Animación e Interacción
## Rallusigence — Análisis de impacto visual julio 2026
**Referencia visual:** perplexity.ai/comet (orbs 3D, scroll fluido, entrada cinematográfica)
**Stack confirmado:** Next.js 15, React 19, CSS Modules, IntersectionObserver nativo
**Dependencias de animación instaladas:** ninguna (sin Framer Motion, sin GSAP)

---

## 1. Inventario de animaciones actuales

**Estado actual:**
El sistema de animaciones es funcional pero mínimo. La base entera descansa en la clase `.reveal` activada por un `IntersectionObserver` en `ScrollRevealProvider.tsx`. Existen tokens de motion correctos (`--ease-out-cubic`, `--ease-bounce`, `--duration-fast/normal/slow`) pero rara vez se usan fuera de botones y el sticky CTA.

| Elemento | Animación actual | Nota |
|----------|-----------------|------|
| Todas las secciones | `opacity: 0→1` + `translateY(24px→0)` via `.reveal` | Solo 3 niveles de delay (0.1s/0.2s/0.3s) |
| Botón primario hover | `translateY(-1px)` + shadow | Bien implementado |
| Service card hover | `translateY(-4px)` + border glow | Funcional |
| Sticky CTA | Entrada con `--ease-bounce` | Único uso real del bounce |
| IntroOverlay | Secuencia 3 líneas con timers JS | Solo aparece una vez/día |
| Hero background | Gradiente estático + 2 pseudo-orbs estáticos | Sin animación |
| Kiwi SVG (hero) | Completamente estático | Oportunidad enorme |
| ProcessSection steps | Números estáticos con `.reveal` básico | Sin conector animado |

**Problema crítico de performance detectado:** `transition: all 0.2s ease-in-out` en `.rs-btn` e `.input-field` activa transiciones en TODAS las propiedades CSS incluyendo las que fuerzan layout.

---

## 2. Orbes 3D CSS — Efecto tipo Comet

**Estado actual:** Dos pseudo-elementos estáticos en `HeroSection.module.css`. Son `radial-gradient` de baja opacidad (0.09 y 0.05), completamente inmóviles.

**Oportunidad:** Transformar los orbes en esferas pseudo-3D animadas con brillo interno rotatorio que simula luz incidente, usando capas de `radial-gradient` con posiciones offset.

**Implementación (reemplaza `::before` y `::after` actuales en `HeroSection.module.css`):**

```css
.hero::before {
  content: '';
  position: absolute;
  top: -120px;
  right: -120px;
  width: 560px;
  height: 560px;
  border-radius: 50%;
  background:
    radial-gradient(circle at 35% 30%, rgba(255,255,255,0.35) 0%, transparent 30%),
    radial-gradient(circle at 50% 50%, rgba(32,180,177,0.22) 0%, rgba(32,180,177,0.12) 45%, transparent 70%),
    radial-gradient(circle at 60% 65%, rgba(90,193,210,0.15) 0%, transparent 40%);
  pointer-events: none;
  z-index: 0;
  will-change: transform, opacity;
  animation: orbFloat 8s ease-in-out infinite, orbPulse 12s ease-in-out infinite;
}

.hero::after {
  content: '';
  position: absolute;
  bottom: -80px;
  left: -60px;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background:
    radial-gradient(circle at 40% 35%, rgba(255,255,255,0.20) 0%, transparent 25%),
    radial-gradient(circle at 50% 50%, rgba(32,180,177,0.14) 0%, rgba(25,140,118,0.08) 50%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  will-change: transform, opacity;
  animation: orbFloat 11s ease-in-out infinite reverse, orbPulse 15s ease-in-out infinite;
  animation-delay: -3s, -5s;
}

@keyframes orbFloat {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  33%       { transform: translateY(-18px) translateX(8px); }
  66%       { transform: translateY(10px) translateX(-6px); }
}

@keyframes orbPulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.65; }
}

/* Blur solo en dispositivos con mouse (no penalizar móvil) */
@media (pointer: fine) {
  .hero::before { filter: blur(2px); }
  .hero::after  { filter: blur(4px); }
}

@media (prefers-reduced-motion: reduce) {
  .hero::before, .hero::after { animation: none; }
}
```

**Prioridad:** Alta | **Esfuerzo:** 2 horas | **Impacto WOW:** 9/10

---

## 3. Hero Entrance Animation — Entrada cinematográfica

**Estado actual:** El hero usa la misma clase `.reveal` que todos los demás elementos. No hay coordinación orquestada. La entrada es idéntica a un pain item o un step.

**Oportunidad:** Secuencia en 3 actos que se ejecuta al cargar (no al scrollear): orb aparece → texto entra con desenfoque → CTAs entran con bounce.

**Implementación (agregar a `HeroSection.module.css`, remover clases `reveal` del JSX del hero):**

```css
@keyframes heroWordReveal {
  from {
    opacity: 0;
    transform: translateY(32px) skewY(3deg);
    filter: blur(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0) skewY(0deg);
    filter: blur(0px);
  }
}

@keyframes heroCTAEntry {
  0%   { opacity: 0; transform: translateY(16px) scale(0.96); }
  60%  { opacity: 1; transform: translateY(-3px) scale(1.01); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

/* Aplicar directamente en lugar de .reveal */
.h1 {
  animation: heroWordReveal 0.7s var(--ease-out-cubic) 0.1s both;
}

.subtitle {
  animation: heroWordReveal 0.7s var(--ease-out-cubic) 0.35s both;
}

.ctas {
  animation: heroCTAEntry 0.6s var(--ease-bounce) 0.6s both;
}

@media (prefers-reduced-motion: reduce) {
  .h1, .subtitle, .ctas {
    animation: none;
    opacity: 1;
  }
}
```

**Nota crítica:** Quitar `reveal` y `reveal--delay-*` del JSX de `h1`, `subtitle` y `ctas` en `HeroSection.tsx` para evitar que el `ScrollRevealProvider` interfiera.

**Prioridad:** Alta | **Esfuerzo:** 1.5 horas | **Impacto WOW:** 8/10

---

## 4. Kiwi Mascota en Movimiento

**Estado actual:** `<Image src="/assets/kiwi-icon.svg" width={120} height={120}>` estático dentro del `imagePlaceholder`. La mascota más distintiva de la marca no hace nada.

**Implementación Nivel 1 — Float + sombra (CSS puro, máximo impacto):**

```css
/* HeroSection.module.css */

@keyframes kiwiEntry {
  from { opacity: 0; transform: scale(0.7) rotate(-10deg); }
  to   { opacity: 1; transform: scale(1) rotate(-2deg); }
}

@keyframes kiwiFloat {
  0%, 100% { transform: translateY(0px) rotate(-2deg); }
  50%       { transform: translateY(-14px) rotate(2deg); }
}

@keyframes kiwiShadow {
  0%, 100% { transform: scaleX(1); opacity: 0.5; }
  50%       { transform: scaleX(0.65); opacity: 0.15; }
}

.kiwiWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: kiwiEntry 0.8s var(--ease-out-cubic) 0.4s forwards,
             kiwiFloat 4s ease-in-out 1.3s infinite;
  opacity: 0;
}

.kiwiShadow {
  width: 70px;
  height: 14px;
  background: radial-gradient(ellipse, rgba(32,180,177,0.35) 0%, transparent 70%);
  border-radius: 50%;
  margin-top: -6px;
  animation: kiwiShadow 4s ease-in-out infinite;
  animation-delay: 1.3s;
}
```

**Implementación Nivel 2 — Wiggle al hover:**

```css
@keyframes kiwiWiggle {
  0%  { transform: rotate(0deg) scale(1); }
  25% { transform: rotate(-8deg) scale(1.08); }
  50% { transform: rotate(8deg) scale(1.08); }
  75% { transform: rotate(-4deg) scale(1.02); }
  100%{ transform: rotate(0deg) scale(1); }
}

.kiwiWrapper:hover img {
  animation: kiwiWiggle 0.5s var(--ease-bounce);
}

.kiwiWrapper:hover {
  animation-play-state: paused; /* pausa el float en hover */
}
```

**Prioridad:** Alta | **Esfuerzo:** 2 horas | **Impacto WOW:** 9/10

---

## 5. Scroll-Driven Animations — CSS nativa sin JS

**Compatibilidad:** Chrome 115+, Firefox 110+ (con flag), Safari 18+. Envolver con `@supports`.

**Oportunidad A — Reading progress bar:**

```css
/* globals.css */
@supports (animation-timeline: scroll()) {
  .reading-progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, var(--rs-primary), var(--rs-sky));
    transform-origin: left;
    transform: scaleX(0);
    z-index: calc(var(--z-header) + 1);
    animation: readingProgress linear;
    animation-timeline: scroll(root block);
    animation-fill-mode: both;
  }
  @keyframes readingProgress {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
}
```

**Oportunidad B — Parallax background del hero:**

```css
/* HeroSection.module.css */
@supports (animation-timeline: scroll()) {
  .hero {
    animation: heroParallaxBg linear;
    animation-timeline: scroll(root block);
    animation-range: 0% 40%;
  }
  @keyframes heroParallaxBg {
    to { background-position-y: 60px; }
  }
}
```

**Oportunidad C — Conector de ProcessSection guiado por scroll:**

```css
/* ProcessSection.module.css */
@supports (animation-timeline: scroll()) {
  .stepConnector {
    position: absolute;
    left: 19px;
    top: 44px;
    bottom: 44px;
    width: 2px;
    background: linear-gradient(to bottom, var(--rs-primary), var(--rs-sky));
    transform-origin: top;
    transform: scaleY(0);
    animation: connectorGrow linear;
    animation-timeline: view(block);
    animation-range: entry 10% exit 70%;
  }
  @keyframes connectorGrow {
    from { transform: scaleY(0); opacity: 0.3; }
    to   { transform: scaleY(1); opacity: 1; }
  }
}
```

**Prioridad:** Media | **Esfuerzo:** 3 horas | **Impacto WOW:** 7/10

---

## 6. Stagger Animations

**Estado actual:** Solo existen `--delay-1`, `--delay-2`, `--delay-3`. `ProcessSection` tiene 4 pasos — el cuarto no tiene delay CSS definido y hereda 0s.

**Fix inmediato (globals.css, sección SCROLL REVEAL):**

```css
.reveal--delay-4 { transition-delay: 0.4s; }
.reveal--delay-5 { transition-delay: 0.5s; }
.reveal--delay-6 { transition-delay: 0.6s; }
```

**Sistema de stagger automático con CSS variables:**

```css
.stagger-list > * {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity var(--duration-slow) var(--ease-out-cubic),
    transform var(--duration-slow) var(--ease-out-cubic);
  transition-delay: calc(var(--stagger-index, 0) * 0.12s);
}

.stagger-list.visible > * {
  opacity: 1;
  transform: none;
}
```

```tsx
// En JSX — ejemplo para PainSection:
{pains.map((pain, i) => (
  <div key={i} style={{ '--stagger-index': i } as React.CSSProperties}>
    ...
  </div>
))}
```

**Stagger de packages con scale + blur:**

```css
/* PackagesSection.module.css */
@keyframes cardEnter {
  from {
    opacity: 0;
    transform: translateY(32px) scale(0.95);
    filter: blur(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

.card--animated:nth-child(1) { animation: cardEnter 0.6s var(--ease-out-cubic) 0.0s both; }
.card--animated:nth-child(2) { animation: cardEnter 0.6s var(--ease-out-cubic) 0.15s both; }
.card--animated:nth-child(3) { animation: cardEnter 0.6s var(--ease-out-cubic) 0.30s both; }
```

**Prioridad:** Alta (fix delay-4 es urgente) | **Esfuerzo:** 1 hora | **Impacto WOW:** 6/10

---

## 7. Micro-interacciones

**Fix de botones (especificar `transition` en lugar de `all`):**

```css
.rs-btn--primary {
  transition:
    background-color var(--duration-fast) var(--ease-out-cubic),
    transform var(--duration-fast) var(--ease-out-cubic),
    box-shadow var(--duration-fast) var(--ease-out-cubic);
}

.rs-btn--primary:hover {
  background-color: var(--rs-primary-dark);
  transform: translateY(-2px) scale(1.01);
  box-shadow: 0 8px 24px rgba(32,180,177,0.28);
}

.rs-btn--primary:active {
  transform: translateY(1px) scale(0.99);
  box-shadow: 0 2px 8px rgba(32,180,177,0.15);
  transition-duration: 0.08s;
}
```

**WhatsApp button con pulso de urgencia:**

```css
@keyframes whatsappPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(37,211,102,0.5); }
  50%       { box-shadow: 0 0 0 10px rgba(37,211,102,0); }
}

.rs-btn--ghost[href*="wa.me"] {
  animation: whatsappPulse 2.5s ease-in-out 1.5s infinite;
}
.rs-btn--ghost[href*="wa.me"]:hover {
  animation-play-state: paused;
}
```

**Featured card glow:**

```css
@keyframes featuredGlow {
  0%, 100% { box-shadow: 0 8px 32px rgba(32,180,177,0.28); }
  50%       { box-shadow: 0 12px 48px rgba(32,180,177,0.48); }
}

.service-card--featured {
  animation: featuredGlow 3s ease-in-out infinite;
}
.service-card--featured:hover { animation-play-state: paused; }
```

**Prioridad:** Alta | **Esfuerzo:** 2 horas | **Impacto WOW:** 7/10

---

## 8. Check Marks Animados (DiffSection)

**Estado actual:** Círculos verdes estáticos con el carácter `✓`. Entran con `.reveal` estándar.

```css
@keyframes checkmarkDraw {
  from { transform: scale(0) rotate(-90deg); opacity: 0; }
  70%  { transform: scale(1.2) rotate(5deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}

.differentiator-item.visible .differentiator-item__check {
  animation: checkmarkDraw 0.5s var(--ease-bounce) both;
}
.differentiator-item.reveal--delay-1.visible .differentiator-item__check { animation-delay: 0.15s; }
.differentiator-item.reveal--delay-2.visible .differentiator-item__check { animation-delay: 0.25s; }
.differentiator-item.reveal--delay-3.visible .differentiator-item__check { animation-delay: 0.35s; }
```

**Prioridad:** Media | **Esfuerzo:** 0.5 horas | **Impacto WOW:** 6/10

---

## 9. IntroOverlay — Clip-path reveal

**Estado actual:** Transición `opacity + translateY` estándar.

```css
.line1, .line2, .line3 {
  opacity: 0;
  clip-path: inset(100% 0% 0% 0%);
  transform: translateY(8px);
  transition:
    clip-path 0.6s var(--ease-out-cubic),
    opacity 0.3s ease,
    transform 0.6s var(--ease-out-cubic);
}

.line1.visible, .line2.visible {
  opacity: 1;
  clip-path: inset(0% 0% 0% 0%);
  transform: translateY(0);
}

.line3.visible {
  animation: brandReveal 0.8s var(--ease-bounce) forwards;
}

@keyframes brandReveal {
  from {
    opacity: 0;
    clip-path: inset(100% 0% 0% 0%);
    transform: scale(0.88);
    letter-spacing: 0.1em;
  }
  to {
    opacity: 1;
    clip-path: inset(0% 0% 0% 0%);
    transform: scale(1);
    letter-spacing: normal;
  }
}
```

**Prioridad:** Media | **Esfuerzo:** 1.5 horas | **Impacto WOW:** 7/10

---

## 10. Performance — Matriz de seguridad

| Propiedad | Tier | Acción |
|-----------|------|--------|
| `transform: translate/scale/rotate` | GPU SEGURO | Usar sin restricción |
| `opacity` | GPU SEGURO | Usar sin restricción |
| `clip-path` | GPU seguro (verificar Safari) | OK |
| `filter: blur()` | GPU parcial | Solo en desktop con `@media (pointer: fine)` |
| `box-shadow` | Repaint | Evitar en listas largas |
| `background-color` | Repaint | OK en hover individual |
| `transition: all` | Todo — PELIGROSO | ELIMINAR de `.rs-btn` e `.input-field` |
| `width`/`height` | Reflow COSTOSO | Usar `scale()` como alternativa |

**`will-change` correcto:** Solo en `.hero::before` y `.hero::after`. No usar en elementos que no se animan permanentemente.

---

## 11. Framer Motion vs. CSS Nativo

**No se necesita Framer Motion para el 80% de las mejoras identificadas.**

| Capacidad | CSS Nativo | Necesita FM |
|-----------|-----------|-------------|
| Hover/focus states | CSS ✓ | No |
| Keyframe animations | CSS ✓ | No |
| Scroll reveal | IO ya implementado ✓ | No |
| Stagger | CSS con custom props ✓ | No (FM más ergonómico) |
| Scroll parallax | CSS `animation-timeline` ✓ | No |
| Exit animations (unmount) | Difícil en CSS | SÍ |
| Layout animations | Imposible en CSS | SÍ |
| Drag / swipe gestures | Imposible en CSS | SÍ |
| Spring physics | Imposible en CSS | SÍ |

Si se adopta FM: `npm install framer-motion@^11`. Bundle cost: ~90KB. Requiere `'use client'` en los componentes que lo usen.

---

## 12. Timeline de Implementación

### Sprint 1 — Quick Wins CSS (6 horas total)

| Tarea | Esfuerzo | WOW |
|-------|----------|-----|
| Fix `transition: all` en `.rs-btn` e `.input-field` | 0.5h | Correctivo |
| Extender `.reveal--delay-4/5/6` | 0.25h | 5 |
| Orbes 3D animados en HeroSection | 2h | 9 |
| Kiwi float + entry animation | 2h | 9 |
| Featured card glow | 0.25h | 6 |
| Button micro-interactions mejorados | 1h | 7 |

### Sprint 2 — Interacciones de sección (7 horas)

| Tarea | Esfuerzo | WOW |
|-------|----------|-----|
| Hero entrance animation orquestada | 1.5h | 8 |
| ProcessSection conector de línea de tiempo | 2h | 8 |
| DiffSection check mark animation | 0.5h | 6 |
| IntroOverlay clip-path reveal | 1.5h | 7 |
| WhatsApp button pulse | 0.5h | 6 |
| Step numbers fill-in animation | 1h | 7 |

### Sprint 3 — Visual storytelling (9 horas)

| Tarea | Esfuerzo | WOW |
|-------|----------|-----|
| Browser mockup animado en hero (reemplaza imagePlaceholder) | 3h | 9 |
| Reading progress bar scroll-driven | 1h | 7 |
| Hero parallax scroll-driven | 1h | 7 |
| Stagger CSS variable system (refactor global) | 2h | 6 |
| PackagesSection card entrance scale+blur | 1h | 7 |
| ProcessSection conector vía `animation-timeline` | 1h | 8 |

### Sprint 4 — Framer Motion (solo si se necesita, 4-5h)

| Tarea | Esfuerzo | WOW |
|-------|----------|-----|
| Instalar FM v11, migrar HeroSection | 2h | — |
| Kiwi spring physics en hover | 1h | 8 |
| Testimonials slider con swipe gestures | 2h | 7 |

---

## Resumen ejecutivo

La base técnica es sólida — tokens de motion bien definidos, IntersectionObserver funcional, CSS Modules sin conflictos. El problema central: TODAS las secciones usan la misma animación `.reveal` y el elemento más impactante (el hero) tiene un kiwi estático en un placeholder vacío.

**Las 3 intervenciones de mayor ROI:**
1. **Orbes 3D animados** — transforma el hero de "blanco plano" a "profundidad visual". Solo CSS, 2 horas.
2. **Kiwi flotando** — convierte la mascota de elemento decorativo a protagonista con personalidad. Solo CSS, 2 horas.
3. **Hero entrance orquestada** — distingue el primer impacto del resto del scroll. Solo CSS, 1.5 horas.

**No se necesita Framer Motion** para Sprint 1-3. CSS nativo + el IntersectionObserver ya en producción son suficientes.
