import { Component } from "react";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";

/*
  ESTADO DE ERROR: si una página no se puede cargar (por ejemplo, se cortó el internet
  mientras se descargaba), en lugar de una pantalla en blanco se muestra un aviso
  honesto con «Reintentar» y «Volver al inicio».
  En App.jsx se reinicia al cambiar de ruta (key = ruta actual).
*/
export default class LimiteError extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("Error al mostrar la página:", error, info?.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <main className="estado-error" role="alert">
        <div className="estado-error-caja">
          <span className="estado-error-icono" aria-hidden="true">
            <AlertTriangle size={30} />
          </span>
          <h1>No pudimos cargar esta página</h1>
          <p>Revisa tu conexión a internet e inténtalo de nuevo. Si el problema continúa, comunícate con el Colegio por los teléfonos del pie de página.</p>
          <div className="estado-error-acciones">
            <button type="button" onClick={() => window.location.reload()}>
              <RotateCcw size={18} aria-hidden="true" />
              Reintentar
            </button>
            <a href="/">
              <Home size={18} aria-hidden="true" />
              Volver al inicio
            </a>
          </div>
        </div>
      </main>
    );
  }
}
