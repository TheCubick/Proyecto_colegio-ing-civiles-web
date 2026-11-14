import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { rutas } from "./config/rutas";
import { tramites } from "./data/tramites";
import { servicios } from "./data/servicios";
import { servicioSocial } from "./data/servicioSocial";
import { beneficioSocial } from "./data/beneficioSocial";
import { paginaEstatutos } from "./data/estatutos";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import ScrollArriba from "./components/layout/ScrollArriba";
import Inicio from "./pages/Inicio/Inicio";
import CargandoPagina from "./components/ui/EstadosPagina/CargandoPagina";
import LimiteError from "./components/ui/EstadosPagina/LimiteError";

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
// Panel administrativo: paquete aparte, nunca se descarga en las visitas normales.
const PanelAdmin = lazy(() => import("./pages/Admin/PanelAdmin"));

/*
  QUÉ SE MUESTRA EN CADA RUTA.
  La lista de rutas (nombres, menús, íconos) está en src/config/rutas.js;
  aquí solo se conecta cada ruta con su componente.
  - Trámites (DRO, RT, Dictaminador): plantilla PaginaTramite + textos de data/tramites.js
  - Peritos y Cálculo:                plantilla PaginaServicio + textos de data/servicios.js
  - Estatutos, Servicio Social y
    Beneficio a la Sociedad:          plantilla PaginaInformativa + data/estatutos.js, data/servicioSocial.js
                                      y data/beneficioSocial.js (estas dos solo existen si tienen contenido)
  - Cualquier otra dirección:         página 404 (pages/NoEncontrada)
  - /admin:                           panel administrativo (pages/Admin), a pantalla completa,
                                      sin el Header ni el Footer públicos y fuera de los menús.
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
  "/conocenos/estatutos": <PaginaInformativa key="estatutos" datos={paginaEstatutos} />,
  "/conocenos/servicio-social": <PaginaInformativa key="servicio-social" datos={servicioSocial} />,
  "/conocenos/beneficio-social": <PaginaInformativa key="beneficio-social" datos={beneficioSocial} />,
};

// Contenido de cada página con sus estados: carga (esqueleto) y error (si no se pudo descargar).
// El límite de error se reinicia al cambiar de ruta.
function ContenidoPagina() {
  const { pathname } = useLocation();

  return (
    <div id="contenido" tabIndex={-1}>
      <LimiteError key={pathname}>
        <Suspense fallback={<CargandoPagina />}>
          <Routes>
            {rutas.map(({ ruta }) => (
              <Route key={ruta} path={ruta} element={paginas[ruta]} />
            ))}
            <Route path="*" element={<NoEncontrada />} />
          </Routes>
        </Suspense>
      </LimiteError>
    </div>
  );
}

function Sitio() {
  const { pathname } = useLocation();

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return (
      <LimiteError>
        <Suspense fallback={<div className="adm-verificando" role="status">Cargando el panel…</div>}>
          <PanelAdmin />
        </Suspense>
      </LimiteError>
    );
  }

  return (
    <>
      {/* Primer elemento con Tab: salta el menú y va directo al contenido */}
      <a className="saltar-contenido" href="#contenido">
        Saltar al contenido
      </a>
      <div className="main-container">
        <Header />
        <ContenidoPagina />
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollArriba />
      <Sitio />
    </BrowserRouter>
  );
}
