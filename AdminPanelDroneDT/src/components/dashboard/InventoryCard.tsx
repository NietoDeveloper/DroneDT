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
// Protección contra ráfagas (mínimo 2 segundos entre peticiones)
