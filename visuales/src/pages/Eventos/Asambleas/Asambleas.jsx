import { useState } from "react";
import { CalendarDays, MapPin } from "lucide-react";
import asambleas from "../../../data/asambleas";
import Migas from "../../../components/ui/Migas/Migas";
import ImagenSegura from "../../../components/ui/ImagenSegura/ImagenSegura";
import "./Asambleas.css";

// PÁGINA «ASAMBLEAS». Las asambleas están en src/data/asambleas.js.

const ordenadas = [...asambleas].sort((a, b) => b.fecha.localeCompare(a.fecha));

const formatoFecha = new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

// Foto de una asamblea; si el archivo no existe muestra «Foto pendiente».
function Foto(props) {
  return <ImagenSegura {...props} claseVacia="asm-foto-vacia" texto="Foto pendiente" />;
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
  return (
    <div className="asm-page">
      <main>
        <header className="asm-hero">
          <div className="asm-container">
            <Migas className="asm-breadcrumb" />
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
