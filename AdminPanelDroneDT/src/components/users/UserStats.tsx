'use client';

import React from 'react';
import { Users, ShieldCheck, Zap, Activity } from 'lucide-react';
import { useUserStore } from '@/store/useUserStore';

/**
 * COMPONENT: UserStats
 * Estilo: SpaceX Industrial HUD
 */
export const UserStats = () => {
  const operators = useUserStore((state) => state.operators);
  
  const stats = [
    {
      label: 'TOTAL_OPERATORS',
      value: operators.length.toString().padStart(2, '0'),
      icon: <Users className="w-4 h-4 text-emerald-500" />,
      color: 'text-emerald-500'
    },
    {
      label: 'ACTIVE_UPLINKS',
      value: operators.filter(o => o.status === 'ACTIVE').length.toString().padStart(2, '0'),
      icon: <Activity className="w-4 h-4 text-blue-500" />,
      color: 'text-blue-500'
    },
    {
      label: 'SECURITY_L5',
      value: operators.filter(o => o.clearanceLevel >= 4).length.toString().padStart(2, '0'),
      icon: <ShieldCheck className="w-4 h-4 text-purple-500" />,
      color: 'text-purple-500'
    },
    {
      label: 'SYSTEM_LOAD',
      value: '24%',
      icon: <Zap className="w-4 h-4 text-amber-500" />,
      color: 'text-amber-500'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-white/10 bg-black/50 backdrop-blur-md">
      {stats.map((stat, idx) => (
        <div 
          key={stat.label} 
          className={`p-4 lg:p-6 flex flex-col gap-2 border-r border-white/5 ${idx === 3 ? 'lg:border-r-0' : ''}`}
        >
          <div className="flex items-center gap-2">
            {stat.icon}
            <span className="text-[9px] lg:text-[11px] font-black tracking-[0.2em] text-zinc-500 uppercase">
              {stat.label}
            </span>
          </div>
          <div className={`text-xl lg:text-3xl font-black ${stat.color} font-mono tracking-tighter`}>
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
};