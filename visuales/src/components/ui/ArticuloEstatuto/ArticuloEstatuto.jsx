import { ScrollText } from "lucide-react";
import "./ArticuloEstatuto.css";

/*
  UN ARTÍCULO DE LOS ESTATUTOS, tal cual lo entregó el Colegio (src/data/estatutos.js).
  Props: articulo = { id, articulo, titulo, parrafos, lista }
         nivel    = etiqueta del título ("h2" por defecto; "h3" si va dentro de otra sección).
*/
export default function ArticuloEstatuto({ articulo, nivel = "h2" }) {
  const { id, articulo: numero, titulo, parrafos = [], lista = [] } = articulo;
  const Titulo = nivel;

  return (
    <article className="ae-articulo" id={id}>
      <Titulo className="ae-titulo">
        <ScrollText size={22} aria-hidden="true" />
        <span>
          <small>{numero}</small>
          {titulo}
        </span>
      </Titulo>
      {parrafos.map((parrafo) => (
        <p key={parrafo}>{parrafo}</p>
      ))}
      {lista.length > 0 && (
        <ul className="ae-lista">
          {lista.map((punto) => (
            <li key={punto}>{punto}</li>
          ))}
        </ul>
      )}
    </article>
  );
}
