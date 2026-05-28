# Rallusigence — Sitio web oficial

Agencia de sitios web con IA para PYMEs mexicanas

## Stack

- Framework: Next.js 15 (App Router, output: export)
- Lenguaje: TypeScript
- Estilos: CSS canónico --rs-* + CSS Modules
- Iconos: lucide-react
- Blog: @next/mdx
- Formularios: Formspree
- Hosting: Firebase Hosting (carpeta out/)

## Comandos

```bash
npm run dev      # desarrollo local
npm run build    # build + export estático a out/
firebase deploy  # deploy a Firebase Hosting
```

## Variables a configurar antes del deploy

- GA4: `app/layout.tsx` → GA_ID = 'G-XXXXXXXXXX'
- Meta Pixel: `app/layout.tsx` → META_PIXEL_ID = 'TU_PIXEL_ID'
- Formspree: `ContactSection.tsx` y `AuditoriaForm.tsx` → endpoint XXXXXXXX
- WhatsApp: buscar 52XXXXXXXXXX en todo el proyecto y reemplazar

## Estructura de carpetas

```
app/              # rutas y páginas (App Router)
components/       # componentes reutilizables
  layout/         # Header, Footer
  sections/       # secciones de página
  ui/             # componentes base
content/blog/     # artículos MDX
lib/              # helpers (mdx.ts, analytics.ts)
public/           # assets estáticos
  design-system/  # CSS canónico + fuentes
  assets/         # logos, iconos
```

## Design System

- CSS canónico: `public/design-system/colors_and_type.css`
- Variables: prefijo `--rs-*`
- Clases: prefijo `.rs-*`
- Fuentes: auto-hosteadas en `public/design-system/fonts/`

## Deploy

1. `npm run build` → genera carpeta `out/`
2. `firebase deploy` → sube contenido de `out/` a Firebase Hosting

## Desarrollo

El proyecto usa Next.js 15 con App Router y exportación estática. Todas las páginas son Server Components excepto componentes con interactividad marcados con 'use client'.

Los estilos siguen el design system de Rallusigence con variables CSS custom properties y clases reutilizables.