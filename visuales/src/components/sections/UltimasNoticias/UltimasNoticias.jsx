import { useNavigate } from "react-router-dom";
import useContenidoPublico from "../../../hooks/useContenidoPublico";
import { PostCard } from "../../../pages/Eventos/CursosCapacitacion/TarjetasCursos";
import EncabezadoSeccion from "../../ui/EncabezadoSeccion/EncabezadoSeccion";
import Revelar from "../../ui/Revelar/Revelar";
import "./UltimasNoticias.css";

/*
  «ÚLTIMAS NOTICIAS DEL COLEGIO» (portada): las 3 noticias publicadas más recientes.
  Salen del panel /admin (Supabase) con respaldo en src/data/cursos.js (useContenidoPublico).
  Usa la MISMA tarjeta del muro de noticias; al abrirla lleva a Cursos y Capacitación con
  la noticia ya abierta (#noticia-<id>). Si no hay noticias, la sección no se muestra.
  Se carga aparte (React.lazy en Inicio.jsx) para que la portada abra más rápido.
*/
const RUTA_NOTICIAS = "/eventos/cursos-y-capacitacion";
const CANTIDAD = 3;

export default function UltimasNoticias() {
  const { items } = useContenidoPublico("noticias");
  const navigate = useNavigate();
  const recientes = items.slice(0, CANTIDAD);

  if (recientes.length === 0) return null;

  return (
    <section className="un-section fondo-suave" aria-labelledby="un-titulo">
      <div className="un-container">
        <EncabezadoSeccion
          id="un-titulo"
          etiqueta="Noticias"
          titulo="Últimas Noticias del Colegio"
          subtitulo="Lo más reciente de la vida gremial, la capacitación y la representación del Colegio."
          enlace={{ to: RUTA_NOTICIAS, texto: "Ver todas las noticias y eventos" }}
        />
        <ul className="un-grid cc-page grilla-movil-carrusel">
          {recientes.map((post, i) => (
            <Revelar as="li" key={post.id} retraso={i * 0.12} className="un-item">
              <PostCard post={post} onAbrir={(noticia) => navigate(`${RUTA_NOTICIAS}#noticia-${encodeURIComponent(noticia.id)}`)} />
            </Revelar>
          ))}
        </ul>
      </div>
    </section>
  );
}
