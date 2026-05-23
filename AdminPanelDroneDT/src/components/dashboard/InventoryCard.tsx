'use client';

import React from 'react';
/* FIX: Importación de motion necesaria para las animaciones del núcleo */
import { motion } from 'framer-motion'; 
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
 * Optimización: Responsive High-Density (310px - 1900px)
 * Blindaje: Inyección de Mock de respaldo para bypass sin sesión.
 */
export const InventoryCard = ({ product }: { product?: DroneProduct }) => {
  
  // BLINDAJE L5: Si el objeto product no existe o es undefined, autoinyectamos un fallback operativo
  const safeProduct = product || {
    _id: 'DEF_AILURIDAE_01',
    name: 'DRONE ALPHA OVERVIEW DT',
    status: 'active' as const,
    stock: 10,
    firmwareVersion: 'v1.0.4-L5-MOCK'
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'active': 
        return {
          text: 'text-emerald-400',
          border: 'border-emerald-500/30',
          bg: 'bg-emerald-500/5',
          shadow: 'shadow-[0_0_15px_rgba(16,185,129,0.05)]',
          icon: <CheckCircle2 className="w-2 h-2 lg:w-4 lg:h-4 text-emerald-500" />
        };
      case 'maintenance': 
        return {
          text: 'text-amber-400',
          border: 'border-amber-500/30',
          bg: 'bg-amber-500/5',
          shadow: 'shadow-[0_0_15px_rgba(245,158,11,0.05)]',
          icon: <AlertCircle className="w-2 h-2 lg:w-4 lg:h-4 text-amber-500" />
        };
      default: 
        return {
          text: 'text-rose-400',
          border: 'border-rose-500/30',
          bg: 'bg-rose-500/5',
          shadow: 'shadow-[0_0_15px_rgba(244,63,94,0.05)]',
          icon: <Zap className="w-2 h-2 lg:w-4 lg:h-4 text-rose-500" />
        };
    }
  };

  // Leemos del objeto safeProduct garantizado
  const ui = getStatusStyles(safeProduct.status);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`group relative p-3 lg:p-6 rounded-xl border ${ui.border} ${ui.bg} ${ui.shadow} backdrop-blur-xl hover:bg-white/[0.04] transition-all duration-500 overflow-hidden w-full`}
    >
      
      {/* 1. HEADER: TELEMETRÍA RÁPIDA */}
      <div className="flex justify-between items-start mb-4 lg:mb-8">
        <div className="p-1.5 lg:p-3 bg-zinc-950/50 rounded-lg border border-white/5 group-hover:border-emerald-500/30 transition-all duration-500">
          <Navigation className="w-3 h-3 lg:w-6 lg:h-6 text-white/40 group-hover:text-emerald-400 group-hover:rotate-45 transition-all" />
        </div>
        <div className="flex flex-col items-end">
          <div className={`flex items-center gap-1.5 text-[8px] lg:text-[11px] font-black uppercase tracking-tighter ${ui.text}`}>
            {ui.icon}
            {safeProduct.status}
          </div>
          <span className="text-[7px] lg:text-[9px] text-zinc-600 mt-1 font-mono tracking-widest">
            {safeProduct.firmwareVersion || 'v1.0.4-L5'}
          </span>
        </div>
      </div>

      {/* 2. IDENTIFICACIÓN DE UNIDAD */}
      <div className="space-y-1 lg:space-y-3">
        <h3 className="text-[11px] lg:text-[16px] xl:text-[18px] font-black text-white/90 truncate uppercase tracking-tight group-hover:text-white transition-colors">
          {safeProduct.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-[8px] lg:text-[10px] font-mono text-zinc-500 bg-black/60 px-1.5 py-0.5 lg:px-2 lg:py-1 rounded border border-white/5 uppercase">
            UID_{safeProduct._id?.slice(-8).toUpperCase() || 'UNKNOWN'}
          </span>
        </div>
      </div>

      {/* 3. MÉTRICAS OPERATIVAS */}
      <div className="mt-6 lg:mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-4 lg:pt-6">
        <div className="flex flex-col gap-1">
          <span className="text-[7px] lg:text-[10px] text-zinc-600 uppercase font-black tracking-widest">Disponibilidad</span>
          <div className="flex items-baseline gap-1">
            <span className="text-sm lg:text-2xl font-black text-white">{safeProduct.stock}</span>
            <span className="text-[8px] lg:text-[11px] text-zinc-500 font-bold italic uppercase">Units</span>
          </div>
        </div>
        
        <div className="flex flex-col border-l border-white/10 pl-4 gap-1">
          <span className="text-[7px] lg:text-[10px] text-zinc-600 uppercase font-black tracking-widest">Carga_Núcleo</span>
          <div className="flex items-center h-full">
             <div className="flex-1 h-1 lg:h-2 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(safeProduct.stock * 10, 100)}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full ${safeProduct.stock > 0 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-rose-500'}`} 
                />
             </div>
          </div>
        </div>
      </div>

      {/* DECORACIÓN TECNOLÓGICA */}
      <div className="absolute top-0 right-0 w-12 h-12 lg:w-20 lg:h-20 opacity-10 group-hover:opacity-40 transition-all duration-700">
        <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-emerald-500 to-transparent" />
        <div className="absolute top-0 right-0 h-[1px] w-full bg-gradient-to-l from-emerald-500 to-transparent" />
      </div>

      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 group-hover:h-1/2 bg-emerald-500 transition-all duration-500" />
    </motion.div>
  );
};