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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedMobileModel, setSelectedMobileModel] = useState<string | null>(null);
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

  const floatingGoldHover = "transition-all duration-300 hover:text-gold hover:drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]";

  return (
    <>
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-black/60 backdrop-blur-lg border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-[1900px] mx-auto flex justify-between items-center px-6 py-4">
          
          {/* LADO IZQUIERDO: LOGO + INDICADOR */}
          <div className="flex items-center gap-4">
            <Logo />
            <div className="flex items-center">
               <Circle 
                size={8} 
                fill={isLogged ? "#22c55e" : "transparent"} 
                className={`${isLogged ? 'text-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]' : 'text-white/10'} transition-all duration-500`}
               />
            </div>
          </div>

          {/* MENÚ CENTRAL (OPCIONAL, OCULTO EN ESTE ESTILO TESLA SI PREFIERES SOLO EL BOTÓN "MENU") */}
          <div className="hidden lg:flex items-center space-x-2">
            {['Modelos', 'Accesorios', 'Flota'].map((item) => (
              <button key={item} className={`px-5 py-1 text-[11px] text-white font-black uppercase tracking-[0.2em] rounded-md hover:bg-white/10 transition-all`}>
                {item}
              </button>
            ))}
          </div>

          {/* BOTÓN "MENU" TIPO TESLA (Desktop & Mobile) */}
          <div className="flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="px-4 py-2 text-white font-black text-[12px] uppercase tracking-[0.2em] bg-white/5 backdrop-blur-md rounded-md transition-all hover:bg-white/20 active:scale-95"
            >
              Menú
            </button>
          </div>
        </div>
      </nav>

      {/* MENÚ FULLSCREEN */}
      <div className={`fixed inset-0 bg-white z-[110] transition-transform duration-500 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col overflow-hidden`}>
        
        <div className="flex justify-between items-center px-8 py-6">
            <div className="flex items-center space-x-6">
              <button onClick={() => window.location.href = "/login"} className={`${isLogged ? 'text-green-500' : 'text-gold'} transition-all active:scale-95`}>
                <User size={28} strokeWidth={2.5} />
              </button>
              <button onClick={() => window.location.href = "/cart"} className="text-gold transition-all active:scale-95">
                <ShoppingCart size={28} strokeWidth={2.5} />
              </button>
            </div>

            <button 
              onClick={() => {setMobileMenuOpen(false); setSelectedMobileModel(null)}} 
              className="text-[#0000FF] p-2 hover:rotate-90 transition-transform duration-300 active:scale-75"
            >
              <X size={35} strokeWidth={3} />
            </button>
        </div>
        
        <div className="flex-1 overflow-y-auto px-8 py-4">
          {!selectedMobileModel ? (
            <div className="flex flex-col space-y-6 mt-12">
              {['Modelos', 'Accesorios', 'Flota', 'Nosotros'].map((item) => (
                <button 
                  key={item}
                  onClick={() => setSelectedMobileModel(item)}
                  className="text-4xl text-black font-black tracking-tighter flex justify-between items-center group w-full hover:text-gold transition-colors"
                >
                  <span>{item}</span>
                  <ChevronRight className="text-black/10 group-hover:text-gold" size={30} />
                </button>
              ))}
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-5 duration-300">
              <button 
                onClick={() => setSelectedMobileModel(null)} 
                className="text-gold text-[10px] font-black tracking-[0.4em] mb-12 flex items-center uppercase"
              >
                <ChevronRight className="rotate-180 mr-2" size={16} /> Volver
              </button>
              
              <div className="grid grid-cols-1 gap-8 pb-24">
                {menuContent[selectedMobileModel]?.length > 0 ? (
                  menuContent[selectedMobileModel].map(item => (
                    <Link key={item.id} href="" className="group block">
                      <div className="aspect-[16/9] bg-neutral-100 rounded-2xl flex items-center justify-center text-6xl group-hover:bg-neutral-200 group-hover:-translate-y-1 transition-all duration-500 border border-black/5">
                        {item.img}
                      </div>
                      <div className="mt-5 px-2">
                        <h4 className="text-black font-black text-xl tracking-tight uppercase transition-colors group-hover:text-gold">{item.name}</h4>
                        <p className="text-black/40 text-xs font-bold tracking-widest mt-1">{item.price || item.desc}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="py-20 text-center border-2 border-dashed border-black/5 rounded-3xl">
                    <p className="text-black/20 font-black tracking-widest uppercase italic">Próximamente</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="px-10 py-10 border-t border-black/5 flex flex-col items-center space-y-8 bg-neutral-50/50">
          <button className="flex items-center space-x-2 text-black/40 font-black tracking-[0.3em] text-[10px] hover:text-gold transition-colors">
            <Globe size={16} />
            <span>ESPAÑOL / ENGLISH</span>
          </button>
          <div className="scale-90 opacity-70">
            <button onClick={() => window.location.href = "/"} className="flex items-baseline">
                <span className="text-2xl font-black text-[#0000FF] italic">Drone</span>
                <span className="text-2xl font-black text-gold ml-1">DT</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;