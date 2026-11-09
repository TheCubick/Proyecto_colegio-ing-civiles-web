# CLAUDE.md: Portal CICTGZ

Instrucciones y bitácora para Claude. **Leer antes de trabajar y actualizar la bitácora (al final) después de cada cambio.**

## Proyecto
- Portal web del **Colegio de Ingenieros Civiles de Tuxtla Gutiérrez A.C. (CICTGZ)**. Proyecto escolar (Universidad Salazar); el cliente es el Consejo Directivo (contacto: Ing. Nein Montero Molina).
- Código en `visuales/` (React 19 + Vite 8 + React Router 7 + Swiper 14 + Framer Motion + lucide-react). Scripts: `npm run dev | build | lint` dentro de `visuales/`.
- Contenido editable en `src/data/*.js`, diseño en los componentes. Archivos estáticos en `public/` (rutas absolutas `/img/...`, `/documentos/...`).

## Reglas
- Responder **siempre en español**.
- **Paleta obligatoria**: `#BA2A33` rojo institucional · `#962E35` rojo oscuro · `#383637` gris oscuro (texto) · `#E5E5E5` gris claro · `#FFFFFF`. Nada de azul ni café.
- Público principal: adultos con vista cansada → texto de lectura ≥ 1rem (base 18px, párrafos `--fs-parrafo`), párrafos largos justificados (`text-align: justify; hyphens: auto`).
- No instalar dependencias nuevas sin preguntar. Respetar `prefers-reduced-motion`.
- **No inventar datos institucionales.** Lo que no venga de documentos oficiales o de las entrevistas se marca `[POR CONFIRMAR]`. Nunca publicar datos personales de agremiados.
- No hacer commits ni push sin que el usuario lo pida.

## Fuentes de verdad
- Oficiales: trípticos (`public/img/documentos/triptico-*.jpg`), oficio de costos CICTG/PRES/VI/01/2026 (`costos.jpg`), oficio bancario 02/2026 (`datos-bancarios.jpg`), organigrama, notas de prensa (`public/documentos/asambleas.pdf`).
- Verbales (entrevistas): DRO, RT, Dictaminadores, Peritos, Cálculo; 100 colegiados mínimo (SEP); 4 cursos / 30 h al año; trámites 100% presenciales; servicio social gratuito.

## Documentos de trabajo (`docs/`)
- `Estado_Y_Verificacion_Proyecto.md`: auditoría del 28-oct (qué es verídico y qué es relleno, archivos 404, hallazgos críticos C1-C7).
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

- Páginas **con** portada multimedia (hoy): `/` (Hero.jsx), `/tramites/dro`, `/tramites/rt`, `/conocenos/mision-y-vision`. Las demás son "sin portada". Si una página gana o pierde video, actualizar esta lista.
- Implementación sugerida: lista de rutas con portada en `Header.jsx` (ya usa `useLocation` y el estado `scrolled`, línea ~548) → clase `hd-sobre-media` / `hd-solido`. Estilos en `Header.css`.
- Los desplegables y el menú móvil pueden seguir blancos con texto `#383637`. El logo-texto debe incluir las siglas **CICTGZ**.
- Contraste: blanco sobre `#BA2A33` ≈ 5.9:1 (cumple AA).

## Estado de las notas del Consejo (actualizar al avanzar)
1ª presentación (implementada en el commit `3688d0b`, 19-oct):
- Justificar: ⚠️ falta en Inicio, Cursos, Asambleas, Comisiones y Footer.
- Header blanco semitransparente: hecho, pero **reemplazado** por la especificación de arriba.
- Más info en DRO/RT/Dictaminador: ✅ componente `TramiteDetalle` + `data/tramitesInfo.js` (texto de relleno, falta validar). Peritos y Cálculo no lo tienen.
- Fondos con patrón: ⚠️ `.fondo-cuadricula` y `.fondo-puntos` en `index.css`; faltan Inicio, Cursos, Asambleas y Comisiones.
- Letras grandes: ⚠️ base 18px; quedan 54 `font-size` menores a 14px (19 en Header.css).

2ª presentación (líneas 7-19): todo ❌ salvo lo parcial de arriba. Pendientes: header de color (spec arriba), fotos DRO→RT, carrusel automático en Trámites y Servicios, fotos de derrumbes en Dictaminador, siglas CICTGZ (Header, Hero, Footer, `<title>`), servicios del Perito, organigrama (logo izquierda + siglas), fotos de cursos, trazos y animación en fondos, página Beneficio a la Sociedad, página Servicio Social gratuito + PDF.

## Hallazgos críticos abiertos (ver `docs/Estado_Y_Verificacion_Proyecto.md`)
- C1 PDF de formatos (`public/documentos/oficio-inscripcion.pdf`, `cedula-inscripcion.pdf`, `carta-protesta-*.pdf`) **con datos personales reales** → reemplazar por formatos en blanco.
- C2 `bolsa.jpg` es un flyer del gobierno de la CDMX → retirar.
- C3 El organigrama dice "de Chiapas" y "Visepresidente".
- C4 `data/asambleas.js` y `cursosData` publican datos de ejemplo.
- C5 `data/requisitos.js:15` dice 3 años (el dato oficial es 2 años de expedición de cédula).
- C6 `requisitos-dro|rt|dictaminador.pdf` no existen (404).
- ~~C7 Cambio local sin commit en `Header.css`~~ → descartado el 2026-11-08 (`git restore`).

## Reparto de trabajo
- Las tareas restantes las tiene asignadas el **equipo** de Pablo (ver tarjetas en `docs/Auditoria_Y_Tareas_CICTGZ.md`; registro en `docs/Registros de tarea-equipo.docx`). No implementar tareas del plan por iniciativa propia: hacerlo solo cuando Pablo lo pida, y anotar quién lo pidió en la bitácora.

## Bitácora (lo más nuevo arriba; una línea por cambio)
- 2026-11-08 · Commit con CLAUDE.md y docs; `Notas_observaciones.txt` y los temporales `~$*` de Office pasan a `.gitignore`.
- 2026-11-08 · Descartado el cambio sin commit de `Header.css`: vuelve el cristal blanco del commit `3688d0b`, pendiente de rehacer según la spec.
- 2026-11-08 · Se crea este CLAUDE.md con la especificación del header. Sin cambios de código.
- 2026-10-28 · Auditoría → `docs/Estado_Y_Verificacion_Proyecto.md`.
- 2026-10-26 · Plan de tareas → `docs/Auditoria_Y_Tareas_CICTGZ.md`.
- 2026-10-20 · Oficio al Consejo → `docs/Solicitud_Informacion_Consejo.md`.
- 2026-10-19 · Commit `3688d0b`: header blanco semitransparente, `TramiteDetalle`, patrones de fondo, tipografía 18px y justificado.
