"use client";

import { useEffect, useRef } from "react";

const Banner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Aseguramos que el video intente reproducirse en cuanto el componente monte
    if (videoRef.current) {
      videoRef.current.defaultMuted = true; // Refuerzo de mute para autoplay
      videoRef.current.play().catch((error) => {
        console.warn("Autoplay bloqueado. El usuario debe interactuar o la ruta es incorrecta:", error);
      });
    }
  }, []);

  return (
    <div className="relative w-full h-full min-h-[80vh] bg-black overflow-hidden">
      {/* Video Background - Usando atributos nativos de React para máxima compatibilidad */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ filter: 'brightness(0.6)' }}
      >
        {/* Verificamos que la ruta sea absoluta desde la carpeta public */}
        <source src="/videos/Banner-1.mp4" type="video/mp4" />
        Tu navegador no soporta videos.
      </video>
      
      {/* Overlay Tesla: Gradiente sutil para fusionar con el fondo negro de la página */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black z-[1]" />

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <div className="animate-pulse duration-[3000ms]">
          <span className="text-white/30 text-[9px] md:text-[11px] tracking-[1.2em] uppercase font-black">
            Sistemas Autónomos de Alta Precisión
          </span>
        </div>
      </div>
    </div>
  );
};

export default Banner;