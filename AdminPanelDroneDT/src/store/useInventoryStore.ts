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
    { id: '1', sku: 'EM-BG-001', name: 'Trapiche Emerald', carats: 2.5, price: 12500, status: 'AVAILABLE', lastUpdate: new Date().toISOString() },
    { id: '2', sku: 'EM-MU-042', name: 'Muzo Prime', carats: 1.8, price: 8900, status: 'SOLD', lastUpdate: new Date().toISOString() },
    { id: '3', sku: 'EM-CH-015', name: 'Chivor Blue-Green', carats: 3.2, price: 15000, status: 'AVAILABLE', lastUpdate: new Date().toISOString() },
    { id: '4', sku: 'EM-CS-099', name: 'Coscuez Deep Green', carats: 1.2, price: 4500, status: 'RESERVED', lastUpdate: new Date().toISOString() },
  ],
  
  stats: {
    totalStock: 0,
    totalSold: 0,
    totalValue: 0,
    revenue: 0,
  },
  
  isLoading: false,

  // Setea todos los productos (útil para el primer fetch o reconexión de socket)
  setProducts: (products) => {
    set({ products });
    get().calculateStats();
  },

  // Actualización puntual (cuando una venta ocurre en el front de clientes)
  updateProductStatus: (id, status) => {
    set((state) => ({
      products: state.products.map((p) => 
        p.id === id ? { ...p, status, lastUpdate: new Date().toISOString() } : p
      ),
    }));
    get().calculateStats();
  },

  setLoading: (status) => set({ isLoading: status }),

  },
}));