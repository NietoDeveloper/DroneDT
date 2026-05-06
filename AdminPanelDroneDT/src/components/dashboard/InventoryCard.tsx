'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/store/useInventoryStore';
import { Gem, ArrowUpRight, Clock, ShieldCheck, Zap } from 'lucide-react';

interface Props {
  product: Product;
}

export const InventoryCard = ({ product }: Props) => {
  // Configuración de colores según el estado (Estética de seguridad L5)
  const statusConfig = {
    AVAILABLE: { color: 'text-emerald-500', bg: 'bg-emerald-500/10', label: 'IN_STOCK' },
    SOLD: { color: 'text-red-500', bg: 'bg-red-500/10', label: 'OUT_OF_STOCK' },
    RESERVED: { color: 'text-amber-500', bg: 'bg-amber-500/10', label: 'PENDING' },
    DRAFT: { color: 'text-slate-500', bg: 'bg-slate-500/10', label: 'DRAFT_MODE' },
  };

  const currentStatus = statusConfig[product.status] || statusConfig.DRAFT;

  return (
    <motion.div
      whileHover={{ scale: 1.01, backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
      className="relative flex flex-col gap-3 border border-white/10 bg-black/40 p-3 transition-all duration-300 group"
    >
      {/* Glitch Effect sutil en el borde al hacer hover */}
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
      </div>

      {/* Header: SKU & Status Indicator */}
      <div className="z-10 flex items-start justify-between">
        <div className="flex flex-col">
          <span className="font-mono text-[9px] tracking-widest text-white/40 italic">
            SKU_ID: {product.sku}
          </span>
          <h3 className="text-[11px] font-bold uppercase tracking-tight text-white/90">
            {product.name}
          </h3>
        </div>
        <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-sm ${currentStatus.bg}`}>
          <div className={`h-1 w-1 rounded-full animate-pulse ${currentStatus.color.replace('text', 'bg')}`} />
          <span className={`font-mono text-[8px] font-bold ${currentStatus.color}`}>
            {currentStatus.label}
          </span>
        </div>
      </div>


      {/* Bottom Actions & Time Sync */}
      <div className="z-10 mt-1 flex items-center justify-between border-t border-white/5 pt-2">

        
      </div>

      {/* Security Shield Watermark (Background) */}
      <ShieldCheck className="absolute bottom-2 right-2 h-12 w-12 text-white/[0.02] pointer-events-none" />
    </motion.div>
  );
};