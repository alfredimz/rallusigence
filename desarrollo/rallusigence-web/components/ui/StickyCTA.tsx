'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

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
    <Link
      href="/#paquetes"
      className={`btn-sticky ${visible ? 'btn-sticky--visible' : ''}`}
      aria-label="Ver paquetes"
    >
      Ver paquetes
    </Link>
  )
}
