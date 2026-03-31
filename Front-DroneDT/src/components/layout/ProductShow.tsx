"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import { useProductStore } from '@/store/useProductStore';

/**
 * ARCHITECT: Manuel Nieto | Nieto Laboratory
 * COMPONENT: ProductShow v4.0 - Absolute Resiliency
 * ESTRATEGIA: Capas Absolutas + Visibility API Guard (No more white screens)
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
  const { drones: storedDrones, setDrones } = useProductStore();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. SWR BRIDGE
  const { data: result, isLoading } = useSWR(`${baseUrl}/products/menu`, fetcher, {
    revalidateOnFocus: true,
    onSuccess: (data) => { if (data?.success) setDrones(data.data); }
  });

  // 2. DETECTOR DE VISIBILIDAD (Para pausar/reanudar el motor)
  useEffect(() => {
    const handleVisibility = () => setIsVisible(!document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    setIsMounted(true);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // 3. SELECCIÓN DE DATA (Mantenemos tu lógica de imágenes)
  const drones = useMemo(() => {
    const rawData = result?.data || storedDrones;
    if (!rawData || !Array.isArray(rawData)) return [];

    return rawData.map((item: any) => {
      const rawName = (item.name || "").toUpperCase();
      let img = '/drone-placeholder.png'; 
      if (rawName.includes("BIG_C1PRO8")) img = "/DT-BIG_C1PRO8.png";
      else if (rawName.includes("MID_B1PRO5")) img = "/DT-MID_B1PRO5.png";
      else if (rawName.includes("MID_B2PRO8")) img = "/DT-MID_B2PRO8.png";
      else if (rawName.includes("MINI_A1PRO4")) img = "/DT-MINI_A1PRO4.png";
      else if (rawName.includes("MINI_A2PRO5")) img = "/DT-MINI_A2PRO5.png";

      return {
        id: item._id?.$oid || item._id || item.id || Math.random().toString(),
        name: rawName.replace(/_/g, ' '), 
        price: typeof item.price === 'number' ? `$${item.price.toLocaleString()}` : (item.price?.toUpperCase() || 'CONTACTAR'),
        img
      };
    });
  }, [result, storedDrones]);

  // 4. MOTOR DE ANIMACIÓN ROBUSTO
  useEffect(() => {
    if (drones.length > 1 && isVisible) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % drones.length);
      }, 5000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [drones.length, isVisible]);

  if (!isMounted || (isLoading && drones.length === 0)) return <ProductSkeleton />;
  if (drones.length === 0) return null;

  return (
    <div className="bg-white w-full h-full flex flex-col relative z-30 overflow-hidden">
      <section className="relative w-full flex-grow overflow-hidden">
        {drones.map((drone, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div 
              key={drone.id} 
              className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out transform
                ${isActive ? 'opacity-100 translate-x-0 z-20' : 'opacity-0 translate-x-12 z-10 pointer-events-none'}`}
            >
              <div className="flex flex-col h-full w-full bg-white">
                {/* ÁREA DE IMAGEN */}
                <div className="w-full h-[55%] md:h-[65%] relative flex items-start justify-center p-0 overflow-hidden">
                  <div className={`relative w-full h-full transition-transform duration-[2000ms] ${isActive ? 'scale-110 md:scale-115' : 'scale-100'}`}>
                    <Image 
                      src={drone.img} 
                      alt={drone.name} 
                      fill 
                      className="object-contain object-top md:object-center drop-shadow-2xl" 
                      priority={idx === 0}
                      unoptimized 
                    />
                  </div>
                </div>

                {/* ÁREA DE TEXTO */}
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
          );
        })}
      </section>

      {/* INDICADORES (DOTS) */}
      <div className="w-full h-8 md:h-10 flex justify-center items-center bg-white shrink-0 relative z-50">
        <div className="flex gap-3">
          {drones.map((_, idx) => (
            <button key={idx} 
              onClick={() => {
                if (timerRef.current) clearInterval(timerRef.current);
                setCurrentIndex(idx);
              }}
              className="py-1"
            >
              <div className={`h-1 transition-all duration-500 rounded-full ${currentIndex === idx ? 'w-10 bg-[#FFD700]' : 'w-3 bg-zinc-200'}`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductShow;