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
.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
