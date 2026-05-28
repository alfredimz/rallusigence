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
  onCtaClick
}: ServiceCardProps) {
  const cardClasses = `service-card ${featured ? 'service-card--featured' : ''}`

  return (
    <div className={cardClasses}>
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
        className={`price-tag ${featured ? '' : ''}`}
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

      {/* CTA Button */}
      {onCtaClick ? (
        featured ? (
          <button
            className="rs-btn rs-btn--ghost"
            onClick={onCtaClick}
            style={{
              alignSelf: 'flex-start',
              backgroundColor: '#fff',
              color: 'var(--rs-primary)',
              borderColor: '#fff'
            }}
          >
            {cta}
          </button>
        ) : (
          <button
            className="rs-btn rs-btn--primary"
            onClick={onCtaClick}
          >
            {cta}
          </button>
        )
      ) : (
        <a
          href="/#contacto"
          className={`rs-btn ${featured ? 'rs-btn--ghost' : 'rs-btn--primary'}`}
          style={featured ? {
            backgroundColor: '#fff',
            color: 'var(--rs-primary)',
            borderColor: '#fff'
          } : undefined}
        >
          {cta}
        </a>
      )}
    </div>
  )
}