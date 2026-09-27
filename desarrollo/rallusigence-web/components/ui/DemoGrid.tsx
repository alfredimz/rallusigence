'use client'

import { useState } from 'react'
import { CATEGORIAS_DEMO, type CategoriaDemo, type Demo } from '@/lib/content/demos'
import DemoCard from '@/components/ui/DemoCard'
import styles from './DemoGrid.module.css'

interface DemoGridProps {
  demos: Demo[]
}

type Filtro = 'todos' | CategoriaDemo

// Filtro por giro (chips con aria-pressed) + grid asimétrico 3fr/2fr alternado.
// No usa .reveal: los elementos se remontan al filtrar y el observer global
// no los volvería a ver. La entrada se anima con un keyframe por montaje.
export default function DemoGrid({ demos }: DemoGridProps) {
  const [filtro, setFiltro] = useState<Filtro>('todos')

  const visibles = filtro === 'todos' ? demos : demos.filter((d) => d.categoria === filtro)
  const conteo = (id: Filtro) => (id === 'todos' ? demos.length : demos.filter((d) => d.categoria === id).length)

  return (
    <div>
      <div className={styles.filters} role="group" aria-label="Filtrar demos por giro">
        {([{ id: 'todos' as const, label: 'Todos' }, ...CATEGORIAS_DEMO]).map((c) => (
          <button
            key={c.id}
            type="button"
            className={styles.chip}
            aria-pressed={filtro === c.id}
            onClick={() => setFiltro(c.id)}
          >
            {c.label}
            <span className={styles.count} aria-hidden="true">{conteo(c.id)}</span>
          </button>
        ))}
      </div>

      <p className={styles.status} role="status" aria-live="polite">
        {visibles.length === demos.length
          ? `${demos.length} demos, una por giro.`
          : `${visibles.length} ${visibles.length === 1 ? 'demo' : 'demos'} en ${CATEGORIAS_DEMO.find((c) => c.id === filtro)?.label.toLowerCase()}.`}
      </p>

      <div className={styles.grid} key={filtro}>
        {visibles.map((demo, i) => (
          <div key={demo.slug} className={styles.cell} style={{ animationDelay: `${Math.min(i, 5) * 60}ms` }}>
            <DemoCard demo={demo} eager={i < 2} />
          </div>
        ))}
      </div>
    </div>
  )
}
