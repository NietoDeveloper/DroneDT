'use client';

import React, { useState, useEffect } from 'react';
import { Preloader } from '@/components/ui/Preloader';
import { motion, AnimatePresence } from 'framer-motion';

// IMPORTACIÓN EXACTA DE TUS 8 COMPONENTES DEL DASHBOARD
import { DroneCard } from '@/components/dashboard/DroneCard';
import { DroneSkeleton } from '@/components/dashboard/DroneSkeleton';
import { ErrorShield } from '@/components/dashboard/ErrorShield';
import { InventoryCard } from '@/components/dashboard/InventoryCard';
import { Inventory } from '@/components/dashboard/Inventory';
import { SalesCenter } from '@/components/dashboard/SalesCenter';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Logo } from '@/components/dashboard/Logo';

import { Cpu, Activity, RefreshCw, Layers, TrendingUp, Package } from 'lucide-react';

type FlowState = 'PRELOADER' | 'LOGIN' | 'DASHBOARD';

export default function DroneDashboardPage() {
  const [currentFlow, setCurrentFlow] = useState<FlowState>('PRELOADER');
  const [systemTime, setSystemTime] = useState('00:00:00');
  const [isSystemChecking, setIsSystemChecking] = useState(false);

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

  const triggerManualHealthCheck = () => {
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
            key="login-interface"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, filter: 'blur(12px)', y: -15 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="flex-1 z-10 flex flex-col items-center justify-center px-4"
          >
            <div className="w-full max-w-md bg-zinc-950/40 border border-white/5 rounded-2xl p-8 backdrop-blur-xl relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)]">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FFD700]/40 to-transparent" />
              
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-center mb-4 text-[#FFD700]">
                  <Logo />
                </div>
                <h2 className="text-xl font-black tracking-[0.4em] uppercase text-white italic">
                  ACCESS_GATEWAY
                </h2>
                <p className="text-[9px] text-zinc-500 tracking-widest mt-1 uppercase">
                  Drone DT Ecosystem // Secure Link
                </p>
              </div>


