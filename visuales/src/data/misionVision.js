/*
  CONTENIDO DE LA PÁGINA «MISIÓN Y VISIÓN» (/conocenos/mision-y-vision).
  - pilares:     tarjetas de Misión y Visión.
  - valores:     valores institucionales.
  - compromisos: compromisos ante la profesión y Código de Ética.
  - enlaces:     tarjetas «Conoce más del Colegio».
*/
import {
  Eye,
  FlaskConical,
  Gavel,
  GraduationCap,
  Landmark,
  Lightbulb,
  Scale,
  Target,
  Users,
  Zap,
} from "lucide-react";

export const pilares = [
  {
    id: "mision",
    icono: Target,
    etiqueta: "Nuestra razón de ser",
    titulo: "Misión",
    texto:
      "Ser una Asociación que promueva la capacitación permanente; así como la representación ante las instancias gubernamentales, a fin de que desarrollen la profesión de la Ingeniería Civil con el apego estricto al Código de Ética.",
  },
  {
    id: "vision",
    icono: Eye,
    etiqueta: "Hacia dónde vamos",
    titulo: "Visión",
    texto:
      "Tener reconocimiento a nivel estatal como la asociación que por su trayectoria intachable genere confianza de sus agremiados ante la prestación de servicios a la sociedad.",
  },
];

export const valores = [
  { icono: Zap, titulo: "Eficiencia", texto: "Trámites y servicios técnicos atendidos con oportunidad y calidad." },
  { icono: Scale, titulo: "Ética", texto: "Ejercicio profesional con apego estricto al Código de Ética." },
  { icono: Lightbulb, titulo: "Innovación", texto: "Actualización continua ante los nuevos retos de la ingeniería civil." },
];

export const compromisos = [
  {
    icono: Gavel,
    texto: "Apego estricto al Código de Ética y vigilancia mediante la Comisión de Honor y Justicia.",
  },
  {
    icono: Landmark,
    texto: "Promover leyes, reglamentos y reformas relativos al ejercicio profesional.",
  },
  {
    icono: GraduationCap,
    texto:
      "Colaborar en la elaboración y acreditamiento de proyectos de estudio y planes de especialidades y maestrías con universidades, para la excelencia académica.",
  },
  {
    icono: FlaskConical,
    texto:
      "Impulsar la investigación científica, tecnológica y la certificación continua: registro ante la SEP, padrón activo mayor a 100 colegiados y el requisito reglamentario de 4 cursos / 30 horas de capacitación anual por agremiado.",
  },
];

export const enlaces = [
  { to: "/conocenos/comisiones", icono: Users, titulo: "Comisiones", texto: "Especialidades y servicios técnicos del Colegio." },
];
