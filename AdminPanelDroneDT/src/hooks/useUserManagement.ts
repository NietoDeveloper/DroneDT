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

  const fetchOperators = useCallback(async () => {
