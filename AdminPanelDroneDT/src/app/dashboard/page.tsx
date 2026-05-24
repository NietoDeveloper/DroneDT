'use client';

import React, { useState, useMemo } from 'react';
import { Search, Activity, Terminal, Layers, Cpu, WifiOff, Plus } from 'lucide-react';
import { StatsPanel } from '@/components/dashboard/StatsPanel';
import { InventoryCard } from '@/components/dashboard/InventoryCard';
import { DroneSkeleton } from '@/components/dashboard/DroneSkeleton';
import { ErrorShield } from '@/components/dashboard/ErrorShield';
import { useRealTimeInventory } from '@/hooks/useRealTimeInventory';
import { useInventoryStore } from '@/store/useInventoryStore';

/**
 * PAGE: DashboardL5
 * Optimización: High-Performance Desktop (Hasta 1900px)
 * Fix: Unique Key Prop para Skeletons y Listas
 * Proyecto: Drone DT
 */
export default function DashboardL5() {
  const products = useInventoryStore((state) => state.products);
