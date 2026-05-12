import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * L5_OPERATOR_ENTITY
 * Estructura de Grado Industrial para Drone DT
 */
export interface Operator {
  _id: string;
  name: string;
  email: string;
  role: 'ADMIN_CHIEF' | 'FIELD_OPERATOR' | 'TECH_ENGINEER' | 'SECURITY_OFFICER';
  status: 'ACTIVE' | 'IDLE' | 'OFFLINE' | 'SUSPENDED';
  location: string;
  lastUplink: string;
  clearanceLevel: 1 | 2 | 3 | 4 | 5;
  avatar?: string;
  metadata?: {
    lastIp: string;
    deviceTag: string;
    sessionDuration: number;
  };
}

interface UserState {
  // --- CORE STATE ---
  operators: Operator[];
  isLoading: boolean;
  error: string | null;
  selectedOperatorId: string | null; // Guardamos ID para evitar inconsistencias de referencia
  lastSync: number | null;

  // --- ACTIONS ---
  setOperators: (operators: Operator[]) => void;
  setLoading: (status: boolean) => void;
  setError: (message: string | null) => void;
  
  // --- ATOMIC MUTATIONS ---
  selectOperator: (id: string | null) => void;
  updateOperatorStatus: (id: string, status: Operator['status']) => void;
  bulkUpdateOperators: (updates: Partial<Operator>[]) => void;
  
  // --- UTILS ---
  resetStore: () => void;
}

/**
 * useUserStore - L5 SECURITY ARCHITECTURE
 * Implementa persistencia selectiva y optimización de memoria.
 */
export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // Initial State
      operators: [],
      isLoading: false,
      error: null,
      selectedOperatorId: null,
      lastSync: null,

      setOperators: (operators) => set({ 
        operators: [...operators], // Garantiza nueva referencia de array
        isLoading: false,
        lastSync: Date.now(),
        error: null 
      }),

      setLoading: (status) => set({ isLoading: status }),

      setError: (message) => set({ error: message, isLoading: false }),

      selectOperator: (id) => set({ selectedOperatorId: id }),

      /**
       * Handshake de Estado: Actualización rápida con timestamp de sistema.
       */
      updateOperatorStatus: (id, status) => {
        const timestamp = new Date().toISOString();
        set((state) => ({
          operators: state.operators.map((op) => 
            op._id === id ? { ...op, status, lastUplink: timestamp } : op
          )
        }));
      },

      /**
       * Actualización masiva eficiente para despliegues de flota grande.
       */
      bulkUpdateOperators: (updates) => set((state) => ({
        operators: state.operators.map((op) => {
          const update = updates.find((u) => u._id === op._id);
          return update ? { ...op, ...update } : op;
        })
      })),

      resetStore: () => set({ 
        operators: [], 
        selectedOperatorId: null, 
        error: null, 
        lastSync: null 
      }),
    }),
    {
      name: 'nieto-lab-ops-telemetry', // Key en LocalStorage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        // Solo persistimos datos esenciales para rapidez de carga
        operators: state.operators,
        lastSync: state.lastSync 
      }),
    }
  )
);

/**
 * SELECTORES L5 (Fuera del store para evitar re-renders masivos)
 * Uso: const activeOps = useUserStore(selectActiveOperators);
 */
export const selectActiveOperators = (state: UserState) => 
  state.operators.filter(op => op.status === 'ACTIVE');

export const selectOperatorById = (state: UserState) => 
  state.operators.find(op => op._id === state.selectedOperatorId) || null;