'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Roles definidos para la jerarquía de Drone DT
export type UserRole = 'SYSTEM_ADMIN' | 'FLEET_MANAGER' | 'MAINTENANCE_TECH' | 'GUEST';

interface UserProfile {
  name: string;
  role: UserRole;
  avatar?: string;
  status: 'online' | 'offline';
  location: string; // Nodo de conexión
}

interface DashboardState {
  // UI State
  isSidebarOpen: boolean;
  
  // Real-time Operational State
  userProfile: UserProfile | null;
  totalFleetRevenue: number;
  activeDronesInAir: number;

  // Actions
  actions: {
    toggleSidebar: () => void;
    setUserProfile: (profile: UserProfile) => void;
    updateRevenue: (amount: number) => void;
    setActiveDrones: (count: number) => void;
  };
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      // Initial States: Configuración de Manuel Nieto como Admin Global
      isSidebarOpen: true,
      userProfile: {
        name: "MANUEL NIETO",
        role: "SYSTEM_ADMIN",
        status: 'online',
        location: "NIETO_LAB_BOG"
      },
      totalFleetRevenue: 0,
      activeDronesInAir: 3, // Mock de telemetría activa

      // Actions encapsuladas para limpieza de código
      actions: {
        toggleSidebar: () => set((state) => ({ 
          isSidebarOpen: !state.isSidebarOpen 
        })),
        
        setUserProfile: (profile) => set({ 
          userProfile: profile 
        }),
        
        updateRevenue: (amount) => set((state) => ({ 
          totalFleetRevenue: state.totalFleetRevenue + amount 
        })),

        setActiveDrones: (count) => set({ 
          activeDronesInAir: count 
        }),
      },
    }),
    {
      name: 'dronedt-dashboard-storage',
      storage: createJSONStorage(() => localStorage),
      // Solo persistimos lo esencial para evitar problemas de hidratación en Next.js
      partialize: (state) => ({ 
        isSidebarOpen: state.isSidebarOpen,
        userProfile: state.userProfile 
      }),
    }
  )
);