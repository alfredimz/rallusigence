// Matriz de pruebas de ANIMACIONES — rallusigence.net
// Idea de Alfredo (2026-09-08): "graba y ve cómo se ven las animaciones".
// Por cada escenario: (a) captura una ráfaga de frames → filmstrip PNG revisable
// visualmente, (b) corre ASSERTS programáticos sobre el estado final/intermedio.
// Uso: npx serve out -l 3006 y luego: node pruebas/animation-matrix.mjs

import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const BASE = process.env.BASE_URL || 'http://localhost:3006'
const DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), 'filmstrips')
fs.mkdirSync(DIR, { recursive: true })

const results = []
const browser = await chromium.launch()

async function newPage() {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } })
  await ctx.addInitScript(() => localStorage.setItem('rs_intro_shown', new Date().toDateString()))
  return ctx.newPage()
}

async function burst(page, name, frames, intervalMs, clip) {
  const files = []
  for (let i = 0; i < frames; i++) {
    const f = path.join(DIR, `_${name}_${String(i).padStart(2, '0')}.png`)
    await page.screenshot({ path: f, clip })
    files.push(f)
    await page.waitForTimeout(intervalMs)
  }
  return files
}

async function filmstrip(name, files, cols = 5) {
  const strip = await browser.newPage()
  const cells = files.map((f, i) =>
    `<div style="border:1px solid #999"><p style="font:10px monospace;margin:0;background:#222;color:#7de8e6;padding:1px 4px">f${i}</p><img src="data:image/png;base64,${fs.readFileSync(f).toString('base64')}" style="width:100%;display:block"></div>`
  ).join('')
  await strip.setContent(`<body style="margin:0;background:#111"><div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:4px;padding:4px">${cells}</div></body>`)
  await strip.waitForTimeout(400)
  await strip.screenshot({ path: path.join(DIR, `${name}.png`), fullPage: true })
  await strip.close()
  files.forEach((f) => fs.unlinkSync(f))
}

function assert(name, cond, detail) {
  results.push({ name, pass: !!cond, detail })
  console.log(`${cond ? '✅' : '❌'} ${name}${detail ? ` — ${detail}` : ''}`)
}

// ── Escenario 1: entrada del hero (kiwi vuela, aterriza, textos con blur) ──────
{
  const page = await newPage()
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' })
  const files = await burst(page, 'hero', 12, 220, { x: 0, y: 60, width: 1280, height: 620 })
  await filmstrip('01-hero-entrada', files, 4)

  const kiwiOpacity = await page.evaluate(() => {
    const w = document.querySelector('[class*="kiwiWrapper"]')
    return w ? parseFloat(getComputedStyle(w).opacity) : -1
  })
  assert('hero: kiwi visible tras aterrizar', kiwiOpacity === 1, `opacity=${kiwiOpacity}`)

  const eyeAnim = await page.evaluate(() => {
    const eye = document.querySelector('#kiwi-eye')
    return eye ? getComputedStyle(eye).animationName : 'no-eye'
  })
  assert('hero: parpadeo del ojo activo', eyeAnim !== 'none' && eyeAnim !== 'no-eye', eyeAnim)

  const h1Op = await page.evaluate(() => parseFloat(getComputedStyle(document.querySelector('h1')).opacity))
  assert('hero: título visible tras entrada', h1Op === 1, `opacity=${h1Op}`)

  // Shader WebGL montado en idle
  await page.waitForTimeout(2200)
  const shader = await page.evaluate(() => {
    const c = document.querySelector('[class*="imagePlaceholder"] canvas')
    return c ? { op: parseFloat(getComputedStyle(c).opacity), w: c.width } : null
  })
  assert('hero: shader WebGL activo', shader && shader.op > 0.5 && shader.w > 0, JSON.stringify(shader))
  await page.close()
}

// ── Escenario 2: scrollytelling del proceso ────────────────────────────────────
{
  const page = await newPage()
  await page.goto(BASE + '/', { waitUntil: 'networkidle' })
  await page.evaluate(() => document.querySelector('#como-funciona').scrollIntoView({ block: 'start' }))
  await page.waitForTimeout(400)
  const files = []
  let sawActive = false
  for (let i = 0; i < 8; i++) {
    await page.mouse.wheel(0, 140)
    await page.waitForTimeout(180)
    const f = path.join(DIR, `_proc_${i}.png`)
    await page.screenshot({ path: f, clip: { x: 0, y: 80, width: 1280, height: 640 } })
    files.push(f)
    if (!sawActive) {
      sawActive = await page.evaluate(() => !!document.querySelector('.step-item[class*="active"]'))
    }
  }
  await filmstrip('02-proceso-scroll', files, 4)

  const scaleY = await page.evaluate(() => {
    const el = document.querySelector('[class*="connectorFill"]')
    if (!el) return -1
    const m = new DOMMatrix(getComputedStyle(el).transform)
    return m.d // scaleY
  })
  assert('proceso: línea dibujada con el scroll', scaleY > 0.3, `scaleY=${scaleY?.toFixed?.(2)}`)

  assert('proceso: hubo paso activo iluminado durante el scroll', sawActive)
  await page.close()
}

