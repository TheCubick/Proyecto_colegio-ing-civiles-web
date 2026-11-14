import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CalendarDays,
  Check,
  Clock,
  FileText,
  Laptop,
  Link2,
  MapPin,
  Shuffle,
  X,
} from "lucide-react";
import ImagenSegura from "../../../components/ui/ImagenSegura/ImagenSegura";
import { fechaCorta } from "../../../utils/fechas";
import "./CursosCapacitacion.css";

/*
  TARJETAS DE «CURSOS Y CAPACITACIÓN» (curso y noticia del muro).
  Las usa la página pública y la vista previa del panel administrativo (/admin),
  así lo que se ve al editar es exactamente lo que se publica.
  Forma de los datos: { id, img, titulo, fecha, horario, modalidad, descripcion, temario } y
  { id, img, titulo, texto, fecha } (noticia; `fecha` en formato AAAA-MM-DD, opcional).
  `DetalleNoticia` es el contenido de la ventana «Leer más» (también se ve en la vista previa del panel).
*/
const iconoModalidad = {
  Presencial: MapPin,
  "En línea": Laptop,
  Mixta: Shuffle,
};

export function CursoCard({ curso, onInscribirse }) {
  const IconoModalidad = iconoModalidad[curso.modalidad] ?? MapPin;

  return (
    <article className="cc-curso">
      <div className="cc-curso-media">
        <ImagenSegura claseVacia="cc-img-vacia" src={curso.img} alt={curso.titulo} className="cc-curso-img" />
        <span className="cc-curso-modalidad">
          <IconoModalidad size={14} aria-hidden="true" />
          {curso.modalidad}
        </span>
      </div>
      <div className="cc-curso-body">
        <h3>{curso.titulo}</h3>
        <ul className="cc-curso-meta">
          <li>
            <CalendarDays size={17} aria-hidden="true" />
            {curso.fecha}
          </li>
          <li>
            <Clock size={17} aria-hidden="true" />
            {curso.horario}
          </li>
        </ul>
        <p>{curso.descripcion}</p>
        <div className="cc-curso-actions">
          <button type="button" className="cc-btn" onClick={onInscribirse}>
            Inscribirse
            <ArrowRight size={16} aria-hidden="true" />
          </button>
          {curso.temario && (
            <a href={curso.temario} target="_blank" rel="noopener noreferrer" className="cc-btn cc-btn-outline">
              <FileText size={16} aria-hidden="true" />
              Ver temario
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function FechaNoticia({ fecha }) {
  const texto = fechaCorta(fecha);
  if (!texto) return null;
  return (
    <span className="cc-fecha">
      <Calendar size={16} aria-hidden="true" />
      <time dateTime={fecha}>{texto}</time>
    </span>
  );
}

// Toda la tarjeta abre la noticia: el botón «Leer más» se extiende sobre ella (un solo control para el teclado).
export function PostCard({ post, onAbrir }) {
  return (
    <article className="cc-card" id={`noticia-${post.id}`}>
      <div className="cc-card-media">
        <ImagenSegura claseVacia="cc-img-vacia" src={post.img} alt={post.titulo} className="cc-card-img" />
      </div>
      <div className="cc-card-body">
        <FechaNoticia fecha={post.fecha} />
        <h3>{post.titulo}</h3>
        <p>{post.texto}</p>
        <button type="button" className="cc-btn cc-card-abrir" onClick={() => onAbrir(post)} aria-label={`Leer más: ${post.titulo}`}>
          Leer más
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

function BotonCopiar({ onCopiar }) {
  const [estado, setEstado] = useState(""); // "" | "ok" | "error"

  useEffect(() => {
    if (!estado) return undefined;
    const temporizador = window.setTimeout(() => setEstado(""), 2500);
    return () => window.clearTimeout(temporizador);
  }, [estado]);

  const copiar = async () => setEstado((await onCopiar?.()) ? "ok" : "error");

  return (
    <button type="button" className={`cc-detalle-copiar${estado === "ok" ? " is-copiado" : ""}`} onClick={copiar}>
      {estado === "ok" ? <Check size={18} aria-hidden="true" /> : <Link2 size={18} aria-hidden="true" />}
      <span aria-live="polite">
        {estado === "ok" ? "¡Enlace copiado!" : estado === "error" ? "No se pudo copiar" : "Copiar enlace"}
      </span>
    </button>
  );
}

/*
  Contenido de la ventana de una noticia: foto a la izquierda (completa, sin recortar, sea vertical
  u horizontal) y texto a la derecha; abajo, «Anterior», «Copiar enlace» y «Siguiente».
  En pantallas angostas todo va en una columna (reglas @container de CursosCapacitacion.css).
*/
export function DetalleNoticia({ post, onCerrar, onAnterior, onSiguiente, onCopiar, posicion, tituloId = "cc-modal-titulo" }) {
  const refTexto = useRef(null);
  const parrafos = `${post.texto ?? ""}`.split(/\n+/).map((p) => p.trim()).filter(Boolean);

  // Al pasar a otra noticia, el texto empieza desde arriba
  useEffect(() => {
    refTexto.current?.scrollTo?.(0, 0);
  }, [post.id]);

  return (
    <div className="cc-detalle-marco">
      <article className="cc-detalle">
        <div className="cc-detalle-media">
          <ImagenSegura key={post.img || "sin-foto"} claseVacia="cc-img-vacia" src={post.img} alt={post.titulo} className="cc-detalle-img" />
        </div>

        <div className="cc-detalle-texto" ref={refTexto}>
          <div className="cc-detalle-cabecera">
            <FechaNoticia fecha={post.fecha} />
            <button type="button" className="cc-modal-close cc-detalle-cerrar" onClick={onCerrar} aria-label="Cerrar noticia">
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          <h2 id={tituloId}>{post.titulo}</h2>
          {parrafos.map((parrafo, i) => (
            <p key={i}>{parrafo}</p>
          ))}
        </div>

        <footer className="cc-detalle-pie">
          <button type="button" className="cc-detalle-nav" onClick={onAnterior} disabled={!onAnterior}>
            <ArrowLeft size={18} aria-hidden="true" />
            Anterior
          </button>
          <div className="cc-detalle-centro">
            {posicion && <span className="cc-detalle-posicion">{posicion}</span>}
            <BotonCopiar key={post.id} onCopiar={onCopiar} />
          </div>
          <button type="button" className="cc-detalle-nav cc-detalle-nav--siguiente" onClick={onSiguiente} disabled={!onSiguiente}>
            Siguiente
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </footer>
      </article>
    </div>
  );
}
