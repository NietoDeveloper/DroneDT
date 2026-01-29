"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Circle, Menu, X, ChevronRight } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  price?: string;
  desc?: string;
  icon?: string;
  img?: string;
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedMobileModel, setSelectedMobileModel] = useState<string | null>(null);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLogged(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuContent: Record<string, MenuItem[]> = {
    Tienda: [
      { id: 1, name: "DRONE INDUSTRIAL X-1", price: "Desde $2,500", icon: "🛸" },
      { id: 2, name: "SURVEILLANCE S-4", price: "Desde $1,800", icon: "📡" },
      { id: 3, name: "AGRICULTURE PRO", price: "Desde $3,200", icon: "🌱" },
    ],
    Servicios: [
      { id: 4, name: "FOTOGRAMETRÍA", desc: "Mapeo 3D", icon: "📐" },
      { id: 5, name: "INSPECCIÓN TÉRMICA", desc: "Fallas Industriales", icon: "🔥" },
      { id: 6, name: "SEGURIDAD 24/7", desc: "Vigilancia Aérea", icon: "🛡️" },
    ]
  };

  const handleReload = () => {
    window.location.href = "/";
  };

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ease-in-out ${
        isScrolled || activeMenu || mobileMenuOpen ? 'bg-black/90 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1900px] mx-auto flex justify-between items-center px-4 sm:px-8 py-4 sm:py-6">
        
        {/* IZQUIERDA: LOGO Y STATUS */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button 
            onClick={handleReload}
            className="group flex flex-col items-start outline-none cursor-pointer"
          >
            <div className="flex items-baseline transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-105">
              <span className="text-xl sm:text-2xl font-black tracking-widest text-gold italic group-hover:drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">
                Drone
              </span>
              <span className="text-xl sm:text-2xl font-black tracking-tighter text-[#061dcbe6] not-italic ml-1">
                DT
              </span>
            </div>
            <span className="text-[8px] sm:text-[10px] text-white/40 font-bold tracking-[0.3em] uppercase group-hover:text-gold transition-colors">Tecnología Aérea</span>
          </button>

          {/* BOTÓN VERDE (Lógica Auth JWT) */}
          {isLogged && (
            <div className="flex items-center space-x-2 bg-green-500/20 px-2 sm:px-3 py-1 rounded-full border border-green-500/50 animate-pulse">
              <Circle size={8} className="fill-green-500 text-green-500" />
              <span className="text-[9px] text-green-400 font-black tracking-tighter hidden md:block">ONLINE</span>
            </div>
          )}
        </div>

        {/* CENTRO: NAVEGACIÓN DESKTOP (>680px) */}
        <div className="hidden min-[680px]:flex items-center bg-white/5 rounded-full px-2 py-1 border border-white/5">
          {['Tienda', 'Servicios', 'Flota', 'Nosotros'].map((item) => (
            <button
              key={item}
              onMouseEnter={() => setActiveMenu(item)}
              className="px-6 py-2 text-[11px] text-white font-bold uppercase tracking-[0.2em] hover:text-gold transition-all duration-300"
            >
              {item}
            </button>
          ))}
        </div>

        {/* DERECHA: ACCIONES (CARRITO Y LOGIN SIEMPRE VISIBLES) */}
        <div className="flex items-center space-x-1 sm:space-x-3">
          <Link href="/cart" className="relative p-2 text-white hover:bg-white/10 rounded-full transition-all group">
            <ShoppingCart size={20} className="group-hover:text-gold transition-colors" />
            <span className="absolute top-1 right-1 bg-gold text-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-black">0</span>
          </Link>
          
          <Link href="/login" className="p-2 text-white hover:bg-white/10 rounded-full transition-all group">
            <User size={20} className="group-hover:text-gold transition-colors" />
          </Link>

          {/* GESTIÓN MOBILE MENU */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-[680px]:hidden p-2 text-white hover:bg-white/10 rounded-md transition-all"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* MEGA MENÚ DESKTOP (DROP DOWN) */}
      <div 
        onMouseLeave={() => setActiveMenu(null)}
        className={`hidden min-[680px]:block absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-gold/20 transition-all duration-500 ease-in-out overflow-hidden ${
          activeMenu ? 'max-h-[500px] py-12 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-12 px-10">
          {activeMenu && menuContent[activeMenu]?.map((item) => (
            <div key={item.id} className="group cursor-pointer text-center">
              <div className="aspect-video bg-zinc-900/50 rounded-lg border border-white/10 flex items-center justify-center text-4xl group-hover:border-gold/50 transition-all group-hover:scale-105 duration-500">
                {item.icon || "🛸"}
              </div>
              <h4 className="mt-4 text-white font-bold tracking-widest text-sm group-hover:text-gold transition-colors uppercase">{item.name}</h4>
              <p className="text-[10px] text-white/40 tracking-tighter uppercase">{item.price || item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MENÚ MÓVIL PANTALLA COMPLETA (<680px) */}
      <div className={`fixed inset-0 bg-black z-[110] transition-transform duration-500 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} min-[680px]:hidden`}>
        <div className="flex justify-between items-center px-6 py-8 border-b border-white/5">
          <span className="text-gold font-black tracking-widest italic uppercase">Drone<span className="text-white not-italic">DT</span></span>
          <button onClick={() => {setMobileMenuOpen(false); setSelectedMobileModel(null)}} className="text-white p-2 bg-white/5 rounded-full"><X size={28} /></button>
        </div>
        
        <div className="flex flex-col px-8 py-10 space-y-6">
          {!selectedMobileModel ? (
            ['Tienda', 'Servicios', 'Flota', 'Nosotros'].map((item) => (
              <button 
                key={item}
                onClick={() => setSelectedMobileModel(item)}
                className="text-3xl text-white font-bold tracking-tighter flex justify-between items-center group active:text-gold"
              >
                {item}
                <ChevronRight className="text-white/20 group-hover:text-gold" />
              </button>
            ))
          ) : (
            <div className="animate-fade-in">
              <button onClick={() => setSelectedMobileModel(null)} className="text-gold text-[10px] font-black tracking-[0.3em] mb-12 flex items-center">
                <ChevronRight className="rotate-180 mr-2" /> VOLVER
              </button>
              <h2 className="text-5xl text-white font-black mb-10 tracking-tighter">{selectedMobileModel.toUpperCase()}</h2>
              <div className="space-y-4">
                {menuContent[selectedMobileModel]?.map(item => (
                  <div key={item.id} className="bg-white/5 border border-white/5 p-5 rounded-xl flex items-center justify-between group active:border-gold/50">
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl">{item.icon || "🛸"}</span>
                      <div>
                        <p className="text-white font-bold text-base tracking-tight">{item.name}</p>
                        <p className="text-white/40 text-[10px] uppercase font-medium">{item.price || item.desc}</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-white/20" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;