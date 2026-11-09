import { useEffect, useRef } from "react";

/*
  Controla una ventana <dialog> nativa del navegador.
  - Abre o cierra el <dialog> según `abierto`.
  - Cierra al hacer clic en el fondo oscuro (fuera del contenido).

  Uso:
    const { dialogRef, cerrarAlClicFuera } = useDialogo(abierto, onCerrar);
    <dialog ref={dialogRef} onClose={onCerrar} onClick={cerrarAlClicFuera}>…</dialog>
*/
export default function useDialogo(abierto, onCerrar) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (abierto && !dialog.open) dialog.showModal();
    if (!abierto && dialog.open) dialog.close();
  }, [abierto]);

  const cerrarAlClicFuera = (event) => {
    if (event.target === dialogRef.current) onCerrar();
  };

  return { dialogRef, cerrarAlClicFuera };
}
