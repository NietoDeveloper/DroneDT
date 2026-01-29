"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  useEffect(() => {
    if (currentSlide === 0 && videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().then(() => setIsVideoVisible(true)).catch(() => {});
    }
  }, [currentSlide]);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
    startTimer(); 
  };

  return (
    <section className="relative w-full h-[90vh] bg-black overflow-hidden font-montserrat">
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
                autoPlay loop muted playsInline
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-[1]" />
      </div>

      {/* CONTENEDOR CENTRAL: TÍTULO BAJO Y BOTONES PEGADOS */}
      <div className="relative z-10 flex flex-col items-center justify-start h-full pt-[45vh] px-6 text-center">
        
        {/* 2. TEXTO (Bajado significativamente) */}
        <div key={slides[currentSlide].id} className="animate-in fade-in slide-in-from-top duration-1000">
          <h1 className="text-white text-4xl md:text-[75px] font-medium tracking-tighter uppercase italic leading-none drop-shadow-2xl">
            {slides[currentSlide].title.split(' ')[0]} <span className="text-gold">{slides[currentSlide].title.split(' ')[1]}</span>
          </h1>
          <p className="text-white text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold drop-shadow-md mt-4">
            {slides[currentSlide].subtitle}
          </p>
        </div>

        {/* 3. BOTONES (Altos h-[84px] y subidos con margen negativo para acercarse al título) */}
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-[600px] mt-10 md:-mt-2 pointer-events-auto">
          <Link 
            href="/shop"
            className="flex-1 h-[84px] flex items-center justify-center bg-white text-black rounded-[4px] text-[12px] font-bold uppercase tracking-widest hover:bg-gray-100 transition-all shadow-2xl active:scale-95"
          >
            Order Now
          </Link>
          <Link 
            href="/services" 
            className="flex-1 h-[84px] flex items-center justify-center bg-black/50 backdrop-blur-md text-white rounded-[4px] text-[12px] font-bold uppercase tracking-widest border border-white/20 hover:bg-black/70 transition-all shadow-2xl active:scale-95"
          >
            Flota
          </Link>
        </div>
      </div>

      {/* 4. INDICADORES (DOTS) - Funcionales y visibles */}
      <div className="absolute bottom-12 left-0 right-0 z-[100] flex justify-center items-center gap-8">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`
                w-4 h-4 rounded-full transition-all duration-300 cursor-pointer border-2 shadow-lg
                ${i === currentSlide 
                  ? 'bg-white border-white scale-125 shadow-white/20' 
                  : 'bg-white/20 border-white/40 hover:bg-white/50'}
              `}
              aria-label={`Ir al slide ${i + 1}`}
            />
          ))}
      </div>
    </section>
  );
};

export default Banner;