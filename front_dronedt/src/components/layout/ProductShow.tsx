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
    // Maneja si la imagen es un string de URL o un objeto con propiedad url
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
      
      // Añadimos un pequeño timeout al fetch para evitar esperas infinitas
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(`${apiUrl}/products`, { 
        signal: controller.signal,
        cache: 'no-store' // Evita el problema 304 que bloquea datos nuevos
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) throw new Error("API Offline");
      
      const result = await response.json();
      
      // Lógica de extracción: busca en result directo o en result.data
      let data = Array.isArray(result) ? result : (result.data || []);
      
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("No hay productos en DB");
      }

      setProducts(data);
    } catch (error) {
      console.error("Drone DT Engine Error:", error);
      // Mock Data de respaldo para mantener la estética de "Producción"
      setProducts([
        { _id: "m1", name: "Phantom DT-Max", description: "Inspección térmica.", price: 2500, images: ["https://images.unsplash.com/photo-1507582020474-9a35b7d455d9"], category: "Industrial", brand: "DRONE DT" },
        { _id: "m2", name: "AgriBot DT-10", description: "Fumigación pro.", price: 3800, images: ["https://images.unsplash.com/photo-1527142879024-c6c91aa9c5c9"], category: "Agricultura", brand: "DRONE DT" },
        { _id: "m3", name: "SkyView Cinema", description: "Cámara 8K.", price: 1800, images: ["https://images.unsplash.com/photo-1473968512447-ac1155104306"], category: "Cine", brand: "DRONE DT" }
      ]);
    } finally {
      // Delay artificial para branding
      setTimeout(() => setLoading(false), 1000);
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

  // Auto-scroll del Reel
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
    <div className="h-[85vh] w-full flex flex-col items-center justify-center bg-[#DCDCDC] relative">
      <div className="relative flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-black/10 border-t-[#FFD700] rounded-full animate-spin mb-4"></div>
        <h3 className="font-black text-black tracking-widest text-xs uppercase animate-pulse">
          Sincronizando Drones...
        </h3>
      </div>
    </div>
  );

  return (
    <section className="relative w-full bg-black overflow-hidden border-y border-white/10">
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex flex-row overflow-x-auto snap-x snap-mandatory no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((item) => (
          <div 
            key={item._id} 
            className="relative h-[85vh] min-h-[600px] w-full flex-shrink-0 flex flex-col items-center justify-between py-12 snap-center overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 z-0">
              <img 
                src={getImageUrl(item)} 
                alt={item.name} 
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 mt-10">
              <span className="text-[#FFD700] font-bold text-xs tracking-[0.4em] uppercase mb-4 block">
                {getCategoryName(item.category)}
              </span>
              <h2 className="text-white font-black text-[clamp(40px,8vw,100px)] tracking-tighter leading-[0.9] mb-4 uppercase italic">
                {item.name}
              </h2>
              <p className="text-white/60 font-mono text-sm tracking-widest uppercase">{item.brand || 'Drone DT Core'}</p>
            </div>

            {/* Actions */}
            <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-[90%] max-w-[500px] mb-12">
              <button 
                onClick={() => router.push(`/shop/product/${item._id}`)}
                className="flex-[2] py-4 bg-[#FFD700] text-black font-black text-xs uppercase tracking-widest hover:bg-white transition-colors"
              >
                Configurar Unidad
              </button>
              <button 
                onClick={() => router.push(`/shop/product/${item._id}`)}
                className="flex-1 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all"
              >
                Specs
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToId(index)}
            className={`h-1 transition-all duration-500 ${
              activeIndex === index ? "w-12 bg-[#FFD700]" : "w-4 bg-white/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductShow;