'use client'

import { useEffect, useRef } from 'react'
import PackagesGrid from '@/components/sections/PackagesGrid'
import { trackServiceView } from '@/lib/analytics'
import styles from './PackagesSection.module.css'

export default function PackagesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const hasTrackedView = useRef(false)

  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTrackedView.current) {
            trackServiceView()
            hasTrackedView.current = true
            observer.disconnect()
          }
        })
      },
      { threshold: 0.3, rootMargin: '0px 0px -100px 0px' }
    )

    observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="paquetes"
      aria-labelledby="paquetes-title"
      className={styles.section}
      ref={sectionRef}
    >
      <div className="section-wrapper">
        <div className={styles.titleWrap}>
          <h2 id="paquetes-title" className="rs-h2 reveal">
            Elige tu paquete. Precio fijo. Sin sorpresas.
          </h2>
          <p className={`${styles.lead} reveal reveal--delay-1`}>
            Tres precios publicados, tres plazos claros. El sitio queda en tus cuentas desde el primer día.
          </p>
        </div>

        <PackagesGrid position="packages" />
      </div>
    </section>
  )
}
