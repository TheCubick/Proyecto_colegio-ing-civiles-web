import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Banknote,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock,
  CreditCard,
  FileText,
  GraduationCap,
  ImageOff,
  Laptop,
  Mail,
  MapPin,
  MessageCircle,
  Newspaper,
  Phone,
  Pin,
  Shuffle,
  X,
} from "lucide-react";
import "./CursosCapacitacion.css";

const WHATSAPP_INSCRIPCION =
  "https://wa.me/529611190009?text=Hola,%20me%20gustar%C3%ADa%20inscribirme%20a%20un%20curso%20y%20solicitar%20los%20datos%20bancarios.";

const requisitosInscripcion = [
  "Llenar formato de inscripción impreso.",
  "Identificación Oficial (INE).",
  "Comprobante de pago (Voucher original o impreso).",
];

/*
  Cursos y capacitaciones activas. DATOS DE EJEMPLO: reemplázalos con los cursos reales.
  - modalidad: "Presencial", "En línea" o "Mixta"
  - temario:   (opcional) ruta a un PDF en public/, ej. "/documentos/temario-precios.pdf".
               Si no se indica, no se muestra el botón "Ver temario".
  El botón "Inscribirse" abre el modal con el proceso de inscripción y requisitos.
*/
const cursosData = [
  {
    id: 1,
    img: "/img/paginas/eventos/cursos/curso1.jpg",
    titulo: "Diplomado en Supervisión de Obra Pública",
    fecha: "Inicia: 15 de noviembre de 2026",
    horario: "Sábados, 9:00 AM – 2:00 PM",
    modalidad: "Mixta",
    descripcion: "Especialización enfocada en la normativa actual y control de calidad en obra.",
  },
  {
    id: 2,
    img: "/img/paginas/eventos/cursos/curso2.jpg",
    titulo: "Curso de Análisis de Precios Unitarios",
    fecha: "Inicia: 22 de noviembre de 2026",
    horario: "Martes y jueves, 6:00 PM – 9:00 PM",
    modalidad: "En línea",
    descripcion: "Integración de costos directos, indirectos y financiamiento para presupuestos de obra.",
  },
  {
    id: 3,
    img: "/img/paginas/eventos/cursos/curso3.jpg",
    titulo: "Taller de Bitácora Electrónica de Obra Pública",
    fecha: "5 de diciembre de 2026",
    horario: "Viernes, 4:00 PM – 8:00 PM",
    modalidad: "Presencial",
    descripcion: "Uso práctico de la BEOP: apertura, notas, firmas y cierre de bitácora.",
  },
];

const iconoModalidad = {
  Presencial: MapPin,
  "En línea": Laptop,
  Mixta: Shuffle,
};

// Publicaciones del muro. Las más nuevas van al inicio del arreglo.
const posts = [
  {
    id: 1,
    img: "/img/posts/1.png",
    titulo: "Avance de las nuevas instalaciones",
    texto: "El Ing. Adrián Hernández Hernández encabezó la revisión formal de la primera etapa de construcción de las instalaciones del CICTGZ, verificando el diseño de fachada y los espacios para actividades gremiales.",
  },
  {
    id: 2,
    img: "/img/posts/2.png",
    titulo: "Unidad Gremial e Infraestructura",
    texto: "Participación en la Intercolegial de Colegios de Profesionistas de Chiapas. Destacó la entrega formal de una terna de mujeres profesionistas al gobernador Eduardo Ramírez para la titularidad del INIFECH.",
  },
  {
    id: 3,
    img: "/img/posts/3.png",
    titulo: "Respaldo al Mtro. Jhovani Salazar",
    texto: "El Consejo Directivo acudió a Palacio de Gobierno para respaldar al Mtro. Jhovani Salazar Ruiz tras su renuncia, reconociendo su labor como puente entre el sector profesional y la ciudadanía.",
  },
  {
    id: 4,
    img: "/img/posts/4.png",
    titulo: "XV aniversario de MORENA",
    texto: "Representantes del VI Consejo Directivo asistieron al XV aniversario de MORENA en Tuxtla Gutiérrez, respondiendo al diálogo institucional y al papel clave de la ingeniería civil en el desarrollo del estado.",
  },
  {
    id: 5,
    img: "/img/posts/5.png",
    titulo: "Infraestructura Hídrica",
    texto: "Participación en el Primer Ciclo de Conferencias Técnicas en Materia Hídrica en Oaxaca. El CICTGZ refrendó la importancia de la cooperación para impulsar obras hídricas eficientes.",
  },
  {
    id: 6,
    img: "/img/posts/6.png",
    titulo: "Programa de Desinfección del Agua 2026",
    texto: "El presidente del CICTGZ, Ing. Adrián Hernández, acompañó al gobernador en el arranque del Programa de Desinfección del Agua 2026, reafirmando su agenda técnica con dependencias estatales.",
  },
  {
    id: 7,
    img: "/img/posts/7.png",
    titulo: "Desayuno Intercolegial",
    texto: "Encuentro con presidentes de 14 colegios de profesionistas para analizar temas prioritarios. El CICTGZ dio a conocer la propuesta para la titularidad del INIFECH, impulsando la certeza técnica.",
  },
  {
    id: 8,
    img: "/img/posts/8.png",
    titulo: "Propuesta de sitio web por estudiantes",
    texto: "Estudiantes de Informática de la Universidad Salazar presentaron una propuesta de sitio web para el CICTGZ. Una herramienta para difundir de manera ágil publicaciones y convocatorias.",
  },
];

