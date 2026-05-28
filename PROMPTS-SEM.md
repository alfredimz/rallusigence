# PROMPTS SEM — RALLUSIGENCE
# Copia cada prompt completo y pégalo en claude.ai
# Actualizado: mayo 2026

---

## PROMPT 1 — GOOGLE ADS: ESTRUCTURA DE CAMPAÑAS

```
Eres un experto en Google Ads para negocios mexicanos. Voy a lanzar campañas para Rallusigence, una agencia que construye sitios web con IA para PYMEs en México.

CONTEXTO DEL NEGOCIO:
- Servicio estrella (MVP): Sitios web profesionales en 3 días
- Precios: Lanzamiento $6,000 MXN / Profesional $12,000 MXN / Avanzado $20,000 MXN
- Diferenciadores: precio fijo visible, entrega en días (no meses), cliente es dueño del código
- Modelo anónimo: pago por retiro cajero sin tarjeta, sin factura
- Landing page de conversión: rallusigence.net/auditoria-gratis
- CTA principal: auditoría digital gratis

ESTRUCTURA DE CAMPAÑAS DEFINIDA:
Campaña 1 — Búsqueda directa ($1,200/mes, $40/día)
  Grupo A: Bot WhatsApp → keywords: "bot whatsapp negocios" [exact], "chatbot whatsapp empresas" [phrase], "automatizar whatsapp" [phrase]
  Grupo B: Automatización → "automatizar procesos negocios" [exact], "automatización empresarial" [phrase]

Campaña 2 — Auditoría Gratuita ($1,000/mes, $33/día)
  Grupo A: Auditoría Digital → "auditoria digital gratis" [exact], "consultoría digital gratuita" [phrase], "análisis web gratis" [phrase]

Campaña 3 — Problemas de Negocio ($800/mes, $26/día)
  Grupo A: Eficiencia → "como automatizar mi negocio" [phrase], "mejorar procesos empresa" [broad]

COPY YA APROBADO (Campaña 1 — Bot WhatsApp, usar estos textos exactos):
Anuncio 1A: H1 "Bot WhatsApp listo en 48h" / H2 "Nunca pierdas una venta" / H3 "Atiende 24/7 sin descanso" / D1 "Tu bot contesta al instante. Convierte más clientes sin estar pegado al cel" / D2 "Precio fijo, funciona solo. Instalación en 2 días o te regreso tu dinero"

NEGATIVE KEYWORDS (aplicar a todas las campañas):
gratis, free, barato, económico, curso, tutorial, capacitación, trabajo, empleo, vacante, descargar, software, programa, plantilla, template, ejemplo

CONFIGURACIÓN:
- Estrategia de puja inicial: CPC manual a $12 MXN promedio
- Migrar a Target CPA de $150 MXN después de 50 conversiones
- Quality Score objetivo: >7/10
- CTR mínimo aceptable: 2%

TAREA: 
1. Valida si la estructura de campañas tiene sentido para este negocio
2. Sugiere 5 keywords adicionales de alta intención que yo no haya considerado
3. Propón mejores match types para las keywords de mayor conversión
4. Genera 3 variantes más de anuncios para la Campaña 2 (Auditoría Gratuita) siguiendo el mismo formato H1/H2/H3/D1/D2, respetando los límites de caracteres (H1-H3 máx 30 chars, D1-D2 máx 90 chars)
5. Escribe las extensiones de sitelinks, callouts y structured snippets para las 3 campañas
6. Dime qué métricas revisar en los primeros 7 días y cuándo pausar un anuncio
```

---

## PROMPT 2 — FACEBOOK + INSTAGRAM ADS: CONFIGURACIÓN MES 1

