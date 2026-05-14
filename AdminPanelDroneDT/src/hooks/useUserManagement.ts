import { useEffect, useCallback, useRef } from 'react';
import { useUserStore, Operator } from '@/store/useUserStore';

/**
 * HOOK: useUserManagement
 * Engine: Telemetría de Personal Operativo L5
 * Location: Bogotá, Colombia // Nieto Laboratory
 */
export const useUserManagement = (autoSyncInterval = 30000) => {
  const { 
    setOperators, 
    setLoading, 
    setError, 
    updateOperatorStatus,
    operators 
  } = useUserStore();
  
  const syncTimer = useRef<NodeJS.Timeout | null>(null);

  /**
   * MOCK_DATA_L5: Semilla de datos para desarrollo
   * Representa el personal activo en el despliegue Drone DT
   */
  const fetchOperators = useCallback(async () => {
    setLoading(true);
    try {
      // Simulación de latencia de red (Nivel de Cluster Railway)
      await new Promise(resolve => setTimeout(resolve, 1200));

      const mockOperators: Operator[] = [
        {
          _id: 'OP-001',



