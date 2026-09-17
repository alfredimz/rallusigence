# Biblioteca de kiwis — mascota Rallusigence

21 poses vectoriales de la mascota, extraídas programáticamente (2026-09-08) del archivo
histórico KIWINET/APTERYNET (trípticos, catálogo 2018, currículum). Técnica: segmentación de
grupos SVG con Playwright + getBBox → SVG standalone con su `<style>`/`<defs>`.
Script: sesión 2026-09-08 (`scratchpad/extraer-kiwis.mjs`, ver memoria del proyecto).

| Archivo | Pose | Uso actual en el sitio |
|---|---|---|
| kiwi-idea.svg | Con foco (idea) | Servicio diseño web |
| kiwi-idea-circulo.svg | Ídem, en círculo teal | — |
| kiwi-whatsapp.svg | Con smartphone + logo WhatsApp | Servicio bot WhatsApp |
| kiwi-analista.svg | Dentro de lupa | Landing auditoría + servicio SEO |
| kiwi-traje.svg | De traje y corbata | Sección testimonios |
| kiwi-cartero.svg | Cartero con gorra y carta | Form de contacto (asomado) |
| kiwi-carrito.svg | Empujando carrito | Card Avanzado + servicio tienda |
| kiwi-lanzamiento.svg | En avión de papel con goggles | Card Lanzamiento |
| kiwi-desarrollo.svg | Frente a monitor | Card Profesional |
| kiwi-cool.svg | Con lentes oscuros | Servicio anuncios |
| kiwi-tiempo.svg | Con cronómetro | Servicio automatización |
| kiwi-entrega.svg | En caja de entrega | (libre) |
| kiwi-bolsas.svg | Con bolsas de compra | (libre) |
| kiwi-nube.svg | Dormido en nube | (libre — hosting) |
| kiwi-dominios.svg | Con señales .COM/.NET/.MX | (libre — dominios) |
| kiwi-pintor.svg | Con pincel | (libre — diseño gráfico) |
| kiwi-buho.svg | Con lentes de búho | (libre — filosofía/nosotros) |
| kiwi-smartphone.svg | Con teléfono blanco | (libre) |
| kiwi-base.svg | Parado, neutro | (libre) |
| kiwi-huellas.svg | Solo huellas | (libre — detalle decorativo) |
| kiwi-whatsapp.svg | — | (copiados a `public/assets/kiwis/` los que usa el sitio) |

Notas:
- El kiwi MINIMAL del hero es otro asset: `assets/kiwi-icon.svg` (inlineado en
  `components/ui/KiwiMascot.tsx` para animarlo por partes; ojo = `#kiwi-eye`).
- `public/assets/kiwi-icon-clean.svg` = kiwi minimal sin rect blanco (para el kiwi viajero).
- Estilo retro 2018 (café, detallado) ≠ estilo minimal actual: úsalos como ilustraciones
  de sección/servicio, no mezclados 1:1 con el minimal en el mismo componente.
- Fuente maestra con más poses sin extraer: `KIWINET/diseños/*.ai` y galerías de referencia
  en `fase-2-identidad/galeria-kiwis*.png` + candidatos crudos del extractor.
