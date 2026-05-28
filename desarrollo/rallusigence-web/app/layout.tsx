import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollRevealProvider from "@/components/ScrollRevealProvider";

const GA_ID = 'G-XXXXXXXXXX' // reemplazar con ID real de GA4
const META_PIXEL_ID = 'TU_PIXEL_ID' // Alfredo reemplaza con ID real

export const metadata: Metadata = {
  metadataBase: new URL('https://rallusigence.net'),
  title: 'Rallusigence — Tu sitio web en 3 días',
  description: 'Sitio web profesional hecho con IA. Precio fijo. Tú eres el dueño desde el primer día. Sin mensualidades, sin letra chica.',
  keywords: 'sitio web profesional, diseño web México, agencia web México, sitio web barato, sitio web rápido',
  openGraph: {
    title: 'Rallusigence — Tu sitio web en 3 días',
    description: 'Sitio web profesional hecho con IA. Precio fijo desde $6,000 MXN.',
    url: 'https://rallusigence.net',
    siteName: 'Rallusigence',
    locale: 'es_MX',
    type: 'website',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://rallusigence.net' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX">
      <body>
        <ScrollRevealProvider />
        <Header />
        {children}
        <Footer />

        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { page_path: window.location.pathname });
          `}
        </Script>

        {/* Meta Pixel (Facebook/Instagram) */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img height="1" width="1" style={{display:'none'}}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Rallusigence",
              "description": "Agencia de sitios web con IA para PYMEs mexicanas",
              "url": "https://rallusigence.net",
              "areaServed": { "@type": "Country", "name": "Mexico" },
              "priceRange": "$$",
              "offers": { "@type": "Offer", "priceCurrency": "MXN", "price": "6000" }
            })
          }}
        />
      </body>
    </html>
  );
}