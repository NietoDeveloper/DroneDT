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

      {/* Cambiamos overflow-y-auto por overflow-y-scroll para forzar la presencia del contenedor de scroll */}
      <main className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth custom-scrollbar relative">
        
        {/* SECCIÓN 1: BANNER HERO - Forzamos h-screen para el snap perfecto */}
        <section className="relative h-screen w-full snap-start snap-always z-10 overflow-hidden bg-black">
          {/* El contenido del Banner se ajusta al 80% interno si quieres, pero la sección de scroll debe ser 100% */}
          <div className="h-[80vh] w-full">
            <Banner />
          </div>
          {/* Sombra de transición al catálogo (Gainsboro) */}
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#DCDCDC] via-[#DCDCDC]/80 to-transparent z-20 pointer-events-none" />
        </section>

        {/* SECCIÓN CATÁLOGO: Ajustada a h-screen para que el imán bloquee bien */}
        <section id="catalog" className="relative z-30 bg-[#DCDCDC] h-screen snap-start snap-always flex flex-col justify-center overflow-hidden">
          <div className="w-full">
            <ProductShow />
          </div>
        </section>

        {/* SECCIÓN 2: SPECS Y BRANDING - h-screen obligatorio para consistencia */}
        <section className="relative h-screen snap-start snap-always z-20 bg-black py-10 px-6 md:px-12 border-t border-white/5 flex flex-col justify-center">
          <div className="max-w-[1900px] mx-auto w-full">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 mb-16 py-12 border-b border-white/10">
              <div className="flex flex-col items-center text-center group md:border-r border-white/10 px-8">
                <h3 className="text-5xl lg:text-7xl font-black text-white group-hover:text-[#FFD700] transition-all duration-500 italic leading-none">
                  4K <span className="text-[10px] not-italic text-[#FFD700] tracking-[0.3em] block mt-2 uppercase font-bold">60 FPS PRO</span>
                </h3>
                <p className="text-[9px] text-white/40 tracking-[0.5em] uppercase mt-4 font-bold">Ingeniería Óptica</p>
              </div>
              
              <div className="flex flex-col items-center text-center group md:border-r border-white/10 px-8">
                <h3 className="text-5xl lg:text-7xl font-black text-white group-hover:text-[#FFD700] transition-all duration-500 italic leading-none">
                  45 <span className="text-[10px] not-italic text-[#FFD700] tracking-[0.3em] block mt-2 uppercase font-bold">MINUTOS</span>
                </h3>
                <p className="text-[9px] text-white/40 tracking-[0.5em] uppercase mt-4 font-bold">Autonomía Real</p>
              </div>

              <div className="flex flex-col items-center text-center group px-8">
                <h3 className="text-5xl lg:text-7xl font-black text-white group-hover:text-[#FFD700] transition-all duration-500 italic leading-none">
                  10 <span className="text-[10px] not-italic text-[#FFD700] tracking-[0.3em] block mt-2 uppercase font-bold">KM RANGO</span>
                </h3>
                <p className="text-[9px] text-white/40 tracking-[0.5em] uppercase mt-4 font-bold">Transmisión O3</p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center space-y-10">
              <div className="space-y-4">
                <h1 className="text-6xl sm:text-7xl md:text-9xl lg:text-[110px] font-black tracking-tighter uppercase leading-none text-white">
                  DRONE <span className="text-[#FFD700] italic">DT</span>
                </h1>
                <div className="flex items-center justify-center gap-4">
                  <span className="h-[1px] w-10 bg-[#FFD700]/50"></span>
                  <p className="text-[9px] md:text-xs tracking-[0.8em] text-white/60 font-black uppercase">
                    Bogotá • Colombia • Global
                  </p>
                  <span className="h-[1px] w-10 bg-[#FFD700]/50"></span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 w-full max-w-xl pt-6">
                <Link
                  href="/shop"
                  className="flex-1 h-14 flex items-center justify-center rounded-[4px] bg-[#FFD700] text-black text-[11px] font-black tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white hover:scale-[1.05] shadow-lg"
                >
                  Explorar Tienda
                </Link>
                
                <Link
                  href="/services"
                  className="flex-1 h-14 flex items-center justify-center rounded-[4px] bg-transparent text-white border border-white/20 text-[11px] font-black tracking-[0.2em] uppercase transition-all duration-300 hover:border-[#FFD700] hover:text-[#FFD700]"
                >
                  Servicios Técnicos
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer como sección final de snap */}
        <section className="snap-start snap-always bg-black">
          <Footer />
        </section>
      </main>

      <style jsx global>{`
        /* Evitamos que el scroll del body interfiera */
        html, body {
          overflow: hidden;
          height: 100%;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #000;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #FFD700;
        }
      `}</style>
    </div>
  );
}