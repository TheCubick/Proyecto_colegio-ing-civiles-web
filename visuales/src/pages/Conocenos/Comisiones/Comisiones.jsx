import { Link } from "react-router-dom";
import { ArrowRight, Users } from "lucide-react";
import { comisiones } from "../../../data/comisiones";
import Migas from "../../../components/ui/Migas/Migas";
import "./Comisiones.css";

// PÁGINA «COMISIONES». Las comisiones están en src/data/comisiones.js.
export default function Comisiones() {
  return (
    <main className="com-page">
      <section className="com-hero">
        <div className="com-container">
          <Migas className="com-breadcrumb com-animate" />
          <span className="com-badge com-animate">
            <Users size={16} aria-hidden="true" />
            Conócenos
          </span>
          <h1 className="com-animate">Comisiones</h1>
          <p className="com-intro com-animate">
            Contamos con diversas comisiones y especialidades que nos permiten ofrecer servicios
            técnicos especializados ante municipios, dependencias de gobierno y el sector privado.
          </p>
        </div>
      </section>

      <section className="com-section fondo-trazos">
        <div className="com-container">
          <div className="com-grid">
            {comisiones.map(({ icono: Icono, titulo, texto, enlace }) => (
              <article className="com-card" key={titulo}>
                <span className="com-card-icon">
                  <Icono size={26} aria-hidden="true" />
                </span>
                <h2>{titulo}</h2>
                <p>{texto}</p>
                {enlace && (
                  <Link to={enlace.to} className="com-card-link">
                    {enlace.label}
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
