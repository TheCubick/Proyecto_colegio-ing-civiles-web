import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BadgeCheck,
  Banknote,
  BookOpen,
  Briefcase,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Clock,
  Copy,
  Download,
  DraftingCompass,
  ExternalLink,
  FileDown,
  FileText,
  GraduationCap,
  HardHat,
  House,
  Image,
  Info,
  Landmark,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Pin,
  Receipt,
  ShieldAlert,
  Sparkles,
  Target,
  UserPlus,
  Users,
  Wallet,
  X,
} from "lucide-react";
import "./Header.css";

const LOGO_SRC = "/Diseño/logos/logo_colegio.png";

// Cualquier enlace a "#afiliacion" (por ejemplo, desde el footer) abre el pop-up de afiliación.
const AFILIACION_HASH = "#afiliacion";

const contacto = {
  telefono: "961-612-5541",
  email: "colegiodeingenieroscivilestg@gmail.com",
};

const menus = [
  {
    label: "Trámites",
    links: [
      ["Director Responsable de Obra (DRO)", "/tramites/dro"],
      ["Representante Técnico (RT)", "/tramites/rt"],
      ["Dictaminador de Riesgos", "/tramites/dictaminador-de-riesgos"],
    ],
  },
  {
    label: "Servicios",
    links: [
      ["Peritos Valuadores", "/servicios/peritos-valuadores"],
      ["Cálculo Estructural", "/servicios/calculo-estructural"],
      ["Bolsa de Trabajo", "/servicios/bolsa-de-trabajo"],
    ],
  },
  {
    label: "Eventos",
    links: [
      ["Cursos y Capacitación", "/eventos/cursos-y-capacitacion"],
      ["Asambleas", "/eventos/asambleas"],
    ],
  },
  {
    label: "Conócenos",
    links: [
      ["Misión y Visión", "/conocenos/mision-y-vision"],
      ["Comisiones", "/conocenos/comisiones"],
      ["Normateca y Estatutos", "/conocenos/normateca-y-estatutos"],
    ],
  },
];

const iconos = {
  "/tramites/dro": HardHat,
  "/tramites/rt": BadgeCheck,
  "/tramites/dictaminador-de-riesgos": ShieldAlert,
  "/servicios/peritos-valuadores": House,
  "/servicios/calculo-estructural": DraftingCompass,
  "/servicios/bolsa-de-trabajo": Briefcase,
  "/eventos/cursos-y-capacitacion": GraduationCap,
  "/eventos/asambleas": CalendarDays,
  "/conocenos/mision-y-vision": Target,
  "/conocenos/comisiones": Users,
  "/conocenos/normateca-y-estatutos": BookOpen,
};

const menuId = (label) => `hd-menu-${label.normalize("NFD").replace(/[^\w]/g, "").toLowerCase()}`;

function MenuLink({ label, href, current, onNavigate, index = 0 }) {
  const Icono = iconos[href] ?? FileText;

  return (
    <motion.li
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.2 }}
    >
      <Link
        to={href}
        className={`hd-menu-link ${current ? "is-current" : ""}`}
        aria-current={current ? "page" : undefined}
        onClick={onNavigate}
      >
        <span className="hd-menu-icon">
          <Icono size={18} aria-hidden="true" />
        </span>
        <span>{label}</span>
      </Link>
    </motion.li>
  );
}

// ---------- Pop-up de afiliación ----------
const WHATSAPP_DUDAS =
  "https://wa.me/529611190009?text=Hola,%20me%20gustar%C3%ADa%20recibir%20orientaci%C3%B3n%20sobre%20el%20proceso%20de%20afiliaci%C3%B3n%20al%20CICTGZ.";

const requisitosIngreso = [
  "Solicitud dirigida al Presidente (respaldada por 2 Miembros Numerarios según Art. 23).",
  "Cédula profesional expedida por la S.E.P. y Título.",
  "Currículum Vitae actualizado.",
  "Constancia de Situación Fiscal (RFC).",
  "Comprobante de domicilio actualizado.",
  "Acta de nacimiento, INE y CURP.",
  "Pago de inscripción correspondiente.",
];

const formatos = [
  ["Oficio de Inscripción", "/Documents/pdf/OFICIO DE INSCRIPCION.docx.pdf"],
  ["Cédula de Inscripción", "/Documents/pdf/CEDULA DE INSCRIPCION.docx.pdf"],
  ["Carta Bajo Protesta de Decir Verdad", "/Documents/pdf/CARTA DE PROTESTA DE DECIR VERDAD 2023.doc.pdf"],
];

const triptico = [
  ["Ver Tríptico (Frente)", "/Documents/img/triptico enfrente_.jpg"],
  ["Ver Tríptico (Reverso)", "/Documents/img/triptico atras.jpg"],
];

// Oficio CICTG/PRES/VI/01/2026. Montos en MXN.
const costos = [
  {
    grupo: "Inscripción",
    filas: [
      ["Nuevo Agremiado (Ene–Dic 2026)", "$1,500.00"],
      ["Pasante", "$500.00"],
      ["Estudiante", "$300.00"],
    ],
  },
  {
    grupo: "Reinscripción",
    filas: [
      ["Enero (promoción)", "$2,200.00"],
      ["Febrero a Diciembre", "$2,600.00"],
    ],
  },
  {
    grupo: "Cartas y Sellos",
    filas: [
      ["Carta Propia", "$600.00"],
      ["Carta Ajena*", "$25,000.00"],
      ["Carta Adicional Propia", "$600.00"],
      ["Carta Adicional Ajena", "$700.00"],
      ["Carta DROyC", "$800.00"],
      ["Sello de Planos", "$1,000.00"],
    ],
  },
];

// Oficio CICTG/PRES/VI/02/2026
const cuentas = [
  { banco: "SANTANDER", cuenta: "65508294566", clabe: "0141-0065-5082-945-660" },
  { banco: "BBVA MÉXICO", cuenta: "0112233592", clabe: "0121-0000-1122-335-922" },
];

const facturacion = {
  email: "cictgcontabilidad@gmail.com",
  whatsapp: "961-285-1837",
};

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

function PanelRequisitos() {
  return (
    <>
      <div className="hd-aviso">
        <Pin size={20} aria-hidden="true" />
        <div>
          <p>
            <strong>El trámite de inscripción es 100% presencial</strong> en nuestras oficinas. Descarga,
            imprime y llena tus formatos antes de acudir.
          </p>
          <ul className="hd-aviso-datos">
            <li>
              <MapPin size={15} aria-hidden="true" />
              Calle 11ª Ote. Sur 1056, Col. Maldonado
            </li>
            <li>
              <Clock size={15} aria-hidden="true" />
              Lunes a Viernes 9:00 a 17:00 hrs · Sábados 9:00 a 14:00 hrs
            </li>
          </ul>
        </div>
      </div>

      <h3 className="hd-subtitulo">Requisitos de ingreso</h3>
      <ol className="hd-requisitos">
        {requisitosIngreso.map((requisito) => (
          <li key={requisito}>
            <CheckCircle2 size={18} aria-hidden="true" />
            <span>{requisito}</span>
          </li>
        ))}
      </ol>

      <div className="hd-nota">
        <Info size={18} aria-hidden="true" />
        <p>
          <strong>Notas para cartas:</strong> 2 años de expedición de cédula para solicitar Carta Propia;
          5 años para Carta Ajena. Si perteneció a otro Colegio, anexar carta de no adeudo y renuncia.
        </p>
      </div>

      <h3 className="hd-subtitulo">Formatos oficiales (PDF)</h3>
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

      <h3 className="hd-subtitulo">Tríptico informativo</h3>
      <div className="hd-triptico">
        {triptico.map(([titulo, href]) => (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="hd-btn hd-btn-secondary">
            <Image size={18} aria-hidden="true" />
            {titulo}
          </a>
        ))}
      </div>
    </>
  );
}

function PanelCostos() {
  return (
    <>
      <p className="hd-panel-intro">
        Cuotas oficiales vigentes según el oficio <strong>CICTG/PRES/VI/01/2026</strong>. Montos en pesos mexicanos.
      </p>
      <div className="hd-tabla-wrap">
        <table className="hd-tabla">
          <thead>
            <tr>
              <th scope="col">Concepto</th>
              <th scope="col">Costo</th>
            </tr>
          </thead>
          {costos.map(({ grupo, filas }) => (
            <tbody key={grupo}>
              <tr className="hd-tabla-grupo">
                <th scope="rowgroup" colSpan={2}>
                  {grupo}
                </th>
              </tr>
              {filas.map(([concepto, monto]) => (
                <tr key={concepto}>
                  <td>{concepto}</td>
                  <td>{monto}</td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
      <p className="hd-pie-tabla">* Acuerdo intercolegial.</p>

      <a href="/Documents/img/costos.jpg" target="_blank" rel="noopener noreferrer" className="hd-oficio">
        <img src="/Documents/img/costos.jpg" alt="" loading="lazy" />
        <span>
          <strong>Ver comunicado oficial de costos</strong>
          <small>Abrir imagen en una pestaña nueva</small>
        </span>
        <ExternalLink size={18} aria-hidden="true" />
      </a>
    </>
  );
}

function PanelBancos() {
  return (
    <>
      <p className="hd-panel-intro">
        Cuentas oficiales según el oficio <strong>CICTG/PRES/VI/02/2026</strong>.
      </p>
      <div className="hd-cuentas">
        {cuentas.map(({ banco, cuenta, clabe }) => (
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
          Fiscal y el Uso de CFDI a <a href={`mailto:${facturacion.email}`}>{facturacion.email}</a> o al WhatsApp{" "}
          <a href={`https://wa.me/52${facturacion.whatsapp.replaceAll("-", "")}`} target="_blank" rel="noopener noreferrer">
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

      <a href="/Documents/img/datos bancarios.jpg" target="_blank" rel="noopener noreferrer" className="hd-oficio">
        <img src="/Documents/img/datos bancarios.jpg" alt="" loading="lazy" />
        <span>
          <strong>Ver oficio bancario oficial</strong>
          <small>Abrir imagen en una pestaña nueva</small>
        </span>
        <ExternalLink size={18} aria-hidden="true" />
      </a>
    </>
  );
}

const paneles = {
  requisitos: PanelRequisitos,
  costos: PanelCostos,
  bancos: PanelBancos,
};

// Se monta cada vez que se abre el pop-up, así siempre inicia en la primera pestaña.
function AfiliacionContenido({ onCerrar }) {
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
        <a href={WHATSAPP_DUDAS} target="_blank" rel="noopener noreferrer" className="hd-btn hd-btn-primary">
          <MessageCircle size={18} aria-hidden="true" />
          Tengo dudas sobre mi inscripción
        </a>
      </div>
    </motion.div>
  );
}

function AfiliacionModal({ abierto, onCerrar }) {
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
          <AfiliacionContenido onCerrar={onCerrar} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState(null);

  const afiliacionAbierta = location.hash === AFILIACION_HASH;

  const cerrarMenus = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  const abrirAfiliacion = () => {
    cerrarMenus();
    navigate({ pathname: location.pathname, search: location.search, hash: AFILIACION_HASH }, { state: { afiliacion: true } });
  };

  const cerrarAfiliacion = () => {
    // Si el pop-up se abrió desde este header, regresar en el historial; si llegó por enlace, solo quitar el hash.
    if (location.state?.afiliacion) navigate(-1);
    else navigate({ pathname: location.pathname, search: location.search }, { replace: true });
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar el dropdown al hacer clic fuera del menú
  useEffect(() => {
    if (!openMenu) return undefined;
    const handleClick = (event) => {
      if (!navRef.current?.contains(event.target)) setOpenMenu(null);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [openMenu]);

  // Tecla Escape: cierra primero el pop-up y luego los menús
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key !== "Escape") return;
      if (afiliacionAbierta) cerrarAfiliacion();
      else {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  });

  // Evitar que la página haga scroll detrás del menú móvil o del pop-up
  useEffect(() => {
    if (!mobileOpen && !afiliacionAbierta) return undefined;
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflowPrevio;
    };
  }, [mobileOpen, afiliacionAbierta]);

  const menuActivo = (menu) => menu.links.some(([, href]) => href === location.pathname);

  return (
    <>
      <motion.header
        className={`hd-header ${scrolled ? "is-scrolled" : ""}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="hd-container">
          <Link className="hd-logo" to="/" aria-label="Ir al inicio" onClick={cerrarMenus}>
            <img src={LOGO_SRC} alt="" />
            <span className="hd-logo-text">
              Colegio de Ingenieros
              <br />
              Civiles de Tuxtla Gutiérrez
            </span>
          </Link>

          <nav ref={navRef} className="hd-nav" aria-label="Navegación principal">
            {menus.map((menu) => {
              const abierto = openMenu === menu.label;
              const activo = menuActivo(menu);

              return (
                <div
                  className="hd-dropdown"
                  key={menu.label}
                  onMouseEnter={() => setOpenMenu(menu.label)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <button
                    type="button"
                    className={`hd-navbtn ${activo ? "is-active" : ""} ${abierto ? "is-open" : ""}`}
                    aria-expanded={abierto}
                    aria-controls={menuId(menu.label)}
                    onClick={() => setOpenMenu(abierto ? null : menu.label)}
                  >
                    {menu.label}
                    <ChevronDown size={16} aria-hidden="true" className="hd-chevron" />
                    {activo && (
                      <motion.span
                        layoutId="hd-active-indicator"
                        className="hd-indicator"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>

                  <AnimatePresence>
                    {abierto && (
                      <motion.ul
                        id={menuId(menu.label)}
                        className="hd-menu"
                        initial={{ opacity: 0, y: 10, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                      >
                        {menu.links.map(([label, href], i) => (
                          <MenuLink
                            key={href}
                            label={label}
                            href={href}
                            index={i}
                            current={location.pathname === href}
                            onNavigate={cerrarMenus}
                          />
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          <div className="hd-actions">
            <motion.button
              type="button"
              className="hd-cta"
              onClick={abrirAfiliacion}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              <UserPlus size={17} aria-hidden="true" />
              Afíliate ↗
            </motion.button>

            <button
              type="button"
              className="hd-burger"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={mobileOpen}
              aria-controls="hd-drawer"
            >
              <Menu size={24} aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* El menú móvil y el pop-up van fuera del <header> para que su position: fixed
          no quede atrapado por el transform/backdrop-filter del header. */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="hd-drawer-overlay"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.aside
              id="hd-drawer"
              className="hd-drawer"
              aria-label="Menú de navegación"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
            >
              <div className="hd-drawer-top">
                <span className="hd-logo-text">Menú</span>
                <button type="button" className="hd-burger is-visible" onClick={() => setMobileOpen(false)} aria-label="Cerrar menú">
                  <X size={24} aria-hidden="true" />
                </button>
              </div>

              <nav className="hd-drawer-nav" aria-label="Navegación móvil">
                {menus.map((menu) => {
                  const abierto = mobileSection === menu.label;
                  return (
                    <div className="hd-drawer-section" key={menu.label}>
                      <button
                        type="button"
                        className={`hd-drawer-btn ${menuActivo(menu) ? "is-active" : ""} ${abierto ? "is-open" : ""}`}
                        aria-expanded={abierto}
                        onClick={() => setMobileSection(abierto ? null : menu.label)}
                      >
                        {menu.label}
                        <ChevronDown size={18} aria-hidden="true" className="hd-chevron" />
                      </button>
                      <AnimatePresence initial={false}>
                        {abierto && (
                          <motion.ul
                            className="hd-drawer-links"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22 }}
                          >
                            {menu.links.map(([label, href], i) => (
                              <MenuLink
                                key={href}
                                label={label}
                                href={href}
                                index={i}
                                current={location.pathname === href}
                                onNavigate={cerrarMenus}
                              />
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </nav>

              <div className="hd-drawer-footer">
                <button type="button" className="hd-btn hd-btn-primary" onClick={abrirAfiliacion}>
                  <UserPlus size={18} aria-hidden="true" />
                  Afíliate al Colegio
                </button>
                <a href={`tel:+52${contacto.telefono.replaceAll("-", "")}`} className="hd-drawer-contact">
                  <Phone size={16} aria-hidden="true" />
                  {contacto.telefono}
                </a>
                <a href={`mailto:${contacto.email}`} className="hd-drawer-contact">
                  <Mail size={16} aria-hidden="true" />
                  {contacto.email}
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <AfiliacionModal abierto={afiliacionAbierta} onCerrar={cerrarAfiliacion} />
    </>
  );
}
