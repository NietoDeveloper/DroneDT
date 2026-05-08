"use client";

import React from 'react';
import { Search, Activity, Terminal, Layers, Cpu } from 'lucide-react';
import { StatsPanel } from '@/components/dashboard/StatsPanel';
import { useRealTimeInventory } from '@/hooks/useRealTimeInventory';

export default function DashboardL5() {
  const { manualSync } = useRealTimeInventory(30000);

  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col overflow-hidden font-mono selection:bg-emerald-500/30">
      
      {/* 1. CONTROL STRIP (20px) - Título más pequeño, letras legibles */}
      <div className="h-[20px] flex-shrink-0 flex items-center justify-between bg-zinc-950 border-b border-white/10 px-2">
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <Cpu size={10} className="text-emerald-500" />
          <h1 className="text-[10px] font-black tracking-tighter leading-none text-white">
            EMERALD_<span className="text-emerald-500">DT</span>
          </h1>
          <span className="hidden sm:inline text-[7px] text-zinc-600 uppercase border-l border-white/10 pl-2 ml-1">v2.6</span>
        </div>
        
        <div className="flex items-center h-full">
           <button 
             onClick={() => manualSync()} 
             className="h-full px-3 hover:bg-emerald-500/10 border-l border-white/5 transition-colors group cursor-pointer"
           >
             <Activity size={10} className="text-zinc-500 group-hover:text-emerald-500" />
           </button>
           <div className="h-full px-2 border-l border-white/5 flex items-center bg-emerald-500/[0.03] cursor-help">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.6)]" />
           </div>
        </div>
      </div>

      {/* 2. STATS PANEL (Sección Real) */}
      <div className="flex-shrink-0 border-b border-white/10 bg-black">
        <StatsPanel />
      </div>

      {/* 3. WORKSPACE CORE */}
      <div className="flex-1 min-h-0 flex overflow-hidden">
        
        {/* LADO IZQUIERDO: STREAM DE ACTIVOS */}
        <div className="flex-1 min-w-0 flex flex-col border-r border-white/10">
          <div className="h-[24px] flex-shrink-0 flex items-center justify-between px-2 bg-zinc-900/40 border-b border-white/5">
            <div className="flex items-center gap-2 cursor-default">
              <Layers size={10} className="text-emerald-500/50" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Asset_Stream</span>
            </div>
            


          {/* GRID DE INVENTARIO (Sección Real) */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-1 custom-scrollbar">
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-1">
              {/* Aquí se mapeará el inventario real */}
              {Array.from({length: 40}).map((_, i) => (
                <div 
                  key={i} 
                  className="h-16 border border-white/5 bg-zinc-950/50 hover:border-emerald-500/40 hover:bg-zinc-900 transition-all p-2 flex flex-col justify-between group cursor-pointer"
                >

              ))}
            </div>
          </div>
        </div>


      </div>



    </div>
  );
}