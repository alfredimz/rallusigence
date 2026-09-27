'use client'

import ServiceCard from '@/components/ui/ServiceCard'
import { trackCtaClick } from '@/lib/analytics'
import { PAQUETES, paqueteWaLink } from '@/lib/content/paquetes'
import styles from './PackagesSection.module.css'

interface PackagesGridProps {
  // posición para el evento cta_click (home: 'packages', /paquetes: 'paquetes-page')
  position: string
}

// Las 3 cards de paquetes desde la fuente única. Client component porque
// ServiceCard necesita el callback de tracking; usable desde páginas servidor.
export default function PackagesGrid({ position }: PackagesGridProps) {
  return (
    <div className={styles.grid}>
      {PAQUETES.map((pkg, index) => (
        <div key={pkg.id} id={pkg.id} className={`${styles.anchor} reveal reveal--blur reveal--delay-${index + 1}`}>
          <ServiceCard
            title={pkg.nombre}
            description={pkg.tagline}
            price={pkg.precioTexto}
            delivery={pkg.dias}
            features={pkg.incluye}
            featured={pkg.destacado}
            cta="Quiero este paquete"
            href={paqueteWaLink(pkg)}
            mascot={pkg.kiwi}
            onCtaClick={() => trackCtaClick('paquete', position, pkg.nombre)}
          />
        </div>
      ))}
    </div>
  )
}
