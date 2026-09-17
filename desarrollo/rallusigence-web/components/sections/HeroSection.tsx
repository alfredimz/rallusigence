'use client'

import { trackCtaClick, trackWhatsAppClick } from '@/lib/analytics'
import KiwiMascot from '@/components/ui/KiwiMascot'
import HeroShader from '@/components/ui/HeroShader'
import Magnetic from '@/components/ui/Magnetic'
import useIntroDone from '@/components/ui/useIntroDone'
import styles from './HeroSection.module.css'

export default function HeroSection() {
  const introDone = useIntroDone()
  const inClass = (extra = '') => introDone ? `${styles.heroIn} ${extra}` : styles.heroPre
  return (
    <section id="inicio" className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <h1 className={`${styles.h1} ${inClass()}`}>
            Tu negocio en internet en 3 días.
          </h1>

          <p className={`${styles.subtitle} ${inClass(styles.heroIn2)}`}>
            Sitio web profesional hecho con IA. Precio fijo. Tú eres el dueño desde el primer día. Sin mensualidades, sin letra chica.
          </p>

          <div className={`${styles.ctas} ${inClass(styles.heroIn3)}`}>
            <Magnetic>
              <a
                href="/#paquetes"
                className="rs-btn rs-btn--primary rs-btn--lg"
                onClick={() => trackCtaClick('paquetes', 'hero', 'Ver paquetes')}
              >
                Ver paquetes
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="https://wa.me/525626171584"
                className="rs-btn rs-btn--ghost rs-btn--lg"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('hero')}
              >
                Escríbenos por WhatsApp
              </a>
            </Magnetic>
          </div>
        </div>

        <div className={styles.imagePlaceholder}>
          <HeroShader />
          <KiwiMascot className={styles.kiwiLayer} />
        </div>
      </div>
    </section>
  )
}
