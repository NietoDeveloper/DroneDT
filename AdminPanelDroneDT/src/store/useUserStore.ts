import { create } from 'zustand';

/**
 * L5_OPERATOR_ENTITY
 * Definición de estructura para el personal de Drone DT
 */
export interface Operator {
  _id: string;
  name: string;
  email: string;
  role: 'ADMIN_CHIEF' | 'FIELD_OPERATOR' | 'TECH_ENGINEER' | 'SECURITY_OFFICER';
  status: 'ACTIVE' | 'IDLE' | 'OFFLINE' | 'SUSPENDED';
  location: string;
  lastUplink: string;
  clearanceLevel: 1 | 2 | 3 | 4 | 5; // Nivel L5 es el máximo (Manuel Nieto)
  avatar?: string;
}

interface UserState {
  // Estado
  operators: Operator[];
  isLoading: boolean;
  error: string | null;
  selectedOperator: Operator | null;

  // Acciones (Cerebro del Dashboard)
  setOperators: (operators: Operator[]) => void;
  setLoading: (status: boolean) => void;
  setError: (message: string | null) => void;
  selectOperator: (operator: Operator | null) => void;
  
  // Mutaciones de interfaz (Optimistic Updates)
  updateOperatorStatus: (id: string, status: Operator['status']) => void;
}

/**
 * useUserStore - Sistema de Gestión de Operadores
 * Engineered for: Nieto Laboratory // Drone DT
 */
export const useUserStore = create<UserState>((set) => ({
  // Initial State
  operators: [],
  isLoading: false,
  error: null,
  selectedOperator: null,

  // Setters de Telemetría
  setOperators: (operators) => set({ 
    operators, 
    isLoading: false 
  }),

  setLoading: (status) => set({ 
    isLoading: status 
  }),