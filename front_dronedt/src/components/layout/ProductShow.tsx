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
            price: typeof item.price === 'number' ? `DESDE $${item.price.toLocaleString()}` : (item.price?.toUpperCase() || 'CONTACTAR VENTAS'),
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

  if (loading) return <div className="h-screen bg-[#DCDCDC] flex items-center justify-center font-black text-[#0000FF] text-2xl tracking-[0.2em]">CONECTANDO UPLINK DT...</div>;
  if (drones.length === 0) return null;

  return (
    <section className="relative w-full min-h-screen bg-[#DCDCDC] overflow-hidden flex flex-col items-center px-2 md:px-10 font-montserrat z-10 pt-4 md:pt-10 pb-10">
      
      <div className="relative w-full max-w-[1900px] overflow-hidden" style={{ height: '85vh', minHeight: '650px' }}>
        <div 
          className={`flex h-full ${isTransitioning ? 'transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]' : ''}`}
          onTransitionEnd={handleTransitionEnd}
          style={{ 
            transform: `translateX(-${currentIndex * (100 / (extendedDrones.length || 1))}%)`,
            width: `${extendedDrones.length * 100}%` 
          }}
        >
          {extendedDrones.map((drone, idx) => (
            <div key={`${drone.id}-${idx}`} className="h-full flex-shrink-0 w-full px-2 md:px-8" style={{ width: `${100 / extendedDrones.length}%` }}>
              
              <div className="flex flex-col md:flex-row h-full w-full overflow-hidden rounded-[2rem] md:rounded-[3.5rem] shadow-2xl bg-white border border-white">
                
                {/* 50% IMAGEN */}
                <div className="w-full md:w-1/2 h-[45%] md:h-full bg-zinc-50 relative flex items-center justify-center p-6 md:p-12">
                  <div className="relative w-full h-full transform transition-transform duration-700 hover:scale-110">
                    <Image 
                      src={drone.img} 
                      alt={drone.name} 
                      fill 
                      className="object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.2)]" 
                      priority 
                      unoptimized 
                    />
                  </div>
                  <div className="absolute top-6 left-6 md:top-12 md:left-12">
                    <span className="text-[10px] md:text-[12px] font-black tracking-[0.3em] text-[#0000FF] uppercase border-l-4 border-[#FFD700] pl-4">
                      {drone.tag}
                    </span>
                  </div>
                </div>

                {/* 50% INFO */}
                <div className="w-full md:w-1/2 h-[55%] md:h-full flex flex-col justify-between p-8 md:p-14 lg:p-20 bg-white">
                  <div className="space-y-4 md:space-y-6">
                    <h3 className="text-3xl sm:text-4xl md:text-[50px] lg:text-[70px] font-black uppercase italic leading-[0.85] tracking-tighter">
                      {drone.name.split(' ').map((word, i) => (
                        <span key={i} className={word === 'DT' ? 'text-[#FFD700] block' : 'text-[#0000FF] block'}>
                          {word}
                        </span>
                      ))}
                    </h3>
                    
                    <div className="pt-1">
                      <p className="text-[10px] md:text-[12px] font-bold text-zinc-400 tracking-[0.2em] uppercase">
                        INGENIERÍA SOFTWARE DT
                      </p>
                      <p className="text-xl md:text-2xl font-black text-[#0000FF] mt-1">
                        {drone.price}
                      </p>
                    </div>
                  </div>

                  {/* ACCIONES: BOTONES MÁS PEQUEÑOS */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <Link 
                      href={`/shop/checkout/${drone.id}`} 
                      className="flex-1 h-12 md:h-14 flex items-center justify-center bg-[#0000FF] text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-lg transition-all hover:bg-[#0000CC] active:scale-95 shadow-lg"
                    >
                      COMPRAR
                    </Link>
                    <Link 
                      href={`/shop/product/${drone.id}`} 
                      className="flex-1 h-12 md:h-14 flex items-center justify-center border-2 border-[#0000FF] text-[#0000FF] text-[11px] font-black uppercase tracking-[0.2em] rounded-lg transition-all hover:bg-[#0000FF] hover:text-white active:scale-95"
                    >
                      INFO TÉCNICA
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 mt-6 z-[60]">
        {drones.map((_, idx) => {
          const isActive = (currentIndex === 0 ? drones.length - 1 : currentIndex === drones.length + 1 ? 0 : currentIndex - 1) === idx;
          return (
            <button key={idx} onClick={() => { if (timeoutRef.current) clearInterval(timeoutRef.current); setIsTransitioning(true); setCurrentIndex(idx + 1); }} className="py-2">
              <div className={`h-1.5 transition-all duration-500 rounded-full ${isActive ? 'w-12 bg-[#FFD700]' : 'w-3 bg-zinc-400'}`} />
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default ProductShow;