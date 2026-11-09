/*
  DATOS DE CONTACTO DEL COLEGIO (una sola fuente para todo el sitio).
  Header, Footer, ventanas de contacto, Cursos y la sección de WhatsApp leen de aquí:
  si cambias un dato en este archivo, cambia en todas las páginas.

  Fuentes: tríptico oficial y oficio CICTG/PRES/VI/02/2026.
  PENDIENTE (José María, F1-JM1): confirmar con el Colegio
    - el horario del sábado (el sitio mostraba 13:00 en unas páginas y 14:00 en otras);
    - el número oficial de WhatsApp (el Footer usaba 961-612-5541 y el resto 961-119-0009).
*/

export const NOMBRE_COLEGIO = "Colegio de Ingenieros Civiles de Tuxtla Gutiérrez, A.C.";
export const SIGLAS = "CICTGZ";
export const LOGO = "/img/logos/logo-colegio.png";

export const contacto = {
  direccion: {
    corta: "Calle 11ª Ote. Sur 1056, Col. Maldonado",
    completa: "Calle 11ª Ote. Sur 1056, Col. Maldonado, C.P. 29080, Tuxtla Gutiérrez, Chiapas.",
    ciudad: "Tuxtla Gutiérrez, Chiapas, México",
  },
  mapa:
    "https://www.google.com/maps/place/Colegio+de+Ingenieros+Civiles+De+Tuxtla+Gutierrez+A.C./@16.7441016,-93.1082779,19.99z/data=!4m6!3m5!1s0x85ecd8a3b3b8a423:0xf059605d90c93d2d!8m2!3d16.7439165!4d-93.1086248!16s%2Fg%2F11cp762rvb?entry=ttu&g_ep=EgoyMDI2MTAxMy4wIKXMDSoASAFQAw%3D%3D",

  // El primero es el principal (se muestra en el menú del celular).
  telefonos: ["961-612-5541", "961-119-0009", "961-114-1636", "961-130-3088"],

  correo: "colegiodeingenieroscivilestg@gmail.com",
  correoContabilidad: "cictgcontabilidad@gmail.com",

  // WhatsApp oficial (PENDIENTE de confirmar, ver arriba).
  whatsapp: "961-119-0009",

  // Horario de atención (PENDIENTE de confirmar el sábado, ver arriba).
  horario: [
    { dias: "Lunes a Viernes", horas: "9:00 AM – 5:00 PM" },
    { dias: "Sábados", horas: "9:00 AM – 1:00 PM" },
  ],

  delegaciones: [
    { ciudad: "Palenque", telefonos: "916-688-0584 / 916-112-9552" },
    { ciudad: "Pijijiapan", telefonos: "961-177-6659" },
    { ciudad: "Yajalón", telefonos: "993-382-0479" },
  ],

  redes: {
    facebook: "https://www.facebook.com/profile.php?id=100063697292088",
    instagram: "https://www.instagram.com/colegio_d_ingenieros_civilesac/",
  },
};

// Horario en una sola línea: "Lunes a Viernes 9:00 AM – 5:00 PM · Sábados 9:00 AM – 1:00 PM"
export const horarioEnLinea = contacto.horario.map(({ dias, horas }) => `${dias} ${horas}`).join(" · ");
