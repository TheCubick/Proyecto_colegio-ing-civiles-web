import { motion, useReducedMotion } from "framer-motion";

/*
  APARICIÓN AL HACER SCROLL (Framer Motion).
  Sube 24 px y aparece una sola vez cuando el 20 % del bloque entra en pantalla.
  - retraso: segundos de espera (para escalonar tarjetas: 0.08 × índice).
  - as: etiqueta HTML ("div", "li", "header", "section"…).
  Con «reducir movimiento» se muestra directamente en su lugar, sin animación.
  Va en un envoltorio: así el :hover de la tarjeta interior (transform) no choca con la animación.
*/
const CURVA = [0.22, 1, 0.36, 1];

const etiquetas = {
  div: motion.div,
  li: motion.li,
  header: motion.header,
  section: motion.section,
  article: motion.article,
};

export default function Revelar({ as = "div", retraso = 0, children, ...resto }) {
  const reducir = useReducedMotion();
  const Etiqueta = etiquetas[as] ?? motion.div;

  return (
    <Etiqueta
      initial={reducir ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: CURVA, delay: retraso }}
      {...resto}
    >
      {children}
    </Etiqueta>
  );
}
