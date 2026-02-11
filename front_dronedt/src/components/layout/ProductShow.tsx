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
      const response = await fetch(fullUrl, { 
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const result = await response.json();
      let rawData = result.data?.products || result.data || result;

      if (!Array.isArray(rawData)) rawData = [];

      if (rawData.length > 0) {
        const formatted = rawData.map((item: any) => ({
          id: item._id || item.id,
          name: item.name || "DRONE DT MODEL",
          price: item.price ? `Desde $${Number(item.price).toLocaleString()}` : 'Contactar Ventas',
          tag: item.category?.name || 'Pro Series',
          img: item.imageUrl || (item.images?.[0]?.url || item.images?.[0] || '/drone-placeholder.png')
        }));
        setDrones(formatted);
      } else {
        throw new Error("Empty Array");
      }
    } catch (err: any) {
      console.warn("⚠️ Atlas Sync Fallback:", err.message);
      setDrones([{
        id: 'fallback-1',
        name: 'Mini A2-Pro5 DT',
        price: 'Desde $14,500,000',
        tag: 'Insígnia',
        img: '/drone-placeholder.png'
      }]);
    } finally {
      setLoading(false);
    }
  }, []);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    fetchDrones();
  }, [fetchDrones]);

  useEffect(() => {
    resetTimeout();
    if (drones.length > 1) {
      timeoutRef.current = setTimeout(
        () => setCurrentIndex((prevIndex) => (prevIndex === drones.length - 1 ? 0 : prevIndex + 1)),
        5000 
      );
    }
    return () => resetTimeout();
  }, [currentIndex, drones]);

  if (loading) {
    return (
      <div className="h-[60vh] w-full bg-white flex flex-col items-center justify-center">
        <div className="w-12 h-[2px] bg-[#FFD700] animate-pulse mb-4" />
        <p className="text-black font-black text-[10px] tracking-[0.4em] uppercase">Sincronizando Atlas</p>
      </div>
    );
  }

  return (
    <section className="relative w-full bg-[#DCDCDC] py-12 md:py-20">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Header con Navegación */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[10px] font-black tracking-[0.4em] text-blue-600 uppercase block mb-2">Sistemas de Vuelo</span>
            <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter uppercase leading-none">
              Nuestra <span className="text-white drop-shadow-sm">Flota</span>
            </h2>
          </div>
          
          <div className="flex gap-2 pb-2">
            {drones.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1 transition-all duration-500 rounded-full ${currentIndex === idx ? 'w-12 bg-blue-600' : 'w-4 bg-gray-400'}`}
              />
            ))}
          </div>
        </div>

        {/* Carrusel */}
        <div className="relative w-full overflow-hidden rounded-xl shadow-2xl">
          <div 
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {drones.map((drone) => (
              <div key={drone.id} className="w-full flex-shrink-0">
                <div className="bg-white flex flex-col md:flex-row min-h-[500px] md:h-[600px]">
                  
                  {/* Imagen del Drone */}
                  <div className="w-full md:w-[60%] bg-[#F5F5F5] relative p-8 flex items-center justify-center group overflow-hidden">
                    <div className="relative w-full h-64 md:h-[80%] transition-transform duration-700 group-hover:scale-110">
                      <Image 
                        src={drone.img} 
                        alt={drone.name} 
                        fill 
                        className="object-contain drop-shadow-2xl"
                        priority
                      />
                    </div>
                    <div className="absolute top-8 left-8">
                      <p className="text-[10px] font-black tracking-[0.3em] text-zinc-400 uppercase border-l-2 border-[#FFD700] pl-3">
                        {drone.tag}
                      </p>
                    </div>
                  </div>

                  {/* Info y Botones (Azul CSS y Hover Gold) */}
                  <div className="w-full md:w-[40%] p-8 md:p-12 flex flex-col justify-center">
                    <h3 className="text-4xl md:text-6xl font-black text-black uppercase leading-[0.9] mb-4 tracking-tighter">
                      {drone.name.split(' ').map((word, i) => (
                        <span key={i} className={word.toUpperCase() === 'DT' ? 'text-[#FFD700] italic' : ''}>
                          {word}{' '}
                        </span>
                      ))}
                    </h3>
                    <p className="text-xl md:text-2xl text-zinc-400 font-bold mb-10 tracking-tight">
                      {drone.price}
                    </p>

                    <div className="flex flex-col gap-4">
                      {/* Botón Azul - Hover Gold Flotante */}
                      <Link
                        href={`/shop/product/${drone.id}`}
                        className="w-full h-16 flex items-center justify-center bg-blue-700 text-white text-[12px] font-black uppercase tracking-widest transition-all duration-300 hover:bg-[#FFD700] hover:text-black hover:-translate-y-2 shadow-lg"
                      >
                        Ordenar Ahora
                      </Link>
                      
                      {/* Botón Outline - Hover Gold Flotante */}
                      <Link
                        href="/services"
                        className="w-full h-16 flex items-center justify-center border-2 border-blue-700 text-blue-700 text-[12px] font-black uppercase tracking-widest transition-all duration-300 hover:border-[#FFD700] hover:bg-[#FFD700] hover:text-black hover:-translate-y-2"
                      >
                        Ficha Técnica
                      </Link>
                    </div>

                    <div className="mt-12 flex items-center gap-3 pt-6 border-t border-zinc-100">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                        Atlas Sync • Bogotá Hub
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShow;