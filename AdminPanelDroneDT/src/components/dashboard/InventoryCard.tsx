'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useInventoryStore } from '@/store/useInventoryStore';

/**
 * HOOK: useRealTimeInventory
 * Nivel: L5 Architecture - Industrial Telemetry Sync
 * Proyecto: Drone DT
 * Propósito: Sincronización de telemetría con protección de estado global y optimización de recursos.
 */
export const useRealTimeInventory = (refreshInterval = 30000) => {
  // Selectores atómicos para evitar re-renders innecesarios
  const setProducts = useInventoryStore((state) => state.actions.setProducts);
  const setLoading = useInventoryStore((state) => state.actions.setLoading);
  const setError = useInventoryStore((state) => state.actions.setError);
  
  // Referencias para control de flujo (Zero-Footprint Design)
  const productsRef = useRef(useInventoryStore.getState().products);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const retryCount = useRef(0);
  const lastFetchTime = useRef(0);

  // Sincronización silenciosa de la referencia con el Store
  useEffect(() => {
    const unsub = useInventoryStore.subscribe(
      (state) => (productsRef.current = state.products)
    );
    return () => unsub();
  }, []);

  const fetchInventory = useCallback(async () => {
    const now = Date.now();

    // 1. Anti-Burst Shield: Mínimo 2s entre peticiones para proteger el clúster
    if (now - lastFetchTime.current < 2000) return;
    lastFetchTime.current = now;

    // 2. Race Condition Guard: Abortar peticiones previas activas
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // 3. Environment Check: No sincronizar si el laboratorio está oculto
    if (document.hidden) return;

    const controller = new AbortController();
    abortControllerRef.current = controller;
    setLoading(true);

    try {
      const response = await fetch('/api/inventory', {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'X-Security-Level': 'L5-Shield-Industrial',
          'X-Origin-Node': 'NIETO_LAB_BOG_CENTRO',
          'X-Project-ID': 'DRONE_DT_FLEET',
          'Cache-Control': 'no-cache',
          'X-Timestamp': now.toString()
        },
      });

      if (!response.ok) throw new Error(`HTTP_ERR_${response.status}`);

      const data = await response.json();

      if (Array.isArray(data)) {
        // 4. Data Integrity Check: Comparación profunda antes de mutar el estado
        const hasChanged = JSON.stringify(data) !== JSON.stringify(productsRef.current);
        
        if (hasChanged) {
          setProducts(data);
        }
        
        setError(null);
        retryCount.current = 0;
      }
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('CRITICAL_SYNC_FAILURE:', error.message);
        retryCount.current += 1;
        
        // Umbral de tolerancia de enlace industrial
        if (retryCount.current > 3) {
          setError('CRITICAL: LINK_TO_CLUSTER_LOST_RECONNECTING');
        }
      }
    } finally {
      // Solo desactivar loading si esta petición fue la última procesada
      if (abortControllerRef.current === controller) {
        setLoading(false);
      }
    }
  }, [setProducts, setLoading, setError]);

  useEffect(() => {
    // Inicialización de ciclo de telemetría
    fetchInventory();

    const startPolling = () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(fetchInventory, refreshInterval);
    };

    startPolling();

    // 5. Visibility Optimization: Gestión inteligente de recursos del sistema
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      } else {
        fetchInventory(); 
        startPolling();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup Final: Cierre de sockets y controladores al desmontar
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchInventory, refreshInterval]);

  return { 
    manualSync: fetchInventory,
    isRetrying: retryCount.current > 0,
    status: retryCount.current > 3 
      ? 'LINK_LOST' 
      : (retryCount.current > 0 ? 'RECONNECTING' : 'SYNCED'),
    lastSync: lastFetchTime.current,
    retryCount: retryCount.current
  };
};