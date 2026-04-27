# DESIGN SYSTEM — RALLUSIGENCE
# Fase 4: Sistema de componentes completo | v1.0

---

## VARIABLES CSS BASE

```css
:root {
  /* === COLORES PRINCIPALES === */
  --color-primary: #20B4B1;       /* turquesa brillante — identidad principal */
  --color-primary-dark: #198C76;  /* hover sobre primario */
  --color-primary-alt: #029E81;   /* verde turquesa — variante */
  --color-blue: #1078BC;          /* azul — informativos */
  --color-green-mid: #10AE8F;     /* verde medio — apoyo */

  /* === COLORES SECUNDARIOS === */
  --color-blue-light: #1B8CCD;
  --color-blue-dark: #1E5F90;
  --color-blue-intense: #2B378C;
  --color-green-blue: #34A2A7;
  --color-blue-mid: #3D53A0;
  --color-gray-blue: #54949A;
  --color-gray-blue2: #58639B;
  --color-gray-warm: #594B4B;
  --color-sky: #5AC1D2;
  --color-teal-light: #6EC5CC;

  /* === COLORES DE ACENTO === */
  --color-olive: #739341;
  --color-green-vibrant: #76B72A;
  --color-lime: #9DC53C;
  --color-red-soft: #B34E50;
  --color-orange-dark: #B57130;
  --color-mustard: #BA9A36;
  --color-brick: #C14725;
  --color-pink: #D8676E;
  --color-orange-strong: #DC4A21;
  --color-gold: #DDAE29;
  --color-red-vivid: #EB5B5B;
  --color-orange-red: #EB5E39;
  --color-orange-bright: #F39323;
  --color-orange-light: #F5A153;
  --color-yellow: #FFD31B;

  /* === NEUTROS === */
  --color-white: #FFFFFF;
  --color-text: #2C2C2C;
  --color-border: #E5E5E5;

  /* === ALIAS FUNCIONALES (para usar en componentes) === */
  --color-cta: var(--color-primary);
  --color-cta-hover: var(--color-primary-dark);
  --color-background: var(--color-white);
  --color-text-main: var(--color-text);

  /* === TIPOGRAFÍA === */
  --font-primary: 'Montserrat', sans-serif;
  --font-elegant: 'Playfair Display', serif;
  --font-creative: 'Lobster', cursive;
  --font-creative-alt: 'Pacifico', cursive;
  --font-informal: 'Patrick Hand', cursive;
  --font-accent: 'Amatic SC', cursive;

  /* Pesos */
  --weight-regular: 400;
  --weight-semibold: 600;
  --weight-bold: 700;

  /* Escala tipográfica */
  --text-h1: 48px;
  --text-h2: 36px;
  --text-h3: 24px;
  --text-body: 16px;
  --text-small: 14px;
  --text-label: 14px;

  /* Line heights */
  --leading-tight: 1.1;
  --leading-snug: 1.2;
  --leading-normal: 1.3;
  --leading-relaxed: 1.6;

  /* === ESPACIADO (8px grid) === */
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 48px;
  --space-5: 80px;

  /* === LAYOUT === */
  --container-max: 1200px;
  --content-max: 600px;
  --border-radius: 4px;
  --transition-base: all 0.2s ease-in-out;
}
```

---

## btn-primary

### Anatomía
Botón principal del sitio con color teal de marca. Usado para CTAs principales como "Solicitar auditoría", "Enviar", "Contratar".

### Variantes
- Tamaño normal (desktop/tablet)
- Tamaño completo (mobile)

