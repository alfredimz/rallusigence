import Link from 'next/link'
import { DEMOS } from '@/lib/content/demos'
import { CASOS } from '@/lib/content/casos'
import { TESTIMONIOS } from '@/lib/content/testimonios'
import DemoGrid from '@/components/ui/DemoGrid'
import TestimonialCard from '@/components/ui/TestimonialCard'
import WhatsAppCta from '@/components/ui/WhatsAppCta'
import styles from './page.module.css'

const BASE_URL = 'https://rallusigence.net'

export const metadata = {
  title: 'Portafolio y demos por giro — Rallusigence',
  description: '18 demos de sitios web por giro (restaurante, veterinaria, contadores, abogados, grúas y más) y la trayectoria de la agencia desde 2015 con negocios mexicanos reales.',
  alternates: { canonical: `${BASE_URL}/portafolio` },
}

// Trayectoria: primero el caso vigente (Creativos Espacios), después el resto.
const casosOrdenados = [...CASOS].sort((a, b) => Number(b.enLinea) - Number(a.enLinea))

// 2 testimonios ligados a un caso del portafolio.
const testimoniosCaso = ['sergio-liquen', 'pio-solfog']
  .map((id) => TESTIMONIOS.find((t) => t.id === id))
  .filter((t): t is NonNullable<typeof t> => Boolean(t))

export default function PortafolioPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Demos de sitios web por giro — Rallusigence',
    numberOfItems: DEMOS.length,
    itemListElement: DEMOS.map((d, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${d.nombre} — ${d.giro}`,
      url: `${BASE_URL}/portafolio#demo-${d.slug}`,
    })),
  }

  return (
    <main id="main" className={styles.main}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <nav aria-label="Navegación" className={`section-wrapper ${styles.breadcrumb}`}>
        <Link href="/" className={styles.breadcrumbLink}>Inicio</Link>
        <span className={styles.breadcrumbSeparator} aria-hidden="true">›</span>
        <span className={styles.breadcrumbCurrent}>Portafolio</span>
      </nav>

      {/* Hero editorial, alineado a la izquierda */}
      <section className={`section-wrapper ${styles.hero}`} aria-labelledby="hero-title">
        <div className={styles.heroText}>
          <h1 id="hero-title" className={`rs-h1 ${styles.h1}`}>
            Así se ve lo que entregamos
          </h1>
          <p className={styles.heroLead}>
            Abajo hay {DEMOS.length} demos construidas por nosotros, una por giro, con las funciones que
            un negocio de ese tipo necesita de verdad. Más abajo, los sitios que hicimos entre 2016 y 2024
            para negocios reales. Nada de aquí es un mockup de banco de imágenes.
          </p>
        </div>
        <img
          src="/assets/kiwis/kiwi-pintor.svg"
          alt=""
          aria-hidden="true"
          width={180}
          height={180}
          loading="eager"
          decoding="async"
          className={styles.heroKiwi}
        />
      </section>

      {/* Demos por giro */}
      <section id="demos" className={styles.demosSection} aria-labelledby="demos-title">
        <div className="section-wrapper">
          <div className={styles.sectionHead}>
            <h2 id="demos-title" className="rs-h2">Demos por giro</h2>
            <p className={styles.sectionLead}>
              Cada demo es un sitio funcional: cotizadores, agendas, menús y formularios ya resueltos.
              Cuando contratas, tomamos la de tu giro y la adaptamos a tu marca, tus precios y tus fotos.
              Pasa el cursor sobre una para ver cómo se ve en celular.
            </p>
          </div>
          <DemoGrid demos={DEMOS} />
        </div>
      </section>

      {/* Trayectoria */}
      <section id="trayectoria" className={styles.casosSection} aria-labelledby="casos-title">
        <div className="section-wrapper">
          <div className={styles.sectionHead}>
            <h2 id="casos-title" className="rs-h2 reveal">Trayectoria desde 2015</h2>
            <p className={`${styles.sectionLead} reveal reveal--delay-1`}>
              Sitios construidos entre 2016 y 2024 con la tecnología de cada época, cuando la agencia se
              llamaba Kiwinet y después Apterynet. Hoy los haríamos con IA en 3 días, pero los mostramos
              tal como se entregaron: son la prueba de que llevamos años haciendo esto.
            </p>
          </div>

          <ul className={styles.mosaico}>
            {casosOrdenados.map((c, i) => (
              <li
                key={c.slug}
                id={`caso-${c.slug}`}
                className={`${styles.caso} ${i === 0 ? styles.casoGrande : ''} reveal reveal--delay-${(i % 3) + 1}`}
              >
                <div className={styles.casoMedia}>
                  <img
                    src={c.imagen}
                    alt={`Captura del sitio de ${c.nombre}`}
                    width={1440}
                    height={900}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className={styles.casoBody}>
                  <p className={styles.casoGiro}>
                    {c.giro}
                    {c.anio ? ` · ${c.anio}` : ''}
                  </p>
                  <h3 className={styles.casoNombre}>{c.nombre}</h3>
                  {i === 0 && <p className={styles.casoResumen}>{c.resumen}</p>}
                  <ul className={styles.logros}>
                    {c.logros.slice(0, i === 0 ? 3 : 2).map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                  {c.enLinea && c.url && (
                    <a
                      href={`https://${c.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.casoLink}
                    >
                      Ver sitio en línea
                      <span className="sr-only"> (abre en una pestaña nueva)</span>
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonios ligados + CTA */}
      <section className={styles.cierre} aria-labelledby="cierre-title">
        <div className="section-wrapper">
          <div className={styles.cierreGrid}>
            <div className={styles.cierreText}>
              <h2 id="cierre-title" className="rs-h2 reveal">
                El siguiente sitio de esta página puede ser el tuyo
              </h2>
              <p className={`${styles.sectionLead} reveal reveal--delay-1`}>
                Elige un paquete con precio publicado o escríbenos con la demo que más se parece a tu
                negocio. Respondemos el mismo día.
              </p>
              <div className={`${styles.cierreActions} reveal reveal--delay-2`}>
                <Link href="/paquetes" className="rs-btn rs-btn--primary">
                  Ver paquetes y precios
                </Link>
                <WhatsAppCta
                  location="portafolio-cierre"
                  message="Hola, vi el portafolio de Rallusigence y quiero un sitio para mi negocio"
                  className="rs-btn rs-btn--ghost"
                >
                  Escribir por WhatsApp
                </WhatsAppCta>
              </div>
            </div>
            <div className={styles.cierreTestimonios}>
              {testimoniosCaso.map((t, i) => (
                <div key={t.id} className={`reveal reveal--blur reveal--delay-${i + 1}`}>
                  <TestimonialCard t={t} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
