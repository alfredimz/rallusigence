# Reporte de Impacto Visual — Rallusigence
**Autor:** Senior UI Designer
**Fecha:** 2026-07-20
**Referencia objetivo:** Perplexity Comet

---

## Resumen ejecutivo

El sitio está técnicamente bien construido y es semánticamente sólido. El problema no es que esté roto, es que es seguro en exceso. Los gradientes son tan sutiles que desaparecen en pantalla (4-9% de opacidad), la tipografía Playfair Display existe en el sistema pero no aparece ni una sola vez en el sitio Next.js, las sombras son decorativas en lugar de estructurales, y el kiwi SVG flota en un rectángulo sin propósito compositivo. Comparado con Comet, la distancia principal es de **densidad de luz y escala de atrevimiento**.

---

## 1. Gap visual: Rallusigence vs Comet

**Problema actual:**

| Dimensión | Rallusigence hoy | Comet referencia |
|-----------|-----------------|-----------------|
| Fondo base | `#FFFFFF` plano con gradiente al 4% | `#080B14` oscuro con textura de ruido y grid sutil |
| Escala tipográfica | H1 en 52px, Montserrat Bold | Display en 80-120px con `letter-spacing: -0.04em` |
| Profundidad | Sombras de 8-14% opacidad | Sombras con `blur` de 80px, glow exterior 40-60px |
| Elementos 3D | Placeholder rectangular con kiwi 120px | Orbes 3D con caustics, specular highlights y rings SVG giratorios |
| Whitespace | `padding: 80px 24px` uniforme | Hero de `min-height: 100vh`, secciones con 120-160px vertical |

**Impacto visual:** Sin estos cambios el sitio se percibe como una landing de plantilla, no como la obra de una agencia de IA que justifica $20,000 MXN.

**Propuesta concreta:** Oscurecer el hero, aplicar el orbe como visual principal y activar Playfair Display en el H1.

**Prioridad:** Alta | **Esfuerzo:** Articula el resto de hallazgos

---

## 2. Jerarquía tipográfica — Playfair Display completamente ausente

**Problema actual:** `colors_and_type.css` define `--font-elegant: 'Playfair Display'` pero en el sitio real esa fuente tiene cero apariciones en rol protagónico. Todo el sitio tiene el mismo color tipográfico — sin contraste editorial.

**Impacto visual:** Sin contraste de fuentes el ojo no tiene punto de anclaje.

**Propuesta concreta:**

```css
/* HeroSection.module.css */
.h1 {
  font-family: var(--font-primary);
  font-weight: var(--weight-extrabold);
  font-size: clamp(42px, 5.5vw, 72px);
  line-height: 1.0;
  letter-spacing: -0.03em;
  color: var(--rs-dark-text, #E8EDF5);
}

.h1Serif {
  font-family: var(--font-elegant);
  font-weight: 400;
  font-style: italic;
  font-size: clamp(48px, 6.5vw, 84px);
  line-height: 0.95;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, var(--rs-primary) 0%, var(--rs-sky) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Eyebrow serif antes de H2s de sección */
.eyebrow {
  font-family: var(--font-elegant);
  font-style: italic;
  font-size: 18px;
  color: var(--rs-primary);
  margin-bottom: 12px;
  letter-spacing: 0.01em;
}
```

```tsx
/* HeroSection.tsx */
<h1 className={styles.h1}>
  Tu negocio<br/>
  <em className={styles.h1Serif}>en internet</em><br/>
  en 3 días.
</h1>
```

**Prioridad:** Alta | **Esfuerzo:** 2 horas

---

## 3. Sistema de color — falta dimensión oscura y luminosa

**Problema actual:** El design system tiene 30+ variables pero ninguna para modo oscuro y ninguna para "glow". Todas las secciones tienen el mismo valor tonal: blanco o casi-blanco. El ProcessSection tiene fondo `#1E2028` hardcodeado sin conexión al sistema de variables.

**Impacto visual:** Sin oscuridad no hay contraste. Sin contraste la luz no brilla.

**Propuesta concreta — añadir al bloque `:root` de `globals.css`:**

