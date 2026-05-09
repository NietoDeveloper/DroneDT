'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Definiciones de tipos para Drone DT
export type ProductStatus = 'AVAILABLE' | 'SOLD' | 'RESERVED' | 'DRAFT';

export interface Product {
  id: string;
  sku: string;         // Identificador técnico de la unidad
  name: string;
  flightTime: number;  // Autonomía en horas (reemplaza carats)
  price: number;       // Precio base en USD
  status: ProductStatus;
  lastUpdate: string;  // ISO string para sincronización de telemetría
  category: 'DRONE_UNIT' | 'DRONE_SERVICE' | 'DIGITAL_TWIN';
}

interface InventoryStats {
  totalStock: number;
  totalSold: number;
  totalValue: number;
  revenue: number;
  averageFlightTime: number; // Rendimiento operativo promedio
}

interface InventoryState {
  products: Product[];
  stats: InventoryStats;
  isLoading: boolean;
  error: string | null;
  
  actions: {
    setProducts: (products: Product[]) => void;
    updateProduct: (id: string, updates: Partial<Product>) => void;
    syncProductStatus: (id: string, status: ProductStatus) => void;
    setLoading: (status: boolean) => void;
    setError: (message: string | null) => void;
  };
}

// Lógica de cálculo de estadísticas operativa para Drones
const computeStats = (products: Product[]): InventoryStats => {
  const initial = { totalStock: 0, totalSold: 0, totalValue: 0, revenue: 0, totalFlightTimeSold: 0 };
  
  const result = products.reduce((acc, p) => {
    if (p.status === 'AVAILABLE') {
      acc.totalStock++;
      acc.totalValue += p.price;
    } else if (p.status === 'SOLD') {
      acc.totalSold++;
      acc.revenue += p.price;
      acc.totalFlightTimeSold += p.flightTime;
    }
    return acc;
  }, initial);

  return {
    totalStock: result.totalStock,
    totalSold: result.totalSold,
    totalValue: result.totalValue,
    revenue: result.revenue,
    averageFlightTime: result.totalSold > 0 ? result.totalFlightTimeSold / result.totalSold : 0,
  };
};

export const useInventoryStore = create<InventoryState>()(
  devtools(
    (set, get) => ({
      // MOCK DATA: Unidades reales de Drone DT
      products: [
        { 
          id: '1', 
          sku: 'DT-X1-BOG-001', 
          name: 'SkyGuard Sentinel v2', 
          flightTime: 2.5, 
          price: 12500, 
          status: 'AVAILABLE', 
          lastUpdate: new Date().toISOString(), 
          category: 'DRONE_UNIT' 
        },
        { 
          id: '2', 
          sku: 'DT-I4-MED-042', 
          name: 'Falcon Industrial X1', 
          flightTime: 1.8, 
          price: 8900, 
          status: 'SOLD', 
          lastUpdate: new Date().toISOString(), 
          category: 'DRONE_UNIT' 
        },
        { 
          id: '3', 
          sku: 'DT-A7-CAL-015', 
          name: 'Apex Surveyor Pro', 
          flightTime: 3.2, 
          price: 15000, 
          status: 'AVAILABLE', 
          lastUpdate: new Date().toISOString(), 
          category: 'DRONE_UNIT' 
        },
      ],
      stats: { 
        totalStock: 0, 
        totalSold: 0, 
        totalValue: 0, 
        revenue: 0, 
        averageFlightTime: 0 
      },
      isLoading: false,
      error: null,

      actions: {
        setProducts: (products) => {
          set({ products, stats: computeStats(products) }, false, 'inventory/setProducts');
        },

        updateProduct: (id, updates) => {
          const products = get().products.map((p) =>
            p.id === id ? { ...p, ...updates, lastUpdate: new Date().toISOString() } : p
          );
          set({ products, stats: computeStats(products) }, false, 'inventory/updateProduct');
        },

        syncProductStatus: (id, status) => {
          get().actions.updateProduct(id, { status });
        },

        setLoading: (isLoading) => set({ isLoading }, false, 'inventory/setLoading'),
        
        setError: (error) => set({ error }, false, 'inventory/setError'),
      },
    }),
    { name: 'DroneDT_Inventory_Service' }
  )
);