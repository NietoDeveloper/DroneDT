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
      
      {/* 1. BARRA DE CONTROL SUPERIOR (HUD) - Escalada en Desktop */}
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

      {/* 2. PANEL DE ESTADÍSTICAS (Ya ajustado para ser imponente) */}
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

          {/* ÁREA DE RENDERIZADO - Grid Reducido para que cada unidad crezca */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 lg:p-8 custom-scrollbar bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-900/20 via-black to-black">
            
            {error && products.length === 0 ? (
              <div className="h-full flex items-center justify-center p-10">
                <ErrorShield message="ENLACE_CON_CLUSTER_CAÍDO" retry={manualSync} />
              </div>
            ) : (
              // GRID AJUSTADO: lg:3 y xl:4 para que las tarjetas sean grandes a 1900px
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 lg:gap-8">
                {loading && products.length === 0 ? (
                  Array.from({length: 8}).map((_, i) => <DroneSkeleton key={i} />)
                ) : (
                  filteredDrones.map((item) => (
                    <InventoryCard key={item._id} product={item} />
                  ))
                )}

                {!loading && filteredDrones.length === 0 && (
                  <div className="col-span-full py-48 text-center opacity-20">
                    <span className="text-[14px] lg:text-[20px] font-black uppercase tracking-[0.8em] block">Radar_Limpio</span>
                    <span className="text-[10px] lg:text-[12px] mt-4 block">No se detectan unidades con esos parámetros</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* COLUMNA DERECHA: PANEL DE CONTROL (Escalado de w-200 a w-350 en XL) */}
        <aside className="hidden lg:flex lg:w-[250px] xl:w-[350px] flex-shrink-0 flex-col bg-black">
          <button className="h-[60px] lg:h-[80px] w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black text-[11px] lg:text-[14px] uppercase tracking-[0.3em] transition-all active:scale-[0.98] flex items-center justify-center gap-3">
            <Plus className="w-4 h-4 lg:w-6 lg:h-6" strokeWidth={4} />
            REGISTRAR_DRONE
          </button>

          <div className="flex-1 flex flex-col min-h-0 border-t border-white/10">
            <div className="h-[30px] lg:h-[45px] px-4 flex items-center gap-2 bg-zinc-950 border-b border-white/5">
              <Terminal className="text-emerald-500 w-3 h-3 lg:w-4 lg:h-4" />
              <span className="text-[9px] lg:text-[11px] text-zinc-400 font-black tracking-widest uppercase">Logs_de_Sistema</span>
            </div>
            <div className="flex-1 overflow-hidden p-4 lg:p-6 font-mono text-[9px] lg:text-[12px] text-zinc-600 leading-relaxed bg-black/50 uppercase">
              <div className="space-y-2 lg:space-y-4">
                <p className="truncate text-emerald-500/80"><span className="text-emerald-800">»</span> STATUS: {status}</p>
                <p className="truncate"><span className="text-zinc-800">»</span> {loading ? 'SCAN_SEQUENCE_ACTIVE' : 'SYSTEM_READY'}</p>
                <p className="truncate"><span className="text-zinc-800">»</span> ARCH: NIETO_L5_SECURE</p>
                {isRetrying && <p className="text-red-500 animate-pulse truncate"><span className="mr-1">!</span> UPLINK_RETRY_0x{products.length}</p>}
              </div>
              
              <div className="mt-12 p-4 border border-white/5 bg-zinc-950/50 rounded-lg">
                <div className="text-[8px] lg:text-[10px] text-zinc-500 mb-2 font-black tracking-tighter">DATA_STREAM_LOAD:</div>
                <div className="w-full h-1.5 lg:h-3 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                   <div className={`h-full bg-emerald-500 transition-all duration-1000 ${loading ? 'w-[85%]' : 'w-[15%]'}`} />
                </div>
              </div>
            </div>
          </div>

          <div className="h-32 lg:h-48 border-t border-white/5 bg-zinc-950/20 p-6 flex flex-col justify-center items-center opacity-20">
             <WifiOff size={24} className="text-zinc-700 mb-3" />
             <span className="text-[8px] lg:text-[11px] text-zinc-800 uppercase font-black tracking-[0.4em] text-center">Nieto_Laboratory<br/>Secret_Project_DT</span>
          </div>
        </aside>
      </div>

      {/* 4. FOOTER INDUSTRIAL (Aumentado) */}
      <footer className="h-[24px] lg:h-[32px] flex-shrink-0 flex items-center justify-between px-6 bg-zinc-950 border-t border-white/10">
        <div className="flex gap-6 text-[8px] lg:text-[10px] text-zinc-700 font-black uppercase tracking-tighter">
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-zinc-800 rounded-full" /> CLUSTER: RAILWAY_L5</span>
          <span className="hidden md:inline text-emerald-900/60">NODE: BOGOTÁ_SOUTH_PRIMARY</span>
        </div>
        <div className="text-[8px] lg:text-[11px] text-zinc-800 tracking-[0.5em] font-black uppercase">
          Nieto_Code // Drone_DT_Industrial // 2026
        </div>
      </footer>
    </div>
  );
}