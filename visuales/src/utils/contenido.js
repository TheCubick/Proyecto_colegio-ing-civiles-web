/*
  CONTENIDO EDITABLE DESDE EL PANEL (/admin): noticias del muro, cursos y asambleas.

  - Las filas de la base (Supabase, docs/panel-admin/esquema.sql) usan nombres como
    `imagen_url` o `fecha_texto`; las tarjetas del sitio usan `img` o `fecha`.
    `aSitio` convierte una fila en los datos de la tarjeta y `desdeSitio` hace lo contrario
    (para cargar en el modo local lo que hoy está en src/data/*.js).
  - `respaldo`: lo que se muestra si la base no está configurada o no responde.
  - El «estudio local» guarda en este navegador lo que se hace en el panel cuando no hay
    Supabase (modo vista previa). Solo vive en el navegador de quien lo usa.
*/
import { cursos, noticias } from "../data/cursos";
import asambleas from "../data/asambleas";
import { fechaISO, hoyISO } from "./fechas";

export const TIPOS_CONTENIDO = ["noticias", "cursos", "asambleas"];

// Orden de lectura (sintaxis de la API REST de Supabase)
export const ORDEN = {
  noticias: "fecha_publicacion.desc.nullslast,creado_en.desc",
  cursos: "creado_en.desc",
  asambleas: "fecha.desc.nullslast,creado_en.desc",
};

export const respaldo = { noticias, cursos, asambleas };

// Las imágenes de /img/posts/ pasaron de .png a .webp (optimización del 2026-11-25) y los PNG ya no
// existen. Las filas que se importaron antes a Supabase siguen guardando «/img/posts/N.png»: aquí se
// traducen al archivo vigente para que la tarjeta no salga con la imagen rota. Otras rutas no se tocan.
const imagenVigente = (ruta) => (ruta || "").replace(/^(\/img\/posts\/\d+)\.png$/, "$1.webp");

export const aSitio = {
  // Si una noticia no tiene fecha de publicación, se muestra el día en que se subió al panel.
  noticias: (fila) => ({
    id: fila.id,
    img: imagenVigente(fila.imagen_url),
    titulo: fila.titulo,
    texto: fila.texto,
    fecha: fila.fecha_publicacion || fechaISO(fila.creado_en),
  }),
  cursos: (fila) => ({
    id: fila.id,
    img: imagenVigente(fila.imagen_url),
    titulo: fila.titulo,
    fecha: fila.fecha_texto,
    horario: fila.horario,
    modalidad: fila.modalidad || "Presencial",
    descripcion: fila.descripcion,
    temario: fila.temario_url || "",
  }),
  asambleas: (fila) => ({
    id: fila.id,
    tipo: fila.tipo,
    fecha: fila.fecha,
    lugar: fila.lugar,
    titulo: fila.titulo,
    resumen: fila.resumen ?? [],
    acuerdos: fila.acuerdos ?? [],
    fotos: fila.fotos ?? [],
  }),
};

export const desdeSitio = {
  noticias: (n, i) => ({
    titulo: n.titulo,
    texto: n.texto,
    imagen_url: n.img,
    // Las noticias de src/data no traen fecha: se les pone la del día en que se importan.
    fecha_publicacion: n.fecha || hoyISO(),
    publicado: true,
    orden: i,
  }),
  cursos: (c) => ({
    titulo: c.titulo,
    fecha_texto: c.fecha ?? "",
    horario: c.horario ?? "",
    modalidad: "Presencial",
    descripcion: c.descripcion ?? "",
    imagen_url: c.img ?? "",
    temario_url: c.temario ?? "",
    publicado: true,
  }),
  asambleas: (a) => ({
    tipo: a.tipo,
    fecha: a.fecha,
    lugar: a.lugar ?? "",
    titulo: a.titulo,
    resumen: a.resumen ?? [],
    acuerdos: a.acuerdos ?? [],
    fotos: a.fotos ?? [],
    publicado: true,
  }),
};

/* ===================== ESTUDIO LOCAL (modo vista previa) ===================== */
const CLAVE_ESTUDIO = "cictgz-estudio-local-v1";

export const nuevoId = () =>
  globalThis.crypto?.randomUUID?.() ?? `local-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export function leerEstudioLocal() {
  try {
    const guardado = JSON.parse(window.localStorage.getItem(CLAVE_ESTUDIO));
    if (guardado && TIPOS_CONTENIDO.every((tipo) => Array.isArray(guardado[tipo]))) return guardado;
  } catch {
    /* sin almacenamiento o dato dañado */
  }
  return null;
}

// Lanza un error si el navegador no tiene espacio (las fotos ocupan mucho en este modo).
export function guardarEstudioLocal(estudio) {
  try {
    window.localStorage.setItem(CLAVE_ESTUDIO, JSON.stringify(estudio));
  } catch {
    throw new Error(
      "El navegador ya no tiene espacio para la vista previa local. Elimina publicaciones de prueba o usa fotos más ligeras.",
    );
  }
}

// Estudio inicial: lo que hoy está publicado en src/data/*.js
export function estudioInicial() {
  const sello = Date.now();
  return Object.fromEntries(
    TIPOS_CONTENIDO.map((tipo) => [
      tipo,
      respaldo[tipo].map((item, i) => {
        const { orden = i, ...fila } = desdeSitio[tipo](item, i);
        return { ...fila, id: nuevoId(), creado_en: new Date(sello - orden * 60_000).toISOString() };
      }),
    ]),
  );
}

export function reiniciarEstudioLocal() {
  const estudio = estudioInicial();
  guardarEstudioLocal(estudio);
  return estudio;
}

export const marcaDeTiempo = () => new Date().toISOString();
