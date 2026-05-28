import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPosts, getPostSlugs, getPostBySlug } from '@/lib/mdx'
import { parseMarkdownToHtml } from '@/lib/markdown'
import styles from './page.module.css'

// Genera rutas estáticas para todos los .mdx
export async function generateStaticParams() {
  return getPostSlugs().map(slug => ({ slug }))
}

// Metadata dinámica desde frontmatter
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const posts = getAllPosts()
  const post = posts.find(p => p.slug === slug)

  if (!post) {
    return {
      title: 'Artículo no encontrado | Rallusigence',
      description: 'El artículo que buscas no existe.',
    }
  }

  return {
    title: `${post.frontmatter.title} | Rallusigence Blog`,
    description: post.frontmatter.description,
    keywords: post.frontmatter.keywords,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: 'article',
      publishedTime: post.frontmatter.date,
      authors: [post.frontmatter.author],
    },
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const postData = getPostBySlug(slug)

  if (!postData) {
    notFound()
  }

  const { frontmatter, body } = postData
  const htmlContent = parseMarkdownToHtml(body)

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Navegación">
          <Link href="/">Inicio</Link>
          <span className={styles.separator}>›</span>
          <Link href="/blog">Blog</Link>
          <span className={styles.separator}>›</span>
          <span className={styles.current}>{frontmatter.title}</span>
        </nav>

        {/* Article Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>{frontmatter.title}</h1>

          <div className={styles.meta}>
            <time className={styles.date} dateTime={frontmatter.date}>
              {formatDate(frontmatter.date)}
            </time>
            <span className={styles.separator}>•</span>
            <span className={styles.author}>{frontmatter.author}</span>
          </div>

          <p className={styles.description}>{frontmatter.description}</p>
        </header>

        {/* Article Content */}
        <article
          className={styles.article}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* CTA Section */}
        <section className={styles.cta}>
          <div className={styles.ctaContent}>
            <h3>¿Te gustó este artículo?</h3>
            <p>
              Si quieres implementar estas estrategias en tu negocio,
              podemos ayudarte con una auditoría digital completamente gratis.
            </p>
            <Link
              href="/auditoria-gratis"
              className="rs-btn rs-btn--primary rs-btn--lg"
            >
              Solicita tu auditoría gratis
            </Link>
          </div>
        </section>

        {/* Back to Blog */}
        <nav className={styles.backNav}>
          <Link href="/blog" className={styles.backLink}>
            ← Volver al blog
          </Link>
        </nav>
      </div>
    </div>
  )
}