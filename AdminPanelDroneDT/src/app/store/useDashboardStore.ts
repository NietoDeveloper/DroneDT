import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserProfile {
  name: string;
  role: string;
  avatar?: string;
  status: 'online' | 'offline';
}

interface DashboardState {
  // UI State
  isSidebarOpen: boolean;
  
  // Real-time Data State
  userProfile: UserProfile | null;
  totalSalesToday: number;
  activeUsers: number;

  // Actions
  toggleSidebar: () => void;

      totalSalesToday: 0,
      activeUsers: 24, // Mock inicial de tráfico industrial

      // Actions
      toggleSidebar: () => set((state) => ({ 
        isSidebarOpen: !state.isSidebarOpen 
      })),

      
      updateSales: (amount) => set((state) => ({ 
        totalSalesToday: state.totalSalesToday + amount 
      })),

      setActiveUsers: (count) => set({ 
        activeUsers: count 
      }),
    }),
    {
      name: 'dronedt-dashboard-storage',
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({ 

      }),
    }
  )
);