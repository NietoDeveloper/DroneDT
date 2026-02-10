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

  const categoryMap: Record<string, string> = {
    'drone': 'Modelos',
    'accessory': 'Accesorios',
    'accesorios': 'Accesorios',
    'fleet': 'Flota',
    'industrial': 'Flota',
    'agro': 'Flota'
  };

  const fetchMenuData = useCallback(async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000/api/v1';

    try {
      const response = await fetch(`${apiUrl}/products/menu`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store'
      });
      
      if (!response.ok) throw new Error('Uplink Refused');

      const result = await response.json();
      const productsArray = Array.isArray(result.data) ? result.data : (Array.isArray(result) ? result : []);

      const categorized: Record<string, MenuItem[]> = { Modelos: [], Accesorios: [], Flota: [] };

      productsArray.forEach((item: any) => {
        const rawCat = (item.category?.name || item.category || 'drone').toLowerCase();
        const targetCat = categoryMap[rawCat] || 'Modelos';

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
      console.error("❌ Drone DT Uplink Offline:", error);
    } finally {
      setLoading(false);
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

  // LOGO ACTUALIZADO: SVG Custom con hélices animadas
  const Logo = () => (
    <Link href="/" className="group flex items-center gap-3 outline-none">
      <div className="relative flex items-center justify-center">
        <svg 
          width={isScrolled ? "30" : "36"} 
          height={isScrolled ? "30" : "36"} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#FFD700" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="transition-all duration-500 group-hover:rotate-[15deg] group-hover:scale-110 z-10"
        >
          <path d="M12 10V4" />
          {/* Hélices superiores con animación de rotación */}
          <path d="m17 2 3 3" className="animate-[pulse_0.5s_infinite]" />
          <path d="m7 2-3 3" className="animate-[pulse_0.4s_infinite]" />
          <path d="M2 10h20" />
          <path d="m22 10-3 3" />
          <path d="m2 10 3 3" />
          <path d="M12 10v12" />
          {/* Hélices inferiores */}
          <path d="m17 22 3-3" className="animate-[pulse_0.6s_infinite]" />
          <path d="m7 22-3-3" className="animate-[pulse_0.3s_infinite]" />
          <circle cx="12" cy="10" r="2" fill="#0000FF" stroke="none" />
        </svg>
        
        {/* Resplandor de motor */}
        <div className="absolute inset-0 bg-[#FFD700]/10 blur-md rounded-full group-hover:bg-[#FFD700]/30 transition-all scale-150" />
      </div>
      
      <div className="flex flex-col items-start leading-none">
        <div className="flex items-baseline">
          <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0000FF] italic">Drone</span>
          <span className="text-xl sm:text-2xl font-black tracking-tighter not-italic ml-0.5 text-[#FFD700]">DT</span>
        </div>
        <span className="text-[7px] font-bold tracking-[0.5em] uppercase text-black/60 group-hover:text-[#0000FF] transition-colors">Colombia</span>
      </div>
    </Link>
  );

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
      <p className="font-black text-[11px] tracking-[0.6em] text-black uppercase animate-pulse">Establishing Uplink</p>
    </div>
  );

  return (
    <>
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-[1900px] mx-auto flex justify-between items-center px-6 sm:px-10">
          <div className="flex items-center gap-6 flex-1">
            <Logo />
            <div className="flex items-center gap-2">
              <Circle size={8} fill={isLogged ? "#FFD700" : "transparent"} className={`${isLogged ? 'text-[#FFD700] animate-pulse' : 'text-black/10'} hidden sm:block`} />
              {isLogged && <span className="text-[10px] font-bold text-[#FFD700] uppercase tracking-tighter hidden md:block font-mono">System Online</span>}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            {['Modelos', 'Accesorios', 'Flota'].map((item) => (
              <button
                key={item}
                onClick={() => { setSelectedModel(item); setMenuOpen(true); }}
                className="px-5 py-2 text-[#0000FF] font-black text-[13px] uppercase tracking-widest transition-all duration-300 hover:text-[#FFD700] hover:-translate-y-1 bg-transparent cursor-pointer border-none"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-end gap-4 flex-1">
            <button 
              onClick={() => setMenuOpen(true)}
              className="px-6 py-2 text-white font-black text-[13px] uppercase tracking-[0.2em] bg-[#0000FF] rounded-full transition-all duration-300 hover:bg-[#FFD700] hover:text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] cursor-pointer border-none"
            >
              Menú
            </button>
          </div>
        </div>
      </nav>

      {/* Menu Overlay */}
      <div className={`fixed inset-0 bg-white z-[110] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} flex flex-col overflow-hidden`}>
        <div className="flex justify-between items-center px-6 sm:px-10 py-6 border-b border-gray-50">
          <div className="opacity-40">
              <span className="text-black font-black tracking-tighter text-xl italic uppercase font-sans">Uplink Selection</span>
          </div>
          <button 
            onClick={() => {setMenuOpen(false); setSelectedModel(null)}} 
            className="p-2 text-[#0000FF] transition-all duration-300 hover:text-[#FFD700] hover:scale-110 hover:rotate-90 cursor-pointer outline-none bg-transparent border-none"
          >
            <X size={35} strokeWidth={3} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto px-6 sm:px-10 w-full max-w-[1800px] mx-auto flex flex-col">
          {!selectedModel ? (
            <div className="flex flex-col space-y-2 md:space-y-4 pt-8">
              {['Modelos', 'Accesorios', 'Flota', 'Nosotros'].map((item) => (
                <button 
                  key={item}
                  onClick={() => item === 'Nosotros' ? (window.location.href = '/nosotros') : setSelectedModel(item)}
                  className="group flex items-center justify-between text-5xl sm:text-7xl md:text-8xl text-black font-black uppercase italic tracking-tighter hover:text-[#FFD700] transition-all duration-300 text-left border-none bg-transparent cursor-pointer"
                >
                  <span>{item}</span>
                  <ChevronRight size={60} className="opacity-0 group-hover:opacity-100 -translate-x-10 group-hover:translate-x-0 transition-all duration-500 text-[#FFD700]" />
                </button>
              ))}
            </div>
          ) : (
             <div className="pt-10">
                <button 
                  onClick={() => setSelectedModel(null)}
                  className="mb-8 text-[#0000FF] font-black uppercase tracking-[0.3em] flex items-center gap-2 hover:text-[#FFD700] transition-all border-none bg-transparent cursor-pointer"
                >
                  ← Volver al Menú
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
                    {menuContent[selectedModel]?.map((product) => (
                      <Link 
                        href={`/shop/product/${product.id}`}
                        key={product.id} 
                        onClick={() => setMenuOpen(false)}
                        className="group relative bg-white p-4 rounded-xl transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_30px_60px_-15px_rgba(255,215,0,0.3)] border border-transparent hover:border-[#FFD700]/60"
                      >
                         <div className="aspect-square bg-[#DCDCDC] overflow-hidden rounded-lg mb-6 border border-black/5 relative shadow-inner">
                            <Image 
                              src={product.img} 
                              alt={product.name} 
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className="object-cover group-hover:scale-110 transition-transform duration-700" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#FFD700]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                         </div>
                         
                         <div className="space-y-2">
                           <h4 className="font-black text-2xl uppercase italic leading-tight group-hover:text-[#FFD700] transition-colors duration-300">
                             {product.name}
                           </h4>
                           <div className="flex justify-between items-end">
                             <p className="text-[14px] font-black text-[#FFD700] tracking-widest uppercase bg-black px-3 py-1 rounded-sm">
                               {product.price}
                             </p>
                             <div className="w-10 h-10 rounded-full border border-[#0000FF] flex items-center justify-center group-hover:bg-[#FFD700] group-hover:border-[#FFD700] transition-all duration-300">
                               <ChevronRight size={20} className="text-[#0000FF] group-hover:text-black transition-colors" />
                             </div>
                           </div>
                         </div>
                         <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-[#FFD700] transition-all duration-500 group-hover:w-[80%] shadow-[0_0_15px_#FFD700]"></div>
                      </Link>
                    ))}
                    {menuContent[selectedModel]?.length === 0 && (
                      <p className="text-black/30 font-bold uppercase tracking-widest">No hay productos disponibles en esta categoría</p>
                    )}
                </div>
             </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;