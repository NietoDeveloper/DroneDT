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

  // Acciones (Cerebro del Dashboard)
  setOperators: (operators: Operator[]) => void;
  