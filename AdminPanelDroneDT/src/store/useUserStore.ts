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
  setOperators: (ood;
  setError: (message: string | null) => void;
  
  // --- ATOg | null) => void;


