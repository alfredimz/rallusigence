import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import styles from './page.module.css'

export default function Gracias() {
  const whatsappMessage = encodeURIComponent(
    'Hola Rallusigence, acabé de solicitar mi auditoría gratuita'
  )

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Ícono de confirmación */}
          <CheckCircle
            size={64}
            className={styles.icon}
            aria-hidden="true"
          />

          <h1 className="rs-h1">Solicitud recibida</h1>

          <p className={styles.description}>
            Te contactamos en menos de 24 horas por WhatsApp o email.
          </p>

          {/* CTA principal */}
          <a
            href={`https://wa.me/52XXXXXXXXXX?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rs-btn rs-btn--primary rs-btn--lg"
          >
            Escribir por WhatsApp ahora
          </a>

          {/* Link secundario */}
          <Link href="/" className={styles.backLink}>
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}