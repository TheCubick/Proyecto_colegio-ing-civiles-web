import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, ChevronRight, Download, FileClock, FileText, Info, ScrollText } from "lucide-react";
import "./Normateca.css";

/*
  Documentos de la normateca. Guarda los PDF en public/documentos/ y escribe su ruta en "archivo".
  Si "archivo" es null, la tarjeta se muestra como "En elaboración" y sin botón de descarga.
*/
const documentos = [
  {
    icono: ScrollText,
    titulo: "Estatutos del Colegio",
    descripcion: "Documento que establece la organización, objetivos y funcionamiento del Colegio.",
    archivo: "/documentos/estatutos-cictg.pdf",
  },
  {
    icono: FileClock,
    titulo: "Reglamento",
    descripcion: "Reglamento interno del Colegio, actualmente en proceso de elaboración.",
    archivo: null,
  },
  {
    icono: BookOpen,
    titulo: "Normatividades aplicables",
    descripcion: "Normatividades aplicables al ejercicio de la ingeniería civil.",
    archivo: "/documentos/normatividades-ingenieria-civil.pdf",
  },
];

export default function Normateca() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="nor-page">
      <section className="nor-hero">
        <div className="nor-container">
          <nav className="nor-breadcrumb nor-animate" aria-label="Ruta de navegación">
            <Link to="/">Inicio</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>Conócenos</span>
            <ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page">Normateca y Estatutos</span>
          </nav>
          <span className="nor-badge nor-animate">
            <BookOpen size={16} aria-hidden="true" />
            Conócenos
          </span>
          <h1 className="nor-animate">Normateca y Estatutos</h1>
          <p className="nor-intro nor-animate">
            Ponemos a disposición de los interesados los documentos normativos del Colegio de
            Ingenieros Civiles de Tuxtla Gutiérrez, A.C.
          </p>
        </div>
      </section>

      <section className="nor-section">
        <div className="nor-container">
          <div className="nor-grid">
            {documentos.map(({ icono: Icono, titulo, descripcion, archivo }) => (
              <article className={`nor-card nor-doc ${archivo ? "" : "is-pendiente"}`} key={titulo}>
                <div className="nor-doc-file" aria-hidden="true">
                  <Icono size={34} />
                  <span className="nor-doc-ext">PDF</span>
                </div>
                <div className="nor-doc-body">
                  <h2>{titulo}</h2>
                  <p>{descripcion}</p>
                </div>
                {archivo ? (
                  <a href={archivo} download className="nor-btn">
                    <Download size={18} aria-hidden="true" />
                    Descargar PDF
                  </a>
                ) : (
                  <span className="nor-estado">
                    <FileText size={16} aria-hidden="true" />
                    En elaboración
                  </span>
                )}
              </article>
            ))}
          </div>

          <div className="nor-nota">
            <Info size={20} aria-hidden="true" />
            <p>
              ¿Necesitas otro documento del Colegio? Escríbenos a través de los medios de{" "}
              <a href="#contacto">contacto</a>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
