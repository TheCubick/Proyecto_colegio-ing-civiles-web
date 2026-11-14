import { useRef, useState } from "react";
import { ArrowLeft, Check, FileText, Lock, Plus, Save, Send, Trash2, Upload, X } from "lucide-react";
import { TIPOS, camposFaltantes } from "./tipos";
import { CLAUSULA_NEUTRALIDAD, colorSemaforo, revisarTexto, tieneClausula } from "./reglas";
import { fechaISO, hoyISO } from "../../utils/fechas";
import { repositorio } from "./repositorio";
import ZonaImagen from "./ZonaImagen";
import ListaDinamica from "./ListaDinamica";
import Semaforo from "./Semaforo";
import VistaPrevia from "./VistaPrevia";
import Confirmar from "./Confirmar";

/*
  ESTUDIO CREADOR (pantalla dividida): formulario a la izquierda y vista previa en vivo a la derecha.
  - Guardar borrador: se guarda sin publicarse.
  - Publicar: solo si el semáforo no está en rojo y no falta ningún campo obligatorio.
*/
const LARGO_TITULO = 120;
const LARGO_RECOMENDADO_NOTICIA = 600;

function Campo({ etiqueta, ayuda, contador, children }) {
  return (
    <label className="adm-campo">
      <span className="adm-etiqueta-fila">
        <span className="adm-etiqueta">{etiqueta}</span>
        {contador}
      </span>
      {ayuda && <span className="adm-ayuda">{ayuda}</span>}
      {children}
    </label>
  );
}

const Contador = ({ actual, maximo, recomendado }) => (
  <span className={`adm-contador${actual > (recomendado ?? maximo) ? " is-excedido" : ""}`}>
    {actual}
    {maximo ? ` / ${maximo}` : " caracteres"}
  </span>
);

/* ---------- Campos de cada tipo ---------- */
function CamposNoticia({ fila, cambiar, subirImagen, insertarClausula, refTexto, alEnfocarTexto, clausulaIncluida }) {
  return (
    <>
      <ZonaImagen
        etiqueta="Foto de la noticia"
        ayuda="Horizontal de preferencia. Sin fotos de terceros sin permiso."
        valor={fila.imagen_url}
        subir={subirImagen}
        onSubida={(url) => cambiar({ imagen_url: url })}
        onQuitar={() => cambiar({ imagen_url: "" })}
      />
      <Campo etiqueta="Título" contador={<Contador actual={fila.titulo.length} maximo={LARGO_TITULO} />}>
        <input value={fila.titulo} maxLength={LARGO_TITULO} onChange={(e) => cambiar({ titulo: e.target.value })} />
      </Campo>
      <Campo etiqueta="Fecha de publicación">
        <input type="date" value={fila.fecha_publicacion ?? ""} onChange={(e) => cambiar({ fecha_publicacion: e.target.value })} />
      </Campo>
      <Campo
        etiqueta="Cuerpo de la noticia"
        ayuda="La tarjeta muestra el inicio; el texto completo se lee en «Leer más»."
        contador={<Contador actual={fila.texto.length} recomendado={LARGO_RECOMENDADO_NOTICIA} />}
      >
        <textarea
          ref={refTexto}
          rows={7}
          value={fila.texto}
          onFocus={alEnfocarTexto}
          onChange={(e) => cambiar({ texto: e.target.value })}
        />
      </Campo>
      <button
        type="button"
        className={`adm-btn adm-btn--suave adm-btn--chico adm-btn--izquierda${clausulaIncluida ? " is-incluida" : ""}`}
        onClick={insertarClausula}
        disabled={clausulaIncluida}
        title={clausulaIncluida ? undefined : "Se inserta donde está el cursor del texto"}
      >
        {clausulaIncluida ? <Check size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
        {clausulaIncluida ? "✓ Cláusula apartidista incluida" : `Insertar «${CLAUSULA_NEUTRALIDAD}»`}
      </button>
    </>
  );
}

function CamposCurso({ fila, cambiar, subirImagen }) {
  const entradaPdf = useRef(null);
  const [subiendoPdf, setSubiendoPdf] = useState(false);
  const [errorPdf, setErrorPdf] = useState("");

  const elegirPdf = async (archivo) => {
    if (!archivo) return;
    setErrorPdf("");
    if (archivo.type !== "application/pdf") {
      setErrorPdf("El temario debe ser un archivo PDF.");
      return;
    }
    setSubiendoPdf(true);
    try {
      cambiar({ temario_url: await repositorio.subirPdf(archivo) });
    } catch (err) {
      setErrorPdf(err.message);
    } finally {
      setSubiendoPdf(false);
      if (entradaPdf.current) entradaPdf.current.value = "";
    }
  };

  return (
    <>
      <ZonaImagen
        etiqueta="Imagen del curso"
        valor={fila.imagen_url}
        subir={subirImagen}
        onSubida={(url) => cambiar({ imagen_url: url })}
        onQuitar={() => cambiar({ imagen_url: "" })}
      />
      <Campo etiqueta="Título del curso" contador={<Contador actual={fila.titulo.length} maximo={LARGO_TITULO} />}>
        <input value={fila.titulo} maxLength={LARGO_TITULO} onChange={(e) => cambiar({ titulo: e.target.value })} />
      </Campo>
      <div className="adm-fila-2">
        <Campo etiqueta="Fecha de inicio" ayuda="Ej.: «Inicia: 5 de diciembre de 2026»">
          <input value={fila.fecha_texto} placeholder="Inicia: …" onChange={(e) => cambiar({ fecha_texto: e.target.value })} />
        </Campo>
        <Campo etiqueta="Horario" ayuda="Ej.: «Sábados de 9:00 a 14:00»">
          <input value={fila.horario} onChange={(e) => cambiar({ horario: e.target.value })} />
        </Campo>
      </div>
      <Campo etiqueta="Modalidad" ayuda="Regla del Colegio: los cursos son presenciales.">
        <span className="adm-bloqueado">
          <Lock size={18} aria-hidden="true" />
          <input value="Presencial" readOnly aria-readonly="true" />
        </span>
      </Campo>
      <Campo etiqueta="Descripción" contador={<Contador actual={fila.descripcion.length} />}>
        <textarea rows={5} value={fila.descripcion} onChange={(e) => cambiar({ descripcion: e.target.value })} />
      </Campo>

      <div className="adm-campo">
        <span className="adm-etiqueta">Temario en PDF (opcional)</span>
        {fila.temario_url ? (
          <div className="adm-archivo">
            <FileText size={22} aria-hidden="true" />
            <a href={fila.temario_url} target="_blank" rel="noopener noreferrer">
              Ver temario cargado
            </a>
            <button type="button" className="adm-btn-icono adm-btn-icono--quitar" onClick={() => cambiar({ temario_url: "" })} aria-label="Quitar temario">
              <X size={18} aria-hidden="true" />
            </button>
          </div>
        ) : (
          <button type="button" className="adm-btn adm-btn--secundario adm-btn--izquierda" onClick={() => entradaPdf.current?.click()} disabled={subiendoPdf}>
            {subiendoPdf ? <span className="adm-girar" aria-hidden="true" /> : <Upload size={18} aria-hidden="true" />}
            {subiendoPdf ? "Subiendo PDF…" : "Subir temario PDF"}
          </button>
        )}
        <input
          ref={entradaPdf}
          type="file"
          accept="application/pdf"
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
          onChange={(e) => elegirPdf(e.target.files[0])}
        />
        {errorPdf && (
          <p className="adm-error" role="alert">
            {errorPdf}
          </p>
        )}
      </div>
    </>
  );
}

function CamposAsamblea({ fila, cambiar, subirImagen }) {
  const cambiarFoto = (indice, alt) => cambiar({ fotos: fila.fotos.map((f, i) => (i === indice ? { ...f, alt } : f)) });
  const quitarFoto = (indice) => cambiar({ fotos: fila.fotos.filter((_, i) => i !== indice) });

  return (
    <>
      <fieldset className="adm-campo adm-radios">
        <legend className="adm-etiqueta">Tipo de asamblea</legend>
        <div className="adm-segmentos adm-segmentos--formulario">
          {["Ordinaria", "Extraordinaria"].map((tipo) => (
            <label key={tipo} className={fila.tipo === tipo ? "is-activo" : ""}>
              <input type="radio" name="tipo-asamblea" value={tipo} checked={fila.tipo === tipo} onChange={() => cambiar({ tipo })} />
              {tipo}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="adm-fila-2">
        <Campo etiqueta="Fecha">
          <input type="date" value={fila.fecha ?? ""} onChange={(e) => cambiar({ fecha: e.target.value })} />
        </Campo>
        <Campo etiqueta="Lugar">
          <input value={fila.lugar} onChange={(e) => cambiar({ lugar: e.target.value })} />
        </Campo>
      </div>
      <Campo etiqueta="Título" contador={<Contador actual={fila.titulo.length} maximo={LARGO_TITULO} />}>
        <input value={fila.titulo} maxLength={LARGO_TITULO} onChange={(e) => cambiar({ titulo: e.target.value })} />
      </Campo>
      <ListaDinamica
        etiqueta="Resumen"
        ayuda="Un párrafo por cada tema tratado."
        items={fila.resumen}
        onCambiar={(resumen) => cambiar({ resumen })}
        multilinea
        textoAgregar="Agregar párrafo"
        nombreItem="Párrafo"
      />
      <ListaDinamica
        etiqueta="Acuerdos"
        items={fila.acuerdos}
        onCambiar={(acuerdos) => cambiar({ acuerdos })}
        textoAgregar="Agregar acuerdo"
        nombreItem="Acuerdo"
      />
      <ZonaImagen
        etiqueta="Galería de fotos"
        ayuda="Puedes arrastrar varias a la vez. Solo fotos con permiso de las personas que aparecen."
        multiple
        subir={subirImagen}
        onSubida={(src) => cambiar((actual) => ({ fotos: [...actual.fotos, { src, alt: "" }] }))}
      />
      {fila.fotos.length > 0 && (
        <ul className="adm-fotos">
          {fila.fotos.map((foto, i) => (
            <li key={`${i}-${foto.src.slice(-16)}`}>
              <img src={foto.src} alt="" />
              <label className="adm-campo">
                <span className="adm-etiqueta">Descripción de la foto {i + 1}</span>
                <input value={foto.alt} placeholder="Ej.: Mesa directiva durante la sesión" onChange={(e) => cambiarFoto(i, e.target.value)} />
              </label>
              <button type="button" className="adm-btn-icono adm-btn-icono--quitar" onClick={() => quitarFoto(i)} aria-label={`Quitar foto ${i + 1}`}>
                <Trash2 size={18} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

const camposPorTipo = { noticias: CamposNoticia, cursos: CamposCurso, asambleas: CamposAsamblea };

/* ---------- Estudio ---------- */
export default function Estudio({ tipo, filaInicial, onCancelar, onGuardar }) {
  const config = TIPOS[tipo];
  const [inicial] = useState(() => {
    const base = { ...config.vacio(), ...filaInicial };
    // Noticia sin fecha (importada antes): se propone la del día en que se subió, o la de hoy
    if (tipo === "noticias" && !base.fecha_publicacion) base.fecha_publicacion = fechaISO(filaInicial?.creado_en) || hoyISO();
    return base;
  });
  const [fila, setFila] = useState(inicial);
  const [guardando, setGuardando] = useState("");
  const [error, setError] = useState("");
  const [confirmarSalida, setConfirmarSalida] = useState(false);
  const refTexto = useRef(null);
  const textoTocado = useRef(false); // ¿ya se puso el cursor en el cuerpo de la noticia?

  const cambiar = (cambios) => setFila((actual) => ({ ...actual, ...(typeof cambios === "function" ? cambios(actual) : cambios) }));
  const subirImagen = (archivo) => repositorio.subirImagen(archivo, tipo);

  const hallazgos = revisarTexto(config.textos(fila).filter(Boolean).join("\n"));
  if (tipo === "asambleas" && fila.fotos.some((foto) => !foto.alt.trim())) {
    hallazgos.push({
      id: "alt",
      nivel: "aviso",
      titulo: "Fotos sin descripción",
      detalle: "Describe cada foto: la leen las personas que usan lector de pantalla.",
    });
  }
  const color = colorSemaforo(hallazgos);
  const faltan = camposFaltantes(tipo, fila);
  const sinCambios = JSON.stringify(fila) === JSON.stringify(inicial);
  const puedePublicar = color !== "rojo" && faltan.length === 0;

  const clausulaIncluida = tieneClausula(config.textos(fila).filter(Boolean).join("\n"));

  // Inserta la cláusula donde está el cursor del cuerpo de la noticia. Si nunca se puso el
  // cursor ahí, va al final (antes el navegador reportaba la posición 0 y quedaba al inicio).
  // Si el texto ya la contiene, no hace nada (el botón aparece deshabilitado).
  const insertarClausula = () => {
    if (clausulaIncluida) return;
    const campo = refTexto.current;
    const texto = fila.texto ?? "";
    const usarCursor = textoTocado.current && campo;
    const inicio = usarCursor ? campo.selectionStart : texto.length;
    const fin = usarCursor ? campo.selectionEnd : texto.length;
    const antes = texto.slice(0, inicio);
    const despues = texto.slice(fin);
    const separador = antes && !/\s$/.test(antes) ? " " : "";
    const espacioFinal = despues && /^[\p{L}\d]/u.test(despues) ? " " : "";
    const agregado = `${separador}${CLAUSULA_NEUTRALIDAD}${espacioFinal}`;
    cambiar({ texto: `${antes}${agregado}${despues}` });
    textoTocado.current = true;
    requestAnimationFrame(() => {
      if (!campo) return;
      campo.focus();
      campo.setSelectionRange(inicio + agregado.length, inicio + agregado.length);
    });
  };

  const guardar = async (publicar) => {
    setError("");
    setGuardando(publicar ? "publicar" : "borrador");
    try {
      await onGuardar({ ...fila, publicado: publicar });
    } catch (err) {
      setError(err.message);
      setGuardando("");
    }
  };

  const volver = () => (sinCambios ? onCancelar() : setConfirmarSalida(true));
  const Campos = camposPorTipo[tipo];
  const editando = Boolean(filaInicial?.id);
  const yaPublicado = editando && inicial.publicado;

  return (
    <div className="adm-estudio">
      <header className="adm-estudio-cabecera">
        <button type="button" className="adm-btn adm-btn--fantasma" onClick={volver}>
          <ArrowLeft size={20} aria-hidden="true" />
          Volver a {config.corta}
        </button>
        <div className="adm-estudio-titulo">
          <h2>{editando ? `Editar ${config.singular}` : config.nueva}</h2>
          <span className={`adm-chip ${yaPublicado ? "adm-chip--publicado" : "adm-chip--borrador"}`}>
            {yaPublicado ? "Publicado" : "Borrador"}
          </span>
        </div>
      </header>

      <div className="adm-estudio-cuerpo">
        <form className="adm-estudio-form" onSubmit={(e) => e.preventDefault()} noValidate>
          <Campos
            fila={fila}
            cambiar={cambiar}
            subirImagen={subirImagen}
            insertarClausula={insertarClausula}
            refTexto={refTexto}
            alEnfocarTexto={() => {
              textoTocado.current = true;
            }}
            clausulaIncluida={clausulaIncluida}
          />

          <Semaforo color={color} hallazgos={hallazgos} faltan={faltan} onInsertarClausula={insertarClausula} />

          {error && (
            <p className="adm-error" role="alert">
              {error}
            </p>
          )}

          <div className="adm-estudio-acciones">
            <button type="button" className="adm-btn adm-btn--secundario" onClick={() => guardar(false)} disabled={Boolean(guardando)}>
              {guardando === "borrador" ? <span className="adm-girar" aria-hidden="true" /> : <Save size={18} aria-hidden="true" />}
              {yaPublicado ? "Guardar y pausar" : "Guardar borrador"}
            </button>
            <button
              type="button"
              className="adm-btn adm-btn--primario"
              onClick={() => guardar(true)}
              disabled={Boolean(guardando) || !puedePublicar}
              aria-describedby={!puedePublicar ? "adm-semaforo-titulo" : undefined}
            >
              {guardando === "publicar" ? <span className="adm-girar" aria-hidden="true" /> : <Send size={18} aria-hidden="true" />}
              {yaPublicado ? "Guardar cambios" : "Publicar"}
            </button>
          </div>
        </form>

        <div className="adm-estudio-previa">
          <VistaPrevia tipo={tipo} fila={fila} />
        </div>
      </div>

      <Confirmar
        abierto={confirmarSalida}
        titulo="¿Salir sin guardar?"
        texto="Los cambios que hiciste en esta publicación se perderán."
        textoConfirmar="Salir sin guardar"
        peligro
        onConfirmar={onCancelar}
        onCancelar={() => setConfirmarSalida(false)}
      />
    </div>
  );
}
