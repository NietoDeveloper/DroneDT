"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const slides = [
  { id: 1, type: 'video', src: '/Banner-1.mp4', title: 'DRONE DT', subtitle: 'Ingeniería Drone de Clase Mundial • Bogotá' },
  { id: 2, type: 'image', src: '/images/drone-photo-1.jpg', title: 'MODELO INDUSTRIAL', subtitle: 'Sistemas Autónomos de Alta Precisión' },
  { id: 3, type: 'image', src: '/images/drone-photo-2.jpg', title: 'SERVICIO TÉCNICO', subtitle: 'Mantenimiento y Respaldo Especializado' },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (currentSlide === 0 && videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().then(() => setIsVideoVisible(true)).catch(() => {});
    }
  }, [currentSlide]);

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden font-montserrat">
      {/* 1. FONDO - MULTIMEDIA */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {slide.type === 'video' ? (
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className={`w-full h-full object-cover transition-opacity duration-1000 ${isVideoVisible ? 'opacity-100' : 'opacity-0'}`}
              >
                <source src={slide.src} type="video/mp4" />
              </video>
            ) : (
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.src})` }}
              />
            )}
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
      </div>

      {/* 2. TEXTO SUPERIOR */}
      <div className="relative z-20 pt-[15vh] text-center px-6">
        <div key={slides[currentSlide].id} className="animate-in fade-in slide-in-from-top duration-1000 space-y-2">
          <h1 className="text-white text-4xl md:text-[65px] font-medium tracking-tighter uppercase italic leading-none drop-shadow-2xl">
            {slides[currentSlide].title.split(' ')[0]} <span className="text-gold">{slides[currentSlide].title.split(' ')[1]}</span>
          </h1>
          <p className="text-white text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold drop-shadow-md">
            {slides[currentSlide].subtitle}
          </p>
        </div>
      </div>

      {/* 3. BOTONES DE ACCIÓN */}
      <div className="absolute inset-0 z-30 flex items-center justify-center px-6 pointer-events-none">
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-[580px] mt-[calc(10vh-40px)] pointer-events-auto">
          <Link 
            href="/shop"
            className="flex-1 h-20 md:h-16 flex items-center justify-center bg-white/90 backdrop-blur-md text-black rounded-[4px] text-[13px] md:text-[11px] font-bold uppercase tracking-widest hover:bg-white transition-all shadow-xl active:scale-95"
          >
            Order Now
          </Link>
          <Link 
            href="/services" 
            className="flex-1 h-20 md:h-16 flex items-center justify-center bg-[#111111]/70 backdrop-blur-md text-white rounded-[4px] text-[13px] md:text-[11px] font-bold uppercase tracking-widest border border-white/10 hover:bg-black/90 transition-all shadow-xl active:scale-95"
          >
            Flota
          </Link>
        </div>
      </div>

      {/* 4. INDICADORES (TESLA DOTS) */}
      <div className="absolute bottom-12 left-0 w-full flex justify-center pointer-events-none" style={{ zIndex: 9999 }}>
        <div className="flex items-center justify-center gap-5 pointer-events-auto">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`
                w-3 h-3 rounded-full transition-all duration-500 shadow-md border border-black/5
                ${i === currentSlide 
                  ? 'bg-white scale-125 opacity-100' 
                  : 'bg-white/40 scale-100 opacity-60 hover:opacity-100'}
              `}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;