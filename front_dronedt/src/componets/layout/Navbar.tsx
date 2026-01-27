"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Circle } from 'lucide-react';

// Interfaz para el ADN de los productos/servicios de Drone DT
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Contenido Domain-Driven para Drone DT
  const menuContent: Record<string, MenuItem[]> = {
    Tienda: [
      { id: 1, name: "DRONE INDUSTRIAL X-1", price: "Desde $2,500" },
      { id: 2, name: "SURVEILLANCE S-4", price: "Desde $1,800" },
      { id: 3, name: "AGRICULTURE PRO", price: "Desde $3,200" },
    ],
    Servicios: [
      { id: 4, name: "FOTOGRAMETRÍA", desc: "Mapeo 3D de alta precisión", icon: "📐" },
      { id: 5, name: "INSPECCIÓN TÉRMICA", desc: "Detección de fallas industriales", icon: "🔥" },
      { id: 6, name: "SEGURIDAD 24/7", desc: "Vigilancia aérea autónoma", icon: "🛡️" },
    ]
  };

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-700 ease-in-out ${
        isScrolled || activeMenu ? 'bg-black/95 backdrop-blur-md border-b border-gold/20' : 'bg-transparent'
      }`}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="max-w-[1600px] mx-auto flex justify-between items-center px-8 py-5">
        
        {/* LOGO - Identidad Software DT */}
        <Link href="/" className="group flex items-center outline-none">
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-black tracking-[0.2em] text-gold italic transition-all duration-300 group-hover:tracking-[0.3em]">
              DRONE<span className="text-white not-italic">DT</span>
            </span>
            <span className="text-[10px] text-gainsboro/60 font-bold tracking-[0.4em] mt-1 uppercase">Tecnología Aérea</span>
          </div>
        </Link>

        {/* NAVEGACIÓN CENTRAL - Estilo Minimalista */}
        <div className="hidden lg:flex items-center space-x-2 font-medium">
          {['Tienda', 'Servicios', 'Flota', 'Nosotros'].map((item) => (
            <button
              key={item}
              onMouseEnter={() => setActiveMenu(item)}
              className="relative px-6 py-2 text-[13px] text-white uppercase tracking-[0.15em] hover:text-gold transition-all duration-300 group outline-none"
            >
              {item}
              <span className={`absolute bottom-0 left-1/2 h-[1px] bg-gold transition-all duration-300 ${activeMenu === item ? 'w-1/2 left-1/4' : 'w-0 group-hover:w-1/2 group-hover:left-1/4'}`}></span>
            </button>
          ))}
        </div>

        {/* ACCIONES E-COMMERCE */}
        <div className="flex items-center space-x-8">
          <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full border border-white/10 bg-white/5">
            <Circle size={8} className="fill-green-500 text-green-500 animate-pulse" />
            <span className="text-[10px] text-white/60 tracking-widest font-bold">ONLINE</span>
          </div>

          <div className="flex items-center space-x-5">
            <Link href="/cart" className="relative group p-1">
              <ShoppingCart className="text-white group-hover:text-gold transition-colors duration-300" size={20} />
              <span className="absolute -top-1 -right-1 bg-gold text-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-black">
                0
              </span>
            </Link>

            <Link href="/login" className="group p-1 border border-white/20 rounded-full hover:border-gold transition-all duration-300">
              <User className="text-white group-hover:text-gold transition-colors duration-300" size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* MEGA MENÚ DESPLEGABLE */}
      <div 
        className={`absolute top-full left-0 w-full bg-black/98 border-b border-gold/10 overflow-hidden transition-all duration-500 ease-in-out ${
          activeMenu && menuContent[activeMenu] ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto py-12 px-10 grid grid-cols-3 gap-12">
          {activeMenu && menuContent[activeMenu]?.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="relative aspect-video bg-zinc-900 rounded-sm overflow-hidden border border-white/5 group-hover:border-gold/50 transition-all duration-700">
                <div className="w-full h-full flex items-center justify-center text-zinc-700 group-hover:scale-110 transition-transform duration-1000 bg-gradient-to-br from-zinc-900 to-black">
                  {item.icon ? <span className="text-5xl">{item.icon}</span> : <span className="text-xs tracking-[0.2em]">DRONE DT PRO</span>}
                </div>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              <div className="mt-6 space-y-1">
                <h4 className="text-sm font-bold tracking-[0.2em] text-white group-hover:text-gold transition-colors">{item.name}</h4>
                <p className="text-[11px] text-gainsboro/50 tracking-wider uppercase">{item.price || item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white/[0.02] py-4 text-center">
             <Link 
              href={`/${activeMenu?.toLowerCase()}`} 
              className="text-[10px] tracking-[0.3em] text-gold hover:text-white transition-colors uppercase font-bold"
              onClick={() => setActiveMenu(null)}
            >
              Explorar todo en {activeMenu}
            </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;