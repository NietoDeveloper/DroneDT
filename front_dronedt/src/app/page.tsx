"use client";

import dynamic from 'next/dynamic';
import Link from "next/link";

// Forzamos la carga dinámica con manejo de errores básico
const Navbar = dynamic(() => import("@/components/layout/Navbar"), { 
  ssr: false,
  loading: () => <div className="h-20 bg-black w-full" /> 
});
const Banner = dynamic(() => import("@/components/layout/Banner"), { ssr: false });
const ProductShow = dynamic(() => import("@/components/sections/ProductShow"), { 
  ssr: false,
  loading: () => <div className="h-screen bg-black w-full" />
});
const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: false });

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden selection:bg-gold selection:text-black font-montserrat">
      <Navbar />

      <main className="flex flex-col w-full">
        
        {/* SECCIÓN 1: BANNER HERO */}
        <section className="relative h-[90vh] w-full z-10 overflow-hidden bg-black">
          <Banner />
        </section>

        {/* SECCIÓN CATÁLOGO - Asegúrate de que el archivo existe en src/components/sections/ProductShow.tsx */}
        <ProductShow />

        {/* SECCIÓN 2: SPECS Y BRANDING */}
        <section className="relative z-20 bg-black pt-24 pb-32 px-6 md:px-12">
          <div className="max-w-[1900px] mx-auto">
            
            {/* GRID DE STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-4 mb-24 border-y border-white/5 py-16 lg:py-24">
              <div className="flex flex-col items-center text-center group md:border-r border-white/10 last:border-0">
                <h3 className="text-5xl lg:text-6xl font-black text-white group-hover:text-gold transition-all duration-500 italic">
                  4K <span className="text-[10px] md:text-xs not-italic text-white/30 tracking-widest block md:inline uppercase">60FPS</span>
                </h3>
                <p className="text-[9px] text-white/40 tracking-[0.4em] uppercase mt-4 font-bold">Ingeniería Óptica Pro</p>
              </div>
              
              <div className="flex flex-col items-center text-center group md:border-r border-white/10 last:border-0">
                <h3 className="text-5xl lg:text-6xl font-black text-white group-hover:text-gold transition-all duration-500 italic">
                  45 <span className="text-[10px] md:text-xs not-italic text-white/30 tracking-widest block md:inline uppercase">MIN</span>
                </h3>
                <p className="text-[9px] text-white/40 tracking-[0.4em] uppercase mt-4 font-bold">Autonomía de Misión</p>
              </div>

              <div className="flex flex-col items-center text-center group last:border-0">
                <h3 className="text-5xl lg:text-6xl font-black text-white group-hover:text-gold transition-all duration-500 italic">
                  10 <span className="text-[10px] md:text-xs not-italic text-white/30 tracking-widest block md:inline uppercase">KM</span>
                </h3>
                <p className="text-[9px] text-white/40 tracking-[0.4em] uppercase mt-4 font-bold">Rango de Operación O3</p>
              </div>
            </div>

            {/* BRANDING CENTRAL */}
            <div className="flex flex-col items-center text-center space-y-10 py-10">
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[100px] font-black tracking-tighter uppercase leading-none">
                  <span className="text-white">DRONE</span>
                  <span className="text-gold italic">DT</span>
                </h1>
                <p className="text-[10px] md:text-xs tracking-[0.6em] text-white/40 font-bold uppercase">
                  Estándar de Clase Mundial • Bogotá
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 w-full max-w-lg pt-6">
                <Link
                  href="/shop"
                  className="flex-1 h-14 flex items-center justify-center rounded-[4px] bg-white text-black text-[11px] font-black tracking-widest uppercase transition-all duration-300 hover:bg-gold active:scale-95"
                >
                  Explorar Tienda
                </Link>
                
                <Link
                  href="/services"
                  className="flex-1 h-14 flex items-center justify-center rounded-[4px] bg-transparent text-white border border-white/20 text-[11px] font-black tracking-widest uppercase transition-all duration-300 hover:border-gold hover:text-gold active:scale-95"
                >
                  Servicios Técnicos
                </Link>
              </div>
            </div>

          </div>

          <div className="absolute inset-0 z-[-1] pointer-events-none overflow-hidden">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[600px] bg-gold/5 blur-[150px] rounded-full" />
             <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}