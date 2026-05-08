'use client';

import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Battery, 
  Wifi, 

  Radio

  lastUpdate: string;
}

}

export const DroneCard = memo(({ drone }: DroneCardProps) => {
  // Lógica de criticidad de nivel L5
  const isCritical = drone.battery < 20 || drone.status === 'CRITICAL';
  const isFlying = drone.status === 'FLYING';
