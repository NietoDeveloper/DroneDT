"use client";

import { useState, useEffect } from 'react';
import { ShoppingCart, User, Menu, X, ChevronRight, Globe } from 'lucide-react';
import Link from 'next/link';

interface MenuItem {
  id: number;
  name: string;
  price?: string;
  desc?: string;
  icon?: string;
  href?: string;
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedMobileModel, setSelectedMobileModel] = useState<string | null>(null);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) setIsLogged(true);

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuContent: Record<string, MenuItem[]> = {
    Tienda: [
      { id: 1, name: "DRONE INDUSTRIAL X-1", price: "Desde $2,500", icon: "🛸", href: "/shop" },
      { id: 2, name: "SURVEILLANCE S-4", price: "Desde $1,800", icon: "📡", href: "/shop" },
      { id: 3, name: "AGRICULTURE PRO", price: "Desde $3,200", icon: "🌱", href: "/shop" },
    ],
    Servicios: [
      { id: 4, name: "FOTOGRAMETRÍA", desc: "Mapeo 3D", icon: "📐", href: "/services" },
      { id: 5, name: "INSPECCIÓN TÉRMICA", desc: "Fallas Industriales", icon: "🔥", href: "/services" },
      { id: 6, name: "SEGURIDAD 24/7", desc: "Vigilancia Aérea", icon: "🛡️", href: "/services" },
    ]
  };

  const Logo = ({ isDark = false }) => (
    <Link href="/" className="group flex flex-col items-start outline-none">
      <div className="flex items-baseline transition-all duration-500 group-hover:-translate-y-0.5">
        <span className="text-xl sm:text-2xl font-black tracking-widest text-gold italic group-hover:drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">
          Drone
        </span>
        <span className={`text-xl sm:text-2xl font-black tracking-tighter not-italic ml-1 transition-colors duration-500 ${isDark ? 'text-black' : isScrolled ? 'text-white' : 'text-white/90'}`}>
          DT
        </span>
      </div>
      <span className={`text-[7px] sm:text-[9px] font-bold tracking-[0.4em] uppercase transition-all duration-500 ${isDark ? 'text-black/40' : 'text-white/40 group-hover:text-gold group-hover:tracking-[0.5em]'}`}>
        Tecnología Aérea
      </span>
    </Link>
  );

  return (
    <>
      {/* NAVBAR PRINCIPAL */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-700 ${isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-[1900px] mx-auto flex justify-between items-center px-6 sm:px-12">
          
          <Logo />

          <div className="flex items-center space-x-2 sm:space-x-6">
            {/* Desktop Quick Actions */}
            <div className="hidden md:flex items-center space-x-6 mr-6">
               <button className="text-white/60 hover:text-gold transition-colors text-[10px] font-bold tracking-widest uppercase">Flota</button>
               <button className="text-white/60 hover:text-gold transition-colors text-[10px] font-bold tracking-widest uppercase">Misiones</button>
            </div>

            {/* BOTÓN HAMBURGUESA - Estilo Tesla */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="bg-white/5 hover:bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-sm transition-all flex items-center space-x-2 group border border-white/10"
            >
              <span className="text-[10px] font-black tracking-[0.2em] uppercase hidden sm:block group-hover:text-gold">Menú</span>
              <Menu size={20} className="text-gold" />
            </button>
          </div>
        </div>
      </nav>

      {/* MENÚ MÓVIL PANTALLA COMPLETA */}
      <div className={`fixed inset-0 bg-white z-[110] transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-4'} flex flex-col`}>
        
        {/* Header Menú */}
        <div className="flex justify-between items-center px-8 py-8">
            <div className="flex items-center space-x-6">
              <Link href="/login" className={`${isLogged ? 'text-green-600' : 'text-black'} hover:scale-110 transition-all`}>
                <User size={24} strokeWidth={2} />
              </Link>
              <Link href="/cart" className="text-black hover:scale-110 transition-all relative">
                <ShoppingCart size={24} strokeWidth={2} />
                <span className="absolute -top-2 -right-2 bg-gold text-[8px] font-black px-1.5 py-0.5 rounded-full text-black">0</span>
              </Link>
            </div>
            <button onClick={() => {setMobileMenuOpen(false); setSelectedMobileModel(null)}} className="text-black p-2 hover:rotate-90 transition-all duration-300">
              <X size={30} />
            </button>
        </div>
        
        {/* Cuerpo Menú */}
        <div className="flex-1 overflow-y-auto px-10 py-4 flex flex-col justify-center max-w-2xl mx-auto w-full">
          {!selectedMobileModel ? (
            <div className="space-y-4">
              {['Tienda', 'Servicios', 'Flota', 'Nosotros'].map((item) => (
                <button 
                  key={item}
                  onClick={() => setSelectedMobileModel(item)}
                  className="text-4xl sm:text-6xl text-black font-black tracking-tighter flex justify-between items-center group w-full text-left"
                >
                  <span className="group-hover:translate-x-4 transition-transform duration-500 group-hover:text-gold">{item}</span>
                  <ChevronRight className="text-black/5 group-hover:text-gold transition-all" size={40} />
                </button>
              ))}
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right duration-500 w-full">
              <button onClick={() => setSelectedMobileModel(null)} className="text-gold text-[10px] font-black tracking-[0.3em] mb-8 flex items-center uppercase hover:translate-x-[-4px] transition-transform">
                <ChevronRight className="rotate-180 mr-2" size={14} /> Volver
              </button>
              <h2 className="text-5xl text-black font-black mb-10 tracking-tighter uppercase">{selectedMobileModel}</h2>
              <div className="space-y-6">
                {menuContent[selectedMobileModel]?.map(item => (
                  <Link 
                    key={item.id} 
                    href={item.href || "#"}
                    className="flex items-center justify-between group cursor-pointer border-b border-black/5 pb-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-5">
                      <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{item.icon}</span>
                      <div>
                        <p className="text-black font-bold text-xl group-hover:text-gold transition-colors">{item.name}</p>
                        <p className="text-black/40 text-[10px] font-bold uppercase tracking-widest">{item.price || item.desc}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Menú */}
        <div className="px-10 py-12 border-t border-black/5 flex flex-col items-center space-y-8 bg-neutral-50/50">
          <button className="flex items-center space-x-2 text-black/40 font-bold tracking-[0.2em] text-[10px] hover:text-gold transition-colors uppercase">
            <Globe size={14} />
            <span>Colombia / Español</span>
          </button>
          <Logo isDark={true} />
        </div>
      </div>
    </>
  );
};

export default Navbar;