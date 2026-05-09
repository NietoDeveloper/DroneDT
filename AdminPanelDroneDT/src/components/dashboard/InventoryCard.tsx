'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Product, ProductStatus } from '@/store/useInventoryStore';
import { Gem, ArrowUpRight, Clock, ShieldCheck, AlertTriangle } from 'lucide-react';

interface Props {
  product: Product;
}

// Configuración inmutable fuera del componente para evitar re-creación en memoria
const STATUS_MAP: Record<ProductStatus, { color: string; bg: string; label: string }> = {
  AVAILABLE: { color: 'text-emerald-500', bg: 'bg-emerald-500/10', label: 'LIVE_SYNC_READY' },
  SOLD: { color: 'text-red-500', bg: 'bg-red-500/10', label: 'ASSET_VENDIDO' },
  RESERVED: { color: 'text-amber-500', bg: 'bg-amber-500/10', label: 'LOCK_RESERVED' },
  DRAFT: { color: 'text-slate-500', bg: 'bg-slate-500/10', label: 'DRAFT_SYSTEM' },
};

// Componente optimizado con React.memo para Nivel S+
// Solo re-renderiza si las propiedades del producto cambian realmente
export const InventoryCard = memo(({ product }: Props) => {
  // Safe Guard: Si no hay producto o datos críticos, mostramos estado de error técnico
  if (!product?.sku) {
    return (
      <div className="border border-red-500/20 bg-red-500/5 p-3 flex items-center gap-2">
        <AlertTriangle className="h-3 w-3 text-red-500" />
        <span className="font-mono text-[9px] text-red-500 uppercase">Data_Corrupted_L5</span>
      </div>
    );
  }

  const currentStatus = STATUS_MAP[product.status] || STATUS_MAP.DRAFT;

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.04)' }}
      className="relative flex flex-col gap-3 border border-white/10 bg-black/60 p-3 transition-all duration-200 group overflow-hidden"
    >
      {/* Capa de Seguridad Visual - Grid sutil de fondo */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

      {/* Escaneado de Borde: Animación de Seguridad Activa */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent group-hover:via-emerald-500/60 transition-all duration-500" />

      {/* Header: Identidad del Activo */}
      <div className="z-10 flex items-start justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[8px] tracking-[0.2em] text-white/30 italic">
              ID_{product.sku}
            </span>
          </div>
          <h3 className="text-[11px] font-black uppercase tracking-wider text-white/95 truncate max-w-[120px]">
            {product.name}
          </h3>
        </div>
        
        {/* Status Badge con Glow dinámico */}
        <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-white/5 ${currentStatus.bg}`}>
          <span className={`relative flex h-1.5 w-1.5`}>
            <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${currentStatus.color.replace('text', 'bg')}`}></span>
            <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${currentStatus.color.replace('text', 'bg')}`}></span>
          </span>
          <span className={`font-mono text-[7px] font-bold tracking-tighter ${currentStatus.color}`}>
            {currentStatus.label}
          </span>
        </div>
      </div>

      {/* Matrix Data: Specs Técnicas */}
      <div className="z-10 grid grid-cols-2 gap-2 border-y border-white/5 py-2 my-1">
        <div className="flex flex-col border-r border-white/5">
          <div className="flex items-center gap-1.5">
            <Gem className="h-3 w-3 text-emerald-500/70" />
            <span className="font-mono text-[10px] font-medium text-white">{product.carats.toFixed(2)}</span>
          </div>
          <span className="text-[7px] uppercase tracking-[0.1em] text-white/20 mt-1">Weight_CT</span>
        </div>
        
        <div className="flex flex-col pl-2">
          <span className="font-mono text-[10px] font-medium text-emerald-400">
            ${product.price.toLocaleString('en-US')}
          </span>
          <span className="text-[7px] uppercase tracking-[0.1em] text-white/20 mt-1">Value_USD</span>
        </div>
      </div>

      {/* Footer: Sincronización Temporal y Acción */}
      <div className="z-10 flex items-center justify-between">

        
        <button className="relative overflow-hidden group/btn px-2 py-1 flex items-center gap-1">
          <span className="relative z-10 text-[9px] font-bold uppercase tracking-widest text-white/60 group-hover/btn:text-white transition-colors">
            Inspect
          </span>
          <ArrowUpRight className="relative z-10 h-2.5 w-2.5 text-white/40 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          <div className="absolute inset-0 bg-emerald-500/0 group-hover/btn:bg-emerald-500/10 transition-colors duration-300" />
        </button>
      </div>

      {/* Background Security Watermark */}
      <ShieldCheck className="absolute -bottom-2 -right-2 h-10 w-10 text-white/[0.015] -rotate-12 pointer-events-none" />
    </motion.div>
  );
});

InventoryCard.displayName = 'InventoryCard';