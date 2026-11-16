import { tarjetas } from "../../../data/inicio";
import "./FeatureCards.css";

// Las 4 tarjetas rojas de Inicio. Los textos están en src/data/inicio.js.
export default function FeatureCards() {
  return (
    <section className="cards-section fondo-luz-institucional" id="afiliate">
      <div className="cards-grid">
        {tarjetas.map(([title, description, Icon]) => (
          <article className="red-card" key={title}>
            <Icon size={48} className="card-icon" aria-hidden="true" />
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
