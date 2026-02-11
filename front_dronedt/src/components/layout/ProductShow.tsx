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
    
    // Conexión al endpoint de alto rendimiento /menu
    const fullUrl = `${baseUrl}/products/menu`;
    
    try {
      const response = await fetch(fullUrl);
      if (!response.ok) throw new Error("Error en la conexión con la DB");
      
      const result = await response.json();

      // Sincronización con la respuesta del Backend: { success: true, data: [...] }
      if (result.success && Array.isArray(result.data)) {
        const formatted = result.data.map((item: any) => ({
          id: item._id || item.id,
          name: item.name || "DRONE DT MODEL",
          // Formateo de precio para producción
          price: typeof item.price === 'number' 
            ? `Desde $${item.price.toLocaleString()}` 
            : (item.price || 'Contactar Ventas'),
          tag: typeof item.category === 'string' ? item.category : (item.category?.name || 'Pro Series'),
          // Usamos 'img' que ya viene procesada por tu controlador NietoDeveloper
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
    setCurrentIndex(idx + 1);
  };

  if (loading || drones.length === 0) return null;

  return (
    <section className="relative w-full h-auto bg-[#DCDCDC] overflow-hidden flex flex-col items-center px-4 md:px-10 font-montserrat z-10 pt-12 md:pt-24 pb-0">
      
      <div 
        className="relative w-full overflow-visible"
        style={{ height: '75vh', minHeight: '600px' }}
      >
        <div 
          className={`flex h-full ${isTransitioning ? 'transition-transform duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)]' : ''}`}
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

      <div className="flex gap-4 mt-8 mb-6 py-4 px-10 bg-black/5 backdrop-blur-xl rounded-full z-[60] border border-white/40 shadow-[0_10px_30px_rgba(0,0,0,0.05)] translate-y-[-5px]">
        {drones.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleDotClick(idx)}
            className="group relative focus:outline-none"
          >
            <div
              className={`h-2.5 transition-all duration-500 rounded-full ${
                (currentIndex === 0 ? drones.length - 1 : currentIndex === drones.length + 1 ? 0 : currentIndex - 1) === idx 
                  ? 'w-16 bg-[#FFD700] shadow-[0_0_15px_#FFD700]' 
                  : 'w-4 bg-zinc-400/50 group-hover:bg-[#FFD700]/70'
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default ProductShow;