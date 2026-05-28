# Rallusigence — Design System

> Agencia de IA + automatización para PYMEs mexicanas.
> "Automatizamos tu negocio con IA que funciona 24/7. WhatsApp que responde solo, sitio web que vende y procesos que se hacen sin ti."

---

## What is Rallusigence?

**Rallusigence** is a Mexican AI agency founded by Alfredo Díaz (Tizayuca, Hidalgo) targeting small businesses across México — dentists, restaurants, local commerce. It evolved from earlier brands KIWINET (2017–2019) and APTERYNET, now repositioned around AI automation.

The name combines **Rallus** (a genus of birds) + **igence** (from intelligence). The mascot is a flat, geometric **kiwi** (a flightless bird) inside a teal hexagon — symbolising precision and "intelligent automation that walks instead of flies, but never stops."

### Core services

| Code | Service | Price (MXN) |
|------|---------|-------------|
| S1 | Sitio web profesional | $8,000–25,000 |
| S2 | Agente WhatsApp 24/7 (bot IA) | $3,500–8,000 / mes |
| S3 | Contenido SEO automático | $2,500–5,000 / mes |
| S4 | Automatización de procesos | $5,000–15,000 + $2,000 / mes |
| S5 | **Auditoría digital** | **Gratis (CTA principal)** |

The free **auditoría digital** is the primary CTA across every surface — it's the captation funnel.

### Target audience

Two personas drive copy and design decisions:
- **Dr. Roberto** — a dentist in León, GTO who answers WhatsApp at 11 pm.
- **María Elena** — a restaurant owner in Mérida who can't be found on Google.

Both are technical-but-not-developers. Copy is tuteo (informal "tú"), direct, with concrete numbers and prices.

### Stack
- HTML / CSS / JS vanilla
- Firebase Hosting
- Domain: rallusigence.net

### Visual references
The Ordinary, IKEA, Muji Japan — minimal, functional, every line verifiable.

---

## Sources & provenance

This design system was built from the following resources (the user provided them; the reader may not have access):

- **GitHub repo:** `alfredimz/rallusigence` (`main` branch)
  - `PROYECTO.md` — project overview, services, sessions log
  - `brief/` — logos (icono, letras, kiwi-icon, horizontal/vertical lockups) in PNG + SVG
  - `fase-2-identidad/brand-manual.md` — color palette, typography, mascot specs
  - `fase-2-identidad/voz-y-tono.md` — voice/tone manual, prohibited words
  - `fase-2-identidad/copywriting-sitio.md` — full site copy (hero, services, CTAs)
  - `fase-3-ux/sitemap.md`, `user-flows.md`, `wireframes.md`, `inventario-contenido.md`
  - `fase-4-design-system/design-system.md` — ~36 KB component library (CSS + specs)
  - `fase-4-design-system/guia-estilos-ui.md` — icon system, micro-interactions, a11y
  - `fonts/` — full Montserrat, Playfair Display, Pacifico, Patrick Hand, Amatic SC families

Brand assets and a curated weight subset of every font were copied into this project.

---

## CONTENT FUNDAMENTALS

> The voice is fixed; the tone shifts by surface. The Ordinary is the editorial reference: every line must be verifiable.

### Voice attributes (always on)
1. **Direct** — no fluff, every word has a job. *"Automatizamos tu WhatsApp en 5 días."* not *"podríamos explorar las posibilidades de…"*
2. **Technical-but-accessible** — explain AI without intimidating. *"Tu bot aprende de tus respuestas anteriores y mejora solo."*
3. **Concrete** — real numbers, real days, real prices. *"Tu sitio listo en 3 días por $12,000."* never *"pronto"* or *"mucho mejor"*.
4. **Mexican without folklore** — natural tuteo, no gringo buzzwords, no forced mexicanismos. *"Te acompaño en todo el proceso."*

### Tone by surface (1 = familiar, 5 = formal)
- Google/Facebook ads — **3/5**, urgent without aggression
- Homepage — **4/5**, confident, professional
- Follow-up email — **3/5**, consultative, no pressure
- WhatsApp support — **2/5**, like a tech friend
- LinkedIn organic — **4/5**, expert without ego

### Casing & formatting
- **Sentence case** for headlines and the wordmark itself ("Rallusigence", not "RALLUSIGENCE")
- **Tuteo always** ("tú", never "usted") — only switch to "usted" if a specific client asks
- Max 20 words per sentence, ideal 12–15. Max 3 sentences per paragraph
- Max **1 exclamation per paragraph**, only on real benefits — never on greetings
- Prices always visible: `$12,000 MXN` or `desde $5,000`. Never "consulta precio"
- One technical term per paragraph, always explained inline: *"API (conexión entre sistemas)"*

### Emoji policy
- **Yes** on WhatsApp, social, informal email — max 1 per message
- **No** on the website, proposals, technical docs
- Allowed set leans functional: ✅ ❌ 📱 💰 📊
- The pain section may use emotional emoji (🤦‍♂️ 😤 💸 ⏰) sparingly

### Forbidden words (incomplete list — see `voz-y-tono.md`)
"disruptivo", "innovador", "soluciones", "transformar", "potenciar", "ecosistema digital", "siguiente nivel", "revolucionar", "sinergias", "empoderamiento", "omnicanalidad", "customer journey", "ROI optimizado", "experiencia inmersiva", "cutting-edge", "de vanguardia", "best practices", "escalabilidad", "workflow", "pain points".

### Preferred words
"automatizar", "en X días", "precio fijo", "bot", "proceso", "problema", "cliente", "negocio", "funciona", "arreglar", "rápido", "simple", "ahorra tiempo", "más ventas", "te ayudo", "resultados", "herramientas", "configurar", "revisión", "mantenimiento".

### Sample lines (copy them verbatim or as patterns)
- H1: *"Tu negocio automatizado en días"*
- Subtítulo: *"WhatsApp 24/7, sitio web profesional, procesos automáticos. Sin intermediarios, sin meses de espera."*
- Pain: *"Respondes WhatsApp hasta las 11 pm porque los clientes escriben a toda hora. Si no contestas rápido, se van con la competencia."*
- Diferenciador: *"Días, no meses. Mientras otras agencias tienen 'procesos de 90 días', nosotros automatizamos en una semana."*
- CTA primario: **Auditoría gratis** / **Mi auditoría gratis**
- Footer tagline: *"Tu negocio automatizado sin complicarte."*

---

## VISUAL FOUNDATIONS

### Color
- **Primary identity:** `#20B4B1` turquesa brillante. Hover: `#198C76`. Pressed: `#10AE8F`.
- **Support range:** teal extends through blues (`#1078BC`, `#1B8CCD`, `#1E5F90`) and greens (`#029E81`, `#10AE8F`). The full `--rs-*` palette in `colors_and_type.css` is broad — most surfaces use only primary + neutrals.
- **Accents** (oranges, yellows, reds in `--rs-orange-*`, `--rs-yellow`, `--rs-red-*`) exist for occasional editorial pop — never as CTA color.
- **Neutrals:** `#FFFFFF` background, `#2C2C2C` text, `#6B7280` muted text, `#E5E5E5` borders, `#F9FAFB` soft surface.
- **Semantic:** success `#10B981`, error `#EF4444`. Backgrounds `#ECFDF5` / `#FEF2F2`.
- **Imagery temperature:** neutral to slightly cool (5500–6500K), saturation −20%, contrast +10%. **No sepia, no vintage, no warm filters.**

### Typography
- **Primary:** Montserrat — body 400, mid 500/600, headings 700. Headings have `letter-spacing: -0.01em` (h1 −0.02em).
- **Elegant accent:** Playfair Display Italic for occasional pull-quotes or premium taglines (use sparingly).
- **Decorative families** (Pacifico, Patrick Hand, Amatic SC) ship with the system but should appear only on **social posts and offline materials** — not the website.
- **Scale (px):** h1 48 / h2 36 / h3 24 / h4 20 / body 16 / small 14 / micro 12.
- **Line-heights:** 1.1 tight (h1), 1.2 snug (h2), 1.3 normal (h3+labels), 1.6 relaxed (body).
- **Mono:** ui-monospace stack used for prices, code, and data labels (no JetBrains Mono ttf shipped — system stack is fine).

### Spacing
8px grid, strict.
`8 / 16 / 24 / 48 / 80` — nothing in between. Sections sit on 80px vertical rhythm on desktop, 48px on mobile. Container max-width 1200, prose max 600, CTA max 320.

### Backgrounds
- **Default:** flat white. No gradients on body backgrounds.
- **Section variation:** alternate flat white with `#F9FAFB` (very soft gray) for breathing room.
- **Featured cards** (e.g. service-card--featured) use solid `#20B4B1` with white text.
- **No** hand-drawn illustrations on the website. **No** repeating patterns. **No** texture overlays. The kiwi mark and hexagon are the only branded shapes.
- Imagery preference: clean product/UI screenshots, organised desks, devices in use — *no people*, no stock-smile faces.

### Borders & corners
- **Border:** 1px solid `#E5E5E5` on cards, inputs, dividers.
- **Radius:** 4px on inputs/buttons (small), 8px on cards/forms (medium), 28px on the mobile sticky CTA (pill).
- Cards rarely combine more than border + shadow — they pick one.

### Shadows
- **Light:** `0 1px 3px rgba(44,44,44,0.10)` — incidental separation
- **Card:** `0 4px 24px rgba(0,0,0,0.08)` — main form card
- **Hover:** `0 4px 16px rgba(0,0,0,0.10)` — service cards on hover
- **Sticky CTA:** `0 4px 16px rgba(0,0,0,0.15)` — floating button
- **Tinted CTA glow:** `0 4px 12px rgba(32,180,177,0.15)` — primary button hover

No inner shadows. No layered shadows. Shadows always neutral, never tinted (except the one teal-tinted hover glow).

### Animation

**Motion tokens** (in `colors_and_type.css`):
- Durations: `--duration-fast 0.2s` · `--duration-normal 0.3s` · `--duration-slow 0.4s` · `--duration-intro 0.8s`
- Easings: `--ease-out-cubic (0.16, 1, 0.3, 1)` for most reveals/cards · `--ease-in-out-cubic (0.4, 0, 0.2, 1)` for symmetric hovers · `--ease-bounce (0.68, -0.55, 0.265, 1.55)` for CTA pulse only
- Z-index scale: `--z-intro 9999` · `--z-sticky-btn 100` · `--z-header 50` · `--z-mobile-overlay 49`

**Hover & press states**
- **Button (primary):** fill animates from bottom up to `--rs-primary-dark` (`::before` `translateY(100% → -100%)`, 0.4s `ease-out-cubic`); button itself lifts `translateY(-1px)`. On click a ripple expands from the click point (white at 30% opacity, scales to 2× over 0.6s).
- **Button (secondary):** fill slides in from the left (`::before` `left -100% → 0`); text becomes white.
- **Service card:** `translateY(-4px) scale(1.02)`, border → teal, shadow `0 12px 32px rgba(32,180,177,.15)`, plus a sheen sweep (`::before` 90° gradient slides left → right, 0.5s). Icon scales 1.15 + rotates 5°.
- **Form input focus:** border → teal, dual ring `0 0 0 3px rgba(32,180,177,.15) + 0 0 20px rgba(32,180,177,.1)`, lifts `translateY(-1px)`.

**Form states**
- **Error:** input border → red, 5-step `inputShake` (0.4s) translating ±2px.
- **Success:** group adds a green check at the right edge (`::after`, fades in scaling 0.8 → 1).
- **Submit loading:** button text becomes transparent and a 20px white-bordered spinner rotates from the centre (`buttonSpinner` 0.8s linear infinite).
- **Form success message:** slide-down banner (`max-height 0 → 100px`, opacity + translateY, 0.4s).

**Scroll-driven**
- **Scroll reveal** is part of the system — apply `.reveal` (also `.reveal--left / --right / --scale`) and `.reveal--delay-1/2/3` for cascades. Driven by `IntersectionObserver` (root margin `-50px`, threshold 0.1); element gets `.visible` once and is unobserved. Section titles, hero copy, service cards (cascade), pain items (left), process steps (right), testimonials, form-card all use it.
- **Sticky header** hides on scroll-down past 200px, reveals on scroll-up; on hover within 80px of the top while scrolled it returns. When `--scrolled` (past 100px) the header gains backdrop blur, a soft border, the logo shrinks (24 → 20px), the container drops 72 → 64px and the CTA scales to 0.95. A 2px gradient progress bar at the bottom tracks scroll.
- **Sticky CTA button** fades + slides 100px from below, only on mobile/tablet (<1024px), only after 300px of scroll.

**Intro overlay (homepage only, once per day)**
A 5.5s pitch-elevator on first visit: dark background (`linear-gradient(135deg, #2C2C2C, #1E1E1E)`), three lines fade-and-slide in sequence (pain in red `#EB5B5B` → solución in teal → marca in white), then a pulsing CTA. Skip button bottom-right, audio toggle top-right (starts muted). Stored in `localStorage` under `rallusigence_intro_shown` keyed by `toDateString()`. Skipped under `prefers-reduced-motion`.

**Mobile menu**
Hamburger morphs into an X (top/bottom rotate to ±45°, middle scales to 0). Panel slides down from below the header (`max-height 0 → 400px`), items reveal in cascade (each `translateX(-20px) → 0` with 50ms staggered delay), CTA scales in last. Backdrop dims to `rgba(0,0,0,.3)`.

**Smooth scroll**
Anchor clicks are intercepted; scroll runs through a custom `requestAnimationFrame` loop with ease-out-cubic over 800ms, offsetting by the live header height + 20px. The URL hash is updated without reload.

**Section dividers (optional)**
Two SVG patterns are sanctioned: `section-divider--wave` (very low-opacity teal wave, 60px tall) and `section-divider--dots` (11 dots with opacity gradient, gently pulsing 3s). Use sparingly — flat sections still preferred.

**Reduced motion**
Under `prefers-reduced-motion: reduce` everything collapses to opacity-only fades; `.intro-overlay` is `display: none`; transforms on hover are removed; durations clamp to 0.01ms via universal selector.

### Hover / press states
- **Buttons:** hover darkens fill (`#198C76`) and adds a `translateY(-1px)` lift. Press returns to flat.
- **Secondary buttons:** hover adds `rgba(32,180,177,0.05)` tint, press deepens to 0.10.
- **Ghost buttons:** hover shows underline at 4px offset.
- **Cards:** hover changes border to teal and lifts 2px.
- **Links:** color shifts to primary on hover.

### Transparency & blur
- **Header:** `rgba(255,255,255,0.95)` + `backdrop-filter: blur(8px)` when sticky.
- **Form overlay (loading):** white at 80% opacity over the form card.
- That's it. No frosted glass elsewhere, no transparent CTAs.

### Layout rules (fixed elements)
- Sticky `nav-header` 72px tall, `z-index: 50`. Adds shadow once scrolled.
- Sticky mobile CTA (`btn-sticky`) bottom-center, 28px radius, `z-index: 100`. Hidden on desktop.
- Container max 1200px, gutter 24px (16px on mobile).

### A11y commitments
- Contrast verified: `#2C2C2C` on white = 12.6:1 (AAA). Teal text on white = 4.8:1 (AA). White on teal = 4.4:1 (AA).
- Min touch target 44×44 — all buttons are 48px tall, sticky CTA is 56px.
- `:focus-visible` shows `2px solid var(--rs-primary)` outline with 2px offset.

---

## ICONOGRAPHY

### Library: **Lucide Icons** (CDN)
- CDN: `https://unpkg.com/lucide@latest/dist/umd/lucide.js`
- Reasoning (per the brand guide): cleaner than Material, broader than Heroicons, lighter than Font Awesome. The flat geometric stroke-based style matches the kiwi mark.

### Usage rules
- **Stroke weight 1.5px**, `stroke-linecap: round`, `stroke-linejoin: round`.
- **Sizes:** 16px (inline/badge), 20px (button/nav/list), 24px (card/section/form).
- **Color:** primary teal for principal icons, `#6B7280` muted for decorative, white on teal backgrounds, `#10B981`/`#EF4444` for success/error.

### Icon set actually used (≈20 icons)
search, shield-check, trending-up, zap, users, clock, check-circle, star, menu, x, arrow-right, external-link, download, mail, send, loader-2, check, alert-circle, eye, eye-off.

### Emoji usage as icons
Allowed only in the **"dolores"** (pain points) section to convey emotion: 🤦‍♂️ 😤 💸 ⏰. And in a few testimonial accents: ⭐ 💯 🎯. Never in nav or controls.

### Brand assets in `assets/`
- `icono.svg` / `icono.png` — hexagonal teal mark with brown kiwi (primary mark)
- `kiwi-icon.svg` — kiwi alone, no hexagon
- `letras.svg` / `letras.png` — hand-lettered "RalluSIgEncE" wordmark
- `letras-icono-horizontal.*` — wordmark + mark, side by side
- `letras-icono-vertical.*` — mark above wordmark (signature lockup)

The wordmark is **deliberately mixed-case** ("RalluSIgEncE") — that's the lettering, not a typo. Treat it as artwork; do not retype.

### Substitutions / flags
- **No JetBrains Mono ttf** was provided. The system stack `ui-monospace, 'JetBrains Mono', Consolas, monospace` is used for prices and data. If exact JetBrains Mono is needed, pull from Google Fonts.
- The brand manual mentions **Lobster** but no `Lobster-*.ttf` was provided. If needed, it must be added; otherwise treat Pacifico as the substitute (both are scripty display faces).
- Lucide is loaded from CDN, not bundled — call out if offline use is needed.

---

## INDEX — what's in this folder

```
README.md                  ← you are here
SKILL.md                   ← agent skill manifest (drop into ~/.claude/skills/)
colors_and_type.css        ← all CSS variables + @font-face + .rs-* type classes
fonts/                     ← Montserrat (5 weights), Playfair (2), Pacifico, Patrick Hand, Amatic SC (2)
assets/                    ← logos & marks (icono, letras, kiwi-icon, lockups in SVG + PNG)
preview/                   ← cards rendered in the Design System tab (one HTML per card)
ui_kits/
  marketing-website/       ← landing-page UI kit
    README.md              ← what's in the kit, patterns worth lifting
    index.html             ← live landing — all primitives in real context
    components.jsx         ← React components (Header, Hero, ServiceCard, FormField…)
```

The `preview/` folder breaks down by group:

| Group       | Cards |
|-------------|-------|
| Type        | Headings · Body & supporting · Display & accent faces · Weights |
| Colors      | Primary · Support range · Accents · Neutrals & semantic |
| Spacing     | 8px scale · Radius · Shadows |
| Components  | Buttons · Button FX (fill + ripple) · Form fields · Cards · Price tags & differentiators · Pricing card (featured) · Steps · Testimonial · Scroll reveal · Section dividers |
| Motion      | Motion tokens (durations · easings · z-index) |
| Brand       | Logo lockups (h + v) · Iconography · Voice (do/don't) · Intro overlay |

If a reader is integrating this on a new project: include `colors_and_type.css` first, copy the `fonts/` and `assets/` directories, and use the `--rs-*` and `--color-*` variables in their own stylesheets.

---

## Caveats

- The brand manual mentions **Lobster**; no font file was provided. Pacifico is the fallback in `--font-creative`.
- **Earlier README statement reversed:** `scroll-reveal` *is* part of the system per `animaciones-componentes.md`. The previous "explicitly NOT used" line was incorrect and has been removed.
- The intro overlay references `/assets/intro-audio.mp3` — the audio file is not in the repo and must be supplied before launching the homepage intro.
- The pricing-card pattern (gradient header + "RECOMENDADO" ribbon) lives only in `animaciones-componentes.md`; it is not used on the current site but is sanctioned for proposals/pricing pages.
- **JetBrains Mono** isn't shipped — system mono stack is used.
- The original repo had ~36 KB of CSS specs in `fase-4-design-system/design-system.md`; this design system distils them but does not duplicate every selector. Reach for the source if you need a niche component (e.g. `pain-item`, `step-item`, `differentiator-item`).
- The kiwi mascot is established but no full **mascot pose library** exists — only the single hexagonal mark.
