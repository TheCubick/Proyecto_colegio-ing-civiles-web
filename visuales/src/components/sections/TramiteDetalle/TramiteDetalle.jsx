import { ArrowRight, CheckCircle2, ClipboardList, Lock, PhoneCall, Scale, TriangleAlert } from "lucide-react";
import "./TramiteDetalle.css";

/*
  Bloques de información ampliada para los trámites (DRO, RT, Dictaminador).
  Uso: <TramiteDetalle info={infoDro} sigla="DRO" onContactar={() => setAbierto(true)} />
  `info` viene de data/tramitesInfo.js
*/
export default function TramiteDetalle({ info, sigla, onContactar }) {
  const { funciones, contratar, normativa } = info;

  return (
    <>
      <section className="td-section td-funciones-sec fondo-puntos" aria-labelledby={`td-funciones-${sigla}`}>
        <div className="td-container">
          <header className="td-head">
            <span className="td-head-icon">
              <ClipboardList size={28} aria-hidden="true" />
            </span>
            <h2 id={`td-funciones-${sigla}`}>¿Qué funciones realiza un {sigla}?</h2>
          </header>
          <p className="td-intro texto-legible texto-justificado">{funciones.intro}</p>
          <ul className="td-funciones grilla-movil-carrusel">
            {funciones.lista.map(({ titulo, texto }, i) => (
              <li className="td-funcion" key={titulo}>
                <span className="td-funcion-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="td-funcion-icono" aria-hidden="true">
                  <CheckCircle2 size={22} />
                </span>
                <h3>{titulo}</h3>
                <p>{texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="td-section fondo-cuadricula" aria-labelledby={`td-normativa-${sigla}`}>
        <div className="td-container td-normativa">
          <div>
            <header className="td-head">
              <span className="td-head-icon">
                <Scale size={28} aria-hidden="true" />
              </span>
              <h2 id={`td-normativa-${sigla}`}>Importancia normativa</h2>
            </header>
            {normativa.parrafos.map((parrafo) => (
              <p className="td-parrafo texto-legible texto-justificado" key={parrafo}>
                {parrafo}
              </p>
            ))}
          </div>
          <aside className="td-riesgos" aria-labelledby={`td-riesgos-${sigla}`}>
            <h3 id={`td-riesgos-${sigla}`}>
              <TriangleAlert size={24} aria-hidden="true" />
              Riesgos de no contar con un {sigla}
            </h3>
            <ul>
              {normativa.riesgos.map((riesgo) => (
                <li key={riesgo}>{riesgo}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="td-section td-contratar fondo-profundo" aria-labelledby={`td-contratar-${sigla}`}>
        <div className="td-container">
          <header className="td-head">
            <span className="td-head-icon">
              <PhoneCall size={28} aria-hidden="true" />
            </span>
            <h2 id={`td-contratar-${sigla}`}>¿Cómo contratar a uno de nuestros agremiados?</h2>
          </header>
          <p className="td-intro texto-legible texto-justificado">{contratar.intro}</p>
          {/* Línea de tiempo: el número va sobre la línea y la tarjeta debajo */}
          <ol className="td-pasos" style={{ "--td-pasos": contratar.pasos.length }}>
            {contratar.pasos.map(({ titulo, texto }, i) => (
              <li className="td-paso" key={titulo}>
                <span className="td-paso-marca" aria-hidden="true">
                  <span className="td-paso-num">{i + 1}</span>
                </span>
                <div className="td-paso-tarjeta">
                  <span className="td-paso-fondo" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3>
                    <span className="sr-only">Paso {i + 1}: </span>
                    {titulo}
                  </h3>
                  <p>{texto}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="td-contratar-pie">
            <p className="td-privacidad texto-legible">
              <Lock size={20} aria-hidden="true" />
              <span>{contratar.nota}</span>
            </p>
            <button type="button" className="td-btn" onClick={onContactar}>
              Solicitar directorio oficial
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
