/*
  DOCUMENTOS DEL COLEGIO que se enlazan desde el sitio (F2-MF2).

  - codigoEtica: ruta del PDF del Código de Ética que mande el Colegio
    (ej. "/documentos/codigo-de-etica.pdf" en public/documentos/, o un enlace de Drive
    «Cualquier persona con el enlace · Lector»). Vacío = no se muestra el enlace en el Footer.
*/
export const codigoEtica = "";

/*
  ENLACES LEGALES DEL PIE DE PÁGINA (sección «Legal»).
  Solo se muestran los que tengan ruta. El equipo NO redacta estos documentos:
  - avisoPrivacidad: hoy el sitio no recaba datos personales (no hay formularios, cuentas
    ni cookies; el contacto abre WhatsApp, el teléfono o el correo), por eso no se publica.
    Si se agrega el panel administrativo o un formulario, el Colegio debe entregar su
    Aviso de Privacidad (LFPDPPP) y se enlaza aquí.
  - terminos: Términos y Condiciones, solo si el Colegio los entrega.
*/
export const documentosLegales = [
  { titulo: "Código de Ética", ruta: codigoEtica },
  { titulo: "Aviso de Privacidad", ruta: "" },
  { titulo: "Términos y Condiciones", ruta: "" },
].filter((documento) => documento.ruta);
