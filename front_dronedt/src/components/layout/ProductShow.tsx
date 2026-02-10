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
rand: "SOFTWARE DT" 
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


      {/* Indicador Progressivo */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-4">
        {products.map((_, index) => (

        ))}
      </div>
    </section>
  );
};

export default ProductShow;