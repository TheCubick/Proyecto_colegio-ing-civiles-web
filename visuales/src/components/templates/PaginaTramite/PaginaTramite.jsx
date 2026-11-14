import { useState } from "react";
import { ArrowRight, Download } from "lucide-react";
import ModalContacto from "../../ui/ModalContacto/ModalContacto";
import Migas from "../../ui/Migas/Migas";
import VideoFondo from "../../ui/VideoFondo/VideoFondo";
import GaleriaCarrusel from "../../ui/GaleriaCarrusel/GaleriaCarrusel";
import { galerias } from "../../../data/galerias";
import TramiteDetalle from "../../sections/TramiteDetalle/TramiteDetalle";
import RequisitosTramite from "./RequisitosTramite";
import "./PaginaTramite.css";

/*
  PLANTILLA DE LAS PÁGINAS DE TRÁMITES (DRO, RT y Dictaminador de Riesgos).
  Los textos de cada trámite están en src/data/tramites.js.
  Uso (en App.jsx): <PaginaTramite datos={tramites.dro} />

  Si el trámite tiene `video`, el encabezado es oscuro con video a pantalla completa
  (clase tr-hero--video); si no, el encabezado es claro.
*/
export default function PaginaTramite({ datos }) {
  const { sigla, titulo, intro, icono: Icono, video, queEs, info, pdfRequisitos, estatuto } = datos;
  const [contactoAbierto, setContactoAbierto] = useState(false);

  // Las animaciones de entrada solo se usan en el encabezado con video.
  const anim = video ? " tr-hero-anim" : "";

  return (
    <main className="tr-page">
      <section className={`tr-hero${video ? " tr-hero--video" : " decor-plano"}`}>
        {video && (
          <>
            <VideoFondo src={video} className="tr-hero-video" etiqueta={`video de fondo de ${sigla}`} />
            <div className="tr-hero-overlay" aria-hidden="true" />
          </>
        )}
        <div className="tr-container">
          <Migas className={`tr-breadcrumb${anim}`} />
          <span className={`tr-badge${anim}`}>
            <Icono size={16} aria-hidden="true" />
            Trámites
          </span>
          <h1 className={anim.trim() || undefined}>{titulo}</h1>
          {video && <span className="tr-hero-divider tr-hero-anim" aria-hidden="true" />}
          <p className={`tr-intro${anim}`}>{intro}</p>
        </div>
      </section>

      <section className="tr-content fondo-cuadricula">
        <div className="tr-container tr-content-grid">
          <div className="tr-text">
            <h2>{queEs.titulo}</h2>
            <p>{queEs.texto}</p>
          </div>
          <figure className="tr-figure">
            <GaleriaCarrusel
              key={datos.galeria}
              fotos={galerias[datos.galeria]}
              respaldo={{ src: queEs.imagen, alt: queEs.alt }}
            />
          </figure>
        </div>
      </section>

      <TramiteDetalle info={info} sigla={sigla} onContactar={() => setContactoAbierto(true)} />

      <RequisitosTramite estatuto={estatuto} />

      <section className="tr-cta fondo-cuadricula">
        <div className="tr-container tr-cta-box">
          <div>
            <h2>¿Listo para iniciar tu trámite?</h2>
            <p>
              {pdfRequisitos
                ? "Descarga la lista de documentos o contáctanos para recibir orientación."
                : "Contáctanos para recibir orientación."}
            </p>
          </div>
          <div className="tr-cta-actions">
            {pdfRequisitos && (
              <a href={pdfRequisitos} download className="tr-btn tr-btn-primary">
                <Download size={18} aria-hidden="true" />
                Descargar Lista de Documentos
              </a>
            )}
            <button type="button" className="tr-btn tr-btn-secondary" onClick={() => setContactoAbierto(true)}>
              Iniciar Trámite
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      <ModalContacto isOpen={contactoAbierto} onClose={() => setContactoAbierto(false)} />
    </main>
  );
}
