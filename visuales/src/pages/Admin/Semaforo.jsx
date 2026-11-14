import { CircleAlert, CircleCheck, Plus, TriangleAlert } from "lucide-react";

/*
  SEMÁFORO DE REGLAS CICTGZ (parte inferior del formulario del Estudio).
  Verde: listo para publicar · Amarillo: revisar · Rojo: no se puede publicar.
  `faltan`: campos obligatorios vacíos (impiden publicar, pero no son una falta a las reglas).
*/
const textos = {
  verde: "Todo en orden: cumple las reglas del Colegio.",
  amarillo: "Revisa los avisos antes de publicar.",
  rojo: "No se puede publicar hasta corregir lo marcado en rojo.",
};

export default function Semaforo({ color, hallazgos, faltan, onInsertarClausula }) {
  return (
    <section className={`adm-semaforo adm-semaforo--${color}`} aria-labelledby="adm-semaforo-titulo">
      <div className="adm-semaforo-cabecera">
        <span className="adm-semaforo-luces" aria-hidden="true">
          <span className="adm-luz adm-luz--rojo" />
          <span className="adm-luz adm-luz--amarillo" />
          <span className="adm-luz adm-luz--verde" />
        </span>
        <div aria-live="polite">
          <h3 id="adm-semaforo-titulo">Validador de reglas CICTGZ</h3>
          <p>{textos[color]}</p>
        </div>
      </div>

      {(hallazgos.length > 0 || faltan.length > 0) && (
        <ul className="adm-semaforo-lista">
          {hallazgos.map(({ id, nivel, titulo, detalle, accion }) => (
            <li key={id} className={`adm-hallazgo adm-hallazgo--${nivel}`}>
              {nivel === "error" ? <CircleAlert size={20} aria-hidden="true" /> : <TriangleAlert size={20} aria-hidden="true" />}
              <div>
                <strong>{titulo}</strong>
                <span>{detalle}</span>
                {accion === "clausula" && (
                  <button type="button" className="adm-btn adm-btn--suave adm-btn--chico" onClick={onInsertarClausula}>
                    <Plus size={16} aria-hidden="true" />
                    Insertar cláusula de neutralidad
                  </button>
                )}
              </div>
            </li>
          ))}
          {faltan.length > 0 && (
            <li className="adm-hallazgo adm-hallazgo--falta">
              <CircleAlert size={20} aria-hidden="true" />
              <div>
                <strong>Para publicar falta {faltan.join(", ")}.</strong>
                <span>Puedes guardarlo como borrador mientras tanto.</span>
              </div>
            </li>
          )}
        </ul>
      )}

      {color === "verde" && faltan.length === 0 && (
        <p className="adm-semaforo-ok">
          <CircleCheck size={18} aria-hidden="true" />
          Sin datos personales, teléfonos privados ni errores en el nombre del Colegio.
        </p>
      )}
    </section>
  );
}
