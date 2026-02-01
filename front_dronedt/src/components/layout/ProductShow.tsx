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

  // 1. Fetch de datos reales desde el Backend
  useEffect(() => {
    const fetchDrones = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        const result = await response.json();
        // Ajustamos según la estructura de respuesta de tu controlador
        const data = result.data || result;
        setProducts(data);
      } catch (error) {
        console.error("Error fetching drones:", error);
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
      
      container.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  }, [products.length]);

  // Autoplay mejorado
  useEffect(() => {
    if (products.length === 0) return;
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % products.length;
      scrollToId(nextIndex);
    }, 6000); // 6 segundos para dar tiempo a apreciar la tecnología

    return () => clearInterval(interval);
  }, [activeIndex, scrollToId, products.length]);

  const handleScroll = () => {
    if (scrollRef.current && products.length > 0) {
      const { scrollLeft, scrollWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / (scrollWidth / products.length));
      if (index !== activeIndex) setActiveIndex(index);
    }
  };

  const handleProductClick = (id: string) => {
    router.push(`/shop/product/${id}`);
  };

  if (loading) {
    return (
      <div className="h-[85vh] flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-headingColor font-bold tracking-widest uppercase text-xs">Cargando Flota Drone DT...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="relative w-full bg-white overflow-hidden group">
      {/* Contenedor Horizontal */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex flex-row overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((item) => (
          <div 
            key={item._id} 
            className="relative h-[85vh] min-h-[600px] w-screen md:w-[70vw] lg:w-[100vw] flex-shrink-0 flex flex-col items-center justify-between py-12 md:py-20 snap-center border-r border-white/5 overflow-hidden"
          >
            {/* Background Image con Hover Suave */}
            <div 
              onClick={() => handleProductClick(item._id)}
              className="absolute inset-0 z-0 cursor-pointer group/item transition-transform duration-1000 ease-in-out hover:scale-105"
            >
              <img 
                src={item.images[0]?.url || 'https://via.placeholder.com/1920x1080?text=Drone+DT'} 
                alt={item.name} 
                className="w-full h-full object-cover"
              />
              {/* Overlay de Luxury DT - Degradado para legibilidad */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 group-hover/item:bg-black/20 transition-colors duration-700"></div>
            </div>

            {/* Content Top */}
            <div className="relative z-10 text-center px-4 pointer-events-none">
              <h2 className="text-white drop-shadow-2xl font-bold text-[clamp(32px,6vw,80px)] tracking-tighter leading-none mb-2">
                {item.name}
              </h2>
              <p className="text-gold font-bold text-[clamp(12px,1.2vw,16px)] uppercase tracking-[0.4em] drop-shadow-md">
                {item.brand}
              </p>
            </div>

            {/* Buttons Bottom */}
            <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full max-w-[85%] sm:max-w-[450px] px-4 mb-16">
              <button 
                onClick={() => handleProductClick(item._id)}
                className="flex-1 py-4 bg-white text-black font-bold text-[11px] rounded-[4px] hover:bg-gold hover:text-white transition-all duration-300 uppercase tracking-[0.2em] shadow-2xl"
              >
                Reservar Ahora
              </button>
              <button className="flex-1 py-4 bg-black/40 backdrop-blur-xl text-white border border-white/20 font-bold text-[11px] rounded-[4px] hover:bg-black transition-all duration-300 uppercase tracking-[0.2em] shadow-2xl">
                Especificaciones
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Puntos de Navegación - Estilo Software DT */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-5 p-2 bg-black/10 backdrop-blur-md rounded-full px-6">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToId(index)}
            className={`h-1.5 transition-all duration-700 rounded-full cursor-pointer ${
              activeIndex === index 
                ? "w-16 bg-gold shadow-[0_0_20px_rgba(255,215,0,0.8)]" 
                : "w-4 bg-white/40 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductShow;