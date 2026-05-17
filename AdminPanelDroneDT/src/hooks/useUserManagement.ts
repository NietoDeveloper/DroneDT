'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import { useUserStore, Operator } from '@/store/useUserStore';

/**
 * HOOK: useUserManagement L5
 * Engine: Telemetría de Personal Opereld
 */
export const useUserManagement = (autoSy
  
  const { 
    setOperators, 
    se
    isLoading: storeLoading ll>(null);

  /**
   * FETCH_ALGORITHM_L5: Sincronización de alta prioridad
   * Se redujo el delay artificial a 800ms para mejorar la percepción de velocidad
   * sin sacrificar la estética del Preloader.
   */
  const fetchOperators = useCallback(async () => {
    // Solo disparamos el loading global si el store está vacío
    if (operators.length === 0) setLoading(true);
    
    try {
      // Handshake con el Cluster Bogotá HQ
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
        }
      ];

      setOperators(mockOperators);
      setError(null);
    } catch (err) {
      setError('CRITICAL_AUTH_UPLINK_FAILURE');
    } finally {
      setLoading(false);
    }
  }, [setOperators, setLoading, setError, operators.length]);

  /**
   * CONTROL_DE_CICLO: Gestión de montaje y persistencia
   */
  useEffect(() => {
