/*
  VALIDADOR DE REGLAS CICTGZ EN VIVO (semáforo del Estudio).
  Revisa el texto mientras se escribe, con las mismas reglas que `npm run verificar`:
  - CURP o correos/teléfonos que no son del Colegio → ROJO (no se puede publicar).
  - Nombre equivocado del Colegio («…de Chiapas») → ROJO.
  - Mención de un partido político sin la cláusula de neutralidad → AMARILLO (se puede insertar con un clic).
  - Nombre del Colegio incompleto → AMARILLO.
  Los números y correos oficiales salen de src/data/contacto.js y src/data/afiliacion.js.
*/
import { contacto } from "../../data/contacto";
import { facturacion } from "../../data/afiliacion";

export const CLAUSULA_NEUTRALIDAD = "como Asociación Civil sin filiación partidista";

const digitos = (texto) => texto.replace(/\D/g, "");

const TELEFONOS_OFICIALES = new Set(
  [
    ...contacto.telefonos,
    contacto.whatsapp,
    facturacion.whatsapp,
    ...contacto.delegaciones.flatMap(({ telefonos }) => telefonos.split("/")),
  ].map(digitos),
);

const CORREOS_OFICIALES = new Set(
  [contacto.correo, contacto.correoContabilidad, facturacion.correo].map((correo) => correo.toLowerCase()),
);

const RE_CURP = /\b[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d\b/i;
const RE_TELEFONO = /(?<![\d-])(?:\+?52[\s-]?)?\(?(\d{3})\)?[\s.-]?(\d{3})[\s.-]?(\d{2})[\s.-]?(\d{2})(?![\d-])/g;
const RE_CORREO = /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g;
const RE_NOMBRE_ERRONEO = /Ingenieros\s+Civiles\s+de\s+Chiapas/i;
const RE_NOMBRE_INCOMPLETO = /Colegio\s+de\s+Ingenieros\s+Civiles(?!\s+de\s+Tuxtla)/i;
const RE_PARTIDO = /\b(MORENA|PRI|PAN|PRD|PVEM|Movimiento Ciudadano)\b/;
const RE_CLAUSULA = /sin filiaci[oó]n partidista/i;
const RE_CLAUSULA_COMPLETA = /Asociaci[oó]n\s+Civil\s+sin\s+filiaci[oó]n\s+partidista/i;

// ¿El texto ya trae «Asociación Civil sin filiación partidista»? (para no insertarla dos veces)
export const tieneClausula = (texto = "") => RE_CLAUSULA_COMPLETA.test(texto);

export function revisarTexto(texto = "") {
  const hallazgos = [];

  if (RE_CURP.test(texto)) {
    hallazgos.push({ id: "curp", nivel: "error", titulo: "Parece una CURP", detalle: "Prohibido publicar datos personales." });
  }

  const telefonos = [...texto.matchAll(RE_TELEFONO)]
    .filter((m) => !TELEFONOS_OFICIALES.has(m[1] + m[2] + m[3] + m[4]))
    .map((m) => m[0].trim());
  if (telefonos.length > 0) {
    hallazgos.push({
      id: "telefono",
      nivel: "error",
      titulo: "Teléfono que no es del Colegio",
      detalle: `${telefonos.join(", ")}. Solo se publican los números oficiales.`,
    });
  }

  const correos = [...texto.matchAll(RE_CORREO)].map((m) => m[0]).filter((c) => !CORREOS_OFICIALES.has(c.toLowerCase()));
  if (correos.length > 0) {
    hallazgos.push({
      id: "correo",
      nivel: "error",
      titulo: "Correo que no es del Colegio",
      detalle: `${correos.join(", ")}. Solo se publican los correos oficiales.`,
    });
  }

  if (RE_NOMBRE_ERRONEO.test(texto)) {
    hallazgos.push({
      id: "nombre",
      nivel: "error",
      titulo: "Nombre del Colegio equivocado («…de Chiapas»)",
      detalle: "El nombre correcto es «Colegio de Ingenieros Civiles de Tuxtla Gutiérrez, A.C.» o CICTGZ.",
    });
  } else if (RE_NOMBRE_INCOMPLETO.test(texto)) {
    hallazgos.push({
      id: "nombre-incompleto",
      nivel: "aviso",
      titulo: "Nombre del Colegio incompleto",
      detalle: "Escribe «Colegio de Ingenieros Civiles de Tuxtla Gutiérrez, A.C.» o CICTGZ.",
    });
  }

  const partido = texto.match(RE_PARTIDO);
  if (partido && !RE_CLAUSULA.test(texto)) {
    hallazgos.push({
      id: "neutralidad",
      nivel: "aviso",
      titulo: `Menciona a ${partido[1]}`,
      detalle: `Agrega la aclaración «${CLAUSULA_NEUTRALIDAD}».`,
      accion: "clausula",
    });
  }

  return hallazgos;
}

// Color del semáforo: "rojo" si hay algún error, "amarillo" si hay avisos, "verde" si todo está bien.
export const colorSemaforo = (hallazgos) =>
  hallazgos.some((h) => h.nivel === "error") ? "rojo" : hallazgos.length > 0 ? "amarillo" : "verde";
