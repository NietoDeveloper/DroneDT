'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, MapPin, Radio, MoreVertical, Terminal } from 'lucide-react';
import { Operator } from '@/store/useUserStore';

interface UserRowProps {
  operator: Operator;
  index: number;
}

/**
 * COMPONENT: UserRow
 * Design: High-Density Telemetry Row
 * Range: 310px - 1900px
 */
export const UserRow = ({ operator, index }: UserRowProps) => {
  
  const statusColors = {
    ACTIVE: 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]',
    IDLE: 'bg-amber-500',
    OFFLINE: 'bg-zinc-700',
    SUSPENDED: 'bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.4)]'
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 lg:p-5 border-b border-white/5 hover:bg-emerald-500/[0.02] transition-all relative overflow-hidden"
    >
      {/* Indicador de Status Lateral */}
      <div className={`absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity ${statusColors[operator.status]}`} />

      {/* BLOQUE 1: IDENTIDAD CORE */}
      <div className="flex items-center gap-4 w-full sm:w-[35%]">
        <div className="relative">
          <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center overflow-hidden group-hover:border-emerald-500/50 transition-all">
            {operator.avatar ? (
              <img src={operator.avatar} alt={operator.name} className="w-full h-full object-cover opacity-80" />
            ) : (
              <Terminal className="text-zinc-700 group-hover:text-emerald-500 w-5 h-5 transition-colors" />
            )}
          </div>
          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-black ${statusColors[operator.status]}`} />
        </div>
        
        <div className="flex flex-col">
          <h4 className="text-[12px] lg:text-[14px] font-black text-white group-hover:text-emerald-400 transition-colors uppercase tracking-tight">
            {operator.name}
          </h4>
          <span className="text-[9px] lg:text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
            {operator.email}
          </span>
        </div>
      </div>

      {/* BLOQUE 2: RANGO Y SEGURIDAD (Desktop Visible) */}
      <div className="hidden lg:flex flex-col w-[20%]">
        <div className="flex items-center gap-2">
          <Shield className="w-3 h-3 text-zinc-600" />
          <span className="text-[10px] font-black text-zinc-400 uppercase tracking-tighter">
            {operator.role.replace('_', ' ')}
          </span>
        </div>
        <div className="flex gap-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className={`h-1 w-4 rounded-full ${i < operator.clearanceLevel ? 'bg-emerald-500/60' : 'bg-zinc-800'}`} 
            />
          ))}
        </div>
      </div>

      {/* BLOQUE 3: LOCALIZACIÓN Y UPLINK */}
      <div className="flex sm:flex-row items-center gap-4 sm:gap-8 mt-3 sm:mt-0 w-full sm:w-[40%] justify-between sm:justify-end">
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1.5 text-zinc-500">
            <MapPin className="w-3 h-3" />
            <span className="text-[9px] lg:text-[11px] font-bold uppercase">{operator.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-700 mt-0.5">
            <Radio className="w-3 h-3 animate-pulse text-emerald-900" />
            <span className="text-[8px] font-mono uppercase tracking-tighter">
              SYNC_{new Date(operator.lastUplink).toLocaleTimeString()}
            </span>
          </div>
        </div>

        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors group/btn">
          <MoreVertical className="w-4 h-4 text-zinc-600 group-hover/btn:text-white" />
        </button>
      </div>
    </motion.div>
  );
};