import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, ChevronRight, Eye, Landmark, Target, Users } from "lucide-react";
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

const enlaces = [
  { to: "/conocenos/comisiones", icono: Users, titulo: "Comisiones", texto: "Especialidades y servicios técnicos del Colegio." },
  { to: "/conocenos/normateca-y-estatutos", icono: BookOpen, titulo: "Normateca y Estatutos", texto: "Documentos normativos del Colegio." },
];

export default function MisionVision() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="mv-page">
      <section className="mv-hero">
        <div className="mv-container">
          <nav className="mv-breadcrumb mv-animate" aria-label="Ruta de navegación">
            <Link to="/">Inicio</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>Conócenos</span>
            <ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page">Misión y Visión</span>
          </nav>
          <span className="mv-badge mv-animate">
            <Landmark size={16} aria-hidden="true" />
            Conócenos
          </span>
          <h1 className="mv-animate">Misión y Visión</h1>
          <p className="mv-intro mv-animate">
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
