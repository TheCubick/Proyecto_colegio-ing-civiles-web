/*
  TIPOS DE PUBLICACIÓN DEL PANEL: noticias del muro, cursos y asambleas.
  `columnas` son exactamente las de docs/panel-admin/esquema.sql (lo que se envía a la base).
  `vacio()` es una publicación nueva; `requeridos` son los campos sin los que no se puede publicar.
*/
import { CalendarDays, GraduationCap, Newspaper } from "lucide-react";

import { fechaCorta, fechaISO, hoyISO as hoy } from "../../utils/fechas";

export { fechaCorta };

export const TIPOS = {
  noticias: {
    id: "noticias",
    etiqueta: "Noticias del Muro",
    corta: "Noticias",
    singular: "noticia",
    nueva: "Nueva noticia",
    icono: Newspaper,
    columnas: ["titulo", "texto", "imagen_url", "fecha_publicacion", "publicado"],
    requeridos: { titulo: "el título", texto: "el cuerpo de la noticia" },
    vacio: () => ({ titulo: "", texto: "", imagen_url: "", fecha_publicacion: hoy(), publicado: false }),
    resumen: (fila) => ({
      imagen: fila.imagen_url,
      // Sin fecha de publicación, el sitio muestra el día en que se subió
      fecha: fechaCorta(fila.fecha_publicacion || fechaISO(fila.creado_en)),
    }),
    textos: (fila) => [fila.titulo, fila.texto],
  },
  cursos: {
    id: "cursos",
    etiqueta: "Cursos y Capacitaciones",
    corta: "Cursos",
    singular: "curso",
    nueva: "Nuevo curso",
    icono: GraduationCap,
    columnas: ["titulo", "fecha_texto", "horario", "modalidad", "descripcion", "imagen_url", "temario_url", "publicado"],
    requeridos: { titulo: "el título del curso", fecha_texto: "la fecha de inicio", horario: "el horario" },
    // Regla del Colegio: los cursos son presenciales (el esquema también lo obliga).
    vacio: () => ({
      titulo: "",
      fecha_texto: "",
      horario: "",
      modalidad: "Presencial",
      descripcion: "",
      imagen_url: "",
      temario_url: "",
      publicado: false,
    }),
    resumen: (fila) => ({ imagen: fila.imagen_url, detalle: fila.fecha_texto || "Sin fecha de inicio" }),
    textos: (fila) => [fila.titulo, fila.fecha_texto, fila.horario, fila.descripcion],
  },
  asambleas: {
    id: "asambleas",
    etiqueta: "Asambleas",
    corta: "Asambleas",
    singular: "asamblea",
    nueva: "Nueva asamblea",
    icono: CalendarDays,
    columnas: ["tipo", "fecha", "lugar", "titulo", "resumen", "acuerdos", "fotos", "publicado"],
    requeridos: { titulo: "el título", fecha: "la fecha" },
    vacio: () => ({
      tipo: "Ordinaria",
      fecha: hoy(),
      lugar: "",
      titulo: "",
      resumen: [""],
      acuerdos: [],
      fotos: [],
      publicado: false,
    }),
    resumen: (fila) => ({
      imagen: fila.fotos?.[0]?.src,
      detalle: fila.tipo,
      fecha: fechaCorta(fila.fecha),
    }),
    textos: (fila) => [fila.titulo, fila.lugar, ...(fila.resumen ?? []), ...(fila.acuerdos ?? []), ...(fila.fotos ?? []).map((f) => f.alt)],
  },
};

export const LISTA_TIPOS = Object.values(TIPOS);

// Solo las columnas del esquema, sin listas con renglones vacíos.
export function filaParaGuardar(tipo, fila) {
  const limpia = {};
  for (const columna of TIPOS[tipo].columnas) {
    let valor = fila[columna];
    if (Array.isArray(valor) && columna !== "fotos") valor = valor.map((v) => v.trim()).filter(Boolean);
    if (typeof valor === "string") valor = valor.trim();
    if (valor === "" && ["fecha", "fecha_publicacion"].includes(columna)) valor = null;
    limpia[columna] = valor ?? null;
  }
  if (tipo === "cursos") limpia.modalidad = "Presencial";
  return limpia;
}

// Lista de campos obligatorios que faltan (para avisar antes de publicar).
export function camposFaltantes(tipo, fila) {
  return Object.entries(TIPOS[tipo].requeridos)
    .filter(([campo]) => !`${fila[campo] ?? ""}`.trim())
    .map(([, nombre]) => nombre);
}
