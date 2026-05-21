'use client';

import React, { useState } from 'react';
import { UserStats } from '@/components/users/UserStats';
import { UserRow } from '@/components/users/UserRow';
import { useUserManagement } from '@/hooks/useUserManagement';
import { Preloader } from '@/components/ui/Preloader'; // Asegúrate que esta ruta sea correcta
import { 
  Search, 
  RefreshCw, 
  UserPlus, 
  ShieldAlert,
  Zap,
  Activity
} from 'lucide-react';

/**
 * PAGE: Personnel Control Center (L5)
 * Architecture: No-Scroll Viewport // 310px - 1900px Responsive
 * Logic: Gatekeeper de Preloader -> Dashboard
 */
export default function UsersPage() {
  const { operators, manualRefresh, isLoading } = useUserManagement();
  const [searchTerm, setSearchTerm] = useState('');

  // 1. GATEKEEPER: Si el Hook está en fase de Uplink, mostramos Preloader L5
  if (isLoading) {
    return <Preloader />;
  }

  // Filtrado en tiempo real para eficiencia de datos
  const filteredOperators = operators.filter(op => 
    op.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    op.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col bg-[#080808] text-white overflow-hidden relative">
      
      {/* 1. BACKGROUND LAYER: Micro-grid de precisión */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, #ffffff 0.5px, transparent 0.5px)', 
          backgroundSize: '24px 24px' 
        }} 
      />

      {/* 2. HEADER: Mission Telemetry */}
      <header className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between p-6 lg:px-10 border-b border-white/5 bg-black/40 backdrop-blur-md">
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

      {/* 3. SUB-HEADER: HUD Stats */}
      <section className="relative z-10 px-6 lg:px-10 py-4 bg-zinc-950/50 border-b border-white/5">
        <UserStats />
      </section>

      {/* 4. MAIN CONTENT: Internal Scroll Area */}
      <main className="relative z-10 flex-1 overflow-hidden flex flex-col px-4 lg:px-10 py-4">
        
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
          {filteredOperators.length > 0 ? (
            <div className="divide-y divide-white/5">
              {filteredOperators.map((op, idx) => (
                <UserRow key={op._id} operator={op} index={idx} />
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-zinc-600 animate-in fade-in duration-700">
              <ShieldAlert size={40} strokeWidth={1} className="mb-4 opacity-20" />
              <span className="font-mono text-[10px] tracking-widest uppercase">No_Operators_Found_In_This_Sector</span>
            </div>
          )}
        </div>
      </main>

      {/* 5. FOOTER: System Status Bar */}
      <footer className="relative z-10 h-10 bg-black border-t border-white/5 px-6 lg:px-10 flex items-center justify-between text-[9px] font-mono text-zinc-500 tracking-widest uppercase">
        <div className="flex gap-6">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]" />
            NODE: BOG_S1
          </span>
          <span className="hidden sm:inline flex items-center gap-2">
            <Activity size={10} className="text-zinc-700" /> UPLINK: ACTIVE
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={manualRefresh}
            className="hover:text-emerald-500 flex items-center gap-2 transition-colors group"
          >
            <RefreshCw size={12} 
  );
}