function PostImagen({ src, alt, className }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`${className} cc-img-vacia`} role="img" aria-label={alt}>
        <ImageOff size={28} aria-hidden="true" />
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} loading="lazy" onError={() => setError(true)} />;
}

function CursoCard({ curso, onInscribirse }) {
  const IconoModalidad = iconoModalidad[curso.modalidad] ?? MapPin;

  return (
    <article className="cc-curso">
      <div className="cc-curso-media">
        <PostImagen src={curso.img} alt={curso.titulo} className="cc-curso-img" />
        <span className="cc-curso-modalidad">
          <IconoModalidad size={14} aria-hidden="true" />
          {curso.modalidad}
        </span>
      </div>
      <div className="cc-curso-body">
        <h3>{curso.titulo}</h3>
        <ul className="cc-curso-meta">
          <li>
            <CalendarDays size={17} aria-hidden="true" />
            {curso.fecha}
          </li>
          <li>
            <Clock size={17} aria-hidden="true" />
            {curso.horario}
          </li>
        </ul>
        <p>{curso.descripcion}</p>
        <div className="cc-curso-actions">
          <button type="button" className="cc-btn" onClick={onInscribirse}>
            Inscribirse
            <ArrowRight size={16} aria-hidden="true" />
          </button>
          {curso.temario && (
            <a href={curso.temario} target="_blank" rel="noopener noreferrer" className="cc-btn cc-btn-outline">
              <FileText size={16} aria-hidden="true" />
              Ver temario
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function PostCard({ post, onAbrir }) {
  return (
    <article className="cc-card">
      <div className="cc-card-media">
        <PostImagen src={post.img} alt={post.titulo} className="cc-card-img" />
      </div>
      <div className="cc-card-body">
        <h3>{post.titulo}</h3>
        <p>{post.texto}</p>
        <button type="button" className="cc-btn" onClick={() => onAbrir(post)}>
          Leer más
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

function PostModal({ post, onCerrar }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (post && !dialog.open) dialog.showModal();
    if (!post && dialog.open) dialog.close();
  }, [post]);

  // Cierra al hacer clic fuera del contenido (en el fondo oscuro)
  const handleClick = (event) => {
    if (event.target === dialogRef.current) onCerrar();
  };

  return (
    <dialog
      ref={dialogRef}
      className="cc-modal"
      onClose={onCerrar}
      onClick={handleClick}
      aria-labelledby="cc-modal-titulo"
    >
      {post && (
        <div className="cc-modal-content">
          <button type="button" className="cc-modal-close" onClick={onCerrar} aria-label="Cerrar">
            <X size={20} aria-hidden="true" />
          </button>
          <PostImagen src={post.img} alt={post.titulo} className="cc-modal-img" />
          <div className="cc-modal-body">
            <h2 id="cc-modal-titulo">{post.titulo}</h2>
            <p>{post.texto}</p>
          </div>
        </div>
      )}
    </dialog>
  );
}

function InscripcionModal({ isOpen, onCerrar }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  // Bloquea el scroll de la página de fondo mientras el modal está abierto
  useEffect(() => {
    if (!isOpen) return undefined;
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflowPrevio;
    };
  }, [isOpen]);

  // Cierra al hacer clic fuera del contenido (en el fondo oscuro)
  const handleClick = (event) => {
    if (event.target === dialogRef.current) onCerrar();
  };

  return (
    <dialog
      ref={dialogRef}
      className="cc-modal cc-insc"
      onClose={onCerrar}
      onClick={handleClick}
      aria-labelledby="cc-insc-titulo"
      aria-describedby="cc-insc-subtitulo"
    >
      {isOpen && (
        <div className="cc-modal-content">
          <button type="button" className="cc-modal-close" onClick={onCerrar} aria-label="Cerrar">
            <X size={20} aria-hidden="true" />
          </button>

          <header className="cc-insc-header">
            <h2 id="cc-insc-titulo">Inscripción a Curso / Capacitación</h2>
            <p id="cc-insc-subtitulo">Proceso de registro y requisitos.</p>
          </header>

          <div className="cc-insc-body">
            <div className="cc-insc-aviso">
              <Pin size={20} aria-hidden="true" />
              <p>
                <strong>Aviso:</strong> Todo proceso de registro, entrega de documentos y control de
                asistencia se realiza <strong>estrictamente de manera presencial</strong> el día de
                inicio del curso en nuestras oficinas.
              </p>
            </div>

            <section className="cc-insc-bloque" aria-labelledby="cc-insc-requisitos">
              <h3 id="cc-insc-requisitos">Requisitos generales</h3>
              <ul className="cc-insc-lista">
                {requisitosInscripcion.map((requisito) => (
                  <li key={requisito}>
                    <CheckCircle2 size={18} aria-hidden="true" />
                    <span>{requisito}</span>
                  </li>
                ))}
                <li>
                  <CheckCircle2 size={18} aria-hidden="true" />
                  <span>
                    <em>(Para descuentos)</em>: Credencial de estudiante vigente o Constancia de
                    agremiado activo.
                  </span>
                </li>
              </ul>
            </section>

            <section className="cc-insc-bloque" aria-labelledby="cc-insc-pago">
              <h3 id="cc-insc-pago">Métodos de pago</h3>
              <div className="cc-insc-pagos">
                <div className="cc-insc-pago">
                  <CreditCard size={22} aria-hidden="true" />
                  <div>
                    <strong>Transferencia Bancaria</strong>
                    <p>Puedes solicitar el número de cuenta oficial vía WhatsApp o correo.</p>
                  </div>
                </div>
                <div className="cc-insc-pago">
                  <Banknote size={22} aria-hidden="true" />
                  <div>
                    <strong>Pago en Efectivo</strong>
                    <p>Directamente en la ventanilla del Colegio.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="cc-insc-bloque" aria-labelledby="cc-insc-contacto">
              <h3 id="cc-insc-contacto">Ubicación y contacto</h3>
              <ul className="cc-insc-lista cc-insc-contacto">
                <li>
                  <MapPin size={18} aria-hidden="true" />
                  <span>Calle 11ª Ote. Sur 1056, Col. Maldonado, Tuxtla Gutiérrez, Chiapas.</span>
                </li>
                <li>
                  <Phone size={18} aria-hidden="true" />
                  <span>
                    <a href="tel:+529616125541">961-612-5541</a> /{" "}
                    <a href="tel:+529611190009">961-119-0009</a>
                  </span>
                </li>
                <li>
                  <Mail size={18} aria-hidden="true" />
                  <a href="mailto:cictgcontabilidad@gmail.com">cictgcontabilidad@gmail.com</a>
                </li>
              </ul>
            </section>
          </div>

          <footer className="cc-insc-footer">
            <a
              href={WHATSAPP_INSCRIPCION}
              target="_blank"
              rel="noopener noreferrer"
              className="cc-btn cc-insc-whatsapp"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Solicitar Información por WhatsApp
            </a>
            <button type="button" className="cc-insc-cerrar" onClick={onCerrar}>
              Cerrar
            </button>
          </footer>
        </div>
      )}
    </dialog>
  );
}

export default function CursosCapacitacion() {
  const [postAbierto, setPostAbierto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="cc-page">
      <section className="cc-hero">
        <div className="cc-container">
          <nav className="cc-breadcrumb cc-animate" aria-label="Ruta de navegación">
            <Link to="/">Inicio</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>Eventos</span>
            <ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page">Cursos y Capacitación</span>
          </nav>
          <h1 className="cc-animate">Cursos, Capacitaciones y Eventos</h1>
          <p className="cc-intro cc-animate">
            Mantente actualizado con las últimas noticias, asambleas y cursos de actualización
            profesional de nuestro colegio.
          </p>
        </div>
      </section>

      <section className="cc-cursos" aria-labelledby="cc-cursos-titulo">
        <div className="cc-container">
          <div className="cc-section-header">
            <GraduationCap size={28} aria-hidden="true" />
            <h2 id="cc-cursos-titulo">Próximos Cursos y Capacitaciones</h2>
          </div>
          {cursosData.length > 0 ? (
            <div className="cc-cursos-lista">
              {cursosData.map((curso) => (
                <CursoCard key={curso.id} curso={curso} onInscribirse={() => setIsModalOpen(true)} />
              ))}
            </div>
          ) : (
            <p className="cc-cursos-vacio">
              Por ahora no hay cursos programados. Consulta esta sección próximamente.
            </p>
          )}
        </div>
      </section>

      <section className="cc-muro" aria-labelledby="cc-muro-titulo">
        <div className="cc-container">
          <div className="cc-section-header">
            <Newspaper size={26} aria-hidden="true" />
            <h2 id="cc-muro-titulo">Noticias recientes</h2>
          </div>
          <div className="cc-grid">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} onAbrir={setPostAbierto} />
            ))}
          </div>
        </div>
      </section>

      <PostModal post={postAbierto} onCerrar={() => setPostAbierto(null)} />
      <InscripcionModal isOpen={isModalOpen} onCerrar={() => setIsModalOpen(false)} />
    </main>
  );
}
