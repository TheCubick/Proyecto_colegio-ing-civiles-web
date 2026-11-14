import { TriangleAlert } from "lucide-react";
import useDialogo from "../../hooks/useDialogo";

// Diálogo de confirmación (por ejemplo, antes de eliminar). Escape o clic fuera = cancelar.
export default function Confirmar({ abierto, titulo, texto, textoConfirmar = "Confirmar", peligro = false, onConfirmar, onCancelar }) {
  const { dialogRef, cerrarAlClicFuera } = useDialogo(abierto, onCancelar);

  return (
    <dialog
      ref={dialogRef}
      className="adm-dialogo"
      onClose={onCancelar}
      onClick={cerrarAlClicFuera}
      aria-labelledby="adm-dialogo-titulo"
      aria-describedby="adm-dialogo-texto"
    >
      {abierto && (
        <div className="adm-dialogo-contenido">
          <span className={`adm-dialogo-icono${peligro ? " adm-dialogo-icono--peligro" : ""}`} aria-hidden="true">
            <TriangleAlert size={26} />
          </span>
          <h2 id="adm-dialogo-titulo">{titulo}</h2>
          <p id="adm-dialogo-texto">{texto}</p>
          <div className="adm-dialogo-acciones">
            <button type="button" className="adm-btn adm-btn--secundario" onClick={onCancelar} autoFocus>
              Cancelar
            </button>
            <button
              type="button"
              className={`adm-btn ${peligro ? "adm-btn--peligro" : "adm-btn--primario"}`}
              onClick={onConfirmar}
            >
              {textoConfirmar}
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
