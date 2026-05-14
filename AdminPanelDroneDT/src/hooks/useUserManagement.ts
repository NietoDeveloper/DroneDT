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

        },
