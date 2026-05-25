'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Search, Activity, Terminal, Layers, Cpu, WifiOff, Plus, ShieldCheck, Lock, ArrowRight, Server, Eye, EyeOff } from 'lucide-react';
import { StatsPanel } from '@/components/dashboard/StatsPanel';
import { InventoryCard } from '@/components/dashboard/InventoryCard';
import { DroneSkeleton } from '@/components/dashboard/DroneSkeleton';
import { ErrorShield } from '@/components/dashboard/ErrorShield';
import { useRealTimeInventory } from '@/hooks/useRealTimeInventory';
import { useInventoryStore } from '@/store/useInventoryStore';

/**
 * ARCHIVO: src/app/dashboard/page.tsx
 * PROYECTO: Drone DT (Ecosistema de Misión Crítica)
 * AUTORÍA: Creado por Software DT / Manuel Nieto (nietodeveloper)
 * LABORATORIO: Nieto Laboratory (Bogotá, Colombia)
 * OPTIMIZACIÓN: High-Performance Desktop (Layout Adaptable 310px - 1900px)
 * CONTROL DE FLUJO: Preloader -> Autenticación Uplink -> Dashboard Cuántico L5
 */

type FlowState = 'PRELOADER' | 'LOGIN' | 'DASHBOARD';

export default function DashboardPage() {
  // --- CONTROL DE FLUJO INTERNO (MÁQUINA DE ESTADOS) ---
  const [currentFlow, setCurrentFlow] = useState<FlowState>('PRELOADER');
  const [progress, setProgress] = useState(0);
  
  // Estados para el Login de Acceso Seguro
  const [accessKey, setAccessKey] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // --- HOOKS Y STORES DEL ECOSISTEMA DRONE DT ---
  const products = useInventoryStore((state) => state.products);
  const loading = useInventoryStore((state) => state.isLoading);
  const error = useInventoryStore((state) => state.error);
  
  const { manualSync, isRetrying, status } = useRealTimeInventory(15000);
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Efecto del Preloader Industrial (Nieto Laboratory)
  useEffect(() => {
    if (currentFlow !== 'PRELOADER') return;
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setCurrentFlow('LOGIN'), 400); // Transición limpia al Login
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [currentFlow]);

  // 2. Manejador de Autenticación de Operador
  const handleUplinkAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessKey.trim()) return;

    setIsAuthenticating(true);
    setLoginError(false);

    // Simulación de handshake con el doble cluster de seguridad
    setTimeout(() => {
      if (accessKey === 'admin' || accessKey === 'nieto_l5_secure') {
        setCurrentFlow('DASHBOARD');
      } else {
        setLoginError(true);
        setIsAuthenticating(false);
      }
    }, 1200);
  };

  // 3. Filtrado en tiempo real del inventario del Gemelo Digital
  const filteredDrones = useMemo(() => {
    return products.filter(p => 
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p._id?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  // =========================================================================
  // VISTA A: PRELOADER CUÁNTICO
  // =========================================================================
  if (currentFlow === 'PRELOADER') {
    return (
      <div className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center font-mono z-50 select-none px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-950/20 via-black to-black opacity-70" />
        
        <div className="relative w-full max-w-[450px] flex flex-col items-center text-center">
          <Cpu className="w-10 h-10 text-emerald-500 animate-pulse mb-6" />
          
          <h2 className="text-sm font-black tracking-[0.4em] uppercase text-white mb-1">
            SOFTWARE_<span className="text-emerald-500">DT</span>
          </h2>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-10 italic">
            Nieto Laboratory // Inicializando Sistema
          </p>

          <div className="w-full bg-zinc-950 border border-white/10 h-2 p-0.5 rounded-none mb-4 overflow-hidden">
            <div 
              className="h-full bg-emerald-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="w-full flex justify-between text-[9px] uppercase font-bold text-zinc-500">
            <span className="animate-pulse tracking-widest">
              {progress < 40 && '» BOOTING_KERNEL'}
              {progress >= 40 && progress < 80 && '» ENLAZANDO_DOUBLE_CLUSTER'}
              {progress >= 80 && '» INTEGRITY_CHECK_OK'}
            </span>
            <span className="text-emerald-400 font-mono font-black">{progress}%</span>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VISTA B: LOGIN DE ACCESO MÁXIMA SEGURIDAD
  // =========================================================================
  if (currentFlow === 'LOGIN') {
    return (
      <div className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center font-mono z-50 px-4">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.9),rgba(0,0,0,0.95)),fn] pointer-events-none" />
        
        <div className="relative w-full max-w-[400px] border border-white/10 bg-zinc-950/50 p-6 lg:p-8 backdrop-blur-md">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
            <Lock className="w-5 h-5 text-emerald-500" />
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-white">DRONE_DT // ACCESS_UPLINK</h3>
              <p className="text-[9px] text-zinc-500 uppercase font-bold">Por Manuel Nieto</p>
            </div>
          </div>

          <form onSubmit={handleUplinkAuth} className="space-y-4">
            <div>
              <label className="block text-[9px] uppercase font-black text-zinc-400 tracking-wider mb-2">
                Llave de Acceso Operador:
              </label>
              <div className="relative flex items-center bg-black border border-white/10 focus-within:border-emerald-500/50 transition-all">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={accessKey}
                  onChange={(e) => {
                    setAccessKey(e.target.value);
                    if (loginError) setLoginError(false);
                  }}
                  disabled={isAuthenticating}
                  placeholder="INTRODUCIR_KEY_DE_ACCESO"
                  className="w-full bg-transparent text-xs p-3 outline-none text-emerald-400 uppercase placeholder:text-zinc-800 font-bold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-3 text-zinc-600 hover:text-zinc-400 transition-colors"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="p-3 bg-red-950/30 border border-red-500/20 text-red-400 text-[10px] uppercase font-black tracking-tighter">
                [ERROR_AUTH]: Firma digital no válida en Node_Bogotá.
              </div>
            )}

            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full h-11 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50"
            >
              {isAuthenticating ? (
                <>
                  <Server className="w-4 h-4 animate-spin" />
                  SINCRO_DOUBLE_CLUSTER...
                </>
              ) : (
                <>
                  AUTENTICAR_OPERADOR
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/5 flex justify-between text-[8px] text-zinc-600 uppercase font-bold">
            <span>Sec_Arch: L5_Double_Cluster</span>
            <span>Nieto_Lab_v1.2</span>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VISTA C: COMPONENTE CENTRAL DASHBOARD (HASTA 1900PX)
  // =========================================================================
  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col overflow-hidden font-mono selection:bg-emerald-500/30">
      
      {/* 1. BARRA DE CONTROL SUPERIOR (HUD) */}
      <div className="h-[30px] lg:h-[40px] flex-shrink-0 flex items-center justify-between bg-zinc-950 border-b border-white/10 px-3 lg:px-6">
        <div className="flex items-center gap-2 lg:gap-4 cursor-pointer hover:opacity-80 transition-opacity">
          <Cpu className="w-3 h-3 lg:w-5 lg:h-5 text-emerald-500" />
          <h1 className="text-[11px] lg:text-[14px] font-black tracking-tighter leading-none text-white uppercase">
            DRONE_<span className="text-emerald-500">DT</span>
          </h1>
          <span className="hidden sm:inline text-[8px] lg:text-[10px] text-zinc-600 uppercase border-l border-white/10 pl-2 lg:pl-4 ml-1 italic tracking-[0.2em]">
            Escudo_Aéreo_Nieto_Lab
          </span>
        </div>
        
        <div className="flex items-center h-full">
          <button 
            onClick={() => manualSync()} 
            disabled={loading}
            className={`h-full px-4 lg:px-8 border-l border-white/5 transition-all group flex items-center gap-2 lg:gap-4 ${loading ? 'opacity-50' : 'hover:bg-emerald-500/10'}`}
          >
            <span className="text-[8px] lg:text-[11px] text-zinc-500 group-hover:text-emerald-400 hidden sm:inline uppercase font-black tracking-widest">Resync_Uplink</span>
            <Activity className={`${loading ? 'animate-spin text-emerald-500' : 'text-zinc-500 group-hover:text-emerald-500'} w-3 h-3 lg:w-4 lg:h-4`} />
          </button>
          
          <div className="h-full px-3 lg:px-6 border-l border-white/5 flex items-center bg-emerald-500/[0.03]">
            <div className={`w-1.5 h-1.5 lg:w-3 lg:h-3 rounded-full transition-all duration-500 ${error ? 'bg-red-600 shadow-[0_0_12px_red]' : 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]'}`} />
          </div>
        </div>
      </div>

      {/* 2. PANEL DE ESTADÍSTICAS */}
      <div className="flex-shrink-0 border-b border-white/10 bg-black">
        <StatsPanel />
      </div>

      {/* 3. NÚCLEO DEL ESPACIO DE TRABAJO */}
      <div className="flex-1 min-h-0 flex overflow-hidden">
        
        {/* COLUMNA CENTRAL: GRID DE LA FLOTA */}
        <div className="flex-1 min-w-0 flex flex-col border-r border-white/10">
          <div className="h-[32px] lg:h-[48px] flex-shrink-0 flex items-center justify-between px-3 lg:px-6 bg-zinc-900/40 border-b border-white/5">
            <div className="flex items-center gap-2 lg:gap-4">
              <Layers className="text-emerald-500/50 w-3 h-3 lg:w-5 lg:h-5" />
              <span className="text-[9px] lg:text-[12px] font-black uppercase tracking-[0.3em] text-zinc-400">Transmisión_de_Inventario</span>
              {loading && <span className="text-[7px] lg:text-[10px] text-emerald-500 animate-pulse ml-2 font-bold italic">_SCANNING_HANGAR_01</span>}
            </div>
            
            <div className="flex items-center h-full bg-black/40 px-3 lg:px-6 border-l border-white/5 group focus-within:bg-black/80 transition-all">
              <Search className="text-zinc-600 group-focus-within:text-emerald-500 w-3 h-3 lg:w-4 lg:h-4" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="BUSCAR_UNIDAD_ID" 
                className="bg-transparent text-[9px] lg:text-[12px] outline-none w-24 sm:w-48 lg:w-64 ml-3 text-emerald-400 uppercase placeholder:text-zinc-800 font-bold" 
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 lg:p-8 custom-scrollbar bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-900/20 via-black to-black">
            
            {error && products.length === 0 ? (
              <div className="h-full flex items-center justify-center p-10">
                <ErrorShield message="ENLACE_CON_CLUSTER_CAÍDO" retry={manualSync} />
              </div>
            ) : (
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 lg:gap-8">
                {loading && products.length === 0 ? (
                  Array.from({length: 8}).map((_, i) => (
                    <DroneSkeleton key={`drone-loading-slot-${i}`} />
                  ))
                ) : (
                  filteredDrones.map((item) => (
                    <InventoryCard key={item._id || item.id} product={item} />
                  ))
                )}

                {!loading && filteredDrones.length === 0 && (
                  <div className="col-span-full py-48 text-center opacity-20">
                    <span className="text-[14px] lg:text-[20px] font-black uppercase tracking-[0.8em] block">Radar_Limpio</span>
                    <span className="text-[10px] lg:text-[12px] mt-4 block">No se detectan unidades con esos parámetros</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* COLUMNA DERECHA: PANEL DE CONTROL INDUSTRIAL */}
        <aside className="hidden lg:flex lg:w-[250px] xl:w-[350px] flex-shrink-0 flex-col bg-black">
          <button className="h-[60px] lg:h-[80px] w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black text-[11px] lg:text-[14px] uppercase tracking-[0.3em] transition-all active:scale-[0.98] flex items-center justify-center gap-3">
            <Plus className="w-4 h-4 lg:w-6 lg:h-6" strokeWidth={4} />
            REGISTRAR_DRONE
          </button>

          <div className="flex-1 flex flex-col min-h-0 border-t border-white/10">
            <div className="h-[30px] lg:h-[45px] px-4 flex items-center gap-2 bg-zinc-950 border-b border-white/5">
              <Terminal className="text-emerald-500 w-3 h-3 lg:w-4 lg:h-4" />
              <span className="text-[9px] lg:text-[11px] text-zinc-400 font-black tracking-widest uppercase">Logs_de_Sistema</span>
            </div>
            <div className="flex-1 overflow-hidden p-4 lg:p-6 font-mono text-[9px] lg:text-[12px] text-zinc-600 leading-relaxed bg-black/50 uppercase">
              <div className="space-y-2 lg:space-y-4">
                <p className="truncate text-emerald-500/80"><span className="text-emerald-800">»</span> STATUS: {status}</p>
                <p className="truncate"><span className="text-zinc-800">»</span> {loading ? 'SCAN_SEQUENCE_ACTIVE' : 'SYSTEM_READY'}</p>
                <p className="truncate"><span className="text-zinc-800">»</span> ARCH: NIETO_L5_SECURE</p>
                {isRetrying && <p className="text-red-500 animate-pulse truncate"><span className="mr-1">!</span> UPLINK_RETRY_ACTIVE</p>}
              </div>
              
              <div className="mt-12 p-4 border border-white/5 bg-zinc-950/50 rounded-lg">
                <div className="text-[8px] lg:text-[10px] text-zinc-500 mb-2 font-black tracking-tighter">DATA_STREAM_LOAD:</div>
                <div className="w-full h-1.5 lg:h-3 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                  <div className={`h-full bg-emerald-500 transition-all duration-1000 ${loading ? 'w-[85%]' : 'w-[15%]'}`} />
                </div>
              </div>
            </div>
          </div>

          <div className="h-32 lg:h-48 border-t border-white/5 bg-zinc-950/20 p-6 flex flex-col justify-center items-center opacity-30 select-none">
             <ShieldCheck size={24} className="text-emerald-600 mb-3 animate-pulse" />
             <span className="text-[8px] lg:text-[10px] text-zinc-500 uppercase font-black tracking-[0.3em] text-center leading-relaxed">
               Nieto Laboratory<br/>
               <span className="text-zinc-700 text-[7px]">Core Architecture por Manuel Nieto</span>
             </span>
          </div>
        </aside>
      </div>

      {/* 4. FOOTER INDUSTRIAL */}
      <footer className="h-[24px] lg:h-[32px] flex-shrink-0 flex items-center justify-between px-6 bg-zinc-950 border-t border-white/10">
        <div className="flex gap-6 text-[8px] lg:text-[10px] text-zinc-700 font-black uppercase tracking-tighter">
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-zinc-800 rounded-full" /> CLUSTER: RAILWAY_L5</span>
          <span className="hidden md:inline text-emerald-900/60">NODE: BOGOTÁ_SOUTH_PRIMARY</span>
        </div>

      </footer>
    </div>
  );
}