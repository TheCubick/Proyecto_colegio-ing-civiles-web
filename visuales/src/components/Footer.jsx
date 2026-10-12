import "./Footer.css";

const contact = {
  office: "961-612-5541 / 961-119-0009 / 961-114-1636 / 961-130-3088",
  emails: ["colegiodeingenieroscivilestg@gmail.com", "cictgcontabilidad@gmail.com"],
  branches: ["Palenque Tel.: 916-688-0584 / 916-112-9552", "Pijijiapan Tel.: 961-177-6659", "Yajalón Tel.: 993-382-0479"],
};

export default function Footer() {
  return (
    <footer className="footer" id="contacto">
      <div className="footer-map">
        <iframe title="Ubicación del Colegio de Ingenieros Civiles" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15281.332857448206!2d-93.1256335!3d16.749996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDQ1JzAwLjAiTiA5M8KwMDcnMzIuMyJX!5e0!3m2!1ses!2smx!4v1633023222222!5m2!1ses!2smx" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" />
      </div>
      <div className="footer-info">
        <a className="facebook-mark" href="https://www.facebook.com/" aria-label="Facebook del Colegio">f</a>
        <div className="contact-details">
          <p><strong>Tel. Oficina:</strong> {contact.office}</p>
          <p><strong>Correo electrónico:</strong> {contact.emails[0]}</p>
          <p>{contact.emails[1]}</p>
          <p><strong>Delegaciones:</strong></p>
          {contact.branches.map((branch) => <p key={branch}>{branch}</p>)}
        </div>
      </div>
    </footer>
  );
}
