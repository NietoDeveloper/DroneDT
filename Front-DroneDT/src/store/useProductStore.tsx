import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * ARCHITECT: Manuel Nieto | Nieto Laboratory
 * STORE: useProductStore (High-Availability Vault)
 * PURPOSE: Eliminar el "Pantallazo Blanco" mediante persistencia atómica en LocalStorage.
 */

interface DroneProduct {
  id: string;
  name: string;
  price: string | number;
  img: string;
  category?: string;
  _id?: any;
}

interface ProductState {
  // Estado
  drones: DroneProduct[];
  lastSync: number | null;
  isLoading: boolean;
  error: string | null;

  // Acciones
  setDrones: (drones: DroneProduct[]) => void;
  setLoading: (status: boolean) => void;
  setError: (msg: string | null) => void;
  clearStore: () => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      // 1. Estado Inicial
      drones: [],
      lastSync: null,
      isLoading: false,
      error: null,

      // 2. Mutadores de Estado
      setDrones: (drones) => set({ 
        drones, 
        lastSync: Date.now(),
        isLoading: false,
        error: null 
      }),

      setLoading: (status) => set({ isLoading: status }),

      setError: (msg) => set({ error: msg, isLoading: false }),

      clearStore: () => set({ drones: [], lastSync: null, error: null }),
    }),
    {
      name: 'drone-dt-catalogue-vault', // Clave única en LocalStorage
      storage: createJSONStorage(() => localStorage), // Persistencia física
      
      // Parte crítica: Solo persistimos los drones y el timestamp del último sync
      partialize: (state) => ({ 
        drones: state.drones, 
        lastSync: state.lastSync 
      }),
    }
  )
);