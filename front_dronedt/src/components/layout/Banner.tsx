"use client";

import { useEffect, useRef } from "react";

const Banner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Forzamos el play por si el navegador lo bloquea inicialmente
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay preventido por el navegador, intentando de nuevo...");
      });
    }
  }, []);

  return (
    <div className="relative w-full h-full min-h-[80vh] bg-black">
      {/* Video Background */}
      <video 
        ref={videoRef}
        autoPlay 
        loop 
        muted 
        playsInline
        // Eliminamos z-0 y usamos absolute inset-0 para que llene el padre
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ filter: 'brightness(0.7)' }} // Toque Tesla para que el texto resalte
      >
        <source src="/videos/Banner-1.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay Tesla: Degradado para fusionar con la siguiente sección negra */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black pointer-events-none" />

      {/* Content Overlay */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6">
        <div className="animate-fade-in transition-all duration-1000">
          <span className="text-white/40 text-[9px] md:text-[11px] tracking-[1em] uppercase font-black">
            Sistemas Autónomos de Alta Precisión
          </span>
        </div>
      </div>
    </div>
  );
};

export default Banner;