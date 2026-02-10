"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

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

  const fetchDrones = useCallback(async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
    try {
      const response = await fetch(`${apiUrl}/products?category=drone`, { cache: 'no-store' });
      if (!response.ok) throw new Error('Error');
      const result = await response.json();
      const productsArray = Array.isArray(result.data) ? result.data : result;

      const formattedDrones = productsArray.slice(0, 4).map((item: any) => ({
        id: item._id || item.id,
        name: item.name,
        price: item.price ? `Desde $${item.price.toLocaleString()}` : 'Contactar Ventas',
        tag: item.category?.name || 'Pro Series',
        img: item.imageUrl || (item.images?.[0]?.url || item.images?.[0] || '/placeholder.png')
      }));
      setDrones(formattedDrones);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchDrones(); }, [fetchDrones]);

  if (loading) return <div className="h-screen bg-black" />;

  return (
    <section className="relative w-full bg-white">
      {/* Contenedor Scroll Horizontal (Snap) */}
      <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
        {drones.map((drone) => (
          <div 
            key={drone.id} 
            className="relative flex-none w-full md:w-[85vw] lg:w-[100vw] h-screen snap-center overflow-hidden border-r border-gray-100"
          >
            {/* Texto Superior (Estilo Tesla) */}
            <div className="absolute top-[15%] w-full text-center z-20 px-4">
              <h2 className="text-5xl md:text-7xl font-bold text-black tracking-tight mb-2">
                {drone.name}
              </h2>
              <p className="text-lg md:text-xl font-medium text-black/80">
                {drone.price}
              </p>
              <p className="text-sm font-bold text-[#0000FF] mt-2 tracking-widest uppercase">
                {drone.tag}
              </p>
            </div>

            {/* Imagen de Fondo (Full) */}
            <div className="absolute inset-0 z-10">
              <Image 
                src={drone.img} 
                alt={drone.name} 
                fill 
                className="object-contain md:object-cover p-10 md:p-0"
                priority
              />
            </div>

            {/* Botones Inferiores (Tesla UX) */}
            <div className="absolute bottom-[10%] w-full flex flex-col md:flex-row items-center justify-center gap-4 px-6 z-20">
              <Link
                href={`/shop/product/${drone.id}`}
                className="w-full max-w-[280px] h-12 flex items-center justify-center bg-black/80 backdrop-blur-md text-white rounded-md text-sm font-bold uppercase tracking-wider hover:bg-black transition-all"
              >
                Order Now
              </Link>
              <Link
                href="/services"
                className="w-full max-w-[280px] h-12 flex items-center justify-center bg-white/70 backdrop-blur-md text-black rounded-md text-sm font-bold uppercase tracking-wider hover:bg-white transition-all"
              >
                Learn More
              </Link>
            </div>

            {/* Indicador de más contenido a la derecha */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center gap-2 text-black/20 animate-pulse">
               <span className="text-[10px] font-black rotate-90 uppercase tracking-[0.5em]">Scroll</span>
               <ChevronRight size={40} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductShow;