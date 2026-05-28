import styles from './DiffSection.module.css'

const differentiators = [
  {
    title: '3 días, no 30.',
    description: 'Las agencias tradicionales tienen juntas, cotizaciones, aprobaciones. Nosotros tenemos IA. Tu sitio listo en días.'
  },
  {
    title: 'Sin cotizaciones que duran semanas.',
    description: 'El precio está en el sitio. Lo que ves es lo que pagas. Sin extras, sin sorpresas.'
  },
  {
    title: 'Sin dependencias, sin mensualidades.',
    description: 'El sitio queda en tus cuentas. El código es tuyo. No estás atado a nosotros.'
  }
]

export default function DiffSection() {
  return (
    <section id="diferenciadores" aria-labelledby="diff-title" className={styles.section}>
      <div className="section-wrapper">
        <div className={styles.inner}>
          <div className={`${styles.titleWrap} reveal reveal--left`}>
            <h2 id="diff-title" className="rs-h2">
              No somos una agencia tradicional. Y eso es una ventaja para ti.
            </h2>
            <p className={styles.tagline}>
              Velocidad, precio claro y código 100% tuyo desde el primer día.
            </p>
          </div>

          <div className={styles.list}>
            {differentiators.map((diff, index) => (
              <div key={index} className={`differentiator-item reveal reveal--delay-${index + 1}`}>
                <div className="differentiator-item__check">✓</div>
                <div>
                  <p className={styles.diffTitle}>{diff.title}</p>
                  <p className={styles.diffDesc}>{diff.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
