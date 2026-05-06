import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Definiciones de tipos estrictas para evitar errores de lógica en la pasarela
export type ProductStatus = 'AVAILABLE' | 'SOLD' | 'RESERVED' | 'DRAFT';

export interface Product {
  id: string;
  sku: string;         // Identificador técnico único
  name: string;
  carats: number;      // Precisión para gemología
  price: number;       // Precio base en USD
  status: ProductStatus;
  lastUpdate: string;  // ISO string para sincronización
  category: 'EMERALD' | 'DRONE_SERVICE' | 'DIGITAL_TWIN'; // Multi-propósito
}

interface InventoryStats {
  totalStock: number;
  totalSold: number;
  totalValue: number;
  revenue: number;
  averageCaratPrice: number; // Métrica de rendimiento industrial
}

interface InventoryState {
  // Data
  products: Product[];
  stats: InventoryStats;
  isLoading: boolean;
  error: string | null;
  
  // Acciones (Actions)
  actions: {
    setProducts: (products: Product[]) => void;
    updateProduct: (id: string, updates: Partial<Product>) => void;
    syncProductStatus: (id: string, status: ProductStatus) => void;
    setLoading: (status: boolean) => void;
    setError: (message: string | null) => void;
  };
}

// Lógica interna de cálculo de estadísticas (Puramente funcional)
const computeStats = (products: Product[]): InventoryStats => {
  const initial = { totalStock: 0, totalSold: 0, totalValue: 0, revenue: 0, caratsSold: 0 };
  
  const result = products.reduce((acc, p) => {
    if (p.status === 'AVAILABLE') {
      acc.totalStock++;
      acc.totalValue += p.price;
    } else if (p.status === 'SOLD') {
      acc.totalSold++;
      acc.revenue += p.price;
      acc.caratsSold += p.carats;
    }
    return acc;
  }, initial);

  return {
    ...result,
    averageCaratPrice: result.totalSold > 0 ? result.revenue / result.caratsSold : 0,
  };
};

export const useInventoryStore = create<InventoryState>()(
  devtools(
    (set, get) => ({
      // MOCK DATA: Simulación inicial de carga de sistema
      products: [
        { id: '1', sku: 'EM-BG-001', name: 'Trapiche Emerald', carats: 2.5, price: 12500, status: 'AVAILABLE', lastUpdate: new Date().toISOString(), category: 'EMERALD' },
        { id: '2', sku: 'EM-MU-042', name: 'Muzo Prime', carats: 1.8, price: 8900, status: 'SOLD', lastUpdate: new Date().toISOString(), category: 'EMERALD' },
        { id: '3', sku: 'EM-CH-015', name: 'Chivor Deep Blue', carats: 3.2, price: 15000, status: 'AVAILABLE', lastUpdate: new Date().toISOString(), category: 'EMERALD' },
      ],
      stats: { totalStock: 0, totalSold: 0, totalValue: 0, revenue: 0, averageCaratPrice: 0 },
      isLoading: false,
      error: null,

      actions: {
        setProducts: (products) => {
          set({ products, stats: computeStats(products) }, false, 'inventory/setProducts');
        },

        // Actualización genérica (Más robusto que solo status)
        updateProduct: (id, updates) => {
          const products = get().products.map((p) =>
            p.id === id ? { ...p, ...updates, lastUpdate: new Date().toISOString() } : p
          );
          set({ products, stats: computeStats(products) }, false, 'inventory/updateProduct');
        },

        // Atajo rápido para la sincronización del Dashboard
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