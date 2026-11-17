import { useEffect } from "react";

/*
  Evita que la página de fondo haga scroll mientras hay un menú o una ventana abierta.
  Uso: useBloquearScroll(abierto);

  En iOS Safari, "overflow: hidden" en el body no basta (el "rubber-banding" sigue
  moviendo la página de fondo) y si dos candados se traslapan (p. ej. cerrar un modal
  mientras otro sigue abierto) restaurar el overflow de uno puede pisar al del otro y
  dejar la página congelada. Por eso: (1) se fija body con position:fixed compensando
  el scroll con "top" (técnica estándar para iOS), también en <html>, y (2) un contador
  compartido entre todos los hooks activos asegura que solo se desbloquea de verdad
  cuando YA NO queda ningún candado activo, y siempre se vuelve al scroll exacto de antes.
*/
let candados = 0;
let scrollPrevio = 0;

function bloquear() {
  if (candados === 0) {
    scrollPrevio = window.scrollY;
    const { style } = document.body;
    style.position = "fixed";
    style.top = `-${scrollPrevio}px`;
    style.left = "0";
    style.right = "0";
    style.width = "100%";
    style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  }
  candados += 1;
}

function desbloquear() {
  candados = Math.max(0, candados - 1);
  if (candados === 0) {
    const { style } = document.body;
    style.position = "";
    style.top = "";
    style.left = "";
    style.right = "";
    style.width = "";
    style.overflow = "";
    document.documentElement.style.overflow = "";
    window.scrollTo(0, scrollPrevio);
  }
}

export default function useBloquearScroll(activo) {
  useEffect(() => {
    if (!activo) return undefined;
    bloquear();
    return () => desbloquear();
  }, [activo]);
}

// Reset de seguridad: ninguna ruta nueva debe arrancar con el scroll bloqueado
// (por ejemplo, si una navegación se saltó la limpieza de algún candado).
// "scrollPrevio" SIEMPRE se pone en 0 aquí, incluso si no hay candado activo todavía:
// si el menú móvil sigue "abierto" en React en el momento de navegar (se cierra un
// instante después, ej. al elegir una ruta desde dentro del menú) y recién entonces
// dispara su desbloqueo, ese desbloqueo usaría el scrollY viejo (el de la página
// anterior) si no lo hubiéramos limpiado ya aquí, y la página nueva "saltaría" de
// vuelta hasta abajo después de haber llegado a 0.
export function desbloquearPorSeguridad() {
  scrollPrevio = 0;
  if (candados === 0 && document.body.style.position !== "fixed") return;
  candados = 0;
  const { style } = document.body;
  style.position = "";
  style.top = "";
  style.left = "";
  style.right = "";
  style.width = "";
  style.overflow = "";
  document.documentElement.style.overflow = "";
}
