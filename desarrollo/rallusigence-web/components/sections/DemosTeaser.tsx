import Link from 'next/link'
import { DEMOS, type Demo } from '@/lib/content/demos'
import DemoCard from '@/components/ui/DemoCard'
import styles from './DemosTeaser.module.css'

interface DemosTeaserProps {
  titulo?: string
  bajada?: string
  demos?: Demo[]
  id?: string
}

// Selección por defecto para el home: 6 giros distintos, mezcla de paquetes.
const HOME_SLUGS = [
  'restaurante-delivery',
  'clinica-veterinaria',
  'despacho-contable',
  'academia-baile',
  'gruas-transporte',
  'invitaciones-rsvp'
]

export default function DemosTeaser({
  titulo = 'Así se ve un sitio hecho por nosotros',
  bajada = 'Dieciocho demos reales, una por giro. Elige la que se parece a tu negocio y la adaptamos a tu marca.',
  demos,
  id = 'demos'
}: DemosTeaserProps) {
  const list = demos ?? HOME_SLUGS.map((s) => DEMOS.find((d) => d.slug === s)).filter(Boolean) as Demo[]

  return (
    <section id={id} aria-labelledby={`${id}-title`} className={styles.section}>
      <div className={`section-wrapper ${styles.wrapper}`}>
        <div className={styles.head}>
          <div className={styles.headText}>
            <h2 id={`${id}-title`} className="rs-h2 reveal">{titulo}</h2>
            <p className={`${styles.bajada} reveal reveal--delay-1`}>{bajada}</p>
          </div>
          <Link href="/portafolio" className={`rs-btn rs-btn--ghost ${styles.headCta} reveal reveal--delay-2`}>
            Ver las {DEMOS.length} demos
          </Link>
        </div>
      </div>

      <div
        className={styles.track}
        role="group"
        aria-label="Demos por giro"
        tabIndex={0}
      >
        {list.map((demo, i) => (
          <div key={demo.slug} className={`${styles.slide} reveal reveal--delay-${Math.min(i + 1, 4)}`}>
            <DemoCard demo={demo} compact />
          </div>
        ))}
        <div className={styles.slideEnd} aria-hidden="true">
          <Link href="/portafolio" className={styles.endLink} tabIndex={-1}>
            Ver las {DEMOS.length} demos
          </Link>
        </div>
      </div>
    </section>
  )
}
