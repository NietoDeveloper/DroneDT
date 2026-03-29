"use client";

import dynamic from 'next/dynamic';
import Link from "next/link";

// Importación dinámica de componentes para optimizar LCP
const Navbar = dynamic(() => import("@/components/layout/Navbar"), { ssr: false });
const Banner = dynamic(() => import("@/components/layout/Banner"), { ssr: false });
const GalleryShowcase = dynamic(() => import("@/components/layout/GalleryShowcase"), { ssr: false });
const ProductShow = dynamic(() => import("@/components/layout/ProductShow"), { ssr: false });
const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: false });

export default function Home() {
  return (
    <div className="relative bg-[#DCDCDC] selection:bg-[#FFD700] selection:text-black">
      {/* NAVBAR FIJO */}
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

        {/* SECCIÓN 2: GALLERY SHOWCASE (NUEVA) */}
        {/* Insertada aquí para crear el impacto visual "In Action" justo después del banner */}
        <section className="relative min-h-screen w-full snap-start snap-always z-20 -mt-[20vh]">
          <GalleryShowcase />
        </section>

        {/* SECCIÓN 3: CATÁLOGO */}
        <section 
          id="catalog" 
          className="relative h-screen w-full snap-start snap-always z-30 flex flex-col bg-white shadow-2xl"
        >
          <div className="h-full w-full">
            <ProductShow />
          </div>
        </section>

        {/* SECCIÓN 4: SPECS TECNOLÓGICOS */}
        <section className="relative h-screen w-full snap-start snap-always z-40 bg-black flex flex-col justify-center overflow-hidden">
          <div className="max-w-[1900px] mx-auto w-full px-6 md:px-12 text-center">
            {/* Grid de Specs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 py-10 border-b border-white/10">
              <div className="flex flex-col items-center group">
                 <h3 className="text-6xl md:text-8xl font-black text-white italic group-hover:text-[#FFD700] transition-colors duration-500">4K</h3>
                 <p className="text-xs text-[#FFD700] tracking-[0.3em] mt-4 uppercase font-bold">60 FPS PRO</p>
              </div>
              <div className="flex flex-col items-center group">
                 <h3 className="text-6xl md:text-8xl font-black text-white italic group-hover:text-[#FFD700] transition-colors duration-500">45M</h3>
                 <p className="text-xs text-[#FFD700] tracking-[0.3em] mt-4 uppercase font-bold">AUTONOMÍA</p>
              </div>
              <div className="flex flex-col items-center group">
                 <h3 className="text-6xl md:text-8xl font-black text-white italic group-hover:text-[#FFD700] transition-colors duration-500">10K</h3>
                 <p className="text-xs text-[#FFD700] tracking-[0.3em] mt-4 uppercase font-bold">RANGO O3</p>
              </div>
            </div>

            {/* Call to Action Final */}
            <div className="flex flex-col items-center space-y-12">
              <h1 className="text-7xl md:text-9xl lg:text-[150px] font-black uppercase leading-none text-white tracking-tighter">
                DRONE <span className="text-[#FFD700] italic">DT</span>
              </h1>
              <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
                <Link href="/shop" className="flex-1 h-20 flex items-center justify-center bg-[#FFD700] text-black text-sm font-black uppercase tracking-widest hover:bg-white transition-all transform hover:-translate-y-1">
                  EXPLORAR TIENDA
                </Link>
                <Link href="/services" className="flex-1 h-20 flex items-center justify-center text-white border-2 border-white/20 text-sm font-black uppercase tracking-widest hover:border-[#FFD700] hover:text-[#FFD700] transition-all transform hover:-translate-y-1">
                  MANTENIMIENTO
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 5: FOOTER */}
        <section className="snap-start snap-always bg-black">
          <Footer />
        </section>
      </main>

      {/* ESTILOS GLOBALES DE SCROLL Y LAYOUT */}
      <style jsx global>{`
        html, body { 
          overflow: hidden; 
          height: 100%; 
          margin: 0; 
          background: #DCDCDC; 
          font-family: var(--font-geist-sans); 
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #000; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: #FFD700; 
          border-radius: 0px; 
        }
      `}</style>
    </div>
  );
}