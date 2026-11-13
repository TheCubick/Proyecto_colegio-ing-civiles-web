import { useState } from "react";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import ModalContacto from "../../ui/ModalContacto/ModalContacto";
import Migas from "../../ui/Migas/Migas";
import GaleriaCarrusel from "../../ui/GaleriaCarrusel/GaleriaCarrusel";
import { galerias } from "../../../data/galerias";
import { enlaceCorreo } from "../../../utils/enlaces";
import "./PaginaServicio.css";

/*
  PLANTILLA DE LAS PÁGINAS DE SERVICIOS (Peritos Valuadores y Cálculo Estructural).
  Los textos de cada servicio están en src/data/servicios.js.
  Uso (en App.jsx): <PaginaServicio datos={servicios.peritos} />
*/
export default function PaginaServicio({ datos }) {
  const { titulo, intro, asuntoCorreo, textoBoton, descripcion, imagen, alt, tituloTarjetas, tarjetas, cta } = datos;
  const serviciosOficiales = datos.serviciosOficiales ?? [];
  const [contactoAbierto, setContactoAbierto] = useState(false);
  const mailto = enlaceCorreo(undefined, asuntoCorreo);
  const IconoDescripcion = descripcion.icono;

  return (
    <main className="sv-page">
      <section className="sv-hero decor-plano">
        <div className="sv-container">
          <Migas className="sv-breadcrumb sv-animate" />
          <h1 className="sv-animate">{titulo}</h1>
          <p className="sv-intro sv-animate">{intro}</p>
          <div className="sv-hero-actions sv-animate">
            <a href={mailto} className="sv-btn sv-btn-primary">
              <Mail size={18} aria-hidden="true" />
              {textoBoton}
            </a>
          </div>
        </div>
      </section>

      <section className="sv-content fondo-cuadricula">
        <div className="sv-container sv-content-grid">
          <article className="sv-card sv-card-main">
            <span className="sv-card-icon">
              <IconoDescripcion size={26} aria-hidden="true" />
            </span>
            <h2>¿En qué consiste el servicio?</h2>
            <p>{descripcion.texto}</p>
          </article>
          <figure className="sv-figure">
            <GaleriaCarrusel
              key={datos.galeria}
              fotos={galerias[datos.galeria]}
              respaldo={{ src: imagen, alt }}
            />
          </figure>
        </div>
      </section>

      <section className="sv-features">
        <div className="sv-container">
          <h2>{tituloTarjetas}</h2>
          <div className="sv-features-grid">
            {tarjetas.map(({ icono: Icono, titulo: tituloTarjeta, texto }) => (
              <article className="sv-card" key={tituloTarjeta}>
                <span className="sv-card-icon">
                  <Icono size={24} aria-hidden="true" />
                </span>
                <h3>{tituloTarjeta}</h3>
                <p>{texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {serviciosOficiales.length > 0 && (
        <section className="sv-oficiales" aria-labelledby="sv-oficiales-titulo">
          <div className="sv-container">
            <h2 id="sv-oficiales-titulo">Servicios que ofrecen</h2>
            <ul className="sv-oficiales-lista">
              {serviciosOficiales.map(({ titulo: tituloServicio, texto }) => (
                <li key={tituloServicio}>
                  <CheckCircle2 size={22} aria-hidden="true" />
                  <div>
                    <h3>{tituloServicio}</h3>
                    {texto && <p>{texto}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="sv-cta fondo-cuadricula">
        <div className="sv-container sv-cta-box">
          <div>
            <h2>{cta.titulo}</h2>
            <p>{cta.texto}</p>
          </div>
          <div className="sv-cta-actions">
            <a href={mailto} className="sv-btn sv-btn-primary">
              <Mail size={18} aria-hidden="true" />
              {textoBoton}
            </a>
            <button type="button" className="sv-btn sv-btn-secondary" onClick={() => setContactoAbierto(true)}>
              Otros medios de contacto
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      <ModalContacto isOpen={contactoAbierto} onClose={() => setContactoAbierto(false)} />
    </main>
  );
}
