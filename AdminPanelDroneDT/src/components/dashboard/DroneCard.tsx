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
              {drone.sku}
            </span>
          </div>
          <span className="text-[7px] text-zinc-600 font-bold ml-3 uppercase tracking-tighter">
            ID: {drone.id.split('_').pop()}
          </span>
        </div>
        
        <div className="flex items-center gap-1.5 bg-zinc-900/50 px-1.5 py-0.5 rounded-sm border border-white/5">
          <span className={`text-[8px] font-mono ${drone.signal > 70 ? 'text-emerald-500' : 'text-amber-500'}`}>
            {drone.signal}%
          </span>
          <Radio size={10} className={drone.signal > 70 ? 'text-emerald-500' : 'text-zinc-600'} />
        </div>
      </div>

      {/* 3. CENTER: Telemetría de Vuelo / Status */}
      <div className="z-10 flex flex-col py-1">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1">
            {isCritical ? (
              <AlertTriangle size={10} className="text-red-500 animate-pulse" />
            ) : (
              <Zap size={10} className={isFlying ? 'text-blue-400' : 'text-emerald-500'} />
            )}
            <span className={`text-[9px] font-black uppercase tracking-widest ${
              isCritical ? 'text-red-500' : isFlying ? 'text-blue-400' : 'text-emerald-500'
            }`}>
              {drone.status}
            </span>
          </div>
        </div>

        {/* Batería Modular */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-[3px] bg-zinc-900 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${drone.battery}%` }}
              className={`h-full ${
                drone.battery < 20 ? 'bg-red-600' : drone.battery < 50 ? 'bg-amber-500' : 'bg-emerald-600'
              }`} 
            />
          </div>
          <span className="text-[8px] font-mono text-zinc-500 w-6 text-right">
            {drone.battery}%
          </span>
        </div>
      </div>

      {/* 4. FOOTER: Sync & Navigation */}
      <div className="z-10 flex justify-between items-end pt-1 border-t border-white/5">
        <div className="flex items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity">


        </div>
    
      </div>

    </motion.div>
  );
});

DroneCard.displayName = 'DroneCard';