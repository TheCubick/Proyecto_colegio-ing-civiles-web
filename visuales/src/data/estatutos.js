/*
  EXTRACTOS DE LOS ESTATUTOS DEL COLEGIO (texto oficial entregado por el Colegio).

  Fuente: fotografías de los Estatutos protocolizados (Notaría No. 112, Tuxtla Gutiérrez),
  recibidas el 13-nov-2026 («documentos del coleguio .pdf», 15 fotos). Guardar el original
  en el Drive: 01_Material_Colegio/Documentos/ y anotarlo en el registro de fuentes.

  REGLA: copiado LETRA POR LETRA (incluidas las palabras sin acento del original, como
  «cedula», «evalué» o «deposito»). Solo se quitaron los guiones de relleno «——» del notario
  y los títulos pasaron de MAYÚSCULAS a tipo oración. No redactar ni «mejorar» nada.

  Textos incompletos en las fotos (pedir la página siguiente al Colegio):
  - Art. 55: el último párrafo («Para el caso de que una empresa haga el pago… transferible para el»)
    queda cortado; no se publica.
  - Art. 56: el inciso G) («De ser aprobada su valoración… a nombre del») queda cortado; no se publica.

  Cada artículo: { id, articulo, titulo, parrafos: [...], lista: [...] }.
  Los usan: data/servicioSocial.js, data/beneficioSocial.js, data/tramites.js (DRO y RT)
  y la página /conocenos/estatutos.
*/

const art7 = {
  id: "art-7",
  articulo: "Artículo 7°",
  titulo: "Ejercicio profesional",
  parrafos: [
    "Se entiende por ejercicio profesional para los efectos de este estatuto, la realización habitual de cualquier acto o la prestación de cualquier servicio propio de una profesión a título oneroso o gratuito, aunque sólo se trate de simple consulta o la ostentación del carácter profesional por medio de tarjetas, anuncios, placas, insignias o de cualquier otro modo. No se refutará ejercicio profesional, cualquier acto realizado en los casos graves o de emergencia con propósito de auxilio inmediato.",
  ],
  lista: [],
};

const art9 = {
  id: "art-9",
  articulo: "Artículo 9°",
  titulo: "Objetivos del Colegio ante la sociedad",
  parrafos: [],
  lista: [
    "9.1 Crear conciencia de servicio a la sociedad como meta primaria de la profesión de Ingeniería Civil.",
    "9.2 Fomentar la colaboración de los miembros en actividades profesionales que coadyuven en la solución de problemas de la comunidad y el país.",
    "9.3 Prestar la más amplia colaboración al poder público como cuerpo consultor en problemas de ingeniería civil.",
    "9.4 Promover que el ejercicio profesional de la ingeniería civil se realice dentro del más alto nivel moral y legal, con objeto de dar cumplimiento al código de ética profesional del colegio, para asegurar la integridad de la profesión y la confianza de la sociedad en los servicios prestados.",
    "9.5 Organizar el servicio social profesional del Ingeniero Civil y colaborar en el servicio social estudiantil, enfocado ambos a actividades para mejorar las condiciones de vida de los estratos sociales de menores recursos; así como para prevención y atención en caso de desastres y programas de protección civil.",
    "9.6 Vigilar y fomentar entre sus miembros que el ejercicio de la profesión se realice en armonía con el medio ambiente, buscando el desarrollo sustentable.",
    "9.7 Servir de árbitro en los conflictos entre profesionales y sus clientes, cuando así lo acuerden las partes y someterse los mismos a dicho arbitraje.",
    "9.8 Fomentar la cultura y los valores nacionales.",
  ],
};

const art17 = {
  id: "art-17",
  articulo: "Artículo 17°",
  titulo: "Clasificación de los miembros",
  parrafos: [
    "El colegio estará integrado por miembros numerarios, pasantes, estudiantes, además de miembros fundadores, eméritos, de honor y decano.",
  ],
  lista: [
    "17.1 Miembros numerarios:",
    "17.2 Todos aquellos que habiendo presentado solicitudes de inscripción al colegio y hayan sido aprobadas (por el consejo directivo y la comisión de admisión) y que no estén inscritos en otro colegio de ingenieros civiles.",
    "17.3 (Aplicación del art. no. 78 del reglamento de la ley reglamentaria de artículo 5° constitucional.) fuesen aceptados, y además posean título y cédula profesional de Ingeniero Civil o Ingeniero Arquitecto. Debidamente registrado en la dirección general de profesiones de la secretaria de educación pública.",
    "17.4 Miembros pasantes:",
    "Todos aquellos que no cuenten con cédula profesional, pero que posean carta de pasante o título profesional de la carrera de Ingeniería Civil o Ingeniero Arquitecto, expedida legalmente por una institución académica, debidamente registrada ante las autoridades del ramo y previa solicitud, hayan sido admitidos.",
  ],
};

const art33 = {
  id: "art-33",
  articulo: "Artículo 33°",
  titulo: "De las asambleas ordinarias y extraordinarias",
  parrafos: [
    "33.1 Las Asambleas Generales de Asociados, Ordinarias y Extraordinarias, serán convocadas por el Consejo Directivo, a través de su Presidente o del Secretario, sin embargo, el 20 % de los colegiados activos podrá pedir por escrito, en cualquier momento, que el Consejo Directivo convoque a una Asamblea General de Asociados Extraordinaria para discutir los asuntos que especifiquen en su solicitud.",
  ],
  lista: [],
};

const art35 = {
  id: "art-35",
  articulo: "Artículo 35°",
  titulo: "Junta de Honor y Justicia",
  parrafos: [
    "La junta de honor y justicia estará conformada cuando menos por cinco miembros numerarios quienes deberán contar como mínimo con cinco años de antigüedad ininterrumpida, y además poseer una amplia y reconocida trayectoria profesional, sin antecedentes (gremiales, penales y comerciales) y gozar de solvencia moral, estará conformada cuando menos por un presidente, un secretario, tres vocales; el presidente será quien cuente con mayor número de votos en la elección para tal efecto.",
  ],
  lista: [],
};

const art37 = {
  id: "art-37",
  articulo: "Artículo 37°",
  titulo: "Integración del Consejo Directivo",
  parrafos: [
    "El Consejo Directivo estará formado por los siguientes miembros: un Presidente, un Vicepresidente, Secretario, Subsecretario, Tesorero, Subtesorero y mínimo dos Vocales.",
    "El Consejo Directivo quedará integrado por las personas que integren la planilla electa, en asamblea general ordinaria, en los términos que señala el artículo 44 de la ley reglamentaria del artículo 5° constitucional, relativo al ejercicio de las profesiones y al artículo 65 de su reglamento.",
    "Los puestos y cargos que ocupen dentro del consejo directivo y las comisiones que se otorguen a los miembros del colegio, son de carácter honorifico.",
  ],
  lista: [],
};

const art48 = {
  id: "art-48",
  articulo: "Artículo 48°",
  titulo: "Consejo Consultivo",
  parrafos: [
    "48.1 Existirá un Consejo Consultivo que estará integrado por los Ex Presidentes del colegio; quienes habrán de ser convocados por el Consejo Directivo para que ellos mismos nombren a su presidente y secretario, quienes habrán de durar el mismo periodo que dure el Consejo Directivo en funciones.",
    "48.2 El Consejo Consultivo tendrá las funciones siguientes:",
  ],
  lista: [
    "1. Servir de órgano de consulta del Consejo Directivo.",
    "2. Preparar estudios y asesorar al Consejo Directivo en los asuntos que le solicite.",
    "3. Presentar al Consejo Directivo o a la Junta de Honor las recomendaciones que estime convenientes.",
    "48.3 No podrá formar parte del Consejo Consultivo aquel Presidente del Consejo Directivo en funciones que por intereses propios renuncie a su cargo, sin terminar su gestión.",
  ],
};

const art54 = {
  id: "art-54",
  articulo: "Artículo 54°",
  titulo: "Centro de Actualización Profesional e Innovación Tecnológica y Científica",
  parrafos: [
    "Tendrá como objeto promover la actualización y el desarrollo profesional de los Ingenieros Civiles, elaborar y en su caso, coordinar el proceso de producción, medios digitales, libros, revistas, folletos, materiales audiovisuales y todo tipo de material didáctico para publicarlos, difundirlos y/o venderlos; promover o realizar investigaciones o estudios que tiendan a mejorar los procesos de actualización y desarrollo profesional.",
    "Tendrán a su cargo la planeación y programación de la capacitación y educación continua que ofrezca el colegio a sus agremiados, a través de cursos, diplomados, especialidades u otros esquemas que con el apoyo y coordinación de diversas instancias que permitan elevar el nivel profesional del Ingeniero Civil en el estado de Chiapas.",
    "Las facultades, funciones, organizaciones y procedimientos de operación, se establecerán en su propio reglamento que será aprobado por el Consejo Directivo.",
  ],
  lista: [],
};

const art55 = {
  id: "art-55",
  articulo: "Artículo 55°",
  titulo: "Requisitos para obtener figura RTEC",
  parrafos: [
    "En uso de las facultades que el artículo 41.2.1, 51.1 y 51.3 de los estatutos del CICTG le confiere y con fundamento en el artículo 25 de la ley de obra pública del estado de Chiapas le corresponderá al colegio, a través de una comisión especialmente integrada por Asociados Colegiados, el registro, certificación, vigilancia y seguimiento de los asociados colegiados que obtenga la calidad de representantes técnicos, ya que cuentan con los conocimientos suficientes para asumir la responsiva técnica de las obras y servicios que una empresa constructora adquiere ante la contratante.",
    "La comisión de representantes técnicos de empresas constructoras a la que alude los artículos anteriores estará integrada por un número de cinco miembros numerarios: un Presidente, un Secretario y tres Vocales, los cuales deberán ser miembros numerarios actualizados con una antigüedad no menor a 3 años en el colegio y gocen de ética profesional de RTEC, designados por el Consejo Directivo o por convocatoria abierta.",
    "Para la solicitud de carta de representante técnico, el agremiado deberá realizarlo en las oficinas centrales del colegio, en el caso de los agremiados que pertenezcan a una de nuestras delegaciones su trámite lo gestionará en su delegación correspondiente, la cual coordinará con las oficinas centrales de nuestro colegio y atenderá a la brevedad su solicitud, teniendo en cuenta lo siguiente:",
  ],
  lista: [
    "Para representante técnico de empresa propia.",
    "I. Ser socio numerario actualizado del colegio.",
    "II. Cumplir con el artículo 27.12 del estatuto vigente, que dice: “cubrir oportunamente las cuotas que se asignan”.",
    "III. Tres años de antigüedad de cédula profesional y dos años de colegiado.",
    "IV. Haber llevado en el año inmediato anterior treinta horas de cursos de actualización impartidos en el colegio y cumplir con los requisitos ya establecidos (CHECKLIST).",
    "Para representante técnico de empresa ajena.",
    "V. Ser socio numerario actualizado del colegio.",
    "VI. Cumplir con el artículo 27.12 del estatuto vigente, que dice: “cubrir oportunamente las cuotas que se asignan”.",
    "VII. Cinco años de antigüedad de cédula profesional y tres años de colegiado.",
    "VIII.- Haber llevado en el año inmediato anterior treinta horas de cursos de actualización impartidos en el colegio y cumplir con los requisitos ya establecidos (CHECKLIST).",
    "Para el caso de los agremiados interesados en solicitar la carta ajena deberán verificar su estado de cuenta antes de realizar el pago de dicha carta, esto para no entorpecer el trabajo de la comisión de representantes técnicos y así darle fluidez a su trámite.",
    "La empresa interesada deberá realizar el pago de la cuota de representante técnico, mediante depósito a la cuenta de cheques a nombre del COLEGIO DE INGENIEROS CIVILES DE TUXTLA GUTIÉRREZ A.C., posteriormente se deberá canjear la ficha de depósito por el recibo oficial.",
    "Para el caso de expedición de las cartas adicionales, primero se deberán expedir las cartas que van dirigidas a la secretaria de la honestidad y función pública.",
  ],
};

const art56 = {
  id: "art-56",
  articulo: "Artículo 56°",
  titulo: "Requisitos para obtener figura D.R.O. y C.",
  parrafos: [],
  lista: [
    "A). Presentar oficio de solicitud dirigido al Consejo Directivo con atención a la comisión de DROYC, en donde se manifieste la intención del colegiado de obtener la figura de DROYC, así como conocer las leyes y reglamentos aplicables en la materia.",
    "B). Para ser Director Responsable de Obra y Corresponsable, debe ser socio numerario actualizado y tener una antigüedad mínima de tres años (3 años) como miembro del COLEGIO DE INGENIEROS CIVILES DE TUXTLA GUTIÉRREZ, A.C.",
    "Ser profesionista titulado en ingeniería civil, con cedula profesional y registro ante la dirección general de profesiones, con una antigüedad mínima de cinco años.",
    "C). Comprobar que en los tres años previos a ser propuesto para ser candidato a DROYC, tener la experiencia en este tipo de obras (CURRICULUM VITAE).",
    "D). Haber llevado en el año inmediato anterior cuando menos treinta horas de curso de actualización validados para DROYC.",
    "E). Será la comisión quien evalué la solicitud del colegiado y turnará su opinión al consejo directivo, quien decidirá en última instancia por votación mayor la aceptación o no de la solicitud del colegiado.",
    "F). De ser aceptada su solicitud del colegiado, se enviará a la secretaria de desarrollo urbano municipal, la propuesta para su evaluación correspondiente.",
  ],
};

const art69 = {
  id: "art-69",
  articulo: "Artículo 69°",
  titulo: "Del servicio social profesional",
  parrafos: [
    "Se entiende por servicio social, el trabajo de carácter temporal ya sea mediante con o sin retribución económica que ejecuten y presten los profesionistas en interés de la sociedad y del estado.",
  ],
  lista: [],
};

export const FUENTE_ESTATUTOS = "Estatutos del Colegio de Ingenieros Civiles de Tuxtla Gutiérrez, A.C.";

export const estatutos = { art7, art9, art17, art33, art35, art37, art48, art54, art55, art56, art69 };

// Orden en que se muestran en /conocenos/estatutos
export const estatutosEnOrden = [art7, art9, art17, art33, art35, art37, art48, art54, art55, art56, art69];

// Página /conocenos/estatutos (plantilla PaginaInformativa)
export const paginaEstatutos = {
  titulo: "Estatutos (extractos)",
  secciones: estatutosEnOrden,
  fuente: FUENTE_ESTATUTOS,
};
