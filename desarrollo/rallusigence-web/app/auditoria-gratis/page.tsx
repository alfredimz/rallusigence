import { CheckCircle } from 'lucide-react'
import AuditoriaForm from '@/components/ui/AuditoriaForm'
import styles from './page.module.css'

export default function AuditoriaGratis() {
  return (
    <div className={styles.page}>
      {/* Hero directo */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className="rs-h1">
            Auditoría digital GRATIS para tu negocio
          </h1>
          <p className={styles.subtitle}>
            Revisamos tu web, redes y Google. Detectamos exactamente qué te está costando clientes.
          </p>

          {/* Beneficios */}
          <div className={styles.benefits}>
            <div className={styles.benefit}>
              <CheckCircle
                size={20}
                className={styles.benefitIcon}
                aria-hidden="true"
              />
              <span>5 problemas específicos de tu negocio</span>
            </div>
            <div className={styles.benefit}>
              <CheckCircle
                size={20}
                className={styles.benefitIcon}
                aria-hidden="true"
              />
              <span>Solución paso a paso para cada uno</span>
            </div>
            <div className={styles.benefit}>
              <CheckCircle
                size={20}
                className={styles.benefitIcon}
                aria-hidden="true"
              />
              <span>Presupuesto personalizado sin compromiso</span>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario principal */}
      <section className={styles.formSection}>
        <AuditoriaForm />
      </section>

      {/* Prueba social */}
      <section className={styles.social}>
        <div className={styles.container}>
          <p className={styles.socialText}>
            600+ negocios mexicanos ya mejoraron con nuestra auditoría
          </p>
        </div>
      </section>
    </div>
  )
}