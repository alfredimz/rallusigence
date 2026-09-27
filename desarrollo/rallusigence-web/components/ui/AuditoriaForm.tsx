'use client'

import { useRouter } from 'next/navigation'
import FormField from '@/components/ui/FormField'
import { useLeadForm } from '@/lib/useLeadForm'
import { FORMSPREE } from '@/lib/contacto'
import styles from './AuditoriaForm.module.css'

export default function AuditoriaForm() {
  const router = useRouter()

  const { formData, errors, status, handleInputChange, handleSubmit } = useLeadForm({
    endpoint: FORMSPREE.auditoria,
    formType: 'auditoria_landing',
    messageLabel: 'Solicitud de auditoría gratis',
    extraFields: { source: 'auditoría-gratis' },
    onSuccess: () => router.push('/gracias'),
  })

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} noValidate className={styles.form}>
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
          placeholder="55 1234 5678"
          required
          value={formData.whatsapp}
          onChange={handleInputChange}
          error={errors.whatsapp}
        />

        {errors.submit && (
          <div className={styles.errorMessage}>
            {errors.submit}
          </div>
        )}

        <button
          type="submit"
          className="rs-btn rs-btn--primary rs-btn--lg rs-btn--full"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Enviando...' : 'Solicitar mi auditoría gratis'}
        </button>
      </form>
    </div>
  )
}
