# Estado y verificación del proyecto: portal CICTGZ

**Fecha de auditoría:** 28 de octubre de 2026
**Base auditada:** rama `main`, commit `3688d0b` (19 oct), más 2 cambios locales sin commit (`Header.css`, `Notas_observaciones.txt`)
**Alcance:** todos los `.jsx`, `.js` y `.css` de `visuales/src/`, todos los archivos de `visuales/public/` (imágenes revisadas visualmente y texto de los PDF extraído) y `visuales/index.html`.
**Fuente de verdad:** trípticos, oficios CICTG/PRES/VI/01/2026 y 02/2026, organigrama, documento de prensa (`public/documentos/asambleas.pdf`) y entrevistas con el Ing. Nein.

> Todas las rutas son relativas a `visuales/`. Los números de línea corresponden al commit `3688d0b`.

---

## 🚨 Hallazgos críticos (resolver antes de cualquier otra cosa)

| # | Hallazgo | Dónde | Riesgo |
|---|---|---|---|
| C1 | **Los 3 formatos descargables contienen datos personales reales de un agremiado:** nombre, domicilio particular, teléfono, correo, CURP, número de cédula y fecha de nacimiento. | `public/documentos/oficio-inscripcion.pdf`, `cedula-inscripcion.pdf`, `carta-protesta-decir-verdad-2023.pdf`, enlazados desde `Header.jsx:140-142` | **Legal y de privacidad.** Contradice la política del propio Colegio de no publicar datos personales (riesgo de extorsión). Hay que sustituirlos por **formatos en blanco**. |
| C2 | `bolsa.jpg` es un **flyer de la Secretaría de Trabajo de la Ciudad de México / SNE** («2 617 vacantes», «Descarga aquí»). | `public/img/paginas/servicios/bolsa.jpg`, usado en `BolsaTrabajo.jsx:102` | Muestra la marca de otra institución de gobierno como si fuera del Colegio. |
| C3 | El organigrama dice **«Colegio de Ingenieros Civiles de Chiapas .A.C.»** (nombre incorrecto) y **«Visepresidente»** (falta de ortografía). | `public/img/documentos/organigrama.jpeg`, usado en `MisionVision.jsx:143-149` | Nombre institucional equivocado en una página oficial. |
| C4 | La página Asambleas **publica 2 registros de ejemplo**: «Asamblea General Ordinaria (ejemplo)», con fechas y acuerdos ficticios. | `src/data/asambleas.js:18-52` | Contenido falso visible al público. |
| C5 | La regla de cartas **se contradice dentro del sitio**: el modal de afiliación dice **2 años** (correcto) y las páginas de DRO, RT y Dictaminador dicen **3 años**. | `src/data/requisitos.js:15` vs `Header.jsx:258` | Información de trámite errónea. |
| C6 | Los 3 botones «Descargar Lista de Documentos» apuntan a **PDF que no existen**. | `Dro.jsx:105`, `Rt.jsx:105`, `Dictaminador.jsx:101` | El usuario descarga un archivo roto (error 404). |
| C7 | Hay un cambio local sin commit en `Header.css`. Comentó el fondo y, por error, también `box-shadow`, `backdrop-filter`, `font-family` y `transition`. **Hoy el header es transparente hasta hacer scroll y perdió la tipografía Montserrat.** | `src/components/layout/Header/Header.css:24-29` | Regresión de legibilidad sobre los videos. |

---

## 1. 🛠️ ¿Qué falta por terminar? (los 13 puntos del Consejo + enlaces)

**Resumen:** desde el 19 de octubre **no hay commits nuevos** y no existe ninguna rama del plan (`feat/carrusel-*`, `feat/header-color-cictgz`, etc.). No se ha creado el Día 0 del plan: faltan `GaleriaCarrusel`, `galerias.js` y las páginas nuevas.

| # | Punto | Estado | Evidencia en el código | Qué falta |
|---|---|---|---|---|
| 1 | Menú en rojo institucional con cristal y legible sobre videos | ❌ (con regresión) | `Header.css:24` tiene el fondo blanco comentado sin sustituto; ningún color rojo en `.hd-header` | Restaurar las propiedades comentadas por error y aplicar `rgba(186,42,51,.92)` + `backdrop-filter` + texto blanco (especificación en `Auditoria_Y_Tareas_CICTGZ.md`, punto 1) |
| 2 | Imágenes de DRO → RT | ❌ | `Dro.jsx:65` sigue usando `dro.jpg`; `Rt.jsx:65` usa `rt.jpg` | Mover `dro.jpg` a la galería de RT y conseguir fotos nuevas para DRO |
| 3 | Letra más grande | ⚠️ | Ya hay base de 18px (`index.css`: `--fs-base`), pero **quedan 54 `font-size` menores a 14px**: Header 19, Footer 7, MisionVision 4, Asambleas 4, AtencionWhatsapp 3, Cursos 3, Bolsa 3, Comisiones 2, Dro 2, Rt 2, Dictaminador 2, Hero 1, Peritos 1, Cálculo 1 | Subir a ≥ 0.95rem en etiquetas y ≥ 1rem en texto de lectura |
| 4 | Texto justificado | ⚠️ | Justificado solo en el párrafo principal de Dro, Rt, Dictaminador, Peritos, Cálculo, Bolsa, MisionVision (4 reglas) y `TramiteDetalle` | Falta en Cursos (descripciones y muro), Asambleas (resúmenes), Comisiones (intro), FeatureCards, Footer y las páginas nuevas |
| 5 | Galería del Dictaminador con derrumbes e inspecciones | ❌ | `Dictaminador.jsx:61` tiene una sola foto, y es de una **ceremonia de banderazo de un paso a desnivel** (gobierno estatal, con cubrebocas) que no muestra ninguna inspección | Carrusel + fotos oficiales de inspecciones o daños |
| 6 | `CICTGZ` en Header, Hero, Footer y `<title>` | ❌ | `Header.jsx:601-605`, `Hero.jsx:22-24` y `Footer.jsx:93-94` muestran solo el nombre largo; `index.html:7` dice `Inicio \| Colegio de Ingenieros Civiles`. Las siglas solo aparecen en el muro de noticias | Agregarlas en los 4 lugares |
| 7 | Perito Valuador con carrusel y lista completa de servicios | ❌ | `PeritosValuadores.jsx:11-25` tiene solo 3 «usos» genéricos y 1 foto de stock | Carrusel + `peritosServicios.js` con los servicios oficiales |
| 8 | `GaleriaCarrusel` en todas las vistas de Trámites y Servicios | ❌ | El componente **no existe**. Swiper 14 ya está instalado y solo lo usa `BannerCarrusel.jsx` | Crear el componente (Anexo A del plan) y aplicarlo en 6 vistas |
| 9 | Organigrama con logo a la izquierda + `CICTGZ` | ❌ | La imagen tiene el logo a la **derecha**, no tiene las siglas y además tiene el nombre equivocado (C3) | Rehacer la imagen |
| 10 | Fotos de cursos en universidades | ⚠️ | Las 3 fotos **ya son reales de la UNACH**: `curso1` es el 60 aniversario de la Facultad de Ingeniería (un evento, no un curso), `curso2` es una foto grupal en el Laboratorio de Calidad del Agua y `curso3` es una clase impartida por alguien con chaleco del Colegio | Confirmar con el Consejo si estas son las que querían cambiar. Mínimo, sustituir `curso1` por la foto de un curso |
| 11 | Fondos con trazos o patrones | ⚠️ | `.fondo-cuadricula` en 7 vistas; `.fondo-puntos` solo en `TramiteDetalle`. **No existe** `.fondo-trazos` ni `public/img/patrones/` | Crear el patrón de trazos y aplicarlo en Inicio, Cursos, Asambleas y Comisiones (hoy lisas) |
| 12 | Página de Beneficio a la Sociedad | ❌ | No existe ruta en `App.jsx`, ni página, ni datos, ni PDF | Todo |
| 13 | Página de Servicio Social Gratuito + PDF | ❌ | No existe. Solo hay una mención en `FeatureCards.jsx:6` | Todo |
| 14 | Enlaces rotos, botones sin acción y modales | ⚠️ | Ver la tabla siguiente | — |

### Punto 14: enlaces y botones con problemas

| Problema | Ubicación | Efecto |
|---|---|---|
| «Descargar Lista de Documentos» → PDF inexistente | `Dro.jsx:105`, `Rt.jsx:105`, `Dictaminador.jsx:101` | Descarga rota / 404 |
| «Aviso de Privacidad» y «Código de Ética» sin ruta | `Footer.jsx:179-180` | `App.jsx:33` los redirige al Inicio sin aviso |
| El botón de WhatsApp del Footer apunta al **teléfono fijo** `961-612-5541` (los oficios lo marcan como «TELÉFONO»; el celular es `961-119-0009`) | `Footer.jsx:13` | El chat probablemente no abre. El resto del sitio usa `529611190009` |
| Horario de sábado inconsistente: **14:00** en el modal de afiliación y **13:00** en el modal de contacto | `Header.jsx:239` vs `ModalContacto.jsx:84` | Información contradictoria |
| 3 de los 4 «Ver más» del carrusel de Inicio llevan a la página de Cursos, aunque sus temas son convenio con Caminos, foros y deportes | `BannerCarrusel.jsx:20, 29, 46` | Enlaces poco relevantes; no están rotos |
| `asambleas.pdf` (las 8 notas de prensa oficiales) existe pero nadie lo enlaza | `public/documentos/asambleas.pdf` | Recurso oficial desaprovechado |

---

## 2. 🕵️ Verificación de contenido: verídico vs. relleno

**Leyenda:** ✅ Oficial (documento) · 🗣️ Verbal (entrevista, confirmar) · 🚨 Relleno / Internet / IA · ⚠️ Oficial, pero alterado o con un error

### 2.1 Datos (`src/data/`)

| Archivo:línea | Texto | Clase | Observación |
|---|---|---|---|
| `requisitos.js:3-11` | 9 requisitos (solicitud, cédula, CV, RFC, domicilio, acta, INE/IFE, CURP, pago) | ⚠️ | Coinciden con el tríptico, pero **faltan** «avalada por 2 miembros numerarios (Art. 23)», «expedida por la SEP» y «carta de no adeudo y renuncia». El modal de afiliación sí los tiene |
| `requisitos.js:15` | «Cartas propias: máximo **3 años** desde su expedición» | 🚨 | **Error.** El dato oficial es 2 años de expedición **de la cédula** |
| `requisitos.js:16` | «Cartas ajenas: máximo 5 años desde su expedición» | ⚠️ | El número es correcto, pero el sentido no: son 5 años de expedición **de la cédula**, no de la carta |
| `tramitesInfo.js:6-26` | 4 «pasos para contratar» (contacta, describe tu proyecto, recibe el directorio, formaliza) | 🚨 | Redacción propia. Los pasos 3 y 4 («te compartimos el directorio…», «acuerda directamente… los honorarios») **pueden contradecir** la política de gestión centralizada en oficinas |
| `tramitesInfo.js:28-29` | Nota: no se publican los datos de los agremiados | 🗣️ | Coincide con la entrevista |
| `tramitesInfo.js:34-65` | DRO: intro + 6 funciones (licencia, supervisión, bitácora, corresponsables, seguridad, aviso de terminación) | 🚨 | Funciones técnicas generales tomadas de internet o generadas por IA. Solo «ante el municipio» es verbal |
| `tramitesInfo.js:76` | «El **Reglamento de Construcción del municipio de Tuxtla Gutiérrez** establece…» | 🚨 **legal** | Cita normativa no proporcionada por el Colegio |
| `tramitesInfo.js:77, 80-83` | Consecuencias de construir sin DRO (multas, escriturar, responsabilidad civil) | 🚨 | Generado |
| `tramitesInfo.js:91-122` | RT: intro + 6 funciones (licitaciones, precios unitarios, bitácora, estimaciones, entrega-recepción, vicios ocultos) | 🚨 | Generado |
| `tramitesInfo.js:133` | «…**padrón de contratistas del Estado**… Representante Técnico con claves… ante la Secretaría de la Honestidad y Buen Gobierno» | 🚨 / 🗣️ | La parte de la Secretaría es verbal; el requisito del padrón de contratistas es **una afirmación legal propia** |
| `tramitesInfo.js:134, 137-140` | Consecuencias para empresas sin RT | 🚨 | Generado |
| `tramitesInfo.js:148-179` | Dictaminador: intro + 6 funciones | 🚨 / 🗣️ | El Atlas de Riesgos (l.153) y «municipios, Protección Civil y Obras Públicas» (l.163) son verbales; el resto es generado |
| `tramitesInfo.js:190` | «La **Ley de Protección Civil del Estado de Chiapas** y los reglamentos municipales exigen…» | 🚨 **legal** | Cita normativa propia |
| `tramitesInfo.js:191, 194-197` | «Chiapas es una de las entidades con mayor actividad sísmica…» y riesgos | 🚨 | Generado |
| `asambleas.js:18-52` | 2 asambleas «(ejemplo)», fechas 2026-03-14 y 2025-11-22, acuerdos ficticios | 🚨 **visible** | Las fotos `asamblea1.jpg` muestran una sesión real del Colegio, pero el texto es ficticio |
| `vacantes.js:20` | Arreglo vacío | ✅ | La página muestra «sin vacantes» (correcto) |

### 2.2 Trámites (`src/pages/Tramites/`)

| Archivo:línea | Texto | Clase | Observación |
|---|---|---|---|
| `Dro.jsx:40-41` | «Registro y respaldo gremial… DRO ante el municipio» | 🗣️ | |
| `Dro.jsx:51-54` | Definición del DRO («responsabilidad técnica y legal…») | 🚨 / 🗣️ | Definición general; solo «ante el municipio» es verbal |
| `Rt.jsx:40-41, 51-54` | Claves de especialidad ante la Secretaría de la Honestidad y Buen Gobierno; el Colegio gestiona y respalda | 🗣️ | Fiel a la entrevista |
| `Dictaminador.jsx:35-36, 46-50` | Diplomado especializado, Atlas de Riesgos, municipios y Secretaría de Obras Públicas, obras nuevas y emergencias | 🗣️ | Fiel a la entrevista |
| `Dro/Rt/Dictaminador.jsx` (requisitos y notas) | Leen `requisitos.js` | 🚨 | Heredan el error de los 3 años (C5) |

### 2.3 Servicios (`src/pages/Servicios/`)

| Archivo:línea | Texto | Clase | Observación |
|---|---|---|---|
| `PeritosValuadores.jsx:49, 68-70` | Dictámenes de valor de inmuebles, casas y propiedades | 🗣️ | |
| `PeritosValuadores.jsx:13-24` | 3 «usos»: inmuebles, transacciones, avalúos oficiales | 🚨 | Derivados de la frase verbal; **no son la lista oficial de servicios** que pidió el Consejo |
| `CalculoEstructural.jsx:68-70` | Ingenieros con maestría en estructuras, obras de gran envergadura, con los DRO | 🗣️ | |
| `CalculoEstructural.jsx:13-24` | 3 alcances (memorias, grandes obras, trabajo con el DRO) | 🗣️ / 🚨 | Reformulación de la entrevista |
| `BolsaTrabajo.jsx` (todo) | Servicio de Bolsa de Trabajo, «¿A quién va dirigida?» (l.35-46), «Vacantes de universidades, constructoras y agremiados» (l.90-91) | 🚨 | **La Bolsa de Trabajo no aparece en la Base de Verdad.** Confirmar que el servicio existe antes de publicarlo |

### 2.4 Conócenos y Eventos

