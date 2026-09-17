import { Check } from 'lucide-react'
import { SERVICIOS, getServicio } from '@/lib/servicios'
import WhatsAppCta from '@/components/ui/WhatsAppCta'
import styles from './page.module.css'

export function generateStaticParams() {
  return SERVICIOS.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const s = getServicio(slug)
  if (!s) return { title: 'Servicio no encontrado — Rallusigence' }
  return {
    title: `${s.nombre} — Rallusigence`,
    description: `${s.bajada} ${s.precio}.`,
    alternates: { canonical: `https://rallusigence.net/servicios/${s.slug}` },
    openGraph: {
      title: `${s.nombre} — Rallusigence`,
      description: s.bajada,
      url: `https://rallusigence.net/servicios/${s.slug}`,
      siteName: 'Rallusigence',
      locale: 'es_MX',
      type: 'website',
    },
  }
}

export default async function ServicioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const s = getServicio(slug)
  if (!s) return null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: s.nombre,
        description: s.bajada,
        provider: { '@type': 'ProfessionalService', name: 'Rallusigence', url: 'https://rallusigence.net' },
        areaServed: { '@type': 'Country', name: 'Mexico' },
        url: `https://rallusigence.net/servicios/${s.slug}`,
      },
      {
        '@type': 'FAQPage',
        mainEntity: s.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }

  return (
    <main id="main" className={styles.main}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero del servicio */}
      <section className={styles.hero}>
        <div className="section-wrapper">
          <div className={styles.heroInner}>
            <img src={s.kiwi} alt="" aria-hidden="true" className={styles.kiwi} width={130} height={130} />
            <p className={styles.crumb}>
              <a href="/servicios">Servicios</a> › {s.nombre}
            </p>
            <h1 className="rs-h1">{s.titulo}</h1>
            <p className={styles.bajada}>{s.bajada}</p>
            <div className={styles.precioRow}>
              <span className="price-tag">{s.precio}</span>
              <span className={styles.precioNota}>{s.precioNota}</span>
            </div>
            <div className={styles.ctas}>
              <WhatsAppCta location={`servicio-${s.slug}`} message={s.ctaMsg} className="rs-btn rs-btn--primary rs-btn--lg">
                Cotizar por WhatsApp
              </WhatsAppCta>
              <a href="/auditoria-gratis" className="rs-btn rs-btn--ghost rs-btn--lg">
                Auditoría gratis primero
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Qué es */}
      <section className={styles.queEs}>
        <div className="section-wrapper section-wrapper--compact">
          {s.queEs.map((p, i) => (
            <p key={i} className={`${styles.parrafo} reveal reveal--delay-${Math.min(i + 1, 3)}`}>{p}</p>
          ))}
        </div>
      </section>

      {/* Qué incluye */}
      <section className={styles.incluye}>
        <div className="section-wrapper">
          <h2 className="rs-h2 reveal">Qué incluye</h2>
          <ul className={styles.checklist}>
            {s.incluye.map((item, i) => (
              <li key={i} className={`reveal reveal--delay-${(i % 3) + 1}`}>
                <Check size={18} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Ventajas */}
      <section className={styles.ventajas}>
        <div className="section-wrapper">
          <h2 className="rs-h2 reveal">Costos, tiempo y resultados</h2>
          <div className={styles.ventajasGrid}>
            <div className={`${styles.ventaja} reveal reveal--blur reveal--delay-1`}>
              <h3>💰 Costos</h3>
              <p>{s.ventajas.costos}</p>
            </div>
            <div className={`${styles.ventaja} reveal reveal--blur reveal--delay-2`}>
              <h3>⏱ Tiempo</h3>
              <p>{s.ventajas.tiempo}</p>
            </div>
            <div className={`${styles.ventaja} reveal reveal--blur reveal--delay-3`}>
              <h3>📈 Resultados</h3>
              <p>{s.ventajas.resultados}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Importante — honestidad, marca de la casa */}
      <section className={styles.importanteWrap}>
        <div className="section-wrapper section-wrapper--compact">
          <div className={`${styles.importante} reveal`}>
            <p className={styles.importanteLabel}>Importante — lo decimos de frente</p>
            <p>{s.importante}</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faq}>
        <div className="section-wrapper">
          <h2 className="rs-h2 reveal">Preguntas frecuentes</h2>
          <div className={styles.faqList}>
            {s.faq.map((f, i) => (
              <details key={i} className={`${styles.faqItem} reveal reveal--delay-${(i % 3) + 1}`}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className={styles.final}>
        <div className="section-wrapper section-wrapper--compact">
          <div className={styles.finalInner}>
            <h2 className="rs-h2 reveal">¿Hablamos de tu caso?</h2>
            <p className={`${styles.finalTexto} reveal reveal--delay-1`}>
              Cuéntanos qué necesitas por WhatsApp. Te respondemos en menos de 2 horas con una propuesta clara.
            </p>
            <div className={`${styles.ctas} reveal reveal--delay-2`}>
              <WhatsAppCta location={`servicio-${s.slug}-final`} message={s.ctaMsg} className="rs-btn rs-btn--primary rs-btn--lg wa-pulse">
                Escribir por WhatsApp
              </WhatsAppCta>
            </div>
            <p className={styles.otros}>
              O mira los otros servicios:{' '}
              {SERVICIOS.filter((o) => o.slug !== s.slug).map((o, i, arr) => (
                <span key={o.slug}>
                  <a href={`/servicios/${o.slug}`}>{o.nombre}</a>
                  {i < arr.length - 1 ? ' · ' : ''}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
