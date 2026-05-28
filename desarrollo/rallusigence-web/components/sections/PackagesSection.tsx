'use client'

import { useEffect, useRef } from 'react'
import { Rocket, Star, Zap } from 'lucide-react'
import ServiceCard from '@/components/ui/ServiceCard'
import { trackServiceView, trackCtaClick } from '@/lib/analytics'
import styles from './PackagesSection.module.css'

const packages = [
  {
    icon: <Rocket size={24} />,
    title: 'Lanzamiento',
    description: 'Tu presencia digital básica pero profesional. Una página que dice quién eres, qué vendes y cómo contactarte. Optimizada para Google y para celular.',
    price: '$6,000 MXN',
    delivery: '3 días',
    features: [
      'Landing de 1 página con 5-7 secciones',
      'Diseño mobile-first',
      'Formulario de contacto funcional',
      'SEO básico',
      'Dominio configurado en tu cuenta',
      'Hosting en tu cuenta (Firebase gratuito)',
      'Código fuente completo tuyo'
    ],
    cta: 'Quiero este paquete',
    featured: false
  },
  {
    icon: <Star size={24} />,
    title: 'Profesional',
    description: 'Sitio completo con múltiples páginas, blog listo para publicar y SEO configurado para aparecer en búsquedas relevantes de tu industria.',
    price: '$12,000 MXN',
    delivery: '7 días',
    features: [
      'Todo del paquete Lanzamiento',
      '5-7 páginas individuales',
      'Blog listo para publicar artículos',
      'Galería de fotos',
      'Google Maps integrado',
      'Google Analytics configurado',
      'SEO on-page completo en todas las páginas',
      'Guía en PDF de cómo usar tu sitio'
    ],
    cta: 'Quiero este paquete',
    featured: true
  },
  {
    icon: <Zap size={24} />,
    title: 'Avanzado',
    description: 'Sitio completo + tienda online + blog con contenido inicial. Todo listo para generar clientes y ventas desde el primer día.',
    price: '$20,000 MXN',
    delivery: '12 días',
    features: [
      'Todo del paquete Profesional',
      'Tienda online con carrito de compras',
      '5 artículos de blog escritos con IA',
      'Botón de WhatsApp integrado',
      'Formulario de cotización automático',
      'Optimización avanzada de velocidad',
      'Certificado SSL configurado',
      'Capacitación de 30 minutos'
    ],
    cta: 'Quiero este paquete',
    featured: false
  }
]

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
        </div>

        <div className={styles.grid}>
          {packages.map((pkg, index) => (
            <div key={pkg.title} className={`reveal reveal--delay-${index + 1}`}>
              <ServiceCard
                icon={pkg.icon}
                title={pkg.title}
                description={pkg.description}
                price={pkg.price}
                delivery={pkg.delivery}
                features={pkg.features}
                featured={pkg.featured}
                cta={pkg.cta}
                onCtaClick={() => trackCtaClick('paquete', 'packages', pkg.title)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}