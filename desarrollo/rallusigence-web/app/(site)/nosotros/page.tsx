import Link from 'next/link'
import { nosotros } from '@/lib/content/nosotros'
import WhatsAppCta from '@/components/ui/WhatsAppCta'
import styles from './page.module.css'

const BASE_URL = 'https://rallusigence.net'

export const metadata = {
  title: 'Nosotros — Rallusigence, desde 2015',
  description: 'Agencia mexicana fundada en 2015 (Kiwinet, después Apterynet). 66 negocios atendidos, más de 50 sitios construidos. Hoy con IA supervisada por especialistas, precio fijo y sin mensualidades.',
  alternates: { canonical: `${BASE_URL}/nosotros` },
}

const CrossIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="18" y1="6" x2="6" y2="18" />
  </svg>
)

export default function NosotrosPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
        name: 'Rallusigence',
        url: BASE_URL,
        foundingDate: '2015',
        foundingLocation: { '@type': 'Place', name: 'Ciudad de México, México' },
        description: nosotros.hero.bajada,
        areaServed: { '@type': 'Country', name: 'Mexico' },
      },
      {
        '@type': 'AboutPage',
        '@id': `${BASE_URL}/nosotros`,
        url: `${BASE_URL}/nosotros`,
        name: 'Nosotros — Rallusigence',
        about: { '@id': `${BASE_URL}/#organization` },
        inLanguage: 'es-MX',
      },
    ],
  }

  return (
    <main id="main" className={styles.main}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <nav aria-label="Navegación" className={`section-wrapper ${styles.breadcrumb}`}>
        <Link href="/" className={styles.breadcrumbLink}>Inicio</Link>
        <span className={styles.breadcrumbSeparator} aria-hidden="true">›</span>
        <span className={styles.breadcrumbCurrent}>Nosotros</span>
      </nav>

      {/* Hero editorial */}
      <section className={`section-wrapper ${styles.hero}`} aria-labelledby="hero-title">
        <div className={styles.heroText}>
          <h1 id="hero-title" className={`rs-h1 ${styles.h1}`}>{nosotros.hero.titulo}</h1>
          <p className={styles.heroLead}>{nosotros.hero.bajada}</p>
        </div>
        <img
          src="/assets/kiwis/kiwi-traje.svg"
          alt=""
          aria-hidden="true"
          width={300}
          height={300}
          loading="eager"
          decoding="async"
          className={styles.heroKiwi}
        />
      </section>

      {/* Línea de tiempo */}
      <section className={styles.historia} aria-labelledby="historia-title">
        <div className="section-wrapper">
          <h2 id="historia-title" className="rs-h2 reveal">Tres nombres, la misma forma de trabajar</h2>
          <ol className={styles.timeline}>
            {nosotros.historia.map((h, i) => (
              <li key={h.anio} className={`${styles.hito} reveal reveal--delay-${Math.min(i + 1, 4)}`}>
                <span className={styles.anio}>{h.anio}</span>
                <div className={styles.hitoBody}>
                  <h3 className={styles.hitoTitulo}>{h.titulo}</h3>
                  <p className={styles.hitoTexto}>{h.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Cifras */}
      <section className={styles.cifras} aria-label="Cifras de la agencia">
        <dl className={`section-wrapper section-wrapper--compact ${styles.cifrasRow}`}>
          {nosotros.cifras.map((c, i) => (
            <div key={c.etiqueta} className={`${styles.cifra} reveal reveal--delay-${i + 1}`}>
              <dt className={styles.cifraEtiqueta}>{c.etiqueta}</dt>
              <dd className={styles.cifraValor}>{c.valor}</dd>
              <dd className={styles.cifraFuente}><small>Fuente: {c.fuente}</small></dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Valores + Lo que no somos */}
      <section className={styles.valoresSection} aria-labelledby="valores-title">
        <div className={`section-wrapper ${styles.valoresGrid}`}>
          <div>
            <h2 id="valores-title" className="rs-h2 reveal">Lo que sí somos</h2>
            <ul className={styles.valores}>
              {nosotros.valores.map((v, i) => (
                <li key={v.titulo} className={`${styles.valor} reveal reveal--delay-${(i % 2) + 1}`}>
                  <h3 className={styles.valorTitulo}>{v.titulo}</h3>
                  <p className={styles.valorTexto}>{v.texto}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.noSomos}>
            <h2 className={`rs-h2 ${styles.noSomosTitulo} reveal`}>Lo que no somos</h2>
            <ul className={styles.noLista}>
              {nosotros.loQueNoSomos.map((item, i) => (
                <li key={item} className={`${styles.noItem} reveal reveal--delay-${(i % 3) + 1}`}>
                  <span className={styles.noIcon}><CrossIcon /></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Cómo operamos — callout ámbar */}
      <section className={styles.operamosWrap} aria-labelledby="operamos-title">
        <div className="section-wrapper section-wrapper--compact">
          <div className={`${styles.operamos} reveal`}>
            <p className={styles.operamosLabel}>Cómo operamos — lo decimos de frente</p>
            <h2 id="operamos-title" className={styles.operamosTitulo}>{nosotros.modeloAnonimo.titulo}</h2>
            <p className={styles.operamosTexto}>{nosotros.modeloAnonimo.texto}</p>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className={styles.cta} aria-labelledby="cta-title">
        <div className={`section-wrapper ${styles.ctaInner}`}>
          <div>
            <h2 id="cta-title" className={`rs-h2 ${styles.ctaTitulo} reveal`}>
              ¿Quieres ver cómo se ve un sitio hecho por nosotros?
            </h2>
            <p className={`${styles.ctaTexto} reveal reveal--delay-1`}>
              Mira las demos por giro o pregúntanos directo. Sin junta, sin cotización de dos semanas.
            </p>
          </div>
          <div className={`${styles.ctaActions} reveal reveal--delay-2`}>
            <Link href="/portafolio" className={`rs-btn ${styles.ctaBtnLight}`}>
              Ver portafolio y demos
            </Link>
            <WhatsAppCta
              location="nosotros-cta"
              message="Hola Rallusigence, leí su historia y quiero platicar de mi sitio"
              className={`rs-btn ${styles.ctaBtnGhost}`}
            >
              Escribir por WhatsApp
            </WhatsAppCta>
          </div>
        </div>
      </section>
    </main>
  )
}
