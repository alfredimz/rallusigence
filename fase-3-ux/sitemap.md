# SITEMAP — Rallusigence
# Arquitectura del sitio web | Abril 2026

---

## DECISIÓN DE ESTRUCTURA: **SINGLE-PAGE + LANDING ESPECÍFICA**

**Justificación:**
- **Audiencia mobile-first:** Dr. Roberto y María Elena navegan desde celular
- **Conversión:** Un solo CTA principal (auditoría gratis) reduce fricción
- **SEO futuro:** Single-page para MVP, blog separado después
- **Carga rápida:** No hay navegación entre páginas, menos requests
- **Ads optimizado:** Landing específica para tráfico pagado sin distracciones

---

## ARQUITECTURA COMPLETA

```
rallusigence.com/
├── / ─────────────── HOME (single-page)
│   ├── #hero
│   ├── #problema  
│   ├── #servicios
│   ├── #como-funciona
│   ├── #por-que-rallusigence
│   ├── #testimonios
│   └── #contacto
│
├── /auditoria-gratis ── LANDING PAGE (ads)
│
└── /gracias ─────────── PÁGINA CONFIRMACIÓN
```

---

## DETALLE POR PÁGINA/SECCIÓN

### **/ HOME (single-page)**
- **URL:** `https://rallusigence.com/`
- **Propósito:** Mostrar propuesta completa, educar, convertir
- **Audiencia:** Ambas personas (Dr. Roberto y María Elena)
- **CTA principal:** "Auditoría gratis" (sticky en mobile)
- **CTAs secundarios:** 
  - "WhatsApp directo" (header)
  - "Agenda videollamada" (sección servicios)

**Anclas de navegación:**
- `#hero` → "Tu negocio automatizado sin complicarte"
- `#problema` → 3 dolores principales del cliente
- `#servicios` → 5 servicios con precios visibles
- `#como-funciona` → 4 pasos del proceso
- `#por-que-rallusigence` → 3 diferenciadores clave
- `#testimonios` → Prueba social de clientes reales
- `#contacto` → Formulario principal + datos de contacto

---

### **/auditoria-gratis (landing page)**
- **URL:** `https://rallusigence.com/auditoria-gratis`
- **Propósito:** Capturar leads de Google/Facebook Ads sin distracciones
- **Audiencia:** Prospecto frío que hizo clic en anuncio
- **CTA único:** "Solicitar auditoría gratis" (formulario)

**Elementos específicos:**
- Hero directo: "Auditoría digital gratis para tu negocio"
- 3 beneficios de la auditoría (bullets)
- Formulario corto: nombre, negocio, WhatsApp, email
- Prueba social mínima: "500+ negocios auditados"
- Sin navegación completa (solo logo + WhatsApp)
- Sin footer completo (reduce escape)

**Targeting ads:**
- Dr. Roberto: "Más pacientes por Google" 
- María Elena: "Más clientes en redes sociales"

---

### **/gracias (confirmación)**
- **URL:** `https://rallusigence.com/gracias`
- **Propósito:** Confirmar envío + siguientes pasos + retargeting
- **Audiencia:** Lead recién convertido
- **CTA:** "WhatsApp directo para agendar"

**Elementos:**
- Confirmación: "Auditoría solicitada ✓"
- Expectativas: "Te contactamos en 24 horas"
- Próximo paso: botón WhatsApp
- Pixel de conversión (Facebook/Google)

---

## NAVEGACIÓN MOBILE

### **Header (sticky en Home):**
```
[Logo Rallusigence] ──────────── [WhatsApp] [Menú ☰]
```

### **Menú hamburguesa:**
```
✕ Cerrar
────────────────
🏠 Inicio
⚡ Servicios  
📞 Contacto
🎁 Auditoría gratis ← destacado
```

### **CTA sticky (mobile):**
```
┌─────────────────────────────┐
│ [🎁 Auditoría gratis]       │ ← fijo abajo
└─────────────────────────────┘
```

---

## SEO FUTURO (implementación posterior)

### **Páginas por servicio (si necesarias):**
- `/sitio-web-profesional` → SEO: "diseño web México"
- `/agente-whatsapp` → SEO: "chatbot WhatsApp"
- `/seo-automatico` → SEO: "posicionamiento Google"
- `/procesos-automaticos` → SEO: "automatización empresarial"

### **Blog para tráfico orgánico:**
- `/blog` → artículos sobre automatización, casos de éxito
- Ejemplos: "Cómo automatizar citas médicas", "WhatsApp para restaurantes"

---

## PRIORIDADES DE DESARROLLO

1. **Fase 1:** Home single-page (MVP)
2. **Fase 2:** Landing /auditoria-gratis + /gracias
3. **Fase 3:** Blog básico (si hay tiempo/presupuesto)
4. **Fase 4:** Páginas individuales servicios (solo si SEO lo requiere)

---

## NOTAS TÉCNICAS

- **Mobile-first:** Todo diseñado para 320px primero
- **Performance:** Critical CSS inline, lazy loading imágenes
- **Forms:** Formspree para formularios (sin backend propio)
- **Analytics:** Google Analytics + pixel Facebook/Google Ads
- **Hosting:** Firebase Hosting (gratis, rápido, CDN global)

**Stack confirmado:** HTML/CSS/JS vanilla + Firebase Hosting