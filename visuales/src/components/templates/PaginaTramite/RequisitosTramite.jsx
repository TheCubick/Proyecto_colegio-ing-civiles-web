import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, FileText, Info, ScrollText } from "lucide-react";
import { notaCartas, requisitosGenerales } from "../../../data/requisitos";
import { FUENTE_ESTATUTOS } from "../../../data/estatutos";
import { CuerpoArticulo } from "../../ui/ArticuloEstatuto/ArticuloEstatuto";

/*
  REQUISITOS DE UN TRÁMITE en una tarjeta con pestañas:
  1) «Requisitos de inscripción» (tríptico, data/requisitos.js)
  2) «Fundamento en Estatutos» (Art. 55° / 56°, data/estatutos.js), con vista previa de
     los primeros incisos y enlace al artículo completo en /conocenos/estatutos.
  Si el trámite no tiene `estatuto` (Dictaminador), solo se muestra la primera parte, sin pestañas.
*/
const VISTA_PREVIA = 4;

function PanelTriptico() {
  return (
    <>
      <ul className="tr-requisitos-grid">
        {requisitosGenerales.map((requisito, i) => (
          <li key={requisito}>
            <span className="tr-req-num" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{requisito}</span>
          </li>
        ))}
      </ul>
      <div className="tr-nota">
        <Info size={20} aria-hidden="true" />
        <p>
          {notaCartas.propias}
          <br />
          {notaCartas.ajenas}
        </p>
      </div>
    </>
  );
}

function PanelEstatuto({ estatuto }) {
  return (
    <>
      <div className="tr-est-cabecera">
        <span className="tr-est-num">{estatuto.articulo}</span>
        <h3>{estatuto.titulo}</h3>
      </div>
      <CuerpoArticulo articulo={estatuto} plegable={VISTA_PREVIA} />
      <div className="tr-est-pie">
        <p className="tr-estatuto-fuente">Fuente: {FUENTE_ESTATUTOS}</p>
        <Link to={`/conocenos/estatutos#${estatuto.id}`} className="tr-est-enlace">
          Ver el artículo en Estatutos
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </>
  );
}

export default function RequisitosTramite({ estatuto }) {
  const pestanas = [
    { id: "triptico", titulo: "Requisitos de inscripción", detalle: "Tríptico oficial", icono: FileText },
    ...(estatuto
      ? [{ id: "estatutos", titulo: "Fundamento en Estatutos", detalle: estatuto.articulo, icono: ScrollText }]
      : []),
  ];
  const [activa, setActiva] = useState(pestanas[0].id);
  const botones = useRef([]);

  // Flechas izquierda/derecha para cambiar de pestaña (patrón WAI-ARIA)
  const alTeclear = (event, indice) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    const siguiente = (indice + (event.key === "ArrowRight" ? 1 : -1) + pestanas.length) % pestanas.length;
    setActiva(pestanas[siguiente].id);
    botones.current[siguiente]?.focus();
  };

  return (
    <section className="tr-requisitos" aria-labelledby="tr-requisitos-titulo">
      <div className="tr-container">
        <h2 id="tr-requisitos-titulo">Requisitos</h2>

        <div className="tr-req-tarjeta">
          {pestanas.length > 1 && (
            <div className="tr-req-tabs" role="tablist" aria-label="Requisitos del trámite">
              {pestanas.map(({ id, titulo, detalle, icono: Icono }, i) => (
                <button
                  key={id}
                  ref={(el) => {
                    botones.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`tr-tab-${id}`}
                  aria-selected={activa === id}
                  aria-controls={`tr-panel-${id}`}
                  tabIndex={activa === id ? 0 : -1}
                  className={`tr-req-tab${activa === id ? " is-activa" : ""}`}
                  onClick={() => setActiva(id)}
                  onKeyDown={(event) => alTeclear(event, i)}
                >
                  <span className="tr-req-tab-icono" aria-hidden="true">
                    <Icono size={20} />
                  </span>
                  <span className="tr-req-tab-texto">
                    <strong>{titulo}</strong>
                    <small>{detalle}</small>
                  </span>
                </button>
              ))}
            </div>
          )}

          <div
            className="tr-req-panel"
            key={activa}
            {...(pestanas.length > 1
              ? { role: "tabpanel", id: `tr-panel-${activa}`, "aria-labelledby": `tr-tab-${activa}`, tabIndex: 0 }
              : {})}
          >
            {activa === "estatutos" ? <PanelEstatuto estatuto={estatuto} /> : <PanelTriptico />}
          </div>
        </div>
      </div>
    </section>
  );
}
