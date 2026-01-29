"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const Banner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Refuerzo de silencio para permitir el autoplay en todos los navegadores
      video.muted = true;
      video.defaultMuted = true;
      
      const handlePlay = async () => {
        try {
          await video.play();
          setIsVideoVisible(true);
        } catch (err) {
          console.warn("Autoplay bloqueado. Reintentando...", err);
          // Intento de recuperación tras interacción o carga completa
          const retryPlay = () => {
            video.play().then(() => setIsVideoVisible(true)).catch(() => {});
          };
          window.addEventListener('click', retryPlay, { once: true });
          window.addEventListener('touchstart', retryPlay, { once: true });
        }
      };

      handlePlay();
    }
  }, []);

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      {/* ENGINE DE VIDEO CON OPACIDAD TRANSICIONAL */}
      <div className={`absolute inset-0 z-0 bg-black transition-opacity duration-1000 ${isVideoVisible ? 'opacity-100' : 'opacity-0'}`}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-60"
        >
          {/* Ruta absoluta hacia tu video de Monserrate en /public/videos/ */}
          <source src="/Banner-1.mp4" type="video/mp4" />
        </video>
        
        {/* Gradiente Tesla: crucial para la legibilidad sobre el video de Bogotá */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      </div>

      {/* CONTENIDO SUPERPUESTO (UI TESLA) */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full w-full pt-[20vh] pb-[8vh] px-6">
        
        {/* Encabezado */}
        <div className="text-center space-y-4 animate-in fade-in slide-in-from-top duration-1000">
          <h1 className="text-white text-5xl md:text-[85px] font-black tracking-tighter uppercase italic leading-none drop-shadow-2xl">
            DRONE <span className="text-gold">DT</span>
          </h1>
          <p className="text-white/80 text-[10px] md:text-xs tracking-[0.5em] uppercase font-bold">
            Ingeniería Aérea de Clase Mundial • Bogotá
          </p>
        </div>

        {/* Acciones e Indicador */}
        <div className="w-full flex flex-col items-center space-y-12">
          
          {/* Botones Estilo Tesla */}
          <div className="flex flex-col md:flex-row gap-4 w-full max-w-[550px]">
            <Link 
              href="/shop"
              className="flex-1 h-12 flex items-center justify-center bg-white/90 backdrop-blur-md text-black rounded-[4px] text-[11px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl active:scale-95"
            >
              Order Now
            </Link>
            <Link 
              href="/services"
              className="flex-1 h-12 flex items-center justify-center bg-[#111111]/70 backdrop-blur-md text-white rounded-[4px] text-[11px] font-black uppercase tracking-widest border border-white/10 hover:bg-black/90 transition-all shadow-xl active:scale-95"
            >
              Inventory
            </Link>
          </div>

          {/* Scroll Dash */}
          <div className="animate-bounce opacity-40">
            <div className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;