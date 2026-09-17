'use client'

import { useEffect, useRef } from 'react'
import styles from './ScrollKiwi.module.css'

// Kiwi viajero: barra de progreso de lectura en el borde superior con un kiwi
// que recorre la página contigo (y "camina" mientras haces scroll).
export default function ScrollKiwi() {
  const barRef = useRef<HTMLSpanElement>(null)
  const kiwiRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const bar = barRef.current
    const kiwi = kiwiRef.current
    if (!bar || !kiwi) return

    let raf = 0
    let idleTimer: ReturnType<typeof setTimeout> | undefined
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
      bar.style.transform = `scaleX(${p.toFixed(4)})`
      kiwi.style.transform = `translateX(${(p * (window.innerWidth - 30)).toFixed(1)}px)`
      kiwi.classList.add(styles.walking)
      if (idleTimer) clearTimeout(idleTimer)
      idleTimer = setTimeout(() => kiwi.classList.remove(styles.walking), 200)
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    kiwi.classList.remove(styles.walking)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
      if (idleTimer) clearTimeout(idleTimer)
    }
  }, [])

  return (
    <div className={styles.track} aria-hidden="true">
      <span ref={barRef} className={styles.bar} />
      <img
        ref={kiwiRef}
        src="/assets/kiwi-icon-clean.svg"
        alt=""
        className={styles.kiwi}
        width={26}
        height={26}
      />
    </div>
  )
}
