"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface VehicleCard {
  id: string;
  category: string;
  name: string;
  promo?: string;
  image: string;
}

const vehicles: VehicleCard[] = [
  { id: "1", category: "Industrial Drone", name: "Model X-1", image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=1800" },
  { id: "2", category: "Cinematic FPV", name: "Model DT-3", image: "https://images.unsplash.com/photo-1533230393035-73f114092243?auto=format&fit=crop&q=80&w=1800" },
  { id: "3", category: "Utility Cargo", name: "Lift Pro", promo: "3.99% APR Disponible", image: "https://images.unsplash.com/photo-1521749831539-67c790c02795?auto=format&fit=crop&q=80&w=1800" },
  { id: "4", category: "Luxury Surveillance", name: "Eagle Eye", promo: "3.99% APR Disponible", image: "https://images.unsplash.com/photo-1473960104312-bf2e12834e54?auto=format&fit=crop&q=80&w=1800" },
  { id: "5", category: "Agricultural", name: "Agro DT-5", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1800" },
  { id: "6", category: "Rescue Ops", name: "Guardian 6", image: "https://images.unsplash.com/photo-1527142879195-574163997225?auto=format&fit=crop&q=80&w=1800" }
];

const ProductShow = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const scrollToId = useCallback((index: number) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const totalWidth = container.scrollWidth;
      const itemWidth = totalWidth / vehicles.length;
      
      container.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  }, []);

  // Banner Automático (Autoplay cada 5 segundos)
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % vehicles.length;
      scrollToId(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, scrollToId]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / (scrollWidth / vehicles.length));
      if (index !== activeIndex) setActiveIndex(index);
    }
  };

  const handleProductClick = (id: string) => {
    // Redirección futura al detalle del modelo
    router.push(`/models/${id}`);
  };

  return (
    <section className="relative w-full bg-white overflow-hidden group">
      {/* Contenedor Horizontal */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex flex-row overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {vehicles.map((item) => (
          <div 
            key={item.id} 
            className="relative h-[85vh] min-h-[600px] w-[85vw] md:w-[70vw] lg:w-[60vw] flex-shrink-0 flex flex-col items-center justify-between py-12 md:py-20 snap-center border-r border-white/5 overflow-hidden"
          >
            {/* Background Image con Hover Suave */}
            <div 
              onClick={() => handleProductClick(item.id)}
              className="absolute inset-0 z-0 cursor-pointer group/item transition-transform duration-700 ease-in-out hover:scale-105"
            >
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover"
              />
              {/* Overlay de Luxury DT */}
              <div className="absolute inset-0 bg-black/20 group-hover/item:bg-black/10 transition-colors duration-500"></div>
            </div>

            {/* Content Top */}
            <div className="relative z-10 text-center px-4 pointer-events-none">
              <h2 className="text-white drop-shadow-2xl font-semibold text-[clamp(32px,5vw,60px)] tracking-tight leading-none mb-2">
                {item.name}
              </h2>
              <p className="text-white font-medium text-[clamp(12px,1vw,14px)] uppercase tracking-[0.3em] opacity-90">
                {item.promo || item.category}
              </p>
            </div>

            {/* Buttons Bottom */}
            <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full max-w-[80%] sm:max-w-[400px] px-4 mb-12">
              <button className="flex-1 py-3 bg-white text-black font-bold text-xs rounded-[4px] hover:bg-white/90 transition-all uppercase tracking-widest shadow-lg">
                Order Now
              </button>
              <button className="flex-1 py-3 bg-[#171a20cc] backdrop-blur-md text-white font-bold text-xs rounded-[4px] hover:bg-[#171a20] transition-all uppercase tracking-widest shadow-lg">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Puntos de Navegación - Más Grandes y Fáciles de Clickear */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-4 p-2">
        {vehicles.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToId(index)}
            className={`h-3 transition-all duration-500 rounded-full cursor-pointer ${
              activeIndex === index 
                ? "w-12 bg-gold shadow-[0_0_15px_rgba(255,215,0,0.6)]" 
                : "w-3 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductShow;