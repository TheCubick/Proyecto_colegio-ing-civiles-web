/*
  Listado de asambleas que se muestran en /eventos/asambleas.

  Para agregar una asamblea, copia un objeto y llena sus campos:
  - id:       identificador único, sin espacios (se usa como ancla: /eventos/asambleas#id)
  - tipo:     "Ordinaria" o "Extraordinaria"
  - fecha:    formato "AAAA-MM-DD"
  - lugar:    sede de la sesión
  - titulo:   nombre de la asamblea
  - resumen:  arreglo de párrafos
  - acuerdos: (opcional) lista de acuerdos tomados
  - fotos:    lista de { src, alt }. Guarda las imágenes en public/asambleas/<id>/
              y escribe la ruta empezando con "/asambleas/...".

  Se ordenan automáticamente de la más reciente a la más antigua.
  Los dos registros siguientes son DE EJEMPLO: reemplázalos con información real.
*/
const asambleas = [
  {
    id: "ejemplo-asamblea-ordinaria",
    tipo: "Ordinaria",
    fecha: "2026-03-14",
    lugar: "Sede del Colegio, Tuxtla Gutiérrez",
    titulo: "Asamblea General Ordinaria (ejemplo)",
    resumen: [
      "Texto de ejemplo: describe aquí los temas tratados en la sesión, quién la presidió y el número de agremiados presentes.",
      "Puedes agregar tantos párrafos como necesites.",
    ],
    acuerdos: [
      "Acuerdo de ejemplo número uno.",
      "Acuerdo de ejemplo número dos.",
    ],
    fotos: [
      { src: "/asambleas/ejemplo-asamblea-ordinaria/1.jpg", alt: "Mesa directiva durante la asamblea" },
      { src: "/asambleas/ejemplo-asamblea-ordinaria/2.jpg", alt: "Agremiados en la sesión" },
      { src: "/asambleas/ejemplo-asamblea-ordinaria/3.jpg", alt: "Votación de acuerdos" },
    ],
  },
  {
    id: "ejemplo-asamblea-extraordinaria",
    tipo: "Extraordinaria",
    fecha: "2025-11-22",
    lugar: "Sede del Colegio, Tuxtla Gutiérrez",
    titulo: "Asamblea Extraordinaria (ejemplo)",
    resumen: [
      "Texto de ejemplo: explica el motivo de la convocatoria extraordinaria y las decisiones principales.",
    ],
    fotos: [
      { src: "/asambleas/ejemplo-asamblea-extraordinaria/1.jpg", alt: "Asistentes a la asamblea extraordinaria" },
    ],
  },
];

export default asambleas;
