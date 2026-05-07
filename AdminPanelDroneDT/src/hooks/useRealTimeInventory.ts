'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useInventoryStore } from '@/store/useInventoryStore';

/**
 * HOOK: useRealTimeInventory
 * Nivel: L5 Architecture - High-Availability Sync
 */
export const useRealTimeInventory = (refreshInterval = 30000) => {
  const { actions, products } = useInventoryStore();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const retryCount = useRef(0);

  const fetchInventory = useCallback(async () => {
    // 1. Race Condition Guard
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // 2. Control de visibilidad: No sincronizar si la pestaña está oculta
    if (document.hidden) return;

    abortControllerRef.current = new AbortController();
    actions.setLoading(true);

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

      // 3. Validación y Deduplicación básica
      if (Array.isArray(data)) {
        // Solo actualizamos si el hash de los datos cambia (comparación simple de longitud/id por ahora)
        if (JSON.stringify(data) !== JSON.stringify(products)) {
          actions.setProducts(data);
        }
        actions.setError(null);
        retryCount.current = 0; // Reset de errores en éxito
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        // Silencioso: Es un comportamiento esperado en navegación rápida
      } else {
        console.error('L5_SYNC_FAILURE_RETRYING:', error);
        retryCount.current += 1;
        
        // Error después de 3 intentos fallidos
        if (retryCount.current > 3) {
          actions.setError('CLUSTER_SYNC_LOST_CHECK_CONNECTION');
        }
      }
    } finally {
      actions.setLoading(false);
    }
  }, [actions, products]);

  useEffect(() => {
    // Carga inicial
    fetchInventory();

    // Loop de sincronización inteligente
    const startInterval = () => {
      timerRef.current = setInterval(() => {
        fetchInventory();
      }, refreshInterval);
    };

    startInterval();

    // 4. Page Visibility API: Pausar/Reanudar según el foco del usuario
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (timerRef.current) clearInterval(timerRef.current);
      } else {
        fetchInventory();
        startInterval();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup Protocol
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