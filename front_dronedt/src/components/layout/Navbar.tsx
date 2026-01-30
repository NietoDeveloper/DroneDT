"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, X, ChevronRight, Globe, Circle } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  price?: string;
  desc?: string;
  img?: string;
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
      { id: 1, name: "DRONE INDUSTRIAL X-1", price: "Desde $2,500", img: "🛸" },
      { id: 2, name: "SURVEILLANCE S-4", price: "Desde $1,800", img: "📡" },
      { id: 3, name: "AGRICULTURE PRO", price: "Desde $3,200", img: "🌱" },
    ],
    Flota: [
      { id: 4, name: "MATRICE 300 RTK", desc: "Unidad de Rescate", img: "🚁" },
      { id: 5, name: "MAVIC 3 THERMAL", desc: "Inspección", img: "🔥" },
    ],
    Accesorios: [
      { id: 6, name: "BATERÍAS INTELIGENTES", desc: "Alta densidad", img: "🔋" },
      { id: 7, name: "CONTROLADORES PRO", desc: "Rango 15km", img: "🎮" },
    ],
    Nosotros: []
  };

  const Logo = () => (
    <button 
      onClick={() => window.location.href = "/"}
      className="group flex flex-col items-start outline-none cursor-pointer"
    >
      <div className="flex items-baseline transition-all duration-300 group-hover:-translate-y-0.5">
        <span className="text-xl sm:text-2xl font-black tracking-widest text-[#0000FF] italic">
          Drone
        </span>
        <span className="text-xl sm:text-2xl font-black tracking-tighter not-italic ml-1 text-gold drop-shadow-[0_0_8px_rgba(255,215,0,0.3)] group-hover:drop-shadow-[0_0_12px_rgba(255,215,0,0.6)] transition-all">
          DT
        </span>
      </div>
      <span className="text-[7px] font-bold tracking-[0.4em] uppercase text-white/40 group-hover:text-gold transition-colors">
        Colombia
      </span>
    </button>
  );

  return (
    <>
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-black/60 backdrop-blur-lg border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-[1900px] mx-auto flex justify-between items-center px-8 py-5">
          
          {/* LADO IZQUIERDO: LOGO + INDICADOR DE SESIÓN */}
          <div className="flex items-center gap-6">
            <Logo />
            <Circle 
              size={8} 
              fill={isLogged ? "#22c55e" : "transparent"} 
              className={`${isLogged ? 'text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]' : 'text-white/10'} transition-all duration-500`}
            />
          </div>

          {/* ÚNICO BOTÓN: MENÚ (Estilo Azul con Hover Gold Flotante) */}
          <div className="flex items-center">
            <button 
              onClick={() => setMenuOpen(true)}
              className="px-8 py-2 text-white font-black text-[13px] uppercase tracking-[0.25em] bg-[#0000FF] rounded-full transition-all duration-300 hover:bg-gold hover:text-black hover:scale-105 hover:shadow-[0_10px_20px_rgba(255,215,0,0.3)] active:scale-95 border border-white/10"
            >
              Menú
            </button>
          </div>
        </div>
      </nav>

      {/* MENÚ FULLSCREEN (Mantiene la lógica pero unificada) */}
      <div className={`fixed inset-0 bg-white z-[110] transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${menuOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col overflow-hidden`}>
        
        <div className="flex justify-between items-center px-10 py-8">
            <div className="flex items-center space-x-8">
              <button onClick={() => window.location.href = "/login"} className={`${isLogged ? 'text-green-500' : 'text-gold'} hover:scale-110 transition-all`}>
                <User size={30} strokeWidth={2.5} />
              </button>
              <button onClick={() => window.location.href = "/cart"} className="text-gold hover:scale-110 transition-all">
                <ShoppingCart size={30} strokeWidth={2.5} />
              </button>
            </div>

            <button 
              onClick={() => {setMenuOpen(false); setSelectedModel(null)}} 
              className="text-[#0000FF] p-2 hover:rotate-90 transition-transform duration-300 active:scale-75"
            >
              <X size={40} strokeWidth={3} />
            </button>
        </div>
        
        <div className="flex-1 overflow-y-auto px-10 py-4 max-w-4xl mx-auto w-full">
          {!selectedModel ? (
            <div className="flex flex-col space-y-8 mt-10">
              {['Modelos', 'Accesorios', 'Flota', 'Nosotros'].map((item) => (
                <button 
                  key={item}
                  onClick={() => setSelectedModel(item)}
                  className="text-5xl md:text-7xl text-black font-black tracking-tighter flex justify-between items-center group w-full hover:text-[#0000FF] transition-all duration-300"
                >
                  <span>{item}</span>
                  <ChevronRight className="text-black/5 group-hover:text-[#0000FF] group-hover:translate-x-2 transition-all" size={40} />
                </button>
              ))}
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-10 duration-500">
              <button 
                onClick={() => setSelectedModel(null)} 
                className="text-gold text-[12px] font-black tracking-[0.4em] mb-12 flex items-center uppercase hover:text-[#0000FF] transition-colors"
              >
                <ChevronRight className="rotate-180 mr-2" size={18} /> Volver
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-24">
                {menuContent[selectedModel]?.length > 0 ? (
                  menuContent[selectedModel].map(item => (
                    <Link key={item.id} href="" className="group block">
                      <div className="aspect-video bg-neutral-100 rounded-3xl flex items-center justify-center text-7xl group-hover:bg-neutral-200 group-hover:-translate-y-2 transition-all duration-500 border border-black/5 shadow-sm">
                        {item.img}
                      </div>
                      <div className="mt-6 px-4">
                        <h4 className="text-black font-black text-2xl tracking-tight uppercase group-hover:text-[#0000FF] transition-colors">{item.name}</h4>
                        <p className="text-black/40 text-sm font-bold tracking-widest mt-1">{item.price || item.desc}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full py-32 text-center border-2 border-dashed border-black/5 rounded-[40px]">
                    <p className="text-black/20 text-2xl font-black tracking-widest uppercase italic">Próximamente</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* FOOTER DEL MENÚ */}
        <div className="px-10 py-12 border-t border-black/5 flex flex-col items-center space-y-8 bg-neutral-50/80">
          <button className="flex items-center space-x-3 text-black/40 font-black tracking-[0.4em] text-[11px] hover:text-[#0000FF] transition-colors">
            <Globe size={18} />
            <span>ESPAÑOL / ENGLISH</span>
          </button>
          <div className="opacity-50 hover:opacity-100 transition-opacity">
            <Logo />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;