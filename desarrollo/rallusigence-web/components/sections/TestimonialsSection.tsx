import TestimonialCard from '@/components/ui/TestimonialCard'
import styles from './TestimonialsSection.module.css'

// Testimonios reales de clientes de la trayectoria del equipo (era KIWINET/APTERYNET,
// tríptico 2020 — E:/AlfreditosDrive/Proyectos/KIWINET/diseños/KiwiTrips/Triptico2020.pdf)
const testimonials = [
  {
    quote: 'Saturaron mi consultorio de citas.',
    author: 'Dr. Sergio',
    business: 'Consultorio de terapia láser',
    location: ''
  },
  {
    quote: 'Espectacular mi sitio en inglés para vender en USA.',
    author: 'Oskar Luna',
    business: 'Digital Print',
    location: ''
  },
  {
    quote: 'Me ayudan a acercarme a reconocidas marcas.',
    author: 'Ing. Alan Chávez',
    business: 'Steam Cleaning',
    location: ''
  }
]

export default function TestimonialsSection() {
  return (
    <section id="testimonios" aria-labelledby="testimonios-title" className={styles.section}>
      <div className="section-wrapper">
        <div className={styles.titleWrap}>
          <img
            src="/assets/kiwis/kiwi-traje.svg"
            alt=""
            aria-hidden="true"
            className={styles.kiwiTraje}
            width={84}
            height={84}
            loading="lazy"
          />
          <h2 id="testimonios-title" className="rs-h2 reveal">
            Clientes reales
          </h2>
          <p className={styles.subtitle}>
            Más de 8 años construyendo sitios y marcas para negocios mexicanos.
          </p>
        </div>

        <div className={styles.testimonialWrap}>
          {testimonials.map((t, index) => (
            <div key={t.author} className={`reveal reveal--blur reveal--delay-${index + 1}`}>
              <TestimonialCard
                quote={t.quote}
                author={t.author}
                business={t.business}
                location={t.location}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
