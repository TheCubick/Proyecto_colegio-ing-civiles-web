import { Plus, X } from "lucide-react";

/*
  LISTA EDITABLE (puntos del resumen o acuerdos de una asamblea).
  Cada renglón se puede escribir o quitar; los renglones vacíos no se guardan.
*/
export default function ListaDinamica({ etiqueta, ayuda, items, onCambiar, multilinea = false, textoAgregar, nombreItem }) {
  const cambiar = (indice, valor) => onCambiar(items.map((item, i) => (i === indice ? valor : item)));
  const quitar = (indice) => onCambiar(items.filter((_, i) => i !== indice));
  const Campo = multilinea ? "textarea" : "input";

  return (
    <fieldset className="adm-lista">
      <legend className="adm-etiqueta">{etiqueta}</legend>
      {ayuda && <p className="adm-ayuda">{ayuda}</p>}
      {items.length > 0 && (
        <ol className="adm-lista-items">
          {items.map((item, i) => (
            <li key={i}>
              <span className="adm-lista-num" aria-hidden="true">
                {i + 1}
              </span>
              <Campo
                value={item}
                rows={multilinea ? 3 : undefined}
                onChange={(event) => cambiar(i, event.target.value)}
                aria-label={`${nombreItem} ${i + 1}`}
              />
              <button
                type="button"
                className="adm-btn-icono adm-btn-icono--quitar"
                onClick={() => quitar(i)}
                aria-label={`Quitar ${nombreItem} ${i + 1}`}
              >
                <X size={18} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ol>
      )}
      <button type="button" className="adm-btn adm-btn--suave" onClick={() => onCambiar([...items, ""])}>
        <Plus size={18} aria-hidden="true" />
        {textoAgregar}
      </button>
    </fieldset>
  );
}
