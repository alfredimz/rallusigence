# PLAN DE ASOMBRO — Rallusigence
## De "limpio pero plano" a demo viva de lo que la agencia puede hacer
**Fecha:** 2026-09-08 | **Autor:** agente-ixd-animaciones

> ✅ **ESTADO: EJECUTADO Y EN PRODUCCIÓN (2026-09-08)** — WOW-1 (RAL-30), WOW-2 (RAL-31) y
> el backlog viable como WOW-3 (RAL-32: shader WebGL estilo Actinver, kiwi viajero, kiwis por
> sección con la biblioteca extraída, carrusel snap de testimonios). Único descarte deliberado:
> cursor custom (sección 9, razón documentada abajo). Único pendiente real: variantes de arte
> custom del kiwi minimal (expresiones dibujadas nuevas). Detalle de implementación en las
> issues de Linear y en la memoria del proyecto.
**Referencias de clase mundial:** Perplexity Comet (orbes 3D, parallax suave), Linear (hover físico, transiciones instantáneas), Vercel (grids animados, texto con propósito)

---

## 0. Contexto técnico (leído del código, no modificado)

- **Stack:** Next.js 15 App Router, `output: 'export'` (sitio 100% estático, todo el JS corre en cliente) → cualquier librería que se instale se bundlea normal, no hay problema de SSR/edge.
- **Motion system ya existe pero infrautilizado:** `app/globals.css` define `.reveal` (opacity+translateY vía `IntersectionObserver` en `components/ScrollRevealProvider.tsx`) y tokens de motion correctos en `public/design-system/colors_and_type.css` (`--duration-fast/normal/slow/intro`, `--ease-out-cubic`, `--ease-in-out-cubic`, `--ease-bounce`). **Todas** las secciones usan la misma animación `.reveal`, sin jerarquía ni personalidad.
- **`prefers-reduced-motion` ya se respeta** en `.reveal` (globals.css:164) y en `IntroOverlay.tsx` (línea 21-25). Cualquier animación nueva debe seguir ese mismo patrón — no es opcional, es el piso de este documento.
- **La mascota (`public/assets/kiwi-icon.svg`)** es un kiwi (ave) ilustrado con paths individuales — **incluye un `<path>` de ojo separado** (líneas 7-8 del SVG, fill `#1A1414`, centro aprox. `cx=29.43 cy=16.11`, radio ~0.85 en un viewBox de 64×64). Hoy se consume vía `<Image src="/assets/kiwi-icon.svg">` en `HeroSection.tsx:41-47`, lo que la reduce a una imagen plana — **no se puede animar por partes así**. Primer requisito técnico de este plan: inlinear el SVG.
- **`ProcessSection`** ya tiene `data-theme="dark"` (línea 32) — sección con más margen para contraste dramático.
- **Landing `/auditoria-gratis`** (`app/auditoria-gratis/page.tsx`) **no tiene ninguna animación**, ni siquiera `.reveal`. Es la landing de captación de leads — más quieta que el home.
- **Ya existe un reporte previo** (`reportes/analisis-impacto-2026-07/reporte-ixd-animaciones.md`) con buenas propuestas CSS para orbes, kiwi flotante y micro-interacciones — **ninguna fue implementada aún** (verificado leyendo `HeroSection.module.css` actual: los pseudo-elementos siguen estáticos). Este plan **absorbe, corrige y eleva** esas propuestas al nivel "vender asombro" que pide Alfredo, con scrollytelling real, un WOW de mascota, transiciones de página y cursor — piezas que el reporte de julio no cubría.

---

## 1. El momento WOW del hero — kiwi como protagonista

Esta es la pieza central del plan. El kiwi deja de ser un ícono decorativo de 120px y se convierte en un personaje que **aterriza en la página cuando el usuario llega**, respira, parpadea, y reacciona al hover — la misma lógica de Freddie (Mailchimp) o el búho de Duolingo, adaptada al presupuesto de un sitio de agencia.

### Prerrequisito técnico (bloquea todo lo demás de esta sección)

Crear `components/ui/KiwiMascot.tsx` que **inlinea** el contenido de `public/assets/kiwi-icon.svg` como JSX (no como `<Image>`). Agregar `id="kiwi-eye"` al `<path>` de las líneas 7-8 del SVG original. Esto no requiere arte nuevo — el asset actual ya tiene el ojo como path independiente.

```tsx
// components/ui/KiwiMascot.tsx
'use client'
export default function KiwiMascot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Kiwi, mascota de Rallusigence">
      {/* ...pegar aquí todos los <path> del SVG original tal cual... */}
      <path id="kiwi-eye" d="M29.4255 16.9552C29.8155 16.9552 30.1316 16.5774 30.1316 16.1114C30.1316 15.6454 29.8155 15.2676 29.4255 15.2676C29.0356 15.2676 28.7195 15.6454 28.7195 16.1114C28.7195 16.5774 29.0356 16.9552 29.4255 16.9552Z" fill="#1A1414" />
      {/* resto de paths sin cambios */}
    </svg>
  )
}
```

### Secuencia WOW (al cargar, se ejecuta una sola vez, coordinada con el `IntroOverlay` existente)

| Fase | Tiempo | Qué pasa | Técnica |
|---|---|---|---|
| 1. Vuelo de entrada | 0–0.9s | El kiwi entra desde fuera del viewport (arriba-derecha) en trayectoria de arco, con rotación ligera, como si aterrizara volando (aunque el kiwi real no vuela — licencia de marca, es más divertido) | CSS `offset-path` (motion path) o keyframes `translate+rotate` combinados; `clip-path` no se usa aquí |
| 2. Aterrizaje (squash & stretch) | 0.9–1.15s | Al tocar el placeholder, se aplasta ligeramente (`scaleY(0.85) scaleX(1.08)`) y rebota a su forma normal — principio de animación clásico #1 | Keyframe con `--ease-bounce` |
| 3. Polvo de impacto | 0.95–1.4s | 5-6 partículas pequeñas (círculos teal) explotan desde la base y se desvanecen | `::before/::after` o `<span>` absolutos, `translate+opacity`, stagger 40ms |
| 4. Idle loop | 1.4s en adelante | Float vertical suave infinito + sombra que respira debajo | igual al Nivel 1 del reporte de julio (`kiwiFloat`, `kiwiShadow`) — se reutiliza tal cual |
| 5. Parpadeo aleatorio | continuo | El `<path id="kiwi-eye">` se escala a 0 en el eje Y cada 4-7s (intervalo aleatorio, no cada 4s fijo — se ve robótico si es exacto) | CSS `animation` con `animation-delay` calculado en JS por instancia, o dos `@keyframes` alternadas vía `nth-of-type` si se repite el componente |
| 6. Reacción al hover/tap | on hover | Wiggle de cabeza + ojo se agranda 1.15x (curiosidad) | reutiliza `kiwiWiggle` del reporte de julio, + transform en `#kiwi-eye` |

```css
/* KiwiMascot.module.css */
@keyframes kiwiFlyIn {
  0%   { transform: translate(140px, -90px) rotate(-25deg) scale(0.6); opacity: 0; }
  70%  { transform: translate(-8px, 6px) rotate(4deg) scale(1.04); opacity: 1; }
  100% { transform: translate(0, 0) rotate(-2deg) scale(1); }
}
@keyframes kiwiLandSquash {
  0%   { transform: scale(1, 1); }
  40%  { transform: scale(1.1, 0.82); }
  70%  { transform: scale(0.95, 1.06); }
  100% { transform: scale(1, 1); }
}
@keyframes eyeBlink {
  0%, 92%, 100% { transform: scaleY(1); }
  95%           { transform: scaleY(0.05); }
}
#kiwi-eye {
  transform-box: fill-box;
  transform-origin: center;
  animation: eyeBlink 5.5s ease-in-out infinite;
  animation-delay: 2.5s; /* arranca después del aterrizaje */
}
.kiwiWrapper {
  animation: kiwiFlyIn 0.9s var(--ease-out-cubic) 0.5s both,
             kiwiLandSquash 0.4s var(--ease-bounce) 1.3s,
             kiwiFloat 4s ease-in-out 1.8s infinite;
}
@media (prefers-reduced-motion: reduce) {
  .kiwiWrapper, #kiwi-eye { animation: none !important; opacity: 1; }
}
```

**Nota de orquestación:** esta secuencia debe correr **después** de que `IntroOverlay` termine (o en paralelo si el usuario ya vio el intro hoy — `localStorage` key `rs_intro_shown`). Delay base de 0.5s cubre ambos casos sin que se vean pisados.

**Intensidad:** WOW | **Técnica:** CSS puro (sin dependencias) | **Costo:** 4h (incluye inlinear SVG + partículas + blink) | **Riesgo de performance:** bajo — todo es `transform`/`opacity` sobre un solo elemento SVG pequeño, compositor-only.

---

## 2. Hero — el resto de la escena

| Efecto | Qué se mueve / cuándo | Técnica | Intensidad | Costo | Riesgo perf. |
|---|---|---|---|---|---|
| Orbes 3D con luz incidente | Los dos pseudo-elementos `::before/::after` de `.hero` (hoy estáticos) flotan y pulsan con capas de `radial-gradient` offset simulando luz | CSS `@keyframes` (spec completa ya en `reportes/.../reporte-ixd-animaciones.md` sección 2, reutilizar tal cual) | Media-Wow | 2h | Bajo (`will-change` solo en estos 2 elementos) |
| Titular con reveal por palabra | `.h1` entra con blur+skew que se resuelve, palabra por palabra si se separa en `<span>`s, o como bloque si no se quiere tocar el copy | CSS `@keyframes` con `filter: blur()` (spec en reporte julio sección 3) | Media | 1.5h | Bajo — `filter: blur()` solo en 1 elemento, no en listas |
| Grano/textura de fondo | Overlay sutil de ruido (`feTurbulence` SVG como `background-image` en `body::after`, opacity 0.025, `mix-blend-mode: overlay`) — detalle que da profundidad "premium" tipo Vercel/Linear sin animar nada | CSS puro, estático | Sutil | 0.5h | Nulo (no anima, solo composita una vez) |
| Parallax de orbes al scroll | Los orbes se desplazan a distinta velocidad que el contenido en los primeros 40% del hero | CSS `animation-timeline: scroll(root block)` con `@supports` fallback a estático | Media | 1h | Bajo, con fallback seguro en Safari <18 |
| Botones magnéticos | CTAs primario/ghost del hero se desplazan 4-8px hacia el cursor cuando está cerca (radio ~60px) | JS: `mousemove` con `requestAnimationFrame`, mutando `transform` directo vía `ref.style` (**nunca** `setState` en cada mousemove — ver sección 8) | Wow | 1.5h | Medio si se implementa mal; bajo si se sigue el patrón de la sección 8 |

---

## 3. Dolor (`PainSection.tsx`)

Hoy: 3 items con ícono + texto, entran con `.reveal` genérico y delays 1/2/3.

| Efecto | Qué se mueve / cuándo | Técnica | Intensidad | Costo | Riesgo perf. |
|---|---|---|---|---|---|
| Ícono con "sacudida de alerta" al entrar | Cada `pain-item` al hacerse visible, su ícono (`NoGoogleIcon`, `BrokenMobileIcon`, `ClockIcon`) tiembla brevemente (`translateX` ±2px, 3 ciclos) y su color pasa de gris a un tinte rojo/naranja momentáneo antes de asentarse en el color final — refuerza la sensación de "problema" | `@keyframes` combinando `transform` + `color`, disparado por la clase `.visible` que ya agrega el `IntersectionObserver` existente | Media | 1h | Bajo |
| Título con wipe de máscara | El `h2` de la sección revela con `clip-path: inset()` de arriba hacia abajo en vez del fade genérico — primera sección donde el usuario nota que "esto no es igual que las demás" | CSS `clip-path` transition | Media | 0.75h | Bajo (`clip-path` es compositor-friendly, verificado en Safari) |
| Línea divisoria que crece | El borde inferior de cada `.pain-item` (ya existe, `border-bottom`) se dibuja de izquierda a derecha al entrar en vez de aparecer de golpe | pseudo-elemento con `scaleX(0→1)`, `transform-origin: left` | Sutil | 0.5h | Nulo |

**Nota:** se descarta para Sprint 1 un "kiwi triste" asomándose en esta sección — requiere una variante de arte nueva (expresión facial distinta) que no existe hoy. Queda en backlog (sección 10).

---

## 4. Paquetes (`PackagesSection.tsx` / `ServiceCard.tsx`)

Hoy: grid de 3 `ServiceCard`, la featured tiene fondo degradado. Hover ya mueve `translateY(-4px)`.

| Efecto | Qué se mueve / cuándo | Técnica | Intensidad | Costo | Riesgo perf. |
|---|---|---|---|---|---|
| Tilt 3D al cursor | Cada card rota sutilmente en `rotateX/rotateY` (máx. 6°) siguiendo la posición del mouse dentro de la tarjeta — efecto Stripe/Linear pricing | JS: `mousemove` sobre la card → actualiza `--rx`/`--ry` (custom properties) vía `ref.style.setProperty`, CSS aplica `transform: perspective(900px) rotateX(var(--ry)) rotateY(var(--rx))` | Wow | 2.5h | Medio — **solo activar en `@media (pointer: fine)`**, desactivar en touch/coarse por completo (no solo ocultar, remover el listener) |
| Brillo que recorre la card | Barrido diagonal de luz (`::before` con gradiente, `left: -100%→100%`) al hover — spec ya en reporte julio sección 3 (`service-card::before`) | CSS `transition: left` | Media | 0.5h | Bajo |
| Glow pulsante en la featured | La card "Profesional" (destacada) respira con `box-shadow` — spec ya en reporte julio sección 7 (`featuredGlow`) | CSS `@keyframes` | Media | 0.25h | Bajo — 1 solo elemento, pausa en hover |
| Precio con conteo ascendente | El `price-tag` cuenta desde $0 hasta el precio final ($6,000 / $12,000 / $20,000) cuando la card entra en viewport — efecto "odómetro" | JS ligero: `requestAnimationFrame` interpolando el número (no CSS `@property` puro por soporte inconsistente en Safari/Firefox) | Wow | 1.5h | Bajo (una sola vez por card, no continuo) |
| Entrada escalonada con blur | Reemplaza el `.reveal` genérico por la spec `cardEnter` del reporte julio (scale+blur, stagger 0/0.15/0.30s) | CSS `@keyframes` | Media | 0.5h | Bajo |

---

## 5. Proceso (`ProcessSection.tsx`, `data-theme="dark"`)

Esta sección es la de mayor potencial de scrollytelling: 4 pasos numerados en fondo oscuro — el contraste ya está listo para algo dramático.

| Efecto | Qué se mueve / cuándo | Técnica | Intensidad | Costo | Riesgo perf. |
|---|---|---|---|---|---|
| Línea conectora que se dibuja con el scroll | Una línea vertical (gradiente teal→sky) conecta los 4 números y **crece exactamente al ritmo del scroll** mientras la sección está en viewport, no de golpe | **GSAP ScrollTrigger** con `scrub: true` (proyecto ya es Next.js/React → cumple la excepción de usar GSAP; da control preciso cross-browser que el `animation-timeline: view()` de CSS aún no garantiza en Safari) | Wow | 2h (con GSAP) | Bajo si se anima solo `scaleY`/`transform` del elemento conector — **nunca** animar `height` |
| Número activo se ilumina | El círculo del paso que está centrado en viewport (`ScrollTrigger` con `toggleClass` o `IntersectionObserver` con `threshold:0.5`) se escala 1.15x y gana un anillo de glow; los demás bajan opacidad a 0.5 | ScrollTrigger `onEnter/onLeave` o IO existente extendido | Media-Wow | 1.5h | Bajo |
| Tiempo estimado con typewriter | El `<span>` de tiempo (`< 2 horas`, `mismo día`, etc.) se revela letra por letra cuando el paso se activa — refuerza la sensación de "esto es rápido" | CSS `steps()` sobre `width` con `overflow:hidden`, o JS simple con `setInterval` corto | Sutil | 0.75h | Bajo (texto corto, `width` en 1 elemento pequeño, no en listas) |

**Instalación GSAP:** `npm install gsap`. Se usa **solo** en este componente vía import dinámico (`next/dynamic` con `ssr:false` ya que el componente es `'use client'`), para no inflar el bundle de páginas que no lo necesitan. Costo de bundle: ~28KB gzip para core+ScrollTrigger.

---

## 6. Diferenciadores (`DiffSection.tsx`)

Hoy: título+tagline a la izquierda (`reveal--left`), 3 checks a la derecha.

| Efecto | Qué se mueve / cuándo | Técnica | Intensidad | Costo | Riesgo perf. |
|---|---|---|---|---|---|
| Checkmarks con bounce-draw | Cada `differentiator-item__check` aparece con rotación+scale bounce en vez de fade — spec ya en reporte julio sección 8 (`checkmarkDraw`) | CSS `@keyframes` | Media | 0.5h | Bajo |
| Panel de título sticky | En desktop (`min-width: 1024px`), el bloque de título (`.titleWrap`) queda fijo (`position: sticky; top: 120px`) mientras la lista de diferenciadores hace scroll a su lado — misma idea de comparativa que usan Linear/Stripe en feature lists | CSS `position: sticky` dentro del grid existente (`.inner`) | Media | 1h | Nulo (sticky no dispara reflow continuo) |

---

## 7. Testimonios (`TestimonialsSection.tsx` / `TestimonialCard.tsx`)

Hoy: grid estático de 3 cards, sin carrusel.

| Efecto | Qué se mueve / cuándo | Técnica | Intensidad | Costo | Riesgo perf. |
|---|---|---|---|---|---|
| Comillas decorativas animadas | Un carácter `"` grande (Playfair Display) en cada card gira ligeramente y se escala al entrar, con delay respecto al resto del texto de la card | CSS `@keyframes` simple | Sutil | 0.5h | Nulo |
| Highlight sweep en la frase destacada | La cita (`quote`) recibe un barrido de gradiente de fondo (`background-position` animado, texto con `background-clip:text`) una sola vez cuando entra en viewport | CSS `@keyframes background-position` | Media | 0.75h | Bajo (1 pase, no infinito) |
| Entrada con scale+blur | Reemplaza `.reveal` genérico por la misma familia `cardEnter` usada en paquetes, para consistencia de "familia de movimiento" | CSS | Media | 0.25h | Bajo |

**Backlog (no Sprint 1):** convertir el grid en carrusel con swipe táctil en mobile — hoy no existe estructura de carrusel, requeriría refactor de `TestimonialsSection.tsx` con lógica de índice/touch, no es solo CSS. Ver sección 10.

---

## 8. Contacto (`ContactSection.tsx`) y Landing Auditoría (`app/auditoria-gratis/page.tsx`)

`ContactSection` ya tiene estados `idle/loading/success/error` en React — son ganchos perfectos para animación dirigida por estado, no hay que inventar nada nuevo del lado de lógica.

| Efecto | Qué se mueve / cuándo | Técnica | Intensidad | Costo | Riesgo perf. |
|---|---|---|---|---|---|
| Botón submit que muta forma | En `loading`, el botón `rs-btn--full` se contrae a un círculo con spinner; en `success`, el spinner se convierte en check animado (`stroke-dashoffset`) | CSS `transition` sobre `width`/`border-radius` del botón (acotado, un solo elemento, aceptable) + SVG check con `stroke-dasharray` | Wow | 2h | Bajo — 1 elemento, no continuo |
| Confeti mínimo en éxito | 10-12 partículas de color marca (teal, sky, dorado del kiwi) explotan desde el botón al confirmarse el envío | `<span>`s absolutos generados una vez, `translate+rotate+opacity`, `animation-fill-mode: forwards`, se desmontan del DOM tras 900ms | Media | 1h | Bajo (elementos efímeros, se remueven) |
| Shake en error de campo | Ya existe la clase `.input-field--error` (globals.css:73) — agregar `inputShake` (spec en fase-4/animaciones-componentes.md, ya escrita, solo falta aplicarla) | CSS `@keyframes` | Sutil | 0.25h | Nulo |
| WhatsApp CTA con pulso de urgencia | El link de WhatsApp en `.alt` pulsa suavemente para atraer el ojo como alternativa al form | Spec ya en reporte julio sección 7 (`whatsappPulse`) | Media | 0.25h | Bajo |
| **Landing `/auditoria-gratis`:** checklist que se "audita" solo | Los 3 `.benefit` (con `CheckCircle`) se marcan en secuencia al cargar la página, como si una auditoría estuviera corriendo en vivo — coherente con la promesa de la página | CSS `@keyframes` stagger (0/0.3/0.6s) sobre ícono+texto, **primera animación real que tendría esta landing** (hoy no tiene ninguna) | Media-Wow | 1h | Nulo |
| **Landing `/auditoria-gratis`:** línea de escaneo | Una línea horizontal de luz (gradiente teal, `box-shadow` suave) cruza verticalmente detrás del hero una sola vez al cargar, reforzando "te estamos escaneando" | CSS `@keyframes translateY` sobre pseudo-elemento absoluto | Media | 0.75h | Bajo |
| Mismo tratamiento de `ContactSection` en `AuditoriaForm.tsx` | Reusar botón-mutante + shake + éxito | CSS compartido | Media | incluido arriba | — |

---

## 9. Micro-interacciones globales, transiciones de página y cursor

### Botones (aplica a `.rs-btn` en `globals.css`)
- **Fix urgente primero:** `transition: all 0.2s ease-in-out` (globals.css:36) dispara transiciones sobre propiedades que fuerzan layout. Cambiar a lista explícita (`background-color, transform, box-shadow`) — **este fix es gratis y debe ir antes que cualquier animación nueva** (ya documentado en reporte julio sección 1 y 7).
- Hover: `translateY(-2px) scale(1.01)` + sombra creciente (spec julio sección 7).
- Active: `translateY(1px) scale(0.99)`, `transition-duration: 0.08s` — feedback táctil inmediato tipo Linear.
- Magnético en CTAs de hero y contacto (ver sección 2).

### Cards (aplica a `.service-card`, `.testimonial-card`, `ServiceCard.tsx`)
- Shine sweep + tilt 3D ya cubiertos en sección 4.
- Focus-visible con anillo animado (no solo `outline` estático) para que el teclado también se sienta premium: `box-shadow` que crece con `--ease-bounce` al recibir foco.

### Formularios (`FormField.tsx`, `.input-field`)
- Foco con glow (ya en reporte julio "input-field:focus con glow", código existe en `fase-4-design-system/animaciones-componentes.md` sección 9 — solo aplicar).
- Shake en error, check en éxito — sección 8.

### Transiciones de página (entre `/`, `/paquetes`, `/como-funciona`, `/portafolio`, `/auditoria-gratis`)
Next.js 15 App Router + navegación client-side ya disponible. Propuesta: interceptar clicks de `<Link>`/`<a>` internos y envolver la navegación con **View Transitions API** nativa:

