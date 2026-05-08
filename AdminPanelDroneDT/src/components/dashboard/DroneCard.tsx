'use client';

import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Battery, 
  Navigation, 
  AlertTriangle, 
  Cpu, 
  Zap,
  Radio
} from 'lucide-react';

// Tipado estricto para evitar fallos de compilación
interface DroneData {
  id: string;
  sku: string;
  status: 'READY' | 'FLYING' | 'MAINTENANCE' | 'CRITICAL';
  battery: number;
  signal: number;
  lastUpdate?: string;
}

interface DroneCardProps {
  drone: DroneData;
}

export const DroneCard = memo(({ drone }: DroneCardProps) => {
  // 1. FAIL-SAFE: Si el objeto drone es null por error de red, no rompemos la app
  if (!drone) return null;

  // 2. LOGIC CACHE: Pre-calculamos estados para ahorrar ciclos de CPU
  const config = useMemo(() => {
    const isCritical = drone.battery < 20 || drone.status === 'CRITICAL';
    const isFlying = drone.status === 'FLYING';
    
    let statusColor = 'text-emerald-500';
    let borderColor = 'border-white/5';
    
    if (isCritical) {
      statusColor = 'text-red-500';
      borderColor = 'border-red-900/40';
    } else if (isFlying) {
      statusColor = 'text-blue-400';
    }

    return { isCritical, isFlying, statusColor, borderColor };
  }, [drone.status, drone.battery]);

  return (
    <motion.div 
      layout="position" // Optimización de animaciones de layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ y: -2, backgroundColor: 'rgba(255,255,255,0.02)' }}
      className={`relative bg-black border ${config.borderColor} p-3 flex flex-col gap-3 group cursor-pointer transition-all duration-300 overflow-hidden will-change-transform`}
    >
      
      {/* BACKGROUND DECOR (HARD-CODED PARA VELOCIDAD) */}
      <div className="absolute -right-4 -bottom-4 opacity-[0.02] pointer-events-none">
        <Cpu size={80} strokeWidth={1} />
      </div>

      {/* HEADER: ID & SIGNAL */}
      <div className="z-10 flex justify-between items-start">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <div className={`w-1 h-1 rounded-full ${config.isFlying ? 'bg-blue-500 animate-ping' : 'bg-emerald-500'}`} />
            <span className="text-[10px] font-black text-white tracking-widest truncate max-w-[80px]">
              {drone.sku || 'UNKNOWN_UNIT'}
            </span>
          </div>
          <span className="text-[7px] text-zinc-600 font-bold uppercase tracking-tighter">
            NODE_{drone.id?.slice(-5) || '0000'}
          </span>
        </div>
        
        <div className="flex items-center gap-1.5 bg-zinc-900/30 px-1.5 py-0.5 border border-white/5">
          <span className={`text-[8px] font-mono ${drone.signal > 50 ? 'text-zinc-400' : 'text-amber-500'}`}>
            {drone.signal || 0}%
          </span>
          <Radio size={10} className={drone.signal > 70 ? 'text-emerald-500' : 'text-zinc-700'} />
        </div>
      </div>

      {/* TELEMETRY BODY */}
      <div className="z-10 flex flex-col">
        <div className="flex items-center gap-1 mb-1">
          {config.isCritical ? (
            <AlertTriangle size={10} className="text-red-500 animate-pulse" />
          ) : (
            <Zap size={10} className={config.statusColor} />
          )}
          <span className={`text-[9px] font-black uppercase tracking-widest ${config.statusColor}`}>
            {drone.status || 'OFFLINE'}
          </span>
        </div>

        {/* BATTERY SYSTEM */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-[2px] bg-zinc-900 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${
                drone.battery < 25 ? 'bg-red-600' : 'bg-emerald-600'
              }`} 
              style={{ width: `${Math.min(drone.battery, 100)}%` }} 
            />
          </div>
          <span className="text-[8px] font-mono text-zinc-500">{drone.battery}%</span>
        </div>
      </div>

      {/* FOOTER: GPS & ENGINE STATUS */}
      <div className="z-10 flex justify-between items-end pt-2 border-t border-white/5 mt-1">
        <div className="flex items-center gap-1 opacity-50">
          <Navigation size={8} />
          <span className="text-[7px] font-bold tracking-tighter text-zinc-500">GPS_LOCKED</span>
        </div>
        
        {/* ENGINE INDICATORS */}
        <div className="flex gap-[2px]">
          {[1,2,3,4].map((i) => (
            <div 
              key={i} 
              className={`w-1 h-2 rounded-sm ${config.isFlying ? 'bg-blue-500/40 animate-pulse' : 'bg-zinc-800'}`} 
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>

      {/* L5 SECURITY SCANNER */}
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-white/5">
        <motion.div 
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-full h-full bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"
        />
      </div>

    </motion.div>
  );
});

DroneCard.displayName = 'DroneCard';