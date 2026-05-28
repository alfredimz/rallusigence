'use client'

import Image from 'next/image'
import { trackWhatsAppClick } from '@/lib/analytics'
import styles from './Footer.module.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const serviceLinks = [
    { label: 'Paquetes', href: '/#paquetes' },
    { label: 'Cómo funciona', href: '/#como-funciona' },
    { label: 'Blog', href: '/blog' }
  ]

  const contactInfo = [
    {
      label: 'WhatsApp',
      href: 'https://wa.me/52XXXXXXXXXX',
      text: '+52 XXX XXX XXXX',
      isWhatsApp: true
    },
    {
      label: 'Email',
      href: 'mailto:hola@rallusigence.net',
      text: 'hola@rallusigence.net',
      isWhatsApp: false
    }
  ]

  const legalLinks = [
    { label: 'Aviso de privacidad', href: '/aviso-de-privacidad' },
    { label: 'Términos y condiciones', href: '/terminos-y-condiciones' }
  ]

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Brand Column */}
          <div className={styles.brand}>
            <a href="/" className={styles.logo}>
              <Image
                src="/assets/letras-icono-horizontal.svg"
                alt="Rallusigence"
                width={160}
                height={40}
              />
            </a>
            <p className={styles.tagline}>
              Tu negocio en internet en 3 días.
            </p>
          </div>

          {/* Services Column */}
          <div className={styles.section}>
            <h3 className={styles.title}>Servicios</h3>
            <nav aria-label="Enlaces de servicios">
              {serviceLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={styles.link}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Column */}
          <div className={styles.section}>
            <h3 className={styles.title}>Contacto</h3>
            <div className={styles.contactList}>
              {contactInfo.map((contact) => (
                <a
                  key={contact.href}
                  href={contact.href}
                  className={styles.link}
                  {...(contact.isWhatsApp && {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    onClick: () => trackWhatsAppClick('footer')
                  })}
                >
                  {contact.text}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Legal Section */}
        <div className={styles.legal}>
          <p className={styles.copyright}>
            © {currentYear} Rallusigence. Operamos como grupo de profesionistas independientes. No emitimos facturas.
          </p>
          <div className={styles.legalLinks}>
            {legalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={styles.legalLink}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}