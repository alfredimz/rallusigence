'use client'

import { trackWhatsAppClick } from '@/lib/analytics'

interface WhatsAppCtaProps {
  location: string
  message?: string
  className?: string
  children: React.ReactNode
}

// Link a WhatsApp con tracking GA4 — usable desde componentes de servidor
export default function WhatsAppCta({ location, message, className, children }: WhatsAppCtaProps) {
  const href = `https://wa.me/525626171584${message ? `?text=${encodeURIComponent(message)}` : ''}`
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackWhatsAppClick(location)}
    >
      {children}
    </a>
  )
}
