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
    { name: 'Ecosistema', href: '/shop/drones' },
    { name: 'Ubicaciones', href: '/about' },
    { name: 'Demos', href: '/demos' },
  ];

  return (
    <footer className="bg-white text-[#171a20] py-12 px-4 sm:px-8 border-t border-gainsboro">
      <div className="max-w-[1900px] mx-auto flex flex-col items-center">
        
        {/* BOTONES DE ACCIÓN (ASISTENCIA Y COMPRA) */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12 w-full justify-center max-w-2xl">
          <button className="flex-1 flex items-center justify-center gap-2 bg-[#f4f4f4] hover:bg-[#e2e2e2] text-[#171a20] py-3 px-8 rounded-md font-bold uppercase text-[12px] tracking-widest transition-all transition-colors active:scale-95">
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

        {/* LINKS ESTILO TESLA (HORIZONTAL) */}
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
          {/* Hora Dinámica */}
          <span className="text-[12px] font-bold text-[#0041C2] border-l border-gainsboro pl-6">
            BOGOTÁ, COL: {time}
          </span>
        </nav>

        {/* INFO DE DESARROLLADOR & STATUS */}
        <div className="flex flex-col items-center space-y-2 opacity-40">

           <div className="flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
             <span className="text-[9px] font-bold uppercase tracking-widest">
               Commit Streak: 152 Days | Colombia Rank #1 Goal
             </span>
           </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;