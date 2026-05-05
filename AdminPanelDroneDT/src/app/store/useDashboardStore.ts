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
  setUserProfile: (profile: UserProfile) => void;
  updateSales: (amount: number) => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      // Initial States
      isSidebarOpen: true,
      userProfile: {

        status: 'online'
      },
      totalSalesToday: 0,
      activeUsers: 0,

      // Functions
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      
      setUserProfile: (profile) => set({ userProfile: profile }),
      
    }),
    {
      name: 'dronedt-dashboard-storage', // Nombre de la key en localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);