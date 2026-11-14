import { useState } from "react";
import { CalendarDays, MapPin } from "lucide-react";
import ImagenSegura from "../../../components/ui/ImagenSegura/ImagenSegura";
import "./Asambleas.css";

/*
  TARJETA DE UNA ASAMBLEA (galería + tipo, fecha, lugar, resumen y acuerdos).
  La usan la página pública y la vista previa del panel administrativo (/admin).
  Forma: { id, tipo, fecha: "AAAA-MM-DD", lugar, titulo, resumen: [], acuerdos: [], fotos: [{ src, alt }] }
*/
const formatoFecha = new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const fechaLegible = (fecha) => {
  const valor = fecha ? new Date(fecha) : null;
  return valor && !Number.isNaN(valor.getTime()) ? formatoFecha.format(valor) : "Fecha por definir";
};

// Foto de una asamblea; si el archivo no existe muestra «Foto pendiente».
function Foto(props) {
  return <ImagenSegura {...props} claseVacia="asm-foto-vacia" texto="Foto pendiente" />;
}

function Galeria({ fotos }) {
  const [activa, setActiva] = useState(0);

  if (!fotos?.length) return null;
  const foto = fotos[Math.min(activa, fotos.length - 1)];

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

export default function AsambleaCard({ asamblea }) {
  const { id, tipo = "Ordinaria", fecha, lugar, titulo, resumen = [], acuerdos = [], fotos = [] } = asamblea;

  return (
    <article className="asm-card" id={id}>
      <Galeria fotos={fotos} />
      <div className="asm-card-body">
        <div className="asm-meta">
          <span className={`asm-tipo asm-tipo-${tipo.toLowerCase()}`}>{tipo}</span>
          <span>
            <CalendarDays size={16} aria-hidden="true" />
            <time dateTime={fecha || undefined}>{fechaLegible(fecha)}</time>
          </span>
          {lugar && (
            <span>
              <MapPin size={16} aria-hidden="true" />
              {lugar}
            </span>
          )}
        </div>
        <h2>{titulo}</h2>
        {resumen.map((parrafo, i) => (
          <p key={`${i}-${parrafo}`}>{parrafo}</p>
        ))}
        {acuerdos.length > 0 && (
          <div className="asm-acuerdos">
            <h3>Acuerdos</h3>
            <ul>
              {acuerdos.map((acuerdo, i) => (
                <li key={`${i}-${acuerdo}`}>{acuerdo}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}
