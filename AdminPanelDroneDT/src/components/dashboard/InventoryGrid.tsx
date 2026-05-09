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
        <span className="text-[10px] font-mono tracking-[0.2em] text-emerald-500/50">INICIALIZANDO_SISTEMA...</span>
      </div>
    );
  }

  return (
    <section className="group relative flex h-full w-full flex-col overflow-hidden border border-white/10 bg-black/20 transition-colors duration-500 hover:border-emerald-500/30">
      
      {/* Barra Técnica Superior - Front-end en Español */}
      <div className="flex items-center justify-between bg-white/[0.02] px-3 py-2 border-b border-white/5">
        <div className="flex items-center gap-2">
          <DatabaseZap className="h-3 w-3 text-emerald-500" />
          <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/80">
            Flujo_de_Inventario_en_Vivo
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[9px] text-emerald-500/80 uppercase">{activeCount} DISPONIBLES</span>
          </div>
        </div>
      </div>

      {/* Contenedor de Grilla - Optimizado para 310px - 1900px */}
      <div className="flex-1 overflow-y-auto p-3 scrollbar-none hover:scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <motion.div 
          layout
          className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
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
                  Buffer_Vacío: Esperando_Datos_del_DataBase
                </p>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Micro Status Overlay (Glow inferior) */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent shadow-[0_0_10px_rgba(16,185,129,0.1)]" />
    </section>
  );
};