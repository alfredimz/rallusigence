'use client'

import styles from './ConfettiBurst.module.css'

// Explosión de confeti mínima con colores de marca. Piezas efímeras
// (animation-fill-mode: forwards con opacidad final 0 — no queda nada en pantalla).
const COLORS = ['#20B4B1', '#F8B84E', '#7FD4EA', '#AC7F3D', '#10B981', '#EB5B5B']

export default function ConfettiBurst({ count = 14 }: { count?: number }) {
  return (
    <span className={styles.burst} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={styles.piece}
          style={{
            '--angle': `${(360 / count) * i + (i % 2 ? 12 : -8)}deg`,
            '--dist': `${52 + (i % 4) * 16}px`,
            '--c': COLORS[i % COLORS.length],
            '--dur': `${0.7 + (i % 3) * 0.15}s`,
          } as React.CSSProperties}
        />
      ))}
    </span>
  )
}
