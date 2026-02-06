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

  useEffect(() => {
    const fetchDrones = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        if (!response.ok) throw new Error("Offline");
        const result = await response.json();
        // Adaptación flexible según la estructura de tu API
        const data = Array.isArray(result) ? result : result.data || [];
        setProducts(data);
      } catch (error) {
        console.warn("Utilizando Mock Data (Software DT Style)");
        setProducts([
          { _id: "1", name: "Phantom DT-Max", description: "Inspección térmica.", price: 2500, images: ["https://images.unsplash.com/photo-1507582020474-9a35b7d455d9"], category: "Industrial", brand: "DRONE DT" },
          { _id: "2", name: "AgriBot DT-10", description: "Fumigación pro.", price: 3800, images: ["https://images.unsplash.com/photo-1527142879024-c6c91aa9c5c9"], category: "Agricultura", brand: "DRONE DT" },
          { _id: "3", name: "SkyView Cinema", description: "Cámara 8K.", price: 1800, images: ["https://images.unsplash.com/photo-1473968512447-ac1155104306"], category: "Cine", brand: "DRONE DT" }
        ]);
      } finally {
        setTimeout(() => setLoading(false), 1500);
      }
    };
    fetchDrones();
  }, []);

  const scrollToId = useCallback((index: number) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const itemWidth = container.offsetWidth;
      container.scrollTo({ left: index * itemWidth, behavior: 'smooth' });
      setActiveIndex(index);
    }
  }, []);

  // Autoplay mejorado
  useEffect(() => {
    if (products.length <= 1 || loading) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const nextIndex = (prev + 1) % products.length;
        scrollToId(nextIndex);
        return nextIndex;
      });
    }, 6000); 

    return () => clearInterval(interval);
  }, [products.length, loading, scrollToId]);

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
    <div className="h-[85vh] w-full flex flex-col items-center justify-center bg-[#DCDCDC] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" 
        style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="relative flex flex-col items-center">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-12 bg-black rounded-lg animate-pulse"></div>
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-[#FFD700] rounded-full animate-spin"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-[#FFD700] rounded-full animate-spin"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-t-4 border-[#FFD700] rounded-full animate-spin"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-t-4 border-[#FFD700] rounded-full animate-spin"></div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <h3 className="font-black text-black tracking-[0.3em] text-sm uppercase">Initializing Systems</h3>
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-black animate-bounce"></span>
            <span className="w-2 h-2 bg-[#FFD700] animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-2 h-2 bg-black animate-bounce [animation-delay:0.4s]"></span>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-10 hidden md:block border-l-2 border-[#FFD700] pl-4">
        <p className="text-[10px] font-mono text-black uppercase tracking-widest leading-relaxed">
          Status: Syncing Cluster_DT<br/>
          Auth: Manuel_Nieto_Verified<br/>
          Rank: #1_Colombia_Committers
        </p>
      </div>
    </div>
  );

  return (
    <section className="relative w-full bg-black overflow-hidden">
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex flex-row overflow-x-auto snap-x snap-mandatory no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((item) => (
          <div 
            key={item._id} 
            className="relative h-[85vh] min-h-[500px] w-full flex-shrink-0 flex flex-col items-center justify-between py-10 md:py-20 snap-center overflow-hidden"
          >
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
              <img 
                src={getImageUrl(item)} 
                alt={item.name} 
                className="w-full h-full object-cover transition-transform duration-[6000ms] ease-out hover:scale-110"
              />
              {/* Overlay gradiente premium */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/90"></div>
            </div>

            {/* Content Top */}
            <div className="relative z-10 text-center px-6 mt-10">
              <h2 className="text-[#FFD700] drop-shadow-[0_5px_15px_rgba(0,0,0,0.9)] font-black text-[clamp(40px,8vw,90px)] tracking-tighter leading-none mb-3 uppercase italic">
                {item.name}
              </h2>
              <p className="text-white font-bold text-[clamp(12px,1.5vw,16px)] uppercase tracking-[0.6em] opacity-90">
                {item.brand || "DRONE DT"} — {getCategoryName(item.category)}
              </p>
            </div>

            {/* Buttons Bottom */}
            <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-[90%] max-w-[500px] px-4 mb-16">
              <button 
                onClick={() => router.push(`/shop/product/${item._id}`)}
                className="flex-1 py-4 bg-[#FFD700] text-black font-black text-[12px] rounded-sm hover:bg-white transition-all duration-300 uppercase tracking-[0.2em] shadow-lg active:scale-95"
              >
                Reservar Ahora
              </button>
              <button 
                onClick={() => router.push(`/shop/product/${item._id}`)}
                className="flex-1 py-4 bg-white/5 backdrop-blur-xl text-white border border-white/20 font-black text-[12px] rounded-sm hover:bg-[#FFD700] hover:text-black transition-all duration-300 uppercase tracking-[0.2em] active:scale-95"
              >
                Especificaciones
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToId(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              activeIndex === index ? "w-12 bg-[#FFD700] shadow-[0_0_15px_#FFD700]" : "w-3 bg-white/20 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductShow;