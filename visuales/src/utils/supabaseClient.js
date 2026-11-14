/*
  CLIENTE LIGERO DE SUPABASE (sin librerías: solo fetch).
  Habla con las APIs REST de Supabase: Auth (/auth/v1), base de datos (/rest/v1) y
  Storage (/storage/v1). Las reglas de acceso las aplica la base con RLS
  (docs/panel-admin/esquema.sql y storage_y_seguridad.sql).

  Configuración (archivo visuales/.env, NUNCA en git; ver .env.example):
    VITE_SUPABASE_URL=https://<proyecto>.supabase.co
    VITE_SUPABASE_ANON_KEY=<clave pública: «publishable» (sb_publishable_…) o «anon» antigua>
  La clave «service_role» JAMÁS va aquí ni en ningún archivo del sitio.

  Sin esas variables, `supabaseConfigurado` es false: el panel trabaja en «modo vista previa
  local» y el sitio público usa los datos de src/data/*.js.
*/
const URL_BASE = (import.meta.env.VITE_SUPABASE_URL ?? "").trim().replace(/\/+$/, "");
const CLAVE_ANON = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? "").trim();

// Nombre del proyecto para mostrarlo en el panel (nunca se muestra la clave). Vacío si la URL no es válida.
export const servidorSupabase = (() => {
  try {
    return URL_BASE ? new URL(URL_BASE).host : "";
  } catch {
    return "";
  }
})();

export const supabaseConfigurado = Boolean(servidorSupabase && CLAVE_ANON);

// Bucket público de Storage donde se guardan fotos y temarios (creado en el tablero de Supabase).
export const BUCKET = "multimedia";

// La sesión vive en sessionStorage: al cerrar el navegador se cierra la sesión.
const CLAVE_SESION = "cictgz-admin-sesion";

export class ErrorSupabase extends Error {
  constructor(mensaje, estado = 0) {
    super(mensaje);
    this.name = "ErrorSupabase";
    this.estado = estado;
  }
}

// Mensajes claros en español para los errores más comunes.
function traducirError(datos, estado) {
  const original = `${datos?.error_description ?? datos?.msg ?? datos?.message ?? datos?.error ?? ""}`;
  if (/invalid login credentials/i.test(original)) return "Correo o contraseña incorrectos.";
  if (/email not confirmed/i.test(original)) return "La cuenta aún no está confirmada. Revisa el correo de invitación.";
  if (/jwt expired/i.test(original)) return "Tu sesión expiró. Vuelve a iniciar sesión.";
  if (/row-level security|permission denied/i.test(original) || estado === 403)
    return "Tu cuenta no tiene permiso para esta acción (se necesita el rol editor o admin).";
  if (/payload too large|exceeded the maximum/i.test(original) || estado === 413) return "El archivo es demasiado grande.";
  if (/bucket not found/i.test(original)) return `Falta crear el bucket «${BUCKET}» en Storage (ver docs/panel-admin/storage_y_seguridad.sql).`;
  if (/relation .* does not exist/i.test(original)) return "Faltan las tablas en la base. Ejecuta docs/panel-admin/esquema.sql en Supabase.";
  if (estado === 401) return "Tu sesión terminó. Vuelve a iniciar sesión.";
  return original || `Error del servidor (${estado}).`;
}

async function pedir(ruta, { metodo = "GET", cuerpo, token, encabezados = {} } = {}) {
  const esArchivo = cuerpo instanceof Blob;
  let respuesta;
  try {
    respuesta = await fetch(`${URL_BASE}${ruta}`, {
      method: metodo,
      headers: {
        apikey: CLAVE_ANON,
        // Solo con sesión se manda el token del usuario. Sin sesión basta «apikey»: las claves
        // nuevas de Supabase (sb_publishable_…) no son JWT y no van en Authorization.
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(cuerpo !== undefined && !esArchivo ? { "Content-Type": "application/json" } : {}),
        ...encabezados,
      },
      body: esArchivo ? cuerpo : cuerpo !== undefined ? JSON.stringify(cuerpo) : undefined,
    });
  } catch {
    throw new ErrorSupabase("No hay conexión con el servidor. Revisa tu internet e inténtalo de nuevo.");
  }

  const texto = await respuesta.text();
  let datos = null;
  try {
    datos = texto ? JSON.parse(texto) : null;
  } catch {
    datos = { message: texto };
  }
  if (!respuesta.ok) throw new ErrorSupabase(traducirError(datos, respuesta.status), respuesta.status);
  return datos;
}

/* ===================== SESIÓN ===================== */
function leerSesion() {
  try {
    return JSON.parse(window.sessionStorage.getItem(CLAVE_SESION));
  } catch {
    return null;
  }
}

function guardarSesion(sesion) {
  try {
    window.sessionStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
  } catch {
    /* almacenamiento bloqueado: la sesión dura mientras la página esté abierta */
  }
}

