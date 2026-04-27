# Documentacion de APIs e Integraciones — Rallusigence
**Proyecto:** Sitio web Rallusigence (rallusigence.net)
**Fase:** 5 — Tecnico
**Fecha:** 2026-04-25

---

## Sección 1 — Formspree: integración del formulario

Formspree es el servicio elegido para recibir el formulario de auditoria sin necesidad de backend propio. Envia un email a `alfredimzero@gmail.com` cada vez que alguien envia el formulario.

### 1.1 Crear cuenta y formulario

1. Ir a https://formspree.io y registrarse con `alfredimzero@gmail.com`.
2. Confirmar email (obligatorio para activar).
3. En el dashboard: **New Form** → nombre "Rallusigence — Auditoria gratis".
4. **Send to:** `alfredimzero@gmail.com` (verificar al recibir email de confirmacion).
5. Copiar el **Form ID** que aparece en la URL del endpoint:
   ```
   https://formspree.io/f/abcd1234
                          ^^^^^^^^
                          Form ID
   ```
6. Pegar el endpoint completo en `js/form.js`:
   ```javascript
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/abcd1234';
   ```

### 1.2 Configuracion en Formspree dashboard

| Setting | Valor recomendado |
|---|---|
| Name | Rallusigence — Auditoria gratis |
| Email recipients | alfredimzero@gmail.com |
| Reply-to | (auto: extrae del campo `email` del form) |
| Subject template | `Nueva auditoria: {{nombre}} — {{negocio}}` |
| Spam filter | Akismet ON |
| reCAPTCHA | ON (v3, invisible) |
| Allowed domains | rallusigence.net, www.rallusigence.net, localhost (para dev) |
| File uploads | OFF (no se necesitan) |
| Webhooks | (vacio por ahora — agregar n8n a futuro) |

### 1.3 Estructura del fetch en JavaScript

```javascript
// js/form.js — fragmento clave
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/abcd1234';

async function enviarFormularioAuditoria(datos) {
  // datos = { nombre, negocio, whatsapp, email }
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        nombre: datos.nombre,
        negocio: datos.negocio,
        whatsapp: datos.whatsapp,
        email: datos.email,
        _subject: `Nueva auditoria: ${datos.nombre} — ${datos.negocio}`,
        _replyto: datos.email,
        _origen: 'rallusigence.net',
        _timestamp: new Date().toISOString()
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    const data = await response.json();
    return { ok: true, data };

  } catch (err) {
    console.error('Formspree error:', err);
    return { ok: false, error: err.message };
  }
}
```

### 1.4 Manejo de respuesta

| Codigo | Significado | UX en el sitio |
|---|---|---|
| `200 OK` | Envio exitoso | Mostrar mensaje verde "Recibido — te contactamos en 24h", reset form, evento GA4 `form_submit`. |
| `400 Bad Request` | Datos invalidos | Mostrar error rojo "Revisa los datos e intenta de nuevo". |
| `403 Forbidden` | Dominio no permitido | Mostrar error generico, log a consola "Configura dominios en Formspree". |
| `429 Too Many Requests` | Rate limit | Mostrar "Demasiados intentos, espera un momento". |
| `5xx` | Error de servidor | Mostrar "Error temporal, intenta en un momento o escribenos por WhatsApp". |
| Network error | Sin internet o CORS | Igual que 5xx, sugerir WhatsApp como alternativa. |

### 1.5 Email de notificacion

Cuando alguien envie el form, Alfredo recibira un email asi:

```
De:    Formspree <noreply@formspree.io>
Para:  alfredimzero@gmail.com
Asunto: Nueva auditoria: Juan Perez — Restaurante
Reply-to: juan@ejemplo.com

Nuevo envio en Rallusigence — Auditoria gratis:

nombre: Juan Perez
negocio: Restaurante
whatsapp: +52 33 1234 5678
email: juan@ejemplo.com
_origen: rallusigence.net
_timestamp: 2026-04-25T18:30:00Z

Responder a Juan: juan@ejemplo.com
```

### 1.6 Limitaciones del plan gratuito Formspree

