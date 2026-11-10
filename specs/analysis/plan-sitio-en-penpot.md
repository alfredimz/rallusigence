# Plan: rallusigence.net completo en Penpot (editable, sincronizable desde el código)
Creado: 2026-11-09 · Estado: PROPUESTA, esperando decisión de Alfredo · Propósito: que el sitio exista visualmente en Penpot para
revisar, anotar y proponer cambios ahí, sin que el archivo quede obsoleto a la primera modificación del código.

## 0. Resumen en una frase
Construir `dom2penpot`, una herramienta que lee el sitio real con Playwright (cajas, textos con su tipografía, imágenes, fondos) y
lo reconstruye en Penpot como capas editables vía el MCP; se corre cada vez que el código cambia, así Penpot siempre refleja
producción y Alfredo trabaja sobre lo real.

## 1. Lo que ya tenemos (se reutiliza)
| Pieza | Dónde | Sirve para |
|---|---|---|
| Servidor MCP de Penpot + plugin | `docs/runbooks/penpot-mcp.md` | ejecutar código del Plugin API en el archivo abierto |
| `pdf2penpot/lib.js` (113 líneas) | `herramientas/pdf2penpot/` | helpers `build(spec)`: crea boards, rectángulos, elipses, textos con fuente/peso/tracking, SVG, imágenes; ya probado con 31 boards de Academia Élite |
| `pdf2penpot/mcp.py` | ídem | cliente JSON-RPC con sesión, lotes de 18 capas por llamada (límite de 30 s) |
| Biblioteca de kiwis e íconos | `Rallusigence Design System/assets/kiwis-biblioteca/` (67 SVG) | entran como vectores con `createShapeFromSvg` |
| Tokens W3C | `Rallusigence Design System/penpot/rallusigence.tokens.json` (52) | ya cargados como set "rallusigence" en el archivo Home |
| Archivo Penpot "Rallusigence — Home" | file `a5ac146a-…` | página "Home — Desktop" con Header, Hero, Garantías, Problema, Paquetes (versión de septiembre, previa a los sprints) |
| Capturas y matrices | `pruebas/qa-visual.mjs`, `snap.mjs` | el mismo Playwright que ya recorre el sitio |

Lo que falta es solo la pieza del medio: pasar del DOM del sitio al `spec` que `lib.js` ya sabe construir. `spec.py` hace eso desde PDF; `dom2penpot` lo hace desde HTML.

## 2. Tres formas de hacerlo

| Opción | Qué se obtiene en Penpot | Editable | Se mantiene al día | Esfuerzo | Veredicto |
|---|---|---|---|---|---|
| A. Capturas por sección como imágenes en boards | 18 páginas × 2 viewports como imágenes | No (solo anotar encima) | Sí, 10 min por corrida | 3 h | Útil solo para comentar; no para proponer cambios |
| B. Reconstrucción manual por capas (como Academia Élite) | Boards con capas reales | Sí | No: cada cambio de código hay que rehacerlo a mano | ~45 secciones × 1 h ≈ 40-45 h | Caro y queda obsoleto |
| **C. `dom2penpot` automático** | Boards con capas reales: texto editable con fuente/peso/color, kiwis vectoriales, demos como imágenes, fondos y tarjetas como rectángulos | Sí | **Sí: se vuelve a generar desde el código en ~15 min** | 10-14 h de construcción una vez; luego gratis | **Recomendada**; además queda como herramienta de la agencia para cualquier sitio de cliente |

## 3. Cómo funciona la opción C
1. **Extractor (Playwright, Node):** abre cada página del build local en 1440 y 390, omite el intro, fuerza los reveals visibles, y
   recorre el DOM: para cada elemento visible toma caja, `background`, `border-radius`, sombra; para cada nodo de texto toma
   contenido, `font-family/size/weight/line-height/letter-spacing/color/text-align`; para cada `<img>` toma la URL (SVG → vector,
   webp/png → imagen); agrupa por `<section>` y por componente (`data-component` opcional en el código). Emite un `spec.json` con el
   mismo formato que ya consume `lib.js`.
