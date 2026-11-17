<p align="center">
  <img src="visuales/public/img/logos/logo-colegio.png" alt="Colegio de Ingenieros Civiles de Tuxtla Gutiérrez, A.C." width="110">
</p>

# Colegio de Ingenieros Civiles de Tuxtla Gutiérrez, A.C.

Portal institucional para la consulta de trámites, servicios y marco normativo del Colegio, con un estudio administrativo que permite publicar noticias, cursos y asambleas en tiempo real.

<p align="center">
  <img src="visuales/public/img/logos/logo-uni.png" alt="Universidad" height="38">
  &nbsp;&nbsp;&nbsp;
  <img src="visuales/public/img/logos/logo-carrera.png" alt="Licenciatura" height="38">
</p>
<p align="center">
  <img src="https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React 19">
  <img src="https://img.shields.io/badge/Vite_8-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite 8">
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white" alt="Supabase">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3">
</p>

---

## Enfoque del sistema

**Arquitectura híbrida.** El contenido normativo e institucional del Colegio —trámites, servicios, estatutos— vive en módulos de datos locales dentro del propio código. Noticias, Cursos y Asambleas, en cambio, se gestionan de forma dinámica desde el panel `/admin`, con Supabase (PostgreSQL, Storage y Auth) como motor de datos; si no hay conexión configurada, el sitio público sigue mostrando el contenido de respaldo guardado en el repositorio.

**Seguridad y prevención de riesgos.** El diseño del sistema asume que la extorsión y el fraude son un riesgo real para un colegio de profesionales. Por eso los trámites son 100% presenciales, el contacto se canaliza únicamente a los medios oficiales del Colegio, no se expone ningún dato personal de agremiados y el sitio no implementa pasarela de pago alguna: informa, pero nunca cobra ni recibe documentos en línea.

**Accesibilidad y experiencia móvil.** Todo el sistema de diseño está escrito en CSS puro sobre una paleta institucional fija y una tipografía de alto contraste (base de 18px), pensadas para un público adulto que consulta el sitio desde el teléfono. Los listados largos se presentan como carruseles táctiles con `scroll-snap`, probados en iOS y Android.

---

## Mapa funcional

Sitio público:

- Inicio (`/`)
- Trámites — Director Responsable de Obra, Representante Técnico, Dictaminador de Riesgos
- Servicios — Peritos Valuadores, Cálculo Estructural
- Eventos — Cursos y Capacitación, Asambleas, muro de noticias
- Conócenos — Misión y Visión, Comisiones, Estatutos, Servicio Social, Beneficio a la Sociedad
- Afíliate — requisitos, costos y datos bancarios, accesible desde cualquier página

Panel privado:

- `/admin` — estudio de publicación, conectado a Supabase, para editar noticias, cursos y asambleas sin tocar código

---

## Créditos y equipo

Proyecto desarrollado para la asignatura *Desarrollo de Páginas Web*, Universidad Salazar.

| Rol | Integrantes |
| :--- | :--- |
| **Desarrollo Web** | Pablo Ramírez — líder de proyecto y responsable de que todo esto llegara a buen puerto; Daniel Barrera, María Fernanda Uribe |
| **Diseño** | María Fernanda Uribe, Jocelyn Aguilar |
| **Documentación** | Ignacio Moela, Josué Balbuena, José María Orantes |
