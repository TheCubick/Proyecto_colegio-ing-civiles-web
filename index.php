<?php
$titulo_pag = "Inicio | Colegio de Ingenieros Civiles";
include 'components/header.php';
?>

<main class="container page-content">
    <section class="hero" id="novedades">
        <div class="hero-copy">
            <span class="eyebrow eyebrow-light"><span class="eyebrow-dot"></span> Comunidad y profesión</span>
            <h1>Construimos el futuro de la <em>ingeniería civil.</em></h1>
            <p class="lead">Un punto de encuentro para profesionales, estudiantes y empresas que transforman nuestro entorno con responsabilidad.</p>
            <div class="hero-actions">
                <a class="button button-primary" href="#tramites">Conoce nuestros servicios <span aria-hidden="true">↗</span></a>
                <a class="text-link" href="#atencion">Habla con nosotros <span aria-hidden="true">→</span></a>
            </div>
        </div>
        <div class="hero-panel">
            <div class="hero-visual" aria-hidden="true">
                <span class="visual-line visual-line-one"></span>
                <span class="visual-line visual-line-two"></span>
                <span class="visual-dot visual-dot-one"></span>
                <span class="visual-dot visual-dot-two"></span>
                <span class="visual-dot visual-dot-three"></span>
                <span class="visual-grid">C I C<br><small>2024</small></span>
            </div>
            <span class="accent-badge">Colegio de Ingenieros Civiles</span>
            <h2>Tu profesión,<br><strong>en movimiento.</strong></h2>
            <p>Información, orientación y oportunidades para seguir creciendo.</p>
            <div class="panel-mark">CIC <span>◆</span></div>
        </div>
    </section>

    <section class="section" id="tramites">
        <div class="section-heading">
            <div>
                <span class="eyebrow">Lo que hacemos</span>
                <h2>Herramientas para avanzar</h2>
            </div>
            <p>Todo lo que necesitas para ejercer, conectar y mantenerte al día.</p>
        </div>
        <div class="service-grid">
            <article class="service-card service-card-dark">
                <div class="service-icon">01</div>
                <h3>Trámites<br>profesionales</h3>
                <p>Gestiona tus procesos de manera sencilla y clara.</p>
                <a href="#atencion" aria-label="Ver trámites profesionales">Explorar <span aria-hidden="true">↗</span></a>
            </article>
            <article class="service-card service-card-light">
                <div class="service-icon">02</div>
                <h3>Novedades<br>del sector</h3>
                <p>Conoce noticias, eventos y oportunidades relevantes.</p>
                <a href="#novedades" aria-label="Ver novedades del sector">Explorar <span aria-hidden="true">↗</span></a>
            </article>
            <article class="service-card service-card-red">
                <div class="service-icon">03</div>
                <h3>Atención<br>y contacto</h3>
                <p>Estamos listos para resolver tus dudas.</p>
                <a href="#atencion" aria-label="Ir a atención y contacto">Explorar <span aria-hidden="true">↗</span></a>
            </article>
        </div>
    </section>

    <section class="feature-section" id="atencion">
        <div>
            <span class="eyebrow eyebrow-light">Nuestro compromiso</span>
            <h2>Una comunidad que<br>deja <em>huella.</em></h2>
        </div>
        <ul class="feature-list">
            <li><span>→</span> Formación y actualización constante</li>
            <li><span>→</span> Red profesional para crear oportunidades</li>
            <li><span>→</span> Impulso a una ingeniería responsable</li>
        </ul>
    </section>

    <section class="stats-section">
        <div class="stat"><strong>+25</strong><span>Años construyendo<br>comunidad</span></div>
        <div class="stat"><strong>+500</strong><span>Profesionales<br>conectados</span></div>
        <div class="stat"><strong>100%</strong><span>Compromiso con<br>nuestro sector</span></div>
    </section>
</main>

<?php include 'components/footer.php'; ?>
        