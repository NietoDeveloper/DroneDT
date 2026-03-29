// src/app/checkout/PaymentGateway.tsx
'use client';

import React, { useState } from 'react';
import { useCartStore } from '@/store/CartStore';

/**
 * Componente: PaymentGateway
 * Integración visual y lógica para la pasarela Wompi (Bancolombia).
 */
export const PaymentGateway = () => {
  const { getTotalPrice, cart } = useCartStore();
  const [loading, setLoading] = useState(false);

  const totalPrice = getTotalPrice();
  // Wompi maneja centavos, por lo que multiplicamos por 100 para el widget
  const amountInCents = totalPrice * 100; 

  const handleWompiPayment = () => {
    setLoading(true);
    
    // Aquí se integraría el script de Wompi. 
    // Para producción, se suele usar el Checkout Widget:
    const checkout = new (window as any).WidgetCheckout({
      currency: 'COP',
      amountInCents: amountInCents,
      reference: `DRONE-DT-${Date.now()}`,
      publicKey: 'pub_test_XXXXXXXXXXXXX', // Tu llave pública de Wompi
      redirectUrl: 'https://softwaredt.vercel.app/shop/order-confirmation',
    });

    checkout.open((result: any) => {
      const transaction = result.transaction;
      console.log('Transacción Finalizada:', transaction);
      setLoading(false);
    });
  };

  return (
    <div className="bg-white border-t-8 border-[#FFD700] p-8 shadow-2xl max-w-2xl mx-auto">
      {/* Header Pasarela */}
      <div className="flex items-center justify-between mb-8 border-b border-[#DCDCDC] pb-4">
        <div>
          <h2 className="text-2xl font-black text-[#000000] uppercase tracking-tighter">
            Pasarela de Pago
          </h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Transacción Segura vía Wompi
          </p>
        </div>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/2/21/Logo_Bancolombia.png" 
          alt="Bancolombia" 
          className="h-6 object-contain grayscale hover:grayscale-0 transition-all"
        />
      </div>

      {/* Resumen Rápido */}
      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center bg-[#F5F5F5] p-4">
          <span className="text-sm font-bold text-gray-600 uppercase">Total a debitar:</span>
          <span className="text-2xl font-black text-[#000000] font-mono">
            ${totalPrice.toLocaleString()} <span className="text-xs">COP</span>
          </span>
        </div>
        
        <p className="text-[11px] text-gray-500 leading-relaxed italic">
          * Al hacer clic en "Pagar con Wompi", serás redirigido a la plataforma segura de Bancolombia 
          para completar tu transacción mediante PSE, Tarjeta de Crédito o Corresponsal.
        </p>
      </div>

      {/* Botón de Acción Estilo Software DT */}
      <button
        onClick={handleWompiPayment}
        disabled={loading || totalPrice === 0}
        className={`w-full py-5 flex items-center justify-center gap-3 transition-all duration-300 font-black uppercase tracking-[0.2em] shadow-xl ${
          loading 
          ? 'bg-[#DCDCDC] text-gray-400 cursor-not-allowed' 
          : 'bg-[#000000] text-[#FFD700] hover:bg-[#FFD700] hover:text-[#000000]'
        }`}
      >
        {loading ? (
          'Procesando...'
        ) : (
          <>
            Pagar con <span className="text-[#FEB60D]">Wompi</span>
          </>
        )}
      </button>

      {/* Sellos de Seguridad */}
      <div className="mt-8 flex justify-center gap-6 opacity-40 grayscale">
        <div className="text-[8px] font-mono text-center">PCI-DSS<br/>COMPLIANT</div>
        <div className="text-[8px] font-mono text-center">SECURE<br/>SSL 256-BIT</div>
        <div className="text-[8px] font-mono text-center">BANCOLOMBIA<br/>CERTIFIED</div>
      </div>

      {/* Disclaimer de Software DT */}
      <div className="mt-6 pt-4 border-t border-[#DCDCDC]">
        <p className="text-[9px] text-center text-gray-400 font-mono">
          OPERATED BY SOFTWARE DT ECOSYSTEM | BOGOTÁ, COLOMBIA
        </p>
      </div>
    </div>
  );
};