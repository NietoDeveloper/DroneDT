"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string; 
  // Soportamos ambos formatos: Array de strings (Atlas) o Array de objetos (Legacy)
  images: any[]; 
  category: any;
  isActive?: boolean;
}

const ProductShow = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // EXTRACCIÓN ULTRA-ROBUSTA (Para el Commiter #1)
  const getImageUrl = (product: Product) => {
    if (product.imageUrl) return product.imageUrl;
    if (product.images && product.images.length > 0) {
      const firstImg = product.images[0];
      // Si es un objeto (Cloudinary style) o un string simple (Atlas style)
      return typeof firstImg === 'string' ? firstImg : firstImg.url;
    }
    return "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9"; // Backup Cinematic
  };

  const getCategoryName = (category: any) => {
    if (typeof category === 'object' && category !== null) return category.name;
    return typeof category === 'string' ? category : "Software DT Series";
  };

  const fetchDrones = useCallback(async () => {
    try {
      setLoading(true);
      // Forzamos el endpoint que tu log mostró como exitoso: /products/menu
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
      
      const response = await fetch(`${apiUrl}/products/menu`, { 
        cache: 'no-store' 
      });
      
      if (!response.ok) throw new Error("Fetch Failed");
      
      const result = await response.json();
      
      // Mapeo flexible para la data del Cluster Assets
      const data = result.data || result;
      
      if (!Array.isArray(data) || data.length === 0) throw new Error("No Data");

      setProducts(data);
    } catch (error) {
      console.warn("Drone DT Engine: Reintentando conexión con Cluster Assets...");
      // Solo cargamos Backup si el fetch falla totalmente
      setProducts([
        { 
            _id: "m1", 
            name: "DT-OFFLINE-MODE", 
            description: "Verificando enlace con base de datos...", 
            price: 0, 
            images: ["https://images.unsplash.com/photo-1507582020474-9a35b7d455d9"], 
            category: "System"
        }
      ]);
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  }, []);

  useEffect(() => {
    fetchDrones();
  }, [fetchDrones]);

  // ... (Resto de la lógica de scroll se mantiene igual)