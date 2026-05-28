'use client'

import Image from 'next/image'
import { trackCtaClick, trackWhatsAppClick } from '@/lib/analytics'
import styles from './HeroSection.module.css'

export default function HeroSection() {
  return (
    <section id="inicio" className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <h1 className={`${styles.h1} reveal`}>
            Tu negocio en internet en 3 días.
          </h1>

          <p className={`${styles.subtitle} reveal reveal--delay-1`}>
            Sitio web profesional hecho con IA. Precio fijo. Tú eres el dueño desde el primer día. Sin mensualidades, sin letra chica.
          </p>

          <div className={`${styles.ctas} reveal reveal--delay-2`}>
            <a
              href="/#paquetes"
              className="rs-btn rs-btn--primary rs-btn--lg"
              onClick={() => trackCtaClick('paquetes', 'hero', 'Ver paquetes')}
            >
              Ver paquetes
            </a>
            <a
              href="https://wa.me/52XXXXXXXXXX"
              className="rs-btn rs-btn--ghost rs-btn--lg"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('hero')}
            >
              Escríbenos por WhatsApp
            </a>
          </div>
        </div>

        <div className={styles.imagePlaceholder}>
          <Image
            src="/assets/kiwi-icon.svg"
            alt="Rallusigence - Tu sitio web en 3 días"
            width={120}
            height={120}
            priority
          />
        </div>
      </div>
    </section>
  )
}