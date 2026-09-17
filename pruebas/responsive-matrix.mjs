// Matriz de pruebas responsive — rallusigence.net
// Uso: npx serve out -l 3006 (en desarrollo/rallusigence-web) y luego:
//      node pruebas/responsive-matrix.mjs
// Verifica en cada página × ancho:
//   1. Sin overflow horizontal (scrollWidth <= viewport + 1px)
//   2. Si hay hamburguesa visible: al abrir el menú, el overlay existe,
//      cubre al menos 60% del alto del viewport y tiene fondo opaco
// Guarda screenshot de cada fallo en pruebas/fallos-responsive/

import { chromium } from 'playwright'
import fs from 'node:fs'

const BASE = process.env.BASE_URL || 'http://localhost:3006'
const WIDTHS = [320, 360, 390, 412, 480, 568, 644, 768, 834, 912, 1024, 1280, 1440, 1920]
const PAGES = ['/', '/paquetes', '/como-funciona', '/portafolio', '/blog', '/auditoria-gratis', '/gracias', '/servicios', '/servicios/seo', '/servicios/bot-whatsapp']
const OUT_DIR = new URL('./fallos-responsive/', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')

fs.mkdirSync(OUT_DIR, { recursive: true })
const failures = []
let checks = 0

const browser = await chromium.launch()
const page = await browser.newPage()

for (const path of PAGES) {
  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: 850 })
    await page.goto(BASE + path, { waitUntil: 'networkidle' })

    // 1. Overflow horizontal
    checks++
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    if (overflow > 1) {
      failures.push({ path, width, check: 'overflow-x', detail: `${overflow}px de desborde` })
      await page.screenshot({ path: `${OUT_DIR}overflow_${path.replace(/\//g, '_') || 'home'}_${width}.png` })
    }

    // 2. Menú móvil abierto (solo donde hay hamburguesa)
    const burger = page.locator('button[aria-controls="mobile-menu"]')
    if (await burger.count() && await burger.isVisible()) {
      checks++
      await burger.click()
      await page.waitForTimeout(350)
      const menu = page.locator('#mobile-menu')
      let ok = false, detail = 'overlay no aparece'
      if (await menu.count()) {
        const box = await menu.boundingBox()
        const bg = await menu.evaluate(el => getComputedStyle(el).backgroundColor)
        const alpha = bg.startsWith('rgba') ? parseFloat(bg.split(',')[3]) : 1
        const coverage = box ? box.height / 850 : 0
        ok = box && coverage > 0.6 && alpha > 0.9
        detail = `alto=${Math.round(box?.height || 0)}px (${Math.round(coverage * 100)}%), fondo=${bg}`
      }
      if (!ok) {
        failures.push({ path, width, check: 'menu-movil', detail })
        await page.screenshot({ path: `${OUT_DIR}menu_${path.replace(/\//g, '_') || 'home'}_${width}.png` })
      }
      await page.keyboard.press('Escape').catch(() => {})
      await page.locator('button[aria-controls="mobile-menu"]').click().catch(() => {})
    }
  }
}

await browser.close()

console.log(`\n=== MATRIZ RESPONSIVE: ${checks} verificaciones, ${failures.length} fallos ===`)
for (const f of failures) console.log(`❌ ${f.path} @ ${f.width}px [${f.check}] ${f.detail}`)
if (!failures.length) console.log('✅ Todas las páginas pasan en todos los anchos')
process.exit(failures.length ? 1 : 0)
