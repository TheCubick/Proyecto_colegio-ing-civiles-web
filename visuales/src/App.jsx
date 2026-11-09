import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { rutas } from "./config/rutas";
import { tramites } from "./data/tramites";
import { servicios } from "./data/servicios";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import ScrollArriba from "./components/layout/ScrollArriba";
import PaginaTramite from "./components/templates/PaginaTramite/PaginaTramite";
import PaginaServicio from "./components/templates/PaginaServicio/PaginaServicio";
import Inicio from "./pages/Inicio/Inicio";
import BolsaTrabajo from "./pages/Servicios/BolsaTrabajo/BolsaTrabajo";
import CursosCapacitacion from "./pages/Eventos/CursosCapacitacion/CursosCapacitacion";
import Asambleas from "./pages/Eventos/Asambleas/Asambleas";
import MisionVision from "./pages/Conocenos/MisionVision/MisionVision";
import Comisiones from "./pages/Conocenos/Comisiones/Comisiones";

/*
  QUÉ SE MUESTRA EN CADA RUTA.
  La lista de rutas (nombres, menús, íconos) está en src/config/rutas.js;
  aquí solo se conecta cada ruta con su componente.
  - Trámites (DRO, RT, Dictaminador): plantilla PaginaTramite + textos de data/tramites.js
  - Peritos y Cálculo:                plantilla PaginaServicio + textos de data/servicios.js
*/
const paginas = {
  "/": <Inicio />,
  "/tramites/dro": <PaginaTramite key="dro" datos={tramites.dro} />,
  "/tramites/rt": <PaginaTramite key="rt" datos={tramites.rt} />,
  "/tramites/dictaminador-de-riesgos": <PaginaTramite key="dictaminador" datos={tramites.dictaminador} />,
  "/servicios/peritos-valuadores": <PaginaServicio key="peritos" datos={servicios.peritos} />,
  "/servicios/calculo-estructural": <PaginaServicio key="calculo" datos={servicios.calculo} />,
  "/servicios/bolsa-de-trabajo": <BolsaTrabajo />,
  "/eventos/cursos-y-capacitacion": <CursosCapacitacion />,
  "/eventos/asambleas": <Asambleas />,
  "/conocenos/mision-y-vision": <MisionVision />,
  "/conocenos/comisiones": <Comisiones />,
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollArriba />
      <div className="main-container">
        <Header />
        <Routes>
          {rutas.map(({ ruta }) => (
            <Route key={ruta} path={ruta} element={paginas[ruta]} />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