// ── Escenario 3: paquetes (kiwis, tilt, conteo) ───────────────────────────────
{
  const page = await newPage()
  await page.goto(BASE + '/', { waitUntil: 'networkidle' })
  await page.evaluate(() => document.querySelector('#paquetes').scrollIntoView({ block: 'center' }))
  const files = await burst(page, 'pack', 8, 200, { x: 0, y: 100, width: 1280, height: 620 })
  await filmstrip('03-paquetes-conteo', files, 4)

  const kiwis = await page.evaluate(() => document.querySelectorAll('.card-kiwi').length)
  assert('paquetes: 3 kiwis mascota en cards', kiwis === 3, `encontrados=${kiwis}`)

  await page.waitForTimeout(600)
  const price = await page.evaluate(() => document.querySelector('.price-tag').textContent)
  assert('paquetes: conteo terminó en precio real', price.includes('6,000'), price)

  const card = await page.locator('.service-card').nth(1).boundingBox()
  await page.mouse.move(card.x + card.width * 0.8, card.y + card.height * 0.25)
  await page.waitForTimeout(300)
  const tilt = await page.evaluate(() => {
    const el = document.querySelectorAll('.service-card')[1]
    return { rx: el.style.getPropertyValue('--rx'), ry: el.style.getPropertyValue('--ry') }
  })
  assert('paquetes: tilt 3D responde al cursor', tilt.rx !== '' && tilt.rx !== '0deg', JSON.stringify(tilt))
  await page.close()
}

// ── Escenario 4: landing auditoría (scanline + checklist + analista) ──────────
{
  const page = await newPage()
  await page.goto(BASE + '/auditoria-gratis', { waitUntil: 'domcontentloaded' })
  const files = await burst(page, 'aud', 10, 220, { x: 0, y: 0, width: 1280, height: 640 })
  await filmstrip('04-auditoria-scan', files, 5)

  const benefits = await page.evaluate(() =>
    [...document.querySelectorAll('[class*="benefit"]')].filter((el) => parseFloat(getComputedStyle(el).opacity) === 1).length
  )
  assert('auditoría: checklist marcada al final', benefits >= 3, `visibles=${benefits}`)

  const analista = await page.evaluate(() => !!document.querySelector('[class*="analista"]'))
  assert('auditoría: kiwi analista presente', analista)
  await page.close()
}

// ── Escenario 5: kiwi viajero (barra de progreso) ─────────────────────────────
{
  const page = await newPage()
  await page.goto(BASE + '/', { waitUntil: 'networkidle' })
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight * 0.5))
  await page.waitForTimeout(300)
  const mid = await page.evaluate(() => {
    const bar = document.querySelector('[class*="ScrollKiwi"] span, [class*="bar"]')
    const kiwi = document.querySelector('img[src*="kiwi-icon-clean"]')
    const m = bar ? new DOMMatrix(getComputedStyle(bar).transform).a : -1
    const kx = kiwi ? new DOMMatrix(getComputedStyle(kiwi).transform).e : -1
    return { scaleX: m, kiwiX: kx }
  })
  assert('viajero: barra a ~50% del scroll', mid.scaleX > 0.3 && mid.scaleX < 0.75, `scaleX=${mid.scaleX?.toFixed?.(2)}`)
  assert('viajero: kiwi desplazado con el scroll', mid.kiwiX > 200, `x=${Math.round(mid.kiwiX)}`)

  const f = path.join(DIR, '_viaj_0.png')
  await page.screenshot({ path: f, clip: { x: 0, y: 0, width: 1280, height: 90 } })
  await filmstrip('05-kiwi-viajero', [f], 1)
  await page.close()
}

// ── Escenario 6: testimonios (kiwi traje + carrusel móvil) ────────────────────
{
  const page = await newPage()
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(BASE + '/', { waitUntil: 'networkidle' })
  await page.evaluate(() => document.querySelector('#testimonios').scrollIntoView({ block: 'center' }))
  await page.waitForTimeout(700)
  const carousel = await page.evaluate(() => {
    const wrap = document.querySelector('[class*="testimonialWrap"]')
    const s = getComputedStyle(wrap)
    return { display: s.display, snap: s.scrollSnapType, scrollable: wrap.scrollWidth > wrap.clientWidth }
  })
  assert('testimonios móvil: carrusel con snap', carousel.display === 'flex' && carousel.snap.includes('x') && carousel.scrollable, JSON.stringify(carousel))

  const traje = await page.evaluate(() => !!document.querySelector('[class*="kiwiTraje"]'))
  assert('testimonios: kiwi de traje presente', traje)

  const f = path.join(DIR, '_test_0.png')
  await page.screenshot({ path: f })
  await filmstrip('06-testimonios-movil', [f], 1)
  await page.close()
}

await browser.close()

const passed = results.filter((r) => r.pass).length
console.log(`\n=== MATRIZ DE ANIMACIONES: ${passed}/${results.length} asserts OK · filmstrips en pruebas/filmstrips/ ===`)
process.exit(passed === results.length ? 0 : 1)
