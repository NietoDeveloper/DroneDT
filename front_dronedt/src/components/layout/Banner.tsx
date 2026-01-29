"use client";

import { useState, useEffect, useRef } from 'react';
import { Pause, Play, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    type: 'video',
    src: '/videos/hero-drone.mp4', // Asegúrate de tener este archivo en public/videos/
    title: 'TECNOLOGÍA AÉREA',
    subtitle: 'EL FUTURO DE LA INSPECCIÓN INDUSTRIAL',
  },
  {
    id: 2,
    type: 'image',
    src: '/images/drone-photo-1.jpg', // Asegúrate de tener este archivo en public/images/
    title: 'PRECISIÓN SIN LÍMITES',
    subtitle: 'MAPPING Y FOTOGRAMETRÍA 4K',
  },
  {
    id: 3,
    type: 'image',
    src: '/images/drone-photo-2.jpg',
    title: 'SEGURIDAD 24/7',
    subtitle: 'VIGILANCIA AUTÓNOMA DE ALTA GAMA',
  },
];

export default function Banner() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Rotación automática (opcional, desactivada si es video)
  useEffect(() => {
    if (slides[current].type === 'image') {
      const timer = setTimeout(() => nextSlide(), 6000);
      return () => clearTimeout(timer);
    }
  }, [current]);

  const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative w-full h-[80vh] overflow-hidden bg-black">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {slide.type === 'video' ? (
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={slide.src} type="video/mp4" />
              </video>
              {/* Botón Pause/Play tipo Tesla */}
              <button 
                onClick={toggleVideo}
                className="absolute bottom-10 left-10 z-30 p-2 border border-white/20 rounded-full text-white/70 hover:bg-white hover:text-black transition-all"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
            </div>
          ) : (
            <img 
              src={slide.src} 
              alt={slide.title} 
              className="w-full h-full object-cover animate-scale-slow"
            />
          )}

          {/* Overlay y Textos */}
          <div className="absolute inset-0 bg-black/20 z-10" />
          
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-4 animate-fade-in-up">
              {slide.title}
            </h1>
            <p className="text-gold text-xs md:text-sm font-bold tracking-[0.4em] mb-10 animate-fade-in-up delay-150">
              {slide.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[500px] animate-fade-in-up delay-300">
              <button className="flex-1 bg-white/90 backdrop-blur-md text-black px-8 py-3 rounded-md font-bold text-[11px] tracking-widest hover:bg-gold hover:text-black transition-all">
                ORDENAR AHORA
              </button>
              <button className="flex-1 bg-[#212121]/80 backdrop-blur-md text-white border border-white/20 px-8 py-3 rounded-md font-bold text-[11px] tracking-widest hover:bg-white hover:text-black transition-all">
                SABER MÁS
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Flechas de Navegación (Visibles desde 310px) */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 text-white/30 hover:text-gold transition-colors"
      >
        <ChevronLeft size={40} strokeWidth={1} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 text-white/30 hover:text-gold transition-colors"
      >
        <ChevronRight size={40} strokeWidth={1} />
      </button>

      {/* Indicadores de Slide */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 transition-all duration-500 rounded-full ${
              i === current ? 'w-8 bg-gold' : 'w-4 bg-white/30'
            }`}
          />
        ))}
      </div>
    </section>
  );
}