| Limite | Plan Free | Notas |
|---|---|---|
| Submissions/mes | 50 | Suficiente para arranque; alerta a los 40. |
| Forms activos | 1 | Solo "Auditoria gratis". |
| Branding "Powered by Formspree" | Si en email | Aceptable. |
| File uploads | No | No los necesitamos. |
| Webhooks | No | Limitacion clave: para n8n necesitamos plan pago. |
| reCAPTCHA | Si | Importante contra spam. |
| Auto-respuesta al usuario | No | Workaround: enviar manual o usar n8n. |

**Plan Basic ($10/mes):** 1000 submissions, webhooks, sin branding. Considerar al pasar 40 submissions/mes.

### 1.7 Alternativa: EmailJS

EmailJS funciona enviando el email directamente desde el navegador usando una cuenta SMTP (Gmail, Outlook, etc.). Util si:

- Se quiere usar Gmail propio sin proxy.
- Se necesita auto-respuesta gratis al usuario.
- Se quieren mas de 50 submissions/mes sin pagar.

**Cuando NO usarlo:**
- Cuando se necesite ocultar credenciales SMTP (EmailJS las expone parcialmente al cliente, mitigado por dominio whitelisting pero no perfecto).
- Cuando el email se quiere enviar de forma 100% confiable (mejor backend real).

**Recomendacion para Rallusigence:** quedarse con Formspree por simplicidad. Migrar a EmailJS o n8n cuando se pase del free tier o se necesite auto-respuesta.

```javascript
// Ejemplo EmailJS (NO usar por ahora, documentado para futuro)
emailjs.send('service_xxx', 'template_yyy', {
  from_name: datos.nombre,
  from_email: datos.email,
  whatsapp: datos.whatsapp,
  negocio: datos.negocio
}, 'public_key_zzz');
```

---

## Sección 2 — Google Analytics 4

### 2.1 Crear propiedad en GA4

1. Ir a https://analytics.google.com con cuenta `alfredimzero@gmail.com`.
2. **Admin → Crear propiedad**:
   - Nombre: `Rallusigence Web`
   - Zona horaria: `(GMT-06:00) Ciudad de Mexico`
   - Moneda: `MXN`
3. **Detalles del negocio**: tamaño "1-10", objetivos: "generar leads".
4. **Stream de datos → Web**:
   - URL: `https://rallusigence.net`
   - Stream name: `Rallusigence Web`
5. Copiar el **Measurement ID** (formato `G-XXXXXXXXXX`).
6. Activar **Enhanced measurement** (eventos automaticos: scrolls, outbound clicks, file downloads, video, form interactions).

### 2.2 Codigo de instalacion (gtag.js)

En el `<head>` del HTML (despues del title/meta SEO):

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script src="/js/analytics.js" defer></script>
```

Y en `js/analytics.js`:

```javascript
// js/analytics.js
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
window.gtag = gtag;

gtag('js', new Date());
gtag('config', GA_MEASUREMENT_ID, {
  page_title: document.title,
  page_path: window.location.pathname,
  anonymize_ip: true,
  cookie_flags: 'SameSite=None;Secure'
});
```

### 2.3 Eventos personalizados a implementar

#### Evento 1: `form_submit`

Disparado cuando el formulario de auditoria se envia exitosamente.

```javascript
// Llamar desde js/form.js dentro del bloque if (response.ok)
gtag('event', 'form_submit', {
  form_name: 'auditoria_gratis',
  tipo_negocio: datos.negocio,
  page_path: window.location.pathname
});
```

**Configurar como CONVERSION en GA4 Admin → Events.** Es el KPI principal.

#### Evento 2: `cta_click`

Disparado al hacer clic en cualquier CTA marcado con `data-track-cta`.

```html
<!-- HTML: marcar cualquier boton CTA -->
<a href="#contacto" class="btn btn--primary"
   data-track-cta="hero_primary">
  Solicitar auditoria
