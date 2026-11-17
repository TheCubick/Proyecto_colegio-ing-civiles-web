/*
  GALERÍAS DE FOTOS de Trámites y Servicios (carrusel GaleriaCarrusel).

  Cada servicio tiene 6 lugares: /img/galerias/<servicio>/<servicio>-01.jpg … -06.jpg.
  Las fotos que no existan se ocultan solas, así que basta con subir de 1 a 6 imágenes
  a public/img/galerias/<servicio>/ (1600×1000 px, JPG de menos de 350 KB).
  Solo fotos del Colegio (las que mande o las de sus redes oficiales).

  Para dar a una foto un texto alternativo o un pie distinto, reemplaza slots(...)
  por una lista explícita: [{ src: "/img/galerias/dro/dro-01.jpg", alt: "…", pie: "…" }, …]
*/
const slots = (carpeta, alt) =>
  Array.from({ length: 6 }, (_, i) => ({
    src: `/img/galerias/${carpeta}/${carpeta}-0${i + 1}.jpg`,
    alt,
    pie: "",
  }));

export const galerias = {
  dro: slots("dro", "Director Responsable de Obra supervisando una construcción"),
  rt: slots("rt", "Representante Técnico revisando una obra"),
  dictaminador: slots("dictaminador", "Inspección de daños en una edificación"),
  peritos: slots("peritos", "Perito valuador inspeccionando un inmueble"),
  calculo: slots("calculo", "Ingeniero revisando el cálculo estructural de un edificio"),
};
