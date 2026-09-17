'use client'

import { useRef, useEffect } from 'react'
import { Check } from 'lucide-react'

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  price: string
  delivery: string
  features: string[]
  featured?: boolean
  cta?: string
  href?: string
  mascot?: string
  onCtaClick?: () => void
}

export default function ServiceCard({
  icon,
  title,
  description,
  price,
  delivery,
  features,
  featured = false,
  cta = 'Quiero este paquete',
  href,
  mascot,
  onCtaClick
}: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const priceRef = useRef<HTMLDivElement>(null)
  const cardClasses = `service-card ${featured ? 'service-card--featured' : ''}`

  // Tilt 3D al cursor — solo pointer:fine, rAF-throttled, muta custom properties
  // directo (nunca setState en mousemove).
  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        el.style.setProperty('--rx', `${(-py * 6).toFixed(2)}deg`)
        el.style.setProperty('--ry', `${(px * 6).toFixed(2)}deg`)
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(raf)
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  // Precio con conteo ascendente (odómetro) la primera vez que entra en viewport.
  // El HTML estático trae el precio final — sin JS no se pierde nada.
  useEffect(() => {
    const el = priceRef.current
    if (!el) return
    const match = price.match(/\$([\d,]+)/)
    if (!match) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const target = parseInt(match[1].replace(/,/g, ''), 10)
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const duration = 900
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - p, 3)
          el.textContent = price.replace(match[1], Math.round(target * eased).toLocaleString('en-US'))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [price])

  return (
    <div className={cardClasses} ref={cardRef}>
      {mascot && (
        <img
          src={mascot}
          alt=""
          aria-hidden="true"
          className="card-kiwi"
          width={72}
          height={72}
          loading="lazy"
        />
      )}
      {/* Icon */}
      <div
        style={{
          fontSize: '24px',
          color: featured ? '#fff' : 'var(--rs-primary)',
          marginBottom: '16px'
        }}
      >
        {icon}
      </div>

      {/* Title */}
      <h3
        style={{
          marginBottom: '8px',
          color: featured ? '#fff' : 'var(--color-fg)',
          fontFamily: 'var(--font-primary)',
          fontWeight: 'var(--weight-semibold)',
          fontSize: '18px',
          lineHeight: '1.3'
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          marginBottom: '16px',
          color: featured ? 'rgba(255, 255, 255, 0.8)' : 'var(--color-fg-muted)',
          fontFamily: 'var(--font-primary)',
          fontWeight: 'var(--weight-regular)',
          fontSize: '14px',
          lineHeight: '1.5',
          flexGrow: 1
        }}
      >
        {description}
      </p>

      {/* Features List */}
      <ul
        style={{
          margin: '0 0 16px 0',
          padding: 0,
          listStyle: 'none'
        }}
      >
        {features.map((feature, index) => (
          <li
            key={index}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
              marginBottom: '8px',
              fontSize: '14px',
              lineHeight: '1.4'
            }}
          >
            <Check
              size={16}
              style={{
                color: featured ? '#fff' : 'var(--rs-primary)',
                marginTop: '2px',
                flexShrink: 0
              }}
            />
            <span
              style={{
                color: featured ? '#fff' : 'var(--color-fg)',
                fontFamily: 'var(--font-primary)',
                fontWeight: 'var(--weight-regular)'
              }}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* Price */}
      <div
        ref={priceRef}
        className="price-tag"
        style={{
          marginBottom: '8px',
          backgroundColor: featured ? 'rgba(255, 255, 255, 0.2)' : 'rgba(32, 180, 177, 0.1)',
          color: featured ? '#fff' : 'var(--rs-primary)'
        }}
      >
        {price}
      </div>

      {/* Delivery time */}
      <p
        style={{
          margin: '0 0 20px 0',
          color: featured ? 'rgba(255, 255, 255, 0.7)' : 'var(--color-fg-muted)',
          fontFamily: 'var(--font-primary)',
          fontSize: '12px',
          lineHeight: '1.4'
        }}
      >
        Entrega: {delivery}
      </p>

      {/* CTA Button — siempre navega; onCtaClick solo trackea */}
      <a
        href={href || '/#contacto'}
        target={href ? '_blank' : undefined}
        rel={href ? 'noopener noreferrer' : undefined}
        onClick={onCtaClick}
        className={`rs-btn ${featured ? 'rs-btn--ghost' : 'rs-btn--primary'}`}
        style={featured ? {
          alignSelf: 'flex-start',
          backgroundColor: '#fff',
          color: 'var(--rs-primary)',
          borderColor: '#fff'
        } : undefined}
      >
        {cta}
      </a>
    </div>
  )
}
