// Tabla comparativa Rallusigence vs. alternativas del mercado mexicano 2026.
// Fuente de cifras: fase-1-research/propuesta-de-valor.md (sección 6,
// "Posicionamiento en el mercado 2026") y benchmark-competitivo.md.

export interface FilaComparativa {
  criterio: string
  valores: [string, string, string, string]
  gana?: number
}

export const columnas: [string, string, string, string] = [
  'Rallusigence',
  'Agencia tradicional',
  'Wix / DIY',
  'Freelancer'
]

export const filas: FilaComparativa[] = [
  {
    criterio: 'Precio',
    valores: [
      '$6,000–$20,000 MXN, pago único',
      '$15,000–$60,000 MXN',
      '$300–$600 MXN/mes, para siempre',
      'Variable, sin tarifa publicada'
    ],
    gana: 0
  },
  {
    criterio: 'Tiempo de entrega',
    valores: [
      '3 a 12 días hábiles',
      '15 a 30 días (o más)',
      'Inmediato, pero lo armas tú',
      'Sin plazo firme'
    ],
    gana: 0
  },
  {
    criterio: 'Dueño del dominio y del código',
    valores: [
      'Sí, desde el primer día',
      'Rara vez: muchas agencias se quedan con el acceso',
      'No: tu sitio vive dentro de Wix, no puedes sacarlo',
      'A veces, solo si lo pides por escrito'
    ],
    gana: 0
  },
  {
    criterio: 'Mensualidades',
    valores: [
      'Ninguna',
      'A veces, por "mantenimiento"',
      'Sí, para siempre',
      'Ninguna, pero tampoco hay soporte'
    ],
    gana: 0
  },
  {
    criterio: 'Precio visible antes de contratar',
    valores: [
      'Publicado en el sitio',
      'Rara vez: piden "agendar una llamada"',
      'Publicado',
      'Se cotiza por mensaje, sin tarifa fija'
    ],
    gana: 0
  },
  {
    criterio: 'Revisiones',
    valores: [
      'Corregimos antes de cobrar el 50% restante',
      'Ilimitadas, pero encarecen el proyecto con cada ronda',
      'Tú mismo, sin ayuda',
      'Depende de lo acordado con cada quien'
    ],
    gana: 0
  },
  {
    criterio: 'SEO incluido',
    valores: [
      'SEO básico incluido en todos los paquetes',
      'Extra, se cotiza aparte',
      'Herramientas básicas que configuras tú',
      'Rara vez incluido'
    ],
    gana: 0
  },
  {
    criterio: 'Soporte después de la entrega',
    valores: [
      'Guía de uso + código tuyo para siempre',
      'Contrato de soporte con mensualidad',
      'Foros de ayuda de Wix',
      'Depende de si el freelancer sigue disponible'
    ],
    gana: 0
  }
]

export const nota = 'Comparamos contra lo que cada opción publica en el mercado mexicano en 2026. Wix y los freelancers son alternativas válidas dependiendo de lo que necesites: esta tabla solo muestra en qué nos diferenciamos nosotros.'
