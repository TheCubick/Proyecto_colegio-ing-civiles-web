import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, ChevronRight, DraftingCompass, HardHat, ImageOff, Mail, Ruler } from "lucide-react";
import "./CalculoEstructural.css";

const CONTACTO_EMAIL = "colegiodeingenieroscivilestg@gmail.com";
const mailto = `mailto:${CONTACTO_EMAIL}?subject=${encodeURIComponent("Solicitud de cálculo estructural")}`;

const alcances = [
  {
    icono: DraftingCompass,
    titulo: "Memorias de cálculo",
    texto: "Elaboración y dictamen de memorias de cálculo estructural.",
  },
  {
    icono: Building2,
    titulo: "Obras de gran envergadura",
    texto: "Edificios y proyectos que requieren un análisis estructural especializado.",
  },
  {
    icono: HardHat,
    titulo: "Trabajo con el DRO",
    texto: "Coordinación con los Directores Responsables de Obra de cada proyecto.",
  },
];

export default function CalculoEstructural() {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="ce-page">
      <section className="ce-hero">
        <div className="ce-container">
          <nav className="ce-breadcrumb ce-animate" aria-label="Ruta de navegación">
            <Link to="/">Inicio</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>Servicios</span>
            <ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page">Cálculo Estructural</span>
          </nav>
          <h1 className="ce-animate">Cálculo Estructural</h1>
          <p className="ce-intro ce-animate">
            Memorias de cálculo elaboradas y dictaminadas por especialistas en estructuras.
          </p>
          <div className="ce-hero-actions ce-animate">
            <a href={mailto} className="ce-btn ce-btn-primary">
              <Mail size={18} aria-hidden="true" />
              Solicitar cálculo
            </a>
          </div>
        </div>
      </section>

      <section className="ce-content">
        <div className="ce-container ce-content-grid">
          <article className="ce-card ce-card-main">
            <span className="ce-card-icon">
              <Ruler size={26} aria-hidden="true" />
            </span>
            <h2>¿En qué consiste el servicio?</h2>
            <p>
              Ingenieros con maestría en estructuras elaboran y dictaminan memorias de cálculo de
              edificios y obras de gran envergadura, en conjunto con los Directores Responsables de
              Obra.
            </p>
          </article>
          <figure className="ce-figure">
            {imgError ? (
              <div className="ce-img-placeholder" role="img" aria-label="Imagen pendiente">
                <ImageOff size={32} aria-hidden="true" />
                <span>Imagen pendiente</span>
              </div>
            ) : (
              <img
                src="/placeholder-calculo.jpg"
                alt="Ingeniero revisando planos estructurales de un edificio"
                onError={() => setImgError(true)}
              />
            )}
          </figure>
        </div>
      </section>

      <section className="ce-features">
        <div className="ce-container">
          <h2>Alcance del servicio</h2>
          <div className="ce-features-grid">
            {alcances.map(({ icono: Icono, titulo, texto }) => (
              <article className="ce-card" key={titulo}>
                <span className="ce-card-icon">
                  <Icono size={24} aria-hidden="true" />
                </span>
                <h3>{titulo}</h3>
                <p>{texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ce-cta">
        <div className="ce-container ce-cta-box">
          <div>
            <h2>¿Tu proyecto necesita cálculo estructural?</h2>
            <p>Escríbenos con los datos de la obra y te pondremos en contacto con un especialista.</p>
          </div>
          <div className="ce-cta-actions">
            <a href={mailto} className="ce-btn ce-btn-primary">
              <Mail size={18} aria-hidden="true" />
              Solicitar cálculo
            </a>
            <a href="#contacto" className="ce-btn ce-btn-secondary">
              Otros medios de contacto
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
