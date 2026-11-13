/*
  Listado de asambleas que se muestran en /eventos/asambleas.

  Para agregar una asamblea, copia un objeto y llena sus campos:
  - id:       identificador único, sin espacios (se usa como ancla: /eventos/asambleas#id)
  - tipo:     "Ordinaria" o "Extraordinaria"
  - fecha:    formato "AAAA-MM-DD"
  - lugar:    sede de la sesión
  - titulo:   nombre de la asamblea
  - resumen:  arreglo de párrafos
  - acuerdos: (opcional) lista de acuerdos tomados
  - fotos:    lista de { src, alt }. Las imágenes deben estar dentro de public/
              y la ruta debe comenzar con "/".

  Se ordenan automáticamente de la más reciente a la más antigua.
*/
const asambleas = [];

export default asambleas;
