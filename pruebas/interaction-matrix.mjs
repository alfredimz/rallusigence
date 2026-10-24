// Matriz de interacción — ¿se puede USAR el sitio? (complementa responsive-matrix y qa-visual, que preguntan "¿está roto?")
// Uso:  BASE_URL=http://localhost:3007 node pruebas/interaction-matrix.mjs
//       PAGES=/,/paquetes (opcional; por defecto lee /sitemap.xml)   EXTRA_PAGES=/gracias   OUT_DIR=pruebas/fallos-interaccion
// Correr desde la raíz del repo del proyecto (ahí resuelve `playwright`).
//
// Reglas que verifica, por página, en desktop 1440 (mouse) y móvil 390 (touch):
//   scroller-sin-controles  desktop: zona con scroll horizontal y barra oculta → debe tener botones anterior/siguiente
//                           (data-scroller-prev/next o aria-label "anterior"/"siguiente")
//   controles-no-mueven     desktop: al pulsar "siguiente" el scroller debe desplazarse
//   tap-target              móvil: control < 24×24 px con otro control dentro de su círculo de 24 px = FAIL (WCAG 2.5.8);
//                           < 44 px o < 24 px con espacio alrededor = WARN (conteo); links dentro de texto corrido exentos
//   details                 cada <details> abre y cierra al pulsar su <summary>
//   aria-expanded           cada botón con aria-expanded alterna su estado al pulsarlo
//   aria-pressed            cada chip/filtro con aria-pressed se activa al pulsarlo
//   formulario-vacio        enviar un formulario vacío NO navega y SÍ muestra un error visible (role=alert / aria-invalid / .input-error)
//   label                   cada input/select/textarea tiene label, aria-label o aria-labelledby
//   foco-visible            recorriendo con Tab, cada elemento enfocado cambia visualmente (outline, sombra, fondo o borde)
//   link-externo            target=_blank lleva rel=noopener; links de WhatsApp usan wa.me o api.whatsapp.com con número
//   img-alt                 toda <img> tiene atributo alt (vacío si es decorativa)
//   menu-movil              móvil: el menú abre, sus links quedan dentro del viewport y Escape lo cierra
//   consola                 cero errores de consola durante las interacciones
//
// Salida: imprime el reporte, escribe OUT_DIR/reporte-interaccion.md y sale con 1 si hay FAIL.

import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const BASE = (process.env.BASE_URL || 'http://localhost:3007').replace(/\/$/, '')
const OUT = process.env.OUT_DIR || 'pruebas/fallos-interaccion'
fs.mkdirSync(OUT, { recursive: true })

let PAGES = process.env.PAGES ? process.env.PAGES.split(',').map(s => s.trim()).filter(Boolean) : null
if (!PAGES) {
  try {
    const xml = await (await fetch(BASE + '/sitemap.xml')).text()
    PAGES = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1].trim()).pathname || '/')
  } catch { PAGES = ['/'] }
}
// Git Bash convierte "/gracias" en una ruta de Windows: nos quedamos con el último segmento y normalizamos
const normaliza = s => '/' + s.trim().replace(/\\/g, '/').split('/').filter(Boolean).pop()
for (const p of (process.env.EXTRA_PAGES || '').split(',').filter(s => s.trim()).map(normaliza)) if (!PAGES.includes(p)) PAGES.push(p)
PAGES = [...new Set(PAGES)]

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900, mobile: false },
  { name: 'movil', width: 390, height: 844, mobile: true },
]

