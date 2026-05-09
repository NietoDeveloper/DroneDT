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
