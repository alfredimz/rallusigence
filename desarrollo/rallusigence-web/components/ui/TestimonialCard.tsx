import Link from 'next/link'
import type { Testimonio } from '@/lib/content/testimonios'
import styles from './TestimonialCard.module.css'

interface TestimonialCardProps {
  t: Testimonio
}

// Card de testimonio real: kiwi-avatar por giro, cita, nombre, negocio,
// giro y ciudad; enlace al caso del portafolio cuando existe.
export default function TestimonialCard({ t }: TestimonialCardProps) {
  return (
    <figure className={styles.card}>
      <blockquote className={styles.quote}>
        <p>{t.cita}</p>
      </blockquote>
      <figcaption className={styles.meta}>
        <img
          src={t.kiwi}
          alt=""
          aria-hidden="true"
          width={44}
          height={44}
          loading="lazy"
          decoding="async"
          className={styles.kiwi}
        />
        <div className={styles.who}>
          <span className={styles.name}>{t.nombre}</span>
          <span className={styles.business}>
            {t.negocio} · {t.giro}
            {t.ciudad ? ` · ${t.ciudad}` : ''}
          </span>
          {t.casoSlug && (
            <Link href={`/portafolio#caso-${t.casoSlug}`} className={styles.link}>
              Ver proyecto
            </Link>
          )}
        </div>
      </figcaption>
    </figure>
  )
}
