/*
  CONTENIDO DEL POP-UP «AFÍLIATE» (botón rojo del menú y enlaces a #afiliacion).
  Lo muestra components/ui/ModalAfiliacion. Aquí solo hay datos: el diseño está en el componente.

  Fuentes: tríptico oficial, oficio de costos CICTG/PRES/VI/01/2026 y
  oficio bancario CICTG/PRES/VI/02/2026. No cambiar montos ni cuentas sin un oficio nuevo.
*/

export const requisitosIngreso = [
  "Solicitud dirigida al Presidente (respaldada por 2 Miembros Numerarios según Art. 23).",
  "Cédula profesional expedida por la S.E.P. y Título.",
  "Currículum Vitae actualizado.",
  "Constancia de Situación Fiscal (RFC).",
  "Comprobante de domicilio actualizado.",
  "Acta de nacimiento, INE y CURP.",
  "Pago de inscripción correspondiente.",
];

export const notaCartasAfiliacion =
  "Carta Propia: 3 años de antigüedad de cédula profesional y 2 años de colegiado. Carta Ajena: 5 años de antigüedad de cédula profesional y 3 años de colegiado. En ambas, 30 horas de cursos de actualización en el año inmediato anterior (Art. 55° de los Estatutos). Si perteneció a otro Colegio, anexar carta de no adeudo y renuncia.";

// Formatos de inscripción EN BLANCO: [título, ruta del PDF en public/].
// Los PDF anteriores tenían datos personales y se retiraron (F1-PR0). Cuando el Colegio
// mande los formatos en blanco, se agregan aquí (ej. ["Cédula de Inscripción", "/documentos/cedula-inscripcion.pdf"]).
// Mientras la lista esté vacía, el pop-up muestra `avisoFormatos`.
export const formatos = [];

export const avisoFormatos = "Formatos disponibles en las oficinas del Colegio.";

export const triptico = [
  ["Ver Tríptico (Frente)", "/img/documentos/triptico-enfrente.jpg"],
  ["Ver Tríptico (Reverso)", "/img/documentos/triptico-atras.jpg"],
];

// Oficio CICTG/PRES/VI/01/2026. Montos en MXN.
export const costos = {
  oficio: "CICTG/PRES/VI/01/2026",
  imagen: "/img/documentos/costos.jpg",
  grupos: [
    {
      grupo: "Inscripción",
      filas: [
        ["Nuevo Agremiado (Ene-Dic 2026)", "$1,500.00"],
        ["Pasante", "$500.00"],
        ["Estudiante", "$300.00"],
      ],
    },
    {
      grupo: "Reinscripción",
      filas: [
        ["Enero (promoción)", "$2,200.00"],
        ["Febrero a Diciembre", "$2,600.00"],
      ],
    },
    {
      grupo: "Cartas y Sellos",
      filas: [
        ["Carta Propia", "$600.00"],
        ["Carta Ajena*", "$25,000.00"],
        ["Carta Adicional Propia", "$600.00"],
        ["Carta Adicional Ajena", "$700.00"],
        ["Carta DROyC", "$800.00"],
        ["Sello de Planos", "$1,000.00"],
      ],
    },
  ],
  pie: "* Acuerdo intercolegial del Estado de Chiapas",
};

// Oficio CICTG/PRES/VI/02/2026
export const datosBancarios = {
  oficio: "CICTG/PRES/VI/02/2026",
  imagen: "/img/documentos/datos-bancarios.jpg",
  cuentas: [
    { banco: "SANTANDER", cuenta: "65508294566", clabe: "0141-0065-5082-945-660" },
    { banco: "BBVA MÉXICO", cuenta: "0112233592", clabe: "0121-0000-1122-335-922" },
  ],
};

export const facturacion = {
  correo: "cictgcontabilidad@gmail.com",
  whatsapp: "961-285-1837",
};

export const MENSAJE_WHATSAPP_AFILIACION =
  "Hola, me gustaría recibir orientación sobre el proceso de afiliación al CICTGZ.";
