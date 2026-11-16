import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, GraduationCap, LogIn, Newspaper, CalendarDays, ShieldCheck } from "lucide-react";
import { LOGO, NOMBRE_COLEGIO, SIGLAS } from "../../data/contacto";
import { iniciarSesion, supabaseConfigurado } from "../../utils/supabaseClient";
import AvisoModo from "./AvisoModo";

// PANTALLA DE ACCESO: panel institucional a la izquierda y tarjeta de inicio de sesión a la derecha.
export default function Acceso({ onEntrar }) {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [verContrasena, setVerContrasena] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const enviar = async (event) => {
    event.preventDefault();
    setError("");
    if (!correo.trim() || !contrasena) {
      setError("Escribe tu correo y tu contraseña.");
      return;
    }
    setCargando(true);
    try {
      const sesion = supabaseConfigurado
        ? await iniciarSesion(correo.trim(), contrasena)
        : { usuario: { correo: correo.trim() }, perfil: { nombre: "Vista previa", rol: "editor" }, local: true };
      onEntrar(sesion);
    } catch (err) {
      setError(err.message);
      setCargando(false);
    }
  };

  return (
    <div className="adm-acceso">
      <section className="adm-acceso-marca fondo-trazos" aria-label={`${SIGLAS}: estudio de publicación`}>
        <div className="adm-acceso-marca-interior">
          <div className="adm-acceso-logo">
            <img src={LOGO} alt="" />
            <div>
              <strong>{SIGLAS}</strong>
              <span>{NOMBRE_COLEGIO}</span>
            </div>
          </div>
          <div>
            <p className="adm-acceso-eyebrow">Panel administrativo</p>
            <h1>Estudio de publicación</h1>
            <p className="adm-acceso-lema">Publica y actualiza el contenido del sitio del Colegio, sin depender de nadie.</p>
          </div>
          <ul className="adm-acceso-lista">
            <li>
              <Newspaper size={20} aria-hidden="true" />
              Noticias del muro
            </li>
            <li>
              <GraduationCap size={20} aria-hidden="true" />
              Cursos y capacitaciones
            </li>
            <li>
              <CalendarDays size={20} aria-hidden="true" />
              Asambleas con acuerdos y fotos
            </li>
          </ul>
          <Link to="/" className="adm-acceso-volver">
            <ArrowLeft size={18} aria-hidden="true" />
            Volver al sitio
          </Link>
        </div>
      </section>

      <section className="adm-acceso-panel">
        <form className="adm-acceso-tarjeta" onSubmit={enviar} noValidate>
          <AvisoModo />
          <span className="adm-acceso-icono" aria-hidden="true">
            <ShieldCheck size={26} />
          </span>
          <h2>Iniciar sesión</h2>
          <p className="adm-texto-suave">Solo para personal autorizado del Colegio.</p>

          <label className="adm-campo">
            <span className="adm-etiqueta">Correo electrónico</span>
            <input
              id="adm-correo"
              name="correo"
              type="email"
              autoComplete="username"
              value={correo}
              onChange={(event) => setCorreo(event.target.value)}
              aria-invalid={Boolean(error) && !correo.trim()}
              required
            />
          </label>

          <label className="adm-campo">
            <span className="adm-etiqueta">Contraseña</span>
            <span className="adm-campo-clave">
              <input
                id="adm-contrasena"
                name="contrasena"
                type={verContrasena ? "text" : "password"}
                autoComplete="current-password"
                value={contrasena}
                onChange={(event) => setContrasena(event.target.value)}
                aria-invalid={Boolean(error) && !contrasena}
                required
              />
              <button
                type="button"
                className="adm-btn-icono"
                onClick={() => setVerContrasena((valor) => !valor)}
                aria-pressed={verContrasena}
                aria-label={verContrasena ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {verContrasena ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
              </button>
            </span>
          </label>

          {error && (
            <p className="adm-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="adm-btn adm-btn--primario adm-btn--bloque" disabled={cargando}>
            {cargando ? <span className="adm-girar" aria-hidden="true" /> : <LogIn size={20} aria-hidden="true" />}
            {cargando ? "Entrando…" : "Entrar al panel"}
          </button>

          <p className="adm-nota">
            {supabaseConfigurado
              ? "¿Olvidaste tu contraseña? Pide al administrador del panel que la restablezca."
              : "En la vista previa local puedes entrar con cualquier correo y contraseña: nada se publica en internet."}
          </p>
        </form>
      </section>
    </div>
  );
}
