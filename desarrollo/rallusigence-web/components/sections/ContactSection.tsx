'use client'

import { useState } from 'react'
import FormField from '@/components/ui/FormField'
import { trackFormSubmit, trackFormError, trackWhatsAppClick } from '@/lib/analytics'
import styles from './ContactSection.module.css'

interface FormData {
  name: string
  business: string
  whatsapp: string
  email: string
}

interface FormErrors {
  name?: string
  business?: string
  whatsapp?: string
  email?: string
  submit?: string
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    business: '',
    whatsapp: '',
    email: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {}

    // Nombre mínimo 2 caracteres
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres'
    }

    // Tipo de negocio mínimo 2 caracteres
    if (!formData.business.trim() || formData.business.trim().length < 2) {
      newErrors.business = 'Describe tu tipo de negocio'
    }

    // WhatsApp 10 dígitos mexicanos
    const whatsappDigits = formData.whatsapp.replace(/\D/g, '')
    if (!whatsappDigits || whatsappDigits.length !== 10) {
      newErrors.whatsapp = 'Ingresa un número de WhatsApp de 10 dígitos'
    }

    // Email regex estándar
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Ingresa un email válido'
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      // Track error del primer campo con error
      const firstErrorField = Object.keys(formErrors)[0]
      if (firstErrorField !== 'submit') {
        trackFormError(firstErrorField)
      }
      return
    }

    setErrors({})
    setStatus('loading')

    try {
      const response = await fetch('https://formspree.io/f/XXXXXXXX', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          business: formData.business.trim(),
          whatsapp: formData.whatsapp.trim(),
          email: formData.email.trim(),
          message: `Solicitud de paquete desde ${window.location.hostname}`
        })
      })

      if (response.ok) {
        setStatus('success')
        // Track form submission
        trackFormSubmit('auditoria_home')
        // Limpiar formulario
        setFormData({ name: '', business: '', whatsapp: '', email: '' })
      } else {
        setStatus('error')
        setErrors({ submit: 'Error al enviar — intenta de nuevo' })
      }
    } catch (error) {
      setStatus('error')
      setErrors({ submit: 'Error al enviar — intenta de nuevo' })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Limpiar error del campo al empezar a escribir
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

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
                href="https://wa.me/52XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('contacto')}
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Form card derecha */}
          <div className={`form-card reveal reveal--delay-1 ${styles.formCard}`}>
            {status === 'success' ? (
              <div className={styles.successMessage}>
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

                  <FormField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
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
    </section>
  )
}