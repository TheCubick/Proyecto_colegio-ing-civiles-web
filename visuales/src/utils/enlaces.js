/*
  Funciones para armar enlaces de contacto.
  Se usan en todo el sitio para no escribir a mano "https://wa.me/...", "tel:" o "mailto:".
*/
import { contacto } from "../data/contacto";

// Quita guiones y espacios: "961-612-5541" → "9616125541"
const soloDigitos = (texto) => texto.replace(/[^\d]/g, "");

// Enlace de WhatsApp con mensaje opcional. Por defecto usa el WhatsApp oficial del Colegio.
export function enlaceWhatsapp(mensaje = "", numero = contacto.whatsapp) {
  const base = `https://wa.me/52${soloDigitos(numero)}`;
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base;
}

// Enlace para llamar desde el celular: tel:+529616125541
export function enlaceTelefono(telefono) {
  return `tel:+52${soloDigitos(telefono)}`;
}

// Enlace para abrir el correo con asunto opcional.
export function enlaceCorreo(correo = contacto.correo, asunto = "") {
  return asunto ? `mailto:${correo}?subject=${encodeURIComponent(asunto)}` : `mailto:${correo}`;
}
