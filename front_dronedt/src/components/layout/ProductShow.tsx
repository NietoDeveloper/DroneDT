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
  const [error, setError] = useState<string | null>(null);

  const fetchDrones = useCallback(async () => {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const baseUrl = isLocal ? 'http://127.0.0.1:5000/api/v1' : process.env.NEXT_PUBLIC_API_URL;
    const fullUrl = `${baseUrl}/products?category=drone`;
    
    try {
      const response = await fetch(fullUrl, { 
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!response.ok) throw new Error(`Status: ${response.status}`);
      
      const result = await response.json();
      const productsArray = result.data || result;

      if (Array.isArray(productsArray) && productsArray.length > 0) {
        const formatted = productsArray.map((item: any) => ({
          id: item._id || item.id,
          name: item.name || "Drone DT Model",
          price: item.price ? `Desde $${Number(item.price).toLocaleString()}` : 'Contactar Ventas',
          tag: item.category?.name || 'Pro Series',
          img: item.imageUrl || (item.images?.[0]?.url || item.images?.[0] || '/drone-placeholder.png')
        }));
        setDrones(formatted);
      } else {
        setError("No se encontraron drones en la base de datos.");
      }
    } catch (err: any) {
      console.error("❌ Atlas Connection Error:", err);
      setError(`Error de conexión: ${err.message}`);
    }
  }, []);

  useEffect(() => {
    fetchDrones();
  }, [fetchDrones]);

  if (drones.length === 0) {
    return (
      <div className="h-[20vh] bg-white flex flex-col items-center justify-center border-t border-zinc-100">
        <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em] animate-pulse">
          {error || "Sincronizando Catálogo Atlas..."}
        </p>
      </div>
    );
  }

  return (
    <section className="relative w-full bg-white font-montserrat">
      <div className="flex flex-col">
        {drones.map((drone, index) => (
          <div 
            key={drone.id} 
            /* h-screen para que cada producto sea una sección completa al scrollear */
            className={`relative w-full h-screen snap-start flex flex-col md:flex-row items-center border-b border-zinc-100 overflow-hidden ${
              index === 0 ? "pt-0" : ""
            }`}
          >
            {/* LADO IZQUIERDO (IMAGEN): 60% del ancho en horizontal */}
            <div className="relative w-full md:w-[60%] h-[50vh] md:h-full bg-[#f9f9f9] flex items-center justify-center p-8 md:p-20">
              <div className="relative w-full h-full transition-transform duration-700 hover:scale-105">
                <Image 
                  src={drone.img} 
                  alt={drone.name} 
                  fill 
                  className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.12)]"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>
              {/* Tag de categoría estilo Drone DT */}
              <span className="absolute top-10 left-10 text-[10px] font-black tracking-[0.5em] text-zinc-300 uppercase">
                {drone.tag}
              </span>
            </div>

            {/* LADO DERECHO (INFO): 40% del ancho en horizontal */}
            <div className="w-full md:w-[40%] h-[50vh] md:h-full flex flex-col justify-center px-8 md:px-16 bg-white">
              <div className="max-w-md">
                <h2 className="text-4xl md:text-[54px] font-black text-black tracking-tighter uppercase leading-[0.9] mb-4">
                  {drone.name.split(' ').map((word, i) => (
                    <span key={i} className={word.toLowerCase() === 'dt' ? 'text-[#FFD700] italic' : ''}>
                      {word}{' '}
                    </span>
                  ))}
                </h2>
                
                <p className="text-[16px] md:text-[18px] font-medium text-zinc-500 tracking-tight mb-10">
                  {drone.price}
                </p>

                <div className="flex flex-col gap-4 w-full">
                  <Link
                    href={`/shop/product/${drone.id}`}
                    className="w-full h-[54px] flex items-center justify-center bg-black text-white rounded-[4px] text-[12px] font-black uppercase tracking-[0.2em] transition-all hover:bg-[#FFD700] hover:text-black active:scale-95"
                  >
                    Ordenar Ahora
                  </Link>
                  <Link
                    href="/services"
                    className="w-full h-[54px] flex items-center justify-center bg-transparent border border-zinc-200 text-black rounded-[4px] text-[12px] font-black uppercase tracking-[0.2em] transition-all hover:border-black active:scale-95"
                  >
                    Configuración Pro
                  </Link>
                </div>
                
                <p className="mt-8 text-[10px] text-zinc-400 leading-relaxed max-w-xs">
                  Sujeto a disponibilidad tecnológica. Entrega disponible en Bogotá y las principales ciudades de Colombia.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicador lateral de navegación (Tesla Style) */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-40 hidden lg:flex">
        {drones.map((_, idx) => (
          <div 
            key={idx} 
            className="w-[2px] h-6 bg-zinc-200 hover:bg-[#FFD700] transition-all duration-300 cursor-pointer"
            onClick={() => window.scrollTo({ top: idx * window.innerHeight, behavior: 'smooth' })}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductShow;