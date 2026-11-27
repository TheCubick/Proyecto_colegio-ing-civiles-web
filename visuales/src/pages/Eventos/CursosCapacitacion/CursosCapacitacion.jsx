import { Fragment, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Banknote,
  CheckCircle2,
  CreditCard,
  GraduationCap,
  Mail,
  MapPin,
  MessageCircle,
  Newspaper,
  Phone,
  Pin,
  X,
} from "lucide-react";
import { requisitosInscripcion } from "../../../data/cursos";
import useContenidoPublico from "../../../hooks/useContenidoPublico";
import { CursoCard, DetalleNoticia, PostCard } from "./TarjetasCursos";
import { contacto } from "../../../data/contacto";
import useBloquearScroll from "../../../hooks/useBloquearScroll";
import useDialogo from "../../../hooks/useDialogo";
import { copiarAlPortapapeles, enlaceCorreo, enlaceTelefono, enlaceWhatsapp } from "../../../utils/enlaces";
import ModalContacto from "../../../components/ui/ModalContacto/ModalContacto";
import Migas from "../../../components/ui/Migas/Migas";
import useRevelarAlBajar from "../../../hooks/useRevelarAlBajar";
import "./CursosCapacitacion.css";

/*
  PÁGINA «CURSOS Y CAPACITACIÓN».
  Cursos y noticias: panel /admin (Supabase) o, de respaldo, src/data/cursos.js (useContenidoPublico).
  Requisitos de inscripción: src/data/cursos.js.
  Cada noticia tiene su enlace (#noticia-<id>): al abrirlo, la ventana de la noticia aparece sola.
*/

const MENSAJE_WHATSAPP_INSCRIPCION =
  "Hola, me gustaría inscribirme a un curso y solicitar los datos bancarios.";

const PREFIJO_NOTICIA = "#noticia-";

/*
  Ventana «Leer más» de una noticia. Se mueve entre noticias sin cerrarse
  (botones «Anterior» / «Siguiente» o flechas ← → del teclado).
*/
function PostModal({ noticias, abiertoId, onAbrir, onCerrar }) {
  const indice = noticias.findIndex((n) => String(n.id) === abiertoId);
  const post = indice >= 0 ? noticias[indice] : null;
  const { dialogRef, cerrarAlClicFuera } = useDialogo(Boolean(post), onCerrar);
  useBloquearScroll(Boolean(post));

  const anterior = indice > 0 ? noticias[indice - 1] : null;
  const siguiente = indice >= 0 && indice < noticias.length - 1 ? noticias[indice + 1] : null;

  const ir = (destino) => {
    if (!destino) return;
    onAbrir(destino);
    dialogRef.current?.scrollTo?.(0, 0);
  };

  const alPulsarTecla = (event) => {
    if (event.key === "ArrowLeft" && anterior) {
      event.preventDefault();
      ir(anterior);
    }
    if (event.key === "ArrowRight" && siguiente) {
      event.preventDefault();
      ir(siguiente);
    }
  };

  const copiarEnlace = () =>
    copiarAlPortapapeles(`${window.location.origin}${window.location.pathname}${PREFIJO_NOTICIA}${encodeURIComponent(post.id)}`);

  return (
    <dialog
      ref={dialogRef}
      className="cc-modal cc-modal--noticia"
      onClose={onCerrar}
      onClick={cerrarAlClicFuera}
      onKeyDown={alPulsarTecla}
      aria-labelledby="cc-modal-titulo"
    >
      {post && (
        <DetalleNoticia
          post={post}
          onCerrar={onCerrar}
          onAnterior={anterior ? () => ir(anterior) : null}
          onSiguiente={siguiente ? () => ir(siguiente) : null}
          onCopiar={copiarEnlace}
          posicion={noticias.length > 1 ? `${indice + 1} de ${noticias.length}` : ""}
        />
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
  useRevelarAlBajar();
  // Cursos y noticias publicados en el panel (/admin); si no hay base, los de src/data/cursos.js
  const { items: cursos } = useContenidoPublico("cursos");
  const { items: noticias } = useContenidoPublico("noticias");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactoAbierto, setContactoAbierto] = useState(false);

  // La noticia abierta vive en el enlace (#noticia-<id>) para poder compartirla
  const location = useLocation();
  const navigate = useNavigate();
  const abiertoId = location.hash.startsWith(PREFIJO_NOTICIA)
    ? decodeURIComponent(location.hash.slice(PREFIJO_NOTICIA.length))
    : null;
  const irA = (hash) => navigate({ pathname: location.pathname, search: location.search, hash }, { replace: true });
  const abrirNoticia = (post) => irA(`${PREFIJO_NOTICIA}${encodeURIComponent(post.id)}`);
  const cerrarNoticia = () => irA("");

  return (
    <main className="cc-page">
      <section className="cc-hero decor-plano">
        <div className="cc-container">
          <Migas className="cc-breadcrumb cc-animate" />
          <h1 className="cc-animate">Cursos, Capacitaciones y Eventos</h1>
          <p className="cc-intro cc-animate">
            Mantente actualizado con las últimas noticias, asambleas y cursos de actualización
            profesional de nuestro colegio.
          </p>
        </div>
      </section>

      <section className="cc-cursos fondo-trazos" aria-labelledby="cc-cursos-titulo">
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
            <div className="cc-cursos-vacio">
              <span className="cc-cursos-vacio-icono" aria-hidden="true">
                <GraduationCap size={36} />
              </span>
              <h3>No hay cursos programados por el momento</h3>
              <p>
                Las convocatorias e inscripciones a cursos se gestionan de forma presencial en las
                oficinas del Colegio. Consulta esta sección próximamente o comunícate con nosotros.
              </p>
              <button type="button" className="cc-btn" onClick={() => setContactoAbierto(true)}>
                <MapPin size={18} aria-hidden="true" />
                Ver ubicación y contacto
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="cc-muro fondo-trazos" aria-labelledby="cc-muro-titulo">
        <div className="cc-container">
          <div className="cc-section-header">
            <Newspaper size={26} aria-hidden="true" />
            <h2 id="cc-muro-titulo">Noticias recientes</h2>
          </div>
          <div className="cc-grid">
            {noticias.map((post) => (
              <PostCard key={post.id} post={post} onAbrir={abrirNoticia} />
            ))}
          </div>
        </div>
      </section>

      <PostModal noticias={noticias} abiertoId={abiertoId} onAbrir={abrirNoticia} onCerrar={cerrarNoticia} />
      <ModalContacto isOpen={contactoAbierto} onClose={() => setContactoAbierto(false)} />
      <InscripcionModal isOpen={isModalOpen} onCerrar={() => setIsModalOpen(false)} />
    </main>
  );
}