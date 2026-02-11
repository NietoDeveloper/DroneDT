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

      {/* QUITAMOS snap-y del main: 
          Esto permite que la página cargue sin bucles de layout. 
          El snap lo manejarán internamente las secciones de ProductShow.
      */}
      <main className="relative w-full overflow-x-hidden">
        
        {/* SECCIÓN 1: BANNER 
            Altura ajustada para que el catálogo asome sutilmente abajo.
        */}
        <section className="relative h-[85vh] w-full bg-black overflow-hidden">
          <Banner />
        </section>

        {/* SECCIÓN 2: CATÁLOGO
            Este componente ya trae sus propias secciones con h-screen y snap-start.
        */}
        <div id="catalog" className="relative z-30 bg-white">
          <ProductShow />
        </div>

        {/* SECCIÓN 3: SPECS */}
        <section className="relative min-h-screen bg-black pt-24 pb-32 flex flex-col justify-center px-6 md:px-12">
          <div className="max-w-[1900px] mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 mb-24 py-16 lg:py-24 border-b border-white/10">
              <div className="flex flex-col items-center text-center group md:border-r border-white/10 px-8">
                <h3 className="text-6xl lg:text-7xl font-black text-white group-hover:text-[#FFD700] transition-all duration-500 italic uppercase">4K</h3>
                <p className="text-[10px] text-white/40 tracking-[0.5em] uppercase mt-6 font-bold">Ingeniería Óptica</p>
              </div>
              <div className="flex flex-col items-center text-center group md:border-r border-white/10 px-8">
                <h3 className="text-6xl lg:text-7xl font-black text-white group-hover:text-[#FFD700] transition-all duration-500 italic uppercase">45 Min</h3>
                <p className="text-[10px] text-white/40 tracking-[0.5em] uppercase mt-6 font-bold">Autonomía Real</p>
              </div>
              <div className="flex flex-col items-center text-center group px-8">
                <h3 className="text-6xl lg:text-7xl font-black text-white group-hover:text-[#FFD700] transition-all duration-500 italic uppercase">10 Km</h3>
                <p className="text-[10px] text-white/40 tracking-[0.5em] uppercase mt-6 font-bold">Transmisión O3</p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center space-y-12">
              <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[120px] font-black tracking-tighter uppercase leading-none">
                <span className="text-white">DRONE</span>
                <span className="text-[#FFD700] italic">DT</span>
              </h1>
              <div className="flex flex-col sm:flex-row gap-6 w-full max-w-xl">
                <Link href="/shop" className="flex-1 h-16 flex items-center justify-center rounded-[4px] bg-[#FFD700] text-black text-[12px] font-black tracking-[0.2em] uppercase hover:bg-white transition-all duration-300">
                  Explorar Tienda
                </Link>
                <Link href="/services" className="flex-1 h-16 flex items-center justify-center rounded-[4px] bg-transparent text-white border border-white/20 text-[12px] font-black tracking-[0.2em] uppercase hover:border-[#FFD700] hover:text-[#FFD700] transition-all duration-300">
                  Servicios Técnicos
                </Link>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-black border-t border-white/5">
          <Footer />
        </footer>
      </main>
    </div>
  );
}