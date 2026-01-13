"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart, ChevronDown, User } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState(false);

  // Efecto para manejar el scroll y dar profundidad al header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartCount: number = 0;

  const droneCategories = [
    { name: 'Drones de Carrera', href: '/shop/drones' },
    { name: 'Drones de Fotografía', href: '/shop/photography' },
    { name: 'Drones Profesionales', href: '/shop/professional' },
    { name: 'Accesorios', href: '/shop/accesorios' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-md py-4'
      } border-b border-gainsboro`}
    >
      {/* Contenedor con límites dinámicos: min 310px, max 1900px */}
      <nav className="mx-auto px-4 sm:px-8 w-full max-w-[1900px] min-w-[310px] flex items-center justify-between">
        
        {/* Logo Identidad DroneDT */}
        <Link href="/" className="flex items-center group">
          <span className="text-2xl md:text-3xl font-black tracking-tighter text-headingColor transition-transform group-hover:scale-105">
            DRONE<span className="text-yellowColor">DT</span>
          </span>
        </Link>

        {/* Desktop Navigation (Visible desde md: 768px) */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-10">
          {/* Dropdown Productos */}
          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="text-headingColor hover:text-yellowColor flex items-center font-bold uppercase text-sm tracking-widest transition-colors outline-none py-2">
              Productos
              <ChevronDown size={14} className={`ml-1 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 bg-white border border-gainsboro shadow-2xl py-3 w-64 rounded-b-lg animate-in fade-in slide-in-from-top-2">
                {droneCategories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="block px-6 py-3 text-xs font-bold text-headingColor hover:bg-main hover:text-yellowColor transition-colors uppercase"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/shop/servicios" className="text-headingColor hover:text-yellowColor font-bold uppercase text-sm tracking-widest transition-colors">
            Servicios
          </Link>
          
          {/* Link exclusivo para el Admin Panel si es empleado */}
          <Link href="/admin" className="text-headingColor/50 hover:text-gold font-bold uppercase text-[10px] tracking-widest transition-colors border border-gainsboro px-2 py-1 rounded">
            Panel
          </Link>
        </div>

        {/* Action Icons & Auth */}
        <div className="flex items-center space-x-3 sm:space-x-6">
          <Link href="/cart" className="relative p-2 text-headingColor hover:text-yellowColor transition-transform active:scale-90">
            <ShoppingCart size={24} strokeWidth={2.5} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-yellowColor text-headingColor text-[10px] font-black h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </Link>

          <div className="hidden sm:flex items-center space-x-4">
            <Link href="/login" className="text-xs font-black uppercase tracking-widest hover:text-yellowColor transition-colors">
              Login
            </Link>
            <Link 
              href="/register" 
              className="bg-headingColor text-gold px-6 py-2.5 rounded-sm text-xs font-black uppercase tracking-widest hover:bg-yellowColor hover:text-headingColor transition-all shadow-[4px_4px_0px_0px_rgba(254,182,13,1)] active:translate-y-1 active:shadow-none"
            >
              Registro
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-headingColor p-1 transition-colors hover:text-yellowColor"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      
      
       

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;