"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl?: string;
  category?: { name: string } | string;
  description?: string;
}

const ProductShow = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    // 🛰️ UPLINK TUNNEL: Usamos la ruta relativa que Next.js ya mapea a Railway
    const endpoint = '/api/v1/products'; 

    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) throw new Error(`Uplink Refused: ${response.status}`);

      const result = await response.json();
      
      // Sincronización con el cluster (soporta data wrapper o array directo)
      const data = result.success ? result.data : (Array.isArray(result) ? result : []);
      
      // Solo tomamos los que tengan nombre para no romper el Reel
      setProducts(data.filter((p: any) => p.name));
    } catch (error) {
      console.error("❌ ProductShow Uplink Offline:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading || products.length === 0) return null; // No mostramos nada hasta que haya data

  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-[1900px] mx-auto px-6 sm:px-10">
        {/* Título con Identidad Drone DT */}
        <div className="mb-12">
          <h2 className="text-4xl sm:text-6xl font-black uppercase italic tracking-tighter text-black">
            Available <span className="text-[#0000FF]">Units</span>
          </h2>
          <div className="w-20 h-1.5 bg-[#FFD700] mt-4" />
        </div>

        {/* 🛸 THE REEL: Mantenemos tu lógica de movimiento intacta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link 
              key={product._id} 
              href={`/shop/product/${product._id}`}
              className="group block relative overflow-hidden rounded-2xl bg-[#F5F5F5] transition-all hover:-translate-y-2"
            >
              <div className="aspect-[4/5] relative w-full overflow-hidden">
                <Image
                  src={product.imageUrl || '/drone-placeholder.png'}
                  alt={product.name}
                  fill
                  unoptimized
                  className="object-contain p-8 group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              {/* Overlay de Info - Sincronizado con DB */}
              <div className="p-6 bg-white border-t border-gray-100">
                <h3 className="font-black text-xl uppercase italic text-black truncate">
                  {product.name.replace(/_/g, ' ')}
                </h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-[12px] font-bold tracking-widest text-black/40 uppercase">
                    {typeof product.category === 'object' ? product.category.name : (product.category || 'Standard')}
                  </span>
                  <span className="text-[#0000FF] font-black text-lg">
                    ${product.price?.toLocaleString() || '---'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShow;