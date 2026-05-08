'use client';

import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Battery, 
  Wifi, 
  Navigation, 
  AlertTriangle, 
  Cpu, 
  Zap,
  Radio
} from 'lucide-react';

interface DroneData {
  id: string;
  sku: string;
  status: 'READY' | 'FLYING' | 'MAINTENANCE' | 'CRITICAL';
  battery: number;
  signal: number;
  lastUpdate: string;
}

interface DroneCardProps {
  drone: DroneData;
}

export const DroneCard = memo(({ drone }: DroneCardProps) => {
  // Lógica de criticidad de nivel L5
  const isCritical = drone.battery < 20 || drone.status === 'CRITICAL';
  const isFlying = drone.status === 'FLYING';

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -3, borderColor: isCritical ? 'rgba(239, 68, 68, 0.5)' : 'rgba(16, 185, 129, 0.4)' }}
      className={`relative bg-black border ${isCritical ? 'border-red-900/50' : 'border-white/5'} p-3 flex flex-col gap-3 group cursor-pointer transition-all overflow-hidden selection:bg-emerald-500/30`}
    >
      
      {/* 1. BACKGROUND GLYPH - Identidad visual técnica */}
      <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
        <Cpu size={80} className="text-white" />
      </div>

      {/* 2. HEADER: Identificador y Señal */}
      <div className="z-10 flex justify-between items-start">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <div className={`w-1 h-1 rounded-full ${isFlying ? 'bg-blue-500 animate-ping' : 'bg-emerald-500'}`} />
            <span className="text-[10px] font-black text-white tracking-widest uppercase">
 
            </span>
          </div>
          <span className="text-[7px] text-zinc-600 font-bold ml-3 uppercase tracking-tighter">


    
      </div>

    </motion.div>
  );
});

DroneCard.displayName = 'DroneCard';