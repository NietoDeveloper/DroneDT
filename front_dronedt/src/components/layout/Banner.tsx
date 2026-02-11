"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

interface Slide {
  id: number;
  type: 'video' | 'image';
  src: string;
  title: string;
  subtitle: string;
}

const slides: Slide[] = [
  { id: 1, type: 'video', src: '/Banner-1.mp4', title: 'DRONE DT', subtitle: 'Drone Colombiano • Bogotá' },
  { id: 2, type: 'image', src: '/Banner-1.png', title: 'Modelo: Mid_B2-Pro8', subtitle: 'Fotografía y Vuelo Profesional' },
  { id: 3, type: 'image', src: '/Banner-2.png', title: 'Modelo: Mini_A2-Pro5', subtitle: 'Vuelo Sigiloso y Ágil' },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    // Duración dinámica: 8s para video, 6s para imagen
    const duration = slides[currentSlide].type === 'video' ? 8000 : 6000;
    
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, duration);
  }, [currentSlide]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  // Manejo de reproducción de video
  useEffect(() => {
    if (slides[currentSlide].type === 'video' && videoRef.current) {
      setIsVideoVisible(false);
      videoRef.current.currentTime = 0;
      videoRef.current.play()
        .then(() => setIsVideoVisible(true))
        .catch(() => setIsVideoVisible(true));
    }
  }, [currentSlide]);

  const handleDotClick = (index: number) => {
    if (index === currentSlide) return;
    if (timerRef.current) clearInterval(timerRef.current); // Reiniciar el timer al hacer click manual
    setCurrentSlide(index);
  };

  const renderTitle = (title: string) => {
    if (title.includes('DRONE')) {
      const words = title.split(' ');
      return (
        <>
          <span className="text-white">{words[0]}</span>{" "}
          <span className="text-[#FFD700]">{words[1]}</span>
        </>
      );
    }
    if (title.includes('Modelo')) {
      const [prefix, model] = title.split(':');
      return (
        <>
          <span className="text-white">{prefix}:</span>
          <span className="text-[#FFD700]">{model}</span>
        </>
      );
    }
    return title;
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

            ) : (
              <div 

              />
            )}
       
          </div>
        ))}
      </div>

      {/* 2. CONTENEDOR CENTRAL */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full max-w-[1900px] mx-auto px-4 text-center">
        
        {/* BLOQUE DE TÍTULOS */}
        <div className="mt-[10vh] md:mt-[95px] flex flex-col items-center w-full">
          <div 
            key={currentSlide} 
            className="animate-in fade-in slide-in-from-top duration-1000 w-full"
          >

            <p className="text-white text-[10px] md:text-[11px] tracking-[0.5em] uppercase font-bold drop-shadow-md mt-4 opacity-90">

            </p>
          </div>
        </div>



      
  );
};

export default Banner;