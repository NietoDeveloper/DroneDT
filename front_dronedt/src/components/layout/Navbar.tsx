"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ChevronRight, Circle } from 'lucide-react';

interface MenuItem {
  id: string;
  _id?: string;
  name: string;
  price?: string;
  desc?: string;
  img: string;
  category?: string;
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  const [menuContent, setMenuContent] = useState<Record<string, MenuItem[]>>({
    Modelos: [],
    Accesorios: [],
    Flota: [],
  });

  // Mapeo robusto: el back puede enviar 'Industrial', 'Agro', etc.
  const categoryMap: Record<string, string> = {
    'drone': 'Modelos',
    'accessory': 'Accesorios',
    'accesorios': 'Accesorios',
    'fleet': 'Flota',
    'industrial': 'Flota',
    'agro': 'Flota'
  };

  const fetchMenuData = useCallback(async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

    try {
      const response = await fetch(`${apiUrl}/products/menu`, {
        cache: 'no-store'
      });
      
      if (!response.ok) throw new Error('Error de conexión');

      const result = await response.json();
      // Extraemos el array de la propiedad 'data' o directamente del resultado
      const productsArray = Array.isArray(result.data) ? result.data : (Array.isArray(result) ? result : []);

      const categorized: Record<string, MenuItem[]> = { Modelos: [], Accesorios: [], Flota: [] };

      productsArray.forEach((item: any) => {
        // Normalización de categoría
        const rawCat = (item.category?.name || item.category || 'drone').toLowerCase();
        const targetCat = categoryMap[rawCat] || 'Modelos';

        // Extracción de imagen (soporta string directo o array de objetos)
        let displayImg = '/placeholder-drone.png';
        if (item.imageUrl) {
          displayImg = item.imageUrl;
        } else if (item.images && item.images.length > 0) {
          displayImg = typeof item.images[0] === 'string' ? item.images[0] : item.images[0].url;
        }

        if (categorized[targetCat]) {
          categorized[targetCat].push({
            id: item._id || item.id,
            name: item.name,
            price: item.price ? `$${item.price.toLocaleString()}` : 'Elite Spec',
            img: displayImg,
            desc: item.description || item.desc,
            category: targetCat
          });
        }
      });

      setMenuContent(categorized);
    } catch (error) {
      console.error("❌ Drone DT Uplink Error:", error);
    } finally {
      // Delay visual para el loader de Software DT
      setTimeout(() => setLoading(false), 800);
    }
  }, []);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) setIsLogged(true);

    fetchMenuData();

    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchMenuData]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'unset';
  }, [menuOpen]);

  // ... (El resto del componente Logo, Navbar y Menu se mantiene igual que tu original)