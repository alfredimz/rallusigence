import { SERVICIOS } from '@/lib/servicios'
import styles from './page.module.css'

export const metadata = {
  title: 'Servicios — Rallusigence',
  description: 'Sitios web en 3 días, SEO, agentes de WhatsApp con IA, tiendas online, anuncios y automatización. Precios claros, todo queda en tus cuentas.',
  alternates: { canonical: 'https://rallusigence.net/servicios' },
  openGraph: {
    title: 'Servicios — Rallusigence',
    description: 'Todo lo que tu negocio necesita para vender en internet, hecho con IA supervisada por especialistas.',
    url: 'https://rallusigence.net/servicios',
    siteName: 'Rallusigence',
    locale: 'es_MX',
    type: 'website',
  },
}

export default function ServiciosPage() {
  return (
    <main id="main" className={styles.main}>
      <section className={styles.hero}>
        <div className="section-wrapper section-wrapper--compact">
          <div className={styles.heroInner}>
            <h1 className="rs-h1">Servicios</h1>
            <p className={styles.bajada}>
              Todo lo que tu negocio necesita para vender en internet — hecho con IA, supervisado
              por especialistas, y siempre con la misma regla: <strong>lo que construimos queda en tus cuentas.</strong>
            </p>
          </div>
        </div>
      </section>

      <section className={styles.gridSection}>
        <div className="section-wrapper">
          <div className={styles.grid}>
            {SERVICIOS.map((s, i) => (
              <a
                key={s.slug}
                href={`/servicios/${s.slug}`}
                className={`${styles.card} reveal reveal--blur reveal--delay-${(i % 3) + 1}`}
              >
                <img src={s.kiwi} alt="" aria-hidden="true" className={styles.kiwi} width={88} height={88} loading={i > 2 ? 'lazy' : undefined} />
                <h2 className={styles.nombre}>{s.nombre}</h2>
                <p className={styles.desc}>{s.bajada}</p>
                <div className={styles.footer}>
                  <span className="price-tag">{s.precio}</span>
                  <span className={styles.ver}>Ver servicio →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
