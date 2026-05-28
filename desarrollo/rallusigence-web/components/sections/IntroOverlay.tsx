'use client'

import { useState, useEffect } from 'react'
import styles from './IntroOverlay.module.css'

const KEY = 'rs_intro_shown'

export default function IntroOverlay() {
  const [visible, setVisible] = useState(false)
  const [fading, setFading] = useState(false)
  const [done, setDone] = useState(false)
  const [line1, setLine1] = useState(false)
  const [line2, setLine2] = useState(false)
  const [line3, setLine3] = useState(false)
  const [showCta, setShowCta] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Verificar si se prefiere menos movimiento
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setDone(true)
      return
    }

    // Verificar si ya se mostró hoy
    const today = new Date().toDateString()
    if (localStorage.getItem(KEY) === today) {
      setDone(true)
      return
    }

    // Mostrar overlay
    setVisible(true)

    // Secuencia de animaciones
    const timers: NodeJS.Timeout[] = []

    // Línea 1: 0ms
    timers.push(setTimeout(() => setLine1(true), 0))

    // Línea 2: 1500ms
    timers.push(setTimeout(() => setLine2(true), 1500))

    // Línea 3: 3000ms
    timers.push(setTimeout(() => setLine3(true), 3000))

    // CTA: 4000ms
    timers.push(setTimeout(() => setShowCta(true), 4000))

    // Auto-dismiss: 5500ms
    timers.push(setTimeout(() => dismiss(), 5500))

    return () => {
      timers.forEach(timer => clearTimeout(timer))
    }
  }, [])

  const dismiss = () => {
    setFading(true)
    setTimeout(() => {
      setDone(true)
      if (typeof window !== 'undefined') {
        localStorage.setItem(KEY, new Date().toDateString())
      }
    }, 400) // tiempo del fade-out
  }

  if (done) return null

  return (
    <div className={`${styles.overlay} ${fading ? styles.fading : ''}`}>
      <div className={styles.content}>
        <div className={`${styles.line1} ${line1 ? styles.visible : ''}`}>
          ¿Tu negocio no aparece en Google?
        </div>

        <div className={`${styles.line2} ${line2 ? styles.visible : ''}`}>
          Lo construimos en 3 días con IA.
        </div>

        <div className={`${styles.line3} ${line3 ? styles.visible : ''}`}>
          Rallusigence.
        </div>

        <div className={`${styles.ctaWrap} ${showCta ? styles.visible : ''}`}>
          <a href="/#paquetes" className={styles.cta} onClick={dismiss}>
            Ver paquetes →
          </a>
        </div>
      </div>

      <button className={styles.skipBtn} onClick={dismiss} aria-label="Saltar intro">
        Saltar
      </button>
    </div>
  )
}