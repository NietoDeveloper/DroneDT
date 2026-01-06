"use client"; // Obligatorio para usar useState en Next.js App Router

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart, ChevronDown, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  // Lógica de carrito (Placeholder para tu integración futura)
  const cartCount: number = 0;

  const droneCategories = [
    { name: 'Racing Drones', href: '/products/racing' },
    { name: 'Photography Drones', href: '/products/photography' },
    { name: 'Professional Drones', href: '/products/professional' },
    { name: 'Accessories', href: '/products/accessories' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white border-b border-gainsboro z-50 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo Estilo Software DT */}
        <Link href="/" className="text-2xl font-bold tracking-tighter text-black">
          DRONE<span className="text-yellowColor">DT</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <div
            className="relative h-16 flex items-center"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="text-black hover:text-yellowColor flex items-center font-medium transition-colors">
              Productos
              <ChevronDown size={16} className={`ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-16 left-0 bg-white border border-gainsboro shadow-xl py-2 w-56 animate-tesla">
                {droneCategories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="block px-4 py-3 text-sm text-black hover:bg-main hover:text-yellowColor transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/services" className="text-black hover:text-yellowColor font-medium transition-colors">
            Servicios
          </Link>
        </div>

        {/* Action Icons */}
        <div className="hidden md:flex items-center space-x-5">
          <Link href="/cart" className="relative p-2 text-black hover:text-yellowColor transition-colors">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-yellowColor text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <div className="h-6 w-[1px] bg-gainsboro mx-2"></div>
          <Link href="/login" className="text-sm font-medium hover:text-yellowColor transition-colors">
            Login
          </Link>
          <Link 
            href="/register" 
            className="bg-black text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition-all active:scale-95"
          >
            Registro
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gainsboro absolute w-full left-0 shadow-2xl animate-tesla">
          <div className="px-6 py-8 flex flex-col space-y-6">
            <button
              className="text-xl font-bold flex items-center justify-between border-b border-gainsboro pb-2"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Productos
              <ChevronDown size={20} className={isDropdownOpen ? 'rotate-180' : ''} />
            </button>
            
            {isDropdownOpen && (
              <div className="flex flex-col space-y-4 pl-4">
                {droneCategories.map((category) => (
                  <Link 
                    key={category.name} 
                    href={category.href} 
                    className="text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}

            <Link href="/services" className="text-xl font-bold border-b border-gainsboro pb-2" onClick={() => setIsMenuOpen(false)}>
              Servicios
            </Link>
            <Link href="/cart" className="text-xl font-bold flex items-center" onClick={() => setIsMenuOpen(false)}>
              Carrito ({cartCount})
            </Link>
            <div className="flex flex-col space-y-4 pt-4">
              <Link href="/login" className="btn-dt-primary text-center" onClick={() => setIsMenuOpen(false)}>
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;