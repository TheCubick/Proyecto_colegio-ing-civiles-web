import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  Briefcase,
  Building,
  CalendarDays,
  ChevronRight,
  GraduationCap,
  ImageOff,
  Mail,
  MapPin,
  Users,
} from "lucide-react";
import vacantes from "./vacantesData";
import "./BolsaTrabajo.css";

const CONTACTO_EMAIL = "colegiodeingenieroscivilestg@gmail.com";
const mailtoPublicar = `mailto:${CONTACTO_EMAIL}?subject=${encodeURIComponent("Publicar vacante en la Bolsa de Trabajo")}`;

const formatoFecha = new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const vacantesOrdenadas = [...vacantes].sort((a, b) => b.fecha.localeCompare(a.fecha));

const dirigidoA = [
  {
    icono: Users,
    titulo: "Ingenieros civiles",
    texto: "Oportunidades laborales para profesionales de la ingeniería civil.",
  },
  {
    icono: GraduationCap,
    titulo: "Estudiantes próximos a egresar",
    texto: "Vacantes pensadas para quienes están por concluir la carrera.",
  },
  {
    icono: Building,
    titulo: "Universidades, constructoras y agremiados",
    texto: "Las ofertas provienen de instituciones, empresas y miembros del Colegio.",
  },
];

export default function BolsaTrabajo() {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bt-page">
      <section className="bt-hero">
        <div className="bt-container">
          <nav className="bt-breadcrumb bt-animate" aria-label="Ruta de navegación">
            <Link to="/">Inicio</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>Servicios</span>
            <ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page">Bolsa de Trabajo</span>
          </nav>
          <h1 className="bt-animate">Bolsa de Trabajo</h1>
          <p className="bt-intro bt-animate">
            Conectamos a ingenieros civiles y futuros egresados con oportunidades laborales en Chiapas.
          </p>
          <div className="bt-hero-actions bt-animate">
            <a href="#vacantes" className="bt-btn bt-btn-primary">
              Ver vacantes
              <ArrowDown size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="bt-content">
        <div className="bt-container bt-content-grid">
          <article className="bt-card bt-card-main">
            <span className="bt-card-icon">
              <Briefcase size={26} aria-hidden="true" />
            </span>
            <h2>¿Qué es la Bolsa de Trabajo?</h2>
            <p>
              Publicamos oportunidades laborales para ingenieros civiles y estudiantes próximos a
              egresar. Vacantes de universidades, empresas constructoras y agremiados del Colegio.
            </p>
          </article>
          <figure className="bt-figure">
            {imgError ? (
              <div className="bt-img-placeholder" role="img" aria-label="Imagen pendiente">
                <ImageOff size={32} aria-hidden="true" />
                <span>Imagen pendiente</span>
              </div>
            ) : (
              <img
                src="/placeholder-bolsa.jpg"
                alt="Ingenieros civiles trabajando en una obra"
                onError={() => setImgError(true)}
              />
            )}
          </figure>
        </div>
      </section>

      <section className="bt-features">
        <div className="bt-container">
          <h2>¿A quién va dirigida?</h2>
          <div className="bt-features-grid">
            {dirigidoA.map(({ icono: Icono, titulo, texto }) => (
              <article className="bt-card" key={titulo}>
                <span className="bt-card-icon">
                  <Icono size={24} aria-hidden="true" />
                </span>
                <h3>{titulo}</h3>
                <p>{texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bt-vacantes" id="vacantes">
        <div className="bt-container">
          <h2>Vacantes disponibles</h2>
          {vacantesOrdenadas.length > 0 ? (
            <div className="bt-vacantes-grid">
              {vacantesOrdenadas.map((vacante) => (
                <article className="bt-card bt-vacante" key={vacante.id}>
                  <span className="bt-vacante-origen">{vacante.origen}</span>
                  <h3>{vacante.puesto}</h3>
                  <p className="bt-vacante-empresa">{vacante.empresa}</p>
                  <ul className="bt-vacante-meta">
                    <li>
                      <MapPin size={15} aria-hidden="true" />
                      {vacante.ubicacion}
                    </li>
                    <li>
                      <CalendarDays size={15} aria-hidden="true" />
                      <time dateTime={vacante.fecha}>{formatoFecha.format(new Date(vacante.fecha))}</time>
                    </li>
                  </ul>
                  <p>{vacante.descripcion}</p>
                  <a
                    href={vacante.contacto}
                    className="bt-vacante-link"
                    {...(vacante.contacto.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    Postularme
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          ) : (
            <div className="bt-vacio">
              <Briefcase size={32} aria-hidden="true" />
              <p>Por ahora no hay vacantes publicadas. Vuelve a consultar pronto.</p>
            </div>
          )}
        </div>
      </section>

      <section className="bt-cta">
        <div className="bt-container bt-cta-box">
          <div>
            <h2>¿Tienes una vacante para ingenieros civiles?</h2>
            <p>Universidades, constructoras y agremiados pueden publicar sus ofertas con nosotros.</p>
          </div>
          <div className="bt-cta-actions">
            <a href={mailtoPublicar} className="bt-btn bt-btn-primary">
              <Mail size={18} aria-hidden="true" />
              Publicar una vacante
            </a>
            <a href="#contacto" className="bt-btn bt-btn-secondary">
              Contacto
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
