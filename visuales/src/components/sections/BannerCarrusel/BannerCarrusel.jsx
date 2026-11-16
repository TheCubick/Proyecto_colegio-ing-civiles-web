import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectFade, Keyboard } from "swiper/modules";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-fade";
import { banners } from "../../../data/inicio";
import EncabezadoSeccion from "../../ui/EncabezadoSeccion/EncabezadoSeccion";
import "./BannerCarrusel.css";

// Carrusel «Actividades del Colegio». Las fotos y textos están en src/data/inicio.js.
const AUTOPLAY_MS = 5500;

export default function BannerCarrusel() {
  const swiperRef = useRef(null);
  const progressRef = useRef(null);
  const [activo, setActivo] = useState(0);
  const [pausado, setPausado] = useState(false);

  const alternarPausa = () => {
    const autoplay = swiperRef.current?.autoplay;
    if (!autoplay) return;
    if (pausado) autoplay.start();
    else autoplay.stop();
    setPausado(!pausado);
  };

  return (
    <section className="bc-section fondo-luz-institucional" aria-labelledby="bc-titulo">
      <div className="bc-container">
        <EncabezadoSeccion
          id="bc-titulo"
          etiqueta="Galería"
          titulo="Actividades del Colegio"
          subtitulo="Promoviendo la capacitación permanente y la representación del gremio."
          enlace={{ to: "/eventos/cursos-y-capacitacion", texto: "Ver noticias y eventos" }}
        />

        <div className="bc-carousel">
          <Swiper
            modules={[A11y, Autoplay, EffectFade, Keyboard]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={800}
            loop
            keyboard={{ enabled: true, onlyInViewport: true }}
            autoplay={{ delay: AUTOPLAY_MS, disableOnInteraction: false, pauseOnMouseEnter: true }}
            a11y={{
              prevSlideMessage: "Anuncio anterior",
              nextSlideMessage: "Siguiente anuncio",
              slideLabelMessage: "Anuncio {{index}} de {{slidesLength}}",
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => setActivo(swiper.realIndex)}
            onAutoplayTimeLeft={(_, __, progreso) => {
              progressRef.current?.style.setProperty("--bc-progress", String(1 - progreso));
            }}
            className="bc-swiper"
          >
            {banners.map((slide, i) => (
              <SwiperSlide key={slide.id}>
                <article className="bc-slide">
                  <img
                    src={slide.img}
                    alt={slide.titulo}
                    className="bc-slide-img"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                  <div className="bc-slide-text">
                    <span className="bc-slide-tag">{slide.tag}</span>
                    <h3>{slide.titulo}</h3>
                    <p>{slide.descripcion}</p>
                    {slide.enlace && (
                      <Link to={slide.enlace} className="bc-slide-link">
                        Ver más
                        <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            type="button"
            className="bc-arrow bc-arrow-prev"
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Anuncio anterior"
          >
            <ChevronLeft size={24} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="bc-arrow bc-arrow-next"
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Siguiente anuncio"
          >
            <ChevronRight size={24} aria-hidden="true" />
          </button>
        </div>

        <div className="bc-controls">
          <div className="bc-dots" role="group" aria-label="Elegir anuncio">
            {banners.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                className={`bc-dot ${i === activo ? "is-active" : ""}`}
                onClick={() => swiperRef.current?.slideToLoop(i)}
                aria-label={`Ir al anuncio ${i + 1}: ${slide.titulo}`}
                aria-current={i === activo ? "true" : undefined}
              >
                {i === activo && <span ref={progressRef} className="bc-dot-progress" />}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="bc-pause"
            onClick={alternarPausa}
            aria-label={pausado ? "Reanudar carrusel" : "Pausar carrusel"}
          >
            {pausado ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </section>
  );
}
