// src/store/CartStore.tsx
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Tipado para los items del carrito
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
  type: 'drone' | 'accessory';
}

interface CartState {
  cart: CartItem[];
  
  // Acciones
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  
  // Selectores de cálculo (Derivados)
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

/**
 * CartStore: Gestión de estado global para Drone DT.
 * Utiliza persistencia para no perder datos en refresh.
 */
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item: CartItem) => {
        const currentCart = get().cart;
        const existingItem = currentCart.find((i) => i.id === item.id);

        if (existingItem) {
          // Si ya existe, aumentamos la cantidad
          set({
            cart: currentCart.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          // Si es nuevo, lo agregamos
          set({ cart: [...currentCart, item] });
        }
      },

      removeFromCart: (id: string) => {
        set({ cart: get().cart.filter((i) => i.id !== id) });
      },

      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
          return;
        }
        set({
          cart: get().cart.map((i) =>
            i.id === id ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ cart: [] }),

      getTotalItems: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'drone-dt-cart-storage', // Clave en LocalStorage
    }
  )
);