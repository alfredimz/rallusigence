import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const alt = 'Rallusigence — Tu sitio web en 3 días'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#20B4B1',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Fondo con patrón sutil */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #20B4B1 0%, #198C76 100%)',
          }}
        />

        {/* Contenido */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
            textAlign: 'center',
          }}
        >
          {/* Badge */}
          <div
            style={{
              background: 'rgba(255,255,255,0.15)',
              color: '#fff',
              fontSize: '18px',
              fontWeight: 600,
              padding: '8px 24px',
              borderRadius: '28px',
              letterSpacing: '0.08em',
            }}
          >
            RALLUSIGENCE
          </div>

          {/* Headline */}
          <div
            style={{
              color: '#ffffff',
              fontSize: '72px',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            Tu sitio web en 3 días.
          </div>

          {/* Subtítulo */}
          <div
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: '28px',
              fontWeight: 400,
              lineHeight: 1.4,
              maxWidth: '800px',
            }}
          >
            Precio fijo desde $6,000 MXN. Tú eres el dueño desde el primer día.
          </div>

          {/* CTA */}
          <div
            style={{
              marginTop: '16px',
              background: '#ffffff',
              color: '#20B4B1',
              fontSize: '22px',
              fontWeight: 700,
              padding: '16px 40px',
              borderRadius: '8px',
            }}
          >
            rallusigence.net
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
