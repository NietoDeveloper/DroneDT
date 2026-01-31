"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, X, ChevronRight, Globe, Circle, Info } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  price?: string;
  desc?: string;
  img: string;
  features?: string;
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
      { id: 1, name: "INDUSTRIAL X-1", price: "$2,500", desc: "Autonomía de 45 min", img: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800" },
      { id: 2, name: "SURVEILLANCE S-4", price: "$1,800", desc: "Cámara térmica", img: "https://images.unsplash.com/photo-1527142879024-c6c91aa9c5c7?auto=format&fit=crop&q=80&w=800" },
      { id: 3, name: "AGRICULTURE PRO", price: "$3,200", desc: "Mapeo NDVI", img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800" },
      { id: 4, name: "RESCUE R-7", price: "$4,100", desc: "Transmisión satelital", img: "https://images.unsplash.com/photo-1473960104312-bf2e12017180?auto=format&fit=crop&q=80&w=800" },
    ],
    Flota: [
      { id: 5, name: "MATRICE 300 RTK", desc: "Unidad de Rescate", img: "🚁" },
      { id: 6, name: "MAVIC 3 THERMAL", desc: "Inspección", img: "🔥" },
    ],
    Accesorios: [
      { id: 7, name: "BATERÍAS INTELIGENTES", desc: "Alta densidad", img: "🔋" },
      { id: 8, name: "CONTROLADORES PRO", desc: "Rango 15km", img: "🎮" },
    ],
    Nosotros: []
  };

  const Logo = () => (
    <button onClick={() => window.location.href = "/"} className="group flex flex-col items-start cursor-pointer">
      <div className="flex items-baseline transition-all duration-300">
        <span className="text-xl sm:text-2xl font-black tracking-widest text-[#0000FF] italic">Drone</span>
        <span className="text-xl sm:text-2xl font-black tracking-tighter not-italic ml-1 text-gold drop-shadow-[0_0_8px_rgba(255,215,0,0.3)] group-hover:drop-shadow-[0_0_12px_rgba(255,215,0,0.6)]">DT</span>
      </div>
      <span className="text-[7px] font-bold tracking-[0.4em] uppercase text-white/40 group-hover:text-gold transition-colors">Colombia</span>
    </button>
  );

  return (
    <>
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-[1900px] mx-auto flex justify-between items-center px-6 sm:px-10 py-5">
          <div className="flex items-center gap-6">
            <Logo />
            <Circle size={8} fill={isLogged ? "#22c55e" : "transparent"} className={`${isLogged ? 'text-green-500' : 'text-white/10'}`} />
          </div>

          <button 
            onClick={() => setMenuOpen(true)}
            className="px-8 py-2 text-white font-black text-[13px] uppercase tracking-[0.2em] bg-[#0000FF] rounded-full transition-all duration-300 hover:bg-gold hover:text-black hover:scale-105 hover:shadow-[0_10px_25px_rgba(255,215,0,0.4)] border border-white/10 cursor-pointer"
          >
            Menú
          </button>
        </div>
      </nav>

      {/* MENÚ FULLSCREEN */}
      <div className={`fixed inset-0 bg-white z-[110] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} flex flex-col overflow-hidden`}>
        
        <div className="flex justify-end items-center px-6 sm:px-10 py-8">
            <button 
              onClick={() => {setMenuOpen(false); setSelectedModel(null)}} 
              className="p-2 text-[#0000FF] transition-all duration-300 hover:text-gold hover:scale-125 hover:rotate-90 cursor-pointer outline-none"
            >
              <X size={40} strokeWidth={3} />
            </button>
        </div>
        
        <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-4 w-full max-w-[1800px] mx-auto flex flex-col">
          {!selectedModel ? (
            <div className="flex flex-col space-y-4 md:space-y-6 mt-10">
              {['Modelos', 'Accesorios', 'Flota', 'Nosotros'].map((item, index) => (
                <button 
                  key={item}
                  onClick={() => setSelectedModel(item)}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className="animate-in fade-in slide-in-from-bottom-5 duration-700 text-4xl sm:text-6xl md:text-8xl text-black font-black tracking-tighter flex justify-between items-center group w-full hover:text-[#0000FF] transition-all text-left cursor-pointer"
                >
                  <span>{item}</span>
                  <ChevronRight className="text-black/5 group-hover:text-gold transition-all" size={50} />
                </button>
              ))}
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-10 duration-500 pb-10">
              <button onClick={() => setSelectedModel(null)} className="text-[#0000FF] text-[11px] font-black tracking-[0.4em] mb-12 flex items-center uppercase hover:text-gold transition-colors cursor-pointer">
                <ChevronRight className="rotate-180 mr-2" size={16} /> Volver a categorías
              </button>

              <h2 className="text-3xl sm:text-5xl font-black text-[#0000FF] mb-12 tracking-tighter uppercase">{selectedModel}</h2>
              
              {/* GRID AJUSTADA: Más columnas, fotos más pequeñas estilo Tesla */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                {menuContent[selectedModel]?.length > 0 ? (
                  menuContent[selectedModel].map((item, idx) => (
                    <div 
                      key={item.id} 
                      style={{ animationDelay: `${idx * 150}ms` }}
                      className="animate-in fade-in zoom-in-95 duration-700 group flex flex-col bg-neutral-50 rounded-[24px] overflow-hidden border border-transparent hover:border-gold/30 hover:shadow-2xl transition-all"
                    >
                      <div 
                        onClick={() => window.location.href = `/drone/${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="relative aspect-[16/10] overflow-hidden bg-gray-200 cursor-pointer"
                      >
                        {item.img.startsWith('http') ? (
                          <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-5xl">{item.img}</div>
                        )}
                      </div>

                      <div className="p-5 flex flex-col flex-1">
                        <h4 className="text-black font-black text-lg tracking-tight leading-none mb-1">{item.name}</h4>
                        <p className="text-gray-500 text-[10px] font-medium leading-tight mb-4">{item.desc}</p>
                        
                        <div className="mt-auto flex flex-col gap-2">
                          <button className="w-full py-2 bg-[#0000FF] text-white rounded-lg font-black text-[9px] uppercase tracking-widest hover:bg-gold hover:text-black transition-all cursor-pointer">
                            Comprar
                          </button>
                          <button className="w-full py-2 bg-white border border-gray-200 text-black rounded-lg font-black text-[9px] uppercase tracking-widest hover:border-[#0000FF] hover:text-[#0000FF] transition-all flex items-center justify-center gap-1 cursor-pointer">
                            <Info size={10} /> Ficha
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center bg-neutral-50 rounded-[40px] border-2 border-dashed border-gray-200">
                    <p className="text-black/20 text-2xl font-black tracking-widest uppercase italic">Próximamente</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* FOOTER DEL MENÚ */}
          <div className="mt-auto pt-16 pb-10 border-t border-gray-100 flex flex-col space-y-8 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center space-x-8">
                <button onClick={() => window.location.href = "/login"} className="flex items-center gap-3 group cursor-pointer">
                  <div className={`p-2 rounded-full transition-all ${isLogged ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gold group-hover:bg-[#0000FF] group-hover:text-white'}`}>
                    <User size={20} />
                  </div>
                  <span className="text-[11px] font-black tracking-[0.2em] text-black uppercase">{isLogged ? 'Dashboard' : 'Account'}</span>
                </button>
                
                <button className="flex items-center gap-3 group text-gray-400 hover:text-[#0000FF] transition-colors cursor-pointer">
                  <Globe size={18} />
                  <span className="text-[11px] font-black tracking-[0.2em] uppercase">ES / EN</span>
                </button>
              </div>
              <Logo />
            </div>

            <div className="flex gap-8 justify-center md:justify-start">
              {['Privacidad', 'Legal', 'Contacto'].map(f => (
                <button key={f} className="text-[9px] font-bold text-gray-300 hover:text-black uppercase tracking-widest transition-colors cursor-pointer">{f}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;