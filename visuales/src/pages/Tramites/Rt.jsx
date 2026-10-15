import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, ChevronRight, Download, FileText, ImageOff, Info } from "lucide-react";
import { notaCartas, requisitosGenerales } from "./requisitos";
import "./Rt.css";

export default function Rt() {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="rt-page">
      <section className="rt-hero">
        <div className="rt-container">
          <nav className="rt-breadcrumb" aria-label="Ruta de navegación">
            <Link to="/">Inicio</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>Trámites</span>
            <ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page">RT</span>
          </nav>
          <span className="rt-badge">
            <BadgeCheck size={16} aria-hidden="true" />
            Trámites
          </span>
          <h1>Representante Técnico (RT)</h1>
          <p className="rt-intro">
            Gestión y respaldo del Colegio para que sus agremiados obtengan y mantengan sus claves
            de especialidad como Representantes Técnicos de empresas constructoras.
          </p>
        </div>
      </section>

      <section className="rt-content">
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
                src="/placeholder-rt.jpg"
                alt="Representante Técnico revisando planos de una obra"
                onError={() => setImgError(true)}
              />
            )}
          </figure>
        </div>
      </section>

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

      <section className="rt-cta">
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
            <a href="#contacto" className="rt-btn rt-btn-secondary">
              Iniciar Trámite
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
