'use client';

import React, { useState, useMemo } from 'react';
import { Search, Activity, Terminal, Layers, Cpu, WifiOff, Plus } from 'lucide-react';
import { StatsPanel } from '@/components/dashboard/StatsPanel';
import { InventoryCard } from '@/components/dashboard/InventoryCard';
import { DroneSkeleton } from '@/components/dashboard/DroneSkeleton';
import { ErrorShield } from '@/components/dashboard/ErrorShield';
import { useRealTimeInventory } from '@/hooks/useRealTimeInventory';
import { useInventoryStore } from '@/store/useInventoryStore';

export default function DashboardL5() {
  // 1. Hooks de estado global (Acceso correcto a las propiedades)
  const products = useInventoryStore((state) => state.products);
  const loading = useInventoryStore((state) => state.isLoading);
  const error = useInventoryStore((state) => state.error);
  
  // 2. Hook de sincronización en tiempo real (Heartbeat)
  const { manualSync, isRetrying, status } = useRealTimeInventory(15000);

  // 3. Estado local para filtrado
  const [searchQuery, setSearchQuery] = useState('');

  // 4. Lógica de filtrado por SKU o Nombre (Memoria optimizada)
  const filteredDrones = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.sku.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col overflow-hidden font-mono selection:bg-emerald-500/30">
      
      {/* 1. BARRA DE CONTROL (Superior) */}
      <div className="h-[20px] flex-shrink-0 flex items-center justify-between bg-zinc-950 border-b border-white/10 px-2">
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <Cpu size={10} className="text-emerald-500" />
          <h1 className="text-[10px] font-black tracking-tighter leading-none text-white uppercase">
            DRONE_<span className="text-emerald-500">DT</span>
          </h1>
          <span className="hidden sm:inline text-[7px] text-zinc-600 uppercase border-l border-white/10 pl-2 ml-1 italic">
            Escudo_Aéreo_Nieto_Lab
          </span>
        </div>
        
        <div className="flex items-center h-full">
           <button 
             onClick={() => manualSync()} 
             disabled={loading}
             title="Sincronizar Telemetría"
             className={`h-full px-3 border-l border-white/5 transition-all group cursor-pointer ${loading ? 'opacity-50' : 'hover:bg-emerald-500/10'}`}
           >
             <Activity size={10} className={`${loading ? 'animate-spin text-emerald-500' : 'text-zinc-500 group-hover:text-emerald-500'}`} />
           </button>
           <div className="h-full px-2 border-l border-white/5 flex items-center bg-emerald-500/[0.03]">
             <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${error ? 'bg-red-600 shadow-[0_0_8px_red]' : 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.6)]'}`} />
           </div>
        </div>
      </div>

      {/* 2. PANEL DE ESTADÍSTICAS OPERATIVAS */}
      <div className="flex-shrink-0 border-b border-white/10 bg-black">
        <StatsPanel />
      </div>

      {/* 3. NÚCLEO DEL ESPACIO DE TRABAJO */}
      <div className="flex-1 min-h-0 flex overflow-hidden">
        
        {/* LADO IZQUIERDO: GRID DE LA FLOTA */}
   