<div align="center">

<img src="../visuales/public/img/logos/logo-colegio.png" alt="Logo del Colegio de Ingenieros Civiles de Tuxtla Gutiérrez" width="150" />

# Portal Web Institucional del Colegio de Ingenieros Civiles de Tuxtla Gutiérrez A.C.

## Manual Técnico y de Usuario

<br>

**Asignatura:** Desarrollo de Páginas Web

**Institución:** [Nombre de la Universidad] — [Nombre de la Licenciatura]

**Docente:** [Nombre del docente]

**Organización beneficiaria:** Colegio de Ingenieros Civiles de Tuxtla Gutiérrez A.C.

<br>

**Autores**

Pablo Ramírez · Daniel Barrera · Jocelyn Aguilar · Maria Fernanda Uribe
Ignacio Moela · Jose Maria Orantes · Josue Balbuena

<br>

Tuxtla Gutiérrez, Chiapas · Octubre de 2026

</div>

<div style="page-break-after: always;"></div>

## Contenido

1. Introducción y justificación
2. Alcance del proyecto
3. Arquitectura tecnológica
4. Reglas de negocio implementadas
5. Guía de uso del portal
6. Conclusiones y trabajo futuro

<div style="page-break-after: always;"></div>

## 1. Introducción y justificación

El Colegio de Ingenieros Civiles de Tuxtla Gutiérrez A.C. agrupa a profesionales que participan en la planeación, construcción y supervisión de la infraestructura de la ciudad y del estado. Entre sus funciones están el registro y el respaldo gremial de los Directores Responsables de Obra, los Representantes Técnicos y los Dictaminadores de Riesgos, así como la capacitación continua de sus agremiados.

Hasta ahora, la información sobre requisitos, costos y procedimientos se obtenía principalmente por vía telefónica o acudiendo a las oficinas del Colegio. En la entrevista realizada con el Ing. Nein, representante del Colegio, se identificaron tres necesidades principales:

1. **Facilitar el acceso a los requisitos.** Agremiados, aspirantes y ciudadanos necesitan conocer con anticipación qué documentos deben reunir antes de acudir a realizar un trámite.
2. **Modernizar la imagen institucional.** El Colegio requiere una presencia digital acorde con su papel técnico y profesional en la región.
3. **Mantener la atención cercana sin digitalizar por completo los trámites.** Por razones de seguridad y control documental, los trámites deben seguir realizándose de manera presencial; el canal de contacto preferido es WhatsApp.

Con base en estas necesidades, el proyecto propone un portal web informativo e interactivo. El portal **orienta** al usuario y le permite **descargar los formatos oficiales**, pero no sustituye la atención en oficina. Así se reducen las consultas repetitivas y se conserva el control que el Colegio necesita sobre sus procesos.

Una consideración adicional de diseño fue el perfil de los usuarios: una parte importante son ingenieros adultos. Por ello se dio prioridad a la **legibilidad**, con tipografía de mayor tamaño, interlineado amplio, texto justificado y alto contraste.

<div style="page-break-after: always;"></div>

## 2. Alcance del proyecto

El portal se organiza en cuatro módulos, que corresponden al menú principal del sitio.

### 2.1 Módulo Informativo (Conócenos)

| Sección | Contenido |
| :--- | :--- |
| **Misión y Visión** | Misión, visión, valores institucionales, compromisos ante la profesión y código de ética, y política de privacidad gremial. |
| **Organigrama** | Estructura del Consejo Directivo, consultable en tamaño completo. |
| **Comisiones** | Especialidades del Colegio (DRO, RT, Dictaminadores, Peritos Valuadores, Memoria de Cálculo) y comisiones internas (Honor y Justicia, Ambiental, Deportes, Acción Social). Cada especialidad enlaza a su trámite o servicio. |

### 2.2 Módulo de Trámites y Servicios

**Trámites:** Director Responsable de Obra (DRO), Representante Técnico (RT) y Dictaminador de Riesgos. Cada página presenta:

- Descripción de la figura profesional.
- Funciones específicas que realiza.
- Importancia normativa y riesgos de no contar con ella.
- Procedimiento para contratar a un agremiado a través del Colegio.
- Requisitos generales de registro y vigencia de las cartas.
- Descarga de la lista de documentos e inicio del trámite mediante el formulario de contacto.

**Servicios:** Peritos Valuadores, Cálculo Estructural y Bolsa de Trabajo (con un listado de vacantes).

**Afiliación:** desde el botón "Afíliate" del menú se abre una ventana con tres pestañas: *Requisitos y Formatos* (cédula y oficio de inscripción descargables), *Costos y Cuotas* y *Datos Bancarios y Facturación*.

### 2.3 Módulo de Eventos

| Sección | Contenido |
| :--- | :--- |
| **Cursos y Capacitación** | Oferta de diplomados, cursos y talleres; noticias de la vida institucional; requisitos y métodos de pago para inscribirse. |
| **Asambleas** | Registro de asambleas y sus acuerdos. |

El componente multimedia se integra en todo el sitio: la página de inicio y los encabezados de DRO, RT y Misión y Visión usan **videos aéreos institucionales** de fondo, y la página de inicio incluye un **carrusel** con fotografías de eventos del Colegio.

### 2.4 Módulo de Interacción

| Elemento | Función |
| :--- | :--- |
| **Atención por WhatsApp** | Botón flotante con preguntas frecuentes. Cada pregunta abre una conversación de WhatsApp con un mensaje prellenado. Incluye un buzón para escribir comentarios libres. |
| **Ventana de contacto** | Pop-up con teléfonos, correo electrónico y horario de atención. Se abre desde los botones "Iniciar Trámite" y "Solicitar directorio oficial". |
| **Pie de página** | Datos de contacto y delegaciones del Colegio. |

<div style="page-break-after: always;"></div>

## 3. Arquitectura tecnológica

### 3.1 Tecnologías seleccionadas

| Tecnología | Función en el proyecto |
| :--- | :--- |
| **React 19** | Biblioteca para construir la interfaz a partir de componentes reutilizables. |
| **Vite 8** | Herramienta de desarrollo y compilación. |
| **React Router 7** | Navegación entre secciones sin recargar la página. |
| **Framer Motion** | Animaciones de la interfaz. |
| **Swiper** | Carrusel de imágenes. |
| **Lucide React** | Biblioteca de íconos. |
| **CSS** | Estilos propios por componente, sin frameworks externos. |

### 3.2 Justificación

**Aplicación de una sola página (SPA).** Con React Router, el sitio se descarga una vez y la navegación entre secciones ocurre al instante, sin recargar la página completa. Para el usuario, esto se traduce en una experiencia más fluida, similar a la de una aplicación.

**Componentes modulares.** Cada elemento de la interfaz (encabezado, pie de página, tarjetas, ventanas emergentes) es un componente independiente con su propio archivo de estilos. Esto permite:

- **Reutilizar** piezas en distintas páginas. Por ejemplo, el bloque de funciones, normativa y contratación se comparte entre los tres trámites.
- **Mantener** el sitio con facilidad: un cambio en un componente se refleja en todas las páginas que lo usan.
- **Trabajar en equipo** sin conflictos, ya que cada integrante puede desarrollar su sección por separado.

**Separación entre contenido y diseño.** Los textos que cambian con frecuencia (requisitos, información de trámites, vacantes, asambleas) se almacenan en archivos de datos independientes. Actualizar un requisito no implica modificar el diseño de la página.

**Rendimiento con Vite.** Vite ofrece un entorno de desarrollo que refleja los cambios al instante y genera, para producción, archivos optimizados y comprimidos. El resultado es un sitio estático que puede publicarse en cualquier servicio de alojamiento web sin necesidad de un servidor de aplicaciones.

### 3.3 Organización del código

```text
visuales/
├── public/        Archivos estáticos: documentos PDF, videos e imágenes
└── src/
    ├── components/   Componentes reutilizables (encabezado, pie, secciones, ventanas)
    ├── data/         Contenido editable (requisitos, trámites, vacantes, asambleas)
    ├── pages/        Páginas completas, organizadas como el menú del sitio
    └── styles/       Estilos globales y paleta institucional
```

### 3.4 Identidad visual y accesibilidad

| Elemento | Decisión |
| :--- | :--- |
| **Paleta** | Rojo institucional `#BA2A33`, rojo oscuro `#962E35`, gris oscuro `#383637`, gris claro `#E5E5E5` y blanco. |
| **Tipografía** | Montserrat para títulos y Open Sans para textos; tamaño base de 18 px e interlineado de 1.7. |
| **Texto** | Párrafos justificados con división silábica automática, para dar un aspecto de documento técnico formal. |
| **Menú** | Fondo blanco translúcido con desenfoque (*glassmorphism*), que mantiene legible el menú sobre videos e imágenes. |
| **Fondos** | Patrones sutiles de cuadrícula arquitectónica y puntos, en lugar de grandes superficies blancas vacías. |
| **Accesibilidad** | Navegación por teclado con indicador de foco visible, etiquetas para lectores de pantalla y reducción de animaciones para quien lo tenga configurado en su sistema. |
| **Diseño adaptable** | El sitio se ajusta a computadoras, tabletas y teléfonos móviles. |

