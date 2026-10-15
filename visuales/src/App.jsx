import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import Hero from "./components/sections/Hero";
import FeatureCards from "./components/sections/FeatureCards";
import BannerCarrusel from "./components/sections/BannerCarrusel";
import Footer from "./components/layout/Footer";
import InfoPage from "./pages/InfoPage";

const infoRoutes = [
  ["tramites/dro", "Director Responsable de Obra (DRO)", "Trámites"],
  ["tramites/rt", "Representante Técnico (RT)", "Trámites"],
  ["tramites/dictaminador-de-riesgos", "Dictaminador de Riesgos", "Trámites"],
  ["servicios/peritos-valuadores", "Peritos Valuadores", "Servicios"],
  ["servicios/calculo-estructural", "Cálculo Estructural", "Servicios"],
  ["servicios/bolsa-de-trabajo", "Bolsa de Trabajo", "Servicios"],
  ["eventos/cursos-y-capacitacion", "Cursos y Capacitación", "Eventos"],
  ["eventos/asambleas", "Asambleas", "Eventos"],
  ["conocenos/mision-y-vision", "Misión y Visión", "Conócenos"],
  ["conocenos/comisiones", "Comisiones", "Conócenos"],
  ["conocenos/normateca-y-estatutos", "Normateca y Estatutos", "Conócenos"],
];

function HomePage() {
  return (
    <>
      <main>
        <Hero />
        {/* <PartnerCarousel /> */}
        <FeatureCards />
        <BannerCarrusel />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="main-container">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {infoRoutes.map(([path, title, category]) => (
            <Route
              key={path}
              path={`/${path}`}
              element={<InfoPage title={title} category={category} />}
            />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
