// Catálogo de servicios de Rallusigence.
// Estructura heredada del método APTERYNET (2016-2024): pitch directo →
// checklist "qué incluye" → ventajas Costos/Tiempo/Resultados → bloque
// "Importante" (honestidad como diferenciador) → FAQ.

export interface Servicio {
  slug: string
  nombre: string
  kiwi: string
  titulo: string
  bajada: string
  precio: string
  precioNota: string
  queEs: string[]
  incluye: string[]
  ventajas: { costos: string; tiempo: string; resultados: string }
  importante: string
  faq: { q: string; a: string }[]
  ctaMsg: string
}

export const SERVICIOS: Servicio[] = [
  {
    slug: 'diseno-web',
    nombre: 'Diseño web',
    kiwi: '/assets/kiwis/kiwi-idea.svg',
    titulo: 'Tu sitio web profesional en 3 días',
    bajada: 'Diseñado con IA y revisado por especialistas. Precio fijo, código tuyo, cero mensualidades.',
    precio: 'Desde $6,000 MXN',
    precioNota: 'pago único · 3 paquetes con precio cerrado',
    queEs: [
      'Construimos tu sitio completo: diseño, textos, formularios, optimización para Google y para celular. Tú solo nos cuentas de tu negocio — nosotros hacemos el resto.',
      'A diferencia de una agencia tradicional (que cobra $40,000–$80,000 MXN y tarda hasta 2 meses), trabajamos con IA supervisada por especialistas: mismo nivel profesional, fracción del precio y del tiempo.',
      'Y lo más importante: el sitio queda EN TUS CUENTAS. Hosting, dominio y código fuente son tuyos desde el día uno. Si mañana no quieres saber de nosotros, tu sitio sigue siendo tuyo.'
    ],
    incluye: [
      'Diseño profesional mobile-first',
      'Textos que venden (no de relleno)',
      'Formulario de contacto funcional',
      'Optimización de velocidad (fuentes, imágenes, código)',
      'SEO básico: títulos, descripciones, sitemap, datos estructurados',
      'Google Analytics configurado',
      'Dominio y hosting en tus propias cuentas',
      'Código fuente completo, tuyo para siempre',
      'Certificado de seguridad SSL',
      'Entrega documentada: sabes usar lo que recibes'
    ],
    ventajas: {
      costos: 'Precio fijo publicado: $6,000, $12,000 o $20,000 según el paquete. Sin cotizaciones eternas ni extras sorpresa.',
      tiempo: 'De 3 a 12 días hábiles según el paquete, contados desde que tenemos tu información completa.',
      resultados: 'Un sitio que carga rápido, aparece en Google y convierte visitas en mensajes de WhatsApp.'
    },
    importante: 'Los 3 días corren desde que nos entregas tu información completa (textos base, fotos, datos de contacto). Si no la tienes lista, te ayudamos a armarla — pero el reloj empieza cuando está completa.',
    faq: [
      { q: '¿Qué necesito para empezar?', a: 'Contarnos qué hace tu negocio, a quién le vendes y cómo quieres que te contacten. Fotos y logo si los tienes; si no, te orientamos con opciones.' },
      { q: '¿El sitio es mío de verdad?', a: 'Sí. Hosting y dominio se registran en TUS cuentas y recibes el código fuente completo. No dependes de nosotros para nada después de la entrega.' },
      { q: '¿Cobran mensualidad?', a: 'No. Pagas una vez por la construcción. El hosting que usamos (Firebase) tiene capa gratuita que alcanza para la mayoría de los negocios, y el dominio (~$250 MXN/año) lo pagas directo al proveedor.' },
      { q: '¿Y si quiero cambios después?', a: 'Los cambios pequeños de la primera semana van incluidos. Después, cotizamos por bloque de cambios — o te enseñamos a hacerlos tú, el código es tuyo.' }
    ],
    ctaMsg: 'Hola Rallusigence, quiero mi sitio web. ¿Cómo empezamos?'
  },
  {
    slug: 'seo',
    nombre: 'Posicionamiento en Google (SEO)',
    kiwi: '/assets/kiwis/kiwi-analista.svg',
    titulo: 'Que te encuentren en Google cuando te buscan',
    bajada: 'SEO técnico + contenido con método probado desde 2016. La publicidad más duradera y barata que existe.',
    precio: 'Desde $2,500 MXN/mes',
    precioNota: 'incluye estudio de palabras clave y contenido mensual',
    queEs: [
      'Cuando alguien busca "dentista en Pachuca" o "renta de maquinaria CDMX", Google decide a quién mostrar. El SEO es el proceso para que ese resultado seas tú — sin pagar por cada clic.',
      'Usamos el método que hemos aplicado desde 2016: estudio de palabras clave transaccionales (las que usan quienes YA quieren comprar, no los curiosos), optimización técnica completa de tu sitio, y contenido mensual que responde lo que tu cliente pregunta.',
      'Hoy además optimizamos para los buscadores con IA (ChatGPT, Perplexity, AI Overviews de Google) — donde tus clientes ya están preguntando por servicios como el tuyo.'
    ],
    incluye: [
      'Estudio de palabras clave de tu negocio y tu zona',
      'Análisis de tu competencia real en Google',
      'Optimización técnica: velocidad, meta etiquetas, canonicals',
      'Datos estructurados (JSON-LD) para resultados enriquecidos',
      'Sitemap, robots.txt y Search Console configurados',
      'Contenido mensual optimizado (artículos que responden búsquedas reales)',
      'Optimización de Google Business Profile (mapa y reseñas)',
      'Optimización para buscadores con IA (AEO)',
      'Reporte mensual: posiciones, tráfico y qué sigue'
    ],
    ventajas: {
      costos: 'Una fracción de lo que cuesta la publicidad pagada — y el efecto se acumula: lo que posicionas hoy sigue trabajando en un año.',
      tiempo: 'Primeros movimientos en 4-8 semanas; resultados sólidos en 3-6 meses. El SEO es maratón, no sprint.',
      resultados: 'Aparecer en las búsquedas que traen clientes, no visitas. Medimos posiciones y contactos, no "impresiones".'
    },
    importante: 'El SEO da resultados en meses, no en días — y quien te "garantice el primer lugar en Google" te está mintiendo: nadie controla a Google. Lo que sí garantizamos: método serio, trabajo verificable cada mes y métricas reales.',
    faq: [
      { q: '¿Cuánto tarda en funcionar?', a: 'Entre 3 y 6 meses para resultados sólidos, dependiendo de tu competencia y del estado de tu sitio. Las mejoras técnicas se notan antes; el posicionamiento de contenido toma tiempo.' },
      { q: '¿Me sirve si mi negocio es local?', a: 'Especialmente. El SEO local (tu zona + tu servicio) es de lo más rentable que existe: menos competencia y búsquedas con intención de compra inmediata.' },
      { q: '¿Qué pasa si dejo de pagar?', a: 'Lo ya posicionado no desaparece de un día para otro — a diferencia de los anuncios, que se apagan al instante. Pero sin mantenimiento, la competencia eventualmente te alcanza.' },
      { q: '¿Trabajan sitios que no hicieron ustedes?', a: 'Sí. Empezamos con una auditoría para ver qué tiene y qué le falta a tu sitio actual. A veces conviene optimizarlo; a veces sale más barato rehacerlo.' }
    ],
    ctaMsg: 'Hola Rallusigence, me interesa el SEO para mi negocio. ¿Cómo funciona?'
  },
  {
    slug: 'bot-whatsapp',
    nombre: 'Agente de WhatsApp con IA',
    kiwi: '/assets/kiwis/kiwi-whatsapp.svg',
    titulo: 'Un agente que atiende tu WhatsApp 24/7',
    bajada: 'Responde al instante, califica clientes y agenda citas — mientras tú trabajas o duermes.',
    precio: 'Desde $3,500 MXN/mes',
    precioNota: 'configuración inicial + operación mensual',
    queEs: [
      'El 80% de los mensajes que recibe tu negocio son las mismas 10 preguntas: precios, horarios, ubicación, disponibilidad. Cada una que tardas horas en contestar es un cliente que le escribió a otro.',
      'Configuramos un agente con IA en tu WhatsApp que responde al instante, con tu información y tu tono. Entiende lenguaje natural — no es un menú robótico de "marque 1".',
      'Cuando la conversación requiere criterio humano (una negociación, un caso especial), el agente te la pasa con el contexto completo. Tú entras solo donde de verdad haces falta.'
    ],
    incluye: [
      'Agente con IA entrenado con la información de TU negocio',
      'Respuestas al instante, 24 horas, los 7 días',
      'Calificación de clientes: separa curiosos de compradores',
      'Toma de datos de contacto y motivo (leads listos)',
      'Transferencia a humano con contexto cuando hace falta',
      'Tono y personalidad configurados a tu marca',
      'Panel de conversaciones: ves todo lo que responde',
      'Ajustes mensuales según lo que pregunta la gente real'
    ],
    ventajas: {
      costos: 'Menos que medio sueldo de un asistente — y no pide vacaciones ni contesta de malas a las 11 de la noche.',
      tiempo: 'Configurado y respondiendo en menos de una semana.',
      resultados: 'Cero mensajes sin responder. El cliente que escribe a las 10 pm recibe respuesta a las 10 pm.'
    },
    importante: 'El agente resuelve lo repetitivo brillantemente, pero no reemplaza tu criterio: los casos complejos te los transfiere. Y necesita que mantengas su información al día — si cambias precios y no nos avisas, responderá los precios viejos.',
    faq: [
      { q: '¿Suena robótico?', a: 'No. Usa IA de lenguaje natural (la misma tecnología de ChatGPT) con tu tono. Tus clientes conversan normal, sin menús de números.' },
      { q: '¿Necesito un número nuevo?', a: 'Funciona con tu número actual de WhatsApp o con uno nuevo si prefieres separar. Te asesoramos según tu caso.' },
      { q: '¿Qué pasa con las conversaciones difíciles?', a: 'El agente detecta cuándo necesita ayuda humana y te transfiere la conversación con resumen incluido. Nunca inventa respuestas de cosas que no sabe.' },
      { q: '¿Puedo ver lo que responde?', a: 'Todo. Tienes acceso al historial completo de conversaciones y cada mes revisamos juntos qué preguntó la gente para afinar respuestas.' }
    ],
    ctaMsg: 'Hola Rallusigence, quiero el agente de WhatsApp con IA para mi negocio.'
  },
  {
    slug: 'tienda-online',
    nombre: 'Tienda online',
    kiwi: '/assets/kiwis/kiwi-carrito.svg',
    titulo: 'Vende en línea sin pagar comisiones de marketplace',
    bajada: 'Tu tienda propia con carrito, pagos y WhatsApp integrado. Tuya, no rentada.',
    precio: 'Desde $20,000 MXN',
    precioNota: 'pago único · corresponde al paquete Avanzado',
    queEs: [
      'Vender por marketplace está bien para empezar — hasta que haces cuentas de las comisiones y de que los clientes son de la plataforma, no tuyos.',
      'Construimos tu tienda propia: catálogo, carrito, pagos en línea y pedidos por WhatsApp (como compra la mayoría en México). Con tu marca, tus reglas y tu base de clientes.',
      'Como todo lo nuestro, la tienda queda en tus cuentas con tu código. Sin rentas mensuales de plataforma ni porcentajes por venta hacia nosotros.'
    ],
    incluye: [
      'Catálogo de productos administrable',
      'Carrito de compras y checkout optimizado',
      'Pagos en línea (tarjeta, transferencia, OXXO según pasarela)',
      'Pedidos directos por WhatsApp',
      'Cálculo de envíos configurable',
      'Sitio completo alrededor (no solo el catálogo)',
      '5 artículos de blog iniciales para SEO',
      'Optimización de velocidad avanzada',
      'Capacitación para administrarla tú mismo'
    ],
    ventajas: {
      costos: 'Pago único por la construcción. Las únicas comisiones que pagarás son las de la pasarela de pagos — que existirían en cualquier plataforma.',
      tiempo: '12 días hábiles desde que tenemos tu catálogo completo.',
      resultados: 'Un canal de venta propio que crece contigo, con clientes que son TUYOS (con su contacto) y no del marketplace.'
    },
    importante: 'Las pasarelas de pago (Stripe, Mercado Pago, etc.) cobran su propia comisión por transacción (~3-4%) — eso es de ellas, no nuestro, y pasa en cualquier tienda del mundo. También necesitas resolver tu logística de envíos; te orientamos, pero los paquetes los entregas tú o tu paquetería.',
    faq: [
      { q: '¿Puedo administrarla yo solo?', a: 'Sí — está pensada para eso. Subir productos, cambiar precios y ver pedidos es tan simple como usar redes sociales, y te capacitamos al entregar.' },
      { q: '¿Con cuántos productos puedo empezar?', a: 'Desde 5 hasta cientos. Si tienes muchos, te ayudamos a cargarlos en la entrega inicial.' },
      { q: '¿Qué pasarela de pagos me conviene?', a: 'Depende de tu volumen y tipo de cliente. En la llamada inicial te recomendamos la que menos comisión te coma según tu caso.' },
      { q: '¿Sirve para servicios, no solo productos?', a: 'Sí: citas pagadas, anticipos, paquetes de servicio. El carrito cobra; qué vendes lo defines tú.' }
    ],
    ctaMsg: 'Hola Rallusigence, quiero mi tienda online. ¿Qué necesitan de mí?'
  },
  {
    slug: 'anuncios',
    nombre: 'Anuncios en Google y Meta',
    kiwi: '/assets/kiwis/kiwi-cool.svg',
    titulo: 'Anuncios que traen clientes, no puros clics',
    bajada: 'Campañas en Google y Facebook/Instagram operadas con método — sin quemar tu presupuesto.',
    precio: 'A cotizar',
    precioNota: 'gestión mensual + tu presupuesto publicitario aparte',
    queEs: [
      'Los anuncios son el acelerador: mientras el SEO madura, Google Ads y Meta Ads ponen tu negocio frente a clientes HOY. Bien operados, cada peso invertido regresa con ganancia; mal operados, son la forma más rápida de quemar dinero.',
      'Operamos tus campañas con método: búsquedas con intención de compra en Google, segmentación real en Meta, anuncios que llevan a páginas diseñadas para convertir (no a tu home genérico), y optimización semanal con datos.',
      'Reportamos lo que importa: cuánto costó cada cliente potencial y de dónde vino — no "alcance" ni métricas de humo.'
    ],
    incluye: [
      'Configuración profesional de cuentas (Google Ads / Meta)',
      'Investigación de palabras clave y audiencias',
      'Redacción de anuncios (varias versiones a prueba)',
      'Landing page enfocada a convertir',
      'Píxel y conversiones bien medidos (sin esto, todo es adivinar)',
      'Optimización semanal: apagar lo que no sirve, escalar lo que sí',
      'Protección de presupuesto: topes y exclusiones',
      'Reporte mensual en español claro: costo por cliente potencial'
    ],
    ventajas: {
      costos: 'Cobramos gestión fija — no un porcentaje de tu presupuesto, para que nuestra recomendación de cuánto invertir sea honesta.',
      tiempo: 'Campañas al aire en la primera semana. Optimización estabilizada en 3-4 semanas de datos.',
      resultados: 'Clientes potenciales con costo conocido. Sabes exactamente cuánto te cuesta conseguir un contacto.'
    },
    importante: 'El presupuesto de los anuncios se paga aparte, directo a Google/Meta — nosotros cobramos por operarlo bien. Y con menos de ~$3,000 MXN/mes de presupuesto publicitario, honestamente no vale la pena: los datos tardan demasiado en llegar. Si tu presupuesto es menor, empieza por SEO.',
    faq: [
      { q: '¿Google o Facebook? ¿Cuál me conviene?', a: 'Regla simple: si la gente BUSCA tu servicio ("plomero cerca de mí"), Google. Si tu producto se antoja al verlo, Meta. Muchos negocios necesitan ambos en distinta proporción — lo definimos con tu caso.' },
      { q: '¿Cuánto debo invertir en anuncios?', a: 'Depende de tu giro y tu zona, pero el piso realista para obtener datos útiles ronda los $3,000-$5,000 MXN/mes de presupuesto publicitario. Te damos un estimado honesto antes de empezar.' },
      { q: '¿En cuánto tiempo veo resultados?', a: 'Los primeros contactos pueden llegar la primera semana. El costo por cliente se estabiliza y mejora entre la semana 3 y 6, cuando ya hay datos para optimizar.' },
      { q: '¿Por qué no cobran porcentaje del presupuesto?', a: 'Porque genera un conflicto de interés: al porcentaje le conviene que gastes más. Con tarifa fija, nuestra única meta es que tu costo por cliente baje.' }
    ],
    ctaMsg: 'Hola Rallusigence, me interesan los anuncios en Google/Meta. ¿Me cotizan?'
  },
  {
    slug: 'automatizacion',
    nombre: 'Automatización con IA',
    kiwi: '/assets/kiwis/kiwi-tiempo.svg',
    titulo: 'Deja de hacer a mano lo que una máquina hace mejor',
    bajada: 'Conectamos tus herramientas y automatizamos lo repetitivo: seguimiento, recordatorios, reportes.',
    precio: 'Desde $5,000 MXN',
    precioNota: 'por automatización + $2,000/mes de operación',
    queEs: [
      'Cada semana pierdes horas en tareas que no requieren tu criterio: pasar datos de un lado a otro, mandar el mismo recordatorio, armar el mismo reporte, dar seguimiento a cotizaciones que se enfrían.',
      'Conectamos las herramientas que ya usas (WhatsApp, correo, hojas de cálculo, tu CRM) y construimos flujos que trabajan solos: el cliente llena un formulario → se registra → recibe respuesta → te notifica → y si no le contestas en X horas, te lo recuerda.',
      'Con IA en el flujo, la automatización además entiende: clasifica mensajes, resume conversaciones, redacta borradores. No es magia — es quitarte de encima lo mecánico.'
    ],
    incluye: [
      'Mapeo de tu proceso actual (qué haces a mano y cuánto te cuesta)',
      'Diseño del flujo automatizado',
      'Conexión de tus herramientas existentes',
      'IA donde aporta: clasificar, resumir, redactar',
      'Alertas y notificaciones a tu WhatsApp/correo',
      'Manejo de errores: si algo falla, te enteras',
      'Documentación del flujo en español claro',
      'Monitoreo y ajustes mensuales'
    ],
    ventajas: {
      costos: 'Se paga solo: una automatización que ahorra 5 horas semanales recupera su costo el primer mes.',
      tiempo: 'Automatizaciones típicas listas en 1-2 semanas.',
      resultados: 'Procesos que corren solos, sin depender de que alguien se acuerde. Menos errores, cero seguimientos olvidados.'
    },
    importante: 'Automatizamos procesos que YA funcionan — el caos automatizado sigue siendo caos, solo que más rápido. Si tu proceso está enredado, la primera parte del trabajo es ordenarlo juntos (y eso también te lo cobramos con gusto, porque es donde más valor vas a recibir).',
    faq: [
      { q: '¿Qué se puede automatizar?', a: 'Casi todo lo repetitivo: captura de leads, seguimiento de cotizaciones, recordatorios de citas, reportes periódicos, respuestas a correos frecuentes, sincronización entre herramientas. Si lo haces igual cada vez, probablemente se puede.' },
      { q: '¿Necesito cambiar mis herramientas?', a: 'Normalmente no. Trabajamos con lo que ya usas: WhatsApp, Gmail, Excel/Sheets, CRMs comunes. Solo si algo de tu stack es un callejón sin salida te proponemos alternativa.' },
      { q: '¿Y si el flujo falla?', a: 'Todo flujo lleva manejo de errores y alertas: si algo se rompe, te enteras al momento (y nosotros también). El plan mensual incluye el monitoreo.' },
      { q: '¿La IA no se equivoca?', a: 'Puede equivocarse, por eso la usamos donde el error es barato (clasificar, redactar borradores) y dejamos las decisiones importantes con confirmación humana. Diseñamos cada flujo según el costo de equivocarse.' }
    ],
    ctaMsg: 'Hola Rallusigence, quiero automatizar procesos de mi negocio. ¿Cómo empezamos?'
  }
]

export function getServicio(slug: string): Servicio | undefined {
  return SERVICIOS.find((s) => s.slug === slug)
}
