// Captura rápida de una página o sección en varios anchos (intro omitido, reveals forzados).
// Uso: node pruebas/snap.mjs <ruta> <selector|full> <anchos separados por coma> <carpeta salida> [prefijo]
//   node pruebas/snap.mjs / "#inicio" 1440,390 C:/tmp/snaps hero
import { chromium } from 'playwright'
import fs from 'node:fs'
let [, , ruta = '/', selector = 'full', anchos = '1440,390', out = 'pruebas/_snaps', prefijo = 'snap'] = process.argv
// Git Bash convierte "/" y "/ruta" en rutas de Windows: nos quedamos con el último segmento (o "/" si era la raíz)
if (/^[A-Za-z]:/.test(ruta)) { const seg = ruta.replace(/\\/g, '/').split('/').filter(Boolean); ruta = seg.length > 3 ? '/' + seg.slice(3).join('/') : '/' }
if (ruta === 'home') ruta = '/'
if (!ruta.startsWith('/')) ruta = '/' + ruta
const BASE = process.env.BASE_URL || 'http://localhost:3007'
fs.mkdirSync(out, { recursive: true })
const browser = await chromium.launch()
for (const w of anchos.split(',').map(Number)) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 }, isMobile: w < 800, hasTouch: w < 800 })
  await page.addInitScript(() => { try { localStorage.setItem('rs_intro_shown', new Date().toDateString()) } catch {} })
  await page.goto(BASE + ruta, { waitUntil: 'networkidle' })
  await page.evaluate(async () => { const h = document.documentElement.scrollHeight; for (let y = 0; y < h; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 40)) } window.scrollTo(0, 0) })
  await page.addStyleTag({ content: `.reveal,[class*="reveal"]{opacity:1!important;transform:none!important;filter:none!important;clip-path:none!important} *{transition:none!important;animation-duration:0.01s!important;animation-delay:0s!important}` })
  await page.waitForTimeout(600)
  const file = `${out}/${prefijo}_${w}.png`
  if (selector === 'full') await page.screenshot({ path: file, fullPage: true })
  else { const el = page.locator(selector).first(); await el.scrollIntoViewIfNeeded(); await page.waitForTimeout(300); await el.screenshot({ path: file }) }
  console.log(file)
  await page.close()
}
await browser.close()
