import { Clock, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { contacto } from "../../../data/contacto";
import { enlaceTelefono, enlaceWhatsapp } from "../../../utils/enlaces";
import "./BannerContacto.css";

/*
  BANNER INSTITUCIONAL DE CONTACTO (cierre de páginas informativas).
  Dirección, horario y teléfono salen de src/data/contacto.js; aquí no se escriben datos.
  Uso: <BannerContacto titulo="…" mensajeWhatsapp="…" />
*/
export default function BannerContacto({ titulo, texto, mensajeWhatsapp = "" }) {
  const [telefono] = contacto.telefonos;

  return (
    <section className="bc-banner" aria-labelledby="bc-titulo">
      <div className="bc-texto">
        <h2 id="bc-titulo">{titulo}</h2>
        {texto && <p>{texto}</p>}
        <ul className="bc-datos">
          <li>
            <MapPin size={20} aria-hidden="true" />
            <span>{contacto.direccion.completa}</span>
          </li>
          {contacto.horario.map(({ dias, horas }) => (
            <li key={dias}>
              <Clock size={20} aria-hidden="true" />
              <span>
                <strong>{dias}:</strong> {horas}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bc-acciones">
        <a href={enlaceWhatsapp(mensajeWhatsapp)} target="_blank" rel="noopener noreferrer" className="bc-btn bc-btn--blanco">
          <MessageCircle size={20} aria-hidden="true" />
          Escribir por WhatsApp
        </a>
        <a href={enlaceTelefono(telefono)} className="bc-btn bc-btn--borde">
          <Phone size={20} aria-hidden="true" />
          Llamar al {telefono}
        </a>
        <a href={contacto.mapa} target="_blank" rel="noopener noreferrer" className="bc-btn bc-btn--borde">
          <Navigation size={20} aria-hidden="true" />
          Cómo llegar
        </a>
      </div>
    </section>
  );
}
