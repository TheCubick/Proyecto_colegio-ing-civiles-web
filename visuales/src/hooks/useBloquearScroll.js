import { useEffect } from "react";

/*
  Evita que la página de fondo haga scroll mientras hay un menú o una ventana abierta.
  Uso: useBloquearScroll(abierto);
*/
export default function useBloquearScroll(activo) {
  useEffect(() => {
    if (!activo) return undefined;
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflowPrevio;
    };
  }, [activo]);
}
