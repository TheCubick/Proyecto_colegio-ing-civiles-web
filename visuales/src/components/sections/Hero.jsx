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
        <source src="/Diseño/videos/home_remaster.mp4" type="video/mp4" />
        Tu navegador no soporta la reproducción de video.
      </video>
      <div className="hero-content">
        <div className="hero-text-box">
          <h1>Colegio de Ingenieros<br />Civiles de Tuxtla Gutiérrez</h1>
          <p>Asociación que promueve la capacitación permanente y la representación ante las instancias gubernamentales, para desarrollar la profesión de la Ingeniería Civil con apego al Código de Ética.</p>
        </div>
        <div className="hero-logo-large"><img src="Diseño/logos/logo_colegio.png" alt="Logo del Colegio de Ingenieros Civiles" /></div>
      </div>
    </section>
  );
}
