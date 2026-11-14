/*
  SERVICIO SOCIAL (F2-MF1 / F2-JM1).

  REGLA: aquí solo va, LETRA POR LETRA, lo que mande el Colegio. Nada redactado ni pasado por IA.

  Contenido actual: artículos 69° y 9.5 de los Estatutos (data/estatutos.js), entregados por el
  Colegio el 13-nov-2026. Con contenido, la página /conocenos/servicio-social aparece sola en el
  menú, el Footer y las migas; si se vacían `secciones`, `parrafos` y `requisitos`, la página
  desaparece y Misión y Visión vuelve a mostrar el `aviso` (plan B).

  Campos (ver components/templates/PaginaInformativa):
  - diseno:     "servicio" = banner de gratuidad + resumen + artículos en 2 columnas + contacto.
  - aviso:      recuadro destacado. Dato confirmado en la entrevista: el servicio social es gratuito.
  - resumen:    3 tarjetas cortas. Solo datos confirmados: gratuito y presencial (entrevistas)
                y la dirección oficial (data/contacto.js). No agregar promesas.
  - secciones:  artículos de los Estatutos.
  - parrafos / requisitos: texto suelto que mande el Colegio (tal cual).
  - pdf:        "/documentos/servicio-social.pdf" (solo si mandan PDF; va en public/documentos/).
*/
import { Building2, Gift, MapPin } from "lucide-react";
import { estatutos, FUENTE_ESTATUTOS } from "./estatutos";
import { contacto } from "./contacto";

const objetivo95 = estatutos.art9.lista.find((punto) => punto.startsWith("9.5"));

export const servicioSocial = {
  titulo: "Servicio Social",
  diseno: "servicio",
  subtitulo: `${estatutos.art69.articulo} y objetivo 9.5 de los Estatutos.`,
  aviso: {
    titulo: "Servicio social gratuito",
    texto:
      "El Colegio ofrece servicio social de manera gratuita. Informes únicamente en nuestras oficinas o por los teléfonos oficiales.",
  },
  resumen: [
    { icono: Gift, titulo: "Trámite 100% gratuito", texto: "Sin costo." },
    { icono: Building2, titulo: "Modalidad presencial", texto: "Informes en oficinas o por los teléfonos oficiales." },
    { icono: MapPin, titulo: "Atención en oficinas", texto: contacto.direccion.corta },
  ],
  secciones: [
    estatutos.art69,
    { ...estatutos.art9, id: "art-9-5", lista: [objetivo95] },
  ],
  tituloLista: "Requisitos",
  parrafos: [],
  requisitos: [],
  pdf: "",
  fuente: `${FUENTE_ESTATUTOS}, artículos 69° y 9°.`,
};

export const hayServicioSocial =
  servicioSocial.secciones.length > 0 || servicioSocial.parrafos.length > 0 || servicioSocial.requisitos.length > 0;
