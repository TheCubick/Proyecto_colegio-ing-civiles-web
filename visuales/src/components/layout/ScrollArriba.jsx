import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { desbloquearPorSeguridad } from "../../hooks/useBloquearScroll";

/*
  Al cambiar de página, sube al inicio de la nueva página.
  Antes cada página lo hacía por su cuenta con window.scrollTo(0, 0); ahora se hace aquí una sola vez.
  Solo reacciona al cambio de ruta (no al #afiliacion), así abrir el pop-up no mueve la página.
  También libera por seguridad el candado de useBloquearScroll: si un menú o modal se saltó su
  limpieza al navegar (bug de iOS Safari con scroll congelado), ninguna ruta nueva debe arrancar bloqueada.
*/
export default function ScrollArriba() {
  const { pathname } = useLocation();

  useEffect(() => {
    desbloquearPorSeguridad();
    // "instant": el CSS global pone "scroll-behavior: smooth" en <html>, y un cambio
    // de ruta debe arrancar arriba de inmediato, no deslizarse.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
