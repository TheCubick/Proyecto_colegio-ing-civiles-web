import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import Hero from "./components/sections/Hero";
import FeatureCards from "./components/sections/FeatureCards";
import BannerCarrusel from "./components/sections/BannerCarrusel";
import Footer from "./components/layout/Footer";
import InfoPage from "./pages/InfoPage";
import Asambleas from "./pages/Eventos/Asambleas";
import Dro from "./pages/Tramites/Dro";
import Rt from "./pages/Tramites/Rt";
import Dictaminador from "./pages/Tramites/Dictaminador";
import PeritosValuadores from "./pages/Servicios/PeritosValuadores";
import CalculoEstructural from "./pages/Servicios/CalculoEstructural";
import BolsaTrabajo from "./pages/Servicios/BolsaTrabajo";

const infoRoutes = [
  ["eventos/cursos-y-capacitacion", "Cursos y Capacitación", "Eventos"],
  ["conocenos/mision-y-vision", "Misión y Visión", "Conócenos"],
  ["conocenos/comisiones", "Comisiones", "Conócenos"],
  ["conocenos/normateca-y-estatutos", "Normateca y Estatutos", "Conócenos"],
];

function HomePage() {
  return (
    <main>
      <Hero />
      {/* <PartnerCarousel /> */}
      <FeatureCards />
      <BannerCarrusel />
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
          
          {/* Nueva ruta conectada con tu Header.jsx */}
          <Route path="/eventos/asambleas" element={<Asambleas />} />
          <Route path="/tramites/dro" element={<Dro />} />
          <Route path="/tramites/rt" element={<Rt />} />
          <Route path="/tramites/dictaminador-de-riesgos" element={<Dictaminador />} />
          <Route path="/servicios/peritos-valuadores" element={<PeritosValuadores />} />
          <Route path="/servicios/calculo-estructural" element={<CalculoEstructural />} />
          <Route path="/servicios/bolsa-de-trabajo" element={<BolsaTrabajo />} />
          
          {infoRoutes.map(([path, title, category]) => (
            <Route
              key={path}
              path={`/${path}`}
              element={<InfoPage title={title} category={category} />}
            />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
