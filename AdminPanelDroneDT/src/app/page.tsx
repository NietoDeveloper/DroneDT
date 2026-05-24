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
import { Sidebar } from '@/components/dashboard/Sidebar';

// CORRECCIÓN DE RUTAS: Ubicación real de la UI base dentro de src/components/ui/
import Logo from '@/components/ui/Logo';

import { Cpu, Activity, RefreshCw, Layers, TrendingUp, Package } from 'lucide-react';

type FlowState = 'PRELOADER' | 'LOGIN' | 'DASHBOARD';

export default function DroneDashboardPage() {
  const [currentFlow, setCurrentFlow] = useState<FlowState>('PRELOADER');
  const [systemTime, setSystemTime] = useState<string>('00:00:00');
  const [isSystemChecking, setIsSystemChecking] = useState<boolean>(false);

  // Datos mock de alta fidelidad para el HUD superior (Unidades Vendidas vs Disponibles)
  const productMetrics = {
    totalDisponibles: 1420,
    totalVendidas: 8432,
    eficienciaFlota: '98.4%'
  };

  useEffect(() => {
    const preloaderTimer = setTimeout(() => {
      setCurrentFlow('LOGIN');
    }, 3500);

    const interval = setInterval(() => {
      const now = new Date();
      setSystemTime(now.toTimeString().split(' ')[0]);
    }, 1000);

    return () => {
      clearTimeout(preloaderTimer);
      clearInterval(interval);
    };
  }, []);

  const triggerManualHealthCheck = (): void => {
    setIsSystemChecking(true);
    setTimeout(() => setIsSystemChecking(false), 1200);
  };

  if (currentFlow === 'PRELOADER') {
    return <Preloader />;
  }

  return (
    <div className="fluid-container h-screen w-screen flex flex-col bg-[#050505] text-white overflow-hidden relative select-none font-mono">
      
      {/* CAPA DE FONDO: Micro-grid de precisión */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, #ffffff 0.5px, transparent 0.5px)', 
          backgroundSize: 'clamp(16px, 1.5vw, 24px) clamp(16px, 1.5vw, 24px)' 
        }} 
      />

      <AnimatePresence mode="wait">
        {/* INTERFAZ 1: GATEWAY DE INGRESO (BYPASS) */}
        {currentFlow === 'LOGIN' && (
          <motion.div