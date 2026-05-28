'use client'

import { useState, useEffect } from 'react'

export default function StickyCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <a
      href="/#paquetes"
      className={`btn-sticky ${visible ? 'btn-sticky--visible' : ''}`}
      aria-label="Ver paquetes"
    >
      Ver paquetes
    </a>
  )
}