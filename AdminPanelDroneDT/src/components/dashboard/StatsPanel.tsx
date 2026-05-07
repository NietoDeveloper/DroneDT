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


