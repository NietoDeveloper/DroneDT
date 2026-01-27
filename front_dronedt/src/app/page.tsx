import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* BACKGROUND LAYER: Gradientes y placeholders tecnológicos */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black z-10" />
        
        {/* Efecto de profundidad con los colores de marca */}
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/10 via-black to-black" />
        
        {/* Overlay de ruido sutil para textura tipo Tesla */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* CONTENIDO PRINCIPAL: Estilo Tesla Centrado */}
      <main className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        
        {/* TEXTO DE IMPACTO CON ANIMACIÓN */}
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-5xl md:text-8xl font-black tracking-[0.3em] uppercase">
            <span className="text-white">DRONE</span>
            <span className="text-gold italic">DT</span>
          </h1>
          <p className="text-[10px] md:text-xs tracking-[0.6em] text-gainsboro font-bold uppercase opacity-70">
            Ingeniería Aérea de Precisión • Bogotá
          </p>
        </div>

        {/* CTA BUTTONS: Tesla-Style */}
        <div className="mt-16 flex flex-col sm:flex-row gap-6 w-full max-w-xl animate-in fade-in zoom-in duration-1000 delay-300">
          <Link
            href="/shop"
            className="flex-1 h-12 flex items-center justify-center rounded-sm bg-white text-black text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-500 hover:bg-gold hover:tracking-[0.3em]"
          >
            Explorar Tienda
          </Link>
          
          <Link
            href="/services"
            className="flex-1 h-12 flex items-center justify-center rounded-sm bg-transparent text-white border border-white/30 text-[11px] font-bold tracking-[0.2em] uppercase backdrop-blur-md transition-all duration-500 hover:border-gold hover:text-gold"
          >
            Servicios Técnicos
          </Link>
        </div>

        {/* INDICADOR DE SCROLL DISCRETO */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[8px] tracking-[0.5em] text-white/30 uppercase">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-gold via-gold/20 to-transparent" />
        </div>
      </main>

      {/* SECCIÓN INFERIOR: Stats Rápidos (DNA del Dron) */}
      <div className="absolute bottom-12 right-12 hidden lg:block animate-in fade-in slide-in-from-right-8 duration-1000 delay-500">
        <div className="flex space-x-16 border-l border-gold/30 pl-10">
          <div className="text-left group">
            <p className="text-2xl font-bold text-white group-hover:text-gold transition-colors italic">4K <span className="text-xs not-italic text-white/40">60FPS</span></p>
            <p className="text-[9px] text-white/40 tracking-[0.3em] uppercase mt-1">Óptica de Cine</p>
          </div>
          <div className="text-left group">
            <p className="text-2xl font-bold text-white group-hover:text-gold transition-colors italic">45 <span className="text-xs not-italic text-white/40">MIN</span></p>
            <p className="text-[9px] text-white/40 tracking-[0.3em] uppercase mt-1">Resistencia</p>
          </div>
          <div className="text-left group">
            <p className="text-2xl font-bold text-white group-hover:text-gold transition-colors italic">10 <span className="text-xs not-italic text-white/40">KM</span></p>
            <p className="text-[9px] text-white/40 tracking-[0.3em] uppercase mt-1">Rango de Señal</p>
          </div>
        </div>
      </div>
    </div>
  );
}