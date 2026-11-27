import Migas from "../../../components/ui/Migas/Migas";
import useContenidoPublico from "../../../hooks/useContenidoPublico";
import AsambleaCard from "./AsambleaCard";
import useRevelarAlBajar from "../../../hooks/useRevelarAlBajar";
import "./Asambleas.css";

// PÁGINA «ASAMBLEAS». Asambleas publicadas en el panel /admin (Supabase) o, de respaldo,
// las de src/data/asambleas.js (useContenidoPublico). Se ordenan de la más reciente a la más antigua.
const masReciente = (a, b) => (b.fecha ?? "").localeCompare(a.fecha ?? "");

export default function Asambleas() {
  useRevelarAlBajar();
  const { items } = useContenidoPublico("asambleas");
  const ordenadas = [...items].sort(masReciente);

  return (
    <div className="asm-page">
      <main>
        <header className="asm-hero decor-plano decor-plano--edificio">
          <div className="asm-container">
            <Migas className="asm-breadcrumb" />
            <h1>Asambleas</h1>
            <p>
              Memoria de las sesiones ordinarias y extraordinarias del Colegio: temas tratados,
              acuerdos tomados y fotografías de cada asamblea.
            </p>
          </div>
        </header>

        <section className="asm-listado asm-container fondo-trazos" aria-label="Asambleas realizadas">
          {ordenadas.length > 0 ? (
            ordenadas.map((asamblea) => <AsambleaCard key={asamblea.id} asamblea={asamblea} />)
          ) : (
            <p className="asm-vacio">Próximamente publicaremos información de las asambleas.</p>
          )}
        </section>
      </main>
    </div>
  );
}
