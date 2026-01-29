"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const Banner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Forzamos la carga y reproducción manual
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.setAttribute("muted", ""); // Refuerzo para navegadores estrictos
      
      const attemptPlay = () => {
        video.play().catch(() => {
          // Si falla, intentamos de nuevo tras un pequeño delay
          setTimeout(attemptPlay, 1000);
        });
      };
      
      attemptPlay();
    }
  }, []);

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      {/* VIDEO BACKGROUND - Ajuste de carga forzada */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          // Eliminamos el filter temporalmente para descartar que sea un error de GPU
          className="w-full h-full object-cover"
        >
          <source src="/videos/Banner-1.mp4" type="video/mp4" />
          {/* Si el video no carga, este texto aparecerá en consola */}
          <track kind="captions" /> 
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
      </div>

      {/* CONTENIDO (Z-INDEX 10 PARA ESTAR SOBRE EL VIDEO) */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full w-full pt-[15vh] pb-[10vh]">
        <div className="text-center space-y-4 px-4">
          <h1 className="text-white text-5xl md:text-8xl font-black tracking-tighter uppercase italic drop-shadow-2xl">
            Drone <span className="text-gold">DT</span>
          </h1>
          <p className="text-white/40 text-[10px] md:text-xs tracking-[0.8em] uppercase font-bold">
            Sistemas Autónomos de Alta Precisión
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full max-w-[500px] px-6">
          <Link 
            href="/shop"
            className="flex-1 bg-white text-black py-4 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] text-center hover:bg-gold transition-all duration-300"
          >
            Explorar Tienda
          </Link>
          <Link 
            href="/services"
            className="flex-1 bg-black/40 backdrop-blur-md text-white py-4 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] text-center border border-white/10 hover:border-gold transition-all duration-300"
          >
            Servicios Técnicos
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default Banner;