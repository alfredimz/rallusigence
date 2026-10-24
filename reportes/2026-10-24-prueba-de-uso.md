# Prueba de uso — rallusigence.net — 2026-10-24
Primera corrida de la compuerta de deploy (DESARROLLO.md §Compuerta · skill `/prueba-de-uso`). Build local servido en :3007.
Origen: Alfredo encontró con el mouse que el carrusel de demos del home no se podía mover; había pasado limpio por matrices, capturas y el diagnóstico de 6 agentes del 26-sep.

## Capa 1 — Matrices (build final)

| Script | Resultado |
|---|---|
| `pruebas/responsive-matrix.mjs` | 254/254, 0 fallos |
| `pruebas/qa-visual.mjs` | 54 combinaciones, 0 errores de consola / requests / imágenes / links; 7 "hallazgos" = carruseles intencionales |
| `pruebas/interaction-matrix.mjs` (nuevo) | 0 FAIL · 18 WARN (controles entre 24 y 44 px, informativo) |

Primera corrida de la matriz de interacción (antes de calibrar): 299 FAIL. 270 eran tap targets < 24 px marcados sin la excepción de espaciado de WCAG 2.5.8 y 44 eran un falso positivo con links internos a `/servicios/bot-whatsapp`. Reglas corregidas en el script y copiadas a la plantilla.

## Capa 2 — Recorrido por tareas (agente con Playwright, solo mouse / solo toques)

| Tarea | Desktop 1440 (María, veterinaria) | Móvil 390 (Jorge, taquería) |
|---|---|---|
| 1 Ver un demo de mi giro completo | Parcial: la demo es una captura, no se puede navegar | NO: igual |
| 2 Precio y plazo | Sí, 0-1 clic | Sí, 2 toques |
| 3 Propiedad y forma de pago | Sí, pero "código de retiro" no se entiende | Sí, misma fricción + typo "porretiro" |
| 4 Auditoría gratis + envío vacío | Sí; error claro pero texto muy chico | Sí; igual |
| 5 Botón WhatsApp en /servicios/bot-whatsapp | Sí, `wa.me/525626171584` | Sí; nota "$3,500/mes" vs "sin mensualidades" del home |
| 6 Blog → final → inicio | Sí; sin "Inicio" en el footer, usó el logo | Sí; igual |

Extras: carrusel del home ahora se mueve con flechas y arrastre (desktop) y asoma la siguiente tarjeta (móvil) · FAQs abren/cierran · filtros del portafolio funcionan · menú hamburguesa abre, 7 links de 48 px, cierra · sin barra fija que tape contenido.

## Fricciones y qué se hizo

| # | Fricción | Dónde | Severidad | Causa | Fix |
|---|---|---|---|---|---|
| 1 | Carrusel de demos no se mueve con mouse | / y /paquetes · desktop | bloquea | `DemosTeaser` con barra oculta y sin controles | ✅ `components/ui/ScrollerControls.tsx` (flechas + arrastre + `data-scroller-*`) |
| 2 | Error de formulario ilegible (12 px) | /auditoria-gratis, /#contacto | cosmético | `.input-error` con `--text-micro` | ✅ 14 px, peso medio |
| 3 | FAQs repetidas (satisfecho / resultado; pertenece / dueño) | /paquetes | confunde | `lib/content/faqs.ts` | ✅ fusionadas en 2 respuestas completas, 8 FAQs |
| 4 | Sin "Inicio" en el footer | todas | confunde | `Footer.tsx` | ✅ link añadido |
| 5 | Logo del footer con recuadro blanco | todas | cosmético | SVG con fondo | ✅ `mix-blend-mode: multiply` |
| 6 | Botón verde sobre fondo verde en el CTA del blog | /blog/[slug] | cosmético | `rs-btn--primary` sobre degradado | ✅ botón blanco (`.ctaBtn`) |
| 7 | "Pasa el cursor…" en pantallas táctiles | /portafolio | confunde | texto fijo | ✅ oculto con `@media (hover: none)` |
| 8 | Typo "porretiro" | /como-funciona | cosmético | JSX se come el salto antes de `<strong>` | ✅ `{' '}` |
| 9 | "¿Cuál es el tuyo?" sin contexto | /paquetes | confunde | título del CTA | ✅ "¿Cuál paquete es el tuyo?" |
| 10 | "Quiero uno así" y chip de 22-26 px en móvil | tarjetas de demo | cosmético | `DemoCard.module.css` | ✅ `min-height: 36px` |
| 11 | Links del footer de 20 px pegados en móvil | todas · móvil | cosmético | `Footer.module.css` | ✅ padding vertical 7 px |
| 12 | Demos no navegables (solo captura) | /portafolio, / | **bloquea** | decisión pendiente: demos en subdominio | ⏳ Alfredo (ya en ESTADO.md) |
| 13 | "Código de retiro desde tu app bancaria" es jerga; única forma de pago | /como-funciona | confunde | modelo de pago | ⏳ Alfredo (MSI / pago en partes, pendiente desde sep) |
| 14 | "No emitimos facturas" espanta a quien deduce | footer, /nosotros | confunde | modelo de negocio | ⏳ Alfredo |
| 15 | Bot WhatsApp "$3,500/mes" vs home "sin mensualidades" | /servicios/bot-whatsapp | confunde | el "sin mensualidades" aplica al sitio, no a servicios recurrentes | ⏳ decidir copy (p. ej. "sin mensualidades por tu sitio") |
| 16 | Testimonios sin "Ver proyecto" en algunos | / | cosmético | solo creativos-espacios tiene URL viva | ⏳ datos |
| 17 | Logo con tipografía mixta "RalluSIgEncE" se ve raro | header | cosmético | marca | ⏳ Alfredo |

## Veredicto

Matrices: 0 FAIL. Tareas: 5/6 desktop, 5/6 móvil (la tarea 1 depende de la decisión 12).
**Listo para deploy** de los 11 fixes de código; las fricciones 12-17 son decisiones de negocio y copy de Alfredo, no bloquean el deploy.

## Lecciones para el sistema

- Un carrusel sin flechas pasa limpio por cualquier captura: la pregunta "¿se puede usar?" necesita su propia matriz y un recorrido con manos (mouse / dedo), no ojos.
- La matriz de interacción necesita calibración por reglas WCAG reales (tap targets con excepción de espaciado) para no ahogar en falsos positivos.
- Los agentes de recorrido reportan también cosas de negocio (facturas, forma de pago): valiosas, pero se separan de los bugs de UI en el reporte.
