import { useCallback, useEffect, useMemo, useState } from "react";
import { CircleCheck, CircleAlert, ExternalLink, FilePen, LogOut, Plug, Plus, RotateCcw, X } from "lucide-react";
import { LOGO, SIGLAS } from "../../data/contacto";
import { repositorio } from "./repositorio";
import { LISTA_TIPOS, TIPOS, camposFaltantes } from "./tipos";
import { colorSemaforo, revisarTexto } from "./reglas";
import AvisoModo from "./AvisoModo";
import Gestor from "./Gestor";
import Estudio from "./Estudio";
import GuiaConexion from "./GuiaConexion";
import Confirmar from "./Confirmar";

/*
  TABLERO DEL PANEL: barra lateral, indicadores (KPI), gestor de publicaciones y Estudio.
  Los cambios se reflejan al instante en la tabla; si el servidor falla, se deshacen y se avisa.
  Cada acción (guardar, publicar, pausar, duplicar, eliminar) muestra un aviso flotante.
  Los perfiles (public.perfiles) dan el nombre del autor de cada publicación.
*/
const DURACION_AVISO = 4500;
const SECCION_CONEXION = { id: "conexion", etiqueta: "Conexión y guía rápida", corta: "Conexión", icono: Plug };

export default function Tablero({ sesion, onSalir, onSesionVencida }) {
  const [seccion, setSeccion] = useState("noticias");
  const [datos, setDatos] = useState(null);
  const [errorCarga, setErrorCarga] = useState("");
  const [editando, setEditando] = useState(null); // { tipo, fila }
  const [porEliminar, setPorEliminar] = useState(null); // { tipo, fila }
  const [pendientes, setPendientes] = useState(() => new Set());
  const [aviso, setAviso] = useState(null);
  const [perfiles, setPerfiles] = useState(null); // null = cargando
  const [errorPerfiles, setErrorPerfiles] = useState("");

  const notificar = useCallback((texto, nivel = "ok", titulo = "") => setAviso({ texto, nivel, titulo, id: Date.now() }), []);

  // Perfiles del equipo: si fallan, el panel sigue funcionando (solo no se ven los autores)
  const pedirPerfiles = useCallback(
    () =>
      repositorio.perfiles(sesion).then(
        (lista) => ({ lista: lista ?? [], error: "" }),
        (err) => ({ lista: [], error: err.message }),
      ),
    [sesion],
  );

  const autores = useMemo(() => new Map((perfiles ?? []).map((perfil) => [perfil.id, perfil])), [perfiles]);

  // Si el servidor dice que la sesión terminó, volver a la pantalla de acceso
  const manejarError = useCallback(
    (err) => {
      if (err?.estado === 401) onSesionVencida();
      notificar(err.message, "error");
    },
    [notificar, onSesionVencida],
  );

  // Recargar (botón «Reintentar» y después de importar o restablecer datos)
  const cargar = useCallback(async () => {
    try {
      const [todo, equipo] = await Promise.all([repositorio.cargarTodo(), pedirPerfiles()]);
      setDatos(todo);
      setPerfiles(equipo.lista);
      setErrorPerfiles(equipo.error);
      setErrorCarga("");
    } catch (err) {
      if (err?.estado === 401) onSesionVencida();
      setErrorCarga(err.message);
    }
  }, [onSesionVencida, pedirPerfiles]);

  // Carga inicial (la respuesta llega después: se ignora si el panel ya se cerró)
  useEffect(() => {
    let vigente = true;
    repositorio
      .cargarTodo()
      .then((todo) => {
        if (vigente) setDatos(todo);
      })
      .catch((err) => {
        if (!vigente) return;
        if (err?.estado === 401) onSesionVencida();
        setErrorCarga(err.message);
      });
    pedirPerfiles().then((equipo) => {
      if (!vigente) return;
      setPerfiles(equipo.lista);
      setErrorPerfiles(equipo.error);
    });
    return () => {
      vigente = false;
    };
  }, [onSesionVencida, pedirPerfiles]);

  // El aviso flotante se oculta solo
  useEffect(() => {
    if (!aviso) return undefined;
    const temporizador = window.setTimeout(() => setAviso(null), DURACION_AVISO);
    return () => window.clearTimeout(temporizador);
  }, [aviso]);

  const reemplazar = (tipo, id, nueva) =>
    setDatos((actual) => ({ ...actual, [tipo]: actual[tipo].map((f) => (f.id === id ? nueva : f)) }));

  const marcarPendiente = (id, activo) =>
    setPendientes((actual) => {
      const siguiente = new Set(actual);
      if (activo) siguiente.add(id);
      else siguiente.delete(id);
      return siguiente;
    });

  /* ---------- Acciones ---------- */
  const alternar = async (tipo, fila) => {
    const publicar = !fila.publicado;
    if (publicar) {
      const faltan = camposFaltantes(tipo, fila);
      if (faltan.length > 0) return notificar(`No se puede publicar: falta ${faltan.join(", ")}. Ábrela con «Editar».`, "error");
      if (colorSemaforo(revisarTexto(TIPOS[tipo].textos(fila).filter(Boolean).join("\n"))) === "rojo") {
        return notificar("No se puede publicar: el texto no cumple las reglas del Colegio. Ábrela con «Editar».", "error");
      }
    }
    reemplazar(tipo, fila.id, { ...fila, publicado: publicar });
    marcarPendiente(fila.id, true);
    try {
      const guardada = await repositorio.publicar(tipo, fila.id, publicar);
      if (guardada) reemplazar(tipo, fila.id, guardada);
      notificar(
        publicar ? "Ya se ve en el sitio público." : "Ya no se ve en el sitio; sigue guardada como borrador.",
        "ok",
        publicar ? `Publicado: «${fila.titulo}»` : `Pausado: «${fila.titulo}»`,
      );
    } catch (err) {
      reemplazar(tipo, fila.id, fila);
      manejarError(err);
    } finally {
      marcarPendiente(fila.id, false);
    }
    return undefined;
  };

  const duplicar = async (tipo, fila) => {
    marcarPendiente(fila.id, true);
    try {
      const copia = { ...fila, id: undefined, titulo: `${fila.titulo} (copia)`.slice(0, 120), publicado: false };
      const guardada = await repositorio.guardar(tipo, copia);
      setDatos((actual) => ({ ...actual, [tipo]: [guardada, ...actual[tipo]] }));
      notificar("La copia quedó como borrador.", "ok", "Publicación duplicada");
    } catch (err) {
      manejarError(err);
    } finally {
      marcarPendiente(fila.id, false);
    }
  };

  const eliminar = async () => {
    const { tipo, fila } = porEliminar;
    setPorEliminar(null);
    marcarPendiente(fila.id, true);
    try {
      await repositorio.eliminar(tipo, fila.id);
      setDatos((actual) => ({ ...actual, [tipo]: actual[tipo].filter((f) => f.id !== fila.id) }));
      notificar(`«${fila.titulo || "Sin título"}» se borró definitivamente.`, "ok", "Publicación eliminada");
    } catch (err) {
      manejarError(err);
    } finally {
      marcarPendiente(fila.id, false);
    }
  };

  const guardarDesdeEstudio = async (fila) => {
    const { tipo } = editando;
    const guardada = await repositorio.guardar(tipo, fila); // si falla, el Estudio muestra el error
    setDatos((actual) => ({
      ...actual,
      [tipo]: fila.id ? actual[tipo].map((f) => (f.id === fila.id ? guardada : f)) : [guardada, ...actual[tipo]],
    }));
    setEditando(null);
    setSeccion(tipo);
    notificar(
      guardada.publicado ? "Los cambios ya se ven en el sitio público." : "No se ve en el sitio hasta que lo publiques.",
      "ok",
      guardada.publicado ? "Guardado y publicado" : "Guardado como borrador",
    );
  };

  /* ---------- Indicadores ---------- */
  const kpis = datos
    ? [
        { etiqueta: "Noticias publicadas", valor: datos.noticias.filter((f) => f.publicado).length, icono: TIPOS.noticias.icono },
        { etiqueta: "Cursos activos", valor: datos.cursos.filter((f) => f.publicado).length, icono: TIPOS.cursos.icono },
        { etiqueta: "Asambleas registradas", valor: datos.asambleas.length, icono: TIPOS.asambleas.icono },
        {
          etiqueta: "Borradores pendientes",
          valor: LISTA_TIPOS.reduce((total, { id }) => total + datos[id].filter((f) => !f.publicado).length, 0),
          icono: FilePen,
          destacado: true,
        },
      ]
    : [];

  const secciones = [...LISTA_TIPOS, SECCION_CONEXION];
  const actual = secciones.find((s) => s.id === seccion);
  const esContenido = seccion !== "conexion";

  return (
    <div className="adm-app">
      <aside className="adm-lateral" aria-label="Menú del panel">
        <div className="adm-lateral-marca">
          <img src={LOGO} alt="" />
          <div>
            <strong>{SIGLAS}</strong>
            <span>Estudio de publicación</span>
          </div>
        </div>

        <nav className="adm-lateral-nav" aria-label="Secciones del panel">
          {secciones.map(({ id, etiqueta, corta, icono: Icono }, i) => (
            <button
              key={id}
              type="button"
              className="adm-lateral-enlace"
              aria-current={seccion === id && !editando ? "page" : undefined}
              onClick={() => {
                setEditando(null);
                setSeccion(id);
              }}
            >
              <Icono size={20} aria-hidden="true" />
              <span className="adm-lateral-largo">
                {i + 1}. {etiqueta}
              </span>
              <span className="adm-lateral-corto">{corta}</span>
              {datos && id !== "conexion" && <span className="adm-lateral-num">{datos[id].length}</span>}
            </button>
          ))}
        </nav>

        <div className="adm-lateral-pie">
          <div className="adm-usuario">
            <span className="adm-usuario-avatar" aria-hidden="true">
              {(sesion.perfil?.nombre || sesion.usuario?.correo || "?").charAt(0).toUpperCase()}
            </span>
            <div>
              <strong>{sesion.perfil?.nombre || "Personal del Colegio"}</strong>
              <span>{sesion.usuario?.correo}</span>
            </div>
          </div>
          <a href="/" target="_blank" rel="noopener noreferrer" className="adm-lateral-enlace adm-lateral-enlace--suave">
            <ExternalLink size={18} aria-hidden="true" />
            <span>Ver el sitio</span>
          </a>
          <button type="button" className="adm-lateral-enlace adm-lateral-enlace--suave" onClick={onSalir}>
            <LogOut size={18} aria-hidden="true" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      <main className="adm-principal" id="contenido">
        <header className="adm-barra">
          <div>
            <p className="adm-barra-eyebrow">Estudio de publicación</p>
            <h1>{editando ? TIPOS[editando.tipo].etiqueta : actual.etiqueta}</h1>
          </div>
          <div className="adm-barra-acciones">
            <AvisoModo compacto />
            {esContenido && !editando && datos && (
              <button type="button" className="adm-btn adm-btn--primario" onClick={() => setEditando({ tipo: seccion, fila: null })}>
                <Plus size={20} aria-hidden="true" />
                Nueva publicación
              </button>
            )}
          </div>
        </header>

        {errorCarga && (
          <div className="adm-alerta" role="alert">
            <CircleAlert size={22} aria-hidden="true" />
            <div>
              <strong>No se pudo cargar el contenido.</strong>
              <span>{errorCarga}</span>
            </div>
            <button type="button" className="adm-btn adm-btn--secundario adm-btn--chico" onClick={cargar}>
              <RotateCcw size={16} aria-hidden="true" />
              Reintentar
            </button>
          </div>
        )}

        {!datos && !errorCarga && (
          <div className="adm-cargando" role="status" aria-label="Cargando publicaciones">
            <div className="adm-kpis">
              {[1, 2, 3, 4].map((n) => (
                <span key={n} className="esqueleto adm-esqueleto-kpi" />
              ))}
            </div>
            <span className="esqueleto adm-esqueleto-tabla" />
          </div>
        )}

        {datos && editando && (
          <Estudio
            key={editando.fila?.id ?? `nueva-${editando.tipo}`}
            tipo={editando.tipo}
            filaInicial={editando.fila}
            onCancelar={() => setEditando(null)}
            onGuardar={guardarDesdeEstudio}
          />
        )}

        {datos && !editando && esContenido && (
          <>
            <ul className="adm-kpis" aria-label="Resumen">
              {kpis.map(({ etiqueta, valor, icono: Icono, destacado }) => (
                <li key={etiqueta} className={`adm-kpi${destacado ? " adm-kpi--destacado" : ""}`}>
                  <span className="adm-kpi-icono" aria-hidden="true">
                    <Icono size={22} />
                  </span>
                  <div>
                    <strong>{valor}</strong>
                    <span>{etiqueta}</span>
                  </div>
                </li>
              ))}
            </ul>
            <Gestor
              tipo={seccion}
              filas={datos[seccion]}
              pendientes={pendientes}
              autores={autores}
              onNueva={() => setEditando({ tipo: seccion, fila: null })}
              onEditar={(fila) => setEditando({ tipo: seccion, fila })}
              onDuplicar={(fila) => duplicar(seccion, fila)}
              onEliminar={(fila) => setPorEliminar({ tipo: seccion, fila })}
              onAlternar={(fila) => alternar(seccion, fila)}
            />
          </>
        )}

        {datos && !editando && !esContenido && (
          <GuiaConexion
            datos={datos}
            onRecargar={cargar}
            notificar={notificar}
            perfiles={perfiles}
            errorPerfiles={errorPerfiles}
            idSesion={repositorio.idDeSesion(sesion)}
          />
        )}
      </main>

      {aviso && (
        <div
          key={aviso.id}
          className={`adm-aviso adm-aviso--${aviso.nivel}`}
          role={aviso.nivel === "error" ? "alert" : "status"}
          style={{ "--adm-aviso-duracion": `${DURACION_AVISO}ms` }}
        >
          <span className="adm-aviso-icono" aria-hidden="true">
            {aviso.nivel === "error" ? <CircleAlert size={20} /> : <CircleCheck size={20} />}
          </span>
          <div className="adm-aviso-texto">
            {aviso.titulo && <strong>{aviso.titulo}</strong>}
            <span>{aviso.texto}</span>
          </div>
          <button type="button" className="adm-aviso-cerrar" onClick={() => setAviso(null)} aria-label="Cerrar aviso">
            <X size={18} aria-hidden="true" />
          </button>
          <span className="adm-aviso-barra" aria-hidden="true" />
        </div>
      )}

      <Confirmar
        abierto={Boolean(porEliminar)}
        titulo="¿Eliminar esta publicación?"
        texto={porEliminar ? `«${porEliminar.fila.titulo || "Sin título"}» se borrará para siempre. Si solo quieres ocultarla, usa el interruptor para pausarla.` : ""}
        textoConfirmar="Eliminar"
        peligro
        onConfirmar={eliminar}
        onCancelar={() => setPorEliminar(null)}
      />
    </div>
  );
}
