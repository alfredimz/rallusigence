import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import WhatsAppCta from '@/components/ui/WhatsAppCta'
import ConfettiBurst from '@/components/ui/ConfettiBurst'
import styles from './page.module.css'

export default function Gracias() {

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Ícono de confirmación */}
          <span className={styles.iconWrap}>
            <CheckCircle
              size={64}
              className={styles.icon}
              aria-hidden="true"
            />
            <ConfettiBurst />
          </span>

          <h1 className="rs-h1">Solicitud recibida</h1>

          <p className={styles.description}>
            Te contactamos en menos de 24 horas por WhatsApp o email.
          </p>

          {/* CTA principal */}
          <WhatsAppCta
            location="gracias"
            message="Hola Rallusigence, acabo de solicitar mi auditoría gratuita"
            className="rs-btn rs-btn--primary rs-btn--lg"
          >
            Escribir por WhatsApp ahora
          </WhatsAppCta>

          {/* Link secundario */}
          <Link href="/" className={styles.backLink}>
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}