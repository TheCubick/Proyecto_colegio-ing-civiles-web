import { useState } from "react";
import { ChevronDown, ScrollText } from "lucide-react";
import { bloquesDeArticulo } from "./incisos";
import "./ArticuloEstatuto.css";

/*
  UN ARTÍCULO DE LOS ESTATUTOS, tal cual lo entregó el Colegio (src/data/estatutos.js).
  Los incisos (9.1, A), I., 1.) se dibujan como lista con distintivos; el texto no cambia.

  <ArticuloEstatuto articulo={…} nivel="h2" />   tarjeta completa con encabezado.
  <CuerpoArticulo articulo={…} plegable={4} />   solo el contenido; con `plegable` muestra
                                                  los primeros N incisos y un botón «Ver más».
*/
export default function ArticuloEstatuto({ articulo, nivel = "h2", plegable, className = "" }) {
  const { id, articulo: numero, titulo } = articulo;
  const Titulo = nivel;

  return (
    <article className={`ae-articulo ${className}`.trim()} id={id}>
      <header className="ae-cabecera">
        <span className="ae-sello" aria-hidden="true">
          <ScrollText size={22} />
        </span>
        <Titulo className="ae-titulo">
          <small>{numero}</small>
          <span>{titulo}</span>
        </Titulo>
      </header>
      <CuerpoArticulo articulo={articulo} plegable={plegable} />
    </article>
  );
}

// Junta los incisos seguidos en una sola lista; párrafos y subtítulos van sueltos.
function agrupar(bloques) {
  const segmentos = [];
  for (const bloque of bloques) {
    const ultimo = segmentos.at(-1);
    if (bloque.tipo !== "inciso") segmentos.push(bloque);
    else if (ultimo?.tipo === "lista") ultimo.items.push(bloque);
    else segmentos.push({ tipo: "lista", items: [bloque] });
  }
  return segmentos;
}

export function CuerpoArticulo({ articulo, plegable }) {
  const [desplegado, setDesplegado] = useState(false);
  const bloques = bloquesDeArticulo(articulo);

  // Corte para la vista previa: después del inciso número `plegable`.
  let corte = bloques.length;
  if (plegable) {
    let vistos = 0;
    const indice = bloques.findIndex((bloque) => bloque.tipo === "inciso" && ++vistos === plegable);
    if (indice !== -1 && indice < bloques.length - 2) corte = indice + 1;
  }
  const recortado = corte < bloques.length;
  const visibles = recortado && !desplegado ? bloques.slice(0, corte) : bloques;
  const restantes = bloques.slice(corte).filter((bloque) => bloque.tipo === "inciso").length;

  return (
    <div className="ae-cuerpo">
      {agrupar(visibles).map((segmento, i) => {
        if (segmento.tipo === "parrafo") {
          return (
            <p className="ae-parrafo" key={i}>
              {segmento.texto}
            </p>
          );
        }
        if (segmento.tipo === "grupo") {
          return (
            <p className="ae-grupo" key={i}>
              {segmento.texto}
            </p>
          );
        }
        return (
          <ol className="ae-incisos" role="list" key={i}>
            {segmento.items.map(({ marca, nivel, texto }, j) => (
              <li
                key={`${j}-${marca}`}
                className={`ae-inciso${nivel === 2 ? " ae-inciso--sub" : ""}${marca ? "" : " ae-inciso--nota"}`}
              >
                <span className="ae-marca" aria-hidden={marca ? undefined : "true"}>
                  {marca}
                </span>
                <span className="ae-texto">{texto}</span>
              </li>
            ))}
          </ol>
        );
      })}

      {recortado && (
        <button
          type="button"
          className="ae-mas"
          aria-expanded={desplegado}
          onClick={() => setDesplegado((valor) => !valor)}
        >
          {desplegado ? "Mostrar menos" : `Ver ${restantes} ${restantes === 1 ? "punto" : "puntos"} más`}
          <ChevronDown size={18} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
