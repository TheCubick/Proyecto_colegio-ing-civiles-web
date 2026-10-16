import Hero from "../../components/sections/Hero/Hero";
import FeatureCards from "../../components/sections/FeatureCards/FeatureCards";
import BannerCarrusel from "../../components/sections/BannerCarrusel/BannerCarrusel";
import AtencionWhatsapp from "../../components/sections/AtencionWhatsapp/AtencionWhatsapp";

export default function Inicio() {
  return (
    <main>
      <Hero />
      <FeatureCards />
      <BannerCarrusel />
      <AtencionWhatsapp />
    </main>
  );
}
