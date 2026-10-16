<div align="center">
  <table>
    <tr>
      <td align="center"><img src="visuales/public/img/logos/logo-uni.png" alt="Logo Universidad" width="150" /></td>
      <td width="100"></td> <!-- Espaciador -->
      <td align="center"><img src="visuales/public/img/logos/logo-carrera.png" alt="Logo Licenciatura" width="150" /></td>
    </tr>
  </table>

  <h1>🏗️ PROYECTO ESCOLAR</h1>
  <h3>Colegio de Ingenieros Civiles de Tuxtla Gutiérrez A.C.</h3>
</div>

<br>

Este proyecto forma parte de la asignatura ***"Desarrollo de Páginas Web"***. El objetivo principal es plantear, diseñar y desarrollar una propuesta moderna, interactiva y funcional para el portal oficial del Colegio de Ingenieros Civiles.

<br>

## Tecnologías y Herramientas

El proyecto está construido bajo un stack moderno enfocado en el rendimiento y la fluidez visual:

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite_8-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router_7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)

| Herramienta | Para qué la usamos |
| :--- | :--- |
| **React 19** | Construcción de la interfaz por componentes. |
| **Vite 8** | Servidor de desarrollo y compilación del sitio. |
| **React Router 7** | Navegación entre páginas (`/tramites/dro`, `/conocenos/mision-y-vision`, etc.). |
| **Swiper** | Carrusel de banners de la página de inicio. |
| **Framer Motion** | Animaciones del menú y del botón de atención por WhatsApp. |
| **Lucide React** | Todos los iconos del sitio. |
| **Oxlint** | Revisión automática del código (`npm run lint`). |

Tipografías: **Montserrat** (títulos y botones) y **Open Sans** (textos), cargadas desde Google Fonts.

---

## Equipo de Trabajo y Roles

| Rol | Integrantes |
| :--- | :--- |
| 💻 **Desarrollo Web** | Pablo Ramírez, Daniel Barrera |
| 🎨 **Diseño UI/UX** | Jocelyn Aguilar, Maria Fernanda Uribe |
| 📝 **Documentación y Análisis** | Ignacio Moela, Jose Maria Orantes, Josue Balbuena |

---

## Paleta de Colores del Proyecto

Para mantener la consistencia visual en toda la plataforma, por favor utiliza los siguientes colores según su propósito indicado:

| Color | Código HEX | RGB | Uso principal |
| :--- | :---: | :---: | :--- |
| **Gris claro** | `#E5E5E5` <br> ![](https://placehold.co/15x15/E5E5E5/E5E5E5.png) | `229, 229, 229` | Fondos principales y áreas claras |
| **Gris oscuro** | `#383637` <br> ![](https://placehold.co/15x15/383637/383637.png) | `56, 54, 55` | Textos, subtítulos y elementos secundarios |
| **Rojo oscuro** | `#962E35` <br> ![](https://placehold.co/15x15/962E35/962E35.png) | `150, 46, 53` | Fondos secundarios, detalles y sombras |
| **Rojo institucional** | `#BA2A33` <br> ![](https://placehold.co/15x15/BA2A33/BA2A33.png) | `186, 42, 51` | Color principal, títulos y botones |
| **Blanco** | `#FFFFFF` <br> ![](https://placehold.co/15x15/FFFFFF/FFFFFF.png) | `255, 255, 255` | Fondos, textos sobre fondos oscuros y contraste |

> ⚠️ No uses otros colores (como azul o café). Si necesitas un tono más suave, usa uno de estos con transparencia, por ejemplo `rgba(186, 42, 51, 0.1)`.

---

## ▶️ Cómo ejecutar el proyecto

Todo el código vive dentro de la carpeta `visuales/`:

```bash
cd visuales
npm install       # solo la primera vez, o cuando cambie package.json
npm run dev       # abre el sitio en modo desarrollo (http://localhost:5173)
npm run lint      # revisa errores comunes en el código
npm run build     # comprueba que el sitio compila antes de subir tus cambios
```

---

# 🛠️ Guía Rápida para Colaboradores: Git, GitHub y Estructura del Proyecto

¡Hola equipo! 👋 Para trabajar de forma ordenada, evitar borrar el trabajo de los demás y entregar a tiempo el viernes, sigan estas instrucciones paso a paso.

---

## 📂 1. ¿Dónde y cómo crear tus carpetas y archivos? (Estructura)

Antes de empezar a programar, ubica bien dónde debe vivir tu parte. Toda nuestra aplicación está dentro de `visuales/src/`:

```text
src/
 ├── assets/          📁 Iconos pequeños o imágenes que importes directo en el código.
 ├── components/
 │    ├── layout/     📁 Elementos globales de la página (Header, Footer).
 │    ├── sections/   📁 Secciones de la página de inicio (Hero, BannerCarrusel, FeatureCards...).
 │    └── ui/         📁 Piezas reutilizables en varias páginas (ModalContacto, PageHero, Breadcrumb...).
 ├── data/            📁 Información en arreglos/objetos (requisitos, asambleas, vacantes, contacto).
 ├── hooks/           📁 Lógica reutilizable de React (useScrollTop, useBloquearScroll).
 ├── pages/           📁 Vistas completas, agrupadas por menú (Inicio, Tramites, Servicios, Eventos, Conocenos).
 ├── styles/          📁 index.css: estilos globales y variables de la paleta de colores.
 ├── App.jsx          📄 Archivo principal donde se definen las rutas de la página.
 └── main.jsx         📄 Punto de entrada; no es necesario modificarlo.
```

Y los archivos estáticos (imágenes grandes, videos, PDFs) viven en `visuales/public/`:

```text
public/
 ├── img/
 │    ├── logos/      📁 logo-colegio.png, logo-uni.png, logo-carrera.png
 │    ├── banners/    📁 Banners del carrusel de inicio.
 │    ├── posts/      📁 Imágenes de las noticias.
 │    ├── paginas/    📁 Fotos de cada página: tramites/, servicios/, eventos/, conocenos/
 │    └── documentos/ 📁 Imágenes informativas (organigrama, costos, datos bancarios...).
 ├── videos/          📁 Videos de fondo (home.mp4, vista-aerea.mp4...).
 └── documentos/      📁 PDFs descargables (cedula-inscripcion.pdf, requisitos-dro.pdf...).
```

### 📌 Reglas clave para no romper el orden:
1. **Cada componente en su propia carpeta:** No dejes archivos `.jsx` y `.css` sueltos.
   * ❌ *Mal:* `src/components/Tramites.jsx` y `src/components/Tramites.css`
   * ✅ *Bien:* Crea la carpeta `src/components/Tramites/` y adentro coloca `Tramites.jsx` y `Tramites.css`.
2. **Nombres de archivos:** 
   * Componentes en mayúscula inicial (*PascalCase*): `BolsaTrabajo.jsx`.
   * Estilos asociados con el mismo nombre: `BolsaTrabajo.css`.
3. **Imágenes grandes, fotos institucionales o PDFs:**
   * Colócalos dentro de la carpeta `public/` (ejemplo: `public/documentos/` o `public/img/banners/`).
   * Nunca uses espacios ni la letra "ñ" en nombres de archivos (ejemplo: usa `diseno` en lugar de `diseño`).
4. **Si algo se repite en dos o más páginas, conviértelo en componente** dentro de `components/ui/` en lugar de copiar y pegar.

### 🏷️ Convención de nombres

| Qué | Formato | Ejemplo |
| :--- | :--- | :--- |
| Componentes y páginas (`.jsx`) | *PascalCase* | `BannerCarrusel.jsx`, `MisionVision.jsx` |
| Estilos de un componente | Mismo nombre que el componente | `BannerCarrusel.css` |
| Hooks | *camelCase* empezando con `use` | `useScrollTop.js` |
| Datos y utilidades (`.js`) | *camelCase* | `requisitos.js`, `asambleas.js` |
| Clases CSS | Prefijo corto del componente + *kebab-case* | `dro-hero`, `cc-curso-card`, `mc-btn` |
| Archivos en `public/` | minúsculas, *kebab-case*, sin espacios ni acentos | `datos-bancarios.jpg`, `vista-aerea.mp4` |
| Rutas de la página (URL) | minúsculas, *kebab-case* | `/tramites/dictaminador-de-riesgos` |
| Ramas de Git | `feat/` o `fix/` + *kebab-case* | `feat/modal-contacto` |

> 💡 El prefijo en las clases CSS (`dro-`, `rt-`, `mv-`...) evita que los estilos de una página afecten a otra. Revisa que el prefijo que elijas no lo esté usando nadie más.

### 🧹 Antes de subir tus cambios, revisa que:
- [ ] No queden `console.log` ni `debugger`.
- [ ] No haya variables, imports ni archivos que ya no se usen (`npm run lint` te ayuda).
- [ ] Los colores sean solo los de la paleta.
- [ ] Las rutas a imágenes y PDFs existan de verdad en `public/` (respetando mayúsculas y minúsculas).
- [ ] `npm run build` termine sin errores.

---

## 🌿 2. Flujo de Git y Comandos (Paso a Paso)

> ⚠️ **REGLA DE ORO:** NUNCA trabajes directamente sobre la rama `main`. Siempre crea tu propia rama.

### Paso 1: Actualiza tu proyecto local 🔄
Antes de tocar cualquier archivo, descarga la versión más reciente del repositorio:
```bash
git checkout main
git pull origin main
```

### Paso 2: Crea tu rama de trabajo 🌿
Crea una copia donde puedas trabajar seguro sin afectar al resto:
* Si creas una sección/función: `feat/nombre-de-tu-tarea`
* Si corriges algo: `fix/nombre-del-error`

```bash
git checkout -b feat/menu-tramites
```

### Paso 3: Desarrolla tu parte 💻
Crea tu carpeta, programa tu componente en React y dale estilos con CSS. Puedes probarlo ejecutando:
```bash
npm run dev
```

### Paso 4: Guarda tus cambios (Commit) 📦
Cuando tu sección esté lista o quieras guardar tu avance del día:
```bash
git add .
git commit -m "Agregado componente de tramites y estilos"
```

### Paso 5: Sube tu rama a GitHub ☁️
Envía tus cambios a la nube (asegúrate de poner el nombre de tu rama):
```bash
git push origin feat/menu-tramites
```

### Paso 6: Solicita la revisión (Pull Request) 🤝
1. Entra a nuestro repositorio en **GitHub**.
2. Verás un banner que dice que tu rama se acaba de subir; haz clic en **"Compare & pull request"**.
3. Escribe brevemente qué hiciste y haz clic en **"Create pull request"**.
4. ¡Listo! El encargado del proyecto revisará tu código y lo unirá al `main`.

---
