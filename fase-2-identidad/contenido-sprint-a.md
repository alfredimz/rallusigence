# Contenido Sprint A "Verdad" — fuentes y decisiones

**Fecha:** 2026-09-26
**Alcance:** `lib/content/{testimonios,casos,demos,nosotros,comparativa,garantias}.ts`
**Regla seguida:** ninguna cifra sin fuente; sin "PYMEs"/"pequeñas empresas" (se usa "negocios"); sin nombres del equipo interno; tuteo mexicano.

---

## 1. Conteos finales

| Archivo | Elementos |
|---|---|
| `testimonios.ts` | 19 testimonios únicos + 8 `destacados` para home |
| `casos.ts` | 12 casos (4 con sitio vigente hoy, 8 históricos) |
| `demos.ts` | 18 demos (las 18 plantillas comerciales de `plantillas/`) |
| `nosotros.ts` | hero + 4 hitos de historia + 4 cifras + 4 valores + 5 "lo que no somos" + 1 bloque modelo anónimo |
| `comparativa.ts` | 8 filas × 4 columnas + 1 nota |
| `garantias.ts` | 4 badges |

---

## 2. Testimonios — fuentes

- `KIWINET\diseños\KiwiTrips\Triptico2019.pdf` (página 2): 19 testimonios con nombre y negocio. El tríptico muestra 20 burbujas de cita, pero "Mtra. Mary / ACACNX" aparece repetida dos veces con la misma cita → 19 personas/negocios únicos. Esto coincide con lo indicado en el encargo ("19 testimonios").
- `KIWINET\diseños\KiwiTrips\Triptico.pdf` (versión anterior, sin año en el nombre): 14 testimonios, todos subconjunto exacto de los 19 anteriores (mismas citas, mismos nombres). No aportó testimonios nuevos.
- Corrección aplicada según instrucción: Dr. Sergio se etiqueta como **"Terapéutico Liquen"** (no "consultorio de terapia láser").
- `anio: 2019` se asignó a los 19 porque esa es la fecha documentada del tríptico fuente (`Triptico2019.pdf`). No se incluyó `ciudad` por testimonio: el tríptico solo da el teléfono/CDMX de la propia agencia, no la ciudad de cada cliente — incluirla habría sido inventar el dato.
- **Giros verificados con fuente directa** (no inferidos): SIPSAA → despacho contable (screenshot de sipsaa.com en `Curriculum_2019.pdf` p.4, muestra "Digitalización de la contabilidad"); JEA → "anuncios y letreros" (keyword posicionada, `Curriculum_2019.pdf` p.7); HANDS EDITORES → "venta de material didáctico" (ídem); SEM → "servicio especializado en mantenimiento" + keyword "desazolve de drenajes" (ídem, logo p.7); iBROKEN → "reparación de iphone" (keyword, ídem); SACTEI → automatización industrial (screenshot p.5, "Automatización de maquinaria en procesos industriales... Programación de PLC's"); DIGITAL PRINT → impresión/artes gráficas para EUA (screenshot p.5, texto en inglés "family business... since 2003... graphic arts"); SOLFOG → cosméticos/marca coreana (screenshot p.4, "Solfog... cuidado de la piel... tecnología para la belleza"); SEPRIMEX → seguridad privada (screenshot p.6, "guardias de seguridad intramuros... custodias"); IMPRESIONES A COLOR → impresión láser (newsletter p.6, "Impresión Láser, Plotter HP... desde 2003"); IBB MI CASA → inmobiliaria (origen documentado de la plantilla "inmobiliaria-propiedades" en PROJECTS.md); ACACNX → academia de baile (origen documentado de la plantilla "academia-baile" en PROJECTS.md, aunque el testimonio en sí solo dice "imagen más fresca").
- **Giros NO verificables con certeza** (se dejó una etiqueta razonable, pero no se afirmó nada específico en el copy del sitio más allá de lo que dice la propia cita del cliente): **MCI** (Ing. Hugo) — no se encontró documentación sobre a qué se dedica; se etiquetó genéricamente "Servicios profesionales". **BUNNY BLU** (Lic. Alberto) — el logo (globos, conejo) no permite determinar el giro con certeza; se etiquetó "Negocio de nueva creación" apoyándose solo en la propia cita ("Emprendo mi negocio con el pie derecho"). **PERFECCIONA** y **EL PUNTO PRINT HOUSE** se etiquetaron por inferencia razonable del nombre/logo ("consultoría empresarial" e "imprenta" respectivamente) — no hay fuente adicional. **NUTRIOLOGÍA INTEGRA** y **MARIACHI ESTAMPA DE MÉXICO** están basados directamente en el nombre del negocio + la propia cita, no en fuente externa adicional.
- No se pudo verificar el docx `EMPRESAS\Registro_Maestro_Empresas.docx` directamente (es binario; la herramienta de lectura disponible no soporta `.docx` y no tuve acceso a shell/python en este entorno). Se usó en su lugar el resumen ya consolidado en `REGISTRO-AGENCIA.md`, que cita explícitamente ese docx como fuente de las cifras "66 empresas / 24,280 archivos / 49 GB / ~50 sitios".

## 3. Casos — fuentes y decisiones

- Los 4 "vivos" (orden: seprimex, impresiones-a-color, creativos-espacios, transportes-montes) usan las URLs indicadas explícitamente en el encargo como sitios que siguen en línea.
- **creativos-espacios**: cifras "18 años" y "347 cotizaciones 2007-2025" vienen literalmente de `REGISTRO-AGENCIA.md` (tabla "Clientes destacados" y sección "Acciones derivadas").
- **transportes-montes**: "Fases 1 y 2 documentadas, 3 manuales de marca" viene de `REGISTRO-AGENCIA.md` (tabla de clientes + pricing histórico APTERYNET 2021-2022, "Montes").
- **steamcleaning**: "2015-2022", "2 versiones de sitio", "$8,400 MXN paquete digital 2020" vienen literalmente de `REGISTRO-AGENCIA.md`.
- **sactei, digital-print, solfog**: detalles técnicos (secciones, stack, keywords) de `Curriculum_2019.pdf` páginas 4-5.
- **mascontadores**: no aparece en los trípticos de testimonios (es un cliente documentado solo vía `PROJECTS.md`, como origen de la plantilla "despacho-contable" — `SITIOS/MASCONTADORES` + `EMPRESAS/MASCONTADORES`). No se le asignó `testimonioId` porque no hay testimonio de este cliente en las fuentes revisadas. No se pudo confirmar si el sitio original sigue en línea → `enLinea: false`.
- **impresiones-a-color**: no tiene testimonio propio en los trípticos (el testimonio de "SEPRIMEX" es de Lic. Anita, distinto negocio) → se dejó sin `testimonioId`.
- Ningún caso incluye cifras de tráfico, conversión o ventas que no estén documentadas — se evitó inventar métricas de resultado.

## 4. Demos — fuente

- Los 18 `README.md` de `plantillas/<slug>/` (uno por plantilla). `descripcion`, `destacados` y `giro` son paráfrasis directa de las secciones "Características" y "Componentes Clave" de cada README.
- `paqueteSugerido` es una asignación editorial explícita del encargo ("cotizadores/catálogos grandes → avanzado; landing simple → lanzamiento"), no un dato de fuente: 1 plantilla (invitaciones-rsvp) quedó en `lanzamiento` por ser una landing de una sola pieza sin catálogo ni cotizador complejo; 9 en `profesional`; 8 en `avanzado` por tener cotizadores multivariable o catálogos grandes.
- No verifiqué el listado de `public/assets/kiwis/` con `ls` (no tuve herramienta de shell disponible en este entorno) — usé la lista de 20 nombres de kiwi que se me dio explícitamente en el encargo, asumiendo que ya está validada.

## 5. Nosotros — fuente de cada cifra

| Cifra | Fuente exacta |
|---|---|
| 2015 (fundación) | `Curriculum_2019.pdf` p.2: "En octubre del 2015 iniciamos operaciones como Kiwinet, y posteriormente nos transformamos en Apterynet en 2017" |
| 66 negocios / 3 eras | `REGISTRO-AGENCIA.md` línea 15: "Total histórico: 66 empresas · 24,280 archivos · 49 GB (según Registro_Maestro_Empresas.docx)" |
| +50 sitios web | `REGISTRO-AGENCIA.md` línea 15 y línea 54 ("50 carpetas en SITIOS/") |
| 18 años cliente más antiguo | `REGISTRO-AGENCIA.md` línea 39 (Creativos Espacios, "347 cotizaciones 2007-2025") |

- `loQueNoSomos` es paráfrasis en tuteo del bloque "4. LO QUE NO SOMOS" de `fase-1-research/propuesta-de-valor.md` (se conservó el sentido de cada bullet).
- `modeloAnonimo.texto` combina 3 fuentes: (a) el modelo de pago sin factura de `propuesta-de-valor.md` sección 5; (b) la garantía de 3 días / 50% de anticipo, sección "Pilar 1" del mismo documento; (c) la garantía "lo corregimos sin costo antes de cobrar el 50% restante" de la FAQ en `fase-2-identidad/copywriting-sitio.md` sección 7.

## 6. Comparativa — fuente

- Todas las cifras de la columna "Agencia tradicional" ($15,000–$60,000 MXN, 15-30 días) y "Wix/DIY" ($300–$600 MXN/mes) vienen literalmente de `fase-1-research/propuesta-de-valor.md` sección 6 y de `fase-1-research/benchmark-competitivo.md` (sección "Análisis de precios del mercado").
- La fila "Revisiones" usa el texto exacto de la FAQ de `copywriting-sitio.md" ("lo corregimos sin costo antes de cobrar el 50% restante").
- No se incluyeron cifras de la competencia de automatización IA (Brita, Novai, Salesbot, etc. del benchmark) porque esa tabla es específicamente sitios web, no agentes de WhatsApp/automatización — se evitó mezclar categorías.

## 7. Garantías — verificación del texto exacto

- "3 días o te devolvemos el 50%" **no aparece como frase textual** en `propuesta-de-valor.md`, pero sí aparece el hecho que describe, de forma explícita: "El paquete Lanzamiento se entrega en 3 días hábiles. Garantizado o se regresa el 50% del anticipo" (Pilar 1, Evidencia). Se usó ese hecho, reformulado, en el `texto` del badge; el `titulo` se acortó a "Entrega en 3 días" para respetar el límite de ≤4 palabras del titulo (la frase completa con cifras excede ese límite).
- El resto de badges usa datos directos de `propuesta-de-valor.md` (paquetes $6,000/$12,000/$20,000, entrega total, sin mensualidades).

## 8. Limitaciones de este entorno (para el siguiente agente)

- No tuve acceso a una herramienta de shell/Python en esta sesión, así que no pude: (a) abrir `Registro_Maestro_Empresas.docx` directamente (es binario), (b) correr `ls` sobre `public/assets/kiwis/` para confirmar el listado exacto de archivos SVG disponibles. Si algún nombre de kiwi usado aquí no existe en disco, hay que corregir la ruta en el archivo correspondiente.
- Los giros de MCI, BUNNY BLU, PERFECCIONA y EL PUNTO PRINT HOUSE quedaron con etiquetas razonables pero no verificadas al 100% (ver sección 2). Si aparece documentación adicional de estos clientes (p. ej. en el Drive de `info.apterynet@gmail.com`), conviene corregir esas líneas en `testimonios.ts`.
