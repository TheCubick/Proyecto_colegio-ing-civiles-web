import { Link } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import { ArrowDown, UserPlus } from "lucide-react";
import { LOGO } from "../../../data/contacto";
import VideoFondo from "../../ui/VideoFondo/VideoFondo";
import "./Hero.css";

/*
  PORTADA DE INICIO: video de fondo, nombre del Colegio y 2 botones de acción (Ley de Fitts: ≥ 48 px).
  - «Explorar Trámites y Servicios» baja con desplazamiento suave al catálogo (#catalogo).
  - «Afíliate al Colegio» abre el pop-up de afiliación (lo controla el Header con #afiliacion).
*/
export default function Hero() {
  const reducir = useReducedMotion();

  const irAlCatalogo = (event) => {
    const destino = document.getElementById("catalogo");
    if (!destino) return;
    event.preventDefault();
    destino.scrollIntoView({ behavior: reducir ? "auto" : "smooth", block: "start" });
    destino.focus({ preventScroll: true });
  };

  return (
    <section className="hero-section" id="inicio">
      <div className="video-overlay" />
      <VideoFondo
        src="/videos/home.mp4"
        className="hero-bg"
        etiqueta="video de presentación del Colegio de Ingenieros Civiles de Tuxtla Gutiérrez, A.C."
      />
      <div className="hero-content">
        <div className="hero-text-box">
          <span className="hero-eyebrow hero-anim">Tuxtla Gutiérrez, Chiapas</span>
          <h1>
            <span className="hero-line hero-anim">Colegio de Ingenieros</span>{" "}
            <span className="hero-line hero-anim">Civiles de</span>{" "}
            <span className="hero-line hero-anim">
              Tuxtla Gutiérrez<span className="hero-ac">, A.C.</span>
            </span>
          </h1>
          {/* Línea roja + siglas oficiales */}
          <div className="hero-firma hero-anim">
            <span className="hero-divider" aria-hidden="true" />
            <span className="hero-siglas">CICTGZ</span>
          </div>
          <p className="hero-anim">
            Asociación que promueve la capacitación permanente y la representación ante las instancias
            gubernamentales, para desarrollar la profesión de la Ingeniería Civil con apego al Código de Ética.
          </p>
          <div className="hero-ctas hero-anim">
            <a href="#catalogo" className="hero-cta hero-cta--principal" onClick={irAlCatalogo}>
              Explorar Trámites y Servicios
              <span className="hero-cta-icono" aria-hidden="true">
                <ArrowDown size={18} />
              </span>
            </a>
            <Link to="#afiliacion" state={{ afiliacion: true }} className="hero-cta hero-cta--cristal">
              <UserPlus size={18} aria-hidden="true" />
              Afíliate al Colegio
            </Link>
          </div>
        </div>
        <div className="hero-logo-large">
          <img
            src={LOGO}
            alt="Logo del Colegio de Ingenieros Civiles de Tuxtla Gutiérrez, A.C. (CICTGZ)"
            width="400"
            height="404"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
