import styles from './page.module.css'

export const metadata = {
  title: 'Cómo funciona — Rallusigence',
  description: 'De cero a tu sitio en línea en 3 días. Sin reuniones, sin esperas. Proceso claro y modelo de pago transparente.',
}

export default function ComoFuncionaPage() {
  const bancos = [
    'BBVA',
    'Banorte',
    'HSBC',
    'Santander',
    'Banamex',
    'Scotiabank'
  ]

  return (
    <main id="main" className={styles.main}>
      {/* Breadcrumb */}
      <nav aria-label="Navegación" className={`section-wrapper ${styles.breadcrumb}`}>
        <div className={styles.breadcrumbWrapper}>
          <a href="/" className={styles.breadcrumbLink}>Inicio</a>
          <span className={styles.breadcrumbSeparator}>›</span>
          <span className={styles.breadcrumbCurrent}>Cómo funciona</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section-wrapper reveal" aria-labelledby="hero-title">
        <div className={styles.heroWrapper}>
          <h1 id="hero-title" className="rs-h1 text-center">
            De cero a tu sitio en línea. Sin reuniones, sin esperas.
          </h1>
          <p className={styles.heroDescription}>
            Un proceso claro y transparente. Sin sorpresas, sin letra chica.
          </p>
        </div>
      </section>

      {/* Proceso Section */}
      <section className={`section-wrapper ${styles.processSection}`} aria-labelledby="process-title">
        <div className={styles.processWrapper}>
          <h2 id="process-title" className="rs-h2 text-center">
            Así trabajamos
          </h2>
          <div className={styles.processSteps}>
            <div className={`step-item reveal`}>
              <div className="step-item__number">1</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Escríbenos</h3>
                <p className={styles.stepDescription}>
                  Mándanos un mensaje por WhatsApp o llena el formulario. Cuéntanos de tu negocio
                  y el paquete que quieres. Te respondemos en menos de 2 horas.
                </p>
                <div className={styles.stepTime}>
                  📱 Menos de 2 horas
                </div>
              </div>
            </div>

            <div className={`step-item reveal reveal--delay-1`}>
              <div className="step-item__number">2</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Pagas el 50%</h3>
                <p className={styles.stepDescription}>
                  Generás un código de retiro desde tu app bancaria por el 50% del paquete.
                  Nos lo compartís. En ese momento arrancamos.
                </p>
                <div className={styles.stepTime}>
                  💳 Inmediato
                </div>
              </div>
            </div>

            <div className={`step-item reveal reveal--delay-2`}>
              <div className="step-item__number">3</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Construimos en días</h3>
                <p className={styles.stepDescription}>
                  Con IA y experiencia, construimos tu sitio mientras tú sigues atendiendo tu negocio.
                  Te mandamos avances para que lo veas.
                </p>
                <div className={styles.stepTime}>
                  ⚙️ 3-12 días según el paquete
                </div>
              </div>
            </div>

            <div className={`step-item reveal reveal--delay-3`}>
              <div className="step-item__number">4</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Te entregamos todo</h3>
                <p className={styles.stepDescription}>
                  El sitio va a tu hosting, tu dominio queda en tus cuentas, recibes el código completo.
                  Pagas el 50% restante. El sitio es tuyo para siempre.
                </p>
                <div className={styles.stepTime}>
                  🚀 Desde el primer día
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modelo de Pago Section */}
      <section className={`section-wrapper ${styles.paymentSection}`} aria-labelledby="payment-title">
        <div className={styles.paymentWrapper}>
          <h2 id="payment-title" className="rs-h2 text-center">
            Transparencia total en cómo cobramos
          </h2>

          <div className={styles.paymentExplanation}>
            <p className={styles.paymentIntro}>
              Manejamos pagos por <strong>retiro sin tarjeta en cajero automático</strong>.
            </p>
            <p className={styles.paymentReason}>
              Somos un equipo de profesionistas independientes. Al trabajar fuera de la estructura
              corporativa tradicional, no emitimos tickets ni facturas — esto nos permite evitar
              cargas fiscales y operativas que tendríamos que trasladarte en el precio.
            </p>
          </div>

          <div className={styles.paymentSteps}>
            <h3 className={styles.paymentStepsTitle}>Cómo funciona:</h3>
            <div className={styles.paymentStepsList}>
              <div className={`${styles.paymentStep} reveal`}>
                <div className={styles.paymentStepNumber}>1</div>
                <p>Acordamos el paquete y el precio</p>
              </div>
              <div className={`${styles.paymentStep} reveal reveal--delay-1`}>
                <div className={styles.paymentStepNumber}>2</div>
                <p>Generás un código de retiro desde tu app bancaria (BBVA, Banorte, HSBC, Santander, etc.)</p>
              </div>
              <div className={`${styles.paymentStep} reveal reveal--delay-2`}>
                <div className={styles.paymentStepNumber}>3</div>
                <p>Nos compartís los dígitos</p>
              </div>
              <div className={`${styles.paymentStep} reveal reveal--delay-3`}>
                <div className={styles.paymentStepNumber}>4</div>
                <p>Retiramos en cajero y comenzamos al instante</p>
              </div>
            </div>
          </div>

          <div className={styles.banksList}>
            <h4 className={styles.banksTitle}>Bancos compatibles:</h4>
            <div className={styles.banksGrid}>
              {bancos.map((banco, index) => (
                <div key={banco} className={`${styles.bankItem} reveal`} style={{ animationDelay: `${index * 100}ms` }}>
                  {banco}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className={`section-wrapper ${styles.ctaSection}`} aria-labelledby="cta-title">
        <div className={styles.ctaWrapper}>
          <h2 id="cta-title" className="rs-h2 text-center" style={{ color: '#fff' }}>
            ¿Listo para empezar?
          </h2>
          <div className={styles.ctaActions}>
            <a href="/#contacto" className="rs-btn rs-btn--ghost" style={{ backgroundColor: '#fff', color: 'var(--rs-primary)', borderColor: '#fff' }}>
              Solicitar auditoría gratis
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}