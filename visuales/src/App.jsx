import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Inicio from "./pages/Inicio/Inicio";
import Asambleas from "./pages/Eventos/Asambleas/Asambleas";
import CursosCapacitacion from "./pages/Eventos/CursosCapacitacion/CursosCapacitacion";
import Dro from "./pages/Tramites/Dro/Dro";
import Rt from "./pages/Tramites/Rt/Rt";
import Dictaminador from "./pages/Tramites/Dictaminador/Dictaminador";
import PeritosValuadores from "./pages/Servicios/PeritosValuadores/PeritosValuadores";
import CalculoEstructural from "./pages/Servicios/CalculoEstructural/CalculoEstructural";
import BolsaTrabajo from "./pages/Servicios/BolsaTrabajo/BolsaTrabajo";
import MisionVision from "./pages/Conocenos/MisionVision/MisionVision";
import Comisiones from "./pages/Conocenos/Comisiones/Comisiones";

export default function App() {
  return (
    <BrowserRouter>
      <div className="main-container">
        <Header />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/eventos/cursos-y-capacitacion" element={<CursosCapacitacion />} />
          <Route path="/eventos/asambleas" element={<Asambleas />} />
          <Route path="/tramites/dro" element={<Dro />} />
          <Route path="/tramites/rt" element={<Rt />} />
          <Route path="/tramites/dictaminador-de-riesgos" element={<Dictaminador />} />
          <Route path="/servicios/peritos-valuadores" element={<PeritosValuadores />} />
          <Route path="/servicios/calculo-estructural" element={<CalculoEstructural />} />
          <Route path="/servicios/bolsa-de-trabajo" element={<BolsaTrabajo />} />
          <Route path="/conocenos/mision-y-vision" element={<MisionVision />} />
          <Route path="/conocenos/comisiones" element={<Comisiones />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
