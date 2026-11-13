/*
  ESTADO DE CARGA: esqueleto con la forma de una página (portada + tarjetas)
  mientras se descarga su código. Los lectores de pantalla oyen «Cargando página».
  Estilos en src/styles/index.css (.carga, .esqueleto).
*/
export default function CargandoPagina() {
  return (
    <div className="carga" role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">Cargando página…</span>
      <div className="carga-hero" aria-hidden="true">
        <div className="carga-contenedor">
          <span className="esqueleto esqueleto--chip" />
          <span className="esqueleto esqueleto--titulo" />
          <span className="esqueleto esqueleto--linea" />
          <span className="esqueleto esqueleto--linea esqueleto--corta" />
        </div>
      </div>
      <div className="carga-contenedor carga-grid" aria-hidden="true">
        <span className="esqueleto esqueleto--tarjeta" />
        <span className="esqueleto esqueleto--tarjeta" />
        <span className="esqueleto esqueleto--tarjeta" />
      </div>
    </div>
  );
}
