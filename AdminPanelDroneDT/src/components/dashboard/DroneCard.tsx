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

      {/* 2. HEADER: Identificador y Señal */}
      <div className="z-10 flex justify-between items-start">
        <div className="flex flex-col">

        


    
      </div>

    </motion.div>
  );
});

DroneCard.displayName = 'DroneCard';