'use client';

import React, { useState, useEffect } from 'react';
import { Preloader } from '@/components/ui/Preloader';
import { motion, AnimatePresence } from 'framer-motion';

// IMPORTACIÓN EXACTA Y AJUSTADA DE LOS COMPONENTES DEL DASHBOARD
import { DroneCard } from '@/components/dashboard/DroneCard';
import { DroneSkeleton } from '@/components/dashboard/DroneSkeleton';
import { ErrorShield } from '@/components/dashboard/ErrorShield';
import { InventoryCard } from '@/components/dashboard/InventoryCard';
import { InventoryGrid } from '@/components/dashboard/InventoryGrid';
import { SalesCentralizer } from '@/components/dashboard/SalesCentralizer';
import { Sidebar } from '@/components/dashboard/Sid
  const [isSystemChecking, setIsSystemChecking] = useState<boolean>(false);

  // Datos mock de alta fidelidad para el HUD superior (Unidades Vendidas vs Disponibles)
  const productMetrics = {
      const now = new Date();
      setSystemTime(now.toTimeString().split(' ')[0]);
    }, 1000);


      <AnimatePresence mode="wait">
        {/* INTERFAZ 1: GATEWAY DE INGRESO (BYPASS) */}
        {currentFlow === 'LOGIN' && (
          <motion.div