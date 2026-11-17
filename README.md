<div align="center">
  <img src="visuales/public/img/logos/logo-colegio.png" alt="Logo del Colegio de Ingenieros Civiles de Tuxtla Gutiérrez" width="140" />

  <h1>Portal Web del Colegio de Ingenieros Civiles de Tuxtla Gutiérrez A.C.</h1>

  <p>Sitio institucional, moderno y accesible, desarrollado para la asignatura <em>Desarrollo de Páginas Web</em>.</p>

  <table>
    <tr>
      <td align="center"><img src="visuales/public/img/logos/logo-uni.png" alt="Logo Universidad" width="110" /></td>
      <td width="60"></td>
      <td align="center"><img src="visuales/public/img/logos/logo-carrera.png" alt="Logo Licenciatura" width="110" /></td>
    </tr>
  </table>

  ![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![Vite](https://img.shields.io/badge/Vite_8-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
  ![React Router](https://img.shields.io/badge/React_Router_7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
  ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
  ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
  ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
</div>

---

## Índice

1. [Descripción del proyecto](#descripción-del-proyecto)
2. [Stack tecnológico](#stack-tecnológico)
3. [Equipo](#equipo)

---

## Descripción del proyecto

El portal moderniza la presencia digital del Colegio y reúne en un solo lugar la información que hoy se consulta por teléfono o en oficina:

- **Trámites** (100 % presenciales): Director Responsable de Obra (DRO), Representante Técnico (RT) y Dictaminador de Riesgos — qué son, qué funciones realizan y cómo contratar a un agremiado.
- **Servicios**: Peritos Valuadores y Cálculo Estructural.
- **Eventos**: Cursos y Capacitación, Asambleas, y un muro de noticias dinámico publicado desde el panel administrativo.
- **Conócenos**: Misión y Visión, organigrama, Comisiones, Estatutos, Servicio Social gratuito y Beneficio a la Sociedad.
- **Afiliación**: requisitos de ingreso, costos y datos bancarios en un pop-up disponible desde cualquier página.
- **Estudio de publicación** (`/admin`): panel conectado a **Supabase** (autenticación, base de datos y almacenamiento) para que el Colegio publique y edite noticias, cursos y asambleas sin tocar código.

> **Regla de negocio importante:** los trámites siguen siendo **presenciales**. El sitio informa y ofrece los formatos para descargar, pero no recibe documentos. Por seguridad, **no se publican datos de contacto de los agremiados**: las solicitudes de especialistas se canalizan por las oficinas del Colegio.

---

## Stack tecnológico

| Herramienta | Para qué la usamos |
| :--- | :--- |
| ![React](https://img.shields.io/badge/-React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB) | Interfaz construida por componentes. |
| ![Vite](https://img.shields.io/badge/-Vite_8-B73BFE?style=flat-square&logo=vite&logoColor=FFD62E) | Servidor de desarrollo y compilación de producción. |
| ![React Router](https://img.shields.io/badge/-React_Router_7-CA4245?style=flat-square&logo=reactrouter&logoColor=white) | Navegación entre páginas sin recargar (SPA). |
| ![Framer Motion](https://img.shields.io/badge/-Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white) | Animaciones del menú, indicador de sección activa y botón de WhatsApp. |
| ![Lucide React](https://img.shields.io/badge/-Lucide_React-F56565?style=flat-square&logo=lucide&logoColor=white) | Todos los íconos del sitio. |
| ![Swiper](https://img.shields.io/badge/-Swiper-6332F6?style=flat-square&logo=swiper&logoColor=white) | Carrusel de banners en la página de inicio. |
| ![Supabase](https://img.shields.io/badge/-Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white) | Autenticación, base de datos y almacenamiento del panel `/admin`. |
| ![CSS3](https://img.shields.io/badge/-CSS_puro-1572B6?style=flat-square&logo=css3&logoColor=white) | Un archivo `.css` por componente, con prefijo de clase propio. |
| ![Oxlint](https://img.shields.io/badge/-Oxlint-262626?style=flat-square&logo=oxc&logoColor=white) | Revisión automática del código (`npm run lint`). |

Tipografías (Google Fonts): **Montserrat** para títulos y botones, **Open Sans** para textos.

---

## Equipo

| Rol | Integrantes |
| :--- | :--- |
| **Desarrollo Web** | Pablo Ángel Ramírez García (líder), Daniel Barrera, María Fernanda Uribe |
| **Diseño** | María Fernanda Uribe, Jocelyn Aguilar |
| **Documentación** | Ignacio Moela, Josué Balbuena, José María Orantes |
