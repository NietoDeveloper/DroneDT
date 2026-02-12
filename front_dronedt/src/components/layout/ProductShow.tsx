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

  if (loading) return <div className="h-screen bg-white flex items-center justify-center font-black text-[#0000FF] text-2xl tracking-[0.2em]">CONECTANDO UPLINK DT...</div>;
  if (drones.length === 0) return null;

  return (
    <div className="bg-white w-full h-full flex flex-col relative z-30 overflow-hidden">
      
      <section className="relative w-full h-[85%] overflow-hidden">
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
                
                {/* LADO IZQUIERDO: FOTO (ORIGINAL INTACTA) */}
                <div className="w-full md:w-1/2 h-[50%] md:h-full bg-white relative flex items-start justify-center overflow-hidden border-r border-zinc-100">
                  <div className="relative w-full h-full transform scale-110 md:scale-[1.4] transition-transform duration-700 origin-top">
                    <Image 
                      src={drone.img} 
                      alt={drone.name} 
                      fill 
                      className="object-contain object-top drop-shadow-[0_30px_50px_rgba(0,0,0,0.1)]" 
                      priority 
                      unoptimized 
                    />
                  </div>
                  <div className="absolute top-12 left-10 hidden md:block">
                    <p className="text-[#0000FF] font-black tracking-[0.3em] text-sm border-l-4 border-[#FFD700] pl-4 uppercase">{drone.tag}</p>
                  </div>
                </div>

                {/* LADO DERECHO: INFO (BAJADO 20px EXTRA) */}
                <div className="w-full md:w-1/2 h-[50%] md:h-full flex flex-col justify-center p-8 md:p-20 lg:p-24 bg-white mt-5"> {/* mt-5 para bajar el componente 20px */}
                  <div className="space-y-4 mb-10">
                    <h3 className="text-5xl md:text-7xl lg:text-[90px] font-black uppercase italic leading-[0.85] tracking-tighter">
                      {drone.name.split(' ').map((word, i) => (
                        <span key={i} className={word === 'DT' ? 'text-[#FFD700] block' : 'text-[#0000FF] block'}>{word}</span>
                      ))}
                    </h3>
                    <div className="pt-4">
                      <p className="text-[10px] font-bold text-zinc-400 tracking-[0.5em] uppercase mb-2">INGENIERÍA AEROSPACIAL</p>
                      <p className="text-4xl md:text-6xl font-black text-[#0000FF]">{drone.price}</p>
                    </div>
                  </div>

                  {/* BOTONES: GOLD CON HOVER BLUE */}
                  <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
                    <Link href={`/shop/checkout/${drone.id}`} className="flex-1 h-16 md:h-20 bg-[#FFD700] hover:bg-[#0000FF] text-black hover:text-white flex items-center justify-center text-sm font-black uppercase tracking-[0.2em] transition-all duration-300 rounded-sm">
                      COMPRAR
                    </Link>
                    <Link href={`/shop/product/${drone.id}`} className="flex-1 h-16 md:h-20 border-4 border-black hover:border-[#0000FF] hover:text-[#0000FF] flex items-center justify-center text-black text-sm font-black uppercase tracking-[0.2em] transition-all duration-300 rounded-sm">
                      FICHA TÉCNICA
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 15% NAVEGACIÓN (DOTS BAJADOS) */}
      <div className="w-full h-[15%] flex justify-center items-start bg-white border-t border-zinc-100 pt-8">
        <div className="flex gap-4">
          {drones.map((_, idx) => {
            const isActive = (currentIndex === 0 ? drones.length - 1 : currentIndex === drones.length + 1 ? 0 : currentIndex - 1) === idx;
            return (
              <button key={idx} onClick={() => { if (timeoutRef.current) clearInterval(timeoutRef.current); setIsTransitioning(true); setCurrentIndex(idx + 1); }}>
                <div className={`h-1.5 transition-all duration-500 rounded-full ${isActive ? 'w-20 bg-[#FFD700]' : 'w-5 bg-zinc-200'}`} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductShow;