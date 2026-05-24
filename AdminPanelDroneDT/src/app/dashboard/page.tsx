'use client';

import React, { useState, useMemo } from 'react';
import { Search, Activity, Terminal, Layers, Cpu, WifiOff, Plus } from 'lucide-react';
import { StatsPanel } from '@/components/dashboard/StatsPanel';
import { InventoryCard } from '@/components/dashboard/InventoryCard';
import { DroneSkeleton } from '@/components/dashboard/DroneSkeleton';
import { ErrorShield } from '@/components/dashboard/ErrorShield';
import { useRealTimeInventory } from '@/hooks/useRealTimeInventory';
import { useInventoryStore } from '@/store/useInventoryStore';

/**
 * PAGE: DashboardL5
 * Optimización: High-Performance Desktop (Hasta 1900px)
 * Fix: Unique Key Prop para Skeletons y Listas
 * Proyecto: Drone DT
 */
export default function DashboardL5() {
  const products = useInventoryStore((state) => state.products);
  const loading = useInventoryStore((state) => state.isLoading);
  const error = useInventoryStore((state) => state.error);
  
  const { manualSync, isRetrying, status } = useRealTimeInventory(15000);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDrones = useMemo(() => {
    return products.filter(p => 
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p._id?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col overflow-hidden font-mono selection:bg-emerald-500/30">
      
      {/* 1. BARRA DE CONTROL SUPERIOR (HUD) */}
      <div className="h-[30px] lg:h-[40px] flex-shrink-0 flex items-center justify-between bg-zinc-950 border-b border-white/10 px-3 lg:px-6">
        <div className="flex items-center gap-2 lg:gap-4 cursor-pointer hover:opacity-80 transition-opacity">
          <Cpu className="w-3 h-3 lg:w-5 lg:h-5 text-emerald-500" />
          <h1 className="text-[11px] lg:text-[14px] font-black tracking-tighter leading-none text-white uppercase">
            DRONE_<span className="text-emerald-500">DT</span>
          </h1>
          <span className="hidden sm:inline text-[8px] lg:text-[10px] text-zinc-600 uppercase border-l border-white/10 pl-2 lg:pl-4 ml-1 italic tracking-[0.2em]">
            Escudo_Aéreo_Nieto_Lab
          </span>
        </div>
        
        <div className="flex items-center h-full">
          <button 
            onClick={() => manualSync()} 
            disabled={loading}
            className={`h-full px-4 lg:px-8 border-l border-white/5 transition-all group flex items-center gap-2 lg:gap-4 ${loading ? 'opacity-50' : 'hover:bg-emerald-500/10'}`}
          >
            <span className="text-[8px] lg:text-[11px] text-zinc-500 group-hover:text-emerald-400 hidden sm:inline uppercase font-black tracking-widest">Resync_Uplink</span>
            <Activity className={`${loading ? 'animate-spin text-emerald-500' : 'text-zinc-500 group-hover:text-emerald-500'} w-3 h-3 lg:w-4 lg:h-4`} />
          </button>
          
          <div className="h-full px-3 lg:px-6 border-l border-white/5 flex items-center bg-emerald-500/[0.03]">
            <div className={`w-1.5 h-1.5 lg:w-3 lg:h-3 rounded-full transition-all duration-500 ${error ? 'bg-red-600 shadow-[0_0_12px_red]' : 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]'}`} />
          </div>
        </div>
      </div>

      {/* 2. PANEL DE ESTADÍSTICAS */}
      <div className="flex-shrink-0 border-b border-white/10 bg-black">
        <StatsPanel />
      </div>

      {/* 3. NÚCLEO DEL ESPACIO DE TRABAJO */}
      <div className="flex-1 min-h-0 flex overflow-hidden">
        
        {/* COLUMNA CENTRAL: GRID DE LA FLOTA */}
        <div className="flex-1 min-w-0 flex flex-col border-r border-white/10">
          <div className="h-[32px] lg:h-[48px] flex-shrink-0 flex items-center justify-between px-3 lg:px-6 bg-zinc-900/40 border-b border-white/5">
            <div className="flex items-center gap-2 lg:gap-4">
              <Layers className="text-emerald-500/50 w-3 h-3 lg:w-5 lg:h-5" />
              <span className="text-[9px] lg:text-[12px] font-black uppercase tracking-[0.3em] text-zinc-400">Transmisión_de_Inventario</span>
              {loading && <span className="text-[7px] lg:text-[10px] text-emerald-500 animate-pulse ml-2 font-bold italic">_SCANNING_HANGAR_01</span>}
            </div>
            
            <div className="flex items-center h-full bg-black/40 px-3 lg:px-6 border-l border-white/5 group focus-within:bg-black/80 transition-all">
              <Search className="text-zinc-600 group-focus-within:text-emerald-500 w-3 h-3 lg:w-4 lg:h-4" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="BUSCAR_UNIDAD_ID" 
                className="bg-transparent text-[9px] lg:text-[12px] outline-none w-24 sm:w-48 lg:w-64 ml-3 text-emerald-400 uppercase placeholder:text-zinc-800 font-bold" 
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 lg:p-8 custom-scrollbar bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-900/20 via-black to-black">
            
            {error && products.length === 0 ? (
              <div className="h-full flex items-center justify-center p-10">
                <ErrorShield message="ENLACE_CON_CLUSTER_CAÍDO" retry={manualSync} />
              </div>
            ) : (
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 lg:gap-8">
                {loading && products.length === 0 ? (
                  /* CORRECCIÓN 1: Clave única para Skeletons basada en el index */
                  Array.from({length: 8}).map((_, i) => (
                    <DroneSkeleton key={`drone-loading-slot-${i}`} />
                  ))
                ) : (
                  /* CORRECCIÓN 2: Uso de item._id como clave única */
                  filteredDrones.map((item) => (
                    <InventoryCard key={item._id || item.id} product={item} />
                  ))
                )}
              </div>
    
        </div>
              </div>
            </div>
          </div>

        </aside>
      </div>

      {/* 4. FOOTER INDUSTRIAL */}

        </div>
      </footer>
    </div>
  );
}