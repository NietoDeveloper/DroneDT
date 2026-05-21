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
            </p>
          </motion.div>
        )}

        {/* INTERFAZ 2: CONTROL CENTER DASHBOARD (MÓDULO OPERADORES) */}
        {currentFlow === 'DASHBOARD' && (
          <motion.div
            key="dashboard-interface"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex-1 flex flex-col overflow-hidden relative z-10"
          >
            {/* HEADER: Mission Telemetry */}
            <header className="flex flex-col lg:flex-row lg:items-center justify-between p-6 lg:px-10 border-b border-white/5 bg-black/40 backdrop-blur-md">
              <div className="mb-4 lg:mb-0">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-6 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-pulse" />
                  <h1 className="text-2xl lg:text-3xl font-black tracking-tighter uppercase italic">
                    OPERATORS_HUB
                  </h1>
                </div>
                <p className="text-[10px] font-mono text-zinc-500 tracking-[0.4em] mt-1 ml-5 uppercase">
                  Nieto_Laboratory // Security_Level_S+
                </p>
              </div>

              <div className="flex items-center gap-3 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-80 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" />
                  <input 
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="SEARCH_OPERATOR_CREDENTIALS..." 
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-[11px] font-mono focus:outline-none focus:border-emerald-500/40 focus:bg-white/[0.05] transition-all placeholder:text-zinc-700 uppercase"
                  />
                </div>
                
                <button className="hidden sm:flex items-center gap-2 bg-emerald-500 text-black px-4 py-3 rounded-xl font-black text-[10px] tracking-widest hover:bg-emerald-400 hover:-translate-y-0.5 transition-all active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  <UserPlus size={16} strokeWidth={3} />
                  <span className="hidden xl:inline">REGISTER_NEW</span>
                </button>
              </div>
            </header>

            {/* SUB-HEADER: HUD Stats */}
            <section className="px-6 lg:px-10 py-4 bg-zinc-950/50 border-b border-white/5">
              <UserStats />
            </section>

            {/* MAIN CONTENT: Internal Scroll Area */}
            <main className="flex-1 overflow-hidden flex flex-col px-4 lg:px-10 py-4">
              {/* Table Head (Industrial Design) */}
              <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 border border-white/5 rounded-t-xl bg-white/[0.02] text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em]">
                <div className="col-span-5 flex items-center gap-2">
                  <Zap size={10} className="text-emerald-500" /> OPERATOR_IDENTITY
                </div>
                <div className="col-span-2">ACCESS_LEVEL</div>
                <div className="col-span-2 text-center">LAST_UPLINK</div>
                <div className="col-span-2 text-center">SYSTEM_STATUS</div>
                <div className="col-span-1 text-right">MGMT</div>
              </div>

              {/* Scrollable Container */}
              <div className="flex-1 overflow-y-auto custom-scrollbar border-x border-b border-white/5 rounded-b-xl bg-black/20 backdrop-blur-sm">
                {hookLoading ? (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-500 font-mono text-[10px] tracking-widest uppercase">
                    <RefreshCw size={18} className="animate-spin mb-3 text-emerald-500" />
                    FETCHING_CLUSTER_DATA...
                  </div>
                ) : filteredOperators.length > 0 ? (
                  <div className="divide-y divide-white/5">
                    {filteredOperators.map((op, idx) => (
                      <UserRow key={op._id || idx} operator={op} index={idx} />
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-600">
                    <ShieldAlert size={40} strokeWidth={1} className="mb-4 opacity-20" />
                    <span className="font-mono text-[10px] tracking-widest uppercase">No_Operators_Found_In_This_Sector</span>
                  </div>
                )}
              </div>
            </main>

            {/* FOOTER: System Status Bar */}
            <footer className="h-10 bg-black border-t border-white/5 px-6 lg:px-10 flex items-center justify-between text-[9px] font-mono text-zinc-500 tracking-widest uppercase relative z-20">
              <div className="flex gap-6">
                <sp
  );
}