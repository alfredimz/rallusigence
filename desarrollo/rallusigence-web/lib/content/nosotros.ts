// Contenido de la página /nosotros.
// Fuentes: KIWINET/diseños/KiwiPortafolio/Curriculum_2019.pdf (fundación,
// filosofía), REGISTRO-AGENCIA.md (cifras históricas), PROJECTS.md (estado
// actual de Rallusigence), fase-1-research/propuesta-de-valor.md (modelo
// de pago y "lo que no somos").

export interface HistoriaItem {
  anio: number
  titulo: string
  texto: string
}

export interface CifraItem {
  valor: string
  etiqueta: string
  fuente: string
}

export interface ValorItem {
  titulo: string
  texto: string
}

export const nosotros = {
  hero: {
    titulo: 'No somos una agencia grande. Somos honestidad con IA.',
    bajada: 'Desde 2015 construimos sitios para negocios mexicanos. Hoy lo hacemos con IA supervisada por especialistas, precio fijo y sin mensualidades.'
  },

  historia: [
    {
      anio: 2015,
      titulo: 'Kiwinet, Ciudad de México',
      texto: 'En octubre de 2015 empezamos operando como Kiwinet: sitios web, diseño gráfico y hospedaje para negocios locales.'
    },
    {
      anio: 2017,
      titulo: 'Nace Apterynet',
      texto: 'Nos transformamos en Apterynet. El nombre viene de Apteryx, el nombre científico del kiwi —nuestro logo desde entonces— más internet.'
    },
    {
      anio: 2020,
      titulo: 'Clientes de años, no de proyectos sueltos',
      texto: 'Empresas como Creativos Espacios (cliente desde 2007) y SteamCleaning (2015-2022) confiaron en nosotros por años, no por un solo sitio.'
    },
    {
      anio: 2026,
      titulo: 'Rallusigence: IA supervisada por especialistas',
      texto: 'La misma honestidad de siempre, ahora con IA que construye más rápido. Precio fijo, entrega total, sin mensualidades.'
    }
  ] as HistoriaItem[],

  cifras: [
    {
      valor: '2015',
      etiqueta: 'año de fundación de la agencia',
      fuente: 'Curriculum_2019.pdf — "En octubre del 2015 iniciamos operaciones como Kiwinet"'
    },
    {
      valor: '66',
      etiqueta: 'negocios atendidos a lo largo de 3 eras',
      fuente: 'Registro_Maestro_Empresas.docx'
    },
    {
      valor: '+50',
      etiqueta: 'sitios web construidos',
      fuente: 'Registro_Maestro_Empresas.docx (carpeta SITIOS/, ~50 sitios documentados)'
    },
    {
      valor: '18',
      etiqueta: 'años con nuestro cliente más antiguo (Creativos Espacios, desde 2007)',
      fuente: 'REGISTRO-AGENCIA.md — relación documentada 2007-2025'
    }
  ] as CifraItem[],

  valores: [
    {
      titulo: 'Honestidad primero',
      texto: 'Es nuestro valor fundacional desde 2015: decimos lo que sí podemos hacer y lo que no, sin prometer de más.'
    },
    {
      titulo: 'Precio fijo, sin sorpresas',
      texto: 'El precio está publicado en el sitio. Lo que ves es lo que pagas, sin cotizaciones que duran semanas.'
    },
    {
      titulo: 'El sitio es tuyo',
      texto: 'Dominio, hosting y código quedan en tus cuentas. No dependes de nosotros después de la entrega.'
    },
    {
      titulo: 'Sin reuniones que no necesitas',
      texto: 'Todo el proceso corre por WhatsApp o chat. Tu tiempo vale y no te lo quitamos en juntas.'
    }
  ] as ValorItem[],

  loQueNoSomos: [
    'No somos una agencia de marketing: no hacemos campañas ni redes sociales (por ahora).',
    'No cobramos mensualidades de mantenimiento: entregamos y tú eres dueño total.',
    'No hacemos citas ni visitas presenciales: todo por WhatsApp o chat.',
    'No emitimos facturas: somos profesionistas independientes; el precio es lo que te ahorras en overhead corporativo.',
    'No usamos plantillas genéricas de Wix o Squarespace: cada sitio se construye específicamente para tu negocio.'
  ],

  modeloAnonimo: {
    titulo: 'Por qué no tenemos factura (y por qué eso te conviene)',
    texto: 'Operamos como un grupo de profesionistas independientes, no como una empresa con RFC y estructura corporativa. Eso nos permite cobrar precios más bajos porque no te trasladamos ese costo. A cambio, tienes tres garantías reales: si no cumplimos el plazo del paquete Lanzamiento, te devolvemos el 50% del anticipo; el código, el dominio y el hosting quedan en tus cuentas desde el primer día; y si el sitio no cumple lo acordado, lo corregimos antes de cobrarte el 50% restante.'
  }
}

export type Nosotros = typeof nosotros
