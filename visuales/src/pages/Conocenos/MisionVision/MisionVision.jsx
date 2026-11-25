import { Link } from "react-router-dom";
import { ArrowRight, HandHeart, Landmark, ShieldCheck } from "lucide-react";
import { compromisos, enlaces, pilares, valores } from "../../../data/misionVision";
import { hayServicioSocial, servicioSocial } from "../../../data/servicioSocial";
import Migas from "../../../components/ui/Migas/Migas";
import VideoFondo from "../../../components/ui/VideoFondo/VideoFondo";
import IndicadorCarrusel from "../../../components/ui/IndicadorCarrusel/IndicadorCarrusel";
import useIndicadorCarrusel from "../../../hooks/useIndicadorCarrusel";
import "./MisionVision.css";

// PÁGINA «MISIÓN Y VISIÓN». Los textos están en src/data/misionVision.js.
export default function MisionVision() {
  const { ref, activo, ir } = useIndicadorCarrusel(valores.length);

  return (
    <main className="mv-page">
      <section className="mv-hero">
        <VideoFondo src="/videos/parque-central.mp4" className="mv-hero-video" etiqueta="video de fondo de Misión y Visión" />
        <div className="mv-hero-overlay" aria-hidden="true" />
        <div className="mv-container">
          <Migas className="mv-breadcrumb mv-hero-anim" />
          <span className="mv-badge mv-hero-anim">
            <Landmark size={16} aria-hidden="true" />
            Conócenos
          </span>
          <h1 className="mv-hero-anim">Misión y Visión</h1>
          <span className="mv-hero-divider mv-hero-anim" aria-hidden="true" />
          <p className="mv-intro mv-hero-anim">
            El Colegio de Ingenieros Civiles de Tuxtla Gutiérrez, A.C. es la institución que agrupa y
            representa a los profesionales de la ingeniería civil en la región. Su objetivo es elevar
            la calidad del ejercicio profesional y promover la actualización continua.
          </p>
        </div>
      </section>

      <section className="mv-section">
        <div className="mv-container mv-pilares">
          {pilares.map(({ id, icono: Icono, etiqueta, titulo, texto }) => (
            <article className="mv-card mv-pilar" key={id} id={id}>
              <span className="mv-card-icon mv-card-icon-lg">
                <Icono size={34} aria-hidden="true" />
              </span>
              <span className="mv-pilar-etiqueta">{etiqueta}</span>
              <h2>{titulo}</h2>
              <p>{texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mv-valores fondo-cuadricula" aria-labelledby="mv-valores-titulo">
        <div className="mv-container">
          <h2 id="mv-valores-titulo" className="mv-section-title">Nuestros Valores Institucionales</h2>
          <div className="mv-valores-grid grilla-movil-carrusel" ref={ref}>
            {valores.map(({ icono: Icono, titulo, texto }) => (
              <article className="mv-card mv-valor" key={titulo}>
                <span className="mv-card-icon mv-card-icon-lg">
                  <Icono size={30} aria-hidden="true" />
                </span>
                <h3>{titulo}</h3>
                <p>{texto}</p>
              </article>
            ))}
          </div>
          <IndicadorCarrusel total={valores.length} activo={activo} onIr={ir} />
        </div>
      </section>

      <section className="mv-organigrama" aria-labelledby="mv-organigrama-titulo">
        <div className="mv-container">
          <h2 id="mv-organigrama-titulo" className="mv-organigrama-titulo">
            Estructura del Consejo Directivo
          </h2>
          <figure className="mv-organigrama-figura">
            <a
              href="/img/documentos/organigrama.jpeg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir el organigrama en tamaño completo"
            >
              <img
                src="/img/documentos/organigrama.jpeg"
                alt="Organigrama del Consejo Directivo del Colegio de Ingenieros Civiles de Tuxtla Gutiérrez"
                loading="lazy"
                decoding="async"
                width="1504"
                height="993"
              />
            </a>
            <figcaption>Haz clic en la imagen para verla en tamaño completo.</figcaption>
          </figure>
        </div>
      </section>

      <section className="mv-section" aria-labelledby="mv-compromisos-titulo">
        <div className="mv-container">
          <h2 id="mv-compromisos-titulo" className="mv-section-title">
            Compromisos ante la Profesión y Código de Ética
          </h2>
          <ol className="mv-compromisos">
            {compromisos.map(({ icono: Icono, texto }, i) => (
              <li className="mv-card mv-compromiso" key={texto}>
                <span className="mv-compromiso-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mv-card-icon">
                  <Icono size={22} aria-hidden="true" />
                </span>
                <p>{texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mv-privacidad" aria-labelledby="mv-privacidad-titulo">
        <div className="mv-container">
          <div className="mv-privacidad-box">
            <span className="mv-card-icon mv-card-icon-lg">
              <ShieldCheck size={30} aria-hidden="true" />
            </span>
            <div>
              <h2 id="mv-privacidad-titulo">Política de Privacidad y Seguridad Gremial</h2>
              <p>
                Para salvaguardar la integridad y seguridad de nuestros socios y directivos, todo
                requerimiento de especialistas (DRO, RT, Peritos y Estructuristas) se gestiona de manera
                centralizada a través de las oficinas oficiales del Colegio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Plan B del servicio social: solo mientras el Colegio no mande su texto (data/servicioSocial.js) */}
      {!hayServicioSocial && (
        <section className="mv-privacidad" aria-labelledby="mv-servicio-social-titulo">
          <div className="mv-container">
            <div className="mv-privacidad-box">
              <span className="mv-card-icon mv-card-icon-lg">
                <HandHeart size={30} aria-hidden="true" />
              </span>
              <div>
                <h2 id="mv-servicio-social-titulo">{servicioSocial.aviso.titulo}</h2>
                <p>{servicioSocial.aviso.texto}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="mv-mas fondo-cuadricula">
        <div className="mv-container">
          <h2>Conoce más del Colegio</h2>
          <div className="mv-mas-grid">
            {enlaces.map(({ to, icono: Icono, titulo, texto }) => (
              <Link to={to} className="mv-mas-link" key={to}>
                <span className="mv-card-icon">
                  <Icono size={22} aria-hidden="true" />
                </span>
                <span className="mv-mas-text">
                  <strong>{titulo}</strong>
                  <span>{texto}</span>
                </span>
                <ArrowRight size={20} aria-hidden="true" className="mv-mas-arrow" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
