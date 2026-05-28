'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { trackWhatsAppClick } from '@/lib/analytics'
import styles from './Header.module.css'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 80)
      if (scrollY > 200) {
        setIsHidden(scrollY > lastScrollY.current)
      } else {
        setIsHidden(false)
      }
      lastScrollY.current = scrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    if (!isMenuOpen) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    document.body.classList.remove('no-scroll')
  }

  const navItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Paquetes', href: '/paquetes' },
    { label: 'Cómo funciona', href: '/como-funciona' },
    { label: 'Portafolio', href: '/portafolio' },
    { label: 'Contacto', href: '/#contacto' }
  ]

  return (
    <>
      <a href="#main" className="skip-link">
        Ir al contenido principal
      </a>
      <header
        className={`nav-header ${isScrolled ? 'nav-header--scrolled' : ''} ${isHidden ? 'nav-header--hidden' : ''}`}
      >
        <div className={styles.container}>
          <a href="/" className={styles.logo} onClick={closeMenu}>
            <Image
              src="/assets/letras-icono-horizontal.svg"
              alt="Rallusigence"
              width={160}
              height={40}
              priority
            />
          </a>

          {/* Desktop Navigation */}
          <nav className={styles.nav} aria-label="Navegación principal">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={styles.navLink}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="/paquetes"
            className={`rs-btn rs-btn--primary rs-btn--sm ${styles.desktopCta}`}
          >
            Ver paquetes
          </a>

          {/* Mobile hamburger */}
          <button
            className={styles.hamburger}
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div
            className={styles.mobileOverlay}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
          >
            <div className={styles.mobileMenu}>
              <h2 id="mobile-menu-title" className="sr-only">Menú de navegación</h2>

              <nav className={styles.mobileNav} aria-label="Navegación móvil">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={styles.mobileNavLink}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <a
                  href="/#contacto"
                  className="rs-btn rs-btn--primary rs-btn--full"
                  onClick={closeMenu}
                >
                  Auditoría gratis
                </a>
                <a
                  href="https://wa.me/52XXXXXXXXXX"
                  className="rs-btn rs-btn--ghost rs-btn--full"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackWhatsAppClick('header')
                    closeMenu()
                  }}
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}