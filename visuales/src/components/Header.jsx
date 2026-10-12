import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import "./Header.css";

const menus = [
  { label: "Trámites", links: [["Director Responsable de Obra (DRO)", "#dro"], ["Representante Técnico (RT)", "#rt"], ["Dictaminador de Riesgos", "#riesgos"]] },
  { label: "Servicios", links: [["Peritos Valuadores", "#peritos"], ["Cálculo Estructural", "#calculo"], ["Bolsa de Trabajo", "#bolsa"]] },
  { label: "Eventos", links: [["Cursos y Capacitación", "#cursos"], ["Asambleas", "#asambleas"]] },
  { label: "Conócenos", links: [["Misión y Visión", "#mision"], ["Comisiones", "#comisiones"], ["Normateca y Estatutos", "#normateca"]] },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header className={`navbar ${scrolled ? "nav-scrolled" : ""}`} initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}>
      <div className="nav-container">
        <a className="logo-container" href="#inicio" aria-label="Ir al inicio">
          <img src="/logo.png" alt="" className="nav-logo" />
          <span className="nav-title">Colegio de Ingenieros<br />Civiles de Tuxtla Gutiérrez</span>
        </a>
        <nav className="nav-links" aria-label="Navegación principal">
          {menus.map((menu) => (
            <div className="dropdown" key={menu.label}>
              <button className="dropbtn" type="button">{menu.label} <ChevronDown size={16} aria-hidden="true" /></button>
              <div className="dropdown-content">
                {menu.links.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
              </div>
            </div>
          ))}
        </nav>
        <a href="#afiliate" className="btn-afiliate">Afíliate ↗</a>
      </div>
    </motion.header>
  );
}
