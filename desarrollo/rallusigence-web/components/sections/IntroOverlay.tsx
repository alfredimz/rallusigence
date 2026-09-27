'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from './IntroOverlay.module.css'

const KEY = 'rs_intro_shown'

function markIntroDone() {
  document.documentElement.dataset.rsIntroDone = '1'
  window.dispatchEvent(new Event('rs:intro-done'))
}

export default function IntroOverlay() {
  const [visible, setVisible] = useState(false)
  const [fading, setFading] = useState(false)
  const [done, setDone] = useState(false)
  const [line1, setLine1] = useState(false)
  const [line2, setLine2] = useState(false)
  const [line3, setLine3] = useState(false)
  const [showCta, setShowCta] = useState(false)

  const skipBtnRef = useRef<HTMLButtonElement>(null)
  const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const dismiss = () => {
    setFading(true)
    dismissTimerRef.current = setTimeout(() => {
      setDone(true)
      if (typeof window !== 'undefined') {
        localStorage.setItem(KEY, new Date().toDateString())
        markIntroDone()
      }
    }, 400) // tiempo del fade-out
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Verificar si se prefiere menos movimiento
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setDone(true)
      markIntroDone()
      return
    }

    // Verificar si ya se mostró hoy
    const today = new Date().toDateString()
    if (localStorage.getItem(KEY) === today) {
      setDone(true)
      markIntroDone()
      return
    }

    // Mostrar overlay
    setVisible(true)

    // Secuencia de animaciones
    const timers: ReturnType<typeof setTimeout>[] = []

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
      timers.forEach((timer) => clearTimeout(timer))
      if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current)
    }
  }, [])

  // Foco inicial en "Saltar" y cierre con Escape (accesibilidad de diálogo modal)
  useEffect(() => {
    if (!visible || done) return
    skipBtnRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [visible, done])

  if (done) return null

  return (
    <div
      className={`${styles.overlay} ${fading ? styles.fading : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Bienvenida a Rallusigence"
    >
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
          <Link href="/#paquetes" className={styles.cta} onClick={dismiss}>
            Ver paquetes →
          </Link>
        </div>
      </div>

      <button ref={skipBtnRef} className={styles.skipBtn} onClick={dismiss} aria-label="Saltar intro">
        Saltar
      </button>
    </div>
  )
}
