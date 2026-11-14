import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Banknote,
  Check,
  ClipboardList,
  Clock,
  Copy,
  Download,
  ExternalLink,
  FileDown,
  Image,
  Info,
  Landmark,
  MapPin,
  MessageCircle,
  Pin,
  Receipt,
  Sparkles,
  UserPlus,
  Wallet,
  X,
} from "lucide-react";
import {
  avisoFormatos,
  costos,
  datosBancarios,
  facturacion,
  formatos,
  MENSAJE_WHATSAPP_AFILIACION,
  notaCartasAfiliacion,
  requisitosIngreso,
  triptico,
} from "../../../data/afiliacion";
import { contacto } from "../../../data/contacto";
import { enlaceCorreo, enlaceWhatsapp } from "../../../utils/enlaces";
import "./ModalAfiliacion.css";

/*
  POP-UP «AFÍLIATE»: requisitos, costos y datos bancarios en tres pestañas.
  Lo abre el Header cuando la dirección termina en #afiliacion.
  Los textos y montos están en src/data/afiliacion.js.
  Uso: <ModalAfiliacion abierto={true|false} onCerrar={fn} />
*/

const pestanas = [
  { id: "requisitos", label: "1. Requisitos y Formatos", corto: "Requisitos", icono: ClipboardList },
  { id: "costos", label: "2. Costos y Cuotas 2026", corto: "Costos", icono: Banknote },
  { id: "bancos", label: "3. Datos Bancarios y Facturación", corto: "Pagos", icono: Landmark },
];

function CopiarDato({ etiqueta, valor }) {
  const [copiado, setCopiado] = useState(false);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(valor.replaceAll("-", ""));
      setCopiado(true);
      setTimeout(() => setCopiado(false), 1800);
    } catch {
      // Sin permiso de portapapeles: el dato sigue visible para copiarlo a mano.
    }
  };

  return (
    <div className="hd-dato">
      <span className="hd-dato-label">{etiqueta}</span>
      <code>{valor}</code>
      <button type="button" className="hd-copy" onClick={copiar} aria-label={`Copiar ${etiqueta}`}>
        {copiado ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
        <span>{copiado ? "Copiado" : "Copiar"}</span>
      </button>
    </div>
  );
}

// Miniatura que abre la imagen de un oficio oficial en otra pestaña.
function EnlaceOficio({ imagen, titulo }) {
  return (
    <a href={imagen} target="_blank" rel="noopener noreferrer" className="hd-oficio">
      <img src={imagen} alt="" loading="lazy" />
      <span>
        <strong>{titulo}</strong>
        <small>Abrir imagen en una pestaña nueva</small>
      </span>
      <ExternalLink size={18} aria-hidden="true" />
    </a>
  );
}

