'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useInventoryStore } from '@/store/useInventoryStore';

/**
 * HOOK: useRealTimeInventory
 * Nivel: L5 Architecture - High-Availability Sync (Drone DT Edition)
 * Propósito: Sincronización de telemetría de flota y estado de hangar.
 */
export const useRealTimeInventory = (refreshInterval = 30000) => {
  // Selectores atómicos para evitar re-renders innecesarios y dependencias circulares
  const setProducts = useInventoryStore((state) => state.actions.setProducts);
  const setLoading = useInventoryStore((state) => state.actions.setLoading);
  const setError = useInventoryStore((state) => state.actions.setError);
  
  // Ref para comparar data sin disparar el ciclo de vida de React
  const productsRef = useRef(useInventoryStore.getState().products);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | 
        setError(null);
        retryCount.current = 0;
      }
    fetchInventory();


    startPolling();

    // Page Visibility API: Optimización de recursos de red y CPU
