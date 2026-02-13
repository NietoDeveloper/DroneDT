// src/app/dashboarduser/OrderHistory.tsx
'use client';

import React from 'react';

interface Order {
  id: string;
  date: string;
  droneModel: string;
  serviceType: 'Purchase' | 'Rental' | 'Maintenance';
  amount: number;
  status: 'Delivered' | 'Pending' | 'Cancelled';
  invoiceUrl: string;
}

const MOCK_ORDERS: Order[] = [
  {
    id: 'DDT-100245',
    date: 'Feb 10, 2026',
    droneModel: 'Titan Explorer v1',
    serviceType: 'Purchase',
    amount: 2500.00,
    status: 'Delivered',
    invoiceUrl: '#'
  },
  {
    id: 'DDT-100289',
    date: 'Jan 25, 2026',
    droneModel: 'AgroGuard S10',
    serviceType: 'Rental',
    amount: 450.00,
    status: 'Delivered',
    invoiceUrl: '#'
  },
  {
    id: 'DDT-100312',
    date: 'Feb 12, 2026',
    droneModel: 'CineMaster Pro',
    serviceType: 'Maintenance',
    amount: 120.00,
    status: 'Pending',
    invoiceUrl: '#'
  }
];

export const OrderHistory = () => {
  return (
    <div className="bg-white shadow-2xl border-t-8 border-[#000000]">
      {/* Header Interno */}
      <div className="p-6 border-b border-[#DCDCDC] flex justify-between items-center bg-[#F8F8F8]">
        <div>
          <h2 className="text-2xl font-black text-[#000000] uppercase tracking-tighter">
            Historial de <span className="text-[#FFD700]">Adquisiciones</span>
          </h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
            Registro oficial de transacciones // Drone DT Fleet
          </p>
        </div>
        <button className="text-[10px] font-black bg-[#FFD700] px-4 py-2 uppercase hover:bg-black hover:text-white transition-all">
          Descargar Todo (CSV)
        </button>
      </div>

      {/* Tabla de Órdenes */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#000000] text-[#FFD700] text-[10px] uppercase tracking-[0.2em] font-black">
              <th className="p-4">ID Referencia</th>
              <th className="p-4">Fecha</th>
              <th className="p-4">Equipo / Servicio</th>
              <th className="p-4">Tipo</th>
              <th className="p-4">Estado</th>
              <th className="p-4 text-right">Monto</th>
              <th className="p-4 text-center">Acción</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {MOCK_ORDERS.map((order) => (
              <tr key={order.id} className="border-b border-[#DCDCDC] hover:bg-[#F5F5F5] transition-colors group">
                <td className="p-4 font-mono font-bold text-[#000000]">{order.id}</td>
                <td className="p-4 text-gray-600 font-medium">{order.date}</td>
                <td className="p-4 font-black text-[#000000] uppercase">{order.droneModel}</td>
                <td className="p-4">
                   <span className="text-[10px] font-bold py-1 px-2 bg-[#DCDCDC] rounded-sm text-gray-700">
                    {order.serviceType}
                   </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-500' : 
                      order.status === 'Pending' ? 'bg-[#FEB60D] animate-pulse' : 'bg-red-500'
                    }`}></span>
                    <span className="text-[10px] font-black uppercase">{order.status}</span>
                  </div>
                </td>
                <td className="p-4 text-right font-black text-[#000000]">
                  ${order.amount.toLocaleString()} <span className="text-[10px] text-gray-400">USD</span>
                </td>
                <td className="p-4 text-center">
                  <a 
                    href={order.invoiceUrl} 
                    className="text-[10px] font-black uppercase text-[#FEB60D] hover:text-black transition-colors underline decoration-2"
                  >
                    Factura
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer de la Tabla */}
      <div className="p-4 bg-[#DCDCDC] flex justify-between items-center text-[9px] font-mono text-gray-500 uppercase tracking-widest">
        <span>Mostrando {MOCK_ORDERS.length} registros</span>
        <span>Secure Log // Software DT Auditor</span>
      </div>
    </div>
  );
};