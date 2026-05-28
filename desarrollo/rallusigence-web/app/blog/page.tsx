import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'
import styles from './page.module.css'

export const metadata = {
  title: 'Blog — Sitios web e IA para tu negocio | Rallusigence',
  description: 'Artículos sobre sitios web, IA y marketing digital para PYMEs mexicanas.',
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default function Blog() {
  const posts = getAllPosts()

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className="rs-h1">Blog — Sitios web e IA para tu negocio</h1>

          <p className={styles.description}>
            Estrategias prácticas para hacer crecer tu negocio en internet.
            Sin teoría, solo lo que realmente funciona.
          </p>

          {posts.length === 0 ? (
            <div className={styles.emptyState}>
              <p>Pronto publicamos el primer artículo.</p>
              <Link
                href="/#paquetes"
                className="rs-btn rs-btn--primary rs-btn--lg"
              >
                Mientras tanto, revisa nuestros paquetes
              </Link>
            </div>
          ) : (
            <div className={styles.postsGrid}>
              {posts.map((post) => (
                <article key={post.slug} className={styles.postCard}>
                  <header className={styles.postHeader}>
                    <h2 className={styles.postTitle}>
                      <Link href={`/blog/${post.slug}`}>
                        {post.frontmatter.title}
                      </Link>
                    </h2>
                    <time className={styles.postDate} dateTime={post.frontmatter.date}>
                      {formatDate(post.frontmatter.date)}
                    </time>
                  </header>

                  <p className={styles.postDescription}>
                    {post.frontmatter.description}
                  </p>

                  <footer className={styles.postFooter}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className={styles.readMore}
                    >
                      Leer artículo →
                    </Link>
                  </footer>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}