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
  selectedOperatorId: string | null;
  lastSync: number | null;

  // --- ACTIONS ---
  setOperators: (operators: Operator[]) => void;
  setLoading: (status: boolean) => void;
  setError: (message: string | null) => void;
  
  // --- ATOMIC MUTATIONS ---
  selectOperator: (id: string | null) => void;
  updateOperatorStatus: (id: string, status: Operator['status']) => void;
  bulkUpdateOperators: (updates: Partial<Operator> & { _id: string }[]) => void;
  
  // --- UTILS ---
  resetStore: () => void;
}

/**
 * useUserStore - L5
 */
export const useUserStore = cr
    (set) =TE ---