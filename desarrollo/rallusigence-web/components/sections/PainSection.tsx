import styles from './PainSection.module.css'

const NoGoogleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
    <line x1="8.5" y1="8.5" x2="13.5" y2="13.5"/>
    <line x1="13.5" y1="8.5" x2="8.5" y2="13.5"/>
  </svg>
)

const BrokenMobileIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="5" y="2" width="14" height="20" rx="2"/>
    <line x1="9" y1="9" x2="15" y2="15"/>
    <line x1="15" y1="9" x2="9" y2="15"/>
    <line x1="5" y1="17" x2="19" y2="17"/>
  </svg>
)

const ClockIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
)

const pains = [
  {
    Icon: NoGoogleIcon,
    title: 'Tu negocio no aparece en Google.',
    desc: 'Cuando alguien busca lo que vendes, encuentran a otro. Y ya no regresan.'
  },
  {
    Icon: BrokenMobileIcon,
    title: 'Tu sitio de 2018 no funciona en celular.',
    desc: 'El 80% de tus clientes potenciales lo visitan desde el teléfono y se van en segundos.'
  },
  {
    Icon: ClockIcon,
    title: 'Las agencias te dijeron 30 a 60 días.',
    desc: 'Ya llevas meses esperando mientras la competencia te pasa.'
  }
]

export default function PainSection() {
  return (
    <section id="problema" aria-labelledby="problema-title" className={styles.section}>
      <div className="section-wrapper">
        <div className={styles.titleWrap}>
          <h2 id="problema-title" className="rs-h2 reveal">
            Cada día sin sitio web es un cliente que se fue con la competencia
          </h2>
        </div>

        <div className={styles.list}>
          {pains.map((pain, index) => (
            <div key={index} className={`pain-item reveal reveal--delay-${index + 1}`}>
              <span className={styles.painIcon}>
                <pain.Icon />
              </span>
              <div>
                <p className={styles.painTitle}>{pain.title}</p>
                <p className={styles.painDesc}>{pain.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
