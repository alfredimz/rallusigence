// QA visual completo — rallusigence.net
// Uso: node pruebas/qa-visual.mjs [--out=DIR]  (BASE_URL opcional, default producción)
// Por cada página × viewport: captura full-page (con .reveal forzado visible e intro omitido),
// errores de consola, requests fallidas, imágenes rotas, overflow-x y elementos que se salen
// del viewport. Al final verifica todos los links internos con HEAD. Escribe reporte.json + reporte.md.

import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const BASE = process.env.BASE_URL || 'https://rallusigence.net'
const outArg = process.argv.find(a => a.startsWith('--out='))
const OUT = outArg ? outArg.slice(6) : path.resolve('pruebas/qa-visual-out')
fs.mkdirSync(OUT, { recursive: true })

const PAGES = [
  '/', '/paquetes', '/auditoria-gratis', '/como-funciona', '/portafolio', '/nosotros',
  '/servicios', '/servicios/diseno-web', '/servicios/seo', '/servicios/bot-whatsapp',
  '/servicios/tienda-online', '/servicios/anuncios', '/servicios/automatizacion',
  '/blog', '/blog/como-conseguir-clientes-internet', '/aviso-de-privacidad',
  '/terminos-y-condiciones', '/gracias',
]
const VIEWPORTS = [
  { name: 'movil', width: 390, height: 844, mobile: true },
  { name: 'tablet', width: 768, height: 1024, mobile: true },
  { name: 'desktop', width: 1440, height: 900, mobile: false },
]

const slug = p => (p === '/' ? 'home' : p.replace(/^\//, '').replace(/\//g, '_'))
const report = { base: BASE, fecha: new Date().toISOString(), paginas: [], links: [] }
const internalLinks = new Set()

const browser = await chromium.launch()

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    isMobile: vp.mobile, hasTouch: vp.mobile, deviceScaleFactor: 1,
    reducedMotion: 'no-preference',
  })
  await ctx.addInitScript(() => {
    try { localStorage.setItem('rs_intro_shown', new Date().toDateString()) } catch {}
  })

  for (const p of PAGES) {
    const page = await ctx.newPage()
    const entry = { path: p, viewport: vp.name, width: vp.width, consola: [], fallidas: [], imgsRotas: [], overflowX: 0, fuera: [], meta: {}, menuMovil: null }
    page.on('console', m => { if (m.type() === 'error') entry.consola.push(m.text().slice(0, 300)) })
    page.on('pageerror', e => entry.consola.push('PAGEERROR ' + String(e).slice(0, 300)))
    page.on('response', r => { if (r.status() >= 400) entry.fallidas.push(`${r.status()} ${r.url()}`) })

    try {
      const resp = await page.goto(BASE + p, { waitUntil: 'networkidle', timeout: 45000 })
      entry.status = resp?.status()
    } catch (e) {
      entry.status = 'ERR ' + e.message.slice(0, 120)
      report.paginas.push(entry); await page.close(); continue
    }

    // Scroll completo para disparar lazy/reveal, luego arriba
    await page.evaluate(async () => {
      const h = document.documentElement.scrollHeight
      for (let y = 0; y < h; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)) }
      window.scrollTo(0, 0)
    })
    await page.addStyleTag({ content: `
      .reveal, [class*="reveal"], [class*="heroPre"] { opacity: 1 !important; transform: none !important; filter: none !important; }
      *, *::before, *::after { animation-play-state: paused !important; transition: none !important; }
    ` })
    await page.waitForTimeout(600)

    // Métricas DOM
    const data = await page.evaluate(() => {
      const iw = window.innerWidth
      const fuera = []
      for (const el of document.querySelectorAll('body *')) {
        const r = el.getBoundingClientRect()
        if (r.width === 0 || r.height === 0) continue
        const cs = getComputedStyle(el)
        if (cs.position === 'fixed') continue
        if (r.right > iw + 2 || r.left < -2) {
          const id = el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : '')
          fuera.push({ el: id, left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width) })
        }
      }
      const imgsRotas = [...document.images].filter(i => i.complete && i.naturalWidth === 0 && !i.loading?.includes('lazy')).map(i => i.currentSrc || i.src)
      const links = [...document.querySelectorAll('a[href]')].map(a => a.href)
      return {
        overflowX: document.documentElement.scrollWidth - iw,
        fuera: fuera.slice(0, 12),
        imgsRotas,
        links,
        meta: {
          title: document.title,
          h1: document.querySelectorAll('h1').length,
          description: document.querySelector('meta[name="description"]')?.content?.length || 0,
          canonical: document.querySelector('link[rel="canonical"]')?.href || null,
        },
        altura: document.documentElement.scrollHeight,
      }
    })
    Object.assign(entry, { overflowX: data.overflowX, fuera: data.fuera, imgsRotas: data.imgsRotas, meta: data.meta, altura: data.altura })
    for (const l of data.links) { if (l.startsWith(BASE)) internalLinks.add(l.split('#')[0]) }

    // Capturas
    const file = `${slug(p)}__${vp.name}.png`
    await page.screenshot({ path: path.join(OUT, file), fullPage: true })
    entry.captura = file

    // Menú móvil (solo home y paquetes, viewports con hamburguesa)
    if (vp.width < 900 && (p === '/' || p === '/paquetes')) {
      const burger = page.locator('button[aria-controls="mobile-menu"]')
      if (await burger.count() && await burger.isVisible()) {
        await burger.click(); await page.waitForTimeout(400)
        const menu = page.locator('#mobile-menu')
        const box = await menu.boundingBox().catch(() => null)
        entry.menuMovil = box ? `alto ${Math.round(box.height)}px` : 'NO APARECE'
        await page.screenshot({ path: path.join(OUT, `${slug(p)}__${vp.name}__menu.png`) })
      }
    }

    report.paginas.push(entry)
    await page.close()
  }
  await ctx.close()
}

