'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import { useUserStore, Operator } from '@/store/useUserStore';

/**
 * HOOK: useUserManagement L5
 * Engine: Telemetría de Personal Operativo
 * Architecture: Atomic Sync & Hydration Shield
 */
export const useUserManagement = (autoSyncInterval = 30000) => {
  // 1. ESCUDO DE HIDRATACIÓN: Evita que el componente intente renderizar
  // datos del store antes de que el navegador esté listo.
  const [isReady, setIsReady] = useState(false);
  
  const { 
    setOperators, 
    setLoading, 
    setError, 
    updateOperatorStatus,
    operators,
    isLoading: storeLoading 
  } = useUserStore();
  
  const syncTimer = useRef<NodeJS.Timeout | null>(null);

  /**
   * FETCH_ALGORITHM_L5: Sincronización de alta prioridad
   * Se optimizó a 800ms para mantener el impacto visual del Preloader
   * sin generar fatiga de espera en el usuario.
   */
  const fetchOperators = useCallback(async () => {
    // Solo activamos el loading global si no hay operadores en memoria
    // Esto previene que el dashboard desaparezca en re-sincronizaciones automáticas.
    if (operators.length === 0) setLoading(true);
    
    try {
      // Simulación de latencia de Uplink (Nieto Lab HQ)
      await new Promise(resolve => setTimeout(resolve, 800));

      const mockOperators: Operator[] = [
        {
          _id: 'OP-001',
          name: 'MANUEL NIETO',
          email: 'manuel@nieto-lab.com',
          role: 'ADMIN_CHIEF',
          status: 'ACTIVE',
          location: 'BOGOTÁ_HQ',
          lastUplink: new Date().toISOString(),
          clearanceLevel: 5,
          avatar: '/avatars/manuel.jpg'
        },
        {
          _id: 'OP-002',
          name: 'MONICA R.',
          email: 'monica@nieto-lab.com',
          role: 'SECURITY_OFFICER',
          status: 'ACTIVE',
          location: 'BOGOTÁ_HQ',
          lastUplink: new Date().toISOString(),
          clearanceLevel: 4
        },
        {
          _id: 'OP-003',
          name: 'TECH_UNIT_01',
          email: 'support@drone-dt.com',
          role: 'TECH_ENGINEER',
          status: 'IDLE',
          location: 'REMOTE_STATION',
          lastUplink: new Date().toISOString(),
          clearanceLevel: 3
        }
      ];

      setOperators(mockOperators);
      setError(null);
    } catch (err) {
      setError('CRITICAL_UPLINK_ERROR: FALLO_DE_TELEMETRIA_L5');
    } finally {
      // Liberamos el estado de carga para que el Dashboard "despierte"
      setLoading(false);
    }
  }, [setOperators, setLoading, setError, operators.length]);

  /**
   * CICLO_DE_CONTROL: Inicialización y persistencia
   */
  useEffect(() => {
    setIsReady(true); // El cliente ya es seguro para renderizar
    fetchOperators();

    if (autoSyncInterval > 0) {
      syncTimer.current = setInterval(() => {
        fetchOperators();
      }, autoSyncInterval);
    }

    return () => {
      if (syncTimer.current) clearInterval(syncTimer.current);
    };
  }, [fetchOperators, autoSyncInterval]);

  /**
   * OUTPUT_INTERFACE: Interfaz blindada contra desajustes de renderizado
   */
  return {
    // Si no está listo, devolvemos array vacío para evitar errores de mapeo
    operators: isReady ? operators : [],
    // El loading es verdadero si el cliente no está listo O si el store dice que está cargando
    isLoading: !isReady || storeLoading,
    manualRefresh: fetchOperators,
    changeOperatorStatus: updateOperatorStatus
  };
};