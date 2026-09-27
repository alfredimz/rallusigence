'use client'

import { useState } from 'react'
import { trackFormSubmit, trackFormError } from '@/lib/analytics'

export interface LeadFormData {
  name: string
  business: string
  whatsapp: string
}

export interface LeadFormErrors {
  name?: string
  business?: string
  whatsapp?: string
  submit?: string
}

export type LeadFormStatus = 'idle' | 'loading' | 'success' | 'error'

interface UseLeadFormOptions {
  /** Slug de Formspree (sin dominio, ej. 'xkjwqlbg') */
  endpoint: string
  /** Identificador de tracking para trackFormSubmit (ej. 'auditoria_home') */
  formType: string
  /** Prefijo del mensaje enviado a Formspree (ej. 'Solicitud de paquete') */
  messageLabel?: string
  /** Campos extra a incluir en el body de Formspree (ej. { source: 'auditoría-gratis' }) */
  extraFields?: Record<string, string>
  /** Se ejecuta después de un envío exitoso (ej. redirect a /gracias) */
  onSuccess?: () => void
}

// Hook que unifica la lógica duplicada de ContactSection y AuditoriaForm:
// validación, tracking y envío a Formspree. Comportamiento idéntico al
// que tenían ambos formularios antes de unificarse.
export function useLeadForm({ endpoint, formType, messageLabel = 'Solicitud', extraFields, onSuccess }: UseLeadFormOptions) {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    business: '',
    whatsapp: '',
  })
  const [errors, setErrors] = useState<LeadFormErrors>({})
  const [status, setStatus] = useState<LeadFormStatus>('idle')

  const validateForm = (): LeadFormErrors => {
    const newErrors: LeadFormErrors = {}

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

    return newErrors
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpiar error del campo al empezar a escribir
    if (errors[name as keyof LeadFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
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
      const response = await fetch(`https://formspree.io/f/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          business: formData.business.trim(),
          whatsapp: formData.whatsapp.trim(),
          message: `${messageLabel} desde ${window.location.hostname}${window.location.pathname}`,
          ...extraFields,
        }),
      })

      if (response.ok) {
        setStatus('success')
        trackFormSubmit(formType)
        setFormData({ name: '', business: '', whatsapp: '' })
        onSuccess?.()
      } else {
        setStatus('error')
        setErrors({ submit: 'Error al enviar — intenta de nuevo' })
      }
    } catch {
      setStatus('error')
      setErrors({ submit: 'Error al enviar — intenta de nuevo' })
    }
  }

  return { formData, errors, status, handleInputChange, handleSubmit }
}
