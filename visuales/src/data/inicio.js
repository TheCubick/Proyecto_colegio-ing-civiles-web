/*
  CONTENIDO DE LA PÁGINA DE INICIO (/).
  - tarjetas:            las 4 tarjetas rojas bajo el video (FeatureCards).
  - banners:             fotos del carrusel «Actividades del Colegio» (BannerCarrusel).
  - preguntasFrecuentes: preguntas de la sección de WhatsApp (AtencionWhatsapp).
  - tiposMensaje:        opciones del buzón de quejas y sugerencias.
  - extractosCatalogo:   texto de cada tarjeta de «Trámites y Servicios» (sale de la propia página).
  - datosColegio:        franja de 4 datos oficiales (fuentes en CLAUDE.md › «Fuentes de verdad»).
  - insigniasConocenos:  distintivo de algunas tarjetas de «Conoce el Colegio».
  Aquí solo hay textos; el diseño está en components/sections/.
  Títulos, rutas e íconos de las tarjetas de la portada salen de src/config/rutas.js.
*/
import { BadgeAlert, GraduationCap, Handshake, Users } from "lucide-react";
import { tramites } from "./tramites";
import { servicios } from "./servicios";
import { contacto } from "./contacto";

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

/*
  Extractos del catálogo «Trámites y Servicios» de la portada: es la introducción de cada página
  (src/data/tramites.js y servicios.js). Si una página no tiene, se usa la `descripcion` de rutas.js.
*/
export const extractosCatalogo = {
  "/tramites/dro": tramites.dro.intro,
  "/tramites/rt": tramites.rt.intro,
  "/tramites/dictaminador-de-riesgos": tramites.dictaminador.intro,
  "/servicios/peritos-valuadores": servicios.peritos.intro,
  "/servicios/calculo-estructural": servicios.calculo.intro,
};

/*
  Franja de datos oficiales. Solo datos verificados (CLAUDE.md › «Fuentes de verdad» y
  src/data/misionVision.js): padrón mayor a 100 colegiados (registro SEP), 4 cursos / 30 h al año,
  delegaciones de src/data/contacto.js y trámites 100 % presenciales.
  - numero: se anima contando desde 0 · prefijo / sufijo: texto alrededor del número.
*/
export const datosColegio = [
  { numero: 100, prefijo: "+", sufijo: "", etiqueta: "Colegiados activos", detalle: "Registro vigente ante la SEP" },
  { numero: 4, prefijo: "", sufijo: " / 30 h", etiqueta: "Cursos al año", detalle: "Capacitación técnica anual por agremiado" },
  {
    numero: contacto.delegaciones.length,
    prefijo: "",
    sufijo: "",
    etiqueta: "Delegaciones",
    detalle: contacto.delegaciones.map(({ ciudad }) => ciudad).join(", "),
  },
  { numero: 100, prefijo: "", sufijo: "%", etiqueta: "Presencial", detalle: "Trámites y pagos en las oficinas del Colegio" },
];

// Distintivos de «Conoce el Colegio» (servicio social gratuito: regla del Colegio; estatutos: Notaría 112)
export const insigniasConocenos = {
  "/conocenos/servicio-social": "100% Gratuito",
  "/conocenos/estatutos": "Notaría 112",
};
