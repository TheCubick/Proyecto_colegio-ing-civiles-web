# QA de reglas que el verificador no ve · Fase 1 (F1-DB2)

**Fecha:** 13 nov 2026 · **Rama:** `rama/final` · **Método:** revisión del código (`src/data/*.js`, componentes) y de las imágenes de `public/img/`, página por página.
**Estado del verificador** (`npm run verificar -- --todo`): 0 errores, 0 advertencias.

> Las capturas se guardan en el Drive, `06_Evidencias_Equipo/QA_Reglas/`, con el nombre de la columna «Captura». Esta revisión **no arregla nada** (salvo lo que ya estaba asignado en el plan); Pablo decide quién corrige cada punto.

| # | Página | Regla | Qué encontré | Gravedad | Captura |
|---|---|---|---|---|---|
| 1 | /conocenos/mision-y-vision | Nombre | El organigrama (`public/img/documentos/organigrama.jpeg`) dice «de Chiapas» y «Visepresidente» (hallazgo C3). El rediseño de Jocelyn (F1-JA1) espera el visto bueno del Colegio; plan B: retirar la imagen el 17 nov. | alta | qa-01.png |
| 2 | /tramites/dro, /rt, /dictaminador-de-riesgos | Contenido sin fuente | `data/tramitesInfo.js` conserva funciones, normativa y pasos que no salen del tríptico ni de las entrevistas. Es la tarea F2-JB2 (depende del registro de fuentes de José María). | alta | qa-02.png |
| 3 | Pop-up «Afíliate» | Contenido sin fuente | `data/afiliacion.js` dice «Cédula profesional expedida por la S.E.P. **y Título**», pero `data/requisitos.js` (tríptico) no pide título. Pendiente de confirmar con el Colegio (oficio F1-JM1, punto 4). | media | qa-03.png |
| 4 | /tramites/dro y /tramites/rt | Privacidad | `paginas/tramites/dro.jpg` y `galerias/rt/rt-01.jpg` muestran a dos personas reconocibles en primer plano. Falta la autorización de uso de fotos con personas (oficio F1-JM1, punto 13). | media | qa-04.png |
| 5 | / (carrusel «Actividades») y muro de Cursos | Privacidad | `banners/grupal.jpg`, `reunion.jpg`, `partido-futbol-salazar.jpg` y varias imágenes de `posts/` muestran agremiados reconocibles. Misma autorización pendiente (punto 13). | media | qa-05.png |
| 6 | /servicios/bolsa-de-trabajo | Contenido sin fuente | El texto «Vacantes de universidades, empresas constructoras y agremiados» y la tarjeta «Las ofertas provienen de instituciones, empresas y miembros del Colegio» no tienen fuente; tampoco está confirmado que la Bolsa exista (oficio, punto 11). No es un convenio, pero menciona empresas. | media | qa-06.png |
| 7 | / (preguntas frecuentes) | Teléfonos | `data/inicio.js:86` da el WhatsApp de facturación 961-285-1837. El verificador lo acepta, pero conviene confirmar que sale del oficio CICTG/PRES/VI/02/2026. | baja | qa-07.png |
| 8 | /eventos/cursos-y-capacitacion | Trámites presenciales | Las tarjetas de curso tienen un botón «Inscribirse». Hoy no se ve porque la lista está vacía (F1-JM2); el botón solo abre la ventana de contacto (no inscribe en línea). Si el Colegio carga cursos, revisar que el texto no sugiera inscripción en línea. | baja | qa-08.png |
| 9 | /conocenos/mision-y-vision | Nombre / sin fuente | El aviso «Servicio social gratuito» (plan B) usa solo el dato de la entrevista; se reemplaza solo cuando José María llene `data/servicioSocial.js`. Sin problema, solo para registro. | baja | — |

## Revisado sin hallazgos
- **Pagos en línea:** no hay pasarela; los datos bancarios del pop-up salen del oficio 02/2026 y el aviso dice que el trámite es presencial.
- **Convenios:** `data/inicio.js` solo menciona gobierno y universidades.
- **Neutralidad:** la nota de MORENA ya dice «como Asociación Civil sin filiación partidista» (F1-JM2).
- **Formatos con datos personales:** retirados (F1-PR0); el pop-up dice que los formatos se entregan en oficinas.
- **Fondos blancos:** las secciones blancas listadas en F2-JB1 ya tienen `fondo-trazos`; las portadas claras llevan los planos de Jocelyn.
