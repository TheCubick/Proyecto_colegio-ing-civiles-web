<?php
$titulo_pag = "Inicio | Colegio de Ingenieros Civiles";
include 'components/header.php';
?>

<main>
    <section class="particle-hero relative bg-neutral-950 text-white min-h-[85vh] flex items-center overflow-hidden border-b-4 border-red-700" id="novedades">
        <div class="max-w-7xl mx-auto px-6 py-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div class="z-10 space-y-6 text-center lg:text-left">
                <span class="inline-block bg-red-900/60 border border-red-500/40 text-red-200 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    📍 Tuxtla Gutiérrez, Chiapas
                </span>
                <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                    Colegio de <br>
                    <span class="text-red-500">Ingenieros Civiles</span>
                </h1>
                <p class="text-neutral-400 text-base md:text-lg max-w-lg leading-relaxed mx-auto lg:mx-0">
                    Impulsando la innovación técnica, el desarrollo de infraestructura sustentable y la colegiación profesional en Chiapas.
                </p>
                <div class="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
                    <a href="#tramites" class="bg-red-700 hover:bg-red-600 text-white font-medium px-6 py-3 rounded-lg shadow-lg shadow-red-900/40 transition-all">
                        Trámites y Colegiación
                    </a>
                    <a href="#padron" class="bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-700 font-medium px-6 py-3 rounded-lg transition-all">
                        Directorio Profesional
                    </a>
                </div>
            </div>

            <div class="relative w-full h-[450px] md:h-[550px] flex items-center justify-center">
                <div id="canvas-particles" class="w-full h-full cursor-grab active:cursor-grabbing" aria-label="Visualización animada de partículas institucionales"></div>
            </div>
        </div>
    </section>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="js/particles.js"></script>

    <div class="container page-content">
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

    <section class="stats-section" id="padron">
        <div class="stat"><strong>+25</strong><span>Años construyendo<br>comunidad</span></div>
        <div class="stat"><strong>+500</strong><span>Profesionales<br>conectados</span></div>
        <div class="stat"><strong>100%</strong><span>Compromiso con<br>nuestro sector</span></div>
    </section>
    </div>
</main>

<?php include 'components/footer.php'; ?>
        