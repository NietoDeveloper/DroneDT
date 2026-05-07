'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useInventoryStore } from '@/store/useInventoryStore';
import { 
  TrendingUp, 
  BarChart3, 
  DollarSign, 
  Zap,
  Activity,
  ShieldCheck
} from 'lucide-react';

// Formateador optimizado fuera del ciclo de renderizado
const formatCurrency = (val: number) => 
  new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD', 
    maximumFractionDigits: 0 
  }).format(val || 0);

export const StatsPanel = () => {
  // Selectores atómicos: El panel solo re-renderiza si las estadísticas cambian
  const stats = useInventoryStore((state) => state.stats);
  const nodeCount = useInventoryStore((state) => state.products.length);

  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4 w-full">
      <StatCard 
        label="Assets_Value"
        value={formatCurrency(stats.totalValue)}
        icon={<DollarSign className="h-4 w-4 text-emerald-500" />}
        subLabel={`${stats.totalStock} unidades en bóveda`}
        delay={0.1}
      />

      <StatCard 
        label="Liquidity_Revenue"
        value={formatCurrency(stats.revenue)}
        icon={<TrendingUp className="h-4 w-4 text-blue-500" />}
        trend="STREAMING"
        subLabel={`${stats.totalSold} activos liquidados`}
        delay={0.2}
      />

      <StatCard 
        label="Performance_CT"
        value={formatCurrency(stats.averageCaratPrice)}
        icon={<Zap className="h-4 w-4 text-amber-500" />}
        subLabel="Precio promedio / quilate"
        delay={0.3}
      />

      <StatCard 
        label="System_Cluster"
        value="PROD_ACTIVE"
        icon={<Activity className="h-4 w-4 text-emerald-400" />}
        subLabel={`Nodes: ${nodeCount} | L5 Security`}
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

// Sub-componente memoizado para evitar re-calculos de layout innecesarios
const StatCard = memo(({ label, value, icon, trend, subLabel, isStatus, delay }: StatCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="relative flex flex-col border border-white/10 bg-black/60 p-3 overflow-hidden group"
    >


      {/* Top Section */}
      <div className="z-10 flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 bg-emerald-500 rounded-full animate-pulse" />
          <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/40">
            {label}
          </span>
        </div>
        <div className="p-1.5 bg-white/[0.03] border border-white/5 backdrop-blur-md">
          {icon}
        </div>
      </div>
