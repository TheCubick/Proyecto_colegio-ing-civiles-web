// Requisitos de ingreso. Fuente: tríptico oficial del Colegio (triptico-enfrente.jpg).
export const requisitosGenerales = [
  "Solicitud dirigida al presidente del Colegio (con el aval de 2 Miembros Numerarios, Art. 23)",
  "Cédula profesional expedida por la S.E.P.",
  "Currículum vitae",
  "Constancia de situación fiscal (RFC)",
  "Comprobante de domicilio actualizado",
  "Acta de nacimiento",
  "INE",
  "CURP",
  "Pago de inscripción",
  "En caso de haber pertenecido a otro Colegio, carta de no adeudo y renuncia",
];

export const notaCartas = {
  propias: "Carta propia: 3 años de antigüedad de cédula profesional y 2 años de colegiado, más 30 horas de cursos de actualización (Art. 55° de los Estatutos).",
  ajenas: "Carta ajena: 5 años de antigüedad de cédula profesional y 3 años de colegiado, más 30 horas de cursos de actualización (Art. 55° de los Estatutos).",
};

/*
  CARTA DE REPRESENTANTE TÉCNICO (RTEC): documentos oficiales que envió el Colegio (noviembre 2026).
  Texto copiado de sus formatos (lista de requisitos y Anexos A y B del Contrato RTEC-Empresa);
  solo se corrigieron faltas de ortografía evidentes y las mayúsculas, para que se lea mejor.
  Los PDF de public/documentos/rtec/ son los mismos formatos en blanco: sin ningún dato de agremiados
  ni de empresas (todo va entre [corchetes]). Los trámites son 100 % presenciales.
*/

// Lista oficial «Requisitos para carta de RTEC» (13 puntos; el 7 trae sus 7 documentos).
// soloAjena: el punto aplica únicamente a la carta ajena. formato: PDF en blanco del documento.
export const checklistRtec = [
  {
    texto: "Oficio de solicitud de carta dirigido al Presidente del Colegio, en hoja membretada.",
    formato: "/documentos/rtec/anexo-a-solicitud-de-carta.pdf",
  },
  {
    texto: "Oficio donde se manifiesta que la documentación entregada es fidedigna, en hoja membretada.",
    formato: "/documentos/rtec/anexo-b-documentacion-fidedigna.pdf",
  },
  {
    texto: "Oficio de declaración bajo protesta de decir verdad, que conoce las leyes y reglamentos a los que se sujetará como Representante Técnico, en hoja membretada.",
    formato: "/documentos/rtec/anexo-c-bajo-protesta-leyes-y-reglamentos.pdf",
  },
  {
    texto: "Fichas de depósitos de inscripción o reinscripción y adeudos en original, plasmando su nombre y No. de RTEC.",
  },
  {
    texto: "Fecha de expedición de cédula profesional (legible).",
  },
  {
    texto: "Cédula de datos generales de la empresa o persona física.",
    formato: "/documentos/rtec/cedula-de-datos-generales.pdf",
  },
  {
    texto: "Documentación de la empresa, en hoja membretada:",
    detalle: [
      "Currículum membretado actualizado.",
      "Constancia de situación fiscal actualizada.",
      "Comprobante de domicilio fiscal actualizado.",
      "Copia a color legible de la constancia de registro de contratista ante la (SA y BG), último inmediato.",
      "Copia de acta constitutiva y sus modificaciones.",
      "Copia de acta de nacimiento para persona física.",
      "Copia de identificación oficial del representante legal, en hoja membretada.",
    ],
  },
  {
    texto: "Oficio de la empresa o persona física designando al RTEC, en hoja membretada de la empresa ajena.",
    soloAjena: true,
    formato: "/documentos/rtec/asignacion-de-rtec.pdf",
  },
  {
    texto: "Oficio del agremiado aceptando ser RTEC, en hoja membretada del RTEC.",
    soloAjena: true,
    formato: "/documentos/rtec/aceptacion-de-rtec.pdf",
  },
  {
    texto: "Comprobante de pago de carta propia o ajena.",
  },
  {
    texto: "Comprobante de pago de cartas adicionales, propia o ajena.",
  },
  {
    texto: "Oficio de solicitud de cartas adicionales, en hoja membretada, especificando dependencia y/o municipio.",
    formato: "/documentos/rtec/oficio-solicitud-de-carta-adicional.pdf",
  },
  {
    texto: "Contrato debidamente requisitado RTEC-Empresa.",
    formato: "/documentos/rtec/contrato-rtec-empresa.pdf",
  },
];

export const notaCuotasRtec =
  "Cumplir con el Artículo 27.12: cumplir oportunamente las cuotas que se asignen, que marcan nuestros Estatutos vigentes (estar al corriente con sus pagos).";

// Contrato RTEC-Empresa, Anexo A, Art. 16°: aranceles profesionales mínimos del RTEC.
export const arancelesRtec = {
  articulo: "Art. 16°",
  criterio:
    "Para efectos de la aplicación de estos aranceles, se considera básicamente el monto total anual contratado por la empresa que requiere los servicios profesionales del RTEC.",
  cuotaBase: "$80,000.00 MXN",
  tasas: [
    { desde: "$1", hasta: "$10,000,000", tasa: "3.00 %" },
    { desde: "$10,000,001", hasta: "$50,000,000", tasa: "2.50 %" },
    { desde: "$50,000,001", hasta: "Mayor", tasa: "2.00 %" },
  ],
  nota:
    "Estos aranceles reflejan el valor mínimo de los honorarios que un RTEC deberá percibir por sus servicios profesionales. El pago que deberá de hacer el Contratante al RTEC al suscribir el Contrato Privado de Servicios Profesionales es por $80,000.00 (Ochenta mil pesos 00/100 M.N.), a los cuales se les incrementará el porcentaje de aranceles correspondiente, conforme al cuadro indicado. El pago mínimo será revisable en la Primera Asamblea General del Ejercicio Fiscal correspondiente y será actualizado conforme al comportamiento de la economía nacional, tomando como referencia la UMA (Unidad de Medida y Actualización) aplicable, del mismo ejercicio fiscal.",
};

// Contrato RTEC-Empresa, Anexo B: viáticos por visita técnica según la región de Chiapas.
// Los números y costos son los del Anexo B; el nombre de cada región es el del mapa de regiones
// que acompaña al contrato (región 1 = I, 2 = II… 15 = XV).
export const viaticosRtec = {
  intro:
    "Los costos a cubrir por parte de la empresa representada al RTEC, por concepto de la supervisión de las obras, dependen de la zona geográfica donde se encuentren ubicadas las obras; el número de días de supervisión depende de la complejidad de las obras.",
  regiones: [
    { region: "I", nombre: "Metropolitana", dias: 1, costo: "$2,500" },
    { region: "II", nombre: "Valles Zoque", dias: 1, costo: "$2,500" },
    { region: "III", nombre: "Mezcalapa", dias: 2, costo: "$3,000" },
    { region: "IV", nombre: "De los Llanos", dias: 1, costo: "$2,500" },
    { region: "V", nombre: "Altos Tzotzil-Tzeltal", dias: 2, costo: "$3,000" },
    { region: "VI", nombre: "Frailesca", dias: 2, costo: "$3,500" },
    { region: "VII", nombre: "De los Bosques", dias: 2, costo: "$4,000" },
    { region: "VIII", nombre: "Norte", dias: 2, costo: "$4,500" },
    { region: "IX", nombre: "Istmo-Costa", dias: 2, costo: "$3,500" },
    { region: "X", nombre: "Soconusco", dias: 3, costo: "$4,000" },
    { region: "XI", nombre: "Sierra Mariscal", dias: 3, costo: "$4,000" },
    { region: "XII", nombre: "Selva Lacandona", dias: 3, costo: "$4,000" },
    { region: "XIII", nombre: "Maya", dias: 3, costo: "$5,000" },
    { region: "XIV", nombre: "Tulijá Tzeltal Chol", dias: 3, costo: "$5,000" },
    { region: "XV", nombre: "Meseta Comiteca Tropical", dias: 2, costo: "$3,500" },
  ],
};

// Formatos en blanco para descargar, imprimir, llenar y entregar en las oficinas del Colegio.
export const formatosRtec = [
  { titulo: "Lista de requisitos para carta de RTEC", ruta: "/documentos/rtec/lista-de-requisitos-carta-rtec.pdf" },
  { titulo: "Anexo A. Solicitud de carta propia y/o ajena", ruta: "/documentos/rtec/anexo-a-solicitud-de-carta.pdf" },
  { titulo: "Anexo B. Entrega de documentación fidedigna", ruta: "/documentos/rtec/anexo-b-documentacion-fidedigna.pdf" },
  { titulo: "Anexo C. Bajo protesta de conocer leyes y reglamentos", ruta: "/documentos/rtec/anexo-c-bajo-protesta-leyes-y-reglamentos.pdf" },
  { titulo: "Cédula de datos generales de la empresa o persona física", ruta: "/documentos/rtec/cedula-de-datos-generales.pdf" },
  { titulo: "Asignación de Representante Técnico", ruta: "/documentos/rtec/asignacion-de-rtec.pdf" },
  { titulo: "Aceptación de Representante Técnico", ruta: "/documentos/rtec/aceptacion-de-rtec.pdf" },
  { titulo: "Solicitud de carta adicional (propia y/o ajena)", ruta: "/documentos/rtec/oficio-solicitud-de-carta-adicional.pdf" },
  { titulo: "Contrato RTEC-Empresa (con Anexos A y B)", ruta: "/documentos/rtec/contrato-rtec-empresa.pdf" },
];
