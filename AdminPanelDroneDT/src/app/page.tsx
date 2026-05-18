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
        <div className=dient(circle, #ffffff 0.5px, transparent 0.5px)', 
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

              type="text"
>
          <div className="col-span-2 text-center">SYS
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