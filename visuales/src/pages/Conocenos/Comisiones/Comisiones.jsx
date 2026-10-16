import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  DraftingCompass,
  HardHat,
  HeartHandshake,
  House,
  Leaf,
  Scale,
  ShieldAlert,
  Trophy,
  Users,
} from "lucide-react";
import "./Comisiones.css";

// "enlace" es opcional: si existe, la tarjeta muestra un acceso a la página del trámite o servicio.
const comisiones = [
  {
    icono: HardHat,
    titulo: "Directores Responsables de Obra (DRO)",
    texto: "Responsables de verificar que las obras cumplan con la normatividad vigente y buenas prácticas.",
    enlace: { to: "/tramites/dro", label: "Ver trámite" },
  },
  {
    icono: BadgeCheck,
    titulo: "Representantes Técnicos (RT)",
    texto: "Ingenieros autorizados ante la Secretaría de la Honestidad y Buen Gobierno con claves de especialidad.",
    enlace: { to: "/tramites/rt", label: "Ver trámite" },
  },
  {
    icono: ShieldAlert,
    titulo: "Dictaminadores de Riesgos",
    texto: "Profesionales que evalúan riesgos de obra consultando el Atlas de Riesgos.",
    enlace: { to: "/tramites/dictaminador-de-riesgos", label: "Ver trámite" },
  },
  {
    icono: House,
    titulo: "Peritos Valuadores",
    texto: "Realizan dictámenes de valor de inmuebles fundamentales para transacciones oficiales.",
    enlace: { to: "/servicios/peritos-valuadores", label: "Ver servicio" },
  },
  {
    icono: DraftingCompass,
    titulo: "Especialistas en Memoria de Cálculo",
    texto: "Ingenieros con maestría en estructuras que dictaminan obras de gran envergadura.",
    enlace: { to: "/servicios/calculo-estructural", label: "Ver servicio" },
  },
  {
    icono: Scale,
    titulo: "Comisión de Honor y Justicia",
    texto: "Encargada de vigilar el correcto desempeño del Colegio y el cumplimiento del código de ética.",
  },
  {
    icono: Leaf,
    titulo: "Comisión Ambiental e Impacto Ecológico",
    texto: "Atiende los temas ambientales y de impacto ecológico relacionados con la ingeniería civil.",
  },
  {
    icono: Trophy,
    titulo: "Comisión de Deportes",
    texto: "Organiza actividades deportivas que fomentan la convivencia entre los agremiados.",
  },
  {
    icono: HeartHandshake,
    titulo: "Comisión de Acción Social",
    texto: "Impulsa acciones del Colegio en beneficio de la comunidad.",
  },
];

export default function Comisiones() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="com-page">
      <section className="com-hero">
        <div className="com-container">
          <nav className="com-breadcrumb com-animate" aria-label="Ruta de navegación">
            <Link to="/">Inicio</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>Conócenos</span>
            <ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page">Comisiones</span>
          </nav>
          <span className="com-badge com-animate">
            <Users size={16} aria-hidden="true" />
            Conócenos
          </span>
          <h1 className="com-animate">Comisiones</h1>
          <p className="com-intro com-animate">
            Contamos con diversas comisiones y especialidades que nos permiten ofrecer servicios
            técnicos especializados ante municipios, dependencias de gobierno y el sector privado.
          </p>
        </div>
      </section>

      <section className="com-section">
        <div className="com-container">
          <div className="com-grid">
            {comisiones.map(({ icono: Icono, titulo, texto, enlace }) => (
              <article className="com-card" key={titulo}>
                <span className="com-card-icon">
                  <Icono size={26} aria-hidden="true" />
                </span>
                <h2>{titulo}</h2>
                <p>{texto}</p>
                {enlace && (
                  <Link to={enlace.to} className="com-card-link">
                    {enlace.label}
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
