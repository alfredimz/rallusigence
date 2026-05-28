import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/gracias', '/api/'],
      },
    ],
    sitemap: 'https://rallusigence.net/sitemap.xml',
  }
}
