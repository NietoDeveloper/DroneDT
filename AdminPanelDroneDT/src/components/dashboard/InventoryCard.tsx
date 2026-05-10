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
    const now = Date.now();
    if (now - lastFetchTime.current < 2000) return;
    lastFetchTime.current = now;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    if (document.hidden) return;

    abortControllerRef.current = new AbortController();
    setLoading(true);

    try {
      const response = await fetch('/api/inventory', {
        signal: abortControllerRef.current.signal,
        headers: {
          'Content-Type': 'application/json',
          'X-Security-Level': 'L5-Shield-Industrial',
          'X-Origin-Node': 'NIETO_LAB_BOG_CENTRO',
          'X-Project-ID': 'DRONE_DT_FLEET',
          'Cache-Control': 'no-cache',
          'X-Timestamp': now.toString()
        },
      });

      if (!response.ok) throw new Error(`TELEMETRY_SYNC_ERROR: ${response.status}`);

      const data = await response.json();

      if (Array.isArray(data)) {
        // Comparación profunda de telemetría para evitar ciclos de render
        const hasChanged = JSON.stringify(data) !== JSON.stringify(productsRef.current);
        
        if (hasChanged) {
          setProducts(data);
        }
        
        setError(null);
        retryCount.current = 0;
      }
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('DRONE_DT_SYNC_FAILURE:', error);
        retryCount.current += 1;
        
        if (retryCount.current > 3) {
          setError('CRITICAL: LINK_TO_CLUSTER_LOST_RECONNECTING');
        }
      }
    } finally {
      setLoading(false);
    }
  }, [setProducts, setLoading, setError]);

  useEffect(() => {
    fetchInventory();

    const startPolling = () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(fetchInventory, refreshInterval);
    };

    startPolling();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (timerRef.current) clearInterval(timerRef.current);
      } else {
        // Re-sincronización inmediata al recuperar foco
