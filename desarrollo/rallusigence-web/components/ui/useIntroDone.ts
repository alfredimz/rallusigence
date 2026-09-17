'use client'

import { useState, useEffect } from 'react'

// true cuando el IntroOverlay terminó (o nunca se mostró).
// IntroOverlay marca <html data-rs-intro-done="1"> y emite 'rs:intro-done'.
export default function useIntroDone(): boolean {
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (document.documentElement.dataset.rsIntroDone === '1') {
      setDone(true)
      return
    }
    const onDone = () => setDone(true)
    window.addEventListener('rs:intro-done', onDone)
    // Red de seguridad: si algo falla, arrancar a los 7s de todos modos
    const fallback = setTimeout(() => setDone(true), 7000)
    return () => {
      window.removeEventListener('rs:intro-done', onDone)
      clearTimeout(fallback)
    }
  }, [])

  return done
}
