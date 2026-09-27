'use client'

import FormField from '@/components/ui/FormField'
import ConfettiBurst from '@/components/ui/ConfettiBurst'
import { useLeadForm } from '@/lib/useLeadForm'
import { trackWhatsAppClick } from '@/lib/analytics'
import { waLink, FORMSPREE } from '@/lib/contacto'
import styles from './ContactSection.module.css'

export default function ContactSection() {
  const { formData, errors, status, handleInputChange, handleSubmit } = useLeadForm({
    endpoint: FORMSPREE.contacto,
    formType: 'auditoria_home',
    messageLabel: 'Solicitud de paquete',
  })

  return (
    <section id="contacto" aria-labelledby="contacto-title" className={styles.section}>
      <div className="section-wrapper">
        <div className={styles.inner}>
          {/* Texto izquierda */}
          <div className={styles.copy}>
            <h2 id="contacto-title" className="rs-h2 reveal">
              ¿Listo para tener tu sitio esta semana?
            </h2>
            <p className={`${styles.subtitle} reveal reveal--delay-1`}>
              Elige tu paquete, escríbenos, y en 3 días tu negocio ya aparece en Google.
            </p>
            <div className={`${styles.alt} reveal reveal--delay-2`}>
              <p>O contáctanos directo:</p>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="wa-pulse"
                onClick={() => trackWhatsAppClick('contacto')}
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Form card derecha */}
          <div className={styles.formSide}>
            <img
              src="/assets/kiwis/kiwi-cartero.svg"
              alt=""
              aria-hidden="true"
              className={styles.cartero}
              width={80}
              height={80}
              loading="lazy"
            />
          <div className={`form-card reveal reveal--delay-1 ${styles.formCard}`}>
            {status === 'success' ? (
              <div className={`${styles.successMessage} success-pop`}>
                <ConfettiBurst />
                <h3>Solicitud enviada ✓</h3>
                <p>Te contactamos en 24 horas</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className={styles.formGrid}>
                  <FormField
                    label="Nombre completo"
                    name="name"
                    type="text"
                    placeholder="Tu nombre"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    error={errors.name}
                  />

                  <FormField
                    label="Tipo de negocio"
                    name="business"
                    type="text"
                    placeholder="Ej: restaurante, dentista, tienda..."
                    required
                    value={formData.business}
                    onChange={handleInputChange}
                    error={errors.business}
                  />

                  <FormField
                    label="WhatsApp"
                    name="whatsapp"
                    type="tel"
                    placeholder="+52 55 1234 5678"
                    required
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    error={errors.whatsapp}
                  />

                </div>

                {errors.submit && (
                  <div className={styles.errorMessage}>
                    {errors.submit}
                  </div>
                )}

                <button
                  type="submit"
                  className="rs-btn rs-btn--primary rs-btn--full"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Enviando...' : 'Solicitar auditoría gratis'}
                </button>
              </form>
            )}
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}
