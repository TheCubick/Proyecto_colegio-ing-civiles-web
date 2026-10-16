/*
  Vacantes que se muestran en /servicios/bolsa-de-trabajo (sección "Vacantes disponibles").

  Para publicar una vacante, agrega un objeto con esta forma:
  {
    id: "residente-de-obra-2026",            // único, sin espacios
    puesto: "Residente de obra",
    empresa: "Constructora Ejemplo S.A. de C.V.",
    origen: "Empresa constructora",          // "Universidad", "Empresa constructora" o "Agremiado"
    ubicacion: "Tuxtla Gutiérrez, Chiapas",
    fecha: "2026-10-15",                     // fecha de publicación, formato AAAA-MM-DD
    descripcion: "Requisitos y descripción breve del puesto.",
    contacto: "mailto:rh@ejemplo.com",       // correo (mailto:) o enlace a la oferta
  }

  Mientras la lista esté vacía, la página muestra un aviso de "sin vacantes".
*/
const vacantes = [];

export default vacantes;
