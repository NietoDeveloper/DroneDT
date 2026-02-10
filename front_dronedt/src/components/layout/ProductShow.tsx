"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ArrowRight } from 'lucide-react';

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
        cache: 'no-store'
      });
      
      if (!response.ok) throw new Error('Error al obtener drones');

      const result = await response.json();
      const productsArray = Array.isArray(result.data) ? result.data : (Array.isArray(result) ? result : []);

      const formattedDrones = productsArray.slice(0, 3).map((item: any) => ({
        id: item._id || item.id,
        name: item.name,
        price: item.price ? `Desde $${item.price.toLocaleString()}` : 'Contactar Ventas',
        tag: item.category?.name || 'Enterprise',
        img: item.imageUrl || (item.images?.[0]?.url || item.images?.[0] || '/placeholder-drone.png')
      }));

      setDrones(formattedDrones);
    } catch (error) {
      console.error("❌ Error en ProductShow:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDrones();
  }, [fetchDrones]);

  if (loading) return (
    <div className="h-96 flex items-center justify-center bg-[#DCDCDC]">
      <div className="w-10 h-10 border-4 border-[#FFD700] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <section className="py-24 bg-[#DCDCDC] px-6 sm:px-10">
      <div className="max-w-[1900px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.8]">
              Próxima <br /> <span className="text-[#0000FF]">Generación</span>
            </h2>
            <p className="text-black/60 font-bold tracking-widest uppercase text-xs ml-2">
              Tecnología de punta para misiones críticas
            </p>
          </div>
          
          <Link 
            href="/shop" 
            className="group flex items-center gap-4 bg-black text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-[#FFD700] hover:text-black transition-all duration-500"
          >
            Explorar Tienda
            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {drones.map((drone) => (
            <Link 
              key={drone.id}
              href={`/shop/product/${drone.id}`}
              className="group relative h-[600px] bg-white rounded-3xl overflow-hidden transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)]"
            >
              <div className="absolute top-8 left-8 z-20">
                <span className="bg-[#FFD700] text-black text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full shadow-lg">
                  {drone.tag}
                </span>
                <h3 className="text-4xl font-black uppercase italic mt-4 leading-none group-hover:text-[#0000FF] transition-colors duration-500">
                  {drone.name}
                </h3>
                <p className="text-black/40 font-bold mt-2 uppercase tracking-widest text-xs">
                  {drone.price}
                </p>
              </div>

              <div className="relative w-full h-full">
                <Image 
                  src={drone.img} 
                  alt={drone.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60"></div>
              </div>

              <div className="absolute bottom-8 right-8 z-20">
                <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center text-[#FFD700] group-hover:scale-125 transition-transform duration-500">
                  <ChevronRight size={30} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShow;