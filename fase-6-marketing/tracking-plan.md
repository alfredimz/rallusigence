# TRACKING PLAN — RALLUSIGENCE
# Plan de Medición y Análitica Digital Completa

---

## SECCIÓN 1 — Eventos de Google Analytics 4

### E1 — Conversiones Principales

| Evento | Trigger | Parámetros | Por qué medirlo |
|---|---|---|---|
| `form_submit` | Formulario de auditoría enviado exitosamente | `form_type: "auditoria"`, `page_location: "/auditoria-gratis"`, `success: true`, `user_type: "lead"` | **Conversión principal** - Mide efectividad del CTA más importante |
| `form_error` | Error en envío de formulario | `form_type: "auditoria"`, `error_type: "validation/network"`, `field_error: "email/telefono"` | **Optimización UX** - Identifica friction points en conversión |
| `whatsapp_click` | Clic en botón WhatsApp | `button_location: "header/footer/cta"`, `page_location`, `cta_text: "texto del botón"` | **Canal de conversión** - WhatsApp es canal clave para este negocio |

### E2 — Engagement de Contenido

| Evento | Trigger | Parámetros | Por qué medirlo |
|---|---|---|---|
| `cta_click` | Clic en cualquier CTA principal | `cta_type: "auditoria/whatsapp/llamada"`, `cta_position: "hero/middle/footer"`, `cta_text` | **Funnel de conversión** - Identifica qué CTAs funcionan mejor |
| `service_view` | Usuario scrollea a sección de servicios | `service_type: "whatsapp/web/seo/procesos"`, `time_to_view: "segundos"`, `scroll_depth: "porcentaje"` | **Interés por servicio** - Entiende qué servicios atraen más |
| `scroll_depth` | Profundidad de scroll en páginas clave | `page_type: "home/auditoria"`, `scroll_percentage: "25/50/75/100"`, `time_on_page` | **Calidad de contenido** - Mide engagement real con el contenido |

### E3 — Micro-conversiones

| Evento | Trigger | Parámetros | Por qué medirlo |
|---|---|---|---|
| `time_on_page` | Usuario permanece >30s en página | `page_location`, `time_threshold: "30/60/120/300"`, `is_bounce: false` | **Calidad de tráfico** - Distingue visitas de calidad vs rebotes |
| `external_click` | Clic en enlaces externos | `external_url`, `link_type: "social/partner/reference"`, `page_location` | **Referencias externas** - Mide cuándo salen del sitio y por qué |
| `download_start` | Descarga de recursos (si aplica) | `file_name`, `file_type: "pdf/doc"`, `download_source: "cta/blog"` | **Engagement avanzado** - Lead magnet performance |

### E4 — Experiencia de Usuario

| Evento | Trigger | Parámetros | Por qué medirlo |
|---|---|---|---|
| `exit_intent` | Mouse sale del viewport (desktop) | `page_location`, `time_before_exit`, `scroll_before_exit`, `triggered_popup: true/false` | **Recuperación de leads** - Oportunidad para popup de retención |
| `search_attempt` | Usuario busca contenido interno | `search_term`, `search_results_count`, `page_location` | **Content gaps** - Identifica qué buscan y no encuentran |
| `contact_info_view` | Visualiza información de contacto | `contact_type: "telefono/email/direccion"`, `page_location`, `method: "click/scroll"` | **Intent to contact** - Micro-conversión hacia contacto directo |

### E5 — Errores y Performance

| Evento | Trigger | Parámetros | Por qué medirlo |
|---|---|---|---|
| `page_error` | Error 404 o problema de carga | `error_type: "404/timeout/js_error"`, `page_attempted`, `referrer_source` | **UX issues** - Identificar problemas técnicos que afectan conversión |
| `slow_page_load` | Página carga en >3 segundos | `load_time`, `page_location`, `connection_type`, `device_type` | **Performance** - SEO y UX afectados por velocidad |

