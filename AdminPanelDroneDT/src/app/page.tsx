'use client';

import React, { useState } from 'react';
import { UserStats } from '@/components/users/UserStats';
import { UserRow } from '@/components/users/UserRow';
import { useUserManagement } from '@/hooks/useUserManagement';
import { 
  Search, 
  Filter, 
  RefreshCw, 
  UserPlus, 
  ShieldAlert,
  Zap
} from 'lucide-react';

/**
 * PAGE: Personnel Control Center (L5)
 * Architecture: No-Scroll Viewport // 310px - 1900px Responsive
 * Design: SpaceX / Industrial Laboratory Aesthetics
 */
export default function UsersPage() {
  const { operators, manualRefresh, isLoading } = useUserManagement();
  const [searchTerm, setSearchTerm] = useState('');

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
            <div className="w-2 h-6 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
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
          
          <button className="hidden sm:flex items-center gap-2 bg-emerald-500 text-black px-4 py-3 rounded-xl font-black text-[10px] tracking-widest hover:bg-emerald-400 hover:-translate-y-0.5 transition-all active:scale-95">
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
        
        {/* Table Head (Solo visible en desktop para orden industrial) */}
        <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 border border-white/5 rounded-t-xl bg-white/[0.02] text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em]">
          <div className="col-span-5 flex items-center gap-2">
            <Zap size={10} className="text-emerald-500" /> OPERATOR_IDENTITY
          </div>
          <div className="col-span-2">ACCESS_LEVEL</div>
          <div className="col-span-2 text-center">LAST_UPLINK</div>
          <div className="col-span-2 text-center">SYSTEM_STATUS</div>
          <div className="col-span-1 text-right">MGMT</div>
        </div>

        {/* Scrollable Container */}uppercase">Syncing_Nodes...</span>
            </div>
          ) : filteredOperators.length > 0 ? (
            <div className="divide-y divide-dx} />
              ))}
            NODE: BOG_S1n>
        </div>ion-500'}`} />
            REFRESH_SYSTEM
          </button>
    

    </div>
  );
}