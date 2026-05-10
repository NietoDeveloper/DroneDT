'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useInventoryStore } from '@/store/useInventoryStore';

/**
 * HOOK: useRealTimeInventory
 * Nivel: L5 Architecture - Industrial Telemetry Sync
 * Versión: 2.1 - Drone DT Optimized
 */
export const useRealTimeInventory = (refreshInterval = 30000) => {
  const setProducts = useInventoryStore((state) => state.actions.setProducts);
  const setLoading = useInventoryStore((state) => state.actions.setLoading);
  const setError = useInventoryStore((state) => state.actions.setError);
  
  const productsRef = useRef(useInventoryStore.getState().products);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const retryCount = useRef(0);
  const lastFetchTime = useRef(0);

  useEffect(() => {
    return useInventoryStore.subscribe(
      (state) => (productsRef.current = state.products)
    );
  }, []);

  const fetchInventory = useCallback(async () => {
    // Protección contra ráfagas (mínimo 2 segundos entre peticiones)
