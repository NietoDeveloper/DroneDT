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
  ChevronRight
} from 'lucide-react';

// Formateador robusto
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
        label="Assets_Total_Value"
        value={formatCurrency(stats?.totalValue || 0)}
        icon={<DollarSign size={12} className="text-emerald-500" />}
        subLabel={`${stats?.totalStock || 0} UNITS_IN_VAULT`}
        delay={0.1}
      />

      <StatCard 
        label="Operational_Revenue"
        value={formatCurrency(stats?.revenue || 0)}
        icon={<TrendingUp size={12} className="text-blue-500" />}
        trend="LIVE_STREAM"
        subLabel={`${stats?.totalSold || 0} LIQUIDATED_ASSETS`}
        delay={0.2}
      />

      <StatCard 
        label="Avg_Carat_Performance"
        value={formatCurrency(stats?.averageCaratPrice || 0)}
        icon={<Zap size={12} className="text-amber-500" />}
        subLabel="INDEXED_MARKET_PRICE"
        delay={0.3}
      />

      <StatCard 
        label="L5_Cluster_Status"
        value="ACTIVE_NODE"
        icon={<Activity size={12} className="text-emerald-400" />}
        subLabel={`CONNECTED_UNITS: ${products?.length || 0}`}
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
      
      {/* Background Icon Watermark */}
      <div className="absolute -right-2 -bottom-2 opacity-[0.02] group-hover:opacity-[0.06] group-hover:scale-110 transition-all duration-700 pointer-events-none">
        <ShieldCheck size={64} className="text-white" />
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

      {/* L5 Scanner Animation */}
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