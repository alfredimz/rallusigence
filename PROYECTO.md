# PROYECTO: RALLUSIGENCE
# Ruta: clientes/rallusigence/ | Creado: 2026-04-25

---

## DATOS DE LA AGENCIA

| Campo              | Valor |
|--------------------|-------|
| Nombre             | Rallusigence |
| Dominio objetivo   | rallusigence.net |
| Giro               | Agencia de sitios web con IA — modelo anónimo, entrega total |
| Mercado            | Todo México (nacional) |
| Modelo de negocio  | Anónimo — sin contacto presencial, sin RFC, sin factura, pago por retiro sin tarjeta |
| Operación          | 100% IA — el cliente contacta, la IA responde, cobra el 50% y se trabaja |

**Historia:** Evolución de KIWINET (2017-2019) y APTERYNET. Nueva era con IA.

---

## IDENTIDAD

- **Nombre:** Rallusigence — Rallus (género latino de aves) + igence (de intelligence)
- **Mascota:** Kiwi (rediseñado minimal/flat — SVG ya en brief/)
- **Paleta base:** Teal #20B4B1 principal + paleta amplia definida en brand-manual.md
- **Tipografía:** Montserrat principal + sistema de 6 fuentes — ver brand-manual.md
- **Stack del sitio:** Next.js 15 (App Router) + Firebase Hosting

---

## MODELO DE PAGO

Retiro sin tarjeta en cajero automático. El cliente genera el código desde su app bancaria y lo comparte. Rallusigence retira en cajero. Sin tickets, sin facturas, sin RFC. Operamos como grupo de profesionistas independientes (freelance) para mantener costos accesibles.

---

## MVP — SERVICIOS (solo sitios web por ahora)

| Paquete | Qué incluye | Precio | Entrega |
|---------|-------------|--------|---------|
| **Lanzamiento** | Landing 1 página, 5-7 secciones, mobile, formulario, SEO básico, dominio configurado | $6,000 MXN | 3 días |
| **Profesional** | Sitio 5-7 páginas, blog listo, galería, Google Maps, Analytics, SEO on-page completo | $12,000 MXN | 7 días |
| **Avanzado** | Todo anterior + tienda online, blog con 5 artículos iniciales, integración WhatsApp, velocidad optimizada | $20,000 MXN | 12 días |

**Modelo de entrega:** el cliente recibe todo — código, dominio configurado en su cuenta, hosting en su nombre. Sin mensualidades. Sin dependencia de Rallusigence después de la entrega.

**Servicios futuros (post-MVP):** diseño gráfico, newsletter, tienda online independiente, hospedaje, anuncios IA, WhatsApp bot, SEO, SEM, automatización, auditorías, agente de voz, videos IA, email marketing, CRM, multicanal.

---

## ESTADO ACTUAL

**Fase:** [x] Planificación → [x] Diseño → [x] Desarrollo → [x] QA Visual → [ ] Lanzamiento

**Tags:** [ACTIVO]

**Fases del proyecto:**
- [x] Fase 1 — Research y estrategia
- [x] Fase 2 — Identidad y comunicación
- [x] Fase 3 — UX / Arquitectura
- [x] Fase 4 — Design System
- [x] Fase 5 — Documentación técnica
- [x] Fase 6 — SEO y Marketing
- [x] Fase 7 — Campañas de Ads
- [x] Desarrollo del sitio — Next.js 15, 18 páginas estáticas, build limpio
- [x] QA Visual — Playwright screenshots, code review, correcciones aplicadas
- [ ] Configurar Formspree (reemplazar XXXXXXXX en HeroSection.tsx y ContactSection.tsx)
- [ ] Configurar número WhatsApp real (reemplazar 52XXXXXXXXXX)
- [ ] Crear cuenta Firebase y hacer `firebase deploy`
- [ ] Comprar dominio rallusigence.net

---

## ESTRUCTURA DE CARPETAS

| Carpeta | Contenido |
|---|---|
| brief/ | Logo, mascota, materiales de identidad |
| fase-1-research/ | Benchmark, personas, journey map, propuesta de valor |
| fase-2-identidad/ | Brand manual, voz y tono, copywriting |
| fase-3-ux/ | Sitemap, user flows, wireframes |
| fase-4-design-system/ | Design system, guía UI, specs de componentes |
| fase-5-tecnico/ | Arquitectura Next.js, A11y, documentación técnica |
| fase-6-marketing/ | Keywords, tracking plan, SEO on-page |
| fase-7-ads/ | Copies de anuncios Google Ads + Facebook Ads |
| **Rallusigence Design System/** | **Export de Claude Design — CSS canónico, fuentes TTF, assets SVG/PNG, componentes React, previews** |
| desarrollo/ | Código del sitio Next.js (por construir) |
| entregas/ | Versiones finales aprobadas |
| reportes/ | QA, auditorías |

---

## HERRAMIENTAS DE DESARROLLO

| Herramienta | Propósito | Ubicación |
|---|---|---|
| `npm run dev` | Servidor local (puerto 3001 si 3000 ocupado) | `desarrollo/rallusigence-web/` |
| `npm run build` | Build de producción — verificar antes de deploy | `desarrollo/rallusigence-web/` |
| `node screenshot.mjs` | Playwright — screenshots automáticos de todas las secciones | `E:/AlfreditosDrive/Proyectos/` |
| `claude mcp list` | Verificar MCP servers activos (Playwright instalado) | global |

**Playwright MCP instalado:** `claude mcp add playwright npx @playwright/mcp@latest`
- Configurado en: `C:\Users\alfre\.claude.json` (proyecto rallusigence-web)
- Permite: navegar, hacer clic, tomar screenshots, inspeccionar estilos

---

## ARCHIVOS CLAVE DEL SITIO

| Archivo | Qué hace |
|---|---|
| `app/globals.css` | Estilos globales — rs-h2 (Playfair Display), service-card, testimonial-card, reveal, sticky CTA |
| `app/layout.tsx` | Layout raíz — metadata SEO, fuentes, ScrollRevealProvider |
| `app/page.tsx` | Home — ensambla todas las secciones |
| `components/sections/HeroSection.*` | Hero con gradiente + decorativos circulares |
| `components/sections/PainSection.*` | 3 pain points con SVG icons en círculos rojos |
| `components/sections/PackagesSection.*` | Grid 3 cards — Lanzamiento/Profesional/Avanzado |
| `components/sections/ProcessSection.*` | Sección oscura (#1E2028) — 4 pasos del proceso |
| `components/sections/DiffSection.*` | Layout 2 columnas — título izquierda, diferenciadores derecha |
| `components/sections/TestimonialsSection.*` | Testimonial card rediseñada |
| `components/sections/ContactSection.*` | Formulario de contacto (Formspree — configurar) |
| `components/ui/ServiceCard.tsx` | Card de paquete — usa estilos globales `.service-card` |
| `components/ScrollRevealProvider.tsx` | IntersectionObserver global — activa clase `.visible` en `.reveal` |
| `public/design-system/colors_and_type.css` | Design System canónico — todas las variables `--rs-*` |

---

## HISTORIAL DE SESIONES

### 2026-05-21 — Sesión 4: Diagnóstico visual + mejoras UI + QA con Playwright

**Contexto:** El sitio Next.js estaba construido pero Alfredo señaló que se veía "hecho con inteligencia artificial", plano y genérico.

**Diagnóstico (3 agentes paralelos):**
- **Agente DS:** El Design System tiene tokens de animación completos (`--ease-bounce`, `--duration-*`, `--ease-out-cubic`) y keyframes documentados, pero la implementación solo usa el scroll reveal genérico. Las fuentes decorativas (Playfair Display, Pacifico, Patrick Hand, Amatic SC) estaban definidas en `colors_and_type.css` y los archivos TTF en `public/design-system/fonts/` — pero **ninguna se usaba** en el código.
- **Agente Implementación:** 75% de componentes tienen animación (scroll reveal, hover states, header scroll). No hay librerías de animación de terceros — CSS puro + IntersectionObserver. `--ease-bounce` definido pero nunca usado.
- **Agente Visual:** 5 causas raíz del look genérico: (1) solo Montserrat en headings, (2) fondos 100% sólidos sin gradientes, (3) emojis unicode en PainSection, (4) misma estructura centrada en todas las secciones, (5) cards planas sin profundidad.

**Cambios implementados (8 archivos):**

| Archivo | Cambio |
|---|---|
| `app/globals.css` | `.rs-h2` → Playfair Display. Service-card: gradiente + sombra doble + barra turquesa `::before`. Testimonial-card: rounded 16px + box-shadow. `.btn-sticky--visible`: `ease-bounce` al aparecer |
| `HeroSection.module.css` | Fondo `linear-gradient(135deg)`. `::before` y `::after` orbes decorativos con `radial-gradient`. Placeholder: `border-radius 24px`, sombra turquesa, sin borde punteado |
| `PainSection.tsx` | Emojis (📵📱⏳) → 3 componentes SVG inline: NoGoogleIcon, BrokenMobileIcon, ClockIcon |
| `PainSection.module.css` | `.painEmoji` → `.painIcon`: círculo 44px con fondo `rgba(235,91,91,0.1)` y color `--rs-red-vivid` |
| `ProcessSection.module.css` | Sección dark: `background linear-gradient(#1E2028, #252831)`. Override global con `:global(.rs-h2)`, `:global(.step-item)`. Texto en rgba(255,255,255,0.65) |
| `ProcessSection.tsx` | `data-theme="dark"` añadido. Corrección: voseo argentino → tuteo mexicano en paso 2 |
| `DiffSection.tsx` | Layout 2 columnas: `titleWrap` izquierda con `reveal--left`, `list` derecha. Tagline añadido |
| `DiffSection.module.css` | `display: grid; grid-template-columns: 1fr 1fr; gap: 80px`. Responsive a 1 columna en mobile |
| `PackagesSection.module.css` | Background `var(--rs-bg-soft)` para contraste con cards blancas |

**Verificación:**
- `npm run build`: ✅ Compiló limpio — 18 páginas estáticas, cero errores TypeScript
- Code review (lider-tecnico): ✅ 8 archivos OK — sintaxis correcta, `:global()` bien usado, responsive cubierto
- Playwright instalado para screenshots: `npm install playwright` + `npx playwright install chromium`
- Playwright MCP agregado: `claude mcp add playwright npx @playwright/mcp@latest` (activo en próxima sesión)
- Script de screenshots: `E:/AlfreditosDrive/Proyectos/screenshot.mjs` — captura sección por sección

**Screenshots tomados y verificados:**
- Hero: gradiente visible, decorativos circulares, placeholder rediseñado ✅
- PainSection: SVG icons en círculos rojos, Playfair Display en h2 ✅
- PackagesSection: 3 cards visibles, featured turquesa, accent stripe arriba ✅
- ProcessSection: fondo oscuro, texto blanco, circles turquesa ✅
- DiffSection: layout 2 columnas funcionando ✅
- TestimonialsSection + ContactSection: limpios ✅

**Issue detectado y resuelto:** Cards de paquetes "no se veían" porque el `reveal` (opacity: 0) no disparaba sin scroll real. En browser real el IntersectionObserver funciona al bajar. Se mejoró la sombra de las cards y el fondo de la sección para mayor contraste.

**Pendiente para próxima sesión:**
1. Configurar Formspree — reemplazar `XXXXXXXX` en ContactSection
2. Número WhatsApp real — reemplazar `52XXXXXXXXXX` en HeroSection
3. Crear cuenta Firebase → `firebase deploy`
4. Comprar dominio `rallusigence.net`

---

### 2026-05-06 — Sesión 2: Documentación completa + Design System
**Hecho:**
- 7 fases de documentación completadas (research, identidad, UX, design system, técnica, SEO, ads)
- Stack pivotado: HTML vanilla → Next.js 15 (App Router) + React + TypeScript
- Modelo de negocio definido: anónimo, pago retiro cajero sin tarjeta, entrega total al cliente
- MVP definido: solo sitios web, 3 paquetes ($6k/$12k/$20k)
- Claude Design export analizado e integrado — `Rallusigence Design System/` como CSS canónico
- Prefijo de variables CSS: `--rs-*` | Prefijo de clases: `.rs-*`
- Animaciones documentadas (intro pitch elevator, scroll reveal, hover cards, etc.)
- design-system.md actualizado a v2.0 con variables --rs-
- arquitectura-tecnica.md actualizado con estructura Next.js App Router
**Decisiones:**
- CSS canónico: `Rallusigence Design System/colors_and_type.css`
- Fuentes: auto-hosteadas (TTFs en Design System/fonts/)
- Blog: MDX (Alfredo escribe en Markdown)
- Formularios: Formspree (sin backend)
- Pago: retiro cajero sin tarjeta — cliente genera código en su app bancaria
**Siguiente paso:**
1. Crear el proyecto Next.js 15 en `desarrollo/`
2. Copiar Design System (CSS + fuentes + assets) a `public/`
3. Construir componentes empezando por layout (Header, Footer) y Home page

### 2026-04-25 — Sesión 1: Setup y planificación
**Hecho:**
- Exploración de KIWINET/APTERYNET (historia de marca)
- Conexión Figma MCP — borrador "Apterynet" revisado
- Naming: 12+ opciones evaluadas → elegido Rallusigence
- Plan de 7 fases definido
- Estructura de carpetas creada
**Decisiones:**
- Stack inicial: HTML/CSS/JS vanilla (pivotado a Next.js en sesión 2)
- Logo: Alfredo lo genera en Claude Design con specs de Claude
- Entregables: Markdown en carpetas del proyecto
- Benchmark: vs agencias IA en México (mercado nacional)
