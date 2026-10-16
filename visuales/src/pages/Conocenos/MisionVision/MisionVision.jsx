import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronRight,
  Eye,
  FlaskConical,
  Gavel,
  GraduationCap,
  Landmark,
  Lightbulb,
  Scale,
  ShieldCheck,
  Target,
  Users,
  Zap,
} from "lucide-react";
import "./MisionVision.css";

const pilares = [
  {
    id: "mision",
    icono: Target,
    etiqueta: "Nuestra razón de ser",
    titulo: "Misión",
    texto:
      "Ser una Asociación que promueva la capacitación permanente; así como la representación ante las instancias gubernamentales, a fin de que desarrollen la profesión de la Ingeniería Civil con el apego estricto al Código de Ética.",
  },
  {
    id: "vision",
    icono: Eye,
    etiqueta: "Hacia dónde vamos",
    titulo: "Visión",
    texto:
      "Tener reconocimiento a nivel estatal como la asociación que por su trayectoria intachable genere confianza de sus agremiados ante la prestación de servicios a la sociedad.",
  },
];

const valores = [
  { icono: Zap, titulo: "Eficiencia", texto: "Trámites y servicios técnicos atendidos con oportunidad y calidad." },
  { icono: Scale, titulo: "Ética", texto: "Ejercicio profesional con apego estricto al Código de Ética." },
  { icono: Lightbulb, titulo: "Innovación", texto: "Actualización continua ante los nuevos retos de la ingeniería civil." },
];

const compromisos = [
  {
    icono: Gavel,
    texto: "Apego estricto al Código de Ética y vigilancia mediante la Comisión de Honor y Justicia.",
  },
  {
    icono: Landmark,
    texto: "Promover leyes, reglamentos y reformas relativos al ejercicio profesional.",
  },
  {
    icono: GraduationCap,
    texto:
      "Colaborar en la elaboración y acreditamiento de proyectos de estudio y planes de especialidades y maestrías con universidades, para la excelencia académica.",
  },
  {
    icono: FlaskConical,
    texto:
      "Impulsar la investigación científica, tecnológica y la certificación continua: registro ante la SEP, padrón activo mayor a 100 colegiados y el requisito reglamentario de 4 cursos / 30 horas de capacitación anual por agremiado.",
  },
];

const enlaces = [
  { to: "/conocenos/comisiones", icono: Users, titulo: "Comisiones", texto: "Especialidades y servicios técnicos del Colegio." },
];

export default function MisionVision() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="mv-page">
      <section className="mv-hero">
        <video className="mv-hero-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
          <source src="/videos/parque-central.mp4" type="video/mp4" />
        </video>
        <div className="mv-hero-overlay" aria-hidden="true" />
        <div className="mv-container">
          <nav className="mv-breadcrumb mv-hero-anim" aria-label="Ruta de navegación">
            <Link to="/">Inicio</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>Conócenos</span>
            <ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page">Misión y Visión</span>
          </nav>
          <span className="mv-badge mv-hero-anim">
            <Landmark size={16} aria-hidden="true" />
            Conócenos
          </span>
          <h1 className="mv-hero-anim">Misión y Visión</h1>
          <span className="mv-hero-divider mv-hero-anim" aria-hidden="true" />
          <p className="mv-intro mv-hero-anim">
            El Colegio de Ingenieros Civiles de Tuxtla Gutiérrez, A.C. es la institución que agrupa y
            representa a los profesionales de la ingeniería civil en la región. Su objetivo es elevar
            la calidad del ejercicio profesional y promover la actualización continua.
          </p>
        </div>
      </section>

      <section className="mv-section">
        <div className="mv-container mv-pilares">
          {pilares.map(({ id, icono: Icono, etiqueta, titulo, texto }) => (
            <article className="mv-card mv-pilar" key={id} id={id}>
              <span className="mv-card-icon mv-card-icon-lg">
                <Icono size={34} aria-hidden="true" />
              </span>
              <span className="mv-pilar-etiqueta">{etiqueta}</span>
              <h2>{titulo}</h2>
              <p>{texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mv-valores" aria-labelledby="mv-valores-titulo">
        <div className="mv-container">
          <h2 id="mv-valores-titulo" className="mv-section-title">Nuestros Valores Institucionales</h2>
          <div className="mv-valores-grid">
            {valores.map(({ icono: Icono, titulo, texto }) => (
              <article className="mv-card mv-valor" key={titulo}>
                <span className="mv-card-icon mv-card-icon-lg">
                  <Icono size={30} aria-hidden="true" />
                </span>
                <h3>{titulo}</h3>
                <p>{texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mv-organigrama" aria-labelledby="mv-organigrama-titulo">
        <div className="mv-container">
          <h2 id="mv-organigrama-titulo" className="mv-organigrama-titulo">
            Estructura del Consejo Directivo
          </h2>
          <figure className="mv-organigrama-figura">
            <a
              href="/img/documentos/organigrama.jpeg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir el organigrama en tamaño completo"
            >
              <img
                src="/img/documentos/organigrama.jpeg"
                alt="Organigrama del Consejo Directivo del Colegio de Ingenieros Civiles de Tuxtla Gutiérrez"
                loading="lazy"
              />
            </a>
            <figcaption>Haz clic en la imagen para verla en tamaño completo.</figcaption>
          </figure>
        </div>
      </section>

      <section className="mv-section" aria-labelledby="mv-compromisos-titulo">
        <div className="mv-container">
          <h2 id="mv-compromisos-titulo" className="mv-section-title">
            Compromisos ante la Profesión y Código de Ética
          </h2>
          <ol className="mv-compromisos">
            {compromisos.map(({ icono: Icono, texto }, i) => (
              <li className="mv-card mv-compromiso" key={texto}>
                <span className="mv-compromiso-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mv-card-icon">
                  <Icono size={22} aria-hidden="true" />
                </span>
                <p>{texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mv-privacidad" aria-labelledby="mv-privacidad-titulo">
        <div className="mv-container">
          <div className="mv-privacidad-box">
            <span className="mv-card-icon mv-card-icon-lg">
              <ShieldCheck size={30} aria-hidden="true" />
            </span>
            <div>
              <h2 id="mv-privacidad-titulo">Política de Privacidad y Seguridad Gremial</h2>
              <p>
                Para salvaguardar la integridad y seguridad de nuestros socios y directivos, todo
                requerimiento de especialistas (DRO, RT, Peritos y Estructuristas) se gestiona de manera
                centralizada a través de las oficinas oficiales del Colegio.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mv-mas">
        <div className="mv-container">
          <h2>Conoce más del Colegio</h2>
          <div className="mv-mas-grid">
            {enlaces.map(({ to, icono: Icono, titulo, texto }) => (
              <Link to={to} className="mv-mas-link" key={to}>
                <span className="mv-card-icon">
                  <Icono size={22} aria-hidden="true" />
                </span>
                <span className="mv-mas-text">
                  <strong>{titulo}</strong>
                  <span>{texto}</span>
                </span>
                <ArrowRight size={20} aria-hidden="true" className="mv-mas-arrow" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
