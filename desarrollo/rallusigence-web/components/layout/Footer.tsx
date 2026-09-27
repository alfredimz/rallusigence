'use client'

import Image from 'next/image'
import Link from 'next/link'
import { trackWhatsAppClick } from '@/lib/analytics'
import { EMAIL, WHATSAPP_DISPLAY, waLink } from '@/lib/contacto'
import { SERVICIOS } from '@/lib/servicios'
import styles from './Footer.module.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const empresaLinks = [
    { label: 'Nosotros', href: '/nosotros' },
    { label: 'Portafolio', href: '/portafolio' },
    { label: 'Cómo funciona', href: '/como-funciona' },
    { label: 'Paquetes', href: '/paquetes' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contacto', href: '/#contacto' }
  ]

  const serviceLinks = SERVICIOS.map((s) => ({ label: s.nombre, href: `/servicios/${s.slug}` }))

  const contactInfo = [
    {
      label: 'WhatsApp',
      href: waLink(),
      text: `WhatsApp: ${WHATSAPP_DISPLAY}`,
      isWhatsApp: true
    },
    {
      label: 'Email',
      href: `mailto:${EMAIL}`,
      text: EMAIL,
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
            <Link href="/" className={styles.logo}>
              <Image
                src="/assets/letras-icono-horizontal.svg"
                alt="Rallusigence"
                width={160}
                height={40}
              />
            </Link>
            <p className={styles.tagline}>
              Tu negocio en internet en 3 días.
            </p>
          </div>

          {/* Empresa Column */}
          <div className={styles.section}>
            <h3 className={styles.title}>Empresa</h3>
            <nav aria-label="Enlaces de la empresa">
              {empresaLinks.map((link) => (
                <Link key={link.href} href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services Column */}
          <div className={styles.section}>
            <h3 className={styles.title}>Servicios</h3>
            <nav aria-label="Enlaces de servicios">
              {serviceLinks.map((link) => (
                <Link key={link.href} href={link.href} className={styles.link}>
                  {link.label}
                </Link>
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
              <Link key={link.href} href={link.href} className={styles.legalLink}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}