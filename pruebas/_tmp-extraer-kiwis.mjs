// Extrae grupos candidatos (kiwis) de SVGs de página completa exportados de Illustrator.
// Genera: candidatos/*.svg (standalone) + contactos.html (hoja de contactos para revisar)
import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const SRC = 'C:/Users/alfre/AppData/Local/Temp/claude/E--AlfreditosDrive-Proyectos/749a552e-1a7a-4b5b-9116-fef779482308/scratchpad/galeria-kiwi'
const OUT = path.join(SRC, 'candidatos')
fs.mkdirSync(OUT, { recursive: true })

const FILES = ['trip-01.svg','trip-02.svg','trip-03.svg','cat-01.svg','cat-3.svg','cat-4.svg','cat-6.svg','cat-09.svg','cat-10.svg','cat-11.svg','cur-01.svg','cur-02.svg','cur-03.svg']

const browser = await chromium.launch()
const page = await browser.newPage()
let total = 0

for (const file of FILES) {
  const svgText = fs.readFileSync(path.join(SRC, file), 'utf8')
  await page.setContent(`<body style="margin:0">${svgText}</body>`)
  await page.waitForTimeout(200)

  const candidates = await page.evaluate(() => {
    const svg = document.querySelector('svg')
    const root = svg.viewBox?.baseVal
    const pageArea = (root?.width || 1000) * (root?.height || 1000)
    const style = svg.querySelector('style')?.outerHTML || ''
    const defs = svg.querySelector('defs')?.outerHTML || ''
    const groups = [...svg.querySelectorAll('g')]
    const out = []
    const boxes = []
    for (const g of groups) {
      let b
      try { b = g.getBBox() } catch { continue }
      if (b.width < 45 || b.height < 45) continue
      if (b.width > 950 || b.height > 950) continue
      if ((b.width * b.height) / pageArea > 0.45) continue
      if (g.querySelectorAll('path,polygon,circle,ellipse,rect').length < 4) continue
      // dedupe: si ya hay una caja casi idéntica, saltar (nos quedamos con la primera = más externa)
      const dup = boxes.some(x => Math.abs(x.x-b.x)<8 && Math.abs(x.y-b.y)<8 && Math.abs(x.width-b.width)<12 && Math.abs(x.height-b.height)<12)
      if (dup) continue
      boxes.push(b)
      const pad = Math.max(b.width, b.height) * 0.03
      const vb = `${b.x-pad} ${b.y-pad} ${b.width+pad*2} ${b.height+pad*2}`
      out.push({ vb, html: g.outerHTML, w: Math.round(b.width), h: Math.round(b.height) })
      if (out.length >= 30) break
    }
    return { style, defs, cands: out }
  })

  candidates.cands.forEach((c, i) => {
    const name = `${file.replace('.svg','')}_g${String(i).padStart(2,'0')}.svg`
    const standalone = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${c.vb}">${candidates.style}${candidates.defs}${c.html}</svg>`
    fs.writeFileSync(path.join(OUT, name), standalone)
    total++
  })
  console.log(`${file}: ${candidates.cands.length} candidatos`)
}

// Hoja de contactos
const all = fs.readdirSync(OUT).filter(f => f.endsWith('.svg'))
const cells = all.map(f => `<div style="border:1px solid #bbb;padding:4px;background:#fff"><p style="font:10px monospace;margin:0 0 2px">${f}</p><img src="candidatos/${f}" style="width:100%;height:130px;object-fit:contain"></div>`).join('')
fs.writeFileSync(path.join(SRC, 'contactos.html'), `<body style="margin:0;background:#ddd"><div style="display:grid;grid-template-columns:repeat(8,1fr);gap:6px;padding:6px">${cells}</div></body>`)

await browser.close()
console.log(`\nTOTAL: ${total} candidatos → ${OUT}`)
