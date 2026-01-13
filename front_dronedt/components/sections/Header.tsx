"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);


  const mainLinks = [
    { name: 'Accesorios', href: '/shop/accesorios' },
    { name: 'Servicios', href: '/shop/servicios' },
    { name: 'Demos', href: '/demos' },
  ];

  const infoLinks = [
    { name: 'About', href: '/about' },
    { name: 'Contacto', href: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[100] transition-colors duration-300 ${
        activeCategory || isMenuOpen ? 'bg-white text-black' : 'bg-transparent text-white'
      }`}
      onMouseLeave={() => setActiveCategory(null)}
    >
      <nav className="max-w-[1900px] mx-auto px-8 h-16 flex items-center justify-between font-medium">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-black tracking-tighter z-[110]">
          DRONE<span className={activeCategory || isMenuOpen ? 'text-yellowColor' : 'text-gold'}>DT</span>
        </Link>

        {/* Desktop Central Menu (Hover Tesla Effect) */}
        <div className="hidden lg:flex items-center space-x-1">
          <button 
            onMouseEnter={() => setActiveCategory('drones')}
            className="px-4 py-2 rounded-md hover:bg-black/5 transition-colors uppercase text-xs tracking-widest font-bold"
          >
            Drones
          </button>
          {mainLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="px-4 py-2 rounded-md hover:bg-black/5 transition-colors uppercase text-xs tracking-widest font-bold"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center space-x-2">
          {infoLinks.map((link) => (
            <Link key={link.name} href={link.href} className="px-3 py-2 rounded-md hover:bg-black/5 transition-colors text-xs font-bold uppercase tracking-widest">
              {link.name}
            </Link>
          ))}
          <Link href="/cart" className="p-2 hover:bg-black/5 rounded-md transition-colors">
            <ShoppingCart size={20} />
          </Link>
          <Link href="/login" className="p-2 hover:bg-black/5 rounded-md transition-colors">
            <User size={20} />
          </Link>
          <button className="p-2 hover:bg-black/5 rounded-md transition-colors">
            <LogOut size={20} />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 rounded-md hover:bg-black/5 transition-colors z-[110]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* --- MEGA MENU DESPLEGABLE (TESLA STYLE) --- */}
      <div 
        className={`absolute top-0 left-0 w-full bg-white border-b border-gainsboro transition-all duration-500 ease-in-out overflow-hidden z-[90] ${
          activeCategory === 'drones' ? 'max-h-[500px] opacity-100 pt-20' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-12 pb-16 grid grid-cols-4 gap-8">
          {droneTypes.map((drone) => (
            <Link 
              key={drone.name} 
              href={drone.href} 
              className="group flex flex-col items-center text-center space-y-4"
              onClick={() => setActiveCategory(null)}
            >
              <div className="w-full aspect-[16/10] relative overflow-hidden">
                {/*  */}
                <img 
                  src={drone.img} 
                  alt={drone.name} 
                  className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <span className="text-black font-bold uppercase text-xs tracking-[0.2em] group-hover:border-b-2 border-yellowColor">
                {drone.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* --- MOBILE FULLSCREEN MENU --- */}
      <div className={`fixed inset-0 bg-white transition-transform duration-500 lg:hidden z-[100] ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col p-12 pt-24 space-y-6">
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Modelos</p>
          {droneTypes.map((drone) => (
            <Link key={drone.name} href={drone.href} className="text-2xl font-bold uppercase tracking-tighter" onClick={() => setIsMenuOpen(false)}>
              {drone.name}
            </Link>
          ))}
          <div className="h-[1px] bg-gainsboro w-full my-4" />
          {[...mainLinks, ...infoLinks].map((link) => (
            <Link key={link.name} href={link.href} className="text-xl font-medium uppercase" onClick={() => setIsMenuOpen(false)}>
              {link.name}
            </Link>
          ))}
          <div className="flex space-x-6 pt-10">
            <Link href="/cart" onClick={() => setIsMenuOpen(false)}><ShoppingCart size={24} /></Link>
            <Link href="/login" onClick={() => setIsMenuOpen(false)}><User size={24} /></Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;