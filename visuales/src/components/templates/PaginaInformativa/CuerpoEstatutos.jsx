import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { ChevronDown, ChevronsDownUp, ChevronsUpDown, ListTree } from "lucide-react";
import { CuerpoArticulo } from "../../ui/ArticuloEstatuto/ArticuloEstatuto";
import { bloquesDeArticulo } from "../../ui/ArticuloEstatuto/incisos";
import "./CuerpoEstatutos.css";

/*
  /conocenos/estatutos: índice lateral fijo (resalta el artículo que se está leyendo) y
  artículos en acordeones agrupados por tema (data/estatutos.js → temasEstatutos).
  - El primer artículo inicia abierto; si la dirección trae #art-56, se abre ese.
  - «Expandir todos / Contraer todos» abre o cierra todos los acordeones.
*/
const contarIncisos = (articulo) => bloquesDeArticulo(articulo).filter((bloque) => bloque.tipo === "inciso").length;

export default function CuerpoEstatutos({ temas, fuente }) {
  const { hash } = useLocation();
  const articulos = useMemo(() => temas.flatMap((tema) => tema.articulos), [temas]);
  const idDelHash = hash.slice(1);
  const existeHash = articulos.some(({ id }) => id === idDelHash);

  const [abiertos, setAbiertos] = useState(() => new Set([existeHash ? idDelHash : articulos[0]?.id]));
  const [actual, setActual] = useState(existeHash ? idDelHash : articulos[0]?.id);
  const todosAbiertos = abiertos.size === articulos.length;

  // Llegada con #art-xx: bajar hasta ese artículo
  useEffect(() => {
    if (!existeHash) return undefined;
    const temporizador = window.setTimeout(() => document.getElementById(idDelHash)?.scrollIntoView({ block: "start" }), 120);
    return () => window.clearTimeout(temporizador);
  }, [existeHash, idDelHash]);

  // Resaltar en el índice el artículo que está en pantalla
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return undefined;
    const observador = new IntersectionObserver(
      (entradas) => {
        const visible = entradas.filter((entrada) => entrada.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActual(visible.target.id);
      },
      { rootMargin: "-120px 0px -55% 0px" },
    );
    articulos.forEach(({ id }) => {
      const elemento = document.getElementById(id);
      if (elemento) observador.observe(elemento);
    });
    return () => observador.disconnect();
  }, [articulos]);

  const alternar = (id) =>
    setAbiertos((previos) => {
      const siguientes = new Set(previos);
      if (siguientes.has(id)) siguientes.delete(id);
      else siguientes.add(id);
      return siguientes;
    });

  const alternarTodos = () => setAbiertos(todosAbiertos ? new Set() : new Set(articulos.map(({ id }) => id)));

  const irA = (event, id) => {
    event.preventDefault();
    setAbiertos((previos) => new Set(previos).add(id));
    setActual(id);
    window.history.replaceState(window.history.state, "", `#${id}`);
    window.requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "start" }));
  };

  return (
    <div className="ea-layout">
      <aside className="ea-indice" aria-labelledby="ea-indice-titulo">
        <p className="ea-indice-titulo" id="ea-indice-titulo">
          <ListTree size={18} aria-hidden="true" />
          Navegación rápida
        </p>
        <nav aria-labelledby="ea-indice-titulo">
          {temas.map((tema) => (
            <div className="ea-indice-grupo" key={tema.id}>
              <p className="ea-indice-tema">{tema.titulo}</p>
              <ul>
                {tema.articulos.map(({ id, articulo, titulo }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className={`ea-indice-enlace${actual === id ? " is-actual" : ""}`}
                      aria-current={actual === id ? "location" : undefined}
                      onClick={(event) => irA(event, id)}
                    >
                      <span className="ea-indice-num">{articulo.replace("Artículo ", "Art. ")}</span>
                      <span className="ea-indice-nombre">{titulo}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <div className="ea-contenido">
        <div className="ea-barra">
          <p>
            <strong>{articulos.length}</strong> artículos · <strong>{abiertos.size}</strong> abiertos
          </p>
          <button type="button" className="ea-todos" onClick={alternarTodos}>
            {todosAbiertos ? <ChevronsDownUp size={18} aria-hidden="true" /> : <ChevronsUpDown size={18} aria-hidden="true" />}
            {todosAbiertos ? "Contraer todos" : "Expandir todos"}
          </button>
        </div>

        {temas.map(({ id: idTema, titulo: tituloTema, icono: IconoTema, articulos: lista }) => (
          <section className="ea-tema" key={idTema} aria-labelledby={idTema}>
            <h2 className="ea-tema-titulo" id={idTema}>
              <span className="ea-tema-icono" aria-hidden="true">
                <IconoTema size={22} />
              </span>
              {tituloTema}
            </h2>

            {lista.map((articulo) => {
              const abierto = abiertos.has(articulo.id);
              const incisos = contarIncisos(articulo);
              return (
                <article className={`ea-item${abierto ? " is-abierto" : ""}`} id={articulo.id} key={articulo.id}>
                  <h3 className="ea-item-cabecera">
                    <button
                      type="button"
                      id={`${articulo.id}-boton`}
                      aria-expanded={abierto}
                      aria-controls={`${articulo.id}-panel`}
                      onClick={() => alternar(articulo.id)}
                    >
                      <span className="ea-item-num">{articulo.articulo}</span>
                      <span className="ea-item-titulo">{articulo.titulo}</span>
                      {incisos > 0 && <span className="ea-item-meta">{incisos} puntos</span>}
                      <ChevronDown size={22} aria-hidden="true" className="ea-item-chevron" />
                    </button>
                  </h3>
                  <div
                    className="ea-item-panel"
                    id={`${articulo.id}-panel`}
                    role="region"
                    aria-labelledby={`${articulo.id}-boton`}
                    inert={!abierto}
                  >
                    <div className="ea-item-interior">
                      <CuerpoArticulo articulo={articulo} />
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        ))}

        {fuente && <p className="ea-fuente">Fuente: {fuente}</p>}
      </div>
    </div>
  );
}
