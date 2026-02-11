"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Drone {
  id: string;
  name: string;
  price: string;
  img: string;
  tag: string;
}

const ProductShow = () => {
  const [drones, setDrones] = useState<Drone[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchDrones = useCallback(async () => {
    setLoading(true);
    const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    const baseUrl = isLocal ? 'http://127.0.0.1:5000/api/v1' : process.env.NEXT_PUBLIC_API_URL;
    const fullUrl = `${baseUrl}/products/menu`;
    
    try {
      const response = await fetch(fullUrl);
      if (!response.ok) throw new Error("Error en la conexión con la DB");
      const result = await response.json();

      if (result.success && Array.isArray(result.data)) {
        const formatted = result.data.map((item: any) => ({
          id: item._id || item.id,
          name: item.name || "DRONE DT MODEL",
          price: typeof item.price === 'number' 
            ? `Desde $${item.price.toLocaleString()}` 
            : (item.price || 'Contactar Ventas'),
          tag: typeof item.category === 'string' ? item.category : (item.category?.name || 'Pro Series'),
          img: item.img || '/drone-placeholder.png'
        }));
        setDrones(formatted);
      }
    } catch (err) {
      console.error("DB Fetch Error:", err);
      setDrones([]); 
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchDrones(); }, [fetchDrones]);

  const extendedDrones = drones.length > 0 
    ? [drones[drones.length - 1], ...drones, drones[0]] 
    : [];

  const handleTransitionEnd = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(drones.length);
    } else if (currentIndex === drones.length + 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning]);

  useEffect(() => {
    if (drones.length > 0 && isTransitioning) {
      timeoutRef.current = setInterval(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 5000);
    }
    return () => { if (timeoutRef.current) clearInterval(timeoutRef.current); };
  }, [drones, isTransitioning]);

  const handleDotClick = (idx: number) => {
    if (timeoutRef.current) clearInterval(timeoutRef.current);
    setIsTransitioning(true);
    setCurrentIndex(idx + 1);
  };

  if (loading || drones.length === 0) return null;

  return (
    <section className="relative w-full h-auto bg-[#DCDCDC] overflow-hidden flex flex-col items-center px-4 md:px-10 font-montserrat z-10 pt-16 md:pt-28 pb-12">
      
      {/* Container con más altura para evitar el corte visual */}
      <div 
        className="relative w-full overflow-hidden py-8"
        style={{ height: '85vh', minHeight: '750px' }}
      >
        <div 
          className={`flex h-full ${isTransitioning ? 'transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]' : ''}`}
          onTransitionEnd={handleTransitionEnd}
          style={{ 
            transform: `translateX(-${currentIndex * (100 / (extendedDrones.length || 1))}%)`,
            width: `${extendedDrones.length * 100}%` 
          }}
        >
          {extendedDrones.map((drone, idx) => (
            <div 
              key={`${drone.id}-${idx}`} 
              className="h-full flex-shrink-0 w-full px-4 md:px-12"
              style={{ width: `${100 / extendedDrones.length}%` }}
            >
              {/* Card Individualizada con sombra profunda y bordes definidos */}
              <div className="flex flex-col md:flex-row h-full w-full overflow-hidden rounded-[2.5rem] md:rounded-[4rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-white border border-white">
                
                {/* Lado Imagen - 60% en Desktop */}
                <div className="w-full md:w-[60%] h-[40%] md:h-full bg-zinc-50 relative flex items-center justify-center p-8 md:p-20">
                  <div className="relative w-full h-full transform transition-all duration-1000 hover:scale-105">
                    <Image 
                      src={drone.img} 
                      alt={drone.name} 
                      fill 
                      className="object-contain drop-shadow-[0_40px_70px_rgba(0,0,0,0.2)] p-4 md:p-10" 
                      priority 
                    />
                  </div>
                  <div className="absolute top-10 left-10 md:top-16 md:left-16">
                    <span className="text-[11px] font-black tracking-[0.4em] text-[#0000FF] uppercase border-l-4 border-[#FFD700] pl-5">
                      {drone.tag}
                    </span>
                  </div>
                </div>

                {/* Lado Contenido - 40% en Desktop para más aire */}
                <div className="w-full md:w-[40%] h-[60%] md:h-full flex flex-col justify-between p-10 md:p-20 bg-white">
                  <div className="space-y-6">
                    <h3 className="text-4xl md:text-[65px] font-black uppercase italic leading-[0.8] tracking-tighter text-black">
                      {drone.name.split(' ').map((word, i) => (
                        <span key={i} className={word.toUpperCase() === 'DT' ? 'text-[#FFD700] block' : 'text-[#0000FF] block'}>
                          {word}
                        </span>
                      ))}
                    </h3>
                    <div className="pt-2">
                      <p className="text-[13px] md:text-sm font-bold text-zinc-400 tracking-[0.15em] uppercase">
                        Ingeniería Software DT
                      </p>
                      <p className="text-lg md:text-xl font-black text-[#0000FF] mt-1">
                        {drone.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 mt-8 md:mt-0">
                    <Link 
                      href={`/shop/product/${drone.id}`} 
                      className="w-full h-16 md:h-20 flex items-center justify-center bg-[#0000FF] text-white text-[13px] font-black uppercase tracking-[0.25em] transition-all rounded-xl hover:bg-[#FFD700] hover:text-black shadow-xl active:scale-95"
                    >
                      Explorar Unidad
                    </Link>
                    <Link 
                      href="/shop" 
                      className="w-full h-16 md:h-20 flex items-center justify-center bg-transparent text-[#0000FF] border-2 border-[#0000FF] text-[13px] font-black uppercase tracking-[0.25em] transition-all rounded-xl hover:bg-[#FFD700] hover:border-[#FFD700] hover:text-black active:scale-95"
                    >
                      Catálogo Completo
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots más integrados con el nuevo espaciado */}
      <div className="flex gap-4 mt-4 mb-10 z-[60]">
        {drones.map((_, idx) => {
          const isActive = (currentIndex === 0 ? drones.length - 1 : currentIndex === drones.length + 1 ? 0 : currentIndex - 1) === idx;
          return (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className="relative py-3 focus:outline-none"
            >
              <div
                className={`h-2 transition-all duration-500 rounded-full ${
                  isActive 
                    ? 'w-16 bg-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.6)]' 
                    : 'w-4 bg-zinc-400/40 hover:bg-zinc-500/60'
                }`}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default ProductShow;