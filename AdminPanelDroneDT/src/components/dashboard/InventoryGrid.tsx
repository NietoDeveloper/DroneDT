'use client';

import React from 'react';
import { useInventoryStore } from '@/store/useInventoryStore';
import { InventoryCard } from './InventoryCard'; // Lo crearemos a continuación
import { PackageSearch, Loader2 } from 'lucide-react';

export const InventoryGrid = () => {
  const { products, isLoading } = useInventoryStore();

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center border border-white/10 bg-black/20 backdrop-blur-md">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <section className="flex h-full flex-col overflow-hidden border border-white/10 bg-black/40 p-4 backdrop-blur-sm">
      {/* Header del Módulo */}
      <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-2">
        <div className="flex items-center gap-2">
          <PackageSearch className="h-5 w-5 text-emerald-400" />
          <h2 className="text-sm font-bold uppercase tracking-widest text-white">
            Real-Time Inventory
          </h2>
        </div>
        <span className="text-[10px] font-mono text-white/40">
          L5_SYNC_ACTIVE
        </span>
      </div>

      {/* Grid Adaptativo: Sin Scroll Externo */}
      <div className="grid flex-1 grid-cols-1 gap-3 overflow-y-auto pr-2 
                      scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10
                      sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {products.length > 0 ? (
          products.map((product) => (
            <InventoryCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full flex h-full flex-col items-center justify-center text-white/20">
            <p className="text-xs uppercase tracking-tighter font-mono">No assets found in current cluster</p>
          </div>
        )}
      </div>

      {/* Footer de Estado Interno */}
      <div className="mt-3 flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-white/30">
        <span>Nodes: Railway.app / AWS</span>
        <span>Total Items: {products.length}</span>
      </div>
    </section>
  );
};