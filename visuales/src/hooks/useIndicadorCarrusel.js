import { useCallback, useEffect, useRef, useState } from "react";

/*
  Para los carruseles móviles (.grilla-movil-carrusel): calcula qué tarjeta está activa
  según el "scrollLeft" del contenedor (proporción, no depende del ancho exacto de cada
  tarjeta) y da una función "ir(indice)" para que los puntitos del indicador lo muevan.
  Uso: const { ref, activo, ir } = useIndicadorCarrusel(total); <ul ref={ref} ...>
*/
export default function useIndicadorCarrusel(total) {
  const ref = useRef(null);
  const [activo, setActivo] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || total <= 1) {
      setActivo(0);
      return undefined;
    }

    const alDeslizar = () => {
      const maximo = el.scrollWidth - el.clientWidth;
      if (maximo <= 0) {
        setActivo(0);
        return;
      }
      const indice = Math.round((el.scrollLeft / maximo) * (total - 1));
      setActivo(Math.min(total - 1, Math.max(0, indice)));
    };

    alDeslizar();
    el.addEventListener("scroll", alDeslizar, { passive: true });
    return () => el.removeEventListener("scroll", alDeslizar);
  }, [total]);

  const ir = useCallback(
    (indice) => {
      const el = ref.current;
      if (!el) return;
      const maximo = el.scrollWidth - el.clientWidth;
      el.scrollTo({ left: total > 1 ? (maximo * indice) / (total - 1) : 0, behavior: "smooth" });
    },
    [total],
  );

  return { ref, activo, ir };
}
