"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ChevronRight, Circle } from 'lucide-react';


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  const [menuContent, setMenuContent] = useState<Record<string, MenuItem[]>>({
    Modelos: [],
    Accesorios: [],
    Flota: [],
  });

  // Mapeo de categorías del Back -> Front
  const categoryMap: Record<string, string> = {
    'drone': 'Modelos',
    'accessory': 'Accesorios',
    'fleet': 'Flota',
    'industrial': 'Flota'
  };

  const fetchMenuData = useCallback(async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      console.warn("⚠️ NEXT_PUBLIC_API_URL no definida. Usando modo offline.");
      setLoading(false);
      return;
    }


  return (
    <>
      
                             <div className="w-10 h-10 rounded-full border border-[#0000FF] flex items-center justify-center group-hover:bg-[#FFD700] group-hover:border-[#FFD700] transition-all duration-300">
                               <ChevronRight size={20} className="text-[#0000FF] group-hover:text-black transition-colors" />
                             </div>
                           </div>
                         </div>
                         <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-[#FFD700] transition-all duration-500 group-hover:w-[80%] shadow-[0_0_15px_#FFD700]"></div>
                      </Link>
                    ))}
                </div>
             </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;