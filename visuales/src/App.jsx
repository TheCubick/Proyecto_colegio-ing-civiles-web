import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PartnerCarousel from "./components/PartnerCarousel";
import FeatureCards from "./components/FeatureCards";
import InfoBanner from "./components/InfoBanner";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="main-container">
      <Header />
      <main>
        <Hero />
        <PartnerCarousel />
        <FeatureCards />
        <InfoBanner />
      </main>
      <Footer />
    </div>
  );
}
