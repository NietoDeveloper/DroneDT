'use client';

import React from 'react';
import { Search, Activity, Terminal, Layers, Cpu, WifiOff } from 'lucide-react';
import { StatsPanel } from '@/components/dashboard/StatsPanel';
import { InventoryCard } from '@/components/dashboard/InventoryCard'; // Usamos tu componente traducido
import { DroneSkeleton } from '@/components/dashboard/DroneSkeleton';
import { ErrorShield } from '@/components/dashboard/ErrorShield';
import { useRealTimeInventory } from '@/hooks/useRealTimeInventory';
import { useInventoryStore } from '@/store/useInventoryStore';

export default function DashboardL5() {
  // 1. Hooks de datos y sincronización
  const { products, loading, error } = useInventoryStore();
  const { manualSync, isRetrying } = useRealTimeInventory(15000); // Sincronización cada 15s

  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col overflow-hidden font-mono selection:bg-emerald-500/30">
      
      {/* 1. BARRA DE CONTROL SUPERIOR (20px) */}
      <div className="h-[20px] flex-shrink-0 flex items-center justify-between bg-zinc-950 border-b border-white/10 px-2">
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <Cpu size={10} className="text-emerald-500" />
          <h1 className="text-[10px] font-black tracking-tighter leading-none text-white uppercase">
            EMERALD_<span className="text-emerald-500">DT</span>
          </h1>
          <span className="hidden sm:inline text-[7px] text-zinc-600 uppercase border-l border-white/10 pl-2 ml-1 italic">
            Nieto_Laboratory_S+
          </span>
        </div>
        
        <div className="flex items-center h-full">
           <button 
             onClick={() => manualSync()} 
             disabled={loading}
             className={`h-full px-3 border-l border-white/5 transition-all group cursor-pointer ${loading ? 'opacity-50' : 'hover:bg-emerald-500/10'}`}
           >
             <Activity size={10} className={`${loading ? 'animate-spin text-emerald-500' : 'text-zinc-500 group-hover:text-emerald-500'}`} />
           </button>
           <div className="h-full px-2 border-l border-white/5 flex items-center bg-emerald-500/[0.03]">
             <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${error ? 'bg-red-600 shadow-[0_0_8px_red]' : 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.6)]'}`} />
           </div>
        </div>
      </div>

      {/* 2. PANEL DE ESTADÍSTICAS (StatsPanel ya traducido) */}
      <div className="flex-shrink-0 border-b border-white/10 bg-black">
        <StatsPanel />
      </div>

      {/* 3. ÁREA DE TRABAJO PRINCIPAL */}
      <div className="flex-1 min-h-0 flex overflow-hidden">
        
        {/* LADO IZQUIERDO: FLUJO DE ACTIVOS */}
        <div className="flex-1 min-w-0 flex flex-col border-r border-white/10">
          <div className="h-[24px] flex-shrink-0 flex items-center justify-between px-2 bg-zinc-900/40 border-b border-white/5">
            <div className="flex items-center gap-2">
              <Layers size={10} className="text-emerald-500/50" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">FLUJO_DE_TELEMETRÍA</span>
              {loading && <span className="text-[7px] text-emerald-500 animate-pulse ml-2">SINCRONIZANDO...</span>}
            </div>
            
            <div className="flex items-center h-full bg-black/40 px-2 border-l border-white/5 group transition-colors focus-within:bg-black/80">
              <Search size={10} className="text-zinc-600 group-focus-within:text-emerald-500" />
              <input 
                type="text" 
                placeholder="BUSCAR_POR_SKU" 
                className="bg-transparent text-[9px] outline-none w-20 sm:w-32 ml-2 text-emerald-500 uppercase placeholder:text-zinc-800" 
              />
            </div>
          </div>

          {/* GRID DE INVENTARIO */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-1 custom-scrollbar bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-950 via-black to-black">
            
            {error && products.length === 0 ? (
              <ErrorShield message="Error de enlace con el servidor" retry={manualSync} />
            ) : (
              <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-1">
                
                {/* CARGA INICIAL */}
                {loading && products.length === 0 && (
                  Array.from({length: 40}).map((_, i) => <DroneSkeleton key={i} />)
                )}

                {/* PRODUCTOS REALES */}
                {products.map((product: any) => (
                  <InventoryCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* LADO DERECHO: PANEL DE CONTROL LATERAL */}
        <aside className="hidden lg:flex w-[180px] flex-shrink-0 flex-col bg-black">
          <button className="h-[44px] w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black text-[10px] uppercase tracking-tighter transition-all active:scale-[0.98]">
            + REGISTRAR_NUEVA_UNIDAD
          </button>

          {/* REGISTRO DE SISTEMA (LOGS) */}
          <div className="flex-1 flex flex-col min-h-0 border-t border-white/10">
            <div className="h-[22px] px-2 flex items-center gap-2 bg-zinc-950 border-b border-white/5">
              <Terminal size={10} className="text-emerald-500" />
              <span className="text-[8px] text-zinc-400 font-bold tracking-widest uppercase">REGISTROS_DE_ENLACE</span>
            </div>
            <div className="flex-1 overflow-hidden p-2 font-mono text-[8px] text-zinc-600 leading-relaxed bg-black/50">
              <p className="truncate"><span className="text-emerald-900 mr-1">»</span> {loading ? 'BUSCANDO_NODOS...' : 'SISTEMA_SINCRONIZADO'}</p>
              <p className="truncate"><span className="text-emerald-900 mr-1">»</span> {error ? 'AVISO: ENLACE_DEGRADADO' : 'CONEXIÓN: ESTABLE'}</p>
              {isRetrying && <p className="text-amber-600 animate-pulse truncate"><span className="mr-1">!</span> REINTENTANDO_CLUSTER_01...</p>}
              <div className="mt-2 text-emerald-500/20 text-[7px] font-black uppercase">Escuchando_Puerto_0x33A</div>
            </div>
          </div>

          <div className="h-24 border-t border-white/5 bg-zinc-950/20 p-2 flex flex-col justify-center items-center opacity-30 italic">
             <WifiOff size={16} className="text-zinc-800 mb-1" />
             <span className="text-[7px] text-zinc-800 uppercase font-black tracking-tighter text-center">Protocolo_de_Seguridad_Activo</span>
          </div>
        </aside>
      </div>

      {/* 4. PIE DE PÁGINA ATÓMICO */}
      <footer className="h-[14px] flex-shrink-0 flex items-center justify-between px-2 bg-zinc-950 border-t border-white/10 text-[7px] font-bold uppercase tracking-widest">
        <div className="flex gap-4 text-zinc-700">
          <span>NODO: BOG_CENTRO_01</span>
          <span className="hidden sm:inline">SAT_COM: ACTIVA</span>
          <span className={`hidden sm:inline ${error ? 'text-red-900' : 'text-emerald-900'}`}>
            {error ? 'UPLINK_DESCONECTADO' : 'UPLINK_EN_LÍNEA'}
          </span>
        </div>
        <div className="text-zinc-800 tracking-[0.2em]">
          Nieto_Laboratory // Sistema_de_Control_EDT
        </div>
      </footer>

    </div>
  );
}