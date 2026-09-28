'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackScrollDepth } from '@/lib/analytics'

export default function ScrollRevealProvider() {
  // Con next/link no hay recarga entre páginas: el observador debe
  // reengancharse en cada cambio de ruta o el contenido nuevo queda invisible.
  const pathname = usePathname()

  useEffect(() => {
    // Scroll Reveal Observer
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const observeAllRevealElements = () => {
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => {
        revealObserver.observe(el)
      })
    }

    observeAllRevealElements()

    // El contenido de la ruta puede montarse después de este efecto:
    // reintentar en los siguientes frames y vigilar el DOM.
    const raf = requestAnimationFrame(() => requestAnimationFrame(observeAllRevealElements))
    const mo = new MutationObserver(observeAllRevealElements)
    mo.observe(document.body, { childList: true, subtree: true })

    // Red de seguridad: nada debe quedarse invisible por siempre.
    const safety = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('visible')
      })
    }, 1500)

    // Scroll Depth Tracking
    const trackedDepths = new Set<number>()
    const depthThresholds = [25, 50, 75, 100]
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)

          depthThresholds.forEach((threshold) => {
            if (scrollPercent >= threshold && !trackedDepths.has(threshold)) {
              trackedDepths.add(threshold)
              trackScrollDepth(threshold)
            }
          })

          ticking = false
        })
        ticking = true
      }
    }

    // Add scroll listener for depth tracking
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      mo.disconnect()
      clearTimeout(safety)
      revealObserver.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname])

  return null
}