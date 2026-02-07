"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface Category {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  name: string;
  brand?: string;
  description: string;
  price: number;
  images: any[]; 
  category: string | Category;
}

const ProductShow = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const getImageUrl = (product: Product) => {
    if (!product.images || product.images.length === 0) return "/placeholder-drone.jpg";
    const img = product.images[0];
    return typeof img === 'string' ? img : img?.url || "/placeholder-drone.jpg";
  };

  const getCategoryName = (category: string | Category) => {
    if (typeof category === 'string') return category;
    return category?.name || "General";
  };

  const fetchDrones = useCallback(async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000); // Timeout más agresivo

      const response = await fetch(`${apiUrl}/products`, { 
        signal: controller.signal,
        cache: 'no-store' 
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) throw new Error("API Offline");
      
      const result = await response.json();
      let data = Array.isArray(result) ? result : (result.data || []);
      
      // CAMBIO CLAVE: Si no hay datos, lanzamos error interno capturado por el catch
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("Empty DB");
      }

      setProducts(data);
    } catch (error) {
      console.warn("Drone DT Engine: Usando Backup Data (DB Desconectada)");
      // Mock Data de Respaldo para mantener el estilo Software DT
      setProducts([
        { _id: "m1", name: "Phantom DT-Max", description: "Inspección térmica.", price: 2500, images: ["https://images.unsplash.com/photo-1507582020474-9a35b7d455d9"], category: "Industrial", brand: "DRONE DT" },
        { _id: "m2", name: "AgriBot DT-10", description: "Fumigación pro.", price: 3800, images: ["https://images.unsplash.com/photo-1527142879024-c6c91aa9c5c9"], category: "Agricultura", brand: "DRONE DT" },
        { _id: "m3", name: "SkyView Cinema", description: "Cámara 8K.", price: 1800, images: ["https://images.unsplash.com/photo-1473968512447-ac1155104306"], category: "Cine", brand: "DRONE DT" }
      ]);
    } finally {
      // Delay de 1.2s para que el loader de Software DT sea visible y elegante
      setTimeout(() => setLoading(false), 1200);
    }
  }, []);

  useEffect(() => {
    fetchDrones();
  }, [fetchDrones]);

  const scrollToId = useCallback((index: number) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const itemWidth = container.offsetWidth;
      container.scrollTo({ left: index * itemWidth, behavior: 'smooth' });
      setActiveIndex(index);
    }
  }, []);

  useEffect(() => {
    if (products.length <= 1 || loading) return;
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % products.length;
      scrollToId(nextIndex);
    }, 6000); 
    return () => clearInterval(interval);
  }, [products.length, loading, activeIndex, scrollToId]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, offsetWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / offsetWidth);
      if (index !== activeIndex && index >= 0 && index < products.length) {
        setActiveIndex(index);
      }
    }
  };

  if (loading) return (
    <div className="h-[85vh] w-full flex flex-col items-center justify-center bg-[#DCDCDC]">
      <div className="relative flex flex-col items-center">
        {/* Loader con color corporativo Gold de Software DT */}
        <div className="w-16 h-16 border-4 border-black/5 border-t-[#FFD700] rounded-full animate-spin mb-6"></div>
        <h3 className="font-black text-black tracking-[0.3em] text-[10px] uppercase animate-pulse">
          Sincronizando Sistemas Aeroespaciales
        </h3>
      </div>
    </div>
  );

  return (
    <section className="relative w-full bg-black overflow-hidden border-y border-white/5">
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex flex-row overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((item) => (
          <div 
            key={item._id} 
            className="relative h-[85vh] min-h-[600px] w-full flex-shrink-0 flex flex-col items-center justify-between py-16 snap-center"
          >
            {/* Background con Overlay */}
            <div className="absolute inset-0 z-0">
              <img 
                src={getImageUrl(item)} 
                alt={item.name} 
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
            </div>

            {/* Top Info */}
            <div className="relative z-10 text-center px-6 transition-all duration-700">
              <div className="overflow-hidden mb-2">
                <span className="text-[#FFD700] font-bold text-[10px] tracking-[0.5em] uppercase block animate-in slide-in-from-bottom duration-500">
                  {getCategoryName(item.category)}
                </span>
              </div>
              <h2 className="text-white font-black text-[clamp(45px,10vw,110px)] tracking-tighter leading-[0.8] mb-4 uppercase italic">
                {item.name}
              </h2>
              <div className="h-[1px] w-12 bg-[#FFD700] mx-auto mb-4"></div>
              <p className="text-white/40 font-mono text-[10px] tracking-[0.4em] uppercase">
                {item.brand || 'DRONE DT ENGINE'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-[90%] max-w-[550px] mb-8">
              <button 
                onClick={() => router.push(`/shop/product/${item._id}`)}
                className="flex-[2] py-5 bg-[#FFD700] text-black font-black text-xs uppercase tracking-[0.2em] hover:bg-white transition-all transform hover:scale-[1.02] active:scale-95 shadow-2xl"
              >
                Configurar Unidad
              </button>
              <button 
                onClick={() => router.push(`/shop/product/${item._id}`)}
                className="flex-1 py-5 bg-black/40 backdrop-blur-xl text-white border border-white/10 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all"
              >
                Especificaciones
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Indicador de Posición */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-3">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToId(index)}
            className={`h-1 rounded-full transition-all duration-700 ${
              activeIndex === index ? "w-16 bg-[#FFD700]" : "w-3 bg-white/10 hover:bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductShow;