import React from "react";
import Logo from "@/components/ui/Logo";

/**
 * Dashboard Layout - Drone DT Intelligence System
 * Ajustado con estética Aeroespacial y efectos Gold Flotantes.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-main overflow-hidden selection:bg-gold/30">
      
      {/* 1. Header Aeroespacial - Efecto de Profundidad */}
      <header className="h-14 border-b border-gold/10 bg-white/70 backdrop-blur-2xl flex items-center justify-between px-6 z-40 shadow-sm relative">
        {/* Línea de acento superior sutil */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        <div className="flex items-center gap-4">
          <div className="hover:scale-105 transition-transform duration-500 cursor-crosshair">
            <Logo iconSize={26} hideText={false} className="drop-shadow-[0_0_8px_rgba(255,215,0,0.3)]" />
          </div>
          <div className="h-4 w-[1px] bg-gainsboro/60 mx-2" />
          <div className="flex flex-col">
            <span className="text-[10px] font-mono font-black text-zinc-400 uppercase tracking-[0.2em]">
              Node: <span className="text-gold animate-pulse">BOG-01</span>
            </span>
            <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest opacity-60">Telemetry Active</span>
          </div>
        </div>

        <div className="flex items-center gap-5">
          {/* Status Badge Flotante */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-950 border border-gold/30 shadow-[0_0_15px_rgba(255,215,0,0.1)]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
            <span className="text-[9px] font-mono font-bold text-white uppercase tracking-tighter">Atlas-MERN Connected</span>
          </div>

          {/* User Avatar con Hover Gold Elevado */}
          <button className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-gold to-yellowColor rounded-full blur opacity-25 group-hover:opacity-75 transition duration-500" />
            <div className="relative w-9 h-9 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-[10px] text-white font-black group-hover:border-gold transition-all duration-300 shadow-xl">
              MN
            </div>
          </button>
        </div>
      </header>

      {/* 2. Contenedor Principal (Dashboard Engine) */}
      <main className="flex-1 overflow-hidden relative z-10">
        {/* Glows de fondo para dar profundidad al contenido */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gold/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-yellowColor/5 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="relative h-full">
          {children}
        </div>
      </main>

      {/* 3. Footer de Integridad Técnica */}
      <footer className="h-10 border-t border-gainsboro bg-white/80 backdrop-blur-md flex items-center justify-between px-6 z-40">
        <div className="flex items-center gap-4 text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
          <span className="opacity-60 italic">Standard v2.6.0</span>
          <span className="text-gainsboro">|</span>
          <a 
            href="https://softwaredt.vercel.app/" 
            target="_blank" 
            className="hover:text-gold hover:tracking-[0.2em] transition-all duration-300 font-bold"
          >
            Software DT
          </a>
        </div>
        
        <div className="flex items-center gap-3 group cursor-help">
          <span className="text-[9px] font-mono text-zinc-400 uppercase">
            Developed by <span className="text-heading font-black group-hover:text-gold transition-colors">NietoDeveloper</span>
          </span>
          <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_10px_#FFD700] group-hover:scale-150 transition-transform" />
        </div>
      </footer>
    </div>
  );
}