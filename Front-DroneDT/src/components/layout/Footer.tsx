"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Instagram, Linkedin, Twitter, Globe } from 'lucide-react';

const Footer = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatBogotaTime = (date: Date) => {
    return new Intl.DateTimeFormat('es-CO', {
      timeZone: 'America/Bogota',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // Formato militar/técnico queda mejor para drones
    }).format(date);
  };

  const formatBogotaDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-CO', {
      timeZone: 'America/Bogota',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  return (
    <footer className="bg-black text-white border-t border-gold/20 pt-16 md:pt-24 pb-8 font-sans">
      <div className="max-w-[1900px] mx-auto px-6 sm:px-10 lg:px-20">
        
        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* COL 1: BRANDING (4 COLUMNAS) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex flex-col">
              <h3 className="text-2xl md:text-3xl font-black italic tracking-tighter text-[#0000FF]">
                DRONE<span className="text-gold not-italic">DT</span>
              </h3>
              <span className="text-[9px] font-bold tracking-[0.5em] uppercase text-white/30">Precisión Aeroespacial</span>
            </div>
            <p className="text-[11px] tracking-[0.15em] leading-relaxed text-white/60 uppercase font-bold max-w-sm">
              Ingeniería de Clase Mundial con tecnología de precisión y soluciones autónomas de alto rendimiento. Diseñado para liderar la industria en Colombia.
            </p>
          </div>

          {/* COL 2: NAVEGACIÓN (2 COLUMNAS) */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <h4 className="text-[10px] font-black tracking-[0.4em] text-gold uppercase mb-2">Explorar</h4>
            {["Shop", "Services", "Fleet"].map((item) => (
              <Link 
                key={item} 
                href={`/${item.toLowerCase()}`} 
                className="text-[12px] text-white/80 hover:text-gold hover:translate-x-2 transition-all duration-300 tracking-widest uppercase font-black w-fit"
              >
                {item === "Shop" ? "Tienda" : item === "Services" ? "Servicios" : "Flota"}
              </Link>
            ))}
          </div>

          {/* COL 3: SOPORTE (2 COLUMNAS) */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <h4 className="text-[10px] font-black tracking-[0.4em] text-gold uppercase mb-2">Soporte</h4>
            {["Legal", "Terms", "Contact"].map((item) => (
              <Link 
                key={item} 
                href={`/${item.toLowerCase()}`} 
                className="text-[12px] text-white/80 hover:text-gold hover:translate-x-2 transition-all duration-300 tracking-widest uppercase font-black w-fit"
              >
                {item === "Legal" ? "Privacidad" : item === "Terms" ? "Términos" : "Contacto"}
              </Link>
            ))}
          </div>

          {/* COL 4: STATUS BOGOTÁ (4 COLUMNAS) */}
          <div className="lg:col-span-4">
            <div className="bg-white/[0.03] p-6 rounded-xl border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 group-hover:text-gold transition-all">
                <Globe size={40} />
              </div>
              <div className="absolute top-0 left-0 w-[2px] h-0 bg-gold group-hover:h-full transition-all duration-700" />
              
              <h4 className="text-[10px] font-black tracking-[0.4em] text-gold uppercase mb-4">Operations Center</h4>
              <p className="text-[11px] font-bold tracking-[0.3em] text-white/90 mb-1">BOGOTÁ, CO (HQ)</p>
              
              <div className="flex flex-col">
                <span className="text-3xl md:text-4xl text-white font-mono font-black tracking-tighter tabular-nums">
                  {formatBogotaTime(dateTime)}
                </span>
                <span className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold mt-1">
                  {formatBogotaDate(dateTime)}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[9px] font-black tracking-widest text-green-500 uppercase">Sistemas Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN INFERIOR */}
        <div className="border-t border-white/10 pt-10 flex flex-col lg:flex-row justify-between items-center gap-8">
          
          {/* CRÉDITOS */}
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12">
            <Link href="https://softwaredt.vercel.app/" target="_blank" className="group">
              <p className="text-[10px] tracking-[0.3em] text-white/40 font-bold uppercase">
                DEVELOPED BY <span className="text-white group-hover:text-gold transition-colors duration-300 ml-2">SOFTWARE DT</span>
              </p>
            </Link>
            
            <Link href="https://github.com/NietoDeveloper" target="_blank" className="group">
              <p className="text-[10px] tracking-[0.3em] text-white/40 font-bold uppercase">
                ENGINEERED BY <span className="text-white group-hover:text-gold transition-colors duration-300 ml-2">@NIETODEVELOPER</span>
              </p>
            </Link>
          </div>

          {/* SOCIALS */}
          <div className="flex items-center gap-8">
            {[Twitter, Linkedin, Instagram].map((Icon, i) => (
              <Icon 
                key={i}
                size={20} 
                className="text-white/40 hover:text-gold cursor-pointer transition-all duration-300 hover:scale-125 hover:-translate-y-1" 
              />
            ))}
          </div>

          {/* COPYRIGHT */}
          <p className="text-[9px] tracking-[0.4em] text-white/20 uppercase font-black">
            © {new Date().getFullYear()} DRONE DT GLOBAL
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;