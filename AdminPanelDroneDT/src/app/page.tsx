'use client';

import React, { useState } from 'react';
import { UserStats } from '@/components/users/UserStats';
import { UserRow } from '@/components/users/UserRow';
import { useUserManagement } from '@/hooks/useUserManagement';
import { Preloader } from '@/components/ui/Preloader'; // Asegúrate que esta ruta sea correcta
import { 
  Search, 
  RefreshCw, 
  UserPlus, 
  ShieldAlert,
  Zap,
  Activity
} from 'lucide-react';

/**
 * PAGE: Personnel Control Center (L5)
 * Architecture: No-Scroll Viewport // 310px - 1900px Responsive
 * Logic: Gatekeeper de Preloader -> Dashboard
 */
export default function UsersPage() {
  const { operators, manualRefresh, isLoading } = useUserManagement();
  const [searchTerm, setSearchTerm] = useState('');

  // 1. GATEKEEPER: Si el Hook está en fase de Uplink, mostramos Preloader L5
  if (isLoading) {
    return <Preloader />;
  }

  // Filtrado en tiempo real para eficiencia de datos
  const filteredOperators = operators.filter(op => 
    op.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    op.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col bg-[#080808] text-white overflow-hidden relative">
      
      {/* 1. BACKGROUND LAYER: Micro-grid de precisión */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, #ffffff 0.5px, transparent 0.5px)', 
          backgroundSize: '24px 24px' 
        }} 
      />

    