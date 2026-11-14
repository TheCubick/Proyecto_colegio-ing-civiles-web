// src/data/galerias.js: 6 slots por servicio; los que no existan se ocultan solos.
const slots = (carpeta, alt) =>
  Array.from({ length: 6 }, (_, i) => ({
    src: `/img/galerias/${carpeta}/${carpeta}-0${i + 1}.jpg`,
    alt,
    pie: "",
  }));

export const galerias = {
  dro: slots("dro", "Director Responsable de Obra supervisando una construcción"),
  rt: slots("rt", "Representante Técnico revisando planos de obra"),
  dictaminador: slots("dictaminador", "Inspección de daños en una edificación"),
  peritos: slots("peritos", "Perito valuador inspeccionando un inmueble"),
  calculo: slots("calculo", "Ingeniero revisando el cálculo estructural de un edificio"),
  bolsa: slots("bolsa", "Ingenieros civiles trabajando en obra"),
};
// DC3 (Josué) puede reemplazar slots(...) por un arreglo explícito
// para dar un alt y un pie distintos a cada foto.
