import { ScrollText } from "lucide-react";
import { separarInciso } from "../../ui/ArticuloEstatuto/incisos";
import BannerContacto from "../../ui/BannerContacto/BannerContacto";
import "./CuerpoObjetivos.css";

/*
  /conocenos/beneficio-social: los incisos de un artículo (Art. 9°: 9.1 … 9.8) como tarjetas
  con número e ícono, y un banner de contacto al final.
  El texto de cada tarjeta es el del inciso tal cual (data/estatutos.js); `iconos` está en
  data/beneficioSocial.js.
*/
const MENSAJE_WHATSAPP = "Hola, quisiera información sobre las acciones del Colegio en beneficio de la sociedad.";

export default function CuerpoObjetivos({ articulo, iconos = {}, fuente }) {
  const incisos = articulo.lista.map(separarInciso);

  return (
    <>
      <header className="ob-cabecera">
        <span className="ob-sello" aria-hidden="true">
          <ScrollText size={26} />
        </span>
        <div>
          <p className="ob-articulo">{articulo.articulo}</p>
          <h2>{articulo.titulo}</h2>
        </div>
      </header>

      <ol className="ob-grid grilla-movil-carrusel" role="list">
        {incisos.map(({ marca, texto }) => {
          const Icono = iconos[marca] ?? ScrollText;
          return (
            <li className="ob-card" key={marca ?? texto}>
              <div className="ob-card-top">
                <span className="ob-icono" aria-hidden="true">
                  <Icono size={26} />
                </span>
                {marca && <span className="ob-num">{marca}</span>}
              </div>
              <p>{texto}</p>
            </li>
          );
        })}
      </ol>

      {fuente && <p className="ob-fuente">Fuente: {fuente}</p>}

      <BannerContacto
        titulo="¿Quieres saber más sobre estas acciones del Colegio?"
        texto="Te atendemos en nuestras oficinas y por los canales oficiales."
        mensajeWhatsapp={MENSAJE_WHATSAPP}
      />
    </>
  );
}
