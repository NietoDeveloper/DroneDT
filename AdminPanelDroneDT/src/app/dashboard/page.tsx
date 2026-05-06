"use client";

import React from 'react';
import { UserPlus, Search, Activity, Terminal, Layers, Cpu } from 'lucide-react';
import { StatsPanel } from '@/components/dashboard/StatsPanel';
import { useRealTimeInventory } from '@/hooks/useRealTimeInventory';

export default function DashboardL5() {
  const { manualSync } = useRealTimeInventory(30000);

  return (
    /* 
      VIEWPORT LOCK: 
      - fixed inset-0 elimina cualquier posibilidad de scroll elástico o lateral.
    */
    <div className="fixed inset-0 bg-black text-white flex flex-col overflow-hidden font-mono selection:bg-emerald-500/30">
      
      {/* 1. ULTRA-SLIM CONTROL STRIP (Exactamente 20px) */}
      <div className="h-[20px] flex-shrink-0 flex items-center justify-between bg-zinc-950 border-b border-white/10 px-2">
        <div className="flex items-center gap-2">
          <Cpu size={9} className="text-emerald-500" />
          <h1 className="text-[8px] font-black tracking-[0.25em] leading-none text-white/80">
            EMERALD_<span className="text-emerald-500 font-bold">DT</span>
          </h1>
          <div className="h-2 w-[1px] bg-white/10 mx-1 hidden xs:block" />
          <span className="hidden sm:inline text-[6px] text-zinc-700 uppercase tracking-tighter">System_v2.6_Stable</span>
        </div>
        
        <div className="flex items-center h-full">
           <button 
             onClick={() => manualSync()} 
             className="h-full px-2 hover:bg-emerald-500/5 border-l border-white/5 transition-colors group"
           >
             <Activity size={9} className="text-zinc-600 group-hover:text-emerald-500 transition-colors" />
           </button>
           <div className="h-full px-2 border-l border-white/5 flex items-center bg-emerald-500/[0.02]">
             <div className="w-1 h-1 rounded-full bg-emerald-500/80 shadow-[0_0_3px_rgba(16,185,129,0.5)]" />
           </div>
        </div>
      </div>

      {/* 2. STATS (Integración plana sin márgenes) */}
      <div className="flex-shrink-0 border-b border-white/5 bg-black">
        <StatsPanel />
      </div>

      {/* 3. WORKSPACE CORE (Adaptive Grid System) */}
      <div className="flex-1 min-h-0 flex overflow-hidden">
        
        {/* MAIN DATA STREAM */}
        <div className="flex-1 min-w-0 flex flex-col border-r border-white/10">
          {/* Header de Stream (22px) */}
          <div className="h-[22px] flex-shrink-0 flex items-center justify-between px-2 bg-zinc-900/20 border-b border-white/5">
            <div className="flex items-center gap-1.5 opacity-40">
              <Layers size={8} />
              <span className="text-[7px] font-bold uppercase tracking-widest truncate">Asset_Monitor</span>
            </div>
            
            <div className="flex items-center h-full border-l border-white/5 bg-black/20">
              <Search size={8} className="text-zinc-700 mx-2" />
              <input 
                type="text" 
                placeholder="SKU_ID" 
                className="bg-transparent text-[8px] outline-none w-16 sm:w-28 transition-all text-emerald-500 uppercase placeholder:text-zinc-800" 
              />
            </div>
          </div>

          {/* DYNAMIC GRID: 2 cols en mobile -> 10 cols en 1900px */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-0.5 custom-scrollbar bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.02)_0%,transparent_100%)]">
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-0.5 content-start">
              {Array.from({length: 80}).map((_, i) => (
                <div key={i} className="h-14 border border-white/[0.03] bg-zinc-950/50 hover:bg-emerald-500/[0.03] hover:border-emerald-500/30 transition-all p-1.5 flex flex-col justify-between group cursor-crosshair relative overflow-hidden">
                  <div className="flex justify-between items-center z-10">
                    <div className="w-0.5 h-2 bg-zinc-800 group-hover:bg-emerald-500 transition-colors" />
                    <span className="text-[5px] text-zinc-700 font-mono group-hover:text-zinc-400">EM_{1024 + i}</span>
                  </div>
                  <div className="h-[1px] w-full bg-white/[0.02] z-10" />
                  <div className="flex justify-between items-end z-10">
                    <span className="text-[5px] text-zinc-800 uppercase font-bold group-hover:text-emerald-500/50">Stored</span>
                    <div className="w-1 h-1 rounded-full bg-zinc-900 group-hover:bg-emerald-500/50" />
                  </div>
                  {/* Background Detail */}
                  <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.05] pointer-events-none transition-opacity">
                    <div className="absolute right-0 bottom-0 text-[20px] font-black opacity-10 uppercase">DT</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SIDEBAR (Auto-colapso bajo 1024px) */}
        <aside className="hidden lg:flex w-[150px] flex-shrink-0 flex-col bg-black">
          <button className="h-[36px] w-full bg-emerald-600 hover:bg-emerald-500 text-black font-black text-[9px] uppercase tracking-tighter transition-all active:brightness-125 border-b border-black">
            + NEW_ASSET
          </button>

          <div className="flex-1 flex flex-col min-h-0">
            <div className="h-[18px] px-2 flex items-center gap-1.5 bg-zinc-950 border-b border-white/5">
              <Terminal size={8} className="text-zinc-600" />
              <span className="text-[6px] text-zinc-500 font-bold tracking-widest uppercase">Kernel_Log</span>
            </div>
            <div className="flex-1 overflow-hidden p-2 font-mono text-[6px] text-zinc-700 leading-none space-y-1.5">
              <p className="flex gap-1"><span className="text-emerald-900">01</span> SYN_ACK_OK</p>
              <p className="flex gap-1"><span className="text-emerald-900">02</span> MESH_STABLE</p>
              <p className="flex gap-1"><span className="text-emerald-900">03</span> ENCRYPT_L5</p>
              <div className="pt-1 text-emerald-500/20 animate-pulse font-bold tracking-widest uppercase">Monitoring...</div>
            </div>
          </div>
        </aside>
      </div>

      {/* 4. ATOMIC FOOTER (14px) */}
      <footer className="h-[14px] flex-shrink-0 flex items-center justify-between px-2 bg-zinc-950 border-t border-white/10 pointer-events-none">
        <div className="flex gap-3 text-[5px] text-zinc-800 font-black uppercase tracking-widest">
          <span className="flex items-center gap-1"><div className="w-0.5 h-0.5 bg-emerald-900"/> BOG_NODE_01</span>
          <span className="hidden sm:inline">21.04°C</span>
          <span className="hidden md:inline">LAT: 0.001ms</span>
        </div>
        <div className="text-[5px] text-zinc-800 font-black tracking-[0.3em]">
          NIETO_LAB_CORE_2026
        </div>
      </footer>

    </div>
  );
}