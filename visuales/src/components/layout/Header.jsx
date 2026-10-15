import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Header.css";

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

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`navbar ${scrolled ? "nav-scrolled" : ""}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="nav-container">
        <Link className="logo-container" to="/" aria-label="Ir al inicio">
          <img src="/logo.png" alt="" className="nav-logo" />
          <span className="nav-title">
            Colegio de Ingenieros
            <br />
            Civiles de Tuxtla Gutiérrez
          </span>
        </Link>
        <nav className="nav-links" aria-label="Navegación principal">
          {menus.map((menu) => (
            <div className="dropdown" key={menu.label}>
              <button className="dropbtn" type="button">
                {menu.label} <ChevronDown size={16} aria-hidden="true" />
              </button>
              <div className="dropdown-content">
                {menu.links.map(([label, href]) => (
                  <Link to={href} key={href}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <Link to="/#afiliate" className="btn-afiliate">
          Afíliate ↗
        </Link>
      </div>
    </motion.header>
  );
}
