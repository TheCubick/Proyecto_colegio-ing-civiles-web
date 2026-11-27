import { useEffect } from "react";

/*
  APARICIÓN AL BAJAR EN LAS PÁGINAS INTERIORES (tarjetas, pasos, figuras y cierres).
  Marca con data-rv="pre" los bloques de la lista de abajo y, cuando cada uno entra en pantalla
  (IntersectionObserver, sirve en todos los navegadores), pasa a data-rv="in": el CSS (bloque
  «APARICIÓN AL BAJAR» de styles/index.css) los hace subir y aparecer una sola vez, escalonados.
  - Solo anima `opacity` y `translate` (GPU); el :hover de las tarjetas usa `transform`, no chocan.
  - Con «reducir movimiento» no marca nada: todo se ve en su lugar, sin animación.
  - Un MutationObserver marca también lo que se carga después (cursos y asambleas de Supabase).
  - La portada (Inicio) NO lo usa: ahí cada bloque va envuelto en <Revelar> (Framer Motion).
  Uso: llamar useRevelarAlBajar() una vez al inicio de cada página interior.
*/
const SELECTORES = [
  // tarjetas (reaccionan también al hover, ver index.css)
  ".sv-card", ".sv-oficiales-lista li", ".mv-card", ".mv-mas-link", ".com-card", ".asm-card",
  ".ob-card", ".ss-resumen-card", ".td-funcion", ".td-paso", ".cc-card", ".cc-curso",
  // bloques y figuras
  ".tr-req-tarjeta", ".tr-figure", ".sv-figure", ".mv-organigrama-figura", ".ss-articulo",
  ".ea-item", ".td-riesgos", ".td-contratar-pie", ".tr-cta-box", ".sv-cta-box", ".mv-privacidad-box",
  ".bc-banner", ".rtec-bloque",
].join(",");

const COLUMNAS = 4; // el retraso se reinicia cada 4 tarjetas: una «ola» por fila, no una cola larga

export default function useRevelarAlBajar() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const raiz = document.querySelector("main");
    if (!raiz) return;

    const vigia = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return;
          entrada.target.dataset.rv = "in";
          vigia.unobserve(entrada.target);
        });
      },
      // threshold 0 + margen inferior: sirve igual para tarjetas muy altas (asambleas, artículos)
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );

    const marcar = () => {
      raiz.querySelectorAll(SELECTORES).forEach((el) => {
        if (el.dataset.rv === "in") return;
        if (!el.dataset.rv) {
          const hermanos = el.parentElement ? [...el.parentElement.children].filter((h) => h.matches(SELECTORES)) : [el];
          el.style.setProperty("--rv-i", String(Math.max(0, hermanos.indexOf(el)) % COLUMNAS));
          el.dataset.rv = "pre";
        }
        vigia.observe(el); // observar dos veces el mismo elemento no hace nada
      });
    };

    marcar();

    let pendiente = 0;
    const mirador = new MutationObserver(() => {
      cancelAnimationFrame(pendiente);
      pendiente = requestAnimationFrame(marcar);
    });
    mirador.observe(raiz, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(pendiente);
      mirador.disconnect();
      vigia.disconnect();
    };
  }, []);
}
