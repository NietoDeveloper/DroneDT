"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Instagram, Linkedin, Twitter } from 'lucide-react';

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
      hour12: true,
    }).format(date);
  };

  const formatBogotaDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-CO', {
      timeZone: 'America/Bogota',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  return (
    <footer className="bg-black text-white border-t border-gold/20 pt-16 md:pt-20 pb-10 font-montserrat">
      <div className="max-w-[1900px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20">
        
        {/* SECCIÓN SUPERIOR: GRID RESPONSIVO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 lg:gap-20 mb-16 md:mb-20">
          
          {/* COL 1: BRANDING */}
          <div className="space-y-6">
            <h3 className="text-xl md:text-2xl font-black italic tracking-tighter text-gold">
              DRONE<span className="text-white not-italic">DT</span>
            </h3>
            <p className="text-[10px] md:text-[11px] tracking-[0.2em] leading-relaxed text-white uppercase font-bold opacity-80">
              Ingeniería de Clase Mundial con tecnología de precisión y soluciones autónomas de alto rendimiento.
            </p>
          </div>

          {/* COL 2: NAVEGACIÓN */}
          <div className="flex flex-col space-y-3 md:space-y-4">
            <h4 className="text-[10px] font-black tracking-[0.4em] text-gold uppercase mb-2">Navegación</h4>
            {["Shop", "Services", "Fleet"].map((item) => (
              <Link 
                key={item} 
                href={`/${item.toLowerCase()}`} 
                className="text-[11px] hover:text-gold transition-colors tracking-widest uppercase text-white font-bold"
              >
                {item === "Shop" ? "Tienda" : item === "Services" ? "Servicios" : "Flota"}
              </Link>
            ))}
          </div>

          {/* COL 3: SOPORTE */}
          <div className="flex flex-col space-y-3 md:space-y-4">
            <h4 className="text-[10px] font-black tracking-[0.4em] text-gold uppercase mb-2">Soporte</h4>
            {["Legal", "Terms", "Contact"].map((item) => (
              <Link 
                key={item} 
                href={`/${item.toLowerCase()}`} 
                className="text-[11px] hover:text-gold transition-colors tracking-widest uppercase text-white font-bold"
              >
                {item === "Legal" ? "Privacidad" : item === "Terms" ? "Términos" : "Contacto"}
              </Link>
            ))}
          </div>

          {/* COL 4: STATUS BOGOTÁ (DASHBOARD) */}
          <div className="flex flex-col space-y-4 bg-white/[0.03] p-6 md:p-8 rounded-[4px] border border-white/10 relative overflow-hidden group min-w-[260px]">
            <div className="absolute top-0 left-0 w-1 h-full bg-gold transition-colors duration-500" />
            <h4 className="text-[10px] font-black tracking-[0.4em] text-gold uppercase">Huso Horario</h4>
            <div>
              <p className="text-xs font-bold tracking-[0.3em] text-white">BOGOTÁ, CO</p>
              <div className="mt-4 space-y-1">
                <p className="text-lg md:text-xl text-white font-mono font-bold tracking-tighter leading-none">
                  {formatBogotaTime(dateTime)}
                </p>
                <p className="text-[9px] text-white/50 uppercase tracking-[0.2em] font-bold">
                  {formatBogotaDate(dateTime)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN INFERIOR: CRÉDITOS */}
        <div className="border-t border-white/10 pt-10 flex flex-col lg:flex-row justify-between items-center gap-10">
          
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-10 items-center text-center md:text-left">
            <Link href="https://softwaredt.vercel.app/" target="_blank" className="group">
              <span className="text-[10px] tracking-[0.3em] text-white/50 group-hover:text-gold transition-all duration-300 font-bold uppercase">
                Creador: <span className="text-white group-hover:text-white">Software DT</span>
              </span>
            </Link>
            
            <Link href="https://github.com/NietoDeveloper" target="_blank" className="group border-t border-white/10 md:border-t-0 md:border-l md:pl-10 pt-6 md:pt-0">
              <span className="text-[10px] tracking-[0.3em] text-white/50 group-hover:text-gold transition-all duration-300 font-bold uppercase">
                Supervisor: <span className="text-white group-hover:text-white">NietoDeveloper</span>
              </span>
            </Link>
          </div>

          {/* REDES */}
          <div className="flex space-x-10 text-white/50">
             <Twitter size={20} className="hover:text-gold cursor-pointer transition-all duration-300 hover:scale-110" />
             <Linkedin size={20} className="hover:text-gold cursor-pointer transition-all duration-300 hover:scale-110" />
             <Instagram size={20} className="hover:text-gold cursor-pointer transition-all duration-300 hover:scale-110" />
          </div>

          <p className="text-[10px] tracking-[0.5em] text-white/20 uppercase font-black text-center">
            © {new Date().getFullYear()} Drone D T
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;