# CLAUDE.md: Portal CICTGZ

Instrucciones y bitácora para Claude. **Leer antes de trabajar y actualizar la bitácora (al final) después de cada cambio.**

## Proyecto
- Portal web del **Colegio de Ingenieros Civiles de Tuxtla Gutiérrez A.C. (CICTGZ)**. Proyecto escolar (Universidad Salazar); el cliente es el Consejo Directivo (contacto: Ing. Nein Montero Molina).
- Código en `visuales/` (React 19 + Vite 8 + React Router 7 + Swiper 14 + Framer Motion + lucide-react). Scripts: `npm run dev | build | lint` dentro de `visuales/`.
- Contenido editable en `src/data/*.js`, diseño en los componentes. Archivos estáticos en `public/` (rutas absolutas `/img/...`, `/documentos/...`).
- **Estructura (desde el 2026-11-09):** `src/config/rutas.js` es la lista única de páginas (Header, menú móvil, Footer, migas y `RUTAS_CON_PORTADA` salen de ahí); `App.jsx` solo conecta ruta → componente. DRO/RT/Dictaminador = plantilla `components/templates/PaginaTramite` + `data/tramites.js`; Peritos/Cálculo = `components/templates/PaginaServicio` + `data/servicios.js`. Contacto, WhatsApp y horario solo en `data/contacto.js`; enlaces con `utils/enlaces.js`; pop-up Afíliate en `components/ui/ModalAfiliacion` + `data/afiliacion.js`. Hooks: `useBloquearScroll`, `useDialogo`. UI compartida: `Migas`, `ImagenSegura`. **No escribir datos dentro de los `.jsx`.** Mapa completo en README → «Estructura» y «Mapa de rutas».

## Reglas
- Responder **siempre en español**.
- **Paleta obligatoria**: `#BA2A33` rojo institucional · `#962E35` rojo oscuro · `#383637` gris oscuro (texto) · `#E5E5E5` gris claro · `#FFFFFF`. Nada de azul ni café.
- Público principal: adultos con vista cansada → texto de lectura ≥ 1rem (base 18px, párrafos `--fs-parrafo`), párrafos largos justificados (`text-align: justify; hyphens: auto`).
- No instalar dependencias nuevas sin preguntar. Respetar `prefers-reduced-motion`.
- **No inventar datos institucionales.** Nunca publicar datos personales de agremiados.
- **El equipo no redacta documentos del Colegio** (formatos, requisitos en PDF, servicio social, beneficio social, código de ética, servicios de peritos, cursos, asambleas, info de trámites). Solo se copian tal cual cuando el Colegio los manda; si no llegan (límite mar 17 nov), se aplica el plan B de `docs/Plan_Fases_Equipo.md` o se elimina la idea. No generar esos textos aunque lo pida un integrante.
- No hacer commits ni push sin que el usuario lo pida.
- **Reglas del Colegio** (lista completa en README → «Reglas del proyecto»): cero datos personales y contacto solo por canales oficiales; trámites, cursos y pagos presenciales (la web solo informa; sin pasarela); servicio social gratuito por escrito y en PDF; logo y paleta inalterables; letra ≥ 14px / 0.95rem; nombre exacto «Colegio de Ingenieros Civiles de Tuxtla Gutiérrez, A.C.» / CICTGZ (nunca «de Chiapas»); convenios solo con gobierno y universidades; neutralidad política («Asociación Civil sin filiación partidista»); nada inventado (leyes, cursos, asambleas, imágenes ajenas); Art. 23, cartas 2/5 años, no adeudo; reglas de facturación; rutas sin espacios, «ñ» ni acentos; nada directo en `main`; sin librerías nuevas.
- Antes de terminar un cambio: `npm run lint`, `npm run build` y `npm run verificar` (en `visuales/`). GitHub corre los tres en cada PR (`.github/workflows/verificar.yml`).

## Fuentes de verdad
- Oficiales: trípticos (`public/img/documentos/triptico-*.jpg`), oficio de costos CICTG/PRES/VI/01/2026 (`costos.jpg`), oficio bancario 02/2026 (`datos-bancarios.jpg`), organigrama, notas de prensa (`public/documentos/asambleas.pdf`).
- Verbales (entrevistas): DRO, RT, Dictaminadores, Peritos, Cálculo; 100 colegiados mínimo (SEP); 4 cursos / 30 h al año; trámites 100% presenciales; servicio social gratuito.

## Documentos de trabajo (`docs/`)
- `Estado_Y_Verificacion_Proyecto.md`: auditoría del 28-oct (qué es verídico y qué es relleno, archivos 404, hallazgos críticos C1-C7).
- `Instrucciones_Tareas.md`: instrucciones paso a paso de cada tarea por integrante (archivos, líneas, textos exactos).
- `Auditoria_Y_Tareas_CICTGZ.md`: plan de tareas por integrante, contrato de rutas en `public/`, código del carrusel `GaleriaCarrusel` (Anexo A).
- `Registros de tarea-equipo.docx`: registro de tareas del equipo (lo lleva Pablo).
- `Solicitud_Informacion_Consejo.md`: oficio al Consejo; ya no está en el repo (borrado por el usuario el 2026-11-08).
- `Notas_observaciones.txt` (raíz): peticiones del Consejo. **Solo local, está en `.gitignore`.** Líneas 1-5 = 1ª presentación; líneas 7-19 = 2ª presentación.

## Especificación del HEADER (pedida por el Consejo, 2ª presentación)
Problema: sobre los videos, el texto oscuro del menú se pierde en las zonas negras; en las páginas sin video, el header blanco con letras negras "se ve muy blanco" y no les gusta.

Comportamiento deseado (**letras del menú siempre blancas**; solo cambia el fondo):
| Situación | Fondo del header |
|---|---|
| Página con video/imagen de portada **y** arriba del todo | Transparente con velo oscuro degradado (ej. `rgba(56,54,55,.55)` → transparente) + sombra suave en el texto |
| Página **sin** video/imagen de portada | Rojo institucional `#BA2A33` sólido (o ~95% con desenfoque) |
| Cualquier página al hacer scroll | Rojo sólido (`#BA2A33`, o `#962E35` compacto) |

- Páginas **con** portada multimedia (hoy): `/` (Hero.jsx), `/tramites/dro`, `/tramites/rt`, `/conocenos/mision-y-vision`. Las demás son "sin portada". Se marcan con `portada: true` en `src/config/rutas.js` (de ahí sale `RUTAS_CON_PORTADA`); si una página gana o pierde video, cambiar ese campo.
- Implementación sugerida: importar `RUTAS_CON_PORTADA` en `Header.jsx` (ya usa `useLocation` y el estado `scrolled`, línea 29) → clase `hd-sobre-media` / `hd-solido` en la línea 88. Estilos en `Header.css`.
- Los desplegables y el menú móvil pueden seguir blancos con texto `#383637`. El logo-texto debe incluir las siglas **CICTGZ**.
- Contraste: blanco sobre `#BA2A33` ≈ 5.9:1 (cumple AA).

## Estado de las notas del Consejo (actualizar al avanzar)
1ª presentación (implementada en el commit `3688d0b`, 19-oct):
- Justificar: ⚠️ falta en Inicio, Cursos, Asambleas, Comisiones y Footer.
- Header blanco semitransparente: hecho, pero **reemplazado** por la especificación de arriba.
- Más info en DRO/RT/Dictaminador: ✅ componente `TramiteDetalle` + `data/tramitesInfo.js` (texto de relleno, falta validar). Peritos y Cálculo no lo tienen.
- Fondos con patrón: ⚠️ `.fondo-cuadricula` y `.fondo-puntos` en `index.css`; faltan Inicio, Cursos, Asambleas y Comisiones.
- Letras grandes: ⚠️ base 18px; quedan 74 `font-size` menores a 14px (26 en Header.css + ModalAfiliacion.css, 48 en el resto).

2ª presentación (líneas 7-19): todo ❌ salvo lo parcial de arriba. Pendientes: header de color (spec arriba), fotos DRO→RT, carrusel automático en Trámites y Servicios, fotos de derrumbes en Dictaminador, siglas CICTGZ (Header, Hero, Footer, `<title>`), servicios del Perito, organigrama (logo izquierda + siglas), fotos de cursos, trazos y animación en fondos, página Beneficio a la Sociedad, página Servicio Social gratuito + PDF.

## Hallazgos críticos abiertos (ver `docs/Estado_Y_Verificacion_Proyecto.md`)
- C1 PDF de formatos (`public/documentos/oficio-inscripcion.pdf`, `cedula-inscripcion.pdf`, `carta-protesta-*.pdf`) **con datos personales reales** → reemplazar por formatos en blanco.
- C2 `bolsa.jpg` es un flyer del gobierno de la CDMX → retirar.
- C3 El organigrama dice "de Chiapas" y "Visepresidente".
- C4 `data/asambleas.js` y `data/cursos.js` (lista `cursos`) publican datos de ejemplo.
- C5 `data/requisitos.js:15` dice 3 años (el dato oficial es 2 años de expedición de cédula).
- C6 `requisitos-dro|rt|dictaminador.pdf` no existen (404).
- ~~C7 Cambio local sin commit en `Header.css`~~ → descartado el 2026-11-08 (`git restore`).

## Reparto de trabajo
- Plan vigente: **`docs/Plan_Fases_Equipo.md`** (Fase 1: 9-14 nov; Fase 2: 16-21 nov). Ramas `fase1/<nombre>` y `fase2/<nombre>`; cada tarea tiene un ID (`F1-MF3`, etc.) y archivos asignados.
- Equipo: Pablo (líder, revisa y une PR, publica, limpieza urgente F1-PR0, panel admin en `feat/panel-admin`), María Fernanda (desarrollo, usa Claude CLI), Josué e Ignacio (ajustes de CSS/datos con instrucciones exactas, videos, QA de enlaces), Daniel (esquema SQL de Supabase, QA y manual; sin código del sitio), Jocelyn (solo archivos de diseño), José María (**enlace con el Colegio**, registro de fuentes y copia literal de lo que manda el Colegio).
- Si trabajo en la rama de un integrante: tocar **solo los archivos de su tarea** según el plan y **no editar este CLAUDE.md** (Pablo actualiza la bitácora al unir). No implementar tareas de otros por iniciativa propia.
- Recursos: originales en el Drive del proyecto. Pablo quiere enlazar desde el Drive; los PDF sí pueden ir enlazados, pero imágenes y videos de fondo desde Drive no son confiables → por ahora van al repo optimizados (imagen < 350 KB y 1600 px, video < 4 MB) hasta probarlo.
- Panel administrativo (idea de Pablo): recomendado Supabase (auth + Postgres + storage + RLS); nunca la `service_role` en el frontend ni en git.

