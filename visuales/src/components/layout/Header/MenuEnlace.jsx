import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

/*
  Un enlace dentro de un menú desplegable (escritorio) o del menú del celular.
  Recibe una página de src/config/rutas.js ({ ruta, titulo, icono }).
*/
export default function MenuEnlace({ pagina, actual, onNavegar, indice = 0 }) {
  const Icono = pagina.icono ?? FileText;

  return (
    <motion.li
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: indice * 0.04, duration: 0.2 }}
    >
      <Link
        to={pagina.ruta}
        className={`hd-menu-link ${actual ? "is-current" : ""}`}
        aria-current={actual ? "page" : undefined}
        onClick={onNavegar}
      >
        <span className="hd-menu-icon">
          <Icono size={18} aria-hidden="true" />
        </span>
        <span>{pagina.titulo}</span>
      </Link>
    </motion.li>
  );
}
