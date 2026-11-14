import { CheckCircle2, Download, HandHeart, HeartHandshake } from "lucide-react";
import Migas from "../../ui/Migas/Migas";
import ArticuloEstatuto from "../../ui/ArticuloEstatuto/ArticuloEstatuto";
import CuerpoEstatutos from "./CuerpoEstatutos";
import CuerpoObjetivos from "./CuerpoObjetivos";
import CuerpoServicio from "./CuerpoServicio";
import "./PaginaInformativa.css";

/*
  PLANTILLA DE PÁGINAS INFORMATIVAS DEL COLEGIO (Estatutos, Servicio Social, Beneficio a la Sociedad).
  Muestra SOLO los campos que tengan contenido; los textos vienen tal cual del Colegio
  (src/data/estatutos.js, servicioSocial.js y beneficioSocial.js).

  Campos de `datos`:
  - titulo:      título de la página.  subtitulo: (opcional) línea bajo el título.
  - diseno:      (opcional) cómo se dibuja el contenido:
                 "estatutos" → índice lateral + acordeones por tema (usa `temas`)
                 "objetivos" → incisos de un artículo como tarjetas (usa `articulo` e `iconos`)
                 "servicio"  → banner de gratuidad + resumen + artículos en 2 columnas (usa `aviso`, `resumen`, `secciones`)
                 sin diseno  → diseño genérico (aviso, secciones, parrafos, requisitos, pdf).
  - fuente:      (opcional) de dónde sale el texto; se muestra al final.
  Uso (en App.jsx): <PaginaInformativa datos={servicioSocial} />
*/
const cuerpos = {
  estatutos: CuerpoEstatutos,
  objetivos: CuerpoObjetivos,
  servicio: CuerpoServicio,
};

export default function PaginaInformativa({ datos }) {
  const { titulo, subtitulo, diseno } = datos;
  const Cuerpo = cuerpos[diseno] ?? CuerpoGenerico;

  return (
    <main className={`pi-page${diseno ? ` pi-page--${diseno}` : ""}`}>
      <section className="pi-hero decor-plano">
        <div className="pi-container">
          <Migas className="pi-breadcrumb" />
          <span className="pi-badge">
            <HeartHandshake size={16} aria-hidden="true" />
            Conócenos
          </span>
          <h1>{titulo}</h1>
          {subtitulo && <p className="pi-subtitulo">{subtitulo}</p>}
        </div>
      </section>

      <section className="pi-section fondo-cuadricula">
        <div className="pi-container pi-contenido">
          <Cuerpo {...datos} />
        </div>
      </section>
    </main>
  );
}

// Diseño genérico: para páginas que solo tengan texto suelto del Colegio.
function CuerpoGenerico({ aviso, secciones = [], tituloLista, parrafos = [], requisitos = [], pdf, fuente }) {
  return (
    <div className="pi-generico">
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
  );
}