```
Eres experto en Meta Ads para México. Configuro campañas para Rallusigence, agencia de sitios web con IA para PYMEs mexicanas.

CONTEXTO:
- Objetivo: Capturar leads de dueños de negocios que quieren un sitio web profesional
- CTA: "Auditoría digital gratis" → landing rallusigence.net/auditoria-gratis
- Presupuesto mes 1: $2,500 MXN en Meta (Facebook + Instagram)
- Estrategia mes 1: Lead Generation con formulario nativo (no traffic)
- Presupuesto de prueba por ad set: $83 MXN/día
- Pausa si CPL > $150 MXN después de $300 gastados

AUDIENCIAS DEFINIDAS (crear exactamente estas):

Audiencia 1 — "María Elena" (Restaurantes):
  Edad: 30-50 años
  Intereses: Administración restaurantes, POS sistemas, delivery apps (Rappi, UberEats)
  Comportamientos: Propietarios de pequeñas empresas
  Ubicación: CDMX, Guadalajara, Monterrey, Puebla, Mérida
  Excluir: Empleados de restaurantes, estudiantes de gastronomía

Audiencia 2 — "Dr. Roberto" (Profesionistas con consulta):
  Edad: 35-55 años
  Intereses: Consultas médicas, odontología, medicina, software médico, clínicas privadas
  Comportamientos: Profesionistas independientes
  Ubicación: Todo México
  Excluir: Médicos de hospital público, estudiantes de medicina

Audiencia 3 — "Emprendedores digitales":
  Edad: 25-45 años
  Intereses: Marketing digital, ecommerce, startups, emprendimiento
  Comportamientos: Propietarios de pequeñas empresas online, compradores online frecuentes
  Ubicación: Todo México
  Excluir: Estudiantes universitarios (edad <22), desempleados

PLACEMENTES: SOLO Facebook Feed + Instagram Feed + Instagram Stories
Desactivar: Audience Network, Messenger, Marketplace

FORMULARIO NATIVO (Lead Form — Variante B1):
Título: "Auditoría gratuita de tu negocio"
Intro: "¿Cuánto dinero pierdes cada mes por no tener sistemas automatizados? Llamada gratis de 30 minutos para dueños de PYME."
Preguntas:
  1. ¿Qué tipo de negocio tienes? (opciones: Restaurante/Cafetería, Consultorio médico/dental, Tienda física, Servicio profesional, Otro)
  2. ¿Cuántos clientes atiendes al mes? (opciones: <50, 50-200, 200-500, +500)
  3. ¿Tu mayor problema es...? (opciones: No tengo sitio web, Mi sitio es obsoleto, No aparezco en Google, No tengo tiempo para responder clientes)
Mensaje de agradecimiento: "¡Listo! Te contactamos en máximo 2 horas para agendar tu auditoría gratuita."

COPY DE ANUNCIOS (usar verbatim):
Variante A1: Headline "¿Tu WhatsApp pierde ventas?" / Primary text "El 73% de los clientes no compra si tardas más de 1 hora en responder. Tu bot contesta en 3 segundos. Precio fijo." / CTA: "Más información"
Variante A2: Headline "Sitio web profesional en 5 días" / Primary text "Tu competencia ya está en Google. Sitio completo, móvil, rápido. $6,000 todo incluido. Sin mensualidades." / CTA: "Cotizar ahora"

TAREA:
1. Valida la configuración de audiencias — ¿falta algún interés o comportamiento clave?
2. Sugiere 2 audiencias adicionales que yo no haya considerado para el mercado mexicano
3. Escribe 3 variantes de copy adicionales para el formulario nativo (diferentes ángulos: urgencia, prueba social, precio)
4. ¿Qué imagen/video recomiendas para cada audiencia en el mes 1?
5. ¿Cómo estructuro el A/B test entre las 3 audiencias con $83/día cada una?
6. Dime exactamente qué métricas revisar a los 3 días, 7 días y 14 días para saber si algo está funcionando mal
7. Genera el copy para el anuncio de retargeting (visitantes que llegaron al sitio pero no llenaron el formulario)
```

---

## PROMPT 3 — YOUTUBE ADS: GUIÓN Y CONFIGURACIÓN

