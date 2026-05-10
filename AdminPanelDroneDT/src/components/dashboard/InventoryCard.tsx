'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useInventoryStore } from '@/store/useInventoryStore';

/**
 * HOOK: useRealTimeInventory
 * Nivel: L5 Architecture - Industrial Telemetry Sync
 * Propósito: Sincronización de telemetría de drones con protección de estado global y ahorro de recursos.
 */
export const useRealTimeInventory = (refreshInterval = 30000) => {
  // Selectores atómicos para evitar re-renders innecesarios en el Nieto Laboratory
  const setProducts = useInventoryStore((state) => state.actions.setProducts);
  const setLoading = useInventoryStore((state) => state.actions.setLoading);
  const setError = useInventoryStore((state) => state.actions.setError);
  
  // Referencias para control de flujo y comparación (Zero-Footprint Design)
  const productsRef = useRef(useInventoryStore.getState().products);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const retryCount = useRef(0);
  const lastFetchTime = useRef(0);

  // Sincronizar la Ref con el store para comparaciones profundas (Data Integrity)
  useEffect(() => {
    const unsub = useInventoryStore.subscribe(
      (state) => (productsRef.current = state.products)
    );
    return () => unsub();
  }, []);

  const fetchInventory = useCallback(async () => {
    // 1. Anti-Burst Shield: Evita ráfagas de red en ráfagas de clics
    const now = Date.now();
    if (now - lastFetchTime.current < 2000) return;
    lastFetchTime.current = now;

    // 2. Race Condition Guard: Cancela peticiones previas en vuelo
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // 3. Context Check: No consume ancho de banda si la pestaña no es visible
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
        // 4. Data Integrity Check: Solo muta el store si los datos realmente cambiaron
        // Esto evita re-renders masivos en el dashboard de drones
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
        
        // Umbral de tolerancia de enlace (3 intentos antes de alertar al operador)
        if (retryCount.current > 3) {
          setError('CRITICAL: LINK_TO_CLUSTER_LOST_RECONNECTING');
        }
      }
    } finally {
      // Cleanup: Solo apaga loading si este controlador sigue siendo la última operación
      if (abortControllerRef.current === controller) {
        setLoading(false);
      }
    }
  }, [setProducts, setLoading, setError]);

  useEffect(() => {
    // Disparo inicial de telemetría
    fetchInventory();

    const startPolling = () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(fetchInventory, refreshInterval);
    };

    startPolling();

    // 5. Visibility Optimization: Detiene el polling si minimizas el navegador
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

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchInventory, refreshInterval]);

  return { 
    manualSync: fetchInventory,
    isRetrying: retryCount.current > 0,
    status: retryCount.current > 3 ? 'LINK_LOST' : (retryCount.current > 0 ? 'RECONNECTING' : 'SYNCED'),
    lastSync: lastFetchTime.current,
    retryCount: retryCount.current
  };
};