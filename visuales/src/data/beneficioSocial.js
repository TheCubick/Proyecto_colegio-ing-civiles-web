/*
  BENEFICIO A LA SOCIEDAD (F2-MF1 / F2-JM1).

  REGLA: aquí solo va, LETRA POR LETRA, lo que mande el Colegio. Nada redactado ni pasado por IA.

  Contenido actual: artículo 9° de los Estatutos, «Objetivos del Colegio ante la sociedad»
  (data/estatutos.js), entregado por el Colegio el 13-nov-2026. Con contenido, la página
  /conocenos/beneficio-social aparece sola (menú, Footer y migas); vacía, no existe (plan B).

  Campos: los mismos que data/servicioSocial.js (ver components/templates/PaginaInformativa).
*/
import { estatutos, FUENTE_ESTATUTOS } from "./estatutos";

export const beneficioSocial = {
  titulo: "Beneficio a la Sociedad",
  secciones: [estatutos.art9],
  tituloLista: "Acciones",
  parrafos: [],
  requisitos: [],
  pdf: "",
  fuente: `${FUENTE_ESTATUTOS}, artículo 9°.`,
};

export const hayBeneficioSocial =
  beneficioSocial.secciones.length > 0 || beneficioSocial.parrafos.length > 0 || beneficioSocial.requisitos.length > 0;