```css
:root {
  /* DARK CANVAS */
  --rs-dark-bg:        #080C14;
  --rs-dark-surface:   #0E1420;
  --rs-dark-surface-2: #141B2D;
  --rs-dark-border:    rgba(32, 180, 177, 0.15);
  --rs-dark-text:      #E8EDF5;
  --rs-dark-muted:     rgba(232, 237, 245, 0.55);

  /* GLOW TOKENS */
  --rs-glow-sm:   0 0 12px rgba(32, 180, 177, 0.35);
  --rs-glow-md:   0 0 32px rgba(32, 180, 177, 0.40), 0 0 80px rgba(32, 180, 177, 0.15);
  --rs-glow-lg:   0 0 60px rgba(32, 180, 177, 0.50), 0 0 120px rgba(32, 180, 177, 0.20);
  --rs-glow-blue: 0 0 40px rgba(16, 120, 188, 0.30), 0 0 80px rgba(43, 55, 140, 0.15);

  /* GRADIENT TEXTO */
  --rs-text-gradient: linear-gradient(135deg, var(--rs-primary) 0%, var(--rs-sky) 50%, var(--rs-blue-light) 100%);

  /* ORBE GRADIENTE */
  --rs-orb-outer: radial-gradient(ellipse 60% 55% at 45% 35%,
    rgba(255,255,255,0.18) 0%,
    rgba(32,180,177,0.55) 25%,
    rgba(16,120,188,0.70) 55%,
    rgba(43,55,140,0.85) 80%,
    rgba(8,12,20,0.95) 100%);
}
```

**Prioridad:** Alta — prerequisito para hallazgos 4, 5, 8 | **Esfuerzo:** 1 hora

---

## 4. Hero Section — primera impresión que no impresiona

**Problema actual:** Fondo blanco con gradiente al 4-7% (invisible). El visual derecho es un rectángulo con el kiwi en 120px. No hay animación, profundidad ni momento memorable.

**Propuesta completa para `HeroSection.module.css`:**

```css
.hero {
  background: var(--rs-dark-bg, #080C14);
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

/* Campo de estrellas */
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(1px 1px at 15% 25%, rgba(255,255,255,0.4) 0%, transparent 0%),
    radial-gradient(1px 1px at 45% 15%, rgba(255,255,255,0.3) 0%, transparent 0%),
    radial-gradient(1.5px 1.5px at 75% 40%, rgba(32,180,177,0.6) 0%, transparent 0%),
    radial-gradient(1px 1px at 90% 70%, rgba(255,255,255,0.3) 0%, transparent 0%),
    radial-gradient(1px 1px at 25% 80%, rgba(255,255,255,0.25) 0%, transparent 0%),
    radial-gradient(1px 1px at 60% 85%, rgba(90,193,210,0.5) 0%, transparent 0%),
    radial-gradient(1px 1px at 10% 55%, rgba(255,255,255,0.2) 0%, transparent 0%),
    radial-gradient(1px 1px at 85% 20%, rgba(255,255,255,0.35) 0%, transparent 0%);
  pointer-events: none;
  z-index: 0;
}

/* Nebulosa de fondo */
.hero::after {
  content: '';
  position: absolute;
  top: -20%;
  right: -10%;
  width: 700px;
  height: 700px;
  background: radial-gradient(ellipse,
    rgba(32,180,177,0.12) 0%,
    rgba(16,120,188,0.08) 40%,
    transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 140px 24px 120px;
  position: relative;
  z-index: 1;
}

.h1 {
  font-family: var(--font-primary);
  font-weight: var(--weight-extrabold);
  font-size: clamp(42px, 5.5vw, 72px);
  line-height: 1.0;
  letter-spacing: -0.03em;
  color: var(--rs-dark-text, #E8EDF5);
}

.subtitle {
  font-size: 18px;
  line-height: 1.65;
  color: var(--rs-dark-muted, rgba(232, 237, 245, 0.60));
  max-width: 480px;
}

/* El orbe: reemplaza el imagePlaceholder rectangular */
.imagePlaceholder {
  width: 100%;
  aspect-ratio: 1/1;
  max-width: 520px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: visible;
  background: var(--rs-orb-outer);
  box-shadow:
    var(--rs-glow-lg),
    inset 0 1px 0 rgba(255,255,255,0.15);
}

/* Specular highlight */
.imagePlaceholder::before {
  content: '';
  position: absolute;
  top: 12%;
  left: 18%;
  width: 35%;
  height: 28%;
  background: radial-gradient(ellipse, rgba(255,255,255,0.55) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 2;
}

/* Anillo orbital externo */
.imagePlaceholder::after {
  content: '';
  position: absolute;
  inset: -32px;
  border-radius: 50%;
  border: 1px solid rgba(32, 180, 177, 0.30);
  animation: orbit-pulse 4s ease-in-out infinite;
  pointer-events: none;
}

@keyframes orbit-pulse {
  0%, 100% { transform: scale(1); opacity: 0.30; }
  50% { transform: scale(1.04); opacity: 0.60; }
}

@media (max-width: 1024px) {
  .h1 { font-size: 44px; }
  .inner { gap: 48px; padding: 120px 20px 80px; }
}

@media (max-width: 767px) {
  .inner { grid-template-columns: 1fr; gap: 48px; padding: 100px 16px 64px; }
  .h1 { font-size: 36px; }
  .imagePlaceholder { max-width: 300px; margin: 0 auto; }
}
```

