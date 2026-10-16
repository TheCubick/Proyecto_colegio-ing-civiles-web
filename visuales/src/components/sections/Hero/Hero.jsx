import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero-section" id="inicio">
      <div className="video-overlay" />
      <video
        className="hero-bg"
        autoPlay
        muted
        loop
        playsInline
        aria-label="Video de presentación del Colegio de Ingenieros Civiles"
      >
        <source src="/videos/home.mp4" type="video/mp4" />
        Tu navegador no soporta la reproducción de video.
      </video>
      <div className="hero-content">
        <div className="hero-text-box">
          <span className="hero-eyebrow hero-anim">Tuxtla Gutiérrez, Chiapas</span>
          <h1>
            <span className="hero-line hero-anim">Colegio de Ingenieros</span>
            <span className="hero-line hero-anim">Civiles de Tuxtla Gutiérrez</span>
          </h1>
          <span className="hero-divider hero-anim" aria-hidden="true" />
          <p className="hero-anim">
            Asociación que promueve la capacitación permanente y la representación ante las instancias
            gubernamentales, para desarrollar la profesión de la Ingeniería Civil con apego al Código de Ética.
          </p>
        </div>
        <div className="hero-logo-large">
          <img src="/img/logos/logo-colegio.png" alt="Logo del Colegio de Ingenieros Civiles" />
        </div>
      </div>
    </section>
  );
}
