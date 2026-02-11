"use client";

import { useState, useEffect, useCallback } from 'react';
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
  const [error, setError] = useState<string | null>(null);

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
      
      // LOGICA DE EXTRACCIÓN MEJORADA: 
      // Basado en tus logs, la data viene en result.data o result.data.products
      let rawData = result.data?.products || result.data || result;

      // Si por alguna razón no es un array, intentamos convertirlo o usamos fallback
      if (!Array.isArray(rawData)) {
        rawData = [];
      }

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
      console.warn("⚠️ Atlas Sync Fallback Activated:", err.message);
      // FALLBACK: Si falla Atlas, mostramos el modelo insignia para no dejar la pantalla vacía
      setDrones([{
        id: 'fallback-1',
        name: 'Mini A2-Pro5 DT',
        price: 'Desde $14,500,000',
        tag: 'Insígnia',
        img: '/drone-placeholder.png' // Asegúrate de tener esta imagen o cámbiala por una válida
      }]);
      setError("Visualizando catálogo local.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDrones();
  }, [fetchDrones]);

  if (loading) {
    return (
      <div className="h-[40vh] bg-white flex flex-col items-center justify-center border-t border-zinc-100">
        <div className="w-12 h-[2px] bg-[#FFD700] animate-pulse mb-4" />
        <p className="text-black font-black text-[10px] tracking-[0.4em] uppercase">Sincronizando Sistemas Atlas</p>
      </div>
    );
  }

  return (
    <section className="relative w-full bg-white font-montserrat">
      <div className="flex flex-col">
        {drones.map((drone, index) => (
          <div 
            key={drone.id} 
            className="relative w-full h-screen snap-start flex flex-col md:flex-row items-center border-b border-zinc-100 overflow-hidden"
          >
            {/* LADO IZQUIERDO: 60% - IMAGEN (Diseño Tesla Studio) */}
            <div className="relative w-full md:w-[60%] h-[50vh] md:h-full bg-[#F5F5F5] flex items-center justify-center p-12 md:p-24 overflow-hidden">
              <div className="relative w-full h-full transition-all duration-[1.5s] ease-out hover:scale-110">
                <Image 
                  src={drone.img} 
                  alt={drone.name} 
                  fill 
                  className="object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.1)]"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>
              <div className="absolute top-12 left-12 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-zinc-300"></span>
                <p className="text-[10px] font-black tracking-[0.6em] text-zinc-300 uppercase">
                  Aeroespacial
                </p>
              </div>
            </div>

            {/* LADO DERECHO: 40% - INFO (Diseño Drone DT) */}
            <div className="w-full md:w-[40%] h-[50vh] md:h-full flex flex-col justify-center px-10 md:px-20 bg-white">
              <div className="max-w-md w-full">
                <span className="text-[11px] font-black text-[#FFD700] tracking-[0.4em] uppercase mb-4 block">
                  {drone.tag}
                </span>
                
                <h2 className="text-5xl md:text-[64px] font-black text-black tracking-tighter uppercase leading-[0.85] mb-6">
                  {drone.name.split(' ').map((word, i) => (
                    <span key={i} className={word.toUpperCase() === 'DT' ? 'text-[#FFD700] italic' : ''}>
                      {word}{' '}
                    </span>
                  ))}
                </h2>
                
                <p className="text-[18px] md:text-[22px] font-medium text-zinc-400 tracking-tight mb-12">
                  {drone.price}
                </p>

                <div className="flex flex-col gap-4 w-full">
                  <Link
                    href={`/shop/product/${drone.id}`}
                    className="group relative w-full h-[64px] flex items-center justify-center bg-black text-white rounded-[4px] text-[12px] font-black uppercase tracking-[0.2em] transition-all hover:bg-[#FFD700] hover:text-black"
                  >
                    Explorar Modelo
                  </Link>
                  <Link
                    href="/services"
                    className="w-full h-[64px] flex items-center justify-center bg-transparent border border-zinc-200 text-black rounded-[4px] text-[12px] font-black uppercase tracking-[0.2em] transition-all hover:border-black"
                  >
                    Ficha Técnica
                  </Link>
                </div>

                <div className="mt-16 pt-8 border-t border-zinc-100 flex justify-between items-center">
                  <p className="text-[9px] text-zinc-400 uppercase tracking-widest font-bold">
                    Manuel Nieto • Bogotá, CO
                  </p>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[8px] text-zinc-400 uppercase font-black">Live Sync</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navegación lateral tipo Tesla mejorada */}
      <div className="fixed right-10 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-40 hidden lg:flex">
        {drones.map((_, idx) => (
          <button 
            key={idx} 
            onClick={() => window.scrollTo({ top: (idx + 1) * window.innerHeight * 0.8, behavior: 'smooth' })}
            className="group flex items-center justify-end gap-4"
          >
            <span className="text-[10px] font-black text-black opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
              MODEL 0{idx + 1}
            </span>
            <div className="w-[2px] h-10 bg-zinc-100 group-hover:bg-[#FFD700] transition-all duration-500" />
          </button>
        ))}
      </div>
    </section>
  );
};

export default ProductShow;