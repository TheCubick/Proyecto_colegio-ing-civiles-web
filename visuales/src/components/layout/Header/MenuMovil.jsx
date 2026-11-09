import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Mail, Phone, UserPlus, X } from "lucide-react";
import { menus } from "../../../config/rutas";
import { contacto } from "../../../data/contacto";
import { enlaceCorreo, enlaceTelefono } from "../../../utils/enlaces";
import MenuEnlace from "./MenuEnlace";

/*
  Menú lateral del celular (se abre con el botón de tres rayas).
  Va fuera del <header> para que su position: fixed no quede atrapado
  por el transform/backdrop-filter del header.
*/
export default function MenuMovil({ abierto, onCerrar, rutaActual, grupoActivo, onAfiliacion }) {
  const [seccion, setSeccion] = useState(null);

  return (
    <AnimatePresence>
      {abierto && (
        <>
          <motion.div
            className="hd-drawer-overlay"
            onClick={onCerrar}
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
              <button type="button" className="hd-burger is-visible" onClick={onCerrar} aria-label="Cerrar menú">
                <X size={24} aria-hidden="true" />
              </button>
            </div>

            <nav className="hd-drawer-nav" aria-label="Navegación móvil">
              {menus.map(({ grupo, paginas }) => {
                const desplegado = seccion === grupo;
                return (
                  <div className="hd-drawer-section" key={grupo}>
                    <button
                      type="button"
                      className={`hd-drawer-btn ${grupoActivo(paginas) ? "is-active" : ""} ${desplegado ? "is-open" : ""}`}
                      aria-expanded={desplegado}
                      onClick={() => setSeccion(desplegado ? null : grupo)}
                    >
                      {grupo}
                      <ChevronDown size={18} aria-hidden="true" className="hd-chevron" />
                    </button>
                    <AnimatePresence initial={false}>
                      {desplegado && (
                        <motion.ul
                          className="hd-drawer-links"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22 }}
                        >
                          {paginas.map((pagina, i) => (
                            <MenuEnlace
                              key={pagina.ruta}
                              pagina={pagina}
                              indice={i}
                              actual={rutaActual === pagina.ruta}
                              onNavegar={onCerrar}
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
              <button type="button" className="hd-btn hd-btn-primary" onClick={onAfiliacion}>
                <UserPlus size={18} aria-hidden="true" />
                Afíliate al Colegio
              </button>
              <a href={enlaceTelefono(contacto.telefonos[0])} className="hd-drawer-contact">
                <Phone size={16} aria-hidden="true" />
                {contacto.telefonos[0]}
              </a>
              <a href={enlaceCorreo(contacto.correo)} className="hd-drawer-contact">
                <Mail size={16} aria-hidden="true" />
                {contacto.correo}
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
