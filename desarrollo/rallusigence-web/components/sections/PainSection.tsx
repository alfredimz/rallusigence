import styles from './PainSection.module.css'

// Sección de dolores (Sprint B): composición en dos columnas, titular a la izquierda con el kiwi explorador
// buscando con linterna, y a la derecha los tres dolores con un kiwi en contexto cada uno (sin íconos de librería).
const pains = [
  {
    kiwi: '/assets/kiwis/kiwi-lupa.svg',
    title: 'Tu negocio no aparece en Google.',
    desc: 'Cuando alguien busca lo que vendes, encuentran a otro. Y ya no regresan.'
  },
  {
    kiwi: '/assets/kiwis/kiwi-smartphone.svg',
    title: 'Tu sitio de 2018 no funciona en celular.',
    desc: 'El 80% de tus clientes potenciales lo visitan desde el teléfono y se van en segundos.'
  },
  {
    kiwi: '/assets/kiwis/kiwi-tiempo.svg',
    title: 'Las agencias te dijeron 30 a 60 días.',
    desc: 'Ya llevas meses esperando mientras la competencia te pasa.'
  }
]

export default function PainSection() {
  return (
    <section id="problema" aria-labelledby="problema-title" className={styles.section}>
      <div className="section-wrapper">
        <div className={styles.layout}>
          <div className={styles.titleWrap}>
            <p className={`${styles.eyebrow} reveal`}>El problema</p>
            <h2 id="problema-title" className="rs-h2 reveal reveal--wipe">
              Cada día sin sitio web es un cliente que se fue con la competencia
            </h2>
            <img
              src="/assets/kiwis/kiwi-explorador.svg"
              alt=""
              aria-hidden="true"
              className={`${styles.explorador} reveal reveal--delay-2`}
              width={220}
              height={160}
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className={styles.list}>
            {pains.map((pain, index) => (
              <div key={index} className={`pain-item reveal reveal--delay-${index + 1}`}>
                <img
                  src={pain.kiwi}
                  alt=""
                  aria-hidden="true"
                  className={styles.painKiwi}
                  width={64}
                  height={64}
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <p className={styles.painTitle}>{pain.title}</p>
                  <p className={styles.painDesc}>{pain.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
