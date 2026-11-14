import { useEffect, useState } from "react";
import { db, supabaseConfigurado } from "../utils/supabaseClient";
import { aSitio, leerEstudioLocal, ORDEN, respaldo } from "../utils/contenido";

/*
  CONTENIDO PUBLICADO PARA EL SITIO (noticias del muro, cursos y asambleas).
  Uso: const { items, origen } = useContenidoPublico("noticias");

  1. Con Supabase configurado: pide las filas con publicado = true.
  2. Si no hay Supabase (o la red falla): usa src/data/cursos.js y src/data/asambleas.js.
     En el modo vista previa, si en ESTE navegador se usó el panel /admin, muestra lo que
     ahí se publicó (sirve para presentar el panel; nadie más lo ve).
  Mientras llega la respuesta se muestra el respaldo, así la página nunca aparece vacía de golpe.
  `origen`: "supabase" | "vista-previa" | "respaldo".
*/
function contenidoInicial(tipo) {
  if (!supabaseConfigurado) {
    const estudio = leerEstudioLocal();
    if (estudio) {
      return { items: estudio[tipo].filter((fila) => fila.publicado).map(aSitio[tipo]), origen: "vista-previa" };
    }
  }
  return { items: respaldo[tipo], origen: "respaldo" };
}

export default function useContenidoPublico(tipo) {
  const [estado, setEstado] = useState(() => contenidoInicial(tipo));

  useEffect(() => {
    if (!supabaseConfigurado) return undefined;
    let vigente = true;
    db.publicados(tipo, ORDEN[tipo])
      .then((filas) => {
        if (vigente) setEstado({ items: filas.map(aSitio[tipo]), origen: "supabase" });
      })
      .catch(() => {
        /* sin red o base no lista: se queda el respaldo de src/data */
      });
    return () => {
      vigente = false;
    };
  }, [tipo]);

  return estado;
}
