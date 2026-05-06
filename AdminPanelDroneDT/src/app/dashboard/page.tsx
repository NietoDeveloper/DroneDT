"use client";

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  UserMinus, 
  UserPlus, 
  ShieldAlert, 
  Search, 
  Activity,
  Terminal,
  Layers
} from 'lucide-react';

// Componentes L5 del Laboratorio
import { StatsPanel } from '@/components/dashboard/StatsPanel';
import { InventoryCard } from '@/components/dashboard/InventoryCard';
import { useRealTimeInventory } from '@/hooks/useRealTimeInventory';

export default function DashboardL5() {
  const { manualSync } = useRealTimeInventory(30000); // Sincronización activa
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="h-screen w-full bg-black text-white p-3 flex flex-col gap-3 overflow-hidden font-sans selection:bg-emerald-500/30">
      
      {/* 1. TOP NAV: Telemetría y Estatus Global */}
      <header className="h-[60px] flex-shrink-0 flex items-center justify-between border border-white/10 bg-zinc-950/50 px-4 rounded-sm">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <h1 className="text-[12px] font-black uppercase tracking-[0.3em] text-white">
              Emerald_<span className="text-emerald-500">DT</span> / <span className="text-zinc-500">L5_Core</span>
            </h1>
            <div className="flex items-center gap-2 text-[8px] font-mono text-zinc-500 uppercase">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Cluster_Status: Nominal
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Protocol_Security</span>
            <span className="text-[10px] font-bold text-emerald-400">MAX_SHIELD_ACTIVE</span>
          </div>
          <button 
            onClick={() => manualSync()}
            className="p-2 border border-white/10 hover:border-emerald-500/50 transition-all group"
          >
            <Activity size={16} className="text-zinc-400 group-hover:text-emerald-400" />
          </button>
        </div>
      </header>

      {/* 2. STATS BAR: KPIs en tiempo real */}
      <section className="flex-shrink-0">
        <StatsPanel />
      </section>

      {/* 3. MAIN WORKSPACE: Grid de Datos y Terminal */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-3">
        
        {/* TILE 1: Inventario Inteligente (60% - 70%) */}
        <main className="flex flex-col border border-white/10 bg-zinc-950/30 rounded-sm overflow-hidden">
          <div className="p-3 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <Layers size={14} className="text-emerald-500" />
              <span className="text-[10px] font-black uppercase tracking-widest">Asset_Registry</span>
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-500" size={10} />
              <input 
                type="text"
                placeholder="BUSCAR_SKU..."
                className="bg-black border border-white/10 text-[9px] pl-7 pr-3 py-1.5 w-48 focus:border-emerald-500/50 outline-none transition-all uppercase font-mono"
              />
            </div>
          </div>

          {/* Scroll interno solo para esta sección */}
          <div className="flex-1 overflow-y-auto p-3 custom-scrollbar grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 content-start">
            {/* Aquí se mapean las InventoryCards */}
            <p className="text-[10px] font-mono text-zinc-600 col-span-full text-center py-20">
              -- AGUARDANDO_STREAM_DE_DATOS_L5 --
            </p>
          </div>
        </main>

        {/* TILE 2 & 3: Security Logs & Quick Actions (Lateral) */}
        <aside className="hidden lg:flex flex-col gap-3 overflow-hidden">
          
          {/* Quick Actions Panel */}
          <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-sm">
            <h3 className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-3">Operator_Commands</h3>
            <button className="w-full flex items-center justify-between p-2.5 bg-emerald-600 hover:bg-emerald-500 text-black font-black text-[10px] uppercase tracking-tighter transition-all">
              <span className="flex items-center gap-2"><UserPlus size={14} /> New_Asset</span>
              <span className="text-[8px] bg-black/10 px-1">F1</span>
            </button>
          </div>

          {/* Terminal / Audit Logs */}
          <div className="flex-1 flex flex-col bg-black border border-white/10 rounded-sm overflow-hidden font-mono">
            <div className="p-2 border-b border-white/10 flex items-center gap-2 bg-white/[0.03]">
              <Terminal size={12} className="text-zinc-500" />
              <span className="text-[9px] text-zinc-400 uppercase tracking-widest font-bold">System_Log</span>
            </div>
            <div className="flex-1 overflow-y-auto p-3 text-[9px] space-y-2 leading-relaxed custom-scrollbar">
              <div className="text-zinc-500"><span className="text-emerald-500/50">[03:32:01]</span> DB_SYNC: OK</div>
              <div className="text-zinc-500"><span className="text-emerald-500/50">[03:32:10]</span> CLUSTER_NODE_A: CONNECTED</div>
              <div className="text-white/80 border-l border-emerald-500/30 pl-2 bg-emerald-500/5 py-1">
                L5_SHIELD: Encryption_Verified
              </div>
              <div className="text-zinc-600 italic animate-pulse">_Listening_for_events...</div>
            </div>
          </div>
        </aside>
      </div>

      {/* 4. FOOTER: Status de Red y Versión */}
      <footer className="h-[24px] flex-shrink-0 flex items-center justify-between px-2 text-[8px] font-mono text-zinc-600 border-t border-white/5 uppercase">
        <div className="flex items-center gap-4">
          <span>Env: Production</span>
          <span>Region: Colombia_BOG</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-emerald-500" />
          </div>
          <span>Nieto_Laboratory © 2026_V1.0</span>
        </div>
      </footer>

    </div>
  );
}