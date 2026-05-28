import { Stethoscope, UtensilsCrossed } from 'lucide-react'
import styles from './page.module.css'

export const metadata = {
  title: 'Portafolio — Rallusigence',
  description: 'Sitios web entregados a PYMEs mexicanas. Cada proyecto queda 100% en manos del cliente.',
}

export default function PortafolioPage() {
  return (
    <main id="main" className={styles.main}>
      {/* Breadcrumb */}
      <nav aria-label="Navegación" className={`section-wrapper ${styles.breadcrumb}`}>
        <div className={styles.breadcrumbWrapper}>
          <a href="/" className={styles.breadcrumbLink}>Inicio</a>
          <span className={styles.breadcrumbSeparator}>›</span>
          <span className={styles.breadcrumbCurrent}>Portafolio</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section-wrapper reveal" aria-labelledby="hero-title">
        <div className={styles.heroWrapper}>
          <h1 id="hero-title" className="rs-h1 text-center">
            Trabajos realizados
          </h1>
          <p className={styles.heroDescription}>
            Cada sitio entregado es tuyo para siempre. Código, dominio y hosting en tus cuentas.
          </p>
        </div>
      </section>

      {/* Cases Section */}
      <section className={`section-wrapper ${styles.casesSection}`} aria-labelledby="cases-title">
        <h2 id="cases-title" className="sr-only">Casos de éxito</h2>
        <div className={styles.casesGrid}>
          {/* Dr. Roberto */}
          <div className={`${styles.caseCard} reveal`}>
            <div className={styles.caseImagePlaceholder}>
              <Stethoscope size={48} color="var(--rs-primary)" />
            </div>
            <div className={styles.caseContent}>
              <div className={styles.caseHeader}>
                <h3 className={styles.caseTitle}>Dr. Roberto</h3>
                <div className={styles.caseType}>Consultorio dental</div>
                <div className={styles.caseLocation}>León, Guanajuato</div>
              </div>

              <div className={styles.caseDetails}>
                <div className={styles.caseDetail}>
                  <span className={styles.caseDetailLabel}>Paquete:</span>
                  <span className={styles.caseDetailValue}>Profesional</span>
                </div>
                <div className={styles.caseDetail}>
                  <span className={styles.caseDetailLabel}>Tiempo:</span>
                  <span className={styles.caseDetailValue}>7 días</span>
                </div>
              </div>

              <div className={styles.caseResult}>
                <div className={styles.caseResultNumber}>40%</div>
                <div className={styles.caseResultText}>más pacientes nuevos en 2 meses</div>
              </div>

              <p className={styles.caseDescription}>
                Sitio con agenda online, galería del consultorio y SEO local optimizado para búsquedas de 'dentista en León'.
              </p>
            </div>
          </div>

          {/* María Elena */}
          <div className={`${styles.caseCard} reveal reveal--delay-1`}>
            <div className={styles.caseImagePlaceholder}>
              <UtensilsCrossed size={48} color="var(--rs-primary)" />
            </div>
            <div className={styles.caseContent}>
              <div className={styles.caseHeader}>
                <h3 className={styles.caseTitle}>María Elena</h3>
                <div className={styles.caseType}>Restaurante familiar</div>
                <div className={styles.caseLocation}>Mérida, Yucatán</div>
              </div>

              <div className={styles.caseDetails}>
                <div className={styles.caseDetail}>
                  <span className={styles.caseDetailLabel}>Paquete:</span>
                  <span className={styles.caseDetailValue}>Avanzado</span>
                </div>
                <div className={styles.caseDetail}>
                  <span className={styles.caseDetailLabel}>Tiempo:</span>
                  <span className={styles.caseDetailValue}>12 días</span>
                </div>
              </div>

              <div className={styles.caseResult}>
                <div className={styles.caseResultNumber}>60%</div>
                <div className={styles.caseResultText}>más ventas por delivery ese mismo mes</div>
              </div>

              <p className={styles.caseDescription}>
                Sitio con menú digital, integración con WhatsApp y optimización para pedidos a domicilio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Honest Note */}
      <section className={`section-wrapper ${styles.noteSection}`} aria-labelledby="note-title">
        <div className={styles.noteWrapper}>
          <div className={styles.noteCard}>
            <h3 id="note-title" className={styles.noteTitle}>
              ¿Quieres ver más ejemplos?
            </h3>
            <p className={styles.noteText}>
              Estamos construyendo nuestro portafolio con los primeros clientes. Contáctanos y te mostramos casos relevantes para tu industria.
            </p>
            <div className={styles.noteActions}>
              <a href="/#contacto" className="rs-btn rs-btn--primary">
                Quiero mi sitio
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}