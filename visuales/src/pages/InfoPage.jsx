import { Link } from "react-router-dom";
import "./InfoPage.css";

export default function InfoPage({ title, category }) {
  return (
    <div className="info-page">
      <main className="info-page-content">
        <span className="info-page-category">{category}</span>
        <h1>{title}</h1>
        <p>
          En esta sección encontrarás información del Colegio de Ingenieros
          Civiles de Tuxtla Gutiérrez sobre {title.toLowerCase()}.
        </p>
        <Link className="info-page-back" to="/">
          Volver al inicio
        </Link>
      </main>
    </div>
  );
}