function PanelRequisitos() {
  return (
    <div className="hd-req-layout">
      <div className="hd-req-principal">
        <h3 className="hd-subtitulo hd-subtitulo--primero">
          Requisitos de ingreso
          <span className="hd-contador">{requisitosIngreso.length}</span>
        </h3>
        <ol className="hd-requisitos" role="list">
          {requisitosIngreso.map((requisito, i) => (
            <li key={requisito}>
              <span className="hd-req-num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{requisito}</span>
            </li>
          ))}
        </ol>
        <div className="hd-nota-cartas">
          <Info size={20} aria-hidden="true" />
          <p>
            <strong>Notas para cartas:</strong> {notaCartasAfiliacion}
          </p>
        </div>
      </div>

      {/* Columna lateral: todo lo que no es un requisito, junto (ley de proximidad) */}
      <aside className="hd-req-lateral" aria-label="Datos del trámite">
        <div className="hd-lateral-bloque hd-lateral-bloque--rojo">
          <p className="hd-lateral-titulo">
            <Pin size={18} aria-hidden="true" />
            Trámite 100% presencial
          </p>
          <p>En nuestras oficinas, donde también se entregan los formatos.</p>
          <ul className="hd-aviso-datos">
            <li>
              <MapPin size={16} aria-hidden="true" />
              {contacto.direccion.corta}
            </li>
            {contacto.horario.map(({ dias, horas }) => (
              <li key={dias}>
                <Clock size={16} aria-hidden="true" />
                {dias}: {horas}
              </li>
            ))}
          </ul>
        </div>

        <div className="hd-lateral-bloque">
          <p className="hd-lateral-titulo">
            <FileDown size={18} aria-hidden="true" />
            Formatos y tríptico
          </p>
          {formatos.length === 0 && <p>{avisoFormatos}</p>}
          {formatos.length > 0 && (
            <div className="hd-descargas">
              {formatos.map(([titulo, href]) => (
                <a key={href} href={href} download target="_blank" rel="noopener noreferrer" className="hd-descarga">
                  <span className="hd-descarga-icon">
                    <FileDown size={20} aria-hidden="true" />
                  </span>
                  <span className="hd-descarga-text">
                    <small>Descargar</small>
                    {titulo}
                  </span>
                  <Download size={18} aria-hidden="true" className="hd-descarga-arrow" />
                </a>
              ))}
            </div>
          )}
          <div className="hd-triptico">
            {triptico.map(([titulo, href]) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="hd-btn hd-btn-secondary">
                <Image size={18} aria-hidden="true" />
                {titulo}
              </a>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

function PanelCostos() {
  return (
    <>
      <p className="hd-panel-intro">
        Cuotas oficiales vigentes según el oficio <strong>{costos.oficio}</strong>. Montos en pesos mexicanos.
      </p>
      <div className="hd-costos">
        {costos.grupos.map(({ grupo, filas }, i) => (
          <article className="hd-costo" key={grupo}>
            <header className="hd-costo-cabecera">
              <span className="hd-costo-num" aria-hidden="true">
                {i + 1}
              </span>
              <h3>{grupo}</h3>
            </header>
            <dl className="hd-costo-filas">
              {filas.map(([concepto, monto]) => (
                <div className="hd-costo-fila" key={concepto}>
                  <dt>{concepto}</dt>
                  <dd>{monto}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
      <p className="hd-pie-tabla">{costos.pie}</p>

      <EnlaceOficio imagen={costos.imagen} titulo="Ver comunicado oficial de costos" />
    </>
  );
}

function PanelBancos() {
  return (
    <>
      <p className="hd-panel-intro">
        Cuentas oficiales según el oficio <strong>{datosBancarios.oficio}</strong>.
      </p>
      <div className="hd-cuentas">
        {datosBancarios.cuentas.map(({ banco, cuenta, clabe }) => (
          <article className="hd-cuenta" key={banco}>
            <h3>
              <Wallet size={18} aria-hidden="true" />
              {banco}
            </h3>
            <CopiarDato etiqueta="Cuenta" valor={cuenta} />
            <CopiarDato etiqueta="CLABE" valor={clabe} />
          </article>
        ))}
      </div>

      <h3 className="hd-subtitulo">
        <Receipt size={18} aria-hidden="true" />
        Reglas de facturación
      </h3>
      <ul className="hd-reglas">
        <li>
          Envía tu comprobante legible (anotando <strong>nombre y concepto</strong>), tu Constancia de Situación
          Fiscal y el Uso de CFDI a <a href={enlaceCorreo(facturacion.correo)}>{facturacion.correo}</a> o al WhatsApp{" "}
          <a href={enlaceWhatsapp("", facturacion.whatsapp)} target="_blank" rel="noopener noreferrer">
            {facturacion.whatsapp}
          </a>
          .
        </li>
        <li>
          Solo se facturan pagos del <strong>mes en curso</strong>. Límite: último día hábil antes de las 5:00 p.m., o
          sábado antes de la 1:00 p.m.
        </li>
        <li>
          Los pagos de <strong>Persona Moral</strong> y <strong>Carta Ajena</strong> son más I.V.A.
        </li>
      </ul>

      <EnlaceOficio imagen={datosBancarios.imagen} titulo="Ver oficio bancario oficial" />
    </>
  );
}

const paneles = {
  requisitos: PanelRequisitos,
  costos: PanelCostos,
  bancos: PanelBancos,
};

// Se monta cada vez que se abre el pop-up, así siempre inicia en la primera pestaña.
function Contenido({ onCerrar }) {
  const cerrarRef = useRef(null);
  const tabsRef = useRef([]);
  const [activa, setActiva] = useState(pestanas[0].id);

  useEffect(() => {
    cerrarRef.current?.focus();
  }, []);

  // Flechas izquierda/derecha para moverse entre pestañas
  const handleTabKey = (event, index) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    const paso = event.key === "ArrowRight" ? 1 : -1;
    const siguiente = (index + paso + pestanas.length) % pestanas.length;
    setActiva(pestanas[siguiente].id);
    tabsRef.current[siguiente]?.focus();
  };

  const Panel = paneles[activa];

  return (
    <motion.div
      className="hd-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="hd-modal-titulo"
      onClick={(event) => event.stopPropagation()}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.97 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
    >
      <button ref={cerrarRef} type="button" className="hd-modal-close" onClick={onCerrar} aria-label="Cerrar">
        <X size={20} aria-hidden="true" />
      </button>

      <div className="hd-modal-banner">
        <span className="hd-modal-badge">
          <Sparkles size={14} aria-hidden="true" />
          Únete al gremio
        </span>
        <div className="hd-modal-heading">
          <span className="hd-modal-icon">
            <UserPlus size={28} aria-hidden="true" />
          </span>
          <div>
            <h2 id="hd-modal-titulo">Inscripción al Colegio</h2>
            <p>Requisitos, formatos, costos y datos de pago en un solo lugar.</p>
          </div>
        </div>
      </div>

      <div className="hd-tabs" role="tablist" aria-label="Información de afiliación">
        {pestanas.map(({ id, label, corto, icono: Icono }, i) => (
          <button
            key={id}
            ref={(el) => {
              tabsRef.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`hd-tab-${id}`}
            aria-selected={activa === id}
            aria-controls={`hd-panel-${id}`}
            tabIndex={activa === id ? 0 : -1}
            className={`hd-tab ${activa === id ? "is-active" : ""}`}
            onClick={() => setActiva(id)}
            onKeyDown={(event) => handleTabKey(event, i)}
          >
            <Icono size={17} aria-hidden="true" />
            <span className="hd-tab-largo">{label}</span>
            <span className="hd-tab-corto">{corto}</span>
            {activa === id && <motion.span layoutId="hd-tab-indicator" className="hd-tab-indicator" />}
          </button>
        ))}
      </div>

      <div className="hd-modal-body">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activa}
            role="tabpanel"
            id={`hd-panel-${activa}`}
            aria-labelledby={`hd-tab-${activa}`}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.2 }}
          >
            <Panel />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="hd-modal-footer">
        <a
          href={enlaceWhatsapp(MENSAJE_WHATSAPP_AFILIACION)}
          target="_blank"
          rel="noopener noreferrer"
          className="hd-btn hd-btn-primary"
        >
          <MessageCircle size={18} aria-hidden="true" />
          Tengo dudas sobre mi inscripción
        </a>
      </div>
    </motion.div>
  );
}

export default function ModalAfiliacion({ abierto, onCerrar }) {
  return (
    <AnimatePresence>
      {abierto && (
        <motion.div
          className="hd-modal-overlay"
          onClick={onCerrar}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Contenido onCerrar={onCerrar} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
