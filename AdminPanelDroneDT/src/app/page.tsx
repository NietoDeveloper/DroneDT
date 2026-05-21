'use client';

import React, { useState, useEffect } from 'react';
import { UserStats } from '@/components/users/UserStats';
import { UserRow } from '@/components/users/UserRow';
import { useUserManagement } from '@/hooks/useUserManagement';
import { Preloader } from '@/components/ui/Preloader';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  RefreshCw, 
  UserPlus, 
  ShieldAlert,
  Zap,
  Activity,
  Terminal,
  Cpu
} from 'lucide-react';

type FlowState = 'PRELOADER' | 'LOGIN' | 'DASHBOARD';

/**
 * PAGE: Personnel & Core System Dashboard (L5 Gateway)
 * Architecture: No-Scroll Viewport // 310px - 1900px Responsive
 * Logic: Secuencial sin fricciones: Preloader (3.5s) -> Login (Bypass) -> Dashboard
 */
export default function UsersPage() {
  const { operators, manualRefresh, isLoading: hookLoading } = useUserManagement();
  const [currentFlow, setCurrentFlow] = useState<FlowState>('PRELOADER');
  const [searchTerm, setSearchTerm] = useState('');

  // Sincronización del temporizador del Preloader de Inteligencia
  useEffect(() => {
    const preloaderTimer = setTimeout(() => {
      setCurrentFlow('LOGIN');
    }, 3500);

    return () => clearTimeout(preloaderTimer);
  }, []);recisión aeroespacial */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{ 
}