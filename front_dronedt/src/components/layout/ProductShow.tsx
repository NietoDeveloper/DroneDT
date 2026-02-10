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
  // Eliminamos el spinner interno para no chocar con tu nuevo Preloader de Drone

  const fetchDrones = useCallback(async () => {
    // Detectamos si estamos en Vercel o Local
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const apiUrl = isLocal 
      ? 'http://127.0.0.1:5000/api/v1' 
      : process.env.NEXT_PUBLIC_API_URL;
    
    try {
      const response = await fetch(`${apiUrl}/products?category=drone`, { 
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const result = await response.json();
      const productsArray = result.data || result;

      if (Array.isArray(productsArray)) {
        const formatted = productsArray.slice(0, 4).map((item: any) => ({
          id: item._id || item.id,
          name: item.name,
          price: item.price ? `Desde $${item.price.toLocaleString()}` : 'Contactar Ventas',
          tag: item.category?.name || 'Pro Series',
          img: item.imageUrl || (item.images?.[0]?.url || item.images?.[0] || '/drone-placeholder.png')
        }));
        setDrones(formatted);
      }
    } catch (error) {
      console.error("❌ ProductShow Fetch Error:", error);
    }
  }, []);

  useEffect(() => {
    fetchDrones();
  }, [fetchDrones]);

  // Si aún no hay drones, retornamos un espacio vacío del tamaño de la pantalla
  // Esto evita que el footer suba mientras el Preloader está activo
  if (drones.length === 0) return <div className="h-screen bg-white" />;

  return (
    <section className="relative w-full h-screen bg-white overflow-hidden">
      {/* Container de Scroll Vertical Snap (Estilo Tesla Reel) */}
      <div 
        className="h-full overflow-y-auto snap-y snap-mandatory scroll-smooth" 
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {drones.map((drone) => (
          <div 
            key={drone.id} 
            className="relative flex-none w-full h-screen snap-start flex flex-col items-center justify-between py-24 px-4"
          >
            {/* Cabecera del Producto */}
            <div className="z-20 text-center space-y-2 mt-10">
              <h2 className="text-5xl md:text-7xl font-black text-black tracking-tighter uppercase">
                {drone.name}
              </h2>
              <p className="text-sm md:text-lg font-medium text-zinc-600 tracking-widest uppercase">
                {drone.price}
              </p>
            </div>

            {/* Imagen Central - Optimizada para no romperse */}
            <div className="absolute inset-0 z-10 flex items-center justify-center p-6">
              <div className="relative w-full h-[60%] max-w-5xl transition-transform duration-700 hover:scale-105">
                <Image 
                  src={drone.img} 
                  alt={drone.name} 
                  fill 
                  className="object-contain"
                  priority
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
            </div>

            {/* Acciones Inferiores */}
            <div className="z-20 w-full flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Link
                href={`/shop/product/${drone.id}`}
                className="w-full max-w-[280px] h-10 flex items-center justify-center bg-zinc-900/90 backdrop-blur-md text-white rounded-[4px] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all duration-300"
              >
                Ordenar Ahora
              </Link>
              <Link
                href="/services"
                className="w-full max-w-[280px] h-10 flex items-center justify-center bg-white/70 backdrop-blur-md text-zinc-900 border border-zinc-200 rounded-[4px] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-all duration-300"
              >
                Especificaciones
              </Link>
            </div>

            {/* Indicador de "Scroll Down" en la primera tarjeta */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                  <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
               </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Indicadores Laterales de Página (Dots) */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-30 hidden md:flex">
        {drones.map((_, idx) => (
          <div key={idx} className="w-1.5 h-1.5 rounded-full bg-black/20" />
        ))}
      </div>
    </section>
  );
};

export default ProductShow;