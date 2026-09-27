# Diagnóstico integral — rallusigence.net
**Fecha:** 2026-09-26 · **Método:** 6 agentes en paralelo (contenido, UI, IxD, SEO/AEO, competencia, código) sobre capturas reales de las 10 páginas en desktop y móvil, Lighthouse en vivo, código fuente y material histórico (KIWINET/APTERYNET/Drive).
**Pregunta de Alfredo:** "le faltan muchas cosas al sitio, hay información no montada, y la experiencia no se siente asombrosa, se siente hecho con IA".

---

## 1. Veredicto

El sitio está técnicamente sano (SEO 100/100, build limpio, 118 kB de JS, 0 errores de consola) pero **vende una promesa sin evidencia y se mueve sin intención**. Tres causas raíz, en orden de impacto:

1. **No hay verdad visible.** Portafolio con 2 casos ficticios e íconos genéricos, 3 testimonios sin foto ni cifra, ninguna captura de un sitio real, ningún "desde 2015". Mientras tanto existen 19 testimonios con nombre, 6 sitios con keywords posicionadas documentadas, 50 sitios en carpeta, 21 clientes activos 2020-2025 y 18 plantillas listas. El competidor más fuerte (CreaTuPaginaWeb.mx) muestra 40 proyectos y 30 demos por giro.
2. **No hay dirección de arte.** `text-align:center` 32 veces en 15 archivos, grids simétricos de 3 cards en cada sección, orbes de gradiente en el hero, íconos Lucide donde debería estar el kiwi, un solo salto tipográfico repetido en 9 páginas. Es el layout por defecto de cualquier generador. Calificación UI: 5.5/10.
3. **Hay efectos, no coreografía.** Tres timelines independientes en el hero (texto, kiwi, shader por `requestIdleCallback`), cinco cosas animando en loop a la vez, easing con rebote de caricatura (`--ease-bounce`) como curva más usada en una marca que vende "IA seria y precio fijo", y el kiwi con arco narrativo solo existe en el home. El 90% de secciones sigue en fade-up genérico. Rendimiento móvil: 48/100, LCP 8.6 s.

---

## 2. Scorecard

| Dimensión | Estado | Evidencia |
|---|---|---|
| SEO técnico | 100/100 desktop y móvil | Lighthouse 2026-09-26 |
| Performance desktop / móvil | 89 / **48** | LCP móvil 8.6 s, TBT 670 ms |
| Accesibilidad | 96, pero contraste AA falla en todos los CTA | `--rs-primary #20B4B1` = 2.55:1 sobre blanco |
| Best practices | 77 | cookies de terceros + contraste |
| UI / dirección de arte | 5.5/10 | reporte agente-ui-experto |
| IxD | efectos sin sistema | reporte agente-ixd-animaciones |
| Contenido montado vs disponible | ~20% | reporte inventario |
| Código | limpio, sin secretos, sin lint/tests | reporte lider-tecnico |
| Git | **limpio en 68472b7 (17-sep)**; PROJECTS.md decía "5 sprints sin commit" y es incorrecto | `git status` vacío |

---

## 3. Lo que existe y no está montado

| Contenido | Fuente | Va en | Valor |
|---|---|---|---|
| 19 testimonios con nombre y negocio (sitio muestra 3; Dr. Sergio mal atribuido a "terapia láser", es Terapéutico Liquen) | `KIWINET\diseños\KiwiTrips\Triptico2019.pdf` | Home carrusel, servicios por giro | Alto |
| Portafolio real: sipsaa.com, solfog.com, digitalprintmexico.com, seprimex.com, impresionesacolor.com.mx, servicios-automatizacion.com + keywords posicionadas (iBroken "reparación de iphone", Hands Editores, JEA, desazolve) | `KiwiPortafolio\Curriculum_2019.pdf` | /portafolio (reemplaza los 2 ficticios) | Alto |
| Clientes 2020-2025 con carpeta en Drive: Creativos Espacios (creativosespacios.mx vivo), SteamCleaning, Maniobras Montes, Dermatóloga Karina, Sexólogo, Pastelería, Mariachi, JKBEAUTY, JIVA, SEDETACO, 15Regina | `EMPRESAS\Registro_Maestro_Empresas.docx`, Drive (carpetas compartidas 2026-08-20) | /portafolio con capturas | Alto |
| 18 plantillas por giro listas (dental, restaurante, gym, abogados, contadores, veterinaria, inmobiliaria…) | `Proyectos\plantillas\` | "Demos por giro" en /portafolio y /paquetes | Alto |
| Historia: Kiwinet oct-2015 → Apterynet 2017 → Rallusigence; misión "honestidad"; Apteryx = kiwi | `Curriculum_2019.pdf` p.1-2 | /nosotros nuevo | Alto (ancla de confianza del modelo anónimo) |
| Garantía "3 días o devolvemos el 50%", tabla vs agencia tradicional/Wix/Workana, "lo que NO somos" | `fase-1-research\propuesta-de-valor.md` | Home + badge en hero y cards de precio | Alto |
| Metodología SEO por fases + checklist de 16 puntos + garantía "mínimo 9.2/10 en evaluadores" | `EstudioSEO.docx`, `APTERYNET\Catalogo.pdf` p.4 | /servicios/seo | Medio |
| Catálogo de 11 servicios históricos (diseño gráfico, newsletter, redes, animaciones, hospedaje) con tarifarios 2019/2023 | `Catalogo.pdf`, `Precios2023.pdf` | 3-5 slugs nuevos en /servicios | Medio |
| 5 artículos de blog planeados (empezando por "cuánto cuesta una página web en México 2026", 2,100-3,150 búsquedas/mes) | `fase-6-marketing\keyword-research.md` §5 | /blog (hoy 1 artículo) | Alto |
| Informe real de palabras clave Google Ads | Drive "Informe de palabras clave de búsqueda" | evidencia en /servicios/anuncios | Medio |
| Manuales de entrega, cartas, contrato 50% | `KIWINET\documentos\KiwiManuales\` | "Qué recibes" en /como-funciona | Medio |
| Planeado y nunca construido | `fase-3-ux\sitemap.md`, `copywriting-sitio.md` | /contacto, FAQ y modelo de pago en home, Blog en header/footer | Medio |

---

## 4. Tells de "hecho con IA" (verificables)

| Tell | Dónde | Corrección |
|---|---|---|
| Orbes de gradiente + caja vacía con kiwi | `HeroSection.module.css:7-31, 73-96` | Composición editorial: kiwi grande + mockup de sitio real en dispositivo |
| Centrado universal | 32 × `text-align:center` | Alinear a la izquierda el 60% de secciones, grid 12 col |
| 3 cards idénticas en cada sección | `PackagesSection.module.css:10-15`, `servicios/page.module.css:27-33` | La card destacada rompe el grid (más ancha, desplazada) |
| Íconos Lucide en dolores | `PainSection.tsx:3-26` | kiwi-buho / kiwi-smartphone / kiwi-tiempo (ya existen) |
| Testimonios sin rostro ni cifra | `TestimonialsSection.tsx` | Foto del negocio o kiwi-avatar por giro + resultado + fecha |
| Portafolio con ícono en caja gradiente | `portafolio/page.module.css:93-99` | Screenshot real en mockup, 1 columna grande |
| Padding uniforme 80 px | `globals.css:148` | Ritmo variable 48/80/120 |
| Blog con 1 card flotando | `blog/page.tsx` | Publicar 3+ artículos o rediseñar estado |
| Fade-up en el 90% de secciones | `globals.css:158-166` | Wipe con clip-path en Pain/Diff, coreografía distinta por sección |
| Bounce cartoon en checks, alertas, pulsos | `globals.css:218-276` | Una curva de marca `cubic-bezier(0.22,1,0.36,1)`; bounce solo para el aterrizaje del kiwi |
| Intro overlay 5.5 s negro, sin kiwi, sin Escape | `IntroOverlay.tsx` | ≤1.5 s, solo primera visita real, `Escape`, `role=dialog` |
| Shader que se lee como "imagen que no cargó" | `HeroShader.tsx` | Subir contraste/reactividad al puntero o eliminar |
| Kiwi solo en home; /auditoria-gratis usa mascota genérica | `HeroSection.tsx:50-51` | Kiwi con arco por página (ver §6) |

---

## 5. Hallazgos técnicos y AEO prioritarios

**P0**
- FAQ de /paquetes sin `FAQPage` y con pregunta rota "¿En qué banco puedo hacer el retiro sin tarjeta?" (`paquetes/page.tsx:106-159`).
- `ProfessionalService` global sin `sameAs`, `address`, `telephone`, `logo` (`app/layout.tsx:117-131`). **Necesita URLs reales de Alfredo (GBP, LinkedIn, IG, FB).**
- Blog sin `BlogPosting` JSON-LD (`blog/[slug]/page.tsx`).
- `/llms.txt` no existe (404).
- GA4 `gtag.js` + GTM cargados en paralelo → doble conteo probable y LCP móvil 8.6 s (`app/layout.tsx:53-88`). Clarity a `lazyOnload`.
- `@import` de `colors_and_type.css` sin hash con `Cache-Control: immutable` 1 año (`globals.css:1`, `firebase.json:12-19`): cualquier cambio de color queda cacheado un año en visitantes recurrentes.
- Contraste AA falla en todos los CTA. Token nuevo `--rs-primary-text: #0F6E63`.

