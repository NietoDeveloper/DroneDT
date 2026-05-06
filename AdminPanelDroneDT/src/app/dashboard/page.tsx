"use client";

import React, { useState } from 'react';
import { UserPlus, Search, Activity, Terminal, Layers, Cpu } from 'lucide-react';
import { StatsPanel } from '@/components/dashboard/StatsPanel';
import { useRealTimeInventory } from '@/hooks/useRealTimeInventory';

export default function DashboardL5() {
  const { manualSync } = useRealTimeInventory(30000);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    // Se elimina el p-1.5 para que los bordes toquen los límites del viewport
    <div className="h-screen w-full bg-black text-white flex flex-col overflow-hidden font-sans selection:bg-emerald-500/30">
      
      {/* 1. TOP NAV: Altura reducida y sin márgenes superiores */}
      <header className="h-[35px] flex-shrink-0 flex items-center justify-between border-b border-white/10 bg-zinc-950 px-3">
        <div className="flex items-center gap-2">
          <Cpu size={12} className="text-emerald-500 animate-pulse" />
          <h1 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/90">
            EMERALD_<span className="text-emerald-500">DT</span>
          </h1>
          <div className="h-3 w-[1px] bg-white/10 mx-1" />
          <span className="text-[7px] font-mono text-zinc-500 tracking-tighter">L5_CORE_v2.6</span>
        </div>

        <div className="flex items-center h-full">
          <div className="flex items-center gap-2 px-3 border-l border-white/5 h-full bg-emerald-500/[0.02]">
            <span className="text-[7px] font-mono text-emerald-500/70 uppercase tracking-widest">SHIELD_ACTIVE</span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
          </div>
          <button 
            onClick={() => manualSync()}
            className="h-full px-3 hover:bg-white/5 border-l border-white/5 transition-colors group"
          >
            <Activity size={12} className="text-zinc-500 group-hover:text-emerald-400" />
          </button>
        </div>
      </header>

      {/* 2. STATS BAR: Integración directa sin márgenes */}
      <section className="flex-shrink-0 border-b border-white/5 bg-zinc-900/20">
        <StatsPanel />
      </section>

      {/* 3. MAIN WORKSPACE: Grid sin gaps innecesarios */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1fr_240px]">
        
        {/* TILE 1: Inventario */}
        <main className="flex flex-col border-r border-white/10 bg-zinc-950/30 overflow-hidden">
          <div className="h-[30px] flex-shrink-0 flex items-center justify-between px-3 border-b border-white/5 bg-white/[0.01]">
            <div className="flex items-center gap-2 text-zinc-400">
              <Layers size={10} />
              <span className="text-[8px] font-black uppercase tracking-widest">ASSET_STREAM</span>
            </div>
            
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-600" size={10} />
              <input 
                type="text"
                placeholder="FILTER..."
                className="bg-transparent border-l border-white/10 text-[9px] pl-7 pr-2 h-[30px] w-32 focus:w-48 focus:bg-white/[0.02] outline-none transition-all uppercase font-mono text-emerald-500"
              />
            </div>
          </div>

          {/* Área de scroll interno estricta */}
          <div className="flex-1 overflow-y-auto p-1.5 custom-scrollbar grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-1 content-start">
             {/* Mock de Cards para test de espacio */}
             {Array.from({length: 12}).map((_, i) => (
               <div key={i} className="h-24 border border-white/5 bg-white/[0.02] rounded-sm p-2 flex flex-col justify-between">
                 <div className="h-1 w-8 bg-emerald-500/30 rounded-full" />
                 <div className="space-y-1">
                   <div className="h-2 w-full bg-white/5 rounded" />
                   <div className="h-2 w-2/3 bg-white/5 rounded" />
                 </div>
               </div>
             ))}
          </div>
        </main>

        {/* TILE 2: Sidebar (Sin desperdicio lateral) */}
        <aside className="hidden lg:flex flex-col bg-black overflow-hidden">
          
          {/* Operator Actions - Ultra Compact */}
          <div className="p-2 border-b border-white/10">
            <button className="w-full h-8 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-[9px] uppercase tracking-widest transition-all">
              <UserPlus size={12} /> NEW_ASSET
            </button>
          </div>

          {/* Terminal - Altura máxima calculada */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="h-[24px] flex-shrink-0 px-2 border-b border-white/10 flex items-center gap-2 bg-zinc-900/50">
              <Terminal size={10} className="text-zinc-500" />
              <span className="text-[8px] text-zinc-400 font-bold uppercase tracking-widest">LIVE_LOGS</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2 font-mono text-[7px] space-y-1 custom-scrollbar bg-black/80">
              <div className="text-zinc-600 uppercase tracking-tighter flex gap-1">
                <span className="text-emerald-500/50">[OK]</span> 
                <span>Kernel_Ready</span>
              </div>
              <div className="text-zinc-600 uppercase tracking-tighter flex gap-1">
                <span className="text-blue-500/50">[INF]</span> 
                <span>Nodes_Synced</span>
              </div>
              <div className="pt-2 text-emerald-400/40 animate-pulse">
                _Awaiting_instruction...
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* 4. FOOTER: Barra de estado mínima de 18px */}
      <footer className="h-[18px] flex-shrink-0 flex items-center justify-between px-3 text-[7px] font-mono text-zinc-600 border-t border-white/10 bg-zinc-950">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><div className="w-1 h-1 bg-emerald-500 rounded-full"/> CLUSTER: 01</span>
          <span>LATENCY: 12ms</span>
        </div>
        <div className="tracking-[0.2em] opacity-50">NIETO_LAB_SYS_2026</div>
      </footer>

    </div>
  );
}