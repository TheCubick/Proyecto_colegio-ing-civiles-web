/*
  BENEFICIO A LA SOCIEDAD (F2-MF1 / F2-JM1).

  REGLA: aquí solo se copia, LETRA POR LETRA, lo que mande el Colegio. Nada redactado ni pasado por IA.
  Cada PR que cambie este archivo lleva la captura de la fuente.

  Plan B: si el Colegio no manda nada, la página NO existe. Mientras `parrafos` y `requisitos`
  estén vacíos, /conocenos/beneficio-social no se crea ni sale en el menú.
  En cuanto se pegue al menos un párrafo, la página aparece sola (menú, Footer y migas).

  Campos (los mismos que data/servicioSocial.js; llena solo los que el Colegio haya mandado):
  - parrafos:   ["Párrafo 1 tal cual."]
  - requisitos: [] (lista opcional, por ejemplo acciones o programas, tal cual)
  - pdf:        "/documentos/beneficio-social.pdf" (solo si mandaron PDF)
*/
export const beneficioSocial = {
  titulo: "Beneficio a la Sociedad",
  tituloLista: "Acciones",
  parrafos: [],
  requisitos: [],
  pdf: "",
};

export const hayBeneficioSocial = beneficioSocial.parrafos.length > 0 || beneficioSocial.requisitos.length > 0;
