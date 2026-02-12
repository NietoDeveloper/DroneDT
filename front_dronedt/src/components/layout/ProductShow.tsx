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
    const baseUrl = isLocal ? 'http://localhost:5000/api/v1' : process.env.NEXT_PUBLIC_API_URL;
    
    try {
      const response = await fetch(`${baseUrl}/products/menu`);
      if (!response.ok) throw new Error("Error en la conexión");
      const result = await response.json();

      if (result && result.success && Array.isArray(result.data)) {
        const formatted = result.data.map((item: any) => {
          const rawName = (item.name || "").toUpperCase();
          let finalImgPath = '/drone-placeholder.png'; 

          if (rawName.includes("BIG_C1PRO8") || rawName.includes("BIGC1PRO8")) finalImgPath = "/DT-BIG_C1PRO8.png";
          else if (rawName.includes("MID_B1PRO5") || rawName.includes("MIDB1PRO5")) finalImgPath = "/DT-MID_B1PRO5.png";
          else if (rawName.includes("MID_B2PRO8") || rawName.includes("MIDB2PRO8")) finalImgPath = "/DT-MID_B2PRO8.png";
          else if (rawName.includes("MINI_A1PRO4") || rawName.includes("MINIA1PRO4")) finalImgPath = "/DT-MINI_A1PRO4.png";
          else if (rawName.includes("MINI_A2PRO5") || rawName.includes("MINIA2PRO5")) finalImgPath = "/DT-MINI_A2PRO5.png";

          return {
            id: item._id?.$oid || item._id || item.id || Math.random().toString(),
            name: rawName.replace(/_/g, ' '), 
            price: typeof item.price === 'number' ? `$${item.price.toLocaleString()}` : (item.price?.toUpperCase() || 'CONTACTAR'),
            tag: (item.category || 'PRO SERIES').toUpperCase(),
            img: finalImgPath
          };
        });
        setDrones(formatted);
      }
    } catch (err) {
      console.error("❌ Drone DT Offline:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchDrones(); }, [fetchDrones]);

  const extendedDrones = drones.length > 0 ? [drones[drones.length - 1], ...drones, drones[0]] : [];

  const handleTransitionEnd = () => {
    if (currentIndex === 0) { setIsTransitioning(false); setCurrentIndex(drones.length); }
    else if (currentIndex === drones.length + 1) { setIsTransitioning(false); setCurrentIndex(1); }
  };

  useEffect(() => {
    if (!isTransitioning && drones.length > 0) {
      const raf = requestAnimationFrame(() => setIsTransitioning(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning, drones.length]);

  useEffect(() => {
    if (drones.length > 1 && isTransitioning) {
      timeoutRef.current = setInterval(() => { setCurrentIndex((prev) => prev + 1); }, 5000);
    }
    return () => { if (timeoutRef.current) clearInterval(timeoutRef.current); };
  }, [drones.length, isTransitioning]);

  if (loading) return <div className="h-screen bg-white flex items-center justify-center font-black text-[#0000FF] text-2xl tracking-[0.2em]">CONECTANDO UPLINK DT...</div>;
  if (drones.length === 0) return null;

  return (
    <div className="bg-white w-full h-full flex flex-col relative z-30 overflow-hidden">
      
      {/* SECCIÓN SLIDER: h-[82%] para dar más aire a los dots abajo */}
      <section className="relative w-full h-[82%] overflow-hidden">
        <div 
          className={`flex h-full ${isTransitioning ? 'transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]' : ''}`}
          onTransitionEnd={handleTransitionEnd}
          style={{ 
            transform: `translateX(-${currentIndex * (100 / (extendedDrones.length || 1))}%)`,
            width: `${extendedDrones.length * 100}%` 
          }}
        >
          {extendedDrones.map((drone, idx) => (
            <div key={`${drone.id}-${idx}`} className="h-full flex-shrink-0 w-full" style={{ width: `${100 / extendedDrones.length}%` }}>
              <div className="flex flex-col md:flex-row h-full w-full bg-white">
                
                {/* LADO IZQUIERDO: FOTO GIGANTE (70% en Desktop) */}
                <div className="w-full md:w-[70%] h-[55%] md:h-full relative flex items-center justify-center p-4 md:p-8">
                  <div className="relative w-full h-full transform scale-110 md:scale-150 transition-transform duration-1000 ease-out">
                    <Image 
                      src={drone.img} 
                      alt={drone.name} 
                      fill 
                      className="object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.2)]" 
                      priority 
                      unoptimized 
                    />
                  </div>
                </div>

                {/* LADO DERECHO: INFO REFINADA (30% en Desktop) */}
                <div className="w-full md:w-[30%] h-[45%] md:h-full flex flex-col justify-center px-8 md:pr-16 bg-white z-10">
                  <div className="mb-8">
                    <h3 className="text-4xl md:text-5xl lg:text-[65px] font-black uppercase italic leading-[0.85] tracking-tighter">
                      {drone.name.split(' ').map((word, i) => (
                        <span key={i} className={word === 'DT' ? 'text-[#FFD700] block' : 'text-[#0000FF] block'}>{word}</span>
                      ))}
                    </h3>
                    <div className="mt-4">
                      <p className="text-[9px] font-bold text-zinc-400 tracking-[0.5em] uppercase">AVIACIÓN CIVIL DT</p>
                      <p className="text-3xl md:text-5xl font-black text-[#0000FF] mt-1">{drone.price}</p>
                    </div>
                  </div>

                  {/* BOTONES: h-20 equilibrado */}
                  <div className="flex flex-col gap-4 w-full max-w-xs">
                    <Link href={`/shop/checkout/${drone.id}`} className="h-16 md:h-20 bg-[#FFD700] hover:bg-black hover:text-white text-black flex items-center justify-center text-[12px] font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-lg">
                      ORDENAR
                    </Link>
                    <Link href={`/shop/product/${drone.id}`} className="h-16 md:h-20 border-2 border-black hover:bg-black hover:text-white flex items-center justify-center text-black text-[12px] font-black uppercase tracking-[0.2em] transition-all duration-300">
                      FICHA TÉCNICA
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ÁREA NAVEGACIÓN (DOTS): 18% para asegurar visibilidad total */}
      <div className="w-full h-[18%] flex justify-center items-center bg-white border-t border-zinc-100">
        <div className="flex gap-4">
          {drones.map((_, idx) => {
            const isActive = (currentIndex === 0 ? drones.length - 1 : currentIndex === drones.length + 1 ? 0 : currentIndex - 1) === idx;
            return (
              <button key={idx} onClick={() => { if (timeoutRef.current) clearInterval(timeoutRef.current); setIsTransitioning(true); setCurrentIndex(idx + 1); }}>
                <div className={`h-2 transition-all duration-500 rounded-full ${isActive ? 'w-24 bg-[#FFD700]' : 'w-6 bg-zinc-200'}`} />
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default ProductShow;