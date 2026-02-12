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
      if (!response.ok) throw new Error("Error en la conexión con la DB");
      const result = await response.json();

      if (result && result.success && Array.isArray(result.data)) {
        const formatted = result.data.map((item: any) => {
          
          // 1. NORMALIZACIÓN TOTAL A MAYÚSCULAS
          const rawName = (item.name || "").toUpperCase();
          let finalImgPath = '/drone-placeholder.png'; 

          // 2. MAPEO QUIRÚRGICO BASADO EN TU LISTA EXACTA (Todos .png)
          // Buscamos la coincidencia del modelo sin importar guiones
          if (rawName.includes("BIG_C1PRO8") || rawName.includes("BIGC1PRO8")) {
            finalImgPath = "/DT-BIG_C1PRO8.png";
          } else if (rawName.includes("MID_B1PRO5") || rawName.includes("MIDB1PRO5")) {
            finalImgPath = "/DT-MID_B1PRO5.png";
          } else if (rawName.includes("MID_B2PRO8") || rawName.includes("MIDB2PRO8")) {
            finalImgPath = "/DT-MID_B2PRO8.png";
          } else if (rawName.includes("MINI_A1PRO4") || rawName.includes("MINIA1PRO4")) {
            finalImgPath = "/DT-MINI_A1PRO4.png";
          } else if (rawName.includes("MIN_A2PRO5") || rawName.includes("MINIA2PRO5")) {
            finalImgPath = "/DT-MINI_A2PRO5.png";
          }

          return {
            id: item._id?.$oid || item._id || item.id || Math.random().toString(),
            // Para el título: Limpiamos guiones bajos y aseguramos MAYÚSCULAS
            name: rawName.replace(/_/g, ' '), 
            price: typeof item.price === 'number' 
              ? `DESDE $${item.price.toLocaleString()}` 
              : (item.price?.toUpperCase() || 'CONTACTAR VENTAS'),
            tag: (item.category || 'PRO SERIES').toUpperCase(),
            img: finalImgPath
          };
        });
        setDrones(formatted);
      }
    } catch (err) {
      console.error("❌ Drone DT Uplink Offline:", err);
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
    if (!isTransitioning && drones.length > 0) {
      const raf = requestAnimationFrame(() => setIsTransitioning(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning, drones.length]);

  useEffect(() => {
    if (drones.length > 1 && isTransitioning) {
      timeoutRef.current = setInterval(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 5000);
    }
    return () => { if (timeoutRef.current) clearInterval(timeoutRef.current); };
  }, [drones.length, isTransitioning]);

  const handleDotClick = (idx: number) => {
    if (timeoutRef.current) clearInterval(timeoutRef.current);
    setIsTransitioning(true);
    setCurrentIndex(idx + 1);
  };

  if (loading) return (
    <div className="h-screen bg-[#DCDCDC] flex items-center justify-center font-black text-[#0000FF] text-2xl tracking-[0.2em]">
      CONECTANDO UPLINK DT...
    </div>
  );

  if (drones.length === 0) return null;

  return (
    <section className="relative w-full h-auto bg-[#DCDCDC] overflow-hidden flex flex-col items-center px-4 md:px-10 font-montserrat z-10 pt-6 md:pt-12 pb-7">
      
      <div className="relative w-full overflow-hidden" style={{ height: '82vh', minHeight: '720px' }}>
        <div 
          className={`flex h-full ${isTransitioning ? 'transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]' : ''}`}
          onTransitionEnd={handleTransitionEnd}
          style={{ 
            transform: `translateX(-${currentIndex * (100 / (extendedDrones.length || 1))}%)`,
            width: `${extendedDrones.length * 100}%` 
          }}
        >
          {extendedDrones.map((drone, idx) => (
            <div key={`${drone.id}-${idx}`} className="h-full flex-shrink-0 w-full px-4 md:px-12" style={{ width: `${100 / extendedDrones.length}%` }}>
              <div className="flex flex-col md:flex-row h-full w-full overflow-hidden rounded-[2.5rem] md:rounded-[4rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-white border border-white">
                
                <div className="w-full md:w-[60%] h-[40%] md:h-full bg-zinc-50 relative flex items-center justify-center p-8 md:p-20">
                  <div className="relative w-full h-full transform transition-all duration-1000 hover:scale-105">
                    <Image 
                      src={drone.img} 
                      alt={drone.name} 
                      fill 
                      className="object-contain drop-shadow-[0_40px_70px_rgba(0,0,0,0.2)] p-4 md:p-10" 
                      priority 
                      unoptimized 
                    />
                  </div>
                  <div className="absolute top-10 left-10 md:top-16 md:left-16">
                    <span className="text-[11px] font-black tracking-[0.4em] text-[#0000FF] uppercase border-l-4 border-[#FFD700] pl-5">
                      {drone.tag}
                    </span>
                  </div>
                </div>

                <div className="w-full md:w-[40%] h-[60%] md:h-full flex flex-col justify-between p-10 md:p-20 bg-white">
                  <div className="space-y-6">
                    <h3 className="text-4xl md:text-[65px] font-black uppercase italic leading-[0.8] tracking-tighter">
                      {drone.name.split(' ').map((word, i) => (
                        <span key={i} className={word === 'DT' ? 'text-[#FFD700] block' : 'text-[#0000FF] block'}>
                          {word}
                        </span>
                      ))}
                    </h3>
                    <div className="pt-2">
                      <p className="text-[13px] md:text-sm font-bold text-zinc-400 tracking-[0.15em] uppercase">
                        INGENIERÍA SOFTWARE DT
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
                      EXPLORAR UNIDAD
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4 mt-4 mb-5 z-[60]">
        {drones.map((_, idx) => {
          const isActive = (currentIndex === 0 ? drones.length - 1 : currentIndex === drones.length + 1 ? 0 : currentIndex - 1) === idx;
          return (
            <button key={idx} onClick={() => handleDotClick(idx)} className="relative py-3 focus:outline-none">
              <div className={`h-2 transition-all duration-500 rounded-full ${isActive ? 'w-16 bg-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.6)]' : 'w-4 bg-zinc-400/40 hover:bg-zinc-500/60'}`} />
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default ProductShow;