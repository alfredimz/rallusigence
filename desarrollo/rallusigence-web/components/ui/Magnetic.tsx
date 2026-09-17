'use client'

import { useRef, useEffect } from 'react'

// Envuelve un elemento interactivo y lo desplaza suavemente hacia el cursor.
// Solo pointer:fine, respeta prefers-reduced-motion, rAF-throttled,
// muta style directo (nunca setState en mousemove) para no romper INP.
export default function Magnetic({
  children,
  strength = 0.25,
}: {
  children: React.ReactNode
  strength?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const target = el.firstElementChild as HTMLElement | null
    if (!target) return

    let raf = 0
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height / 2)
        target.style.transform = `translate(${(dx * strength).toFixed(1)}px, ${(dy * strength).toFixed(1)}px)`
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(raf)
      target.style.transition = 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'
      target.style.transform = ''
      window.setTimeout(() => { target.style.transition = '' }, 380)
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [strength])

  return (
    <span ref={ref} style={{ display: 'inline-block', padding: '8px', margin: '-8px' }}>
      {children}
    </span>
  )
}