### Estados
- **Default:** Fondo teal, texto blanco, sin sombra
- **Hover:** Fondo más oscuro (#198C76), elevación sutil
- **Focus:** Ring teal con outline
- **Active:** Fondo presionado (#10AE8F)
- **Disabled:** Opacidad 50%, no interactivo
- **Loading:** Spinner blanco, texto "Enviando..."

### Especificaciones
- Altura: 48px
- Padding: 12px 24px
- Border radius: 4px
- Font: Montserrat SemiBold / 16px
- Color texto: #FFFFFF
- Color fondo: #20B4B1
- Color borde: none
- Transición: all 0.2s ease-in-out

### Comportamiento responsive
- Desktop: ancho automático según contenido
- Mobile: ancho completo (100%) en formularios

### CSS
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  padding: 12px 24px;
  background-color: var(--color-primary);
  color: #FFFFFF;
  font-family: var(--font-primary);
  font-weight: 500;
  font-size: 16px;
  line-height: 1.2;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  text-decoration: none;
  transition: var(--transition-base);
  user-select: none;
}

.btn-primary:hover {
  background-color: #198C76;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(32, 180, 177, 0.15);
}

.btn-primary:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.btn-primary:active {
  background-color: #10AE8F;
  transform: translateY(0);
  box-shadow: none;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn-primary--loading {
  pointer-events: none;
}

.btn-primary--loading::before {
  content: '';
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border: 2px solid transparent;
  border-top: 2px solid #FFFFFF;
  border-radius: 50%;
  animation: btn-spinner 0.8s linear infinite;
}

@keyframes btn-spinner {
  to { transform: rotate(360deg); }
}

@media (max-width: 767px) {
  .btn-primary--full {
    width: 100%;
  }
}
```

---

## btn-secondary

### Anatomía
Botón secundario con borde teal y texto teal. Usado para acciones secundarias como "Ver más", "Conocer equipo".

### Variantes
- Normal
- Compacto (padding reducido)

### Estados
- **Default:** Fondo transparente, borde teal, texto teal
- **Hover:** Fondo teal claro (5% opacidad)
- **Focus:** Ring teal con outline
- **Active:** Fondo teal claro (10% opacidad)
- **Disabled:** Opacidad 50%, no interactivo

### Especificaciones
- Altura: 48px
- Padding: 12px 24px
- Border radius: 4px
- Font: Montserrat SemiBold / 16px
- Color texto: #20B4B1
- Color fondo: transparent
- Color borde: #20B4B1 (1px solid)
- Transición: all 0.2s ease-in-out

### Comportamiento responsive
- Mantiene tamaño en todos los breakpoints
- En mobile puede reducir padding lateral a 16px

### CSS
```css
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  padding: 12px 24px;
  background-color: transparent;
  color: var(--color-primary);
  font-family: var(--font-primary);
  font-weight: 500;
  font-size: 16px;
  line-height: 1.2;
  border: 1px solid var(--color-primary);
  border-radius: var(--border-radius);
  cursor: pointer;
  text-decoration: none;
  transition: var(--transition-base);
  user-select: none;
}

.btn-secondary:hover {
  background-color: rgba(32, 180, 177, 0.05);
}

.btn-secondary:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.btn-secondary:active {
  background-color: rgba(32, 180, 177, 0.1);
}

.btn-secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary--compact {
  height: 40px;
  padding: 8px 16px;
  font-size: 14px;
}

@media (max-width: 767px) {
  .btn-secondary {
    padding: 12px 16px;
  }
}
```

---

## btn-sticky

### Anatomía
Botón fijo en la parte inferior de la pantalla en mobile. Aparece al hacer scroll y permite acceso rápido al formulario de auditoría.

### Variantes
- Visible (aparece después de 300px de scroll)
- Oculto (al inicio y al llegar al formulario)

### Estados
- **Default:** Fondo teal, texto blanco, sombra elevada
- **Hover:** Fondo más oscuro (solo en desktop)
- **Active:** Feedback visual de presión

### Especificaciones
- Altura: 56px
- Padding: 16px 24px
- Border radius: 28px (completamente redondeado)
- Font: Inter 600 / 16px
- Color texto: #FFFFFF
- Color fondo: #20B4B1
- Sombra: 0 4px 16px rgba(0, 0, 0, 0.15)
- Transición: all 0.3s ease-in-out

### Comportamiento responsive
- Solo visible en mobile y tablet (< 1024px)
- Se oculta en desktop
- Aparece/desaparece con scroll suave

### CSS
```css
.btn-sticky {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%) translateY(100px);
  z-index: 100;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  padding: 16px 24px;
  background-color: var(--color-primary);
  color: #FFFFFF;
  font-family: var(--font-primary);
  font-weight: 600;
  font-size: 16px;
  line-height: 1.2;
  border: none;
  border-radius: 28px;
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease-in-out;
  user-select: none;
  opacity: 0;
  pointer-events: none;
}

.btn-sticky--visible {
  opacity: 1;
  pointer-events: all;
  transform: translateX(-50%) translateY(0);
}

