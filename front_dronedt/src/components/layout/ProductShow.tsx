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
    <div className="bg-white w-full h-full flex flex-col relative z-30">
      
      {/* SECCIÓN SLIDER: h-[85%] para dejar 15% fijo a los dots */}
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
                
                {/* FOTO: Ahora ocupa el 60% del ancho y escala mejor */}
                <div className="w-full md:w-[60%] h-[55%] md:h-full relative flex items-center justify-center p-8 md:p-12">
                  <div className="relative w-full h-full transform md:scale-110 transition-transform duration-700">
                    <Image 
                      src={drone.img} 
                      alt={drone.name} 
                      fill 
                      className="object-contain drop-shadow-2xl" 
                      priority 
                      unoptimized 
                    />
                  </div>
                </div>

                {/* INFO: Reducida para asegurar visibilidad de botones */}
                <div className="w-full md:w-[40%] h-[45%] md:h-full flex flex-col justify-center px-8 md:px-12 bg-white">
                  <div className="space-y-2 mb-6">
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase italic leading-none tracking-tighter">
                      {drone.name.split(' ').map((word, i) => (
                        <span key={i} className={word === 'DT' ? 'text-[#FFD700] block' : 'text-[#0000FF] block'}>{word}</span>
                      ))}
                    </h3>
                    <div className="pt-2">
                      <p className="text-[8px] font-bold text-zinc-400 tracking-[0.4em] uppercase">INGENIERÍA AEROSPACIAL</p>
                      <p className="text-3xl md:text-4xl font-black text-[#0000FF]">{drone.price}</p>
                    </div>
                  </div>

                  {/* BOTONES: h-20 (más compactos pero robustos) */}
                  <div className="flex flex-col gap-3 w-full max-w-sm">
                    <Link href={`/shop/checkout/${drone.id}`} className="h-16 md:h-20 bg-[#FFD700] hover:bg-[#0000FF] text-black hover:text-white flex items-center justify-center text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300">
                      COMPRAR
                    </Link>
                    <Link href={`/shop/product/${drone.id}`} className="h-16 md:h-20 border-2 border-black hover:border-[#0000FF] hover:text-[#0000FF] flex items-center justify-center text-black text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300">
                      FICHA TÉCNICA
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ÁREA DOTS: 15% fijo y visible */}
      <div className="w-full h-[15%] flex justify-center items-center bg-white border-t border-zinc-50">
        <div className="flex gap-3">
          {drones.map((_, idx) => {
            const isActive = (currentIndex === 0 ? drones.length - 1 : currentIndex === drones.length + 1 ? 0 : currentIndex - 1) === idx;
            return (
              <button key={idx} onClick={() => { if (timeoutRef.current) clearInterval(timeoutRef.current); setIsTransitioning(true); setCurrentIndex(idx + 1); }}>
                <div className={`h-1.5 transition-all duration-500 rounded-full ${isActive ? 'w-16 bg-[#FFD700]' : 'w-4 bg-zinc-200'}`} />
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default ProductShow;