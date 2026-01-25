import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* BACKGROUND LAYER: Aquí irá tu video de drones o imagen 4K */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black z-10" />
        {/* Usamos una imagen oscura de placeholder que evoque tecnología aérea */}
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-royalBlue/20 via-black to-black" />
      </div>

      {/* CONTENIDO PRINCIPAL: Estilo Tesla Centrado */}
      <main className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        
        {/* TEXTO DE IMPACTO */}
        <div className="space-y-4 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-black tracking-[0.3em] uppercase">
            <span className="text-white">DRONE</span>
            <span className="text-gold italic">DT</span>
          </h1>
          <p className="text-xs md:text-sm tracking-[0.5em] text-royalBlue font-bold uppercase">
            El Futuro de la Inspección Aérea en Colombia
          </p>
        </div>

        {/* CTA BUTTONS: Tesla-Style (Bordes redondeados y minimalismo) */}
        <div className="mt-16 flex flex-col sm:flex-row gap-6 w-full max-w-xl">
          <Link
            href="/shop"
            className="flex-1 h-12 flex items-center justify-center rounded-sm bg-white/90 text-black text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-gold hover:tracking-[0.3em]"
          >
            Explorar Tienda
          </Link>
          
          <Link
            href="/services"
            className="flex-1 h-12 flex items-center justify-center rounded-sm bg-black/50 text-white border border-white/20 text-[11px] font-bold tracking-[0.2em] uppercase backdrop-blur-md transition-all duration-300 hover:bg-royalBlue hover:border-royalBlue"
          >
            Servicios Técnicos
          </Link>
        </div>

        {/* INDICADOR DE SCROLL DISCRETO */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent" />
        </div>
      </main>

      {/* SECCIÓN INFERIOR: Stats Rápidos */}
      <div className="absolute bottom-10 right-10 hidden lg:block">
        <div className="flex space-x-12 border-l border-royalBlue/30 pl-8">
          <div className="text-left">
            <p className="text-xl font-bold text-white">4K 60FPS</p>
            <p className="text-[9px] text-white/40 tracking-[0.2em] uppercase">Resolución Óptica</p>
          </div>
          <div className="text-left">
            <p className="text-xl font-bold text-white">45 MIN</p>
            <p className="text-[9px] text-white/40 tracking-[0.2em] uppercase">Autonomía de Vuelo</p>
          </div>
        </div>
      </div>
    </div>
  );
}