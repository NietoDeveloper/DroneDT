"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bot, ShoppingBag } from 'lucide-react';

const Footer: React.FC = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('es-CO', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const footerLinks = [
    { name: 'DroneDT © 2026', href: '/' },
    { name: 'Privacidad y Legal', href: '/legal' },
    { name: 'Contacto', href: '/contact' },
    { name: 'Ecosistema de Drones', href: '/shop/drones' },
    { name: 'Ubicaciones', href: '/about' },
    { name: 'Demos de Vuelo', href: '/demos' },
  ];

  return (
    <footer className="bg-white text-[#171a20] py-12 px-4 sm:px-8 border-t border-gainsboro">
      <div className="max-w-[1900px] mx-auto flex flex-col items-center">
        
        {/* BOTONES DE ACCIÓN (ESTILO TESLA) */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12 w-full justify-center max-w-2xl">
          <button className="flex-1 flex items-center justify-center gap-2 bg-[#f4f4f4] hover:bg-[#e2e2e2] text-[#171a20] py-3 px-8 rounded-md font-bold uppercase text-[12px] tracking-widest transition-all active:scale-95 cursor-pointer">
            <Bot size={18} className="text-[#0041C2]" />
            Asistencia IA
          </button>
          
          <Link 
            href="/shop/drones" 
            className="flex-1 flex items-center justify-center gap-2 bg-[#393c41] hover:bg-[#171a20] text-white py-3 px-8 rounded-md font-bold uppercase text-[12px] tracking-widest transition-all active:scale-95"
          >
            <ShoppingBag size={18} className="text-[#FFD700]" />
            Comprar Drone
          </Link>
        </div>

        {/* LINKS HORIZONTALES */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-8">
          {footerLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-[12px] font-bold text-[#5c5e62] hover:text-black transition-colors"
            >
              {link.name}
            </Link>
          ))}
          {/* Hora Dinámica Bogotá */}
          <span className="text-[12px] font-bold text-[#0041C2] border-l border-gainsboro pl-6">
            BOGOTÁ, COL: {time}
          </span>
        </nav>

        {/* CRÉDITOS Y STREAK - SOFTWARE DT */}
        <div className="flex flex-col items-center space-y-2 opacity-60">
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#171a20]">
             Desarrollado por <span className="text-[#0041C2]">Software</span> <span className="text-[#FFD700]">DT</span>
           </p>
           <div className="flex flex-col items-center gap-1">
             <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
               <span className="text-[9px] font-bold uppercase tracking-widest text-[#5c5e62]">
                 NietoDeveloper
               </span>
             </div>
             <p className="text-[8px] font-bold text-[#0041C2]/50 uppercase tracking-[0.2em]">
               Colombia Rank #1 Goal | World Class App
             </p>
           </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;