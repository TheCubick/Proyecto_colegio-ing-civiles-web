// Información ampliada de los trámites de DRO, RT y Dictaminador de Riesgos.
// La consume el componente TramiteDetalle; cada trámite tiene tres bloques:
// funciones, cómo contratar a un agremiado e importancia normativa.

// Pasos para contratar: iguales en los tres trámites, solo cambia el nombre del perito.
const pasosContratacion = (perito) => [
  {
    titulo: "Contacta al Colegio",
    texto:
      "Comunícate por teléfono, WhatsApp o correo electrónico, o acude directamente a nuestras oficinas en horario de atención.",
  },
  {
    titulo: "Describe tu proyecto",
    texto:
      "Indícanos la ubicación, el tipo de obra, la superficie aproximada y la etapa en la que se encuentra (proyecto, trámite de licencia o ejecución).",
  },
  {
    titulo: "Acude a las oficinas",
    texto: `Todo el trámite se realiza de forma presencial en las oficinas del Colegio, donde te orientan para contactar a un ${perito} con registro vigente.`,
  },
];

const notaPrivacidad =
  "Por seguridad de nuestros agremiados, sus datos de contacto no se publican en línea: el directorio se entrega únicamente a través de las oficinas del Colegio.";

export const infoDro = {
  funciones: {
    intro:
      "El DRO es la figura que da certeza técnica y legal a una construcción desde que se solicita la licencia hasta que se entrega la obra terminada. Entre sus funciones principales se encuentran:",
    lista: [
      {
        titulo: "Firma de la licencia de construcción",
        texto:
          "Revisa el proyecto ejecutivo y firma como responsable la solicitud de licencia ante la Dirección de Obras Públicas o Desarrollo Urbano del municipio.",
      },
      {
        titulo: "Supervisión de obra",
        texto:
          "Vigila que la construcción se ejecute conforme a los planos autorizados, las especificaciones técnicas y las normas de seguridad vigentes.",
      },
      {
        titulo: "Bitácora de obra",
        texto:
          "Lleva y firma la bitácora oficial, donde se registran avances, visitas, instrucciones, cambios al proyecto y cualquier incidente relevante.",
      },
      {
        titulo: "Coordinación con corresponsables",
        texto:
          "Se coordina con los corresponsables en seguridad estructural, instalaciones y diseño urbano-arquitectónico cuando la magnitud de la obra lo exige.",
      },
      {
        titulo: "Seguridad en la obra",
        texto:
          "Verifica que se apliquen las medidas de protección para trabajadores, vecinos y transeúntes durante todo el proceso constructivo.",
      },
      {
        titulo: "Aviso de terminación de obra",
        texto:
          "Al concluir los trabajos, avala que la edificación cumple con lo autorizado y firma el aviso de terminación para su ocupación.",
      },
    ],
  },
  contratar: {
    intro:
      "Si vas a construir, ampliar, remodelar o demoler, el Colegio te ayuda a encontrar un Director Responsable de Obra con registro vigente:",
    pasos: pasosContratacion("Director Responsable de Obra"),
    nota: notaPrivacidad,
  },
  normativa: {
    parrafos: [
      "Construir sin DRO expone al propietario a la suspensión o clausura de los trabajos, a multas y a la imposibilidad de escriturar, asegurar o vender el inmueble con su construcción en regla. Además, en una zona de alta sismicidad como Chiapas, omitir la supervisión técnica pone en riesgo la vida de quienes habitarán o transitarán cerca de la edificación.",
    ],
    riesgos: [
      "Suspensión o clausura de la obra",
      "Multas y sanciones municipales",
      "Problemas para escriturar o asegurar el inmueble",
      "Responsabilidad civil ante daños a terceros",
    ],
  },
};

export const infoRt = {
  funciones: {
    intro:
      "El Representante Técnico responde por la calidad técnica de los trabajos que ejecuta una empresa constructora, en especial en la obra pública. Sus funciones principales son:",
    lista: [
      {
        titulo: "Respaldo técnico de la empresa",
        texto:
          "Acredita ante las dependencias que la constructora cuenta con un ingeniero especialista responsable, requisito para inscribirse en el padrón de contratistas.",
      },
      {
        titulo: "Propuestas en licitaciones",
        texto:
          "Revisa y firma la propuesta técnica: catálogo de conceptos, análisis de precios unitarios, programa de obra y procedimiento constructivo.",
      },
      {
        titulo: "Dirección técnica de los trabajos",
        texto:
          "Representa a la empresa en campo, atiende a la supervisión de la dependencia y garantiza que la obra se ejecute según el contrato y las especificaciones.",
      },
      {
        titulo: "Bitácora y estimaciones",
        texto:
          "Firma la bitácora electrónica o convencional y avala las estimaciones de obra ejecutada que se presentan para su pago.",
      },
      {
        titulo: "Control de calidad",
        texto:
          "Verifica pruebas de laboratorio, materiales y procesos constructivos para asegurar la durabilidad y seguridad de la obra.",
      },
      {
        titulo: "Entrega-recepción",
        texto:
          "Participa en el finiquito y la entrega-recepción de los trabajos, respondiendo por los vicios ocultos dentro del periodo de garantía.",
      },
    ],
  },
  contratar: {
    intro:
      "Si tu empresa constructora necesita un Representante Técnico con clave de especialidad vigente, el Colegio te orienta:",
    pasos: pasosContratacion("Representante Técnico"),
    nota: notaPrivacidad,
  },
  normativa: {
    parrafos: [
      "Una empresa sin Representante Técnico vigente no puede registrarse ni refrendar su inscripción, por lo que queda fuera de los concursos de obra pública. Además, la falta de un responsable técnico calificado aumenta el riesgo de errores en la ejecución, sanciones contractuales y obras que no cumplen con la calidad esperada por la ciudadanía.",
    ],
    riesgos: [
      "Imposibilidad de inscribirse en el padrón de contratistas",
      "Descalificación en licitaciones",
      "Penas convencionales y rescisión de contratos",
      "Responsabilidad por vicios ocultos",
    ],
  },
};

export const infoDictaminador = {
  funciones: {
    intro:
      "El Dictaminador de Riesgos aporta una opinión técnica especializada sobre la seguridad de un predio, una edificación o una instalación. Sus funciones principales son:",
    lista: [
      {
        titulo: "Análisis de riesgos del sitio",
        texto:
          "Consulta el Atlas de Riesgos y estudios técnicos para identificar amenazas como sismos, inundaciones, deslizamientos de laderas o hundimientos.",
      },
      {
        titulo: "Evaluación estructural",
        texto:
          "Revisa el estado de la estructura y, cuando es necesario, valida los cálculos sísmicos y de cargas para determinar si la edificación es segura.",
      },
      {
        titulo: "Emisión del dictamen",
        texto:
          "Elabora y firma el dictamen técnico de riesgo que solicitan municipios, Protección Civil y la Secretaría de Obras Públicas para obras nuevas o existentes.",
      },
      {
        titulo: "Atención a emergencias",
        texto:
          "Tras sismos, lluvias intensas u otros fenómenos, inspecciona inmuebles dañados y determina si pueden seguir ocupándose o deben desalojarse.",
      },
      {
        titulo: "Medidas de mitigación",
        texto:
          "Recomienda refuerzos, obras de protección o restricciones de uso para reducir el riesgo a un nivel aceptable.",
      },
      {
        titulo: "Seguimiento y verificación",
        texto:
          "Constata que las recomendaciones del dictamen se hayan atendido antes de liberar la ocupación o el funcionamiento del inmueble.",
      },
    ],
  },
  contratar: {
    intro:
      "Si tu trámite te pide un dictamen de riesgo, o te preocupa la seguridad de un inmueble, el Colegio te pone en contacto con un especialista:",
    pasos: pasosContratacion("Dictaminador de Riesgos"),
    nota: notaPrivacidad,
  },
  normativa: {
    parrafos: [
      "Chiapas es una de las entidades con mayor actividad sísmica del país y con zonas expuestas a inundaciones y deslaves. Construir u ocupar un inmueble sin un dictamen avalado por un especialista puede derivar en la negativa de licencias y permisos, clausuras por parte de Protección Civil y, sobre todo, en pérdidas humanas y materiales que pudieron evitarse.",
    ],
    riesgos: [
      "Negativa de licencias y permisos de funcionamiento",
      "Clausura por parte de Protección Civil",
      "Pérdidas humanas y materiales ante un desastre",
      "Responsabilidad legal del propietario",
    ],
  },
};
