import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { buscarRuta } from "../../../config/rutas";

/*
  Migas de pan: «Inicio > Trámites > DRO».
  Se arman solas con la ruta actual y los datos de src/config/rutas.js
  (grupo y nombre corto de la página), así que no hay que escribirlas en cada página.

  Uso: <Migas className="tr-breadcrumb" />
  El diseño lo pone la clase de cada página (por ejemplo .tr-breadcrumb en PaginaTramite.css).
*/
export default function Migas({ className }) {
  const { pathname } = useLocation();
  const pagina = buscarRuta(pathname);
  if (!pagina) return null;

  const pasos = [pagina.grupo, pagina.corto ?? pagina.titulo].filter(Boolean);

  return (
    <nav className={className} aria-label="Ruta de navegación">
      <Link to="/">Inicio</Link>
      {pasos.map((paso, i) => (
        <Fragment key={paso}>
          <ChevronRight size={14} aria-hidden="true" />
          <span aria-current={i === pasos.length - 1 ? "page" : undefined}>{paso}</span>
        </Fragment>
      ))}
    </nav>
  );
}