.btn-sticky:hover {
  background-color: #198C76;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.btn-sticky:active {
  transform: translateX(-50%) translateY(1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

@media (min-width: 1024px) {
  .btn-sticky {
    display: none;
  }
}
```

---

## btn-ghost

### Anatomía
Botón de solo texto para CTAs secundarios discretos. Sin fondo ni borde, solo efecto hover.

### Variantes
- Normal
- Con ícono (flecha derecha)

### Estados
- **Default:** Solo texto, sin fondo
- **Hover:** Subrayado teal
- **Focus:** Ring teal con outline
- **Active:** Texto más oscuro

### Especificaciones
- Altura: auto
- Padding: 8px 0
- Border radius: none
- Font: Montserrat SemiBold / 16px
- Color texto: #20B4B1
- Color fondo: transparent
- Transición: all 0.2s ease-in-out

### Comportamiento responsive
- Mantiene propiedades en todos los tamaños
- En mobile puede reducir font-size a 14px

### CSS
```css
.btn-ghost {
  display: inline-flex;
  align-items: center;
  padding: 8px 0;
  background-color: transparent;
  color: var(--color-primary);
  font-family: var(--font-primary);
  font-weight: 500;
  font-size: 16px;
  line-height: 1.2;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: var(--transition-base);
  user-select: none;
}

.btn-ghost:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-color: var(--color-primary);
}

.btn-ghost:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: 2px;
}

.btn-ghost:active {
  color: #198C76;
}

.btn-ghost--with-icon::after {
  content: '→';
  margin-left: 8px;
  transition: transform 0.2s ease-in-out;
}

.btn-ghost--with-icon:hover::after {
  transform: translateX(4px);
}

@media (max-width: 767px) {
  .btn-ghost {
    font-size: 14px;
  }
}
```

---

## input-field

### Anatomía
Campo de entrada de texto para formularios. Base para nombre, email, WhatsApp, empresa.

### Variantes
- Texto normal
- Email
- Teléfono
- Textarea (para mensajes)

### Estados
- **Default:** Borde gris claro, fondo blanco
- **Focus:** Borde teal, ring teal
- **Error:** Borde rojo, texto de error
- **Disabled:** Fondo gris claro, texto gris
- **Filled:** Borde gris medio

### Especificaciones
- Altura: 48px (inputs), auto (textarea)
- Padding: 12px 16px
- Border radius: 4px
- Font: Montserrat Regular / 16px
- Color texto: #2C2C2C
- Color fondo: #FFFFFF
- Color borde: #E5E5E5
- Transición: all 0.2s ease-in-out

### Comportamiento responsive
- Mantiene altura en mobile
- En iOS Safari: font-size mínimo 16px para evitar zoom

### CSS
```css
.input-field {
  display: block;
  width: 100%;
  height: 48px;
  padding: 12px 16px;
  background-color: var(--color-background);
  color: var(--color-text-main);
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: 16px;
  line-height: 1.4;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  transition: var(--transition-base);
  appearance: none;
}

.input-field::placeholder {
  color: #9CA3AF;
  opacity: 1;
}

.input-field:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(32, 180, 177, 0.1);
}

.input-field:disabled {
  background-color: #F9FAFB;
  color: #6B7280;
  cursor: not-allowed;
}

.input-field--error {
  border-color: #EF4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.input-field--filled {
  border-color: #D1D5DB;
}

.input-field--textarea {
  height: auto;
  min-height: 120px;
  resize: vertical;
}

/* Fix para zoom en iOS */
@media screen and (max-width: 767px) {
  .input-field {
    font-size: 16px;
  }
}
```

---

## input-label

### Anatomía
Etiqueta descriptiva para campos de formulario. Siempre va antes del input correspondiente.

### Variantes
- Normal
- Con asterisco (requerido)
- Con información adicional

### Estados
- **Default:** Texto normal
- **Required:** Con asterisco rojo
- **Error:** Texto rojo cuando hay error en el campo

### Especificaciones
- Altura: auto
- Padding: none
- Font: Montserrat SemiBold / 14px
- Color texto: #2C2C2C
- Margin bottom: 8px
- Transición: color 0.2s ease-in-out

### Comportamiento responsive
- Mantiene propiedades en todos los tamaños

### CSS
```css
.input-label {
  display: block;
  margin-bottom: 8px;
  color: var(--color-text-main);
  font-family: var(--font-primary);
  font-weight: 500;
  font-size: 14px;
  line-height: 1.4;
  letter-spacing: 0.02em;
  transition: color 0.2s ease-in-out;
}

.input-label--required::after {
  content: ' *';
  color: #EF4444;
}

.input-label--error {
  color: #EF4444;
}

