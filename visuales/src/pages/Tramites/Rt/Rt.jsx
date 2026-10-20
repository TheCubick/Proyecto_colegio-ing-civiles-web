import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, ChevronRight, Download, FileText, ImageOff, Info } from "lucide-react";
import { notaCartas, requisitosGenerales } from "../../../data/requisitos";
import { infoRt } from "../../../data/tramitesInfo";
import ModalContacto from "../../../components/ui/ModalContacto/ModalContacto";
import TramiteDetalle from "../../../components/sections/TramiteDetalle/TramiteDetalle";
import "./Rt.css";

export default function Rt() {
  const [contactoAbierto, setContactoAbierto] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="rt-page">
      <section className="rt-hero">
        <video className="rt-hero-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
          <source src="/videos/puente-colores.mp4" type="video/mp4" />
        </video>
        <div className="rt-hero-overlay" aria-hidden="true" />
        <div className="rt-container">
          <nav className="rt-breadcrumb rt-hero-anim" aria-label="Ruta de navegación">
            <Link to="/">Inicio</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>Trámites</span>
            <ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page">RT</span>
          </nav>
          <span className="rt-badge rt-hero-anim">
            <BadgeCheck size={16} aria-hidden="true" />
            Trámites
          </span>
          <h1 className="rt-hero-anim">Representante Técnico (RT)</h1>
          <span className="rt-hero-divider rt-hero-anim" aria-hidden="true" />
          <p className="rt-intro rt-hero-anim">
            Gestión y respaldo del Colegio para que sus agremiados obtengan y mantengan sus claves
            de especialidad como Representantes Técnicos de empresas constructoras.
          </p>
        </div>
      </section>

      <section className="rt-content fondo-cuadricula">
        <div className="rt-container rt-content-grid">
          <div className="rt-text">
            <h2>¿Qué es un Representante Técnico?</h2>
            <p>
              Los Representantes Técnicos de Empresas Constructoras son ingenieros autorizados ante
              la Secretaría de la Honestidad y Buen Gobierno. Cuentan con claves de especialidad que
              acreditan su experiencia en distintas áreas de la construcción. El Colegio gestiona y
              respalda a sus agremiados para la obtención y mantenimiento de estas claves.
            </p>
          </div>
          <figure className="rt-figure">
            {imgError ? (
              <div className="rt-img-placeholder" role="img" aria-label="Imagen pendiente">
                <ImageOff size={32} aria-hidden="true" />
                <span>Imagen pendiente</span>
              </div>
            ) : (
              <img
                src="/img/paginas/tramites/rt.jpg"
                alt="Representante Técnico revisando planos de una obra"
                onError={() => setImgError(true)}
              />
            )}
          </figure>
        </div>
      </section>

      <TramiteDetalle info={infoRt} sigla="RT" onContactar={() => setContactoAbierto(true)} />

      <section className="rt-requisitos">
        <div className="rt-container">
          <h2>Requisitos generales</h2>
          <ul className="rt-requisitos-grid">
            {requisitosGenerales.map((requisito) => (
              <li key={requisito}>
                <FileText size={20} aria-hidden="true" />
                <span>{requisito}</span>
              </li>
            ))}
          </ul>
          <div className="rt-nota">
            <Info size={20} aria-hidden="true" />
            <p>
              {notaCartas.propias}
              <br />
              {notaCartas.ajenas}
            </p>
          </div>
        </div>
      </section>

      <section className="rt-cta fondo-cuadricula">
        <div className="rt-container rt-cta-box">
          <div>
            <h2>¿Listo para iniciar tu trámite?</h2>
            <p>Descarga la lista de documentos o contáctanos para recibir orientación.</p>
          </div>
          <div className="rt-cta-actions">
            <a href="/documentos/requisitos-rt.pdf" download className="rt-btn rt-btn-primary">
              <Download size={18} aria-hidden="true" />
              Descargar Lista de Documentos
            </a>
            <button type="button" className="rt-btn rt-btn-secondary" onClick={() => setContactoAbierto(true)}>
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