</a>
```

```javascript
// js/analytics.js
function trackCTAClicks() {
  document.addEventListener('click', (e) => {
    const cta = e.target.closest('[data-track-cta]');
    if (!cta) return;
    gtag('event', 'cta_click', {
      cta_label: cta.dataset.trackCta,
      cta_location: cta.closest('section')?.id || 'unknown',
      cta_text: cta.textContent.trim().substring(0, 50)
    });
  });
}
```

Convenciones de `data-track-cta`:
- `hero_primary`, `hero_secondary`
- `nav_cta`, `header_cta`
- `service_card_<n>`
- `contacto_submit`
- `landing_form_submit`

#### Evento 3: `whatsapp_click`

Disparado al hacer clic en cualquier link `wa.me`.

```javascript
function trackWhatsAppClick() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href*="wa.me"]');
    if (!link) return;
    gtag('event', 'whatsapp_click', {
      link_location: link.id || link.closest('section')?.id || 'inline',
      link_url: link.href
    });
  });
}
```

**Configurar como CONVERSION** (lead alternativo).

#### Evento 4: `service_view`

Disparado cuando el usuario hace scroll y la seccion `#servicios` entra al viewport (50% visible).

```javascript
function trackServiceView() {
  const section = document.getElementById('servicios');
  if (!section) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        gtag('event', 'service_view', {
          section_name: 'servicios',
          scroll_depth_pct: 50
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  observer.observe(section);
}
```

### 2.4 Resumen de eventos y dimensiones

| Evento | Tipo | Parametros | Conversion |
|---|---|---|---|
| `page_view` | Auto | (default) | No |
| `scroll` | Auto (Enhanced) | 90% | No |
| `form_submit` | Custom | form_name, tipo_negocio | **SI** |
| `cta_click` | Custom | cta_label, cta_location | No |
| `whatsapp_click` | Custom | link_location | **SI** |
| `service_view` | Custom | section_name | No |

### 2.5 Verificacion

1. Despues del deploy, abrir el sitio en una pestaña.
2. En GA4: **Reports → Realtime** debe mostrar 1 usuario activo.
3. **Configure → DebugView** (activar Chrome extension "Google Analytics Debugger" o agregar `?debug_mode=1` a URL).
4. Hacer clic en CTAs y enviar form de prueba; ver eventos en tiempo real.

---

## Sección 3 — WhatsApp Business: enlace directo

### 3.1 Formato de URL

```
https://wa.me/<numero_internacional_sin_+>?text=<mensaje_encoded>
```

- **Numero:** formato E.164 sin `+`, sin espacios, sin guiones.
- Ejemplo Mexico: `+52 33 1234 5678` → `523312345678`.
- **Mensaje:** URL-encoded (`encodeURIComponent` en JS).

### 3.2 Mensaje sugerido para el CTA del sitio

**Opcion A — Generico (header / footer):**
```
Hola Rallusigence, vi su sitio web y me interesa saber mas sobre la auditoria gratis.
```
URL final:
```
https://wa.me/523312345678?text=Hola%20Rallusigence%2C%20vi%20su%20sitio%20web%20y%20me%20interesa%20saber%20mas%20sobre%20la%20auditoria%20gratis.
```

**Opcion B — Desde seccion servicios:**
```
Hola Rallusigence, me interesa el servicio de [agente WhatsApp / automatizacion / IA] para mi negocio.
```

**Opcion C — Desde landing /auditoria-gratis:**
```
Hola, vengo de la pagina de auditoria gratis y quiero agendar una sesion.
```

### 3.3 Implementacion en HTML

```html
<!-- Boton flotante (sticky) -->
<a href="https://wa.me/523312345678?text=Hola%20Rallusigence%2C%20me%20interesa%20la%20auditoria%20gratis."
   class="float-cta"
   id="whatsapp-float"
   target="_blank"
   rel="noopener"
   aria-label="Contactar por WhatsApp"
   data-track-cta="whatsapp_float">
  <i data-lucide="message-circle"></i>
</a>
```

Helper JS opcional para construir URLs:

```javascript
function buildWhatsAppURL(numero, mensaje) {
  const num = numero.replace(/\D/g, '');
  const msg = encodeURIComponent(mensaje);
  return `https://wa.me/${num}?text=${msg}`;
}