.input-label__info {
  font-weight: 400;
  color: #6B7280;
  font-size: 12px;
  margin-top: 4px;
}
```

---

## input-error

### Anatomía
Mensaje de error que aparece debajo de campos con validación fallida.

### Variantes
- Error de validación
- Error de formato
- Error de servidor

### Estados
- **Hidden:** Display none cuando no hay error
- **Visible:** Aparece con animación suave

### Especificaciones
- Altura: auto
- Padding: 4px 0
- Font: Montserrat Regular / 12px
- Color texto: #EF4444
- Margin top: 4px
- Transición: opacity 0.2s ease-in-out

### Comportamiento responsive
- Mantiene propiedades en todos los tamaños

### CSS
```css
.input-error {
  display: block;
  margin-top: 4px;
  padding: 4px 0;
  color: #EF4444;
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: 12px;
  line-height: 1.4;
  opacity: 0;
  transform: translateY(-4px);
  transition: all 0.2s ease-in-out;
  pointer-events: none;
}

.input-error--visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## form-group

### Anatomía
Contenedor que agrupa label + input + mensaje de error. Unidad básica de formulario.

### Variantes
- Campo normal
- Campo requerido
- Campo con error

### Estados
- **Default:** Espaciado normal
- **Error:** Margin adicional para error message
- **Last:** Sin margin-bottom

### Especificaciones
- Margin bottom: 24px
- Padding: none
- Display: block

### Comportamiento responsive
- Reduce margin-bottom en mobile a 20px

### CSS
```css
.form-group {
  display: block;
  margin-bottom: 24px;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-group--error {
  margin-bottom: 32px;
}

@media (max-width: 767px) {
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group--error {
    margin-bottom: 28px;
  }
}
```

---

## form-card

### Anatomía
Contenedor principal del formulario de auditoría. Card con padding, sombra sutil y fondo blanco.

### Variantes
- Normal (desktop)
- Compacto (mobile)

### Estados
- **Default:** Sombra sutil, fondo blanco
- **Loading:** Overlay con spinner
- **Success:** Mensaje de éxito
- **Error:** Borde rojo, mensaje de error

### Especificaciones
- Padding: 40px (desktop), 24px (mobile)
- Border radius: 8px
- Color fondo: #FFFFFF
- Sombra: 0 4px 24px rgba(0, 0, 0, 0.08)
- Border: 1px solid #F3F4F6

### Comportamiento responsive
- Reduce padding y margin en mobile
- Elimina sombra en mobile muy pequeño

### CSS
```css
.form-card {
  background-color: var(--color-background);
  border: 1px solid #F3F4F6;
  border-radius: 8px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  padding: 40px;
  position: relative;
  overflow: hidden;
}

.form-card__title {
  margin-bottom: 8px;
  color: var(--color-text-main);
  font-family: var(--font-primary);
  font-weight: 700;
  font-size: 24px;
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.form-card__subtitle {
  margin-bottom: 32px;
  color: #6B7280;
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: 16px;
  line-height: 1.6;
}

.form-card--loading::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-card--error {
  border-color: #FECACA;
  background-color: #FEF2F2;
}

.form-card--success {
  border-color: #A7F3D0;
  background-color: #ECFDF5;
}

@media (max-width: 767px) {
  .form-card {
    padding: 24px;
    border-radius: 6px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  }
  
  .form-card__title {
    font-size: 20px;
    margin-bottom: 6px;
  }
  
  .form-card__subtitle {
    font-size: 14px;
    margin-bottom: 24px;
  }
}

@media (max-width: 480px) {
  .form-card {
    box-shadow: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
  }
}
```

---

## service-card

### Anatomía
Tarjeta individual de servicio con ícono, nombre, descripción, precio y botón CTA.

### Variantes
- Normal
- Destacada (featured)

### Estados
- **Default:** Borde gris, fondo blanco
- **Hover:** Elevación sutil, borde teal
- **Featured:** Fondo teal, texto blanco

### Especificaciones
- Padding: 24px
- Border radius: 8px
- Color fondo: #FFFFFF
- Color borde: #E5E5E5
- Sombra hover: 0 4px 16px rgba(0, 0, 0, 0.1)
- Transición: all 0.2s ease-in-out

### Comportamiento responsive
- Stacking vertical en mobile
- Padding reducido a 20px en mobile

