"use client";

import { useState, useEffect } from 'react';
import { ShoppingCart, User, Menu, X, ChevronRight, Globe } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  price?: string;
  desc?: string;
  icon?: string;
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedMobileModel, setSelectedMobileModel] = useState<string | null>(null);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLogged(true);

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
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

  const Logo = ({ isDark = false }) => (
    <button 
      onClick={() => window.location.href = "/"}
      className="group flex flex-col items-start outline-none cursor-pointer"
    >
      <div className="flex items-baseline transition-all duration-500 group-hover:-translate-y-1">
        <span className="text-xl sm:text-2xl font-black tracking-widest text-gold italic group-hover:drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">
          Drone
        </span>
        <span className={`text-xl sm:text-2xl font-black tracking-tighter not-italic ml-1 ${isDark ? 'text-black' : 'text-[#061dcbe6]'}`}>
          DT
        </span>
      </div>
      <span className={`text-[8px] sm:text-[10px] font-bold tracking-[0.3em] uppercase transition-colors ${isDark ? 'text-black/40' : 'text-white/40 group-hover:text-gold'}`}>
        Tecnología Aérea
      </span>
    </button>
  );

  return (
    <>
      {/* NAVBAR PRINCIPAL (HOME TRANSPARENTE) */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-black/20 backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="max-w-[1900px] mx-auto flex justify-between items-center px-6 py-5">
          
          <Logo />

          <div className="flex items-center space-x-6">
            {/* BOTÓN HAMBURGUESA GOLD */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="text-gold hover:scale-110 transition-transform p-2"
            >
              <Menu size={32} />
            </button>
          </div>
        </div>
      </nav>

      {/* MENÚ MÓVIL PANTALLA COMPLETA (FONDO BLANCO) */}
      <div className={`fixed inset-0 bg-white z-[110] transition-transform duration-500 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        
        {/* Header Menú */}
        <div className="flex justify-between items-center px-8 py-8">
            <div className="flex items-center space-x-4">
              {/* Login Botón Humano */}
              <button 
                onClick={() => window.location.href = "/login"}
                className={`${isLogged ? 'text-green-600' : 'text-gold'} hover:scale-110 transition-all`}
              >
                <User size={28} strokeWidth={2.5} />
              </button>
              {/* Carrito Botón Gold */}
              <button 
                onClick={() => window.location.href = "/cart"}
                className="text-gold hover:scale-110 transition-all"
              >
                <ShoppingCart size={28} strokeWidth={2.5} />
              </button>
            </div>
            <button onClick={() => {setMobileMenuOpen(false); setSelectedMobileModel(null)}} className="text-black p-2 hover:rotate-90 transition-transform">
              <X size={35} />
            </button>
        </div>
        
        {/* Cuerpo Menú */}
        <div className="flex-1 overflow-y-auto px-10 py-4 flex flex-col justify-center">
          {!selectedMobileModel ? (
            <div className="space-y-6">
              {['Tienda', 'Servicios', 'Flota', 'Nosotros'].map((item) => (
                <button 
                  key={item}
                  onClick={() => setSelectedMobileModel(item)}
                  className="text-4xl text-black font-black tracking-tighter flex justify-between items-center group w-full"
                >
                  <span className="group-hover:text-gold transition-colors">{item}</span>
                  <ChevronRight className="text-black/10 group-hover:text-gold" size={30} />
                </button>
              ))}
            </div>
          ) : (
            <div className="animate-fade-in w-full">
              <button onClick={() => setSelectedMobileModel(null)} className="text-gold text-xs font-black tracking-[0.3em] mb-8 flex items-center uppercase">
                <ChevronRight className="rotate-180 mr-2" /> Volver
              </button>
              <h2 className="text-5xl text-black font-black mb-8 tracking-tighter uppercase">{selectedMobileModel}</h2>
              <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-4">
                {menuContent[selectedMobileModel]?.map(item => (
                  <div key={item.id} className="border-b border-black/5 py-4 flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl">{item.icon}</span>
                      <div>
                        <p className="text-black font-bold text-lg">{item.name}</p>
                        <p className="text-black/40 text-xs uppercase">{item.price || item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Menú: Idioma y Logo */}
        <div className="px-10 py-10 border-t border-black/5 flex flex-col items-center space-y-8 bg-neutral-50">
          <button className="flex items-center space-x-2 text-black/60 font-bold tracking-widest text-xs hover:text-gold transition-colors">
            <Globe size={16} />
            <span>ESPAÑOL / ENGLISH</span>
          </button>
          
          <div className="opacity-80 scale-90">
            <Logo isDark={true} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;