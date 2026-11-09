# Auditoría técnica y plan de tareas: portal CICTGZ

**Proyecto:** Portal web del Colegio de Ingenieros Civiles de Tuxtla Gutiérrez A.C. (CICTGZ)
**Stack:** React 19 + Vite 8 + React Router 7 + Swiper 14 + Framer Motion (ya instalados, **no se agregan dependencias**)
**Fecha de auditoría:** 26 de octubre de 2026 · **Fecha límite:** 9 de noviembre de 2026 (15 días)
**Base auditada:** rama `main` (commit `3688d0b`)

> Todas las rutas de este documento son relativas a `visuales/`.

---

## 0. Hallazgos previos (leer antes de empezar)

1. **Hay un cambio local sin commit en `src/components/layout/Header/Header.css`.** Comentó el fondo blanco del header y, por accidente, también `box-shadow`, `backdrop-filter`, `font-family` y `transition`. Se resuelve en el **Día 0** antes de crear ramas.
2. **Ya existe la base de legibilidad** en `src/styles/index.css`: `--fs-base: 18px`, `--fs-parrafo`, `.texto-legible`, `.texto-justificado`, `.fondo-cuadricula` y `.fondo-puntos`. Los puntos 3, 4 y 11 están **avanzados**, no desde cero.
3. **Quedan 54 declaraciones `font-size` menores a ~14px** (19 de ellas en `Header.css`).
4. **Swiper ya está instalado** y en uso en `BannerCarrusel`. El carrusel nuevo lo reutiliza.
5. **Paleta oficial obligatoria:** `#BA2A33`, `#962E35`, `#383637`, `#E5E5E5` y `#FFFFFF`. Prohibido usar azul o café.
6. El material del Colegio (fotos, textos oficiales y PDF) **aún no llega**. Ya se envió la solicitud (`docs/Solicitud_Informacion_Consejo.md`). Por eso todo el plan trabaja con **archivos temporales en rutas fijas**.

---

## 1. Resumen ejecutivo de la auditoría

| # | Punto de observación | Estado actual en el código | Archivo(s) a modificar o crear | ¿Qué falta? |
|---|---|---|---|---|
| 1 | Barra de menú de color | Header de cristal blanco (`rgba(255,255,255,.85)`), hoy roto por un cambio local sin commit | `src/components/layout/Header/Header.css` | **Código** |
| 2 | Imágenes del DRO → RT | `Dro.jsx` usa `/img/paginas/tramites/dro.jpg` (foto que corresponde a RT) | `public/img/galerias/rt/rt-01.jpg` (copia de `dro.jpg`), `public/img/galerias/dro/*` | **Imagen** (y código vía carrusel) |
| 3 | Letras más grandes | Base de 18px ya aplicada; 54 tamaños < 14px en 14 hojas CSS | Todas las `.css` de `src/` (repartidas por dueño) | **Código** |
| 4 | Texto justificado | Justificado solo en el párrafo principal de Trámites, Servicios, Misión y `TramiteDetalle` | `CursosCapacitacion.css`, `Comisiones.css`, `Asambleas.css`, `FeatureCards.css`, `Footer.css` y páginas nuevas | **Código** |
| 5 | Dictaminador: fotos de derrumbes | Una sola foto estática (`dictaminador.jpg`) | `src/pages/Tramites/Dictaminador/Dictaminador.jsx`, `public/img/galerias/dictaminador/*` | **Código + Imagen** (fotos oficiales del Colegio) |
| 6 | Siglas `CICTGZ` visibles | Solo aparecen en textos del muro de noticias | `Header.jsx`, `Hero.jsx`, `Footer.jsx`, `index.html` | **Código** |
| 7 | Perito Valuador: carrusel + servicios detallados | Una foto estática y 3 "usos" genéricos | `PeritosValuadores.jsx`, `src/data/peritosServicios.js`, `public/img/galerias/peritos/*` | **Código + Imagen + Texto** |
| 8 | Carrusel automático en cada trámite y servicio | No existe; cada vista tiene una `<img>` fija con placeholder | `src/components/ui/GaleriaCarrusel/*` (nuevo), `src/data/galerias.js` (nuevo), 6 vistas | **Código + Imagen** |
| 9 | Organigrama: logo a la izquierda + `CICTGZ` | Imagen fija `public/img/documentos/organigrama.jpeg` | `public/img/documentos/organigrama.jpeg` (mismo nombre) | **Imagen** (0 código) |
| 10 | Cursos: fotos en universidades | `curso1.jpg`–`curso3.jpg` genéricas | `public/img/paginas/eventos/cursos/curso1.jpg`–`curso3.jpg` (mismos nombres) | **Imagen** (0 código) |
| 11 | Fondos con trazos/patrones | `.fondo-cuadricula` en 7 vistas; Inicio, Cursos, Asambleas y Comisiones lisas | `src/styles/index.css` (nueva `.fondo-trazos`), `public/img/patrones/trazos-arquitectonicos.svg` | **Código + Imagen (SVG)** |
| 12 | Beneficio a la sociedad | No existe | `src/pages/Conocenos/BeneficioSocial/*`, `src/data/beneficioSocial.js`, `public/documentos/beneficio-social.pdf` | **Código + Texto + PDF** |
| 13 | Servicio social gratuito | No existe (solo una mención en `FeatureCards`) | `src/pages/Conocenos/ServicioSocial/*`, `src/data/servicioSocial.js`, `public/documentos/servicio-social-gratuito.pdf` | **Código + Texto + PDF** |

---

## 2. Especificaciones técnicas por punto

### Contrato de rutas (fuente única para todos)

Estas rutas se crean el **Día 0** con archivos temporales. Diseño y Documentación **solo reemplazan el archivo con el mismo nombre y extensión**, nunca cambian rutas.

```text
public/
├── img/
│   ├── galerias/
│   │   ├── dro/            dro-01.jpg … dro-06.jpg
│   │   ├── rt/             rt-01.jpg  … rt-06.jpg
│   │   ├── dictaminador/   dictaminador-01.jpg … dictaminador-06.jpg
│   │   ├── peritos/        peritos-01.jpg … peritos-06.jpg
│   │   ├── calculo/        calculo-01.jpg … calculo-06.jpg
│   │   └── bolsa/          bolsa-01.jpg … bolsa-06.jpg
│   ├── patrones/
│   │   └── trazos-arquitectonicos.svg
│   ├── documentos/organigrama.jpeg          (se reemplaza, mismo nombre)
│   └── paginas/eventos/cursos/curso1-3.jpg  (se reemplazan, mismos nombres)
└── documentos/
    ├── servicio-social-gratuito.pdf
    └── beneficio-social.pdf
```

**Reglas de imagen:** JPG, horizontal **16:10**, **1600 × 1000 px**, menos de 350 KB, sin marcas de agua y con autorización si aparecen personas.
**Slots de galería:** hay 6 por servicio. El carrusel **oculta solo** las fotos que no existan, así que Diseño puede entregar de 1 a 6 sin tocar código.

### Punto 1: barra de menú de color
- En `.hd-header`: `background-color: rgba(186, 42, 51, 0.92)` (`#BA2A33`) con `backdrop-filter: blur(12px)`. Hay que restaurar `font-family`, `transition` y `box-shadow`.
- En `.hd-header.is-scrolled`: `rgba(150, 46, 53, 0.97)` (`#962E35`).
- Texto, íconos y logo-texto del menú en `#FFFFFF`. El contraste blanco sobre `#BA2A33` es ≈ 5.9:1 (cumple WCAG AA).
- Los paneles desplegables siguen blancos con texto `#383637`.
- Ajustar el `@supports not (backdrop-filter…)` a rojo casi opaco.

### Punto 2: imágenes del DRO → RT
- Día 0: copiar `public/img/paginas/tramites/dro.jpg` → `public/img/galerias/rt/rt-01.jpg` y `rt.jpg` → `rt-02.jpg`.
- La galería del DRO arranca con un placeholder. Diseño la llena con fotos de supervisión y bitácora de obra.

### Punto 3: letras más grandes
- **No** subir más `--fs-base` (ya es 18px).
- Regla por archivo: texto de lectura ≥ `1rem`; etiquetas, badges y breadcrumbs ≥ `0.95rem`; botones ≥ `1rem`; títulos con `clamp()` sin cambio.
- Buscar con: `grep -rn "font-size: *\(0\.[0-8]\|1[0-4]px\)" src --include=*.css`

### Punto 4: texto justificado
- Aplicar a **párrafos descriptivos de 3 líneas o más**: `text-align: justify; hyphens: auto;`. También sirve la clase `.texto-justificado` en el JSX.
- **No** justificar títulos, botones, tarjetas angostas (< 280px), textos centrados ni listas cortas.

### Punto 5: Dictaminador con fotos de derrumbes
- Sustituir la `<img>` de `Dictaminador.jsx` por `<GaleriaCarrusel fotos={galerias.dictaminador} />`.
- Diseño carga fotos de inspecciones y edificaciones dañadas en `public/img/galerias/dictaminador/`. Usar solo fotos oficiales o con licencia libre (Pexels o Unsplash), registrando la fuente.

### Punto 6: siglas `CICTGZ`
- **Header** (`.hd-logo-text`): «**CICTGZ**» grande en una línea y debajo, más pequeño, «Colegio de Ingenieros Civiles de Tuxtla Gutiérrez».
- **Hero**: el eyebrow cambia a «CICTGZ · Tuxtla Gutiérrez, Chiapas».
- **Footer**: la marca muestra «CICTGZ» y el copyright cambia a «… Tuxtla Gutiérrez A.C. (CICTGZ)».
- **`index.html`**: `<title>CICTGZ | Colegio de Ingenieros Civiles de Tuxtla Gutiérrez</title>`.

### Punto 7: Perito Valuador
- Carrusel con `galerias.peritos`.
- Nueva sección «Servicios que ofrecemos» que recorre `peritosServicios` (desde `src/data/peritosServicios.js`) en una grilla de tarjetas con ícono, título y texto. Sustituye la lista `usos` actual.

### Punto 8: carrusel automático (componente compartido)
- El componente `src/components/ui/GaleriaCarrusel/` se crea el **Día 0** con el código del **Anexo A**. Nadie más lo edita durante el sprint.
- Uso en cada vista: reemplazar el bloque `{imgError ? … : <img …/>}` de la `<figure>` y eliminar el estado `imgError` y el import de `ImageOff`.

```jsx
import GaleriaCarrusel from "../../../components/ui/GaleriaCarrusel/GaleriaCarrusel";
import { galerias } from "../../../data/galerias";
// …
<figure className="dro-figure">
  <GaleriaCarrusel fotos={galerias.dro} />
</figure>
```

### Punto 9: organigrama
- Rehacer la imagen (en Canva o Figma) con el **logo a la izquierda** y las siglas **CICTGZ** junto al logo.
- Exportar como `public/img/documentos/organigrama.jpeg`, **mismo nombre y extensión**, con al menos 2000px de ancho. **Cero cambios de código.**

### Punto 10: cursos
- Reemplazar `curso1.jpg`, `curso2.jpg` y `curso3.jpg` en `public/img/paginas/eventos/cursos/` por fotos de cursos impartidos en universidades, en 16:10 y 1200 × 750 px. **Cero cambios de código.**

### Punto 11: fondos con trazos
- Día 0: se crea `.fondo-trazos` en `index.css` y un SVG temporal (Anexo C).

```css
.fondo-trazos {
  background-image: url("/img/patrones/trazos-arquitectonicos.svg");
  background-size: 480px auto;
  background-repeat: repeat;
}
```

- Diseño reemplaza el SVG con trazos tipo plano, cotas y retícula en `#383637` con opacidad de 4–8%, en un mosaico repetible sin cortes.
- Cada dev aplica `.fondo-cuadricula`, `.fondo-puntos` o `.fondo-trazos` a las secciones **lisas** de sus vistas. Respetar `prefers-reduced-motion` si se agrega animación.

### Punto 12: beneficio a la sociedad
- Ruta `/conocenos/beneficio-social`. Página con introducción, tarjetas de acciones, lista de documentos descargables y enlaces externos (`target="_blank" rel="noopener noreferrer"`).
- El contenido sale de `src/data/beneficioSocial.js` (estructura en el Anexo B).

### Punto 13: servicio social gratuito
- Ruta `/conocenos/servicio-social`. Arriba va un **aviso destacado «Trámite 100% gratuito»**; después a quién va dirigido, pasos, requisitos, preguntas frecuentes y el botón **Descargar documento informativo (PDF)**.
- El contenido sale de `src/data/servicioSocial.js`.

---

## 3. Asignación de tareas independientes

### Día 0 (lun 26 oct): base compartida · Responsable: **Pablo Ramírez** · ~2 h · commit directo a `main`
Es el **único paso secuencial**. Después de este commit todas las tarjetas son 100% paralelas.

- [ ] Resolver el cambio local de `Header.css` (`git restore src/components/layout/Header/Header.css`).
- [ ] Crear `src/components/ui/GaleriaCarrusel/GaleriaCarrusel.jsx` y `.css` (Anexo A).
- [ ] Crear `src/data/galerias.js`, `peritosServicios.js`, `servicioSocial.js` y `beneficioSocial.js` con la estructura del Anexo B y textos temporales.
- [ ] Crear las páginas stub `src/pages/Conocenos/BeneficioSocial/BeneficioSocial.jsx` + `.css` y `src/pages/Conocenos/ServicioSocial/ServicioSocial.jsx` + `.css`. Cada una solo con `<main><h1>…</h1></main>`.
- [ ] En `src/App.jsx`, agregar las rutas `/conocenos/beneficio-social` y `/conocenos/servicio-social`.
- [ ] En `Header.jsx`, agregar las 2 entradas en el menú «Conócenos» y sus íconos (`HeartHandshake`, `GraduationCap`).
- [ ] Agregar `.fondo-trazos` en `src/styles/index.css`.
- [ ] Crear los assets temporales del contrato de rutas: copias de imágenes existentes, el SVG del Anexo C y 2 PDF de una página con la leyenda «Documento en preparación».
- [ ] Verificar que `npm run build` y `npm run lint` pasen.

> **Regla de convivencia:** nadie instala dependencias (`package*.json` congelados) y nadie edita archivos fuera de su tarjeta. Si hace falta tocar un archivo ajeno, se avisa al líder.

---

### 💻 Desarrollo Web

#### P1 · Carrusel en Trámites (puntos 2, 5 y 8)
- **Responsable:** Pablo Ramírez
- **Rama:** `feat/carrusel-tramites`
- **Archivos (solo JSX):** `src/pages/Tramites/Dro/Dro.jsx`, `src/pages/Tramites/Rt/Rt.jsx`, `src/pages/Tramites/Dictaminador/Dictaminador.jsx`
- **Entregable:** las 3 vistas muestran `GaleriaCarrusel` con su galería. Se eliminan `imgError` e `ImageOff`.
- **Terminado cuando:** las fotos rotan solas cada ~4.5 s, se pausa al pasar el mouse, con 1 sola foto no rota, sin errores en consola, y la vista se ve bien a 360px y 1440px.
- **Tiempo:** 1 día

#### P2 · Carrusel y servicios en Servicios (puntos 7 y 8)
- **Responsable:** Pablo Ramírez
- **Rama:** `feat/carrusel-servicios`
- **Archivos (solo JSX):** `src/pages/Servicios/PeritosValuadores/PeritosValuadores.jsx`, `src/pages/Servicios/CalculoEstructural/CalculoEstructural.jsx`, `src/pages/Servicios/BolsaTrabajo/BolsaTrabajo.jsx`
- **Entregable:** carrusel en las 3 vistas. En Peritos, la sección «Servicios que ofrecemos» se genera desde `peritosServicios.js` y **reutiliza las clases de la grilla de «usos» que ya existen**, así que no se edita `PeritosValuadores.css`.
- **Terminado cuando:** se cumple lo mismo que en P1, y además agregar o quitar un servicio en el `.js` se refleja sin tocar el JSX.
- **Tiempo:** 1.5 días

#### P3 · Legibilidad y fondos en Trámites y Servicios (puntos 3, 4 y 11)
- **Responsable:** Pablo Ramírez
- **Rama:** `feat/legibilidad-tramites-servicios`
- **Archivos (solo CSS):** `Dro.css`, `Rt.css`, `Dictaminador.css`, `PeritosValuadores.css`, `CalculoEstructural.css`, `BolsaTrabajo.css`, `src/components/sections/TramiteDetalle/TramiteDetalle.css`
- **Entregable:** 0 tamaños < 0.95rem y párrafos descriptivos justificados. Las secciones lisas usan un patrón de fondo.
- **Terminado cuando:** el `grep` del punto 3 devuelve 0 resultados en esos archivos y no hay scroll horizontal a 360px.
- **Tiempo:** 1.5 días

#### D1 · Header de color + CICTGZ (puntos 1, 3 y 6)
- **Responsable:** Daniel Barrera
- **Rama:** `feat/header-color-cictgz`
- **Archivos:** `src/components/layout/Header/Header.jsx`, `src/components/layout/Header/Header.css`
- **Entregable:** barra roja institucional según el punto 1, logo-texto con «CICTGZ» y los 19 tamaños pequeños corregidos (menú, drawer y modal de afiliación).
- **Terminado cuando:** el texto del menú es legible sobre los 4 videos de `public/videos/`, el estado `is-scrolled` funciona, el menú móvil y los dropdowns tienen buen contraste y solo se usan colores de la paleta.
- **Tiempo:** 1.5 días

#### D2 · Hero, Footer y título del sitio con CICTGZ (puntos 3, 4 y 6)
- **Responsable:** Daniel Barrera
- **Rama:** `feat/hero-footer-cictgz`
- **Archivos:** `src/components/sections/Hero/Hero.jsx`, `Hero.css`, `src/components/layout/Footer/Footer.jsx`, `Footer.css`, `index.html`
- **Entregable:** las siglas aparecen en el Hero, el Footer y la pestaña del navegador. El Footer suma enlaces a Beneficio Social y Servicio Social, y sus tamaños pequeños quedan corregidos.
- **Terminado cuando:** «CICTGZ» se ve en 4 lugares (header, hero, footer y título) y no quedan tamaños < 0.95rem en Footer ni Hero.
- **Tiempo:** 1 día

#### D3 · Legibilidad y fondos en Inicio, Conócenos y Eventos (puntos 3, 4 y 11)
- **Responsable:** Daniel Barrera
- **Rama:** `feat/legibilidad-inicio-conocenos-eventos`
- **Archivos (solo CSS):** `FeatureCards.css`, `AtencionWhatsapp.css`, `BannerCarrusel.css`, `ModalContacto.css`, `MisionVision.css`, `Comisiones.css`, `CursosCapacitacion.css`, `Asambleas.css`
- **Entregable:** tamaños mínimos, justificado en párrafos largos y patrón de fondo en las secciones lisas de Inicio, Cursos, Asambleas y Comisiones.
- **Terminado cuando:** el `grep` del punto 3 devuelve 0 resultados en esos archivos y ninguna página se ve «toda blanca» de arriba abajo.
- **Tiempo:** 1.5 días

#### D4 · Páginas de Beneficio Social y Servicio Social (puntos 12 y 13)
- **Responsable:** Daniel Barrera
- **Rama:** `feat/paginas-sociedad`
- **Archivos:** `src/pages/Conocenos/BeneficioSocial/BeneficioSocial.jsx` + `.css`, `src/pages/Conocenos/ServicioSocial/ServicioSocial.jsx` + `.css`
- **Entregable:** 2 páginas completas con el mismo patrón visual de las vistas de Trámites (hero con breadcrumb, secciones y CTA) que leen **todo** su contenido de `beneficioSocial.js` y `servicioSocial.js`. Botones de descarga hacia los PDF del contrato.
- **Terminado cuando:** cambiar cualquier texto en los `.js` se refleja sin tocar JSX, los PDF se descargan, el aviso «100% gratuito» es lo primero visible y la página es responsiva a 360px.
- **Tiempo:** 2.5 días

---

### 🎨 Diseño UI/UX

#### DS1 · Organigrama, patrón de fondo y fotos de cursos (puntos 9, 10 y 11)
- **Responsable:** Jocelyn Aguilar
- **Rama:** `feat/assets-organigrama-patron-cursos`
- **Archivos:** `public/img/documentos/organigrama.jpeg`, `public/img/patrones/trazos-arquitectonicos.svg`, `public/img/paginas/eventos/cursos/curso1.jpg`–`curso3.jpg`
- **Entregable:** organigrama con logo a la izquierda y CICTGZ, SVG de trazos repetible y 3 fotos de cursos en universidades.
- **Terminado cuando:** los archivos conservan nombre y extensión, el organigrama se lee bien al abrirlo en tamaño completo, el SVG pesa menos de 30 KB y se repite sin cortes, y las fotos van en 1200 × 750. Si las fotos de cursos del Colegio no han llegado, se entrega la mejor opción disponible y se anota en el PR «pendiente de foto oficial».
- **Tiempo:** 2.5 días

#### DS2 · Galerías de Trámites (puntos 2, 5 y 8)
- **Responsable:** Jocelyn Aguilar
- **Rama:** `feat/assets-galerias-tramites`
- **Archivos:** `public/img/galerias/dro/*`, `public/img/galerias/rt/*`, `public/img/galerias/dictaminador/*`
- **Entregable:** de 3 a 6 fotos por carpeta, recortadas a 1600 × 1000 y menores de 350 KB (TinyPNG/Squoosh). El Dictaminador incluye inspecciones o edificaciones dañadas.
- **Terminado cuando:** los nombres siguen el contrato (`dro-01.jpg`…), las fotos tienen fuente registrada en el PR (oficial del Colegio o licencia libre) y no hay fotos con marca de agua.
- **Tiempo:** 2 días (+ reemplazo cuando llegue el material oficial)

#### DS3 · Galerías de Servicios (puntos 7 y 8)
- **Responsable:** María Fernanda Uribe
- **Rama:** `feat/assets-galerias-servicios`
- **Archivos:** `public/img/galerias/peritos/*`, `public/img/galerias/calculo/*`, `public/img/galerias/bolsa/*`
- **Entregable y criterio:** los mismos de DS2, con actividades de avalúo, cálculo estructural y vinculación laboral.
- **Tiempo:** 2 días (+ reemplazo cuando llegue el material oficial)

#### DS4 · Revisión visual de accesibilidad (puntos 1, 3 y 11)
- **Responsable:** María Fernanda Uribe
- **Rama:** no aplica (entrega un documento, no código)
- **Archivos:** `docs/Revision_Visual_CICTGZ.md` (nuevo)
- **Entregable:** del día 6 al 8, recorrido por todas las vistas en celular y escritorio con capturas, contraste medido (WebAIM) y lista de ajustes por archivo para cada dev.
- **Terminado cuando:** cada hallazgo indica vista, archivo y propuesta concreta, y se abre un issue por hallazgo.
- **Tiempo:** 1.5 días

---

### 📝 Documentación y Contenido
> Se editan **solo los textos entre comillas** de los archivos `.js`. Antes de abrir el PR, revisar que `npm run build` pase.

#### DC1 · Contenido de Servicio Social (punto 13)
- **Responsable:** Ignacio Moela
- **Rama:** `feat/contenido-servicio-social`
- **Archivos:** `src/data/servicioSocial.js`, `public/documentos/servicio-social-gratuito.pdf`
- **Entregable:** aviso de gratuidad, a quién va dirigido, pasos, requisitos y de 4 a 6 preguntas frecuentes, más un PDF de 1 a 2 páginas con el membrete del Colegio.
- **Terminado cuando:** la palabra «gratuito» aparece en el aviso y en el PDF, no hay datos inventados (lo no confirmado se marca `[POR CONFIRMAR]`) y la ortografía está revisada.
- **Tiempo:** 2 días

#### DC2 · Contenido de Beneficio a la Sociedad (punto 12)
- **Responsable:** José María Orantes
- **Rama:** `feat/contenido-beneficio-social`
- **Archivos:** `src/data/beneficioSocial.js`, `public/documentos/beneficio-social.pdf`
- **Entregable:** introducción, de 4 a 6 acciones de impacto social (tomadas de las publicaciones reales del Colegio en Facebook e Instagram), enlaces verificados y un PDF informativo.
- **Terminado cuando:** todos los enlaces abren y cada acción tiene fuente (link a la publicación).
- **Tiempo:** 2 días

#### DC3 · Servicios de Peritos y textos de galerías (puntos 5, 7 y 8)
- **Responsable:** Josué Balbuena
- **Rama:** `feat/contenido-peritos-galerias`
- **Archivos:** `src/data/peritosServicios.js`, `src/data/galerias.js` (solo los campos `alt` y `pie`)
- **Entregable:** de 6 a 8 servicios del perito valuador (avalúo comercial, judicial, para crédito, etc.) con texto de 1 a 2 líneas, y textos `alt` descriptivos para las 36 fotos.
- **Terminado cuando:** ningún `alt` dice «imagen» o «foto»; describen la escena. Los servicios se marcan `[POR CONFIRMAR]` hasta que el Colegio los valide.
- **Tiempo:** 1.5 días

---

### Mapa de propiedad de archivos (anti-conflictos)

| Archivo / carpeta | Dueño único |
|---|---|
| `GaleriaCarrusel/*`, `App.jsx`, `index.css` | Día 0 (Pablo); congelados después |
| `pages/Tramites/*/*.jsx`, `pages/Servicios/*/*.jsx` | Pablo (P1, P2) |
| `pages/Tramites/*/*.css`, `pages/Servicios/*/*.css`, `TramiteDetalle.css` | Pablo (P3) |
| `Header/*` | Daniel (D1) |
| `Hero/*`, `Footer/*`, `index.html` | Daniel (D2) |
| CSS de Inicio, Conócenos y Eventos | Daniel (D3) |
| `pages/Conocenos/BeneficioSocial/*`, `ServicioSocial/*` | Daniel (D4) |
| `organigrama.jpeg`, `patrones/*`, `cursos/*`, `galerias/{dro,rt,dictaminador}` | Jocelyn |
| `galerias/{peritos,calculo,bolsa}`, `docs/Revision_Visual_CICTGZ.md` | María Fernanda |
| `data/servicioSocial.js`, `documentos/servicio-social-gratuito.pdf` | Ignacio |
| `data/beneficioSocial.js`, `documentos/beneficio-social.pdf` | José María |
| `data/peritosServicios.js`, `data/galerias.js` | Josué |

### Calendario

| Fechas | Fase |
|---|---|
| Lun 26 oct | Día 0: base compartida en `main` |
| Mar 27 oct – Mié 4 nov | Ejecución en paralelo de todas las tarjetas (de 1 a 3 días cada una) |
| Jue 5 – Vie 6 nov | Merge de PR, revisión visual (DS4) y correcciones |
| Lun 9 nov | Build final y presentación al Consejo. Las fotos o textos oficiales que lleguen después se cambian sin tocar código |

---

## 4. Checklist de control del líder

### Día 0
- [ ] `Header.css` restaurado y árbol limpio
- [ ] `GaleriaCarrusel` creado y probado
- [ ] 4 archivos de datos creados (`galerias`, `peritosServicios`, `servicioSocial`, `beneficioSocial`)
- [ ] Rutas y menú de las 2 páginas nuevas
- [ ] `.fondo-trazos` + SVG temporal
- [ ] 36 slots de galería, 2 PDF temporales
- [ ] `npm run build` y `npm run lint` en verde
- [ ] Enviado el enlace de este documento al equipo

### Desarrollo Web
- [ ] P1 · Pablo · `feat/carrusel-tramites` (puntos 2, 5, 8)
- [ ] P2 · Pablo · `feat/carrusel-servicios` (puntos 7, 8)
- [ ] P3 · Pablo · `feat/legibilidad-tramites-servicios` (puntos 3, 4, 11)
- [ ] D1 · Daniel · `feat/header-color-cictgz` (puntos 1, 3, 6)
- [ ] D2 · Daniel · `feat/hero-footer-cictgz` (puntos 3, 4, 6)
- [ ] D3 · Daniel · `feat/legibilidad-inicio-conocenos-eventos` (puntos 3, 4, 11)
- [ ] D4 · Daniel · `feat/paginas-sociedad` (puntos 12, 13)

### Diseño UI/UX
- [ ] DS1 · Jocelyn · organigrama con CICTGZ (punto 9)
- [ ] DS1 · Jocelyn · SVG de trazos (punto 11)
- [ ] DS1 · Jocelyn · fotos de cursos en universidades (punto 10)
- [ ] DS2 · Jocelyn · galerías DRO / RT / Dictaminador (puntos 2, 5, 8)
- [ ] DS3 · María Fernanda · galerías Peritos / Cálculo / Bolsa (puntos 7, 8)
- [ ] DS4 · María Fernanda · revisión visual y de accesibilidad

### Documentación y Contenido
- [ ] DC1 · Ignacio · texto y PDF de Servicio Social (punto 13)
- [ ] DC2 · José María · texto, enlaces y PDF de Beneficio Social (punto 12)
- [ ] DC3 · Josué · servicios de Peritos y `alt` de galerías (puntos 5, 7, 8)

### Cierre
- [ ] Los 13 puntos verificados en `npm run preview`
- [ ] Sin scroll horizontal a 360px en ninguna vista
- [ ] Solo colores de la paleta oficial
- [ ] Material oficial del Colegio recibido y reemplazado (o marcado como pendiente)
- [ ] Ramas mergeadas y borradas

---

## Anexo A · `GaleriaCarrusel` (se crea el Día 0)

`src/components/ui/GaleriaCarrusel/GaleriaCarrusel.jsx`

```jsx
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectFade, Pagination } from "swiper/modules";
import { ImageOff } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "./GaleriaCarrusel.css";

// Carrusel automático de fotos para las vistas de Trámites y Servicios.
// Las fotos que no existan en public/ se ocultan solas: Diseño puede subir
// de 1 a 6 imágenes por servicio sin tocar el código.
const reducirMovimiento =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function GaleriaCarrusel({ fotos, intervalo = 4500 }) {
  const [rotas, setRotas] = useState([]);
  const visibles = fotos.filter((foto) => !rotas.includes(foto.src));
  const rotar = visibles.length > 1 && !reducirMovimiento;

  if (visibles.length === 0) {
    return (
      <div className="gc-vacio" role="img" aria-label="Galería en preparación">
        <ImageOff size={32} aria-hidden="true" />
        <span>Galería en preparación</span>
      </div>
    );
  }

  return (
    <Swiper
      className="gc-swiper"
      modules={[A11y, Autoplay, EffectFade, Pagination]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      speed={800}
      rewind
      autoplay={rotar ? { delay: intervalo, disableOnInteraction: false, pauseOnMouseEnter: true } : false}
      pagination={{ clickable: true }}
      a11y={{ paginationBulletMessage: "Ir a la foto {{index}}" }}
    >
      {visibles.map((foto, i) => (
        <SwiperSlide key={foto.src}>
          <img
            className="gc-img"
            src={foto.src}
            alt={foto.alt}
            loading={i === 0 ? "eager" : "lazy"}
            onError={() => setRotas((prev) => [...prev, foto.src])}
          />
          {foto.pie && <p className="gc-pie">{foto.pie}</p>}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
```

`src/components/ui/GaleriaCarrusel/GaleriaCarrusel.css`

```css
/* Selectores de dos clases para ganar a reglas como ".dro-figure img" */
.gc-swiper.swiper {
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: 16px;
  background: #e5e5e5;
  box-shadow: 0 12px 30px rgba(56, 54, 55, 0.15);
  --swiper-pagination-color: #ffffff;
  --swiper-pagination-bullet-inactive-color: #ffffff;
  --swiper-pagination-bullet-inactive-opacity: 0.55;
  --swiper-pagination-bullet-size: 10px;
}

.gc-swiper .swiper-slide { position: relative; height: 100%; }

.gc-swiper .gc-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
}

.gc-swiper .gc-pie {
  position: absolute;
  inset: auto 0 0 0;
  margin: 0;
  padding: 32px 16px 36px;
  color: #ffffff;
  font-size: 1rem;
  background: linear-gradient(transparent, rgba(56, 54, 55, 0.85));
}

.gc-vacio {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  aspect-ratio: 16 / 10;
  border-radius: 16px;
  background: #e5e5e5;
  color: #383637;
}
```

## Anexo B · Estructura de los archivos de datos (Día 0)

```js
// src/data/galerias.js: 6 slots por servicio; los que no existan se ocultan solos.
const slots = (carpeta, alt) =>
  Array.from({ length: 6 }, (_, i) => ({
    src: `/img/galerias/${carpeta}/${carpeta}-0${i + 1}.jpg`,
    alt,
    pie: "",
  }));

export const galerias = {
  dro: slots("dro", "Director Responsable de Obra supervisando una construcción"),
  rt: slots("rt", "Representante Técnico revisando planos de obra"),
  dictaminador: slots("dictaminador", "Inspección de daños en una edificación"),
  peritos: slots("peritos", "Perito valuador inspeccionando un inmueble"),
  calculo: slots("calculo", "Ingeniero revisando el cálculo estructural de un edificio"),
  bolsa: slots("bolsa", "Ingenieros civiles trabajando en obra"),
};
// DC3 (Josué) puede reemplazar slots(...) por un arreglo explícito
// para dar un alt y un pie distintos a cada foto.
```

```js
// src/data/peritosServicios.js
const peritosServicios = [
  { titulo: "Avalúo comercial", texto: "[POR CONFIRMAR] …" },
];
export default peritosServicios;
```

```js
// src/data/servicioSocial.js
export const servicioSocial = {
  aviso: "El trámite de servicio social en el CICTGZ es 100% gratuito.",
  intro: ["[POR CONFIRMAR] …"],
  dirigidoA: ["Estudiantes de Ingeniería Civil …"],
  pasos: [{ titulo: "…", texto: "…" }],
  requisitos: ["…"],
  preguntas: [{ pregunta: "¿Tiene algún costo?", respuesta: "No. …" }],
  pdf: "/documentos/servicio-social-gratuito.pdf",
};
```

```js
// src/data/beneficioSocial.js
export const beneficioSocial = {
  intro: ["[POR CONFIRMAR] …"],
  acciones: [{ titulo: "…", texto: "…", fuente: "https://…" }],
  documentos: [{ titulo: "Informe de impacto social", archivo: "/documentos/beneficio-social.pdf" }],
  enlaces: [{ titulo: "…", url: "https://…" }],
};
```

## Anexo C · SVG temporal de trazos (Día 0)

`public/img/patrones/trazos-arquitectonicos.svg`

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="480" height="480" viewBox="0 0 480 480">
  <g fill="none" stroke="#383637" stroke-opacity="0.06" stroke-width="1">
    <path d="M40 440 L40 280 L200 280 L200 440 M40 280 L120 200 L200 280"/>
    <path d="M280 120 h160 M280 110 v20 M440 110 v20"/>
    <circle cx="360" cy="360" r="48"/>
    <path d="M312 360 h96 M360 312 v96"/>
    <path d="M60 60 l80 80 M140 60 l-80 80"/>
  </g>
</svg>
```
