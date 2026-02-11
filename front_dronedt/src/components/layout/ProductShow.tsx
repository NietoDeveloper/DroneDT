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

  const fetchDrones = useCallback(async () => {
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
        // Cargamos los 5 modelos solicitados
        const formatted = productsArray.slice(0, 5).map((item: any) => ({
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

  if (drones.length === 0) return <div className="h-screen bg-white" />;

  return (
    <section className="relative w-full h-screen bg-white overflow-hidden font-montserrat">
      {/* Scroll Snap Container estilo Tesla */}
      <div 
        className="h-full overflow-y-auto snap-y snap-mandatory scroll-smooth hide-scrollbar" 
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {drones.map((drone) => (
          <div 
            key={drone.id} 
            className="relative w-full h-screen snap-start flex flex-col items-center justify-between py-20 px-4"
          >
            {/* Cabecera: Nombre y Precio (Tesla Style) */}
            <div className="z-20 text-center mt-12 animate-in fade-in zoom-in duration-1000">
              <h2 className="text-5xl md:text-[64px] font-black text-black tracking-tighter uppercase mb-2">
                {drone.name}
              </h2>
              <p className="text-[13px] md:text-[15px] font-bold text-zinc-800 tracking-[0.3em] uppercase underline underline-offset-8 decoration-1">
                {drone.price}
              </p>
            </div>

            {/* Drone Imagen (Capa Media) */}
            <div className="absolute inset-0 z-10 flex items-center justify-center p-8 pointer-events-none">
              <div className="relative w-full h-[55%] max-w-6xl transition-transform duration-1000">
                <Image 
                  src={drone.img} 
                  alt={drone.name} 
                  fill 
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
                  priority
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
              </div>
            </div>

            {/* Acciones Inferiores: Drone DT Colors en Hover */}
            <div className="z-20 w-full flex flex-col sm:flex-row items-center justify-center gap-5 mb-14 animate-in slide-in-from-bottom-10 duration-1000">
              <Link
                href={`/shop/product/${drone.id}`}
                className="w-full max-w-[280px] h-[44px] flex items-center justify-center bg-[#171A20CC] backdrop-blur-sm text-white rounded-[4px] text-[12px] font-bold uppercase tracking-[0.1em] hover:bg-[#0000FF] transition-all duration-300 shadow-lg"
              >
                Ordenar Ahora
              </Link>
              <Link
                href="/services"
                className="w-full max-w-[280px] h-[44px] flex items-center justify-center bg-[#F4F4F4A6] backdrop-blur-sm text-[#393C41] rounded-[4px] text-[12px] font-bold uppercase tracking-[0.1em] hover:bg-[#FFD700] hover:text-black transition-all duration-300 shadow-md"
              >
                Especificaciones
              </Link>
            </div>

            {/* Indicador Scroll Down (Sutil) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
               <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-600">
                  <path d="M7 10l5 5 5-5" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Navegación lateral sutil */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-30 hidden lg:flex">
        {drones.map((_, idx) => (
          <div key={idx} className="w-1 h-8 rounded-full bg-black/10 hover:bg-black/30 transition-colors cursor-pointer" />
        ))}
      </div>
    </section>
  );
};

export default ProductShow;