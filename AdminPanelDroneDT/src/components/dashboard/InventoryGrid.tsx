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



  );
};