// Catálogo de las 18 plantillas comerciales listas para demo/venta.
// Fuente: plantillas/<slug>/README.md (un README por plantilla).
// paqueteSugerido asignado según complejidad real de cada plantilla:
// catálogos grandes y cotizadores multi-variable -> avanzado,
// catálogo + cotizador simple -> profesional, landing de una pieza -> lanzamiento.

export type CategoriaDemo = 'salud' | 'profesionales' | 'comida-eventos' | 'industria-servicios' | 'deporte-educacion'

export const CATEGORIAS_DEMO: { id: CategoriaDemo; label: string }[] = [
  { id: 'salud', label: 'Salud' },
  { id: 'profesionales', label: 'Profesionales' },
  { id: 'comida-eventos', label: 'Comida y eventos' },
  { id: 'industria-servicios', label: 'Industria y servicios' },
  { id: 'deporte-educacion', label: 'Deporte y educación' }
]

export interface Demo {
  slug: string
  categoria: CategoriaDemo
  nombre: string
  giro: string
  descripcion: string
  destacados: string[]
  paqueteSugerido: 'lanzamiento' | 'profesional' | 'avanzado'
  imagen: string
  imagenMobile: string
}

export const DEMOS: Demo[] = [
  {
    slug: 'academia-baile',
    categoria: 'deporte-educacion',
    nombre: 'Ritmo & Pasión',
    giro: 'Academia de baile y coreografías',
    descripcion: 'Vende clases de salsa, bachata y coreografías de XV años con cotizador directo a WhatsApp.',
    destacados: [
      'Cotizador por disciplina, nivel y frecuencia',
      'Horarios interactivos por nivel',
      'Testimonios de alumnos y mamás de quinceañeras'
    ],
    paqueteSugerido: 'profesional',
    imagen: '/portafolio/demos/academia-baile.webp',
    imagenMobile: '/portafolio/demos/academia-baile-mobile.webp'
  },
  {
    slug: 'arquitectura-modular',
    categoria: 'industria-servicios',
    nombre: 'Modulsteel',
    giro: 'Arquitectura modular y contenedores',
    descripcion: 'Catálogo técnico de casetas y contenedores con cotizador B2B para constructoras.',
    destacados: [
      'Cotizador por dimensión (10, 20 y 40 pies)',
      'Ficha técnica de acabados interiores y exteriores',
      'Proceso constructivo en 4 fases'
    ],
    paqueteSugerido: 'avanzado',
    imagen: '/portafolio/demos/arquitectura-modular.webp',
    imagenMobile: '/portafolio/demos/arquitectura-modular-mobile.webp'
  },
  {
    slug: 'clinica-veterinaria',
    categoria: 'salud',
    nombre: 'Clínica Veterinaria San Antón',
    giro: 'Clínica veterinaria',
    descripcion: 'Agenda urgencias y consultas de mascotas las 24 horas sin perder ninguna llamada.',
    destacados: [
      'Selector de cita por especie y servicio',
      'Top bar de urgencias 24/7',
      'Testimonios con nombre de mascota y caso clínico'
    ],
    paqueteSugerido: 'profesional',
    imagen: '/portafolio/demos/clinica-veterinaria.webp',
    imagenMobile: '/portafolio/demos/clinica-veterinaria-mobile.webp'
  },
  {
    slug: 'consultorio-terapia',
    categoria: 'salud',
    nombre: 'Centro Sereno',
    giro: 'Consultorio de psicología y terapia',
    descripcion: 'Agenda citas de terapia con discreción, sin exponer la identidad de tus pacientes.',
    destacados: [
      'Selector de modalidad online o presencial',
      'Testimonios con identidad protegida',
      'Ribbon de confidencialidad y cédulas profesionales'
    ],
    paqueteSugerido: 'profesional',
    imagen: '/portafolio/demos/consultorio-terapia.webp',
    imagenMobile: '/portafolio/demos/consultorio-terapia-mobile.webp'
  },
  {
    slug: 'dermatologia-velvet',
    categoria: 'salud',
    nombre: 'Velvet Skin & Derma',
    giro: 'Dermatología y medicina estética',
    descripcion: 'Muestra resultados reales con un slider de antes y después que convierte visitas en citas.',
    destacados: [
      'Slider interactivo de antes y después',
      'Cotizador por tratamiento y modalidad',
      'Catálogo de tratamientos con filtros'
    ],
    paqueteSugerido: 'avanzado',
    imagen: '/portafolio/demos/dermatologia-velvet.webp',
    imagenMobile: '/portafolio/demos/dermatologia-velvet-mobile.webp'
  },
  {
    slug: 'despacho-abogados',
    categoria: 'profesionales',
    nombre: 'Víctor & Asociados',
    giro: 'Despacho de abogados',
    descripcion: 'Capta consultas urgentes las 24 horas con un formulario de evaluación jurídica confidencial.',
    destacados: [
      'Formulario de evaluación jurídica confidencial',
      'Barra de urgencias penales 24/7',
      'FAQ sobre costos y honorarios a resultados'
    ],
    paqueteSugerido: 'profesional',
    imagen: '/portafolio/demos/despacho-abogados.webp',
    imagenMobile: '/portafolio/demos/despacho-abogados-mobile.webp'
  },
  {
    slug: 'despacho-contable',
    categoria: 'profesionales',
    nombre: 'Más Contadores',
    giro: 'Despacho contable y fiscal',
    descripcion: 'Cotiza honorarios por régimen fiscal y capta clientes con un diagnóstico gratuito.',
    destacados: [
      'Calculador de honorarios por régimen fiscal',
      'Diagnóstico fiscal gratuito como lead magnet',
      'FAQ especializada en trámites del SAT'
    ],
    paqueteSugerido: 'avanzado',
    imagen: '/portafolio/demos/despacho-contable.webp',
    imagenMobile: '/portafolio/demos/despacho-contable-mobile.webp'
  },
  {
    slug: 'eventos-ludoteca',
    categoria: 'comida-eventos',
    nombre: 'Viluderia Party',
    giro: 'Salón de fiestas infantiles',
    descripcion: 'Cotiza paquetes de fiesta infantil con extras y apartado directo a WhatsApp.',
    destacados: [
      'Calculador de paquetes con extras (slime, inflables, candy bar)',
      'Galería de recorrido por las áreas',
      'FAQ sobre comida externa y sanitización'
    ],
    paqueteSugerido: 'profesional',
    imagen: '/portafolio/demos/eventos-ludoteca.webp',
    imagenMobile: '/portafolio/demos/eventos-ludoteca-mobile.webp'
  },
  {
    slug: 'gimnasio-fitness',
    categoria: 'deporte-educacion',
    nombre: 'ACANX Fight & Fit',
    giro: 'Gimnasio y artes marciales',
    descripcion: 'Convierte visitantes en socios con un pase de un día gratis y una tabla de membresías clara.',
    destacados: [
      'Pase de un día gratis como lead magnet',
      'Tabla de membresías sin contratos forzosos',
      'Catálogo de disciplinas con fotos reales'
    ],
    paqueteSugerido: 'profesional',
    imagen: '/portafolio/demos/gimnasio-fitness.webp',
    imagenMobile: '/portafolio/demos/gimnasio-fitness-mobile.webp'
  },
  {
    slug: 'gruas-transporte',
    categoria: 'industria-servicios',
    nombre: 'Montes Grúas & Maniobras',
    giro: 'Grúas y transporte de carga',
    descripcion: 'Cotiza maniobras y fletes por tonelaje con catálogo de grúas y montacargas.',
    destacados: [
      'Cotizador por tonelaje, origen y destino',
      'Catálogo de grúas telescópicas, Titán y lowboy',
      'Galería de maniobras industriales reales'
    ],
    paqueteSugerido: 'avanzado',
    imagen: '/portafolio/demos/gruas-transporte.webp',
    imagenMobile: '/portafolio/demos/gruas-transporte-mobile.webp'
  },
  {
    slug: 'inmobiliaria-propiedades',
    categoria: 'profesionales',
    nombre: 'IBB Mi Casa',
    giro: 'Inmobiliaria y bienes raíces',
    descripcion: 'Muestra propiedades con calculadora hipotecaria y contacto directo por inmueble.',
    destacados: [
      'Calculadora hipotecaria por enganche y plazo',
      'Botón de consulta directa por propiedad',
      'Filtros por tipo de propiedad'
    ],
    paqueteSugerido: 'avanzado',
    imagen: '/portafolio/demos/inmobiliaria-propiedades.webp',
    imagenMobile: '/portafolio/demos/inmobiliaria-propiedades-mobile.webp'
  },
  {
    slug: 'invitaciones-rsvp',
    categoria: 'comida-eventos',
    nombre: 'Invitación Digital XV Años / Bodas',
    giro: 'Invitación digital para bodas y XV años',
    descripcion: 'Sustituye la invitación de papel con cuenta regresiva, itinerario y confirmación por WhatsApp.',
    destacados: [
      'Cuenta regresiva en tiempo real',
      'Enlaces directos a Google Maps y Waze',
      'Confirmación de asistencia (RSVP) por WhatsApp'
    ],
    paqueteSugerido: 'lanzamiento',
    imagen: '/portafolio/demos/invitaciones-rsvp.webp',
    imagenMobile: '/portafolio/demos/invitaciones-rsvp-mobile.webp'
  },
  {
    slug: 'limpieza-vapor',
    categoria: 'industria-servicios',
    nombre: 'SteamCleaning Pro',
    giro: 'Limpieza y desinfección a vapor',
    descripcion: 'Cotiza limpieza a vapor por número de piezas con presupuesto calculado al instante.',
    destacados: [
      'Cotizador por número de piezas y sillones',
      'Filtros residencial y comercial/industrial',
      'Infografía del proceso de higienización a 180°C'
    ],
    paqueteSugerido: 'profesional',
    imagen: '/portafolio/demos/limpieza-vapor.webp',
    imagenMobile: '/portafolio/demos/limpieza-vapor-mobile.webp'
  },
  {
    slug: 'mariachi-show',
    categoria: 'comida-eventos',
    nombre: 'Mariachi Gala de México',
    giro: 'Mariachi y música en vivo',
    descripcion: 'Cotiza serenatas y horas de mariachi con buscador de repertorio en tiempo real.',
    destacados: [
      'Buscador de repertorio en tiempo real',
      'Catálogo de paquetes con precios transparentes',
      'Cotizador con envío directo a WhatsApp'
    ],
    paqueteSugerido: 'profesional',
    imagen: '/portafolio/demos/mariachi-show.webp',
    imagenMobile: '/portafolio/demos/mariachi-show-mobile.webp'
  },
  {
    slug: 'pasteleria-reposteria',
    categoria: 'comida-eventos',
    nombre: 'Maison Sucrée',
    giro: 'Pastelería y repostería de autor',
    descripcion: 'Calcula el precio de un pastel por porciones, pisos y sabores en tiempo real.',
    destacados: [
      'Slider de porciones de 15 a 250 personas',
      'Selección de sabores, cobertura y pisos',
      'Menú digital QR escaneable'
    ],
    paqueteSugerido: 'avanzado',
    imagen: '/portafolio/demos/pasteleria-reposteria.webp',
    imagenMobile: '/portafolio/demos/pasteleria-reposteria-mobile.webp'
  },
  {
    slug: 'reparacion-computo',
    categoria: 'industria-servicios',
    nombre: 'CompuFix Pro',
    giro: 'Reparación de cómputo y celulares',
    descripcion: 'Cotiza reparaciones de laptop y celular por tipo de falla con diagnóstico gratis.',
    destacados: [
      'Calculador de cotización por tipo de falla',
      'Barra de diagnóstico gratis el mismo día',
      'FAQ sobre refacciones originales y respaldo de datos'
    ],
    paqueteSugerido: 'profesional',
    imagen: '/portafolio/demos/reparacion-computo.webp',
    imagenMobile: '/portafolio/demos/reparacion-computo-mobile.webp'
  },
  {
    slug: 'restaurante-delivery',
    categoria: 'comida-eventos',
    nombre: 'Dalel Bistro',
    giro: 'Restaurante y delivery',
    descripcion: 'Vende por WhatsApp sin pagar el 30% de comisión de las apps de delivery.',
    destacados: [
      'Menú digital con filtros por categoría',
      'Builder de comandas a domicilio',
      'Botón de pedido directo por platillo'
    ],
    paqueteSugerido: 'avanzado',
    imagen: '/portafolio/demos/restaurante-delivery.webp',
    imagenMobile: '/portafolio/demos/restaurante-delivery-mobile.webp'
  },
  {
    slug: 'seguridad-privada',
    categoria: 'profesionales',
    nombre: 'Vanguardia Táctica',
    giro: 'Seguridad privada B2B',
    descripcion: 'Cotiza guardias y custodias por turno y elemento con formato técnico B2B.',
    destacados: [
      'Cotizador por elemento, turno y equipamiento',
      'Casos de éxito en parques industriales y CEDIS',
      'FAQ normativo REPSE y SSPC'
    ],
    paqueteSugerido: 'avanzado',
    imagen: '/portafolio/demos/seguridad-privada.webp',
    imagenMobile: '/portafolio/demos/seguridad-privada-mobile.webp'
  }
]

export function getDemo(slug: string): Demo | undefined {
  return DEMOS.find((d) => d.slug === slug)
}
