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
    // Lógica de URL limpia
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
      // Atlas suele envolver en .data, si no, tomamos el result
      const productsArray = result.data || result;

      if (Array.isArray(productsArray) && productsArray.length > 0) {
        const formatted = productsArray.slice(0, 5).map((item: any) => ({
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

  // Si no hay datos, mostramos el error técnico en lugar de pantalla blanca
  if (drones.length === 0) {
    return (
      <div className="h-screen bg-white flex flex-col items-center justify-center p-10">
        <div className="animate-pulse text-black font-black text-2xl mb-4">DRONE DT</div>
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
          {error || "Sincronizando con Atlas..."}
        </p>
      </div>
    );
  }

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
            {/* Cabecera: Tesla Style */}
            <div className="z-20 text-center mt-12">
              <h2 className="text-5xl md:text-[72px] font-black text-black tracking-tighter uppercase mb-2 leading-none">
                {drone.name}
              </h2>
              <p className="text-[14px] md:text-[16px] font-bold text-zinc-800 tracking-[0.3em] uppercase underline underline-offset-8 decoration-1">
                {drone.price}
              </p>
            </div>

            {/* Imagen: Conexión Atlas */}
            <div className="absolute inset-0 z-10 flex items-center justify-center p-8 pointer-events-none">
              <div className="relative w-full h-[60%] max-w-6xl">
                <Image 
                  src={drone.img} 
                  alt={drone.name} 
                  fill 
                  className="object-contain drop-shadow-2xl"
                  priority
                  sizes="100vw"
                />
              </div>
            </div>

            {/* Acciones: Estilo Drone DT */}
            <div className="z-20 w-full flex flex-col sm:flex-row items-center justify-center gap-5 mb-14">
              <Link
                href={`/shop/product/${drone.id}`}
                className="w-full max-w-[280px] h-[48px] flex items-center justify-center bg-[#171A20CC] backdrop-blur-md text-white rounded-[4px] text-[12px] font-black uppercase tracking-[0.2em] hover:bg-[#0000FF] transition-all duration-300"
              >
                Ordenar Ahora
              </Link>
              <Link
                href="/services"
                className="w-full max-w-[280px] h-[48px] flex items-center justify-center bg-[#F4F4F4A6] backdrop-blur-md text-[#393C41] border border-transparent rounded-[4px] text-[12px] font-black uppercase tracking-[0.2em] hover:bg-[#FFD700] hover:text-black transition-all duration-300"
              >
                Especificaciones
              </Link>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
               <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-black">
                  <path d="M7 10l5 5 5-5" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Nav Lateral */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-30 hidden lg:flex">
        {drones.map((_, idx) => (
          <div key={idx} className="w-[2px] h-10 bg-black/10 hover:bg-black transition-all cursor-pointer" />
        ))}
      </div>
    </section>
  );
};

export default ProductShow;