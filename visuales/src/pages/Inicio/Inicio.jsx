import { lazy, Suspense } from "react";
import Hero from "../../components/sections/Hero/Hero";
import FeatureCards from "../../components/sections/FeatureCards/FeatureCards";
import CatalogoServicios from "../../components/sections/CatalogoServicios/CatalogoServicios";
import DatosColegio from "../../components/sections/DatosColegio/DatosColegio";
import ConoceColegio from "../../components/sections/ConoceColegio/ConoceColegio";
import BannerCarrusel from "../../components/sections/BannerCarrusel/BannerCarrusel";
import AtencionWhatsapp from "../../components/sections/AtencionWhatsapp/AtencionWhatsapp";

/*
  PORTADA (/). Orden pensado como recorrido:
  1. Hero (quiénes somos + 2 acciones) → 2. 4 tarjetas rojas → 3. catálogo de trámites y servicios
  (todo lo de los menús, a la vista) → 4. cifras oficiales → 5. «Conócenos» → 6. carrusel de
  actividades → 7. últimas noticias (Supabase) → 8. dudas y buzón.
  Las noticias se cargan aparte (lazy): traen el cliente de la base y no frenan la primera pantalla.
*/
const UltimasNoticias = lazy(() => import("../../components/sections/UltimasNoticias/UltimasNoticias"));

export default function Inicio() {
  return (
    <main>
      <Hero />
      <FeatureCards />
      <CatalogoServicios />
      <DatosColegio />
      <ConoceColegio />
      <BannerCarrusel />
      <Suspense fallback={null}>
        <UltimasNoticias />
      </Suspense>
      <AtencionWhatsapp />
    </main>
  );
}
