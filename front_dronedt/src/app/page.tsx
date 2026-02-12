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
        
        <section className="relative h-screen w-full snap-start snap-always z-10 bg-black flex flex-col pb-[20vh]">
          <div className="flex-1 w-full overflow-hidden">
            <Banner />
          </div>
        </section>

        {/* SECCIÓN CATÁLOGO: Ajuste h-[calc(80vh+60px)] para holgura */}
        <section 
          id="catalog" 
          className="relative h-screen w-full snap-start snap-always z-20 flex flex-col -mt-[20vh]"
        >
          <div className="h-[calc(80vh+60px)] w-full bg-white shadow-xl">
            <ProductShow />
          </div>
          <div className="flex-1 w-full bg-[#DCDCDC]" /> 
        </section>

        <section className="relative h-screen snap-start snap-always z-30 flex flex-col -mt-[20vh]">
          <div className="flex-1 bg-black flex flex-col justify-center px-6 md:px-12 pt-20">
            <div className="max-w-[1900px] mx-auto w-full text-center">
              {/* Specs simplificadas para evitar desbordamiento */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 py-8 border-b border-white/10">
                <div className="flex flex-col items-center">
                   <h3 className="text-5xl font-black text-white italic">4K</h3>
                   <p className="text-[9px] text-white/40 tracking-widest mt-2">60 FPS PRO</p>
                </div>
                <div className="flex flex-col items-center">
                   <h3 className="text-5xl font-black text-white italic">45M</h3>
                   <p className="text-[9px] text-white/40 tracking-widest mt-2">AUTONOMÍA</p>
                </div>
                <div className="flex flex-col items-center">
                   <h3 className="text-5xl font-black text-white italic">10K</h3>
                   <p className="text-[9px] text-white/40 tracking-widest mt-2">RANGO</p>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-8">
                <h1 className="text-6xl md:text-8xl lg:text-[100px] font-black uppercase leading-none text-white">
                  DRONE <span className="text-[#FFD700] italic">DT</span>
                </h1>
                <div className="flex flex-col sm:flex-row gap-5 w-full max-w-xl">
                  <Link href="/shop" className="flex-1 h-14 flex items-center justify-center bg-[#FFD700] text-black text-[11px] font-black uppercase tracking-widest hover:bg-white transition-colors">
                    Tienda
                  </Link>
                  <Link href="/services" className="flex-1 h-14 flex items-center justify-center text-white border border-white/20 text-[11px] font-black uppercase tracking-widest hover:border-[#FFD700] transition-colors">
                    Servicios
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[20vh] w-full" />
        </section>

        <section className="snap-start snap-always bg-black">
          <Footer />
        </section>
      </main>

      <style jsx global>{`
        html, body { overflow: hidden; height: 100%; margin: 0; background: #DCDCDC; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #000; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; }
      `}</style>
    </div>
  );
}