---
name: rallusigence-design-system
description: Visual + voice system for Rallusigence — Mexican AI/automation agency targeting PYMEs (dentists, restaurants, local commerce). Use when designing surfaces in the Rallusigence brand universe — landing pages, proposals, WhatsApp/social posts, ads, decks. Covers turquesa-led palette, Montserrat type stack, 8 px spacing grid, Lucide iconography, and the "directo, técnico, con precios visibles" voice.
---

# Rallusigence — Design System

## Quick orientation

Read `README.md` first; it has the full company context, voice rules, and forbidden-word list. The visual tokens live in `colors_and_type.css`. Logos and marks live in `assets/`. Fonts live in `fonts/`.

When in doubt:
- **Color** → primary `#20B4B1`, neutrals (`#FFFFFF`, `#2C2C2C`, `#6B7280`, `#E5E5E5`, `#F9FAFB`), success `#10B981`, error `#EF4444`. Accents (orange/yellow/red) exist but are editorial — never CTA.
- **Type** → Montserrat for everything on the website. Playfair Italic for occasional pull-quotes. Pacifico/Patrick Hand/Amatic SC are for **social and offline only**.
- **Spacing** → 8 / 16 / 24 / 48 / 80, nothing in between.
- **Radius** → 4 inputs+buttons, 8 cards, 28 only on the mobile sticky CTA.
- **Voice** → tuteo, prices visible, max 20 words/sentence, never "disruptivo / innovador / soluciones / ecosistema digital".

## When to use this system

- Any Rallusigence-branded surface: website, proposals, slide decks, WhatsApp/social, ads, follow-up emails.
- Internal docs that reference the agency's services or the **auditoría gratis** funnel.
- Mockups for prospective Rallusigence clients (dentists, restaurants, local commerce).

## When NOT to use this system

- Other brands or agencies — the wordmark, kiwi mascot, and tonal rules are specific.
- Surfaces that need a warm, sepia, or vintage treatment — Rallusigence imagery is explicitly neutral-to-cool.
- Anywhere requiring formal "usted" copy unless a specific client asked for it.

## Core files

```
README.md                  — full system reference (read this for context)
colors_and_type.css        — CSS variables (--rs-*, --space-*, --radius-*, --shadow-*) + @font-face
assets/                    — logos: icono.svg, kiwi-icon.svg, letras.svg, lockups (h/v)
fonts/                     — Montserrat (5 weights), Playfair (2), Pacifico, Patrick Hand, Amatic SC
preview/                   — design-system review cards
ui_kits/marketing-website/ — full landing-page UI kit with React components
```

## Workflow for new designs

1. Link `colors_and_type.css` first.
2. For website/landing surfaces, study `ui_kits/marketing-website/` — the components there (Header, Hero, ServiceCard, FormField, Process steps, Testimonial, Footer) are reference implementations.
3. Pull copy patterns from the README's **Sample lines** before writing new copy. The voice is tight; default to copying the patterns rather than inventing.
4. Ship with the **auditoría gratis** CTA visible. It's the funnel for every surface.
5. Pre-flight: contrast ≥ 4.5:1, hit targets ≥ 44 px, no forbidden words, prices shown, motion respects `prefers-reduced-motion`.

## Common mistakes to avoid

- **Don't retype the wordmark.** "RalluSIgEncE" is mixed-case art — use `assets/letras.svg` or `assets/letras-icono-*.svg`.
- **Don't use accent colors as CTA.** Only `--rs-primary` (#20B4B1) is allowed for primary buttons.
- **Don't use scripty fonts on the website.** Pacifico, Patrick Hand, Amatic SC are social/offline only.
- **Don't skip the motion vocabulary.** Use `.reveal` (+ `--left/--right/--scale` and `--delay-1/2/3`) for section/card entrances, the bottom-up fill on primary buttons, and the left-slide fill on secondary. They're part of the brand, not optional polish.
- **Don't reach for new easings.** Stick to `--ease-out-cubic` (most things), `--ease-in-out-cubic` (symmetric hovers), and `--ease-bounce` (CTA pulse only).
- **Don't add stock-smile people photos.** Imagery is product/UI/desk, neutral or cool, no people.
- **Don't write "consulta precio".** Always show the price (or "Sin costo" / "Desde $X MXN").
