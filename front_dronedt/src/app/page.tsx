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

      <main className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth hide-scrollbar">
        
        {/* SECCIÓN 1: BANNER HERO - Ajustado al 80% de la pantalla */}
        <section className="relative h-[80vh] w-full snap-start z-10 overflow-hidden bg-black">
          <Banner />
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/40 to-transparent z-20 pointer-events-none" />
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 animate-bounce">
             <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase mb-2 text-center">Catálogo</p>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white mx-auto opacity-50">
                <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
          </div>
        </section>

        {/* SECCIÓN CATÁLOGO: Ocupa el 20% restante para completar el 100vh inicial */}
        <section id="catalog" className="relative z-30 bg-white min-h-[20vh]">
          <ProductShow />
        </section>

        {/* SECCIÓN 2: SPECS Y BRANDING */}
        <section className="relative min-h-screen snap-start z-20 bg-black pt-24 pb-32 px-6 md:px-12 border-t border-white/5 flex flex-col justify-center">
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
                <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[120px] font-black tracking-tighter uppercase leading-none">
                  <span className="text-white">DRONE</span>
                  <span className="text-[#FFD700] italic">DT</span>
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
                  className="flex-1 h-16 flex items-center justify-center rounded-[4px] bg-[#FFD700] text-black text-[12px] font-black tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white hover:scale-[1.05] active:scale-95 shadow-[0_0_30px_rgba(255,215,0,0.3)]"
                >
                  Explorar Tienda
                </Link>
                
                <Link
                  href="/services"
                  className="flex-1 h-16 flex items-center justify-center rounded-[4px] bg-transparent text-white border border-white/20 text-[12px] font-black tracking-[0.2em] uppercase transition-all duration-300 hover:border-[#FFD700] hover:text-[#FFD700] active:scale-95"
                >
                  Servicios Técnicos
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 z-[-1] pointer-events-none overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[1000px] bg-[#FFD700]/5 blur-[180px] rounded-full opacity-50" />
          </div>
        </section>

        <footer className="snap-start bg-black">
          <Footer />
        </footer>
      </main>
    </div>
  );
}