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
  [products]);

  if (isLoading) {
    return (
      <div className="flex h-full min-h-[200px] w-full flex-col items-center justify-center border border-white/10 bg-black/40 backdrop-blur-xl">
        <Activity className="mb-2 h-5 w-5 animate-pulse text-emerald-500/50" />
 rid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
        >
          <AnimatePresence mode='popLayout'>
            {products.length > 0 ? (
              products.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <InventoryCard product={product} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full flex h-32 flex-col items-center justify-center border border-dashed border-white/5 bg-white/[0.01]">
                <PackageSearch className="mb-2 h-6 w-6 text-white/10" />
                <p className="font-mono text-[9px] uppercase tracking-widest text-white/20">
                  Buffer_Empty: Awaiting_Data
                </p>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Micro Status Overlay (Sin Footer) */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent shadow-[0_0_10px_rgba(16,185,129,0.1)]" />
    </section>
  );
};