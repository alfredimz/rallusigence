import type { Metadata } from "next";
import Image from "next/image";
import "../globals.css";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: 'Auditoría digital gratis — Rallusigence',
  description: 'Revisamos tu web, redes y Google. Detectamos exactamente qué te está costando clientes. Sin compromiso.',
  keywords: 'auditoría digital gratis, análisis web gratis, revisar sitio web, auditoría SEO México',
  openGraph: {
    title: 'Auditoría digital gratis — Rallusigence',
    description: 'Revisamos tu web, redes y Google. Detectamos exactamente qué te está costando clientes.',
    url: 'https://rallusigence.net/auditoria-gratis',
    siteName: 'Rallusigence',
    locale: 'es_MX',
    type: 'website',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://rallusigence.net/auditoria-gratis' },
};

export default function AuditoriaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX">
      <body>
        {/* Header minimalista */}
        <header className={styles.header}>
          <div className={styles.headerContainer}>
            <a href="/" className={styles.logo}>
              <Image
                src="/assets/letras-icono-horizontal.svg"
                alt="Rallusigence"
                width={160}
                height={40}
                priority
              />
            </a>
            <a
              href="https://wa.me/52XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappLink}
            >
              WhatsApp
            </a>
          </div>
        </header>

        <main id="main">{children}</main>

        {/* Footer mínimo */}
        <footer className={styles.footer}>
          <div className={styles.footerContainer}>
            <p className={styles.legal}>
              © 2026 Rallusigence. No emitimos facturas.
            </p>
            <a href="/aviso-de-privacidad" className={styles.legalLink}>
              Aviso de privacidad
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}