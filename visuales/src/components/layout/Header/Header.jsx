import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, UserPlus } from "lucide-react";
import { menus, RUTAS_CON_PORTADA } from "../../../config/rutas";
import { LOGO, NOMBRE_COLEGIO, SIGLAS } from "../../../data/contacto";
import useBloquearScroll from "../../../hooks/useBloquearScroll";
import MenuEnlace from "./MenuEnlace";
import MenuMovil from "./MenuMovil";
import "./Header.css";

/*
  BARRA SUPERIOR DEL SITIO: logo, menús desplegables, botón «Afíliate» y menú del celular.
  - Los menús salen de src/config/rutas.js (no se escriben aquí).
  - El menú del celular está en MenuMovil.jsx y cada enlace en MenuEnlace.jsx.
  - El pop-up «Afíliate» está en components/ui/ModalAfiliacion.
  - Letras del menú siempre blancas; solo cambia el fondo (especificación en CLAUDE.md):
      · página con video/imagen de portada y arriba del todo → velo oscuro degradado (hd-sobre-media);
      · página sin portada, o cualquier página al bajar → rojo institucional (hd-solido).
    Las páginas con portada se marcan con `portada: true` en src/config/rutas.js.
*/

// Cualquier enlace a "#afiliacion" (por ejemplo, desde el footer) abre el pop-up de afiliación.
const AFILIACION_HASH = "#afiliacion";

// El pop-up «Afíliate» se descarga solo la primera vez que se abre (carga diferida, F2-MF3).
const ModalAfiliacion = lazy(() => import("../../ui/ModalAfiliacion/ModalAfiliacion"));

const menuId = (grupo) => `hd-menu-${grupo.normalize("NFD").replace(/[^\w]/g, "").toLowerCase()}`;

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(null);
  const [movilAbierto, setMovilAbierto] = useState(false);

  const afiliacionAbierta = location.hash === AFILIACION_HASH;
  // Una vez abierto, el pop-up se queda montado para conservar su animación de cierre.
  const [modalCargado, setModalCargado] = useState(afiliacionAbierta);
  if (afiliacionAbierta && !modalCargado) setModalCargado(true);

  const cerrarMenus = () => {
    setMenuAbierto(null);
    setMovilAbierto(false);
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

  // El header se compacta al bajar más de 40px
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar el dropdown al hacer clic fuera del menú
  useEffect(() => {
    if (!menuAbierto) return undefined;
    const handleClick = (event) => {
      if (!navRef.current?.contains(event.target)) setMenuAbierto(null);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuAbierto]);

  // Tecla Escape: cierra primero el pop-up y luego los menús
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key !== "Escape") return;
      if (afiliacionAbierta) cerrarAfiliacion();
      else cerrarMenus();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  });

  // Evitar que la página haga scroll detrás del menú móvil o del pop-up
  useBloquearScroll(movilAbierto || afiliacionAbierta);

  const sobreMedia = RUTAS_CON_PORTADA.includes(location.pathname) && !scrolled;

  const grupoActivo = (paginas) => paginas.some(({ ruta }) => ruta === location.pathname);

  return (
    <>
      <motion.header
        className={`hd-header ${sobreMedia ? "hd-sobre-media" : "hd-solido"} ${scrolled ? "is-scrolled" : ""}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="hd-container">
          <Link className="hd-logo" to="/" aria-label="Ir al inicio" onClick={cerrarMenus}>
            <img src={LOGO} alt="" />
            <span className="hd-logo-text">
              <strong>{SIGLAS}</strong>
              <small>{NOMBRE_COLEGIO}</small>
            </span>
          </Link>

          <nav ref={navRef} className="hd-nav" aria-label="Navegación principal">
            {menus.map(({ grupo, paginas }) => {
              const desplegado = menuAbierto === grupo;
              const activo = grupoActivo(paginas);

              return (
                <div
                  className="hd-dropdown"
                  key={grupo}
                  onMouseEnter={() => setMenuAbierto(grupo)}
                  onMouseLeave={() => setMenuAbierto(null)}
                >
                  <button
                    type="button"
                    className={`hd-navbtn ${activo ? "is-active" : ""} ${desplegado ? "is-open" : ""}`}
                    aria-expanded={desplegado}
                    aria-controls={menuId(grupo)}
                    onClick={() => setMenuAbierto(desplegado ? null : grupo)}
                  >
                    {grupo}
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
                    {desplegado && (
                      <motion.ul
                        id={menuId(grupo)}
                        className="hd-menu"
                        initial={{ opacity: 0, y: 10, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                      >
                        {paginas.map((pagina, i) => (
                          <MenuEnlace
                            key={pagina.ruta}
                            pagina={pagina}
                            indice={i}
                            actual={location.pathname === pagina.ruta}
                            onNavegar={cerrarMenus}
                            conDescripcion
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
              Afíliate
            </motion.button>

            <button
              type="button"
              className="hd-burger"
              onClick={() => setMovilAbierto(true)}
              aria-label="Abrir menú"
              aria-expanded={movilAbierto}
              aria-controls="hd-drawer"
            >
              <Menu size={24} aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.header>

      <MenuMovil
        abierto={movilAbierto}
        onCerrar={() => setMovilAbierto(false)}
        rutaActual={location.pathname}
        grupoActivo={grupoActivo}
        onAfiliacion={abrirAfiliacion}
      />

      {modalCargado && (
        <Suspense fallback={null}>
          <ModalAfiliacion abierto={afiliacionAbierta} onCerrar={cerrarAfiliacion} />
        </Suspense>
      )}
    </>
  );
}
