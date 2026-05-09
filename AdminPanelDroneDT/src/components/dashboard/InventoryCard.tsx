'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Product, ProductStatus } from '@/store/useInventoryStore';
import { Plane, ArrowUpRight, Clock, ShieldCheck, AlertTriangle, Battery } from 'lucide-react';

interface Props {
  product: Product;
}

// Estados operativos del Drone DT
const STATUS_MAP: Record<ProductStatus, { color: string; bg: string; label: string }> = {
  AVAILABLE: { color: 'text-emerald-500', bg: 'bg-emerald-500/10', label: 'LISTO_PARA_DESPEGUE' },
  SOLD: { color: 'text-red-500', bg: 'bg-red-500/10', label: 'ENTREGADO' },
  RESERVED: { color: 'text-amber-500', bg: 'bg-amber-500/10', label: 'RESERVADO' },
  DRAFT: { color: 'text-slate-500', bg: 'bg-slate-500/10', label: 'EN_MANTENIMIENTO' },
};

export const InventoryCard = memo(({ product }: Props) => {
  // Safe Guard: Error de integridad de datos
  if (!product?.sku) {
    return (
      <div className="border border-red-500/20 bg-red-500/5 p-3 flex items-center gap-2">
        <AlertTriangle className="h-3 w-3 text-red-500" />
        <span className="font-mono text-[9px] text-red-500 uppercase">FALLO_SISTEMA_L5</span>
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
      {/* Capa de Seguridad Visual - Textura de Fibra de Carbono */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

      {/* Escaneo de Borde Activo */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent group-hover:via-emerald-500/60 transition-all duration-500" />

      {/* Header: Identidad de la Unidad */}
      <div className="z-10 flex items-start justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[8px] tracking-[0.2em] text-white/30 italic uppercase">
              REF_{product.sku}
            </span>
          </div>
          <h3 className="text-[11px] font-black uppercase tracking-wider text-white/95 truncate max-w-[120px]">
            {product.name || "UNIDAD_SIN_NOMBRE"}
          </h3>
        </div>
        
        {/* Status Badge de Operación */}
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

      {/* Matrix Data: Especificaciones del Drone */}
      <div className="z-10 grid grid-cols-2 gap-2 border-y border-white/5 py-2 my-1">
        <div className="flex flex-col border-r border-white/5">
          <div className="flex items-center gap-1.5">
            <Battery className="h-3 w-3 text-emerald-500/70" />
            <span className="font-mono text-[10px] font-medium text-white">{product.carats.toFixed(1)}h</span>
          </div>
          <span className="text-[7px] uppercase tracking-[0.1em] text-white/20 mt-1 font-bold">Autonomía</span>
        </div>
        
        <div className="flex flex-col pl-2">
          <span className="font-mono text-[10px] font-medium text-emerald-400">
            ${product.price.toLocaleString('en-US')}
          </span>
          <span className="text-[7px] uppercase tracking-[0.1em] text-white/20 mt-1 font-bold">Precio_USD</span>
        </div>
      </div>

      {/* Footer: Telemetría y Acción */}
      <div className="z-10 flex items-center justify-between">
        <div className="flex items-center gap-1.5 px-1.5 py-0.5 bg-white/[0.03] rounded-sm">
          <Clock className="h-2.5 w-2.5 text-white/30" />
          <span className="font-mono text-[8px] text-white/40 uppercase">
            UPLINK: {new Date(product.lastUpdate).toLocaleTimeString('es-CO', { hour12: false })}
          </span>
        </div>
        
        <button className="relative overflow-hidden group/btn px-2 py-1 flex items-center gap-1">
          <span className="relative z-10 text-[9px] font-bold uppercase tracking-widest text-white/60 group-hover/btn:text-white transition-colors">
            Gestionar
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