**Anillos SVG orbitales (agregar en `HeroSection.tsx` dentro de `imagePlaceholder`):**

```tsx
<svg
  style={{ position:'absolute', inset:'-50px', width:'calc(100% + 100px)',
    height:'calc(100% + 100px)', pointerEvents:'none' }}
  viewBox="0 0 620 620" fill="none" aria-hidden="true"
>
  <ellipse cx="310" cy="310" rx="290" ry="95"
    stroke="rgba(32,180,177,0.25)" strokeWidth="1"
    transform="rotate(-15 310 310)"
    strokeDasharray="8 6"
  />
  <ellipse cx="310" cy="310" rx="260" ry="78"
    stroke="rgba(90,193,210,0.15)" strokeWidth="0.75"
    transform="rotate(25 310 310)"
    strokeDasharray="4 8"
  />
</svg>
```

**Prioridad:** Alta | **Esfuerzo:** 3 horas

---

## 5. Cards y componentes — profundidad insuficiente

**Problema actual:** Sombras al 6-10% de opacidad sobre fondo blanco. El glassmorphism de testimonials al 4% no genera profundidad real.

**Propuesta — variante dark glassmorphism:**

```css
/* globals.css */
.service-card--dark {
  background: rgba(14, 20, 32, 0.80);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(32, 180, 177, 0.18);
  border-radius: 20px;
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.40),
    0 1px 0 rgba(255, 255, 255, 0.06) inset,
    var(--rs-glow-sm);
  color: var(--rs-dark-text);
  transition: var(--transition-base);
}

.service-card--dark:hover {
  border-color: rgba(32, 180, 177, 0.45);
  box-shadow:
    0 8px 48px rgba(0, 0, 0, 0.50),
    0 1px 0 rgba(255, 255, 255, 0.08) inset,
    var(--rs-glow-md);
  transform: translateY(-6px);
}

.service-card--dark.service-card--featured {
  background: linear-gradient(145deg,
    rgba(32, 180, 177, 0.25) 0%,
    rgba(16, 120, 188, 0.20) 50%,
    rgba(43, 55, 140, 0.30) 100%);
  border-color: rgba(32, 180, 177, 0.50);
  box-shadow: 0 8px 64px rgba(32, 180, 177, 0.25),
    0 1px 0 rgba(255,255,255,0.15) inset, var(--rs-glow-md);
}

/* Versión clara mejorada */
.service-card {
  border: 1px solid transparent;
  background:
    linear-gradient(#ffffff, #ffffff) padding-box,
    linear-gradient(135deg, rgba(32,180,177,0.20), rgba(90,193,210,0.08)) border-box;
  border-radius: 16px;
  box-shadow:
    0 2px 4px rgba(0,0,0,0.04),
    0 8px 32px rgba(0,0,0,0.08),
    0 32px 64px rgba(0,0,0,0.04);
}

.service-card:hover {
  box-shadow:
    0 4px 8px rgba(0,0,0,0.06),
    0 16px 48px rgba(32,180,177,0.12),
    0 48px 80px rgba(0,0,0,0.06);
  transform: translateY(-6px);
}
```

**Prioridad:** Alta | **Esfuerzo:** 2.5 horas

---

## 6. Uso del kiwi — mascota sin rol compositivo

**Problema actual:** 120x120px estático en un rectángulo. Una aparición. Sin animación. Sin posición compositiva.

**Propuesta — integración dentro del orbe hero:**

```css
/* HeroSection.module.css */
.orbKiwi {
  position: relative;
  z-index: 3;
  width: 88px;
  height: 88px;
  filter:
    drop-shadow(0 4px 16px rgba(0,0,0,0.50))
    drop-shadow(0 0 24px rgba(248,184,78,0.25));
  animation: kiwi-breathe 6s ease-in-out infinite;
}

@keyframes kiwi-breathe {
  0%, 100% { transform: scale(1) translateY(0); }
  50% { transform: scale(1.04) translateY(-4px); }
}
```

