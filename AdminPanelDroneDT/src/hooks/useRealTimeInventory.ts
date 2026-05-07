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


  useEffect(() => {

    fetchInventory();

    timerRef.current = setInterval(() => {
      fetchInventory();
    }, refreshInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [fetchInventory, refreshInterval]);

  return { manualSync: fetchInventory };
};