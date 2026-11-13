import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { rutas } from "./config/rutas";
import { tramites } from "./data/tramites";
import { servicios } from "./data/servicios";
import { servicioSocial } from "./data/servicioSocial";
import { beneficioSocial } from "./data/beneficioSocial";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import ScrollArriba from "./components/layout/ScrollArriba";
import Inicio from "./pages/Inicio/Inicio";

// Carga diferida: cada página se descarga solo cuando se visita (Inicio va en el paquete principal).
const PaginaTramite = lazy(() => import("./components/templates/PaginaTramite/PaginaTramite"));
const PaginaServicio = lazy(() => import("./components/templates/PaginaServicio/PaginaServicio"));
const PaginaInformativa = lazy(() => import("./components/templates/PaginaInformativa/PaginaInformativa"));
const BolsaTrabajo = lazy(() => import("./pages/Servicios/BolsaTrabajo/BolsaTrabajo"));
const CursosCapacitacion = lazy(() => import("./pages/Eventos/CursosCapacitacion/CursosCapacitacion"));
const Asambleas = lazy(() => import("./pages/Eventos/Asambleas/Asambleas"));
const MisionVision = lazy(() => import("./pages/Conocenos/MisionVision/MisionVision"));
const Comisiones = lazy(() => import("./pages/Conocenos/Comisiones/Comisiones"));
const NoEncontrada = lazy(() => import("./pages/NoEncontrada/NoEncontrada"));

/*
  QUÉ SE MUESTRA EN CADA RUTA.
  La lista de rutas (nombres, menús, íconos) está en src/config/rutas.js;
  aquí solo se conecta cada ruta con su componente.
  - Trámites (DRO, RT, Dictaminador): plantilla PaginaTramite + textos de data/tramites.js
  - Peritos y Cálculo:                plantilla PaginaServicio + textos de data/servicios.js
  - Servicio Social y Beneficio:      plantilla PaginaInformativa + data/servicioSocial.js y
                                      data/beneficioSocial.js (solo existen si tienen contenido)
  - Cualquier otra dirección:         página 404 (pages/NoEncontrada)
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
  "/conocenos/servicio-social": <PaginaInformativa key="servicio-social" datos={servicioSocial} />,
  "/conocenos/beneficio-social": <PaginaInformativa key="beneficio-social" datos={beneficioSocial} />,
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollArriba />
      <div className="main-container">
        <Header />
        <Suspense fallback={<p className="cargando">Cargando…</p>}>
          <Routes>
            {rutas.map(({ ruta }) => (
              <Route key={ruta} path={ruta} element={paginas[ruta]} />
            ))}
            <Route path="*" element={<NoEncontrada />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
