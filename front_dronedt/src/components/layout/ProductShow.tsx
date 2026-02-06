"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Optimización de Next.js

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
      // Usamos el fallback a localhost si la variable de entorno no está definida
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
      const response = await fetch(`${apiUrl}/products`);
      
      if (!response.ok) throw new Error("API Offline");
      
      const result = await response.json();
      const data = Array.isArray(result) ? result : result.data || [];
      
      if (data.length === 0) throw new Error("Empty Data");
      setProducts(data);
    } catch (error) {
      console.warn("Drone DT Engine: Activando Mock Data de Seguridad");
      setProducts([
        { _id: "1", name: "Phantom DT-Max", description: "Inspección térmica.", price: 2500, images: ["https://images.unsplash.com/photo-1507582020474-9a35b7d455d9"], category: "Industrial", brand: "DRONE DT" },
        { _id: "2", name: "AgriBot DT-10", description: "Fumigación pro.", price: 3800, images: ["https://images.unsplash.com/photo-1527142879024-c6c91aa9c5c9"], category: "Agricultura", brand: "DRONE DT" },
        { _id: "3", name: "SkyView Cinema", description: "Cámara 8K.", price: 1800, images: ["https://images.unsplash.com/photo-1473968512447-ac1155104306"], category: "Cine", brand: "DRONE DT" }
      ]);
    } finally {
      // Delay artificial para lucir el loader de Software DT
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
      setActiveIndex((prev) => {
        const nextIndex = (prev + 1) % products.length;
        scrollToId(nextIndex);
        return nextIndex;
      });
    }, 7000); 

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
          <div className="absolute bottom-0 right-0 w-8 h-8 border-t-4 border-[#FFD700] rounded-full animate-spin [animation-delay:0.5s]"></div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <h3 className="font-black text-black tracking-[0.3em] text-sm uppercase">Engine Telemetry Active</h3>
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-black animate-bounce"></span>
            <span className="w-2 h-2 bg-[#FFD700] animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-2 h-2 bg-black animate-bounce [animation-delay:0.4s]"></span>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-10 hidden md:block border-l-2 border-[#FFD700] pl-4">
        <p className="text-[10px] font-mono text-black uppercase tracking-widest leading-relaxed">
          Sincronizando Clusters...<br/>
          Dev: Manuel Nieto<br/>
          Status: Committer #1 COL
        </p>
      </div>
    </div>
  );

  return (
    <section className="relative w-full bg-black overflow-hidden border-y border-white/5">
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex flex-row overflow-x-auto snap-x snap-mandatory no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((item) => (
          <div 
            key={item._id} 
            className="relative h-[85vh] min-h-[600px] w-full flex-shrink-0 flex flex-col items-center justify-between py-12 md:py-24 snap-center overflow-hidden"
          >
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
              <img 
                src={getImageUrl(item)} 
                alt={item.name} 
                className="w-full h-full object-cover transition-transform duration-[10000ms] ease-linear scale-105 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90"></div>
            </div>

            {/* Content Top */}
            <div className="relative z-10 text-center px-6">
              <span className="text-[#FFD700] font-bold text-xs tracking-[0.5em] uppercase mb-4 block animate-fade-in">
                {getCategoryName(item.category)}
              </span>
              <h2 className="text-white font-black text-[clamp(45px,10vw,110px)] tracking-tighter leading-[0.85] mb-4 uppercase italic">
                {item.name}
              </h2>
              <div className="h-1 w-20 bg-[#FFD700] mx-auto mb-6"></div>
            </div>

            {/* Buttons Bottom */}
            <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-[90%] max-w-[550px] px-4 mb-20">
              <button 
                onClick={() => router.push(`/shop/product/${item._id}`)}
                className="flex-[2] py-5 bg-[#FFD700] text-black font-black text-[13px] rounded-none hover:bg-white transition-all duration-500 uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(255,215,0,0.3)] active:scale-95"
              >
                Configurar Unidad
              </button>
              <button 
                onClick={() => router.push(`/shop/product/${item._id}`)}
                className="flex-1 py-5 bg-white/5 backdrop-blur-md text-white border border-white/20 font-black text-[11px] rounded-none hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-[0.2em] active:scale-95"
              >
                Specs
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToId(index)}
            className={`transition-all duration-700 ${
              activeIndex === index 
              ? "w-16 h-[3px] bg-[#FFD700] shadow-[0_0_15px_#FFD700]" 
              : "w-4 h-[2px] bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Side HUD Decor */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-8 opacity-40">
        <div className="rotate-90 origin-right text-[10px] font-mono tracking-[0.5em] text-white uppercase whitespace-nowrap">
          Drone DT // Autonomous Systems
        </div>
      </div>
    </section>
  );
};

export default ProductShow;