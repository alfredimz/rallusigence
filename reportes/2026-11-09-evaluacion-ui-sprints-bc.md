# Evaluación UI tras Sprints B y C — rallusigence.net (build local)
Fecha: 2026-11-09 | Vara: `docs/vara-no-parecer-ia.md` | Material: capturas qa8 (home, paquetes, servicios, como-funciona, portafolio; desktop y móvil) + código.
Base de código: `E:\AlfreditosDrive\Proyectos\clientes\rallusigence\rallusigence\desarrollo\rallusigence-web\` (abreviado `web/`).

## Lectura general (honesta)
La home salió de la plantilla: el hero (Playfair itálica, "3 días" en verde, demo real Dalel Bistro en laptop + teléfono con kiwi asomado) y la sección de problemas asimétrica con kiwi grande son una idea propia. Paquetes escalonados, proceso oscuro con kiwi por paso y testimonios con kiwis también funcionan. **El problema: el Sprint B/C se hizo en la home y las páginas interiores quedaron en la era anterior**: h1 en Montserrat negrita sin momento tipográfico, emojis, rejilla 3+2 de tarjetas idénticas, bloques centrados. Quien entre por /servicios, /como-funciona o /paquetes ve una plantilla competente; quien entra por la home ve una marca. Esa costura es el hallazgo principal.

## 1. Hallazgos (ordenados por peso)

### [Sección: Páginas interiores] H1 sin display propio: la identidad tipográfica sólo existe en la home
**Problema:** `.rs-h1` usa `--font-primary` (Montserrat bold) en `web/app/globals.css:13`; sólo `.rs-h2` usa el display (`globals.css:14`). /servicios ("Servicios"), /paquetes, /como-funciona y /portafolio abren con H1 sans genérico, mientras la home abre con Playfair itálica. Es la señal "tipografía por defecto / sin momento tipográfico grande por página" en 4 de 5 páginas revisadas. /servicios abre con una palabra y un subtítulo gris: nada memorable.
**Impacto:** Alto — Diseño ≤ 5 en cualquier entrada que no sea la home.
**Referencia:** Studio Freight / Locomotive: el display se reserva para el H1 de cada página, con una palabra en itálica o color de marca (el "3 días" verde del hero ya es ese gesto).
**Persuasión:** Cialdini (consistencia/autoridad); Fogg (motivación): sensación de oficio en toda la marca.
**Propuesta:** Pasar `.rs-h1` a `--font-elegant` (Playfair 700, `<em>` itálica) con escala fluida `clamp(44px, 7vw, 96px)` en páginas interiores; una palabra clave por H1 en `--color-primary` itálica ("Servicios que *quedan tuyos*", "Elige tu paquete. *Precio fijo.*"). Subtítulo 1.25rem, max-width 52ch.
**Archivos afectados:** `web/app/globals.css:13`, `web/app/(site)/servicios/page.tsx`, `paquetes/page.tsx`, `como-funciona/page.tsx`, `portafolio/page.tsx` y sus `page.module.css`.

### [Sección: /servicios] Rejilla 3+2 de tarjetas idénticas con hueco vacío
**Problema:** `web/app/(site)/servicios/page.module.css:27` `repeat(3, 1fr)`: cinco tarjetas blancas del mismo tamaño, radio y sombra; la 6.ª celda queda vacía (captura desktop). Kiwis buenos (lupa, bolsas, megáfono) atrapados en un molde de SaaS. Literalmente "3 tarjetas idénticas repetidas".
**Impacto:** Alto — es la página que explica la oferta y se ve como cualquier plantilla.
**Referencia:** índices de servicios de agencias en Siteinspire/Godly: lista editorial numerada a ancho completo, una fila por servicio (número grande, título display, precio mono a la derecha, ilustración que asoma al borde).
**Persuasión:** Fogg (habilidad): escaneo vertical más rápido; Cialdini (autoridad) con precio publicado visible.
**Propuesta:** Reemplazar la rejilla por filas de 120-160px con `border-top` hairline: `01` en mono, título Playfair 40px, descripción de una línea, precio mono a la derecha, kiwi a ~140px saliendo del borde derecho (sin tarjeta). Una fila (SEO o Tienda) a doble altura como destacada. Si se conserva rejilla: 12 columnas con spans 7/5 y 5/7 alternados.
**Archivos afectados:** `web/app/(site)/servicios/page.tsx`, `page.module.css:27,92,96`, `web/components/ui/ServiceCard.tsx`.

### [Sección: /como-funciona] Página entera en el molde anterior: emojis, centrado, sin kiwis
**Problema:** Emojis del sistema como íconos (`web/app/(site)/como-funciona/page.tsx:59,73,87,102`: 📱💳⚙️🚀) cuando el proceso ya tiene 4 kiwis ilustrados en la home (ProcessSection). 5 `text-align:center` (`page.module.css:42,114,142,184,229`), lista de 4 pasos de cobro en barras grises idénticas, chips de bancos centrados, CTA verde genérico. Es la versión plantilla de lo que la home ya resolvió.
**Impacto:** Alto — emojis de SO + centrado se leen como IA/plantilla al instante.
**Referencia:** la propia ProcessSection de la home; Linear changelog para listas de pasos.
**Persuasión:** Fogg (motivación) y Cialdini (consistencia/transparencia): el proceso es el argumento de confianza principal y aquí es la sección más pobre.
**Propuesta:** Reutilizar `ProcessSection` (mismos 4 kiwis) como cuerpo; quitar emojis (chips con texto mono como en la home); "Cómo cobramos" alineado a la izquierda en 2 columnas (texto 5fr / pasos numerados 7fr con hairlines, no barras); bancos como texto corrido en mono; H1 alineado a la izquierda.
**Archivos afectados:** `web/app/(site)/como-funciona/page.tsx:59-102`, `page.module.css:42,114,142,184,229`, `web/components/sections/ProcessSection.tsx`.

### [Sección: Home / Problemas] Columna izquierda vacía: el kiwi flota lejos del título
**Problema:** En desktop, "EL PROBLEMA" queda arriba a la izquierda y el kiwi con megáfono aparece abajo con ~200px de vacío entre ambos; en móvil hay un hueco de ~250px sobre el kiwi. Se lee como contenido que no cargó, no como asimetría intencional. Tampoco hay titular grande: la sección más emocional no tiene momento tipográfico.
**Impacto:** Medio-Alto — la segunda pantalla pierde fuerza justo tras un hero fuerte.
**Referencia:** Stripe Press / Basecamp: titular display enorme en la columna estrecha (sticky) con la ilustración anclada a él.
**Persuasión:** Cialdini (aversión a la pérdida) / Fogg (motivación): los dolores necesitan un titular que lo diga.
**Propuesta:** H2 Playfair 56-72px sticky (`top: 120px`) en la columna izquierda y el kiwi explorador justo debajo (gap 32px). En móvil: H2, kiwi a 140px, lista; quitar el padding extra.
**Archivos afectados:** `web/components/sections/PainSection.tsx`, `PainSection.module.css:8` (grid 5fr/7fr) y alineación de la columna.

### [Sección: Movimiento] Una sola curva declarada, pero quedan rebotes, `transition: all` y otras curvas
**Problema:** El Sprint C afirma una curva única; el código dice otra cosa: `web/components/ui/KiwiMascot.module.css:19` usa `--ease-bounce` (`landSquash`); `web/components/ui/Magnetic.tsx:37` usa `cubic-bezier(0.34,1.56,0.64,1)` (overshoot) en el CTA del hero; `web/components/sections/IntroOverlay.module.css:29,63` usa `0.16,1,0.3,1` (otra curva) y `:84` `ease`, los tres con `transition: all`; `web/app/globals.css:172` usa `ease-in-out`; `web/app/design-system/tokens.css:163-164` deja `--ease-in-out-cubic` y `--ease-bounce` disponibles para reintroducirse.
**Impacto:** Medio — el usuario no cuenta curvas, pero sí ve el resorte del CTA y del kiwi, que contradicen el tono sobrio.
**Referencia:** Linear / Vercel: una curva, sin overshoot en controles.
**Persuasión:** Cialdini (consistencia); Fogg (prompt): el CTA no debe "bailar".
**Propuesta:** Cambiar Magnetic a `var(--ease-signature)`; KiwiMascot `landSquash` a `--ease-signature` y squash ≤ 4%; reemplazar `transition: all` por propiedades explícitas; borrar `--ease-bounce` y `--ease-in-out-cubic` de tokens; globals.css:172 a `--ease-signature`.
**Archivos afectados:** `web/components/ui/KiwiMascot.module.css:19`, `web/components/ui/Magnetic.tsx:37`, `web/components/sections/IntroOverlay.module.css:29,63,84`, `web/app/globals.css:172`, `web/app/design-system/tokens.css:163-164`.

### [Sección: Home / Comparativa] Título ausente en la captura y tabla de 5 columnas sin jerarquía
**Problema:** En la captura full-page la comparativa arranca con un párrafo suelto ("3 días, no 30…"): el `<h2 className="rs-h2 reveal reveal--wipe">` (`web/components/sections/ComparativaSection.tsx:11`) no aparece. O el wipe no se disparó en la captura, o su estado final queda oculto sin observer; hay que verificarlo en navegador real y con `prefers-reduced-motion`. Si es lo segundo, es un bug de contenido. Aparte, la tabla (8 filas x 5 columnas) pesa igual en casi todas las celdas; se lee como comparativa estándar de SaaS.
**Impacto:** Medio — es el argumento de venta (precio y propiedad frente a agencia y Wix) y llega sin titular.
**Referencia:** páginas "vs" de Cal.com / Plausible: 3-4 filas clave en tipografía grande, el resto plegado.
**Persuasión:** Cialdini (contraste/honestidad); Fogg (habilidad): menos celdas que leer.
**Propuesta:** 1) Garantizar estado final visible del wipe sin JS y con reduced-motion. 2) Mostrar 4 filas (Precio, Entrega, Dueño del dominio, Mensualidades) con cifras en mono 20px y las 4 restantes tras "Ver comparación completa". 3) Marcar la columna Rallusigence con filete verde de 3px y kiwi pequeño en cabecera en vez de tinte aqua. Revisar en móvil (5 columnas).
**Archivos afectados:** `web/components/sections/ComparativaSection.tsx:11`, `ComparativaSection.module.css`, `web/app/globals.css` (regla `.reveal--wipe`).

### [Sección: Prueba social] Miniaturas vacías en paquetes y testimonios en tarjetas iguales
**Problema:** En /paquetes el carrusel de demos muestra miniaturas en blanco (Invitación Digital XV Años y Clínica Veterinaria, captura desktop): carga diferida no resuelta o falta de placeholder; si ocurre en navegador real, es prueba social rota. En la home, los testimonios son 8 tarjetas del mismo tamaño y estilo en 2 columnas; los 18 kiwis ayudan, pero la repetición de la caja con comillas ya es "testimonios de plantilla". "66 negocios atendidos" va en gris 14px, casi invisible.
**Impacto:** Medio.
**Referencia:** Pitch / Notion customers: una cita larga a tamaño display y el resto en lista compacta; cifras en mono grande.
**Persuasión:** Cialdini (prueba social, autoridad); Fogg (motivación).
**Propuesta:** Verificar miniaturas (color sólido + `aspect-ratio` fijo como placeholder). Testimonios: 1 cita destacada a 28px Playfair con kiwi grande y ficha del negocio + 4 citas cortas en lista sin caja. Subir "66 negocios atendidos" a cifra mono 40px con enlace a portafolio como fuente.
**Archivos afectados:** `web/components/sections/TestimonialsSection.tsx`, `web/components/ui/TestimonialCard.module.css`, `web/components/sections/HeroSection.tsx` (línea de cifras), `web/components/sections/DemosTeaser.tsx`.

### [Sección: Ritmo y alineación global] 24 `text-align:center` en CSS, concentrados fuera de la home
**Problema:** Ver lista en sección 3. La home casi no centra nada (sólo Contact e Intro), pero fuera de ella ~20 reglas centran títulos y bloques, rompiendo la lectura editorial. El ritmo variable 56/80/120 sólo existe en la home; las interiores usan padding uniforme.
**Impacto:** Medio.
**Referencia:** agencias en Awwwards 2025-26: alineación izquierda con rejilla de 12 y desplazamientos deliberados.
**Persuasión:** Fogg (habilidad): escaneo en F; Cialdini (consistencia).
**Propuesta:** Dejar centrados sólo `not-found`, `gracias`, intro y CTA final; el resto a la izquierda en rejilla de 12; tokens `--space-section-sm/md/lg` (56/80/120) aplicados en todas las páginas.
**Archivos afectados:** ver sección 3.

## 2. Puntuación (rúbrica Awwwards)

| Criterio | Peso | Nota 0-10 | Por qué |
|---|---|---|---|
| Diseño | 40 % | 6.0 | Home ~7.5: hero editorial con display propio y demo real, problemas asimétricas, paquetes escalonados, proceso oscuro con kiwi por paso. Interiores ~4.5: H1 sans, emojis, 3+2 de tarjetas iguales, centrado. Se puntúa el sitio, no sólo la home. |
| Usabilidad | 30 % | 7.0 | Navegación clara, CTA consistente, precios visibles, FAQ simple, móvil limpio. Restan: miniaturas vacías del carrusel, huecos del bloque de problemas en móvil, comparativa de 5 columnas y wipe sin garantía de estado final visible. |
| Creatividad | 20 % | 6.5 | Idea propia real: el kiwi como actor (explorador, por dolor, por paso, por servicio, 18 avatares). Se queda en ilustración colocada; no hay un momento interactivo o narrativo que sólo este sitio haga. |
| Contenido | 10 % | 7.0 | Precios publicados, plazos, comparativa con nota de método, testimonios con nombre y negocio, "Demo real" con nombre. Faltan fuentes verificables de "66 negocios" y "80 % desde celular"; títulos como "Servicios" son planos. |
| **Ponderado** | | **6.5** | 2.40 + 2.10 + 1.30 + 0.70 = 6.50. En el límite de la meta (>= 6.5), sin margen. No enviar a premios hasta cerrar los hallazgos 1-3. |

## 3. Señales de IA encontradas: 8 (0 en el primer pantallazo de la home; 2-3 en el primer pantallazo de interiores)

Resueltas respecto a la checklist: sin orbes ni shader en el hero, sin glow/pulso, hero con display propio, ilustración propia en vez de íconos de librería en las secciones clave, copy concreto.

1. **Todo centrado fuera de la home**: 24 `text-align:center` (+ utilidad `.text-center` en `web/app/globals.css:178`). Desglose: `app/(site)/como-funciona/page.module.css:42,114,142,184,229`; `app/(site)/servicios/[slug]/page.module.css:14,88,118,180,238`; `app/(site)/blog/page.module.css:22,30,35`; `app/(site)/blog/[slug]/page.module.css:50,181,217`; `app/auditoria-gratis/page.module.css:17,66`; `app/auditoria-gratis/layout.module.css:82`; `app/(site)/gracias/page.module.css:19`; `app/not-found.module.css:20`; `components/sections/ContactSection.module.css:56`; `components/sections/IntroOverlay.module.css:18`; `components/ui/AuditoriaForm.module.css:22`. Supera el umbral de 12; sólo ~5 son legítimos.
2. **Rejilla de tarjetas idénticas**: `app/(site)/servicios/page.module.css:27`.
3. **Tipografía por defecto en títulos**: `app/globals.css:13` (`.rs-h1` en `--font-primary`).
4. **Emojis como íconos**: `app/(site)/como-funciona/page.tsx:59,73,87,102`.
5. **Íconos de librería donde hay kiwis** (menor): `lucide-react` en `app/(site)/servicios/[slug]/page.tsx:1`, `components/ui/ServiceCard.tsx:4` (Check, aceptable) y `app/auditoria-gratis/page.tsx:1` (`CheckCircle`, candidato a kiwi). `Header.tsx:6` (Menu/X) es funcional.
6. **`transition: all`**: `components/sections/IntroOverlay.module.css:29,63,84`.
7. **Bounce / overshoot**: `components/ui/KiwiMascot.module.css:19`, `components/ui/Magnetic.tsx:37`; token vivo en `app/design-system/tokens.css:164`.
8. **Curvas fuera de la marca**: `IntroOverlay.module.css:29,63` (`0.16,1,0.3,1`), `:84` (`ease`), `app/globals.css:172` (`ease-in-out`), `tokens.css:163`. Además `components/ui/HeroShader.tsx` y `HeroShader.module.css` siguen en el repo: confirmar que no se importan y borrarlos para que nadie reactive el shader.

A vigilar: `backdrop-filter: blur(8px)` en `components/layout/Header.module.css:74` y `globals.css:172` (funcional, aceptable). El orden de la home (hero, garantías, problemas, paquetes, proceso, comparativa, testimonios, demos, contacto) es el de cualquier plantilla de servicios; lo salva la ejecución, no la estructura. Un giro propio sería hacer del kiwi un hilo narrativo que recorre la página, o abrir con el portafolio vivo.

## 4. Veredicto

**La home: "parece hecho a mano" (con reservas).** Hero, problemas, paquetes y proceso tienen punto de vista, ilustración propia y un solo registro de movimiento.

**El sitio completo: todavía "parece plantilla de IA" en las páginas interiores** (/servicios, /como-funciona y partes de /paquetes): H1 sans, emojis, tarjetas 3+2 idénticas, centrado. Quien aterriza en /servicios desde Google, y no en la home, ve la plantilla. Ponderado 6.5: en la línea de la meta, no por encima. Para llegar a "hecho a mano" sin matices: hallazgos 1, 2 y 3 (display y kiwis en interiores, /servicios como lista editorial, /como-funciona con ProcessSection) y limpiar rebotes y `transition: all` (hallazgo 4) antes de enviar a Web Design Awards.

Limitación: las capturas son full-page estáticas; animaciones (wipe, intro) y los estados hover/carga diferida no se pudieron juzgar y se marcan como "verificar en navegador". No se modificó código.
