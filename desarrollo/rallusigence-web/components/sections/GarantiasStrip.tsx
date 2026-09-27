import { GARANTIAS } from '@/lib/content/garantias'
import styles from './GarantiasStrip.module.css'

interface GarantiasStripProps {
  // 'home' va pegado al hero (sin fondo propio); 'paquetes' va después de las cards.
  variant?: 'home' | 'paquetes'
}

// Franja de 4 garantías verificables. Server component: sin JS.
export default function GarantiasStrip({ variant = 'home' }: GarantiasStripProps) {
  return (
    <section
      aria-label="Garantías de Rallusigence"
      className={`${styles.strip} ${variant === 'paquetes' ? styles.stripPaquetes : ''}`}
    >
      <ul className={styles.list}>
        {GARANTIAS.map((g, i) => (
          <li key={g.id} className={`${styles.item} reveal reveal--delay-${i + 1}`}>
            <img
              src={g.kiwi}
              alt=""
              aria-hidden="true"
              width={44}
              height={44}
              loading="lazy"
              decoding="async"
              className={styles.kiwi}
            />
            <div className={styles.text}>
              <p className={styles.title}>{g.titulo}</p>
              <p className={styles.desc}>{g.texto}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
