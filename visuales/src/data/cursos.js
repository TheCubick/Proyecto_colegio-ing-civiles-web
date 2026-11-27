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
    id: 9,
    img: "",
    fecha: "2026-04-29",
    titulo: "Relevo en la Presidencia de la Comisión de RTEC",
    texto: "A partir del 29 de abril de 2026, el cargo de Presidente de la Comisión de Representantes Técnicos de Empresas Constructoras (RTEC) es asumido por el Ing. Nein Montero Molina. Con ello el Colegio da continuidad a los trabajos y a las solicitudes pendientes, y gestiona capacitación externa ante instancias de anticorrupción (SABG). Se reitera el compromiso de regularizar los procesos a la brevedad posible.",
  },
  {
    id: 10,
    img: "/img/posts/10.webp",
    titulo: "Reunión de trabajo con la Comisión Estatal de Caminos",
    texto: "Reunión de trabajo con la nueva titular de la Comisión Estatal de Caminos, Ing. Alejandra Gómez Mendoza.",
  },
  {
    id: 11,
    img: "/img/posts/11.webp",
    titulo: "60 aniversario de la Facultad de Ingeniería de la UNACH",
    texto: "Integrantes del CICTGZ asistieron a la celebración del 60 aniversario de la Facultad de Ingeniería de la Universidad Autónoma de Chiapas.",
  },
  {
    id: 12,
    img: "/img/posts/12.webp",
    titulo: "Primera Asamblea General Ordinaria 2026",
    texto: "Agremiados del CICTGZ durante la Primera Asamblea General Ordinaria 2026 del VI Consejo Directivo.",
  },
  {
    id: 13,
    img: "/img/posts/13.webp",
    titulo: "Convivencia deportiva",
    texto: "Convivencia y torneo deportivo del CICTGZ.",
  },
  {
    id: 14,
    img: "/img/posts/14.webp",
    titulo: "Sala de juntas del Colegio",
    texto: "Reunión en la sala de juntas de las oficinas del CICTGZ.",
  },
  {
    id: 1,
    img: "/img/posts/1.webp",
    titulo: "Avance de las nuevas instalaciones",
    texto: "El Ing. Adrián Hernández Hernández encabezó la revisión formal de la primera etapa de construcción de las instalaciones del CICTGZ, verificando el diseño de fachada y los espacios para actividades gremiales.",
  },
  {
    id: 2,
    img: "/img/posts/2.webp",
    titulo: "Unidad Gremial e Infraestructura",
    texto: "Participación en la Intercolegial de Colegios de Profesionistas de Chiapas. Destacó la entrega formal de una terna de mujeres profesionistas al gobernador Eduardo Ramírez para la titularidad del INIFECH.",
  },
  {
    id: 3,
    img: "/img/posts/3.webp",
    titulo: "Respaldo al Mtro. Jhovani Salazar",
    texto: "El Consejo Directivo acudió a Palacio de Gobierno para respaldar al Mtro. Jhovani Salazar Ruiz tras su renuncia, reconociendo su labor como puente entre el sector profesional y la ciudadanía.",
  },
  {
    id: 4,
    img: "/img/posts/4.webp",
    titulo: "XV aniversario de MORENA",
    texto: "Representantes del VI Consejo Directivo, como Asociación Civil sin filiación partidista, asistieron al XV aniversario de MORENA en Tuxtla Gutiérrez, respondiendo al diálogo institucional y al papel clave de la ingeniería civil en el desarrollo del estado.",
  },
  {
    id: 5,
    img: "/img/posts/5.webp",
    titulo: "Infraestructura Hídrica",
    texto: "Participación en el Primer Ciclo de Conferencias Técnicas en Materia Hídrica en Oaxaca. El CICTGZ refrendó la importancia de la cooperación para impulsar obras hídricas eficientes.",
  },
  {
    id: 6,
    img: "/img/posts/6.webp",
    titulo: "Programa de Desinfección del Agua 2026",
    texto: "El presidente del CICTGZ, Ing. Adrián Hernández, acompañó al gobernador en el arranque del Programa de Desinfección del Agua 2026, reafirmando su agenda técnica con dependencias estatales.",
  },
  {
    id: 7,
    img: "/img/posts/7.webp",
    titulo: "Desayuno Intercolegial",
    texto: "Encuentro con presidentes de 14 colegios de profesionistas para analizar temas prioritarios. El CICTGZ dio a conocer la propuesta para la titularidad del INIFECH, impulsando la certeza técnica.",
  },
  {
    id: 8,
    img: "/img/posts/8.webp",
    titulo: "Propuesta de sitio web por estudiantes",
    texto: "Estudiantes de Informática de la Universidad Salazar presentaron una propuesta de sitio web para el CICTGZ. Una herramienta para difundir de manera ágil publicaciones y convocatorias.",
  },
];
