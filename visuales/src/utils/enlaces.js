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

// Copia un texto (por ejemplo, el enlace de una noticia). Devuelve true si se pudo.
// Si el navegador no permite el portapapeles moderno, usa el método antiguo con un campo oculto.
export async function copiarAlPortapapeles(texto) {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch {
    const campo = document.createElement("textarea");
    campo.value = texto;
    campo.setAttribute("readonly", "");
    campo.className = "sr-only";
    // Dentro de una ventana <dialog> abierta, el resto de la página no acepta selección
    const contenedor = document.activeElement?.closest("dialog") ?? document.body;
    contenedor.appendChild(campo);
    campo.select();
    let copiado = false;
    try {
      copiado = document.execCommand("copy");
    } catch {
      copiado = false;
    }
    campo.remove();
    return copiado;
  }
}

// Enlace para abrir el correo con asunto opcional.
export function enlaceCorreo(correo = contacto.correo, asunto = "") {
  return asunto ? `mailto:${correo}?subject=${encodeURIComponent(asunto)}` : `mailto:${correo}`;
}

// Para MOSTRAR un correo largo (nunca para el href/mailto): agrega un espacio invisible
// después de la "@" para que, si el celular tiene que partir la línea, lo haga ahí y no dentro
// de una palabra (evita que queden 1 o 2 letras solas, p. ej. "...tg@gmail.c" / "om").
export function correoLegible(correo) {
  return correo.replace("@", "​@");
}