### CSS
```css
.service-card {
  display: flex;
  flex-direction: column;
  padding: 24px;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  transition: var(--transition-base);
  text-decoration: none;
  color: inherit;
}

.service-card:hover {
  border-color: var(--color-primary);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.service-card__icon {
  width: 48px;
  height: 48px;
  margin-bottom: 16px;
  color: var(--color-primary);
}

.service-card__title {
  margin-bottom: 8px;
  color: var(--color-text-main);
  font-family: var(--font-primary);
  font-weight: 600;
  font-size: 18px;
  line-height: 1.3;
}

.service-card__description {
  margin-bottom: 16px;
  color: #6B7280;
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
  flex-grow: 1;
}

.service-card__price {
  margin-bottom: 16px;
  color: var(--color-text-main);
  font-family: var(--font-family-mono);
  font-weight: 600;
  font-size: 20px;
  line-height: 1.2;
}

.service-card__cta {
  align-self: flex-start;
}

/* Variante destacada */
.service-card--featured {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: #FFFFFF;
}

.service-card--featured .service-card__icon {
  color: #FFFFFF;
}

.service-card--featured .service-card__title {
  color: #FFFFFF;
}

.service-card--featured .service-card__description {
  color: rgba(255, 255, 255, 0.8);
}

.service-card--featured .service-card__price {
  color: #FFFFFF;
}

.service-card--featured:hover {
  background-color: #198C76;
  border-color: #198C76;
}

@media (max-width: 767px) {
  .service-card {
    padding: 20px;
  }
  
  .service-card__icon {
    width: 40px;
    height: 40px;
  }
  
  .service-card__title {
    font-size: 16px;
  }
  
  .service-card__price {
    font-size: 18px;
  }
}
```

---

## testimonial-card

### Anatomía
Tarjeta de testimonio con quote, texto, nombre del cliente y empresa.

### Variantes
- Con foto del cliente
- Solo texto

### Estados
- **Default:** Fondo gris muy claro, quote destacado
- **Hover:** Elevación sutil (opcional)

### Especificaciones
- Padding: 24px
- Border radius: 8px
- Color fondo: #F9FAFB
- Border: none
- Quote mark: teal

### Comportamiento responsive
- Padding reducido en mobile
- Stack vertical de elementos

### CSS
```css
.testimonial-card {
  padding: 24px;
  background-color: #F9FAFB;
  border-radius: 8px;
  position: relative;
}

.testimonial-card::before {
  content: '"';
  position: absolute;
  top: 16px;
  left: 16px;
  color: var(--color-primary);
  font-family: var(--font-primary);
  font-weight: 700;
  font-size: 32px;
  line-height: 1;
  opacity: 0.6;
}

.testimonial-card__quote {
  margin-bottom: 16px;
  padding-left: 32px;
  color: var(--color-text-main);
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: 16px;
  line-height: 1.6;
  font-style: italic;
}

.testimonial-card__author {
  margin-bottom: 4px;
  color: var(--color-text-main);
  font-family: var(--font-primary);
  font-weight: 600;
  font-size: 14px;
  line-height: 1.4;
}

.testimonial-card__company {
  color: #6B7280;
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: 12px;
  line-height: 1.4;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

@media (max-width: 767px) {
  .testimonial-card {
    padding: 20px;
  }
  
  .testimonial-card::before {
    top: 12px;
    left: 12px;
    font-size: 28px;
  }
  
  .testimonial-card__quote {
    padding-left: 24px;
    font-size: 14px;
  }
}
```

---

## pain-item

### Anatomía
Ítem de problema del cliente con ícono de dolor y descripción del problema específico.

### Variantes
- Con ícono emoji
- Con ícono SVG

### Estados
- **Default:** Ícono rojo/naranja, texto descriptivo

### Especificaciones
- Display: flex
- Gap: 16px
- Padding: 16px 0
- Border bottom: línea sutil (opcional)

### Comportamiento responsive
- Reduce gap y padding en mobile
- Ícono más pequeño en mobile

### CSS
```css
.pain-item {
  display: flex;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid #F3F4F6;
}

.pain-item:last-child {
  border-bottom: none;
}

.pain-item__icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  font-size: 24px;
  line-height: 1;
}

.pain-item__content {
  flex: 1;
}

.pain-item__title {
  margin-bottom: 4px;
  color: var(--color-text-main);
  font-family: var(--font-primary);
  font-weight: 600;
  font-size: 16px;
  line-height: 1.3;
}

.pain-item__description {
  color: #6B7280;
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
}

@media (max-width: 767px) {
  .pain-item {
    gap: 12px;
    padding: 12px 0;
  }
  
  .pain-item__icon {
    width: 20px;
    height: 20px;
    font-size: 20px;
  }
  
  .pain-item__title {
    font-size: 14px;
  }
  
  .pain-item__description {
    font-size: 13px;
  }
}
```

---

## step-item

### Anatomía
Paso del proceso con número, título, descripción y tiempo estimado.

### Variantes
- Paso completado
- Paso actual
- Paso pendiente

### Estados
- **Default:** Número con fondo teal
- **Current:** Número con ring teal
- **Completed:** Check mark verde

### Especificaciones
- Display: flex
- Gap: 20px
- Padding: 24px 0
- Número: círculo 40px con fondo teal

### Comportamiento responsive
- Reduce gap y padding en mobile
- Número más pequeño (32px)

### CSS
```css
.step-item {
  display: flex;
  gap: 20px;
  padding: 24px 0;
  border-bottom: 1px solid #F3F4F6;
}

.step-item:last-child {
  border-bottom: none;
}

.step-item__number {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: var(--color-primary);
  color: #FFFFFF;
  font-family: var(--font-primary);
  font-weight: 700;
  font-size: 16px;
  line-height: 1;
  border-radius: 50%;
}

.step-item__content {
  flex: 1;
  padding-top: 4px;
}

.step-item__title {
  margin-bottom: 4px;
  color: var(--color-text-main);
  font-family: var(--font-primary);
  font-weight: 600;
  font-size: 18px;
  line-height: 1.3;
}

.step-item__description {
  margin-bottom: 8px;
  color: #6B7280;
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
}

.step-item__time {
  color: var(--color-primary);
  font-family: var(--font-family-mono);
  font-weight: 500;
  font-size: 12px;
  line-height: 1.4;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Estados del paso */
.step-item--current .step-item__number {
  background-color: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  box-shadow: 0 0 0 3px rgba(32, 180, 177, 0.1);
}

.step-item--completed .step-item__number {
  background-color: #10B981;
  color: #FFFFFF;
}

.step-item--completed .step-item__number::before {
  content: '✓';
  font-weight: 700;
}

@media (max-width: 767px) {
  .step-item {
    gap: 16px;
    padding: 20px 0;
  }
  
  .step-item__number {
    width: 32px;
    height: 32px;
    font-size: 14px;
  }
  
  .step-item__title {
    font-size: 16px;
  }
  
  .step-item__time {
    font-size: 11px;
  }
}
```

---

## differentiator-item

### Anatomía
Diferenciador competitivo con check mark, título y descripción de la ventaja.

### Variantes
- Normal
- Destacado (bold)

### Estados
- **Default:** Check verde, texto normal

### Especificaciones
- Display: flex
- Gap: 16px
- Padding: 12px 0
- Check: ícono verde circular

### Comportamiento responsive
- Mantiene estructura en mobile
- Reduce gap y padding

### CSS
```css
.differentiator-item {
  display: flex;
  gap: 16px;
  padding: 12px 0;
}

.differentiator-item__check {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background-color: #10B981;
  color: #FFFFFF;
  font-size: 12px;
  line-height: 1;
  border-radius: 50%;
  margin-top: 2px;
}

.differentiator-item__check::before {
  content: '✓';
  font-weight: 700;
}

.differentiator-item__content {
  flex: 1;
}

.differentiator-item__title {
  margin-bottom: 4px;
  color: var(--color-text-main);
  font-family: var(--font-primary);
  font-weight: 600;
  font-size: 16px;
  line-height: 1.3;
}

.differentiator-item__description {
  color: #6B7280;
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
}

.differentiator-item--featured .differentiator-item__title {
  font-weight: 700;
  color: var(--color-primary);
}

@media (max-width: 767px) {
  .differentiator-item {
    gap: 12px;
    padding: 10px 0;
  }
  
  .differentiator-item__title {
    font-size: 14px;
  }
  
  .differentiator-item__description {
    font-size: 13px;
  }
}
```

---

## section-title

### Anatomía
Título de sección con H2 principal y subtítulo opcional descriptivo.

### Variantes
- Solo título
- Con subtítulo
- Centrado
- Alineado izquierda

### Estados
- **Default:** Títulos con spacing definido

### Especificaciones
- H2: 36px / Montserrat Bold
- Subtítulo: 16px / Montserrat Regular
- Gap: 8px entre título y subtítulo
- Text align: center o left

### Comportamiento responsive
- Reduce font-sizes en mobile
- Mantiene proporciones

