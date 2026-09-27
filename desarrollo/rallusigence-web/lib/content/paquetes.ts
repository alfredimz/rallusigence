// Fuente única de los 3 paquetes. Consumida por PackagesSection (home) y
// app/(site)/paquetes/page.tsx — antes vivían duplicados y divergentes.
// Precios y plazos: fase-1-research/propuesta-de-valor.md.

import { waLink } from '@/lib/contacto'

export type PaqueteId = 'lanzamiento' | 'profesional' | 'avanzado'

export interface Paquete {
  id: PaqueteId
  nombre: string
  precio: number
  precioTexto: string
  dias: string
  tagline: string
  incluye: string[]
  destacado: boolean
  kiwi: string
  waMsg: string
}

export const PAQUETES: Paquete[] = [
  {
    id: 'lanzamiento',
    nombre: 'Lanzamiento',
    precio: 6000,
    precioTexto: '$6,000 MXN',
    dias: '3 días hábiles',
    tagline: 'Tu presencia digital básica pero profesional. Una página que dice quién eres, qué vendes y cómo contactarte. Optimizada para Google y para celular.',
    incluye: [
      'Landing de 1 página con 5-7 secciones',
      'Diseño mobile-first',
      'Formulario de contacto funcional',
      'SEO básico (título, descripción, H1, velocidad)',
      'Dominio configurado en tu cuenta',
      'Hosting en tu cuenta (Firebase gratuito)',
      'Código fuente completo tuyo'
    ],
    destacado: false,
    kiwi: '/assets/kiwis/kiwi-lanzamiento.svg',
    waMsg: 'Hola Rallusigence, quiero el paquete Lanzamiento de $6,000 MXN. ¿Cómo empezamos?'
  },
  {
    id: 'profesional',
    nombre: 'Profesional',
    precio: 12000,
    precioTexto: '$12,000 MXN',
    dias: '7 días hábiles',
    tagline: 'Sitio completo con múltiples páginas, blog listo para publicar y SEO configurado para aparecer en búsquedas relevantes de tu industria.',
    incluye: [
      'Todo del paquete Lanzamiento',
      '5-7 páginas individuales',
      'Blog listo para publicar artículos',
      'Galería de fotos',
      'Google Maps integrado',
      'Google Analytics configurado',
      'SEO on-page completo en todas las páginas',
      'Guía en PDF de cómo usar tu sitio'
    ],
    destacado: true,
    kiwi: '/assets/kiwis/kiwi-desarrollo.svg',
    waMsg: 'Hola Rallusigence, quiero el paquete Profesional de $12,000 MXN. ¿Cómo empezamos?'
  },
  {
    id: 'avanzado',
    nombre: 'Avanzado',
    precio: 20000,
    precioTexto: '$20,000 MXN',
    dias: '12 días hábiles',
    tagline: 'Sitio completo + tienda online + blog con contenido inicial. Todo listo para generar clientes y ventas desde el primer día.',
    incluye: [
      'Todo del paquete Profesional',
      'Tienda online con carrito de compras',
      '5 artículos de blog escritos con IA',
      'Botón de WhatsApp integrado',
      'Formulario de cotización automático',
      'Optimización avanzada de velocidad',
      'Certificado SSL configurado',
      'Capacitación de 30 minutos'
    ],
    destacado: false,
    kiwi: '/assets/kiwis/kiwi-carrito.svg',
    waMsg: 'Hola Rallusigence, quiero el paquete Avanzado de $20,000 MXN. ¿Cómo empezamos?'
  }
]

export function getPaquete(id: PaqueteId): Paquete {
  return PAQUETES.find((p) => p.id === id) as Paquete
}

// Deeplink a WhatsApp con el mensaje del paquete ya cargado.
export function paqueteWaLink(p: Paquete): string {
  return waLink(p.waMsg)
}
