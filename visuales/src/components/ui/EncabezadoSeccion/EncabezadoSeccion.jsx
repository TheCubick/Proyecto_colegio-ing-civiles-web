import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Revelar from "../Revelar/Revelar";
import "./EncabezadoSeccion.css";

/*
  ENCABEZADO DE SECCIÓN DE LA PORTADA (mismo patrón en todas: Ley de Jakob).
  Etiqueta roja en mayúsculas + título grande + subtítulo + enlace «Ver más» a la derecha.
  Props: id (del <h2>, para aria-labelledby), etiqueta, titulo, subtitulo,
         enlace { to, texto } (opcional), claro (true sobre fondo oscuro).
*/
export default function EncabezadoSeccion({ id, etiqueta, titulo, subtitulo, enlace, claro = false }) {
  return (
    <Revelar as="header" className={`es-encabezado${claro ? " es-encabezado--claro" : ""}`}>
      <div className="es-textos">
        {etiqueta && <span className="es-etiqueta">{etiqueta}</span>}
        <h2 id={id}>{titulo}</h2>
        {subtitulo && <p>{subtitulo}</p>}
      </div>
      {enlace && (
        <Link to={enlace.to} className="es-enlace">
          {enlace.texto}
          <span className="es-enlace-flecha" aria-hidden="true">
            <ArrowRight size={18} />
          </span>
        </Link>
      )}
    </Revelar>
  );
}
