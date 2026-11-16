import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { datosColegio } from "../../../data/inicio";
import Revelar from "../../ui/Revelar/Revelar";
import "./DatosColegio.css";

/*
  FRANJA DE DATOS OFICIALES (portada). Los 4 datos están en src/data/inicio.js › datosColegio
  (solo datos verificados; ver «Fuentes de verdad» en CLAUDE.md).
  El número cuenta desde 0 la primera vez que se ve (1.6 s); con «reducir movimiento», aparece fijo.
*/
function Cifra({ numero, prefijo, sufijo }) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: 0.6 });
  const reducir = useReducedMotion();
  const [valor, setValor] = useState(0);

  useEffect(() => {
    if (!visible || reducir) return undefined;
    const control = animate(0, numero, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValor(Math.round(v)),
    });
    return () => control.stop();
  }, [visible, reducir, numero]);

  const mostrado = reducir ? numero : valor;

  return (
    <span className="dc-cifra" ref={ref}>
      {/* El lector de pantalla lee el dato final, no la cuenta */}
      <span aria-hidden="true">
        {prefijo}
        {mostrado}
        {sufijo && <span className="dc-sufijo">{sufijo}</span>}
      </span>
      <span className="sr-only">
        {prefijo}
        {numero}
        {sufijo}
      </span>
    </span>
  );
}

export default function DatosColegio() {
  return (
    <section className="dc-section" aria-label="El Colegio en cifras">
      <ul className="dc-lista fondo-profundo">
        {datosColegio.map(({ numero, prefijo, sufijo, etiqueta, detalle }, i) => (
          <Revelar as="li" key={etiqueta} retraso={i * 0.12} className="dc-dato">
            <Cifra numero={numero} prefijo={prefijo} sufijo={sufijo} />
            <strong className="dc-etiqueta">{etiqueta}</strong>
            <span className="dc-detalle">{detalle}</span>
          </Revelar>
        ))}
      </ul>
    </section>
  );
}
