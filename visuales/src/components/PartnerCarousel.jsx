import "./PartnerCarousel.css";

const logos = ["/logo1.png", "/logo2.png", "/logo3.png", "/logo4.png"];

export default function PartnerCarousel() {
  return (
    <section className="carousel-section" aria-label="Convenios institucionales">
      <div className="carousel-track">
        {[...logos, ...logos].map((logo, index) => <div className="slide" key={`${logo}-${index}`}><img src={logo} alt="Logo de institución aliada" /></div>)}
      </div>
    </section>
  );
}
