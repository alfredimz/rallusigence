import TestimonialCard from '@/components/ui/TestimonialCard'
import styles from './TestimonialsSection.module.css'

const testimonial = {
  quote: 'Tenía 3 años queriendo hacer mi sitio web. En 5 días ya estaba en Google y ese mismo mes conseguí 4 clientes nuevos.',
  author: 'Restaurante familiar',
  business: 'Puebla',
  location: ''
}

export default function TestimonialsSection() {
  return (
    <section id="testimonios" aria-labelledby="testimonios-title" className={styles.section}>
      <div className="section-wrapper">
        <div className={styles.titleWrap}>
          <h2 id="testimonios-title" className="rs-h2 reveal">
            Clientes reales
          </h2>
        </div>

        <div className={styles.testimonialWrap}>
          <div className="reveal">
            <TestimonialCard
              quote={testimonial.quote}
              author={testimonial.author}
              business={testimonial.business}
              location={testimonial.location}
            />
          </div>
        </div>
      </div>
    </section>
  )
}