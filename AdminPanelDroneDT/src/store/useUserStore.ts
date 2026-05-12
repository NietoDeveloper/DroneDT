import { create } from 'zustand';

/**
 * L5_OPERATOR_ENTITY
 * Definición de estructura para el personal de Drone DT
 */
export interface Operator {
  _id: string;
  name: string;
  email: string;
  role: 'ADMIN_CHIEF' | 'FIELD_OPERATOR'

