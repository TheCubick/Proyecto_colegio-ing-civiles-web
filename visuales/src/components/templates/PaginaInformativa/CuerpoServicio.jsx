import { HandHeart } from "lucide-react";
import ArticuloEstatuto from "../../ui/ArticuloEstatuto/ArticuloEstatuto";
import BannerContacto from "../../ui/BannerContacto/BannerContacto";
import "./CuerpoServicio.css";

/*
  /conocenos/servicio-social: banner de gratuidad, 3 tarjetas de resumen, los artículos
  de los Estatutos en 2 columnas y el bloque de contacto.
  Datos: data/servicioSocial.js (aviso, resumen, secciones, fuente).
*/
const MENSAJE_WHATSAPP = "Hola, quisiera información sobre el servicio social del Colegio.";

export default function CuerpoServicio({ aviso, resumen = [], secciones = [], fuente }) {
  return (
    <>
      {aviso && (
        <div className="ss-banner">
          <span className="ss-banner-icono" aria-hidden="true">
            <HandHeart size={40} />
          </span>
          <div>
            <h2>{aviso.titulo}</h2>
            <p>{aviso.texto}</p>
          </div>
        </div>
      )}

      {resumen.length > 0 && (
        <ul className="ss-resumen" role="list">
          {resumen.map(({ icono: Icono, titulo, texto }) => (
            <li className="ss-resumen-card" key={titulo}>
              <span className="ss-resumen-icono" aria-hidden="true">
                <Icono size={30} />
              </span>
              <div>
                <h3>{titulo}</h3>
                <p>{texto}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {secciones.length > 0 && (
        <div className="ss-articulos">
          {secciones.map((articulo) => (
            <ArticuloEstatuto key={articulo.id} articulo={articulo} className="ss-articulo" />
          ))}
        </div>
      )}

      {fuente && <p className="ss-fuente">Fuente: {fuente}</p>}

      <BannerContacto
        titulo="Pide informes en nuestras oficinas"
        texto="Atención presencial y por los teléfonos oficiales del Colegio."
        mensajeWhatsapp={MENSAJE_WHATSAPP}
      />
    </>
  );
}
