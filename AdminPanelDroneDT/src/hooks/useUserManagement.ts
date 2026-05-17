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
    isLoading: storeLoading ll>(null);percepci
   * sin sacrificar la estética del Preloader.
    if (operators.length === 0) setLoading(true);
    
    try {
      // Handshake con el Cluster Bogotá HQ
      await new Promise(resolve => setTimeout(resolve, 800));

      const mockOperators: Operator[] = [
        {
          _id: 'OP-001
          rol2
       
      ];

 