// Uso:
const url = buildWhatsAppURL(
  '+52 33 1234 5678',
  'Hola Rallusigence, me interesa la auditoria gratis.'
);
```

### 3.4 Crear el numero de negocio correcto

1. Descargar **WhatsApp Business** (no la app personal) en un telefono dedicado o virtual.
2. Registrar con el numero de Rallusigence (ideal: numero exclusivo del negocio, no personal).
3. Configurar perfil de negocio:
   - Nombre: `Rallusigence`
   - Categoria: `Servicios profesionales` o `Software`
   - Descripcion: corta value prop
   - Sitio web: `https://rallusigence.net`
   - Email: `alfredimzero@gmail.com`
   - Direccion (si aplica)
   - Horarios de atencion
4. **Mensaje de bienvenida automatico:** "Hola, gracias por escribir a Rallusigence. Te respondemos en menos de 24h habiles."
5. **Mensaje de ausencia:** "Estamos fuera de horario. Te respondemos al volver."
6. **Respuestas rapidas:** /precios, /agenda, /servicios.
7. **Etiquetas:** "Lead", "Cliente activo", "Cerrado".
8. Verificar que el numero funciona enviando un mensaje desde otro telefono al link `wa.me/...`.

### 3.5 Recomendaciones

- Usar SIEMPRE WhatsApp Business (no personal) para mantener separados los chats.
- No usar WhatsApp Web Multi-device si hay un numero dedicado en otro telefono — confunde a clientes.
- Activar checkmark verde (verified business) en cuanto pase los criterios de Meta.
- Para escala (>500 conversaciones/mes): migrar a **WhatsApp Business API** via Twilio/360dialog (S2 — ver seccion 4.3).

---

## Sección 4 — Integraciones futuras (documentar para cuando se implementen)

### 4.1 n8n webhook — Recibir leads del formulario

**Cuando implementarlo:** sprint 2, despues del lanzamiento.

**Objetivo:** ademas de enviar email via Formspree, replicar el lead a n8n para automatizar:
- Crear contacto en CRM (HubSpot Free, Notion, Google Sheets).
- Enviar mensaje de bienvenida automatico via WhatsApp (cuando este la API).
- Notificar a Alfredo en Telegram.
- Calificar lead con IA (Claude API) usando el campo `negocio`.

**Como configurarlo:**

1. En n8n crear nuevo workflow: "Lead Rallusigence Web".
2. Trigger: **Webhook** node, metodo POST, path `/rallusigence-lead`.
3. Copiar URL del webhook (ej: `https://n8n.rallusigence.net/webhook/rallusigence-lead`).

**Opcion A — Via Formspree (requiere plan pago):**
   - En Formspree dashboard del form: **Webhooks → Add URL** → pegar URL n8n.
   - Formspree enviara cada submission al webhook automaticamente.

**Opcion B — Doble envio desde el navegador (gratis):**

```javascript
// js/form.js — agregar despues del fetch a Formspree
const N8N_WEBHOOK = 'https://n8n.rallusigence.net/webhook/rallusigence-lead';

async function enviarLead(datos) {
  // 1. Formspree (email a Alfredo)
  const formspreeResp = await fetch(FORMSPREE_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(datos)
  });

  // 2. n8n (CRM, Telegram, etc.) — fire and forget
  fetch(N8N_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...datos, source: 'web', timestamp: Date.now() })
  }).catch(err => console.warn('n8n webhook fail (no critico):', err));

  return formspreeResp.ok;
}
```

**Ventaja opcion B:** gratis, sin dependencia del plan Formspree.
**Desventaja:** si el webhook n8n esta caido el navegador del usuario hace fetch fallido (no afecta UX gracias al `.catch`).

**Payload esperado en n8n:**
```json
{
  "nombre": "Juan Perez",
  "negocio": "Restaurante",
  "whatsapp": "+52 33 1234 5678",
  "email": "juan@ejemplo.com",
  "source": "web",
  "timestamp": 1735689600000
}
```

### 4.2 Supabase — Persistencia de leads en BD

**Cuando implementarlo:** cuando se quieran reportes/dashboards propios o conservar leads >1 año.

**Setup:**
1. Crear proyecto en https://supabase.com (free tier: 500MB BD, 2GB transferencia).
2. Crear tabla `leads`:

```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  nombre TEXT NOT NULL,
  negocio TEXT,
  whatsapp TEXT,
  email TEXT NOT NULL,
  source TEXT DEFAULT 'web',
  status TEXT DEFAULT 'nuevo',
  notes TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT
);

CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
```

3. Habilitar **Row Level Security** y crear policy `INSERT only para anon role` (clave publica).

**Opcion preferida:** insertar via n8n (paso intermedio entre webhook y Supabase) — asi la clave de Supabase no se expone al navegador.

**Insercion directa desde JS (si se omite n8n):**

```javascript
// Solo si n8n NO esta en medio. La anon key es publica pero limitada por RLS.
const SUPABASE_URL = 'https://xxxxx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGc...'; // public anon key

async function guardarLeadEnSupabase(datos) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(datos)
  });
  return response.ok;
}
```

**Recuperar UTMs:**

```javascript
function getUTMs() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || null,
    utm_medium: params.get('utm_medium') || null,
    utm_campaign: params.get('utm_campaign') || null
  };
}
// guardar en sessionStorage para que persistan a traves del scroll
sessionStorage.setItem('utms', JSON.stringify(getUTMs()));
```

### 4.3 WhatsApp Business API — Bot conversacional (S2)

**Cuando implementarlo:** Sprint 2 (post-lanzamiento), cuando se valide demanda.

**Stack:**
- **Proveedor BSP:** Twilio o 360dialog (recomendado: 360dialog por costo).
- **Orquestacion:** n8n.
- **Cerebro:** Claude API (Anthropic) para respuestas conversacionales.
- **Memoria:** Supabase (historial de conversaciones).

**Flujo basico:**

```
Usuario → WhatsApp → 360dialog → Webhook n8n
                                       │
                                       ├─→ Supabase (guardar mensaje)
                                       ├─→ Claude API (generar respuesta)
                                       └─→ 360dialog → WhatsApp → Usuario
```

**Costos esperados:**
- 360dialog: $5 USD setup + $0.005 USD/mensaje.
- Meta conversation fees (MX): ~$0.04 USD/conversacion service-initiated.
- Claude API (Sonnet): ~$0.003 USD/respuesta promedio.
- **Total estimado:** ~$0.05 USD por conversacion completa.

**Pasos cuando se vaya a implementar:**
1. Crear cuenta en 360dialog y verificar numero del negocio.
2. Aprobar plantillas de mensaje (template messages) en Meta Business Manager.
3. Configurar webhook entrante en n8n.
4. Build de prompt para Claude con contexto Rallusigence.
5. Connect Supabase para historial.
6. Test exhaustivo con grupo cerrado antes de exponer publicamente.

**Documentar entonces:**
- Endpoint del webhook 360dialog
- Schemas de mensajes inbound/outbound
- Plantillas aprobadas
- Prompt system para Claude
- Funciones (tools) que Claude puede usar (agendar cita, enviar info, etc.)

---

## Resumen de credenciales y endpoints

> Almacenar en gestor de contraseñas (1Password / Bitwarden) — nunca en codigo.

| Servicio | Tipo de credencial | Donde se usa | Estado |
|---|---|---|---|
| Formspree | Form ID (publico) | js/form.js | Por crear |
| Google Analytics 4 | Measurement ID (publico) | js/analytics.js | Por crear |
| WhatsApp Business | Numero telefonico (publico) | HTML + JS | Por definir |
| Firebase Hosting | Project ID (publico) | .firebaserc | Por crear |
| n8n webhook URL | URL secreta | js/form.js (futuro) | Sprint 2 |
| Supabase | URL + anon key (publicas) | js/form.js (futuro) | Sprint 2 |
| Supabase service role | Secret | Solo n8n backend | Sprint 2 |
| Claude API | API key | Solo n8n backend | Sprint 2 |
| 360dialog | API key | Solo n8n backend | Sprint 2 |

**Regla:** ninguna clave secret/service-role debe aparecer en codigo del navegador. Solo claves publicas (anon, measurement IDs, form IDs) que esten protegidas por whitelisting de dominios.
