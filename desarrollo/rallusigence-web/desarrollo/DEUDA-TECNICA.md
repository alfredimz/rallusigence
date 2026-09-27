# Deuda técnica — rallusigence-web

Registrada al cierre del Sprint D (técnico + AEO), 2026-09-26. No se corrigió
en este sprint porque está fuera de su alcance o porque tocarlo implicaba
riesgo de choque con trabajo paralelo de otro agente (contenido/portafolio).

## Pendiente explícito (ya conocido antes de este sprint)

- ~~**Paquetes duplicados**~~ RESUELTO en Sprint A (2026-09-26): fuente única en `lib/content/paquetes.ts`, consumida por `components/sections/PackagesGrid.tsx` (home y /paquetes). Texto original: `components/sections/PackagesSection.tsx:13-73` y
  `app/(site)/paquetes/page.tsx` mantienen la misma información de los 3
  paquetes escrita dos veces (y ya ligeramente divergente en el copy). NO se
  unificó en este sprint por instrucción explícita — lo resolverá la
  integración de contenido (`lib/content/paquetes.ts` propuesto en el
  diagnóstico, §5).
- **Parser markdown casero** (`lib/markdown.ts`): regex simple sin soporte de
  listas anidadas, código, tablas ni imágenes. `@next/mdx` ya está instalado
  como dependencia pero no se usa — evaluar migrar `content/blog/*.mdx` a
  MDX real cuando haya más de 1-2 artículos.
- **Estilos inline en `ServiceCard.tsx`** (`TestimonialCard.tsx` ya migró a CSS Module en Sprint A): toda la
  presentación de estas dos cards vive en objetos `style={{...}}` en vez de
  CSS modules. Funciona, pero dificulta mantenimiento y Sprint B (dirección
  de arte) probablemente las reescribe de todos modos.
- **Next 15 → 16**: el proyecto corre en Next 15.5.18 mientras `@next/mdx`
  (sin usar) ya está en `^16.2.6`. Programar upgrade completo de Next cuando
  el roadmap lo permita; validar `output: "export"` sigue soportado igual.
- **0 tests**: no hay unit ni e2e tests. Los formularios (`useLeadForm`) y el
  parser de markdown serían los candidatos más valiosos para empezar.

## Encontrado durante este sprint

- ~~`app/(site)/portafolio/page.tsx`~~ REESCRITA en Sprint A con `lib/content/demos.ts` + `casos.ts`. Texto original: se aplicó el fix mínimo de ESLint
  (2 `<a>`→`Link`, 2 comillas escapadas) SOLO para que `npm run build` pasara
  (Next 15 falla el build si ESLint reporta errores). Es un parche
  quirúrgico, no una revisión de contenido: el agente de contenido en
  paralelo está reescribiendo esta página con casos reales
  (`lib/content/casos.ts`, `public/portafolio/**`) y es casi seguro que la
  reescriba de todos modos — si su versión no pasa lint, aplicar el mismo
  patrón (`Link` de `next/link` en vez de `<a>` para rutas internas,
  `&apos;`/`&quot;` en vez de comillas literales dentro de JSX).
- **8 warnings de ESLint `@next/next/no-img-element`** (`app/layout.tsx`,
  `ContactSection.tsx`, `TestimonialsSection.tsx`, `ScrollKiwi.tsx`,
  `ServiceCard.tsx`, `servicios/[slug]/page.tsx`, `servicios/page.tsx`,
  `auditoria-gratis/page.tsx`): son íconos/mascotas decorativos con `<img>`
  crudo en vez de `next/image`. Con `images: { unoptimized: true }` en
  `next.config.ts` el beneficio de migrar es menor (no hay optimización de
  servidor en export estático), pero next/image sigue aportando
  `width`/`height` reservados y lazy loading nativo — dejar para Sprint B si
  se rediseñan estos componentes de todos modos.
- **Contraste residual en `ServiceCard.tsx` (card `featured`)**: se corrigió
  el precio (`price-tag`) y el botón CTA (ahora `--rs-primary-text`), pero el
  título/descripción en blanco siguen sobre el gradiente decorativo
  `--rs-primary` → `--rs-primary-dark` (el stop superior del gradiente sigue
  rondando ~2.55:1 con texto blanco). Arreglarlo a fondo requiere rediseñar
  la card destacada (Sprint B — dirección de arte), no solo cambiar tokens.
- ~~**Inconsistencia de modelo de pago**~~ PARCIAL en Sprint A: /como-funciona ya dice 50%/50%, 2 rondas y 15 días de cambios menores; el método (retiro en cajero) sigue ahí como decisión de negocio de Alfredo. Texto original: `/como-funciona` sigue describiendo
  el pago como "retiro sin tarjeta en cajero" (§ Modelo de Pago,
  `app/(site)/como-funciona/page.tsx:108-159`), mientras el FAQ nuevo de
  `/paquetes` (este sprint) ya habla de 50% para arrancar / 50% al entregar.
  Es una decisión de negocio pendiente de Alfredo, no algo que este sprint
  técnico debiera resolver — pero hay que unificarlo antes de publicar.
- **GA4 dentro de GTM sin verificar**: se retiró el `<Script>` directo de
  gtag.js de `app/layout.tsx` (ver comentario ahí) asumiendo que el tag GA4
  (G-SN3THQ65T3) ya vive dentro del contenedor GTM-TVTHCLQR. Si no es así,
  hay que agregarlo en tagmanager.google.com o la analítica de GA4 se
  perderá por completo. `lib/analytics.ts` ahora empuja eventos a
  `window.dataLayer` en vez de llamar `gtag()` directamente — confirmar que
  el contenedor tiene triggers/tags configurados para esos eventos
  (`form_submit`, `whatsapp_click`, `cta_click`, `service_view`,
  `scroll_depth`, `form_error`).
- **`sameAs` / `address` / `telephone` en el `ProfessionalService` global**
  (`app/layout.tsx`) siguen sin URLs reales (GBP, LinkedIn, IG, FB) — el
  diagnóstico ya señalaba que esto requiere que Alfredo las proporcione
  (§9.1). No se puede resolver sin esa información.
