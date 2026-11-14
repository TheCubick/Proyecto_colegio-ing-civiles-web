import { useState } from "react";
import { Calendar, Copy, ImageOff, Inbox, Pencil, Plus, Search, Trash2, UserRound } from "lucide-react";
import { TIPOS, fechaCorta } from "./tipos";

/*
  GESTOR DE PUBLICACIONES (como el administrador de campañas de Meta):
  filtro por estado, buscador en tiempo real, interruptor Publicar/Pausar y acciones por fila.
  Fecha en español («14 nov 2026») y, si se conoce, el nombre de quien la subió (`autores`).
*/
const FILTROS = [
  { id: "todos", etiqueta: "Todos", filtro: () => true },
  { id: "publicados", etiqueta: "Publicados", filtro: (f) => f.publicado },
  { id: "borradores", etiqueta: "Borradores", filtro: (f) => !f.publicado },
];

const normalizar = (texto = "") =>
  texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

function Miniatura({ src, Icono }) {
  const [rota, setRota] = useState(false);
  if (!src || rota) {
    return (
      <span className="adm-miniatura adm-miniatura--vacia" aria-hidden="true">
        {src ? <ImageOff size={20} /> : <Icono size={20} />}
      </span>
    );
  }
  return <img className="adm-miniatura" src={src} alt="" loading="lazy" onError={() => setRota(true)} />;
}

export default function Gestor({ tipo, filas, pendientes, autores, onNueva, onEditar, onDuplicar, onEliminar, onAlternar }) {
  const config = TIPOS[tipo];
  const [filtro, setFiltro] = useState("todos");
  const [busqueda, setBusqueda] = useState("");

  const termino = normalizar(busqueda.trim());
  const { filtro: pasaFiltro } = FILTROS.find((f) => f.id === filtro);
  const visibles = filas.filter(
    (fila) => pasaFiltro(fila) && (!termino || normalizar(config.textos(fila).filter(Boolean).join(" ")).includes(termino)),
  );

  return (
    <section className="adm-gestor" aria-labelledby="adm-gestor-titulo">
      <h2 id="adm-gestor-titulo" className="sr-only">
        {config.etiqueta}
      </h2>

      <div className="adm-herramientas">
        <div className="adm-segmentos" role="group" aria-label="Filtrar por estado">
          {FILTROS.map(({ id, etiqueta, filtro: f }) => (
            <button key={id} type="button" aria-pressed={filtro === id} onClick={() => setFiltro(id)}>
              {etiqueta}
              <span className="adm-segmentos-num">{filas.filter(f).length}</span>
            </button>
          ))}
        </div>
        <label className="adm-buscador">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">Buscar en {config.etiqueta}</span>
          <input type="search" value={busqueda} placeholder={`Buscar ${config.corta.toLowerCase()}…`} onChange={(e) => setBusqueda(e.target.value)} />
        </label>
      </div>

      {visibles.length === 0 ? (
        <div className="adm-vacio">
          <span className="adm-vacio-icono" aria-hidden="true">
            <Inbox size={32} />
          </span>
          {filas.length === 0 ? (
            <>
              <h3>Aún no hay {config.etiqueta.toLowerCase()}</h3>
              <p>Crea la primera: verás cómo queda en el sitio mientras escribes.</p>
              <button type="button" className="adm-btn adm-btn--primario" onClick={onNueva}>
                <Plus size={18} aria-hidden="true" />
                {config.nueva}
              </button>
            </>
          ) : (
            <>
              <h3>Sin resultados</h3>
              <p>{termino ? `Nada coincide con «${busqueda.trim()}».` : "No hay publicaciones con este estado."}</p>
            </>
          )}
        </div>
      ) : (
        <div className="adm-tabla-marco">
          <table className="adm-tabla">
            <thead>
              <tr>
                <th scope="col">Activa</th>
                <th scope="col">Publicación</th>
                <th scope="col">Estado</th>
                <th scope="col">Fecha</th>
                <th scope="col">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {visibles.map((fila) => {
                const { imagen, detalle, fecha } = config.resumen(fila);
                const fechaVisible = fecha || fechaCorta(fila.creado_en);
                const autor = autores?.get(fila.creado_por);
                const titulo = fila.titulo || "(Sin título)";
                const ocupado = pendientes.has(fila.id);
                return (
                  <tr key={fila.id} className={fila.publicado ? "" : "is-borrador"}>
                    <td data-columna="Activa">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={fila.publicado}
                        aria-label={`${fila.publicado ? "Pausar" : "Publicar"} «${titulo}»`}
                        className="adm-switch"
                        onClick={() => onAlternar(fila)}
                        disabled={ocupado}
                      >
                        <span className="adm-switch-pista" aria-hidden="true">
                          <span className="adm-switch-boton" />
                        </span>
                      </button>
                    </td>
                    <td data-columna="Publicación">
                      <div className="adm-publicacion">
                        <Miniatura src={imagen} Icono={config.icono} />
                        <div>
                          <strong>{titulo}</strong>
                          {(detalle || autor) && (
                            <span className="adm-publicacion-meta">
                              {detalle && <span>{detalle}</span>}
                              {autor && (
                                <span className="adm-autor" title={`Subida por ${autor.nombre} (${autor.rol})`}>
                                  <UserRound size={14} aria-hidden="true" />
                                  {autor.nombre}
                                </span>
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td data-columna="Estado">
                      <span className={`adm-chip ${fila.publicado ? "adm-chip--publicado" : "adm-chip--borrador"}`}>
                        {fila.publicado ? "Publicado" : "Borrador"}
                      </span>
                    </td>
                    <td data-columna="Fecha" className="adm-celda-fecha">
                      {fechaVisible ? (
                        <span className="adm-fecha">
                          <Calendar size={16} aria-hidden="true" />
                          {fechaVisible}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td data-columna="Acciones">
                      <div className="adm-acciones">
                        <button type="button" className="adm-accion" onClick={() => onEditar(fila)} aria-label={`Editar «${titulo}»`}>
                          <Pencil size={18} aria-hidden="true" />
                          <span>Editar</span>
                        </button>
                        <button type="button" className="adm-accion" onClick={() => onDuplicar(fila)} aria-label={`Duplicar «${titulo}»`} disabled={ocupado}>
                          <Copy size={18} aria-hidden="true" />
                          <span>Duplicar</span>
                        </button>
                        <button
                          type="button"
                          className="adm-accion adm-accion--peligro"
                          onClick={() => onEliminar(fila)}
                          aria-label={`Eliminar «${titulo}»`}
                          disabled={ocupado}
                        >
                          <Trash2 size={18} aria-hidden="true" />
                          <span>Eliminar</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
