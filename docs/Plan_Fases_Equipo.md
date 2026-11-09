# Plan de trabajo por fases: portal CICTGZ

**Líder:** Pablo Ramírez · **Repositorio:** `TheCubick/Proyecto_colegio-web` · **Tareas y entregas:** Google Classroom
**Fase 1:** lun 9 nov 09:00 → sáb 14 nov 20:00 · **Fase 2:** lun 16 nov 09:00 → sáb 21 nov 20:00

> Cada tarea tiene **fecha y hora de entrega**. Una tarea entregada después de la hora se marca **tarde** en Classroom y no se revisa hasta el día siguiente.
> **Instrucciones paso a paso de cada tarea: [`Instrucciones_Tareas.md`](Instrucciones_Tareas.md).**
> Detalles técnicos (componente de carrusel, contrato de rutas, especificación del header): `docs/Auditoria_Y_Tareas_CICTGZ.md` y `CLAUDE.md`.
> **Estructura del código (reorganizada el 9 nov):** textos y datos en `src/data/`, lista de páginas y menús en `src/config/rutas.js`, DRO/RT/Dictaminador en la plantilla `components/templates/PaginaTramite/` y Peritos/Cálculo en `components/templates/PaginaServicio/`. Qué archivo abrir para cada página: README → «Mapa de rutas».

**Equipo:** 💻 Desarrollo: Pablo (líder) y María Fernanda · 🛠️ Ajustes de código con instrucciones exactas: Josué e Ignacio · 🗄️ Base de datos, QA y manual: Daniel · 🎨 Diseño: Jocelyn · 📨 Enlace con el Colegio: José María.

---

## Regla principal: el equipo NO hace documentos del Colegio

Los documentos y textos institucionales (formatos, requisitos en PDF, servicio social, beneficio a la sociedad, código de ética, servicios de los peritos, cursos, asambleas, información de trámites) **los entrega el Colegio**. El equipo solo:

1. **Los pide** (José María, con el oficio).
2. **Los copia tal cual** al sitio, sin redactar, resumir ni «mejorar» con IA. El PR lleva la **foto o captura de la fuente** (documento, correo o mensaje de WhatsApp del Colegio).
3. Si no llegan a tiempo, aplica el **plan B** de la tabla de abajo: una alternativa que no invente nada, o **se elimina la idea**.

**Prohibido:** escribir con ChatGPT u otra IA cualquier texto que el sitio presente como información del Colegio. Texto sin fuente = PR rechazado.

### Lo que depende del Colegio y su plan B

Fecha límite para que el Colegio entregue: **mar 17 nov, 20:00**. Lo que no haya llegado se resuelve con el plan B y no se vuelve a esperar.

| Material del Colegio | Plan B si no llega |
|---|---|
| Formatos de inscripción **en blanco** (oficio, cédula, carta protesta) | Ya retirados (tarea F1-PR0). El menú dice «Formatos disponibles en las oficinas del Colegio». |
| Lista de requisitos en PDF (DRO, RT, Dictaminador) | Se quita el botón de descarga (F1-PR0). Los requisitos ya se muestran en la página, tomados del tríptico oficial. |
| Texto o PDF de **servicio social gratuito** | Aviso breve con el único dato confirmado en la entrevista («el Colegio ofrece servicio social gratuito; informes en oficinas») y los canales oficiales. Sin PDF. |
| Información de **beneficio a la sociedad** | **Se elimina la página.** |
| **Servicios del perito valuador** | No se agrega la sección. |
| **Código de Ética** | No se publica y se quita el enlace del Footer. |
| Cursos y asambleas reales | Las listas quedan vacías: la página ya muestra el aviso de «sin cursos» y remite a oficinas y WhatsApp. |
| Información oficial de los trámites | `tramitesInfo.js` se queda solo con lo del tríptico y las entrevistas; lo demás se borra. |
| Fotos por servicio, de derrumbes y de cursos | El carrusel muestra solo las fotos oficiales que haya; si no hay ninguna, se queda la foto actual. |
| Visto bueno del **organigrama** rediseñado | Se retira la imagen (la actual dice «de Chiapas»). |

**Aviso de Privacidad:** se descarta. El sitio no guarda datos de nadie (el buzón solo abre WhatsApp), así que no lo necesita.

---

## Reglas del Colegio (obligatorias en el sitio y en cada tarea)

Son las 5 reglas del README ([Reglas del proyecto](../README.md#reglas-del-proyecto)): **privacidad anti-extorsión**, **trámites y pagos solo presenciales**, **identidad gráfica y accesibilidad**, **contenido legal y verídico** y **reglas técnicas**. Una tarea que las rompa **no se acepta**, aunque funcione.

Se revisan solas: `npm run verificar` (y GitHub en cada PR) detecta colores fuera de la paleta, letras menores a 14px, el nombre «de Chiapas», teléfonos no oficiales, CURP, contenido de ejemplo, menciones a partidos sin la aclaración de neutralidad, pasarelas de pago, librerías nuevas y rutas con espacios, «ñ» o acentos.

**Al 9 de noviembre (tras reorganizar el código), el sitio tiene 87 errores y 19 advertencias** (`npm run verificar -- --todo`). Errores: 74 de tipografía (26 en el header y el pop-up «Afíliate»), 6 colores fuera de la paleta (incluido un tono café en el carrusel de inicio), 5 de contenido de ejemplo y 2 de neutralidad política. Advertencias: 13 sombras en negro puro y 6 nombres incompletos. Al unir las páginas repetidas en plantillas bajaron de 95/21. Todos quedaron asignados en las tareas de abajo.

## Control de cumplimiento

1. **`main` protegida en GitHub**: nadie puede subir directo; todo entra por PR aprobado por Pablo y con la revisión automática en verde.
2. **Revisión automática en cada PR** (`.github/workflows/verificar.yml`): lint + build + reglas. Si sale en rojo, no se une.
3. **Tareas comprobables:** cada tarea dice exactamente qué archivo tocar y cuándo está terminada (normalmente: «el verificador ya no marca X»). No hay tareas de «redactar».
4. **Regla de reasignación:** si a la **hora límite + 12 h** no hay PR, la tarea pasa a su **respaldo**, cuenta como **no entregada** en Classroom y el código del respaldo es el que queda.
5. **Avance visible:** cada quien hace `git push` todos los días. Pablo lo comprueba con:
   ```bash
   git fetch --all --prune && git log --all --since="1 day ago" --format="%an · %ar · %s"
   ```
6. **Evidencia:** entrega en Classroom = enlace al PR + captura. Sin captura no se revisa.

---

## Reglas de la fase (las mismas para todos)

1. **Rama personal por fase:** `fase1/<nombre>` y `fase2/<nombre>` (`fase1/fernanda`, `fase1/jose-maria`, etc.). Se crea desde `main` actualizado y se trabaja **solo** en ella.
2. **Solo tocas tus archivos.** La columna «Archivos» de cada tarea es tu territorio. Si necesitas cambiar un archivo ajeno, avisa en el grupo y espera la respuesta de Pablo.
3. **Una tarea = uno o varios commits** con su ID: `Fix: tamaños de letra (F1-JB1)`.
4. **Quien solo sube imágenes o cambia un archivo** puede hacerlo desde la página de GitHub (en su rama: «Add file → Upload files» o el lápiz para editar) y luego abrir el PR. No necesita usar la terminal.
5. **Entrega en Classroom** = enlace al Pull Request + captura de pantalla del resultado.
6. **Reporte diario** en el grupo antes de las **21:00**: *hice / haré / bloqueos*. Si no reportas, cuenta como día sin avance.
7. **Recursos pesados (fotos originales, videos, Word, Canva) van al Drive**, no al repositorio (ver la sección Drive).
8. Pablo revisa y une los Pull Requests de **lunes a sábado, de 21:00 a 22:00**. El domingo 15 se unen todas las ramas de la Fase 1 y la Fase 2 arranca desde ese `main`.

---

## Día 0 (lun 9 nov)

**Pablo, antes de las 09:00 (antes de que existan las ramas):**

| ID | Tarea | Archivos |
|---|---|---|
| F1-PR0 | 🚨 **Limpieza urgente**: borrar los 3 PDF con datos personales y sus enlaces del menú (en su lugar: «Formatos disponibles en las oficinas del Colegio»); quitar los 3 botones de requisitos que dan 404; quitar `bolsa.jpg` (flyer de la CDMX); ocultar «Aviso de Privacidad» y «Código de Ética» en el Footer; en el aviso de inscripción, cambiar «Descarga, imprime y llena tus formatos» por «Los formatos se entregan en nuestras oficinas» | `public/documentos/{oficio-inscripcion,cedula-inscripcion,carta-protesta-decir-verdad-2023}.pdf`; `data/afiliacion.js` (lista `formatos`, líneas 22-27) y `ModalAfiliacion.jsx` (aviso, líneas 97-100, y bloque «Formatos oficiales», líneas 131-145); `data/tramites.js` (borrar las 3 líneas `pdfRequisitos`: el botón desaparece solo); `BolsaTrabajo.jsx` (`<ImagenSegura>` de la línea 64) y `public/img/paginas/servicios/bolsa.jpg`; `Footer.jsx` (líneas 136-137) |

**Todos, antes de las 14:00:**

- [ ] Enviar a Pablo tu usuario de GitHub y **aceptar la invitación** al repositorio.
- [ ] Configurar git: `git config --global user.name "Tu Nombre"` y `git config --global user.email "tu@correo"`.
- [ ] Clonar, ejecutar `npm install` y `npm run dev` y comprobar que el sitio abre.
- [ ] Crear tu rama `fase1/<nombre>`, hacer un commit vacío (`git commit --allow-empty -m "Docs: inicio fase 1"`) y hacer **push**.
- [ ] Unirte a la clase de Classroom y a la carpeta del Drive.

**Entregable en Classroom:** captura de tu rama en GitHub. **Límite: lun 9 nov 14:00.**

---

## FASE 1 (9 → 14 nov): urgencias, base técnica y pedir todo al Colegio

### 💻 María Fernanda Uribe · rama `fase1/fernanda` · Respaldo: Pablo
| ID | Tarea | Archivos | Entrega |
|---|---|---|---|
| F1-MF1 | Crear `GaleriaCarrusel` y `data/galerias.js` (código en el Anexo A/B del plan técnico). Las fotos que no existan se ocultan solas | `src/components/ui/GaleriaCarrusel/*`, `src/data/galerias.js` | mar 10 · 20:00 |
| F1-MF2 | Poner el carrusel en las 6 vistas de Trámites y Servicios, en lugar de la foto fija (3 archivos gracias a las plantillas). Completar el nombre del Colegio en `data/servicios.js:21` | `PaginaTramite.jsx`, `PaginaServicio.jsx`, `BolsaTrabajo.jsx`, campo `galeria` en `data/tramites.js` y `data/servicios.js` | jue 12 · 20:00 |
| F1-MF3 | **Header nuevo** según `CLAUDE.md`: letras siempre blancas; velo transparente sobre video, rojo `#BA2A33` sin video y al hacer scroll. Logo-texto con **CICTGZ**. Corregir los **26** tamaños de letra menores a 0.95rem (7 del header y 19 del pop-up «Afíliate»). La lista de rutas con portada ya existe en `config/rutas.js` | `Header.jsx`, `Header.css`, `ModalAfiliacion.css` | sáb 14 · 20:00 |
| F1-MF4 | Siglas CICTGZ en Hero y Footer; nombre completo en los `alt`/`aria-label` del Hero y en el `<title>` y `description` de `index.html`; favicon con `logo-colegio.svg` (WhatsApp y horario ya se leen de `data/contacto.js`) | `Hero.jsx`, `Footer.jsx`, `index.html` | sáb 14 · 20:00 |

**Terminado cuando:** las fotos rotan solas, el menú se lee sobre los 4 videos y en las páginas sin video, y `npm run build` pasa.

### 🛠️ Josué Balbuena · rama `fase1/josue` · Respaldo: Pablo
Tareas mecánicas: el verificador te dice archivo y línea de cada error; terminas cuando deja de marcarlos.

| ID | Tarea | Archivos | Entrega |
|---|---|---|---|
| F1-JB1 | Corregir los **48 tamaños de letra menores a 0.95rem** fuera del header: etiquetas a `0.95rem`, texto a `1rem` | Todos los `.css` de `src/` **excepto** `Header.css`, `ModalAfiliacion.css`, `TramiteDetalle.css` e `index.css` | mié 11 · 20:00 |
| F1-JB2 | Colores fuera de la paleta: `#a01a20` → `#962E35`; `#f1f1f1` y `#f3f3f3` → `#E5E5E5`; `rgba(25,20,20,…)` → `rgba(56,54,55,…)`; las 13 sombras en negro puro → `rgba(56,54,55,…)` con la misma transparencia | `FeatureCards.css`, `BannerCarrusel.css`, `CursosCapacitacion.css`, `Hero.css`, `ModalContacto.css`, `MisionVision.css`, `PaginaTramite.css` | jue 12 · 20:00 |
| F1-JB3 | Borrar de `tramitesInfo.js` las frases que citan leyes (líneas 76, 133 y 190) y cambiar los pasos 3 y 4 de «cómo contratar» por: «Todo el trámite se realiza de forma presencial en las oficinas del Colegio.» **Solo borrar o pegar ese texto; no redactar nada** | `src/data/tramitesInfo.js` | sáb 14 · 20:00 |

**Terminado cuando:** `npm run verificar -- --todo` ya no muestra errores de «Tipografía» ni de «Paleta» fuera de `Header.css` y `ModalAfiliacion.css`.

### 🛠️ Ignacio Moela · rama `fase1/ignacio` · Respaldo: Josué
Tareas aisladas: si se retrasan, no frenan a nadie.

| ID | Tarea | Archivos | Entrega |
|---|---|---|---|
| F1-IM1 | Justificar los párrafos largos que faltan: agregar `text-align: justify; hyphens: auto;` a los párrafos de cada archivo | `CursosCapacitacion.css`, `Asambleas.css`, `Comisiones.css`, `FeatureCards.css`, `Footer.css` | jue 12 · 20:00 |
| F1-IM2 | Comprimir los 4 videos a **menos de 4 MB cada uno**, con el mismo nombre (comando en el README). Subir los originales al Drive `03_Videos/originales/` | `public/videos/*.mp4` | sáb 14 · 20:00 |

**Terminado cuando:** `public/videos` pesa menos de 16 MB y los videos se siguen viendo bien.

### 🗄️ Daniel Barrera · rama `fase1/daniel` · Respaldo: Pablo
Sin código del sitio: base de datos del panel y revisión de reglas.

| ID | Tarea | Archivos | Entrega |
|---|---|---|---|
| F1-DB1 | **Esquema SQL del panel administrativo** para Supabase (Postgres): tablas `perfiles` (rol `editor`/`admin`), `noticias`, `cursos` y `asambleas`; políticas RLS (lectura pública, escritura solo `editor`); sin datos reales | `docs/panel-admin/esquema.sql` | mié 11 · 20:00 |
| F1-DB2 | **Revisión de reglas que la máquina no ve**: recorrer cada página y anotar fotos de personas, teléfonos o correos que no sean oficiales, menciones a convenios con empresas, trámites o pagos en línea y textos sin fuente del Colegio. Con captura y ruta de cada hallazgo | `docs/QA_Reglas_Fase1.md` | vie 13 · 20:00 |

### 🎨 Jocelyn Aguilar · rama `fase1/jocelyn` · Respaldo: María Fernanda
Solo archivos de diseño; se suben desde la página de GitHub.

| ID | Tarea | Archivos | Entrega |
|---|---|---|---|
| F1-JA1 | **Rediseño del organigrama** pedido por el Consejo: **logo a la izquierda + CICTGZ** y nombre «Colegio de Ingenieros Civiles de Tuxtla Gutiérrez, A.C.». Los cargos y nombres se copian **letra por letra** del organigrama oficial (solo se corrige «Visepresidente»). Se publica **solo si el Colegio lo aprueba** (José María lo presenta) | Drive `05_Diseno/organigrama/` (PNG + editable). Pablo lo sube al repo cuando haya visto bueno | mié 11 · 20:00 |
| F1-JA2 | Galerías: 3 a 6 fotos por servicio en 1600×1000, menos de 350 KB, nombres `dro-01.jpg`, `rt-01.jpg`… (`rt-01.jpg` = el actual `dro.jpg`, petición del Consejo). **Solo fotos del Colegio** (las que mande o las de sus redes oficiales); la fuente se anota en el PR | `public/img/galerias/{dro,rt,dictaminador,peritos,calculo,bolsa}/*` | jue 12 · 20:00 |
| F1-JA3 | Patrón de **trazos arquitectónicos**: SVG de menos de 30 KB, líneas en `#E5E5E5` o `#BA2A33` muy tenue, que se pueda repetir como fondo | `public/img/patrones/trazos-arquitectonicos.svg` | jue 12 · 20:00 |

### 📨 José María Orantes · rama `fase1/jose-maria` *(enlace con el Colegio)* · Respaldo: Pablo
| ID | Tarea | Archivos | Entrega |
|---|---|---|---|
| F1-JM1 | **Enviar el oficio** al Ing. Nein con la lista de la tabla «Lo que depende del Colegio», más: **horario de sábado** (hoy el sitio dice 13:00 en un lugar y 14:00 en otro; respuesta a más tardar el mié 11), **número de WhatsApp oficial**, si el requisito de «Título» aplica, si la Bolsa de Trabajo existe, tríptico 2026 y permiso para usar fotos con personas. Avisar que la fecha límite es el **mar 17**. Recordatorio y organigrama de Jocelyn para visto bueno el **jue 12** | Drive `07_Admin/` | Envío: lun 9 · 20:00 · Reporte: vie 13 · 20:00 |
| F1-JM2 | Corregir datos: `requisitos.js` (2 años / 5 años **de expedición de la cédula**, Art. 23, cédula SEP, carta de no adeudo); **vaciar** las asambleas y los cursos de ejemplo (dejar `[]` y borrar el comentario «DATOS DE EJEMPLO»); en la nota de MORENA agregar que el Colegio asistió **como Asociación Civil sin filiación partidista**; horario de sábado y WhatsApp (los confirmados) en `contacto.js`, que los cambia en todo el sitio | `src/data/requisitos.js`, `src/data/asambleas.js`, `src/data/cursos.js`, `src/data/contacto.js` | mié 11 · 20:00 |
| F1-JM3 | **Registro de fuentes**: subir al Drive todo lo que mande el Colegio, tal cual, y anotar en una hoja qué es, quién lo mandó y la fecha. Es la prueba de que nada en el sitio es inventado | Drive `01_Material_Colegio/` y `07_Admin/registro_fuentes` | sáb 14 · 20:00 |

### 👑 Pablo Ramírez · rama `feat/panel-admin` (larga duración)
| ID | Tarea | Entrega |
|---|---|---|
| F1-PR0 | Limpieza urgente (ver Día 0) | lun 9 · 09:00 |
| F1-PR1 | Crear la estructura del Drive, la clase de Classroom con todas las tareas e invitar a todos al repositorio | lun 9 · 09:00 |
| F1-PR2 | Revisar y unir los PR cada noche; el **dom 15** unir todo a `main` y arrancar la Fase 2 | diario + dom 15 |
| F1-PR3 | Panel administrativo: proyecto de Supabase con el esquema de Daniel y prototipo de inicio de sesión | sáb 14 · 20:00 |

---

## FASE 2 (16 → 21 nov): cargar lo que mandó el Colegio, calidad y publicación

> Todos crean `fase2/<nombre>` desde `main` el **lun 16**. El **mar 17 a las 20:00** se cierra la espera: lo que el Colegio no haya mandado pasa al plan B (o se elimina) y **no se espera a nadie**.

### 💻 María Fernanda · `fase2/fernanda` · Respaldo: Pablo
| ID | Tarea | Archivos | Entrega |
|---|---|---|---|
| F2-MF1 | **Servicio social**: si el Colegio mandó texto o PDF, página `/conocenos/servicio-social` (menú «Conócenos» y Footer) con ese contenido y el PDF. Si no, el aviso breve del plan B dentro de Misión y Visión. **Beneficio a la Sociedad**: página solo si llegó el material; si no, no se crea | `src/pages/Conocenos/ServicioSocial/*`, `src/data/servicioSocial.js` (lo llena José María), `config/rutas.js`, `App.jsx` (o `MisionVision.jsx` para el plan B) | jue 19 · 20:00 |
| F2-MF2 | Página **404** (hoy redirige al inicio sin avisar). Si el Colegio mandó el **Código de Ética** en PDF, reactivar su enlace en el Footer apuntando al PDF | `src/pages/NoEncontrada/*`, `App.jsx`, `Footer.jsx` | jue 19 · 20:00 |
| F2-MF3 | Carga diferida de páginas (`React.lazy`) para bajar el JS de más de 500 kB; metadatos Open Graph en `index.html` | `App.jsx`, `index.html` | vie 20 · 20:00 |
| F2-MF4 | **Animación sutil** de aparición de secciones (CSS, respetando `prefers-reduced-motion`) y clase `.fondo-trazos` con el SVG de Jocelyn | `src/styles/index.css` | `.fondo-trazos`: mar 17 · 20:00 · animación: sáb 21 · 20:00 |

### 🛠️ Josué · `fase2/josue` · Respaldo: Pablo
| ID | Tarea | Archivos | Entrega |
|---|---|---|---|
| F2-JB1 | Aplicar el fondo de trazos: agregar `fondo-trazos` al `className` de la sección principal de cada archivo (Fernanda deja la clase lista el mar 17; si no está, se usa `fondo-cuadricula`) | **solo el `className`** en `FeatureCards.jsx`, `AtencionWhatsapp.jsx`, `CursosCapacitacion.jsx`, `Asambleas.jsx`, `Comisiones.jsx` | jue 19 · 20:00 |
| F2-JB2 | Plan B de trámites: dejar en `tramitesInfo.js` **solo** lo que viene del tríptico, las entrevistas o lo que mandó el Colegio (según el registro de fuentes de José María); borrar todo lo demás | `src/data/tramitesInfo.js` | vie 20 · 20:00 |

### 🛠️ Ignacio · `fase2/ignacio` · Respaldo: Josué
| ID | Tarea | Archivos | Entrega |
|---|---|---|---|
| F2-IM1 | Optimizar las 8 imágenes del muro: menos de 300 KB cada una, mismo nombre | `public/img/posts/*` | mié 18 · 20:00 |
| F2-IM2 | **Revisión de enlaces**: abrir la versión de prueba y hacer clic en cada botón, enlace, PDF y número de WhatsApp; anotar los que fallan o llevan a un lugar equivocado, con captura | `docs/QA_Enlaces.md` | vie 20 · 20:00 |

### 🗄️ Daniel · `fase2/daniel` · Respaldo: Pablo
| ID | Tarea | Archivos | Entrega |
|---|---|---|---|
| F2-DB1 | **QA responsivo**: todas las vistas a 360, 768 y 1440 px; reporte con captura, ruta y descripción de cada falla (Fernanda o Pablo las corrigen) | `docs/QA_Fase2.md` | jue 19 · 20:00 |
| F2-DB2 | **Manual de usuario** del sitio para el Colegio: cómo pedir cambios y qué se puede actualizar desde el panel | `docs/Manual_Usuario.md` | sáb 21 · 20:00 |
| F2-DB3 | Consultas SQL del panel (listar, crear y editar noticias y cursos) para Pablo | `docs/panel-admin/consultas.sql` | sáb 21 · 20:00 |

### 🎨 Jocelyn · `fase2/jocelyn` · Respaldo: María Fernanda
| ID | Tarea | Archivos | Entrega |
|---|---|---|---|
| F2-JA1 | Sustituir fotos de las galerías por el **material oficial** que haya mandado el Colegio (sobre todo derrumbes e inspecciones) y `curso1.jpg` por la foto de un curso real, si llegó | `public/img/galerias/**`, `public/img/paginas/eventos/cursos/*` | jue 19 · 20:00 |
| F2-JA2 | Imagen para compartir en redes (Open Graph, 1200×630) con el logo oficial **sin modificar** y la paleta | `public/img/og-cictgz.jpg` | vie 20 · 20:00 |

### 📨 José María · `fase2/jose-maria` · Respaldo: Pablo
| ID | Tarea | Archivos | Entrega |
|---|---|---|---|
| F2-JM1 | **Copiar tal cual** al sitio lo que mandó el Colegio: cursos, asambleas y, si llegaron, los textos de servicio social, beneficio social y servicios del perito. Cada PR con la captura de la fuente. Nada redactado ni pasado por IA | `src/data/cursos.js`, `src/data/asambleas.js`, `src/data/servicioSocial.js`, `src/data/beneficioSocial.js`, `src/data/servicios.js` (peritos) | mié 18 · 20:00 |
| F2-JM2 | Avisar al grupo, el **mar 17 a las 21:00**, qué llegó y qué no, para activar los planes B | Grupo + Drive `07_Admin/` | mar 17 · 21:00 |
| F2-JM3 | Presentar al Colegio la versión de prueba (enlace de Pablo), incluido el organigrama, y registrar sus comentarios | Drive `07_Admin/` | sáb 21 · 20:00 |

### 👑 Pablo · `feat/panel-admin`
- Unir los PR cada noche; **mié 18**: publicar la versión de prueba (Vercel o Netlify, con redirección de rutas de la SPA) para que José María la presente; **dom 22**: build final, publicación y etiqueta `v1.0`.
- Si el Colegio mandó la sección de peritos: mostrarla en la plantilla `PaginaServicio.jsx` leyendo `servicios.peritos.serviciosOficiales` de `data/servicios.js`.
- MVP del panel administrativo (ver abajo).

---

## Qué falta además de lo que pidió el Colegio

| Pendiente | Por qué importa | Tarea |
|---|---|---|
| PDF con **datos personales reales** | Riesgo legal y de extorsión | F1-PR0 (retirar) + pedir formatos en blanco (F1-JM1) |
| Foto del gobierno de la CDMX en Bolsa | Imagen ajena | F1-PR0 |
| Organigrama con el nombre equivocado | Imagen institucional | F1-JA1 (con visto bueno del Colegio) |
| Asambleas y cursos ficticios publicados | Información falsa | F1-JM2 |
| Regla de cartas contradictoria (2 vs 3 años) | Trámite mal explicado | F1-JM2 |
| 3 botones de descarga con error 404 | Funcionalidad rota | F1-PR0 |
| Leyes citadas sin respaldo del Colegio | Riesgo legal | F1-JB3 |
| Página 404 (hoy redirige al inicio sin avisar) | Experiencia de usuario | F2-MF2 |
| Videos de 5 a 24 MB y JS de más de 500 kB | Lentitud en celulares | F1-IM2, F2-MF3 |
| Sin favicon, sin imagen para redes, título genérico | Presentación y SEO | F1-MF4, F2-JA2, F2-MF3 |
| No está publicado en internet | El Colegio no puede usarlo | Pablo (mié 18) |
| Sin manual para el Colegio | Dependencia del equipo | F2-DB2 |
| Permisos de uso de fotos con personas | Derechos de imagen | Se pide en el oficio (F1-JM1) |

---

## Estructura del Drive

Carpeta compartida: https://drive.google.com/drive/folders/1PZYYyMHTs4ZaRnVExJeveOKKtXiX2_sL

```text
CICTGZ-Portal/
├── 01_Material_Colegio/        ← originales tal como los manda el Colegio (no se editan)
│   ├── Fotos/ DRO · RT · Dictaminador · Peritos · Calculo · Bolsa · Cursos · Asambleas · Eventos
│   ├── Documentos/             (oficios, formatos, código de ética, PDF)
│   └── Textos/                 (descripciones de servicios, respuestas por correo)
├── 02_Imagenes_Web/            ← versiones optimizadas, idénticas a las de public/img/
├── 03_Videos/
│   ├── originales/
│   └── web/                    (comprimidos, los que van al repo)
├── 04_Documentos_Web/          ← PDF del Colegio que el sitio enlaza
├── 05_Diseno/                  (archivos de Canva/Figma: organigrama, patrones, OG)
├── 06_Evidencias_Equipo/       (capturas de cada entrega, QA)
└── 07_Admin/                   (oficios enviados, respuestas, registro de fuentes, registro de tareas)
```

**Regla:** los PDF del Colegio pueden enlazarse desde el Drive («Cualquier persona con el enlace · Lector»). Las imágenes y los videos **no**: van al repositorio optimizados, porque Google bloquea ese uso como hosting.

---

## Panel administrativo (idea de Pablo; fuera de las fases)

- **Objetivo:** que el Colegio o los encargados de redes publiquen noticias, eventos, cursos, asambleas y vacantes **sin pedírselo al equipo**. También resuelve lo que hoy depende de que el Colegio nos mande información: lo podrán subir ellos mismos.
- **Recomendación:** **Supabase** (gratis): inicio de sesión con correo y contraseña, base de datos Postgres, almacenamiento de fotos y reglas de acceso (RLS) para que solo los usuarios con rol `editor` puedan escribir. Funciona con este proyecto React/Vite sin necesidad de servidor propio.
- **Alcance mínimo (MVP):** ruta `/admin` con carga diferida; CRUD de **noticias del muro** y **cursos**; subida de foto con compresión. Lo demás (asambleas, vacantes) en una segunda versión.
- **Seguridad:** la clave `service_role` **nunca** va en el frontend ni en git; solo la `anon key` en `.env`, que debe estar en `.gitignore`. Contraseñas gestionadas por Supabase y cuentas creadas solo por Pablo.
- **Migración:** los `src/data/*.js` actuales quedan como respaldo si la base no responde.
