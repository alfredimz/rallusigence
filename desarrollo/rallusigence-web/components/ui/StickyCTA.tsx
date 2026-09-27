'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function StickyCTA() {
  const [visible, setVisible] = useState(false)

  const [covered, setCovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    // No tapar los CTAs de las secciones a las que el botón lleva (paquetes) ni el formulario.
    const targets = ['#paquetes', '#contacto']
      .map((sel) => document.querySelector(sel))
      .filter((el): el is Element => !!el)
    const state = new Map<Element, boolean>()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => state.set(e.target, e.isIntersecting))
        setCovered([...state.values()].some(Boolean))
      },
      { threshold: 0.05 }
    )
    targets.forEach((t) => io.observe(t))

    return () => {
      window.removeEventListener('scroll', handleScroll)
      io.disconnect()
    }
  }, [])

  return (
    <Link
      href="/#paquetes"
      className={`btn-sticky ${visible && !covered ? 'btn-sticky--visible' : ''}`}
      aria-label="Ver paquetes"
    >
      Ver paquetes
    </Link>
  )
}
