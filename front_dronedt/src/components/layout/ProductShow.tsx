"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  _id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  images: { url: string }[];
  category: { name: string } | string;
}

const ProductShow = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();


  useEffect(() => {
    const fetchDrones = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        if (!response.ok) throw new Error("Offline");
        const result = await response.json();
        setProducts(result.data || result);
      } catch (error) {
        console.warn("Utilizando Mock Data (Software DT Style)");
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };
    fetchDrones();
  }, []);

  const scrollToId = useCallback((index: number) => {
    if (scrollRef.current && products.length > 0) {
      const container = scrollRef.current;
      const itemWidth = container.scrollWidth / products.length;
      container.scrollTo({ left: index * itemWidth, behavior: 'smooth' });
      setActiveIndex(index);
    }
  }, [products.length]);


  if (loading) return (
    <div className="h-[90vh] flex flex-col items-center justify-center bg-main">
      <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-[#003366] font-bold tracking-widest animate-pulse">DRONE DT ENGINE STARTING...</p>
    </div>
  );

  return (
    <section className="relative w-full bg-white overflow-hidden group">
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex flex-row overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((item) => (
          <div 
            key={item._id} 
            className="relative h-[90vh] min-h-[500px] w-screen flex-shrink-0 flex flex-col items-center justify-between py-10 md:py-24 snap-center overflow-hidden"
          >


            </div>

            {/* Buttons Bottom: Hover Gold Flotante */}
            <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-[90%] max-w-[500px] px-4 mb-10">
              <button 
                onClick={() => router.push(`/shop/product/${item._id}`)}
                className="flex-1 py-4 bg-white/90 backdrop-blur-md text-black font-black text-[10px] md:text-[12px] rounded-sm hover:bg-gold hover:text-white hover:-translate-y-2 transition-all duration-300 uppercase tracking-widest shadow-[0_10px_20px_rgba(0,0,0,0.3)] hover:shadow-gold/40"
              >
                Reservar Ahora
              </button>
              <button className="flex-1 py-4 bg-black/50 backdrop-blur-md text-white border border-white/20 font-black text-[10px] md:text-[12px] rounded-sm hover:bg-gold/80 hover:-translate-y-2 transition-all duration-300 uppercase tracking-widest shadow-2xl">
                Especificaciones
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
              activeIndex === index ? "w-12 bg-gold shadow-lg" : "w-3 bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductShow;