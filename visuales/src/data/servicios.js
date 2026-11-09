/*
  TEXTOS DE LAS PÁGINAS DE SERVICIOS: Peritos Valuadores y Cálculo Estructural.
  Las dos páginas usan el mismo diseño: components/templates/PaginaServicio.
  Aquí solo va el contenido de cada una.

  Campos:
  - titulo, intro:      encabezado de la página.
  - asuntoCorreo:       asunto del correo que se abre con el botón «Solicitar».
  - textoBoton:         texto del botón rojo («Solicitar peritaje»).
  - descripcion:        tarjeta «¿En qué consiste el servicio?» (icono + texto).
  - imagen, alt:        foto junto a la descripción.
  - tituloTarjetas:     título de la sección de tres tarjetas.
  - tarjetas:           lista de { icono, titulo, texto }.
  - cta:                cierre de la página ({ titulo, texto }).
*/
import { Building2, DraftingCompass, HardHat, House, Landmark, Ruler, Scale } from "lucide-react";

export const servicios = {
  peritos: {
    titulo: "Peritos Valuadores",
    intro: "Dictámenes de valor con respaldo técnico y profesional del Colegio de Ingenieros Civiles.",
    asuntoCorreo: "Solicitud de peritaje",
    textoBoton: "Solicitar peritaje",
    descripcion: {
      icono: House,
      texto:
        "Realizamos dictámenes de valor de inmuebles, casas y propiedades. Servicio fundamental para transacciones, avalúos oficiales y procesos que requieren una estimación técnica profesional.",
    },
    imagen: "/img/paginas/servicios/peritos.jpg",
    alt: "Perito valuador inspeccionando una vivienda",
    tituloTarjetas: "¿Para qué sirve?",
    tarjetas: [
      {
        icono: House,
        titulo: "Inmuebles, casas y propiedades",
        texto: "Dictámenes de valor elaborados por peritos valuadores del Colegio.",
      },
      {
        icono: Scale,
        titulo: "Transacciones",
        texto: "Una estimación técnica profesional como respaldo en compraventas y operaciones.",
      },
      {
        icono: Landmark,
        titulo: "Avalúos oficiales",
        texto: "Para trámites y procesos que requieren un dictamen de valor formal.",
      },
    ],
    cta: {
      titulo: "¿Necesitas un dictamen de valor?",
      texto: "Escríbenos y un perito del Colegio te dará seguimiento.",
    },
  },

  calculo: {
    titulo: "Cálculo Estructural",
    intro: "Memorias de cálculo elaboradas y dictaminadas por especialistas en estructuras.",
    asuntoCorreo: "Solicitud de cálculo estructural",
    textoBoton: "Solicitar cálculo",
    descripcion: {
      icono: Ruler,
      texto:
        "Ingenieros con maestría en estructuras elaboran y dictaminan memorias de cálculo de edificios y obras de gran envergadura, en conjunto con los Directores Responsables de Obra.",
    },
    imagen: "/img/paginas/servicios/calculo.jpg",
    alt: "Ingeniero revisando planos estructurales de un edificio",
    tituloTarjetas: "Alcance del servicio",
    tarjetas: [
      {
        icono: DraftingCompass,
        titulo: "Memorias de cálculo",
        texto: "Elaboración y dictamen de memorias de cálculo estructural.",
      },
      {
        icono: Building2,
        titulo: "Obras de gran envergadura",
        texto: "Edificios y proyectos que requieren un análisis estructural especializado.",
      },
      {
        icono: HardHat,
        titulo: "Trabajo con el DRO",
        texto: "Coordinación con los Directores Responsables de Obra de cada proyecto.",
      },
    ],
    cta: {
      titulo: "¿Tu proyecto necesita cálculo estructural?",
      texto: "Escríbenos con los datos de la obra y te pondremos en contacto con un especialista.",
    },
  },
};
