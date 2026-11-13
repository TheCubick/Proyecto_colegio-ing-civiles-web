import { Link } from "react-router-dom";
import { ArrowLeft, CalendarDays, FileText, Phone } from "lucide-react";
import "./NoEncontrada.css";

// PÁGINA 404: se muestra cuando la dirección no existe (antes redirigía al inicio sin avisar).
const enlaces = [
  { to: "/tramites/dro", icono: FileText, texto: "Trámites" },
  { to: "/eventos/cursos-y-capacitacion", icono: CalendarDays, texto: "Cursos" },
  { to: "#contacto", icono: Phone, texto: "Contacto" },
];

export default function NoEncontrada() {
  return (
    <main className="ne-page fondo-cuadricula">
      <div className="ne-container">
        <p className="ne-codigo" aria-hidden="true">404</p>
        <h1>Página no encontrada</h1>
        <p className="ne-texto">La dirección que escribiste no existe o la página cambió de lugar.</p>

        <Link to="/" className="ne-btn">
          <ArrowLeft size={18} aria-hidden="true" />
          Volver al inicio
        </Link>

        <ul className="ne-enlaces">
          {enlaces.map(({ to, icono: Icono, texto }) => (
            <li key={to}>
              {to.startsWith("#") ? (
                <a href={to}>
                  <Icono size={18} aria-hidden="true" />
                  {texto}
                </a>
              ) : (
                <Link to={to}>
                  <Icono size={18} aria-hidden="true" />
                  {texto}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
