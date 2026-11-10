import Link from 'next/link'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Número 404 decorativo */}
          <div className={styles.numberBg} aria-hidden="true">404</div>
          <img src="/assets/kiwis/kiwi-perfil.svg" alt="" aria-hidden="true" width={150} height={150} className={styles.kiwi} />

          <h1 className="rs-h1">Página no encontrada</h1>

          <p className={styles.description}>
            La página que buscas no existe o fue movida.
          </p>

          <Link href="/" className="rs-btn rs-btn--primary rs-btn--lg">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}