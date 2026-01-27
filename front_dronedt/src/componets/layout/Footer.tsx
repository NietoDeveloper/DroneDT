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
    <footer className="bg-black text-white border-t border-gold/10 pt-16 pb-8">
      <div className="max-w-[1440px] mx-auto px-10">
        
        {/* SECCIÓN SUPERIOR: GRID TIPO TESLA */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* COL 1: BRANDING */}
          <div className="space-y-6">
            <h3 className="text-xl font-black italic tracking-tighter text-gold">
              DRONE<span className="text-white not-italic">DT</span>
            </h3>
            <p className="text-[11px] tracking-widest leading-relaxed text-gainsboro/50 uppercase">
              Liderando la revolución aérea en Colombia con tecnología de precisión y soluciones autónomas de clase mundial.
            </p>
          </div>

          {/* COL 2: NAVEGACIÓN */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-[10px] font-bold tracking-[0.3em] text-gold/80 uppercase">Navegación</h4>
            <Link href="/shop" className="text-[11px] hover:text-gold transition-colors tracking-widest uppercase text-gainsboro/70">Tienda</Link>
            <Link href="/services" className="text-[11px] hover:text-gold transition-colors tracking-widest uppercase text-gainsboro/70">Servicios</Link>
            <Link href="/fleet" className="text-[11px] hover:text-gold transition-colors tracking-widest uppercase text-gainsboro/70">Flota</Link>
          </div>

          {/* COL 3: SOPORTE */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-[10px] font-bold tracking-[0.3em] text-gold/80 uppercase">Soporte</h4>
            <Link href="/legal" className="text-[11px] hover:text-gold transition-colors tracking-widest uppercase text-gainsboro/70">Privacidad</Link>
            <Link href="/terms" className="text-[11px] hover:text-gold transition-colors tracking-widest uppercase text-gainsboro/70">Términos</Link>
            <Link href="/contact" className="text-[11px] hover:text-gold transition-colors tracking-widest uppercase text-gainsboro/70">Contacto</Link>
          </div>

          {/* COL 4: STATUS BOGOTÁ */}
          <div className="flex flex-col space-y-4 bg-white/[0.03] p-6 rounded-sm border border-white/5">
            <h4 className="text-[10px] font-bold tracking-[0.3em] text-gold uppercase">Sede Central</h4>
            <p className="text-xs font-medium tracking-widest">BOGOTÁ, COLOMBIA</p>
            <div className="space-y-1">
              <p className="text-[10px] text-gold font-mono font-bold">{formatBogotaTime(dateTime)}</p>
              <p className="text-[9px] text-white/40 uppercase tracking-tighter">{formatBogotaDate(dateTime)}</p>
            </div>
          </div>
        </div>

        {/* SECCIÓN INFERIOR: CRÉDITOS */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 items-center">
            <Link href="https://softwaredt.vercel.app/" target="_blank" className="group">
              <span className="text-[10px] tracking-[0.2em] text-white/40 group-hover:text-gold transition-all duration-300">
                CREADOR: <span className="font-bold text-white/60 group-hover:text-white">SOFTWARE DT</span>
              </span>
            </Link>
            
            <Link href="https://github.com/NietoDeveloper" target="_blank" className="group border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
              <span className="text-[10px] tracking-[0.2em] text-white/40 group-hover:text-gold transition-all duration-300">
                SUPERVISIÓN: <span className="font-bold text-white/60 group-hover:text-white uppercase">NietoDeveloper</span>
              </span>
            </Link>
          </div>

          <div className="flex space-x-6 text-white/40">
             <Twitter size={16} className="hover:text-gold cursor-pointer transition-colors" />
             <Linkedin size={16} className="hover:text-gold cursor-pointer transition-colors" />
             <Instagram size={16} className="hover:text-gold cursor-pointer transition-colors" />
          </div>

          <p className="text-[9px] tracking-widest text-white/20 uppercase font-medium text-center md:text-right">
            © {new Date().getFullYear()} DRONE DT
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;