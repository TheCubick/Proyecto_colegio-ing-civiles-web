import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, CircleHelp, Inbox, MessageCircle, Send } from "lucide-react";
import { preguntasFrecuentes, tiposMensaje } from "../../../data/inicio";
import { enlaceWhatsapp } from "../../../utils/enlaces";
import "./AtencionWhatsapp.css";

// Preguntas frecuentes + buzón por WhatsApp. Las preguntas están en src/data/inicio.js.
const MAX_COMENTARIO = 1000;

function Pregunta({ item, index, abierta, onToggle }) {
  const panelId = `aw-respuesta-${index}`;

  return (
    <li className={`aw-faq-item ${abierta ? "is-open" : ""}`}>
      <button
        type="button"
        className="aw-faq-btn"
        aria-expanded={abierta}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span>{item.pregunta}</span>
        <ChevronDown size={20} aria-hidden="true" className="aw-faq-chevron" />
      </button>
      <AnimatePresence initial={false}>
        {abierta && (
          <motion.div
            id={panelId}
            className="aw-faq-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="aw-faq-content">
              <p>{item.respuesta}</p>
              <a href={enlaceWhatsapp(item.mensaje)} target="_blank" rel="noopener noreferrer" className="aw-btn aw-btn-outline">
                <MessageCircle size={17} aria-hidden="true" />
                Preguntar por WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function AtencionWhatsapp() {
  const [abierta, setAbierta] = useState(0);
  const [tipo, setTipo] = useState(tiposMensaje[0]);
  const [comentario, setComentario] = useState("");

  const mensajeBuzon = [
    "Hola, les escribo desde el sitio web del Colegio.",
    `*Tipo de mensaje:* ${tipo}`,
    comentario.trim() && `*Comentario:* ${comentario.trim()}`,
  ]
    .filter(Boolean)
    .join("\n\n");

  return (
    <section className="aw-section fondo-trazos" id="atencion" aria-labelledby="aw-titulo">
      <div className="aw-container">
        <header className="aw-header">
          <span className="aw-badge">
            <MessageCircle size={15} aria-hidden="true" />
            Atención por WhatsApp
          </span>
          <h2 id="aw-titulo">¿Tienes dudas? Estamos para ayudarte</h2>
          <p>Resuelve tus preguntas frecuentes o envíanos un mensaje directo al Colegio.</p>
        </header>

        <div className="aw-grid">
          <div className="aw-faq">
            <h3 className="aw-block-title">
              <CircleHelp size={22} aria-hidden="true" />
              Preguntas frecuentes
            </h3>
            <ul className="aw-faq-list">
              {preguntasFrecuentes.map((item, i) => (
                <Pregunta
                  key={item.pregunta}
                  item={item}
                  index={i}
                  abierta={abierta === i}
                  onToggle={() => setAbierta(abierta === i ? null : i)}
                />
              ))}
            </ul>
          </div>

          <form className="aw-buzon" onSubmit={(event) => event.preventDefault()}>
            <h3 className="aw-block-title">
              <Inbox size={22} aria-hidden="true" />
              Buzón de quejas y sugerencias
            </h3>
            <p className="aw-buzon-intro">
              Tu mensaje se abrirá en WhatsApp listo para enviar. Puedes revisarlo antes de mandarlo.
            </p>

            <label className="aw-field">
              <span>Tipo de mensaje</span>
              <select id="aw-tipo-mensaje" name="tipo-mensaje" value={tipo} onChange={(event) => setTipo(event.target.value)}>
                {tiposMensaje.map((opcion) => (
                  <option key={opcion} value={opcion}>
                    {opcion}
                  </option>
                ))}
              </select>
            </label>

            <label className="aw-field">
              <span>
                Comentario <small>(opcional)</small>
              </span>
              {/* Área de texto y contador en una misma caja: el contador queda justo debajo */}
              <span className="aw-textarea">
                <textarea
                  id="aw-comentario"
                  name="comentario"
                  rows={5}
                  maxLength={MAX_COMENTARIO}
                  value={comentario}
                  onChange={(event) => setComentario(event.target.value)}
                  placeholder="Escribe aquí tu comentario…"
                  aria-describedby="aw-contador"
                />
                <span className="aw-textarea-pie">
                  <small id="aw-contador" className={`aw-contador${comentario.length >= MAX_COMENTARIO ? " is-limite" : ""}`}>
                    {comentario.length}/{MAX_COMENTARIO}
                  </small>
                </span>
              </span>
            </label>

            <a href={enlaceWhatsapp(mensajeBuzon)} target="_blank" rel="noopener noreferrer" className="aw-btn aw-btn-primary">
              <Send size={18} aria-hidden="true" />
              Enviar por WhatsApp al Colegio ↗
            </a>
          </form>
        </div>
      </div>
    </section>
  );
}
