# Flujos de usuario — rallusigence.net
# Actualizado: 2026-09-09 (tras sprints WOW-1/2/3 + CONTENIDO f1)

QA automatizado (correr antes de cada deploy, con `npx serve out -l 3006` activo):
- `pruebas/responsive-matrix.mjs` — 10 páginas × 14 anchos (320-1920): overflow-x + menú móvil abierto (221 checks)
- `pruebas/animation-matrix.mjs` — filmstrips de cada animación + 15 asserts programáticos
Capturas y filmstrips del último QA: `pruebas/capturas-sprint1/` y `pruebas/filmstrips/`

## Flujo 0 — Descubrimiento de servicios (nuevo, CONTENIDO f1)
1. Nav "Servicios" o footer → `/servicios` (índice con 6 cards + kiwi c/u — `app/(site)/servicios/page.tsx`)
2. `/servicios/[slug]` (datos en `lib/servicios.ts`): hero → qué es → checklist → ventajas → IMPORTANTE → FAQ
3. CTA "Cotizar por WhatsApp" con mensaje precargado por servicio (`trackWhatsAppClick('servicio-{slug}')`)
   o CTA alterno → `/auditoria-gratis`
4. SEO: canonical + JSON-LD Service/FAQPage por página; 6 slugs: diseno-web, seo, bot-whatsapp, tienda-online, anuncios, automatizacion

## Flujo 1 — Contratación de paquete (conversión principal)
1. Home `/` → sección Paquetes (`components/sections/PackagesSection.tsx`)
2. CTA "Quiero este paquete" → abre WhatsApp con mensaje precargado por paquete
   (`components/ui/ServiceCard.tsx` — prop `href` con `wa.me/525626171584?text=...`)
3. Conversación por WhatsApp (+52 56 2617 1584, perfil "Atención Digital")
4. Tracking: `trackCtaClick('paquete', 'packages', título)` → GA4 `G-SN3THQ65T3`

## Flujo 2 — Auditoría gratis (lead magnet / destino de ads)
1. Entrada: `/auditoria-gratis` (landing SIN navegación — layout propio con header mínimo)
   o link "Auditoría gratis" del nav principal (`components/layout/Header.tsx`)
2. Formulario 3 campos: nombre, tipo de negocio, WhatsApp (`components/ui/AuditoriaForm.tsx`)
   → POST Formspree `mppaojqk`
3. Redirect a `/gracias` → CTA WhatsApp con tracking (`components/ui/WhatsAppCta.tsx`)
4. Tracking: `trackFormSubmit('auditoria_landing')` + `trackWhatsAppClick('gracias')`

## Flujo 3 — Contacto desde home
1. Home `/#contacto` (`components/sections/ContactSection.tsx`)
2. Formulario 3 campos → POST Formspree `xkjwqlbg` → mensaje de éxito inline
3. Alternativa: link directo a WhatsApp con `trackWhatsAppClick('contacto')`

## Arquitectura de layouts (desde Sprint 1)
- `app/layout.tsx` — root: html/body + GA4 + GTM (GTM-TVTHCLQR) + Clarity (y5zfbfdlon)
  + Meta Pixel condicional (inactivo hasta tener ID real) + preload de fuentes WOFF2
- `app/(site)/layout.tsx` — Header + Footer para todas las páginas normales
- `app/auditoria-gratis/layout.tsx` — landing aislada: header/footer mínimos, sin nav
