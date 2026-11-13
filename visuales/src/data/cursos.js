/*
  CONTENIDO DE LA PÁGINA «CURSOS Y CAPACITACIÓN» (/eventos/cursos-y-capacitacion).
  - requisitosInscripcion: lista del pop-up «Inscribirse».
  - cursos:                cursos activos (tarjetas con botón «Inscribirse»).
  - noticias:              publicaciones del muro «Noticias recientes».
  Solo se publica lo que manda el Colegio (ver docs/Plan_Fases_Equipo.md).
*/

export const requisitosInscripcion = [
  "Llenar formato de inscripción impreso.",
  "Identificación Oficial (INE).",
  "Comprobante de pago (Voucher original o impreso).",
];

/*
  Cursos y capacitaciones activas.
  - modalidad: "Presencial", "En línea" o "Mixta"
  - temario:   (opcional) ruta a un PDF en public/, ej. "/documentos/temario-precios.pdf".
               Si no se indica, no se muestra el botón "Ver temario".
  El botón "Inscribirse" abre el modal con el proceso de inscripción y requisitos.
*/
export const cursos = [];

// Publicaciones del muro. Las más nuevas van al inicio del arreglo.
export const noticias = [
  {
    id: 1,
    img: "/img/posts/1.png",
    titulo: "Avance de las nuevas instalaciones",
    texto: "El Ing. Adrián Hernández Hernández encabezó la revisión formal de la primera etapa de construcción de las instalaciones del CICTGZ, verificando el diseño de fachada y los espacios para actividades gremiales.",
  },
  {
    id: 2,
    img: "/img/posts/2.png",
    titulo: "Unidad Gremial e Infraestructura",
    texto: "Participación en la Intercolegial de Colegios de Profesionistas de Chiapas. Destacó la entrega formal de una terna de mujeres profesionistas al gobernador Eduardo Ramírez para la titularidad del INIFECH.",
  },
  {
    id: 3,
    img: "/img/posts/3.png",
    titulo: "Respaldo al Mtro. Jhovani Salazar",
    texto: "El Consejo Directivo acudió a Palacio de Gobierno para respaldar al Mtro. Jhovani Salazar Ruiz tras su renuncia, reconociendo su labor como puente entre el sector profesional y la ciudadanía.",
  },
  {
    id: 4,
    img: "/img/posts/4.png",
    titulo: "XV aniversario de MORENA",
    texto: "Representantes del VI Consejo Directivo, como Asociación Civil sin filiación partidista, asistieron al XV aniversario de MORENA en Tuxtla Gutiérrez, respondiendo al diálogo institucional y al papel clave de la ingeniería civil en el desarrollo del estado.",
  },
  {
    id: 5,
    img: "/img/posts/5.png",
    titulo: "Infraestructura Hídrica",
    texto: "Participación en el Primer Ciclo de Conferencias Técnicas en Materia Hídrica en Oaxaca. El CICTGZ refrendó la importancia de la cooperación para impulsar obras hídricas eficientes.",
  },
  {
    id: 6,
    img: "/img/posts/6.png",
    titulo: "Programa de Desinfección del Agua 2026",
    texto: "El presidente del CICTGZ, Ing. Adrián Hernández, acompañó al gobernador en el arranque del Programa de Desinfección del Agua 2026, reafirmando su agenda técnica con dependencias estatales.",
  },
  {
    id: 7,
    img: "/img/posts/7.png",
    titulo: "Desayuno Intercolegial",
    texto: "Encuentro con presidentes de 14 colegios de profesionistas para analizar temas prioritarios. El CICTGZ dio a conocer la propuesta para la titularidad del INIFECH, impulsando la certeza técnica.",
  },
  {
    id: 8,
    img: "/img/posts/8.png",
    titulo: "Propuesta de sitio web por estudiantes",
    texto: "Estudiantes de Informática de la Universidad Salazar presentaron una propuesta de sitio web para el CICTGZ. Una herramienta para difundir de manera ágil publicaciones y convocatorias.",
  },
];
