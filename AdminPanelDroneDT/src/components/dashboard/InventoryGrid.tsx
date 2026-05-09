'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInventoryStore } from '@/store/useInventoryStore';
import { InventoryCard } from './InventoryCard';
import { PackageSearch, Activity, DatabaseZap } from 'lucide-react';

export const InventoryGrid = () => {
  // Selector selectivo para evitar re-renders innecesarios
  const products = useInventoryStore((state) => state.products);
  const isLoading = useInventoryStore((state) => state.isLoading);

  // Memorizamos el conteo para optimizar el renderizado del micro-header
  const activeCount = useMemo(() => 
    products.filter(p => p.status === 'AVAILABLE').length, 
  [products]
      </div>

      {/* Micro Status Overlay (Sin Footer) */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent shadow-[0_0_10px_rgba(16,185,129,0.1)]" />
    </section>
  );
};