| Archivo:línea | Texto | Clase | Observación |
|---|---|---|---|
| `MisionVision.jsx:27, 35` | Misión y Visión | ✅ | Textuales del tríptico |
| `MisionVision.jsx:40-42` | Nombres de los valores (Eficiencia, Ética, Innovación) | ✅ | |
| `MisionVision.jsx:40-42` | Descripciones de los valores («Trámites… con oportunidad y calidad», etc.) | 🚨 | Redactadas por el equipo |
| `MisionVision.jsx:48` | Compromiso: «Apego estricto al Código de Ética y vigilancia mediante la Comisión de Honor y Justicia» | 🚨 | **No es uno de los 4 compromisos oficiales**: sustituyó a uno real |
| `MisionVision.jsx:52` | «Promover leyes, reglamentos y reformas…» | ✅ | Compromiso 1 |
| `MisionVision.jsx:57` | «Colaborar en… planes de especialidades y maestrías con universidades» | ⚠️ | **Fusionó** los compromisos oficiales 2 y 3 y los recortó |
| `MisionVision.jsx:62` | «Impulsar la investigación… registro ante la SEP, padrón activo mayor a 100 colegiados, 4 cursos / 30 h» | ✅ + 🗣️ | Compromiso 4 mezclado con datos verbales |
| `MisionVision.jsx:97-99` | «…institución que agrupa y representa… en la región» | 🚨 | Texto genérico |
| `MisionVision.jsx:189-191` | Política de privacidad: especialistas gestionados por las oficinas | 🗣️ | |
| `Comisiones.jsx:23-49` | Fichas de DRO, RT, Dictaminadores, Peritos y Memoria de Cálculo | 🗣️ | Las especialidades son verbales. Nota: en la entrevista Dictaminadores, Peritos y Cálculo son **especialidades**, no comisiones |
| `Comisiones.jsx:53-69` | Nombres: Honor y Justicia, Ambiental e Impacto Ecológico, Deportes, Acción Social | 🗣️ | Coinciden con la entrevista |
| `Comisiones.jsx:54, 59, 64, 69` | Descripciones de esas 4 comisiones | 🚨 | Genéricas |
| `Comisiones.jsx:95-96` | «…servicios técnicos ante municipios, dependencias y sector privado» | 🗣️ / 🚨 | |
| `CursosCapacitacion.jsx:42-70` | 3 cursos (Supervisión de Obra Pública, Precios Unitarios, Bitácora Electrónica), fechas 15/22 nov y 5 dic de 2026, horarios y modalidades | 🚨 **visible** | Marcado «DATOS DE EJEMPLO» en l.36. Si no hay cursos reales, vaciar el arreglo: la página ya tiene un mensaje para «sin cursos» |
| `CursosCapacitacion.jsx:30-32, 308-309` | Requisitos de inscripción (formato impreso, INE, voucher, credencial para descuento) | 🗣️ / 🚨 | Los descuentos por modalidad son verbales; los documentos exactos no están confirmados |
| `CursosCapacitacion.jsx:291-292` | Registro y asistencia presenciales | 🗣️ | |
| `CursosCapacitacion.jsx:84-126` | 8 noticias del muro | ✅ | Coinciden con `asambleas.pdf`. Detalle: en la nota de MORENA (l.102) falta la precisión oficial de que el Colegio asistió **«en su carácter de Asociación Civil, sin filiación partidista»**; conviene agregarla |
| `Asambleas.jsx:118-119` | Texto introductorio | 🚨 | Genérico, sin problema |

### 2.5 Componentes compartidos

| Archivo:línea | Texto | Clase | Observación |
|---|---|---|---|
| `Header.jsx:130` | Solicitud respaldada por 2 miembros numerarios (Art. 23) | ✅ | Coincide con `oficio-inscripcion.pdf` |
| `Header.jsx:131` | «Cédula profesional expedida por la S.E.P. **y Título**» | ⚠️ | El «Título» no está en la Base de Verdad: confirmar |
| `Header.jsx:132-136` | CV, RFC, domicilio, acta, INE, CURP, pago | ✅ | |
| `Header.jsx:155-175` | Las 11 cuotas 2026 | ✅ | Coinciden exactamente con el oficio 01/2026 |
| `Header.jsx:182-183` | Cuentas Santander y BBVA (cuenta y CLABE) | ✅ | Coinciden exactamente con el oficio 02/2026 |
| `Header.jsx:187-188, 362-374` | Reglas de facturación, correo y WhatsApp `961-285-1837` | ✅ | Coinciden con el oficio 02/2026 |
| `Header.jsx:235` | Calle 11ª Ote. Sur 1056, Col. Maldonado | ✅ | |
| `Header.jsx:239` | L-V 9:00-17:00 · Sáb 9:00-**14:00** | 🗣️ | Contradice `ModalContacto.jsx:84` |
| `Header.jsx:258-259` | Notas de cartas (2 años, 5 años, no adeudo y renuncia) | ✅ | Texto correcto |
| `ModalContacto.jsx:9, 76` | Dirección completa | ✅ | |
| `ModalContacto.jsx:13` | 3 teléfonos | ✅ | Falta `961-130-3088` |
| `ModalContacto.jsx:66-67` | Recepción de documentos solo presencial | 🗣️ | |
| `ModalContacto.jsx:83-84` | Sábados 9:00-**13:00** | 🗣️ | Unificar con el Header |
| `Footer.jsx:11-12, 19-21` | 4 teléfonos, 2 correos, delegaciones de Palenque, Pijijiapan y Yajalón | ✅ | |
| `Footer.jsx:9` | Dirección «Tuxtla Gutiérrez, Chiapas, México» | ⚠️ | Correcta pero incompleta; falta la calle oficial |
| `Footer.jsx:13` | WhatsApp `529616125541` | ⚠️ | Es el número fijo (ver punto 14) |
| `Footer.jsx:61-62` | Facebook e Instagram | 🗣️ | Verificar que sean las cuentas oficiales |
| `Footer.jsx:98-99` | «Impulsamos el desarrollo técnico…» | 🚨 | Texto de marca genérico, sin riesgo |
| `Hero.jsx:27-28` | Paráfrasis de la Misión | ✅ | |
| `FeatureCards.jsx:5, 7` | Representación; gestión de DRO y RT | 🗣️ | |
| `FeatureCards.jsx:6` | Convenios con gobierno y universidades para servicio social | 🗣️ | |
| `FeatureCards.jsx:8` | «Cuotas preferenciales para estudiantes **de últimos semestres** y pasantes en cursos y afiliación» | ⚠️ | Las cuotas de pasante y estudiante son oficiales; lo de «últimos semestres» no está respaldado |
| `BannerCarrusel.jsx:16-46` | Etiquetas y descripciones de los 4 banners («Alianza con la Comisión Estatal de Caminos», «Foros académicos», «Sesiones y acuerdos», «Encuentros deportivos») | 🗣️ / 🚨 | Las fotos son reales según el comentario de l.12, pero **las descripciones las redactó el equipo**. El convenio con Caminos es verbal |
| `AtencionWhatsapp.jsx:13-39` | 5 preguntas frecuentes | 🗣️ / ✅ | La de facturación (l.39) es oficial; las demás son coherentes con la entrevista |

---

## 3. 🖼️ Archivos multimedia y PDF (`public/`)

### 3.1 Referenciados en el código

