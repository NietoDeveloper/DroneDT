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
  const abortControllerRef = useRef<AbortController | null>(null);
  const retryCount = useRef(0);

  // Sincronizar la Ref con el Store global de Drone DT
  useEffect(() => {
    return useInventoryStore.subscribe(
      (state) => (productsRef.current = state.products)
    );
  }, []);

  const fetchInventory = useCallback(async () => {
    // 1. Race Condition Guard: Abortar peticiones previas en vuelo
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // 2. Visibility Check: Pausar telemetría si el operador no está viendo el dashboard
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
          'Cache-Control': 'no-cache'
        },
      });

      if (!response.ok) throw new Error(`TELEMETRY_SYNC_ERROR: ${response.status}`);

      const data = await response.json();

      // 3. Deduplicación inteligente: Solo actualizamos si hay cambios reales en la flota
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
        // Silencioso: Petición cancelada por actualización o desmontaje
      } else {
        console.error('DRONE_DT_SYNC_FAILURE:', error);
        retryCount.current += 1;
        
        // Umbral de tolerancia de fallos del sistema
        if (retryCount.current > 3) {
          setError('CRITICAL: LINK_TO_CLUSTER_LOST_RECONNECTING');
        }
      }
    } finally {
      setLoading(false);
    }
  }, [setProducts, setLoading, setError]);

  useEffect(() => {
    // Ejecución inicial de enlace
    fetchInventory();

    // Gestión del intervalo de polling (Heartbeat)
    const startPolling = () => {
      timerRef.current = setInterval(fetchInventory, refreshInterval);
    };

    startPolling();

    // Page Visibility API: Optimización de recursos de red y CPU
