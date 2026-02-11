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

  if (drones.length === 0) {
    return (
      <div className="h-[50vh] bg-white flex flex-col items-center justify-center p-10">
        <div className="animate-pulse text-black font-black text-2xl mb-4">DRONE DT</div>
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest text-center">
          {error || "Sincronizando con Atlas..."}
        </p>
      </div>
    );
  }

  return (
    /* CAMBIO CLAVE: Quitamos h-screen del contenedor principal 
       para que el snap-y funcione a nivel de página si es necesario 
    */
    <section className="relative w-full bg-white font-montserrat">
      <div className="flex flex-col">
        {drones.map((drone) => (
          <div 
            key={drone.id} 
            className="relative w-full h-screen snap-start flex flex-col items-center justify-between py-24 px-4 border-b border-zinc-100"
          >
            {/* Cabecera: Tesla Style */}
            <div className="z-20 text-center mt-10">
              <h2 className="text-4xl md:text-[64px] font-black text-black tracking-tighter uppercase mb-2 leading-none">
                {drone.name}
              </h2>
              <p className="text-[14px] md:text-[15px] font-medium text-zinc-600 tracking-[0.2em] uppercase">
                {drone.price}
              </p>
            </div>

            {/* Imagen: Conexión Atlas - Ajustada para no tapar textos */}
            <div className="absolute inset-0 z-10 flex items-center justify-center p-4 pointer-events-none">
              <div className="relative w-full h-[50%] max-w-5xl">
                <Image 
                  src={drone.img} 
                  alt={drone.name} 
                  fill 
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
                  priority
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
              </div>
            </div>

            {/* Acciones: Estilo Drone DT */}
            <div className="z-20 w-full flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Link
                href={`/shop/product/${drone.id}`}
                className="w-full max-w-[260px] h-[44px] flex items-center justify-center bg-[#171A20CC] backdrop-blur-md text-white rounded-[4px] text-[12px] font-bold uppercase tracking-[0.15em] hover:bg-black transition-all duration-300"
              >
                Explorar
              </Link>
              <Link
                href="/services"
                className="w-full max-w-[260px] h-[44px] flex items-center justify-center bg-[#F4F4F4A6] backdrop-blur-md text-[#393C41] rounded-[4px] text-[12px] font-bold uppercase tracking-[0.15em] hover:bg-[#E2E2E2] transition-all duration-300"
              >
                Soporte Técnico
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Nav Lateral Minimalista */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-30 hidden lg:flex">
        {drones.map((_, idx) => (
          <div 
            key={idx} 
            className="w-[3px] h-8 bg-zinc-200 hover:bg-gold transition-colors cursor-pointer" 
            title={`Producto ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductShow;