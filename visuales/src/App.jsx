import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import Hero from "./components/sections/Hero";
import FeatureCards from "./components/sections/FeatureCards";
import BannerCarrusel from "./components/sections/BannerCarrusel";
import AtencionWhatsapp from "./components/sections/AtencionWhatsapp";
import Footer from "./components/layout/Footer";
import Asambleas from "./pages/Eventos/Asambleas";
import CursosCapacitacion from "./pages/Eventos/CursosCapacitacion";
import Dro from "./pages/Tramites/Dro";
import Rt from "./pages/Tramites/Rt";
import Dictaminador from "./pages/Tramites/Dictaminador";
import PeritosValuadores from "./pages/Servicios/PeritosValuadores";
import CalculoEstructural from "./pages/Servicios/CalculoEstructural";
import BolsaTrabajo from "./pages/Servicios/BolsaTrabajo";
import MisionVision from "./pages/Conocenos/MisionVision";
import Comisiones from "./pages/Conocenos/Comisiones";
import Normateca from "./pages/Conocenos/Normateca";

function HomePage() {
  return (
    <main>
      <Hero />
      <FeatureCards />
      <BannerCarrusel />
      <AtencionWhatsapp />
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="main-container">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
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
          <Route path="/conocenos/normateca-y-estatutos" element={<Normateca />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
