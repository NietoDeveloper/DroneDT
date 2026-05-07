'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useInventoryStore } from '@/store/useInventoryStore';

/**
 * HOOK: useRealTimeInventory
 * Nivel: L5 Security & Performance
 * Descripción: Gestiona el flujo de datos entre el backend (Railway/AWS) y la Store.
 */
export const useRealTimeInventory = (refreshInterval = 30000) => {
  const { actions } = useInventoryStore();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchInventory = useCallback(async () => {
    // Cancelar peticiones anteriores si aún están en vuelo (Race Condition Guard)
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    actions.setLoading(true);

    try {
      // Endpoint de tu Backend en Railway/AWS
      const response = await fetch('/api/inventory', {
        signal: abortControllerRef.current.signal,
        headers: {
          'Content-Type': 'application/json',
          'X-Security-Level': 'L5-Shield',
        },
      });

      if (!response.ok) throw new Error(`HTTP_ERROR: ${response.status}`);

      const data = await response.json();

      // Sanitización y Validación de Datos L5
      if (Array.isArray(data)) {
        actions.setProducts(data);
        actions.setError(null);
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Fetch_Aborted: Operation superseded by new request');
      } else {
        console.error('L5_SYNC_FAILURE:', error);
        actions.setError('FAILED_TO_SYNC_WITH_CLUSTER');
      }
    } finally {
      actions.setLoading(false);
    }
  }, [actions]);

  useEffect(() => {
    // Primera carga inmediata
    fetchInventory();

    // Configuración del loop de sincronización (Real-time Simulation)
    timerRef.current = setInterval(() => {
      fetchInventory();
    }, refreshInterval);

    // Cleanup Protocol: Evita memory leaks al desmontar el Dashboard
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [fetchInventory, refreshInterval]);

  return { manualSync: fetchInventory };
};