```ts
// lib/pageTransition.ts
export function navigateWithTransition(router: AppRouterInstance, href: string) {
  if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    router.push(href)
    return
  }
  document.startViewTransition(() => {
    router.push(href)
  })
}
```

```css
/* globals.css */
::view-transition-old(root) { animation: fadeOut 0.25s ease-in forwards; }
::view-transition-new(root) { animation: fadeIn 0.3s var(--ease-out-cubic) 0.05s backwards; }
@keyframes fadeOut { to { opacity: 0; transform: scale(0.99); } }
@keyframes fadeIn  { from { opacity: 0; transform: scale(1.01); } }
```

**Feature-detected**: en navegadores sin soporte (Firefox, Safari <18 en el momento de escribir esto) simplemente no pasa nada — la navegación normal de Next sigue funcionando, cero riesgo de romper nada. **Intensidad:** Media | **Costo:** 2h | **Riesgo:** nulo (degrada con gracia).

### Cursor personalizado (propuesta, no urgente)
Un punto teal de 8px que se agranda a anillo de 32px sobre elementos interactivos, con `mix-blend-mode: difference`. **Se recomienda backlog, no Sprint 1**: para una audiencia de PyMEs mexicanas evaluando un proveedor de sitios web (no un producto SaaS de developers), el cursor custom es el efecto con menor relación "impacto en la decisión de compra" vs. "riesgo de sentirse gimmick o romper accesibilidad si no se implementa con cuidado" (debe respetar `pointer:fine`, ocultarse en touch, y nunca reemplazar el cursor del sistema en inputs de texto). Ver sección 10.

### Detalle de personalidad barato
- **Favicon/título de pestaña reactivo:** al cambiar de pestaña (`visibilitychange`), el `<title>` cambia a "¡Vuelve! 🥝" o similar por 2 segundos al regresar. Costo 0.25h, riesgo cero, refuerza mascota.
- **Grano de fondo global** (sección 2) aplicado a `body`, no solo al hero — coherencia de textura en todo el sitio.

---

## 10. Presupuesto de performance y accesibilidad (no negociable)

Regla aplicada a **cada** ítem de este documento:

1. **Solo `transform` y `opacity`** para cualquier animación que corra en scroll o en loop continuo (kiwi, orbes, glow featured, WhatsApp pulse). Excepciones puntuales y justificadas: `box-shadow`/`background-position`/`clip-path` en elementos únicos, no en listas, no en scroll continuo.
2. **`prefers-reduced-motion: reduce`** desactiva: vuelo del kiwi (aparece ya posado, sin blink), float de orbes, parallax, tilt 3D, botones magnéticos, cursor custom, transiciones de página (navegación instantánea), scanline de la landing de auditoría. Se mantiene únicamente fade simple donde ya existe.
3. **Cualquier listener de `mousemove`** (magnético, tilt 3D, cursor) debe:
   - Usar `requestAnimationFrame` para throttle, nunca ejecutar lógica pesada por evento crudo.
   - Mutar `style`/custom properties directo vía `ref`, **nunca** `setState` de React en cada movimiento — esto es lo que rompe el presupuesto de INP <200ms (ver `SEO-SEM.md`).
   - Activarse solo bajo `@media (pointer: fine)` y removerse (no solo ocultarse) en dispositivos táctiles.
4. **GSAP ScrollTrigger** (único uso: conector de `ProcessSection`) se carga vía import dinámico, no en el bundle global.
5. **`will-change`** solo en los elementos que animan permanentemente (orbes, kiwi idle) — nunca aplicado de forma global o a listas de cards.
6. Todas las animaciones de entrada (`.reveal` y sus reemplazos) siguen usando el `IntersectionObserver` ya existente en `ScrollRevealProvider.tsx` — no se introduce una segunda librería de scroll-detection para eso.

---

## 11. Roadmap

### Sprint WOW-1 — máximo impacto, sin dependencias nuevas, sin arte nuevo (~16.5h)

