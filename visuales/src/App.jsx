import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PartnerCarousel from "./components/PartnerCarousel";
import FeatureCards from "./components/FeatureCards";
import BannerCarrusel from "./components/BannerCarrusel";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="main-container">
      <Header />
      <main>
        <Hero />
        {/* <PartnerCarousel /> */}
        <FeatureCards />
        <BannerCarrusel />
      </main>
      <Footer />
    </div>
  );
}
