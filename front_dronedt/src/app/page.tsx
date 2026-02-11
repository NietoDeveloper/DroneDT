"use client";

import dynamic from 'next/dynamic';
import Link from "next/link";

const Navbar = dynamic(() => import("@/components/layout/Navbar"), { ssr: false });
const Banner = dynamic(() => import("@/components/layout/Banner"), { ssr: false });
const ProductShow = dynamic(() => import("@/components/layout/ProductShow"), { ssr: false });
const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: false });

export default function Home() {
  return (
    <div className="relative bg-white selection:bg-[#FFD700] selection:text-black">
      <Navbar />

      {/* Eliminamos hide-scrollbar para permitir la barra de scroll estilo Tesla */}
      <main className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth custom-scrollbar">
        
        {/* SECCIÓN 1: BANNER HERO (80vh para asomar la siguiente sección) */}
        <section className="relative h-[80vh] w-full snap-start z-10 overflow-hidden bg-black">
          <Banner />
          {/* Sombra de transición al catálogo (Gainsboro) */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#DCDCDC] to-transparent z-20 pointer-events-none" />
        </section>

        {/* SECCIÓN CATÁLOGO: Carrusel Atlas 80/20 Interno */}
        <section id="catalog" className="relative z-30 bg-[#DCDCDC] min-h-screen snap-start flex flex-col justify-center overflow-hidden">
          <div className="w-full">
            <ProductShow />
          </div>
        </section>

        {/* SECCIÓN 2: SPECS Y BRANDING (Ingeniería Drone DT) */}
        <section className="relative min-h-screen snap-start z-20 bg-black py-20 px-6 md:px-12 border-t border-white/5 flex flex-col justify-center">
          <div className="max-w-[1900px] mx-auto w-full">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 mb-24 py-16 lg:py-24 border-b border-white/10">
              <div className="flex flex-col items-center text-center group md:border-r border-white/10 px-8">
                <h3 className="text-6xl lg:text-7xl font-black text-white group-hover:text-[#FFD700] transition-all duration-500 italic leading-none">
                  4K <span className="text-[12px] not-italic text-[#FFD700] tracking-[0.3em] block mt-2 uppercase font-bold">60 FPS PRO</span>
                </h3>
                <p className="text-[10px] text-white/40 tracking-[0.5em] uppercase mt-6 font-bold">Ingeniería Óptica</p>
              </div>
              
              <div className="flex flex-col items-center text-center group md:border-r border-white/10 px-8">
                <h3 className="text-6xl lg:text-7xl font-black text-white group-hover:text-[#FFD700] transition-all duration-500 italic leading-none">
                  45 <span className="text-[12px] not-italic text-[#FFD700] tracking-[0.3em] block mt-2 uppercase font-bold">MINUTOS</span>
                </h3>
                <p className="text-[10px] text-white/40 tracking-[0.5em] uppercase mt-6 font-bold">Autonomía Real</p>
              </div>

              <div className="flex flex-col items-center text-center group px-8">
                <h3 className="text-6xl lg:text-7xl font-black text-white group-hover:text-[#FFD700] transition-all duration-500 italic leading-none">
                  10 <span className="text-[12px] not-italic text-[#FFD700] tracking-[0.3em] block mt-2 uppercase font-bold">KM RANGO</span>
                </h3>
                <p className="text-[10px] text-white/40 tracking-[0.5em] uppercase mt-6 font-bold">Transmisión O3</p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center space-y-12">
              <div className="space-y-6">
                <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[120px] font-black tracking-tighter uppercase leading-none text-white">
                  DRONE <span className="text-[#FFD700] italic">DT</span>
                </h1>
                <div className="flex items-center justify-center gap-4">
                  <span className="h-[1px] w-12 bg-[#FFD700]/50"></span>
                  <p className="text-[10px] md:text-xs tracking-[0.8em] text-white/60 font-black uppercase">
                    Bogotá • Colombia • Global
                  </p>
                  <span className="h-[1px] w-12 bg-[#FFD700]/50"></span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 w-full max-w-xl pt-10">
                <Link
                  href="/shop"
                  className="flex-1 h-16 flex items-center justify-center rounded-[4px] bg-[#FFD700] text-black text-[12px] font-black tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white hover:scale-[1.05] shadow-[0_0_30px_rgba(255,215,0,0.3)]"
                >
                  Explorar Tienda
                </Link>
                
                <Link
                  href="/services"
                  className="flex-1 h-16 flex items-center justify-center rounded-[4px] bg-transparent text-white border border-white/20 text-[12px] font-black tracking-[0.2em] uppercase transition-all duration-300 hover:border-[#FFD700] hover:text-[#FFD700]"
                >
                  Servicios Técnicos
                </Link>
              </div>
            </div>
          </div>
        </section>

        <footer className="snap-start bg-black">
          <Footer />
        </footer>
      </main>

      {/* Inyección de estilos para la barra de scroll personalizada (Tesla Style) */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #000;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 10px;
          transition: background 0.3s ease;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #FFD700;
        }
      `}</style>
    </div>
  );
}