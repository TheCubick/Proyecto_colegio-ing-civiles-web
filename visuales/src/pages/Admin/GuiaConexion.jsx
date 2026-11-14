import { useState } from "react";
import { CircleAlert, CircleCheck, Cloud, Database, Download, ExternalLink, MonitorSmartphone, RotateCcw, ShieldCheck, Users } from "lucide-react";
import { servidorSupabase, supabaseConfigurado } from "../../utils/supabaseClient";
import { respaldo, TIPOS_CONTENIDO } from "../../utils/contenido";
import { TIPOS, fechaCorta } from "./tipos";
import { repositorio } from "./repositorio";
import Confirmar from "./Confirmar";

/*
  ESTADO DE CONEXIÓN Y GUÍA RÁPIDA.
  - Vista previa local: pasos para conectar Supabase y botón para reiniciar los datos de prueba.
  - Supabase: estado de la conexión y, si las tablas están vacías, importar lo que hoy publica el sitio.
  - Perfiles activos (public.perfiles): quién tiene rol admin o editor.
*/
const PASOS = [
  { titulo: "Crear el proyecto", texto: "En supabase.com, crea un proyecto gratuito (región más cercana: Estados Unidos)." },
  { titulo: "Crear las tablas", texto: "En «SQL Editor» ejecuta docs/panel-admin/esquema.sql y después docs/panel-admin/storage_y_seguridad.sql." },
  {
    titulo: "Crear las cuentas",
    texto: "En «Authentication › Users» invita al personal y desactiva el registro público. Luego dale su rol en la tabla perfiles (editor o admin).",
  },
  { titulo: "Conectar el sitio", texto: "Copia visuales/.env.example como visuales/.env y pega la URL del proyecto y la «anon key» (nunca la service_role)." },
  { titulo: "Reiniciar y entrar", texto: "Vuelve a iniciar el sitio (npm run dev o una nueva publicación) y entra con tu cuenta." },
];

const ROLES = {
  admin: { etiqueta: "Admin", detalle: "Publica y administra cuentas" },
  editor: { etiqueta: "Editor", detalle: "Crea y publica contenido" },
};

function PerfilesActivos({ perfiles, error, idSesion }) {
  const propio = perfiles?.find((perfil) => perfil.id === idSesion);
  // RLS: un editor solo puede leer su propio perfil
  const soloPropio = supabaseConfigurado && propio?.rol === "editor";

  return (
    <section className="adm-tarjeta adm-perfiles" aria-labelledby="adm-perfiles-titulo">
      <h3 id="adm-perfiles-titulo">
        <Users size={20} aria-hidden="true" />
        Perfiles administrativos activos
        {perfiles && perfiles.length > 0 && <span className="adm-perfiles-num">{perfiles.length}</span>}
      </h3>
      <p>Cuentas con permiso para entrar al panel (tabla «perfiles»). Las cuentas se crean por invitación en Supabase.</p>

      {perfiles === null && <span className="esqueleto adm-esqueleto-perfiles" role="status" aria-label="Cargando perfiles" />}

      {error && (
        <p className="adm-error" role="alert">
          <CircleAlert size={18} aria-hidden="true" />
          No se pudieron leer los perfiles: {error}
        </p>
      )}

      {perfiles && perfiles.length > 0 && (
        <ul className="adm-perfiles-lista">
          {perfiles.map((perfil) => {
            const rol = ROLES[perfil.rol] ?? { etiqueta: perfil.rol, detalle: "" };
            return (
              <li key={perfil.id}>
                <span className="adm-usuario-avatar" aria-hidden="true">
                  {(perfil.nombre || "?").charAt(0).toUpperCase()}
                </span>
                <div className="adm-perfiles-datos">
                  <strong>
                    {perfil.nombre}
                    {perfil.id === idSesion && <span className="adm-perfiles-tu"> (tú)</span>}
                  </strong>
                  <span>
                    {rol.detalle}
                    {perfil.creado_en ? ` · desde ${fechaCorta(perfil.creado_en)}` : ""}
                  </span>
                </div>
                <span className={`adm-rol adm-rol--${perfil.rol}`}>
                  {perfil.rol === "admin" && <ShieldCheck size={14} aria-hidden="true" />}
                  {rol.etiqueta}
                </span>
              </li>
            );
          })}
        </ul>
      )}

      {perfiles && perfiles.length === 0 && !error && (
        <p className="adm-ayuda">No se encontraron perfiles. Crea el primero desde el SQL Editor (ver docs/panel-admin/storage_y_seguridad.sql).</p>
      )}

      {soloPropio && <p className="adm-ayuda">Por seguridad, solo un admin puede ver al equipo completo.</p>}
      {!supabaseConfigurado && <p className="adm-ayuda">En la vista previa local solo aparece la persona que entró en este navegador.</p>}
    </section>
  );
}

export default function GuiaConexion({ datos, onRecargar, notificar, perfiles, errorPerfiles, idSesion }) {
  const [confirmar, setConfirmar] = useState(false);
  const [trabajando, setTrabajando] = useState(false);

  const tablasVacias = TIPOS_CONTENIDO.filter((tipo) => datos[tipo].length === 0 && respaldo[tipo].length > 0);

  const reiniciar = async () => {
    setConfirmar(false);
    await repositorio.reiniciar();
    await onRecargar();
    notificar("Volvieron las publicaciones actuales del sitio.", "ok", "Vista previa restablecida");
  };

  const importar = async () => {
    setTrabajando(true);
    try {
      const total = await repositorio.importarContenidoActual(tablasVacias);
      await onRecargar();
      notificar(`Se copiaron ${total} publicaciones del sitio a la base, con fecha de hoy.`, "ok", "Contenido importado");
    } catch (err) {
      notificar(err.message, "error");
    } finally {
      setTrabajando(false);
    }
  };

  return (
    <div className="adm-guia">
      <section className={`adm-estado ${supabaseConfigurado ? "adm-estado--nube" : "adm-estado--local"}`}>
        <span className="adm-estado-icono" aria-hidden="true">
          {supabaseConfigurado ? <Cloud size={30} /> : <MonitorSmartphone size={30} />}
        </span>
        <div>
          <h2>{supabaseConfigurado ? "Conectado a Supabase" : "Modo vista previa local"}</h2>
          <p>
            {supabaseConfigurado
              ? `Proyecto: ${servidorSupabase}. Lo que publiques aparece en el sitio para todas las personas.`
              : "Todo lo que hagas se guarda solo en este navegador: sirve para probar y presentar el panel. Nadie más lo ve."}
          </p>
        </div>
      </section>

      {supabaseConfigurado && tablasVacias.length > 0 && (
        <section className="adm-tarjeta">
          <h3>
            <Download size={20} aria-hidden="true" />
            Traer el contenido actual del sitio
          </h3>
          <p>
            Estas secciones aún están vacías en la base:{" "}
            <strong>{tablasVacias.map((tipo) => TIPOS[tipo].etiqueta).join(", ")}</strong>. Puedes copiar a la base lo que hoy
            muestra el sitio para no empezar de cero.
          </p>
          <button type="button" className="adm-btn adm-btn--primario adm-btn--izquierda" onClick={importar} disabled={trabajando}>
            {trabajando ? <span className="adm-girar" aria-hidden="true" /> : <Database size={18} aria-hidden="true" />}
            {trabajando ? "Importando…" : "Importar contenido actual"}
          </button>
        </section>
      )}

      {!supabaseConfigurado && (
        <section className="adm-tarjeta">
          <h3>
            <Database size={20} aria-hidden="true" />
            Cómo conectar Supabase
          </h3>
          <ol className="adm-pasos">
            {PASOS.map(({ titulo, texto }, i) => (
              <li key={titulo}>
                <span className="adm-pasos-num" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <strong>{titulo}</strong>
                  <p>{texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      <PerfilesActivos perfiles={perfiles} error={errorPerfiles} idSesion={idSesion} />

      <section className="adm-tarjeta">
        <h3>
          <CircleCheck size={20} aria-hidden="true" />
          Reglas que el panel revisa por ti
        </h3>
        <ul className="adm-reglas">
          <li>Sin CURP, correos ni teléfonos que no sean los oficiales del Colegio.</li>
          <li>Nombre exacto: «Colegio de Ingenieros Civiles de Tuxtla Gutiérrez, A.C.» o CICTGZ.</li>
          <li>Si se menciona un partido político, la aclaración de neutralidad del Colegio.</li>
          <li>Cursos siempre presenciales y fotos optimizadas automáticamente.</li>
        </ul>
      </section>

      <div className="adm-guia-acciones">
        <a href="/" target="_blank" rel="noopener noreferrer" className="adm-btn adm-btn--secundario">
          <ExternalLink size={18} aria-hidden="true" />
          Ver el sitio público
        </a>
        {!supabaseConfigurado && (
          <button type="button" className="adm-btn adm-btn--fantasma" onClick={() => setConfirmar(true)}>
            <RotateCcw size={18} aria-hidden="true" />
            Restablecer datos de prueba
          </button>
        )}
      </div>

      <Confirmar
        abierto={confirmar}
        titulo="¿Restablecer la vista previa?"
        texto="Se borrará lo que hiciste en este navegador y volverán las publicaciones actuales del sitio."
        textoConfirmar="Restablecer"
        peligro
        onConfirmar={reiniciar}
        onCancelar={() => setConfirmar(false)}
      />
    </div>
  );
}
