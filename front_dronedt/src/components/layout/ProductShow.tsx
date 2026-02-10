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

  const fetchDrones = useCallback(async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
    try {
      const response = await fetch(`${apiUrl}/products?category=drone`, { 
        next: { revalidate: 60 } 
      });
      
      const result = await response.json();
      const productsArray = result.data || result;

      if (Array.isArray(productsArray)) {
        const formatted = productsArray.slice(0, 4).map((item: any) => ({
          id: item._id || item.id,
          name: item.name,
          price: item.price ? `Desde $${item.price.toLocaleString()}` : 'Contactar Ventas',
          tag: item.category?.name || 'Pro Series',
          img: item.imageUrl || (item.images?.[0]?.url || item.images?.[0] || '/placeholder.png')
        }));
        setDrones(formatted);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDrones();
  }, [fetchDrones]);

  if (loading) {
    return (
      <div className="h-screen w-full bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-black border-t-[#FFD700] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (drones.length === 0) return null;

  return (
    <section className="relative w-full h-screen bg-white overflow-hidden">
      {/* Contenedor Scroll Horizontal Estilo Tesla */}
      <div 
        className="flex h-full overflow-x-auto snap-x snap-mandatory scroll-smooth" 
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {drones.map((drone) => (
          <div 
            key={drone.id} 
            className="relative flex-none w-full h-full snap-center flex flex-col items-center justify-between py-24"
          >
            {/* Texto Superior */}
            <div className="z-20 text-center space-y-2">
              <h2 className="text-5xl md:text-7xl font-bold text-black tracking-tight uppercase">
                {drone.name}
              </h2>
              <p className="text-lg font-medium text-black/70 border-b border-black w-fit mx-auto pb-1">
                {drone.price}
              </p>
            </div>

            {/* Imagen Central */}
            <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
              <div className="relative w-full h-[65%] max-w-6xl">
                <Image 
                  src={drone.img} 
                  alt={drone.name} 
                  fill 
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Botones Inferiores Estilo Model Y */}
            <div className="z-20 w-full flex flex-col md:flex-row items-center justify-center gap-4 px-6">
              <Link
                href={`/shop/product/${drone.id}`}
                className="w-full max-w-[280px] h-12 flex items-center justify-center bg-[#171A20CC] backdrop-blur-sm text-white rounded-md text-[12px] font-bold uppercase tracking-widest hover:bg-black transition-all"
              >
                Order Now
              </Link>
              <Link
                href="/services"
                className="w-full max-w-[280px] h-12 flex items-center justify-center bg-[#F4F4F4A6] backdrop-blur-sm text-[#393C41] rounded-md text-[12px] font-bold uppercase tracking-widest hover:bg-white transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Indicadores de posición */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {drones.map((_, idx) => (
          <div key={idx} className="w-2 h-2 rounded-full bg-black/10" />
        ))}
      </div>
    </section>
  );
};

export default ProductShow;