import { Link } from "react-router-dom";
import { ChevronRight, Clock, Mail, MapPin, MessageCircle, Phone, UserPlus } from "lucide-react";
import { paginasDe } from "../../../config/rutas";
import { contacto, LOGO, NOMBRE_COLEGIO, SIGLAS } from "../../../data/contacto";
import { documentosLegales } from "../../../data/documentos";
import { correoLegible, enlaceCorreo, enlaceTelefono, enlaceWhatsapp } from "../../../utils/enlaces";
import { IconoFacebook, IconoInstagram } from "./IconosRedes";
import "./Footer.css";

/*
  PIE DE PÁGINA.
  - Las columnas de enlaces salen de src/config/rutas.js.
  - Teléfonos, correos, horario y delegaciones salen de src/data/contacto.js.
*/

const anioActual = new Date().getFullYear();

const redes = [
  { href: contacto.redes.facebook, etiqueta: "Facebook del Colegio", icono: <IconoFacebook /> },
  { href: contacto.redes.instagram, etiqueta: "Instagram del Colegio", icono: <IconoInstagram /> },
  { href: enlaceWhatsapp(), etiqueta: "Escríbenos por WhatsApp", icono: <MessageCircle size={18} aria-hidden="true" /> },
];

function ColumnaEnlaces({ titulo, paginas }) {
  return (
    <nav className="cic-footer-col" aria-label={titulo}>
      <h2 className="cic-footer-title">{titulo}</h2>
      <ul className="cic-footer-links">
        {paginas.map(({ ruta, titulo: nombre }) => (
          <li key={ruta}>
            <Link to={ruta} className="cic-footer-link">
              <ChevronRight size={15} aria-hidden="true" />
              <span>{nombre}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  return (
    <footer className="cic-footer" id="contacto">
      <div className="cic-footer-inner">
        <div className="cic-footer-grid">
          <section className="cic-footer-col cic-footer-brand">
            <Link to="/" className="cic-footer-logo">
              <img src={LOGO} alt="" width="400" height="404" loading="lazy" decoding="async" />
              <span>
                {SIGLAS}
                <small>{NOMBRE_COLEGIO}</small>
              </span>
            </Link>
            <p className="cic-footer-text">
              Impulsamos el desarrollo técnico, la ética profesional y la representación gremial
              de la ingeniería civil en Chiapas.
            </p>
            <ul className="cic-footer-social">
              {redes.map(({ href, etiqueta, icono }) => (
                <li key={etiqueta}>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={etiqueta} title={etiqueta}>
                    {icono}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <ColumnaEnlaces titulo="Trámites y Servicios" paginas={paginasDe("Trámites", "Servicios")} />

          <div className="cic-footer-col">
            <ColumnaEnlaces titulo="Eventos y El Colegio" paginas={paginasDe("Eventos", "Conócenos")} />
            <Link to="#afiliacion" className="cic-footer-cta">
              Afíliate al Colegio
              <UserPlus size={16} aria-hidden="true" />
            </Link>
          </div>

          <section className="cic-footer-col">
            <h2 className="cic-footer-title">Contacto</h2>
            <ul className="cic-footer-contact">
              <li>
                <MapPin size={18} aria-hidden="true" />
                <div>
                  <span>{contacto.direccion.ciudad}</span>
                  <a href={contacto.mapa} target="_blank" rel="noopener noreferrer" className="cic-footer-inline">
                    Ver en el mapa
                  </a>
                </div>
              </li>
              <li className="cic-footer-telefonos">
                <Phone size={18} aria-hidden="true" />
                <div>
                  <span className="cic-footer-etiqueta">Teléfonos</span>
                  <ul className="cic-footer-phones">
                    {contacto.telefonos.map((telefono) => (
                      <li key={telefono}>
                        <a href={enlaceTelefono(telefono)} className="cic-footer-phone">
                          {telefono}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li>
                <Mail size={18} aria-hidden="true" />
                <div>
                  {[contacto.correo, contacto.correoContabilidad].map((correo) => (
                    <a key={correo} href={enlaceCorreo(correo)} className="cic-footer-inline cic-footer-email">
                      {correoLegible(correo)}
                    </a>
                  ))}
                  <a
                    href={enlaceWhatsapp("", contacto.whatsappContabilidad)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cic-footer-inline"
                  >
                    WhatsApp de contabilidad: {contacto.whatsappContabilidad}
                  </a>
                </div>
              </li>
              <li>
                <Clock size={18} aria-hidden="true" />
                <div>
                  {contacto.horario.map(({ dias, horas }) => (
                    <span key={dias}>
                      <strong>{dias}</strong> {horas}
                    </span>
                  ))}
                </div>
              </li>
            </ul>
            <div className="cic-footer-branches">
              <h3>Delegaciones</h3>
              {contacto.delegaciones.map(({ ciudad, telefonos }) => (
                <p key={ciudad}>
                  <strong>{ciudad}</strong> {telefonos}
                </p>
              ))}
            </div>
          </section>
        </div>

        <div className="cic-footer-bottom">
          <p>© {anioActual} Colegio de Ingenieros Civiles de Tuxtla Gutiérrez, A.C. (CICTGZ). Todos los derechos reservados.</p>
          <nav aria-label="Documentos legales y acceso administrativo">
            <ul>
              {documentosLegales.map(({ titulo, ruta }) => (
                <li key={titulo}>
                  <a href={ruta} target="_blank" rel="noopener noreferrer">
                    {titulo}
                  </a>
                </li>
              ))}
              {/* Enlace discreto al panel del personal del Colegio (/admin) */}
              <li>
                <Link to="/admin" className="cic-footer-admin" rel="nofollow">
                  Acceso administrativo
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
