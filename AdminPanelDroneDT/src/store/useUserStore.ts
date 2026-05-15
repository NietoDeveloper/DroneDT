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
