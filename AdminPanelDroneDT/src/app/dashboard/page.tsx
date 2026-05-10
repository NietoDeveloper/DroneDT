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
 * Nivel: L5 Architecture - Industrial Control Center
 * Proyecto: Drone DT
 * Propósito: Interfaz de comando para la flota de drones del Nieto Laboratory.
 */
export default function DashboardL5() {
  // 1. Hooks de estado global (Acceso atómico al store)
  const products = useInventoryStore((state) => state.products);
  const loading = useInventoryStore((state) => state.isLoading);
  const error = useInventoryStore((state) => state.error);
  
  // 2. Hook de sincronización en tiempo real (Heartbeat industrial cada 15s)
  const { manualSync, isRetrying, status } = useRealTimeInventory(15000);

  // 3. Estado local para filtrado operativo
  const [searchQuery, setSearchQuery] = useState('');

  // 4. Lógica de filtrado (Nombre o ID/SKU) con memoización
  const filteredDrones = useMemo(() => {
    return products.filter(p => 
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p._id?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col overflow-hidden font-mono selection:bg-emerald-500/30">
      
      {/* 1. BARRA DE CONTROL SUPERIOR (HUD) */}
      <div className="h-[24px] flex-shrink-0 flex items-center justify-between bg-zinc-950 border-b border-white/10 px-3">
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <Cpu size={12} className="text-emerald-500" />
          <h1 className="text-[11px] font-black tracking-tighter leading-none text-white uppercase">
            DRONE_<span className="text-emerald-500">DT</span>
          </h1>
          <span className="hidden sm:inline text-[8px] text-zinc-600 uppercase border-l border-white/10 pl-2 ml-1 italic tracking-widest">
            Escudo_Aéreo_Nieto_Lab
          </span>
        </div>
        
        <div className="flex items-center h-full">
          <button 
            onClick={() => manualSync()} 
            disabled={loading}
            title="Sincronizar Telemetría"
            className={`h-full px-4 border-l border-white/5 transition-all group flex items-center gap-2 ${loading ? 'opacity-50' : 'hover:bg-emerald-500/10'}`}
          >
            <span className="text-[8px] text-zinc-500 group-hover:text-emerald-400 hidden sm:inline uppercase font-bold">Resync_Uplink</span>
            <Activity size={10} className={`${loading ? 'animate-spin text-emerald-500' : 'text-zinc-500 group-hover:text-emerald-500'}`} />
          </button>
          
          <div className="h-full px-3 border-l border-white/5 flex items-center bg-emerald-500/[0.03]">
            <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${error ? 'bg-red-600 shadow-[0_0_8px_red]' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]'}`} />
          </div>
        </div>
      </div>

      {/* 2. PANEL DE ESTADÍSTICAS OPERATIVAS */}
      <div className="flex-shrink-0 border-b border-white/10 bg-black">
        <StatsPanel />
      </div>

      {/* 3. NÚCLEO DEL ESPACIO DE TRABAJO */}
      <div className="flex-1 min-h-0 flex overflow-hidden">
        
        {/* COLUMNA CENTRAL: GRID DE LA FLOTA */}
        <div className="flex-1 min-w-0 flex flex-col border-r border-white/10">
          <div className="h-[28px] flex-shrink-0 flex items-center justify-between px-3 bg-zinc-900/40 border-b border-white/5">
            <div className="flex items-center gap-2">
              <Layers size={10} className="text-emerald-500/50" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Transmisión_de_Inventario</span>
              {loading && <span className="text-[7px] text-emerald-500 animate-pulse ml-2 font-bold italic tracking-tighter">_SCANNING_HANGAR_01</span>}
            </div>
            
            <div className="flex items-center h-full bg-black/40 px-3 border-l border-white/5 group transition-colors focus-within:bg-black/80">
              <Search size={10} className="text-zinc-600 group-focus-within:text-emerald-500" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="BUSCAR_POR_DRONE_ID" 
                className="bg-transparent text-[9px] outline-none w-24 sm:w-40 ml-2 text-emerald-400 uppercase placeholder:text-zinc-800" 
              />
            </div>
          </div>

          {/* ÁREA DE RENDERIZADO DE UNIDADES */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 custom-scrollbar bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-900/20 via-black to-black">
            
            {error && products.length === 0 ? (
              <div className="h-full flex items-center justify-center p-10">
                <ErrorShield message="ENLACE_CON_CLUSTER_CAÍDO" retry={manualSync} />
              </div>
            ) : (
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-2">
                
                {/* ESTADO DE CARGA INICIAL (Skeletons) */}
                {loading && products.length === 0 ? (
                  Array.from({length: 12}).map((_, i) => <DroneSkeleton key={i} />)
                ) : (
                  filteredDrones.map((item) => (
                    // @ts-ignore - Evitamos errores de tipado en el MVP rápido
                    <InventoryCard key={item._id} product={item} />
                  ))
                )}

                {/* EMPTY STATE */}
                {!loading && filteredDrones.length === 0 && (
                  <div className="col-span-full py-24 text-center opacity-20">
                    <span className="text-[11px] font-black uppercase tracking-[0.6em] block">Sin_Coincidencias_en_Radar</span>
                    <span className="text-[8px] mt-2 block">Verifique el ID o SKU de la unidad</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* COLUMNA DERECHA: PANEL DE CONTROL OPERATIVO */}
        <aside className="hidden lg:flex w-[200px] flex-shrink-0 flex-col bg-black">
          <button className="h-[48px] w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black text-[10px] uppercase tracking-widest transition-all active:scale-[0.97] flex items-center justify-center gap-2">
            <Plus size={14} strokeWidth={3} />
            NUEVA_UNIDAD
          </button>

          {/* TELEMETRÍA LOGS */}
          <div className="flex-1 flex flex-col min-h-0 border-t border-white/10">
            <div className="h-[26px] px-3 flex items-center gap-2 bg-zinc-950 border-b border-white/5">
              <Terminal size={10} className="text-emerald-500" />
              <span className="text-[8px] text-zinc-400 font-bold tracking-widest uppercase">Logs_de_Sistema</span>
            </div>
            <div className="flex-1 overflow-hidden p-3 font-mono text-[8px] text-zinc-600 leading-relaxed bg-black/50 uppercase">
              <p className="truncate text-emerald-500/60"><span className="mr-1">»</span> STATUS: {status}</p>
              <p className="truncate"><span className="text-zinc-800 mr-1">»</span> {loading ? 'ESCANEO_ACTIVO...' : 'HANGAR_STANDBY'}</p>
              <p className="truncate"><span className="text-zinc-800 mr-1">»</span> {error ? 'AVISO: LINK_PERDIDO' : 'LINK: ENCRIPTADO_L5'}</p>
              {isRetrying && <p className="text-red-500 animate-pulse truncate"><span className="mr-1">!</span> REINTENTANDO_UPLINK...</p>}
              
              <div className="mt-6 p-2 border border-white/5 bg-zinc-950/50">
                <div className="text-[6px] text-zinc-500 mb-1 tracking-tighter">CARGA_DE_RED_SINCRO:</div>
                <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                   <div className={`h-full bg-emerald-500 transition-all duration-1000 ${loading ? 'w-[85%]' : 'w-[10%]'}`} />
                </div>
              </div>
            </div>
          </div>

          <div className="h-24 border-t border-white/5 bg-zinc-950/20 p-3 flex flex-col justify-center items-center opacity-20 italic">
             <WifiOff size={16} className="text-zinc-700 mb-1" />
             <span className="text-[7px] text-zinc-800 uppercase font-black tracking-[0.2em]">Protocolo_Stealth</span>
          </div>
        </aside>
      </div>

      {/* 4. FOOTER INDUSTRIAL (Status Bar) */}
      <footer className="h-[18px] flex-shrink-0 flex items-center justify-between px-3 bg-zinc-950 border-t border-white/10">
        <div className="flex gap-4 text-[7px] text-zinc-700 font-bold uppercase tracking-tighter">
          <span className="flex items-center gap-1"><div className="w-1 h-1 bg-zinc-800 rounded-full" /> HOST: RAILWAY_DOUBLE_CLUSTER</span>
          <span className="hidden sm:inline text-emerald-900/60 font-black">MERN_L6_INDUSTRIAL</span>
          <span className={`hidden sm:inline ${error ? 'text-red-900' : 'text-emerald-900/60'}`}>
            {error ? 'ERR_LINK_0x04' : 'SYS_HEALTH_OPTIMAL'}
          </span>
        </div>
        <div className="text-[7px] text-zinc-800 tracking-[0.3em] font-black uppercase">
          Nieto_Laboratory // Drone_DT // v1.0.4-STABLE
        </div>
      </footer>
    </div>
  );
}