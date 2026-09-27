// Datos de contacto centralizados de Rallusigence.
// Antes repetidos (hardcodeados) en 6+ componentes — única fuente de verdad.

export const WHATSAPP = '525626171584'
export const WHATSAPP_DISPLAY = '+52 56 2617 1584'
export const EMAIL = 'hola@rallusigence.net'

export const FORMSPREE = {
  contacto: 'xkjwqlbg',
  auditoria: 'mppaojqk',
} as const

// Genera un link wa.me con mensaje pre-cargado opcional.
export function waLink(msg?: string): string {
  return `https://wa.me/${WHATSAPP}${msg ? `?text=${encodeURIComponent(msg)}` : ''}`
}
