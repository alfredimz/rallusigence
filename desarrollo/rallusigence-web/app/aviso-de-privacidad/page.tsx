import styles from './page.module.css'

export default function AvisoDePrivacidad() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <article className={styles.content}>
          <h1 className="rs-h1">Aviso de privacidad</h1>

          <p className={styles.updated}>Última actualización: mayo 2026</p>

          <section className={styles.section}>
            <h2 className="rs-h3">Responsable del tratamiento</h2>
            <p>
              Rallusigence es operado por un grupo de profesionistas independientes
              con sede en Tizayuca, Hidalgo, México. Para ejercer tus derechos o
              cualquier consulta, escríbenos a: <strong>[correo placeholder]</strong>.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className="rs-h3">Datos que recopilamos</h2>
            <p>
              Al llenar nuestro formulario de contacto recopilamos: nombre completo,
              tipo de negocio, número de WhatsApp y correo electrónico.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className="rs-h3">Finalidad del tratamiento</h2>
            <p>
              Los datos se usan exclusivamente para contactarte y darte seguimiento
              a tu solicitud de auditoría o presupuesto. No los compartimos con
              terceros ni los usamos para publicidad.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className="rs-h3">Derechos ARCO</h2>
            <p>
              Tienes derecho de acceso, rectificación, cancelación u oposición de
              tus datos. Escríbenos para ejercerlos.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className="rs-h3">Cambios a este aviso</h2>
            <p>
              Podemos actualizar este aviso. La fecha de última actualización
              siempre estará indicada arriba.
            </p>
          </section>
        </article>
      </div>
    </div>
  )
}