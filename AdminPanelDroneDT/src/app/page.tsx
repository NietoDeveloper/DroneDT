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
            key="login-interface"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, filter: 'blur(12px)', y: -15 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="flex-1 z-10 flex flex-col items-center justify-center px-4 w-full h-full overflow-hidden"
          >
            <div className="w-full max-w-sm sm:max-w-md bg-zinc-950/40 border border-white/5 rounded-2xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)]">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FFD700]/40 to-transparent" />
              
              <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
                <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-center mb-4 text-[#FFD700]">
                  <Logo />
                </div>
                <h2 className="text-lg sm:text-xl font-black tracking-[0.3em] sm:tracking-[0.4em] uppercase text-white italic">
                  ACCESS_GATEWAY
                </h2>
                <p className="text-[8px] sm:text-[9px] text-zinc-500 tracking-widest mt-1 uppercase">
                  Drone DT Ecosystem // Secure Link
                </p>
              </div>

              <div className="mb-6 p-4 bg-zinc-900/20 border border-white/5 rounded-xl text-[10px] text-zinc-400 space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-600">CLUSTER_SECURITY:</span>
                  <span className="text-[#FFD700] font-bold">MAX_LOCK (S+)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600">WORKSPACE:</span>
                  <span className="text-zinc-300">NIETO_LAB_CORE</span>
                </div>
              </div>

              <button
                onClick={() => setCurrentFlow('DASHBOARD')}
                className="w-full flex items-center justify-center gap-3 bg-[#FFD700] text-black h-12 rounded-xl font-black text-[11px] tracking-[0.2em] sm:tracking-[0.25em] uppercase hover:bg-yellow-400 transition-all active:scale-[0.98] shadow-[0_0_30px_rgba(223,190,0,0.15)] group"
              >
                <Cpu size={14} className="group-hover:rotate-90 transition-transform duration-300" />
                INITIALIZE_SYSTEM_UPLINK
              </button>
            </div>
          </motion.div>
        )}

        {/* INTERFAZ 2: CONTROL CENTER DASHBOARD COMPLETAMENTE RESPONSIVO */}
        {currentFlow === 'DASHBOARD' && (
          <motion.div
            key="dashboard-interface"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex overflow-hidden relative z-10 w-full h-full"
          >
            {/* COMPONENTE: SIDEBAR */}
            <Sidebar />

            {/* PANEL DE CONTROL CENTRAL */}
            <div className="flex-1 flex flex-col overflow-hidden h-full w-full">
              
              {/* TELEMETRÍA Y CABECERA FLUIDA */}
              <header className="flex items-center justify-between fluid-header border-b border-white/5 bg-black/40 backdrop-blur-md w-full">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center">
                    <Logo />
                  </div>
                  <div>
                    <h1 className="fluid-text-title font-black tracking-tighter uppercase italic text-white leading-none">
                      DRONE_DT_MASTER_CONTROL
                    </h1>
                    <p className="text-[8px] sm:text-[9px] text-zinc-500 tracking-[0.2em] sm:tracking-[0.3em] uppercase mt-1">
                      Nieto_Laboratory // Production_Environment
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-[9px] sm:text-[10px] text-zinc-400 bg-white/[0.02] border border-white/5 px-2 sm:px-4 py-1.5 sm:py-2 rounded-xl">
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="hidden xs:inline">SYS_TIME:</span> <span className="text-white font-bold">{systemTime}</span>
                  </span>
                </div>
              </header>

              {/* HUD DE MÉTRICAS CORE: AJUSTADO A RESPONSIVE EXTREMO */}
              <section className="fluid-hud grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 bg-zinc-950/40 border-b border-white/5 font-mono w-full">
                <div className="bg-white/[0.01] border border-white/5 p-3 rounded-xl flex flex-row sm:flex-col justify-between items-center sm:items-start">
                  <div className="flex items-center gap-2 text-zinc-500 text-[9px] tracking-widest uppercase">
                    <Package size={12} className="text-[#FFD700]" /> UNITS_AVAILABLE
                  </div>
                  <div className="fluid-text-metric font-black text-[#FFD700] tracking-tight sm:mt-1">
                    {productMetrics.totalDisponibles} <span className="text-[9px] font-normal text-zinc-500">U</span>
                  </div>
                </div>
                
                <div className="bg-white/[0.01] border border-white/5 p-3 rounded-xl flex flex-row sm:flex-col justify-between items-center sm:items-start">
                  <div className="flex items-center gap-2 text-zinc-500 text-[9px] tracking-widest uppercase">
                    <TrendingUp size={12} className="text-emerald-400" /> UNITS_SOLD
                  </div>
                  <div className="fluid-text-metric font-black text-emerald-400 tracking-tight sm:mt-1">
                    {productMetrics.totalVendidas} <span className="text-[9px] font-normal text-zinc-500">QTY</span>
                  </div>
                </div>

                <div className="bg-white/[0.01] border border-white/5 p-3 rounded-xl flex flex-row sm:flex-col justify-between items-center sm:items-start">
                  <div className="flex items-center gap-2 text-zinc-500 text-[9px] tracking-widest uppercase">
                    <Layers size={12} className="text-zinc-400" /> FLI_EFFICIENCY
                  </div>
                  <div className="fluid-text-metric font-black text-white tracking-tight sm:mt-1">
                    {productMetrics.eficienciaFlota}
                  </div>
                </div>
              </section>

              {/* RETÍCULA BENTO RESTRINGIDA CON SCROLL INTERNO CONTROLADO EN MOBILE */}
              <main className="flex-1 fluid-main overflow-y-auto lg:overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max lg:auto-rows-fr h-full w-full content-start">
                
                {/* BLOQUE DE VENTAS / CENTRAL DE FLUJO CON NOMBRE CORREGIDO */}
                <div className="md:col-span-2 lg:col-span-2 bg-zinc-950/20 border border-white/5 rounded-xl p-2 overflow-hidden flex flex-col justify-between min-h-[220px] lg:min-h-0">
                  <SalesCentralizer />
                </div>

                {/* ESCUDO ANTE EXCEPCIONES Y MONITOR SKELETON */}
                <div className="bg-zinc-950/20 border border-white/5 rounded-xl p-4 flex flex-col gap-3 justify-between overflow-hidden min-h-[200px] lg:min-h-0">
                  {isSystemChecking ? (
                    <DroneSkeleton />
                  ) : (
                    <ErrorShield />
                  )}
                </div>

                {/* MÓDULO CORE DE INVENTARIO DIGITAL TWIN CON NOMBRE CORREGIDO */}
                <div className="md:col-span-2 lg:col-span-2 bg-zinc-950/20 border border-white/5 rounded-xl p-2 overflow-hidden flex flex-col justify-between min-h-[220px] lg:min-h-0">
                  <InventoryGrid />
                </div>

                {/* SECCIÓN DE PRODUCTOS E INVENTARIO RÁPIDO */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 overflow-hidden">
                  <div className="bg-zinc-950/20 border border-white/5 rounded-xl p-1 overflow-hidden min-h-[110px] lg:min-h-0">
                    <InventoryCard />
                  </div>
                  <div className="bg-zinc-950/20 border border-white/5 rounded-xl p-1 overflow-hidden min-h-[110px] lg:min-h-0">
                    <DroneCard />
                  </div>
                </div>

              </main>

              {/* PIE DE PÁGINA PERIFÉRICO */}
              <footer className="h-10 bg-black border-t border-white/5 px-4 sm:px-6 flex items-center justify-between text-[9px] font-mono text-zinc-500 tracking-widest uppercase relative z-20 w-full shrink-0">
                <div className="flex gap-4 sm:gap-6">
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#FFD700] rounded-full shadow-[0_0_8px_#FFD700]" />
                    NODE: BOG_MASTER_S1
                  </span>
                  <span className="hidden md:flex items-center gap-2">
                    <Activity size={10} className="text-zinc-700" /> UPLINK: ACTIVE
                  </span>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                  <button 
                    onClick={triggerManualHealthCheck}
                    className="hover:text-[#FFD700] flex items-center gap-2 transition-colors group text-zinc-400"
                  >
                    <RefreshCw size={12} className={`${isSystemChecking ? 'animate-spin' : 'group-hover:rotate-180'} transition-transform duration-500`} />
                    <span className="hidden xs:inline">CALIBRATE_TWIN</span>
                  </button>
                  <span className="text-zinc-800">|</span>
                  <span>NIETO_LAB_CORE_V2.6</span>
                </div>
              </footer>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INYECCIÓN DE ESTILOS DE PRECISIÓN MILIMÉTRICA */}
      <style jsx global>{`
        :root {
          --fluid-min-width: 310px;
          --fluid-max-width: 1900px;
        }

        .fluid-container {
          font-size: clamp(11px, 0.7vw + 7px, 15px);
        }

        .fluid-header {
          padding-top: clamp(10px, 1vw + 2px, 20px);
          padding-bottom: clamp(10px, 1vw + 2px, 20px);
          padding-left: clamp(12px, 2vw + 4px, 32px);
          padding-right: clamp(12px, 2vw + 4px, 32px);
        }

        .fluid-hud {
          padding-top: clamp(8px, 0.6vw + 2px, 14px);
          padding-bottom: clamp(8px, 0.6vw + 2px, 14px);
          padding-left: clamp(12px, 2vw + 4px, 32px);
          padding-right: clamp(12px, 2vw + 4px, 32px);
        }

        .fluid-main {
          padding: clamp(8px, 1vw + 2px, 20px);
        }

        .fluid-text-title {
          font-size: clamp(12px, 1vw + 8px, 24px);
        }

        .fluid-text-metric {
          font-size: clamp(16px, 1.5vw + 10px, 32px);
          line-height: 1;
        }


    </div>
  );
}