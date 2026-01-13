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