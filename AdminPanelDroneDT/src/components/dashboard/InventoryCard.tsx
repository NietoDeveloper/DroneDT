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
 */
export const InventoryCard = ({ product }: { product: DroneProduct }) => {
  
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

  const ui = getStatusStyles(product.status);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`group relative p-3 lg:p-6 rounded-xl border ${ui.border} ${ui.bg} ${ui.shadow} backdrop-blur-xl hover:bg-white/[0.04] transition-all duration-500 overflow-hidden`}
    >
      
      {/* 1. HEADER: TELEMETRÍA RÁPIDA */}
      <div className="flex justify-between items-start mb-4 lg:mb-8">
        <div className="p-1.5 lg:p-3 bg-zinc-950/50 rounded-lg border border-white/5 group-hover:border-emerald-500/30 transition-all duration-500">
          <Navigation className="w-3 h-3 lg:w-6 lg:h-6 text-white/40 group-hover:text-emerald-400 group-hover:rotate-45 transition-all" />
        </div>
        <div className="flex flex-col items-end">
          <div className={`flex items-center gap-1.5 text-[8px] lg:text-[11px] font-black uppercase tracking-tighter ${ui.text}`}>
            {ui.icon}
            {product.status}
          </div>
          <span className="text-[7px] lg:text-[9px] text-zinc-600 mt-1 font-mono tracking-widest">
            {product.firmwareVersion || 'v1.0.4-L5'}
          </span>
        </div>idad</span>
          <div className="flex items-baseline gap-1">
0" />
    </motion.div>
  );
};