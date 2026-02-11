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
    const fullUrl = `${baseUrl}/products?category=drone`;
    
    try {
      const response = await fetch(fullUrl);
      const result = await response.json();
      let rawData = result.data?.products || result.data || result;

      if (Array.isArray(rawData) && rawData.length > 0) {
        const formatted = rawData.map((item: any) => ({
          id: item._id || item.id,
          name: item.name || "DRONE DT MODEL",
          price: item.price ? `Desde $${Number(item.price).toLocaleString()}` : 'Contactar Ventas',
          tag: item.category?.name || 'Pro Series',
          img: item.imageUrl || (item.images?.[0]?.url || item.images?.[0] || '/drone-placeholder.png')
        }));
        setDrones(formatted);
      } else {
        throw new Error("Empty DB");
      }
    } catch (err) {
      const fallbackDrones = [
        { id: 'fb-1', name: 'Mavic 3 Pro DT', price: 'Desde $14,500,000', tag: 'Aeroespacial', img: '/drone-placeholder.png' },
        { id: 'fb-2', name: 'Matrice 300 DT', price: 'Desde $45,000,000', tag: 'Industrial', img: '/drone-placeholder.png' },
        { id: 'fb-3', name: 'Air 3 DT Edition', price: 'Desde $8,900,000', tag: 'Cinematográfico', img: '/drone-placeholder.png' },
        { id: 'fb-4', name: 'Mini 4 Pro DT', price: 'Desde $5,200,000', tag: 'Ultra Light', img: '/drone-placeholder.png' },
        { id: 'fb-5', name: 'Inspire 3 DT', price: 'Desde $62,000,000', tag: 'Cine Pro', img: '/drone-placeholder.png' },
      ];
      setDrones(fallbackDrones);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchDrones(); }, [fetchDrones]);

  // Clonación para carrusel infinito perfecta
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
    setCurrentIndex(idx + 1);
  };

  if (loading) return null;

  return (
    /* Ajuste: py-10 para dar espacio (50px aprox) y evitar traslape con el componente superior */
    <section className="relative w-full h-auto bg-[#DCDCDC] overflow-visible flex flex-col items-center px-4 md:px-10 font-montserrat z-10 py-12 md:py-20">
      
      {/* Carrusel: Ancho calculado dinámicamente según extendedDrones */}
      <div 
        className={`flex h-[75vh] md:h-[80vh] w-full ${isTransitioning ? 'transition-transform duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)]' : ''}`}
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
              
              {/* IMAGEN 70% */}
              <div className="w-full md:w-[70%] h-[45%] md:h-full bg-[#F5F5F5] relative flex items-center justify-center p-8 md:p-16">
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
                  <span className="text-[10px] font-black tracking-[0.4em] text-zinc-400 uppercase border-l-4 border-[#FFD700] pl-4">
                    {drone.tag}
                  </span>
                </div>
              </div>

              {/* INFO 30% */}
              <div className="w-full md:w-[30%] h-[55%] md:h-full flex flex-col justify-center p-8 md:p-14 bg-white">
                <div className="space-y-4">
                  <h3 className="text-3xl md:text-[50px] font-black uppercase italic leading-[0.85] tracking-tighter text-black">
                    {drone.name.split(' ').map((word, i) => (
                      <span key={i} className={word.toUpperCase() === 'DT' ? 'text-[#FFD700] block' : 'text-black block'}>
                        {word}
                      </span>
                    ))}
                  </h3>
                  <p className="text-[11px] md:text-xs font-bold text-zinc-400 tracking-[0.1em] uppercase">
                    Software DT Engineering • {drone.price}
                  </p>
                </div>

                <div className="flex flex-col gap-3 mt-10">
                  <Link 
                    href={`/shop/product/${drone.id}`} 
                    className="w-full h-14 md:h-16 flex items-center justify-center bg-[#FFD700] text-black text-[12px] font-black uppercase tracking-[0.2em] transition-all rounded-md hover:bg-black hover:text-white shadow-lg active:scale-95"
                  >
                    Detalles Técnicos
                  </Link>
                  <Link 
                    href="/shop" 
                    className="w-full h-14 md:h-16 flex items-center justify-center bg-zinc-50 text-black border border-zinc-200 text-[12px] font-black uppercase tracking-[0.2em] transition-all rounded-md hover:border-black active:scale-95"
                  >
                    Catálogo Completo
                  </Link>
                </div>

                {/* Barra de Progreso */}
                <div className="mt-12 w-full bg-zinc-100 h-[3px] relative overflow-hidden rounded-full">
                  <div 
                    className="absolute top-0 left-0 h-full bg-[#FFD700] transition-all duration-700"
                    style={{ 
                      width: `${(currentIndex === 0 ? drones.length : currentIndex === drones.length + 1 ? 1 : currentIndex) / drones.length * 100}%` 
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* INDICADORES (Pagination Dots) */}
      <div className="flex gap-4 mt-12 py-4 px-8 bg-white/80 backdrop-blur-xl rounded-full z-[60] border border-zinc-200 shadow-xl">
        {drones.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleDotClick(idx)}
            className="group relative p-3 focus:outline-none"
            aria-label={`Go to slide ${idx + 1}`}
          >
            <div
              className={`h-2 transition-all duration-500 rounded-full ${
                (currentIndex === 0 ? drones.length - 1 : currentIndex === drones.length + 1 ? 0 : currentIndex - 1) === idx 
                  ? 'w-12 bg-black' 
                  : 'w-4 bg-zinc-300 group-hover:bg-zinc-500'
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default ProductShow;