"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  _id: string;
  name: string;
  brand?: string; // Opcional por si no viene de Atlas
  description: string;
  price: number;
  // Ajustado para aceptar string[] (como lo pusimos en Atlas) o el objeto previo
  images: any[]; 
  category: any;
}

const ProductShow = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Función para normalizar la URL de la imagen (Soporta Atlas string[] y Mock url objects)
  const getImageUrl = (product: Product) => {
    const img = product.images[0];
    return typeof img === 'string' ? img : img?.url || "/placeholder-drone.jpg";
  };

  useEffect(() => {
    const fetchDrones = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        if (!response.ok) throw new Error("Offline");
        const result = await response.json();
        // Ajustamos la respuesta al formato de tu API
        setProducts(result.data || result);
      } catch (error) {
        console.warn("Utilizando Mock Data (Software DT Style)");
        // Los mocks ahora siguen el patrón de Atlas que definimos antes
        setProducts([
          { _id: "1", name: "Phantom DT-Max", description: "Inspección térmica.", price: 2500, images: ["https://images.unsplash.com/photo-1507582020474-9a35b7d455d9"], category: "Industrial", brand: "DRONE DT" },
          { _id: "2", name: "AgriBot DT-10", description: "Fumigación pro.", price: 3800, images: ["https://images.unsplash.com/photo-1527142879024-c6c91aa9c5c9"], category: "Agricultura", brand: "DRONE DT" }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchDrones();
  }, []);

  const scrollToId = useCallback((index: number) => {
    if (scrollRef.current && products.length > 0) {
      const container = scrollRef.current;
      // Ajuste de cálculo para el snap-center
      const itemWidth = container.querySelector('div')?.clientWidth || 0;
      container.scrollTo({ left: index * itemWidth, behavior: 'smooth' });
      setActiveIndex(index);
    }
  }, [products.length]);

  const handleScroll = () => {
    if (scrollRef.current && products.length > 0) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      if (index !== activeIndex) setActiveIndex(index);
    }
  };

  if (loading) return (
    <div className="h-[90vh] flex flex-col items-center justify-center bg-main">
      <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-[#003366] font-bold tracking-widest animate-pulse font-mono">DRONE DT ENGINE STARTING...</p>
    </div>
  );

  return (
    <section className="relative w-full bg-white overflow-hidden group">
      {/* Contenedor con Snap Scroll y visibilidad parcial de la siguiente tarjeta */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex flex-row overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((item) => (
          <div 
            key={item._id} 
            // CLAVE: w-[90vw] hace que se vea un 10% de la siguiente tarjeta
            className="relative h-[85vh] min-h-[500px] w-[90vw] md:w-[100vw] flex-shrink-0 flex flex-col items-center justify-between py-10 md:py-20 snap-center overflow-hidden border-r border-white/10"
          >
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
              <img 
                src={getImageUrl(item)} 
                alt={item.name} 
                className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
            </div>

            {/* Content Top */}
            <div className="relative z-10 text-center px-6">
              <h2 className="text-[#FFD700] drop-shadow-2xl font-black text-[clamp(32px,7vw,80px)] tracking-tighter leading-none mb-2 uppercase">
                {item.name}
              </h2>
              <p className="text-white font-medium text-[clamp(12px,1.2vw,16px)] uppercase tracking-[0.4em] opacity-90">
                {item.brand || "DRONE DT"} — {typeof item.category === 'string' ? item.category : item.category?.name}
              </p>
            </div>

            {/* Buttons Bottom */}
            <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-[85%] max-w-[450px] px-4 mb-12">
              <button 
                onClick={() => router.push(`/shop/product/${item._id}`)}
                className="flex-1 py-4 bg-gold text-black font-black text-[11px] rounded-sm hover:bg-white transition-all duration-300 uppercase tracking-widest shadow-xl"
              >
                Order Now
              </button>
              <button className="flex-1 py-4 bg-black/40 backdrop-blur-md text-white border border-white/30 font-black text-[11px] rounded-sm hover:bg-white/20 transition-all duration-300 uppercase tracking-widest">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>

  );
};

export default ProductShow;