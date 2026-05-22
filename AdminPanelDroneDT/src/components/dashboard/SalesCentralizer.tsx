'use client';

import React from 'react';
import { BarChart3, ArrowUpRight, ShieldCheck } from 'lucide-react';

export function SalesCentralizer() {
  // Datos simulados de telemetría de ventas para mantener la estética SpaceX / MERN
  const salesData = [
    { model: 'Drone Alpha DT', units: 342, status: 'OPTIMAL' },
    { model: 'Drone Bravo Quad', units: 198, status: 'STABLE' },
    { model: 'Telemetry Hub Pro', units: 512, status: 'OPTIMAL' },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 bg-zinc-950/40 rounded-xl border border-white/5 font-mono min-h-[220px]">
      {/* Cabecera del Componente */}
      <div className="flex items-center justify-between w-full border-b border-white/5 pb-2">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-zinc-400 uppercase">
          <BarChart3 size={14} className="text-[#FFD700]" />
          <span>SALES_CENTRALIZER_STREAM</span>
        </div>
        <span className="text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded uppercase font-bold tracking-widest animate-pulse">
          LIVE_DATA
        </span>
      </div>

      {/* Cuerpo principal / Lista de flujos de venta */}
      <div className="flex-1 my-3 flex flex-col gap-2 overflow-y-auto">
        {salesData.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-2 bg-white/[0.01] border border-white/5 rounded-lg hover:border-white/10 transition-colors"
          >
            <div className="flex flex-col">
              <span className="text-[11px] text-white font-bold tracking-tight">{item.model}</span>
              <span className="text-[8px] text-zinc-500 uppercase tracking-widest">Model Link Asset</span>
            </div>
            <div className="text-right flex items-center gap-3">
              <div className="flex flex-col">
                <span className="text-[11px] text-[#FFD700] font-bold">{item.units} <span className="text-[8px] text-zinc-500">U</span></span>
                <span className="text-[7px] text-emerald-400 font-mono tracking-tighter flex items-center gap-1 justify-end">
                  <ShieldCheck size={8} /> {item.status}
                </span>
              </div>
              <ArrowUpRight size={12} className="text-zinc-600" />
            </div>
          </div>
        ))}
      </div>

      {/* Footer del Módulo */}
      <div className="w-full pt-2 border-t border-white/5 flex justify-between items-center text-[8px] text-zinc-500 tracking-wider uppercase">
        <span>Total Processed: 1,052 Units</span>
        <span className="text-zinc-600">ID: TX_STREAM_01</span>
      </div>
    </div>
  );
}