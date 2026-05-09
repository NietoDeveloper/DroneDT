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


export const StatsPanel = () => {
  const stats = useInventoryStore((state) => state.stats);
  const products = useInventoryStore((state) => state.products);

