'use client'

import { useEffect } from 'react'
import { trackScrollDepth } from '@/lib/analytics'

export default function ScrollRevealProvider() {
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
      revealObserver.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return null
}