'use client';

import React, { useState, useEffect } from 'react';
import { UserStats } from '@/components/users/UserStats';
import { UserRow } from '@/components/users/UserRow';
import { useUserManagement } from '@/hooks/useUserManagement';
import { Preloader } from '@/components/ui/Preloader';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  RefreshCw, 
  UserPlus, 
  ShieldAlert,
  Zap,
  Activity,
  Terminal,
  Cpu
} from 'lucide-react';

type FlowState = 'PRELOADER' | 'LOGIN' | 'DASHBOARD';

/**
 * PAGE: Personnel & Core System Dashboard (L5 Gateway)
 * Architecture: No-Scroll Viewport // 310px - 1900px Responsive
 * Logic: Secuencial sin fricciones: Preloader (3.5s) -> Login (Bypass) -> Dashboard
 */
export default function UsersPage() {
  const { operators, manualRefresh, isLoading: hookLoading } = useUserManagement();
  const [currentFlow, setCurrentFlow] = useState<FlowState>('PRELOADER');
  const [searchTerm, setSearchTerm] = useState('');

  // Sincronización del temporizador del Preloader de Inteligencia
  useEffect(() => {
    const preloaderTimer = setTimeout(() => {
      setCurrentFlow('LOGIN');
    }, 3500);

    return () => clearTimeout(preloaderTimer);
  }, []);

  // Filtrado en tiempo real para eficiencia de datos en el Dashboard
  const filteredOperators = operators.filter(op => 
    op.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    op.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Manejo del estado del flujo secuencial
  if (currentFlow === 'PRELOADER') {
    return <Preloader />;
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-[#080808] text-white overflow-hidden relative select-none">
      
      {/* BACKGROUND LAYER GLOBAL: Micro-grid de precisión aeroespacial */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, #ffffff 0.5px, transparent 0.5px)', 
          backgroundSize: '24px 24px' 
        }} 
      />

      <AnimatePresence mode="wait">
        {/* INTERFAZ 1: REGISTRO / LOGIN INDUSTRIAL (BYPASS DIRECTO) */}
        {currentFlow === 'LOGIN' && (
          <motion.div
            key="login-interface"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)', y: -10 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="flex-1 z-10 flex flex-col items-center justify-center px-4"
          >
            <div className="w-full max-w-md bg-black/40 border border-white/5 rounded-2xl p-8 backdrop-blur-xl relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">
              {/* Micro-indicador de diseño SpaceX */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent" />
              
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-center mb-4 text-[#FFD700] shadow-[0_0_20px_rgba(255,215,0,0.05)]">
                  <Terminal size={20} strokeWidth={1.5} />
                </div>
                <h2 className="text-xl font-black tracking-[0.4em] uppercase text-white italic">
                  ACCESS_GATEWAY
                </h2>
                <p className="text-[9px] font-mono text-zinc-500 tracking-widest mt-1 uppercase">
                  Drone DT Ecosystem // Employee Verification
                </p>
              </div>

              {/* Caja informativa de estado del Clúster */}
              <div className="mb-6 p-4 bg-zinc-900/30 border border-white/5 rounded-xl font-mono text-[10px] text-zinc-400 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-zinc-600">SECURITY_LEVEL:</span>
                  <span className="text-[#FFD700] font-bold">RANK_S+ (BOG)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600">UPLINK_STATUS:</span>
                  <span className="text-emerald-500 flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-emerald-500 rounded-full animate-ping" /> READY
                  </span>
                </div>
              </div>

              {/* Botón de Acceso Directo (Sin validación de claves en esta fase) */}
              <button
                onClick={() => setCurrentFlow('DASHBOARD')}
                className="w-full flex items-center justify-center gap-3 bg-[#FFD700] text-black h-12 rounded-xl font-black text-[11px] tracking-[0.3em] uppercase hover:bg-yellow-400 transition-all active:scale-[0.98] shadow-[0_0_30px_rgba(255,215,0,0.15)] group"
              >
                <Cpu size={14} className="group-hover:rotate-90 transition-transform duration-300" />
                INITIALIZE_DASHBOARD
              </button>
            </div>
            
            <p className="absolute bottom-6 font-mono text-[8px] text-zinc-600 tracking-[0.4em] uppercase">
              Nieto Laboratory // Core Production Environment
            </p>dden relative z-10"
          >
            {/* HEADER: Mission Telemetry-12 pr-4 text-[11px] font-mono focus:outline-none focus:border-emerald-500/40 focus:bg-white/[0.05] transition-all placeholder:text-zinc-700 uppercase"
                  />
  );
}