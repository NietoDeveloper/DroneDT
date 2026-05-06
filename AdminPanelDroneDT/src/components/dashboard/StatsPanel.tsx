'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInventoryStore } from '@/store/useInventoryStore';
import { 
  TrendingUp, 
  BarChart3, 
  DollarSign, 
  Box, 
  Zap,
  Activity
} from 'lucide-react';

export const StatsPanel = () => {
  // Selector selectivo para máxima velocidad de respuesta
  const stats = useInventoryStore((state) => state.stats);
  const products = useInventoryStore((state) => state.products);

  // Formateadores inmutables
  const formatUSD = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4 w-full">
      
      {/* Métrica 1: Valor Total de Inventario */}
      <StatCard 
        label="Assets_Value"
        value={formatUSD(stats.totalValue)}
        icon={<DollarSign className="h-4 w-4 text-emerald-500" />}
        trend="+2.4%" // Esto puede venir de una comparativa real luego
        subLabel={`${stats.totalStock} items disponibles`}
      />

      {/* Métrica 2: Ingresos Reales (Ventas) */}
      <StatCard 
        label="Total_Revenue"
        value={formatUSD(stats.revenue)}
        icon={<TrendingUp className="h-4 w-4 text-blue-500" />}
        trend="Live Sync"
        subLabel={`${stats.totalSold} activos liquidados`}
      />

      {/* Métrica 3: Rendimiento por Quilate */}
      <StatCard 
        label="Avg_Price_CT"
        value={formatUSD(stats.averageCaratPrice)}
        icon={<Zap className="h-4 w-4 text-amber-500" />}
        subLabel="Rendimiento de Mercado"
      />

      {/* Métrica 4: Estado del Sistema / Cluster */}
      <StatCard 
        label="System_Health"
        value="L5_ACTIVE"
        icon={<Activity className="h-4 w-4 text-emerald-400" />}
        subLabel={`Cluster: ${products.length} Nodes`}
        isStatus
      />

    </div>
  );
};

// Sub-componente interno para limpieza de código (Arquitectura Atómica)
interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  subLabel: string;
  isStatus?: boolean;
}

const StatCard = ({ label, value, icon, trend, subLabel, isStatus }: StatCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative flex flex-col border border-white/10 bg-black/40 p-3 overflow-hidden group hover:border-white/20 transition-colors"
    >
      {/* Background Decor sutil */}
      <div className="absolute -right-2 -top-2 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
        <BarChart3 className="h-16 w-16 text-white" />
      </div>

      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
          {label}
        </span>
        <div className="p-1.5 rounded-md bg-white/[0.03] border border-white/5">
          {icon}
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        <h4 className={`text-lg font-black tracking-tight font-mono ${isStatus ? 'text-emerald-500' : 'text-white'}`}>
          {value}
        </h4>
