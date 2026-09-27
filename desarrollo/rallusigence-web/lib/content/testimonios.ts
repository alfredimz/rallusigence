// Testimonios reales de la agencia (era KIWINET, 2015-2019).
// Fuente: KIWINET/diseños/KiwiTrips/Triptico2019.pdf (19 testimonios) y
// Triptico.pdf (14 testimonios, subconjunto del anterior — sin nombres nuevos).
// Nombres de negocios y de quien dio el testimonio son públicos (impresos en
// trípticos comerciales repartidos por la agencia). No se incluyen nombres
// del equipo interno (modelo anónimo).

export interface Testimonio {
  id: string
  cita: string
  nombre: string
  negocio: string
  giro: string
  ciudad?: string
  anio?: number
  casoSlug?: string
  kiwi: string
}

export const TESTIMONIOS: Testimonio[] = [
  {
    id: 'hugo-mci',
    cita: 'Me encantó, el sitio es justo lo que buscaba.',
    nombre: 'Ing. Hugo',
    negocio: 'MCI',
    giro: 'Servicios profesionales',
    anio: 2019,
    casoSlug: 'mci',
    kiwi: '/assets/kiwis/kiwi-base.svg'
  },
  {
    id: 'alejandro-sipsaa',
    cita: 'Rapidísimo, programaron lo que nadie.',
    nombre: 'Lic. Alejandro',
    negocio: 'SIPSAA',
    giro: 'Despacho contable',
    anio: 2019,
    kiwi: '/assets/kiwis/kiwi-analista.svg'
  },
  {
    id: 'eduardo-jea',
    cita: 'Todo se ajustó a mi presupuesto.',
    nombre: 'Arq. Eduardo',
    negocio: 'JEA',
    giro: 'Anuncios y letreros',
    anio: 2019,
    kiwi: '/assets/kiwis/kiwi-pintor.svg'
  },
  {
    id: 'alberto-bunnyblu',
    cita: 'Emprendo mi negocio con el pie derecho.',
    nombre: 'Lic. Alberto',
    negocio: 'Bunny Blu',
    giro: 'Negocio de nueva creación',
    anio: 2019,
    kiwi: '/assets/kiwis/kiwi-idea.svg'
  },
  {
    id: 'basurto-sem',
    cita: 'Super honestos, mejoraron mi posicionamiento.',
    nombre: 'Sr. Basurto',
    negocio: 'SEM',
    giro: 'Mantenimiento y desazolve de drenajes',
    anio: 2019,
    kiwi: '/assets/kiwis/kiwi-desarrollo.svg'
  },
  {
    id: 'jacinto-hands',
    cita: 'Ahora mis clientes son gracias a ustedes.',
    nombre: 'Sr. Jacinto',
    negocio: 'Hands Editores',
    giro: 'Venta de material didáctico',
    anio: 2019,
    kiwi: '/assets/kiwis/kiwi-idea-circulo.svg'
  },
  {
    id: 'sergio-liquen',
    cita: 'Saturaron mi consultorio de citas.',
    nombre: 'Dr. Sergio',
    negocio: 'Terapéutico Liquen',
    giro: 'Consultorio de terapia',
    anio: 2019,
    casoSlug: 'liquen',
    kiwi: '/assets/kiwis/kiwi-buho.svg'
  },
  {
    id: 'mary-acacnx',
    cita: 'Nuestra imagen ahora es mejor, más fresca.',
    nombre: 'Mtra. Mary',
    negocio: 'ACACNX',
    giro: 'Academia de baile',
    anio: 2019,
    casoSlug: 'acacnx',
    kiwi: '/assets/kiwis/kiwi-cool.svg'
  },
  {
    id: 'alan-steamcleaning',
    cita: 'Me ayudan a acercarme a reconocidas marcas.',
    nombre: 'Ing. Alan Chávez',
    negocio: 'SteamCleaning',
    giro: 'Limpieza y desinfección a vapor',
    anio: 2019,
    casoSlug: 'steamcleaning',
    kiwi: '/assets/kiwis/kiwi-nube.svg'
  },
  {
    id: 'oskar-digitalprint',
    cita: 'Espectacular mi sitio en inglés para vender en USA.',
    nombre: 'Oskar Luna',
    negocio: 'Digital Print',
    giro: 'Impresión y artes gráficas (México y EUA)',
    anio: 2019,
    casoSlug: 'digital-print',
    kiwi: '/assets/kiwis/kiwi-lanzamiento.svg'
  },
  {
    id: 'escalante-puntoprint',
    cita: 'Todos mis clientes satisfechos con su trabajo.',
    nombre: 'Alejandro Escalante',
    negocio: 'El Punto Print House',
    giro: 'Imprenta',
    anio: 2019,
    kiwi: '/assets/kiwis/kiwi-tiendita.svg'
  },
  {
    id: 'cesar-perfecciona',
    cita: 'Mi consultoría se apoya de su experiencia.',
    nombre: 'Lic. César',
    negocio: 'Perfecciona',
    giro: 'Consultoría empresarial',
    anio: 2019,
    kiwi: '/assets/kiwis/kiwi-analista.svg'
  },
  {
    id: 'elsa-sactei',
    cita: 'Busqué empresas en internet, pero sólo ellos me convencieron con su experiencia.',
    nombre: 'Elsa González',
    negocio: 'Sactei',
    giro: 'Automatización industrial y suministros',
    anio: 2019,
    casoSlug: 'sactei',
    kiwi: '/assets/kiwis/kiwi-desarrollo.svg'
  },
  {
    id: 'pio-solfog',
    cita: 'Expandimos mercado de Corea a México con un sitio genial.',
    nombre: 'Pio',
    negocio: 'Solfog',
    giro: 'Cosméticos y cuidado de la piel (marca coreana)',
    anio: 2019,
    casoSlug: 'solfog',
    kiwi: '/assets/kiwis/kiwi-carrito.svg'
  },
  {
    id: 'raul-ibroken',
    cita: 'Resolvieron problemas en mi sitio que otra empresa provocó.',
    nombre: 'Raúl Echegaray',
    negocio: 'iBroken',
    giro: 'Reparación de iPhone',
    anio: 2019,
    kiwi: '/assets/kiwis/kiwi-smartphone.svg'
  },
  {
    id: 'david-ibbmicasa',
    cita: 'Nos ayudaron con la programación y desarrollo de nuestro sitio, gracias.',
    nombre: 'Ing. David',
    negocio: 'IBB Mi Casa',
    giro: 'Inmobiliaria',
    anio: 2019,
    kiwi: '/assets/kiwis/kiwi-base.svg'
  },
  {
    id: 'cecy-nutriologia',
    cita: 'Mi trabajo a domicilio creció con mi sitio web.',
    nombre: 'Dra. Cecy',
    negocio: 'Nutriología Integra',
    giro: 'Nutrición a domicilio',
    anio: 2019,
    kiwi: '/assets/kiwis/kiwi-entrega.svg'
  },
  {
    id: 'jorge-mariachi',
    cita: 'Reflejamos nuestra gran carrera con sus diseños.',
    nombre: 'Jorge Ramírez',
    negocio: 'Mariachi Estampa de México',
    giro: 'Mariachi y música en vivo',
    anio: 2019,
    kiwi: '/assets/kiwis/kiwi-traje.svg'
  },
  {
    id: 'anita-seprimex',
    cita: 'Excelentes diseños.',
    nombre: 'Lic. Anita',
    negocio: 'Seprimex',
    giro: 'Seguridad privada',
    anio: 2019,
    casoSlug: 'seprimex',
    kiwi: '/assets/kiwis/kiwi-huellas.svg'
  }
]

// 8 testimonios para el home: variedad de giros (salud, exportación, belleza,
// nutrición, tecnología, mantenimiento/SEO, educación, emprendimiento nuevo)
// con citas concretas y verificables.
export const destacados: string[] = [
  'sergio-liquen',
  'oskar-digitalprint',
  'pio-solfog',
  'cecy-nutriologia',
  'raul-ibroken',
  'basurto-sem',
  'jacinto-hands',
  'alberto-bunnyblu'
]

export function getTestimonio(id: string): Testimonio | undefined {
  return TESTIMONIOS.find((t) => t.id === id)
}
