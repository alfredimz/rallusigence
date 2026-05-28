/* global React */
const { useState } = React;

/* ---------- Icons (Lucide-style, stroke 1.5, round caps) ---------- */
const Icon = ({ d, size = 20, color = 'currentColor', children }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ flex: 'none' }}>
    {children || <path d={d} />}
  </svg>
);
const IconShield = (p) => <Icon {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></Icon>;
const IconBolt = (p) => <Icon {...p}><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/></Icon>;
const IconChat = (p) => <Icon {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></Icon>;
const IconTrend = (p) => <Icon {...p}><path d="M22 7 13.5 15.5 8.5 10.5 2 17"/><path d="M16 7h6v6"/></Icon>;
const IconClock = (p) => <Icon {...p}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></Icon>;
const IconArrow = (p) => <Icon {...p}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></Icon>;
const IconCheck = (p) => <Icon {...p}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></Icon>;
const IconStar = (p) => <Icon {...p}><path d="M12 2 15 9l7 .8-5.5 4.7L18 22l-6-3.5L6 22l1.5-7.5L2 9.8l7-.8 3-7Z"/></Icon>;
const IconMenu = (p) => <Icon {...p}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></Icon>;

/* ---------- Buttons ---------- */
const Button = ({ children, variant = 'primary', size = 'md', as: Tag = 'button', ...rest }) => {
  const cls = `rs-btn rs-btn--${variant} rs-btn--${size}`;
  return <Tag className={cls} {...rest}>{children}</Tag>;
};

/* ---------- Header ---------- */
const Header = () => (
  <header className="rs-nav">
    <div className="rs-nav__inner">
      <a className="rs-nav__brand" href="#">
        <img src="../../assets/icono.svg" alt="" width="36" height="36"/>
        <span className="rs-nav__word">Rallusigence</span>
      </a>
      <nav className="rs-nav__links">
        <a href="#servicios">Servicios</a>
        <a href="#proceso">Proceso</a>
        <a href="#casos">Casos</a>
        <a href="#contacto">Contacto</a>
      </nav>
      <Button variant="primary" size="sm" as="a" href="#contacto">Auditoría gratis</Button>
      <button className="rs-nav__menu" aria-label="Menú"><IconMenu /></button>
    </div>
  </header>
);

/* ---------- Hero ---------- */
const Hero = () => (
  <section className="rs-hero">
    <div className="rs-hero__inner">
      <div className="rs-eyebrow">Agencia de IA · Hidalgo, México</div>
      <h1 className="rs-h1 rs-hero__title">Tu negocio<br/>automatizado en días</h1>
      <p className="rs-hero__lead">
        WhatsApp 24/7, sitio web profesional, procesos automáticos. Sin intermediarios, sin meses de espera.
      </p>
      <div className="rs-hero__cta">
        <Button variant="primary" as="a" href="#contacto">Mi auditoría gratis <IconArrow size={18}/></Button>
        <Button variant="ghost" as="a" href="#servicios">Ver servicios →</Button>
      </div>
      <div className="rs-hero__proof">
        <span><IconCheck size={16} color="#10B981"/> 48 h de respuesta</span>
        <span><IconCheck size={16} color="#10B981"/> Precio fijo</span>
        <span><IconCheck size={16} color="#10B981"/> Sin contratos largos</span>
      </div>
    </div>
  </section>
);

/* ---------- Pain ---------- */
const Pain = () => {
  const items = [
    { e: '⏰', t: 'Respondes WhatsApp a las 11 pm', d: 'Los clientes escriben a toda hora. Si tardas, se van con la competencia.' },
    { e: '💸', t: 'Pierdes ventas por no contestar rápido', d: 'Cada hora sin responder cuesta clientes que ya estaban listos para pagar.' },
    { e: '🤦‍♂️', t: 'Tu sitio web no aparece en Google', d: 'Si no apareces, no existes. La gente busca y encuentra a otros antes que a ti.' },
  ];
  return (
    <section className="rs-pain">
      <div className="rs-section-inner">
        <h2 className="rs-h2">Esto te suena familiar</h2>
        <div className="rs-pain__grid">
          {items.map((i,k) => (
            <div className="rs-pain__item" key={k}>
              <div className="rs-pain__emoji" aria-hidden>{i.e}</div>
              <h3 className="rs-h4">{i.t}</h3>
              <p className="rs-body">{i.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- Services ---------- */
const ServiceCard = ({ icon: Ic, title, desc, price, featured }) => (
  <div className={`rs-svc ${featured ? 'rs-svc--featured' : ''}`}>
    <div className="rs-svc__icon"><Ic size={24}/></div>
    <h3 className="rs-h4">{title}</h3>
    <p className="rs-body rs-svc__desc">{desc}</p>
    <div className="rs-price-tag">{price}</div>
  </div>
);

const Services = () => (
  <section className="rs-services" id="servicios">
    <div className="rs-section-inner">
      <div className="rs-eyebrow rs-eyebrow--center">Servicios</div>
      <h2 className="rs-h2 rs-center">Cuatro herramientas. Un solo equipo.</h2>
      <div className="rs-svc__grid">
        <ServiceCard icon={IconBolt}  title="Sitio web profesional" desc="Landing responsivo con SEO, formulario y hosting. Apareces en Google en 3 días." price="Desde $12,000 MXN"/>
        <ServiceCard icon={IconChat}  title="Agente WhatsApp 24/7" desc="Bot IA que responde, agenda citas y filtra clientes mientras duermes." price="Desde $5,000 MXN/mes"/>
        <ServiceCard icon={IconTrend} title="Contenido SEO automático" desc="Artículos optimizados publicados solos. Subes en Google sin escribir tú." price="Desde $3,500 MXN/mes"/>
        <ServiceCard icon={IconShield} title="Auditoría digital" desc="Revisamos tu web, redes y Google. Reporte completo en 48 horas." price="Sin costo" featured/>
      </div>
    </div>
  </section>
);

/* ---------- Process ---------- */
const Process = () => {
  const steps = [
    { n: 1, t: 'Auditoría', d: 'Te revisamos gratis para saber qué automatizar primero.', time: '24 horas' },
    { n: 2, t: 'Configuración', d: 'Programamos todo en 3-7 días mientras sigues trabajando.', time: '3-7 días' },
    { n: 3, t: 'Entrenamiento', d: 'Te enseñamos a usar tus herramientas en 30 minutos.', time: '30 minutos' },
    { n: 4, t: 'Soporte', d: 'Mantenimiento y mejoras continuas. Hablas directo conmigo.', time: 'Continuo' },
  ];
  return (
    <section className="rs-proc" id="proceso">
      <div className="rs-section-inner">
        <div className="rs-eyebrow">Cómo trabajamos</div>
        <h2 className="rs-h2">Cuatro pasos. Sin sorpresas.</h2>
        <ol className="rs-proc__list">
          {steps.map(s => (
            <li className="rs-proc__item" key={s.n}>
              <div className="rs-proc__num">{s.n}</div>
              <div className="rs-proc__body">
                <h3 className="rs-h4">{s.t}</h3>
                <p className="rs-body">{s.d}</p>
                <div className="rs-proc__time"><IconClock size={14}/> {s.time}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

/* ---------- Differentiators ---------- */
const Diff = () => {
  const items = [
    { t: 'Sin intermediarios', d: 'Hablas directo conmigo, no con un account manager.' },
    { t: 'Días, no meses', d: 'Automatizamos en una semana, no en 90 días.' },
    { t: 'Precio fijo, antes de empezar', d: 'Cotizamos por proyecto, no por hora. Sin sorpresas.' },
    { t: 'Te ayudamos a usarlo', d: 'No te dejamos con un manual. Te entrenamos hasta que lo dominas.' },
  ];
  return (
    <section className="rs-diff">
      <div className="rs-section-inner">
        <h2 className="rs-h2 rs-center">No somos una agencia tradicional</h2>
        <div className="rs-diff__grid">
          {items.map((i,k) => (
            <div className="rs-diff__item" key={k}>
              <div className="rs-diff__check"><IconCheck size={16} color="#fff"/></div>
              <div>
                <h3 className="rs-h4">{i.t}</h3>
                <p className="rs-body">{i.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- Testimonial ---------- */
const Testimonial = () => (
  <section className="rs-testi">
    <div className="rs-section-inner rs-testi__inner">
      <div className="rs-stars">{Array.from({length:5}).map((_,i)=><IconStar key={i} size={16} color="#FFD31B"/>)}</div>
      <p className="rs-display rs-testi__q">
        "Antes perdía clientes porque no podía responder WhatsApp en consulta. Ahora mi bot agenda automáticamente y solo me avisa los casos importantes."
      </p>
      <div className="rs-testi__who">
        <div className="rs-testi__name">Dr. Roberto Martínez</div>
        <div className="rs-testi__co">Clínica Dental · León, GTO</div>
      </div>
    </div>
  </section>
);

/* ---------- Form ---------- */
const FormField = ({ label, type='text', placeholder, required, error, value, onChange }) => (
  <label className={`rs-field ${error ? 'rs-field--error' : ''}`}>
    <span className={`rs-label ${required ? 'rs-label--req' : ''}`}>{label}</span>
    <input className="rs-input" type={type} placeholder={placeholder}
      value={value} onChange={onChange}/>
    {error && <span className="rs-field__err">{error}</span>}
  </label>
);

const ContactForm = () => {
  const [v, setV] = useState({ name:'', email:'', wa:'', biz:'' });
  const [sent, setSent] = useState(false);
  const set = k => e => setV({ ...v, [k]: e.target.value });
  const submit = e => { e.preventDefault(); setSent(true); };

  return (
    <section className="rs-contact" id="contacto">
      <div className="rs-section-inner rs-contact__inner">
        <div>
          <div className="rs-eyebrow">Auditoría digital · gratis</div>
          <h2 className="rs-h2">Recibe tu reporte en 48 horas</h2>
          <p className="rs-body rs-contact__lead">
            Revisamos tu sitio, tus redes y tu presencia en Google. Te decimos qué arreglar primero, qué automatizar y cuánto cuesta. Sin compromiso.
          </p>
          <ul className="rs-contact__bullets">
            <li><IconCheck size={16} color="#10B981"/> Análisis de tu sitio actual</li>
            <li><IconCheck size={16} color="#10B981"/> Revisión de redes y Google</li>
            <li><IconCheck size={16} color="#10B981"/> 3 acciones priorizadas</li>
            <li><IconCheck size={16} color="#10B981"/> Cotización si aplica</li>
          </ul>
        </div>
        <form className="rs-form-card" onSubmit={submit}>
          {sent ? (
            <div className="rs-form-ok">
              <div className="rs-form-ok__icon"><IconCheck size={32} color="#10B981"/></div>
              <h3 className="rs-h3">¡Recibido!</h3>
              <p className="rs-body">Te contacto en menos de 24 horas a tu WhatsApp. — Alfredo</p>
            </div>
          ) : (
            <>
              <h3 className="rs-h3">Solicitar auditoría</h3>
              <FormField label="Nombre completo" required value={v.name} onChange={set('name')} placeholder="Dr. Roberto Martínez"/>
              <FormField label="Email" type="email" required value={v.email} onChange={set('email')} placeholder="roberto@clinica.mx"/>
              <FormField label="WhatsApp" required value={v.wa} onChange={set('wa')} placeholder="55 1234 5678"/>
              <FormField label="Tu negocio" value={v.biz} onChange={set('biz')} placeholder="Clínica Dental"/>
              <Button variant="primary" type="submit" size="lg">Enviar — auditoría gratis</Button>
              <p className="rs-form-fine">Respondo en menos de 24 horas. Cero spam.</p>
            </>
          )}
        </form>
      </div>
    </section>
  );
};

/* ---------- Footer ---------- */
const Footer = () => (
  <footer className="rs-footer">
    <div className="rs-section-inner rs-footer__inner">
      <div className="rs-footer__brand">
        <img src="../../assets/letras-icono-horizontal.svg" alt="Rallusigence" height="32"/>
        <p className="rs-small">Tu negocio automatizado sin complicarte.</p>
      </div>
      <div className="rs-footer__cols">
        <div>
          <div className="rs-micro">Servicios</div>
          <a href="#">Sitio web</a>
          <a href="#">WhatsApp 24/7</a>
          <a href="#">SEO automático</a>
        </div>
        <div>
          <div className="rs-micro">Empresa</div>
          <a href="#">Sobre Alfredo</a>
          <a href="#">Casos</a>
          <a href="#">Contacto</a>
        </div>
        <div>
          <div className="rs-micro">Legal</div>
          <a href="#">Aviso de privacidad</a>
          <a href="#">Términos</a>
        </div>
      </div>
    </div>
    <div className="rs-footer__bot">
      <span>© 2025 Rallusigence · Tizayuca, Hidalgo</span>
      <span>rallusigence.net</span>
    </div>
  </footer>
);

/* ---------- App ---------- */
const App = () => (
  <>
    <Header />
    <main>
      <Hero />
      <Pain />
      <Services />
      <Process />
      <Diff />
      <Testimonial />
      <ContactForm />
    </main>
    <Footer />
    <a href="#contacto" className="rs-sticky-cta">Auditoría gratis</a>
  </>
);

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
