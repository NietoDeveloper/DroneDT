"use client";

import dynamic from 'next/dynamic';
import Link from "next/link";

const Navbar = dynamic(() => import("@/components/layout/Navbar"), { ssr: false });
const Banner = dynamic(() => import("@/components/layout/Banner"), { ssr: false });
const ProductShow = dynamic(() => import("@/components/layout/ProductShow"), { ssr: false });
const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: false });

export default function Home() {
  return (
    <div className="relative bg-[#DCDCDC] selection:bg-[#FFD700] selection:text-black">
      <div className="fixed top-0 left-0 w-full z-[100]">
        <Navbar />
      </div>

      <main className="h-screen overflow-y-scroll snap-y snap-proximity scroll-smooth custom-scrollbar relative">
        
        {/* SECCIÓN 1: BANNER (80/20) */}
        <section className="relative h-screen w-full snap-start snap-always z-10 bg-black overflow-visible">
          <div className="h-[80vh] w-full overflow-hidden">
            <Banner />
          </div>
          {/* El 20% inferior Gainsboro */}
          <div className="h-[20vh] w-full bg-[#DCDCDC] relative overflow-visible" />
        </section>

        {/* SECCIÓN 2: CATÁLOGO - RECORTE EXTRA DE 20px */}
        <section 
          id="catalog" 
          className="relative z-30 bg-[#DCDCDC] h-[78vh] snap-start snap-always flex flex-col items-center justify-start overflow-visible"
        >
          {/* Mantenemos el margin-top negativo para que muerda el Banner,
              pero al reducir la altura de la sección a 78vh (aprox 80vh - 20px),
              la sección negra de abajo sube y elimina el espacio muerto.
          */}
          <div className="w-full -mt-[25vh] md:-mt-[30vh] z-40"> 
            <ProductShow />
          </div>
        </section>

        {/* SECCIÓN 3: SPECS - AHORA MÁS ARRIBA */}
        <section className="relative h-screen snap-start snap-always z-20 bg-black flex flex-col justify-center px-6 md:px-12 border-t border-white/5">
          <div className="max-w-[1900px] mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 mb-12 py-8 border-b border-white/10">
              <div className="flex flex-col items-center text-center group md:border-r border-white/10 px-8">
                <h3 className="text-5xl lg:text-7xl font-black text-white group-hover:text-[#FFD700] transition-all duration-500 italic leading-none">
                  4K <span className="text-[10px] font-bold text-[#FFD700] block mt-2 uppercase">60 FPS PRO</span>
                </h3>
                <p className="text-[9px] text-white/40 tracking-[0.5em] uppercase mt-4 font-bold">Ingeniería Óptica</p>
              </div>
              <div className="flex flex-col items-center text-center group md:border-r border-white/10 px-8">
                <h3 className="text-5xl lg:text-7xl font-black text-white group-hover:text-[#FFD700] transition-all duration-500 italic leading-none">
                  45 <span className="text-[10px] font-bold text-[#FFD700] block mt-2 uppercase">MINUTOS</span>
                </h3>
                <p className="text-[9px] text-white/40 tracking-[0.5em] uppercase mt-4 font-bold">Autonomía Real</p>
              </div>
              <div className="flex flex-col items-center text-center group px-8">
                <h3 className="text-5xl lg:text-7xl font-black text-white group-hover:text-[#FFD700] transition-all duration-500 italic leading-none">
                  10 <span className="text-[10px] font-bold text-[#FFD700] block mt-2 uppercase">KM RANGO</span>
                </h3>
                <p className="text-[9px] text-white/40 tracking-[0.5em] uppercase mt-4 font-bold">Transmisión O3</p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center space-y-8">
              <h1 className="text-6xl sm:text-7xl md:text-9xl lg:text-[110px] font-black tracking-tighter uppercase leading-none text-white">
                DRONE <span className="text-[#FFD700] italic">DT</span>
              </h1>
              <div className="flex flex-col sm:flex-row gap-5 w-full max-w-xl pt-4">
                <Link href="/shop" className="flex-1 h-14 flex items-center justify-center rounded-[4px] bg-[#FFD700] text-black text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:bg-white shadow-lg">
                  Explorar Tienda
                </Link>
                <Link href="/services" className="flex-1 h-14 flex items-center justify-center rounded-[4px] bg-transparent text-white border border-white/20 text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:border-[#FFD700] hover:text-[#FFD700]">
                  Servicios Técnicos
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="snap-start snap-always bg-black">
          <Footer />
        </section>
      </main>

      <style jsx global>{`
        html, body { overflow: hidden; height: 100%; margin: 0; padding: 0; background: #DCDCDC; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #000; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
      `}</style>
    </div>
  );
}