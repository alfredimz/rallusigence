'use client'

import Link from 'next/link'
import { trackCtaClick, trackWhatsAppClick } from '@/lib/analytics'
import { waLink } from '@/lib/contacto'
import KiwiMascot from '@/components/ui/KiwiMascot'
import Magnetic from '@/components/ui/Magnetic'
import { useEffect, useState } from 'react'
import { preload } from 'react-dom'
import useIntroDone from '@/components/ui/useIntroDone'
import { nosotros } from '@/lib/content/nosotros'
import { DEMOS } from '@/lib/content/demos'
import styles from './HeroSection.module.css'

const NEGOCIOS = nosotros.cifras.find((c) => c.etiqueta.startsWith('negocios'))?.valor ?? '66'
const FUNDACION = nosotros.cifras.find((c) => c.etiqueta.startsWith('año de fundación'))?.valor ?? '2015'

// Demo real que se muestra en el "escenario" del hero (Sprint B: mockups reales en vez de orbes + shader).
const DEMO_HERO = DEMOS.find((d) => d.slug === 'restaurante-delivery') ?? DEMOS[0]
// Versiones ligeras generadas con sharp para el escenario (el LCP es esta imagen): 880 px desktop, 560 px móvil, 220 px teléfono
const HERO_SHOT = '/portafolio/demos/restaurante-delivery-hero.webp'
const HERO_SHOT_SM = '/portafolio/demos/restaurante-delivery-hero-sm.webp'
const HERO_PHONE = '/portafolio/demos/restaurante-delivery-hero-phone.webp'

export default function HeroSection() {
  preload(HERO_SHOT, { as: 'image', fetchPriority: 'high', imageSrcSet: `${HERO_SHOT_SM} 560w, ${HERO_SHOT} 880w`, imageSizes: '(max-width: 767px) 82vw, 40vw' })
  const introDone = useIntroDone()
  // El hero se pinta visible desde el HTML (LCP). Solo anima su entrada si el intro realmente se mostró.
  const [animate, setAnimate] = useState(false)
  useEffect(() => {
    if (introDone && document.documentElement.dataset.rsIntroShown === '1') setAnimate(true)
  }, [introDone])
  const inClass = (extra = '') => animate ? `${styles.heroIn} ${extra}` : ''
  return (
    <section id="inicio" className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={`${styles.eyebrow} ${inClass()}`}>
            Sitios web para negocios mexicanos <span aria-hidden="true">·</span> desde {FUNDACION}
          </p>
          <h1 className={`rs-display ${styles.h1} ${inClass()}`}>
            Tu negocio en internet en <em>3 días</em>.
          </h1>

          <p className={`${styles.subtitle} ${inClass(styles.heroIn2)}`}>
            Sitio web profesional hecho con IA. Precio fijo. Tú eres el dueño desde el primer día. Sin mensualidades, sin letra chica.
          </p>

          <div className={`${styles.ctas} ${inClass(styles.heroIn3)}`}>
            <Magnetic>
              <Link
                href="/#paquetes"
                className="rs-btn rs-btn--primary rs-btn--lg"
                onClick={() => trackCtaClick('paquetes', 'hero', 'Ver paquetes')}
              >
                Ver paquetes
              </Link>
            </Magnetic>
            <Magnetic>
              <a
                href={waLink()}
                className="rs-btn rs-btn--ghost rs-btn--lg"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('hero')}
              >
                Escríbenos por WhatsApp
              </a>
            </Magnetic>
          </div>

          <p className={`${styles.proof} ${inClass(styles.heroIn4)}`}>
            {NEGOCIOS} negocios atendidos <span aria-hidden="true">·</span> el sitio queda en tus cuentas <span aria-hidden="true">·</span> 3 paquetes con precio publicado
          </p>
        </div>

        {/* Escenario: demo real en laptop + teléfono, con el kiwi aterrizando encima */}
        <div className={styles.stage} aria-hidden="true">
          <div className={styles.laptop}>
            <div className={styles.laptopScreen}>
              <img
                src={HERO_SHOT}
                srcSet={`${HERO_SHOT_SM} 560w, ${HERO_SHOT} 880w`}
                sizes="(max-width: 767px) 82vw, 40vw"
                alt=""
                width={880}
                height={550}
                className={styles.shot}
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <div className={styles.laptopBase} />
          </div>
          <div className={styles.phone}>
            <img
              src={HERO_PHONE}
              alt=""
              width={220}
              height={476}
              className={styles.shotPhone}
              loading="lazy"
              decoding="async"
            />
          </div>
          <KiwiMascot className={styles.kiwiLayer} />
          <p className={styles.stageCaption}>
            Demo real: <strong>{DEMO_HERO.nombre}</strong> · {DEMO_HERO.giro}
          </p>
        </div>
      </div>
    </section>
  )
}