**P1**
- `Service` sin `Offer` con precio; sin `BreadcrumbList` (`servicios/[slug]/page.tsx:38-67`).
- /auditoria-gratis con 73 palabras y sin schema propio.
- 2.8 MB de TTF muertos en `public/design-system/fonts/` (45% del peso de `out/`).
- WhatsApp hardcodeado en 6 archivos, 2 endpoints Formspree sueltos, formulario duplicado línea por línea → `lib/contacto.ts` + `lib/useLeadForm.ts`.
- Paquetes duplicados y ya divergentes entre `PackagesSection.tsx:13-73` y `paquetes/page.tsx:41-104`.
- StickyCTA invisible pero tabulable; intro sin `Escape`; hamburguesa 40 px; carrusel sin semántica; skip link ausente en /auditoria-gratis.
- Sin ESLint, tests ni CI. `@next/mdx` instalado sin usar; parser markdown casero.

**Arquitectura de contenido propuesta:** `lib/content/{paquetes,casos,faqs,testimonios,contacto}.ts` tipados + `<FaqList>` que emite `FAQPage` automáticamente. Añadir 10 casos = 10 objetos; hoy = 800 líneas de JSX.

---

## 6. Sistema de movimiento propuesto (resumen)

- Una curva de marca: `--ease-signature: cubic-bezier(0.22, 1, 0.36, 1)`. Bounce solo en el aterrizaje del kiwi.
- Duraciones con significado: micro 120-180 ms · sección 350-500 ms · página 250-400 ms · kiwi 800-1200 ms.
- Máximo un "hero motion" por viewport; el resto ambiental ≤10 px y opacidad ≤0.15.
- Kiwi como personaje con arco por página: home llega volando · paquetes aprueba al terminar el conteo del precio · cómo-funciona camina sobre el conector GSAP · auditoría escanea con lupa · contacto celebra el envío · transición de página con `view-transition-name` compartido.
- En móvil el kiwi sube de peso (hoy 150 px) porque tilt y shader están gateados a `pointer:fine`.

---

## 7. Competencia (septiembre 2026)

| Competidor | Precio | Entrega | Lo que tienen y nosotros no |
|---|---|---|---|
| CreaTuPaginaWeb.mx | $4,900-$19,900 + IVA | 7 días-1 mes | Cotizador instantáneo, 40 proyectos, 30 demos por giro, tabla vs DIY/agencia |
| Simplixy | $4,500-$31,900 | 5 días-6 sem | 12 MSI, casos con nombre, garantía, artículos SEO incluidos |
| Novemp | cotización | — | Calculadora ROI, badge Google Partner |
| Web Design Mexico | $350 USD | 24 h | Más rápido, pero sin portafolio ni garantía |
| Wix | $0-500/mes | inmediato | Precio de entrada cero |

**Nuestra ventaja real:** velocidad (3 días) + precio publicado + entrega total en cuentas del cliente. **Riesgo:** "grupo de profesionistas independientes, no emitimos facturas" sin historia ni casos activa la alerta de estafa que las guías del mercado ya describen ("desconfía de quien promete un sitio en 3 días"). Objeción #1 del mercado: quién es dueño del dominio. Ya la respondemos en FAQ; debe ser badge en el hero. 74% de consumidores mexicanos usa MSI.

---

## 8. Plan propuesto

| Sprint | Contenido | Horas | Archivos clave |
|---|---|---|---|
| **A · Verdad** | Portafolio con 8 sitios reales en mockup de dispositivo + capturas · 10 testimonios reales con giro y corrección Dr. Sergio · /nosotros (desde 2015, 3 eras, honestidad, cifras) · "Demos por giro" con las 18 plantillas · badges garantía + dominio tuyo en hero y cards · tabla comparativa visual · Blog y FAQ en header/footer · `lib/content/*` tipado | 24 | `portafolio/`, `TestimonialsSection`, nuevo `nosotros/`, `HeroSection`, `Header/Footer`, `lib/content/` |
| **B · Dirección de arte** | Hero editorial sin orbes con mockups reales · romper centrado en 8 archivos · card destacada rompe grid · kiwis en PainSection · Playfair display 64-72 px un momento por página · ritmo vertical variable · contraste AA · activar 11 kiwis sin usar | 20 | `HeroSection.*`, `PackagesSection.*`, `PainSection.*`, `globals.css`, tokens |
| **C · Coreografía** | Intro ≤1.5 s solo primera visita + Escape · una curva de marca, quitar bounce de checks/alertas · glow o shine, no ambos · shader sincronizado con `useIntroDone` (o fuera) · kiwi con arco en paquetes, proceso y auditoría · wipe en Pain/Diff · `transition:all` fuera del header | 16 | `IntroOverlay`, `globals.css`, `HeroShader`, `ServiceCard`, `ProcessSection`, `auditoria-gratis/` |
| **D · Técnico + AEO** | FAQ rota + `FAQPage` · `llms.txt` · `BlogPosting` · `Offer` + `BreadcrumbList` · `sameAs` (con URLs de Alfredo) · GA4 duplicado + Clarity lazy · borrar TTF · cache header · internalizar tokens CSS · `lib/contacto.ts` · ESLint · StickyCTA/hamburguesa/carrusel a11y | 12 | `layout.tsx`, `paquetes/page.tsx`, `blog/[slug]`, `firebase.json`, `public/llms.txt` |
| **E · Después** | Cotizador interactivo por giro · opción MSI o pago en 3 partes · 5 artículos pilar · video 60 s del proceso con el kiwi · landings /para/[giro] · 3 slugs de servicios nuevos | 40+ | — |

Total A-D: **~72 h**. Criterios de aceptación medibles: Lighthouse móvil ≥80 y LCP <2.5 s; 0 casos ficticios; kiwi animado en ≥3 páginas (`animation-matrix.mjs` extendido); 0 fallos AA en CTAs; `text-align:center` ≤12 ocurrencias; FAQPage válido en /paquetes; llms.txt 200.

---

## 9. Decisiones que solo Alfredo puede tomar

1. **URLs de perfiles reales** para `sameAs` (Google Business Profile, LinkedIn, Instagram, Facebook). Sin esto la entidad no es verificable por ningún motor de IA.
2. **Permiso para mostrar clientes históricos por nombre** (Liquen, SteamCleaning, Digital Print, Seprimex, Creativos Espacios, Dermatóloga Karina…) y cuáles siguen en línea para captura.
3. **Contar la historia desde 2015** (Kiwinet → Apterynet → Rallusigence) aunque el modelo sea anónimo. Recomendación: sí, con cifras y sin nombres de personas.
4. **Pago en partes o MSI** (hoy solo 50/50 por retiro sin tarjeta).
5. **Shader del hero:** rediseñarlo con contraste o eliminarlo. Recomendación: eliminar y poner mockups reales.

---

## 10. Sobre el informe "Stack IA 2026" que Alfredo compartió

Aplica directo a este sitio: robots ya permite todos los bots de IA (nada que cambiar), falta `llms.txt`, falta `FAQPage` en /paquetes, y el bloque de "respuesta directa 40-60 palabras" bajo el H1 de /paquetes y /servicios/diseno-web. Aplica a la agencia: el MCP de GitHub rechaza el token (401), el MCP de n8n Cloud apunta a una instancia con trial vencido (endpoint 404), Figma local no conecta pero el Figma cloud sí. Las 20 skills ya están en formato SKILL.md con frontmatter. Lo demás del informe (Antigravity, MCP stateless, plugin pack) no bloquea nada de este plan.

---

**Fuentes:** reportes de los 6 agentes (sesión 2026-09-26), capturas en scratchpad `shots/`, `report.json`, Lighthouse desktop/móvil, `git log`, Drive (carpetas compartidas por info.apterynet@gmail.com el 2026-08-20).
