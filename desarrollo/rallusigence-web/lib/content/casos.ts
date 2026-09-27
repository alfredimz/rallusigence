// Casos de portafolio reales de la agencia, a través de sus 3 eras
// (KIWINET 2015-2019 · APTERYNET 2019-2023 · Rallusigence 2026-).
// Fuentes: KIWINET/diseños/KiwiPortafolio/Curriculum_2019.pdf,
// REGISTRO-AGENCIA.md, PROJECTS.md (origen de las 18 plantillas comerciales).
// Orden: primero el caso con sitio vigente (nuestra versión), después el resto (históricos).
// url/enLinea solo cuando el sitio en línea HOY es la versión que construimos nosotros.

export interface Caso {
  slug: string
  nombre: string
  giro: string
  ciudad?: string
  anio?: number
  url?: string
  resumen: string
  logros: string[]
  tipo: 'sitio' | 'seo' | 'tienda' | 'automatizacion'
  imagen: string
  imagenMobile: string
  testimonioId?: string
  enLinea: boolean
}

export const CASOS: Caso[] = [
  {
    slug: 'seprimex',
    nombre: 'Seprimex',
    giro: 'Seguridad privada',
    ciudad: 'Ciudad de México',
    resumen: 'Sitio de una sección con copy e identidad creados desde cero para una empresa de guardias intramuros, custodias y CCTV.',
    logros: [
      'Código HTML/CSS in-line, optimizado para evitar filtros antispam',
      'Origen directo de la plantilla comercial "Seguridad Privada" (2026)'
    ],
    tipo: 'sitio',
    imagen: '/portafolio/casos/seprimex.webp',
    imagenMobile: '/portafolio/casos/seprimex-mobile.webp',
    testimonioId: 'anita-seprimex',
    enLinea: false
  },
  {
    slug: 'impresiones-a-color',
    nombre: 'Impresiones a Color',
    giro: 'Impresión digital y láser',
    ciudad: 'Ciudad de México',
    resumen: 'Newsletter de una sección para un negocio de impresión con más de 20 años de operación, con visual creado en Illustrator.',
    logros: [
      'Negocio en operación desde 2003',
      'Código optimizado contra filtros antispam'
    ],
    tipo: 'sitio',
    imagen: '/portafolio/casos/impresiones-a-color.webp',
    imagenMobile: '/portafolio/casos/impresiones-a-color-mobile.webp',
    enLinea: false
  },
  {
    slug: 'creativos-espacios',
    nombre: 'Creativos Espacios',
    giro: 'Arquitectura modular y contenedores',
    url: 'creativosespacios.mx',
    resumen: 'La relación de cliente más larga de la agencia: research, diseño y desarrollo del sitio en varias fases desde 2007.',
    logros: [
      'Cliente activo desde 2007 (18 años de relación con la agencia)',
      '347 cotizaciones generadas para el cliente entre 2007 y 2025',
      'Sitio vigente en creativosespacios.mx',
      'Origen directo de la plantilla comercial "Arquitectura Modular" (2026)'
    ],
    tipo: 'sitio',
    imagen: '/portafolio/casos/creativos-espacios.webp',
    imagenMobile: '/portafolio/casos/creativos-espacios-mobile.webp',
    enLinea: true
  },
  {
    slug: 'transportes-montes',
    nombre: 'Transportes Montes',
    giro: 'Grúas y transporte de carga',
    resumen: 'El único cliente con cotización formal completa de dos fases: research + design system, y desarrollo del sitio.',
    logros: [
      'Fases 1 y 2 documentadas, con 3 manuales de marca',
      'Sitio lanzado en transportesmontes.com.mx',
      'Origen directo de la plantilla comercial "Grúas & Maniobras" (2026)'
    ],
    tipo: 'sitio',
    imagen: '/portafolio/casos/transportes-montes.webp',
    imagenMobile: '/portafolio/casos/transportes-montes-mobile.webp',
    enLinea: false
  },
  {
    slug: 'steamcleaning',
    nombre: 'SteamCleaning',
    giro: 'Limpieza y desinfección a vapor',
    resumen: 'El cliente con el stack más completo de la era KIWINET: dos versiones de sitio, SEO, redes, catálogo, anuncios y papelería.',
    logros: [
      'Relación activa de 2015 a 2022 (7 años)',
      '2 versiones de sitio construidas (V1 y V2)',
      'Paquete digital 2020: Adwords + landing + videos + diseños por $8,400 MXN',
      'Origen directo de la plantilla comercial "Limpieza a Vapor" (2026)'
    ],
    tipo: 'seo',
    imagen: '/portafolio/casos/steamcleaning.webp',
    imagenMobile: '/portafolio/casos/steamcleaning-mobile.webp',
    testimonioId: 'alan-steamcleaning',
    enLinea: false
  },
  {
    slug: 'digital-print',
    nombre: 'Digital Print',
    giro: 'Impresión y artes gráficas (México y EUA)',
    resumen: 'Sitio bilingüe pensado para vender materiales de impresión y rotulación a clientes de Estados Unidos.',
    logros: [
      'Negocio familiar establecido en Ciudad de México desde 2003',
      'Sitio orientado a exportación (publishers, print shops, offset printers)',
      'Desarrollo con Illustrator, Photoshop, HTML, CSS, Bootstrap, JS y Parallax.js'
    ],
    tipo: 'sitio',
    imagen: '/portafolio/casos/digital-print.webp',
    imagenMobile: '/portafolio/casos/digital-print-mobile.webp',
    testimonioId: 'oskar-digitalprint',
    enLinea: false
  },
  {
    slug: 'solfog',
    nombre: 'Solfog',
    giro: 'Cosméticos y cuidado de la piel (marca coreana)',
    resumen: 'Tienda online y blog para una marca coreana de skincare que buscaba expandirse al mercado mexicano.',
    logros: [
      '4 secciones + blog en WordPress',
      'Iconos de redes sociales creados de forma original',
      'Visual inspirado en la marca oficial coreana wakorea24.com'
    ],
    tipo: 'tienda',
    imagen: '/portafolio/casos/solfog.webp',
    imagenMobile: '/portafolio/casos/solfog-mobile.webp',
    testimonioId: 'pio-solfog',
    enLinea: false
  },
  {
    slug: 'liquen',
    nombre: 'Terapéutico Liquen',
    giro: 'Consultorio de terapia',
    resumen: 'Rediseño de imagen e identidad para un consultorio terapéutico que buscaba llenar su agenda de citas.',
    logros: [
      'Logotipo e identidad de marca ("Centro Terapéutico Liquen") creados desde cero',
      'Resultado reportado por el cliente: consultorio saturado de citas'
    ],
    tipo: 'sitio',
    imagen: '/portafolio/casos/liquen.webp',
    imagenMobile: '/portafolio/casos/liquen-mobile.webp',
    testimonioId: 'sergio-liquen',
    enLinea: false
  },
  {
    slug: 'mci',
    nombre: 'MCI',
    giro: 'Servicios profesionales',
    resumen: 'Diseño de sitio a la medida para un cliente que quería que el resultado reflejara exactamente lo que tenía en mente.',
    logros: [
      'Testimonio directo del cliente: "el sitio es justo lo que buscaba"'
    ],
    tipo: 'sitio',
    imagen: '/portafolio/casos/mci.webp',
    imagenMobile: '/portafolio/casos/mci-mobile.webp',
    testimonioId: 'hugo-mci',
    enLinea: false
  },
  {
    slug: 'acacnx',
    nombre: 'ACACNX',
    giro: 'Academia de baile',
    resumen: 'Renovación de imagen de marca para una academia que buscaba verse más fresca y actual.',
    logros: [
      'Testimonio directo del cliente: "nuestra imagen ahora es mejor, más fresca"',
      'Origen directo de la plantilla comercial "Academia de Baile" (2026)'
    ],
    tipo: 'sitio',
    imagen: '/portafolio/casos/acacnx.webp',
    imagenMobile: '/portafolio/casos/acacnx-mobile.webp',
    testimonioId: 'mary-acacnx',
    enLinea: false
  },
  {
    slug: 'sactei',
    nombre: 'Sactei',
    giro: 'Automatización industrial y suministros',
    resumen: 'Sitio de 5 secciones para una empresa de automatización de maquinaria que evalúa proyectos con visitas a campo.',
    logros: [
      'Identidad de marca (logotipo, tipografía, colores) creada de forma original',
      'Catálogo de servicios: programación de PLC\'s, monitoreo, arrancadores suaves, controles automáticos',
      'Desarrollo con Illustrator, HTML, CSS, Bootstrap, JS, Animated.CSS y Wow.JS'
    ],
    tipo: 'sitio',
    imagen: '/portafolio/casos/sactei.webp',
    imagenMobile: '/portafolio/casos/sactei-mobile.webp',
    testimonioId: 'elsa-sactei',
    enLinea: false
  },
  {
    slug: 'mascontadores',
    nombre: 'Más Contadores',
    giro: 'Despacho contable y asesoría fiscal',
    resumen: 'Sitio histórico de un despacho contable, modernizado hoy como base de la plantilla comercial para contadores.',
    logros: [
      'Origen directo de la plantilla comercial "Despacho Contable" (2026)',
      'Catálogo de honorarios por régimen fiscal (RESICO, Actividad Empresarial, Persona Moral)'
    ],
    tipo: 'sitio',
    imagen: '/portafolio/casos/mascontadores.webp',
    imagenMobile: '/portafolio/casos/mascontadores-mobile.webp',
    enLinea: false
  }
]

export function getCaso(slug: string): Caso | undefined {
  return CASOS.find((c) => c.slug === slug)
}
