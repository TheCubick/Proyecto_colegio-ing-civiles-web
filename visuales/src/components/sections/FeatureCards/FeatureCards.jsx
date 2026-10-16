import { BadgeAlert, GraduationCap, Handshake, Users } from "lucide-react";
import "./FeatureCards.css";

const cards = [
  ["Comunidad y Representación", "Agrupamos a los profesionales de la ingeniería civil para elevar la calidad del ejercicio profesional.", Users],
  ["Convenios Institucionales", "Vinculación directa con gobierno y universidades para facilitar el servicio social y laboral.", Handshake],
  ["Certificación y Trámites", "Gestión y respaldo para Directores Responsables de Obra (DRO) y Representantes Técnicos (RT).", BadgeAlert],
  ["Impulso a Estudiantes", "Cuotas preferenciales para estudiantes de últimos semestres y pasantes en cursos y afiliación.", GraduationCap],
];

export default function FeatureCards() {
  return (
    <section className="cards-section" id="afiliate">
      <div className="cards-grid">
        {cards.map(([title, description, Icon]) => (
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
