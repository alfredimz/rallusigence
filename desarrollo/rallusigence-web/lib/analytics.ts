// Declaraciones globales para TypeScript
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    fbq: (...args: unknown[]) => void
  }
}

// form_submit → GA4 + Meta Lead
export function trackFormSubmit(formType: string) {
  if (typeof window === 'undefined') return
  window.gtag?.('event', 'form_submit', {
    form_type: formType,
    page_location: window.location.pathname,
    success: true,
    user_type: 'lead',
  })
  window.fbq?.('track', 'Lead', {
    content_category: 'auditoria_digital',
    content_name: 'formulario_auditoria_gratis',
    value: 1500,
    currency: 'MXN',
  })
}

// whatsapp_click → GA4 + Meta InitiateCheckout
export function trackWhatsAppClick(location: string) {
  if (typeof window === 'undefined') return
  window.gtag?.('event', 'whatsapp_click', {
    button_location: location,
    page_location: window.location.pathname,
    cta_text: 'WhatsApp',
  })
  window.fbq?.('track', 'InitiateCheckout', {
    content_category: 'contacto_directo',
    content_name: 'whatsapp_business',
    value: 800,
    currency: 'MXN',
  })
}

// cta_click → GA4
export function trackCtaClick(ctaType: string, position: string, text: string) {
  if (typeof window === 'undefined') return
  window.gtag?.('event', 'cta_click', {
    cta_type: ctaType,
    cta_position: position,
    cta_text: text,
  })
}

// service_view → GA4 + Meta ViewContent
export function trackServiceView() {
  if (typeof window === 'undefined') return
  window.gtag?.('event', 'service_view', {
    scroll_depth: Math.round((window.scrollY / document.body.scrollHeight) * 100),
  })
  window.fbq?.('track', 'ViewContent', {
    content_type: 'service',
    content_name: 'servicios_sitio_web',
    content_category: 'servicios_ia',
  })
}

// scroll_depth → GA4 (disparar a 25, 50, 75, 100%)
export function trackScrollDepth(percentage: number) {
  if (typeof window === 'undefined') return
  window.gtag?.('event', 'scroll_depth', {
    page_type: window.location.pathname === '/' ? 'home' : 'auditoria',
    scroll_percentage: percentage,
  })
}

// form_error → GA4
export function trackFormError(fieldName: string) {
  if (typeof window === 'undefined') return
  window.gtag?.('event', 'form_error', {
    form_type: 'auditoria',
    error_type: 'validation',
    field_error: fieldName,
  })
}