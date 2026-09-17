'use client'

import { useEffect, useRef } from 'react'
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
  const listRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLSpanElement>(null)

  // Scrollytelling: la línea conectora se dibuja al ritmo del scroll (GSAP ScrollTrigger,
  // cargado dinámicamente solo en este componente) y el paso centrado se ilumina.
  useEffect(() => {
    let cancelled = false
    let mm: { revert: () => void } | undefined
    ;(async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (cancelled || !listRef.current || !fillRef.current) return
      gsap.registerPlugin(ScrollTrigger)
      const matcher = gsap.matchMedia()
      matcher.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          fillRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 70%',
              end: 'bottom 45%',
              scrub: 0.4,
            },
          }
        )
        listRef.current!.querySelectorAll('.step-item').forEach((el) => {
          ScrollTrigger.create({
            trigger: el,
            start: 'top 62%',
            end: 'bottom 38%',
            toggleClass: { targets: el, className: styles.active },
          })
        })
      })
      mm = matcher
    })()
    return () => {
      cancelled = true
      mm?.revert()
    }
  }, [])

  return (
    <section id="como-funciona" aria-labelledby="proceso-title" className={styles.section} data-theme="dark">
      <div className="section-wrapper">
        <div className={styles.titleWrap}>
          <h2 id="proceso-title" className="rs-h2 reveal">
            De cero a tu sitio en línea. Sin reuniones, sin esperas.
          </h2>
        </div>

        <div className={styles.list} ref={listRef}>
          <span className={styles.connector} aria-hidden="true">
            <span className={styles.connectorFill} ref={fillRef} />
          </span>
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
