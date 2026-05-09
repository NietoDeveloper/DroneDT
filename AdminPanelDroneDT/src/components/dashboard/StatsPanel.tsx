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

