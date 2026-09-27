import Link from 'next/link'
import type { Demo } from '@/lib/content/demos'
import { getPaquete } from '@/lib/content/paquetes'
import WhatsAppCta from '@/components/ui/WhatsAppCta'
import styles from './DemoCard.module.css'

interface DemoCardProps {
  demo: Demo
  // compact: versión para el teaser (sin destacados, imagen más baja)
  compact?: boolean
  // eager: primeras cards del portafolio (above the fold)
  eager?: boolean
}

// Card de demo por giro. Captura desktop como imagen principal; en hover/focus
// (solo pointer fino) aparece la captura móvil como "teléfono" a la derecha.
export default function DemoCard({ demo, compact = false, eager = false }: DemoCardProps) {
  const paquete = getPaquete(demo.paqueteSugerido)
  const headingId = `demo-${demo.slug}-title`

  return (
    <article
      id={`demo-${demo.slug}`}
      className={`${styles.card} ${compact ? styles.compact : ''}`}
      aria-labelledby={headingId}
    >
      <div className={styles.media}>
        <img
          src={demo.imagen}
          alt={`Captura de la demo ${demo.nombre}, versión escritorio`}
          width={1440}
          height={900}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className={styles.desktop}
        />
        <img
          src={demo.imagenMobile}
          alt=""
          aria-hidden="true"
          width={390}
          height={844}
          loading="lazy"
          decoding="async"
          className={styles.phone}
        />
      </div>

      <div className={styles.body}>
        <p className={styles.giro}>{demo.giro}</p>
        <h3 id={headingId} className={styles.name}>{demo.nombre}</h3>
        {!compact && (
          <p className={styles.destacados}>
            {demo.destacados.join(' · ')}.
          </p>
        )}
        <div className={styles.footer}>
          <Link
            href={`/paquetes#${paquete.id}`}
            className={styles.chip}
            aria-label={`Paquete sugerido: ${paquete.nombre}, ${paquete.precioTexto}`}
          >
            Paquete sugerido: <strong>{paquete.nombre}</strong>
          </Link>
          <WhatsAppCta
            location={compact ? 'demos-teaser' : 'portafolio-demo'}
            message={`Hola, me interesa un sitio como la demo de ${demo.nombre}`}
            className={styles.cta}
          >
            Quiero uno así
          </WhatsAppCta>
        </div>
      </div>
    </article>
  )
}
