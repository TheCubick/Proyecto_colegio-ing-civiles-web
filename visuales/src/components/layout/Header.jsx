import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BadgeCheck,
  BookOpen,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  DraftingCompass,
  FileText,
  GraduationCap,
  HardHat,
  House,
  Mail,
  Menu,
  Phone,
  ShieldAlert,
  Sparkles,
  Target,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { notaCartas, requisitosGenerales } from "../../pages/Tramites/requisitos";
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

function AfiliacionModal({ abierto, onCerrar }) {
  const cerrarRef = useRef(null);

  useEffect(() => {
    if (abierto) cerrarRef.current?.focus();
  }, [abierto]);

  const mailto = `mailto:${contacto.email}?subject=${encodeURIComponent("Solicitud de afiliación al Colegio")}`;

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
                  <h2 id="hd-modal-titulo">Requisitos de Afiliación</h2>
                  <p>Forma parte del Colegio de Ingenieros Civiles de Tuxtla Gutiérrez A.C.</p>
                </div>
              </div>
            </div>

            <div className="hd-modal-body">
              <ul className="hd-modal-requisitos">
                {requisitosGenerales.map((requisito, i) => (
                  <motion.li
                    key={requisito}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + i * 0.04 }}
                  >
                    <CheckCircle2 size={20} aria-hidden="true" />
                    <span>{requisito}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="hd-modal-nota">
                <FileText size={18} aria-hidden="true" />
                <p>
                  {notaCartas.propias}
                  <br />
                  {notaCartas.ajenas}
                </p>
              </div>

              <div className="hd-modal-actions">
                <a href={mailto} className="hd-btn hd-btn-primary">
                  <Mail size={18} aria-hidden="true" />
                  Solicitar afiliación
                </a>
                <a href={`tel:+52${contacto.telefono.replaceAll("-", "")}`} className="hd-btn hd-btn-secondary">
                  <Phone size={18} aria-hidden="true" />
                  {contacto.telefono}
                </a>
              </div>
            </div>
          </motion.div>
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
