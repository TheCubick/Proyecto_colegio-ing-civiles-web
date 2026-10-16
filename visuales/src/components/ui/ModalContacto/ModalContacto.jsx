import { useEffect, useRef } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone, Pin, X } from "lucide-react";
import "./ModalContacto.css";

const WHATSAPP_URL =
  "https://wa.me/529611190009?text=Hola,%20quisiera%20informaci%C3%B3n%20sobre%20los%20tr%C3%A1mites%20y%20servicios%20del%20Colegio.";

const MAPA_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "Calle 11a Oriente Sur 1056, Col. Maldonado, 29080 Tuxtla Gutiérrez, Chiapas"
)}`;

const CORREO = "colegiodeingenieroscivilestg@gmail.com";
const TELEFONOS = ["961-612-5541", "961-119-0009", "961-114-1636"];

/*
  Modal universal de contacto y trámites.
  Uso: <ModalContacto isOpen={abierto} onClose={() => setAbierto(false)} />
*/
export default function ModalContacto({ isOpen, onClose }) {
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
    if (event.target === dialogRef.current) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="mc-modal"
      onClose={onClose}
      onClick={handleClick}
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
                  <span>Calle 11ª Ote. Sur 1056, Col. Maldonado, C.P. 29080, Tuxtla Gutiérrez, Chiapas.</span>
                </div>
              </li>
              <li>
                <Clock size={20} aria-hidden="true" />
                <div>
                  <strong>Horario</strong>
                  <span>Lunes a Viernes de 9:00 AM a 5:00 PM</span>
                  <span>Sábados de 9:00 AM a 1:00 PM</span>
                </div>
              </li>
              <li>
                <Phone size={20} aria-hidden="true" />
                <div>
                  <strong>Teléfonos</strong>
                  <span className="mc-telefonos">
                    {TELEFONOS.map((tel) => (
                      <a key={tel} href={`tel:+52${tel.replace(/-/g, "")}`}>
                        {tel}
                      </a>
                    ))}
                  </span>
                </div>
              </li>
              <li>
                <Mail size={20} aria-hidden="true" />
                <div>
                  <strong>Correo</strong>
                  <a href={`mailto:${CORREO}`}>{CORREO}</a>
                </div>
              </li>
            </ul>
          </div>

          <footer className="mc-footer">
            <a href={MAPA_URL} target="_blank" rel="noopener noreferrer" className="mc-btn mc-btn-secondary">
              <MapPin size={18} aria-hidden="true" />
              Ver ubicación en Mapa
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mc-btn mc-btn-primary">
              <MessageCircle size={18} aria-hidden="true" />
              Enviar mensaje por WhatsApp
            </a>
          </footer>
        </div>
      )}
    </dialog>
  );
}
