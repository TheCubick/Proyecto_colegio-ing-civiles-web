import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import "./VideoFondo.css";

/*
  VIDEO DE FONDO DE LAS PORTADAS (Inicio, DRO, RT, Misión y Visión).
  - WCAG 2.2.2: todo movimiento automático de más de 5 s debe poder pausarse →
    botón «Pausar / Reproducir video» en la esquina inferior derecha.
  - Si la persona pidió reducir el movimiento, el video empieza en pausa.
  - Es decorativo (aria-hidden); el botón sí es accesible con teclado.
  Props: src, className (clase del <video>), etiqueta (texto del botón, opcional).
*/
const reducirMovimiento =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function VideoFondo({ src, className, etiqueta = "video de fondo" }) {
  const videoRef = useRef(null);
  const [enPausa, setEnPausa] = useState(reducirMovimiento);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (enPausa) video.pause();
    else video.play().catch(() => setEnPausa(true));
  }, [enPausa]);

  return (
    <>
      <video
        ref={videoRef}
        className={className}
        autoPlay={!reducirMovimiento}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src={src} type="video/mp4" />
      </video>
      <button
        type="button"
        className="vf-control"
        onClick={() => setEnPausa((pausa) => !pausa)}
        aria-pressed={enPausa}
        aria-label={enPausa ? `Reproducir ${etiqueta}` : `Pausar ${etiqueta}`}
        title={enPausa ? "Reproducir video" : "Pausar video"}
      >
        {enPausa ? <Play size={18} aria-hidden="true" /> : <Pause size={18} aria-hidden="true" />}
      </button>
    </>
  );
}