<div style="page-break-after: always;"></div>

## 4. Reglas de negocio implementadas

### 4.1 Seguridad: protección de los datos de los agremiados

**Regla:** el portal **no publica datos personales ni de contacto** de los agremiados (Directores Responsables de Obra, Representantes Técnicos, Peritos, Dictaminadores o Estructuristas).

**Motivo:** la exposición pública de nombres, teléfonos o domicilios de profesionales que firman obras puede facilitar intentos de **extorsión** o el uso indebido de su información.

**Implementación:**

- Toda solicitud de especialistas se canaliza de forma centralizada a través de las oficinas del Colegio.
- Las páginas de trámites indican que el directorio oficial de peritos vigentes se entrega únicamente por los canales del Colegio.
- La política se comunica explícitamente en la sección *Política de Privacidad y Seguridad Gremial*.

### 4.2 Operación: trámites estrictamente presenciales

**Regla:** todos los trámites (registro como DRO, RT o Dictaminador y afiliación) se realizan **en las oficinas del Colegio**.

**Motivo:** el Colegio necesita verificar documentos originales y mantener el control sobre los expedientes de sus agremiados.

**Implementación:**

- El portal funciona como **repositorio de consulta y descarga** de formatos oficiales: Cédula de Inscripción, Oficio de Inscripción y Carta Protesta de Decir Verdad.
- Los botones "Iniciar Trámite" no envían documentos: abren los datos de contacto para que el usuario agende su atención.
- La ventana de afiliación incluye un aviso visible de que el trámite es presencial.

### 4.3 Atención: WhatsApp como canal principal

**Regla:** las consultas se atienden por WhatsApp, el canal que el Colegio ya utiliza.

**Implementación:** las preguntas frecuentes abren una conversación con un mensaje prellenado según el tema. El sitio no almacena las conversaciones ni los datos de los usuarios.

<div style="page-break-after: always;"></div>

## 5. Guía de uso del portal

| Si el usuario quiere… | Debe ir a… |
| :--- | :--- |
| Afiliarse al Colegio | Botón **Afíliate** del menú → pestaña *Requisitos y Formatos* |
| Consultar costos y cuotas | **Afíliate** → pestaña *Costos y Cuotas* |
| Registrarse como DRO, RT o Dictaminador | Menú **Trámites** → página correspondiente → *Requisitos generales* |
| Contratar a un especialista para su obra | Menú **Trámites** → *¿Cómo contratar a uno de nuestros agremiados?* → **Solicitar directorio oficial** |
| Solicitar un avalúo o una memoria de cálculo | Menú **Servicios** |
| Inscribirse a un curso | Menú **Eventos** → *Cursos y Capacitación* |
| Hacer una pregunta rápida | Botón flotante de **WhatsApp** |

<div style="page-break-after: always;"></div>

## 6. Conclusiones y trabajo futuro

### 6.1 Conclusiones

El portal cumple con los objetivos planteados por el Colegio:

- **Centraliza** en un solo sitio la información de trámites, servicios, eventos y afiliación, que antes se obtenía por teléfono o en oficina.
- **Moderniza** la imagen institucional con una identidad visual coherente y recursos multimedia propios.
- **Respeta** las reglas operativas del Colegio: los trámites siguen siendo presenciales y los datos de los agremiados permanecen protegidos.
- **Prioriza la legibilidad** para un público adulto, sin sacrificar una apariencia actual.

La arquitectura por componentes y la separación entre contenido y diseño permiten que el sitio crezca sin necesidad de rehacerlo.

### 6.2 Trabajo futuro

| Propuesta | Descripción |
| :--- | :--- |
| **Intranet para colegiados** | Acceso con usuario y contraseña para que cada agremiado consulte el estado de su registro, sus cuotas y sus constancias. |
| **Panel de administración** | Herramienta para que el personal del Colegio actualice noticias, cursos, vacantes y requisitos sin intervención técnica. |
| **Verificación pública de registro** | Consulta, por número de registro, de si un DRO o perito está vigente, sin exponer sus datos de contacto. |
| **Agenda de citas en línea** | Reservación de horario para trámites presenciales, para reducir los tiempos de espera en oficina. |
| **Optimización de rendimiento** | Carga diferida de páginas y compresión de videos para mejorar la velocidad en conexiones móviles. |

La implementación de la intranet y de la verificación de registro requerirá un servidor y una base de datos, además de políticas de seguridad y de protección de datos personales acordes con la legislación vigente.
