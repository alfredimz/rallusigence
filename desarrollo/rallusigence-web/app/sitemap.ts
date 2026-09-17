import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/mdx'
import { SERVICIOS } from '@/lib/servicios'

export const dynamic = 'force-static'

const BASE_URL = 'https://rallusigence.net'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE_URL}/paquetes`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/auditoria-gratis`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/como-funciona`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/portafolio`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/servicios`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    ...SERVICIOS.map((s) => ({
      url: `${BASE_URL}/servicios/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE_URL}/aviso-de-privacidad`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE_URL}/terminos-y-condiciones`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
  ]

  const posts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.date),
    changeFrequency: 'yearly',
    priority: 0.5,
  }))

  return [...staticPages, ...posts]
}