function borrarSesion() {
  try {
    window.sessionStorage.removeItem(CLAVE_SESION);
  } catch {
    /* nada que borrar */
  }
}

const normalizar = (datos, perfil = null) => ({
  access_token: datos.access_token,
  refresh_token: datos.refresh_token,
  expira: Date.now() + (datos.expires_in ?? 3600) * 1000,
  usuario: { id: datos.user?.id, correo: datos.user?.email },
  perfil,
});

async function obtenerPerfil(sesion) {
  const filas = await pedir(`/rest/v1/perfiles?select=nombre,rol&id=eq.${sesion.usuario.id}`, {
    token: sesion.access_token,
  });
  return filas?.[0] ?? null;
}

export async function iniciarSesion(correo, contrasena) {
  const datos = await pedir("/auth/v1/token?grant_type=password", {
    metodo: "POST",
    cuerpo: { email: correo, password: contrasena },
  });
  const sesion = normalizar(datos);
  const perfil = await obtenerPerfil(sesion);
  if (!perfil || !["editor", "admin"].includes(perfil.rol)) {
    await pedir("/auth/v1/logout", { metodo: "POST", token: sesion.access_token }).catch(() => {});
    throw new ErrorSupabase(
      "Tu cuenta existe, pero aún no tiene el rol de editor. Pide al administrador del panel que la active.",
      403,
    );
  }
  const completa = { ...sesion, perfil };
  guardarSesion(completa);
  return completa;
}

// Devuelve la sesión si sigue vigente (la renueva si está por vencer) o null.
export async function sesionVigente() {
  const sesion = leerSesion();
  if (!sesion?.access_token) return null;
  if (sesion.expira - Date.now() > 60_000) return sesion;
  try {
    const datos = await pedir("/auth/v1/token?grant_type=refresh_token", {
      metodo: "POST",
      cuerpo: { refresh_token: sesion.refresh_token },
    });
    const renovada = normalizar(datos, sesion.perfil);
    guardarSesion(renovada);
    return renovada;
  } catch {
    borrarSesion();
    return null;
  }
}

export async function cerrarSesion() {
  const sesion = leerSesion();
  borrarSesion();
  if (sesion?.access_token) {
    await pedir("/auth/v1/logout", { metodo: "POST", token: sesion.access_token }).catch(() => {});
  }
}

async function tokenVigente() {
  const sesion = await sesionVigente();
  if (!sesion) throw new ErrorSupabase("Tu sesión terminó. Vuelve a iniciar sesión.", 401);
  return sesion;
}

/* ===================== BASE DE DATOS ===================== */
export const db = {
  // Lectura pública: solo filas con publicado = true (lo garantiza RLS además del filtro).
  publicados: (tabla, orden) => pedir(`/rest/v1/${tabla}?select=*&publicado=eq.true&order=${orden}`),

  // Lectura del panel: todas las filas (RLS solo las entrega a editores y admins).
  todos: async (tabla, orden) => {
    const { access_token } = await tokenVigente();
    return pedir(`/rest/v1/${tabla}?select=*&order=${orden}`, { token: access_token });
  },

  // Perfiles del panel (nombre y rol). RLS: un admin ve a todo el equipo; un editor solo su propio perfil.
  perfiles: async () => {
    const { access_token } = await tokenVigente();
    return pedir("/rest/v1/perfiles?select=id,nombre,rol,creado_en&order=rol.asc,nombre.asc", { token: access_token });
  },

  insertar: async (tabla, fila) => {
    const { access_token, usuario } = await tokenVigente();
    const filas = await pedir(`/rest/v1/${tabla}`, {
      metodo: "POST",
      cuerpo: { ...fila, creado_por: usuario.id },
      token: access_token,
      encabezados: { Prefer: "return=representation" },
    });
    return filas[0];
  },

  actualizar: async (tabla, id, cambios) => {
    const { access_token } = await tokenVigente();
    const filas = await pedir(`/rest/v1/${tabla}?id=eq.${encodeURIComponent(id)}`, {
      metodo: "PATCH",
      cuerpo: cambios,
      token: access_token,
      encabezados: { Prefer: "return=representation" },
    });
    return filas[0];
  },

  eliminar: async (tabla, id) => {
    const { access_token } = await tokenVigente();
    await pedir(`/rest/v1/${tabla}?id=eq.${encodeURIComponent(id)}`, { metodo: "DELETE", token: access_token });
  },
};

/* ===================== STORAGE ===================== */
// Sube un archivo al bucket «multimedia» y devuelve su URL pública.
export async function subirArchivo(ruta, archivo) {
  const { access_token } = await tokenVigente();
  await pedir(`/storage/v1/object/${BUCKET}/${ruta}`, {
    metodo: "POST",
    cuerpo: archivo,
    token: access_token,
    encabezados: { "Content-Type": archivo.type || "application/octet-stream", "x-upsert": "false", "cache-control": "31536000" },
  });
  return `${URL_BASE}/storage/v1/object/public/${BUCKET}/${ruta}`;
}
