// src/app/shop/Cart.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/CartStore';

/**
 * Componente: CartPage (Visualización del Carrito)
 * Muestra los drones y accesorios seleccionados con lógica de edición.
 */
export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCartStore();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#DCDCDC] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-4xl font-black text-[#000000] mb-4 uppercase tracking-tighter">Tu flota está vacía</h2>
        <p className="text-gray-600 mb-8">No has seleccionado ningún drone o accesorio para tu misión.</p>
        <Link 
          href="/shop" 
          className="bg-[#FFD700] text-[#000000] font-black px-10 py-4 uppercase tracking-widest hover:bg-black hover:text-[#FFD700] transition-all"
        >
          Explorar Equipos
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#DCDCDC] py-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-black text-[#000000] mb-12 uppercase tracking-tighter border-b-4 border-[#FFD700] inline-block">
          RESUMEN DE <span className="text-[#FFD700]">MISIÓN</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Lista de Productos (Columna Izquierda) */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-6 flex items-center gap-6 shadow-sm border-l-4 border-[#FEB60D]">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-24 h-24 object-contain bg-[#F8F8F8] p-2"
                />
                
                <div className="flex-1">
                  <h3 className="font-black text-[#000000] uppercase text-lg leading-tight">{item.name}</h3>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.category}</p>
                  
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center border border-[#DCDCDC]">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-[#DCDCDC] transition-colors"
                      >-</button>
                      <span className="px-4 font-mono font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-[#DCDCDC] transition-colors"
                      >+</button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-[10px] font-black text-red-600 uppercase hover:underline"
                    >
                      Remover
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xl font-black text-[#000000] font-mono">
                    ${(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen de Pago (Columna Derecha) */}
          <div className="bg-[#000000] text-white p-8 h-fit shadow-2xl sticky top-24">
            <h2 className="text-2xl font-black mb-6 uppercase tracking-widest border-b border-gray-800 pb-4">
              Total Operación
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-400 uppercase text-xs font-bold">
                <span>Items en flota:</span>
                <span>{getTotalItems()}</span>
              </div>
              <div className="flex justify-between text-gray-400 uppercase text-xs font-bold">
                <span>Logística / Envío:</span>
                <span className="text-[#FFD700]">GRATIS</span>
              </div>
              <div className="flex justify-between items-end pt-4 border-t border-gray-800">
                <span className="text-lg font-black uppercase">Subtotal:</span>
                <span className="text-3xl font-black text-[#FFD700] font-mono">
                  ${getTotalPrice().toLocaleString()}
                </span>
              </div>
            </div>

            <Link href="/shop/checkout">
              <button className="w-full bg-[#FFD700] text-[#000000] font-black py-4 uppercase tracking-[0.2em] hover:bg-white transition-all shadow-xl">
                Proceder al Checkout
              </button>
            </Link>
            
            <p className="mt-6 text-[9px] text-center text-gray-500 font-mono uppercase tracking-widest">
              Secure Checkout | Software DT Encryption Active
            </p>
          </div>

        </div>
      </div>
    </main>
  );
};