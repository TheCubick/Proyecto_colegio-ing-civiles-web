import "./App.css";
import Header from "./components/layout/Header";
import Hero from "./components/sections/Hero";
import FeatureCards from "./components/sections/FeatureCards";
import BannerCarrusel from "./components/sections/BannerCarrusel";
import Footer from "./components/layout/Footer";

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
