interface TestimonialCardProps {
  quote: string
  author: string
  business: string
  location?: string
}

export default function TestimonialCard({
  quote,
  author,
  business,
  location
}: TestimonialCardProps) {
  return (
    <div className="testimonial-card">
      {/* Decorative quote mark */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          fontSize: '32px',
          fontFamily: 'var(--font-primary)',
          fontWeight: 'var(--weight-bold)',
          color: 'var(--rs-primary)',
          opacity: 0.4,
          lineHeight: 1
        }}
      >
        "
      </div>

      {/* Quote text */}
      <blockquote
        style={{
          margin: '0 0 16px 0',
          paddingLeft: '32px',
          color: 'var(--color-fg)',
          fontFamily: 'var(--font-primary)',
          fontWeight: 'var(--weight-regular)',
          fontSize: '16px',
          lineHeight: '1.6',
          fontStyle: 'italic'
        }}
      >
        {quote}
      </blockquote>

      {/* Author info */}
      <footer style={{ paddingLeft: '32px' }}>
        <cite
          style={{
            fontStyle: 'normal',
            display: 'block',
            marginBottom: '4px',
            color: 'var(--color-fg)',
            fontFamily: 'var(--font-primary)',
            fontWeight: 'var(--weight-semibold)',
            fontSize: '14px',
            lineHeight: '1.4'
          }}
        >
          {author}
        </cite>

        <div
          style={{
            color: 'var(--color-fg-muted)',
            fontFamily: 'var(--font-primary)',
            fontWeight: 'var(--weight-regular)',
            fontSize: '12px',
            lineHeight: '1.4',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          {business}
          {location && `, ${location}`}
        </div>
      </footer>
    </div>
  )
}