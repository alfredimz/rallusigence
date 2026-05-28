import styles from './page.module.css'

export default function TerminosYCondiciones() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <article className={styles.content}>
          <h1 className="rs-h1">Términos y condiciones</h1>

          <p className={styles.updated}>Última actualización: mayo 2026</p>

          <section className={styles.section}>
            <h2 className="rs-h3">Servicios</h2>
            <p>
              Rallusigence ofrece servicios de desarrollo de sitios web y consultoría
              digital. Todos los precios son en pesos mexicanos (MXN) e incluyen IVA
              en el caso de que aplique.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className="rs-h3">Forma de pago</h2>
            <p>
              Aceptamos pagos por retiro sin tarjeta en cajero automático. Al realizar
              el pago del 50% inicial, confirmas el inicio del proyecto. El 50% restante
              se liquida al momento de la entrega.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className="rs-h3">Entregas y plazos</h2>
            <p>
              Los tiempos de entrega indicados (3, 7 o 12 días hábiles) son estimados
              bajo condiciones normales. Pueden variar si el cliente demora en
              proporcionar materiales o aprobaciones.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className="rs-h3">Propiedad del sitio</h2>
            <p>
              Al liquidar el proyecto en su totalidad, el código, el dominio y el
              hosting son 100% propiedad del cliente. Rallusigence no retiene
              ningún derecho.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className="rs-h3">Garantía</h2>
            <p>
              Si el sitio entregado no cumple con lo acordado en el brief inicial,
              realizamos correcciones sin costo antes del pago final.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className="rs-h3">Sin facturación</h2>
            <p>
              Operamos como grupo de profesionistas independientes. No emitimos
              facturas ni tickets. Los pagos son transacciones directas entre partes.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className="rs-h3">Contacto</h2>
            <p>
              Para cualquier duda, escríbenos por WhatsApp o al correo indicado
              en nuestro sitio.
            </p>
          </section>
        </article>
      </div>
    </div>
  )
}