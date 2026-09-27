import type { Faq } from '@/lib/content/faqs'
import styles from './FaqList.module.css'

interface FaqListProps {
  faqs: Faq[]
}

// Server component: renderiza <details> accesibles y emite el JSON-LD
// FAQPage correspondiente a las preguntas recibidas — sin duplicar datos.
export default function FaqList({ faqs }: FaqListProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <div className={styles.grid}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqs.map((f, i) => (
        <details key={f.id} className={`${styles.item} reveal reveal--delay-${(i % 3) + 1}`}>
          <summary className={styles.question}>{f.q}</summary>
          <p className={styles.answer}>{f.a}</p>
        </details>
      ))}
    </div>
  )
}