// Links internos
for (const url of [...internalLinks].sort()) {
  try {
    const r = await fetch(url, { method: 'GET', redirect: 'manual' })
    if (r.status !== 200) report.links.push({ url, status: r.status })
  } catch (e) { report.links.push({ url, status: 'ERR ' + e.message }) }
}

await browser.close()
fs.writeFileSync(path.join(OUT, 'reporte.json'), JSON.stringify(report, null, 2))

// Markdown resumido
const md = []
md.push(`# QA visual ${BASE} — ${report.fecha}\n`)
const problemas = report.paginas.filter(e => e.status !== 200 || e.consola.length || e.fallidas.length || e.imgsRotas.length || e.overflowX > 1 || e.fuera.length || e.meta.h1 !== 1 || !e.meta.description || e.menuMovil === 'NO APARECE')
md.push(`Páginas × viewports: ${report.paginas.length} · con hallazgos: ${problemas.length} · links internos rotos: ${report.links.length}\n`)
for (const e of problemas) {
  md.push(`## ${e.path} @ ${e.viewport} (${e.width}px) — HTTP ${e.status}`)
  if (e.meta.h1 !== 1) md.push(`- h1: ${e.meta.h1}`)
  if (!e.meta.description) md.push(`- sin meta description`)
  if (e.overflowX > 1) md.push(`- overflow-x: ${e.overflowX}px`)
  for (const f of e.fuera) md.push(`- fuera del viewport: ${f.el} left=${f.left} right=${f.right} w=${f.w}`)
  for (const i of e.imgsRotas) md.push(`- img rota: ${i}`)
  for (const f of e.fallidas) md.push(`- request fallida: ${f}`)
  for (const c of e.consola) md.push(`- consola: ${c}`)
  if (e.menuMovil === 'NO APARECE') md.push(`- menú móvil no aparece`)
  md.push('')
}
if (report.links.length) { md.push('## Links internos con problema'); for (const l of report.links) md.push(`- ${l.status} ${l.url}`) }
fs.writeFileSync(path.join(OUT, 'reporte.md'), md.join('\n'))
console.log(md.join('\n'))
console.log(`\nCapturas en ${OUT}`)
