import { CheckCircle2, Download, HeartHandshake } from "lucide-react";
import Migas from "../../ui/Migas/Migas";
import "./PaginaInformativa.css";

/*
  PLANTILLA DE PÁGINAS INFORMATIVAS DEL COLEGIO (Servicio Social y Beneficio a la Sociedad).
  Muestra SOLO los campos que tengan contenido; los textos vienen tal cual del Colegio en
  src/data/servicioSocial.js y src/data/beneficioSocial.js.
  Uso (en App.jsx): <PaginaInformativa datos={servicioSocial} />
*/
export default function PaginaInformativa({ datos }) {
  const { titulo, tituloLista, parrafos = [], requisitos = [], pdf } = datos;

  return (
    <main className="pi-page">
      <section className="pi-hero">
        <div className="pi-container">
          <Migas className="pi-breadcrumb" />
          <span className="pi-badge">
            <HeartHandshake size={16} aria-hidden="true" />
            Conócenos
          </span>
          <h1>{titulo}</h1>
        </div>
      </section>

      <section className="pi-section fondo-cuadricula">
        <div className="pi-container pi-contenido">
          {parrafos.map((parrafo) => (
            <p key={parrafo} className="texto-justificado">
              {parrafo}
            </p>
          ))}

          {requisitos.length > 0 && (
            <>
              <h2>{tituloLista}</h2>
              <ul className="pi-lista">
                {requisitos.map((requisito) => (
                  <li key={requisito}>
                    <CheckCircle2 size={20} aria-hidden="true" />
                    <span>{requisito}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {pdf && (
            <a href={pdf} target="_blank" rel="noopener noreferrer" className="pi-btn">
              <Download size={18} aria-hidden="true" />
              Descargar PDF
            </a>
          )}
        </div>
      </section>
    </main>
  );
}
