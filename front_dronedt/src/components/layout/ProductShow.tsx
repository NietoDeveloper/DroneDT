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
    const img = product.images[0];
    return typeof img === 'string' ? img : img?.url || "/placeholder-drone.jpg";
  };

  // 1. Fetch de Datos desde el Back
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

  // 2. Lógica de Scroll Automático y Manual
  const scrollToId = useCallback((index: number) => {
    if (scrollRef.current && products.length > 0) {
      const container = scrollRef.current;
      const card = container.querySelector('div');
      if (card) {
        const itemWidth = card.clientWidth;
        container.scrollTo({ left: index * itemWidth, behavior: 'smooth' });
        setActiveIndex(index);
      }
    }
  }, [products.length]);

  // Intervalo para Banner Automático (5 segundos)
  useEffect(() => {
    if (products.length === 0) return;
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % products.length;
      scrollToId(nextIndex);
    }, 5000); 

    return () => clearInterval(interval);
  }, [activeIndex, products.length, scrollToId]);

  const handleScroll = () => {
    if (scrollRef.current && products.length > 0) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      // Ajustamos el cálculo del índice basándonos en el ancho del elemento hijo
      const cardWidth = scrollRef.current.querySelector('div')?.clientWidth || clientWidth;
      const index = Math.round(scrollLeft / cardWidth);
      if (index !== activeIndex) setActiveIndex(index);
    }
  };

  if (loading) return (
    <div className="h-[90vh] flex flex-col items-center justify-center bg-main text-white">
      <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="font-bold tracking-widest animate-pulse font-mono">DRONE DT ENGINE STARTING...</p>
    </div>
  );

  return (
    <section className="relative w-full bg-black overflow-hidden group">
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex flex-row overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((item) => (
          <div 
            key={item._id} 
            // CLAVE: w-[85vw] muestra la tarjeta actual y un 15% de la siguiente (ajustado de 90 a 85)
            className="relative h-[85vh] min-h-[500px] w-[85vw] md:w-[100vw] flex-shrink-0 flex flex-col items-center justify-between py-10 md:py-20 snap-center overflow-hidden border-r border-white/5"
          >
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
              <img 
                src={getImageUrl(item)} 
                alt={item.name} 
                className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90"></div>
            </div>

            {/* Content Top */}
            <div className="relative z-10 text-center px-6">
              <h2 className="text-[#FFD700] drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] font-black text-[clamp(28px,6vw,70px)] tracking-tighter leading-none mb-2 uppercase italic">
                {item.name}
              </h2>
              <p className="text-white font-bold text-[clamp(10px,1vw,14px)] uppercase tracking-[0.5em] opacity-80">
                {item.brand || "DRONE DT"} — {typeof item.category === 'string' ? item.category : item.category?.name}
              </p>
            </div>

            {/* Buttons Bottom */}
            <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-[85%] max-w-[400px] px-4 mb-10">
              <button 
                onClick={() => router.push(`/shop/product/${item._id}`)}
                className="flex-1 py-4 bg-gold text-black font-black text-[10px] rounded-sm hover:bg-white transition-all duration-300 uppercase tracking-widest shadow-2xl"
              >
                Reservar Ahora
              </button>
              <button className="flex-1 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 font-black text-[10px] rounded-sm hover:bg-gold/20 transition-all duration-300 uppercase tracking-widest">
                Detalles Técnicos
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToId(index)}
            className={`h-1 transition-all duration-500 rounded-full ${
              activeIndex === index ? "w-12 bg-gold shadow-[0_0_10px_#FFD700]" : "w-3 bg-white/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductShow;