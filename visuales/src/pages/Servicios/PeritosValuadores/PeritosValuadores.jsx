import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, House, ImageOff, Landmark, Mail, Scale } from "lucide-react";
import ModalContacto from "../../../components/ui/ModalContacto/ModalContacto";
import "./PeritosValuadores.css";

const CONTACTO_EMAIL = "colegiodeingenieroscivilestg@gmail.com";
const mailto = `mailto:${CONTACTO_EMAIL}?subject=${encodeURIComponent("Solicitud de peritaje")}`;

const usos = [
  {
    icono: House,
    titulo: "Inmuebles, casas y propiedades",
    texto: "Dictámenes de valor elaborados por peritos valuadores del Colegio.",
  },
  {
    icono: Scale,
    titulo: "Transacciones",
    texto: "Una estimación técnica profesional como respaldo en compraventas y operaciones.",
  },
  {
    icono: Landmark,
    titulo: "Avalúos oficiales",
    texto: "Para trámites y procesos que requieren un dictamen de valor formal.",
  },
];

export default function PeritosValuadores() {
  const [contactoAbierto, setContactoAbierto] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pv-page">
      <section className="pv-hero">
        <div className="pv-container">
          <nav className="pv-breadcrumb pv-animate" aria-label="Ruta de navegación">
            <Link to="/">Inicio</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>Servicios</span>
            <ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page">Peritos Valuadores</span>
          </nav>
          <h1 className="pv-animate">Peritos Valuadores</h1>
          <p className="pv-intro pv-animate">
            Dictámenes de valor con respaldo técnico y profesional del Colegio de Ingenieros Civiles.
          </p>
          <div className="pv-hero-actions pv-animate">
            <a href={mailto} className="pv-btn pv-btn-primary">
              <Mail size={18} aria-hidden="true" />
              Solicitar peritaje
            </a>
          </div>
        </div>
      </section>

      <section className="pv-content fondo-cuadricula">
        <div className="pv-container pv-content-grid">
          <article className="pv-card pv-card-main">
            <span className="pv-card-icon">
              <House size={26} aria-hidden="true" />
            </span>
            <h2>¿En qué consiste el servicio?</h2>
            <p>
              Realizamos dictámenes de valor de inmuebles, casas y propiedades. Servicio fundamental
              para transacciones, avalúos oficiales y procesos que requieren una estimación técnica
              profesional.
            </p>
          </article>
          <figure className="pv-figure">
            {imgError ? (
              <div className="pv-img-placeholder" role="img" aria-label="Imagen pendiente">
                <ImageOff size={32} aria-hidden="true" />
                <span>Imagen pendiente</span>
              </div>
            ) : (
              <img
                src="/img/paginas/servicios/peritos.jpg"
                alt="Perito valuador inspeccionando una vivienda"
                onError={() => setImgError(true)}
              />
            )}
          </figure>
        </div>
      </section>

      <section className="pv-features">
        <div className="pv-container">
          <h2>¿Para qué sirve?</h2>
          <div className="pv-features-grid">
            {usos.map(({ icono: Icono, titulo, texto }) => (
              <article className="pv-card" key={titulo}>
                <span className="pv-card-icon">
                  <Icono size={24} aria-hidden="true" />
                </span>
                <h3>{titulo}</h3>
                <p>{texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pv-cta fondo-cuadricula">
        <div className="pv-container pv-cta-box">
          <div>
            <h2>¿Necesitas un dictamen de valor?</h2>
            <p>Escríbenos y un perito del Colegio te dará seguimiento.</p>
          </div>
          <div className="pv-cta-actions">
            <a href={mailto} className="pv-btn pv-btn-primary">
              <Mail size={18} aria-hidden="true" />
              Solicitar peritaje
            </a>
            <button type="button" className="pv-btn pv-btn-secondary" onClick={() => setContactoAbierto(true)}>
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
