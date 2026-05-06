import { create } from 'zustand';

// Estructura de nivel L5 para Esmeraldas y Activos
export interface Product {
  id: string;
  sku: string;         // Identificador único (ej: EM-001-2026)
  name: string;
  carats: number;      // Peso en quilates
  price: number;       // Precio en USD
  status: 'AVAILABLE' | 'SOLD' | 'RESERVED';
  lastUpdate: string;  // Timestamp para el Live Sync
}

interface InventoryStats {
  totalStock: number;
  totalSold: number;
  totalValue: number;
  revenue: number;
}

interface InventoryState {
  // Data
  products: Product[];
  stats: InventoryStats;
  isLoading: boolean;
  
  // Acciones para el Dashboard de Control
  setProducts: (products: Product[]) => void;
  updateProductStatus: (id: string, status: Product['status']) => void;
  calculateStats: () => void;
  setLoading: (status: boolean) => void;
}

export const useInventoryStore = create<InventoryState>((set, get) => ({
  // Estado Inicial con Data de Prueba (Mock) para Visualización Inmediata
  products: [
