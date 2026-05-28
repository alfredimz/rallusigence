import styles from './ProcessSection.module.css'

const steps = [
  {
    number: 1,
    title: 'Escríbenos',
    description: 'Mándanos un mensaje por WhatsApp o llena el formulario. Te respondemos en menos de 2 horas.',
    time: '< 2 horas'
  },
  {
    number: 2,
    title: 'Pagas el 50%',
    description: 'Genera un código de retiro desde tu app bancaria y compártelo con nosotros. En ese momento arrancamos.',
    time: 'mismo día'
  },
  {
    number: 3,
    title: 'Construimos',
    description: 'Con IA y experiencia, construimos tu sitio mientras tú sigues atendiendo tu negocio. Te mandamos avances.',
    time: '3–12 días'
  },
  {
    number: 4,
    title: 'Te entregamos todo',
    description: 'El sitio va a tu hosting, tu dominio queda en tus cuentas, recibes el código completo. Pagas el 50% restante.',
    time: 'día de entrega'
  }
]

export default function ProcessSection() {
  return (
    <section id="como-funciona" aria-labelledby="proceso-title" className={styles.section} data-theme="dark">
      <div className="section-wrapper">
        <div className={styles.titleWrap}>
          <h2 id="proceso-title" className="rs-h2 reveal">
            De cero a tu sitio en línea. Sin reuniones, sin esperas.
          </h2>
        </div>

        <div className={styles.list}>
          {steps.map((step, index) => (
            <div key={step.number} className={`step-item reveal reveal--delay-${index + 1}`}>
              <div className="step-item__number">{step.number}</div>
              <div>
                <p className={styles.stepTitle}>{step.title}</p>
                <p className={styles.stepDesc}>{step.description}</p>
                <span className={styles.stepTime}>{step.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}