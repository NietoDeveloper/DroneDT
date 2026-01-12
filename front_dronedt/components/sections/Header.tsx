"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart, ChevronDown } from 'lucide-react';

/**
 * Header Component - DroneDT
 * Ajustado para eliminar errores de importación y alineado al esqueleto del proyecto.
 */
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <header className="fixed top-0 left-0 w-full bg-white border-b border-gainsboro z-50 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      
 {/* Icons & Auth */}
        <div className="hidden md:flex items-center space-x-5">
          <Link href="/cart" className="relative p-2 text-black hover:text-yellowColor transition-colors">
            <ShoppingCart size={22} />
            {cartCount > 0 && (

            )}
          </Link>
          <div className="h-6 w-[1px] bg-gainsboro mx-2"></div>
          <Link href="/login" className="text-sm font-medium hover:text-yellowColor transition-colors">
            Iniciar Sesión
          </Link>
          <Link 
            href="/register" 
            className="bg-black text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition-all active:scale-95 shadow-md"
          >
            Registro
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-black p-2 outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gainsboro absolute w-full left-0 shadow-2xl">
          <div className="px-6 py-8 flex flex-col space-y-6">
            <button
              className="text-xl font-bold flex items-center justify-between border-b border-gainsboro pb-2 outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Productos
              <ChevronDown size={20} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="flex flex-col space-y-4 pl-4 border-l-2 border-yellowColor">
                {droneCategories.map((category) => (
                  <Link 
                    key={category.name} 
                    href={category.href} 
                    className="text-gray-600 text-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}

            <Link href="/shop/servicios" className="text-xl font-bold border-b border-gainsboro pb-2" onClick={() => setIsMenuOpen(false)}>
              Servicios
            </Link>
            <Link href="/cart" className="text-xl font-bold flex items-center" onClick={() => setIsMenuOpen(false)}>
              Carrito ({cartCount})
            </Link>
            <div className="flex flex-col space-y-4 pt-4">
              <Link href="/login" className="text-black font-semibold text-center py-3 border border-black rounded-full hover:bg-main transition-colors" onClick={() => setIsMenuOpen(false)}>
                Iniciar Sesión
              </Link>
              <Link href="/register" className="bg-black text-white py-3 rounded-full text-center font-semibold active:scale-95" onClick={() => setIsMenuOpen(false)}>
                Registro
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;