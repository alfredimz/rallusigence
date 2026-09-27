import Link from 'next/link'
import PackagesGrid from '@/components/sections/PackagesGrid'
import GarantiasStrip from '@/components/sections/GarantiasStrip'
import DemosTeaser from '@/components/sections/DemosTeaser'
import FaqList from '@/components/ui/FaqList'
import { FAQS_PAQUETES } from '@/lib/content/faqs'
import { PAQUETES } from '@/lib/content/paquetes'
import { DEMOS, type Demo } from '@/lib/content/demos'
import styles from './page.module.css'

export const metadata = {
  title: 'Paquetes de sitio web — Rallusigence',
  description: 'Lanzamiento $6,000 MXN en 3 días · Profesional $12,000 MXN en 7 días · Avanzado $20,000 MXN en 12 días. Precio fijo, sin mensualidades.',
  alternates: { canonical: 'https://rallusigence.net/paquetes' },
}

// 2 demos por paquete sugerido (Lanzamiento solo tiene una), en orden de precio.
const DEMOS_POR_PAQUETE = ['invitaciones-rsvp', 'academia-baile', 'clinica-veterinaria', 'mariachi-show', 'restaurante-delivery', 'despacho-contable']
  .map((s) => DEMOS.find((d) => d.slug === s))
  .filter((d): d is Demo => Boolean(d))

export default function PaquetesPage() {
  const [lanz, prof, avan] = PAQUETES

  return (
    <main id="main" className={styles.main}>
      {/* Breadcrumb */}
      <nav aria-label="Navegación" className={`section-wrapper ${styles.breadcrumb}`}>
        <div className={styles.breadcrumbWrapper}>
          <Link href="/" className={styles.breadcrumbLink}>Inicio</Link>
          <span className={styles.breadcrumbSeparator} aria-hidden="true">›</span>
          <span className={styles.breadcrumbCurrent}>Paquetes</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="section-wrapper reveal" aria-labelledby="hero-title">
        <div className={styles.heroWrapper}>
          <h1 id="hero-title" className="rs-h1">
            Elige tu paquete. Precio fijo. Sin sorpresas.
          </h1>
          {/* Respuesta directa citable por buscadores e IA (AEO) — 40-60 palabras */}
          <p className={styles.leadAnswer}>
            Rallusigence cobra precio fijo: {lanz.precioTexto} el paquete {lanz.nombre} ({lanz.dias}),
            {' '}{prof.precioTexto.replace(' MXN', '')} el {prof.nombre} ({prof.dias}) y
            {' '}{avan.precioTexto.replace(' MXN', '')} el {avan.nombre} ({avan.dias}). Sin mensualidades:
            hosting, dominio y código quedan en tus cuentas desde el primer día.
          </p>
          <p className={styles.heroDescription}>
            Cada paquete es tuyo para siempre. 50% para arrancar, 50% al entregar.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className={`section-wrapper ${styles.packagesSection}`} aria-labelledby="packages-title">
        <h2 id="packages-title" className="sr-only">Nuestros paquetes</h2>
        <PackagesGrid position="paquetes-page" />
      </section>

      <GarantiasStrip variant="paquetes" />

      {/* Demos por paquete */}
      <DemosTeaser
        id="demos-paquetes"
        titulo="Ejemplos de lo que incluye cada paquete"
        bajada="Cada demo lleva el chip del paquete sugerido según su complejidad: una landing de una pieza es Lanzamiento; catálogo con cotizador, Profesional; catálogos grandes o cotizadores de varias variables, Avanzado."
        demos={DEMOS_POR_PAQUETE}
      />

      {/* FAQ — <FaqList> emite el JSON-LD FAQPage automáticamente */}
      <section className={`section-wrapper ${styles.faqSection}`} aria-labelledby="faq-title">
        <div className={styles.faqWrapper}>
          <h2 id="faq-title" className="rs-h2">
            Preguntas frecuentes
          </h2>
          <FaqList faqs={FAQS_PAQUETES} />
        </div>
      </section>

      {/* CTA Final */}
      <section className={`section-wrapper ${styles.ctaSection}`} aria-labelledby="cta-title">
        <div className={styles.ctaWrapper}>
          <h2 id="cta-title" className={`rs-h2 ${styles.ctaTitle}`}>
            ¿Cuál es el tuyo?
          </h2>
          <p className={styles.ctaText}>
            Si dudas entre dos, escríbenos y te decimos cuál conviene en 2 minutos. Sin junta.
          </p>
          <div className={styles.ctaActions}>
            <Link href="/auditoria-gratis" className={`rs-btn ${styles.ctaBtn}`}>
              Solicitar auditoría gratis
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
