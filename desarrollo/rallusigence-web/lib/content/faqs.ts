export interface Faq {
  id: string
  q: string
  a: string
  tags: ('paquetes' | 'general' | 'pago' | 'entrega')[]
}

// FAQ de /paquetes — usadas por <FaqList> (emite FAQPage JSON-LD automáticamente).
export const FAQS_PAQUETES: Faq[] = [
  {
    id: 'que-incluye-cada-paquete',
    q: '¿Qué incluye cada paquete y cuál me conviene?',
    a: 'Lanzamiento = landing 1 página para empezar a aparecer en Google; Profesional = sitio 5-7 páginas con blog y Analytics para negocios establecidos; Avanzado = todo + tienda online + WhatsApp integrado; si dudas, escríbenos y te decimos cuál en 2 minutos.',
    tags: ['paquetes'],
  },
  {
    id: 'sitio-me-pertenece',
    q: '¿El sitio me pertenece después de la entrega?',
    a: 'Sí, completamente. Código, hosting y dominio quedan en tus cuentas. Sin dependencias.',
    tags: ['general', 'entrega'],
  },
  {
    id: 'costo-mantener-sitio',
    q: '¿Cuánto me cuesta mantener el sitio después?',
    a: 'Firebase gratuito cubre la mayoría de sitios pequeños. El dominio cuesta $200-500 MXN/año. Se lo pagas directamente a los proveedores, no a nosotros.',
    tags: ['pago', 'general'],
  },
  {
    id: 'cambios-despues-entrega',
    q: '¿Puedo pedir cambios después de la entrega?',
    a: 'Cambios menores los haces tú mismo con la guía. Cambios mayores se cotizan por separado.',
    tags: ['entrega', 'general'],
  },
  {
    id: 'no-quedo-satisfecho',
    q: '¿Qué pasa si no quedo satisfecho?',
    a: 'Si el sitio no cumple con lo acordado, lo corregimos sin costo antes de cobrar el 50% restante.',
    tags: ['pago', 'general'],
  },
  {
    id: 'dueno-dominio-hosting',
    q: '¿Quién es dueño del dominio y el hosting?',
    a: 'Tú. Se registran en tus propias cuentas desde el día uno — no dependes de nosotros para nada después de la entrega.',
    tags: ['general', 'entrega'],
  },
  {
    id: 'rondas-de-cambios',
    q: '¿Cuántas rondas de cambios incluye?',
    a: '2 rondas antes de entregar. Después, cambios menores sin costo los primeros 15 días.',
    tags: ['entrega'],
  },
  {
    id: 'no-me-gusta-resultado',
    q: '¿Qué pasa si no me gusta el resultado?',
    a: 'Lo corregimos sin costo antes de cobrar el 50% restante.',
    tags: ['pago', 'entrega'],
  },
  {
    id: 'pagar-en-partes',
    q: '¿Puedo pagar en partes?',
    a: '50% para arrancar, 50% al entregar. Por ahora sin meses sin intereses.',
    tags: ['pago'],
  },
  {
    id: 'que-enviar-para-empezar',
    q: '¿Qué necesito enviarles para empezar?',
    a: 'Logo si tienes, textos o nos cuentas por WhatsApp, fotos, y datos de contacto — nosotros hacemos el resto.',
    tags: ['paquetes', 'general'],
  },
]