### CSS
```css
.section-title {
  text-align: center;
  margin-bottom: 48px;
}

.section-title--left {
  text-align: left;
}

.section-title__heading {
  margin-bottom: 8px;
  color: var(--color-text-main);
  font-family: var(--font-primary);
  font-weight: 700;
  font-size: 36px;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.section-title__subtitle {
  color: #6B7280;
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: 16px;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

.section-title--left .section-title__subtitle {
  margin: 0;
}

@media (max-width: 767px) {
  .section-title {
    margin-bottom: 32px;
  }
  
  .section-title__heading {
    font-size: 28px;
  }
  
  .section-title__subtitle {
    font-size: 14px;
  }
}
```

---

## section-wrapper

### Anatomía
Contenedor de sección con espaciado vertical estándar y ancho máximo.

### Variantes
- Normal (80px spacing)
- Compacto (48px spacing)
- Extendido (120px spacing)

### Estados
- **Default:** Padding vertical y horizontal estándar

### Especificaciones
- Padding: 80px 24px
- Max width: 1200px
- Margin: 0 auto

### Comportamiento responsive
- Reduce padding vertical en tablet y mobile
- Reduce padding horizontal en mobile

### CSS
```css
.section-wrapper {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 80px 24px;
}

.section-wrapper--compact {
  padding: 48px 24px;
}

.section-wrapper--extended {
  padding: 120px 24px;
}

@media (max-width: 1024px) {
  .section-wrapper {
    padding: 60px 20px;
  }
  
  .section-wrapper--compact {
    padding: 40px 20px;
  }
  
  .section-wrapper--extended {
    padding: 80px 20px;
  }
}

@media (max-width: 767px) {
  .section-wrapper {
    padding: 48px 16px;
  }
  
  .section-wrapper--compact {
    padding: 32px 16px;
  }
  
  .section-wrapper--extended {
    padding: 64px 16px;
  }
}
```

---

## nav-header

### Anatomía
Header sticky con logo y botón CTA. Responsive con hamburger menu en mobile.

### Variantes
- Desktop (logo + nav + CTA)
- Mobile (logo + hamburger + CTA)

### Estados
- **Default:** Fondo blanco, sombra sutil
- **Scrolled:** Sombra más prominente

### Especificaciones
- Altura: 72px
- Padding: 0 24px
- Background: white con backdrop-blur
- Z-index: 50
- Position: sticky top 0

### Comportamiento responsive
- Oculta nav items en mobile
- Muestra hamburger en mobile
- CTA se mantiene siempre visible

### CSS
```css
.nav-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #F3F4F6;
  transition: var(--transition-base);
}

.nav-header--scrolled {
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}

.nav-header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 24px;
  height: 72px;
}

.nav-header__logo {
  font-family: var(--font-primary);
  font-weight: 700;
  font-size: 24px;
  color: var(--color-primary);
  text-decoration: none;
  line-height: 1;
}

.nav-header__nav {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-header__link {
  color: var(--color-text-main);
  font-family: var(--font-primary);
  font-weight: 500;
  font-size: 14px;
  text-decoration: none;
  transition: color 0.2s ease-in-out;
}

.nav-header__link:hover {
  color: var(--color-primary);
}

.nav-header__cta {
  margin-left: 24px;
}

.nav-header__hamburger {
  display: none;
  flex-direction: column;
  width: 24px;
  height: 24px;
  cursor: pointer;
  gap: 4px;
}

.nav-header__hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background-color: var(--color-text-main);
  border-radius: 2px;
  transition: var(--transition-base);
}

@media (max-width: 767px) {
  .nav-header__container {
    padding: 0 16px;
  }
  
  .nav-header__logo {
    font-size: 20px;
  }
  
  .nav-header__nav {
    display: none;
  }
  
  .nav-header__hamburger {
    display: flex;
  }
  
  .nav-header__cta {
    margin-left: 16px;
  }
}
```

---

## footer

### Anatomía
Footer con logo, enlaces importantes y información legal.

### Variantes
- Completo (desktop)
- Compacto (mobile)

### Estados
- **Default:** Fondo gris claro, texto organizado

### Especificaciones
- Padding: 48px 24px
- Background: #F9FAFB
- Border top: 1px solid #E5E5E5

### Comportamiento responsive
- Layout cambia de grid a stack en mobile
- Reduce padding y font-sizes

