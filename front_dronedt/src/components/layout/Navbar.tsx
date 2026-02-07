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

  const fetchMenuData = useCallback(async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      console.warn("⚠️ NEXT_PUBLIC_API_URL no definida.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/products/menu`);
      if (!response.ok) throw new Error('Error de conexión con la flota');

      const data = await response.json();

      if (Array.isArray(data)) {
        const categorized = data.reduce((acc: Record<string, MenuItem[]>, item: MenuItem) => {
          const cat = item.category || 'Modelos';
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push({
            ...item,
            id: item._id || item.id || Math.random().toString(36).substring(2, 9)
          });
          return acc;
        }, { Modelos: [], Accesorios: [], Flota: [] });

        setMenuContent(categorized);
      } else {
        const normalized: Record<string, MenuItem[]> = {};
        Object.keys(data).forEach(key => {
          normalized[key] = data[key].map((item: any) => ({
            ...item,
            id: item._id || item.id
          }));
        });
        setMenuContent(normalized);
      }
    } catch (error) {
      console.error("❌ Error en el Uplink de Drone DT:", error);
    } finally {
      setTimeout(() => setLoading(false), 1800);
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

  if (loading) return (
    <div className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-[#DCDCDC]">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-12 bg-black rounded-lg animate-pulse shadow-xl"></div>
        <div className="absolute top-0 left-0 w-8 h-8 border-t-[3px] border-[#FFD700] rounded-full animate-spin"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-[3px] border-[#FFD700] rounded-full animate-spin [animation-duration:0.3s]"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-t-[3px] border-[#FFD700] rounded-full animate-spin [animation-duration:0.5s]"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-t-[3px] border-[#FFD700] rounded-full animate-spin [animation-duration:0.4s]"></div>
        <div className="absolute w-40 h-[2px] bg-[#FFD700] left-1/2 -translate-x-1/2 animate-bounce opacity-80 shadow-[0_0_15px_#FFD700]"></div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="font-black text-[11px] tracking-[0.6em] text-black uppercase animate-pulse">
          Establishing Uplink
        </p>
      </div>
    </div>
  );

  const Logo = () => (
    <Link href="/" className="group flex flex-col items-start outline-none">




export default Navbar;