| Archivo | ¿Existe? | Estado | Observación |
|---|---|---|---|
| `img/logos/logo-colegio.png` | ✅ | **Definitivo** | Logo oficial (308 KB; conviene optimizarlo) |
| `img/documentos/costos.jpg` | ✅ | **Definitivo** | Oficio 01/2026 escaneado |
| `img/documentos/datos-bancarios.jpg` | ✅ | **Definitivo** | Oficio 02/2026 escaneado |
| `img/documentos/triptico-enfrente.jpg` / `triptico-atras.jpg` | ✅ | **Definitivo, desactualizado** | ⚠️ Sus costos (inscripción $300, reinscripción enero $2,000) **no coinciden** con el oficio 2026. Conviene poner un aviso «costos vigentes en la pestaña Costos» o pedir el tríptico 2026 |
| `img/documentos/organigrama.jpeg` | ✅ | ⚠️ **Por rehacer** | Nombre equivocado («de Chiapas»), «Visepresidente», logo a la derecha y sin siglas |
| `img/posts/1.png`–`8.png` | ✅ | **Definitivo** | Imágenes de las notas de prensa. Pesan entre 268 KB y 1 MB: optimizarlas |
| `img/banners/comision-de-caminos.jpg`, `grupal.jpg`, `reunion.jpg`, `partido-futbol-salazar.jpg` | ✅ | Definitivo según el código | No las revisé visualmente |
| `img/paginas/eventos/asambleas/asamblea1.jpg` | ✅ | **Real** | Sesión del Colegio (camisas con el logo) |
| `img/paginas/eventos/asambleas/asamblea1-2.jpg`, `asamblea1-3.jpg`, `asamblea2.jpg` | ✅ | Probablemente reales | No las revisé visualmente; están ligadas a registros ficticios |
| `img/paginas/eventos/cursos/curso1.jpg` | ✅ | Real, **no es un curso** | 60 aniversario de la Facultad de Ingeniería de la UNACH |
| `img/paginas/eventos/cursos/curso2.jpg` | ✅ | Real | Foto grupal en el Laboratorio de Calidad del Agua de la UNACH |
| `img/paginas/eventos/cursos/curso3.jpg` | ✅ | Real | Clase impartida con chaleco del Colegio |
| `img/paginas/tramites/dro.jpg` | ✅ | Real, **mal ubicada** | Dos ingenieros en un puente atirantado en construcción. Vertical 1536×2048 (472 KB). El Consejo pidió moverla a RT |
| `img/paginas/tramites/rt.jpg` | ✅ | Real (prensa municipal) | Sesión en el Ayuntamiento de Tuxtla 2024-2027 («16 enero»). No muestra trabajo de RT |
| `img/paginas/tramites/dictaminador.jpg` | ✅ | 🚨 **De internet / prensa de gobierno** | Banderazo del «Paso a desnivel Libramiento Sur», con cubrebocas. No es una inspección de riesgos |
| `img/paginas/servicios/peritos.jpg` | ✅ | 🚨 **Stock de internet** | Plano de una casa con textos en inglés («COVERED PORCH») |
| `img/paginas/servicios/calculo.jpg` | ✅ | 🚨 **Miniatura de internet** | 12 KB y unos 260 px de ancho: se ve pixelada |
| `img/paginas/servicios/bolsa.jpg` | ✅ | 🚨 **Retirar** | Flyer del gobierno de la CDMX (C2) |
| `videos/home.mp4` (5.4 MB), `parque-central.mp4` (13.5 MB), `puente-colores.mp4` (13.7 MB), `vista-aerea.mp4` (23.8 MB) | ✅ | Origen por confirmar | **Pesan demasiado** para celulares: comprimir a < 4 MB cada uno y confirmar los derechos de uso |
| `documentos/oficio-inscripcion.pdf` | ✅ | 🚨 **Retirar ya** | Formato lleno con datos personales (C1) |
| `documentos/cedula-inscripcion.pdf` | ✅ | 🚨 **Retirar ya** | Incluye CURP, domicilio, teléfono y fecha de nacimiento (C1) |
| `documentos/carta-protesta-decir-verdad-2023.pdf` | ✅ | 🚨 **Retirar ya** | Datos personales. Además dice «**IV** Consejo Directivo» (debería ser VI) y el archivo se llama «2023» pero tiene fecha de 2026 |
| `documentos/requisitos-dro.pdf` | ❌ **404** | Falta | `Dro.jsx:105` |
| `documentos/requisitos-rt.pdf` | ❌ **404** | Falta | `Rt.jsx:105` |
| `documentos/requisitos-dictaminador.pdf` | ❌ **404** | Falta | `Dictaminador.jsx:101` |

> `documentos/temario-precios.pdf` aparece solo en un **comentario** de `CursosCapacitacion.jsx:38`, así que no genera 404.

### 3.2 Archivos en `public/` que nadie usa

| Archivo | Recomendación |
|---|---|
| `documentos/asambleas.pdf` | **Es oficial** (las 8 notas de prensa). Enlazarlo desde el muro de noticias o desde Beneficio Social |
| `img/banners/1.png`, `2.png`, `3.png` | Revisar y borrar si son versiones viejas |
| `img/logos/logo-colegio.svg` | Usarlo en lugar del PNG de 308 KB en Header, Footer y Hero (se ve más nítido y pesa menos) |
| `img/logos/logo-carrera.png`, `logo-uni.png` | Logos de la universidad de los estudiantes. Usarlos en un crédito del footer o borrarlos |

### 3.3 Rutas del plan que todavía no existen

No generan 404 porque aún no se referencian, pero deben crearse el Día 0: `img/galerias/{dro,rt,dictaminador,peritos,calculo,bolsa}/*.jpg`, `img/patrones/trazos-arquitectonicos.svg`, `documentos/servicio-social-gratuito.pdf` y `documentos/beneficio-social.pdf`.

---

## 4. 🚀 Lista priorizada de pendientes

### A. Hoy, en código (sin esperar al Colegio)

1. **Retirar los 3 PDF con datos personales** (C1). Mientras llegan los formatos en blanco, quitar el bloque «Formatos oficiales (PDF)» de `Header.jsx:140-142` y `:263-276`, o sustituir los archivos por versiones en blanco si se pueden limpiar.
2. **Quitar `bolsa.jpg`** (C2). Dejar que se muestre el placeholder «Imagen pendiente» o usar una foto propia.
3. **Resolver `Header.css`** (C7): `git restore` y después aplicar el rojo institucional del punto 1.
4. **Corregir `requisitos.js`** (C5): poner 2 años / 5 años **de expedición de cédula**, agregar Art. 23, cédula SEP y carta de no adeudo y renuncia.
5. **Vaciar `asambleas.js`** (C4) y **vaciar `cursosData`** (`CursosCapacitacion.jsx:42-70`). Las dos páginas ya tienen un mensaje para cuando no hay datos.
6. **Arreglar los 3 botones 404** (C6). Opción rápida: generar `requisitos-dro.pdf`, `requisitos-rt.pdf` y `requisitos-dictaminador.pdf` a partir de `requisitos.js` corregido. Opción mínima: ocultar el botón.
7. **Ocultar los enlaces «Aviso de Privacidad» y «Código de Ética»** (`Footer.jsx:179-180`) hasta tener los textos.
8. **Unificar el horario de sábado** (`Header.jsx:239` y `ModalContacto.jsx:84`) en un solo valor.
9. **Cambiar el WhatsApp del Footer** a `529611190009` (`Footer.jsx:13`).
10. **Restaurar los 4 compromisos oficiales** palabra por palabra del tríptico (`MisionVision.jsx:46-63`) y pasar los datos verbales (SEP, 100 colegiados, 4 cursos / 30 h) a un párrafo aparte.
11. **Marcar o retirar las citas legales** propias de `tramitesInfo.js:76, 133, 190` y revisar los pasos 3 y 4 (`:18-24`) para que no contradigan la gestión centralizada.
12. **Ejecutar el Día 0** de `Auditoria_Y_Tareas_CICTGZ.md` (carrusel, datos, rutas nuevas, archivos temporales) para desbloquear al equipo.
13. **Puntos 1, 3, 4, 6 y 11**, que no dependen de insumos: header rojo, 54 tamaños de letra, justificado, siglas CICTGZ y patrón de fondo.
14. **Agregar «Asociación Civil sin filiación partidista»** a la nota de MORENA (`CursosCapacitacion.jsx:102`) y enlazar `asambleas.pdf`.
15. **Comprimir los 4 videos** (< 4 MB cada uno) y usar `logo-colegio.svg`.

### B. Cuando el Colegio entregue sus insumos (solo se reemplazan archivos)

| Insumo del Colegio | Qué se reemplaza |
|---|---|
| Formatos de inscripción **en blanco** (oficio, cédula, carta protesta) | `public/documentos/*.pdf` + volver a mostrar el bloque de formatos |
| Organigrama corregido (o autorización para rehacerlo con el nombre correcto) | `public/img/documentos/organigrama.jpeg` |
| Fotos de inspecciones y derrumbes | `public/img/galerias/dictaminador/*` |
| Galerías por servicio | `public/img/galerias/{dro,rt,peritos,calculo,bolsa}/*` |
| Fotos de cursos en universidades | `public/img/paginas/eventos/cursos/curso1-3.jpg` |
| Lista oficial de servicios del perito valuador | `src/data/peritosServicios.js` |
| Descripciones oficiales de DRO, RT y Dictaminador (funciones, cómo contratar, normativa) | `src/data/tramitesInfo.js` |
| Texto y PDF de Servicio Social gratuito | `src/data/servicioSocial.js`, `public/documentos/servicio-social-gratuito.pdf` |
| Texto, enlaces y PDF de Beneficio a la Sociedad | `src/data/beneficioSocial.js`, `public/documentos/beneficio-social.pdf` |
| Cursos reales (nombre, fecha, horario, sede, costo y temario) | `cursosData` en `CursosCapacitacion.jsx` |
| Asambleas reales (fecha, resumen y acuerdos) | `src/data/asambleas.js` |
| Aviso de Privacidad y Código de Ética | Páginas nuevas + reactivar los enlaces del Footer |
| Descripciones de las 4 comisiones | `Comisiones.jsx:54, 59, 64, 69` |
| Confirmaciones puntuales: horario de sábado, «y Título» en requisitos, existencia de la Bolsa de Trabajo, cuentas de redes sociales, derechos de los videos | Ajustes de una línea en cada archivo |
| Tríptico 2026 con los costos vigentes | `public/img/documentos/triptico-*.jpg` |
