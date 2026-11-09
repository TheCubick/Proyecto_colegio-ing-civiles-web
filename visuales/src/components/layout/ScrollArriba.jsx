import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/*
  Al cambiar de página, sube al inicio de la nueva página.
  Antes cada página lo hacía por su cuenta con window.scrollTo(0, 0); ahora se hace aquí una sola vez.
  Solo reacciona al cambio de ruta (no al #afiliacion), así abrir el pop-up no mueve la página.
*/
export default function ScrollArriba() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
