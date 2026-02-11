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

  const renderTitle = (title: string) => {
    if (title.toUpperCase().includes('DRONE')) {
      const words = title.split(' ');
      return (
        <>
          <span className="text-[#0000FF]">{words[0]}</span>{" "}
          <span className="text-[#FFD700]">{words[1]}</span>
        </>
      );
    }
    if (title.includes('Modelo')) {
      const [prefix, model] = title.split(':');
      return (
        <>
          <span className="text-[#0000FF]">{prefix}:</span>{" "}
          <span className="text-[#FFD700]">{model}</span>
        </>
      );
    }
    return <span className="text-white">{title}</span>;
  };

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    const duration = slides[currentSlide].type === 'video' ? 8000 : 6000;
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, duration);
  }, [currentSlide]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

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
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentSlide(index);
  };

  return (
    /* FIJAMOS h-[80vh] para que el componente de abajo suba y se vea */
    <section className="relative w-full h-[80vh] bg-black overflow-hidden font-montserrat">
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
                ref={index === currentSlide ? videoRef : null}
                autoPlay loop muted playsInline
                className={`w-full h-full object-cover transition-opacity duration-1000 ${
                  index === currentSlide && isVideoVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <source src={slide.src} type="video/mp4" />
              </video>
            ) : (
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-[10000ms] ease-out"
                style={{ 
                  backgroundImage: `url(${slide.src})`,
                  transform: index === currentSlide ? 'scale(1)' : 'scale(1.1)'
                }}
              />
            )}
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
      </div>

      {/* Ajustamos los paddings internos para que nada se corte en 80vh */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full max-w-[1900px] mx-auto px-4 text-center py-12">
        <div className="mt-[5vh] flex flex-col items-center w-full">
          <div key={currentSlide} className="animate-in fade-in slide-in-from-top duration-1000 w-full">
            <h1 className="text-4xl md:text-[60px] lg:text-[65px] font-black tracking-tighter uppercase italic leading-none drop-shadow-xl">
              {renderTitle(slides[currentSlide].title)}
            </h1>
            <p className="text-white text-[10px] md:text-[11px] tracking-[0.5em] uppercase font-bold mt-4 opacity-90">
              {slides[currentSlide].subtitle}
            </p>
          </div>
        </div>

        <div className="mb-[2vh] flex flex-col md:flex-row gap-4 w-full max-w-[650px] pointer-events-auto">
          <Link 
            href="/shop"
            className="flex-1 h-[60px] flex items-center justify-center bg-[#FFD700] text-black rounded-[4px] text-[14px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all active:scale-95"
          >
            Compra Ahora
          </Link>
          <Link 
            href="/services" 
            className="flex-1 h-[60px] flex items-center justify-center bg-black/40 backdrop-blur-md text-white rounded-[4px] text-[14px] font-black uppercase tracking-[0.2em] border border-white/20 hover:bg-white hover:text-black transition-all active:scale-95"
          >
            Modelos
          </Link>
        </div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 z-[50] flex justify-center items-center gap-4">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`h-1 transition-all duration-500 rounded-full ${
                  i === currentSlide ? 'w-12 bg-[#FFD700]' : 'w-3 bg-white/30'
                }`}
            />
          ))}
      </div>
    </section>
  );
};

export default Banner;