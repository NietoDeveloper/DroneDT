'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { useInventoryStore } from '@/store/useInventoryStore';

/**
 * HOOK: useRealTimeInventory
 * PROYECTO: Drone DT Ecosystem
 * ARQUITECTURA: L5 Industrial Architecture - High-Availability Sync
 * AUTORÍA: Creado por Software DT / Manuel Nieto (nietodeveloper)
 * LABORATORIO: Nieto Laboratory (Bogotá, Colombia)
 * PROPÓSITO: Sincronización resiliente de telemetría de flota y hangar con tolerancia a fallos.
 */
export const useRealTimeInventory = (refreshInterval = 15000) => {
  // Selectores atómicos para evitar re-renders innecesarios y dependencias circulares
  const setProducts = useInventoryStore((state) => state.actions.setProducts);
  const setLoading = useInventoryStore((state) => state.actions.setLoading);
  const setError = useInventoryStore((state) => state.actions.setError);
  
  // Estado local para notificar estados dinámicos al UI del Dashboard sin mutar stores globales abruptamente
  const [syncStatus, setSyncStatus] = useState<'SYNCED' | 'OFFLINE_MOCK' | 'RECONNECTING'>('SYNCED');

  // Ref para comparar data sin disparar el ciclo de vida de React
  const productsRef = useRef(useInventoryStore.getState().products);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const retryCount = useRef(0);
  const currentIntervalRef = useRef(refreshInterval);

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
          'X-Origin-Node': 'NIETO_LAB_BOG_SOUTH',
          'X-Project-ID': 'DRONE_DT_FLEET',
          'Cache-Control': 'no-cache'
        },
      });

      // Manejo controlado si el endpoint devuelve 404 u otros códigos de error
      if (!response.ok) {
        throw new Error(`TELEMETRY_SYNC_ERROR: ${response.status}`);
      }

      const data = await response.json();
      
      // Extraer array si viene estructurado en un objeto wrapper de backend
      const targetData = Array.isArray(data) ? data : data?.data;

      // 3. Deduplicación inteligente: Solo actualizamos si hay cambios reales en la flota
      if (Array.isArray(targetData)) {
        const hasChanged = JSON.stringify(targetData) !== JSON.stringify(productsRef.current);
        
        if (hasChanged) {
          setProducts(targetData);
        }
        
        setError(null);
        retryCount.current = 0;
        currentIntervalRef.current = refreshInterval; // Restablecer intervalo normal
        setSyncStatus('SYNCED');
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        // Silencioso: Petición cancelada por actualización o desmontaje de interfaz
        return;
      }

      retryCount.current += 1;
      
      // Control de errores resiliente: Previene el bucle caótico en la terminal interceptando el 404
      if (err.message.includes('404')) {
        setSyncStatus('OFFLINE_MOCK');
        
        // Si el hangar está vacío y da 404, inyectamos un array de contingencia local controlado
        if (productsRef.current.length === 0) {
          const fallbackData = [
            { _id: 'DT-MOCK-01', name: 'Hawk-V8 (Simulado)', status: 'STANDBY', category: 'Exploración', price: 0, stock: 1, description: 'Modo de contingencia Nieto Lab.' },
            { _id: 'DT-MOCK-02', name: 'Interceptor-X (Simulado)', status: 'OFFLINE', category: 'Seguridad', price: 0, stock: 1, description: 'Esperando enlace a cluster secundario.' }
          ];
          setProducts(fallbackData);
        }
        
        // Multiplicador exponencial de intervalo para mitigar el spam de red (Max 60s)
        currentIntervalRef.current = Math.min(currentIntervalRef.current * 1.5, 60000);
      } else {
        setSyncStatus('RECONNECTING');
        if (retryCount.current > 3) {
          setError('CRITICAL: LINK_TO_CLUSTER_LOST_RECONNECTING');
        }
      }
      
      // Re-programar el polling inmediatamente con el nuevo intervalo dilatado
      resetPolling();
      
    } finally {
      setLoading(false);
    }
  }, [setProducts, setLoading, setError, refreshInterval]);

  // Gestor dinámico del ciclo del temporizador (Heartbeat)
  const resetPolling = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(fetchInventory, currentIntervalRef.current);
  }, [fetchInventory]);

  useEffect(() => {
    // Ejecución inicial de enlace cuántico
    fetchInventory();
    resetPolling();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (timerRef.current) clearInterval(timerRef.current);
      } else {
        fetchInventory(); 
        resetPolling();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Protocolo de desmantelamiento limpio para evitar fugas de memoria latentes
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchInventory, resetPolling]);

  return { 
    manualSync: fetchInventory,
    isRetrying: retryCount.current > 0,
    status: syncStatus
  };
};