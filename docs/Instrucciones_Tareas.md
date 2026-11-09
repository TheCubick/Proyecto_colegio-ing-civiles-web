# Instrucciones detalladas de cada tarea: portal CICTGZ

Este documento explica **paso a paso** qué tiene que hacer cada integrante. El calendario y el resumen están en [`Plan_Fases_Equipo.md`](Plan_Fases_Equipo.md); aquí está el detalle.

**Cómo usarlo:**
1. Lee la **Parte 1** completa (vocabulario, cómo trabajar y cómo entregar). Aplica a todos.
2. Busca tu nombre en la **Parte 2** y sigue tus tareas en orden.
3. Si algo no está claro **después de leer tu tarea completa**, pregunta en el grupo indicando el ID de la tarea (por ejemplo, «Duda en F1-JB2, paso 3»).

---

# PARTE 1 · Lo que todos deben saber

## 1.1 Vocabulario mínimo

| Palabra | Qué significa en este proyecto |
|---|---|
| **Repositorio (repo)** | La carpeta del proyecto guardada en GitHub: `TheCubick/Proyecto_colegio-web`. |
| **`main`** | La versión oficial del sitio. **Nadie** trabaja ahí; solo Pablo une cambios a `main`. |
| **Rama** | Tu copia de trabajo, separada de `main`. Lo que hagas ahí no afecta a nadie hasta que Pablo lo una. Se llama `fase1/tu-nombre` o `fase2/tu-nombre`. |
| **Commit** | Un «guardado» de tus cambios con un mensaje que dice qué hiciste. |
| **Push** | Subir tus commits de tu computadora a GitHub. |
| **Pull Request (PR)** | La solicitud para que Pablo revise tu rama y la una a `main`. Es lo que se entrega en Classroom. |
| **Verificador** | El programa `npm run verificar`, que revisa las reglas del Colegio (colores, tamaño de letra, nombre, teléfonos, etc.). GitHub también lo corre solo en cada PR. |
| **`.jsx`** | Archivos que arman cada página (estructura y texto). |
| **`.css`** | Archivos de estilo: colores, tamaños, márgenes. |
| **`src/data/*.js`** | Archivos que guardan los textos y listas del sitio (requisitos, asambleas, etc.). |
| **`public/`** | Carpeta de imágenes, videos y PDF. Lo que está en `public/img/logo.png` se ve en el sitio como `/img/logo.png`. |
| **`rem`** | Unidad de tamaño de letra. En este sitio **el mínimo permitido es `0.95rem`** y el texto normal es `1rem` o más. |
| **Línea `X`** | Cuando una instrucción dice `Archivo.css:63`, significa «el archivo `Archivo.css`, línea 63». En VS Code: `Ctrl + G`, escribes el número y Enter. |

## 1.2 Reglas que nadie puede romper

1. **Nada inventado.** No se escribe ningún texto que el sitio presente como información del Colegio. Lo que manda el Colegio se copia **letra por letra**. **Prohibido usar ChatGPT u otra IA para redactar, resumir o «mejorar» textos del Colegio.**
2. **Cero datos personales:** ni teléfonos personales, ni domicilios, ni CURP, ni fotos personales de agremiados.
3. **Solo la paleta oficial:** `#BA2A33` (rojo), `#962E35` (rojo oscuro), `#383637` (gris oscuro), `#E5E5E5` (gris claro), `#FFFFFF` (blanco). Nada de azul, café ni negro puro.
4. **Letra mínima `0.95rem`.**
5. **Nombre exacto:** «Colegio de Ingenieros Civiles de Tuxtla Gutiérrez, A.C.» o «CICTGZ». Nunca «de Chiapas».
6. **Nombres de archivos y carpetas:** minúsculas, sin espacios, sin «ñ», sin acentos. Bien: `dro-01.jpg`. Mal: `Foto DRO 1.JPG`, `diseño.png`.
7. **Solo tocas los archivos de tu tarea.** Si necesitas otro, pregunta a Pablo antes.
8. **No instalas librerías** (`npm install algo` está prohibido; solo `npm install` sin nada más, para preparar el proyecto).

## 1.3 Forma A · Trabajar con la terminal (Fernanda, Josué, Ignacio, Daniel)

### Instalar una sola vez
1. **Git:** https://git-scm.com/download/win (siguiente, siguiente, finalizar).
2. **Node.js 22 LTS:** https://nodejs.org (versión «LTS»).
3. **VS Code:** https://code.visualstudio.com.
4. Abre **Git Bash** (se instaló con Git) y configura tu nombre (el mismo de tu cuenta de GitHub):
   ```bash
   git config --global user.name "Tu Nombre Apellido"
   git config --global user.email "el-correo-de-tu-github@ejemplo.com"
   ```

### Descargar el proyecto (una sola vez)
```bash
cd ~/Documents
git clone https://github.com/TheCubick/Proyecto_colegio-web.git
cd Proyecto_colegio-web/visuales
npm install
npm run dev
```
Abre en el navegador la dirección que aparece (normalmente `http://localhost:5173`). Si ves el sitio, todo está bien. Para detenerlo: `Ctrl + C` en la terminal.

> La primera vez que hagas `git push`, Git te pedirá iniciar sesión en GitHub en una ventana del navegador. Acepta.

### Crear tu rama (al inicio de cada fase)
```bash
cd ~/Documents/Proyecto_colegio-web
git checkout main
git pull
git checkout -b fase1/tu-nombre        # en la Fase 2: fase2/tu-nombre
git push -u origin fase1/tu-nombre
```
Nombres de rama: `fase1/fernanda`, `fase1/josue`, `fase1/ignacio`, `fase1/daniel`, `fase1/jocelyn`, `fase1/jose-maria`.

### Cada día que trabajes
```bash
cd ~/Documents/Proyecto_colegio-web
git checkout fase1/tu-nombre           # asegúrate de estar en TU rama
git pull                               # trae lo último de tu rama
# ... haces tus cambios en VS Code (Archivo → Abrir carpeta → Proyecto_colegio-web) ...
git status                             # muestra qué archivos cambiaste: revisa que sean SOLO los tuyos
git add ruta/del/archivo.css           # agrega uno por uno los archivos de tu tarea
git commit -m "Fix: tamaños de letra en Footer (F1-JB1)"
git push
```
**Mensajes de commit:** empiezan con `Fix:` (corrección), `Feat:` (algo nuevo) o `Docs:` (documentos), y terminan con el ID de la tarea entre paréntesis.

Si `git status` muestra un archivo que **no** es de tu tarea y no sabes por qué cambió, regrésalo a como estaba con `git restore ruta/del/archivo` antes de hacer commit.

### Antes de abrir tu PR (obligatorio)
Dentro de la carpeta `visuales`:
```bash
cd ~/Documents/Proyecto_colegio-web/visuales
git fetch origin
npm run lint        # revisa errores de código
npm run build       # comprueba que el sitio se puede publicar
npm run verificar   # revisa las reglas del Colegio en los archivos que cambiaste
```
Los tres deben terminar **sin errores**. Si `verificar` marca algo, el mensaje dice el archivo, la línea y qué está mal.

## 1.4 Forma B · Trabajar desde la página de GitHub (Jocelyn y José María)

No necesitas instalar nada.

### Crear tu rama
1. Entra a https://github.com/TheCubick/Proyecto_colegio-web.
2. Arriba a la izquierda hay un botón que dice **`main`** con una flechita. Haz clic.
3. Escribe el nombre de tu rama (por ejemplo `fase1/jocelyn`) y haz clic en **«Create branch fase1/jocelyn from main»**.
4. Comprueba que el botón ahora dice tu rama. **Siempre revisa ese botón antes de subir o editar algo.**

### Subir imágenes o archivos
1. Con tu rama seleccionada, entra a la carpeta donde va el archivo (por ejemplo `visuales` → `public` → `img`).
2. Botón **«Add file» → «Upload files»**.
3. Arrastra tus archivos. Si arrastras una **carpeta completa**, GitHub respeta las subcarpetas.
4. Abajo, en «Commit changes», escribe el mensaje (ej. `Feat: galería de DRO (F1-JA2)`).
5. Elige **«Commit directly to the `fase1/tu-nombre` branch»** y pulsa **«Commit changes»**.

### Editar un archivo de texto
1. Con tu rama seleccionada, abre el archivo.
2. Pulsa el **lápiz** (✏️ «Edit this file»), arriba a la derecha del contenido.
3. Haz el cambio. Para ir a una línea, mira los números de la izquierda.
4. Pulsa **«Commit changes…»**, escribe el mensaje con el ID de la tarea y confirma en tu rama.

En esta forma no corres el verificador en tu computadora: **GitHub lo corre solo cuando abres el PR** (ver 1.5).

## 1.5 Abrir el Pull Request y entregar en Classroom

1. En GitHub, después de tu push, aparece un aviso amarillo **«Compare & pull request»**. Haz clic. Si no aparece: pestaña **«Pull requests» → «New pull request»**, `base: main` y `compare: tu rama`.
2. **Título:** `F1-JB1 · Tamaños de letra fuera del header` (ID + qué hiciste).
3. La descripción ya trae una plantilla: **llénala completa** y marca las casillas. Si la tarea usa material del Colegio, pega ahí la captura de la fuente.
4. Pulsa **«Create pull request»**.
5. Espera 2 o 3 minutos. Abajo aparece la revisión automática:
   - ✅ **verde**: todo bien.
   - ❌ **roja**: haz clic en **«Details»**, lee el error, corrígelo en tu rama y haz push otra vez. El PR se actualiza solo.
6. **Entrega en Classroom:** el enlace del PR + una captura del resultado (la página funcionando, o la revisión en verde).

**Varias tareas en la misma rama:** si tu PR anterior todavía no se ha unido, tus commits nuevos se agregan solos a ese mismo PR. Entrega el mismo enlace en Classroom y agrega la tarea nueva en la descripción del PR. Si ya se unió, abre un PR nuevo desde la misma rama.

## 1.6 Reporte diario

Antes de las **21:00**, en el grupo:
```text
F1-JB1 · Hice: Footer.css y Comisiones.css (14 de 56). Haré: Trámites. Bloqueos: ninguno.
```

---

# PARTE 2 · Tareas por integrante

> **Estructura del código (9 nov).** El código se reorganizó para que cada cosa viva en un solo lugar. Los números de línea de este documento ya corresponden a la estructura nueva. Lo más importante:
> - **Textos y datos** → `src/data/` (por ejemplo, teléfonos, WhatsApp y horario en `data/contacto.js`; cursos en `data/cursos.js`).
> - **Lista de páginas y menús** → `src/config/rutas.js`.
> - **DRO, RT y Dictaminador** comparten la plantilla `components/templates/PaginaTramite/`; **Peritos y Cálculo**, la plantilla `components/templates/PaginaServicio/`. Ya no existen `Dro.jsx`, `Rt.jsx`, `Dictaminador.jsx`, `PeritosValuadores.jsx` ni `CalculoEstructural.jsx`.
> - El pop-up «Afíliate» salió del Header: `components/ui/ModalAfiliacion/`.
> La tabla completa «qué archivo abrir para cada página» está en el README → «Mapa de rutas».

## Día 0 · Todos (lun 9 nov, antes de las 14:00)

| Paso | Forma A (terminal) | Forma B (GitHub web: Jocelyn y José María) |
|---|---|---|
| 1 | Envía a Pablo tu usuario de GitHub (si no tienes, créalo en https://github.com/signup) | Igual |
| 2 | Acepta la invitación que llega a tu correo («You've been invited to collaborate») | Igual |
| 3 | Instala y descarga el proyecto (1.3) y comprueba que `npm run dev` abre el sitio | No aplica |
| 4 | Crea tu rama `fase1/tu-nombre` (1.3) y haz `git commit --allow-empty -m "Docs: inicio fase 1"` + `git push` | Crea tu rama desde la página (1.4) |
| 5 | Únete a Classroom y abre la carpeta del Drive | Igual |

**Entrega en Classroom:** captura de tu rama en GitHub (la página del repo con tu rama seleccionada en el botón de arriba a la izquierda).

---

## 💻 María Fernanda Uribe · Desarrollo

Puedes usar Claude CLI. Dile que lea `CLAUDE.md` y que trabaje **solo en los archivos de la tarea**. Revisa siempre lo que te propone antes de aceptarlo y **no le pidas que redacte textos del Colegio**.

### F1-MF1 · Componente de carrusel `GaleriaCarrusel` · mar 10, 20:00

**Qué es:** el Consejo pidió que las fotos de Trámites y Servicios cambien solas (carrusel automático). Creas un componente que recibe una lista de fotos, las rota con efecto de desvanecido y **oculta las fotos que todavía no existen**, para que Jocelyn pueda subir de 1 a 6 sin tocar código.

**Archivos que creas:**
- `visuales/src/components/ui/GaleriaCarrusel/GaleriaCarrusel.jsx`
- `visuales/src/components/ui/GaleriaCarrusel/GaleriaCarrusel.css`
- `visuales/src/data/galerias.js`

**Pasos:**
1. Copia el código del **Anexo A** de `docs/Auditoria_Y_Tareas_CICTGZ.md` (desde la línea 363) en los dos archivos del componente.
2. Agrega una propiedad opcional **`respaldo`** (`{ src, alt }`): si no queda **ninguna** foto visible, en lugar de «Galería en preparación» se muestra la foto de respaldo (la que hoy tiene cada página). Solo si tampoco hay respaldo se muestra «Galería en preparación».
   ```jsx
   export default function GaleriaCarrusel({ fotos, respaldo, intervalo = 4500 }) {
     // ...
     if (visibles.length === 0) {
       if (respaldo) return <img className="gc-respaldo" src={respaldo.src} alt={respaldo.alt} />;
       return ( /* bloque gc-vacio del Anexo A */ );
     }
   ```
   Dale a `.gc-respaldo` el mismo tamaño que el carrusel (`width: 100%; aspect-ratio: 16 / 10; object-fit: cover; border-radius: 16px;`).
3. Crea `galerias.js` con la función `slots` del **Anexo B** (solo la parte de `galerias`, no los otros archivos del anexo). Rutas: `/img/galerias/<servicio>/<servicio>-01.jpg` … `-06.jpg`.
4. Revisa que los `import` de Swiper sean iguales a los de `src/components/sections/BannerCarrusel/BannerCarrusel.jsx` (el proyecto usa Swiper 14 con `swiper/modules`).
5. **Prueba temporal:** copia dos fotos cualesquiera como `public/img/galerias/dro/dro-01.jpg` y `dro-02.jpg`, pon `<GaleriaCarrusel fotos={galerias.dro} />` dentro del `<figure>` de `components/templates/PaginaTramite/PaginaTramite.jsx` y comprueba en `/tramites/dro` que rotan. **No subas esas fotos de prueba ni el cambio en la plantilla** (eso es la tarea MF2).

**Terminado cuando:**
- Con 2 o más fotos, rotan solas cada 4.5 segundos y se pausan con el mouse encima.
- Con 1 foto, se muestra fija y sin rotar.
- Con 0 fotos y respaldo, se ve el respaldo; sin respaldo, «Galería en preparación».
- Con «Efectos de animación» desactivado en Windows (Configuración → Accesibilidad → Efectos visuales), no rota.
- `npm run lint`, `npm run build` y `npm run verificar` pasan.

**Entrega:** PR + captura del carrusel funcionando.

### F1-MF2 · Carrusel en las 6 páginas de Trámites y Servicios · jue 12, 20:00

**Qué es:** cambiar la foto fija de cada página por el carrusel de MF1. Gracias a las plantillas, son **3 archivos** en lugar de 6: un cambio en `PaginaTramite.jsx` aplica a DRO, RT y Dictaminador, y uno en `PaginaServicio.jsx` aplica a Peritos y Cálculo.

**Archivos y líneas** (la foto fija es el componente `<ImagenSegura … />` dentro del `<figure>`):

| Páginas | Archivo (en `visuales/src/`) | `<ImagenSegura` (línea) | Galería | Respaldo |
|---|---|---|---|---|
| DRO, RT, Dictaminador | `components/templates/PaginaTramite/PaginaTramite.jsx` | 55 | `galerias[datos.galeria]` | `{ src: queEs.imagen, alt: queEs.alt }` |
| Peritos, Cálculo | `components/templates/PaginaServicio/PaginaServicio.jsx` | 46 | `galerias[datos.galeria]` | `{ src: imagen, alt }` |
| Bolsa | `pages/Servicios/BolsaTrabajo/BolsaTrabajo.jsx` | 64 | `galerias.bolsa` | ninguno (Pablo quitó `bolsa.jpg` en F1-PR0) |

**Pasos:**
1. **Di a cada página cuál es su galería.** En `src/data/tramites.js` agrega `galeria: "dro",` dentro de `dro`, `galeria: "rt",` dentro de `rt` y `galeria: "dictaminador",` dentro de `dictaminador`. En `src/data/servicios.js`, `galeria: "peritos",` y `galeria: "calculo",`. (Agrega también `galeria` a la lista de campos del comentario de cada archivo.)
2. En los 3 archivos, importa el componente y los datos:
   ```jsx
   import GaleriaCarrusel from "../../ui/GaleriaCarrusel/GaleriaCarrusel";      // en las plantillas
   import { galerias } from "../../../data/galerias";
   ```
   En `BolsaTrabajo.jsx` la primera ruta es `"../../../components/ui/GaleriaCarrusel/GaleriaCarrusel"`.
3. Dentro del `<figure>`, reemplaza todo el bloque `<ImagenSegura … />` por (ejemplo de `PaginaTramite.jsx`):
   ```jsx
   <GaleriaCarrusel
     key={datos.galeria}
     fotos={galerias[datos.galeria]}
     respaldo={{ src: queEs.imagen, alt: queEs.alt }}
   />
   ```
   El `key` hace que el carrusel vuelva a empezar al pasar de DRO a RT. En `PaginaServicio.jsx` el respaldo es `{{ src: imagen, alt }}`; en `BolsaTrabajo.jsx`, `<GaleriaCarrusel fotos={galerias.bolsa} />` sin respaldo.
4. Borra los `import` de `ImagenSegura` que ya no se usen. `npm run lint` te avisa si algo sobra.
5. En `src/data/servicios.js`, línea 21 (`intro` de Peritos), cambia «Colegio de Ingenieros Civiles.» por **«Colegio de Ingenieros Civiles de Tuxtla Gutiérrez, A.C.»**.
6. Revisa las 6 páginas en el navegador, en computadora y en celular (F12 → `Ctrl + Shift + M`).

**Terminado cuando:** en las 6 páginas se ve el carrusel (o el respaldo), nada se deforma y los tres comandos pasan.

### F1-MF3 · Header nuevo · sáb 14, 20:00

**Qué es:** el Consejo dijo que sobre los videos no se leen las letras del menú, y que en las páginas sin video el header blanco «se ve muy blanco». La especificación completa está en `CLAUDE.md` → «Especificación del HEADER». Resumen:

| Situación | Fondo del header | Letras del menú |
|---|---|---|
| Página **con** video o imagen de portada **y** arriba del todo | Transparente con velo oscuro degradado: `linear-gradient(to bottom, rgba(56,54,55,0.55), rgba(56,54,55,0))` | Blancas, con sombra suave `0 1px 3px rgba(56,54,55,0.6)` |
| Página **sin** portada | Rojo `#BA2A33` sólido | Blancas |
| Cualquier página al hacer scroll | Rojo `#BA2A33` (o `#962E35` en versión compacta) | Blancas |

Páginas **con** portada: `/`, `/tramites/dro`, `/tramites/rt`, `/conocenos/mision-y-vision`.

**Archivos:** `src/components/layout/Header/Header.jsx`, `Header.css` y `src/components/ui/ModalAfiliacion/ModalAfiliacion.css` (solo tamaños de letra).

**Pasos:**
1. En `Header.jsx` ya existen `useLocation` y el estado `scrolled` (línea 29, se activa al bajar más de 40 px). La lista de páginas con portada **ya existe**: es `RUTAS_CON_PORTADA` en `src/config/rutas.js` (sale del campo `portada: true` de cada página). Impórtala en la línea 5:
   ```jsx
   import { menus, RUTAS_CON_PORTADA } from "../../../config/rutas";
   ```
   y dentro del componente:
   ```jsx
   const sobreMedia = RUTAS_CON_PORTADA.includes(location.pathname) && !scrolled;
   ```
2. En la línea 88 (`className={`hd-header ...`}`) agrega la clase `hd-sobre-media` cuando `sobreMedia` sea verdadero y `hd-solido` cuando no.
3. En `Header.css`:
   - Quita el «cristal blanco» actual (`rgba(255,255,255,0.85)` con `blur(12px)`).
   - `.hd-header.hd-sobre-media`: el degradado de la tabla, sin sombra ni desenfoque.
   - `.hd-header.hd-solido`: `background: #BA2A33;`.
   - Letras **blancas** en el logo-texto, los enlaces principales del menú y el botón de hamburguesa, en ambos modos.
   - Los **desplegables** y el **menú del celular** siguen blancos con texto `#383637`: limita las reglas de letras blancas a los enlaces de primer nivel para que no se cuelen a los desplegables.
   - Estados `:hover` y `:focus-visible` visibles sobre rojo (por ejemplo, subrayado blanco o fondo `#962E35`).
4. **Logo-texto con siglas** (líneas 96-100): ejemplo. Las siglas ya están en `SIGLAS` de `data/contacto.js` si prefieres importarlas.
   ```jsx
   <span className="hd-logo-text">
     <strong>CICTGZ</strong>
     <small>Colegio de Ingenieros Civiles de Tuxtla Gutiérrez, A.C.</small>
   </span>
   ```
   El `<small>` también debe medir 0.95rem como mínimo. Si en celular no cabe, ahí se puede ocultar el `<small>` y dejar solo «CICTGZ».
5. Corrige los **26 tamaños de letra** menores a 0.95rem: `Header.css` líneas 78, 105, 173, 227, 376, 445 y 450; `ModalAfiliacion.css` (el pop-up «Afíliate») líneas 79, 114, 137, 185, 223, 237, 270, 292, 354, 361, 388, 407, 416, 437, 483, 538, 563, 580 y 615. Súbelos a `0.95rem`, o a `1rem` si es texto de lectura.
6. **Horario:** ya no está en el Header. Todo el sitio lo lee de `src/data/contacto.js`, y lo actualiza José María cuando el Colegio lo confirme (F1-JM2). No lo toques.
7. Prueba en las 4 páginas con portada (arriba y al bajar), en 3 páginas sin portada, con el menú abierto en celular y con los desplegables abiertos.

**Terminado cuando:** el menú se lee perfecto sobre los 4 videos y sobre rojo, los desplegables se leen, el verificador no marca nada en `Header.css` ni en `ModalAfiliacion.css` y los tres comandos pasan.

**Entrega:** PR + 3 capturas (página con video arriba, la misma al bajar y una página sin video).

### F1-MF4 · Siglas CICTGZ, nombre completo y favicon · sáb 14, 20:00

**Archivos:** `src/components/sections/Hero/Hero.jsx`, `src/components/layout/Footer/Footer.jsx`, `visuales/index.html`.

**Pasos:**
1. **`Hero.jsx`:**
   - Línea 14, `aria-label` del video: «Video de presentación del Colegio de Ingenieros Civiles de Tuxtla Gutiérrez, A.C.»
   - Línea 33, `alt` del logo: «Logo del Colegio de Ingenieros Civiles de Tuxtla Gutiérrez, A.C. (CICTGZ)»
   - Agrega las siglas visibles, por ejemplo en la etiqueta superior (línea 21): «CICTGZ · Tuxtla Gutiérrez, Chiapas».
2. **`Footer.jsx`:**
   - Líneas 50-51 (texto junto al logo): agrega **CICTGZ** y deja el nombre como «Colegio de Ingenieros Civiles de Tuxtla Gutiérrez, A.C.»
   - Línea 134 (derechos reservados): cambia «Tuxtla Gutiérrez A.C.» por «Tuxtla Gutiérrez**,** A.C.» (falta la coma).
   - WhatsApp y horario: **ya no van aquí**. El Footer los lee de `src/data/contacto.js` (ya se unificó el WhatsApp al 961-119-0009); los confirma José María.
3. **`index.html`:**
   ```html
   <title>CICTGZ | Colegio de Ingenieros Civiles de Tuxtla Gutiérrez, A.C.</title>
   <meta name="description" content="Sitio del Colegio de Ingenieros Civiles de Tuxtla Gutiérrez, A.C. (CICTGZ): requisitos de ingreso, trámites de DRO, RT y Dictaminador de Riesgos, cursos y contacto." />
   <link rel="icon" type="image/svg+xml" href="/img/logos/logo-colegio.svg" />
   ```
4. Revisa la pestaña del navegador: debe mostrar el logo y el título nuevo.

**Terminado cuando:** `npm run verificar -- --todo` ya no muestra advertencias de «Nombre» en `index.html`, `Hero.jsx` ni `Footer.jsx`, y los tres comandos pasan.

### F2-MF1 · Servicio Social y Beneficio a la Sociedad · jue 19, 20:00

**Depende de lo que haya mandado el Colegio.** José María avisa el **mar 17 a las 21:00** qué llegó. Los textos los carga él (F2-JM1) en `src/data/servicioSocial.js` y `src/data/beneficioSocial.js`; **tú no escribes texto**, solo armas la página que los muestra.

**Caso A · llegó el material de servicio social:**
1. Crea `src/pages/Conocenos/ServicioSocial/ServicioSocial.jsx` y `.css`, con el mismo estilo que `MisionVision` o `Comisiones` (portada pequeña, secciones con `fondo-cuadricula`, párrafos con `texto-justificado`).
2. Muestra solo los campos que tengan contenido. Si el Colegio mandó PDF, agrega un botón «Descargar PDF».
3. En `src/config/rutas.js`, dentro del bloque «Conócenos», agrega:
   ```js
   {
     ruta: "/conocenos/servicio-social",
     titulo: "Servicio Social",
     grupo: "Conócenos",
     icono: HandHeart,
   },
   ```
   (agrega `HandHeart` al `import` de `lucide-react` de ese archivo). Con eso aparece sola en el menú, en el menú del celular, en el Footer y en las migas de pan; **no edites `Header.jsx` ni `Footer.jsx`**.
4. En `src/App.jsx`, importa la página y agrégala al objeto `paginas`: `"/conocenos/servicio-social": <ServicioSocial />,`.
5. Usa `<Migas className="ss-breadcrumb" />` para las migas de pan (no las escribas a mano).

**Caso B · no llegó:** no se crea la página. En `MisionVision.jsx` agrega un bloque corto, con el estilo de las tarjetas existentes:
> **Servicio social gratuito.** El Colegio ofrece servicio social de manera gratuita. Informes únicamente en nuestras oficinas o por los teléfonos oficiales.

**Beneficio a la Sociedad:** solo si llegó material. Mismos pasos que el Caso A, con la ruta `/conocenos/beneficio-social`. Si no llegó, **no se hace nada**.

### F2-MF2 · Página 404 y Código de Ética · jue 19, 20:00

1. Crea `src/pages/NoEncontrada/NoEncontrada.jsx` y `.css`: título «Página no encontrada», una línea explicativa, botón «Volver al inicio» y enlaces a Trámites, Cursos y Contacto. Fondo con `fondo-cuadricula`.
2. En `App.jsx`, línea 48, cambia `<Route path="*" element={<Navigate to="/" replace />} />` por `<Route path="*" element={<NoEncontrada />} />` y quita `Navigate` del `import` si ya no se usa.
3. **Código de Ética:** solo si el Colegio mandó el PDF. Va en `public/documentos/codigo-de-etica.pdf` (o en un enlace del Drive que te pase José María). En `Footer.jsx` (líneas 135-138, donde Pablo dejó vacía la lista en F1-PR0) agrega `<a href="/documentos/codigo-de-etica.pdf" target="_blank" rel="noopener noreferrer">Código de Ética</a>`. Si no llegó, no se agrega nada.
4. Prueba entrando a `http://localhost:5173/cualquier-cosa`.

### F2-MF3 · Velocidad de carga y Open Graph · vie 20, 20:00

1. **Carga diferida** en `App.jsx`: deja `Inicio` con `import` normal y cambia las demás páginas a:
   ```jsx
   import { lazy, Suspense } from "react";
   const PaginaTramite = lazy(() => import("./components/templates/PaginaTramite/PaginaTramite"));
   const BolsaTrabajo = lazy(() => import("./pages/Servicios/BolsaTrabajo/BolsaTrabajo"));
   // ... igual para PaginaServicio y cada página de src/pages/ (menos Inicio)
   ```
   Envuelve `<Routes>` en `<Suspense fallback={<p className="cargando">Cargando…</p>}>`.
2. Ejecuta `npm run build`: la advertencia de «chunks larger than 500 kB» debe desaparecer.
3. **Open Graph** en `index.html` (para que al compartir el enlace en WhatsApp o Facebook salga una tarjeta con imagen):
   ```html
   <meta property="og:type" content="website" />
   <meta property="og:locale" content="es_MX" />
   <meta property="og:title" content="CICTGZ | Colegio de Ingenieros Civiles de Tuxtla Gutiérrez, A.C." />
   <meta property="og:description" content="(la misma descripción del meta description)" />
   <meta property="og:image" content="https://DOMINIO/img/og-cictgz.jpg" />
   <meta name="twitter:card" content="summary_large_image" />
   ```
   `DOMINIO` es la dirección que Pablo publica el mié 18. La imagen la hace Jocelyn (F2-JA2).

### F2-MF4 · Fondo de trazos y animación de aparición · parte 1: mar 17, 20:00 · parte 2: sáb 21, 20:00

**Parte 1 (la necesita Josué el mar 17):** en `src/styles/index.css`, junto a `.fondo-cuadricula`, crea:
```css
/* Clase duplicada a propósito: gana a los "background" de cada componente */
.fondo-trazos.fondo-trazos {
  background-image: url("/img/patrones/trazos-arquitectonicos.svg");
  background-repeat: repeat;
  background-size: 320px auto;
}
```
El SVG lo sube Jocelyn (F1-JA3). Comprueba que se ve tenue y que el texto encima se sigue leyendo.

**Parte 2 · animación:** también en `index.css`, una clase `.aparecer` que haga aparecer suavemente las secciones al bajar, **solo con CSS** y solo para quien no pidió reducir el movimiento:
```css
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .aparecer {
      animation: aparecer linear both;
      animation-timeline: view();
      animation-range: entry 0% cover 25%;
    }
  }
}
@keyframes aparecer {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: none; }
}
```
En los navegadores que no lo soportan, las secciones simplemente se ven sin animación. Avisa a Pablo en qué secciones aplicarla; no edites archivos de otros.

---

## 🛠️ Josué Balbuena · Ajustes de código con instrucciones exactas

Tus tareas son mecánicas: el verificador te dice archivo y línea, y terminas cuando deja de marcarlos. **No cambies nada que no diga la tarea.** Trabajas con la Forma A (1.3).

### F1-JB1 · Tamaños de letra fuera del header · mié 11, 20:00

**Qué es:** los usuarios del sitio son adultos con vista cansada. Hay **48** tamaños de letra por debajo del mínimo (`0.95rem`) fuera del header.

**Archivos:** todos los `.css` de la lista de abajo. **No toques** `Header.css`, `ModalAfiliacion.css` (son de Fernanda), `TramiteDetalle.css` ni `index.css`.

**Pasos:**
1. En `visuales`, ejecuta `npm run verificar -- --todo` y busca las líneas `[Tipografía]` que **no** son de `Header.css` ni de `ModalAfiliacion.css`.
2. Abre cada archivo en VS Code, ve a la línea (`Ctrl + G`) y cambia el valor:
   - Si el número es menor a `0.95rem` → ponlo en **`0.95rem`**.
   - Si el selector de esa regla termina en `p` o tiene `intro`, `texto`, `desc` o `resumen` (es un párrafo) → ponlo en **`1rem`**.
   - **Casos `clamp()`** en `BannerCarrusel.css`: solo cambia el **primer** número.
     - Línea 153: `clamp(0.65rem, 1cqw, 0.78rem)` → `clamp(0.95rem, 1cqw, 1rem)`
     - Línea 180: `clamp(0.88rem, 1.45cqw, 1.05rem)` → `clamp(0.95rem, 1.45cqw, 1.05rem)`
3. Lista completa (archivo: líneas):
   - `components/layout/Footer/Footer.css`: 13, 63, 81, 123, 179, 241, 247, 271
   - `components/sections/AtencionWhatsapp/AtencionWhatsapp.css`: 46, 176, 189, 226, 260
   - `components/sections/BannerCarrusel/BannerCarrusel.css`: 153, 180, 371
   - `components/sections/Hero/Hero.css`: 52
   - `components/templates/PaginaTramite/PaginaTramite.css` (DRO, RT y Dictaminador a la vez): 43, 64, 136
   - `components/templates/PaginaServicio/PaginaServicio.css` (Peritos y Cálculo a la vez): 63, 196
   - `components/ui/ModalContacto/ModalContacto.css`: 143, 182
   - `pages/Conocenos/Comisiones/Comisiones.css`: 64, 85, 191
   - `pages/Conocenos/MisionVision/MisionVision.css`: 48, 70, 201, 276, 383
   - `pages/Eventos/Asambleas/Asambleas.css`: 38, 97, 114, 222
   - `pages/Eventos/CursosCapacitacion/CursosCapacitacion.css`: 62, 149, 177, 311, 329, 563, 568, 597
   - `pages/Servicios/BolsaTrabajo/BolsaTrabajo.css`: 63, 196, 326, 344

   (Todos dentro de `visuales/src/`.)
4. Con `npm run dev` abierto, revisa cada página que tocaste: los textos no deben salirse de sus botones o tarjetas. Si algo se rompe, toma captura y avisa en el grupo **sin** intentar arreglarlo cambiando otras cosas.
5. Haz un commit por cada 3 o 4 archivos: `Fix: tamaños de letra en Footer y Hero (F1-JB1)`.

**Terminado cuando:** `npm run verificar -- --todo` no muestra ninguna línea `[Tipografía]` fuera de `Header.css` y `ModalAfiliacion.css`.

**Entrega:** PR + captura de la salida del verificador.

### F1-JB2 · Colores fuera de la paleta · jue 12, 20:00

**Qué es:** el sitio usa algunos colores que no son los oficiales (incluido un tono café) y sombras en negro puro. Se cambian por los oficiales **manteniendo la misma transparencia**.

**Cambios exactos** (busca el texto de la izquierda en esa línea y reemplázalo por el de la derecha; el resto de la línea queda igual):

| Archivo (en `visuales/src/`) | Línea | Cambia | Por |
|---|---|---|---|
| `components/sections/FeatureCards/FeatureCards.css` | 3 | `background: #a01a20` | `background: #962E35` |
| `components/sections/FeatureCards/FeatureCards.css` | 3 | `rgb(0 0 0 / 20%)` | `rgb(56 54 55 / 20%)` |
| `components/sections/FeatureCards/FeatureCards.css` | 7 | `#f1f1f1` | `#E5E5E5` |
| `components/sections/BannerCarrusel/BannerCarrusel.css` | 114 | `rgba(25, 20, 20, 0.85)` | `rgba(56, 54, 55, 0.92)` |
| `components/sections/BannerCarrusel/BannerCarrusel.css` | 115 | `rgba(25, 20, 20, 0.35)` | `rgba(56, 54, 55, 0.4)` |
| `components/sections/BannerCarrusel/BannerCarrusel.css` | 349 | `rgba(25, 20, 20, 0.9)` | `rgba(56, 54, 55, 0.95)` |
| `components/sections/BannerCarrusel/BannerCarrusel.css` | 163 | `rgba(0, 0, 0, 0.5)` | `rgba(56, 54, 55, 0.5)` |
| `components/sections/BannerCarrusel/BannerCarrusel.css` | 182 | `rgba(0, 0, 0, 0.55)` | `rgba(56, 54, 55, 0.55)` |
| `components/sections/BannerCarrusel/BannerCarrusel.css` | 195 | `rgba(0, 0, 0, 0.25)` | `rgba(56, 54, 55, 0.25)` |
| `pages/Eventos/CursosCapacitacion/CursosCapacitacion.css` | 51 | `#f3f3f3` | `#E5E5E5` |
| `pages/Eventos/CursosCapacitacion/CursosCapacitacion.css` | 377 | `rgba(0, 0, 0, 0.35)` | `rgba(56, 54, 55, 0.35)` |
| `pages/Eventos/CursosCapacitacion/CursosCapacitacion.css` | 406 | `rgba(0, 0, 0, 0.2)` | `rgba(56, 54, 55, 0.2)` |
| `components/sections/Hero/Hero.css` | 65 | `rgb(0 0 0 / 50%)` | `rgb(56 54 55 / 50%)` |
| `components/sections/Hero/Hero.css` | 87 | `rgb(0 0 0 / 80%)` | `rgb(56 54 55 / 80%)` |
| `components/ui/ModalContacto/ModalContacto.css` | 19 | `rgba(0, 0, 0, 0.35)` | `rgba(56, 54, 55, 0.35)` |
| `pages/Conocenos/MisionVision/MisionVision.css` | 564 | `rgb(0 0 0 / 50%)` | `rgb(56 54 55 / 50%)` |
| `pages/Conocenos/MisionVision/MisionVision.css` | 573 | `rgb(0 0 0 / 80%)` | `rgb(56 54 55 / 80%)` |
| `components/templates/PaginaTramite/PaginaTramite.css` | 389 | `rgb(0 0 0 / 50%)` | `rgb(56 54 55 / 50%)` |
| `components/templates/PaginaTramite/PaginaTramite.css` | 398 | `rgb(0 0 0 / 80%)` | `rgb(56 54 55 / 80%)` |

> Si hiciste primero la tarea JB1, los números de línea pueden haberse movido 1 o 2 líneas: busca el texto con `Ctrl + F`.

**Revisa en el navegador:** Inicio (tarjetas rojas y carrusel), Cursos, DRO, RT y Misión y Visión. Los textos sobre fotos y videos se deben seguir leyendo igual que antes.

**Terminado cuando:** `npm run verificar -- --todo` no muestra errores `[Paleta]` ni advertencias de «Negro puro».

### F1-JB3 · Quitar leyes citadas sin respaldo · sáb 14, 20:00

**Qué es:** la información ampliada de DRO, RT y Dictaminador cita leyes y reglamentos que el Colegio nunca nos dio. Eso puede ser falso y es un riesgo legal. **Solo borras y pegas el texto indicado; no redactas nada.**

**Archivo:** `visuales/src/data/tramitesInfo.js`

**Pasos:**
1. **Borra la línea 190 completa**, la que empieza con `"La Ley de Protección Civil del Estado de Chiapas...`. Bórrala primero porque, si empiezas por arriba, las líneas de abajo se mueven.
2. **Borra la línea 133 completa** (`"Para participar en licitaciones y contratos de obra pública en Chiapas...`).
3. **Borra la línea 76 completa** (`"El Reglamento de Construcción del municipio de Tuxtla Gutiérrez establece...`).
4. Arriba del archivo, en `pasosContratacion` (líneas 6-27), **borra los pasos 3 y 4** (los objetos con `titulo: "Recibe el directorio oficial"` y `titulo: "Formaliza la contratación"`) y pega en su lugar exactamente esto:
   ```js
     {
       titulo: "Acude a las oficinas",
       texto: `Todo el trámite se realiza de forma presencial en las oficinas del Colegio, donde te orientan para contactar a un ${perito} con registro vigente.`,
     },
   ```
   Fíjate en las comillas: este texto usa **acentos graves** (`` ` ``), no comillas normales, porque lleva `${perito}`.
5. Abre `/tramites/dro`, `/tramites/rt` y `/tramites/dictaminador-de-riesgos` y comprueba que la sección se ve bien y que el paso nuevo dice el nombre correcto en cada página.

**Terminado cuando:** las tres páginas cargan sin error, `npm run lint` y `npm run build` pasan y en el archivo ya no aparece la palabra «Ley» ni «Reglamento» en esas tres partes.

### F2-JB1 · Aplicar el fondo de trazos · jue 19, 20:00

**Qué es:** el Consejo no quiere secciones totalmente blancas. Fernanda crea la clase `fondo-trazos` el mar 17; tú la agregas a las secciones blancas.

**Pasos:** en cada línea, agrega ` fondo-trazos` **al final del texto de `className`**, dentro de las comillas:

| Archivo (en `visuales/src/`) | Línea | Antes | Después |
|---|---|---|---|
| `components/sections/FeatureCards/FeatureCards.jsx` | 7 | `className="cards-section"` | `className="cards-section fondo-trazos"` |
| `components/sections/AtencionWhatsapp/AtencionWhatsapp.jsx` | 64 | `className="aw-section"` | `className="aw-section fondo-trazos"` |
| `pages/Eventos/CursosCapacitacion/CursosCapacitacion.jsx` | 267 | `className="cc-cursos"` | `className="cc-cursos fondo-trazos"` |
| `pages/Eventos/CursosCapacitacion/CursosCapacitacion.jsx` | 287 | `className="cc-muro"` | `className="cc-muro fondo-trazos"` |
| `pages/Eventos/Asambleas/Asambleas.jsx` | 107 | `className="asm-listado asm-container"` | `className="asm-listado asm-container fondo-trazos"` |
| `pages/Conocenos/Comisiones/Comisiones.jsx` | 26 | `className="com-section"` | `className="com-section fondo-trazos"` |

Si el mar 17 la clase `fondo-trazos` todavía no existe en `src/styles/index.css`, usa **`fondo-cuadricula`** en su lugar (esa ya existe).

**Revisa:** cada sección muestra el patrón tenue y el texto se lee bien. Si en alguna no se ve el patrón, toma captura y avisa a Fernanda.

### F2-JB2 · Dejar `tramitesInfo.js` solo con información con fuente · vie 20, 20:00

**Qué es:** el plan B de la información de trámites. Todo lo que no venga de una fuente del Colegio se borra.

**Fuentes válidas** (y nada más):
1. El tríptico: `public/img/documentos/triptico-enfrente.jpg` y `triptico-atras.jpg`.
2. Lo que el Colegio haya mandado, según el **registro de fuentes** de José María en el Drive (`07_Admin/registro_fuentes`).
3. Las entrevistas (la transcripción de Ignacio de octubre está en el Drive).

**Pasos:**
1. Imprime o abre `tramitesInfo.js` y, frase por frase, marca de dónde sale cada una.
2. Lo que **no** encuentres en ninguna fuente: **bórralo**. Si una lista o sección queda vacía, déjala como lista vacía (`[]`) y avisa a Fernanda para que esa sección no se muestre.
3. Si el Colegio mandó texto oficial de algún trámite, pégalo **letra por letra** en el campo que corresponda.
4. En el PR, adjunta una tabla «frase → fuente» de lo que quedó.

---

## 🛠️ Ignacio Moela · Ajustes aislados y revisión

Tus tareas no frenan a nadie, pero tienen fecha y la regla de reasignación aplica igual. Trabajas con la Forma A (1.3).

### F1-IM1 · Justificar los párrafos largos · jue 12, 20:00

**Qué es:** el Consejo pidió texto justificado (alineado a ambos lados, como en un libro).

**Regla para no chocar con Josué:** Josué edita líneas de estos mismos archivos. Tú **no editas ninguna línea existente**: solo **agregas un bloque nuevo al final** de cada archivo.

**Pasos:** al final de cada archivo (en `visuales/src/`), pega el bloque indicado:

- `pages/Eventos/CursosCapacitacion/CursosCapacitacion.css`
  ```css
  /* Texto justificado (F1-IM1) */
  .cc-intro,
  .cc-curso p,
  .cc-card p,
  .cc-modal-body p {
    text-align: justify;
    hyphens: auto;
  }
  ```
- `pages/Eventos/Asambleas/Asambleas.css`
  ```css
  /* Texto justificado (F1-IM1) */
  .asm-card p {
    text-align: justify;
    hyphens: auto;
  }
  ```
- `pages/Conocenos/Comisiones/Comisiones.css`
  ```css
  /* Texto justificado (F1-IM1) */
  .com-intro,
  .com-card p {
    text-align: justify;
    hyphens: auto;
  }
  ```
- `components/sections/FeatureCards/FeatureCards.css`
  ```css
  /* Texto justificado (F1-IM1) */
  .red-card p {
    text-align: justify;
    hyphens: auto;
  }
  ```
- `components/layout/Footer/Footer.css`
  ```css
  /* Texto justificado (F1-IM1) */
  .cic-footer-text {
    text-align: justify;
    hyphens: auto;
  }
  ```

**Revisa** en el navegador Inicio, Cursos, Asambleas, Comisiones y el Footer. Si un párrafo muy corto (1 o 2 líneas) queda con espacios feos, toma captura y menciónalo en el PR; **no lo cambies tú**.

**Terminado cuando:** esos párrafos se ven justificados y `npm run lint`, `npm run build` y `npm run verificar` pasan.

### F1-IM2 · Comprimir los 4 videos · sáb 14, 20:00

**Qué es:** los videos pesan de 5 a 24 MB y el sitio tarda mucho en celular. Deben quedar en **menos de 4 MB cada uno**, con el **mismo nombre**.

| Video | Página donde sale | Peso actual |
|---|---|---|
| `public/videos/home.mp4` | Inicio `/` | 5.5 MB |
| `public/videos/parque-central.mp4` | `/conocenos/mision-y-vision` | 13.9 MB |
| `public/videos/puente-colores.mp4` | `/tramites/rt` | 14.0 MB |
| `public/videos/vista-aerea.mp4` | `/tramites/dro` | 24.4 MB |

**Pasos:**
1. **Respaldo primero:** sube los 4 originales al Drive en `03_Videos/originales/`.
2. Instala FFmpeg (abre PowerShell y escribe el comando; al terminar, cierra y vuelve a abrir la terminal):
   ```powershell
   winget install --id Gyan.FFmpeg -e
   ```
   Comprueba que quedó instalado con `ffmpeg -version`.
3. En Git Bash, dentro de `visuales`, comprime cada video a un archivo temporal:
   ```bash
   ffmpeg -i public/videos/home.mp4 -vf "scale=1280:-2" -c:v libx264 -crf 30 -preset slow -an -movflags +faststart home-web.mp4
   ```
   Qué hace cada parte: `scale=1280:-2` reduce el ancho a 1280 px; `-crf 30` es la calidad (más alto = más ligero); `-an` quita el audio (los videos de fondo no lo usan); `+faststart` hace que empiece a reproducirse antes de descargarse completo.
4. Revisa el peso con `ls -lh home-web.mp4`. Si pasa de 4 MB, repite con `-crf 33`; si sigue pasando, usa además `scale=960:-2`.
5. Reemplaza el original con el comprimido, **con el mismo nombre**:
   ```bash
   mv home-web.mp4 public/videos/home.mp4
   ```
6. Repite con los otros 3 videos.
7. Sube también las versiones comprimidas al Drive en `03_Videos/web/`.
8. Abre las 4 páginas y comprueba que el video se ve nítido y se reproduce en bucle.

**Terminado cuando:** cada video pesa menos de 4 MB, se ve bien, y `git status` muestra solo los 4 `.mp4` como modificados.

**Entrega:** PR + captura de `ls -lh public/videos`.

### F2-IM1 · Optimizar las 8 imágenes del muro · mié 18, 20:00

**Qué es:** las imágenes del muro de noticias (`public/img/posts/1.png` … `8.png`) pesan hasta 1.1 MB. Deben quedar en **menos de 300 KB cada una, con el mismo nombre y la misma extensión `.png`**.

**Pasos:**
1. Sube los originales al Drive en `02_Imagenes_Web/posts_originales/`.
2. Abre https://tinypng.com y arrastra las 8 imágenes. Descarga las comprimidas.
3. Si alguna sigue pasando de 300 KB, ábrela en https://squoosh.app, cambia el ancho a **1080 px** (sección «Resize») y descarga en formato **OxiPNG**.
4. Reemplaza los archivos en `public/img/posts/` con los **mismos nombres**.
5. Abre `/eventos/cursos-y-capacitacion` y comprueba que el muro se ve bien.

### F2-IM2 · Revisión de enlaces · vie 20, 20:00

**Qué es:** comprobar que **cada** botón y enlace del sitio publicado funciona y lleva al lugar correcto.

**Pasos:**
1. Abre la versión de prueba (Pablo pasa el enlace el mié 18).
2. En **cada página** (Inicio, Cursos, Asambleas, DRO, RT, Dictaminador, Peritos, Cálculo, Bolsa, Misión y Visión, Comisiones y las nuevas de la Fase 2) haz clic en **todo**: menú, botones, enlaces del Footer, PDF, teléfonos, WhatsApp, correos, mapa y redes sociales.
3. Crea `docs/QA_Enlaces.md` con esta tabla:
   ```markdown
   | Página | Elemento (texto del botón o enlace) | Debería llevar a | Lleva a | ¿Bien? | Captura |
   |---|---|---|---|---|---|
   | /tramites/dro | Botón «Iniciar Trámite» | Modal de contacto | Modal de contacto | ✅ | — |
   ```
4. Las capturas de los que fallan van al Drive en `06_Evidencias_Equipo/QA_Enlaces/` y en la tabla pones el nombre del archivo.
5. **No arreglas nada**: solo reportas.

---

## 🗄️ Daniel Barrera · Base de datos, QA y manual

No tocas el código del sitio. Tus entregas son archivos dentro de `docs/`. Trabajas con la Forma A (1.3).

### F1-DB1 · Esquema SQL del panel administrativo · mié 11, 20:00

**Qué es:** Pablo va a crear un panel con usuario y contraseña para que el Colegio publique noticias, cursos y asambleas sin depender del equipo. Usará **Supabase**, que funciona con **PostgreSQL**. Tú diseñas las tablas y las reglas de acceso.

**Archivo:** `docs/panel-admin/esquema.sql`

**Contenido mínimo:**
1. **`perfiles`**: `id uuid` (llave primaria que referencia a `auth.users(id)`), `nombre text`, `rol text` con `CHECK (rol IN ('editor','admin'))` y `creado_en timestamptz default now()`.
2. **`noticias`**: `id`, `titulo` (obligatorio), `texto` (obligatorio), `imagen_url`, `fecha_publicacion date`, `publicado boolean default false`, `creado_por uuid` (referencia a `perfiles`), `creado_en` y `actualizado_en`.
3. **`cursos`**: `id`, `titulo`, `fecha_texto` (ej. «Inicia: 15 de noviembre»), `horario`, `modalidad` con `CHECK (modalidad = 'Presencial')` (regla del Colegio: registro y asistencia solo en oficinas), `descripcion`, `imagen_url`, `temario_url`, `publicado`, `creado_por`, `creado_en`.
4. **`asambleas`**: `id`, `tipo` con `CHECK (tipo IN ('Ordinaria','Extraordinaria'))`, `fecha date`, `lugar`, `titulo`, `resumen text[]`, `acuerdos text[]`, `fotos jsonb` (lista de `{src, alt}`), `publicado`, `creado_por`, `creado_en`.
5. **RLS (Row Level Security)** activada en las 4 tablas:
   - Cualquiera (rol `anon`) puede **leer** solo filas con `publicado = true`.
   - Solo usuarios con perfil `editor` o `admin` pueden **insertar, editar y borrar**.
   - En `perfiles`, cada quien solo puede leer su propia fila; solo `admin` modifica roles.
6. **Comentarios** (`-- ...`) en español explicando cada tabla y cada política.

**Prohibido:** datos reales de personas, teléfonos, correos o contraseñas en el archivo. Si quieres filas de prueba, que digan claramente `'PRUEBA'` y van en un archivo aparte, `docs/panel-admin/datos-prueba.sql`.

**Cómo probarlo:** crea un proyecto gratis en https://supabase.com con tu cuenta, abre **SQL Editor**, pega el archivo y ejecútalo. Debe correr sin errores. Toma captura.

**Entrega:** PR + captura del SQL Editor ejecutado sin errores.

### F1-DB2 · Revisión de las reglas que la máquina no ve · vie 13, 20:00

**Qué es:** el verificador revisa colores, letras y teléfonos, pero no puede «ver» fotos ni entender textos. Tú recorres el sitio como si fueras auditor.

**Pasos:**
1. Con `npm run dev`, entra a cada una de las 11 páginas: `/`, `/eventos/cursos-y-capacitacion`, `/eventos/asambleas`, `/tramites/dro`, `/tramites/rt`, `/tramites/dictaminador-de-riesgos`, `/servicios/peritos-valuadores`, `/servicios/calculo-estructural`, `/servicios/bolsa-de-trabajo`, `/conocenos/mision-y-vision` y `/conocenos/comisiones`. Abre también el menú, los modales y los desplegables.
2. En cada página revisa:
   - **Privacidad:** ¿hay fotos donde se reconozca a una persona en primer plano? ¿Nombres de agremiados con datos de contacto? ¿Algún teléfono o correo que no esté en el tríptico?
   - **Trámites y pagos:** ¿algo invita a hacer un trámite, inscripción o pago **en línea**? (Lo correcto: todo presencial; la web solo informa.)
   - **Convenios:** ¿algún texto dice que las **empresas** firman convenios con el Colegio? (Solo gobierno y universidades.)
   - **Política:** ¿se menciona algún partido sin la aclaración «Asociación Civil sin filiación partidista»?
   - **Nombre:** ¿dice «de Chiapas» o el nombre incompleto?
   - **Contenido sin fuente:** ¿hay leyes, cifras, cursos, fechas o fotos que no vengan del tríptico, los oficios o el Colegio?
   - **Fondo:** ¿hay secciones completamente blancas sin patrón?
3. Crea `docs/QA_Reglas_Fase1.md` con esta tabla:
   ```markdown
   | # | Página | Regla | Qué encontré | Gravedad (alta/media/baja) | Captura |
   |---|---|---|---|---|---|
   | 1 | /servicios/bolsa-de-trabajo | Contenido sin fuente | ... | alta | qa-01.png |
   ```
4. Capturas en el Drive, `06_Evidencias_Equipo/QA_Reglas/`, con nombres `qa-01.png`, `qa-02.png`…
5. **No arreglas nada**: Pablo decide quién lo corrige.

### F2-DB1 · QA responsivo · jue 19, 20:00

**Qué es:** comprobar que el sitio se ve bien en celular, tablet y computadora.

**Pasos:**
1. Abre la versión de prueba (enlace de Pablo, mié 18) en Chrome.
2. Pulsa `F12` y luego `Ctrl + Shift + M` (modo dispositivo). Arriba elige **«Responsive»** y escribe el ancho: **360**, **768** y **1440** px.
3. En **cada página y cada ancho** revisa:
   - ¿Aparece barra de desplazamiento horizontal (la página se mueve de lado)?
   - ¿Hay textos encimados, cortados o que se salen de su caja?
   - ¿Los botones se pueden tocar y leer?
   - ¿El menú abre y cierra bien en celular?
   - ¿Las fotos se deforman o se ven estiradas?
   - ¿El header se lee (letras blancas) arriba y al bajar?
4. Crea `docs/QA_Fase2.md`:
   ```markdown
   | # | Página | Ancho | Problema | Captura |
   |---|---|---|---|---|
   | 1 | /tramites/rt | 360 | El botón «Iniciar Trámite» se sale de la tarjeta | qa2-01.png |
   ```
5. Capturas en el Drive, `06_Evidencias_Equipo/QA_Fase2/`.

### F2-DB2 · Manual de usuario · sáb 21, 20:00

**Qué es:** un manual para el Colegio (no para programadores) que explique cómo usar y mantener el sitio.

**Archivo:** `docs/Manual_Usuario.md`

**Secciones:**
1. **Qué tiene el sitio:** lista de páginas y para qué sirve cada una (una línea por página).
2. **Cómo pedir un cambio:** a quién escribir, qué datos mandar (página, qué cambiar, texto o foto nuevo) y en qué formato (fotos JPG, PDF).
3. **Panel administrativo:** cómo entrar, cómo publicar una noticia o un curso y cómo ocultarlo. Pide a Pablo capturas del panel; si aún no está listo, deja la sección con el título «Pendiente: se completa cuando el panel esté publicado».
4. **Reglas que el Colegio debe cuidar al publicar:** sin datos personales, sin pagos en línea, fotos propias, nombre exacto.
5. **Preguntas frecuentes** (5 a 8): «¿Puedo cambiar el logo?», «¿Puedo poner el teléfono de un perito?», etc. Las respuestas salen de las reglas del README.

Lenguaje sencillo, con capturas. **No inventes funciones que el sitio no tiene.**

### F2-DB3 · Consultas SQL del panel · sáb 21, 20:00

**Archivo:** `docs/panel-admin/consultas.sql`, con comentarios en español:
- Listar noticias publicadas, de la más reciente a la más antigua.
- Listar **todas** las noticias (para el editor), incluidas las no publicadas.
- Crear, editar, publicar y ocultar una noticia.
- Lo mismo para cursos y asambleas.
- Listar los próximos cursos publicados.

Pruébalas en tu proyecto de Supabase.

---

## 🎨 Jocelyn Aguilar · Diseño

**Solo entregas archivos de diseño**; no tocas código. Subes todo desde la página de GitHub (Forma B, 1.4). Herramientas sugeridas: **Canva** (diseño), **https://squoosh.app** (comprimir: formato **MozJPEG**, calidad 70-80) y **https://www.iloveimg.com/es/recortar-imagen** (recortar).

### F1-JA1 · Rediseño del organigrama · mié 11, 20:00

**Qué es:** el Consejo pidió que el organigrama lleve el **logo a la izquierda con las siglas CICTGZ**. Además, el actual dice «de Chiapas» (debe decir «de Tuxtla Gutiérrez») y «Visepresidente» (debe decir «Vicepresidente»).

**Regla clave:** el organigrama es un documento del Colegio. **Copias los cargos y nombres letra por letra** del actual (`visuales/public/img/documentos/organigrama.jpeg`). Solo corriges «Visepresidente» y el nombre del Colegio. No agregas, quitas ni reacomodas personas.

**Especificaciones:**
- Tamaño: **1600 px de ancho** (horizontal), JPG de **menos de 350 KB**.
- Arriba a la izquierda: el logo **sin modificar** (`visuales/public/img/logos/logo-colegio.png`; descárgalo de GitHub con el botón de descarga) y a su derecha **CICTGZ** con «Colegio de Ingenieros Civiles de Tuxtla Gutiérrez, A.C.» debajo.
- Colores: **solo** `#BA2A33`, `#962E35`, `#383637`, `#E5E5E5` y `#FFFFFF`.
- Letra clara (Montserrat, Poppins u otra sin adornos), mínimo 14 px al tamaño final.

**Entrega:**
1. Sube al Drive, en `05_Diseno/organigrama/`: `organigrama.jpg` y el **enlace editable de Canva**.
2. **No lo subas al repositorio.** José María lo manda al Colegio para su visto bueno; si lo aprueban, Pablo lo sube.
3. En Classroom: captura del organigrama + enlace a la carpeta del Drive.

### F1-JA2 · Fotos para las galerías · jue 12, 20:00

**Qué es:** las fotos que rotan en el carrusel de cada servicio.

**De dónde salen (y de ningún otro lado):**
1. Lo que mande el Colegio (José María lo sube al Drive, `01_Material_Colegio/Fotos/`).
2. Las **redes oficiales del Colegio**: Facebook (https://www.facebook.com/profile.php?id=100063697292088) e Instagram (https://www.instagram.com/colegio_d_ingenieros_civilesac/).

**Prohibido:** fotos de Google, bancos de imágenes, IA o de otras instituciones. Evita fotos donde una persona sea el centro de la imagen (cara en primer plano); prefiere obras, inspecciones, grupos de lejos o eventos.

**Especificaciones:**
- 3 a 6 fotos por servicio (si hay menos, las que haya; el carrusel se adapta).
- **1600 × 1000 px** (horizontal). Recorta sin deformar.
- **JPG de menos de 350 KB** (comprime en squoosh.app).
- Nombres **exactos**, en minúsculas: `dro-01.jpg`, `dro-02.jpg`, …
- **`rt-01.jpg` = la foto actual de DRO** (`visuales/public/img/paginas/tramites/dro.jpg`); el Consejo pidió moverla a RT.
- **Dictaminador:** inspecciones, daños o derrumbes, solo si son del Colegio.

**Estructura a subir** (dentro de `visuales/public/img/`):
```text
galerias/
├── dro/          dro-01.jpg … dro-06.jpg
├── rt/           rt-01.jpg … rt-06.jpg
├── dictaminador/ dictaminador-01.jpg …
├── peritos/      peritos-01.jpg …
├── calculo/      calculo-01.jpg …
└── bolsa/        bolsa-01.jpg …
```
Arma la carpeta `galerias` en tu computadora con esa estructura y arrástrala completa en «Upload files» estando dentro de `visuales/public/img/`.

**En la descripción del PR:** una lista «archivo → enlace de la publicación de Facebook o Instagram de donde salió» (o «enviada por el Colegio, fecha»).

### F1-JA3 · Patrón de trazos arquitectónicos · jue 12, 20:00

**Qué es:** el Consejo pidió fondos con «trazos» (líneas de planos) en lugar de secciones blancas.

**Especificaciones:**
- Formato **SVG** de **menos de 30 KB**.
- Un cuadro de unos **320 × 320 px** que se pueda **repetir como mosaico** sin que se note la unión (las líneas que salen por un lado deben entrar por el lado contrario).
- Motivos: líneas de cota, retícula de plano, arcos, ejes y ángulos, como un plano arquitectónico. **Sin texto, sin fotos, sin logos.**
- Color de las líneas: `#383637` con **opacidad del 6 al 10 %**, o `#E5E5E5`. Debe verse **muy tenue**: el texto encima se tiene que leer perfecto.
- Fondo **transparente**.
- Herramientas: Figma (gratis, exporta SVG) o Inkscape. Canva solo exporta SVG con cuenta Pro.

**Sube** el archivo como `visuales/public/img/patrones/trazos-arquitectonicos.svg` (crea la carpeta `patrones` escribiendo `patrones/` antes del nombre del archivo al subir, o arrastrando una carpeta `patrones` que lo contenga). Guarda el editable en el Drive, en `05_Diseno/patrones/`.

**Entrega:** PR + captura del patrón repetido (por ejemplo, 3×3 cuadros en Figma).

### F2-JA1 · Fotos oficiales y fotos de cursos · jue 19, 20:00

1. Revisa en el Drive (`01_Material_Colegio/Fotos/`) lo que mandó el Colegio.
2. Sustituye las fotos de las galerías por fotos oficiales mejores (sobre todo Dictaminador: derrumbes e inspecciones), **con los mismos nombres** y las mismas especificaciones de F1-JA2.
3. **Cursos:** si José María carga cursos reales (F2-JM1), prepara una imagen por curso de **800 × 400 px, JPG de menos de 200 KB**, con fotos oficiales, nombrada `curso-<palabra-clave>.jpg` (ej. `curso-precios-unitarios.jpg`), en `visuales/public/img/paginas/eventos/cursos/`. Pásale los nombres a José María.

### F2-JA2 · Imagen para compartir en redes (Open Graph) · vie 20, 20:00

**Qué es:** la imagen que aparece cuando alguien comparte el enlace del sitio por WhatsApp o Facebook.

- **1200 × 630 px**, JPG de **menos de 300 KB**.
- Logo **sin modificar**, **CICTGZ** grande y «Colegio de Ingenieros Civiles de Tuxtla Gutiérrez, A.C.».
- Fondo rojo `#BA2A33` o una foto oficial con velo `#383637` al 60 %.
- Deja **60 px de margen** en todos los lados (WhatsApp recorta las orillas).
- Sube a `visuales/public/img/og-cictgz.jpg` y el editable al Drive (`05_Diseno/og/`).

---

## 📨 José María Orantes · Enlace con el Colegio

Eres el único que habla con el Colegio. Tu trabajo es **pedir**, **guardar** y **copiar tal cual**. **No redactas, no resumes y no usas ChatGPT** para nada que vaya al sitio. Puedes trabajar desde la página de GitHub (Forma B, 1.4).

### F1-JM1 · Pedir el material al Colegio · envío: lun 9, 20:00 · reporte: vie 13, 20:00

**Pasos:**
1. **Lunes 9, antes de las 20:00:** envía al Ing. Nein Montero Molina, por el medio que ya usan (correo o WhatsApp), este mensaje (cópialo tal cual):

   > Buenas tardes, Ing. Montero. Le escribe José María Orantes, del equipo de la Universidad Salazar que desarrolla el portal del Colegio. Para completar el sitio con información oficial, le solicitamos de la manera más atenta lo siguiente, **a más tardar el martes 17 de noviembre**:
   >
   > 1. **Horario de atención de los sábados** (en el material tenemos dos versiones: 9:00 a 13:00 y 9:00 a 14:00) y **número oficial de WhatsApp** para el público.
   > 2. **Formatos de inscripción en blanco**, sin datos de ninguna persona: oficio de inscripción, cédula de inscripción y carta bajo protesta de decir verdad (PDF o Word).
   > 3. Si existe, la **lista de requisitos en PDF** para DRO, RT y Dictaminador de Riesgos.
   > 4. Confirmar si el **Título profesional** es requisito de ingreso, además de la cédula.
   > 5. Información o documento sobre el **servicio social gratuito**: a quién va dirigido, requisitos y cómo se solicita.
   > 6. Información sobre las acciones de **beneficio a la sociedad** del Colegio.
   > 7. Lista de **servicios que ofrecen los peritos valuadores**.
   > 8. El **Código de Ética** del Colegio en PDF, si se puede publicar.
   > 9. **Cursos** programados (nombre, fecha, horario, costo) y **asambleas** recientes que se puedan publicar (fecha, tipo, resumen y fotos).
   > 10. **Fotos** de los servicios (DRO, RT, peritos, cálculo), de **inspecciones o derrumbes** para Dictaminador y de **cursos**.
   > 11. Confirmar si la **Bolsa de Trabajo** está activa.
   > 12. El **tríptico 2026**, si existe una versión actualizada.
   > 13. Autorización para publicar fotos de eventos donde aparecen agremiados.
   >
   > Lo que no sea posible enviar no se publicará; no agregaremos información que no provenga del Colegio. Muchas gracias por su apoyo.

2. Guarda la captura del envío en el Drive, `07_Admin/oficio_noviembre/`.
3. **Miércoles 11:** si ya respondieron el **horario** y el **WhatsApp**, avisa en el grupo **ese mismo día** (Fernanda y tú los necesitan).
4. **Jueves 12:** manda el organigrama de Jocelyn (Drive `05_Diseno/organigrama/`) para su visto bueno, junto con un recordatorio amable de la lista.
5. **Viernes 13, 20:00:** reporte en Classroom con una tabla: punto (1 a 13) → «recibido / prometido para [fecha] / no hay».

### F1-JM2 · Corregir datos del sitio · mié 11, 20:00

**Archivos:** `src/data/requisitos.js`, `src/data/asambleas.js`, `src/data/cursos.js` y `src/data/contacto.js` (todos dentro de `visuales/`). Son archivos de **solo datos**: no hay diseño que romper.

Los textos nuevos salen **literalmente del tríptico** (`public/img/documentos/triptico-enfrente.jpg`, sección «Requisitos de ingreso»).

**1. `requisitos.js`:** reemplaza **todo** el contenido del archivo por:
```js
// Requisitos de ingreso. Fuente: tríptico oficial del Colegio (triptico-enfrente.jpg).
export const requisitosGenerales = [
  "Solicitud dirigida al presidente del Colegio (con el aval de 2 Miembros Numerarios, Art. 23)",
  "Cédula profesional expedida por la S.E.P.",
  "Currículum vitae",
  "Constancia de situación fiscal (RFC)",
  "Comprobante de domicilio actualizado",
  "Acta de nacimiento",
  "INE",
  "CURP",
  "Pago de inscripción",
  "En caso de haber pertenecido a otro Colegio, carta de no adeudo y renuncia",
];

export const notaCartas = {
  propias: "Carta propia: 2 años de expedición de la cédula profesional.",
  ajenas: "Carta ajena: 5 años de expedición de la cédula profesional.",
};
```

**2. `asambleas.js`:**
- En el comentario de arriba, borra la línea `Los dos registros siguientes son DE EJEMPLO: reemplázalos con información real.`
- Reemplaza todo lo que está entre `const asambleas = [` y `];` para que quede vacío:
  ```js
  const asambleas = [];
  ```
  La página ya muestra un aviso cuando no hay asambleas.

**3. `data/cursos.js`:**
- Línea 16: en el comentario, borra `DATOS DE EJEMPLO: reemplázalos con los cursos reales.` (deja solo «Cursos y capacitaciones activas.»).
- Líneas 22-50: deja la lista vacía:
  ```js
  export const cursos = [];
  ```
- Línea 76 (la noticia «XV aniversario de MORENA»): reemplaza el `texto` por exactamente:
  ```js
  texto: "Representantes del VI Consejo Directivo, como Asociación Civil sin filiación partidista, asistieron al XV aniversario de MORENA en Tuxtla Gutiérrez, respondiendo al diálogo institucional y al papel clave de la ingeniería civil en el desarrollo del estado.",
  ```
  Solo se agregó «, como Asociación Civil sin filiación partidista,»; el resto es igual.

**4. `data/contacto.js` (horario y WhatsApp):** es el **único** lugar del sitio con el horario y el WhatsApp; el Header, el Footer, las ventanas de contacto y Cursos lo leen de aquí. Cuando el Colegio confirme:
- **Horario del sábado:** cambia `horas` en la línea `{ dias: "Sábados", horas: "9:00 AM – 1:00 PM" }` si el Colegio da otra hora.
- **WhatsApp oficial:** cambia `whatsapp: "961-119-0009"` si el Colegio da otro número (escríbelo con guiones, como está).
- Después borra las líneas «PENDIENTE» del comentario de arriba del archivo.
Si el Colegio no ha respondido el miércoles, entrega lo demás y haz este cambio en cuanto llegue la respuesta.

**Revisa:** en el PR, la revisión automática debe salir en verde. Ya no deben aparecer errores `[Contenido]` ni `[Neutralidad]`.

### F1-JM3 · Registro de fuentes · sáb 14, 20:00

**Qué es:** la prueba de que **nada en el sitio es inventado**. Cada cosa que mande el Colegio queda guardada y anotada.

**Pasos:**
1. Todo lo que llegue (fotos, PDF, capturas de mensajes) se sube **tal cual** al Drive, `01_Material_Colegio/`, en la subcarpeta que corresponda (`Fotos/DRO`, `Documentos`, `Textos`…). No se edita ni se renombra el original.
2. Crea una hoja de cálculo en `07_Admin/registro_fuentes` con estas columnas:

   | Fecha | Qué es | Quién lo envió (cargo, no teléfono) | Medio (correo/WhatsApp/en persona) | Archivo en el Drive | Dónde se usa en el sitio | Estado |
   |---|---|---|---|---|---|---|
   | 12/11/2026 | Horario de sábado | Presidente del Consejo | WhatsApp | `Textos/horario.png` | `data/contacto.js` | Usado |

3. Actualízala cada vez que llegue algo, también en la Fase 2.

### F2-JM1 · Cargar al sitio lo que mandó el Colegio · mié 18, 20:00

**Regla de oro:** copias **letra por letra**. Si un texto tiene una falta de ortografía evidente, la corriges y lo mencionas en el PR; nada más. Cada PR lleva la **captura de la fuente**.

| Si llegó… | Archivo (`visuales/src/`) | Cómo |
|---|---|---|
| Cursos | `data/cursos.js`, lista `cursos` | Un objeto por curso (formato abajo). `modalidad` siempre `"Presencial"` |
| Asambleas | `data/asambleas.js` | Un objeto por asamblea con los campos que explica el comentario del archivo |
| Servicio social | `data/servicioSocial.js` (archivo nuevo) | Formato abajo |
| Beneficio social | `data/beneficioSocial.js` (archivo nuevo) | Mismo formato que servicio social |
| Servicios de peritos | `data/servicios.js`, dentro de `peritos`: lista nueva `serviciosOficiales` | Lista de `{ titulo, texto }`; Pablo la muestra en la plantilla |

**Formato de un curso:**
```js
{
  id: 1,
  img: "/img/paginas/eventos/cursos/curso-precios-unitarios.jpg", // nombre que te pase Jocelyn
  titulo: "Nombre exacto del curso",
  fecha: "Inicia: 5 de diciembre de 2026",
  horario: "Sábados, 9:00 a 14:00",
  modalidad: "Presencial",
  descripcion: "Texto tal cual lo mandó el Colegio.",
},
```

**Formato de servicio social / beneficio social** (solo los campos que el Colegio haya mandado; **no rellenes los demás**):
```js
export const servicioSocial = {
  parrafos: ["Párrafo 1 tal cual.", "Párrafo 2 tal cual."],
  requisitos: ["Requisito 1 tal cual."],
  pdf: "/documentos/servicio-social.pdf", // solo si mandaron PDF
};
```
Los PDF que mande el Colegio van en `visuales/public/documentos/` con nombre en minúsculas, sin espacios ni acentos (ej. `servicio-social.pdf`).

### F2-JM2 · Aviso de qué llegó y qué no · mar 17, 21:00

En el grupo, copia y llena:
```text
CIERRE DE MATERIAL DEL COLEGIO (17 nov)
✅ Llegó: ...
❌ No llegó (se aplica plan B o se elimina): ...
📁 Todo está en el Drive: 01_Material_Colegio
```
Con este mensaje, Fernanda, Josué y Jocelyn deciden qué hacer en la Fase 2.

### F2-JM3 · Presentar la versión de prueba al Colegio · sáb 21, 20:00

1. Pablo te pasa el enlace el **mié 18**.
2. Muéstralo al Colegio (en persona o por videollamada). Enséñales sobre todo: el header de color, el carrusel, las páginas nuevas, el organigrama y Cursos.
3. Anota **todos** los comentarios en un documento del Drive, `07_Admin/presentacion_21nov`, con este formato:
   ```text
   Página: ...  |  Comentario (tal cual lo dijeron): ...  |  Quién: (cargo)
   ```
4. Pregunta explícitamente: «¿Aprueban que se publique así?» y anota la respuesta.

**Entrega:** enlace al documento del Drive.
