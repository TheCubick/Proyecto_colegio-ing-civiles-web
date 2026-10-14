import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Importamos Link
import "./Asambleas.css";

const menus = [
  {
    label: "Trámites",
    links: [
      ["Director Responsable de Obra (DRO)", "/#dro"],
      ["Representante Técnico (RT)", "/#rt"],
      ["Dictaminador de Riesgos", "/#riesgos"],
    ],
  },
  {
    label: "Servicios",
    links: [
      ["Peritos Valuadores", "/#peritos"],
      ["Cálculo Estructural", "/#calculo"],
      ["Bolsa de Trabajo", "/#bolsa"],
    ],
  },
  {
    label: "Eventos",
    links: [
      ["Cursos y Capacitación", "/#cursos"],
      ["Asambleas", "/asambleas"],
    ],
  },
  {
    label: "Conócenos",
    links: [
      ["Misión y Visión", "/#mision"],
      ["Comisiones", "/#comisiones"],
      ["Normateca y Estatutos", "/#normateca"],
    ],
  },
];

const pilares = [
  {
    titulo: "Comunidad y Representación",
    descripcion:
      "Agrupamos a los profesionales de la ingeniería civil para elevar la calidad del ejercicio profesional.",
  },
  {
    titulo: "Convenios Institucionales",
    descripcion:
      "Vinculación directa con gobierno y universidades para facilitar el servicio social y laboral.",
  },
  {
    titulo: "Certificación y Trámites",
    descripcion:
      "Gestión y respaldo para Directores Responsables de Obra (DRO) y Representantes Técnicos (RT).",
  },
  {
    titulo: "Impulso a Estudiantes",
    descripcion:
      "Cuotas preferenciales para estudiantes de últimos semestres y pasantes en cursos y afiliación.",
  },
];

const ejesAsamblea = [
  {
    titulo: "Asamblea General",
    texto:
      "Sesiones ordinarias y extraordinarias para la toma de decisiones, rendición de informes y acuerdos del gremio.",
  },
  {
    titulo: "Firma de Convenios",
    texto:
      "Colaboración en la elaboración y acreditamiento de proyectos de estudio y vinculación interinstitucional.",
  },
  {
    titulo: "Cursos de Actualización",
    texto:
      "Definición de normas y lineamientos para la excelencia académica y educación continua de los ingenieros civiles.",
  },
];

export default function Asambleas() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); // Para que al cargar la página empiece arriba
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="asambleas-page">
      {/* Header oficial del equipo (Ajustado para React Router) */}
      <header className={`navbar ${scrolled ? "nav-scrolled" : ""}`}>
        <div className="nav-container">
          <Link className="logo-container" to="/" aria-label="Ir al inicio">
            <img src="/logo.png" alt="Logo del Colegio de Ingenieros Civiles" className="nav-logo" />
            <span className="nav-title">
              Colegio de Ingenieros
              <br />
              Civiles de Tuxtla Gutiérrez
            </span>
          </Link>

          <nav className="nav-links" aria-label="Navegación principal">
            {menus.map((menu) => (
              <div className="dropdown" key={menu.label}>
                <button className="dropbtn" type="button">
                  {menu.label}
                  <svg
                    className="chevron-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                <div className="dropdown-content">
                  {menu.links.map(([label, href]) => (
                    href.startsWith("/#") ? (
                      <a href={href} key={href}>{label}</a>
                    ) : (
                      <Link to={href} key={href}>{label}</Link>
                    )
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <a href="/#afiliate" className="btn-afiliate">
            Afíliate ↗
          </a>
        </div>
      </header>

      {/* Línea divisoria institucional */}
      <div className="divider-line-blue" />

      {/* Sección Principal de Asambleas */}
      <section className="asambleas-hero">
        <div className="content-container">
          {/* Columna izquierda: Logo, Título, Subtítulo e Información */}
          <div className="left-column">
            <div className="brand-header">
              <img
                src="/logo.png"
                alt="Logo Colegio de Ingenieros Civiles"
                className="logo-small"
              />
              <h1 className="title-colegio">
                Colegio de Ingenieros Civiles de Tuxtla Gutiérrez A. C.
              </h1>
            </div>

            <h2 className="title-asamblea">Asambleas</h2>

            <p className="description-text">
              Espacio oficial de convocatorias, acuerdos gremiales y sesiones
              colegiadas. Impulsamos el desarrollo técnico, la ética profesional
              y el crecimiento de la ingeniería civil en nuestra comunidad.
            </p>

            <p className="description-subtext">
              Asociación que promueve la capacitación permanente y la
              representación ante las instancias gubernamentales, para
              desarrollar la profesión de la Ingeniería Civil con apego al
              Código de Ética.
            </p>
          </div>

          {/* Columna derecha: Fotografía de la Asamblea */}
          <div className="right-column">
            <div className="photo-card-big">
              <img
                src="/asamblea-foto.jpg"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/Diseño/banners/1.png";
                }}
                alt="Sesión de Asamblea del Colegio de Ingenieros Civiles"
                className="photo-large"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Misión y Ejes de Asamblea */}
      <section className="asambleas-info-section">
        <div className="info-inner">
          <div className="mision-banner">
            <h3>Compromiso Académico y Gremial</h3>
            <p>
              Colaborar en la elaboración y acreditamiento de proyectos de
              estudio, definir normas y lineamientos para la excelencia
              académica en la formación de ingenieros civiles y velar por una
              educación adecuada y continua.
            </p>
          </div>

          <div className="ejes-grid">
            {ejesAsamblea.map((eje) => (
              <article className="eje-card" key={eje.titulo}>
                <h4>{eje.titulo}</h4>
                <p>{eje.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Tarjetas de Pilares Institucionales */}
      <section className="cards-section">
        <div className="cards-grid">
          {pilares.map((pilar) => (
            <article className="red-card" key={pilar.titulo}>
              <h2>{pilar.titulo}</h2>
              <p>{pilar.descripcion}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}