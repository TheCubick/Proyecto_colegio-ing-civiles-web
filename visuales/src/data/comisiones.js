/*
  CONTENIDO DE LA PÁGINA «COMISIONES» (/conocenos/comisiones).
*/
import {
  BadgeCheck,
  DraftingCompass,
  HardHat,
  HeartHandshake,
  House,
  Leaf,
  Scale,
  ShieldAlert,
  Trophy,
} from "lucide-react";

// "enlace" es opcional: si existe, la tarjeta muestra un acceso a la página del trámite o servicio.
export const comisiones = [
  {
    icono: HardHat,
    titulo: "Directores Responsables de Obra (DRO)",
    texto: "Responsables de verificar que las obras cumplan con la normatividad vigente y buenas prácticas.",
    enlace: { to: "/tramites/dro", label: "Ver trámite" },
  },
  {
    icono: BadgeCheck,
    titulo: "Representantes Técnicos (RT)",
    texto: "Ingenieros autorizados ante la Secretaría de la Honestidad y Buen Gobierno con claves de especialidad.",
    enlace: { to: "/tramites/rt", label: "Ver trámite" },
  },
  {
    icono: ShieldAlert,
    titulo: "Dictaminadores de Riesgos",
    texto: "Profesionales que evalúan riesgos de obra consultando el Atlas de Riesgos.",
    enlace: { to: "/tramites/dictaminador-de-riesgos", label: "Ver trámite" },
  },
  {
    icono: House,
    titulo: "Peritos Valuadores",
    texto: "Realizan dictámenes de valor de inmuebles fundamentales para transacciones oficiales.",
    enlace: { to: "/servicios/peritos-valuadores", label: "Ver servicio" },
  },
  {
    icono: DraftingCompass,
    titulo: "Especialistas en Memoria de Cálculo",
    texto: "Ingenieros con maestría en estructuras que dictaminan obras de gran envergadura.",
    enlace: { to: "/servicios/calculo-estructural", label: "Ver servicio" },
  },
  {
    icono: Scale,
    titulo: "Comisión de Honor y Justicia",
    texto: "Encargada de vigilar el correcto desempeño del Colegio y el cumplimiento del código de ética.",
  },
  {
    icono: Leaf,
    titulo: "Comisión Ambiental e Impacto Ecológico",
    texto: "Atiende los temas ambientales y de impacto ecológico relacionados con la ingeniería civil.",
  },
  {
    icono: Trophy,
    titulo: "Comisión de Deportes",
    texto: "Organiza actividades deportivas que fomentan la convivencia entre los agremiados.",
  },
  {
    icono: HeartHandshake,
    titulo: "Comisión de Acción Social",
    texto: "Impulsa acciones del Colegio en beneficio de la comunidad.",
  },
];
