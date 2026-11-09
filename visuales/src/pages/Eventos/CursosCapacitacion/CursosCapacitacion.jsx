import { Fragment, useState } from "react";
import {
  ArrowRight,
  Banknote,
  CalendarDays,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  GraduationCap,
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
import { cursos, noticias, requisitosInscripcion } from "../../../data/cursos";
import { contacto } from "../../../data/contacto";
import useBloquearScroll from "../../../hooks/useBloquearScroll";
import useDialogo from "../../../hooks/useDialogo";
import { enlaceCorreo, enlaceTelefono, enlaceWhatsapp } from "../../../utils/enlaces";
import Migas from "../../../components/ui/Migas/Migas";
import ImagenSegura from "../../../components/ui/ImagenSegura/ImagenSegura";
import "./CursosCapacitacion.css";

/*
  PÁGINA «CURSOS Y CAPACITACIÓN».
  Los cursos, las noticias y los requisitos están en src/data/cursos.js.
*/

const MENSAJE_WHATSAPP_INSCRIPCION =
  "Hola, me gustaría inscribirme a un curso y solicitar los datos bancarios.";

const iconoModalidad = {
  Presencial: MapPin,
  "En línea": Laptop,
  Mixta: Shuffle,
};

function CursoCard({ curso, onInscribirse }) {
  const IconoModalidad = iconoModalidad[curso.modalidad] ?? MapPin;

  return (
    <article className="cc-curso">
      <div className="cc-curso-media">
        <ImagenSegura claseVacia="cc-img-vacia" src={curso.img} alt={curso.titulo} className="cc-curso-img" />
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
        <ImagenSegura claseVacia="cc-img-vacia" src={post.img} alt={post.titulo} className="cc-card-img" />
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
  const { dialogRef, cerrarAlClicFuera } = useDialogo(Boolean(post), onCerrar);

  return (
    <dialog
      ref={dialogRef}
      className="cc-modal"
      onClose={onCerrar}
      onClick={cerrarAlClicFuera}
      aria-labelledby="cc-modal-titulo"
    >
      {post && (
        <div className="cc-modal-content">
          <button type="button" className="cc-modal-close" onClick={onCerrar} aria-label="Cerrar">
            <X size={20} aria-hidden="true" />
          </button>
          <ImagenSegura claseVacia="cc-img-vacia" src={post.img} alt={post.titulo} className="cc-modal-img" />
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
  const { dialogRef, cerrarAlClicFuera } = useDialogo(isOpen, onCerrar);
  useBloquearScroll(isOpen);

  return (
    <dialog
      ref={dialogRef}
      className="cc-modal cc-insc"
      onClose={onCerrar}
      onClick={cerrarAlClicFuera}
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
                  <span>{`${contacto.direccion.corta}, Tuxtla Gutiérrez, Chiapas.`}</span>
                </li>
                <li>
                  <Phone size={18} aria-hidden="true" />
                  <span>
                    {contacto.telefonos.slice(0, 2).map((telefono, i) => (
                      <Fragment key={telefono}>
                        {i > 0 && " / "}
                        <a href={enlaceTelefono(telefono)}>{telefono}</a>
                      </Fragment>
                    ))}
                  </span>
                </li>
                <li>
                  <Mail size={18} aria-hidden="true" />
                  <a href={enlaceCorreo(contacto.correoContabilidad)}>{contacto.correoContabilidad}</a>
                </li>
              </ul>
            </section>
          </div>

          <footer className="cc-insc-footer">
            <a
              href={enlaceWhatsapp(MENSAJE_WHATSAPP_INSCRIPCION)}
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

  return (
    <main className="cc-page">
      <section className="cc-hero">
        <div className="cc-container">
          <Migas className="cc-breadcrumb cc-animate" />
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
          {cursos.length > 0 ? (
            <div className="cc-cursos-lista">
              {cursos.map((curso) => (
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
            {noticias.map((post) => (
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