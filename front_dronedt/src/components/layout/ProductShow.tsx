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
  imageUrl?: string; // Prioridad para rendimiento
  images: { url: string; public_id?: string }[]; 
  category: string | Category;
}

const ProductShow = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();



  const getCategoryName = (category: string | Category) => {
    if (typeof category === 'object' && category !== null) return category.name;
    return typeof category === 'string' ? category : "General";
  };

  const fetchDrones = useCallback(async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      
      clearTimeout(timeoutId);

      if (!response.ok) throw new Error("Server Error");
      
      const result = await response.json();
      // Ajuste para la estructura de respuesta estándar { success: true, data: [...] }
      const data = result.data || result;
      
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("Empty Storage");
      }

      setProducts(data);
    } catch (error) {
      console.warn("Drone DT Engine: Usando Backup Data (DB Desconectada)");
      // Mock Data con la estética de Drone DT
      setProducts([
        { 
            _id: "m1", 
            name: "Phantom DT-Max", 
            description: "Inspección térmica avanzada.", 
            price: 2500, 
            images: [{ url: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9" }], 
            category: "Industrial", 
            brand: "SOFTWARE DT" 
        },
        { 
            _id: "m2", 
            name: "AgriBot DT-10", 
            description: "Fumigación de precisión.", 
            price: 3800, 
            images: [{ url: "https://images.unsplash.com/photo-1527142879024-c6c91aa9c5c9" }], 
            category: "Agro", 
            brand: "SOFTWARE DT" 
        }
      ]);
    } finally {
      // Delay elegante de Software DT
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

  // Auto-scroll cada 6 segundos
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
        {/* Loader Gold de Software DT */}
        <div className="w-16 h-16 border-4 border-black/10 border-t-[#FFD700] rounded-full animate-spin mb-6"></div>
        <h3 className="font-black text-black tracking-[0.3em] text-[11px] uppercase animate-pulse">
          Accediendo a Cluster Assets
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
            {/* Background con Overlay Cinematográfico */}
            <div className="absolute inset-0 z-0">
              <img 
                src={getImageUrl(item)} 
                alt={item.name} 
                className="w-full h-full object-cover opacity-50 grayscale-[30%] hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
            </div>

            {/* Info Section */}
            <div className="relative z-10 text-center px-6">
              <div className="overflow-hidden mb-2">
                <span className="text-[#FFD700] font-bold text-[10px] tracking-[0.5em] uppercase block">
                  {getCategoryName(item.category)}
                </span>
              </div>
              <h2 className="text-white font-black text-[clamp(40px,8vw,100px)] tracking-tighter leading-[0.85] mb-4 uppercase italic">
                {item.name}
              </h2>
              <div className="h-[2px] w-16 bg-[#FFD700] mx-auto mb-6"></div>
              <p className="text-white/50 font-mono text-[11px] tracking-[0.3em] uppercase max-w-md mx-auto">
                {item.description}
              </p>
            </div>

            {/* Buttons - Software DT Style */}
            <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-[90%] max-w-[600px] mb-8">
              <button 
                onClick={() => router.push(`/shop/product/${item._id}`)}
                className="flex-[2] py-5 bg-[#FFD700] text-black font-black text-xs uppercase tracking-[0.2em] hover:bg-white transition-all transform hover:translate-y-[-2px] active:scale-95"
              >
                Configurar Unidad
              </button>
              <button 
                onClick={() => router.push(`/shop/product/${item._id}`)}
                className="flex-1 py-5 bg-white/5 backdrop-blur-md text-white border border-white/20 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all"
              >
                Specs
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Indicador Progressivo */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-4">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToId(index)}
            className={`h-[3px] transition-all duration-500 ${
              activeIndex === index ? "w-12 bg-[#FFD700]" : "w-4 bg-white/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductShow;