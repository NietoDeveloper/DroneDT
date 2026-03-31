"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import { useProductStore } from '@/store/useProductStore';

/**
 * ARCHITECT: Manuel Nieto | Nieto Laboratory
 * COMPONENT: ProductShow v3.0 - Ultra High Availability
 * ESTRATEGIA: Zustand Persist + SWR Bridge + Re-mount on Focus
 */

const ProductSkeleton = () => (
  <div className="h-screen w-full bg-white flex flex-col animate-pulse">
    <div className="w-full h-[55%] md:h-[65%] flex items-center justify-center">
      <div className="w-64 h-40 md:w-96 md:h-60 bg-zinc-100 rounded-full blur-3xl opacity-60" />
    </div>
    <div className="w-full h-[45%] md:h-[35%] flex flex-col items-center px-6 pt-10 md:pt-0">
      <div className="h-10 w-64 bg-zinc-100 mb-6 rounded-md" />
      <div className="h-4 w-32 bg-zinc-50 mb-8 rounded-md" />
      <div className="flex flex-col md:flex-row gap-3 w-full max-w-[260px] md:max-w-xl justify-center">
        <div className="w-full md:w-52 h-12 bg-zinc-100 rounded-sm" />
        <div className="w-full md:w-52 h-12 bg-zinc-100 rounded-sm" />
      </div>
    </div>
  </div>
);

const fetcher = (url: string) => fetch(url).then(res => res.json());

const ProductShow = () => {
  const baseUrl = '/api/v1';
  
  // 1. CONEXIÓN AL VAULT (Zustand)
  const { drones: storedDrones, setDrones, lastSync } = useProductStore();
  
  // 2. ESTADOS DE CONTROL DE FLUJO
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isMounted, setIsMounted] = useState(false); // Evita errores de hidratación
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 3. SWR PARA ACTUALIZACIÓN SILENCIOSA
  const { data: result, isLoading } = useSWR(`${baseUrl}/products/menu`, fetcher, {
    revalidateOnFocus: true,
    revalidateIfStale: true,
    dedupingInterval: 30000,
    onSuccess: (data) => {
      if (data?.success) setDrones(data.data);
    }
  });

  // 4. HIDRATACIÓN SEGURA
  useEffect(() => {
    setIsMounted(true);
    // Forzar limpieza de cualquier timer huérfano al montar
    return () => { if (timeoutRef.current) clearInterval(timeoutRef.current); };
  }, []);

  // 5. SELECCIÓN DE DATA RESILIENTE (Prioridad Absoluta al Store si SWR falla)
  const drones = useMemo(() => {
    const rawData = result?.data || storedDrones;
    if (!rawData || !Array.isArray(rawData) || rawData.length === 0) return [];

    return rawData.map((item: any) => {
      const rawName = (item.name || "").toUpperCase();
      let finalImgPath = '/drone-placeholder.png'; 

      if (rawName.includes("BIG_C1PRO8")) finalImgPath = "/DT-BIG_C1PRO8.png";
      else if (rawName.includes("MID_B1PRO5")) finalImgPath = "/DT-MID_B1PRO5.png";
      else if (rawName.includes("MID_B2PRO8")) finalImgPath = "/DT-MID_B2PRO8.png";
      else if (rawName.includes("MINI_A1PRO4")) finalImgPath = "/DT-MINI_A1PRO4.png";
      else if (rawName.includes("MINI_A2PRO5")) finalImgPath = "/DT-MINI_A2PRO5.png";

      return {
        id: item._id?.$oid || item._id || item.id || Math.random().toString(),
        name: rawName.replace(/_/g, ' '), 
        price: typeof item.price === 'number' ? `$${item.price.toLocaleString()}` : (item.price?.toUpperCase() || 'CONTACTAR'),
        tag: (item.category || 'PRO SERIES').toUpperCase(),
        img: finalImgPath
      };
    });
  }, [result, storedDrones]);

  const extendedDrones = useMemo(() => 
    drones.length > 0 ? [drones[drones.length - 1], ...drones, drones[0]] : [],
  [drones]);

  // 6. LÓGICA DE CARRUSEL PROTEGIDA
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
      if (timeoutRef.current) clearInterval(timeoutRef.current);
      timeoutRef.current = setInterval(() => { 
        setCurrentIndex((prev) => prev + 1); 
      }, 5000);
    }
    return () => { if (timeoutRef.current) clearInterval(timeoutRef.current); };
  }, [drones.length, isTransitioning]);

  // 🛡️ CONTROL DE RENDERIZADO
  if (!isMounted) return <ProductSkeleton />;
  if (isLoading && drones.length === 0) return <ProductSkeleton />;
  if (drones.length === 0) return null;

  return (
    <div className="bg-white w-full h-full flex flex-col relative z-30 overflow-hidden">
      <section className="relative w-full flex-grow overflow-hidden">
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
              <div className="flex flex-col h-full w-full bg-white">
                <div className="w-full h-[55%] md:h-[65%] relative flex items-start justify-center p-0 overflow-hidden">
                  <div className="relative w-full h-full transform scale-110 md:scale-115 transition-transform duration-1000 -mt-2 md:mt-0">
                    <Image 
                      src={drone.img} 
                      alt={drone.name} 
                      fill 
                      className="object-contain object-top md:object-center drop-shadow-2xl" 
                      priority={idx === currentIndex}
                      unoptimized 
                    />
                  </div>
                </div>

                <div className="w-full h-[45%] md:h-[35%] flex flex-col justify-start md:justify-center items-center bg-white z-10 px-6 pt-5 md:pt-0 text-center">
                  <div className="mb-4 md:mb-5">
                    <h3 className="text-3xl md:text-3xl lg:text-4xl font-black uppercase italic leading-none tracking-tighter flex flex-wrap justify-center gap-x-3">
                      {drone.name.split(' ').map((word: string, i: number) => (
                        <span key={i} className={word === 'DT' ? 'text-[#FFD700]' : 'text-[#0000FF]'}>{word}</span>
                      ))}
                    </h3>
                    <div className="mt-2 md:mt-2 flex flex-col items-center">
                      <p className="text-[8px] md:text-[9px] font-bold text-zinc-400 tracking-[0.4em] uppercase">AVIACIÓN CIVIL DT</p>
                      <p className="text-2xl md:text-2xl lg:text-3xl font-black text-[#0000FF] mt-1">{drone.price}</p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-3 w-full max-w-[260px] md:max-w-xl mx-auto items-center justify-center">
                    <Link href={`/shop/checkout/${drone.id}`} 
                      className="w-full md:w-52 h-12 md:h-13 bg-[#FFD700] border-2 border-[#FFD700] hover:bg-[#0000FF] hover:border-[#0000FF] text-black hover:text-white flex items-center justify-center text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-md">
                      ORDENAR
                    </Link>
                    <Link href={`/shop/product/${drone.id}`} 
                      className="w-full md:w-52 h-12 md:h-13 bg-transparent border-2 border-[#FFD700] hover:bg-[#0000FF] hover:border-[#0000FF] text-black hover:text-white flex items-center justify-center text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300">
                      FICHA TÉCNICA
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NAVEGACIÓN */}
      <div className="w-full h-8 md:h-10 flex justify-center items-center bg-white shrink-0 relative z-50 -translate-y-2.5 md:translate-y-0">
        <div className="flex gap-3">
          {drones.map((_: any, idx: number) => {
            const isActive = (currentIndex === 0 ? drones.length - 1 : currentIndex === drones.length + 1 ? 0 : currentIndex - 1) === idx;
            return (
              <button key={idx} 
                onClick={() => { if (timeoutRef.current) clearInterval(timeoutRef.current); setIsTransitioning(true); setCurrentIndex(idx + 1); }}
                className="py-1"
              >
                <div className={`h-1 transition-all duration-500 rounded-full ${isActive ? 'w-10 bg-[#FFD700]' : 'w-3 bg-zinc-200 hover:bg-[#0000FF]'}`} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductShow;