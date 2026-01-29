"use client";

import dynamic from 'next/dynamic';
import Link from "next/link";

// Importación dinámica de componentes pesados para optimizar LCP
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
const Banner = dynamic(() => import("@/components/layout/Banner"), { ssr: false });

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden selection:bg-gold selection:text-black">
      {/* NAVBAR: Posicionamiento absoluto sobre el banner */}
      <Navbar />

      <main className="flex flex-col w-full">
        
        {/* SECCIÓN 1: BANNER DINÁMICO (80% del viewport) */}
        <section className="relative h-[80vh] w-full z-10">
          <Banner />
          
          {/* INDICADOR DE SCROLL TIPO TESLA */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none">
            <span className="text-[8px] md:text-[10px] tracking-[0.5em] text-white/40 uppercase font-black animate-pulse">
              Desliza
            </span>
            <div className="w-[1px] h-10 bg-gradient-to-b from-gold via-gold/10 to-transparent" />
          </div>
        </section>

        {/* SECCIÓN 2: CONTENIDO PRINCIPAL (Donde el usuario aterriza al hacer scroll) */}
        <section className="relative z-20 bg-black pt-16 pb-24 px-4 sm:px-10">
          <div className="max-w-[1900px] mx-auto">
            
            {/* STATS DE ALTA PRECISIÓN */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 mb-20 border-y border-white/5 py-12 md:py-20">
              <div className="flex flex-col items-center text-center group md:border-r border-white/10 last:border-0">
                <h3 className="text-4xl md:text-5xl lg:text-7xl font-black text-white group-hover:text-gold transition-all duration-500 italic">
                  4K <span className="text-[10px] md:text-xs not-italic text-white/30 tracking-widest block md:inline uppercase">60FPS</span>
                </h3>
                <p className="text-[9px] text-white/40 tracking-[0.3em] uppercase mt-4 font-bold max-w-[200px]">Ingeniería Óptica Pro</p>
              </div>
              
              <div className="flex flex-col items-center text-center group md:border-r border-white/10 last:border-0">
                <h3 className="text-4xl md:text-5xl lg:text-7xl font-black text-white group-hover:text-gold transition-all duration-500 italic">
                  45 <span className="text-[10px] md:text-xs not-italic text-white/30 tracking-widest block md:inline uppercase">MIN</span>
                </h3>
                <p className="text-[9px] text-white/40 tracking-[0.3em] uppercase mt-4 font-bold max-w-[200px]">Autonomía de Misión</p>
              </div>

              <div className="flex flex-col items-center text-center group last:border-0">
                <h3 className="text-4xl md:text-5xl lg:text-7xl font-black text-white group-hover:text-gold transition-all duration-500 italic">
                  10 <span className="text-[10px] md:text-xs not-italic text-white/30 tracking-widest block md:inline uppercase">KM</span>
                </h3>
                <p className="text-[9px] text-white/40 tracking-[0.3em] uppercase mt-4 font-bold max-w-[200px]">Rango de Operación O3</p>
              </div>
            </div>

            {/* BRANDING CENTRAL */}
            <div className="flex flex-col items-center text-center space-y-8 md:space-y-12">
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-[0.1em] sm:tracking-[0.2em] uppercase leading-none">
                  <span className="text-white">DRONE</span>
                  <span className="text-gold italic">DT</span>
                </h1>
                <p className="text-[9px] md:text-xs tracking-[0.4em] sm:tracking-[0.8em] text-white/40 font-bold uppercase">
                  Estándar de Clase Mundial • Bogotá
                </p>
              </div>

              {/* CTAS RESPONSIVOS (310px - 1900px) */}
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl pt-6">
                <Link
                  href="/shop"
                  className="flex-1 h-14 flex items-center justify-center rounded-sm bg-white text-black text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300 hover:bg-gold active:scale-95 shadow-lg shadow-white/5"
                >
                  Explorar Tienda
                </Link>
                
                <Link
                  href="/services"
                  className="flex-1 h-14 flex items-center justify-center rounded-sm bg-[#1a1a1a] text-white border border-white/10 text-[10px] font-black tracking-[0.2em] uppercase backdrop-blur-md transition-all duration-300 hover:border-gold hover:text-gold active:scale-95"
                >
                  Servicios Técnicos
                </Link>
              </div>
            </div>

          </div>

          {/* BACKGROUND EFFECTS: Noise y Radiales (Z-Index Negativo) */}
          <div className="absolute inset-0 z-[-1] pointer-events-none overflow-hidden">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gold/5 blur-[120px] rounded-full" />
             <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          </div>
        </section>
      </main>

      {/* FOOTER: Estética Tesla */}
      <footer className="relative z-20 py-12 flex flex-col items-center gap-6 border-t border-white/5">
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-[9px] text-white/30 font-bold tracking-widest uppercase">
          <span className="text-white/50">DroneDT © 2026</span>
          <Link href="/privacy" className="hover:text-gold transition-colors">Privacidad</Link>
          <Link href="/terms" className="hover:text-gold transition-colors">Términos</Link>
          <Link href="/contact" className="hover:text-gold transition-colors">Contacto</Link>
        </div>
      </footer>
    </div>
  );
}