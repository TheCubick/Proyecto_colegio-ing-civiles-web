import "./IndicadorCarrusel.css";

/*
  Barra de puntitos + contador "1 / N" bajo un carrusel móvil (.grilla-movil-carrusel).
  Solo se ve en ≤768px (CSS); en escritorio no renderiza nada visible porque el grid no
  se desliza. Es un control visual de apoyo (ya redundante con deslizar/tabular las
  tarjetas reales), por eso va con aria-hidden y los puntos sin tabIndex: no le quita a
  nadie que use teclado la forma normal de recorrer las tarjetas.
  Uso: const { ref, activo, ir } = useIndicadorCarrusel(total);
       <ul ref={ref} className="... grilla-movil-carrusel">...</ul>
       <IndicadorCarrusel total={total} activo={activo} onIr={ir} />
*/
export default function IndicadorCarrusel({ total, activo, onIr }) {
  if (total <= 1) return null;

  return (
    <div className="ic-indicador" aria-hidden="true">
      <div className="ic-puntos">
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            type="button"
            tabIndex={-1}
            className={`ic-punto${i === activo ? " is-activo" : ""}`}
            onClick={() => onIr(i)}
          />
        ))}
      </div>
      <span className="ic-contador">
        {activo + 1} / {total}
        <span className="ic-pista">Desliza →</span>
      </span>
    </div>
  );
}
