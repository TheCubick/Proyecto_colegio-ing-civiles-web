/*
  REPOSITORIO DEL PANEL: misma interfaz para los dos modos.
  - Supabase (si hay .env): tablas noticias/cursos/asambleas y bucket «multimedia».
  - Vista previa local (sin .env): todo se guarda en este navegador (localStorage);
    las fotos se guardan comprimidas como texto «data:». Nada sale a internet.
*/
import { db, subirArchivo, supabaseConfigurado } from "../../utils/supabaseClient";
import {
  desdeSitio,
  guardarEstudioLocal,
  leerEstudioLocal,
  marcaDeTiempo,
  nuevoId,
  ORDEN,
  reiniciarEstudioLocal,
  respaldo,
  TIPOS_CONTENIDO,
} from "../../utils/contenido";
import { filaParaGuardar } from "./tipos";
import { aDataUrl } from "./comprimirImagen";

const PDF_MAXIMO = 5 * 1024 * 1024;
const PDF_MAXIMO_LOCAL = 1.5 * 1024 * 1024;

// Nombre de archivo seguro para Storage: sin espacios, acentos ni «ñ».
const nombreSeguro = (nombre) =>
  nombre
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita acentos
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-+|-+$/g, "");

// `orden` solo sirve para ordenar el modo local; no es una columna de la base.
const sinOrden = (fila) => {
  const copia = { ...fila };
  delete copia.orden;
  return copia;
};

/* ---------- Modo vista previa local ---------- */
const estudio = () => leerEstudioLocal() ?? reiniciarEstudioLocal();

// En la vista previa solo existe la persona que entró en este navegador
const ID_LOCAL = "vista-previa-local";

const repositorioLocal = {
  modo: "local",
  async cargarTodo() {
    return estudio();
  },
  async guardar(tipo, fila) {
    const datos = estudio();
    const limpia = filaParaGuardar(tipo, fila);
    let guardada;
    if (fila.id) {
      datos[tipo] = datos[tipo].map((f) => (f.id === fila.id ? (guardada = { ...f, ...limpia }) : f));
    } else {
      guardada = { ...limpia, id: nuevoId(), creado_en: marcaDeTiempo(), creado_por: ID_LOCAL };
      datos[tipo] = [guardada, ...datos[tipo]];
    }
    guardarEstudioLocal(datos);
    return guardada;
  },
  async publicar(tipo, id, publicado) {
    const datos = estudio();
    let guardada;
    datos[tipo] = datos[tipo].map((f) => (f.id === id ? (guardada = { ...f, publicado }) : f));
    guardarEstudioLocal(datos);
    return guardada;
  },
  async eliminar(tipo, id) {
    const datos = estudio();
    datos[tipo] = datos[tipo].filter((f) => f.id !== id);
    guardarEstudioLocal(datos);
  },
  async subirImagen(archivo) {
    return aDataUrl(archivo);
  },
  async subirPdf(archivo) {
    if (archivo.size > PDF_MAXIMO_LOCAL) {
      throw new Error("En la vista previa local el PDF debe pesar menos de 1.5 MB (con Supabase se aceptan hasta 5 MB).");
    }
    return aDataUrl(archivo);
  },
  async reiniciar() {
    return reiniciarEstudioLocal();
  },
  async perfiles(sesion) {
    return [{ id: ID_LOCAL, nombre: sesion?.perfil?.nombre || "Vista previa", rol: sesion?.perfil?.rol || "editor", local: true }];
  },
  idDeSesion: () => ID_LOCAL,
};

/* ---------- Modo Supabase ---------- */
const repositorioSupabase = {
  modo: "supabase",
  async cargarTodo() {
    const listas = await Promise.all(TIPOS_CONTENIDO.map((tipo) => db.todos(tipo, ORDEN[tipo])));
    return Object.fromEntries(TIPOS_CONTENIDO.map((tipo, i) => [tipo, listas[i]]));
  },
  async guardar(tipo, fila) {
    const limpia = filaParaGuardar(tipo, fila);
    return fila.id ? db.actualizar(tipo, fila.id, limpia) : db.insertar(tipo, limpia);
  },
  async publicar(tipo, id, publicado) {
    return db.actualizar(tipo, id, { publicado });
  },
  async eliminar(tipo, id) {
    return db.eliminar(tipo, id);
  },
  async perfiles() {
    return db.perfiles();
  },
  idDeSesion: (sesion) => sesion?.usuario?.id,
  async subirImagen(archivo, carpeta) {
    return subirArchivo(`${carpeta}/${Date.now()}-${nombreSeguro(archivo.name)}`, archivo);
  },
  async subirPdf(archivo) {
    if (archivo.size > PDF_MAXIMO) throw new Error("El PDF debe pesar menos de 5 MB.");
    return subirArchivo(`temarios/${Date.now()}-${nombreSeguro(archivo.name)}`, archivo);
  },
  // Copia a la base lo que hoy está en src/data (solo en tablas vacías), ya publicado.
  async importarContenidoActual(tablasVacias) {
    let total = 0;
    for (const tipo of tablasVacias) {
      const filas = respaldo[tipo].map((item, i) => sinOrden(desdeSitio[tipo](item, i)));
      for (const fila of [...filas].reverse()) {
        await db.insertar(tipo, fila);
        total += 1;
      }
    }
    return total;
  },
};

export const repositorio = supabaseConfigurado ? repositorioSupabase : repositorioLocal;
