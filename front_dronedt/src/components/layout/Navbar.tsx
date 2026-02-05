"use client";

import { useState, useEffect } from 'react';
import { User, X, ChevronRight, Globe, Circle, Loader2 } from 'lucide-react';

// Tipado para los productos que vienen del back
interface MenuItem {
  _id: string; // MongoDB usa _id
  name: string;
  price?: string;
  desc: string;
  img: string;
  category: string; 
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [isLogged, setIsLogged] = useState(false);
  
  // ESTADO PARA DATOS REALES
  const [dynamicMenuContent, setDynamicMenuContent] = useState<Record<string, MenuItem[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Reemplaza con tu URL de Railway o Local
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        const data: MenuItem[] = await response.json();

        // Agrupamos los productos por categoría dinámicamente
        const grouped = data.reduce((acc, item) => {
          const cat = item.category || 'Otros';
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(item);
          return acc;
        }, {} as Record<string, MenuItem[]>);

        setDynamicMenuContent(grouped);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const token = localStorage.getItem('token');
    if (token) setIsLogged(true);

    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ... (Componente Logo igual)

  return (
    <>
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        {/* Tu código de navegación principal */}
      </nav>

      <div className={`fixed inset-0 bg-white z-[110] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} flex flex-col overflow-hidden`}>
        
        {/* Header del Menu */}
        <div className="flex justify-between items-center px-6 sm:px-10 py-6">
           {/* ... */}
        </div>
        
        <div className="flex-1 overflow-y-auto px-6 sm:px-10 w-full max-w-[1800px] mx-auto flex flex-col">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Loader2 className="animate-spin text-gold" size={48} />
              <p className="mt-4 font-black text-blue-700 uppercase tracking-widest">Sincronizando Flota...</p>
            </div>
          ) : !selectedModel ? (
            <div className="flex flex-col space-y-2 md:space-y-4 pt-4 sm:pt-8">
              {/* Generamos los botones basados en las categorías que trajo el BACK */}
              {Object.keys(dynamicMenuContent).concat(['Nosotros']).map((item, index) => (
                <button 
                  key={item}
                  onClick={() => setSelectedModel(item)}
                  style={{ animationDelay: `${index * 70}ms` }}
                  className="animate-in fade-in slide-in-from-bottom-5 duration-700 text-4xl sm:text-6xl md:text-8xl text-black font-black tracking-tighter flex justify-between items-center group w-full transition-all duration-300 hover:text-gold hover:-translate-y-3 text-left cursor-pointer bg-transparent"
                >
                  <span>{item}</span>
                  <ChevronRight className="text-black/5 group-hover:text-gold transition-all" size={50} />
                </button>
              ))}
            </div>
          ) : selectedModel === 'Nosotros' ? (
             // ... Sección nosotros igual
          ) : (
            <div className="animate-in fade-in slide-in-from-right-10 duration-500 pb-10 pt-4 sm:pt-8">
              {/* Lista de productos de la categoría seleccionada */}
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-10">
                {dynamicMenuContent[selectedModel]?.map((item) => (
                  <div key={item._id} className="group flex flex-col bg-neutral-50 rounded-[32px] overflow-hidden border border-transparent hover:border-gold/30 hover:shadow-2xl transition-all duration-500">
                    <div className="relative aspect-[16/11] overflow-hidden bg-gray-200">
                       <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    </div>
                    <div className="p-5 lg:p-8 flex flex-col flex-1">
                      <h4 className="text-black font-black text-xl lg:text-2xl tracking-tight mb-2 uppercase italic">{item.name}</h4>
                      <p className="text-gray-500 text-xs lg:text-sm mb-6 font-medium">{item.desc}</p>
                      <div className="mt-auto space-y-3">
                        <button className="w-full py-3 bg-[#0000FF] text-white rounded-xl font-black text-[11px] lg:text-[12px] uppercase tracking-widest hover:bg-gold hover:text-black transition-all shadow-lg">Añadir al Carrito</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* ... Footer del menu */}
        </div>
      </div>
    </>
  );
};

export default Navbar;