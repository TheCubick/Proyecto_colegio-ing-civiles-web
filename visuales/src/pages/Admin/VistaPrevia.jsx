import { useEffect, useRef, useState } from "react";
import { BookOpen, LayoutGrid, Monitor, Smartphone } from "lucide-react";
import { aSitio } from "../../utils/contenido";
import { CursoCard, DetalleNoticia, PostCard } from "../Eventos/CursosCapacitacion/TarjetasCursos";
import AsambleaCard from "../Eventos/Asambleas/AsambleaCard";

/*
  VISTA PREVIA EN VIVO: dibuja la MISMA tarjeta que usa el sitio público con lo que se va
  escribiendo. Conmutador Escritorio / Celular (360 px).
  En noticias, además: «Tarjeta del muro» o «Vista de lectura» (la ventana que abre «Leer más»).
*/
const destino = {
  noticias: "Cursos y Capacitación › Noticias recientes",
  cursos: "Cursos y Capacitación › Próximos cursos",
  asambleas: "Eventos › Asambleas",
};

const nada = () => {};

// La «Vista de lectura» en escritorio se dibuja al ancho real de la ventana del sitio y se reduce a escala
const ANCHO_LECTURA = 980;

// Clave corta para volver a dibujar la tarjeta cuando cambia la foto (las fotos locales son textos muy largos).
const claveDe = (texto = "") => (texto ? `${texto.length}-${texto.slice(-24)}` : "sin-foto");

function datosDePrueba(tipo, fila) {
  const base = { ...fila, id: "vista-previa", titulo: fila.titulo?.trim() || "Título de la publicación" };
  if (tipo === "noticias") return aSitio.noticias({ ...base, texto: fila.texto?.trim() || "El cuerpo de la noticia aparecerá aquí." });
  if (tipo === "cursos") {
    return aSitio.cursos({
      ...base,
      fecha_texto: fila.fecha_texto?.trim() || "Fecha por definir",
      horario: fila.horario?.trim() || "Horario por definir",
      descripcion: fila.descripcion?.trim() || "La descripción del curso aparecerá aquí.",
    });
  }
  const resumen = (fila.resumen ?? []).map((p) => p.trim()).filter(Boolean);
  return aSitio.asambleas({
    ...base,
    resumen: resumen.length > 0 ? resumen : ["El resumen de la asamblea aparecerá aquí."],
    acuerdos: (fila.acuerdos ?? []).map((a) => a.trim()).filter(Boolean),
    fotos: (fila.fotos ?? []).map((foto, i) => ({ src: foto.src, alt: foto.alt?.trim() || `Foto ${i + 1}` })),
  });
}

export default function VistaPrevia({ tipo, fila }) {
  const [dispositivo, setDispositivo] = useState("escritorio");
  const [vista, setVista] = useState("tarjeta");
  const datos = datosDePrueba(tipo, fila);
  const lectura = tipo === "noticias" && vista === "lectura";
  const refLienzo = useRef(null);
  const [anchoLienzo, setAnchoLienzo] = useState(0);

  useEffect(() => {
    const lienzo = refLienzo.current;
    if (!lienzo || typeof ResizeObserver === "undefined") return undefined;
    const observador = new ResizeObserver(([entrada]) => setAnchoLienzo(entrada.contentRect.width));
    observador.observe(lienzo);
    return () => observador.disconnect();
  }, []);

  const escala = lectura && dispositivo === "escritorio" && anchoLienzo > 0 ? Math.min(1, anchoLienzo / ANCHO_LECTURA) : 1;

  return (
    <section className="adm-previa" aria-labelledby="adm-previa-titulo">
      <div className="adm-previa-barra">
        <div>
          <h2 id="adm-previa-titulo">Vista previa en vivo</h2>
          <p>{lectura ? "Ventana «Leer más» de la noticia" : destino[tipo]}</p>
        </div>
        {tipo === "noticias" && (
          <div className="adm-segmentos" role="group" aria-label="Qué mostrar en la vista previa">
            <button type="button" aria-pressed={vista === "tarjeta"} onClick={() => setVista("tarjeta")}>
              <LayoutGrid size={18} aria-hidden="true" />
              Tarjeta del muro
            </button>
            <button type="button" aria-pressed={vista === "lectura"} onClick={() => setVista("lectura")}>
              <BookOpen size={18} aria-hidden="true" />
              Vista de lectura
            </button>
          </div>
        )}
        <div className="adm-segmentos" role="group" aria-label="Tamaño de la vista previa">
          <button type="button" aria-pressed={dispositivo === "escritorio"} onClick={() => setDispositivo("escritorio")}>
            <Monitor size={18} aria-hidden="true" />
            Escritorio
          </button>
          <button type="button" aria-pressed={dispositivo === "celular"} onClick={() => setDispositivo("celular")}>
            <Smartphone size={18} aria-hidden="true" />
            Celular
          </button>
        </div>
      </div>

      <div ref={refLienzo} className={`adm-previa-lienzo adm-previa-lienzo--${dispositivo}`}>
        <div
          className={`adm-marco adm-marco--${dispositivo} adm-marco--${tipo}${lectura ? " adm-marco--lectura" : ""}`}
          style={escala < 1 ? { zoom: escala } : undefined}
          inert
        >
          {lectura && (
            <div className="cc-page adm-sitio">
              <div className="cc-modal cc-modal--noticia adm-modal-previa">
                <DetalleNoticia post={datos} onCerrar={nada} onAnterior={nada} onSiguiente={nada} tituloId="adm-previa-noticia" />
              </div>
            </div>
          )}
          {tipo === "noticias" && !lectura && (
            <div className="cc-page adm-sitio">
              <PostCard key={claveDe(datos.img)} post={datos} onAbrir={nada} />
            </div>
          )}
          {tipo === "cursos" && (
            <div className="cc-page adm-sitio">
              <div className="cc-cursos-lista">
                <CursoCard key={claveDe(datos.img)} curso={datos} onInscribirse={nada} />
              </div>
            </div>
          )}
          {tipo === "asambleas" && (
            <div className="asm-page adm-sitio">
              <AsambleaCard asamblea={datos} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
