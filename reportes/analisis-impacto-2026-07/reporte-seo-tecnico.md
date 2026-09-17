# Reporte SEO Tecnico — Rallusigence
**Fecha:** 2026-07-20
**Auditor:** Especialista SEO — Agencia IA Alfredo
**Dominio objetivo:** rallusigence.net (aun sin comprar)
**Stack:** Next.js 15 App Router + static export + Firebase Hosting

---

## Resumen Ejecutivo

El sitio tiene una base tecnica solida (Next.js estatico, `lang="es-MX"`, metadataBase configurada, rutas semanticas) pero presenta **8 hallazgos de prioridad Alta** que bloquean el posicionamiento antes del lanzamiento. Los mas criticos: ausencia total de `sitemap.xml` y `robots.txt`, falta de OG image, metadata incompleta en 4 paginas, y JSON-LD estructuralmente pobre. Con las correcciones propuestas, el sitio puede posicionarse competitivamente en 60-90 dias post-lanzamiento para keywords de intencion comercial media-alta.

---

## 1. Sitemap y robots.txt — AUSENTES

**Estado actual:** No existe ningun archivo en `/public/`. La carpeta esta vacia. Google no tiene mapa de rastreo ni instrucciones de indexacion.

**Problema/Oportunidad:** Sin `robots.txt`, Google rastrea paginas que no deben indexarse (`/gracias`, `/aviso-de-privacidad`, `/terminos-y-condiciones`), desperdiciando crawl budget. Sin `sitemap.xml`, el descubrimiento de articulos de blog sera lento.

**Solucion propuesta:**

Crear `public/robots.txt`:
```
User-agent: *
Allow: /
Disallow: /gracias
Disallow: /aviso-de-privacidad
Disallow: /terminos-y-condiciones
Sitemap: https://rallusigence.net/sitemap.xml
```

Crear `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://rallusigence.net/</loc><lastmod>2026-07-20</lastmod><priority>1.0</priority></url>
  <url><loc>https://rallusigence.net/paquetes</loc><lastmod>2026-07-20</lastmod><priority>0.9</priority></url>
  <url><loc>https://rallusigence.net/como-funciona</loc><lastmod>2026-07-20</lastmod><priority>0.8</priority></url>
  <url><loc>https://rallusigence.net/portafolio</loc><lastmod>2026-07-20</lastmod><priority>0.7</priority></url>
  <url><loc>https://rallusigence.net/auditoria-gratis</loc><lastmod>2026-07-20</lastmod><priority>0.9</priority></url>
  <url><loc>https://rallusigence.net/blog</loc><lastmod>2026-07-20</lastmod><priority>0.8</priority></url>
</urlset>
```

**Alternativa preferida (Next.js nativo):** Crear `app/sitemap.ts` con `MetadataRoute.Sitemap` para generacion dinamica que incluya posts de blog automaticamente.

**Impacto SEO:** Alto
**Prioridad:** Alta

---

## 2. OG Image — Ausente en todo el sitio

**Estado actual:** El objeto `openGraph` en `layout.tsx` no incluye `images`. No existe ninguna imagen OG en `public/`. Las paginas individuales tampoco tienen `openGraph` propio.

**Problema/Oportunidad:** Al compartir el sitio en WhatsApp, Facebook, LinkedIn o X no aparece ninguna vista previa de imagen. Para una agencia que vende sitios web, es especialmente danino a nivel de credibilidad.

**Solucion propuesta:**

Paso 1: Crear `public/og-image.jpg` (1200x630px) con fondo oscuro, logo kiwi y tagline "Tu sitio web en 3 dias. Desde $6,000 MXN".

Paso 2: Agregar a `layout.tsx`:
```typescript
openGraph: {
  title: "Rallusigence — Tu sitio web en 3 dias",
  description: "Sitio web profesional hecho con IA. Precio fijo desde $6,000 MXN.",
  url: "https://rallusigence.net",
  siteName: "Rallusigence",
  locale: "es_MX",
  type: "website",
  images: [{
    url: "https://rallusigence.net/og-image.jpg",
    width: 1200,
    height: 630,
    alt: "Rallusigence — Sitios web profesionales en 3 dias para negocios mexicanos",
  }],
},
twitter: {
  card: "summary_large_image",
  title: "Rallusigence — Tu sitio web en 3 dias",
  description: "Sitio web profesional hecho con IA. Precio fijo desde $6,000 MXN.",
  images: ["https://rallusigence.net/og-image.jpg"],
},
```

**Impacto SEO:** Alto (impacto directo en CTR y senales sociales)
**Prioridad:** Alta

---

## 3. Metadata Faltante en 4 Paginas

**Estado actual:**

| Pagina | Tiene metadata | Problema |
|--------|---------------|---------|
| `/auditoria-gratis` | NO | Hereda titulo del layout — irrelevante para busqueda |
| `/gracias` | NO | Hereda titulo del layout; deberia ser `noindex` |
| `/aviso-de-privacidad` | NO | Sin titulo propio; deberia ser `noindex` |
| `/terminos-y-condiciones` | NO | Sin titulo propio; deberia ser `noindex` |

**Problema/Oportunidad:** Las paginas sin metadata propia muestran titulo y descripcion globales en Google. `/gracias` indexada desperdicia crawl budget y puede confundir a usuarios que lleguen desde busqueda organica.

**Solucion propuesta:**

Para `app/auditoria-gratis/page.tsx` (agregar antes del `export default`):
```typescript
export const metadata = {
  title: "Auditoria Digital Gratis para tu Negocio | Rallusigence",
  description: "Recibe gratis un analisis de tu web, redes sociales y Google. Detectamos que te esta costando clientes y como solucionarlo.",
  alternates: { canonical: "https://rallusigence.net/auditoria-gratis" },
  openGraph: {
    title: "Auditoria Digital Gratis | Rallusigence",
    description: "Revisamos tu presencia digital y te decimos exactamente que mejorar. Sin costo.",
    url: "https://rallusigence.net/auditoria-gratis",
    type: "website",
  },
}
```

Para `app/gracias/page.tsx`:
```typescript
export const metadata = {
  title: "Solicitud Recibida | Rallusigence",
  description: "Hemos recibido tu solicitud. Te contactamos en menos de 24 horas.",
  robots: { index: false, follow: false },
}
```

Para `app/aviso-de-privacidad/page.tsx` y `app/terminos-y-condiciones/page.tsx`:
```typescript
export const metadata = {
  title: "Aviso de Privacidad | Rallusigence",
  description: "Aviso de privacidad de Rallusigence — Tizayuca, Hidalgo, Mexico.",
  robots: { index: false, follow: false },
}
```

**Impacto SEO:** Alto
**Prioridad:** Alta

---

## 4. JSON-LD Structured Data — Incompleto

**Estado actual:** Un unico schema `ProfessionalService` en `layout.tsx` con solo 6 campos: `name`, `description`, `url`, `areaServed` (solo "Mexico"), `priceRange`, `offers`. No activa ningun rich result de Google.

**Problema/Oportunidad:** Google usa structured data para rich snippets (precios, FAQ, valoraciones). Faltan: direccion postal (Local SEO), telefono, logo, `sameAs` con redes sociales, y `FAQPage` en pagina de paquetes.

**Solucion propuesta — schema `@graph` completo para `layout.tsx`:**
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "ProfessionalService", "WebDesign"],
      "@id": "https://rallusigence.net/#business",
      "name": "Rallusigence",
      "description": "Agencia de sitios web con IA para PYMEs mexicanas. Precio fijo, entrega en 3 a 12 dias.",
      "url": "https://rallusigence.net",
      "logo": { "@type": "ImageObject", "url": "https://rallusigence.net/assets/kiwi-icon.svg" },
      "image": "https://rallusigence.net/og-image.jpg",
      "telephone": "+52-XXXXXXXXXX",
      "email": "hola@rallusigence.net",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Tizayuca",
        "addressRegion": "Hidalgo",
        "addressCountry": "MX"
      },
      "areaServed": [
        { "@type": "Country", "name": "Mexico" },
        { "@type": "City", "name": "Ciudad de Mexico" },
        { "@type": "City", "name": "Guadalajara" },
        { "@type": "City", "name": "Monterrey" }
      ],
      "priceRange": "$$",
      "currenciesAccepted": "MXN",
      "sameAs": [
        "https://www.facebook.com/rallusigence",
        "https://www.instagram.com/rallusigence"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Paquetes de sitios web",
        "itemListElement": [
          { "@type": "Offer", "name": "Paquete Lanzamiento", "priceCurrency": "MXN", "price": "6000" },
          { "@type": "Offer", "name": "Paquete Profesional", "priceCurrency": "MXN", "price": "12000" },
          { "@type": "Offer", "name": "Paquete Avanzado", "priceCurrency": "MXN", "price": "20000" }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://rallusigence.net/#website",
      "url": "https://rallusigence.net",
      "name": "Rallusigence",
      "publisher": { "@id": "https://rallusigence.net/#business" }
    }
  ]
}
```

Agregar ademas `FAQPage` schema en `app/paquetes/page.tsx` (5 preguntas frecuentes listas para featured snippets) y `BlogPosting` schema en `app/blog/[slug]/page.tsx`.

**Impacto SEO:** Alto
**Prioridad:** Alta

---

## 5. Keywords — Estrategia Debil y Termino Negativo

**Estado actual:** Keywords en `layout.tsx`: "sitio web profesional, diseno web Mexico, agencia web Mexico, sitio web barato, sitio web rapido"

**Problema/Oportunidad:**
1. "sitio web barato" contradice el posicionamiento premium de Rallusigence. Google asocia "barato" con baja calidad, afectando la senal E-E-A-T.
2. El meta tag `keywords` no es factor de ranking en Google desde 2009, pero si lo usan Bing y herramientas de analisis.
3. La keyword de mayor diferenciacion — "sitio web en 3 dias" — no aparece en ningun meta ni en el H1 del home.

**Solucion propuesta:**

Actualizar el campo keywords:
```typescript
keywords: "diseno web Mexico, pagina web para negocios, sitio web para PYME, agencia web precio fijo, sitio web con IA, presencia digital Mexico",
```

El esfuerzo principal debe ir a integrar keywords target en el H1 de la home (ver hallazgo 10).

**Impacto SEO:** Medio
**Prioridad:** Media

---

## 6. Core Web Vitals — Factores de Riesgo en el Codigo

**Estado actual:** Stack Next.js 15 estatico en Firebase Hosting con CDN global. Riesgos identificados:

### 6.1 LCP (Largest Contentful Paint) — Riesgo Medio

`next.config.ts` tiene `images: { unoptimized: true }`. Desactiva conversion a WebP/AVIF, `srcset` responsivo y compresion optimizada. La imagen del hero es SVG con `priority` correctamente configurado — sin impacto ahora. Cuando se agreguen imagenes JPG/PNG de portafolio o blog, el impacto en LCP sera significativo sin pipeline de optimizacion.

**Solucion:** Para export estatico, usar `sharp` en script de build para generar versiones WebP, o activar Firebase Extensions "Resize Images".

### 6.2 CLS (Cumulative Layout Shift) — Riesgo Medio-Alto

Tres elementos identificados como fuentes potenciales de CLS:
- `IntroOverlay` — si desplaza contenido durante su animacion de entrada (debe ser `position: fixed`)
- `StickyCTA` — puede causar recalculo de layout al aparecer en pantalla
- `ScrollRevealProvider` — las clases `.reveal` deben usar exclusivamente `opacity` y `transform`. Si usan `display: none -> block` o modifican dimensiones, causaran CLS.

### 6.3 INP (Interaction to Next Paint) — Riesgo Bajo-Medio

`HeroSection` y `PackagesSection` tienen `use client` por handlers de analytics. Aumenta el JS bundle y retrasa la hidratacion. Evaluar mover clicks de analytics a `data-*` attributes manejados por un script global, permitiendo convertir esas secciones a Server Components.

### 6.4 Tracking — No Funcional (Critico pre-lanzamiento)

Placeholders en `layout.tsx` que deben reemplazarse antes del lanzamiento:
- `GA_ID = "G-XXXXXXXXXX"` — ID real de GA4
- `META_PIXEL_ID = "TU_PIXEL_ID"` — ID real de Meta Pixel
- `https://wa.me/52XXXXXXXXXX` — numero real (en HeroSection y /gracias)

Sin estos datos no hay capacidad de medir conversiones ni optimizar SEO.

**Impacto SEO:** Alto (tracking) / Medio (CWV potencial)
**Prioridad:** Alta (tracking) / Media (CWV)

---

## 7. SEO Local Mexico — Oportunidad sin Aprovechar

**Estado actual:** Schema con `areaServed: { "@type": "Country", "name": "Mexico" }` sin direccion, telefono ni ciudad. No hay mencion de Google Business Profile.

**Problema/Oportunidad:** El Local Pack de Google (3 resultados del mapa sobre el ranking organico) requiere GBP verificado y senales locales en schema. La base de operaciones es Tizayuca, Hidalgo (segun aviso de privacidad). Los buyer personas muestran clientes en Leon, Merida, Puebla, CDMX.

**Solucion propuesta:**

1. **Google Business Profile (GBP):** Crear y verificar en `business.google.com`. Categoria: "Agencia de diseno web". Area de servicio: todo Mexico. Publicar fotos del equipo y casos de estudio.

2. **Schema LocalBusiness completo:** Ver propuesta en hallazgo 4 (incluye `address` en Tizayuca, Hidalgo).

3. **Paginas de ciudad (mes 2-3):** Para escalar SEO local:
   - `/diseno-web-guadalajara`
   - `/diseno-web-monterrey`
   - `/diseno-web-cdmx`
   - `/diseno-web-leon-guanajuato`
   Cada una con contenido unico, H1 con ciudad, y schema `LocalBusiness` con `addressLocality` correspondiente.

4. **Portafolio local:** Los casos ya mencionan "Leon, Guanajuato" y "Merida, Yucatan". Agregar articulos de blog con casos locales para reforzar senales geograficas.

**Impacto SEO:** Alto
**Prioridad:** Alta (GBP) / Media (paginas de ciudad)

---

## 8. Estructura de URLs — Analisis

**Estado actual:**

| URL | Evaluacion | Observacion |
|-----|-----------|-------------|
| `/` | Optima | — |
| `/paquetes` | Buena | Podria ser `/paquetes-sitio-web`, no urgente |
| `/como-funciona` | Buena | URL descriptiva y semantica |
| `/portafolio` | Buena | — |
| `/blog` | Estandar | Correcto |
| `/blog/[slug]` | Excelente | Slug dinamico desde frontmatter |
| `/auditoria-gratis` | Excelente | Keyword + intencion en la URL |
| `/gracias` | Excluir de indexacion | Ver hallazgo 3 |
| `/aviso-de-privacidad` | Correcto como URL | Debe ser noindex |
| `/terminos-y-condiciones` | Correcto como URL | Debe ser noindex |

**Oportunidad blog:** Los slugs de articulos deben incluir la keyword principal. Patron correcto: `cuanto-cuesta-pagina-web-mexico` (sin fechas, sin IDs numericos).

**Impacto SEO:** Medio
**Prioridad:** Baja

---

## 9. Internal Linking — Estructura Debil

**Estado actual:** En el contenido de paginas:
- `/` linkea a `/#paquetes` y `/#contacto` (anclas internas)
- `/paquetes`, `/como-funciona`, `/portafolio` linkean a `/#contacto` (devuelve al home)
- `/blog/[slug]` linkea a `/auditoria-gratis` (correcto)

**Problemas:**
1. CTAs de paginas interiores con `href="/#contacto"` devuelven al usuario al home en lugar de la landing de conversion `/auditoria-gratis`.
2. No hay cross-links entre paginas de servicios: `/como-funciona` no enlaza a `/paquetes` y viceversa.
3. `/auditoria-gratis` no es enlazada en el contenido principal del home.

**Solucion propuesta:**

En paginas interiores, cambiar el CTA principal:
- Antes: `href="/#contacto"`
- Despues: `href="/auditoria-gratis"`

Agregar al final de `/como-funciona`: enlace a `/paquetes` ("Ver precios y paquetes").
Agregar al final de `/paquetes`: enlace a `/como-funciona` ("Ver como funciona el proceso").
Agregar de `/portafolio` a `/paquetes` ("Ver todos nuestros paquetes disponibles").

**Impacto SEO:** Medio
**Prioridad:** Media

---

## 10. Contenido — Keywords, Jerarquia de Headings y Oportunidades

### Home (/)
- **H1:** "Tu negocio en internet en 3 dias." — Fuerte en USP, debil en keywords. "internet" es vago; "sitio web" es mas preciso para SEO.
- **H2s:** jerarquia correcta (una H2 por seccion principal). Bien estructurado.
- **Keywords ausentes en H1:** "diseno web", "pagina web", "Mexico". Ninguna keyword de alto volumen aparece en el elemento mas importante para SEO.
- **Contenido indexable escaso:** Las secciones son concisas (bien para conversion), Google tiene poco texto para entender el contexto tematico.

### /paquetes
- **H1:** "Elige tu paquete. Precio fijo. Sin sorpresas." — Sin "sitio web" ni "Mexico".
- **H3s FAQ:** Excelente estructura para featured snippets de Google (voice search, PAA).
- **Oportunidad:** Agregar parrafo introductorio con keywords: "Nuestros paquetes de diseno web para negocios mexicanos incluyen..."

### /como-funciona
- **H1:** "De cero a tu sitio en linea. Sin reuniones, sin esperas." — Sin keywords objetivo.
- **Bug de idioma:** La pagina usa voseo argentino mezclado con tuteo mexicano: "Generás un codigo de retiro", "Nos compartís los digitos". El sitio declara `lang="es-MX"`. Esta inconsistencia afecta la senal E-E-A-T de calidad de contenido.

### /portafolio
- **H1:** "Trabajos realizados" — Muy debil. Sin "sitio web", "diseno web" ni contexto geografico.
- **Recomendacion:** Cambiar a "Sitios Web Entregados a Negocios Mexicanos" o similar.
- **Los 2 casos coinciden exactamente con los buyer personas del research** — son perfiles de validacion ficticios. Reemplazar con casos reales en cuanto esten disponibles.

### /auditoria-gratis
- **H1:** "Auditoria digital GRATIS para tu negocio" — "GRATIS" en mayusculas puede interpretarse como senal de spam por algoritmos de calidad. Cambiar a titulo case normal.
- **Cifra de prueba social:** "600+ negocios mexicanos ya mejoraron" — inverificable para agencia nueva. Puede danar credibilidad. Reemplazar con metricas reales o eliminar hasta tenerlas.

### /blog y /blog/[slug]
- Estructura del articulo excelente: `<article>`, `<header>`, `<h1>` desde frontmatter, `<time dateTime>`, breadcrumb.
- Falta: `BlogPosting` schema (ver hallazgo 4).
- `openGraph.images` no declarado en `generateMetadata` — los articulos individuales no tienen preview social.
- Sin articulos publicados actualmente ("Pronto publicamos el primer articulo").

**Impacto SEO:** Alto (H1 home + portafolio + auditoria) / Medio (resto)
**Prioridad:** Alta / Media

---

## 11. Plan de Contenido Blog — Oportunidad Estrategica

**Estado actual:** Blog tecnicamente funcional (MDX, rutas dinamicas, metadata generada) pero sin ningun articulo publicado.

**Problema/Oportunidad:** El blog es el mayor activo SEO no explotado. Los buyer personas (Dr. Roberto busca "sistema citas dentista", Maria Elena busca "como aparecer primero en Google") son exactamente el trafico que generan keywords informacionales de alto volumen.

**Plan de contenido inicial — 8 articulos en 3 meses:**

| Articulo | Keyword target | Intencion | Mes |
|---------|---------------|-----------|-----|
| Cuanto cuesta una pagina web en Mexico en 2026 | cuanto cuesta pagina web mexico | Comercial/Info | 1 |
| Como aparecer en Google con tu negocio sin pagar | como aparecer en google mi negocio | Informacional | 1 |
| Landing page vs sitio web completo para tu PYME | landing page vs sitio web pyme | Informacional | 1 |
| Sitio web para dentistas: guia para conseguir mas pacientes | sitio web dentista mexico | Vertical | 2 |
| Sitio web para restaurantes en Mexico: que debe incluir | pagina web restaurante mexico | Vertical | 2 |
| Firebase Hosting gratis: como funciona para tu negocio | firebase hosting gratis negocio | Tecnico | 2 |
| SEO local: como posicionar tu negocio en Google Maps | seo local negocio mexico | Informacional | 3 |
| Diseno web con IA: ventajas para pequenas empresas mexicanas | diseno web con ia mexico | Emergente | 3 |

Schema `BlogPosting` para `app/blog/[slug]/page.tsx`:
```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": frontmatter.title,
      "description": frontmatter.description,
      "datePublished": frontmatter.date,
      "dateModified": frontmatter.date,
      "author": { "@type": "Person", "name": frontmatter.author },
      "publisher": { "@id": "https://rallusigence.net/#business" },
      "mainEntityOfPage": "https://rallusigence.net/blog/" + slug
    })
  }}
/>
```

**Impacto SEO:** Alto (trafico organico sostenido a mediano plazo)
**Prioridad:** Alta

---

## 12. Analisis de Competidores

Investigacion realizada julio 2026:

### SeñalDigital (senaldigital.mx)
- Precios: desde $5,900 MXN — similar a Rallusigence
- Diferenciador: SEO Local + "GEO para IA" en plan premium ($24,000 MXN)
- Debilidad: no comunica velocidad de entrega. Sin propuesta "en 3 dias"
- Keywords atacadas: "diseno web Mexico PYMEs", "SEO local Mexico", "agencia SEO Mexico"

### BastianSoft (bastiansoft.com)
- Precios: $7,000-$55,000 MXN (rango mas alto)
- Diferenciador: blog educacional extenso con dominio de autoridad creciente
- Debilidad: precios mas altos, sin velocidad ni precio fijo como USP
- Keywords dominadas: "cuanto cuesta pagina web mexico", "empresa diseno web mexico 2026"

### Administratool (administratool.com.mx)
- Enfoque: PYME y tiendas online en multiples ciudades mexicanas
- Posicionamiento geografico: CDMX, GDL, MTY, Merida, SLP
- Debilidad: sitio visualmente desactualizado, sin diferenciador claro

### Oportunidad competitiva de Rallusigence
La combinacion "3 dias + precio fijo + sin mensualidades + IA" no la tiene ningun competidor identificado. Keywords de nicho a explotar con baja competencia y alta intencion de compra:
- "sitio web precio fijo Mexico"
- "pagina web en 3 dias Mexico"
- "diseno web sin mensualidades Mexico"

---

## 13. Tabla de 20 Keywords Prioritarias

| # | Keyword | Intencion | Vol. Est. MX/mes | Dificultad | Pagina Target |
|---|---------|-----------|-----------------|------------|--------------|
| 1 | diseno web para negocios Mexico | Comercial | Alto 10K+ | Alta | Home |
| 2 | pagina web profesional Mexico | Comercial | Alto 10K+ | Alta | Home |
| 3 | cuanto cuesta una pagina web en Mexico | Informacional | Alto 5K-10K | Media | Blog |
| 4 | hacer pagina web para mi negocio | Comercial | Medio 2K-5K | Media | Home / Paquetes |
| 5 | agencia de diseno web Mexico | Comercial | Medio 2K-5K | Alta | Home |
| 6 | pagina web para PYME Mexico | Comercial | Medio 1K-2K | Media | Home / Paquetes |
| 7 | como aparecer en Google mi negocio | Informacional | Medio 2K-5K | Media | Blog |
| 8 | landing page precio Mexico | Comercial | Medio 1K-2K | Media | Paquetes |
| 9 | sitio web en 3 dias Mexico | Comercial alta intencion | Bajo <1K | Baja | Home |
| 10 | diseno web precio fijo Mexico | Comercial diferenciador | Bajo <1K | Baja | Home / Paquetes |
| 11 | pagina web sin mensualidades Mexico | Comercial diferenciador | Bajo <500 | Muy Baja | Home / Paquetes |
| 12 | diseno web con IA Mexico | Info/Comercial | Bajo-Medio 500-2K | Baja | Home / Blog |
| 13 | pagina web para dentista Mexico | Vertical local | Bajo-Medio 500-2K | Baja | Blog / Portafolio |
| 14 | pagina web para restaurante Mexico | Vertical local | Bajo-Medio 500-2K | Baja | Blog / Portafolio |
| 15 | agencia web sin contrato mensual | Comercial diferenciador | Bajo <500 | Muy Baja | Home |
| 16 | sitio web pequeno negocio Mexico | Comercial | Medio 1K-2K | Media | Home / Paquetes |
| 17 | SEO local negocio Mexico | Informacional | Medio 1K-2K | Media | Blog |
| 18 | Firebase Hosting gratis sitio web | Tecnico/Info | Bajo-Medio | Baja | Blog |
| 19 | presencia digital para negocios Mexico | Informacional | Bajo-Medio 500-1K | Baja | Home / Blog |
| 20 | auditoria digital gratis Mexico | Comercial lead magnet | Bajo <500 | Baja | /auditoria-gratis |

Nota: Volumenes estimados con base en benchmarks de mercado y analisis de competidores. Verificar con Google Keyword Planner o Ahrefs una vez activo el dominio y Search Console configurada.

---

## Resumen de Acciones por Prioridad

### Prioridad Alta — Antes del lanzamiento
1. Crear `public/robots.txt` y `public/sitemap.xml`
2. Crear OG image (1200x630px) y agregar a metadata global con Twitter card
3. Agregar metadata a `/auditoria-gratis`; agregar noindex a `/gracias`, `/aviso-de-privacidad`, `/terminos-y-condiciones`
4. Reemplazar JSON-LD con schema completo (LocalBusiness + WebSite + hasOfferCatalog)
5. Agregar FAQPage schema en `/paquetes`
6. Agregar BlogPosting schema en `/blog/[slug]`
7. Reemplazar todos los placeholders: GA4 ID, Meta Pixel ID, numero WhatsApp
8. Optimizar H1 de home para incluir "sitio web" o "diseno web" y "Mexico"
9. Crear perfil de Google Business Profile y verificarlo

### Prioridad Media — Primera semana post-lanzamiento
10. Actualizar keywords meta y eliminar "sitio web barato"
11. Corregir voseo argentino en `/como-funciona` por tuteo mexicano
12. Cambiar CTAs de paginas interiores de `/#contacto` a `/auditoria-gratis`
13. Cambiar H1 de `/portafolio` a texto con keyword
14. Agregar cross-links entre `/como-funciona` y `/paquetes`
15. Corregir "GRATIS" en mayusculas en H1 de `/auditoria-gratis`
16. Revisar y corregir riesgo CLS en `IntroOverlay` y `StickyCTA`
17. Declarar canonical explicito en paginas de alto valor

### Prioridad Baja — Mes 1-2 post-lanzamiento
18. Publicar los 8 articulos de blog del plan de contenido
19. Reemplazar casos ficticios del portafolio con clientes reales
20. Crear paginas de ciudad para SEO local a escala
21. Implementar `app/sitemap.ts` dinamico para incluir posts de blog automaticamente
22. Implementar pipeline de optimizacion de imagenes para reemplazar `images: { unoptimized: true }`

---

*Reporte generado por: Especialista SEO — Agencia IA Alfredo*
*Fuentes: SeñalDigital (senaldigital.mx), BastianSoft (bastiansoft.com), Administratool (administratool.com.mx), Listoweb (listoweb.com.mx), GoDaddy Latam*
*Siguiente reporte en esta carpeta: reporte-aeo-ia-search.md*
