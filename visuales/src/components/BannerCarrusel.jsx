import React from 'react';
// Importamos los estilos base de Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './BannerCarrusel.css';

export default function BannerCarrusel() {
return (
<section className="carrusel-section">
    
    {/* TEXTO DE FONDO FIJO */}
    <div className="carrusel-texto-fondo">
    <h2>COLEGIO DE INGENIEROS CIVILES</h2>
    <p>Promoviendo la capacitación permanente y representación del gremio.</p>
    </div>

    {/* EL CARRUSEL QUE SE DESLIZA */}
    <div className="carrusel-contenedor">
    <Swiper
        modules={[Navigation, Pagination, Autoplay]} // Activamos los módulos
        spaceBetween={30} // Espacio entre fotos
        slidesPerView={1} // Cuántas fotos se ven a la vez
        navigation={true} // Muestra flechas (botones) a los lados
        pagination={{ clickable: true }} // Muestra puntitos abajo
        autoplay={{
        delay: 4000, // Se mueve cada 4 segundos (4000 milisegundos)
        disableOnInteraction: false, // No se detiene si el usuario hace clic
        }}
        loop={true} // Vuelve a empezar cuando llega al final
        className="mi-swiper"
    >
        {/* FOTO 1 */}
        <SwiperSlide>
        <div className="slide-content">
            <img src="/Diseño/banners/1.png" alt="Evento 1" />
            <div className="slide-overlay">
            <h3>Asamblea General</h3>
            </div>
        </div>
        </SwiperSlide>

        {/* FOTO 2 */}
        <SwiperSlide>
        <div className="slide-content">
            <img src="/Diseño/banners/2.png" alt="Firma de Convenio" />
            <div className="slide-overlay">
            <h3>Firma de Convenios</h3>
            </div>
        </div>
        </SwiperSlide>

        {/* FOTO 3 */}
        <SwiperSlide>
        <div className="slide-content">
            <img src="/Diseño/banners/3.png" alt="Capacitación" />
            <div className="slide-overlay">
            <h3>Cursos de Actualización</h3>
            </div>
        </div>
        </SwiperSlide>

    </Swiper>
    </div>
</section>
);
}