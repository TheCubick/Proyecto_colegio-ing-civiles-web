import { useState } from "react";
import { ImageOff } from "lucide-react";

/*
  Imagen que nunca se ve rota: si el archivo no existe (404), muestra un recuadro
  gris con un ícono y, opcionalmente, un texto como «Imagen pendiente».

  Uso:
    <ImagenSegura src="/img/paginas/tramites/dro.jpg" alt="Descripción" claseVacia="tr-img-placeholder"
                  texto="Imagen pendiente" />

  - className:   clase de la imagen (también se aplica al recuadro gris).
  - claseVacia:  clase extra solo para el recuadro gris.
  - texto:       texto bajo el ícono (opcional).
  - tamanoIcono: tamaño del ícono en px (28 por defecto).
  - lazy:        carga diferida (true por defecto). Usa false en imágenes que se ven al abrir la página.
*/
export default function ImagenSegura({ src, alt, className, claseVacia, texto, tamanoIcono = 28, lazy = true }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={[className, claseVacia].filter(Boolean).join(" ")} role="img" aria-label={alt || texto}>
        <ImageOff size={tamanoIcono} aria-hidden="true" />
        {texto && <span>{texto}</span>}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={lazy ? "lazy" : undefined}
      onError={() => setError(true)}
    />
  );
}
