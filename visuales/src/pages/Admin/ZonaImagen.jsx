import { useRef, useState } from "react";
import { ImagePlus, RefreshCw, Trash2, Zap } from "lucide-react";
import { comprimirImagen, formatoPeso, TIPOS_IMAGEN } from "./comprimirImagen";

/*
  ZONA PARA ARRASTRAR O ELEGIR FOTOS.
  Cada foto se comprime en el navegador (máx. 1200 px, < 280 KB) y luego se sube con `subir`
  (Supabase Storage o, en vista previa local, el propio navegador).
  - Una foto:   <ZonaImagen valor={url} onSubida={(url) => …} onQuitar={…} subir={fn} />
  - Varias:     <ZonaImagen multiple onSubida={(url, archivo) => …} subir={fn} />
*/
export default function ZonaImagen({ etiqueta, ayuda, valor, multiple = false, subir, onSubida, onQuitar }) {
  const entrada = useRef(null);
  const [encima, setEncima] = useState(false);
  const [estado, setEstado] = useState("");
  const [error, setError] = useState("");
  const [ahorro, setAhorro] = useState(null);

  const procesar = async (lista) => {
    const archivos = [...lista].filter((archivo) => archivo.type.startsWith("image/"));
    if (archivos.length === 0) {
      setError("Arrastra una foto JPG, PNG o WebP.");
      return;
    }
    setError("");
    let original = 0;
    let final = 0;
    try {
      for (const [i, archivo] of (multiple ? archivos : archivos.slice(0, 1)).entries()) {
        const sufijo = multiple && archivos.length > 1 ? ` (${i + 1} de ${archivos.length})` : "";
        setEstado(`Comprimiendo${sufijo}…`);
        const comprimida = await comprimirImagen(archivo);
        setEstado(`Subiendo${sufijo}…`);
        const url = await subir(comprimida.archivo);
        original += comprimida.original;
        final += comprimida.final;
        onSubida(url, archivo);
      }
      setAhorro({ original, final });
    } catch (err) {
      setError(err.message);
    } finally {
      setEstado("");
      if (entrada.current) entrada.current.value = "";
    }
  };

  const soltar = (event) => {
    event.preventDefault();
    setEncima(false);
    if (!estado) procesar(event.dataTransfer.files);
  };

  const porcentaje = ahorro && ahorro.original > 0 ? Math.round((1 - ahorro.final / ahorro.original) * 100) : 0;
  const conFoto = !multiple && valor;

  return (
    <div className="adm-campo">
      <span className="adm-etiqueta">{etiqueta}</span>
      {ayuda && <p className="adm-ayuda">{ayuda}</p>}

      <div
        className={`adm-zona${encima ? " is-encima" : ""}${conFoto ? " adm-zona--con-foto" : ""}`}
        onDragOver={(event) => {
          event.preventDefault();
          setEncima(true);
        }}
        onDragLeave={() => setEncima(false)}
        onDrop={soltar}
      >
        {conFoto ? (
          <>
            <img src={valor} alt="Foto seleccionada" className="adm-zona-miniatura" />
            <div className="adm-zona-acciones">
              <button type="button" className="adm-btn adm-btn--secundario adm-btn--chico" onClick={() => entrada.current?.click()} disabled={Boolean(estado)}>
                <RefreshCw size={16} aria-hidden="true" />
                Cambiar foto
              </button>
              <button type="button" className="adm-btn adm-btn--fantasma adm-btn--chico" onClick={onQuitar} disabled={Boolean(estado)}>
                <Trash2 size={16} aria-hidden="true" />
                Quitar
              </button>
            </div>
          </>
        ) : (
          <>
            <span className="adm-zona-icono" aria-hidden="true">
              <ImagePlus size={28} />
            </span>
            <p>
              <strong>Arrastra {multiple ? "las fotos" : "una foto"} aquí</strong>
              <span>JPG, PNG o WebP · se optimizan solas</span>
            </p>
            <button type="button" className="adm-btn adm-btn--secundario adm-btn--chico" onClick={() => entrada.current?.click()} disabled={Boolean(estado)}>
              Elegir {multiple ? "fotos" : "foto"}
            </button>
          </>
        )}

        {estado && (
          <div className="adm-zona-progreso" role="status">
            <span className="adm-girar" aria-hidden="true" />
            {estado}
          </div>
        )}

        <input
          ref={entrada}
          type="file"
          accept={TIPOS_IMAGEN.join(",")}
          multiple={multiple}
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
          onChange={(event) => procesar(event.target.files)}
        />
      </div>

      {ahorro && !error && (
        <p className="adm-ahorro" role="status">
          <Zap size={16} aria-hidden="true" />
          Optimizada: de {formatoPeso(ahorro.original)} a {formatoPeso(ahorro.final)}
          {porcentaje > 0 && <strong> (−{porcentaje} %)</strong>}
        </p>
      )}
      {error && (
        <p className="adm-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
