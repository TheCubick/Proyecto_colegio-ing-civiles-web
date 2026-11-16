import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { paginasDe } from "../../../config/rutas";
import { insigniasConocenos } from "../../../data/inicio";
import EncabezadoSeccion from "../../ui/EncabezadoSeccion/EncabezadoSeccion";
import Revelar from "../../ui/Revelar/Revelar";
import "./ConoceColegio.css";

/*
  «CONOCE EL COLEGIO Y MARCO INSTITUCIONAL» (portada).
  Accesos rápidos al menú «Conócenos» de src/config/rutas.js (título, ícono y descripción).
  Servicio Social y Beneficio a la Sociedad solo aparecen si su página está activa.
  Distintivos («100% Gratuito», «Notaría 112»): src/data/inicio.js › insigniasConocenos.
*/
export default function ConoceColegio() {
  const paginas = paginasDe("Conócenos");

  return (
    <section className="cn-section fondo-trazos" aria-labelledby="cn-titulo">
      <div className="cn-container">
        <EncabezadoSeccion
          id="cn-titulo"
          etiqueta="Conócenos"
          titulo="Conoce el Colegio y su Marco Institucional"
          subtitulo="Quiénes somos, cómo nos organizamos y los compromisos que asumimos con la sociedad."
        />

        <ul className="cn-grid grilla-movil-carrusel">
          {paginas.map(({ ruta, titulo, descripcion, icono: Icono }, i) => {
            const insignia = insigniasConocenos[ruta];
            return (
              <Revelar as="li" key={ruta} retraso={i * 0.08} className={i === 0 ? "cn-item cn-item--destacado" : "cn-item"}>
                <Link to={ruta} className="cn-card">
                  <span className="cn-card-icono" aria-hidden="true">
                    <Icono size={28} strokeWidth={1.75} />
                  </span>
                  <span className="cn-card-cuerpo">
                    {insignia && <span className="cn-insignia">{insignia}</span>}
                    <span className="cn-card-titulo">{titulo}</span>
                    <span className="cn-card-texto">{descripcion}</span>
                  </span>
                  <span className="cn-card-flecha" aria-hidden="true">
                    <ArrowUpRight size={20} />
                  </span>
                </Link>
              </Revelar>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
