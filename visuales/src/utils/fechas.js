/*
  FECHAS EN ESPAÑOL (sitio y panel /admin).
  - fechaCorta("2026-11-14") → "14 nov 2026"
  - fechaISO(valor)          → "2026-11-14" (formato de <input type="date"> y de la base)
  - hoyISO()                 → la fecha de HOY en la hora de México (no en UTC: de noche
                               toISOString() ya daría el día siguiente).
  Las fechas «AAAA-MM-DD» se leen como día local para que no se recorran un día.
*/
const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

const dosCifras = (numero) => String(numero).padStart(2, "0");

export function aFecha(valor) {
  if (!valor) return null;
  const partes = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(valor));
  const fecha = partes ? new Date(Number(partes[1]), Number(partes[2]) - 1, Number(partes[3])) : new Date(valor);
  return Number.isNaN(fecha.getTime()) ? null : fecha;
}

export function fechaCorta(valor) {
  const fecha = aFecha(valor);
  return fecha ? `${fecha.getDate()} ${MESES[fecha.getMonth()]} ${fecha.getFullYear()}` : "";
}

export function fechaISO(valor) {
  const fecha = aFecha(valor);
  return fecha ? `${fecha.getFullYear()}-${dosCifras(fecha.getMonth() + 1)}-${dosCifras(fecha.getDate())}` : "";
}

export const hoyISO = () => fechaISO(new Date());
