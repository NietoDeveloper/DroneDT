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


      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gainsboro absolute w-full left-0 shadow-2xl">
          <div className="px-6 py-8 flex flex-col space-y-6">

            <div className="flex flex-col space-y-4 pt-4">
              <Link href="/login" className="text-black font-semibold text-center py-3 border border-black rounded-full hover:bg-main transition-colors" onClick={() => setIsMenuOpen(false)}>
                Iniciar Sesión
              </Link>
              <Link href="/"bg-black text-white py-3 rounded-full text-center font-semibold active:scale-95" onClick={() => setIsMenuOpen(false)}>
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