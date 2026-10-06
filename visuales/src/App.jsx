import { motion } from "framer-motion";
import "./App.css";

const services = [
  {
    number: "01",
    title: <>Trámites<br />profesionales</>,
    description: "Gestiona tus procesos de manera sencilla y clara.",
    href: "#atencion",
  },
  {
    number: "02",
    title: <>Novedades<br />del sector</>,
    description: "Conoce noticias, eventos y oportunidades relevantes.",
    href: "#novedades",
  },
  {
    number: "03",
    title: <>Atención<br />y contacto</>,
    description: "Estamos listos para resolver tus dudas.",
    href: "#atencion",
  },
];

const benefits = [
  "Formación y actualización constante",
  "Red profesional para crear oportunidades",
  "Impulso a una ingeniería responsable",
];

const stats = [
  { value: "+25", label: <>Años construyendo<br />comunidad</> },
  { value: "+500", label: <>Profesionales<br />conectados</> },
  { value: "100%", label: <>Compromiso con<br />nuestro sector</> },
];

const currentYear = new Date().getFullYear();

function Header() {
  return (
    <header className="site-header">
      <nav className="container nav-bar" aria-label="Navegación principal">
        <a className="brand" href="#novedades" aria-label="Inicio del Colegio de Ingenieros Civiles">
          <img src="/logo_carrera.png" alt="" />
          <span>Colegio de<br />Ingenieros Civiles</span>
        </a>
        <div className="nav-links">
          <a href="#novedades">Inicio</a>
          <a href="#tramites">Servicios</a>
          <a href="#atencion">Comunidad</a>
        </div>
        <a className="button button-primary nav-action" href="#atencion">
          Contáctanos <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}

function ParticleStage() {
  return (
    <div className="particle-stage" aria-label="Visualización institucional de partículas">
      <div className="particle-cloud" aria-hidden="true">
        {Array.from({ length: 24 }, (_, index) => (
          <span key={index} style={{ "--index": index }} />
        ))}
      </div>
      <span className="stage-caption">CIC / 2024</span>
    </div>
  );
}

function App() {
  return (
    <>
      <Header />
      <main>
        <section className="particle-hero" id="novedades">
          <div className="container hero-layout">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <span className="eyebrow accent-label">Tuxtla Gutiérrez, Chiapas</span>
              <h1>Ingeniería que<br /><em>transforma.</em></h1>
              <p className="lead">
                Impulsamos la innovación técnica, el desarrollo de infraestructura
                sustentable y la colegiación profesional en Chiapas.
              </p>
              <div className="hero-actions">
                <a href="#tramites" className="button button-primary">
                  Trámites y colegiación <span aria-hidden="true">↗</span>
                </a>
                <a href="#padron" className="text-link">
                  Directorio profesional <span aria-hidden="true">→</span>
                </a>
              </div>
            </motion.div>
            <ParticleStage />
          </div>
        </section>

        <div className="container page-content">
          <section className="section" id="tramites">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Lo que hacemos</span>
                <h2>Herramientas para avanzar</h2>
              </div>
              <p>Todo lo que necesitas para ejercer, conectar y mantenerte al día.</p>
            </div>
            <div className="service-grid">
              {services.map((service) => (
                <article className="service-card" key={service.number}>
                  <div className="service-icon">{service.number}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <a href={service.href} aria-label={`Explorar ${service.description.toLowerCase()}`}>
                    Explorar <span aria-hidden="true">↗</span>
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section className="feature-section" id="atencion">
            <div>
              <span className="eyebrow eyebrow-light">Nuestro compromiso</span>
              <h2>Una comunidad que<br />deja <em>huella.</em></h2>
            </div>
            <ul className="feature-list">
              {benefits.map((benefit) => (
                <li key={benefit}><span aria-hidden="true">→</span>{benefit}</li>
              ))}
            </ul>
          </section>

          <section className="stats-section" id="padron" aria-label="Cifras del colegio">
            {stats.map((stat) => (
              <div className="stat" key={stat.value}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </section>
        </div>
      </main>
      <footer className="site-footer">
        <div className="container footer-content">
          <span>© {currentYear} Colegio de Ingenieros Civiles</span>
          <span>Ingeniería con propósito.</span>
        </div>
      </footer>
    </>
  );
}

export default App;
