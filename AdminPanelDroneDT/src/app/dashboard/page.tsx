"use client";

import React from 'react';
import { UserPlus, Search, Activity, Terminal, Layers, Cpu, Menu } from 'lucide-react';
import { StatsPanel } from '@/components/dashboard/StatsPanel';
import { useRealTimeInventory } from '@/hooks/useRealTimeInventory';

export default function DashboardL5() {
  const { manualSync } = useRealTimeInventory(30000);

  return (
    /* 
      VIEWPORT LOCK: 
      - Evita el scroll elástico en iOS y el desborde lateral en pantallas 1900px.
    */
    <div className="fixed inset-0 bg-black text-white flex flex-col overflow-hidden font-mono selection:bg-emerald-500/30">
      
      {/* 1. DYNAMIC CONTROL STRIP */}
      <div className="h-[24px] flex-shrink-0 flex items-center justify-between bg-zinc-950 border-b border-white/10 px-2">
        <div className="flex items-center gap-2">
          <Cpu size={10} className="text-emerald-500" />
          <h1 className="text-[9px] font-black tracking-[0.2em] leading-none">
            EMERALD_<span className="text-emerald-500">DT</span>
          </h1>
          <span className="hidden sm:inline text-[7px] text-zinc-700 ml-2 border-l border-white/10 pl-2 uppercase">Core_v2.6</span>
        </div>
        
        <div className="flex items-center h-full">
           <button onClick={() => manualSync()} className="h-full px-3 hover:bg-emerald-500/10 border-l border-white/5 transition-colors">
             <Activity size={10} className="text-emerald-500/50" />
           </button>
           <div className="h-full px-2 border-l border-white/5 flex items-center bg-emerald-500/5">
             <div className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.4)]" />
           </div>
        </div>
      </div>

      {/* 2. STATS (Responsive: Se ocultan detalles en mobile) */}
      <div className="flex-shrink-0 border-b border-white/10 bg-black overflow-hidden">
        <StatsPanel />
      </div>

      {/* 3. ADAPTIVE WORKSPACE */}
      <div className="flex-1 min-h-0 flex overflow-hidden">
        
        {/* MAIN: STREAM DE ACTIVOS */}
        <div className="flex-1 min-w-0 flex flex-col border-r border-white/10 bg-zinc-950/20">
          <div className="h-[24px] flex-shrink-0 flex items-center justify-between px-2 bg-zinc-900/30 border-b border-white/5">
            <div className="flex items-center gap-1.5 opacity-40">
              <Layers size={9} />
              <span className="text-[7px] font-bold uppercase tracking-widest truncate">Asset_Stream</span>
            </div>
            
            {/* Search Input Adaptativo */}
            <div className="flex items-center h-full bg-black/40 px-2 border-l border-white/5">
              <Search size={8} className="text-zinc-600 mr-2" />
              <input 
                type="text" 
                placeholder="SKU..." 
                className="bg-transparent text-[8px] outline-none w-12 sm:w-24 md:w-32 focus:w-40 transition-all text-emerald-500 uppercase" 
              />
            </div>
          </div>

          {/* GRID FLUIDO: 310px (2 col) -> 1900px (10 col) */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-1 custom-scrollbar">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 2xl:grid-cols-10 gap-1 content-start">
              {Array.from({length: 60}).map((_, i) => (
                <div key={i} className="h-14 border border-white/5 bg-zinc-950 hover:bg-zinc-900/50 hover:border-emerald-500/40 transition-all p-1.5 flex flex-col justify-between group cursor-crosshair">
                  <div className="flex justify-between items-center">
                    <div className="w-0.5 h-2 bg-zinc-800 group-hover:bg-emerald-500 transition-colors" />
                    <span className="text-[6px] text-zinc-600 font-mono">#{1000 + i}</span>
                  </div>
                  <div className="h-[1px] w-full bg-white/5" />
                  <div className="flex justify-between items-center text-[5px] text-zinc-700">
                    <span className="uppercase font-black">Ready</span>
                    <span className="text-emerald-500/40">●</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SIDEBAR: Autohide en < 1024px (L5 Standard) */}
        <aside className="hidden lg:flex w-[160px] flex-shrink-0 flex-col bg-black">
          <button className="h-[40px] w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black text-[9px] uppercase tracking-tighter transition-all active:scale-95">
            + NEW_UNIT
          </button>

          <div className="flex-1 flex flex-col min-h-0 border-t border-white/10">
            <div className="h-[20px] px-2 flex items-center gap-1.5 bg-zinc-950 border-b border-white/5">
              <Terminal size={9} className="text-zinc-600" />
              <span className="text-[7px] text-zinc-500 font-bold">SYSTEM_LOG</span>
            </div>
            <div className="flex-1 overflow-hidden p-2 font-mono text-[7px] text-zinc-700 leading-tight space-y-1">
              <p className="truncate"><span className="text-emerald-900">1</span> KERNEL_SYNC</p>
              <p className="truncate"><span className="text-emerald-900">2</span> MESH_ACTIVE</p>
              <p className="animate-pulse text-emerald-500/20 mt-2">_LISTENING_</p>
            </div>
          </div>
        </aside>
      </div>

      {/* 4. ATOMIC FOOTER (Visible en todo tamaño) */}
      <footer className="h-[14px] flex-shrink-0 flex items-center justify-between px-2 bg-zinc-950 border-t border-white/10">
        <div className="flex gap-3 text-[6px] text-zinc-800 font-bold uppercase overflow-hidden">
          <span className="truncate">LOC: BOG_CTY</span>
          <span className="hidden sm:inline">TEMP: 21°C</span>
          <span className="hidden md:inline">BUFF: 0.02ms</span>
        </div>
        <div className="text-[6px] text-zinc-800 tracking-widest font-black truncate">
          NIETO_LAB_2026
        </div>
      </footer>

    </div>
  );
}