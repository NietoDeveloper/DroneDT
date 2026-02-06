"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  _id: string;
  name: string;
  brand?: string;
  description: string;
  price: number;
  images: any[]; 
  category: any;
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

  // 1. Fetch de Datos - Confiabilidad Software DT
  useEffect(() => {
    const fetchDrones = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        if (!response.ok) throw new Error("Offline");
        const result = await response.json();
        setProducts(result.data || result);
      } catch (error) {
        console.warn("Utilizando Mock Data (Software DT Style)");
        setProducts([
          { _id: "1", name: "Phantom DT-Max", description: "Inspección térmica.", price: 2500, images: ["https://images.unsplash.com/photo-1507582020474-9a35b7d455d9"], category: "Industrial", brand: "DRONE DT" },
          { _id: "2", name: "AgriBot DT-10", description: "Fumigación pro.", price: 3800, images: ["https://images.unsplash.com/photo-1527142879024-c6c91aa9c5c9"], category: "Agricultura", brand: "DRONE DT" },
          { _id: "3", name: "SkyView Cinema", description: "Cámara 8K.", price: 1800, images: ["https://images.unsplash.com/photo-1473968512447-ac1155104306"], category: "Cine", brand: "DRONE DT" }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchDrones();
  }, []);

  // 2. Lógica de Scroll - Optimizada para precisión
  const scrollToId = useCallback((index: number) => {
    if (scrollRef.current && products.length > 0) {
      const container = scrollRef.current;
      const card = container.querySelector('div');
      if (card) {
        const itemWidth = card.offsetWidth;
        container.scrollTo({ left: index * itemWidth, behavior: 'smooth' });
        setActiveIndex(index);
      }
    }
  }, [products.length]);

  // Intervalo de Banner (5 segundos)
  useEffect(() => {
    if (products.length <= 1) return;
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % products.length;
      scrollToId(nextIndex);
    }, 5000); 

    return () => clearInterval(interval);
  }, [activeIndex, products.length, scrollToId]);

  const handleScroll = () => {
    if (scrollRef.current && products.length > 0) {
      const { scrollLeft } = scrollRef.current;
      const card = scrollRef.current.querySelector('div');
      if (card) {
        const cardWidth = card.offsetWidth;
        const index = Math.round(scrollLeft / cardWidth);
        if (index !== activeIndex && index >= 0 && index < products.length) {
          setActiveIndex(index);
        }
      }
    }
  };

  if (loading) return (
    <div className="h-[90vh] flex flex-col items-center justify-center bg-[#DCDCDC] text-black">
      <div className="w-12 h-12 border-4 border-[#FFD700] border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="font-bold tracking-widest animate-pulse font-mono uppercase">Drone DT Engine Starting...</p>
    </div>
  );

  return (
    <section className="relative w-full bg-black overflow-hidden">
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex flex-row overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((item) => (
          <div 
            key={item._id} 
            className="relative h-[85vh] min-h-[500px] w-[85vw] md:w-full flex-shrink-0 flex flex-col items-center justify-between py-10 md:py-20 snap-center overflow-hidden border-r border-white/5"
          >
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
              <img 
                src={getImageUrl(item)} 
                alt={item.name} 
                className="w-full h-full object-cover transition-transform duration-[3000ms] hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/95"></div>
            </div>

            {/* Content Top */}
            <div className="relative z-10 text-center px-6">
              <h2 className="text-[#FFD700] drop-shadow-[0_5px_15px_rgba(0,0,0,0.9)] font-black text-[clamp(32px,7vw,80px)] tracking-tighter leading-none mb-3 uppercase italic">
                {item.name}
              </h2>
              <p className="text-white font-bold text-[clamp(10px,1.2vw,14px)] uppercase tracking-[0.6em] opacity-90">
                {item.brand || "DRONE DT"} — {typeof item.category === 'string' ? item.category : item.category?.name}
              </p>
            </div>

            {/* Buttons Bottom */}
            <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-[90%] max-w-[450px] px-4 mb-10">
              <button 
                onClick={() => router.push(`/shop/product/${item._id}`)}
                className="flex-1 py-4 bg-[#FFD700] text-black font-black text-[11px] rounded-sm hover:bg-white transition-all duration-300 uppercase tracking-[0.2em] shadow-[0_10px_20px_rgba(255,215,0,0.2)]"
              >
                Reservar Ahora
              </button>
              <button 
                onClick={() => router.push(`/shop/product/${item._id}`)}
                className="flex-1 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 font-black text-[11px] rounded-sm hover:bg-[#FFD700]/20 transition-all duration-300 uppercase tracking-[0.2em]"
              >
                Especificaciones
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots - Estilo Tech */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToId(index)}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              activeIndex === index ? "w-14 bg-[#FFD700] shadow-[0_0_15px_#FFD700]" : "w-4 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductShow;