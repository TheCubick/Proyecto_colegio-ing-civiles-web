/*
  COMPRIME UNA FOTO EN EL NAVEGADOR (sin librerías, con <canvas>).
  - Máximo 1200 px de ancho (no se agranda si es más pequeña).
  - WebP (o JPG si el navegador no sabe crear WebP), bajando la calidad hasta pesar menos de 280 KB.
  Devuelve { archivo, original, final } (pesos en bytes) para mostrar cuánto se ahorró.
*/
export const TIPOS_IMAGEN = ["image/jpeg", "image/png", "image/webp"];
const ANCHO_MAXIMO = 1200;
const PESO_MAXIMO = 280 * 1024;

export function formatoPeso(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function cargarImagen(archivo) {
  return new Promise((resolver, rechazar) => {
    const url = URL.createObjectURL(archivo);
    const imagen = new Image();
    imagen.onload = () => {
      URL.revokeObjectURL(url);
      resolver(imagen);
    };
    imagen.onerror = () => {
      URL.revokeObjectURL(url);
      rechazar(new Error("No se pudo leer la imagen. ¿El archivo está dañado?"));
    };
    imagen.src = url;
  });
}

const aBlob = (lienzo, tipo, calidad) => new Promise((resolver) => lienzo.toBlob(resolver, tipo, calidad));

function dibujar(imagen, ancho) {
  const escala = Math.min(1, ancho / imagen.naturalWidth);
  const lienzo = document.createElement("canvas");
  lienzo.width = Math.round(imagen.naturalWidth * escala);
  lienzo.height = Math.round(imagen.naturalHeight * escala);
  const contexto = lienzo.getContext("2d");
  contexto.fillStyle = "#fff"; // fondo blanco para PNG con transparencia
  contexto.fillRect(0, 0, lienzo.width, lienzo.height);
  contexto.drawImage(imagen, 0, 0, lienzo.width, lienzo.height);
  return lienzo;
}

export async function comprimirImagen(archivo) {
  if (!TIPOS_IMAGEN.includes(archivo.type)) throw new Error("Formato no permitido: usa una foto JPG, PNG o WebP.");

  const imagen = await cargarImagen(archivo);
  let ancho = Math.min(ANCHO_MAXIMO, imagen.naturalWidth);
  let tipo = "image/webp";
  let blob = null;

  // Hasta 4 intentos reduciendo el tamaño si la calidad mínima no alcanza
  for (let intento = 0; intento < 4; intento += 1) {
    const lienzo = dibujar(imagen, ancho);
    let calidad = 0.85;
    blob = await aBlob(lienzo, tipo, calidad);
    if (blob && blob.type !== tipo) {
      tipo = "image/jpeg"; // el navegador no genera WebP
      blob = await aBlob(lienzo, tipo, calidad);
    }
    while (blob && blob.size > PESO_MAXIMO && calidad > 0.5) {
      calidad -= 0.1;
      blob = await aBlob(lienzo, tipo, calidad);
    }
    if (blob && blob.size <= PESO_MAXIMO) break;
    ancho = Math.round(ancho * 0.8);
  }
  if (!blob) throw new Error("El navegador no pudo comprimir la imagen.");

  const extension = tipo === "image/webp" ? "webp" : "jpg";
  const nombre = `${archivo.name.replace(/\.[^.]+$/, "") || "foto"}.${extension}`;
  return {
    archivo: new File([blob], nombre, { type: tipo }),
    original: archivo.size,
    final: blob.size,
  };
}

// Convierte un archivo en texto «data:» (para guardarlo en el modo vista previa local).
export const aDataUrl = (archivo) =>
  new Promise((resolver, rechazar) => {
    const lector = new FileReader();
    lector.onload = () => resolver(lector.result);
    lector.onerror = () => rechazar(new Error("No se pudo leer el archivo."));
    lector.readAsDataURL(archivo);
  });