2. **Constructor (MCP + lib.js):** crea una página de Penpot por pantalla ("Home — Desktop", "Home — Móvil", "Servicios — Desktop"…),
   un board por sección con el nombre de la sección, y dentro las capas con nombres legibles ("H1", "CTA primario", "kiwi-explorador").
   Los colores se enlazan a los tokens existentes cuando coinciden; los kiwis van como vectores.
3. **Componentes:** botón primario/ghost, tarjeta de paquete, tarjeta de demo, item de garantía, tarjeta de testimonio y footer se
   crean una vez como componentes de Penpot y las demás apariciones son instancias (así un cambio en el componente se propaga).
4. **Sincronización:** `npm run penpot:sync` regenera todo desde el código (borra y recrea las páginas generadas; las páginas de
   trabajo de Alfredo, p. ej. "Propuestas", no se tocan). Las observaciones de Alfredo van como comentarios de Penpot; Claude los lee
   por el MCP y los convierte en tareas.

## 4. Estimación (opción C)
| Bloque | Horas | Qué entrega |
|---|---|---|
| C1. Extractor DOM → spec (texto, cajas, imágenes, SVG inline) | 4-5 | `herramientas/dom2penpot/extract.mjs` + spec del home validado contra captura |
| C2. Constructor y nombres de capas, enlace a tokens, kiwis como vector | 2-3 | home desktop reconstruido y comparado con la captura |
| C3. Componentes (6) e instancias | 2 | botones, cards, garantía, testimonio, footer como componentes |
| C4. Corrida completa: 13 plantillas de página × 2 viewports (≈ 26 pantallas, ≈ 90 boards) | 1-2 | archivo "Rallusigence — Sitio" completo |
| C5. `penpot:sync` + README + runbook | 1 | regeneración en un comando; documentado para clientes |
| **Total** | **10-13 h** | |

Costo en dinero: cero (Penpot gratis, herramientas propias). Costo en tokens de Claude: alto en C1-C2 (código y depuración), bajo
después. Candidato a Antigravity: la corrida C4 y las pruebas visuales repetitivas (bajo riesgo), no C1-C2.
Comparable: Academia Élite (31 boards) tomó una jornada con `pdf2penpot` partiendo de cero; aquí partimos con la mitad hecha.

## 5. Límites que hay que aceptar
- Penpot no tiene animación: el movimiento (intro, kiwi, wipe) se documenta en una página "Movimiento" con frames clave, no se reproduce.
- Las fuentes deben existir en Penpot: Montserrat y Playfair Display están en Google Fonts (ya se usaron en Home). Pacifico/Patrick Hand/Amatic solo si se usan.
- Las demos entran como imágenes (capturas), no como capas; es lo correcto, son sitios aparte.
- El flujo es código → Penpot. Lo que Alfredo dibuje en Penpot no vuelve solo al código: Claude lo implementa leyendo el board y los comentarios.

## 6. Qué necesito de Alfredo
1. Decidir opción (recomiendo C). Si quiere ver algo hoy mismo, la A se puede correr en una hora mientras se construye la C.
2. Tener Penpot abierto con el plugin conectado durante las corridas (Ctrl+Alt+P → CONNECT; 2 min). El clasificador no deja a Claude hacerlo.
3. Nombre del archivo: propongo "Rallusigence — Sitio" nuevo, y dejar "Rallusigence — Home" como histórico.

## 7. Por dónde empezar al retomar
Crear `herramientas/dom2penpot/extract.mjs` tomando `pruebas/snap.mjs` como base (ya omite intro y fuerza reveals) y el formato de
items de `herramientas/pdf2penpot/spec.py` (`rect`, `ellipse`, `svg`, `text` con `fam/wt/st/size/color/align`) como contrato de salida.
