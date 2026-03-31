"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from "next/link";

// Cargamos los componentes dinámicamente para optimizar el LCP y evitar errores de hidratación
const Navbar = dynamic(() => import("@/components/layout/Navbar"), { ssr: false });
const Banner = dynamic(() => import("@/components/layout/Banner"), { ssr: false });
const ProductShow = dynamic(() => import("@/components/layout/ProductShow"), { ssr: false });
const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: false });

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Skeleton de carga base para evitar el layout shift
  if (!isMounted) {
    return <div className="bg-[#DCDCDC] h-screen w-full" />;
  }

  return (
    <div className="relative bg-[#DCDCDC] selection:bg-[#FFD700] selection:text-black">
      {/* 🛸 NAVEGACIÓN FIJA */}
      <div className="fixed top-0 left-0 w-full z-[100]">
        <Navbar />
      </div>

      <main className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth custom-scrollbar relative">
        
        {/* SECCIÓN 1: BANNER (HERO) */}
        <section className="relative h-screen w-full snap-start snap-always z-10 bg-black flex flex-col pb-[20vh]">
          <div className="flex-1 w-full overflow-hidden">
            <Banner />
          </div>
        </section>

        {/* SECCIÓN 2: CATÁLOGO (ELITE UNITS) */}
        <section 
          id="catalog" 
          className="relative h-screen w-full snap-start snap-always z-20 flex flex-col -mt-[20vh]"
        >
          <div className="h-full w-full bg-white shadow-2xl overflow-hidden">
            <ProductShow />
          </div>
        </section>

        {/* SECCIÓN 3: SPECS (INDUSTRIAL OVERVIEW) */}
        <section className="relative h-screen w-full snap-start snap-always z-30 bg-black flex flex-col justify-center">
          <div className="flex-1 flex flex-col justify-center px-6 md:px-12">
            <div className="max-w-[1900px] mx-auto w-full text-center">
              
              {/* TELEMETRÍA TÉCNICA */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 py-10 border-b border-white/10">
                <div className="flex flex-col items-center group">
                   <h3 className="text-6xl md:text-7xl font-black text-white italic transition-all group-hover:text-[#FFD700]">4K</h3>
                   <p className="text-[10px] text-[#FFD700] tracking-[0.4em] mt-2 uppercase font-bold">60 FPS PRO</p>
                </div>
                <div className="flex flex-col items-center group border-y md:border-y-0 md:border-x border-white/10 py-8 md:py-0">
                   <h3 className="text-6xl md:text-7xl font-black text-white italic transition-all group-hover:text-[#FFD700]">45M</h3>
                   <p className="text-[10px] text-[#FFD700] tracking-[0.4em] mt-2 uppercase font-bold">AUTONOMÍA</p>
                </div>
                <div className="flex flex-col items-center group">
                   <h3 className="text-6xl md:text-7xl font-black text-white italic transition-all group-hover:text-[#FFD700]">10K</h3>
                   <p className="text-[10px] text-[#FFD700] tracking-[0.4em] mt-2 uppercase font-bold">RANGO O3</p>
                </div>
              </div>

              {/* BRANDING & CTA */}
              <div className="flex flex-col items-center space-y-12">
                <h1 className="text-7xl md:text-9xl lg:text-[140px] font-black uppercase leading-none text-white tracking-tighter">
                  DRONE <span className="text-[#FFD700] italic">DT</span>
                </h1>
                
                <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
                  <Link 
                    href="/shop" 
                    className="flex-1 h-16 flex items-center justify-center bg-[#FFD700] text-black text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all transform hover:-translate-y-1 active:scale-95"
                  >
                    EXPLORAR TIENDA
                  </Link>
                  <Link 
                    href="/services" 
                    className="flex-1 h-16 flex items-center justify-center text-white border-2 border-white/20 text-[11px] font-black uppercase tracking-[0.3em] hover:border-[#FFD700] hover:text-[#FFD700] transition-all transform hover:-translate-y-1 active:scale-95"
                  >
                    MANTENIMIENTO
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECCIÓN 4: FOOTER (SYSTEM TERMINATION) */}
        <section className="snap-start snap-always bg-black">
          <Footer />
        </section>
      </main>

      {/* ESTILOS GLOBALES DE INTERFAZ */}
      <style jsx global>{`
        html, body { 
          overflow: hidden; 
          height: 100%; 
          margin: 0; 
          background: #DCDCDC; 
        }
        
        /* Scrollbar Minimalista Industrial */
        .custom-scrollbar::-webkit-scrollbar { 
          width: 4px; 
        }
        .custom-scrollbar::-webkit-scrollbar-track { 
          background: #000; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: #FFD700; 
          border-radius: 0px; 
        }

      `}</style>
    </div>
  );
}