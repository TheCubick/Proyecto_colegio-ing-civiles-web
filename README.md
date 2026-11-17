<div align="center">
  <img src="visuales/public/img/logos/logo-colegio.png" alt="Logo del Colegio de Ingenieros Civiles de Tuxtla Gutiérrez" width="140" />

  <h1>Portal Web del Colegio de Ingenieros Civiles de Tuxtla Gutiérrez A.C.</h1>

  <p>Propuesta de sitio institucional, moderno y accesible, desarrollada para la asignatura <em>Desarrollo de Páginas Web</em>.</p>

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
  ![Lucide](https://img.shields.io/badge/Lucide_React-F56565?style=for-the-badge&logo=lucide&logoColor=white)
  ![Swiper](https://img.shields.io/badge/Swiper-6332F6?style=for-the-badge&logo=swiper&logoColor=white)
</div>

---

## Índice

1. [Descripción del proyecto](#descripción-del-proyecto)
2. [Tecnologías](#tecnologías)
3. [Estructura del proyecto](#estructura-del-proyecto)
4. [Mapa de rutas](#mapa-de-rutas)
5. [Decisiones de diseño y UX](#decisiones-de-diseño-y-ux)
6. [Reglas del proyecto](#reglas-del-proyecto)
7. [Convenciones de código](#convenciones-de-código)
8. [Flujo de trabajo con Git](#flujo-de-trabajo-con-git)
9. [Guía del equipo: fases, Classroom y Drive](#guía-del-equipo-fases-classroom-y-drive)
10. [Pendientes conocidos](#pendientes-conocidos)
11. [Equipo](#equipo)

---

## Descripción del proyecto

El portal moderniza la presencia digital del Colegio y reúne en un solo lugar la información que hoy se consulta por teléfono o en oficina:

- **Trámites** (DRO, Representante Técnico, Dictaminador de Riesgos): qué son, qué funciones realizan, cómo contratar a un agremiado, su importancia normativa y los requisitos de registro.
- **Servicios** (Peritos Valuadores, Cálculo Estructural).
- **Eventos** (Cursos y Capacitación, Asambleas).
- **Conócenos** (Misión y Visión, valores, organigrama, Comisiones).
- **Afiliación**: requisitos, formatos descargables, costos y datos bancarios en un pop-up desde el menú.
- **Atención por WhatsApp**: preguntas frecuentes y un buzón que abre una conversación con el Colegio.

> **Regla de negocio importante:** los trámites siguen siendo **presenciales**. El sitio informa y ofrece los formatos para descargar, pero no recibe documentos. Por seguridad, **no se publican datos de contacto de los agremiados**: las solicitudes de especialistas se canalizan por las oficinas del Colegio.

---

## Tecnologías

| Herramienta | Para qué la usamos |
| :--- | :--- |
| **React 19** | Interfaz construida por componentes. |
| **Vite 8** | Servidor de desarrollo y compilación de producción. |
| **React Router 7** | Navegación entre páginas sin recargar (SPA). |
| **Framer Motion** | Animaciones del menú, indicador de sección activa y botón de WhatsApp. |
| **Lucide React** | Todos los íconos del sitio. |
| **Swiper** | Carrusel de banners en la página de inicio. |
| **CSS puro** | Un archivo `.css` por componente, con prefijo de clase propio. |
| **Oxlint** | Revisión automática del código (`npm run lint`). |

Tipografías (Google Fonts): **Montserrat** para títulos y botones, **Open Sans** para textos.

---

## Estructura del proyecto

```text
web_colegio/
├── README.md
├── CLAUDE.md                     Contexto y bitácora para Claude Code
├── docs/                         Plan del equipo, instrucciones de tareas y auditorías
└── visuales/                     Aplicación React + Vite
    ├── index.html                Documento base (lang="es")
    ├── scripts/
    │   └── verificar-reglas.mjs  Revisión automática de las reglas del Colegio
    ├── public/                   Archivos estáticos, se sirven tal cual desde "/"
    │   ├── documentos/           PDF descargables
    │   ├── videos/               Videos de fondo de los encabezados
    │   └── img/
    │       ├── logos/            logo-colegio, logo-uni, logo-carrera
    │       ├── banners/          Fotografías del carrusel de inicio
    │       ├── posts/            Imágenes de las noticias
    │       ├── paginas/          Fotos por sección: tramites/, servicios/, eventos/
    │       └── documentos/       Organigrama, costos, datos bancarios, tríptico
    └── src/
        ├── main.jsx              Punto de entrada (no se modifica)
        ├── App.jsx               Conecta cada ruta con su página
        ├── config/
        │   └── rutas.js          MAPA DEL SITIO: lista única de páginas (menús, Footer y migas salen de aquí)
        ├── data/                 TODO EL CONTENIDO (textos, listas, montos). Ver tabla de abajo
        ├── hooks/                Comportamientos reutilizables
        │   ├── useBloquearScroll.js   Congela la página de fondo cuando hay un menú o ventana abierta
        │   └── useDialogo.js          Abre y cierra ventanas <dialog>
        ├── utils/
        │   └── enlaces.js        Arma enlaces de WhatsApp, teléfono y correo
        ├── styles/
        │   └── index.css         Estilos globales, tamaños de letra y patrones de fondo
        ├── components/
        │   ├── layout/           Presentes en todas las páginas
        │   │   ├── Header/       Header.jsx (barra), MenuMovil.jsx (menú del celular), MenuEnlace.jsx
        │   │   ├── Footer/       Footer.jsx, IconosRedes.jsx
        │   │   └── ScrollArriba.jsx   Sube al inicio al cambiar de página
        │   ├── templates/        Plantillas que comparten varias páginas
        │   │   ├── PaginaTramite/     DRO, RT y Dictaminador de Riesgos
        │   │   └── PaginaServicio/    Peritos Valuadores y Cálculo Estructural
        │   ├── sections/         Bloques de página: Hero, FeatureCards, BannerCarrusel,
        │   │                     AtencionWhatsapp, TramiteDetalle
        │   └── ui/               Piezas pequeñas reutilizables
        │       ├── ModalAfiliacion/   Pop-up «Afíliate» (requisitos, costos, bancos)
        │       ├── ModalContacto/     Ventana de contacto y trámites
        │       ├── Migas/             «Inicio > Trámites > DRO», se arma sola
        │       └── ImagenSegura/      Imagen que muestra «Imagen pendiente» si falta el archivo
        └── pages/                Páginas con diseño propio (no usan plantilla)
            ├── Inicio/
            ├── Eventos/          CursosCapacitacion, Asambleas
            └── Conocenos/        MisionVision, Comisiones
```

**Idea clave de la arquitectura:** cada cosa vive en un solo lugar.

| Si quieres cambiar… | Edita | No toques |
| :--- | :--- | :--- |
| Un texto, una lista, un monto o una foto | `src/data/<archivo>.js` | el `.jsx` |
| Teléfonos, correos, WhatsApp, horario, dirección, redes | `src/data/contacto.js` (cambia en todo el sitio) | Header, Footer ni ventanas |
| El nombre de una página o un menú | `src/config/rutas.js` | Header ni Footer |
| El diseño de las 3 páginas de trámites | `components/templates/PaginaTramite/PaginaTramite.css` (una vez, aplica a las 3) | — |
| El diseño de Peritos y Cálculo | `components/templates/PaginaServicio/PaginaServicio.css` | — |
| Colores o tamaños de una página propia | el `.css` de esa página en `src/pages/` | — |

### Archivos de contenido (`src/data/`)

| Archivo | Qué contiene | Lo usa |
| :--- | :--- | :--- |
| `contacto.js` | Nombre, siglas, logo, dirección, teléfonos, correos, WhatsApp, horario, delegaciones, redes | Todo el sitio |
| `afiliacion.js` | Requisitos de ingreso, formatos PDF, tríptico, costos (oficio 01/2026), cuentas (oficio 02/2026), facturación | Pop-up «Afíliate» |
| `inicio.js` | Tarjetas rojas, fotos del carrusel, preguntas frecuentes, tipos de mensaje del buzón | Página de Inicio |
| `tramites.js` | Título, introducción, video, foto y PDF de DRO, RT y Dictaminador | Plantilla PaginaTramite |
| `tramitesInfo.js` | Funciones, normativa y pasos para contratar de cada trámite | Sección TramiteDetalle |
| `requisitos.js` | Requisitos generales y nota de cartas de los trámites | Plantilla PaginaTramite |
| `servicios.js` | Textos, tarjetas y foto de Peritos y Cálculo | Plantilla PaginaServicio |
| `cursos.js` | Requisitos de inscripción, cursos activos y noticias | Cursos y Capacitación |
| `asambleas.js` | Asambleas realizadas | Asambleas |
| `misionVision.js` | Misión, visión, valores, compromisos | Misión y Visión |
| `comisiones.js` | Comisiones del Colegio | Comisiones |

---

## Mapa de rutas

La lista oficial está en [`visuales/src/config/rutas.js`](visuales/src/config/rutas.js). Las columnas «Contenido» y «Diseño» dicen qué archivo abrir para cambiar cada página (todo dentro de `visuales/src/`).

| Ruta | Página | Contenido | Diseño |
| :--- | :--- | :--- | :--- |
| `/` | Inicio | `data/inicio.js` | `pages/Inicio/` + `components/sections/` |
| `/tramites/dro` | Director Responsable de Obra (DRO) | `data/tramites.js` → `dro` · `data/tramitesInfo.js` | `components/templates/PaginaTramite/` |
| `/tramites/rt` | Representante Técnico (RT) | `data/tramites.js` → `rt` · `data/tramitesInfo.js` | `components/templates/PaginaTramite/` |
| `/tramites/dictaminador-de-riesgos` | Dictaminador de Riesgos | `data/tramites.js` → `dictaminador` · `data/tramitesInfo.js` | `components/templates/PaginaTramite/` |
| `/servicios/peritos-valuadores` | Peritos Valuadores | `data/servicios.js` → `peritos` | `components/templates/PaginaServicio/` |
| `/servicios/calculo-estructural` | Cálculo Estructural | `data/servicios.js` → `calculo` | `components/templates/PaginaServicio/` |
| `/eventos/cursos-y-capacitacion` | Cursos y Capacitación | `data/cursos.js` | `pages/Eventos/CursosCapacitacion/` |
| `/eventos/asambleas` | Asambleas | `data/asambleas.js` | `pages/Eventos/Asambleas/` |
| `/conocenos/mision-y-vision` | Misión y Visión | `data/misionVision.js` | `pages/Conocenos/MisionVision/` |
| `/conocenos/comisiones` | Comisiones | `data/comisiones.js` | `pages/Conocenos/Comisiones/` |
| `#afiliacion` (en cualquier página) | Pop-up «Afíliate» | `data/afiliacion.js` | `components/ui/ModalAfiliacion/` |
| cualquier otra | Redirige a Inicio | — | — |

**Para agregar una página nueva:**

1. Agrégala a la lista de `src/config/rutas.js` (ruta, título, grupo del menú e ícono). Con eso ya aparece en el menú, en el menú del celular, en el Footer y en las migas de pan.
2. Crea su carpeta en `src/pages/<Menu>/<Pagina>/` con `<Pagina>.jsx` y `<Pagina>.css`; sus textos van en `src/data/<pagina>.js`.
3. Conéctala en el objeto `paginas` de `src/App.jsx`.

Si la página es un trámite o un servicio con el mismo formato que los demás, no crees carpeta: agrega sus datos en `data/tramites.js` o `data/servicios.js` y conéctala en `App.jsx` con la plantilla.

---

## Decisiones de diseño y UX

### Paleta institucional

| Color | HEX | Uso |
| :--- | :---: | :--- |
| ![](https://placehold.co/15x15/BA2A33/BA2A33.png) **Rojo institucional** | `#BA2A33` | Color principal: títulos, botones, íconos |
| ![](https://placehold.co/15x15/962E35/962E35.png) **Rojo oscuro** | `#962E35` | Estados *hover*, degradados, sombras |
| ![](https://placehold.co/15x15/383637/383637.png) **Gris oscuro** | `#383637` | Texto principal y bloques de contraste |
| ![](https://placehold.co/15x15/E5E5E5/E5E5E5.png) **Gris claro** | `#E5E5E5` | Fondos de secciones alternas |
| ![](https://placehold.co/15x15/FFFFFF/FFFFFF.png) **Blanco** | `#FFFFFF` | Fondos y texto sobre fondos oscuros |

> **No se usan otros colores** (ni azul ni café). Si necesitas un tono más suave, usa uno de estos con transparencia, p. ej. `rgba(186, 42, 51, 0.1)`.

### Legibilidad para usuarios adultos

La mayoría de los usuarios son ingenieros adultos, muchos con vista cansada. Por eso:

| Decisión | Implementación | Dónde |
| :--- | :--- | :--- |
| Texto base más grande | `18px` en `body`, párrafos de `1.15rem` | `styles/index.css` (`--fs-base`, `--fs-parrafo`) |
| Interlineado amplio | `line-height: 1.7` | `--lh-parrafo` |
| Aspecto de documento técnico | Párrafos justificados con `hyphens: auto` para evitar huecos entre palabras | Clase `.texto-justificado` |
| Menú siempre legible | Cristal blanco semitransparente; se rehace en la Fase 1 según la especificación de `CLAUDE.md` | `components/layout/Header/Header.css` |
| Menos "vacío" visual | Patrones sutiles de cuadrícula arquitectónica y puntos | Clases `.fondo-cuadricula` y `.fondo-puntos` |

Para textos nuevos, usa las clases de utilidad:

```jsx
<p className="texto-legible texto-justificado">…</p>
<section className="mi-seccion fondo-cuadricula">…</section>
```

> Los patrones solo definen `background-image`. Si tu sección declara `background: …` en su propio CSS, ese *shorthand* borra el patrón; usa `background-color` en su lugar.

### Accesibilidad

- Atributos `aria-label`, `aria-labelledby` y `aria-current` en la navegación y las secciones.
- Contorno visible al navegar con teclado (`:focus-visible`) en botones y enlaces.
- Respeto a `prefers-reduced-motion`: se desactivan animaciones para quien lo configure en su sistema.
- Videos de fondo silenciados, marcados `aria-hidden` y con una capa oscura para garantizar el contraste del texto.

---

## Reglas del proyecto

Establecidas por el Ing. Nein Montero Molina, los colegiados y la auditoría. **Son obligatorias en el sitio y en cada tarea**; un cambio que las rompa no se une aunque funcione.

### Privacidad y seguridad anti-extorsión
- **Cero datos personales** de contratistas o directivos: ni domicilios, ni teléfonos privados, ni fotos personales de socios.
- **Contacto en embudo:** toda solicitud de especialistas (DRO, RT, Peritos) va solo a los teléfonos y WhatsApp **oficiales** del Colegio.
- **Padrón limitado:** si se listan agremiados, solo nombre y claves de especialidad.
- **Formatos PDF en blanco:** prohibido subir ejemplos llenos con CURP, domicilio o cédula reales.
- **Privacidad financiera:** prohibido mostrar adeudos o morosidad de agremiados.

### Trámites, cursos y pagos
- **Trámites 100 % presenciales:** la web no recibe ni entrega trámites.
- **La web es un repositorio:** requisitos, horarios, ubicación y formatos para imprimir.
- **Cursos:** se difunden en la web y por WhatsApp; registro y asistencia, en oficinas.
- **Sin pasarela de cobro:** solo se muestran las cuentas bancarias y cómo enviar el comprobante.
- **Servicio social gratuito:** debe decirse por escrito y en un PDF descargable.

### Identidad gráfica, UX y accesibilidad
- **Logo y colores inalterables** (vino y blanco, registrados oficialmente).
- **Solo la paleta oficial:** `#BA2A33`, `#962E35`, `#383637`, `#E5E5E5`, `#FFFFFF`. Prohibido el azul y el café.
- **Letra mínima de 14px (0.95rem)**; base de 18px y párrafos largos justificados.
- **Navegación simple y con textura:** nada saturado tipo banca digital ni secciones totalmente blancas sin patrón.
- **Nombre exacto:** «Colegio de Ingenieros Civiles de Tuxtla Gutiérrez, A.C.» y las siglas **CICTGZ** (nunca «de Chiapas»).

### Contenido legal y normativo
- **Convenios:** el Colegio solo firma con gobierno y universidades; prohibido decir que las empresas firman convenios por su cuenta.
- **Neutralidad política:** en eventos públicos, aclarar que el Colegio asiste como **Asociación Civil sin filiación partidista**.
- **Cero datos inventados:** ni leyes generadas por IA, ni cursos o asambleas de ejemplo, ni imágenes ajenas.
- **El equipo no hace documentos del Colegio:** formatos, requisitos, servicio social, código de ética, servicios, cursos y asambleas los entrega el Colegio y se copian **tal cual**, sin redactar ni pasar por IA, con la captura de la fuente en el PR. Si no llegan, se aplica el plan B de `docs/Plan_Fases_Equipo.md` o se elimina la idea.
- **Ingreso y cartas:** aval de 2 Miembros Numerarios (Art. 23); 2 años de cédula para Carta Propia y 5 para Carta Ajena; carta de no adeudo.
- **Facturación:** solo pagos del mes en curso (último día hábil antes de las 5:00 p.m., sábado antes de la 1:00 p.m.), con váucher legible y Constancia de Situación Fiscal.

### Reglas técnicas del equipo
- Rutas y archivos nuevos **sin espacios, «ñ» ni acentos**.
- **Prohibido trabajar directo en `main`** y **prohibido instalar librerías** nuevas en `package.json`.

### Revisión automática

```bash
npm run verificar            # revisa solo lo que cambiaste respecto a main
npm run verificar -- --todo  # revisa todo el proyecto
```

El script [`visuales/scripts/verificar-reglas.mjs`](visuales/scripts/verificar-reglas.mjs) detecta colores fuera de la paleta, letras menores a 14px, el nombre «de Chiapas», teléfonos no oficiales, CURP, contenido de ejemplo, menciones a partidos sin la aclaración de neutralidad, pasarelas de pago, librerías nuevas y rutas inválidas. **GitHub lo ejecuta en cada Pull Request** junto con `lint` y `build`; si sale en rojo, el PR no se une. Lo que no se puede revisar de forma automática (fotos personales, PDF llenos, convenios) se confirma en la lista de la plantilla del PR.

---

## Convenciones de código

| Qué | Formato | Ejemplo |
| :--- | :--- | :--- |
| Componentes y páginas (`.jsx`) | *PascalCase*, en su propia carpeta | `Comisiones/Comisiones.jsx` |
| Hooks | `use` + *PascalCase* | `useDialogo.js` |
| Estilos | Mismo nombre que el componente | `Comisiones/Comisiones.css` |
| Datos (`.js`) | *camelCase*, solo contenido (sin diseño) | `contacto.js`, `tramitesInfo.js` |
| Clases CSS | Prefijo corto del componente + *kebab-case* | `tr-hero`, `td-paso`, `hd-menu` |
| Archivos en `public/` | minúsculas, *kebab-case*, **sin espacios, acentos ni "ñ"** | `datos-bancarios.jpg` |
| Rutas (URL) | minúsculas, *kebab-case* | `/tramites/dictaminador-de-riesgos` |

El prefijo en las clases evita que los estilos de una página afecten a otra; revisa que el tuyo no lo use nadie más.

Prefijos en uso: `hd-` Header y pop-up Afíliate · `cic-footer-` Footer · `tr-` plantilla de trámites · `sv-` plantilla de servicios · `td-` TramiteDetalle · `mc-` ModalContacto · `bc-` BannerCarrusel · `aw-` AtencionWhatsapp · `hero-` Hero · `cards-`/`red-card` FeatureCards · `cc-` Cursos · `asm-` Asambleas · `mv-` Misión y Visión · `com-` Comisiones.

**No escribas datos dentro de los `.jsx`.** Si un componente necesita un teléfono, usa `contacto` de `data/contacto.js`; si necesita un enlace de WhatsApp, usa `enlaceWhatsapp()` de `utils/enlaces.js`.

**Antes de subir cambios, verifica que:**

- [ ] No queden `console.log` ni `debugger`.
- [ ] `npm run lint` no reporte imports o variables sin usar.
- [ ] Solo se usen colores de la paleta.
- [ ] Las rutas a imágenes y PDFs existan en `public/` (respetando mayúsculas y minúsculas).
- [ ] `npm run build` termine sin errores.
- [ ] `npm run verificar` no reporte errores de las [Reglas del proyecto](#reglas-del-proyecto).

---

## Flujo de trabajo con Git

> **Regla de oro:** nunca trabajes directamente sobre `main`. Todo cambio entra por *Pull Request*.

### Tipos de rama

| Prefijo | Cuándo usarlo | Ejemplo |
| :--- | :--- | :--- |
| `feat/` | Nueva página, sección o funcionalidad | `feat/pagina-comisiones` |
| `fix/` | Corrección de un error | `fix/pdf-requisitos-dro` |
| `refactor/` | Reorganizar código sin cambiar lo que hace | `refactor/estructura` |
| `docs/` | Solo documentación | `docs/manual-tecnico` |

### Paso a paso

```bash
# 1. Parte siempre de main actualizado
git checkout main
git pull origin main

# 2. Crea tu rama
git checkout -b feat/nombre-de-tu-tarea

# 3. Trabaja y prueba
npm run dev

# 4. Guarda tus avances con commits pequeños y descriptivos
git add src/data/comisiones.js
git commit -m "Feat: comisiones oficiales (F2-JM1)"

# 5. Antes de subir, trae lo último de main para resolver conflictos en tu rama
git pull origin main
npm run build

# 6. Sube tu rama
git push -u origin feat/nombre-de-tu-tarea
```

### Mensajes de commit

Usamos el formato `Tipo: descripción en español`, igual que el historial del repositorio:

| Tipo | Uso |
| :--- | :--- |
| `Feat:` | Algo nuevo para el usuario |
| `Fix:` | Corrección de un error |
| `Refactor:` | Cambio interno sin efecto visible |
| `Design:` | Ajustes visuales o de estilos |
| `Docs:` | Documentación |

### Pull Request

1. En GitHub, haz clic en **"Compare & pull request"** sobre tu rama.
2. Título con el mismo formato del commit (ej. `Feat: página de Comisiones`).
3. En la descripción indica **qué cambiaste**, **cómo probarlo** y, si es visual, agrega una captura.
4. Asigna a un compañero de Desarrollo Web como revisor.
5. Atiende los comentarios con nuevos commits en la misma rama.
6. Una vez aprobado, el responsable lo une a `main` y se borra la rama.

---

## Guía del equipo: fases, Classroom y Drive

> El plan completo, con cada tarea, sus archivos y su hora de entrega, está en **[`docs/Plan_Fases_Equipo.md`](docs/Plan_Fases_Equipo.md)**. Las especificaciones técnicas están en [`docs/Auditoria_Y_Tareas_CICTGZ.md`](docs/Auditoria_Y_Tareas_CICTGZ.md).

### Calendario

| Fase | Inicio | Cierre | Qué se hace |
|---|---|---|---|
| Día 0 | lun 9 nov | lun 9 nov · 14:00 | Todos en GitHub, con el proyecto corriendo y su rama creada |
| **Fase 1** | lun 9 nov · 09:00 | **sáb 14 nov · 20:00** | Urgencias, carrusel, header, tipografía, fondos, formatos |
| Integración | dom 15 nov | dom 15 nov | Pablo une todo a `main` |
| **Fase 2** | lun 16 nov · 09:00 | **sáb 21 nov · 20:00** | Páginas nuevas, contenido oficial, QA y publicación |

### Ramas: una por persona y por fase

```bash
git checkout main
git pull origin main
git checkout -b fase1/tu-nombre      # en la Fase 2: fase2/tu-nombre
```

- Trabaja **solo** en los archivos de tus tareas (columna «Archivos» del plan). Así nadie pisa el trabajo de nadie.
- Pon el ID de la tarea en el commit: `Fix: formatos en blanco (F1-IM1)`.
- Sube tus avances **todos los días** (`git push`); aunque no esté terminado, Pablo debe poder ver tu progreso.

### Classroom: cómo se entrega

1. Cada tarea del plan es una **Tarea de Classroom** con su fecha y **hora límite** (casi siempre **20:00**).
2. Para entregar: adjunta el **enlace al Pull Request** (o a tu rama/commit) y una **captura** del resultado. Las tareas de contenido adjuntan también el PDF o el texto.
3. Entregar después de la hora queda marcado como **tarde**: se revisa al día siguiente y retrasa a todos.
4. **Reporte diario** en el grupo antes de las **21:00**: *hice / haré / bloqueos*.
5. Pablo revisa y une los PR de lunes a sábado, de 21:00 a 22:00.

### Drive: dónde van los recursos

Carpeta del proyecto: <https://drive.google.com/drive/folders/1PZYYyMHTs4ZaRnVExJeveOKKtXiX2_sL>

| Carpeta | Qué va ahí |
|---|---|
| `01_Material_Colegio/` | Todo lo que manda el Colegio, **original y sin editar** (fotos por servicio, oficios, textos) |
| `02_Imagenes_Web/` | Copia de las imágenes **ya optimizadas** que están en `public/img/` |
| `03_Videos/originales` · `03_Videos/web` | Videos sin comprimir · versiones comprimidas que van al repo |
| `04_Documentos_Web/` | PDF finales que van a `public/documentos/` |
| `05_Diseno/` | Archivos editables (Canva/Figma): organigrama, patrones, imágenes para redes |
| `06_Evidencias_Equipo/` | Capturas de entregas y QA |
| `07_Admin/` | Oficios enviados al Colegio, respuestas, actas y registro de tareas |

**Reglas para no inflar el repositorio:**

- **Documentos (PDF):** pueden enlazarse desde el Drive con permiso «Cualquier persona con el enlace · Lector».
- **Imágenes y videos:** hasta que Pablo confirme una prueba, van al repo en versión optimizada (JPG de **1600 px máx. y menos de 350 KB**; videos de **menos de 4 MB**). Google Drive no está hecho para servir imágenes ni videos de fondo a una página: puede bloquearlos o limitarlos sin aviso. El verificador avisa si se usa Drive en una imagen o un video.
- Los originales pesados siempre se quedan en el Drive.
- Nombres en minúsculas, sin espacios, acentos ni «ñ» (`dictaminador-01.jpg`).
- Para comprimir: [Squoosh](https://squoosh.app) (imágenes) y este comando de `ffmpeg` (videos):

```bash
ffmpeg -i original.mp4 -vf "scale=1280:-2" -c:v libx264 -crf 30 -preset slow -an web.mp4
```

### Si trabajas con Claude Code

El archivo [`CLAUDE.md`](CLAUDE.md) le da a Claude el contexto del proyecto (paleta, reglas, especificación del header y pendientes). Pídele que trabaje **solo en los archivos de tu tarea**. **No edites `CLAUDE.md` desde tu rama** (todos chocarían en las mismas líneas): describe tus cambios en el Pull Request y Pablo actualiza la bitácora al unirlo.

---

## Pendientes conocidos

- **PDFs faltantes en `public/documentos/`:** `data/tramites.js` enlaza `requisitos-dro.pdf`, `requisitos-rt.pdf` y `requisitos-dictaminador.pdf`, que no existen. Esos botones se retiran en la tarea F1-PR0 y solo vuelven si el Colegio entrega los PDF (el equipo no los fabrica).
- **Fotografías de páginas:** algunas vistas muestran "Imagen pendiente" hasta que se agregue su foto en `public/img/paginas/`.
- **Tamaño del paquete:** el JavaScript compilado supera los 500 kB; se puede dividir con carga diferida de páginas (`React.lazy`).

---

## Equipo

| Rol | Integrantes |
| :--- | :--- |
| **Desarrollo Web** | Pablo Ramírez (líder), Maria Fernanda Uribe |
| **Ajustes de código y QA** | Josue Balbuena, Ignacio Moela |
| **Base de datos, QA y manual** | Daniel Barrera |
| **Diseño** | Jocelyn Aguilar |
| **Enlace con el Colegio** | Jose Maria Orantes |
