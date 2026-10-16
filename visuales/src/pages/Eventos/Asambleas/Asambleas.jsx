import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, ChevronRight, ImageOff, MapPin } from "lucide-react";
import asambleas from "../../../data/asambleas";
import "./Asambleas.css";

const ordenadas = [...asambleas].sort((a, b) => b.fecha.localeCompare(a.fecha));

const formatoFecha = new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function Foto({ src, alt, className }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`${className} asm-foto-vacia`} role="img" aria-label={alt}>
        <ImageOff size={28} aria-hidden="true" />
        <span>Foto pendiente</span>
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} loading="lazy" onError={() => setError(true)} />;
}

function Galeria({ fotos }) {
  const [activa, setActiva] = useState(0);

  if (!fotos?.length) return null;
  const foto = fotos[activa];

  return (
    <div className="asm-galeria">
      <Foto key={foto.src} src={foto.src} alt={foto.alt} className="asm-foto-principal" />
      {fotos.length > 1 && (
        <div className="asm-miniaturas">
          {fotos.map((f, i) => (
            <button
              key={f.src}
              type="button"
              className={`asm-miniatura ${i === activa ? "is-activa" : ""}`}
              onClick={() => setActiva(i)}
              aria-label={`Ver foto ${i + 1}: ${f.alt}`}
              aria-pressed={i === activa}
            >
              <Foto src={f.src} alt="" className="asm-miniatura-img" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function AsambleaCard({ asamblea }) {
  const { id, tipo, fecha, lugar, titulo, resumen, acuerdos, fotos } = asamblea;

  return (
    <article className="asm-card" id={id}>
      <Galeria fotos={fotos} />
      <div className="asm-card-body">
        <div className="asm-meta">
          <span className={`asm-tipo asm-tipo-${tipo.toLowerCase()}`}>{tipo}</span>
          <span>
            <CalendarDays size={16} aria-hidden="true" />
            <time dateTime={fecha}>{formatoFecha.format(new Date(fecha))}</time>
          </span>
          {lugar && (
            <span>
              <MapPin size={16} aria-hidden="true" />
              {lugar}
            </span>
          )}
        </div>
        <h2>{titulo}</h2>
        {resumen.map((parrafo) => (
          <p key={parrafo}>{parrafo}</p>
        ))}
        {acuerdos?.length > 0 && (
          <div className="asm-acuerdos">
            <h3>Acuerdos</h3>
            <ul>
              {acuerdos.map((acuerdo) => (
                <li key={acuerdo}>{acuerdo}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}

export default function Asambleas() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="asm-page">
      <main>
        <header className="asm-hero">
          <div className="asm-container">
            <nav className="asm-breadcrumb" aria-label="Ruta de navegación">
              <Link to="/">Inicio</Link>
              <ChevronRight size={14} aria-hidden="true" />
              <span>Eventos</span>
              <ChevronRight size={14} aria-hidden="true" />
              <span aria-current="page">Asambleas</span>
            </nav>
            <h1>Asambleas</h1>
            <p>
              Memoria de las sesiones ordinarias y extraordinarias del Colegio: temas tratados,
              acuerdos tomados y fotografías de cada asamblea.
            </p>
          </div>
        </header>

        <section className="asm-listado asm-container" aria-label="Asambleas realizadas">
          {ordenadas.length > 0 ? (
            ordenadas.map((asamblea) => <AsambleaCard key={asamblea.id} asamblea={asamblea} />)
          ) : (
            <p className="asm-vacio">Próximamente publicaremos información de las asambleas.</p>
          )}
        </section>
      </main>
    </div>
  );
}