### CSS
```css
.footer {
  background-color: #F9FAFB;
  border-top: 1px solid var(--color-border);
  padding: 48px 24px 24px;
}

.footer__container {
  max-width: var(--container-max);
  margin: 0 auto;
}

.footer__content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 48px;
  margin-bottom: 32px;
}

.footer__brand {
  display: flex;
  flex-direction: column;
}

.footer__logo {
  font-family: var(--font-primary);
  font-weight: 700;
  font-size: 24px;
  color: var(--color-primary);
  text-decoration: none;
  line-height: 1;
  margin-bottom: 16px;
}

.footer__description {
  color: #6B7280;
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
  max-width: 300px;
}

.footer__section {
  display: flex;
  flex-direction: column;
}

.footer__title {
  margin-bottom: 16px;
  color: var(--color-text-main);
  font-family: var(--font-primary);
  font-weight: 600;
  font-size: 16px;
  line-height: 1.3;
}

.footer__link {
  margin-bottom: 8px;
  color: #6B7280;
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: 14px;
  text-decoration: none;
  line-height: 1.4;
  transition: color 0.2s ease-in-out;
}

.footer__link:hover {
  color: var(--color-primary);
}

.footer__legal {
  padding-top: 32px;
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.footer__copyright {
  color: #9CA3AF;
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: 12px;
  line-height: 1.4;
}

.footer__legal-links {
  display: flex;
  gap: 16px;
}

.footer__legal-link {
  color: #9CA3AF;
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: 12px;
  text-decoration: none;
  line-height: 1.4;
  transition: color 0.2s ease-in-out;
}

.footer__legal-link:hover {
  color: var(--color-primary);
}

@media (max-width: 767px) {
  .footer {
    padding: 32px 16px 16px;
  }
  
  .footer__content {
    grid-template-columns: 1fr;
    gap: 32px;
    margin-bottom: 24px;
  }
  
  .footer__legal {
    flex-direction: column;
    align-items: flex-start;
    padding-top: 24px;
  }
  
  .footer__legal-links {
    width: 100%;
    justify-content: center;
  }
}
```

---

## price-tag

### Anatomía
Badge de precio usando JetBrains Mono para destacar costos y valores.

### Variantes
- Precio normal
- Precio destacado (gratis)
- Precio tachado (descuento)

### Estados
- **Default:** Fondo teal claro, texto teal
- **Free:** Fondo verde, texto verde
- **Strikethrough:** Texto tachado, opacidad reducida

### Especificaciones
- Padding: 4px 8px
- Border radius: 4px
- Font: JetBrains Mono 600
- Display: inline-flex

### Comportamiento responsive
- Reduce font-size en mobile
- Mantiene padding

### CSS
```css
.price-tag {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  background-color: rgba(32, 180, 177, 0.1);
  color: var(--color-primary);
  font-family: var(--font-family-mono);
  font-weight: 600;
  font-size: 14px;
  line-height: 1.2;
  border-radius: 4px;
  white-space: nowrap;
}

.price-tag--free {
  background-color: rgba(16, 185, 129, 0.1);
  color: #10B981;
}

.price-tag--featured {
  background-color: var(--color-primary);
  color: #FFFFFF;
}

.price-tag--strikethrough {
  background-color: rgba(156, 163, 175, 0.1);
  color: #9CA3AF;
  text-decoration: line-through;
  opacity: 0.7;
}

@media (max-width: 767px) {
  .price-tag {
    font-size: 12px;
    padding: 3px 6px;
  }
}
```

---

## UTILIDADES GLOBALES

### Reset y base
```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: 16px;
  line-height: 1.6;
  color: var(--color-text-main);
  background-color: var(--color-background);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  margin: 0;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

p {
  margin: 0;
}

button {
  font-family: inherit;
}

input, textarea {
  font-family: inherit;
}

img {
  max-width: 100%;
  height: auto;
}
```

### Clases de utilidad
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

.mb-0 { margin-bottom: 0; }
.mb-1 { margin-bottom: var(--space-1); }
.mb-2 { margin-bottom: var(--space-2); }
.mb-3 { margin-bottom: var(--space-3); }
.mb-4 { margin-bottom: var(--space-4); }
.mb-5 { margin-bottom: var(--space-5); }

.mt-0 { margin-top: 0; }
.mt-1 { margin-top: var(--space-1); }
.mt-2 { margin-top: var(--space-2); }
.mt-3 { margin-top: var(--space-3); }
.mt-4 { margin-top: var(--space-4); }
.mt-5 { margin-top: var(--space-5); }
```