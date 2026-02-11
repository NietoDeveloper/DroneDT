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
      
      if (!response.ok) throw new Error(`Status: ${response.status}`);
      
      const result = await response.json();
      
      // Ajuste de acceso a datos según la estructura de los logs (result.data o result)
      const productsArray = result.data?.products || result.data || result;

      if (Array.isArray(productsArray) && productsArray.length > 0) {
        const formatted = productsArray.map((item: any) => ({
          id: item._id || item.id,
          name: item.name || "DRONE DT MODEL",
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
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDrones();
  }, [fetchDrones]);

  // Pantalla de carga integrada en el flujo 80/20
  if (loading) {
    return (
      <div className="h-[20vh] bg-white flex items-center justify-center border-t border-zinc-100">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-black rounded-full animate-bounce" />
          <p className="text-black font-black text-[10px] tracking-[0.4em] uppercase">Sincronizando Atlas...</p>
        </div>
      </div>
    );
  }

  // Si no hay drones, mostramos un estado vacío pero con el diseño 80/20 para no romper la UI
  if (drones.length === 0) {
    return (
      <div className="h-[20vh] bg-white flex items-center justify-center border-t border-zinc-100">
        <p className="text-zinc-400 font-bold text-[10px] tracking-widest uppercase">{error || "Catálogo no disponible"}</p>
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
            {/* LADO IZQUIERDO: 60% - IMAGEN */}
            <div className="relative w-full md:w-[60%] h-[50vh] md:h-full bg-[#F5F5F5] flex items-center justify-center p-12 md:p-24">
              <div className="relative w-full h-full transition-all duration-1000 ease-out hover:scale-110">
                <Image 
                  src={drone.img} 
                  alt={drone.name} 
                  fill 
                  className="object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.1)]"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>
              <div className="absolute top-12 left-12">
                <p className="text-[10px] font-black tracking-[0.6em] text-zinc-300 uppercase">
                  Tecnología Aeroespacial
                </p>
              </div>
            </div>

            {/* LADO DERECHO: 40% - INFO */}
            <div className="w-full md:w-[40%] h-[50vh] md:h-full flex flex-col justify-center px-10 md:px-20 bg-white">
              <div className="max-w-md w-full">
                <span className="text-[12px] font-bold text-[#FFD700] tracking-[0.3em] uppercase mb-4 block">
                  {drone.tag}
                </span>
                
                <h2 className="text-5xl md:text-[64px] font-black text-black tracking-tighter uppercase leading-[0.85] mb-6">
                  {drone.name.split(' ').map((word, i) => (
                    <span key={i} className={word.toUpperCase() === 'DT' ? 'text-[#FFD700] italic' : ''}>
                      {word}{' '}
                    </span>
                  ))}
                </h2>
                
                <p className="text-[18px] md:text-[20px] font-medium text-zinc-500 tracking-tight mb-12">
                  {drone.price}
                </p>

                <div className="flex flex-col gap-4 w-full">
                  <Link
                    href={`/shop/product/${drone.id}`}
                    className="w-full h-[60px] flex items-center justify-center bg-black text-white rounded-[4px] text-[13px] font-black uppercase tracking-[0.2em] transition-all hover:bg-[#FFD700] hover:text-black active:scale-95"
                  >
                    Explorar Modelo
                  </Link>
                  <Link
                    href="/services"
                    className="w-full h-[60px] flex items-center justify-center bg-transparent border border-zinc-200 text-black rounded-[4px] text-[13px] font-black uppercase tracking-[0.2em] transition-all hover:border-black active:scale-95"
                  >
                    Soporte Especializado
                  </Link>
                </div>

                <div className="mt-12 pt-8 border-t border-zinc-100">
                  <p className="text-[9px] text-zinc-400 uppercase tracking-widest font-bold">
                    Ingeniería Manuel Nieto • Rank #1 Colombia
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navegación lateral tipo Tesla */}
      <div className="fixed right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-40 hidden lg:flex">
        {drones.map((_, idx) => (
          <button 
            key={idx} 
            onClick={() => window.scrollTo({ top: idx * window.innerHeight, behavior: 'smooth' })}
            className="group flex items-center gap-4 transition-all"
          >
            <span className="text-[10px] font-black text-black opacity-0 group-hover:opacity-100 transition-opacity">0{idx + 1}</span>
            <div className="w-[2px] h-8 bg-zinc-200 group-hover:bg-[#FFD700] group-hover:h-12 transition-all duration-300" />
          </button>
        ))}
      </div>
    </section>
  );
};

export default ProductShow;