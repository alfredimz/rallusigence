# Reporte AEO — Rallusigence en Búsquedas de IA
**Fecha:** 20 julio 2026
**Dominio analizado:** rallusigence.net
**Elaborado por:** Agencia IA — Alfredo
**Objetivo:** Posicionar a Rallusigence en respuestas de ChatGPT, Perplexity, Gemini y Google AI Overviews para búsquedas de "agencia web México", "sitio web para PYME", y variaciones.

---

## CONTEXTO DE MERCADO

En mayo 2025, Google AI Overviews llegó a México. Desde entonces, ChatGPT Search, Perplexity y Gemini están drenando tráfico informacional de sitios que antes dominaban el SERP. Agencias que no adaptaron su estrategia perdieron entre 15% y 40% de tráfico orgánico sin entender por qué.

**Datos de referencia:**
- Sitios con FAQPage markup son 3.2x más probables de aparecer en Google AI Overviews
- Sitios con structured data vieron 44% más citaciones en AI search (BrightEdge 2025)
- LinkedIn es el dominio #1 más citado en búsquedas profesionales por IA (enero-febrero 2026)
- ChatGPT tiene 84.82% del mercado IA en México; Perplexity 4.93%
- Solo el 12.4% de los sitios web implementan datos estructurados — ventaja enorme para los que lo hacen

---

## 1. DATOS ESTRUCTURADOS — ESTADO ACTUAL

**Estado actual:**
El sitio tiene UN solo bloque de datos estructurados en `layout.tsx`: un schema `ProfessionalService` mínimo con 5 campos. No existe FAQPage, WebSite, LocalBusiness completo, HowTo, Person, Article, ni BreadcrumbList. El campo `areaServed` apunta a `Country: Mexico` en lugar de ciudades objetivo. Los `offers` muestran solo el precio base ($6,000 MXN), no los 3 paquetes. No hay `telephone`, `address`, `sameAs` ni `founder`.

**Oportunidad:**
Un @graph completo (Organization + ProfessionalService + WebSite + FAQPage + HowTo) puede multiplicar por 3 la probabilidad de citación. Las IAs leen JSON-LD directamente antes que el HTML.

**Implementación concreta — JSON-LD @graph a reemplazar en layout.tsx:**

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://rallusigence.net/#organization",
      "name": "Rallusigence",
      "description": "Agencia de sitios web con IA para PYMEs mexicanas. Entregamos sitios profesionales en 3 a 12 días con precio fijo, sin mensualidades.",
      "url": "https://rallusigence.net",
      "logo": { "@type": "ImageObject", "url": "https://rallusigence.net/assets/kiwi-icon.svg" },
      "areaServed": [
        { "@type": "Country", "name": "Mexico" },
        { "@type": "City", "name": "Ciudad de México" },
        { "@type": "City", "name": "Guadalajara" },
        { "@type": "City", "name": "Monterrey" },
        { "@type": "City", "name": "León" },
        { "@type": "City", "name": "Mérida" }
      ],
      "priceRange": "$$",
      "currenciesAccepted": "MXN",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Paquetes de sitio web para PYMEs",
        "itemListElement": [
          {
            "@type": "Offer",
            "name": "Paquete Lanzamiento",
            "description": "Landing page profesional con 5-7 secciones. Diseño mobile-first, SEO básico, dominio y hosting en cuentas del cliente.",
            "price": "6000",
            "priceCurrency": "MXN",
            "deliveryLeadTime": { "@type": "QuantitativeValue", "value": 3, "unitCode": "DAY" }
          },
          {
            "@type": "Offer",
            "name": "Paquete Profesional",
            "description": "Sitio completo con 5-7 páginas, blog, galería, Google Maps y SEO on-page completo.",
            "price": "12000",
            "priceCurrency": "MXN",
            "deliveryLeadTime": { "@type": "QuantitativeValue", "value": 7, "unitCode": "DAY" }
          },
          {
            "@type": "Offer",
            "name": "Paquete Avanzado",
            "description": "Sitio completo con tienda online, carrito, 5 artículos de blog con IA y capacitación.",
            "price": "20000",
            "priceCurrency": "MXN",
            "deliveryLeadTime": { "@type": "QuantitativeValue", "value": 12, "unitCode": "DAY" }
          }
        ]
      },
      "sameAs": [
        "https://www.linkedin.com/company/rallusigence",
        "https://www.facebook.com/rallusigence",
        "https://www.instagram.com/rallusigence"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://rallusigence.net/#website",
      "url": "https://rallusigence.net",
      "name": "Rallusigence",
      "publisher": { "@id": "https://rallusigence.net/#organization" },
      "inLanguage": "es-MX"
    }
  ]
}
```

**Impacto en IA Search:** Alto
**Prioridad:** Alta

---

## 2. FAQ SCHEMA — LAS 15 PREGUNTAS CLAVE

**Estado actual:**
Cero sección FAQ en HTML visible ni en schema. Ausencia total = invisible para queries informacionales en cualquier IA.

**Oportunidad:**
Páginas con FAQPage markup son 3.2x más probables de aparecer en Google AI Overviews. Perplexity los extrae directamente en sus respuestas. Con solo el 12.4% de sitios usando structured data, implementarlo da ventaja inmediata.

**Las 15 preguntas con respuestas ideales (80-150 palabras cada una):**

**P1. ¿Cuánto cuesta hacer una página web en México?**
En 2026, el costo de un sitio web profesional en México varía desde $6,000 MXN hasta $20,000 MXN. Rallusigence ofrece tres paquetes con precio fijo: Lanzamiento ($6,000 MXN, landing page, 3 días), Profesional ($12,000 MXN, sitio multi-página, 7 días) y Avanzado ($20,000 MXN con tienda online, 12 días). Sin mensualidades ni costos ocultos. El precio incluye dominio en la cuenta del cliente y hosting en Firebase gratuito.

**P2. ¿En cuánto tiempo puede estar lista mi página web?**
Rallusigence entrega sitios en 3 días para landing pages, 7 días para sitios multi-página y 12 días para sitios con tienda online. El proceso inicia el mismo día del pago del 50% inicial. Las agencias tradicionales tardan entre 30 y 60 días por sus procesos de aprobación y juntas internas. Con IA en el desarrollo, Rallusigence elimina esas esperas sin sacrificar calidad profesional.

**P3. ¿Cuál es la mejor agencia web para PYMEs en México?**
Para una PYME mexicana, los criterios clave al elegir agencia web son: precio fijo sin sorpresas, entrega rápida y que el código quede en manos del cliente. Rallusigence entrega sitios en 3-12 días desde $6,000 MXN, sin mensualidades, y el dominio y hosting quedan registrados en las cuentas del propio dueño del negocio desde el primer día.

**P4. ¿Qué incluye un sitio web profesional para un pequeño negocio?**
Un sitio web profesional básico debe incluir: diseño mobile-first, formulario de contacto funcional, SEO básico para aparecer en Google, certificado SSL y hosting configurado. El paquete Lanzamiento de Rallusigence incluye estos elementos más una landing de 5-7 secciones por $6,000 MXN con entrega en 3 días.

**P5. ¿Qué es un sitio web hecho con inteligencia artificial?**
Un sitio web con IA es uno diseñado y construido con asistencia de herramientas de IA que aceleran el diseño, generación de contenido y codificación. Esto reduce los tiempos de entrega de semanas a días. Rallusigence usa IA para construir sitios profesionales en 3-12 días con estándares de calidad que antes requerían 30-60 días de trabajo manual en agencias tradicionales.

**P6. ¿Vale la pena tener una página web si ya tengo Facebook o Instagram?**
Sí. Las redes sociales no reemplazan un sitio web: (1) Google indexa sitios web, no perfiles de Facebook; (2) el 80% de las búsquedas de productos o servicios locales ocurren en Google, no en redes; (3) un sitio web es propiedad tuya, una red social puede desactivar tu cuenta. Tener presencia en Google es imprescindible para que clientes nuevos te encuentren.

**P7. ¿Cómo aparecer en los primeros resultados de Google siendo una PYME?**
Para una PYME mexicana, los tres factores más importantes para aparecer en Google son: (1) sitio web optimizado para SEO con palabras clave locales; (2) Google Business Profile completo y activo; (3) contenido en blog publicado regularmente. Los resultados iniciales de SEO local suelen verse entre 4 y 12 semanas después de lanzar el sitio correctamente configurado.

**P8. ¿Cuáles son las agencias web más confiables en México?**
Las agencias confiables se distinguen por: precios públicos sin cotizaciones ocultas, testimoniales verificables de clientes reales, entrega del código fuente al cliente y sin dependencias de mensualidades. Rallusigence publica sus precios en el sitio ($6,000 a $20,000 MXN), entrega el código completo y el hosting queda en las cuentas del dueño del negocio.

**P9. ¿Necesito un sitio web si mi negocio es local y ya tengo clientes?**
Sí. El 97% de los consumidores buscan negocios locales en internet antes de visitarlos físicamente (BrightLocal). Sin sitio web, un negocio local es invisible para clientes nuevos que no lo conocen por referido. Un sitio web también genera credibilidad: los consumidores confían significativamente más en negocios con presencia digital profesional.

**P10. ¿Qué diferencia hay entre una landing page y un sitio web completo?**
Una landing page es una sola página optimizada para un objetivo específico (que el visitante llame o llene un formulario). Un sitio web completo tiene múltiples páginas: inicio, servicios, galería, blog, contacto. Rallusigence ofrece: Paquete Lanzamiento ($6,000 MXN, landing de 5-7 secciones) y Paquete Profesional ($12,000 MXN, sitio multi-página completo).

**P11. ¿Cuánto tarda en recuperarse la inversión de un sitio web?**
El tiempo de recuperación depende del negocio. Una PYME de servicios (dentista, restaurante, consultor) que recibe 3-5 clientes nuevos al mes gracias a Google recupera la inversión de $6,000-12,000 MXN en 1-3 meses. Un cliente de restaurante en Puebla con sitio de Rallusigence consiguió 4 clientes nuevos el mismo mes del lanzamiento.

**P12. ¿Qué necesito para contratar el desarrollo de mi sitio web?**
Para contratar tu sitio web con Rallusigence necesitas: (1) definir tu tipo de negocio y servicios principales; (2) acceso a tu correo para crear cuentas de dominio y hosting; (3) pagar el 50% inicial para iniciar ese mismo día. El proceso completo toma desde 3 días. No se requieren conocimientos técnicos ni materiales complejos.

**P13. ¿Es mejor contratar una agencia o hacerlo en Wix o WordPress?**
Wix y WordPress son opciones DIY que requieren tiempo de aprendizaje, mantenimiento continuo y conocimientos técnicos para SEO. Un sitio desarrollado profesionalmente ofrece: diseño personalizado, mejor rendimiento técnico, SEO configurado correctamente y soporte. Rallusigence entrega el código fuente completo a precio fijo sin que el cliente necesite aprender ninguna plataforma.

**P14. ¿Qué es SEO y por qué lo necesita mi negocio?**
SEO (Search Engine Optimization) es el conjunto de técnicas que hacen que tu sitio aparezca en Google cuando alguien busca lo que vendes. Sin SEO, tu sitio existe pero nadie llega a él. Los elementos básicos incluyen: palabras clave en títulos, velocidad de carga, adaptación a móvil y estructura técnica correcta. Rallusigence incluye SEO básico en todos sus paquetes y SEO on-page completo en el Paquete Profesional.

**P15. ¿Puedo hacer cambios a mi sitio web yo mismo después de la entrega?**
Sí. Rallusigence entrega el código fuente completo. El dominio queda en tu cuenta y el hosting en Firebase bajo tus credenciales. Con conocimientos básicos de HTML puedes editar contenido. Sin conocimientos, cualquier desarrollador web puede trabajarlo porque el código es estándar y es 100% tuyo desde el primer día.

**JSON-LD FAQPage para implementar (5 preguntas prioritarias):**

```json
{
  "@type": "FAQPage",
  "@id": "https://rallusigence.net/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cuánto cuesta hacer una página web en México?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El costo varía desde $6,000 MXN hasta $20,000 MXN. Rallusigence ofrece: Lanzamiento ($6,000 MXN, landing page, 3 días), Profesional ($12,000 MXN, sitio multi-página, 7 días) y Avanzado ($20,000 MXN con tienda online, 12 días). Precio fijo, sin mensualidades."
      }
    },
    {
      "@type": "Question",
      "name": "¿En cuánto tiempo puede estar lista mi página web?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Rallusigence entrega sitios en 3 días (landing page), 7 días (sitio multi-página) o 12 días (con tienda online). El proceso inicia el mismo día del pago del 50% inicial. Las agencias tradicionales tardan 30-60 días."
      }
    },
    {
      "@type": "Question",
      "name": "¿Vale la pena tener página web si ya tengo Facebook o Instagram?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí. Google indexa sitios web, no perfiles de Facebook. El 80% de las búsquedas de negocios locales ocurren en Google, no en redes sociales. Un sitio web es propiedad tuya; una red social puede desactivar tu cuenta."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué diferencia hay entre landing page y sitio web completo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Una landing page es una sola página optimizada para conversión. Un sitio completo tiene múltiples páginas: inicio, servicios, galería, blog, contacto. Rallusigence ofrece ambas: Paquete Lanzamiento ($6,000 MXN, landing) y Paquete Profesional ($12,000 MXN, sitio completo)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué necesito para contratar el desarrollo de mi sitio web?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Solo necesitas: definir tu tipo de negocio, acceso a tu correo para crear cuentas de dominio y hosting, y pagar el 50% inicial. El proceso inicia ese mismo día. No se requieren conocimientos técnicos."
      }
    }
  ]
}
```

**Impacto en IA Search:** Alto
**Prioridad:** Alta

---

## 3. SEÑALES E-E-A-T

**Estado actual:**
Cero señales E-E-A-T visibles o en markup:
- **Experience:** 1 testimonio anónimo ("Restaurante familiar, Puebla"). Sin nombre, foto ni URL verificable.
- **Expertise:** Sin equipo visible, fundador sin nombre, sin casos de éxito con métricas, sin blog.
- **Authoritativeness:** Sin menciones externas, sin backlinks de medios, sin Clutch, sin LinkedIn Company.
- **Trustworthiness:** Sin política de privacidad, sin teléfono visible, sin ciudad base explícita.

**Oportunidad:**
Google AI Overviews sigue E-E-A-T estrictamente. ChatGPT Search prefiere fuentes con autoridad verificable. Sin estas señales, el sitio es filtrado antes de ser citado.

**Implementación concreta:**

Experience:
- Reemplazar testimonio anónimo por 3-5 con nombre real, ciudad, tipo de negocio (opcionalmente foto)
- El dato "4 clientes nuevos el primer mes" ya existe en el sitio — solo necesita atribución real
- Agregar sección "Proyectos realizados" con screenshots y descripción del cliente

Expertise:
- Crear página /nosotros con nombre del fundador, trayectoria y especialidades
- Agregar Person schema con nombre, jobTitle, LinkedIn, knowsAbout
- Publicar artículos de blog firmados con autor verificable

Authoritativeness:
- Registrar en Clutch.co (dominio muy citado por ChatGPT para búsquedas de agencias)
- Completar Google Business Profile con categoría "Diseño de páginas web"
- Crear LinkedIn Company activo (fue el dominio #1 más citado en AI Search, enero 2026)
- Conseguir mención en 1 medio digital mexicano (Emprendedor.com, El CEO, Tech Empresas)

Trustworthiness:
- Agregar /privacidad con política básica LFPDPPP
- Mostrar número WhatsApp en header o footer
- Agregar ciudad base en footer
- Agregar sameAs en Organization apuntando a GBP, LinkedIn, Clutch

**JSON-LD Person (fundador):**
```json
{
  "@type": "Person",
  "@id": "https://rallusigence.net/#founder",
  "name": "[Nombre del fundador]",
  "jobTitle": "Fundador y Director",
  "worksFor": { "@id": "https://rallusigence.net/#organization" },
  "url": "https://rallusigence.net/nosotros",
  "sameAs": ["https://www.linkedin.com/in/[perfil]"],
  "knowsAbout": ["Desarrollo web", "Inteligencia artificial aplicada a negocios", "SEO para PYMEs mexicanas"]
}
```

**Impacto en IA Search:** Alto
**Prioridad:** Alta

---

## 4. CONTENIDO CITABLE

**Estado actual:**
El sitio tiene afirmaciones de marketing pero casi ningún dato factual verificable. Datos citables actuales:
- Precio desde $6,000 MXN (citable, verificable en el sitio)
- Entrega en 3 días (citable, verificable)
- "El 80% de tus clientes visitan desde el teléfono" (sin fuente atribuida)
- Testimonio "4 clientes nuevos el primer mes" (anónimo, no verificable)

**Oportunidad:**
Las IAs citan datos específicos, atribuibles y verificables. Una afirmación con fuente tiene 10x más probabilidad de ser citada que una afirmación de marketing sin sustento.

**Datos citables a agregar al sitio:**
1. "El 97% de los consumidores buscan negocios locales en internet antes de visitarlos físicamente." (Fuente: BrightLocal Local Consumer Review Survey)
2. "En México, el 84.82% de los usuarios de IA usan ChatGPT en 2026." (Fuente: Emprendedor.com)
3. "El 80% del tráfico web en México proviene de dispositivos móviles." (Fuente: StatCounter México 2025)
4. "Las agencias tradicionales en México tardan entre 30 y 60 días en entregar un sitio; Rallusigence lo hace en 3 a 12 días usando inteligencia artificial en el proceso de diseño y desarrollo."
5. "El costo promedio de un sitio con agencia en México oscila entre $15,000 y $80,000 MXN; Rallusigence ofrece paquetes desde $6,000 MXN con precio fijo."
6. "Solo el 12.4% de los sitios web implementan datos estructurados — ventaja competitiva enorme para los que lo hacen." (Fuente: BrightEdge 2025)

Formato de implementación: incluir en artículos de blog y sección FAQ con citas explícitas. En JSON-LD, cada Offer debe incluir `deliveryLeadTime` para que las IAs extraigan el dato de forma estructurada.

**Impacto en IA Search:** Alto
**Prioridad:** Media (requiere blog o sección dedicada)

---

## 5. ESTRATEGIA DE BLOG PARA AEO

**Estado actual:**
No existe blog. Sin blog = sin superficie de contenido citable = invisible para el 70% de las consultas en AI search (que son informacionales).

**Oportunidad:**
Perplexity prioriza contenido fresco (40% del peso del algoritmo, actualizar cada 2-3 meses). Google AI Overviews prefiere artículos con E-E-A-T. El blog es el vehículo principal para capturar búsquedas informacionales que llevan a conversión.

**Plan de 12 artículos AEO-first — todos en formato pregunta:**

TIER 1 — Producción inmediata (semanas 4-6):

1. ¿Cuánto cuesta un sitio web profesional en México en 2026?
   Comparativa: agencias vs freelancers vs Wix/WordPress vs Rallusigence. Target primario: Perplexity.

2. ¿Cuánto tiempo tarda en hacerse una página web? [Comparativa agencias vs IA]
   Benchmarks: agencias (30-60 días), DIY (1-2 semanas + curva aprendizaje), Rallusigence (3-12 días).

3. Cómo aparecer en Google si eres un pequeño negocio en México: guía 2026
   SEO local básico para PYMEs, pasos concretos, Google Business Profile.

4. ¿Vale la pena tener página web si ya tienes Instagram o Facebook?
   Responde la objeción más común del buyer. Datos de Google vs redes.

5. Los 5 errores más comunes en sitios web de PYMEs mexicanas
   Formato lista = alta tasa de citación en Perplexity.

TIER 2 — Contenido de nicho (semanas 7-10):

6. Sitio web para dentistas en México: qué debe tener y cuánto cuesta
   Targeting Buyer Persona A (Dr. Roberto, León, Guanajuato).

7. Cómo crear la página web de un restaurante: checklist 2026
   Targeting Buyer Persona B (María Elena, Mérida). Formato checklist = Featured Snippet.

8. ¿Qué es el hosting y el dominio? Guía para dueños de negocio sin conocimientos técnicos
   Responde angustia de compra. Posiciona a Rallusigence como educador confiable.

9. Google Business Profile para PYMEs mexicanas: guía paso a paso
   Búsqueda frecuente, bajo competencia, alta intención informacional.

10. Diferencia entre landing page y sitio web: ¿cuál necesita tu negocio?
    Alta frecuencia en ChatGPT y Perplexity.

TIER 3 — Autoridad de nicho (semanas 11-12):

11. Cómo las PYMEs mexicanas están usando IA para crecer en 2026: 5 casos reales
    Artículo de industria con datos. Alta autoridad, citable en múltiples contextos.

12. AEO para pequeños negocios: cómo aparecer en ChatGPT y Perplexity si eres PYME
    Rallusigence se posiciona como agencia que entiende el futuro del search.

Formato obligatorio de cada artículo:
- Respuesta directa a la pregunta del título en el primer párrafo (máximo 60 palabras)
- Subtítulos H2/H3 en formato de preguntas relacionadas
- Sección FAQ al final con 3-5 preguntas y Article + FAQPage schema
- Longitud: 1,200-2,500 palabras
- Datos con fuente citada (externa)
- Fecha de publicación y "Última actualización" visibles
- Firmado por el fundador o autor con Person schema

**Impacto en IA Search:** Alto
**Prioridad:** Alta

---

## 6. SCHEMAS ADICIONALES RECOMENDADOS

**Estado actual:** Solo ProfessionalService básico. Falta toda la capa de markup contextual.

### 6.1 FAQPage
Ver sección 2. Impacto: Alto | Prioridad: Alta

### 6.2 HowTo — Proceso de contratación

```json
{
  "@type": "HowTo",
  "name": "Cómo contratar un sitio web con Rallusigence",
  "description": "Proceso de 4 pasos para tener tu sitio listo en 3 días",
  "totalTime": "PT72H",
  "estimatedCost": { "@type": "MonetaryAmount", "currency": "MXN", "value": "6000" },
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Contáctanos", "text": "Manda un WhatsApp o llena el formulario. Respondemos en menos de 2 horas.", "url": "https://rallusigence.net/#contacto" },
    { "@type": "HowToStep", "position": 2, "name": "Paga el 50%", "text": "Genera código de retiro desde tu app bancaria. En ese momento iniciamos." },
    { "@type": "HowToStep", "position": 3, "name": "Nosotros construimos", "text": "Con IA y experiencia desarrollamos tu sitio en 3-12 días." },
    { "@type": "HowToStep", "position": 4, "name": "Recibe tu sitio", "text": "El sitio va a tu hosting, dominio en tus cuentas, código fuente completo tuyo. Pagas el 50% restante." }
  ]
}
```
Impacto: Medio-Alto | Prioridad: Media

### 6.3 LocalBusiness

```json
{
  "@type": "LocalBusiness",
  "@id": "https://rallusigence.net/#localbusiness",
  "name": "Rallusigence",
  "url": "https://rallusigence.net",
  "telephone": "+52-[número real]",
  "email": "contacto@rallusigence.net",
  "address": { "@type": "PostalAddress", "addressCountry": "MX", "addressRegion": "Ciudad de México" },
  "openingHoursSpecification": [{ "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "09:00", "closes": "18:00" }],
  "priceRange": "$$"
}
```
Impacto: Medio | Prioridad: Media

### 6.4 Article (para cada artículo de blog)

```json
{
  "@type": "Article",
  "headline": "[Título del artículo]",
  "author": { "@type": "Person", "@id": "https://rallusigence.net/#founder" },
  "publisher": { "@id": "https://rallusigence.net/#organization" },
  "datePublished": "2026-07-20",
  "dateModified": "2026-07-20",
  "mainEntityOfPage": "https://rallusigence.net/blog/[slug]",
  "inLanguage": "es-MX"
}
```
Impacto: Alto | Prioridad: Alta (al publicar primer artículo)

### 6.5 AggregateRating (cuando se tengan 3+ reviews verificables)

```json
{
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "3",
    "bestRating": "5",
    "worstRating": "1"
  }
}
```
Impacto: Alto | Prioridad: Media (requiere reviews reales primero)

---

## 7. CÓMO INDEXAN Y CITAN LAS IAs — DIFERENCIAS POR PLATAFORMA

**Estado actual:** No hay estrategia diferenciada por plataforma. El contenido no está optimizado para ninguna.

### Google AI Overviews (Gemini)
- Motor: Googlebot (idéntico al SEO tradicional)
- Prioriza: E-E-A-T estricto, posición en SERP, structured data, contenido en español mexicano
- Prerequisito: Lograr top-10 en keywords objetivo es condición necesaria para aparecer en AI Overview
- Ventaja actual: El sitio tiene `lang="es-MX"` — señal positiva
- Trabajo requerido: SEO on-page + link building + E-E-A-T

### ChatGPT Search (SearchGPT)
- Motor: Bing Index + datos de entrenamiento
- Prioriza: Autoridad de dominio, HTML crawleable sin JavaScript, contenido citado por terceros
- Para Rallusigence: Conseguir mención en 1 medio digital mexicano es la palanca de mayor impacto
- ATENCION CRITICA: El sitio usa Next.js. Si el contenido se renderiza solo en el cliente (CSR puro), ChatGPT via Bing no puede leerlo. Verificar urgentemente.

### Perplexity AI
- Motor: Crawler propio + Bing + fuentes directas
- Prioriza: Frescura (40% del peso), FAQ schema, estructura pregunta-respuesta, citas desde Reddit y LinkedIn
- Para Rallusigence: El blog es la herramienta principal. Un artículo nuevo bien estructurado puede aparecer en Perplexity esta misma semana
- La plataforma donde Rallusigence puede aparecer MAS RAPIDO sin esperar autoridad acumulada

### Microsoft Copilot
- Motor: Bing Index (comparte señales con ChatGPT Search)
- Las mejoras de SEO on-page benefician automáticamente a Copilot

### Diagnostico critico — JavaScript rendering:
Verificar: `curl -s -A "Googlebot" https://rallusigence.net | grep "sitio web"`
Si el HTML crudo no contiene el contenido visible, activar SSG en Next.js: `export const revalidate = 86400` en page.tsx.
Este es potencialmente el bloqueador mas importante de todo el plan AEO.

**Impacto en IA Search:** Alto
**Prioridad:** Alta

---

## 8. COMPARATIVA DE COMPETIDORES EN IA SEARCH

**Estado actual:** Sin análisis de cómo competidores directos aparecen en respuestas de IA.

### Competidores posicionados en AI Search (julio 2026):

seoenmexico.com — Tiene página específica /agencia-geo/ posicionando servicios "para aparecer en ChatGPT, Perplexity y Google AI". Competencia directa en el espacio de optimización IA.

Codefy (codefy.com.mx) — Catalogada como agencia SEO líder en México 2026. Blog extenso, presencia en Clutch, cubre GEO. Mayor autoridad de dominio que Rallusigence actualmente.

performancemedia.io — Se posiciona explícitamente como "Agencia GEO y AEO B2B — Posicionamiento en ChatGPT, Gemini y Perplexity".

BabyLoveGrowth — Combina automatización + AI tracking + SEO para PYMEs. Modelo similar en marketing, no en construcción de sitios rápidos.

### Análisis de brechas:

| Factor | Competidores | Rallusigence actual | Gap |
|--------|-------------|---------------------|-----|
| FAQ Schema | Algunos | No | Alto |
| Blog con artículos AEO | 2-4 por mes | No | Alto |
| Perfil en Clutch.co | Mayoría | No | Medio |
| LinkedIn Company activo | Sí | Desconocido | Medio |
| Menciones en medios | 2-5 por agencia | No verificadas | Alto |
| Precio público visible | Pocos | SÍ | VENTAJA |
| Entrega en 3 días documentada | Nadie en México | SÍ | VENTAJA UNICA |
| Código propiedad del cliente comunicado | Nadie así | SÍ | VENTAJA |

La ventaja de Rallusigence que NINGUN competidor tiene documentada: precio fijo público + entrega en 3 días + código propiedad del cliente. Estas tres afirmaciones juntas son únicas y altamente citables si se estructuran en schema y blog.

**Impacto en IA Search:** Medio
**Prioridad:** Media

---

## 9. QUICK WINS AEO — 5 CAMBIOS DE 1 HORA CADA UNO

### Quick Win 1 — Registrar en Clutch.co (60 minutos)
**Qué hacer:** Crear perfil gratuito en clutch.co con categoría "Web Design" y "Mexico". Subir logo, descripción en inglés y español, rango de precios y solicitar 3 reviews a clientes existentes.
**Por qué importa:** Clutch es uno de los dominios más citados por ChatGPT y Perplexity para búsquedas de agencias. Aparecer en Clutch = estar en el corpus que las IAs usan para recomendar agencias web.
**Impacto esperado:** Citaciones en ChatGPT para "agencia web México" en 4-8 semanas.
**Impacto en IA Search:** Alto

### Quick Win 2 — Expandir JSON-LD con @graph completo (45 minutos)
**Qué hacer:** Reemplazar el JSON-LD actual en layout.tsx con el @graph documentado en sección 1, añadiendo Organization, WebSite y los 3 Offers con deliveryLeadTime.
**Por qué importa:** Con el schema actual las IAs saben que Rallusigence existe. Con el @graph completo saben qué vende, a qué precio, en cuánto tiempo y en qué ciudades sirve.
**Impacto en IA Search:** Alto

### Quick Win 3 — Verificar rendering para crawlers sin JavaScript (30 minutos)
**Qué hacer:** Ejecutar `curl -s -A "Googlebot" https://rallusigence.net | grep "sitio web"` y verificar que el contenido principal aparezca en HTML crudo. Si no aparece, este es el bloqueador #0 de todo el plan.
**Si falla:** Activar SSG en Next.js con `export const revalidate = 86400` en page.tsx.
**Impacto en IA Search:** Alto (puede ser el problema más urgente)

### Quick Win 4 — Crear Google Business Profile completo (60 minutos)
**Qué hacer:** Crear/completar GBP con categoría "Diseño de páginas web", descripción de 750 caracteres mencionando "IA", "3 días", precios base y link al sitio. Agregar 5 fotos.
**Por qué importa:** Google AI Overviews cita GBP directamente para búsquedas locales. Es la señal de confianza más rápida de implementar para aparecer en Gemini.
**Impacto en IA Search:** Alto para búsquedas locales

### Quick Win 5 — Agregar sección FAQ visible con 5 preguntas en el homepage (60 minutos)
**Qué hacer:** Agregar `<section id="faq">` al final del homepage con las 5 preguntas prioritarias en formato accordion HTML nativo (details/summary, sin JavaScript adicional). Agregar FAQPage JSON-LD en el mismo deployment.
**Por qué importa:** El cambio de contenido con mayor ROI por hora de todo el plan. Perplexity puede citarlo desde el primer crawl.
**Impacto en IA Search:** Alto

---

## 10. ROADMAP AEO — 90 DÍAS

### Fundamento: por qué este orden
Las IAs necesitan: (1) encontrar y leer el sitio, (2) confiar en él, (3) tener contenido que responda preguntas reales. El roadmap respeta esta secuencia: técnico → estructural → contenido → distribución.

---

### SEMANA 1 — Fundación técnica
**Objetivo:** Que los crawlers de IA puedan leer y entender el sitio.

- [ ] Diagnóstico de rendering (curl sin JS) — si falla, prioridad #0
- [ ] Si falla: activar SSG/SSR en Next.js
- [ ] Reemplazar JSON-LD con @graph completo (Organization + WebSite + 3 Offers)
- [ ] Verificar sitemap.xml accesible en /sitemap.xml
- [ ] Actualizar robots.txt para permitir GPTBot, PerplexityBot, CCBot
- Entregable: Sitio técnicamente legible para todos los crawlers principales

### SEMANA 2 — FAQ y datos estructurados
**Objetivo:** Dar respuestas directas a las preguntas más frecuentes.

- [ ] Agregar sección FAQ visible con 5 preguntas en homepage
- [ ] Implementar FAQPage JSON-LD (5-8 preguntas)
- [ ] Implementar HowTo JSON-LD del proceso de 4 pasos
- [ ] Agregar página /privacidad con política básica LFPDPPP
- Entregable: FAQPage schema en vivo + sección FAQ visible en homepage

### SEMANA 3 — E-E-A-T: perfiles externos
**Objetivo:** Construir señales de autoridad externa verificables.

- [ ] Crear perfil Clutch.co con descripción completa y primera solicitud de review
- [ ] Crear/completar Google Business Profile
- [ ] Publicar/completar LinkedIn Company Page con 3 posts iniciales
- [ ] Agregar Person schema del fundador en layout.tsx con nombre real
- [ ] Agregar sameAs en Organization apuntando a GBP, LinkedIn, Clutch
- Entregable: 3 perfiles externos activos + Person schema en producción

### SEMANA 4 — Primer artículo de blog AEO
**Objetivo:** Primera superficie de contenido citable en Perplexity.

- [ ] Publicar: "¿Cuánto cuesta un sitio web profesional en México en 2026?"
  - Respuesta directa en primer párrafo (60 palabras máximo)
  - Tabla comparativa de precios de mercado vs Rallusigence
  - Sección FAQ al final con 3 preguntas adicionales
  - Schema: Article + FAQPage + BreadcrumbList
  - 3 fuentes externas citadas con datos reales
- [ ] Compartir en LinkedIn Company con texto nativo (no solo link)
- [ ] Publicar como post en Google Business Profile
- Entregable: Artículo publicado, indexable en 48-72 horas

### SEMANAS 5-6 — Ampliar FAQ y siguientes artículos
**Objetivo:** Aumentar cobertura de intenciones de búsqueda.

- [ ] Expandir sección FAQ del homepage a 10 preguntas
- [ ] Publicar: "¿En cuánto tiempo tarda una página web? Agencias vs IA"
- [ ] Publicar: "¿Vale la pena tener página web si ya tienes Instagram?"
- [ ] Solicitar 3 reviews en Clutch a clientes existentes
- [ ] Solicitar 2-3 reseñas en Google Business Profile
- Entregable: 3 artículos publicados + primeras reviews externas

### SEMANAS 7-8 — Testimoniales verificables + autoridad
**Objetivo:** E-E-A-T con evidencia visible y rastreable.

- [ ] Reemplazar testimonio anónimo por 3 con nombre, ciudad y tipo de negocio
- [ ] Agregar sección "Proyectos realizados" con 3 casos documentados
- [ ] Agregar Review schema para cada testimonio
- [ ] Publicar: "Los 5 errores más comunes en sitios web de PYMEs mexicanas"
- [ ] Contactar a 1 medio digital mexicano para posible mención o artículo
- Entregable: Testimoniales verificables + 4 artículos en blog

### SEMANAS 9-10 — Artículos de nicho (Buyer Personas)
**Objetivo:** Capturar búsquedas específicas de los dos buyers principales.

- [ ] Publicar: "Sitio web para dentistas en México: qué debe tener y cuánto cuesta"
- [ ] Publicar: "Cómo crear la página web de un restaurante: checklist 2026"
- [ ] Crear página /nosotros con historia del fundador y especialidades
- [ ] Monitoreo manual: buscar "agencia web México 3 días" en Perplexity y ChatGPT
- Entregable: Contenido de nicho en producción + primer registro de citaciones

### SEMANAS 11-12 — Medición y ajuste
**Objetivo:** Medir qué funciona y amplificar.

- [ ] Buscar las 15 preguntas del FAQ en ChatGPT, Perplexity y Gemini
- [ ] Registrar si Rallusigence aparece citado en alguna respuesta
- [ ] Actualizar los primeros 2 artículos con "Actualizado: [fecha]" (refresh de Perplexity)
- [ ] Publicar: "Cómo las PYMEs mexicanas están usando IA para crecer en 2026"
- [ ] Publicar: "AEO para pequeños negocios: cómo aparecer en ChatGPT y Perplexity"
- Entregable: Reporte de citaciones + 7+ artículos en blog + feedback loop activo

---

### HITOS DE 30 / 60 / 90 DÍAS

| Hito | Fecha objetivo | Indicador de éxito |
|------|---------------|-------------------|
| Técnico completo | Día 7 | JSON-LD @graph validado en schema.org/validator; HTML legible sin JS |
| FAQ en producción | Día 14 | FAQPage schema en vivo + sección visible en homepage |
| Perfiles externos activos | Día 21 | Clutch + GBP + LinkedIn con contenido publicado |
| Primer artículo indexado | Día 30 | Aparece en Google Search Console con impresiones |
| Primera citación en Perplexity | Día 45 | Rallusigence aparece en respuesta para variante de "agencia web México" |
| 5 artículos publicados | Día 60 | Blog activo + reviews en Clutch y GBP |
| Citación en Google AI Overview | Día 75 | Aparece en AI Overview para keyword de nicho (ej: "sitio web dentista México") |
| 3+ citaciones activas | Día 90 | Citado en al menos 3 IAs diferentes para búsquedas relevantes |

---

## RESUMEN EJECUTIVO — TOP 5 ACCIONES

Si solo se pueden hacer 5 cosas, en este orden:

1. Verificar rendering sin JavaScript — es el potencial bloqueador #0
2. Implementar FAQPage JSON-LD + sección visible en homepage — mayor ROI por hora invertida
3. Expandir JSON-LD a @graph completo — le dice a las IAs exactamente qué es y vende Rallusigence
4. Registrar en Clutch.co + Google Business Profile — presencia en corpus que ChatGPT ya usa para citar agencias
5. Publicar artículo "¿Cuánto cuesta un sitio web profesional en México en 2026?" — captura la búsqueda de mayor volumen

El diferenciador único de Rallusigence — precio fijo público + entrega en 3 días + código propiedad del cliente — no existe documentado en ningún competidor mexicano con esta claridad. Estructurado correctamente en schema y repetido en blog con datos verificables, las IAs lo citarán porque es factual, comparable y único en el mercado.

---

## FUENTES

- AirOps: https://www.airops.com/blog/aeo-answer-engine-optimization
- Green Flag Digital: https://greenflagdigital.com/aeo-best-practices/
- HubSpot: https://blog.hubspot.com/marketing/answer-engine-optimization-trends
- HubSpot ES: https://blog.hubspot.es/marketing/aeo-pequenas-empresas
- ClickRank: https://www.clickrank.ai/rank-in-perplexity-ai-search-results/
- DarwinApps: https://www.darwinapps.com/blog/how-to-rank-in-perplexity-ai-complete-guide-2026/
- Frase.io: https://www.frase.io/blog/faq-schema-ai-search-geo-aeo
- BrightEdge: https://www.brightedge.com/blog/structured-data-ai-search-era
- Pixis: https://pixis.ai/blog/chatgpt-vs-perplexity-vs-gemini-how-each-ai-engine-cites-differently-and-how-to-optimize-for-each/
- SEO Sherpa: https://seosherpa.com/ai-search-statistics/
- Emprendedor.com: https://emprendedor.com/chatgpt-perplexity-o-gemini-quien-domina-el-uso-de-ia-en-mexico-y-el-mundo/
- SEO en México: https://www.seoenmexico.com/agencia-geo/
- Varela Insights: https://www.varelainsights.com/comparativa-agencias-ia-mexico-2026
- SchemaApp: https://www.schemaapp.com/schema-markup/what-2025-revealed-about-ai-search-and-the-future-of-schema-markup/
