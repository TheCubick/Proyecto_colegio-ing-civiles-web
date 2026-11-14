/*
  SEPARA LA MARCA DE UN INCISO DE SU TEXTO, sin cambiar ni una letra del texto oficial.
  "9.1 Crear conciencia…"  → { marca: "9.1", tipo: "decimal", texto: "Crear conciencia…" }
  "A). Presentar oficio…"  → { marca: "A",   tipo: "letra",   texto: "Presentar oficio…" }
  "VIII.- Haber llevado…"  → { marca: "VIII", tipo: "romano", texto: "Haber llevado…" }
  "1. Servir de órgano…"   → { marca: "1",   tipo: "numero",  texto: "Servir de órgano…" }
  Solo la marca pasa a un distintivo visual (como el número de una lista); el resto
  del texto queda idéntico al de data/estatutos.js.

  Sin marca:
  - "grupo": frase corta que agrupa los incisos siguientes («Para representante técnico de empresa propia.»).
  - "texto": párrafo largo que continúa el inciso anterior o es una nota.
*/
const PATRONES = [
  { tipo: "decimal", re: /^(\d+\.\d+)\s+/ },
  { tipo: "letra", re: /^([A-Z])\)\.?\s+/ },
  { tipo: "romano", re: /^([IVXL]+)\.-?\s+/ },
  { tipo: "numero", re: /^(\d+)\.\s+/ },
];

const LARGO_MAXIMO_GRUPO = 60;

export function separarInciso(texto) {
  for (const { tipo, re } of PATRONES) {
    const coincidencia = texto.match(re);
    if (coincidencia) return { marca: coincidencia[1], tipo, texto: texto.slice(coincidencia[0].length) };
  }
  return { marca: null, tipo: texto.length <= LARGO_MAXIMO_GRUPO ? "grupo" : "texto", texto };
}

/*
  Convierte un artículo ({ parrafos, lista }) en bloques listos para dibujar:
  - { tipo: "parrafo", texto }            párrafo corrido sin marca
  - { tipo: "grupo", texto }              subtítulo de un grupo de incisos
  - { tipo: "inciso", marca, nivel, texto } inciso (marca null = continuación o nota)
*/
export function bloquesDeArticulo({ parrafos = [], lista = [] }) {
  const desdeParrafo = parrafos.map((original) => {
    const inciso = separarInciso(original);
    return inciso.marca ? aInciso(inciso) : { tipo: "parrafo", texto: original };
  });

  const desdeLista = lista.map((original) => {
    const inciso = separarInciso(original);
    if (inciso.marca) return aInciso(inciso);
    if (inciso.tipo === "grupo") return { tipo: "grupo", texto: original };
    return { tipo: "inciso", marca: null, nivel: 1, texto: original };
  });

  return [...desdeParrafo, ...desdeLista];
}

// Los incisos «1.», «2.»… cuelgan de un inciso decimal (ej. 48.2): van un nivel adentro.
function aInciso({ marca, tipo, texto }) {
  return { tipo: "inciso", marca, nivel: tipo === "numero" ? 2 : 1, texto };
}
