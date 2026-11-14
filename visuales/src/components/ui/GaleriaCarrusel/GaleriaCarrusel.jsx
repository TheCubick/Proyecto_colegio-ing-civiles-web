import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectFade, Pagination } from "swiper/modules";
import { ImageOff } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "./GaleriaCarrusel.css";

// Carrusel automático de fotos para las vistas de Trámites y Servicios.
// Las fotos que no existan en public/ se ocultan solas: Diseño puede subir
// de 1 a 6 imágenes por servicio sin tocar el código.
// Si no queda ninguna foto visible, se muestra `respaldo` ({ src, alt }) como
// foto fija; sin respaldo, se muestra «Galería en preparación».
const reducirMovimiento =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function GaleriaCarrusel({ fotos, respaldo, intervalo = 4500 }) {
  const [rotas, setRotas] = useState([]);
  const visibles = fotos.filter((foto) => !rotas.includes(foto.src));
  const rotar = visibles.length > 1 && !reducirMovimiento;

  if (visibles.length === 0) {
    if (respaldo) {
      return <img className="gc-respaldo" src={respaldo.src} alt={respaldo.alt} />;
    }
    return (
      <div className="gc-vacio" role="img" aria-label="Galería en preparación">
        <ImageOff size={32} aria-hidden="true" />
        <span>Galería en preparación</span>
      </div>
    );
  }

  return (
    <Swiper
      className="gc-swiper"
      modules={[A11y, Autoplay, EffectFade, Pagination]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      speed={800}
      rewind
      autoplay={rotar ? { delay: intervalo, disableOnInteraction: false, pauseOnMouseEnter: true } : false}
      pagination={{ clickable: true }}
      a11y={{ paginationBulletMessage: "Ir a la foto {{index}}" }}
    >
      {visibles.map((foto, i) => (
        <SwiperSlide key={foto.src}>
          <img
            className="gc-img"
            src={foto.src}
            alt={foto.alt}
            loading={i === 0 ? "eager" : "lazy"}
            onError={() => setRotas((prev) => [...prev, foto.src])}
          />
          {foto.pie && <p className="gc-pie">{foto.pie}</p>}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
