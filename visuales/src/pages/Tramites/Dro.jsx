import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Download, FileText, HardHat, ImageOff, Info } from "lucide-react";
import { notaCartas, requisitosGenerales } from "./requisitos";
import ModalContacto from "../../components/shared/ModalContacto";
import "./Dro.css";

export default function Dro() {
  const [contactoAbierto, setContactoAbierto] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="dro-page">
      <section className="dro-hero">
        <video className="dro-hero-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
          <source src="/Diseño/videos/Vista_area.mp4" type="video/mp4" />
        </video>
        <div className="dro-hero-overlay" aria-hidden="true" />
        <div className="dro-container">
          <nav className="dro-breadcrumb dro-hero-anim" aria-label="Ruta de navegación">
            <Link to="/">Inicio</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>Trámites</span>
            <ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page">DRO</span>
          </nav>
          <span className="dro-badge dro-hero-anim">
            <HardHat size={16} aria-hidden="true" />
            Trámites
          </span>
          <h1 className="dro-hero-anim">Director Responsable de Obra (DRO)</h1>
          <span className="dro-hero-divider dro-hero-anim" aria-hidden="true" />
          <p className="dro-intro dro-hero-anim">
            Registro y respaldo gremial para los ingenieros civiles que ejercen como Directores
            Responsables de Obra ante el municipio.
          </p>
        </div>
      </section>

      <section className="dro-content">
        <div className="dro-container dro-content-grid">
          <div className="dro-text">
            <h2>¿Qué es un DRO?</h2>
            <p>
              El Director Responsable de Obra (DRO) es el profesional acreditado y con registro
              vigente ante el municipio que asume la responsabilidad técnica y legal de verificar
              que una construcción cumpla con los reglamentos, normas de seguridad y el proyecto
              autorizado.
            </p>
          </div>
          <figure className="dro-figure">
            {imgError ? (
              <div className="dro-img-placeholder" role="img" aria-label="Imagen pendiente">
                <ImageOff size={32} aria-hidden="true" />
                <span>Imagen pendiente</span>
              </div>
            ) : (
              <img
                src="/pages/Tramites/Dro.jpg"
                alt="Director Responsable de Obra supervisando una construcción"
                onError={() => setImgError(true)}
              />
            )}
          </figure>
        </div>
      </section>

      <section className="dro-requisitos">
        <div className="dro-container">
          <h2>Requisitos generales</h2>
          <ul className="dro-requisitos-grid">
            {requisitosGenerales.map((requisito) => (
              <li key={requisito}>
                <FileText size={20} aria-hidden="true" />
                <span>{requisito}</span>
              </li>
            ))}
          </ul>
          <div className="dro-nota">
            <Info size={20} aria-hidden="true" />
            <p>
              {notaCartas.propias}
              <br />
              {notaCartas.ajenas}
            </p>
          </div>
        </div>
      </section>

      <section className="dro-cta">
        <div className="dro-container dro-cta-box">
          <div>
            <h2>¿Listo para iniciar tu trámite?</h2>
            <p>Descarga la lista de documentos o contáctanos para recibir orientación.</p>
          </div>
          <div className="dro-cta-actions">
            <a href="/documentos/requisitos-dro.pdf" download className="dro-btn dro-btn-primary">
              <Download size={18} aria-hidden="true" />
              Descargar Lista de Documentos
            </a>
            <button type="button" className="dro-btn dro-btn-secondary" onClick={() => setContactoAbierto(true)}>
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
