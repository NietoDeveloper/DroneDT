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
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchDrones = useCallback(async () => {
    setLoading(true);
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const baseUrl = isLocal ? 'http://127.0.0.1:5000/api/v1' : process.env.NEXT_PUBLIC_API_URL;
    const fullUrl = `${baseUrl}/products?category=drone`;
    
    try {
      const response = await fetch(fullUrl);
      const result = await response.json();
      let rawData = result.data?.products || result.data || result;

      if (Array.isArray(rawData) && rawData.length > 0) {
        const formatted = rawData.map((item: any) => ({
          id: item._id || item.id,
          name: item.name || "DRONE DT MODEL",
          price: item.price ? `Desde $${Number(item.price).toLocaleString()}` : 'Contactar Ventas',
          tag: item.category?.name || 'Pro Series',
          img: item.imageUrl || (item.images?.[0]?.url || item.images?.[0] || '/drone-placeholder.png')
        }));
        setDrones(formatted);
      } else {
        throw new Error("Empty DB");
      }
    } catch (err) {
      const fallbackDrones = [
        { id: 'fb-1', name: 'Mavic 3 Pro DT', price: 'Desde $14,500,000', tag: 'Aeroespacial', img: '/drone-placeholder.png' },
        { id: 'fb-2', name: 'Matrice 300 DT', price: 'Desde $45,000,000', tag: 'Industrial', img: '/drone-placeholder.png' },
        { id: 'fb-3', name: 'Air 3 DT Edition', price: 'Desde $8,900,000', tag: 'Cinematográfico', img: '/drone-placeholder.png' },
        { id: 'fb-4', name: 'Mini 4 Pro DT', price: 'Desde $5,200,000', tag: 'Ultra Light', img: '/drone-placeholder.png' },
        { id: 'fb-5', name: 'Inspire 3 DT', price: 'Desde $62,000,000', tag: 'Cine Pro', img: '/drone-placeholder.png' },
      ];
      setDrones(fallbackDrones);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDrones();
  }, [fetchDrones]);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (drones.length > 1) {
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev === drones.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [currentIndex, drones]);

  if (loading) return null;

  return (
    <section className="relative w-full h-screen md:h-[90vh] bg-[#DCDCDC] overflow-hidden flex items-center px-4 md:px-10">
      <div 
        className="flex h-[85vh] transition-transform duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ 
          transform: `translateX(-${currentIndex * (100 / drones.length)}%)`,
          width: `${drones.length * 100}%` 
        }}
      >
        {drones.map((drone) => (
          <div 
            key={drone.id} 
            className="h-full flex-shrink-0 w-full px-2 md:px-4"
            style={{ width: `${100 / drones.length}%` }}
          >
            {/* TARJETA CON BORDER RADIUS */}
            <div className="flex flex-col md:flex-row h-full w-full overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-2xl">
              
              {/* 80% VISUAL: IMAGEN (Reducida con padding extra) */}
              <div className="w-full md:w-[75%] h-[50%] md:h-full bg-[#F9F9F9] relative flex items-center justify-center p-12 md:p-24 overflow-hidden">
                <div className="relative w-full h-full transform transition-transform duration-1000 hover:scale-105">
                  <Image 
                    src={drone.img} 
                    alt={drone.name} 
                    fill 
                    className="object-contain drop-shadow-[0_15px_40px_rgba(0,0,0,0.15)] p-4 md:p-8" 
                    priority 
                  />
                </div>
                <div className="absolute top-8 left-8">
                  <span className="text-[9px] font-black tracking-[0.4em] text-zinc-400 uppercase border-l-2 border-[#FFD700] pl-4">
                    {drone.tag} // ATLAS SYNC
                  </span>
                </div>
              </div>

              {/* 20% VISUAL: INFO (Con padding y espacio respirable) */}
              <div className="w-full md:w-[25%] h-[50%] md:h-full bg-white flex flex-col justify-center p-10 md:p-14 border-l border-zinc-50">
                <div className="space-y-2">
                  <h3 className="text-4xl md:text-5xl font-black uppercase leading-[0.85] tracking-tighter text-black">
                    {drone.name.split(' ').map((word, i) => (
                      <span key={i} className={word.toUpperCase() === 'DT' ? 'text-[#FFD700] italic block' : 'block'}>
                        {word}
                      </span>
                    ))}
                  </h3>
                  <p className="text-base md:text-lg font-bold text-zinc-400 tracking-tighter pb-8">
                    {drone.price}
                  </p>
                </div>

                <div className="flex flex-col gap-4 mt-4">
                  <Link 
                    href={`/shop/product/${drone.id}`} 
                    className="w-full h-14 md:h-16 flex items-center justify-center bg-blue-700 text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#FFD700] hover:text-black hover:-translate-y-1 shadow-lg rounded-sm"
                  >
                    Ordenar Ahora
                  </Link>
                  
                  <Link 
                    href="/services" 
                    className="w-full h-14 md:h-16 flex items-center justify-center border-2 border-blue-700 text-blue-700 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#FFD700] hover:border-[#FFD700] hover:text-black hover:-translate-y-1 rounded-sm"
                  >
                    Ficha Técnica
                  </Link>
                </div>

                {/* Progress Bar */}
                <div className="mt-12 w-full bg-zinc-100 h-[2px] relative">
                  <div 
                    className="absolute top-0 left-0 h-full bg-blue-700 transition-all duration-700"
                    style={{ width: `${((currentIndex + 1) / drones.length) * 100}%` }}
                  />
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* INDICADORES INFERIORES */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-40">
        {drones.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1 transition-all duration-700 rounded-full ${currentIndex === idx ? 'w-12 bg-black' : 'w-4 bg-zinc-400'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductShow;