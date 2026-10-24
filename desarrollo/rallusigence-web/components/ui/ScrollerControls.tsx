'use client'

import { useCallback, useEffect, useState } from 'react'
import styles from './ScrollerControls.module.css'

interface ScrollerControlsProps {
  /** id del elemento con scroll horizontal que controlan las flechas */
  trackId: string
  /** nombre para el aria-label del grupo, p. ej. "demos" */
  label?: string
  className?: string
}

/**
 * Flechas anterior/siguiente para una pista con scroll horizontal (scroll-snap) y
 * arrastre con el mouse. Las flechas solo se muestran donde hay mouse
 * (`hover: hover`); en touch la pista se desliza con el dedo.
 * Expone `data-scroller-prev/next` para la matriz de interacción (pruebas/).
 */
export default function ScrollerControls({ trackId, label = 'carrusel', className = '' }: ScrollerControlsProps) {
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const getTrack = useCallback(() => (typeof document === 'undefined' ? null : (document.getElementById(trackId) as HTMLElement | null)), [trackId])

  useEffect(() => {
    const track = getTrack()
    if (!track) return

    const update = () => {
      setCanPrev(track.scrollLeft > 4)
      setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4)
    }
    update()
    track.addEventListener('scroll', update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(track)

    // Arrastre con mouse: desactiva el snap mientras se arrastra y bloquea el click si hubo movimiento
    let down = false
    let moved = false
    let startX = 0
    let startLeft = 0
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return
      down = true
      moved = false
      startX = e.clientX
      startLeft = track.scrollLeft
    }
    const onMove = (e: PointerEvent) => {
      if (!down) return
      const dx = e.clientX - startX
      if (!moved && Math.abs(dx) > 5) {
        moved = true
        track.classList.add('is-dragging')
      }
      if (moved) track.scrollLeft = startLeft - dx
    }
    const onUp = () => {
      if (!down) return
      down = false
      track.classList.remove('is-dragging')
    }
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault()
        e.stopPropagation()
        moved = false
      }
    }
    track.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    track.addEventListener('click', onClick, true)

    return () => {
      track.removeEventListener('scroll', update)
      ro.disconnect()
      track.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      track.removeEventListener('click', onClick, true)
    }
  }, [getTrack])

  const step = (dir: 1 | -1) => {
    const track = getTrack()
    if (!track) return
    const first = track.firstElementChild as HTMLElement | null
    const cs = getComputedStyle(track)
    const gap = parseFloat(cs.columnGap || cs.gap || '0') || 0
    const paso = first ? first.offsetWidth + gap : track.clientWidth * 0.8
    track.scrollBy({ left: dir * paso, behavior: 'smooth' })
  }

  return (
    <div className={`${styles.controls} ${className}`} role="group" aria-label={`Navegación de ${label}`}>
      <button
        type="button"
        className={styles.btn}
        onClick={() => step(-1)}
        disabled={!canPrev}
        aria-label="Anterior"
        data-scroller-prev={trackId}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </button>
      <button
        type="button"
        className={styles.btn}
        onClick={() => step(1)}
        disabled={!canNext}
        aria-label="Siguiente"
        data-scroller-next={trackId}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}
