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
    <div className="bg-[#DCDCDC] overflow-hidden">
      {/* SECCIÓN PRINCIPAL: Altura dinámica para evitar huecos abajo */}
      <section className="relative w-full min-h-[70vh] lg:h-[85vh] flex flex-col items-center justify-start snap-start snap-always z-10">
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
                <div className="flex flex-col md:flex-row h-full w-full overflow-hidden sm:rounded-b-[2rem] md:rounded-b-[3.5rem] shadow-2xl bg-white border-t-0">
                  
                  {/* Contenedor Imagen: Escala mejorada para pantallas de 1900px */}
                  <div className="w-full md:w-1/2 h-[40vh] md:h-auto min-h-[300px] bg-zinc-50 relative flex items-start justify-center overflow-hidden">
                    <div className="relative w-full h-full transform scale-105 sm:scale-110 lg:scale-125 transition-transform duration-700 origin-top">
                      <Image 
                        src={drone.img} 
                        alt={drone.name} 
                        fill 
                        className="object-contain object-top drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] p-4 md:p-0" 
                        priority 
                        unoptimized 
                      />
                    </div>
                    <div className="absolute top-6 left-6 md:top-10 md:left-10 z-20">
                      <span className="text-[10px] md:text-[14px] font-black tracking-[0.3em] text-[#0000FF] uppercase border-l-4 border-[#FFD700] pl-4 bg-white/60 backdrop-blur-sm py-1">
                        {drone.tag}
                      </span>
                    </div>
                  </div>

                  {/* Contenedor Info: Ajuste de padding para pantallas grandes */}
                  <div className="w-full md:w-1/2 flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-24 bg-white">
                    <div className="space-y-4 md:space-y-8 lg:space-y-12 pt-2 md:pt-4">
                      <h3 className="text-3xl sm:text-5xl md:text-[50px] lg:text-[80px] xl:text-[95px] font-black uppercase italic leading-[0.85] tracking-tighter">
                        {drone.name.split(' ').map((word, i) => (
                          <span key={i} className={word === 'DT' ? 'text-[#FFD700] block' : 'text-[#0000FF] block'}>{word}</span>
                        ))}
                      </h3>
                      <div>
                        <p className="text-[10px] md:text-sm font-bold text-zinc-400 tracking-[0.3em] uppercase">INGENIERÍA SOFTWARE DT</p>
                        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#0000FF] mt-2">
                          {drone.price}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-8 md:mt-12 lg:mt-20">
                      <Link href={`/shop/checkout/${drone.id}`} className="group relative flex-1 h-14 md:h-20 flex items-center justify-center bg-[#FFD700] text-black text-[13px] md:text-[16px] font-black uppercase tracking-[0.2em] rounded-[4px] overflow-hidden transition-all active:scale-95 shadow-lg border-2 border-[#FFD700]">
                        <span className="relative z-10 group-hover:text-white transition-colors duration-300">COMPRAR</span>
                        <div className="absolute inset-0 bg-[#0000FF] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                      </Link>
                      <Link href={`/shop/product/${drone.id}`} className="group relative flex-1 h-14 md:h-20 flex items-center justify-center bg-transparent border-[3px] border-[#FFD700] text-black text-[13px] md:text-[16px] font-black uppercase tracking-[0.2em] rounded-[4px] overflow-hidden transition-all active:scale-95">
                        <span className="relative z-10 group-hover:text-white transition-colors duration-300">INFO TÉCNICA</span>
                        <div className="absolute inset-0 bg-[#0000FF] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ÁREA DE CONTROL: Dots ajustados para cerrar el componente sin espacio muerto */}
      <div className="w-full flex flex-col items-center bg-[#DCDCDC] pt-6 pb-12 snap-start">
        <div className="flex gap-3 md:gap-4 z-[60]">
          {drones.map((_, idx) => {
            const isActive = (currentIndex === 0 ? drones.length - 1 : currentIndex === drones.length + 1 ? 0 : currentIndex - 1) === idx;
            return (
              <button 
                key={idx} 
                onClick={() => { if (timeoutRef.current) clearInterval(timeoutRef.current); setIsTransitioning(true); setCurrentIndex(idx + 1); }} 
                className="py-2 focus:outline-none"
              >
                <div className={`h-1.5 md:h-2 transition-all duration-500 rounded-full ${isActive ? 'w-12 md:w-20 bg-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.6)]' : 'w-4 bg-zinc-400'}`} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductShow;