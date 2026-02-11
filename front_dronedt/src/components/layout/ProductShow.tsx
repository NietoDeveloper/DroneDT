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
    // Limpieza inmediata del timer para evitar saltos
    if (timeoutRef.current) clearInterval(timeoutRef.current);
    setIsTransitioning(true);
    setCurrentIndex(idx + 1);
  };

  if (loading || drones.length === 0) return null;

  return (
    <section className="relative w-full h-auto bg-[#DCDCDC] overflow-hidden flex flex-col items-center px-4 md:px-10 font-montserrat z-10 pt-12 md:pt-24 pb-0">
      
      <div 
        className="relative w-full overflow-hidden"
        style={{ height: '75vh', minHeight: '600px' }}
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
              className="h-full flex-shrink-0 w-full px-2 md:px-6"
              style={{ width: `${100 / extendedDrones.length}%` }}
            >
              <div className="flex flex-col md:flex-row h-full w-full overflow-hidden rounded-[2rem] md:rounded-[3.5rem] shadow-2xl bg-white border border-white/20">
                
                <div className="w-full md:w-[70%] h-[45%] md:h-full bg-zinc-50 relative flex items-center justify-center p-8 md:p-16">
                  <div className="relative w-full h-full transform transition-all duration-1000 hover:scale-105">
                    <Image 
                      src={drone.img} 
                      alt={drone.name} 
                      fill 
                      className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.15)] p-4 md:p-10" 
                      priority 
                    />
                  </div>
                  <div className="absolute top-8 left-8 md:top-12 md:left-12">
                    <span className="text-[10px] font-black tracking-[0.4em] text-[#0000FF] uppercase border-l-4 border-[#FFD700] pl-4">
                      {drone.tag}
                    </span>
                  </div>
                </div>

                <div className="w-full md:w-[30%] h-[55%] md:h-full flex flex-col justify-center p-8 md:p-14 bg-white">
                  <div className="space-y-4">
                    <h3 className="text-3xl md:text-[50px] font-black uppercase italic leading-[0.85] tracking-tighter text-black">
                      {drone.name.split(' ').map((word, i) => (
                        <span key={i} className={word.toUpperCase() === 'DT' ? 'text-[#FFD700] block' : 'text-[#0000FF] block'}>
                          {word}
                        </span>
                      ))}
                    </h3>
                    <p className="text-[11px] md:text-xs font-bold text-zinc-400 tracking-[0.1em] uppercase">
                      Ingeniería Software DT • {drone.price}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 mt-10">
                    <Link 
                      href={`/shop/product/${drone.id}`} 
                      className="w-full h-14 md:h-16 flex items-center justify-center bg-[#0000FF] text-white text-[12px] font-black uppercase tracking-[0.2em] transition-all rounded-md hover:bg-[#FFD700] hover:text-black shadow-lg active:scale-95"
                    >
                      Explorar
                    </Link>
                    <Link 
                      href="/shop" 
                      className="w-full h-14 md:h-16 flex items-center justify-center bg-transparent text-[#0000FF] border border-[#0000FF] text-[12px] font-black uppercase tracking-[0.2em] transition-all rounded-md hover:bg-[#FFD700] hover:border-[#FFD700] hover:text-black active:scale-95"
                    >
                      Ver Todo
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DOTS LIMPIOS - Estilo Banner Inicial */}
      <div className="flex gap-3 mt-10 mb-8 z-[60]">
        {drones.map((_, idx) => {
          const isActive = (currentIndex === 0 ? drones.length - 1 : currentIndex === drones.length + 1 ? 0 : currentIndex - 1) === idx;
          return (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className="relative py-2 focus:outline-none"
              aria-label={`Go to slide ${idx + 1}`}
            >
              <div
                className={`h-1.5 transition-all duration-500 rounded-full ${
                  isActive 
                    ? 'w-12 bg-[#FFD700] shadow-[0_0_10px_rgba(255,215,0,0.4)]' 
                    : 'w-3 bg-zinc-400/40 hover:bg-zinc-500/60'
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