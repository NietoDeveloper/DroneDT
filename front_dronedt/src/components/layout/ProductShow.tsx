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
    <div className="bg-[#DCDCDC] overflow-hidden w-full">
      {/* SECCIÓN PRINCIPAL: h-[92vh] es el contenedor */}
      <section className="relative w-full h-[85vh] md:h-[92vh] flex flex-col items-center justify-start z-10">
        <div className="relative w-full max-w-[1900px] overflow-hidden h-full">
          <div 
            className={`flex h-full ${isTransitioning ? 'transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]' : ''}`}
            onTransitionEnd={handleTransitionEnd}
            style={{ 
              transform: `translateX(-${currentIndex * (100 / (extendedDrones.length || 1))}%)`,
              width: `${extendedDrones.length * 100}%` 
            }}
          >
            {extendedDrones.map((drone, idx) => (
              <div key={`${drone.id}-${idx}`} className="h-full flex-shrink-0 w-full px-0 sm:px-4 md:px-8" style={{ width: `${100 / extendedDrones.length}%` }}>
                
                {/* LA TARJETA: Ahora tiene h-full para estirarse hasta abajo */}
                <div className="flex flex-col md:flex-row h-full w-full overflow-hidden sm:rounded-b-[2.5rem] md:rounded-b-[4.5rem] shadow-2xl bg-white">
                  
                  {/* FOTO: Scale 1.7 y h-full */}
                  <div className="w-full md:w-1/2 h-[50%] md:h-full bg-zinc-50 relative flex items-start justify-center overflow-hidden border-b md:border-b-0 md:border-r border-zinc-100">
                    <div className="relative w-full h-full transform scale-125 sm:scale-150 lg:scale-[1.75] transition-transform duration-700 origin-top">
                      <Image 
                        src={drone.img} 
                        alt={drone.name} 
                        fill 
                        className="object-contain object-top drop-shadow-[0_40px_60px_rgba(0,0,0,0.2)]" 
                        priority 
                        unoptimized 
                      />
                    </div>
                    <div className="absolute top-8 left-8 z-20">
                      <span className="text-[10px] md:text-[15px] font-black tracking-[0.4em] text-[#0000FF] uppercase border-l-4 border-[#FFD700] pl-4 bg-white/70 backdrop-blur-md py-1.5">
                        {drone.tag}
                      </span>
                    </div>
                  </div>

                  {/* INFO Y BOTONES: justify-between y h-full para empujar los botones al fondo */}
                  <div className="w-full md:w-1/2 h-[50%] md:h-full flex flex-col justify-between p-8 sm:p-12 md:p-16 lg:p-24 bg-white">
                    <div className="space-y-6 md:space-y-12 pt-4">
                      <h3 className="text-4xl sm:text-6xl md:text-[70px] lg:text-[100px] xl:text-[120px] font-black uppercase italic leading-[0.8] tracking-tighter">
                        {drone.name.split(' ').map((word, i) => (
                          <span key={i} className={word === 'DT' ? 'text-[#FFD700] block' : 'text-[#0000FF] block'}>{word}</span>
                        ))}
                      </h3>
                      <div>
                        <p className="text-[11px] md:text-sm font-bold text-zinc-400 tracking-[0.4em] uppercase">SOFTWARE DT PRODUCTION</p>
                        <p className="text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-black text-[#0000FF] mt-2">
                          {drone.price}
                        </p>
                      </div>
                    </div>

                    {/* BOTONES: h-32 en desktop para rellenar el final de la tarjeta */}
                    <div className="flex flex-col sm:flex-row gap-5 mb-4 md:mb-10">
                      <Link href={`/shop/checkout/${drone.id}`} className="group relative flex-1 h-20 md:h-24 lg:h-32 flex items-center justify-center bg-[#FFD700] text-black text-xl md:text-2xl font-black uppercase tracking-[0.2em] rounded-[4px] overflow-hidden transition-all shadow-xl">
                        <span className="relative z-10 group-hover:text-white transition-colors">COMPRAR</span>
                        <div className="absolute inset-0 bg-[#0000FF] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                      </Link>
                      <Link href={`/shop/product/${drone.id}`} className="group relative flex-1 h-20 md:h-24 lg:h-32 flex items-center justify-center bg-transparent border-[4px] border-[#FFD700] text-black text-xl md:text-2xl font-black rounded-[4px] overflow-hidden">
                        <span className="relative z-10 group-hover:text-white transition-colors">SPECS</span>
                        <div className="absolute inset-0 bg-[#0000FF] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOTS: pb-[5px] para quedar justo encima del cambio de sección */}
      <div className="w-full flex flex-col items-center bg-[#DCDCDC] pt-4 pb-[5px]">
        <div className="flex gap-4 md:gap-6">
          {drones.map((_, idx) => {
            const isActive = (currentIndex === 0 ? drones.length - 1 : currentIndex === drones.length + 1 ? 0 : currentIndex - 1) === idx;
            return (
              <button key={idx} onClick={() => { if (timeoutRef.current) clearInterval(timeoutRef.current); setIsTransitioning(true); setCurrentIndex(idx + 1); }}>
                <div className={`h-2 transition-all duration-500 rounded-full ${isActive ? 'w-16 md:w-32 bg-[#FFD700]' : 'w-5 bg-zinc-400'}`} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductShow;