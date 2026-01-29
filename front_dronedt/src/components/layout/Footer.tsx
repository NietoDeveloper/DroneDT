"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const [dateTime, setDateTime] = useState(new Date());

  // Reloj en vivo para Bogotá
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
    <footer className="bg-black text-white border-t border-gold/10 pt-20 pb-10 font-montserrat">
      <div className="max-w-[1900px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* SECCIÓN SUPERIOR: GRID TIPO TESLA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 lg:gap-20 mb-20">
          
          {/* COL 1: BRANDING */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black italic tracking-tighter text-gold">
              DRONE<span className="text-white not-italic">DT</span>
            </h3>
            <p className="text-[11px] tracking-[0.2em] leading-relaxed text-white/40 uppercase font-bold">
              Ingeniería de Clase Mundial con tecnología de precisión y soluciones autónomas de alto rendimiento.
            </p>
          </div>

          {/* COL 2: NAVEGACIÓN */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-[10px] font-black tracking-[0.4em] text-gold uppercase mb-2">Navegación</h4>
            <Link href="/shop" className="text-[11px] hover:text-gold transition-colors tracking-widest uppercase text-white/60 font-medium">Tienda</Link>
            <Link href="/services" className="text-[11px] hover:text-gold transition-colors tracking-widest uppercase text-white/60 font-medium">Servicios</Link>
            <Link href="/fleet" className="text-[11px] hover:text-gold transition-colors tracking-widest uppercase text-white/60 font-medium">Flota</Link>
          </div>

          {/* COL 3: SOPORTE */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-[10px] font-black tracking-[0.4em] text-gold uppercase mb-2">Soporte</h4>
            <Link href="/legal" className="text-[11px] hover:text-gold transition-colors tracking-widest uppercase text-white/60 font-medium">Privacidad</Link>
            <Link href="/terms" className="text-[11px] hover:text-gold transition-colors tracking-widest uppercase text-white/60 font-medium">Términos</Link>
            <Link href="/contact" className="text-[11px] hover:text-gold transition-colors tracking-widest uppercase text-white/60 font-medium">Contacto</Link>
          </div>

          {/* COL 4: STATUS BOGOTÁ (ESTILO DASHBOARD) */}
          <div className="flex flex-col space-y-4 bg-white/[0.02] p-8 rounded-[4px] border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-gold/30 group-hover:bg-gold transition-colors duration-500" />
            <h4 className="text-[10px] font-black tracking-[0.4em] text-gold uppercase">Huso Horario</h4>
            <div>
              <p className="text-xs font-bold tracking-[0.3em] text-white">BOGOTÁ, CO</p>
              <div className="mt-4 space-y-1">
                <p className="text-lg text-white font-mono font-bold tracking-tighter leading-none">
                  {formatBogotaTime(dateTime)}
                </p>
                <p className="text-[9px] text-white/30 uppercase tracking-[0.2em] font-bold">
                  {formatBogotaDate(dateTime)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN INFERIOR: CRÉDITOS */}
        <div className="border-t border-white/5 pt-10 flex flex-col lg:flex-row justify-between items-center gap-8">
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 items-center">
            <Link href="https://softwaredt.vercel.app/" target="_blank" className="group">
              <span className="text-[10px] tracking-[0.3em] text-white/30 group-hover:text-gold transition-all duration-300 font-bold uppercase">
                Creador: <span className="text-white/60 group-hover:text-white">Software DT</span>
              </span>
            </Link>
            
            <Link href="https://github.com/NietoDeveloper" target="_blank" className="group border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8">
              <span className="text-[10px] tracking-[0.3em] text-white/30 group-hover:text-gold transition-all duration-300 font-bold uppercase">
                Supervisor: <span className="text-white/60 group-hover:text-white">NietoDeveloper</span>
              </span>
            </Link>
          </div>

          {/* REDES */}
          <div className="flex space-x-8 text-white/30">
             <Twitter size={18} className="hover:text-gold cursor-pointer transition-all duration-300 hover:scale-110" />
             <Linkedin size={18} className="hover:text-gold cursor-pointer transition-all duration-300 hover:scale-110" />
             <Instagram size={18} className="hover:text-gold cursor-pointer transition-all duration-300 hover:scale-110" />
          </div>

          <p className="text-[10px] tracking-[0.4em] text-white/10 uppercase font-black">
            © {new Date().getFullYear()} Drone D T
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;