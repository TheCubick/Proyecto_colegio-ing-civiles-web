#!/usr/bin/env node
/*
  Verificador de reglas del portal CICTGZ (ver "Reglas del proyecto" en el README).

  Uso (dentro de visuales/):
    npm run verificar                 → revisa solo los archivos que cambiaste respecto a origin/main
    npm run verificar -- --todo       → revisa todo el proyecto
    npm run verificar -- --base origin/main

  Termina con código 1 si hay ERRORES (el Pull Request no se puede unir).
  Las ADVERTENCIAS no bloquean, pero se revisan en el PR.
  Solo usa módulos de Node: no requiere instalar nada.
*/
import { execSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const VISUALES = join(import.meta.dirname, "..");
const args = process.argv.slice(2);
const revisarTodo = args.includes("--todo");
const base = args.includes("--base") ? args[args.indexOf("--base") + 1] : "origin/main";

// ---------- Reglas (fuente: Ing. Nein Montero Molina, colegiados y auditoría) ----------
const PALETA_HEX = ["ba2a33", "962e35", "383637", "e5e5e5", "ffffff"];
const PALETA_RGB = ["186,42,51", "150,46,53", "56,54,55", "229,229,229", "255,255,255"];
const COLORES_NOMBRE_PROHIBIDOS =
  /\b(blue|navy|teal|cyan|aqua|skyblue|royalblue|dodgerblue|steelblue|cornflowerblue|brown|saddlebrown|sienna|chocolate|peru|tan|maroon)\b/i;
const TAMANO_MINIMO_PX = 14;
const TAMANO_MINIMO_REM = 0.95;

// Números oficiales publicables (oficinas, WhatsApp, facturación, delegaciones y cuentas bancarias).
const NUMEROS_OFICIALES = [
  "9616125541", "9611190009", "9611141636", "9611303088", "9612851837", "9614891596",
  "9166880584", "9161129552", "9611776659", "9933820479",
  "0112233592",
];

const DEPENDENCIAS_PERMITIDAS = [
  "framer-motion", "lucide-react", "react", "react-dom", "react-router-dom", "swiper",
  "@types/react", "@types/react-dom", "@vitejs/plugin-react", "oxlint", "vite",
];

const EXTENSIONES_TEXTO = new Set([".css", ".js", ".jsx", ".mjs", ".html"]);
const IGNORAR = ["node_modules", "dist", `scripts${sep}verificar-reglas.mjs`];

// ---------- Archivos a revisar ----------
function listarTodo(dir) {
  return readdirSync(dir).flatMap((nombre) => {
    const ruta = join(dir, nombre);
    if (IGNORAR.some((i) => ruta.includes(i))) return [];
    return statSync(ruta).isDirectory() ? listarTodo(ruta) : [ruta];
  });
}

function archivosCambiados() {
  const raiz = execSync("git rev-parse --show-toplevel", { cwd: VISUALES }).toString().trim();
  const correr = (cmd) =>
    execSync(cmd, { cwd: raiz }).toString().split("\n").map((l) => l.trim()).filter(Boolean);
  const rutas = new Set([
    ...correr(`git diff --name-only --diff-filter=ACMR ${base}...HEAD`),
    ...correr("git diff --name-only --diff-filter=ACMR HEAD"),
    ...correr("git ls-files --others --exclude-standard"),
  ]);
  return [...rutas]
    .map((r) => join(raiz, r))
    .filter((r) => r.startsWith(VISUALES) && existsSync(r) && !IGNORAR.some((i) => r.includes(i)));
}

let archivos;
let modo;
try {
  archivos = revisarTodo ? listarTodo(VISUALES) : archivosCambiados();
  modo = revisarTodo ? "todo el proyecto" : `cambios respecto a ${base}`;
} catch {
  archivos = listarTodo(VISUALES);
  modo = `todo el proyecto (no se encontró ${base})`;
}

// ---------- Utilidades ----------
const errores = [];
const avisos = [];
const rel = (ruta) => relative(VISUALES, ruta).split(sep).join("/");
const lineaDe = (texto, indice) => texto.slice(0, indice).split("\n").length;
const reportar = (lista, ruta, linea, regla, detalle) =>
  lista.push({ archivo: `${rel(ruta)}${linea ? `:${linea}` : ""}`, regla, detalle });

function buscar(texto, regex, alEncontrar) {
  const global = new RegExp(regex.source, regex.flags.includes("g") ? regex.flags : `${regex.flags}g`);
  for (const m of texto.matchAll(global)) alEncontrar(m, lineaDe(texto, m.index));
}

// ---------- Revisiones ----------
for (const ruta of archivos) {
  const r = rel(ruta);
  const ext = r.slice(r.lastIndexOf("."));

  // Técnica: nombres de archivo sin espacios, "ñ" ni acentos; en public/ además en minúsculas.
  if (/[\sñÑáéíóúÁÉÍÓÚüÜ]/.test(r)) reportar(errores, ruta, 0, "Rutas", "El nombre o la carpeta tiene espacios, «ñ» o acentos");
  else if (r.startsWith("public/") && /[A-Z]/.test(r)) reportar(errores, ruta, 0, "Rutas", "Los archivos de public/ van en minúsculas");

  if (r === "package.json") {
    const pkg = JSON.parse(readFileSync(ruta, "utf8"));
    const nuevas = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies }).filter(
      (d) => !DEPENDENCIAS_PERMITIDAS.includes(d),
    );
    for (const d of nuevas) reportar(errores, ruta, 0, "Librerías", `Dependencia no autorizada: ${d}`);
    continue;
  }

  if (!EXTENSIONES_TEXTO.has(ext)) continue;
  const texto = readFileSync(ruta, "utf8");

  // Identidad: solo la paleta oficial.
  buscar(texto, /#([0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/, (m, l) => {
    let hex = m[1].toLowerCase();
    if (hex.length === 3) hex = [...hex].map((c) => c + c).join("");
    if (!PALETA_HEX.includes(hex.slice(0, 6))) reportar(errores, ruta, l, "Paleta", `Color fuera de la paleta: ${m[0]}`);
  });
  buscar(texto, /rgba?\(\s*(\d{1,3})[\s,]+(\d{1,3})[\s,]+(\d{1,3})/, (m, l) => {
    const rgb = `${m[1]},${m[2]},${m[3]}`;
    if (rgb === "0,0,0") reportar(avisos, ruta, l, "Paleta", "Negro puro: usa rgba(56, 54, 55, …) (#383637)");
    else if (!PALETA_RGB.includes(rgb)) reportar(errores, ruta, l, "Paleta", `Color fuera de la paleta: ${m[0]})`);
  });
  if (ext === ".css") {
    buscar(texto, /:[^;{}]*;/, (m, l) => {
      const color = m[0].match(COLORES_NOMBRE_PROHIBIDOS);
      if (color) reportar(errores, ruta, l, "Paleta", `Color prohibido (azul o café): ${color[0]}`);
    });
  }

  // Accesibilidad: nada menor a 14px / 0.95rem.
  buscar(texto, /font-size\s*:\s*([^;}]+)/, (m, l) => {
    const pequena = [...m[1].matchAll(/([\d.]+)(px|rem)/g)].some(
      ([, n, u]) => (u === "px" && Number(n) < TAMANO_MINIMO_PX) || (u === "rem" && Number(n) < TAMANO_MINIMO_REM),
    );
    if (pequena) reportar(errores, ruta, l, "Tipografía", `Letra demasiado pequeña: ${m[0].trim()} (mínimo 14px / 0.95rem)`);
  });
  buscar(texto, /fontSize\s*:\s*["'`]?([\d.]+)(px|rem)?/, (m, l) => {
    const n = Number(m[1]);
    if ((m[2] === "rem" ? n < TAMANO_MINIMO_REM : n < TAMANO_MINIMO_PX))
      reportar(errores, ruta, l, "Tipografía", `Letra demasiado pequeña: ${m[0]}`);
  });

  // Nombre exacto del Colegio.
  buscar(texto, /Ingenieros Civiles de Chiapas/i, (m, l) =>
    reportar(errores, ruta, l, "Nombre", "Es «de Tuxtla Gutiérrez, A.C.», nunca «de Chiapas»"),
  );
  buscar(texto, /Colegio de Ingenieros Civiles(?!\s+de\s+Tuxtla)/, (m, l) =>
    reportar(avisos, ruta, l, "Nombre", "Nombre incompleto: usa «Colegio de Ingenieros Civiles de Tuxtla Gutiérrez, A.C.» o «CICTGZ»"),
  );

  // Privacidad y contenido (solo en código del sitio, no en comentarios de configuración).
  if (!r.startsWith("src/") && r !== "index.html") continue;

  buscar(texto, /\b[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d\b/, (m, l) =>
    reportar(errores, ruta, l, "Privacidad", "Parece una CURP: prohibido publicar datos personales"),
  );
  buscar(texto, /(?<![\d-])(?:\+?52[\s-]?)?\(?(\d{3})\)?[\s.-]?(\d{3})[\s.-]?(\d{2})[\s.-]?(\d{2})(?![\d-])/, (m, l) => {
    const numero = m[1] + m[2] + m[3] + m[4];
    if (!NUMEROS_OFICIALES.includes(numero))
      reportar(errores, ruta, l, "Privacidad", `Teléfono no oficial: ${m[0].trim()} (solo números del Colegio)`);
  });
  buscar(texto, /\(ejemplo\)|texto de ejemplo|datos de ejemplo/i, (m, l) =>
    reportar(errores, ruta, l, "Contenido", "Contenido de ejemplo: no se publica"),
  );
  buscar(texto, /\[POR CONFIRMAR\]/, (m, l) =>
    reportar(avisos, ruta, l, "Contenido", "Texto pendiente de validar con el Colegio"),
  );
  buscar(texto, /stripe|paypal|mercado\s?pago|conekta|openpay/i, (m, l) =>
    reportar(errores, ruta, l, "Pagos", `Sin pasarela de cobro: ${m[0]}`),
  );
  buscar(texto, /\b(MORENA|PRI|PAN|PRD|PVEM|Movimiento Ciudadano)\b/, (m, l) => {
    if (!/sin filiaci[oó]n partidista|apartidista/i.test(texto))
      reportar(errores, ruta, l, "Neutralidad", `Menciona a ${m[1]}: aclara «Asociación Civil sin filiación partidista»`);
  });
  buscar(texto, /(?:img|src|imagen|foto|video)\s*[:=]\s*["'`{]*https?:\/\/drive\.google\.com/i, (m, l) =>
    reportar(avisos, ruta, l, "Recursos", "Imagen o video desde Google Drive: puede no cargar (Drive no es hosting)"),
  );
}

// ---------- Reporte ----------
const imprimir = (titulo, lista) => {
  if (!lista.length) return;
  console.log(`\n${titulo} (${lista.length})`);
  for (const { archivo, regla, detalle } of lista) console.log(`  [${regla}] ${archivo}  ${detalle}`);
};

console.log(`Verificando reglas CICTGZ · ${modo} · ${archivos.length} archivo(s)`);
imprimir("❌ ERRORES", errores);
imprimir("⚠️  ADVERTENCIAS", avisos);
console.log(errores.length ? "\nCorrige los errores antes de abrir tu Pull Request." : "\n✅ Sin errores.");
process.exit(errores.length ? 1 : 0);
