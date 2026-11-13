import { CheckCircle2, Download, HandHeart, HeartHandshake } from "lucide-react";
import Migas from "../../ui/Migas/Migas";
import ArticuloEstatuto from "../../ui/ArticuloEstatuto/ArticuloEstatuto";
import "./PaginaInformativa.css";

/*
  PLANTILLA DE PÁGINAS INFORMATIVAS DEL COLEGIO (Servicio Social, Beneficio a la Sociedad, Estatutos).
  Muestra SOLO los campos que tengan contenido; los textos vienen tal cual del Colegio
  (src/data/servicioSocial.js, beneficioSocial.js y estatutos.js).

  Campos de `datos`:
  - titulo:      título de la página.
  - aviso:       (opcional) recuadro destacado { titulo, texto }.
  - secciones:   (opcional) artículos de los Estatutos (ver data/estatutos.js).
  - parrafos, tituloLista, requisitos: (opcional) texto suelto que mande el Colegio.
  - pdf:         (opcional) documento para descargar.
  - fuente:      (opcional) de dónde sale el texto; se muestra al final.
  Uso (en App.jsx): <PaginaInformativa datos={servicioSocial} />
*/
export default function PaginaInformativa({ datos }) {
  const { titulo, aviso, secciones = [], tituloLista, parrafos = [], requisitos = [], pdf, fuente } = datos;

  return (
    <main className="pi-page">
      <section className="pi-hero decor-plano">
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
          {aviso && (
            <div className="pi-aviso">
              <HandHeart size={28} aria-hidden="true" />
              <div>
                <h2>{aviso.titulo}</h2>
                <p>{aviso.texto}</p>
              </div>
            </div>
          )}

          {secciones.map((articulo) => (
            <ArticuloEstatuto key={articulo.id} articulo={articulo} />
          ))}

          {parrafos.map((parrafo) => (
            <p key={parrafo}>{parrafo}</p>
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

          {fuente && <p className="pi-fuente">Fuente: {fuente}</p>}
        </div>
      </section>
    </main>
  );
}
