// src/app/dashboarduser/Profile.tsx
'use client';

import React from 'react';

interface OrderHistory {
  id: string;
  date: string;
  item: string;
  status: 'Completed' | 'Processing' | 'Shipped';
  total: number;
}

const ORDER_HISTORY: OrderHistory[] = [
  { id: 'DT-9921', date: '2026-02-10', item: 'Titan Explorer v1', status: 'Completed', total: 2500 },
  { id: 'DT-8842', date: '2026-02-12', item: 'Propeller Set x4', status: 'Processing', total: 85 },
];

export const Profile = () => {
  return (
    <div className="p-6 md:p-10 bg-[#DCDCDC] min-h-screen">
      {/* Header del Dashboard */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-black text-[#000000] uppercase tracking-tighter">
            PANEL DE <span className="text-[#FFD700]">CONTROL</span>
          </h1>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">
            Bienvenido, Operador Manuel Nieto // Software DT Ecosystem
          </p>
        </div>
        <div className="bg-[#000000] text-[#FFD700] px-4 py-2 text-xs font-black uppercase tracking-widest border-l-4 border-[#FEB60D]">
          Status: Online
        </div>
      </div>

      {/* Grid de KPIs / Métricas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Misiones Activas" value="03" color="#FFD700" />
        <StatCard title="Inversión Total" value="$2,585 USD" color="#000000" />
        <StatCard title="Horas de Vuelo" value="124.5 h" color="#FEB60D" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Columna: Historial de Compras y Servicios */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 shadow-xl border-t-4 border-[#000000]">
            <h3 className="text-lg font-black text-[#000000] uppercase mb-6 border-b pb-2">Historial de Adquisiciones</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] uppercase font-black text-gray-400 border-b">
                    <th className="pb-3">ID Misión</th>
                    <th className="pb-3">Equipo / Item</th>
                    <th className="pb-3">Fecha</th>
                    <th className="pb-3">Estado</th>
                    <th className="pb-3 text-right">Monto</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium">
                  {ORDER_HISTORY.map((order) => (
                    <tr key={order.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                      <td className="py-4 font-mono">{order.id}</td>
                      <td className="py-4 text-[#000000]">{order.item}</td>
                      <td className="py-4 text-gray-500">{order.date}</td>
                      <td className="py-4">
                        <span className={`text-[10px] px-2 py-1 font-black uppercase ${
                          order.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 text-right font-bold">${order.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Columna: Monitoreo en Vivo (Placeholder Técnico) */}
        <div className="space-y-6">
          <div className="bg-[#000000] p-6 shadow-xl text-white relative overflow-hidden">
            <div className="absolute top-2 right-2 flex gap-1">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
              <span className="text-[8px] font-black uppercase">Live Telemetry</span>
            </div>
            <h3 className="text-[#FFD700] font-black uppercase mb-6">Drone Feed</h3>
            <div className="aspect-video bg-gray-900 border border-gray-800 flex items-center justify-center mb-4">
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                Waiting for link...
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-gray-500 uppercase">Señal:</span>
                <span className="text-[#FEB60D]">LOCKED</span>
              </div>
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-gray-500 uppercase">Batería:</span>
                <span className="text-[#FEB60D]">-- %</span>
              </div>
            </div>
          </div>

          <button className="w-full bg-[#FFD700] hover:bg-white text-black font-black py-4 uppercase tracking-widest transition-all shadow-lg text-sm">
            Solicitar Nuevo Soporte
          </button>
        </div>

      </div>
    </div>
  );
};

// Subcomponente para las tarjetas de métricas
const StatCard = ({ title, value, color }: { title: string, value: string, color: string }) => (
  <div className="bg-white p-6 shadow-md border-b-4" style={{ borderColor: color }}>
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{title}</p>
    <p className="text-3xl font-black text-[#000000]">{value}</p>
  </div>
);