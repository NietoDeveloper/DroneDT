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


