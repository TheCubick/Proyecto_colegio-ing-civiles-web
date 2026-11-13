/*
  MAPA DEL SITIO: lista única de todas las páginas.
  El menú del Header, el menú del celular, los enlaces del Footer y las migas de pan
  («Inicio > Trámites > DRO») se arman solos a partir de esta lista.

  Cada página tiene:
  - ruta:     dirección en el navegador. Sin espacios, sin «ñ» y sin acentos.
  - titulo:   nombre completo (se ve en el menú y en el Footer).
  - corto:    (opcional) nombre corto para las migas de pan. Si no hay, se usa `titulo`.
  - grupo:    menú en el que aparece ("Trámites", "Servicios", "Eventos" o "Conócenos").
  - icono:    ícono de lucide-react que se ve en el menú desplegable.
  - portada:  true si la página abre con video o imagen grande detrás del Header
              (sirve para la especificación del Header de CLAUDE.md).

  Servicio Social y Beneficio a la Sociedad solo existen si su archivo de datos tiene contenido
  (data/servicioSocial.js y data/beneficioSocial.js): no hay que tocar este archivo para activarlas.

  Para agregar una página nueva:
    1) agrégala aquí;
    2) conecta su componente en src/App.jsx (objeto `paginas`).
*/
import {
  BadgeCheck,
  Briefcase,
  CalendarDays,
  DraftingCompass,
  GraduationCap,
  HandHeart,
  HardHat,
  HeartHandshake,
  House,
  ShieldAlert,
  Target,
  Users,
} from "lucide-react";
import { hayServicioSocial } from "../data/servicioSocial";
import { hayBeneficioSocial } from "../data/beneficioSocial";

export const GRUPOS = ["Trámites", "Servicios", "Eventos", "Conócenos"];

export const rutas = [
  { ruta: "/", titulo: "Inicio", portada: true },

  // ---------- Trámites ----------
  {
    ruta: "/tramites/dro",
    titulo: "Director Responsable de Obra (DRO)",
    corto: "DRO",
    grupo: "Trámites",
    icono: HardHat,
    portada: true,
  },
  {
    ruta: "/tramites/rt",
    titulo: "Representante Técnico (RT)",
    corto: "RT",
    grupo: "Trámites",
    icono: BadgeCheck,
    portada: true,
  },
  {
    ruta: "/tramites/dictaminador-de-riesgos",
    titulo: "Dictaminador de Riesgos",
    grupo: "Trámites",
    icono: ShieldAlert,
  },

  // ---------- Servicios ----------
  {
    ruta: "/servicios/peritos-valuadores",
    titulo: "Peritos Valuadores",
    grupo: "Servicios",
    icono: House,
  },
  {
    ruta: "/servicios/calculo-estructural",
    titulo: "Cálculo Estructural",
    grupo: "Servicios",
    icono: DraftingCompass,
  },
  {
    ruta: "/servicios/bolsa-de-trabajo",
    titulo: "Bolsa de Trabajo",
    grupo: "Servicios",
    icono: Briefcase,
  },

  // ---------- Eventos ----------
  {
    ruta: "/eventos/cursos-y-capacitacion",
    titulo: "Cursos y Capacitación",
    grupo: "Eventos",
    icono: GraduationCap,
  },
  {
    ruta: "/eventos/asambleas",
    titulo: "Asambleas",
    grupo: "Eventos",
    icono: CalendarDays,
  },

  // ---------- Conócenos ----------
  {
    ruta: "/conocenos/mision-y-vision",
    titulo: "Misión y Visión",
    grupo: "Conócenos",
    icono: Target,
    portada: true,
  },
  {
    ruta: "/conocenos/comisiones",
    titulo: "Comisiones",
    grupo: "Conócenos",
    icono: Users,
  },
  ...(hayServicioSocial
    ? [{ ruta: "/conocenos/servicio-social", titulo: "Servicio Social", grupo: "Conócenos", icono: HandHeart }]
    : []),
  ...(hayBeneficioSocial
    ? [
        {
          ruta: "/conocenos/beneficio-social",
          titulo: "Beneficio a la Sociedad",
          grupo: "Conócenos",
          icono: HeartHandshake,
        },
      ]
    : []),
];

// Menús del Header: [{ grupo: "Trámites", paginas: [...] }, ...]
export const menus = GRUPOS.map((grupo) => ({
  grupo,
  paginas: rutas.filter((pagina) => pagina.grupo === grupo),
}));

// Páginas de uno o varios grupos (para las columnas del Footer).
export const paginasDe = (...grupos) => rutas.filter((pagina) => grupos.includes(pagina.grupo));

// Busca los datos de una página por su ruta: buscarRuta("/tramites/dro")
export const buscarRuta = (ruta) => rutas.find((pagina) => pagina.ruta === ruta);

// Rutas cuyo Header va encima de un video o imagen de portada.
export const RUTAS_CON_PORTADA = rutas.filter((pagina) => pagina.portada).map((pagina) => pagina.ruta);