**Integraciones secundarias:**
- Eyebrow marker: kiwi tiny 24px (`icono.svg`) como bullet antes de labels de sección clave
- Footer: kiwi 40px rotado 15° como firma visual con `drop-shadow(0 0 8px rgba(248,184,78,0.30))`

**Regla de uso sofisticado:** El kiwi nunca va sobre fondo blanco sin sombra. Necesita siempre: `drop-shadow` mínimo 16px blur + glow dorado `rgba(248,184,78,0.20)` o fondo oscuro.

**Prioridad:** Media | **Esfuerzo:** 2 horas

---

## 7. Whitespace y layout — densidad sin variación de ritmo

**Problema actual:** Todas las secciones usan `padding: 80px 24px` uniforme. El scroll se siente mecánico, no narrativo.

**Propuesta:**

```css
/* globals.css — sistema de padding variable */
.section-wrapper               { padding: 100px 24px; }
.section-wrapper--feature      { padding: 120px 24px; }
.section-wrapper--compact      { padding: 80px 24px; }
.section-wrapper--xl           { padding: 140px 24px 160px; }
```

```css
/* PackagesSection — más respiración */
.grid { gap: 32px; margin-top: 64px; }
.titleWrap { margin-bottom: 64px; }

/* DiffSection — gap editorial */
.inner { gap: 120px; }  /* de 80px a 120px */
```

**Prioridad:** Media | **Esfuerzo:** 1.5 horas

---

## 8. Quick Wins — 3 cambios de ~30 minutos

### QW1: Gradiente de texto en palabras clave del H1 (20 min)

```css
/* HeroSection.module.css */
.highlight {
  background: linear-gradient(135deg, var(--rs-primary) 0%, var(--rs-sky) 60%, var(--rs-blue-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

```tsx
<h1 className={styles.h1}>
  Tu negocio en internet<br/>
  en <span className={styles.highlight}>3 días.</span>
</h1>
```

### QW2: Glow luminoso en CTA primario (15 min)

```css
/* globals.css */
.rs-btn--primary:hover {
  background-color: var(--rs-primary-dark);
  transform: translateY(-2px);
  box-shadow:
    0 4px 12px rgba(32, 180, 177, 0.25),
    0 8px 32px rgba(32, 180, 177, 0.20),
    0 0 0 1px rgba(32, 180, 177, 0.30);
}

