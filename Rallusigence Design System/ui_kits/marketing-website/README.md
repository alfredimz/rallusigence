# Marketing website — UI kit

A single-page landing demo for **Rallusigence** that exercises every primitive in this design system in real context.

## What's here

```
index.html       — interactive landing with sticky header, hero, services, process, testimonial, form
components.jsx   — small React components (Button, ServiceCard, FormField, etc.)
README.md        — this file
```

## How to read it

- The page targets the **Dr. Roberto / María Elena** persona — copy is pulled verbatim from the `copywriting-sitio.md` source.
- Sections demonstrate, in order: **nav header** → **hero (H1 + dual CTA)** → **pain points** → **services grid** → **process steps** → **testimonial** → **form-card** → **footer**. Every component has live hover/focus states.
- All colors and spacing come from `../../colors_and_type.css` — change the variable, change every surface.
- Lucide icons are loaded from CDN and rendered at the system stroke (`1.5`, round caps).

## Patterns worth lifting elsewhere

- **service-card--featured** — the teal "auditoría gratis" callout card pattern. Reuse for any hero offer.
- **price-tag** — mono price chip in a teal tint. Reuse anywhere a price needs to feel committed.
- **differentiator** — checkmark-circle row pattern, the only place we use the success green editorially.
- **form-card** with `box-shadow: var(--shadow-card)` — the elevated surface used for any conversion moment.

## Out of scope

- No multi-page nav (single landing).
- Pricing detail / FAQ / blog index — see the source repo for those wireframes.
- Mascot pose library — only the single hexagonal mark exists today.
