import { Rocket, Briefcase, Zap, ChevronDown, ChevronUp } from 'lucide-react'
import ServiceCard from '@/components/ui/ServiceCard'
import styles from './page.module.css'

export const metadata = {
  title: 'Paquetes de sitio web — Rallusigence',
  description: 'Lanzamiento $6,000 MXN en 3 días · Profesional $12,000 MXN en 7 días · Avanzado $20,000 MXN en 12 días. Precio fijo, sin mensualidades.',
}

export default function PaquetesPage() {
  return (
    <main id="main" className={styles.main}>
      {/* Breadcrumb */}
      <nav aria-label="Navegación" className={`section-wrapper ${styles.breadcrumb}`}>
        <div className={styles.breadcrumbWrapper}>
          <a href="/" className={styles.breadcrumbLink}>Inicio</a>
          <span className={styles.breadcrumbSeparator}>›</span>
          <span className={styles.breadcrumbCurrent}>Paquetes</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section-wrapper reveal" aria-labelledby="hero-title">
        <div className={styles.heroWrapper}>
          <h1 id="hero-title" className="rs-h1 text-center">
            Elige tu paquete. Precio fijo. Sin sorpresas.
          </h1>
          <p className={styles.heroDescription}>
            Cada paquete es tuyo para siempre. Código, hosting y dominio en tus cuentas.
            Sin dependencias, sin mensualidades.
          </p>
        </div>
      </section>

      {/* Packages Grid */}
      <section className={`section-wrapper ${styles.packagesSection}`} aria-labelledby="packages-title">
        <h2 id="packages-title" className="sr-only">Nuestros paquetes</h2>
        <div className={styles.packagesGrid}>
          {/* Lanzamiento */}
          <div className="reveal reveal--delay-1">
            <ServiceCard
              icon={<Rocket size={24} />}
              title="LANZAMIENTO"
              description="Tu presencia digital básica pero profesional. Una página que dice quién eres, qué vendes y cómo contactarte. Optimizada para Google y para celular."
              price="$6,000 MXN"
              delivery="3 días hábiles"
              features={[
                "Landing de 1 página con 5-7 secciones",
                "Diseño mobile-first",
                "Formulario de contacto funcional",
                "SEO básico (título, descripción, H1, velocidad)",
                "Dominio configurado en tu cuenta",
                "Hosting en tu cuenta (Firebase gratuito)",
                "Código fuente completo tuyo"
              ]}
            />
          </div>

          {/* Profesional */}
          <div className="reveal reveal--delay-2">
            <ServiceCard
              icon={<Briefcase size={24} />}
              title="PROFESIONAL"
              description="Sitio completo con múltiples páginas, blog listo para publicar y SEO configurado para aparecer en búsquedas relevantes de tu industria."
              price="$12,000 MXN"
              delivery="7 días hábiles"
              features={[
                "Todo del paquete Lanzamiento",
                "5-7 páginas individuales",
                "Blog listo para publicar artículos",
                "Galería de fotos",
                "Google Maps integrado",
                "Google Analytics configurado",
                "SEO on-page completo en todas las páginas",
                "Guía en PDF de cómo usar tu sitio"
              ]}
              featured
            />
          </div>

          {/* Avanzado */}
          <div className="reveal reveal--delay-3">
            <ServiceCard
              icon={<Zap size={24} />}
              title="AVANZADO"
              description="Sitio completo + tienda online + blog con contenido inicial. Todo listo para generar clientes y ventas desde el primer día."
              price="$20,000 MXN"
              delivery="12 días hábiles"
              features={[
                "Todo del paquete Profesional",
                "Tienda online con carrito de compras",
                "5 artículos de blog escritos con IA",
                "Botón de WhatsApp integrado",
                "Formulario de cotización automático",
                "Optimización avanzada de velocidad",
                "Certificado SSL configurado",
                "Capacitación de 30 minutos"
              ]}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`section-wrapper ${styles.faqSection}`} aria-labelledby="faq-title">
        <div className={styles.faqWrapper}>
          <h2 id="faq-title" className="rs-h2 text-center">
            Preguntas frecuentes
          </h2>
          <div className={styles.faqGrid}>
            <div className={`${styles.faqItem} reveal`}>
              <h3 className={styles.faqQuestion}>
                ¿En qué banco puedo hacer el retiro sin tarjeta?
              </h3>
              <p className={styles.faqAnswer}>
                En cualquier banco que tenga esta función: BBVA, Banorte, HSBC, Santander, Banamex, Scotiabank.
              </p>
            </div>

            <div className={`${styles.faqItem} reveal reveal--delay-1`}>
              <h3 className={styles.faqQuestion}>
                ¿El sitio me pertenece después de la entrega?
              </h3>
              <p className={styles.faqAnswer}>
                Sí, completamente. Código, hosting y dominio quedan en tus cuentas. Sin dependencias.
              </p>
            </div>

            <div className={`${styles.faqItem} reveal reveal--delay-2`}>
              <h3 className={styles.faqQuestion}>
                ¿Cuánto me cuesta mantener el sitio después?
              </h3>
              <p className={styles.faqAnswer}>
                Firebase gratuito cubre la mayoría de sitios pequeños. El dominio cuesta $200-500 MXN/año.
                Se lo pagas directamente a los proveedores, no a nosotros.
              </p>
            </div>

            <div className={`${styles.faqItem} reveal reveal--delay-3`}>
              <h3 className={styles.faqQuestion}>
                ¿Puedo pedir cambios después de la entrega?
              </h3>
              <p className={styles.faqAnswer}>
                Cambios menores los haces tú mismo con la guía. Cambios mayores se cotizan por separado.
              </p>
            </div>

            <div className={`${styles.faqItem} reveal`}>
              <h3 className={styles.faqQuestion}>
                ¿Qué pasa si no quedo satisfecho?
              </h3>
              <p className={styles.faqAnswer}>
                Si el sitio no cumple con lo acordado, lo corregimos sin costo antes de cobrar el 50% restante.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className={`section-wrapper ${styles.ctaSection}`} aria-labelledby="cta-title">
        <div className={styles.ctaWrapper}>
          <h2 id="cta-title" className="rs-h2 text-center" style={{ color: '#fff' }}>
            ¿Cuál es el tuyo?
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