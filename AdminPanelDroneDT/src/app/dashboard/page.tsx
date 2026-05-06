"use client";

import React, { useState } from 'react';
import { 
  UserPlus, 
  Search, 
  Activity,
  Terminal,
  Layers,
  Cpu
} from 'lucide-react';

import { StatsPanel } from '@/components/dashboard/StatsPanel';
import { InventoryCard } from '@/components/dashboard/InventoryCard';
import { useRealTimeInventory } from '@/hooks/useRealTimeInventory';

export default function DashboardL5() {
  const { manualSync } = useRealTimeInventory(30000);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    // H-SCREEN + OVERFLOW-HIDDEN: Garantiza cero scroll global
    <div className="h-screen w-full bg-black text-white p-1.5 flex flex-col gap-1.5 overflow-hidden font-sans selection:bg-emerald-500/30">
      
      {/* 1. TOP NAV: Compacto y ultra-denso */}
      <header className="h-[40px] flex-shrink-0 flex items-center justify-between border border-white/10 bg-zinc-950/80 px-3 rounded-t-sm">
        <div className="flex items-center gap-3">
          <Cpu size={14} className="text-emerald-500 animate-pulse" />
          <div className="flex items-baseline gap-2">
            <h1 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/90">
              EMERALD_<span className="text-emerald-500">DT</span>
            </h1>
            <span className="text-[8px] font-mono text-zinc-500 tracking-tighter">v.2026.L5_CORE</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border-x border-white/5 px-4 h-[40px]">
            <span className="text-[8px] font-mono text-emerald-500/70 uppercase tracking-widest">SHIELD_ACTIVE</span>
            <div className="w-2 h-2 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-emerald-500" />
            </div>
          </div>
          <button 
            onClick={() => manualSync()}
            className="hover:bg-white/5 p-1.5 transition-colors group"
          >
            <Activity size={14} className="text-zinc-500 group-hover:text-emerald-400" />
          </button>
        </div>
      </header>

      {/* 2. STATS BAR: Padding reducido para ganar espacio vertical */}
      <section className="flex-shrink-0 px-0.5">
        <StatsPanel />
      </section>

      {/* 3. MAIN WORKSPACE: Ajuste de Grid para eliminar espacios laterales */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-1.5">
        
        {/* TILE 1: Inventario (Ocupa el máximo posible) */}
        <main className="flex flex-col border border-white/10 bg-zinc-950/30 rounded-sm overflow-hidden">
          <div className="h-[34px] flex-shrink-0 flex items-center justify-between px-3 border-b border-white/5 bg-white/[0.01]">
            <div className="flex items-center gap-2">
              <Layers size={12} className="text-emerald-500/70" />
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">ASSET_STREAM</span>
            </div>
            
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-600" size={10} />
              <input 
                type="text"
                placeholder="SKU_SEARCH..."
                className="bg-black/50 border border-white/10 text-[9px] pl-7 pr-2 py-1 w-40 focus:w-56 focus:border-emerald-500/50 outline-none transition-all uppercase font-mono text-emerald-500"
              />
            </div>
          </div>

          {/* Grid de contenido con scroll interno únicamente */}
          <div className="flex-1 overflow-y-auto p-2 custom-scrollbar grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-1.5 content-start">
            {/* Aquí irían las InventoryCards mapeadas */}
            <div className="border border-dashed border-white/5 h-32 flex items-center justify-center col-span-full">
               <span className="text-[8px] font-mono text-zinc-700 animate-pulse uppercase tracking-[0.4em]">Listening_for_incoming_assets...</span>
            </div>
          </div>
        </main>

        {/* TILE 2: Sidebar ultra-compacto */}
        <aside className="hidden lg:flex flex-col gap-1.5 overflow-hidden">
          
          {/* Operator Actions - Altura mínima */}
          <div className="bg-emerald-500/[0.02] border border-emerald-500/10 p-2.5 rounded-sm">
            <button className="w-full flex items-center justify-between p-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-500 font-bold text-[9px] uppercase tracking-widest transition-all group">
              <span className="flex items-center gap-2"><UserPlus size={12} /> ADD_UNIT</span>
              <span className="text-[7px] opacity-50 group-hover:opacity-100">CMD+N</span>
            </button>
          </div>

          {/* Terminal Contextual - Maximiza el espacio vertical restante */}
          <div className="flex-1 flex flex-col bg-black border border-white/10 rounded-sm overflow-hidden">
            <div className="h-[28px] flex-shrink-0 px-2 border-b border-white/10 flex items-center gap-2 bg-zinc-900/50">
              <Terminal size={10} className="text-emerald-500" />
              <span className="text-[8px] text-zinc-400 font-black uppercase tracking-widest">Live_Terminal</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2 font-mono text-[8px] space-y-1.5 custom-scrollbar bg-[rgba(0,5,0,0.4)]">
              <div className="flex gap-2 text-zinc-600">
                <span>08:42:10</span>
                <span className="text-emerald-500/50">SYS_AUTH:</span>
                <span className="text-zinc-400 italic">M. Nieto Authorized</span>
              </div>
              <div className="flex gap-2 text-zinc-600">
                <span>08:42:15</span>
                <span className="text-blue-500/50">CLUSTER:</span>
                <span className="text-zinc-400 italic">AWS_Node_Active</span>
              </div>
              <div className="h-[1px] w-full bg-white/5 my-1" />
              <div className="text-emerald-400/80 leading-relaxed">
                {">"} ENCRYPTION_LAYER_5_ENABLED... <br/>
                {">"} READY_FOR_SYNC_CYCLES...
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* 4. FOOTER: Reducido a 20px para no quitar espacio útil */}
      <footer className="h-[20px] flex-shrink-0 flex items-center justify-between px-2 text-[7px] font-mono text-zinc-700 border-t border-white/5 bg-zinc-950/50">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1"><div className="w-1 h-1 bg-emerald-500 rounded-full"/> BOG_EDGE_NODE</span>
          <span className="text-zinc-800">|</span>
          <span>LATENCY: 14MS</span>
        </div>
        <div className="tracking-[0.2em]">NIETO_LABORATORY_SYSTEMS_2026</div>
      </footer>

    </div>
  );
}