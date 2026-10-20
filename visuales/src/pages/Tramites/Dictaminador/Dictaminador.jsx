import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Download, FileText, ImageOff, Info, ShieldAlert } from "lucide-react";
import { notaCartas, requisitosGenerales } from "../../../data/requisitos";
import { infoDictaminador } from "../../../data/tramitesInfo";
import ModalContacto from "../../../components/ui/ModalContacto/ModalContacto";
import TramiteDetalle from "../../../components/sections/TramiteDetalle/TramiteDetalle";
import "./Dictaminador.css";

export default function Dictaminador() {
  const [contactoAbierto, setContactoAbierto] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="dict-page">
      <section className="dict-hero fondo-cuadricula">
        <div className="dict-container">
          <nav className="dict-breadcrumb" aria-label="Ruta de navegación">
            <Link to="/">Inicio</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>Trámites</span>
            <ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page">Dictaminador de Riesgos</span>
          </nav>
          <span className="dict-badge">
            <ShieldAlert size={16} aria-hidden="true" />
            Trámites
          </span>
          <h1>Dictaminador de Riesgos</h1>
          <p className="dict-intro">
            Formación y registro de profesionales que evalúan y dictaminan los riesgos de obras e
            instalaciones, tanto en proyectos nuevos como en situaciones de emergencia.
          </p>
        </div>
      </section>

      <section className="dict-content fondo-cuadricula">
        <div className="dict-container dict-content-grid">
          <div className="dict-text">
            <h2>¿Qué hace un Dictaminador de Riesgos?</h2>
            <p>
              Los dictaminadores de riesgos son profesionales capacitados mediante diplomado
              especializado. Su función es evaluar y dictaminar los posibles riesgos de una obra o
              instalación, consultando el Atlas de Riesgos y otros instrumentos técnicos. Estos
              dictámenes son solicitados por municipios y por la Secretaría de Obras Públicas tanto
              para obras nuevas como en situaciones de emergencia.
            </p>
          </div>
          <figure className="dict-figure">
            {imgError ? (
              <div className="dict-img-placeholder" role="img" aria-label="Imagen pendiente">
                <ImageOff size={32} aria-hidden="true" />
                <span>Imagen pendiente</span>
              </div>
            ) : (
              <img
                src="/img/paginas/tramites/dictaminador.jpg"
                alt="Dictaminador evaluando los riesgos de una estructura"
                onError={() => setImgError(true)}
              />
            )}
          </figure>
        </div>
      </section>

      <TramiteDetalle info={infoDictaminador} sigla="Dictaminador" onContactar={() => setContactoAbierto(true)} />

      <section className="dict-requisitos">
        <div className="dict-container">
          <h2>Requisitos generales</h2>
          <ul className="dict-requisitos-grid">
            {requisitosGenerales.map((requisito) => (
              <li key={requisito}>
                <FileText size={20} aria-hidden="true" />
                <span>{requisito}</span>
              </li>
            ))}
          </ul>
          <div className="dict-nota">
            <Info size={20} aria-hidden="true" />
            <p>
              {notaCartas.propias}
              <br />
              {notaCartas.ajenas}
            </p>
          </div>
        </div>
      </section>

      <section className="dict-cta fondo-cuadricula">
        <div className="dict-container dict-cta-box">
          <div>
            <h2>¿Listo para iniciar tu trámite?</h2>
            <p>Descarga la lista de documentos o contáctanos para recibir orientación.</p>
          </div>
          <div className="dict-cta-actions">
            <a href="/documentos/requisitos-dictaminador.pdf" download className="dict-btn dict-btn-primary">
              <Download size={18} aria-hidden="true" />
              Descargar Lista de Documentos
            </a>
            <button type="button" className="dict-btn dict-btn-secondary" onClick={() => setContactoAbierto(true)}>
              Iniciar Trámite
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      <ModalContacto isOpen={contactoAbierto} onClose={() => setContactoAbierto(false)} />
    </main>
  );
}
