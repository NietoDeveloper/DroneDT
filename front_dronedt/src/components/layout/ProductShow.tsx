"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchDrones = useCallback(async () => {
    setLoading(true);
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const baseUrl = isLocal ? 'http://127.0.0.1:5000/api/v1' : process.env.NEXT_PUBLIC_API_URL;
    const fullUrl = `${baseUrl}/products?category=drone`;
    
    try {
      const response = await fetch(fullUrl);
      const result = await response.json();
      let rawData = result.data?.products || result.data || result;

      if (Array.isArray(rawData) && rawData.length > 0) {
        const formatted = rawData.map((item: any) => ({
          id: item._id || item.id,
          name: item.name || "DRONE DT MODEL",
          price: item.price ? `Desde $${Number(item.price).toLocaleString()}` : 'Contactar Ventas',
          tag: item.category?.name || 'Pro Series',
          img: item.imageUrl || (item.images?.[0]?.url || item.images?.[0] || '/drone-placeholder.png')
        }));
        setDrones(formatted);
      } else {
        throw new Error("No products found");
      }
    } catch (err) {
      setDrones([{
        id: 'fallback-1',
        name: 'Mini A2-Pro5 DT',
        price: 'Desde $14,500,000',
        tag: 'Insígnia',
        img: '/drone-placeholder.png'
      }]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDrones();
  }, [fetchDrones]);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (drones.length > 1) {
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev === drones.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
    return () => clearTimeout(timeoutRef.current!);
  }, [currentIndex, drones]);

  if (loading) return null; // Evita saltos visuales en el 80/20

  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 py-10 md:py-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="text-[10px] font-black tracking-[0.4em] text-blue-600 uppercase block mb-2">Ingeniería Atlas</span>
          <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter uppercase leading-none">
            Nuestra <span className="text-white drop-shadow-sm">Flota</span>
          </h2>
        </div>
        <div className="flex gap-2 pb-2">
          {drones.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1 transition-all duration-500 rounded-full ${currentIndex === idx ? 'w-12 bg-blue-600' : 'w-4 bg-gray-400'}`}
            />
          ))}
        </div>
      </div>

      <div className="relative w-full overflow-hidden rounded-xl shadow-2xl bg-white">
        <div 
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {drones.map((drone) => (
            <div key={drone.id} className="w-full flex-shrink-0">
              <div className="flex flex-col md:flex-row min-h-[500px] md:h-[600px]">
                <div className="w-full md:w-[60%] bg-[#F5F5F5] relative p-8 flex items-center justify-center group overflow-hidden">
                  <div className="relative w-full h-64 md:h-[80%] transition-transform duration-700 group-hover:scale-105">
                    <Image src={drone.img} alt={drone.name} fill className="object-contain drop-shadow-2xl" priority />
                  </div>
                </div>

                <div className="w-full md:w-[40%] p-8 md:p-12 flex flex-col justify-center bg-white text-black">
                  <h3 className="text-4xl md:text-6xl font-black uppercase leading-[0.9] mb-4 tracking-tighter">
                    {drone.name.split(' ').map((word, i) => (
                      <span key={i} className={word.toUpperCase() === 'DT' ? 'text-[#FFD700] italic' : ''}>{word} </span>
                    ))}
                  </h3>
                  <p className="text-xl md:text-2xl text-zinc-400 font-bold mb-10 tracking-tight">{drone.price}</p>
                  <div className="flex flex-col gap-4">
                    <Link href={`/shop/product/${drone.id}`} className="w-full h-16 flex items-center justify-center bg-blue-700 text-white text-[12px] font-black uppercase tracking-widest transition-all hover:bg-[#FFD700] hover:text-black hover:-translate-y-1 shadow-lg">Ordenar Ahora</Link>
                    <Link href="/services" className="w-full h-16 flex items-center justify-center border-2 border-blue-700 text-blue-700 text-[12px] font-black uppercase tracking-widest transition-all hover:bg-[#FFD700] hover:border-[#FFD700] hover:text-black hover:-translate-y-1">Ficha Técnica</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductShow;