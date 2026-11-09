/*
  CONTENIDO DE LA PÁGINA DE INICIO (/).
  - tarjetas:            las 4 tarjetas rojas bajo el video (FeatureCards).
  - banners:             fotos del carrusel «Actividades del Colegio» (BannerCarrusel).
  - preguntasFrecuentes: preguntas de la sección de WhatsApp (AtencionWhatsapp).
  - tiposMensaje:        opciones del buzón de quejas y sugerencias.
  Aquí solo hay textos; el diseño está en components/sections/.
*/
import { BadgeAlert, GraduationCap, Handshake, Users } from "lucide-react";

// [título, descripción, ícono]
export const tarjetas = [
  ["Comunidad y Representación", "Agrupamos a los profesionales de la ingeniería civil para elevar la calidad del ejercicio profesional.", Users],
  ["Convenios Institucionales", "Vinculación directa con gobierno y universidades para facilitar el servicio social y laboral.", Handshake],
  ["Certificación y Trámites", "Gestión y respaldo para Directores Responsables de Obra (DRO) y Representantes Técnicos (RT).", BadgeAlert],
  ["Impulso a Estudiantes", "Cuotas preferenciales para estudiantes de últimos semestres y pasantes en cursos y afiliación.", GraduationCap],
];

// Fotografías reales de eventos del Colegio (public/img/banners/).
export const banners = [
  {
    id: 1,
    tag: "VINCULACIÓN INSTITUCIONAL",
    titulo: "Alianza con la Comisión Estatal de Caminos",
    descripcion:
      "Fortalecemos la cooperación técnica y el desarrollo de infraestructura carretera y de caminos en Chiapas.",
    enlace: "/eventos/cursos-y-capacitacion",
    img: "/img/banners/comision-de-caminos.jpg",
  },
  {
    id: 2,
    tag: "JORNADAS TÉCNICAS",
    titulo: "Foros Académicos y de Actualización",
    descripcion:
      "Participación en conferencias magistrales, vinculación con universidades y excelencia en la ingeniería civil.",
    enlace: "/eventos/cursos-y-capacitacion",
    img: "/img/banners/reunion.jpg",
  },
  {
    id: 3,
    tag: "CONSEJO DIRECTIVO",
    titulo: "Sesiones y Acuerdos de Trabajo Colegiado",
    descripcion: "Compromiso continuo y seguimiento transparente a los proyectos estratégicos de nuestro gremio.",
    enlace: "/eventos/asambleas",
    img: "/img/banners/grupal.jpg",
  },
  {
    id: 4,
    tag: "COMUNIDAD Y DEPORTE",
    titulo: "Encuentros Deportivos y Fraternidad",
    descripcion:
      "Fomentando la integración, la convivencia gremial y el vínculo universitario a través del deporte.",
    enlace: "/eventos/cursos-y-capacitacion",
    img: "/img/banners/partido-futbol-salazar.jpg",
  },
];

export const preguntasFrecuentes = [
  {
    pregunta: "¿Cómo puedo afiliarme si soy recién egresado, pasante o estudiante?",
    respuesta:
      "La inscripción es presencial en las oficinas del Colegio. Existen cuotas especiales para pasantes y estudiantes; consulta requisitos, formatos y costos en el botón “Afíliate” del menú.",
    mensaje: "Hola, me gustaría recibir información sobre cómo inscribirme al Colegio como estudiante/pasante.",
  },
  {
    pregunta: "¿Cómo solicito un Director Responsable de Obra (DRO), Perito o Dictaminador?",
    respuesta:
      "Por seguridad de nuestros socios, todo requerimiento de especialistas se gestiona de manera centralizada a través de las oficinas del Colegio. Escríbenos con los datos de tu obra o trámite.",
    mensaje: "Hola, me gustaría solicitar un especialista (DRO, Perito o Dictaminador) para mi obra o trámite.",
  },
  {
    pregunta: "¿Los cursos de capacitación están abiertos al público general y estudiantes?",
    respuesta:
      "Consulta las convocatorias vigentes en la sección Cursos y Capacitación. Cada curso indica sus requisitos de inscripción; escríbenos si tienes dudas sobre uno en particular.",
    mensaje: "Hola, me gustaría saber si puedo inscribirme a los cursos de capacitación del Colegio.",
  },
  {
    pregunta: "¿Cómo establezco un convenio institucional (Universidad o Dependencia)?",
    respuesta:
      "El Colegio mantiene vinculación con universidades y dependencias de gobierno. Envíanos el nombre de tu institución y el propósito del convenio para darle seguimiento.",
    mensaje: "Hola, represento a una institución y me gustaría establecer un convenio con el Colegio.",
  },
  {
    pregunta: "¿Cómo envío mi comprobante de pago para facturación?",
    respuesta:
      "Envía tu comprobante legible (con nombre y concepto), tu Constancia de Situación Fiscal y el Uso de CFDI a cictgcontabilidad@gmail.com o al WhatsApp 961-285-1837. Solo se facturan pagos del mes en curso.",
    mensaje: "Hola, me gustaría enviar mi comprobante de pago para solicitar factura.",
  },
];

export const tiposMensaje = [
  "Sugerencia para el Colegio",
  "Queja o Reporte Ético",
  "Solicitud de Convenio",
  "Duda sobre Trámites",
];
