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
        
 ser imponente) */}
      <div className="flex-shrink-0 border-b border-white/10 bg-black">
        <StatsPanel />
      </div>
ck">
            
      </footer>
    </div>
  );
}