```
Eres experto en YouTube Ads para el mercado hispanohablante. Configuro mi primera campaña para Rallusigence, agencia de sitios web con IA para PYMEs mexicanas.

CONTEXTO:
- Formato: Skippable In-Stream (usuario puede saltarlo a los 5 segundos)
- Duración objetivo: 45-60 segundos
- Presupuesto: $1,000 MXN/mes
- CPV objetivo: $0.30-0.60 MXN por vista (30+ segundos)
- Objetivo: Educación + leads a rallusigence.net/auditoria-gratis

GUIÓN BASE APROBADO (adaptar, no cambiar el fondo):
"Si tienes una PYME y pierdes clientes porque no contestas WhatsApp a tiempo, esto te va a interesar.
Soy Alfredo, construyo sitios web para negocios mexicanos en 3 días. El 73% de los clientes no compra si tardas más de una hora en responder.
María Elena tenía un restaurante. Perdía 15 pedidos por semana porque no podía contestar mientras cocinaba. Le hice su sitio web en 4 días. Resultado: 60% más ventas ese mismo mes.
Dr. Roberto perdía 3 pacientes nuevos por semana. Su sitio web ahora agenda citas automáticamente. 40% más pacientes en 2 meses.
Si tu negocio también pierde clientes así, te regalo una auditoría gratis de 30 minutos. Te muestro exactamente qué te está costando clientes y cómo solucionarlo.
Sitio web profesional desde $6,000 MXN. Listo en 3 días. El código y el dominio son tuyos para siempre.
Clic en el enlace abajo. Auditoría gratis, sin compromiso."

AUDIENCIA OBJETIVO:
- Personas que ven: canales de marketing digital en español (Vilma Núñez, Frank Scipión, Ángel Cantu)
- Personas que ven: contenido de emprendimiento y negocios en México
- Tutoriales de tecnología para negocios
- Edad: 28-50 años, México

CONFIGURACIÓN TÉCNICA:
- Campaña: Video → Skippable In-Stream
- Bidding: Target CPV a $0.40 MXN
- Frecuencia cap: 3 impresiones/usuario/semana
- CTA overlay: "Auditoría Gratis" → rallusigence.net/auditoria-gratis

TAREA:
1. Revisa el guión — ¿los primeros 5 segundos son suficientemente fuertes para no ser saltados? Mejóralos si es necesario
2. Escribe una versión alternativa del guión de 30 segundos (más corta y directa)
3. ¿Qué texto poner en el overlay CTA y la pantalla final (end screen)?
4. Sugiere 5 canales de YouTube específicos (mexicanos) donde hacer placements exclusivos
5. ¿Cómo medir si el video está funcionando con $1,000 MXN/mes? ¿Qué métricas y a qué días?
6. Si el CPV sube a $1 MXN, ¿qué ajusto primero?
```

---

## PROMPT 4 — TIKTOK ADS: CONTENIDO Y CONFIGURACIÓN

```
Eres experto en TikTok Ads para emprendedores mexicanos. Configuro mi primera campaña para Rallusigence, agencia de sitios web con IA para PYMEs.

CONTEXTO:
- Formato: In-Feed Ads (video nativo en el feed)
- Duración: 15-30 segundos
- Presupuesto: $500 MXN/mes (~$25 USD)
- CPL objetivo: $60-80 MXN
- Objetivo: Brand awareness + leads de emprendedores jóvenes
- Link: rallusigence.net/auditoria-gratis

AUDIENCIA TIKTOK:
- Edad: 25-38 años
- Intereses: Emprendimiento, marketing digital, negocios online, tecnología
- Comportamiento: Ven contenido educativo de negocios
- Ubicación: México

SCRIPTS APROBADOS:

Script 1 (30 seg):
"POV: Pierdes clientes porque no puedes contestar WhatsApp mientras trabajas"
[Plano: persona ocupada, teléfono sonando]
"Tu sitio web contesta por ti. Muestra tus precios, agenda citas, da información."
[Pantalla: sitio web en celular funcionando]
"Cliente feliz, tú trabajando tranquilo"
[Split screen: cliente satisfecho + dueño relajado]
"Sitio web $6,000. Listo en 3 días. Link en bio"
[Texto: "Tu web esta semana - Link en bio"]

Script 2 (15 seg):
"Cuando tu competencia ya tiene sitio web y tú sigues con WhatsApp Business"
[Plano: comparación visual web vs WhatsApp]
"Sitio profesional en 3 días. $6,000 todo incluido"
[Texto en pantalla rápido]
"Tu negocio en Google esta semana. Link en bio"

TAREA:
1. Evalúa los scripts — ¿funcionan para TikTok México? ¿Qué cambiarías?
2. Escribe 2 scripts adicionales con la fórmula "Problema-Agitación-Solución" para estos nichos:
   a) Dentistas/consultorios médicos
   b) Tiendas de ropa/boutiques
3. ¿Qué texto en pantalla (captions) recomiendasen cada segundo del video?
4. ¿Qué hashtags usar? Da 10 hashtags específicos para el mercado mexicano
5. ¿Cómo grabar estos videos de forma económica (solo con celular)?
6. ¿Cuándo escalar el presupuesto de TikTok y cuándo pausar?
7. ¿Vale la pena TikTok para este negocio o es mejor meter ese $500 a Google?
```

---

## PROMPT 5 — OPTIMIZACIÓN SEMANAL (usar cada lunes)

```
Eres mi analista de performance para campañas de Rallusigence, agencia de sitios web con IA para PYMEs mexicanas.

CONTEXTO DEL NEGOCIO:
- CPA objetivo: $120 MXN por lead
- Métricas de alerta: CPL > $150 MXN → pausar; leads < 10/semana → aumentar presupuesto top performers
- Conversión landing objetivo: >8%
- Plataformas activas: Google Ads + Meta Ads
- URL principal: rallusigence.net/auditoria-gratis

DATOS DE ESTA SEMANA (reemplaza con tus números reales):
Google Ads:
  - Impresiones: [X]
  - Clics: [X]
  - CTR: [X]%
  - CPC promedio: $[X] MXN
  - Conversiones: [X]
  - CPL: $[X] MXN
  - Quality Score promedio: [X]/10
  - Mejor anuncio: [nombre del anuncio]
  - Peor anuncio: [nombre del anuncio]

Meta Ads:
  - Alcance: [X]
  - Impresiones: [X]
  - Clics: [X]
  - CTR: [X]%
  - CPM: $[X] MXN
  - Leads: [X]
  - CPL: $[X] MXN
  - Frecuencia: [X]
  - Mejor audiencia: [nombre]
  - Peor audiencia: [nombre]

Landing page (desde GA4):
  - Sesiones: [X]
  - Tasa de conversión: [X]%
  - Tiempo en página promedio: [X] segundos
  - % de formularios completados vs abandonados: [X]%

TAREA:
1. Analiza los números y dime si estoy en buen camino o hay alarmas
2. ¿Qué 3 acciones debo tomar esta semana para mejorar el CPL?
3. ¿Qué anuncios pausar y cuáles escalar?
4. ¿El Quality Score de Google está bien? ¿Cómo mejorarlo si no?
5. ¿La frecuencia de Meta está quemando mi audiencia?
6. ¿Necesito cambiar el copy o la landing page?
7. Dame una predicción: si mantengo este ritmo, ¿cuántos leads tendré el mes que termina?
```

---

## PROMPT 6 — CREACIÓN DE NUEVAS CREATIVIDADES (usar cuando CTR baje)

```
Eres copywriter especializado en anuncios para PYMEs mexicanas. Necesito nuevas creatividades para Rallusigence.

MARCA:
- Nombre: Rallusigence
- Servicio: Sitios web profesionales en 3 días para PYMEs mexicanas
- Precio: Desde $6,000 MXN
- Diferenciadores: Precio fijo, entrega en días, el cliente es dueño del sitio, sin mensualidades

VOZ DE MARCA (reglas estrictas):
- Tuteo siempre ("tú", nunca "usted")
- Precios visibles, nunca "cotizar"
- Sin buzzwords: no usar "disruptivo", "innovador", "ecosistema", "sinergias", "transformación digital", "potenciar", "soluciones"
- Palabras preferidas: "automatizar", "en X días", "precio fijo", "bot", "funciona", "ahorra tiempo", "más ventas", "resultados"
- Español mexicano natural, no forzado
- Máximo 1 signo de exclamación por anuncio
- No emojis en Google Ads, sí permitidos en Meta/TikTok (funcionales: ✅ ❌ 📱 💰)

PÚBLICO OBJETIVO (elegir uno por sesión):
A) Dr. Roberto — dentista 40 años, León GTO, pierde pacientes por no contestar WhatsApp
B) María Elena — dueña de restaurante familiar, Mérida, no aparece en Google
C) Carlos — dueño de taller mecánico, CDMX, sitio obsoleto de 2015

TAREA:
1. Genera 3 anuncios de Google Ads para el público [A/B/C] con el ángulo "[elegir: urgencia / prueba social / precio / FOMO / problema-solución]"
   Formato: H1 (máx 30 chars) / H2 (máx 30 chars) / H3 (máx 30 chars) / D1 (máx 90 chars) / D2 (máx 90 chars)
   
2. Genera 2 anuncios de Facebook para el mismo público:
   Formato: Headline (máx 40 chars) / Primary text (máx 125 chars) / CTA (elegir uno: Más información / Cotizar ahora / Ver precios)

3. Genera 1 script de video de 30 segundos para TikTok/Reels con el mismo ángulo

4. Para cada anuncio, dime qué imagen o visual recomendarías usar
```

---

## PROMPT 7 — REMARKETING: RECUPERAR VISITANTES QUE NO CONVIRTIERON

