import { Clock, Mail, MapPin, MessageCircle, Phone, Pin, X } from "lucide-react";
import { contacto } from "../../../data/contacto";
import useBloquearScroll from "../../../hooks/useBloquearScroll";
import useDialogo from "../../../hooks/useDialogo";
import { enlaceCorreo, enlaceTelefono, enlaceWhatsapp } from "../../../utils/enlaces";
import "./ModalContacto.css";

/*
  VENTANA UNIVERSAL DE CONTACTO Y TRÁMITES (dirección, horario, teléfonos, correo, WhatsApp).
  Los datos salen de src/data/contacto.js.
  Uso: <ModalContacto isOpen={abierto} onClose={() => setAbierto(false)} />
*/
const MENSAJE_WHATSAPP = "Hola, quisiera información sobre los trámites y servicios del Colegio.";

export default function ModalContacto({ isOpen, onClose }) {
  const { dialogRef, cerrarAlClicFuera } = useDialogo(isOpen, onClose);
  useBloquearScroll(isOpen);

  return (
    <dialog
      ref={dialogRef}
      className="mc-modal"
      onClose={onClose}
      onClick={cerrarAlClicFuera}
      aria-labelledby="mc-titulo"
    >
      {isOpen && (
        <div className="mc-content">
          <button type="button" className="mc-close" onClick={onClose} aria-label="Cerrar">
            <X size={20} aria-hidden="true" />
          </button>

          <header className="mc-header">
            <h2 id="mc-titulo">Atención a Colegiados y Público General</h2>
          </header>

          <div className="mc-body">
            <div className="mc-aviso">
              <Pin size={20} aria-hidden="true" />
              <p>
                <strong>Importante:</strong> Para salvaguardar la seguridad de nuestros agremiados y
                asegurar la validez oficial de sus dictámenes, la recepción de documentos y firmas se
                realiza <strong>únicamente de manera presencial</strong> en nuestras instalaciones.
              </p>
            </div>

            <ul className="mc-lista">
              <li>
                <MapPin size={20} aria-hidden="true" />
                <div>
                  <strong>Oficinas</strong>
                  <span>{contacto.direccion.completa}</span>
                </div>
              </li>
              <li>
                <Clock size={20} aria-hidden="true" />
                <div>
                  <strong>Horario</strong>
                  {contacto.horario.map(({ dias, horas }) => (
                    <span key={dias}>
                      {dias} de {horas.replace(" – ", " a ")}
                    </span>
                  ))}
                </div>
              </li>
              <li>
                <Phone size={20} aria-hidden="true" />
                <div>
                  <strong>Teléfonos</strong>
                  <span className="mc-telefonos">
                    {contacto.telefonos.map((telefono) => (
                      <a key={telefono} href={enlaceTelefono(telefono)}>
                        {telefono}
                      </a>
                    ))}
                  </span>
                </div>
              </li>
              <li>
                <Mail size={20} aria-hidden="true" />
                <div>
                  <strong>Correo</strong>
                  <a href={enlaceCorreo(contacto.correo)}>{contacto.correo}</a>
                </div>
              </li>
            </ul>
          </div>

          <footer className="mc-footer">
            <a href={contacto.mapa} target="_blank" rel="noopener noreferrer" className="mc-btn mc-btn-secondary">
              <MapPin size={18} aria-hidden="true" />
              Ver ubicación en Mapa
            </a>
            <a
              href={enlaceWhatsapp(MENSAJE_WHATSAPP)}
              target="_blank"
              rel="noopener noreferrer"
              className="mc-btn mc-btn-primary"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Enviar mensaje por WhatsApp
            </a>
          </footer>
        </div>
      )}
    </dialog>
  );
}
