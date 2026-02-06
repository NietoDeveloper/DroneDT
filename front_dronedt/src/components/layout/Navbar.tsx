"use client";

import { useState, useEffect, useCallback } from 'react';
import { User, X, ChevronRight, Globe, Circle } from 'lucide-react';

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
  
  const [menuContent, setMenuContent] = useState<Record<string, MenuItem[]>>({
    Modelos: [],
    Accesorios: [],
    Flota: [],
  });

  const fetchMenuData = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/menu`);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      
      // Normalización robusta para Drone DT Uplink
      if (Array.isArray(data)) {
        const categorized = data.reduce((acc: any, item: MenuItem) => {
          const cat = item.category || 'Modelos';
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push({
            ...item,
            id: item._id || item.id || Math.random().toString(36).substr(2, 9)
          });
          return acc;
        }, { Modelos: [], Accesorios: [], Flota: [] });
        
        setMenuContent(categorized);
      } else {
        const normalized: any = {};
        Object.keys(data).forEach(key => {
          normalized[key] = data[key].map((item: any) => ({
            ...item,
            id: item._id || item.id
          }));
        });
        setMenuContent(normalized);
      }

      if (process.env.NEXT_PUBLIC_AUTH_DEBUG === 'true') {
        console.log("🛸 Drone DT Uplink Synchronized:", data);
      }
    } catch (error) {
      console.error("❌ Error en el Uplink de Drone DT:", error);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLogged(true);

    fetchMenuData();

    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchMenuData]);

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'unset';
  }, [menuOpen]);

  const Logo = () => (
    <button 
      onClick={() => window.location.href = "/"} 
      className="group flex flex-col items-start cursor-pointer outline-none bg-transparent border-none p-0"
    >
      <div className="flex items-baseline transition-all duration-300 group-hover:scale-105">
        <span className="text-xl sm:text-2xl font-black tracking-widest text-[#0000FF] italic">Drone</span>
        <span className="text-xl sm:text-2xl font-black tracking-tighter not-italic ml-1 text-gold">DT</span>
      </div>
      <span className="text-[7px] font-bold tracking-[0.4em] uppercase text-black/40 group-hover:text-[#0000FF] transition-colors">Colombia</span>
    </button>
  );

  return (
    <>
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-[1900px] mx-auto flex justify-between items-center px-6 sm:px-10">
          <div className="flex items-center gap-6 flex-1">
            <Logo />
            <div className="flex items-center gap-2">
               <Circle size={8} fill={isLogged ? "#22c55e" : "transparent"} className={`${isLogged ? 'text-green-500 animate-pulse' : 'text-black/10'} hidden sm:block`} />
               {isLogged && <span className="text-[10px] font-bold text-green-600 uppercase tracking-tighter hidden md:block">System Online</span>}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            {['Modelos', 'Accesorios', 'Flota', 'Nosotros'].map((item) => (
              <button
                key={item}
                onClick={() => { setSelectedModel(item); setMenuOpen(true); }}
                className="px-5 py-2 text-[#0000FF] font-black text-[13px] uppercase tracking-widest transition-all duration-300 hover:text-gold hover:-translate-y-1 bg-transparent cursor-pointer border-none"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-end gap-4 flex-1">
            <button 
              onClick={() => setMenuOpen(true)}
              className="px-6 py-2 text-white font-black text-[13px] uppercase tracking-[0.2em] bg-[#0000FF] rounded-full transition-all duration-300 hover:bg-gold hover:text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(0,0,255,0.3)] cursor-pointer border-none"
            >
              Menú
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Overlay Menu */}
      <div className={`fixed inset-0 bg-white z-[110] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} flex flex-col overflow-hidden`}>
        
        <div className="flex justify-between items-center px-6 sm:px-10 py-6 border-b border-gray-50">
          <div className="opacity-40 transition-opacity">
              <span className="text-black font-black tracking-tighter text-xl italic uppercase font-sans">Uplink Selection</span>
          </div>
          <button 
            onClick={() => {setMenuOpen(false); setSelectedModel(null)}} 
            className="p-2 text-[#0000FF] transition-all duration-300 hover:text-gold hover:scale-110 hover:rotate-90 cursor-pointer outline-none bg-transparent border-none"
          >
            <X size={35} strokeWidth={3} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto px-6 sm:px-10 w-full max-w-[1800px] mx-auto flex flex-col">
          {!selectedModel ? (
            <div className="flex flex-col space-y-2 md:space-y-4 pt-8">
              {['Modelos', 'Accesorios', 'Flota', 'Nosotros'].map((item, index) => (
                <button 
                  key={item}
                  onClick={() => setSelectedModel(item)}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className="animate-in fade-in slide-in-from-bottom-8 duration-700 text-5xl sm:text-7xl md:text-9xl text-black font-black