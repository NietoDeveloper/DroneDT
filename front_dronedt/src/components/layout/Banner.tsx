"use client";

import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import("@/components/layout/Navbar"), { ssr: false });
const Banner = dynamic(() => import("@/components/layout/Banner"), { ssr: false });
const ProductShow = dynamic(() => import("@/components/layout/ProductShow"), { ssr: false });
const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: false });

export default function Home() {
  return (
    /* bg-white para que cuando asome el catálogo se vea el contraste limpio */
    <div className="relative bg-white selection:bg-[#FFD700] selection:text-black">
      <Navbar />

      {/* CONFIGURACIÓN TESLA:
          h-screen + overflow-y-auto + snap-y es lo que permite que 
          cada sección se "pegue" a la pantalla al scrollear.
      */}
      <main className="relative h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
        
        {/* SECCIÓN 1: BANNER HERO 
            Como tu Banner.tsx tiene h-[80vh], esta sección DEBE medir h-[80vh].
            Esto hace que el 20% restante de la pantalla lo ocupe el primer producto de Atlas.
        */}
        <section className="relative h-[80vh] w-full snap-start z-10 bg-black">
          <Banner />
        </section>

        {/* SECCIÓN 2: CATÁLOGO DINÁMICO (ATLAS)
            ProductShow mapea varias <section className="h-screen snap-start">.
            Cada dron será una parada completa del scroll.
        */}
        <ProductShow />

        {/* SECCIÓN 3: SPECS & FOOTER 
            Unimos las specs con el footer en una última parada de snap 
            para que no quede el footer volando.
        */}
        <section className="relative min-h-screen snap-start z-40 bg-black">
           {/* Aquí iría tu grid de stats y branding central que tenías antes */}
           <div className="pt-24 pb-12">
              {/* ... Contenido de Specs ... */}
           </div>
           <Footer />
        </section>

      </main>
    </div>
  );
}