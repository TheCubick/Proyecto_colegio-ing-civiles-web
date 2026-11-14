import { useCallback, useEffect, useState } from "react";
import { cerrarSesion, sesionVigente, supabaseConfigurado } from "../../utils/supabaseClient";
import Acceso from "./Acceso";
import Tablero from "./Tablero";
import "./PanelAdmin.css";

/*
  PANEL ADMINISTRATIVO Y ESTUDIO DE PUBLICACIÓN (/admin).
  Para el personal del Colegio: noticias del muro, cursos y asambleas.
  - Con Supabase (.env): inicio de sesión real; solo entran cuentas con rol editor o admin.
  - Sin .env: «modo vista previa local» (todo se guarda en este navegador) para probar y presentar.
  Se carga aparte del sitio (React.lazy en App.jsx) y no aparece en el menú público.
  Documentación: docs/Manual_Usuario.md (uso) y docs/panel-admin/ (base de datos).
*/
const CLAVE_SESION_LOCAL = "cictgz-admin-local";

function leerSesionLocal() {
  try {
    return JSON.parse(window.sessionStorage.getItem(CLAVE_SESION_LOCAL));
  } catch {
    return null;
  }
}

export default function PanelAdmin() {
  // undefined = revisando si hay una sesión abierta; null = sin sesión
  const [sesion, setSesion] = useState(() => (supabaseConfigurado ? undefined : leerSesionLocal()));

  // Título de la pestaña y aviso a buscadores para que no indexen el panel
  useEffect(() => {
    const tituloAnterior = document.title;
    document.title = "Panel administrativo · CICTGZ";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      document.title = tituloAnterior;
      meta.remove();
    };
  }, []);

  useEffect(() => {
    if (!supabaseConfigurado) return undefined;
    let vigente = true;
    sesionVigente().then((actual) => {
      if (vigente) setSesion(actual);
    });
    return () => {
      vigente = false;
    };
  }, []);

  const sesionVencida = useCallback(() => setSesion(null), []);

  const entrar = (nueva) => {
    if (!supabaseConfigurado) {
      try {
        window.sessionStorage.setItem(CLAVE_SESION_LOCAL, JSON.stringify(nueva));
      } catch {
        /* sin almacenamiento: la sesión dura mientras la página esté abierta */
      }
    }
    setSesion(nueva);
  };

  const salir = async () => {
    if (supabaseConfigurado) await cerrarSesion();
    else {
      try {
        window.sessionStorage.removeItem(CLAVE_SESION_LOCAL);
      } catch {
        /* nada que borrar */
      }
    }
    setSesion(null);
  };

  if (sesion === undefined) {
    return (
      <div className="adm-verificando" role="status">
        <span className="adm-girar" aria-hidden="true" />
        Verificando sesión…
      </div>
    );
  }

  return sesion ? (
    <Tablero sesion={sesion} onSalir={salir} onSesionVencida={sesionVencida} />
  ) : (
    <Acceso onEntrar={entrar} />
  );
}
