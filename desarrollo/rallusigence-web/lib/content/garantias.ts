// 4 badges de garantía para hero/cards.
// Fuente: fase-1-research/propuesta-de-valor.md (Pilar 3, garantía del
// paquete Lanzamiento) y fase-2-identidad/copywriting-sitio.md (FAQ).

export interface Garantia {
  id: string
  titulo: string
  texto: string
  kiwi: string
}

export const GARANTIAS: Garantia[] = [
  {
    id: 'dominio-codigo-tuyos',
    titulo: 'Dominio y código tuyos',
    texto: 'Hosting, dominio y código fuente quedan en tus cuentas desde el primer día.',
    kiwi: '/assets/kiwis/kiwi-dominios.svg'
  },
  {
    id: 'entrega-3-dias',
    titulo: 'Lanzamiento en 3 días hábiles',
    texto: 'Lanzamiento en 3 días hábiles o te devolvemos el 50% del anticipo (aplica al paquete Lanzamiento).',
    kiwi: '/assets/kiwis/kiwi-tiempo.svg'
  },
  {
    id: 'precio-fijo-publicado',
    titulo: 'Precio fijo publicado',
    texto: '$6,000, $12,000 o $20,000 MXN. El precio está publicado, sin cotizar.',
    kiwi: '/assets/kiwis/kiwi-cool.svg'
  },
  {
    id: 'sin-mensualidades',
    titulo: 'Sin mensualidades',
    texto: 'Pagas una vez por la construcción. No hay renta ni cuota recurrente con nosotros.',
    kiwi: '/assets/kiwis/kiwi-nube.svg'
  }
]

export function getGarantia(id: string): Garantia | undefined {
  return GARANTIAS.find((g) => g.id === id)
}
