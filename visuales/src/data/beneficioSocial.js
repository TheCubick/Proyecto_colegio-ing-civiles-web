/*
  BENEFICIO A LA SOCIEDAD (F2-MF1 / F2-JM1).

  REGLA: aquí solo va, LETRA POR LETRA, lo que mande el Colegio. Nada redactado ni pasado por IA.

  Contenido actual: artículo 9° de los Estatutos, «Objetivos del Colegio ante la sociedad»
  (data/estatutos.js), entregado por el Colegio el 13-nov-2026. Con contenido, la página
  /conocenos/beneficio-social aparece sola (menú, Footer y migas); vacía, no existe (plan B).

  Diseño «objetivos»: cada inciso del artículo (9.1 … 9.8) es una tarjeta con su número y
  un ícono. `iconos` solo elige el dibujo de cada tarjeta (por número de inciso); el texto
  sale tal cual del artículo.

  Campos: ver components/templates/PaginaInformativa.
*/
import { BookOpen, Building2, Gavel, HandHeart, HeartHandshake, Leaf, Scale, Users } from "lucide-react";
import { estatutos, FUENTE_ESTATUTOS } from "./estatutos";

export const beneficioSocial = {
  titulo: "Beneficio a la Sociedad",
  diseno: "objetivos",
  subtitulo: `${estatutos.art9.titulo} · ${estatutos.art9.articulo} de los Estatutos.`,
  articulo: estatutos.art9,
  iconos: {
    "9.1": HeartHandshake, // conciencia de servicio a la sociedad
    "9.2": Users, //          colaboración de los miembros
    "9.3": Building2, //      colaboración con el poder público
    "9.4": Scale, //          ética profesional
    "9.5": HandHeart, //      servicio social
    "9.6": Leaf, //           medio ambiente
    "9.7": Gavel, //          arbitraje
    "9.8": BookOpen, //       cultura y valores nacionales
  },
  secciones: [estatutos.art9],
  tituloLista: "Acciones",
  parrafos: [],
  requisitos: [],
  pdf: "",
  fuente: `${FUENTE_ESTATUTOS}, artículo 9°.`,
};

export const hayBeneficioSocial =
  beneficioSocial.secciones.length > 0 || beneficioSocial.parrafos.length > 0 || beneficioSocial.requisitos.length > 0;
