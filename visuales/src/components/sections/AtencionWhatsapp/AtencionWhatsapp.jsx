import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, CircleHelp, Inbox, MessageCircle, Send } from "lucide-react";
import "./AtencionWhatsapp.css";

const WHATSAPP_NUMERO = "529611190009";
const MAX_COMENTARIO = 1000;

const whatsappUrl = (mensaje) => `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;

const preguntas = [
  {
    pregunta: "¿Cómo puedo afiliarme si soy recién egresado, pasante o estudiante?",
    respuesta:
      "La inscripción es presencial en las oficinas del Colegio. Existen cuotas especiales para pasantes y estudiantes; consulta requisitos, formatos y costos en el botón “Afíliate” del menú.",
    mensaje: "Hola, me gustaría recibir información sobre cómo inscribirme al Colegio como estudiante/pasante.",
  },
  {
    pregunta: "¿Cómo solicito un Director Responsable de Obra (DRO), Perito o Dictaminador?",
    respuesta:
      "Por seguridad de nuestros socios, todo requerimiento de especialistas se gestiona de manera centralizada a través de las oficinas del Colegio. Escríbenos con los datos de tu obra o trámite.",
    mensaje: "Hola, me gustaría solicitar un especialista (DRO, Perito o Dictaminador) para mi obra o trámite.",
  },
  {
    pregunta: "¿Los cursos de capacitación están abiertos al público general y estudiantes?",
    respuesta:
      "Consulta las convocatorias vigentes en la sección Cursos y Capacitación. Cada curso indica sus requisitos de inscripción; escríbenos si tienes dudas sobre uno en particular.",
    mensaje: "Hola, me gustaría saber si puedo inscribirme a los cursos de capacitación del Colegio.",
  },
  {
    pregunta: "¿Cómo establezco un convenio institucional (Universidad o Dependencia)?",
    respuesta:
      "El Colegio mantiene vinculación con universidades y dependencias de gobierno. Envíanos el nombre de tu institución y el propósito del convenio para darle seguimiento.",
    mensaje: "Hola, represento a una institución y me gustaría establecer un convenio con el Colegio.",
  },
  {
    pregunta: "¿Cómo envío mi comprobante de pago para facturación?",
    respuesta:
      "Envía tu comprobante legible (con nombre y concepto), tu Constancia de Situación Fiscal y el Uso de CFDI a cictgcontabilidad@gmail.com o al WhatsApp 961-285-1837. Solo se facturan pagos del mes en curso.",
    mensaje: "Hola, me gustaría enviar mi comprobante de pago para solicitar factura.",
  },
];

const tiposMensaje = [
  "Sugerencia para el Colegio",
  "Queja o Reporte Ético",
  "Solicitud de Convenio",
  "Duda sobre Trámites",
];

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
              <a href={whatsappUrl(item.mensaje)} target="_blank" rel="noopener noreferrer" className="aw-btn aw-btn-outline">
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
    <section className="aw-section" id="atencion" aria-labelledby="aw-titulo">
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
              {preguntas.map((item, i) => (
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
              <select value={tipo} onChange={(event) => setTipo(event.target.value)}>
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
              <textarea
                rows={5}
                maxLength={MAX_COMENTARIO}
                value={comentario}
                onChange={(event) => setComentario(event.target.value)}
                placeholder="Escribe aquí tu comentario…"
              />
              <small className="aw-contador">
                {comentario.length}/{MAX_COMENTARIO}
              </small>
            </label>

            <a href={whatsappUrl(mensajeBuzon)} target="_blank" rel="noopener noreferrer" className="aw-btn aw-btn-primary">
              <Send size={18} aria-hidden="true" />
              Enviar por WhatsApp al Colegio ↗
            </a>
          </form>
        </div>
      </div>
    </section>
  );
}