El sprint que Alfredo puede aprobar y ver en producción en una semana. Todo es CSS + JS vainilla, reutiliza el asset del kiwi tal cual existe.

| # | Tarea | Sección | Costo | WOW |
|---|---|---|---|---|
| 1 | Fix `transition: all` en `.rs-btn`/`.input-field` (correctivo, habilita todo lo demás) | 9 | 0.5h | — |
| 2 | Inlinear `KiwiMascot.tsx` + secuencia de entrada/aterrizaje/idle/blink | 1 | 4h | 10 |
| 3 | Orbes 3D animados en hero | 2 | 2h | 9 |
| 4 | Hero entrance orquestada (título+subtítulo+CTAs) | 2 | 1.5h | 8 |
| 5 | Botones magnéticos en CTAs del hero | 2 | 1.5h | 8 |
| 6 | Featured card glow + shine sweep + entrada escalonada blur | 4 | 1.25h | 7 |
| 7 | Checklist con "sacudida de alerta" en `PainSection` | 3 | 1h | 6 |
| 8 | Checkmarks bounce-draw en `DiffSection` | 6 | 0.5h | 6 |
| 9 | Botón submit mutante + confeti + shake en `ContactSection` | 8 | 3h | 9 |
| 10 | Checklist "auditando en vivo" en landing `/auditoria-gratis` (única animación que tendrá esa página) | 8 | 1h | 7 |
| 11 | Extender `reveal--delay-4/5/6` (fix del cuarto step de `ProcessSection` que hoy no anima) | correctivo | 0.25h | — |

### Sprint WOW-2 — scrollytelling con GSAP + transiciones (~9h, requiere `npm install gsap`)

| Tarea | Sección | Costo |
|---|---|---|
| Conector de línea de tiempo con scroll-scrub en `ProcessSection` | 5 | 2h |
| Número activo iluminado en `ProcessSection` | 5 | 1.5h |
| Grano/textura global + parallax de orbes scroll-driven | 2, 9 | 1.5h |
| Tilt 3D en `ServiceCard` | 4 | 2.5h |
| Transiciones de página con View Transitions API | 9 | 2h |
| Precio con conteo ascendente en paquetes | 4 | 1.5h |

### Backlog — requiere arte nuevo, refactor mayor, o es de menor ROI para esta audiencia

| Tarea | Por qué no es Sprint 1/2 |
|---|---|
| Kiwi con expresiones por sección (triste en dolor, celebrando en paquetes) | Requiere variantes de arte nuevas del ilustrador — hoy solo existe 1 pose |
| Kiwi viajero que sigue el scroll por el margen de la página | Requiere asset de silueta simplificada + `offset-path` complejo — alto costo, alto WOW, pero no imprescindible para el impacto inicial |
| Carrusel táctil en `TestimonialsSection` | Hoy es un grid estático sin lógica de índice — es refactor de componente, no solo animación |
| Cursor personalizado global | Riesgo de sentirse gimmick para audiencia PyME MX + complejidad de accesibilidad; bajo ROI relativo vs. sprint 1 |
| Audio en `IntroOverlay` | El doc antiguo `fase-4-design-system/animaciones-componentes.md` lo proponía — **no recomendado**: autoplay con audio es fricción/spam para el usuario y no aporta a la decisión de compra de un sitio web profesional |

---

## 12. Resumen para Alfredo

**El problema no es falta de tokens ni de sistema — es que todo usa la misma animación `.reveal` y el elemento con más personalidad de marca (el kiwi) está congelado en un placeholder.** Con ~16.5 horas de CSS/JS vainilla, sin instalar una sola dependencia, el hero pasa de "blanco plano" a tener un momento de entrada memorable (el kiwi aterrizando), botones que responden como físicos, y un formulario de contacto que celebra cuando el usuario completa la conversión. GSAP entra solo para una pieza (el scrollytelling del proceso) donde CSS puro todavía no da control confiable cross-browser — exactamente como indica el stack de referencia de este agente: CSS primero, JS solo donde CSS no alcanza.
