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

      <main className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth custom-scrollbar relative">
        
        {/* SECCIÓN 1: BANNER */}
        <section className="relative h-screen w-full snap-start snap-always z-10 bg-black flex flex-col pb-[20vh]">
          <div className="flex-1 w-full overflow-hidden">
            <Banner />
          </div>
        </section>

        {/* SECCIÓN 2: CATÁLOGO (ÚLTIMO SOLAPAMIENTO 80/20) */}
        <section 
          id="catalog" 
          className="relative h-screen w-full snap-start snap-always z-20 flex flex-col -mt-[20vh]"
        >
          {/* h-full aquí para que ProductShow use todo el espacio de la sección */}
          <div className="h-full w-full bg-white shadow-2xl">
            <ProductShow />
          </div>
        </section>

        {/* SECCIÓN 3: SPECS (FLUJO NORMAL - SIN -MT) */}
        <section className="relative h-screen w-full snap-start snap-always z-30 bg-black flex flex-col">
          <div className="flex-1 flex flex-col justify-center px-6 md:px-12">
            <div className="max-w-[1900px] mx-auto w-full text-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 py-10 border-b border-white/10">
                <div className="flex flex-col items-center">
                   <h3 className="text-6xl font-black text-white italic">4K</h3>
                   <p className="text-xs text-[#FFD700] tracking-[0.3em] mt-2 uppercase font-bold">60 FPS PRO</p>
                </div>
                <div className="flex flex-col items-center">
                   <h3 className="text-6xl font-black text-white italic">45M</h3>
                   <p className="text-xs text-[#FFD700] tracking-[0.3em] mt-2 uppercase font-bold">AUTONOMÍA</p>
                </div>
                <div className="flex flex-col items-center">
                   <h3 className="text-6xl font-black text-white italic">10K</h3>
                   <p className="text-xs text-[#FFD700] tracking-[0.3em] mt-2 uppercase font-bold">RANGO O3</p>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-10">
                <h1 className="text-7xl md:text-9xl lg:text-[120px] font-black uppercase leading-none text-white tracking-tighter">
                  DRONE <span className="text-[#FFD700] italic">DT</span>
                </h1>
                <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
                  <Link href="/shop" className="flex-1 h-16 flex items-center justify-center bg-[#FFD700] text-black text-xs font-black uppercase tracking-widest hover:bg-white transition-all transform hover:scale-105">
                    EXPLORAR TIENDA
                  </Link>
                  <Link href="/services" className="flex-1 h-16 flex items-center justify-center text-white border-2 border-white/20 text-xs font-black uppercase tracking-widest hover:border-[#FFD700] hover:text-[#FFD700] transition-all transform hover:scale-105">
                    MANTENIMIENTO
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 4: FOOTER */}
        <section className="snap-start snap-always bg-black h-auto">
          <Footer />
        </section>
      </main>

      <style jsx global>{`
        html, body { overflow: hidden; height: 100%; margin: 0; background: #DCDCDC; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #000; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #FFD700; border-radius: 10px; }
      `}</style>
    </div>
  );
}