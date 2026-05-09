'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useInventoryStore } from '@/store/useInventoryStore';
import { 
  TrendingUp, 
  DollarSign, 
  Zap,
  Activity,
  ShieldCheck,
  ChevronRight,
  Plane
} from 'lucide-react';

// Formateador robusto para USD
const formatCurrency = (val: number) => 
  new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD', 
    maximumFractionDigits: 0 
  }).format(val || 0);

export const StatsPanel = () => {
  const stats = useInventoryStore((state) => state.stats);
  const products = useInventoryStore((state) => state.products);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 w-full gap-[1px] bg-white/5 border-b border-white/10">
      <StatCard 
        label="Valor Total de Flota"
        value={formatCurrency(stats?.totalValue || 0)}
        icon={<DollarSign size={12} className="text-emerald-500" />}
        subLabel={`${stats?.totalStock || 0} UNIDADES EN HANGAR`}
        delay={0.1}
      />

      <StatCard 
        label="Ventas Realizadas"
        value={formatCurrency(stats?.revenue || 0)}
        icon={<TrendingUp size={12} className="text-blue-500" />}
        trend="OPERATIVO"
        subLabel={`${stats?.totalSold || 0} DRONES DESPACHADOS`}
        delay={0.2}
      />

      <StatCard 
        label="Promedio por Unidad"
        value={formatCurrency(stats?.averageCaratPrice || 0)}
        icon={<Zap size={12} className="text-amber-500" />}
        subLabel="VALOR DE MERCADO INDEXADO"
        delay={0.3}
      />

      <StatCard 
        label="Estado de Enlace"
        value="TELEMETRÍA_OK"
        icon={<Activity size={12} className="text-emerald-400" />}
        subLabel={`NODOS ACTIVOS: ${products?.length || 0}`}
        isStatus
        delay={0.4}
      />
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  subLabel: string;
  isStatus?: boolean;
  delay: number;
}

const StatCard = memo(({ label, value, icon, trend, subLabel, isStatus, delay }: StatCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay }}
      className="relative flex flex-col bg-black p-3 group cursor-pointer overflow-hidden border-r border-white/5 last:border-r-0"
    >
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-emerald-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Background Icon Watermark - Drone DT Identity */}
      <div className="absolute -right-2 -bottom-2 opacity-[0.02] group-hover:opacity-[0.06] group-hover:scale-110 transition-all duration-700 pointer-events-none">
        <Plane size={64} className="text-white -rotate-12" />
      </div>

      {/* Header Info */}
      <div className="z-10 flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <div className={`w-1 h-1 rounded-full ${isStatus ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-700'} group-hover:bg-emerald-400`} />
          <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-300 transition-colors">
            {label}
          </span>
        </div>
        <div className="p-1 bg-zinc-900 border border-white/5 group-hover:border-emerald-500/30 group-hover:bg-zinc-800 transition-all">
          {icon}
        </div>
      </div>

      {/* Main Value */}
      <div className="z-10 flex flex-col">
        <div className="flex items-center gap-2">
          <h4 className={`text-lg font-black tracking-tighter font-mono ${isStatus ? 'text-emerald-400' : 'text-white'} group-hover:scale-[1.02] origin-left transition-transform`}>
            {value}
          </h4>
          {trend && (
            <div className="flex items-center gap-0.5 text-[7px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 border border-emerald-500/20">
              <ChevronRight size={6} />
              {trend}
            </div>
          )}
        </div>
        <p className="text-[10px] font-bold text-zinc-600 uppercase mt-1 tracking-tight group-hover:text-zinc-400 transition-colors">
          {subLabel}
        </p>
      </div>

      {/* Scanner Animation (Digital Twin Sync Effect) */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5 overflow-hidden">
        <motion.div 
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-1/3 h-full bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"
        />
      </div>
    </motion.div>
  );
});

StatCard.displayName = 'StatCard';