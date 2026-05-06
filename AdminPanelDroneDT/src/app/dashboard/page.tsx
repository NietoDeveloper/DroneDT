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
            
            <div className="flex items-center h-full bg-black/40 px-2 border-l border-white/5 group transition-colors hover:bg-black/60">
              <Search size={10} className="text-zinc-600 group-focus-within:text-emerald-500" />
              <input 
                type="text" 
                placeholder="SKU_SEARCH" 
                className="bg-transparent text-[9px] outline-none w-20 sm:w-32 ml-2 text-emerald-500 uppercase placeholder:text-zinc-800 cursor-text" 
              />
            </div>
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
                  <div className="flex justify-between items-center">
                    <div className="w-1 h-3 bg-zinc-800 group-hover:bg-emerald-500 transition-colors" />
                    <span className="text-[8px] text-zinc-600 font-bold group-hover:text-zinc-300">#{1024 + i}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-[7px] text-zinc-800 uppercase font-black group-hover:text-emerald-500/40">Active</span>
                    <div className="w-1 h-1 rounded-full bg-zinc-800 group-hover:bg-emerald-500 shadow-emerald-500/50 group-hover:shadow-[0_0_4px]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LADO DERECHO: SIDEBAR */}
        <aside className="hidden lg:flex w-[180px] flex-shrink-0 flex-col bg-black">
          {/* BOTÓN ACCIÓN REAL */}
          <button className="h-[44px] w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black text-[10px] uppercase tracking-tighter transition-all active:scale-[0.98] cursor-pointer">
            + NEW_UNIT_ASSET
          </button>

          {/* SECCIÓN LOGS (Sección Real) */}
          <div className="flex-1 flex flex-col min-h-0 border-t border-white/10">
            <div className="h-[22px] px-2 flex items-center gap-2 bg-zinc-950 border-b border-white/5 cursor-default">
              <Terminal size={10} className="text-emerald-500" />
              <span className="text-[8px] text-zinc-400 font-bold tracking-widest">SYSTEM_LOG</span>
            </div>
            <div className="flex-1 overflow-hidden p-2 font-mono text-[8px] text-zinc-600 leading-relaxed">
              <p className="hover:text-zinc-300 cursor-crosshair transition-colors truncate"><span className="text-emerald-900 mr-1">»</span> KERNEL_LIVE</p>
              <p className="hover:text-zinc-300 cursor-crosshair transition-colors truncate"><span className="text-emerald-900 mr-1">»</span> SHIELD_ACTIVE</p>
              <div className="mt-2 animate-pulse text-emerald-500/30 text-[7px] font-black">_LISTENING_MODE</div>
            </div>
          </div>

          {/* ESPACIO VACÍO PARA FUTURAS SECCIONES */}
          <div className="h-24 border-t border-white/5 bg-zinc-950/20">
            {/* Futura sección de control de drones o telemetría */}
          </div>
        </aside>
      </div>

      {/* 4. ATOMIC FOOTER (14px) */}
      <footer className="h-[14px] flex-shrink-0 flex items-center justify-between px-2 bg-zinc-950 border-t border-white/10">
        <div className="flex gap-4 text-[7px] text-zinc-700 font-bold uppercase cursor-default">
          <span className="hover:text-emerald-500 transition-colors">NODE: BOG_CENTER</span>
          <span className="hidden sm:inline hover:text-emerald-500 transition-colors">TEMP: 21°C</span>
        </div>
        <div className="text-[7px] text-zinc-800 tracking-[0.2em] font-black hover:text-zinc-600 cursor-help transition-colors">
          NIETO_LAB_CORE_2026
        </div>
      </footer>

    </div>
  );
}