import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ClipboardCheck, LayoutGrid, Wrench } from "lucide-react";
import { paginasDe } from "../../../config/rutas";
import { extractosCatalogo } from "../../../data/inicio";
import EncabezadoSeccion from "../../ui/EncabezadoSeccion/EncabezadoSeccion";
import "./CatalogoServicios.css";

/*
  CATÁLOGO «TRÁMITES Y SERVICIOS ESPECIALIZADOS» (portada).
  Las tarjetas salen de src/config/rutas.js (grupos «Trámites» y «Servicios»): si se agrega
  una página a esos menús, aparece aquí sola. Extractos: src/data/inicio.js › extractosCatalogo.
  Ley de Hick: filtro «Todos / Trámites / Servicios» para no mostrar todo a la vez si no se quiere.
*/
const CATEGORIAS = [
  { id: "todos", etiqueta: "Todos", icono: LayoutGrid, grupos: ["Trámites", "Servicios"] },
  { id: "tramites", etiqueta: "Trámites oficiales", icono: ClipboardCheck, grupos: ["Trámites"] },
  { id: "servicios", etiqueta: "Servicios y vinculación", icono: Wrench, grupos: ["Servicios"] },
];

const ETIQUETA_GRUPO = { Trámites: "Trámite", Servicios: "Servicio" };
const CURVA = [0.22, 1, 0.36, 1];

export default function CatalogoServicios() {
  const [categoria, setCategoria] = useState("todos");
  const reducir = useReducedMotion();
  const { grupos } = CATEGORIAS.find((c) => c.id === categoria);
  const paginas = paginasDe(...grupos);

  return (
    <section className="cs-section fondo-suave fondo-cuadricula" id="catalogo" aria-labelledby="cs-titulo" tabIndex={-1}>
      <div className="cs-container">
        <EncabezadoSeccion
          id="cs-titulo"
          etiqueta="Trámites y servicios"
          titulo="Trámites y Servicios Especializados"
          subtitulo="Todo lo que el Colegio gestiona y ofrece, en un solo lugar. Elige una opción para ver requisitos y contacto."
        />

        <div className="cs-filtros" role="group" aria-label="Filtrar el catálogo">
          {CATEGORIAS.map(({ id, etiqueta, icono: Icono, grupos: g }) => (
            <button key={id} type="button" className="cs-filtro" aria-pressed={categoria === id} onClick={() => setCategoria(id)}>
              <Icono size={18} aria-hidden="true" />
              {etiqueta}
              <span className="cs-filtro-num">{paginasDe(...g).length}</span>
            </button>
          ))}
        </div>

        <motion.ul className="cs-grid grilla-movil-carrusel" layout={!reducir} aria-live="polite">
          <AnimatePresence mode="popLayout" initial={false}>
            {paginas.map(({ ruta, titulo, descripcion, grupo, icono: Icono }, i) => (
              <motion.li
                key={ruta}
                layout={!reducir}
                initial={reducir ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={reducir ? undefined : { opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: CURVA, delay: reducir ? 0 : (i % 3) * 0.08 }}
              >
                <Link to={ruta} className={`cs-card cs-card--${grupo === "Trámites" ? "tramite" : "servicio"}`}>
                  <span className="cs-card-cabecera">
                    <span className="cs-card-icono" aria-hidden="true">
                      <Icono size={30} strokeWidth={1.75} />
                    </span>
                    <span className="cs-card-categoria">{ETIQUETA_GRUPO[grupo]}</span>
                  </span>
                  <span className="cs-card-titulo">{titulo}</span>
                  <span className="cs-card-texto">{extractosCatalogo[ruta] ?? descripcion}</span>
                  <span className="cs-card-pie">
                    Ver requisitos y contacto
                    <span className="cs-card-flecha" aria-hidden="true">
                      <ArrowUpRight size={18} />
                    </span>
                  </span>
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
