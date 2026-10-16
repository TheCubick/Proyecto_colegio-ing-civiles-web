import "./Footer.css";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

const currentYear = new Date().getFullYear();
const LOGO_SRC = "/img/logos/logo-colegio.png";

const contact = {
  address: "Tuxtla Gutiérrez, Chiapas, México",
  mapUrl: "https://www.google.com/maps/place/Colegio+de+Ingenieros+Civiles+De+Tuxtla+Gutierrez+A.C./@16.7441016,-93.1082779,19.99z/data=!4m6!3m5!1s0x85ecd8a3b3b8a423:0xf059605d90c93d2d!8m2!3d16.7439165!4d-93.1086248!16s%2Fg%2F11cp762rvb?entry=ttu&g_ep=EgoyMDI2MTAxMy4wIKXMDSoASAFQAw%3D%3D",
  phones: ["961-612-5541", "961-119-0009", "961-114-1636", "961-130-3088"],
  emails: ["colegiodeingenieroscivilestg@gmail.com", "cictgcontabilidad@gmail.com"],
  whatsapp: "https://wa.me/529616125541",
  schedule: [
    ["Lunes a Viernes", "9:00 AM – 5:00 PM"],
    ["Sábados", "9:00 AM – 1:00 PM"],
  ],
  branches: [
    ["Palenque", "916-688-0584 / 916-112-9552"],
    ["Pijijiapan", "961-177-6659"],
    ["Yajalón", "993-382-0479"],
  ],
};

const serviceLinks = [
  ["/tramites/dro", "Director Responsable de Obra (DRO)"],
  ["/tramites/rt", "Representante Técnico (RT)"],
  ["/tramites/dictaminador-de-riesgos", "Dictaminador de Riesgos"],
  ["/servicios/peritos-valuadores", "Peritos Valuadores"],
  ["/servicios/calculo-estructural", "Cálculo Estructural"],
  ["/servicios/bolsa-de-trabajo", "Bolsa de Trabajo"],
];

const collegeLinks = [
  ["/eventos/cursos-y-capacitacion", "Cursos y Capacitación"],
  ["/eventos/asambleas", "Asambleas"],
  ["/conocenos/mision-y-vision", "Misión y Visión"],
  ["/conocenos/comisiones", "Comisiones"],
];

// lucide-react v1 ya no incluye iconos de marca, por eso se dibujan aquí.
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8.1v3h2.5V21h2.9Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

const socialLinks = [
  ["https://www.facebook.com/profile.php?id=100063697292088", "Facebook del Colegio", <FacebookIcon key="fb" />],
  ["https://www.instagram.com/colegio_d_ingenieros_civilesac/", "Instagram del Colegio", <InstagramIcon key="ig" />],
  [contact.whatsapp, "Escríbenos por WhatsApp", <MessageCircle key="wa" size={18} aria-hidden="true" />],
];

function FooterLinks({ title, links }) {
  return (
    <nav className="cic-footer-col" aria-label={title}>
      <h2 className="cic-footer-title">{title}</h2>
      <ul className="cic-footer-links">
        {links.map(([to, label]) => (
          <li key={to}>
            <Link to={to} className="cic-footer-link">
              <ChevronRight size={15} aria-hidden="true" />
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  return (
    <footer className="cic-footer" id="contacto">
      <div className="cic-footer-inner">
        <div className="cic-footer-grid">
          <section className="cic-footer-col cic-footer-brand">
            <Link to="/" className="cic-footer-logo">
              <img src={LOGO_SRC} alt="" />
              <span>
                Colegio de Ingenieros Civiles
                <small>de Tuxtla Gutiérrez A.C.</small>
              </span>
            </Link>
            <p className="cic-footer-text">
              Impulsamos el desarrollo técnico, la ética profesional y la representación gremial
              de la ingeniería civil en Chiapas.
            </p>
            <ul className="cic-footer-social">
              {socialLinks.map(([href, label, icon]) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
                    {icon}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <FooterLinks title="Trámites y Servicios" links={serviceLinks} />

          <div className="cic-footer-col">
            <FooterLinks title="Eventos y El Colegio" links={collegeLinks} />
            <Link to="#afiliacion" className="cic-footer-cta">
              Afíliate al Colegio
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <section className="cic-footer-col">
            <h2 className="cic-footer-title">Contacto</h2>
            <ul className="cic-footer-contact">
              <li>
                <MapPin size={18} aria-hidden="true" />
                <div>
                  <span>{contact.address}</span>
                  <a href={contact.mapUrl} target="_blank" rel="noopener noreferrer" className="cic-footer-inline">
                    Ver en el mapa
                  </a>
                </div>
              </li>
              <li>
                <Phone size={18} aria-hidden="true" />
                <div>
                  {contact.phones.map((phone) => (
                    <a key={phone} href={`tel:+52${phone.replaceAll("-", "")}`} className="cic-footer-inline">
                      {phone}
                    </a>
                  ))}
                </div>
              </li>
              <li>
                <Mail size={18} aria-hidden="true" />
                <div>
                  {contact.emails.map((email) => (
                    <a key={email} href={`mailto:${email}`} className="cic-footer-inline cic-footer-email">
                      {email}
                    </a>
                  ))}
                </div>
              </li>
              <li>
                <Clock size={18} aria-hidden="true" />
                <div>
                  {contact.schedule.map(([days, hours]) => (
                    <span key={days}>
                      <strong>{days}</strong> {hours}
                    </span>
                  ))}
                </div>
              </li>
            </ul>
            <div className="cic-footer-branches">
              <h3>Delegaciones</h3>
              {contact.branches.map(([city, phones]) => (
                <p key={city}>
                  <strong>{city}</strong> {phones}
                </p>
              ))}
            </div>
          </section>
        </div>

        <div className="cic-footer-bottom">
          <p>© {currentYear} Colegio de Ingenieros Civiles de Tuxtla Gutiérrez A.C. Todos los derechos reservados.</p>
          <ul>
            <li><Link to="/aviso-de-privacidad">Aviso de Privacidad</Link></li>
            <li><Link to="/codigo-de-etica">Código de Ética</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