## Bitácora (lo más nuevo arriba; una línea por cambio)
- 2026-11-12 · Unidas a `main` (`6e29a8b`): `fase1/daniel` (F1-DB1 esquema.sql), `fase1/jose-maria` (F1-JM2: cursos y asambleas vacíos, requisitos 2/5 años y Art. 23, nota MORENA), `fase1/ignacio` (F1-IM1 justificado, F1-IM2 videos comprimidos), `fase1/josue` (tipografía, paleta, leyes citadas retiradas). Conflictos de fin de archivo resueltos conservando ambos cambios. Lint y build OK; verificador 30 errores / 6 advertencias. Pendientes: `fase1/mf2-galeria-carrusel` (necesita F1-MF1 `GaleriaCarrusel` + `data/galerias.js`, no existen) y `fase1/jocelin` (organigrama aún dice «de Chiapas» y «Visepresidente»; rama basada en un commit viejo con archivos ajenos).
- 2026-11-12 · `docs/Guia_Git_Equipo.md`: guía paso a paso de Git para el equipo (instalar, configurar, clonar el repo nuevo `TheCubick/Proyecto_colegio-ing-civiles-web`, ramas `fase1/<nombre>`, verificaciones y Pull Request).
- 2026-11-09 · Reestructura modular (sin cambios visuales): `config/rutas.js`, `data/{contacto,afiliacion,inicio,tramites,servicios,cursos,bolsaTrabajo,misionVision,comisiones}.js`, plantillas `PaginaTramite`/`PaginaServicio` (se borran Dro, Rt, Dictaminador, PeritosValuadores, CalculoEstructural), `ModalAfiliacion` sale del Header (JSX y CSS), `MenuMovil`/`MenuEnlace`, `Migas`, `ImagenSegura`, `ScrollArriba`, hooks y `utils/enlaces.js`. Al unificar datos: horario 9:00–13:00 y WhatsApp 961-119-0009 en todo el sitio (pendiente confirmar, F1-JM2) y la ventana de contacto muestra los 4 teléfonos. Verificador: 87 errores / 19 advertencias. README (sin emojis, estructura y mapa de rutas), plan e instrucciones actualizados a las rutas y líneas nuevas.
- 2026-11-09 · `docs/Instrucciones_Tareas.md` con el paso a paso de cada tarea. Horario de sábado (13:00 vs 14:00) y WhatsApp oficial quedan a confirmar por José María; `GaleriaCarrusel` gana la prop `respaldo`; Ignacio justifica agregando bloques al final de cada CSS para no chocar con Josué.
- 2026-11-08 · Regla: el equipo no hace documentos del Colegio; tabla de planes B en el plan (Aviso de Privacidad descartado: el sitio no guarda datos; Beneficio Social y peritos se eliminan si no llegan). Tareas reasignadas: CSS a Josué/Ignacio, SQL/QA/manual a Daniel, Jocelyn solo diseño; nueva F1-PR0 (Pablo) retira PDF con datos, botones 404 y `bolsa.jpg`. README y plantilla de PR actualizados.
- 2026-11-08 · Reglas del Colegio en README y CLAUDE.md; `scripts/verificar-reglas.mjs` + `npm run verificar` + GitHub Action + plantilla de PR. Estado: 95 errores y 21 advertencias, todos asignados en el plan. Fernanda pasa a desarrollo; Daniel solo con tareas aisladas y respaldos por tarea.
- 2026-11-08 · Plan de 2 fases por integrante → `docs/Plan_Fases_Equipo.md`; README con la guía del equipo (ramas por persona, Classroom, Drive, compresión).
- 2026-11-08 · Commit con CLAUDE.md y docs; `Notas_observaciones.txt` y los temporales `~$*` de Office pasan a `.gitignore`.
- 2026-11-08 · Descartado el cambio sin commit de `Header.css`: vuelve el cristal blanco del commit `3688d0b`, pendiente de rehacer según la spec.
- 2026-11-08 · Se crea este CLAUDE.md con la especificación del header. Sin cambios de código.
- 2026-10-28 · Auditoría → `docs/Estado_Y_Verificacion_Proyecto.md`.
- 2026-10-26 · Plan de tareas → `docs/Auditoria_Y_Tareas_CICTGZ.md`.
- 2026-10-20 · Oficio al Consejo → `docs/Solicitud_Informacion_Consejo.md`.
- 2026-10-19 · Commit `3688d0b`: header blanco semitransparente, `TramiteDetalle`, patrones de fondo, tipografía 18px y justificado.
