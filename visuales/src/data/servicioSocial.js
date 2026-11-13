/*
  SERVICIO SOCIAL GRATUITO (F2-MF1 / F2-JM1).

  REGLA: aquí solo se copia, LETRA POR LETRA, lo que mande el Colegio. Nada redactado ni pasado por IA.
  Cada PR que cambie este archivo lleva la captura de la fuente.

  Mientras `parrafos` y `requisitos` estén vacíos:
    - NO existe la página /conocenos/servicio-social (no sale en el menú ni en el Footer);
    - Misión y Visión muestra el aviso breve de `aviso` (plan B, dato confirmado en la entrevista).
  En cuanto se pegue al menos un párrafo o requisito, la página aparece sola.

  Campos (llena solo los que el Colegio haya mandado; no rellenes los demás):
  - parrafos:   ["Párrafo 1 tal cual.", "Párrafo 2 tal cual."]
  - requisitos: ["Requisito 1 tal cual."]
  - pdf:        "/documentos/servicio-social.pdf" (solo si mandaron PDF; va en public/documentos/)
*/
export const servicioSocial = {
  titulo: "Servicio Social",
  tituloLista: "Requisitos",
  parrafos: [],
  requisitos: [],
  pdf: "",

  // Plan B (docs/Plan_Fases_Equipo.md): único dato confirmado en la entrevista.
  aviso: {
    titulo: "Servicio social gratuito",
    texto:
      "El Colegio ofrece servicio social de manera gratuita. Informes únicamente en nuestras oficinas o por los teléfonos oficiales.",
  },
};

export const hayServicioSocial = servicioSocial.parrafos.length > 0 || servicioSocial.requisitos.length > 0;