---

## SECCIÓN 2 — Conversiones a Configurar en GA4

### Conversiones Primarias (Marcar como Conversión)
1. ✅ **`form_submit`** 
   - **Por qué:** Es el objetivo principal del negocio
   - **Valor:** $1,500 MXN (valor promedio de lead que cierra)

2. ✅ **`whatsapp_click`**
   - **Por qué:** Canal directo de conversión, alta intención
   - **Valor:** $800 MXN (conversión probable pero menor que form)

3. ✅ **`contact_info_view`** (después de 60 días de datos)
   - **Por qué:** Indicador de alta intención, predice conversión
   - **Valor:** $200 MXN (micro-conversión)

### Conversiones Secundarias (NO marcar como conversión)
- `cta_click` → Micro-interacción, no conversión real
- `service_view` → Engagement, pero no decisión de compra
- `time_on_page` → Métrica de calidad, no conversión
- `scroll_depth` → Engagement metric para optimización

### Audiencias Personalizadas para Remarketing
```javascript
// AUDIENCIA 1: Leads calientes (form submit)
Condición: event_name = 'form_submit' 
Duración: 90 días
Uso: Remarketing con ofertas especiales

// AUDIENCIA 2: Interés alto (service_view + time_on_page >60s)
Condición: event_name = 'service_view' AND custom_parameter.time_on_page > 60
Duración: 30 días  
Uso: Remarketing educativo

// AUDIENCIA 3: Abandono de formulario
Condición: event_name = 'form_error' OR exit_intent = true
Duración: 14 días
Uso: Remarketing agresivo con descuentos
```

---

## SECCIÓN 3 — Meta Pixel (Facebook/Instagram Ads)

### Código de Instalación Base
```html
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');

fbq('init', 'TU_PIXEL_ID');
fbq('track', 'PageView');
</script>

<noscript>
  <img height="1" width="1" style="display:none"
       src="https://www.facebook.com/tr?id=TU_PIXEL_ID&ev=PageView&noscript=1"/>
</noscript>
```

### Eventos Estándar a Implementar

**1. PageView (Automático)**
```javascript
// Se dispara automáticamente en cada página
fbq('track', 'PageView');
```

**2. Lead (Form Submit)**
```javascript
// Cuando se envía formulario de auditoría
fbq('track', 'Lead', {
  content_category: 'auditoria_digital',
  content_name: 'formulario_auditoria_gratis',
  value: 1500, // Valor promedio del lead
  currency: 'MXN'
});
```

**3. ViewContent (Servicios)**
```javascript
// Cuando usuario ve sección de servicios específicos
fbq('track', 'ViewContent', {
  content_type: 'service',
  content_ids: ['whatsapp_bot', 'sitio_web', 'seo_auto'],
  content_name: 'servicios_automatizacion',
  content_category: 'servicios_ia'
});
```

**4. InitiateCheckout (WhatsApp Click)**
```javascript
// Clic en botón WhatsApp (intención alta)
fbq('track', 'InitiateCheckout', {
  content_category: 'contacto_directo',
  content_name: 'whatsapp_business',
  value: 800,
  currency: 'MXN'
});
```

**5. Contact (Información de Contacto)**
```javascript
// Cuando ve teléfono, email o dirección
fbq('track', 'Contact', {
  content_category: 'informacion_contacto'
});
```

### Instalación sin Conflictos con GA4
```html
<!-- ORDEN CORRECTO DE INSTALACIÓN -->

<!-- 1. Google Analytics 4 PRIMERO -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GA_MEASUREMENT_ID');
</script>

<!-- 2. Meta Pixel DESPUÉS -->
<script>
  !function(f,b,e,v,n,t,s){...} // Código Meta Pixel
</script>

<!-- 3. Evitar conflictos con eventos -->
<script>
// Función para disparar ambos al mismo tiempo
function trackConversion(eventType, data) {
  // GA4
  gtag('event', eventType, data);
  
  // Meta Pixel 
  if(eventType === 'form_submit') {
    fbq('track', 'Lead', data);
  }
}
</script>
```

---

## SECCIÓN 4 — Google Tag Manager (Evaluación)

### ¿Vale la Pena GTM para Rallusigence?

**PROS de usar GTM:**
- ✅ **Sin código:** Agregar/editar eventos sin tocar HTML
- ✅ **Testing:** A/B testing de eventos y triggers
- ✅ **Multiple pixels:** Agregar TikTok Ads, LinkedIn fácilmente  
- ✅ **Advanced tracking:** Scroll depth, clicks específicos
- ✅ **Debugging:** Vista previa antes de publicar

**CONTRAS de usar GTM:**
- ❌ **Complejidad inicial:** Curva de aprendizaje para el equipo
- ❌ **Performance:** Carga adicional de JavaScript
- ❌ **Over-engineering:** Para 2 páginas puede ser excesivo
- ❌ **Dependencia:** Otra herramienta que mantener

### RECOMENDACIÓN: NO IMPLEMENTAR GTM INICIALMENTE

**JUSTIFICACIÓN:**
1. **Sitio simple:** Solo 2 páginas principales
2. **Eventos básicos:** No requiere tracking complejo
3. **Team size:** Equipo pequeño, mejor keep it simple
4. **Performance:** Cada KB de JS cuenta en mobile

**IMPLEMENTAR GA4 + META PIXEL DIRECTO:**
```html
<!-- Más simple, más rápido, más confiable -->
<script>
// GA4 + Meta Pixel directo en HTML
// Eventos custom con JavaScript vanilla
</script>
```

**CUÁNDO CONSIDERAR GTM (en el futuro):**
- ✅ Sitio web con >10 páginas
- ✅ Blog activo con múltiples categorías  
- ✅ E-commerce con productos
- ✅ Equipo de marketing que prefiere no-code
- ✅ Multiple advertising platforms (TikTok, LinkedIn, etc.)

---

## SECCIÓN 5 — Dashboard de Métricas Semanales

### 8 Métricas Clave para Revisar Cada Lunes

**M1 — Leads Generados (Goal #1)**
- **Métrica:** Eventos `form_submit` (última semana)
- **Dónde:** GA4 > Reports > Engagement > Events > form_submit
- **Benchmark inicial:** 8-15 leads/semana (primeros 3 meses)
- **Alerta:** <5 leads en una semana

**M2 — Calidad de Tráfico**
- **Métrica:** % de sesiones con >60 segundos
- **Fórmula:** (Sesiones con engaged_session_event) / (Total sessions) * 100
- **Dónde:** GA4 > Reports > Engagement > Pages and screens
- **Benchmark inicial:** 35-45% (primeros 3 meses)
- **Alerta:** <25% engagement rate

**M3 — Conversión por Canal**
- **Métrica:** Conversiones por source/medium
- **Dónde:** GA4 > Reports > Acquisition > Traffic acquisition
- **Benchmark inicial:** 
  - Organic: 2-4% conversion rate
  - Direct: 5-8% conversion rate  
  - Social: 1-3% conversion rate
- **Alerta:** Caída >50% en cualquier canal principal

**M4 — Performance de CTAs**
- **Métrica:** CTR de eventos `cta_click`
- **Fórmula:** (cta_click events) / (pageviews) * 100
- **Dónde:** GA4 > Reports > Engagement > Events > cta_click
- **Benchmark inicial:** 8-12% CTR promedio
- **Alerta:** <5% CTR en home page

**M5 — WhatsApp as Conversion Channel**
- **Métrica:** Eventos `whatsapp_click` vs conversiones reales
- **Dónde:** GA4 > Reports > Engagement > Events > whatsapp_click
- **Benchmark inicial:** 25-35% de clicks resultan en conversación real
- **Alerta:** <15% conversion rate WhatsApp

**M6 — SEO Visibility**
- **Métrica:** Clicks y posición promedio en Search Console
- **Dónde:** Google Search Console > Performance > Total clicks
- **Benchmark inicial:** 
  - Mes 1: 150-300 clicks/semana
  - Mes 3: 400-700 clicks/semana
- **Alerta:** Caída >30% en clicks semana vs semana

**M7 — Page Load Performance**
- **Métrica:** Core Web Vitals y Page Speed
- **Dónde:** GA4 > Reports > Tech > Page Speed o PageSpeed Insights
- **Benchmark inicial:**
  - LCP: <2.5s
  - CLS: <0.1  
  - INP: <200ms
- **Alerta:** Cualquier métrica en "rojo" por >3 días

**M8 — Form Abandonment**
- **Métrica:** Ratio de `form_error` vs `form_submit`
- **Fórmula:** (form_error events) / (form_submit + form_error) * 100
- **Dónde:** GA4 > Reports > Engagement > Events
- **Benchmark inicial:** <20% error rate
- **Alerta:** >30% error rate indica problema UX

### Dashboard Visual Recomendado (GA4 Custom Report)

```
RALLUSIGENCE - WEEKLY DASHBOARD
═══════════════════════════════════════

📊 CONVERSIONES (Esta Semana vs Anterior)
┌─────────────────┬─────────┬─────────┐
│ Form Submits    │   12    │   +3    │
│ WhatsApp Clicks │   28    │   +8    │
│ Conversion Rate │  3.2%   │  +0.5%  │
└─────────────────┴─────────┴─────────┘

📈 TRÁFICO (Últimos 7 días)  
┌─────────────────┬─────────┬────────┐
│ Sessions        │   375   │  +45   │
│ Users           │   321   │  +38   │ 
│ Engagement Rate │  42%    │  +3%   │
└─────────────────┴─────────┴────────┘

🎯 TOP PERFORMING CONTENT
┌─────────────────┬─────────┬────────┐
│ Home Page       │   245   │  65%   │
│ Auditoría Gratis│   89    │  78%   │
│ WhatsApp CTA    │   12%   │  +2%   │
└─────────────────┴─────────┴────────┘
```

### Alertas Automáticas en GA4
**CONFIGURAR INTELLIGENCE ALERTS:**

1. **Lead Drop Alert**
   - Condición: `form_submit` events decrease by >40% week-over-week
   - Frecuencia: Daily check
   - Notification: Email inmediato

2. **Traffic Spike/Drop Alert**  
   - Condición: Sessions increase/decrease by >50% day-over-day
   - Frecuencia: Daily check
   - Notification: Email con análisis

3. **Conversion Rate Alert**
   - Condición: Conversion rate drops below 2%
   - Frecuencia: Every 2 days  
   - Notification: Email + Slack si está configurado

4. **High Bounce Rate Alert**
   - Condición: Engagement rate drops below 30%
   - Frecuencia: Weekly check
   - Notification: Email con recomendaciones

---

**IMPLEMENTACIÓN TIMELINE:**

**SEMANA 1:**
- [ ] GA4 configurado con eventos custom
- [ ] Meta Pixel instalado 
- [ ] Search Console conectado
- [ ] Eventos básicos funcionando

**SEMANA 2:**
- [ ] Audiencias personalizadas creadas
- [ ] Conversiones marcadas en GA4
- [ ] Dashboard básico configurado
- [ ] Alertas automáticas activas

**SEMANA 3:**
- [ ] Validación de datos (GA4 vs realidad)
- [ ] Optimización de eventos que no funcionen
- [ ] Primera revisión de métricas benchmark
- [ ] Ajustes basados en datos reales

**SEMANA 4:**
- [ ] Dashboard completo funcionando
- [ ] Proceso semanal de revisión establecido
- [ ] Primeras optimizaciones basadas en data
- [ ] Plan de escalamiento para siguiente mes