```
Eres experto en estrategias de remarketing para negocios de servicios B2B en México. Trabajo en Rallusigence.

SITUACIÓN:
Tenemos visitantes que llegaron a rallusigence.net pero no llenaron el formulario de auditoría gratis. Necesito recuperarlos.

SEGMENTOS DE REMARKETING A CREAR:

Segmento 1 — "Casi listos" (vieron la página de paquetes >45 segundos):
  Plataforma: Meta Ads
  Ventana: últimos 14 días
  
Segmento 2 — "Interesados" (llegaron a /auditoria-gratis pero no enviaron):
  Plataforma: Google Display + Meta
  Ventana: últimos 7 días

Segmento 3 — "Fríos" (visitaron home <30 segundos):
  Plataforma: Solo Meta
  Ventana: últimos 30 días

COPY DE REMARKETING YA APROBADO:
Facebook: Headline "Ya viste cómo funciona, ¿empezamos?" / Primary text "Checaste nuestra agencia web. El 80% de nuestros clientes tiene su sitio listo en 3 días. ¿Tu negocio ya?" / CTA: "Agendar ahora"
Google Display: Headline "Automatización que viste ayer" / Description "Sitio web en 3 días. $6,000 precio fijo. Clientes reales, resultados verificables."

TAREA:
1. ¿Falta algún segmento de remarketing importante?
2. Genera copy específico para cada segmento (distinto mensaje según qué tan "caliente" está el lead)
3. ¿Qué descuento o incentivo adicional debería ofrecer en remarketing para cerrar la conversión?
4. ¿Cuánto presupuesto dedicar a remarketing vs prospección nueva?
5. ¿Cuándo parar de mostrar remarketing a una persona? (frecuencia máxima y días)
6. ¿Cómo medir si el remarketing está funcionando o molestando?
```

---

## PROMPT 8 — GOOGLE MY BUSINESS: OPTIMIZACIÓN

```
Eres experto en SEO local y Google My Business para México. Necesito optimizar el perfil de Rallusigence.

DATOS DEL NEGOCIO:
- Nombre: Rallusigence
- Servicio: Agencia de sitios web con IA para PYMEs mexicanas
- Ubicación: Tizayuca, Hidalgo (servicio nacional remoto)
- URL: rallusigence.net
- Operación: 100% remota, sin oficina física
- Teléfono: [número real de WhatsApp]

CATEGORÍAS SUGERIDAS:
- Principal: Consultor de marketing
- Secundarias: Agencia de marketing digital, Diseñador web

DESCRIPCIÓN A USAR (750 caracteres máx):
"Construimos sitios web profesionales para PYMEs mexicanas en 3 días. Precio fijo desde $6,000 MXN. El código, el hosting y el dominio son tuyos para siempre. Sin mensualidades, sin sorpresas. Especialistas en sitios móviles, rápidos y optimizados para aparecer en Google desde el primer día. Auditoría digital gratuita para que sepas exactamente qué le falta a tu presencia online. Dentistas, restaurantes, tiendas y profesionistas en todo México."

TAREA:
1. ¿Puedo crear un perfil de GMB sin oficina física? ¿Cómo hacerlo correctamente para no que me penalicen?
2. Revisa y mejora la descripción que tengo. ¿Faltan keywords locales importantes?
3. ¿Qué atributos del perfil debo activar?
4. Dame un calendario de 4 posts semanales para el primer mes (tipo: Oferta, Novedad, Caso de éxito, Tip)
5. Escribe esos 4 posts completos, listos para publicar
6. ¿Cómo consigo las primeras 5 reseñas de Google de forma ética?
7. ¿Qué fotos debo subir si no tengo oficina? ¿Qué alternativas tengo?
```

---

## CÓMO USAR ESTOS PROMPTS

1. **Copia el prompt completo** (desde ``` hasta ```)
2. **Pégalo en claude.ai** en una conversación nueva
3. **Antes de enviar**, llena los campos en [corchetes] con tu información real
4. **Para el Prompt 5 (optimización semanal)**, necesitas tener datos reales de tus campañas de la semana
5. **Guarda las respuestas de Claude** en una carpeta `/sem/semana-X/` para comparar semana a semana

## ORDEN DE USO RECOMENDADO

**Antes de lanzar:**
→ Prompt 1 (Google Ads estructura)
→ Prompt 2 (Meta Ads configuración)
→ Prompt 8 (Google My Business)

**Al lanzar:**
→ Prompt 3 (YouTube si tienes presupuesto extra)
→ Prompt 4 (TikTok si quieres probar)

**Semana 1 en adelante (cada lunes):**
→ Prompt 5 (optimización con datos reales)

**Cuando el CTR baje o los anuncios se "quemen":**
→ Prompt 6 (nuevas creatividades)

**A partir del mes 2:**
→ Prompt 7 (remarketing)