const results = [] // { page, viewport, check, level, detail }
const add = (page, viewport, check, level, detail) => results.push({ page, viewport, check, level, detail })
const slug = p => (p === '/' ? 'home' : p.replace(/^\//, '').replace(/\//g, '_'))

const browser = await chromium.launch()

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: vp.mobile, hasTouch: vp.mobile })
  // Intro/overlays de primera visita: marcar como ya vistos (ajustar la clave por proyecto si aplica)
  await ctx.addInitScript(() => { try { localStorage.setItem('rs_intro_shown', new Date().toDateString()) } catch {} })

  for (const p of PAGES) {
    const page = await ctx.newPage()
    const consola = []
    page.on('console', m => { if (m.type() === 'error') consola.push(m.text().slice(0, 200)) })
    page.on('pageerror', e => consola.push('PAGEERROR ' + String(e).slice(0, 200)))
    try {
      await page.goto(BASE + p, { waitUntil: 'networkidle', timeout: 45000 })
    } catch (e) { add(p, vp.name, 'carga', 'FAIL', e.message.slice(0, 120)); await page.close(); continue }
    // Forzar visibles los elementos con reveal-on-scroll y quitar transiciones (mediciones estables)
    await page.addStyleTag({ content: `.reveal,[class*="reveal"]{opacity:1!important;transform:none!important;filter:none!important} *{transition-duration:0s!important;animation-duration:0s!important}` })
    await page.waitForTimeout(300)

    // ---- Reglas de solo lectura (DOM) ----
    const dom = await page.evaluate(({ isMobile }) => {
      const out = { scrollers: [], tapFail: [], tapWarn: 0, imgsSinAlt: [], sinLabel: [], externos: [], whatsapp: [] }
      const visible = el => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' }
      const ident = el => el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (typeof el.className === 'string' && el.className ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : '') + (el.textContent ? ' "' + el.textContent.trim().slice(0, 40) + '"' : '')

      // Scrollers horizontales con barra oculta
      for (const el of document.querySelectorAll('body *')) {
        const cs = getComputedStyle(el)
        if (!/(auto|scroll)/.test(cs.overflowX)) continue
        if (el.scrollWidth <= el.clientWidth + 4 || !visible(el)) continue
        const bordes = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth)
        const barra = el.offsetHeight - el.clientHeight - bordes
        const oculta = cs.scrollbarWidth === 'none' || barra < 2
        const ambito = el.closest('section, article, [role=region], main') || el.parentElement
        const controles = ambito ? ambito.querySelectorAll('[data-scroller-prev],[data-scroller-next],button[aria-label*="anterior" i],button[aria-label*="siguiente" i],button[aria-label*="prev" i],button[aria-label*="next" i]').length : 0
        out.scrollers.push({ el: ident(el), oculta, controles, id: el.id || null })
      }

      // Tap targets (móvil) — WCAG 2.5.8: < 24 px solo falla si otro control cae dentro del círculo de 24 px
      // (excepción de espaciado); los links dentro de texto corrido están exentos.
      if (isMobile) {
        const targets = [...document.querySelectorAll('a, button, [role=button], input:not([type=hidden]), select, textarea, summary')].filter(visible)
        const rects = targets.map(el => el.getBoundingClientRect())
        targets.forEach((el, i) => {
          const cs = getComputedStyle(el)
          if (el.tagName === 'A' && cs.display.startsWith('inline') && el.parentElement && /^(P|LI|TD|SPAN|EM|STRONG|SMALL|DD|FIGCAPTION)$/.test(el.parentElement.tagName)) return
          const r = rects[i]
          const m = Math.min(r.width, r.height)
          if (m >= 44) return
          if (m >= 24) { out.tapWarn++; return }
          const cx = r.left + r.width / 2, cy = r.top + r.height / 2
          const choca = rects.some((o, j) => j !== i && cx + 12 > o.left && cx - 12 < o.right && cy + 12 > o.top && cy - 12 < o.bottom)
          if (choca) out.tapFail.push(ident(el) + ` ${Math.round(r.width)}×${Math.round(r.height)}`)
          else out.tapWarn++
        })
      }

      // img alt
      for (const img of document.images) if (!img.hasAttribute('alt')) out.imgsSinAlt.push(img.currentSrc || img.src)

      // labels
      for (const f of document.querySelectorAll('input:not([type=hidden]):not([type=submit]):not([type=button]), select, textarea')) {
        const ok = (f.id && document.querySelector(`label[for="${CSS.escape(f.id)}"]`)) || f.closest('label') || f.getAttribute('aria-label') || f.getAttribute('aria-labelledby')
        if (!ok) out.sinLabel.push(ident(f))
      }

      // links externos y WhatsApp
      for (const a of document.querySelectorAll('a[href]')) {
        const href = a.getAttribute('href') || ''
        if (a.target === '_blank' && !/noopener/.test(a.rel)) out.externos.push(ident(a) + ' → ' + href.slice(0, 60))
        if (/^https?:/i.test(href) && /whatsapp\.com|wa\.me/i.test(href) && !/^https:\/\/(wa\.me\/\d{8,15}|api\.whatsapp\.com\/send)/.test(href)) out.whatsapp.push(href.slice(0, 80))
      }
      return out
    }, { isMobile: vp.mobile })

    if (!vp.mobile) for (const s of dom.scrollers) if (s.oculta && s.controles === 0) add(p, vp.name, 'scroller-sin-controles', 'FAIL', s.el)
    for (const t of dom.tapFail) add(p, vp.name, 'tap-target', 'FAIL', t)
    if (dom.tapWarn) add(p, vp.name, 'tap-target', 'WARN', `${dom.tapWarn} controles entre 24 y 44 px`)
    for (const i of dom.imgsSinAlt) add(p, vp.name, 'img-alt', 'FAIL', i)
    for (const l of dom.sinLabel) add(p, vp.name, 'label', 'FAIL', l)
    for (const e of dom.externos) add(p, vp.name, 'link-externo', 'FAIL', 'sin rel=noopener: ' + e)
    for (const w of dom.whatsapp) add(p, vp.name, 'link-externo', 'FAIL', 'WhatsApp con formato raro: ' + w)

    // ---- Controles de scroller funcionan (desktop) ----
    if (!vp.mobile) {
      const nexts = page.locator('[data-scroller-next]')
      for (let i = 0; i < await nexts.count(); i++) {
        const btn = nexts.nth(i)
        if (!(await btn.isVisible())) { add(p, vp.name, 'controles-no-mueven', 'FAIL', 'botón siguiente no visible en desktop'); continue }
        const trackId = await btn.getAttribute('data-scroller-next')
        const track = page.locator(trackId ? `#${trackId}` : 'body')
        const antes = await track.evaluate(el => el.scrollLeft).catch(() => null)
        if (antes === null) { add(p, vp.name, 'controles-no-mueven', 'FAIL', `data-scroller-next="${trackId}" no apunta a un elemento`); continue }
        await btn.scrollIntoViewIfNeeded(); await btn.click(); await page.waitForTimeout(700)
        const despues = await track.evaluate(el => el.scrollLeft)
        if (despues <= antes + 10) add(p, vp.name, 'controles-no-mueven', 'FAIL', `#${trackId}: scrollLeft ${antes} → ${despues}`)
      }
    }

    // ---- details ----
    const details = page.locator('details')
    for (let i = 0; i < Math.min(await details.count(), 12); i++) {
      const d = details.nth(i); const s = d.locator('summary').first()
      if (!(await s.isVisible())) continue
      await s.scrollIntoViewIfNeeded(); await s.click(); await page.waitForTimeout(150)
      const abierto = await d.evaluate(el => el.open)
      const alto = await d.evaluate(el => { const c = [...el.children].find(ch => ch.tagName !== 'SUMMARY'); return c ? c.getBoundingClientRect().height : 0 })
      if (!abierto || alto < 8) add(p, vp.name, 'details', 'FAIL', `#${i + 1} no abre o no muestra contenido`)
      await s.click(); await page.waitForTimeout(150)
      if (await d.evaluate(el => el.open)) add(p, vp.name, 'details', 'FAIL', `#${i + 1} no cierra`)
    }

    // ---- aria-expanded (excepto hamburguesa, que se prueba aparte) ----
    const exp = page.locator('button[aria-expanded]:not([aria-controls="mobile-menu"])')
    for (let i = 0; i < Math.min(await exp.count(), 12); i++) {
      const b = exp.nth(i); if (!(await b.isVisible())) continue
      const a0 = await b.getAttribute('aria-expanded')
      await b.scrollIntoViewIfNeeded(); await b.click(); await page.waitForTimeout(200)
      const a1 = await b.getAttribute('aria-expanded')
      if (a0 === a1) add(p, vp.name, 'aria-expanded', 'FAIL', `botón #${i + 1} no alterna (${a0})`)
      else { await b.click().catch(() => {}); await page.waitForTimeout(150) }
    }

    // ---- aria-pressed ----
    const pressed = page.locator('[aria-pressed]')
    const nPressed = await pressed.count()
    if (nPressed) {
      const target = pressed.nth(Math.min(1, nPressed - 1))
      if (await target.isVisible()) {
        await target.scrollIntoViewIfNeeded(); await target.click(); await page.waitForTimeout(300)
        if ((await target.getAttribute('aria-pressed')) !== 'true') add(p, vp.name, 'aria-pressed', 'FAIL', 'el chip no queda activo al pulsarlo')
      }
    }

    // ---- formularios vacíos ----
    const forms = page.locator('form')
    for (let i = 0; i < await forms.count(); i++) {
      const f = forms.nth(i); if (!(await f.isVisible())) continue
      const submit = f.locator('button[type=submit], input[type=submit], button:not([type])').last()
      if (!(await submit.count())) { add(p, vp.name, 'formulario-vacio', 'WARN', `form #${i + 1} sin botón de envío`); continue }
      const urlAntes = page.url()
      await submit.scrollIntoViewIfNeeded(); await submit.click(); await page.waitForTimeout(600)
      const navego = page.url() !== urlAntes
      const errorVisible = await f.evaluate(el => {
        const cand = el.querySelectorAll('[role=alert], [aria-invalid="true"], .input-error, [class*="error"], [id$="-error"]')
        return [...cand].some(c => { const r = c.getBoundingClientRect(); return r.height > 0 && (c.textContent || '').trim().length > 0 || c.getAttribute('aria-invalid') === 'true' })
      })
      const nativo = await f.evaluate(el => !el.noValidate && !el.checkValidity())
      if (navego) add(p, vp.name, 'formulario-vacio', 'FAIL', `form #${i + 1} navegó a ${page.url()} con campos vacíos`)
      else if (!errorVisible && !nativo) add(p, vp.name, 'formulario-vacio', 'FAIL', `form #${i + 1} no muestra error al enviarse vacío`)
      if (navego) { await page.goto(BASE + p, { waitUntil: 'networkidle' }) }
    }

    // ---- foco visible con Tab (desktop) ----
    if (!vp.mobile) {
      await page.evaluate(() => { window.scrollTo(0, 0); document.body.focus?.() })
      const sinFoco = new Set()
      for (let i = 0; i < 25; i++) {
        await page.keyboard.press('Tab')
        const info = await page.evaluate(() => {
          const el = document.activeElement
          if (!el || el === document.body) return null
          const pick = cs => [cs.outlineStyle, cs.outlineWidth, cs.outlineColor, cs.boxShadow, cs.backgroundColor, cs.borderColor, cs.textDecorationLine].join('|')
          const con = pick(getComputedStyle(el))
          el.blur(); const sin = pick(getComputedStyle(el)); el.focus({ preventScroll: true })
          const r = el.getBoundingClientRect()
          const id = el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + ' "' + (el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 30) + '"'
          return { id, cambia: con !== sin, visible: r.width > 0 && r.height > 0 }
        })
        if (info && info.visible && !info.cambia) sinFoco.add(info.id)
      }
      for (const id of [...sinFoco].slice(0, 8)) add(p, vp.name, 'foco-visible', 'FAIL', id)
    }

    // ---- menú móvil ----
    if (vp.mobile && (p === '/' || p === PAGES[1])) {
      const burger = page.locator('button[aria-controls="mobile-menu"]')
      if (await burger.count() && await burger.isVisible()) {
        await burger.click(); await page.waitForTimeout(350)
        const fuera = await page.evaluate(() => {
          const links = [...document.querySelectorAll('#mobile-menu a')]
          return links.filter(a => { const r = a.getBoundingClientRect(); return r.right > innerWidth + 1 || r.left < -1 || r.width === 0 }).map(a => a.textContent.trim())
        })
        if (fuera.length) add(p, vp.name, 'menu-movil', 'FAIL', 'links fuera del viewport: ' + fuera.join(', '))
        await page.keyboard.press('Escape'); await page.waitForTimeout(300)
        if ((await burger.getAttribute('aria-expanded')) === 'true') add(p, vp.name, 'menu-movil', 'FAIL', 'Escape no cierra el menú')
      }
    }

    for (const c of [...new Set(consola)].slice(0, 5)) add(p, vp.name, 'consola', 'FAIL', c)
    await page.close()
  }
  await ctx.close()
}
await browser.close()

// ---- Reporte ----
const fails = results.filter(r => r.level === 'FAIL'), warns = results.filter(r => r.level === 'WARN')
const md = [`# Matriz de interacción — ${BASE} — ${new Date().toISOString()}`, '', `Páginas: ${PAGES.length} · viewports: ${VIEWPORTS.length} · FAIL: ${fails.length} · WARN: ${warns.length}`, '']
for (const r of results) md.push(`- ${r.level === 'FAIL' ? '❌' : '⚠️'} ${r.page} @ ${r.viewport} [${r.check}] ${r.detail}`)
if (!results.length) md.push('✅ Sin hallazgos')
fs.writeFileSync(path.join(OUT, 'reporte-interaccion.md'), md.join('\n'))
console.log(md.join('\n'))
process.exit(fails.length ? 1 : 0)