.rs-btn--primary.rs-btn--glow:hover {
  box-shadow:
    0 4px 16px rgba(32, 180, 177, 0.50),
    0 8px 48px rgba(32, 180, 177, 0.30),
    0 0 0 1px rgba(32, 180, 177, 0.60);
}
```

### QW3: Border-radius de botones a pill (10 min)

```css
/* globals.css */
.rs-btn {
  border-radius: var(--radius-pill);   /* de --radius-sm (4px) a pill (28px) */
}
.rs-btn--ghost {
  border-radius: var(--radius-pill);
}
```

---

## 9. Mejoras medianas — 5 cambios de 2-4 horas cada uno

### MM1: ProcessSection — timeline horizontal con orbes iluminados (3h)

```css
.list { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; position: relative; }
.list::before {
  content: '';
  position: absolute;
  top: 20px; left: 10%; right: 10%; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(32,180,177,0.40) 20%, rgba(32,180,177,0.40) 80%, transparent);
}
.section :global(.step-item__number) {
  background: rgba(32,180,177,0.15);
  border: 1px solid rgba(32,180,177,0.50);
  box-shadow: 0 0 16px rgba(32,180,177,0.30), inset 0 1px 0 rgba(255,255,255,0.10);
  font-family: var(--font-elegant);
  font-style: italic;
}
```

### MM2: Eyebrow labels como chips luminosos (2h)

```css
.rs-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 14px; border-radius: 100px;
  font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--rs-primary);
  background: rgba(32,180,177,0.10);
  border: 1px solid rgba(32,180,177,0.25);
  margin-bottom: 16px;
}
.rs-eyebrow--dark {
  color: var(--rs-sky);
  background: rgba(32,180,177,0.12);
  border-color: rgba(32,180,177,0.30);
  box-shadow: 0 0 12px rgba(32,180,177,0.15);
}
```

### MM3: PackagesSection sobre fondo oscuro (2.5h)

```css
.section {
  background: linear-gradient(180deg, var(--rs-dark-bg, #080C14) 0%, rgba(14,20,32,0.95) 100%);
  position: relative; overflow: hidden;
}
.section::before {
  content: '';
  position: absolute; top: 30%; left: 50%; transform: translateX(-50%);
  width: 600px; height: 400px;
  background: radial-gradient(ellipse, rgba(32,180,177,0.08) 0%, transparent 70%);
}
```

### MM4: Componente OrbitalRings reutilizable (2h)

```tsx
// components/ui/OrbitalRings.tsx
export default function OrbitalRings({ size = 600, opacity = 0.15, color = '#20B4B1', className = '' }) {
  return (
    <svg className={className} width={size} height={size}
      viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden="true"
      style={{ pointerEvents: 'none' }}>
      <ellipse cx={size/2} cy={size/2} rx={size*0.46} ry={size*0.15}
        stroke={color} strokeWidth="0.75" strokeOpacity={opacity}
        strokeDasharray="6 5" transform={`rotate(-20 ${size/2} ${size/2})`} />
      <ellipse cx={size/2} cy={size/2} rx={size*0.41} ry={size*0.12}
        stroke={color} strokeWidth="0.5" strokeOpacity={opacity * 0.6}
        transform={`rotate(15 ${size/2} ${size/2})`} />
      <circle cx={size/2} cy={size/2} r={size*0.43}
        stroke={color} strokeWidth="0.5" strokeOpacity={opacity * 0.4}
        strokeDasharray="2 8" />
    </svg>
  );
}
```

### MM5: ContactSection renovada — dark con glass form (4h)

```css
.section {
  background: linear-gradient(135deg, #0A0F1A 0%, #0E1524 50%, #080C14 100%);
  position: relative; overflow: hidden;
}
.inner {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 80px; align-items: start;
  max-width: var(--container-max); margin: 0 auto; padding: 120px 24px;
}
.section :global(.form-card) {
  background: rgba(14, 20, 32, 0.80) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(32, 180, 177, 0.25) !important;
  border-radius: 20px !important;
  box-shadow: 0 8px 48px rgba(0,0,0,0.40), 0 0 0 1px rgba(255,255,255,0.04) inset !important;
}
.section :global(.input-field) {
  background: rgba(8, 12, 20, 0.60);
  border-color: rgba(255,255,255,0.12);
  color: var(--rs-dark-text, #E8EDF5);
}
.section :global(.input-field:focus) {
  border-color: var(--rs-primary);
  box-shadow: 0 0 0 3px rgba(32,180,177,0.20);
}
```

---

## 10. Transformación completa — arquitectura visual objetivo

| Sección | Estado actual | Estado objetivo |
|---------|--------------|----------------|
| Hero | Blanco, kiwi flotante | Fondo #080C14, orbe 3D, anillos SVG, tipografía editorial |
| PainSection | Fondo #F9FAFB suave | Transición de oscuro a claro |
| PackagesSection | Fondo #F9FAFB | Fondo #080C14, cards glassmorphism dark |
| ProcessSection | Oscuro simple | Timeline horizontal, números como orbes iluminados |
| DiffSection | Blanco, gap 80px | Blanco editorial, gap 120px, eyebrow chip |
| TestimonialsSection | Blanco simple | Cita en Playfair Italic 28px |
| ContactSection | Blanco, form plano | Oscuro, glass card, CTA con glow |
| Footer | — | Fondo #080C14, kiwi como firma |

### Tiempo total estimado

| Fase | Tiempo |
|------|--------|
| Quick wins QW1-3 | 1.5 horas |
| Variables dark + glow (H3) | 1 hora |
| Hero rediseño completo (H4) | 3 horas |
| Cards glassmorphism (H5) | 2.5 horas |
| Tipografía editorial (H2) | 2 horas |
| Mejoras medianas MM1-5 | 13.5 horas |
| **Total** | **~23.5 horas** |

Un sprint de 3 días lleva el sitio al nivel de referencia Comet. La brecha no es de recursos ni de tecnología — es de atrevimiento en las decisiones de diseño.

---

## Appendix: Variables existentes no utilizadas

| Variable | Valor | Uso propuesto |
|----------|-------|---------------|
| `--rs-sky` | `#5AC1D2` | Gradientes texto, anillos SVG |
| `--rs-blue-intense` | `#2B378C` | Tercer color en gradiente del orbe |
| `--rs-gold` | `#DDAE29` | Stars de testimoniales, glow dorado kiwi |
| `--rs-teal-light` | `#6EC5CC` | Texto muted en fondo oscuro |
| `--font-elegant` | Playfair Display | H1 display, cita testimonial, eyebrows |
| `--weight-extrabold` | 800 | H1 en desktop (más impacto que 700 actual) |
| `--leading-tight` | 1.1 | H1 display-size a escala grande |
