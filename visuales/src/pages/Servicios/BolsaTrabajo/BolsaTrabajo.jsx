import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Briefcase,
  CalendarDays,
  Mail,
  MapPin,
} from "lucide-react";
import vacantes from "../../../data/vacantes";
import { dirigidoA } from "../../../data/bolsaTrabajo";
import { enlaceCorreo } from "../../../utils/enlaces";
import ModalContacto from "../../../components/ui/ModalContacto/ModalContacto";
import Migas from "../../../components/ui/Migas/Migas";
import GaleriaCarrusel from "../../../components/ui/GaleriaCarrusel/GaleriaCarrusel";
import { galerias } from "../../../data/galerias";
import "./BolsaTrabajo.css";

// PÁGINA «BOLSA DE TRABAJO». Las vacantes están en src/data/vacantes.js.
const mailtoPublicar = enlaceCorreo(undefined, "Publicar vacante en la Bolsa de Trabajo");

const formatoFecha = new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const vacantesOrdenadas = [...vacantes].sort((a, b) => b.fecha.localeCompare(a.fecha));

export default function BolsaTrabajo() {
  const [contactoAbierto, setContactoAbierto] = useState(false);

  return (
    <main className="bt-page">
      <section className="bt-hero decor-plano decor-plano--edificio">
        <div className="bt-container">
          <Migas className="bt-breadcrumb bt-animate" />
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

      <section className="bt-content fondo-cuadricula">
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
            <GaleriaCarrusel fotos={galerias.bolsa} />
          </figure>
        </div>
      </section>

      <section className="bt-features">
        <div className="bt-container">
          <h2>¿A quién va dirigida?</h2>
          <div className="bt-features-grid grilla-movil-carrusel">
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

      <section className="bt-cta fondo-luz-institucional">
        <div className="bt-container bt-cta-box fondo-profundo">
          <div>
            <h2>¿Tienes una vacante para ingenieros civiles?</h2>
            <p>Universidades, constructoras y agremiados pueden publicar sus ofertas con nosotros.</p>
          </div>
          <div className="bt-cta-actions">
            <a href={mailtoPublicar} className="bt-btn bt-btn-primary">
              <Mail size={18} aria-hidden="true" />
              Publicar una vacante
            </a>
            <button type="button" className="bt-btn bt-btn-secondary" onClick={() => setContactoAbierto(true)}>
              Contacto
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      <ModalContacto isOpen={contactoAbierto} onClose={() => setContactoAbierto(false)} />
    </main>
  );
}
