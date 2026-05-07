'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useInventoryStore } from '@/store/useInventoryStore';

/**
 * HOOK: useRealTimeInventory
 * Nivel: L5 Architecture - High-Availability Sync (Anti-Loop Version)
 */
export const useRealTimeInventory = (refreshInterval = 30000) => {
  // Selectores atómicos para evitar dependencias circulares
  const setProducts = useInventoryStore((state) => state.actions.setProducts);
  const setLoading = useInventoryStore((state) => state.actions.setLoading);
  const setError = useInventoryStore((state) => state.actions.setError);
  
  // Usamos una Ref para la data actual para comparar sin disparar el useCallback
  const productsRef = useRef(useInventoryStore.getState().products);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const retryCount = useRef(0);

  // Sincronizar la Ref con el Store global
  useEffect(() => {
    return useInventoryStore.subscribe(
      (state) => (productsRef.current = state.products)
    );
  }, []);

  const fetchInventory = useCallback(async () => {
    // 1. Race Condition Guard: Abortar peticiones en vuelo
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // 2. Visibility Check: No gastar recursos si la pestaña no es visible
    if (document.hidden) return;

    abortControllerRef.current = new AbortController();
    setLoading(true);

    try {
      const response = await fetch('/api/inventory', {
        signal: abortControllerRef.current.signal,
        headers: {
          'Content-Type': 'application/json',
          'X-Security-Level': 'L5-Shield',
          'X-Origin-Node': 'BOG_NODE_01',
          'Cache-Control': 'no-cache'
        },
      });

      if (!response.ok) throw new Error(`HTTP_ERROR: ${response.status}`);

      const data = await response.json();

      // 3. Deduplicación inteligente usando la Ref (Evita el loop infinito)
      if (Array.isArray(data)) {
        const hasChanged = JSON.stringify(data) !== JSON.stringify(productsRef.current);
        
        if (hasChanged) {
          setProducts(data);
        }
        
        setError(null);
        retryCount.current = 0;
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        // Silencioso: Petición cancelada por una nueva o por desmontaje
      } else {
        console.error('L5_SYNC_FAILURE:', error);
        retryCount.current += 1;
        
        if (retryCount.current > 3) {
          setError('CLUSTER_SYNC_LOST_CHECK_CONNECTION');
        }
      }
    } finally {
      setLoading(false);
    }
    // IMPORTANTE: Ya no dependemos de 'products' ni del objeto 'actions' completo
  }, [setProducts, setLoading, setError]);

  useEffect(() => {
    // Ejecución inicial
    fetchInventory();

    // Gestión del intervalo
    const startPolling = () => {
      timerRef.current = setInterval(fetchInventory, refreshInterval);
    };

    startPolling();

    // Page Visibility API para pausar el tráfico en segundo plano
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (timerRef.current) clearInterval(timerRef.current);
      } else {
        fetchInventory(); // Refresco inmediato al volver
        startPolling();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup Protocol: Cero fugas de memoria
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchInventory, refreshInterval]);

  return { 
    manualSync: fetchInventory,
    isRetrying: retryCount.current > 0
  };
};