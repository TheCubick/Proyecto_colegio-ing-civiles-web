import "./Footer.css";
import { Link } from "react-router-dom";

const contact = {
  office: "961-612-5541 / 961-119-0009 / 961-114-1636 / 961-130-3088",
  emails: ["colegiodeingenieroscivilestg@gmail.com", "cictgcontabilidad@gmail.com"],
  branches: ["Palenque Tel.: 916-688-0584 / 916-112-9552", "Pijijiapan Tel.: 961-177-6659", "Yajalón Tel.: 993-382-0479"],
};
const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer" id="contacto">
      <div className="footer-main">
        <div className="footer-brand">
          <img src="/logo.png" alt="Colegio de Ingenieros Civiles" />
          <div>
            <strong>Colegio de Ingenieros<br />Civiles</strong>
            <span>Tuxtla Gutiérrez, Chiapas</span>
          </div>
        </div>
        <p className="footer-intro">
          Construimos comunidad, conocimiento y oportunidades para la ingeniería civil de Chiapas.
        </p>
        <a className="facebook-mark" href="https://www.facebook.com/" aria-label="Facebook del Colegio">f</a>
      </div>

      <div className="footer-grid">
        <div className="footer-map">
          <iframe title="Ubicación del Colegio de Ingenieros Civiles" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15281.332857448206!2d-93.1256335!3d16.749996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDQ1JzAwLjAiTiA5M8KwMDcnMzIuMyJX!5e0!3m2!1ses!2smx!4v1633023222222!5m2!1ses!2smx" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" />
        </div>
        <div className="contact-details">
          <h2>Contacto</h2>
          <p><strong>Tel. Oficina</strong><br />{contact.office}</p>
          <p><strong>Correo electrónico</strong><br /><a href={`mailto:${contact.emails[0]}`}>{contact.emails[0]}</a><br /><a href={`mailto:${contact.emails[1]}`}>{contact.emails[1]}</a></p>
        </div>
        <div className="contact-details">
          <h2>Delegaciones</h2>
          {contact.branches.map((branch) => <p key={branch}>{branch}</p>)}
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {currentYear} Colegio de Ingenieros Civiles</span>
        <Link to="/#inicio">Volver al inicio ↑</Link>
      </div>
    </footer>
  );
}
