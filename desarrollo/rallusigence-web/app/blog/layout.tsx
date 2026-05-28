import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Blog — Rallusigence',
  description: 'Artículos sobre sitios web, IA y cómo crecer tu negocio en internet.',
  keywords: 'blog diseño web, sitios web México, consejos IA, automatización negocios',
  openGraph: {
    title: 'Blog — Rallusigence',
    description: 'Artículos sobre sitios web, IA y cómo crecer tu negocio en internet.',
    url: 'https://rallusigence.net/blog',
    siteName: 'Rallusigence',
    locale: 'es_MX',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}