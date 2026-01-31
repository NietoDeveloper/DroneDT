"use client";

import { useState, useEffect } from 'react';
import { User, X, ChevronRight, Globe, Circle } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  price?: string;
  desc?: string;
  img: string;
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLogged(true);

    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuContent: Record<string, MenuItem[]> = {
    Modelos: [
      { id: 1, name: "INDUSTRIAL X-1", desc: "Autonomía de 45 min", img: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800" },
      { id: 2, name: "SURVEILLANCE S-4", desc: "Cámara térmica", img: "https://images.unsplash.com/photo-1527142879024-c6c91aa9c5c7?auto=format&fit=crop&q=80&w=800" },
      { id: 3, name: "AGRICULTURE PRO", desc: "Mapeo NDVI", img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800" },
    ],
  };

  const Logo = () => (
    <button onClick={() => window.location.href = "/"} className="group flex flex-col items-start cursor-pointer outline-none">
      <div className="flex items-baseline transition-all duration-300">
        <span className="text-xl sm:text-2xl font-black tracking-widest text-[#0000FF] italic">Drone</span>
        <span className="text-xl sm:text-2xl font-black tracking-tighter not-italic ml-1 text-gold">DT</span>
      </div>
      <span className="text-[7px] font-bold tracking-[0.4em] uppercase text-white/40 group-hover:text-gold transition-colors">Colombia</span>
    </button>
  );

  return (
    <>
      {/* NAV TRANSPARENTE */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 bg-transparent`}>
        <div className="max-w-[1900px] mx-auto flex justify-between items-center px-6 sm:px-10 py-4">
          <div className="flex items-center gap-6 flex-1">
            <Logo />
            <Circle size={8} fill={isLogged ? "#22c55e" : "transparent"} className={`${isLogged ? 'text-green-500' : 'text-white/10'} hidden sm:block`} />
          </div>

          {/* BOTONES CENTRALES AJUSTADOS (ONLY GOLD HOVER) */}
          <div className="hidden lg:flex items-center gap-2">
            {['Modelos', 'Accesorios', 'Flota', 'Nosotros'].map((item) => (
              <button
                key={item}
                onClick={() => { setSelectedModel(item); setMenuOpen(true); }}
                className="px-5 py-2 text-[#0000FF] font-black text-[13px] uppercase tracking-widest transition-all duration-300 hover:text-gold hover:-translate-y-1 bg-transparent cursor-pointer outline-none"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-end gap-4 flex-1">
            <button 
              onClick={() => setMenuOpen(true)}
              className="px-6 py-2 text-white font-black text-[13px] uppercase tracking-[0.2em] bg-[#0000FF] rounded-full transition-all duration-300 hover:bg-gold hover:text-black hover:scale-105 cursor-pointer"
            >
              Menú
            </button>
          </div>
        </div>
      </nav>

      {/* MENÚ FULLSCREEN */}
      <div className={`fixed inset-0 bg-white z-[110] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} flex flex-col overflow-hidden`}>
        
        <div className="flex justify-between items-center px-6 sm:px-10 py-6">
          <div className="opacity-0 lg:opacity-100 transition-opacity">
             <span className="text-black/20 font-black tracking-tighter text-xl italic uppercase">Drone DT Selection</span>
          </div>
          <button 
            onClick={() => {setMenuOpen(false); setSelectedModel(null)}} 
            className="p-2 text-[#0000FF] transition-all duration-300 hover:text-gold hover:scale-125 hover:rotate-90 cursor-pointer outline-none"
          >
            <X size={35} strokeWidth={3} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto px-6 sm:px-10 w-full max-w-[1800px] mx-auto flex flex-col">
          {!selectedModel ? (
            <div className="flex flex-col space-y-2 md:space-y-4 pt-4 sm:pt-8">
              {['Modelos', 'Accesorios', 'Flota', 'Nosotros'].map((item, index) => (
                <button 
                  key={item}
                  onClick={() => setSelectedModel(item)}
                  style={{ animationDelay: `${index * 70}ms` }}
                  className="animate-in fade-in slide-in-from-bottom-5 duration-700 text-4xl sm:text-6xl md:text-8xl text-black font-black tracking-tighter flex justify-between items-center group w-full transition-all duration-300 hover:text-gold hover:-translate-y-3 text-left cursor-pointer bg-transparent"
                >
                  <span>{item}</span>
                  <ChevronRight className="text-black/5 group-hover:text-gold transition-all" size={50} />
                </button>
              ))}
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-10 duration-500 pb-10 pt-4 sm:pt-8">
              <button onClick={() => setSelectedModel(null)} className="text-[#0000FF] text-[11px] font-black tracking-[0.4em] mb-6 flex items-center uppercase hover:text-gold transition-colors cursor-pointer outline-none">
                <ChevronRight className="rotate-180 mr-2" size={16} /> Volver a categorías
              </button>

              <h2 className="text-3xl sm:text-5xl font-black text-[#0000FF] mb-6 tracking-tighter uppercase">{selectedModel}</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                {menuContent[selectedModel]?.map((item) => (
                  <div key={item.id} className="group flex flex-col bg-neutral-50 rounded-[24px] overflow-hidden border border-transparent hover:border-gold/30 hover:shadow-2xl transition-all">
                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-200">
                       <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h4 className="text-black font-black text-lg tracking-tight mb-1">{item.name}</h4>
                      <p className="text-gray-500 text-[10px] mb-3">{item.desc}</p>
                      <button className="w-full py-1.5 mb-2 border border-black/10 text-black/60 rounded-lg font-bold text-[8px] uppercase tracking-widest hover:bg-black hover:text-white transition-all">Info Técnica</button>
                      <button className="w-full py-2 bg-[#0000FF] text-white rounded-lg font-black text-[9px] uppercase tracking-widest hover:bg-gold hover:text-black transition-all">Comprar</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto pt-8 pb-10 border-t border-gray-100 flex flex-col space-y-6 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center space-x-8">
                <button onClick={() => window.location.href = "/login"} className="flex items-center gap-3 group cursor-pointer">
                  <div className={`p-2 rounded-full transition-all ${isLogged ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gold group-hover:bg-[#0000FF] group-hover:text-white'}`}>
                    <User size={20} />
                  </div>
                  <span className="text-[11px] font-black tracking-[0.2em] text-black uppercase">{isLogged ? 'Dashboard' : 'Account'}</span>
                </button>
                <button className="flex items-center gap-3 text-gray-400 hover:text-[#0000FF] transition-colors cursor-pointer">
                  <Globe size={18} />
                  <span className="text-[11px] font-black tracking-[0.2em] uppercase">ES / EN</span>
                </button>
              </div>
              <div className="hidden md:block"><Logo /></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;