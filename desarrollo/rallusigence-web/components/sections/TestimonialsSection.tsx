import Link from 'next/link'
import TestimonialCard from '@/components/ui/TestimonialCard'
import { TESTIMONIOS, destacados } from '@/lib/content/testimonios'
import { nosotros } from '@/lib/content/nosotros'
import styles from './TestimonialsSection.module.css'

const negocios = nosotros.cifras.find((c) => c.etiqueta.startsWith('negocios'))?.valor ?? '66'
const fundacion = nosotros.cifras.find((c) => c.etiqueta.startsWith('año de fundación'))?.valor ?? '2015'

export default function TestimonialsSection() {
  const list = destacados
    .map((id) => TESTIMONIOS.find((t) => t.id === id))
    .filter((t): t is NonNullable<typeof t> => Boolean(t))

  return (
    <section id="testimonios" aria-labelledby="testimonios-title" className={styles.section}>
      <div className="section-wrapper">
        <div className={styles.layout}>
          <div className={styles.intro}>
            <h2 id="testimonios-title" className="rs-h2 reveal">
              Lo que dicen los negocios que ya tienen sitio
            </h2>
            <p className={`${styles.subtitle} reveal reveal--delay-1`}>
              Desde {fundacion}. {negocios} negocios atendidos. Estas son sus palabras, con nombre y giro.
            </p>
            <Link href="/portafolio" className={`${styles.introLink} reveal reveal--delay-2`}>
              Ver los proyectos
            </Link>
            <img
              src="/assets/kiwis/kiwi-traje.svg"
              alt=""
              aria-hidden="true"
              className={styles.kiwiTraje}
              width={132}
              height={132}
              loading="lazy"
              decoding="async"
            />
          </div>

          <div
            className={styles.testimonialWrap}
            tabIndex={0}
            role="group"
            aria-label="Testimonios de clientes"
          >
            {list.map((t, index) => (
              <div key={t.id} className={`${styles.item} reveal reveal--blur reveal--delay-${(index % 4) + 1}`}>
                <TestimonialCard t={t} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
