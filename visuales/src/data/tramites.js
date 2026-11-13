/*
  TEXTOS DE LAS PÁGINAS DE TRÁMITES: DRO, RT y Dictaminador de Riesgos.
  Las tres páginas usan el mismo diseño: components/templates/PaginaTramite.
  Aquí solo va el contenido de cada una.

  Campos:
  - sigla:          se usa en «¿Qué funciones realiza un ___?».
  - galeria:        nombre de la galería de data/galerias.js que rota en el carrusel de la página.
  - titulo, intro:  encabezado de la página.
  - icono:          ícono de la etiqueta «Trámites».
  - video:          (opcional) video de fondo del encabezado. Sin video, el encabezado es claro.
  - queEs:          bloque de texto + imagen bajo el encabezado.
  - info:           bloques ampliados (funciones, normativa, contratación) de data/tramitesInfo.js.
  - pdfRequisitos:  (opcional) PDF de la lista de documentos. Si no hay, no se muestra el botón.
*/
import { BadgeCheck, HardHat, ShieldAlert } from "lucide-react";
import { infoDictaminador, infoDro, infoRt } from "./tramitesInfo";

export const tramites = {
  dro: {
    sigla: "DRO",
    galeria: "dro",
    titulo: "Director Responsable de Obra (DRO)",
    intro:
      "Registro y respaldo gremial para los ingenieros civiles que ejercen como Directores Responsables de Obra ante el municipio.",
    icono: HardHat,
    video: "/videos/vista-aerea.mp4",
    queEs: {
      titulo: "¿Qué es un DRO?",
      texto:
        "El Director Responsable de Obra (DRO) es el profesional acreditado y con registro vigente ante el municipio que asume la responsabilidad técnica y legal de verificar que una construcción cumpla con los reglamentos, normas de seguridad y el proyecto autorizado.",
      imagen: "/img/paginas/tramites/dro.jpg",
      alt: "Director Responsable de Obra supervisando una construcción",
    },
    info: infoDro,
  },

  rt: {
    sigla: "RT",
    galeria: "rt",
    titulo: "Representante Técnico (RT)",
    intro:
      "Gestión y respaldo del Colegio para que sus agremiados obtengan y mantengan sus claves de especialidad como Representantes Técnicos de empresas constructoras.",
    icono: BadgeCheck,
    video: "/videos/puente-colores.mp4",
    queEs: {
      titulo: "¿Qué es un Representante Técnico?",
      texto:
        "Los Representantes Técnicos de Empresas Constructoras son ingenieros autorizados ante la Secretaría de la Honestidad y Buen Gobierno. Cuentan con claves de especialidad que acreditan su experiencia en distintas áreas de la construcción. El Colegio gestiona y respalda a sus agremiados para la obtención y mantenimiento de estas claves.",
      imagen: "/img/paginas/tramites/rt.jpg",
      alt: "Representante Técnico revisando planos de una obra",
    },
    info: infoRt,
  },

  dictaminador: {
    sigla: "Dictaminador",
    galeria: "dictaminador",
    titulo: "Dictaminador de Riesgos",
    intro:
      "Formación y registro de profesionales que evalúan y dictaminan los riesgos de obras e instalaciones, tanto en proyectos nuevos como en situaciones de emergencia.",
    icono: ShieldAlert,
    queEs: {
      titulo: "¿Qué hace un Dictaminador de Riesgos?",
      texto:
        "Los dictaminadores de riesgos son profesionales capacitados mediante diplomado especializado. Su función es evaluar y dictaminar los posibles riesgos de una obra o instalación, consultando el Atlas de Riesgos y otros instrumentos técnicos. Estos dictámenes son solicitados por municipios y por la Secretaría de Obras Públicas tanto para obras nuevas como en situaciones de emergencia.",
      imagen: "/img/paginas/tramites/dictaminador.jpg",
      alt: "Dictaminador evaluando los riesgos de una estructura",
    },
    info: infoDictaminador,
  },
};
