import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import ScrollRevealProvider from "@/components/ScrollRevealProvider";
import TabWink from "@/components/ui/TabWink";

const GA_ID = 'G-SN3THQ65T3'
const GTM_ID = 'GTM-TVTHCLQR'
const CLARITY_ID = 'y5zfbfdlon'
// Vacío hasta que Meta apruebe el portfolio — el pixel solo se inyecta si hay ID real
const META_PIXEL_ID = ''

export const metadata: Metadata = {
  metadataBase: new URL('https://rallusigence.net'),
  title: 'Rallusigence — Tu sitio web en 3 días',
  description: 'Sitio web profesional hecho con IA. Precio fijo. Tú eres el dueño desde el primer día. Sin mensualidades, sin letra chica.',
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
  verification: { google: 'FX3yrwESW6-D2h45lb2YzpQDa8gd_c--gkBbKXJgpXs' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX">
      <body>
        {/* Preload de fuentes críticas (WOFF2) */}
        <link rel="preload" href="/design-system/fonts/Montserrat-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/design-system/fonts/Montserrat-SemiBold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/design-system/fonts/PlayfairDisplay-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <ScrollRevealProvider />
        <TabWink />
        {children}

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

        {/* Google Tag Manager */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
          `}
        </Script>

        {/* Meta Pixel (Facebook/Instagram) — solo con ID real */}
        {META_PIXEL_ID && (
          <>
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
          </>
        )}

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