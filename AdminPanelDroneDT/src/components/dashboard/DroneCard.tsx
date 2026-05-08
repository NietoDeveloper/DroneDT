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



        


    
      </div>

    </motion.div>
  );
});

DroneCard.displayName = 'DroneCard';