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
  const [loading, setLoading] = useState(true); 
  
  const [menuContent, setMenuContent] = useState<Record<string, MenuItem[]>>({
    Modelos: [],
    Accesorios: [],
    Flota: [],
  });

  const fetchMenuData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/menu`);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      
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
    } catch (error) {
      console.error("❌ Error en el Uplink de Drone DT:", error);
    } finally {
      setTimeout(() => setLoading(false), 1800);
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
          <div className="w-32 h-[1px] bg-black/10 overflow-hidden">
             <div className="w-full h-full bg-[#FFD700] -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
          </div>
        </div>
    </div>
  );

  const Logo = () => (
    <button 
      onClick={() => window.location.href = "/"} 
      className="group flex flex-col items-start cursor-pointer outline-none bg-transparent border-none p-0"
    >
      <div className="flex items-baseline transition-all duration-300 group-hover:scale-105">
        <span className="text-xl sm:text-2xl font-black tracking-widest text-[#0000FF] italic">Drone</span>
        <span className="text-xl sm:text-2xl font-black tracking-tighter not-italic ml-1 text-[#FFD700]">DT</span>
      </div>
      <span className="text-[7px] font-bold tracking-[0.4em] uppercase text-black/40 group-hover:text-[#FFD700] transition-colors">Colombia</span>
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
               {isLogged && <span className="text-[10px] font-bold text-green-600 uppercase tracking-tighter hidden md:block font-mono">System Online</span>}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            {['Modelos', 'Accesorios', 'Flota', 'Nosotros'].map((item) => (
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
                  onClick={() => setSelectedModel(item)}
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
                      <div 
                        key={product.id} 
                        className="group relative bg-white p-4 rounded-xl transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_30px_60px_-15px_rgba(255,215,0,0.3)] border border-transparent hover:border-[#FFD700]/60 cursor-pointer"
                      >
                         <div className="aspect-square bg-[#DCDCDC] overflow-hidden rounded-lg mb-6 border border-black/5 relative shadow-inner">
                            <img 
                              src={product.img} 
                              alt={product.name} 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#FFD700]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                         </div>
                         
                         <div className="space-y-2">
                           <h4 className="font-black text-2xl uppercase italic leading-tight group-hover:text-[#FFD700] transition-colors duration-300">
                             {product.name}
                           </h4>
                           <div className="flex justify-between items-end">
                             <p className="text-[14px] font-black text-[#FFD700] tracking-widest uppercase bg-black px-3 py-1 rounded-sm">
                               {product.price || 'Elite Spec'}
                             </p>
                             <div className="w-10 h-10 rounded-full border border-[#0000FF] flex items-center justify-center group-hover:bg-[#FFD700] group-hover:border-[#FFD700] transition-all duration-300">
                               <ChevronRight size={20} className="text-[#0000FF] group-hover:text-black transition-colors" />
                             </div>
                           </div>
                         </div>

                         <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-[#FFD700] transition-all duration-500 group-hover:w-[80%] shadow-[0_0_15px_#FFD700]"></div>
                      </div>
                   ))}
                </div>
             </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;