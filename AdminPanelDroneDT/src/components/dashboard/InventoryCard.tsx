'use client';

import React from 'react';
import { 
  Package, 
  Cpu, 
  Battery, 
  Zap, 
  AlertCircle, 
  CheckCircle2, 
  Navigation 
} from 'lucide-react';

interface DroneProduct {
  _id: string;
  name: string;
  status: 'active' | 'maintenance' | 'offline';
  stock: number;
  batteryLevel?: number;
  sku?: string;
  firmwareVersion?: string;
}

/**
 * COMPONENT: InventoryCard
 * Nivel: L5 Architecture - Industrial Telemetry
 * Propósito: Visualización técnica de unidades Drone DT.
 * Export: Named Export for Turbopack Compliance.
 */
export const InventoryCard = ({ product }: { product: DroneProduct }) => {
  
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'active': 
        return {
          text: 'text-emerald-400',
          border: 'border-emerald-500/30',
          bg: 'bg-emerald-500/5',
          shadow: 'shadow-[0_0_10px_rgba(16,185,129,0.1)]',
          icon: <CheckCircle2 size={10} className="text-emerald-500" />
        };
      case 'maintenance': 
        return {
          text: 'text-amber-400',
          border: 'border-amber-500/30',
          bg: 'bg-amber-500/5',
          shadow: 'shadow-[0_0_10px_rgba(245,158,11,0.1)]',
          icon: <AlertCircle size={10} className="text-amber-500" />
        };
      default: 
        return {
          text: 'text-rose-400',
          border: 'border-rose-500/30',
          bg: 'bg-rose-500/5',
          shadow: 'shadow-[0_0_10px_rgba(244,63,94,0.1)]',
          icon: <Zap size={10} className="text-rose-500" />
        };
    }
  };

  const ui = getStatusStyles(product.status);

  return (
    <div className={`group relative p-3 rounded-lg border ${ui.border} ${ui.bg} ${ui.shadow} backdrop-blur-xl hover:bg-white/[0.03] transition-all duration-500 overflow-hidden`}>
      
      {/* 1. HEADER: TELEMETRÍA RÁPIDA */}
      <div className="flex justify-between items-start mb-3">
        <div className="p-1.5 bg-zinc-950/50 rounded-md border border-white/5 group-hover:border-emerald-500/30 transition-colors">
          <Navigation size={12} className="text-white/40 group-hover:text-emerald-400" />
        </div>
        <div className="flex flex-col items-end">
          <div className={`flex items-center gap-1 text-[8px] font-black uppercase tracking-tighter ${ui.text}`}>
            {ui.icon}
            {product.status}
          </div>
          <span className="text-[7px] text-zinc-600 mt-0.5 font-mono">
            {product.firmwareVersion || 'v1.0.4-L5'}
          </span>
        </div>
      </div>

      {/* 2. IDENTIFICACIÓN DE UNIDAD */}
      <div className="space-y-0.5">
        <h3 className="text-[11px] font-bold text-white/90 truncate uppercase tracking-tight">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-[8px] font-mono text-zinc-500 bg-black/40 px-1 py-0.5 rounded border border-white/5">
            ID: {product._id?.slice(-8).toUpperCase() || 'UNKNOWN'}
          </span>
        </div>
      </div>

      {/* 3. MÉTRICAS OPERATIVAS */}
      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/5 pt-3">
        <div className="flex flex-col">
          <span className="text-[7px] text-zinc-600 uppercase font-black">Disponibilidad</span>
          <div className="flex items-baseline gap-1">
            <span className="text-xs font-bold text-white">{product.stock}</span>
            <span className="text-[8px] text-zinc-500 font-medium italic">unid.</span>
          </div>
        </div>
        <div className="flex flex-col border-l border-white/5 pl-2">
          <span className="text-[7px] text-zinc-600 uppercase font-black">Carga_Nucleo</span>
          <div className="flex items-center gap-1.5 mt-1">
             <div className="flex-1 h-0.5 bg-zinc-900 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${product.stock > 0 ? 'bg-emerald-500' : 'bg-rose-500'}`} 
                  style={{ width: `${Math.min(product.stock * 10, 100)}%` }} 
                />
             </div>
          </div>
        </div>
      </div>

      {/* DECORACIÓN TECNOLÓGICA (NIETO LAB AESTHETIC) */}
      <div className="absolute top-0 right-0 w-8 h-8 opacity-10 group-hover:opacity-30 transition-opacity">
        <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-emerald-500 to-transparent" />
        <div className="absolute top-0 right-0 h-[1px] w-full bg-gradient-to-l from-emerald-500 to-transparent" />
      </div>
    </div>
  );
};