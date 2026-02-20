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


}