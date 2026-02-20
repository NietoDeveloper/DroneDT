"use client";

import React, { useState } from 'react';
import Logo from '@/components/ui/Logo';

// Tipos para las secciones
type Section = 'OVERVIEW' | 'DIGITAL_TWINS' | 'FLEET' | 'ANALYTICS';

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState<Section>('OVERVIEW');

  // Datos simulados en tiempo real
  const stats = [
    { id: 'OVERVIEW', label: 'Sistema', value: 'Active', color: 'text-green-500' },
    { id: 'DIGITAL_TWINS', label: 'Twins', value: '24', color: 'text-gold' },
    { id: 'FLEET', label: 'Drones', value: '12', color: 'text-blue-500' },
    { id: 'ANALYTICS', label: 'Uptime', value: '99.9%', color: 'text-purple-500' },
  ];

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col p-4 md:p-6 gap-6 bg-main overflow-hidden">
      
      {/* Header Estilo GitHub Tabs */}
      <header className="flex flex-col gap-4 border-b border-gainsboro pb-2">
        <div className="flex items-center gap-4">
          <Logo iconSize={30} hideText={true} className="brightness-0" />
          <h1 className="text-sm font-bold text-heading">Panel Control Empresa Drone DT / <span className="text-zinc-500 font-medium lowercase">{activeSection}</span></h1>
        </div>

        <nav className="flex gap-1">
          {stats.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as Section)}
              className={`px-4 py-2 text-xs font-semibold rounded-t-lg border-b-2 transition-all flex items-center gap-2 ${
                activeSection === item.id 
                ? 'border-gold bg-white text-heading shadow-sm' 
                : 'border-transparent text-zinc-500 hover:bg-zinc-100 hover:border-zinc-300'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${item.id === 'OVERVIEW' ? 'bg-green-500 animate-pulse' : 'bg-zinc-300'}`} />
              {item.label}
              <span className="ml-2 px-1.5 py-0.5 rounded-full bg-zinc-100 text-[10px] text-zinc-400">
                {item.value}
              </span>
            </button>
          ))}
        </nav>
      </header>

      {/* Main Dashboard Layout */}
      <div className="flex-1 flex flex-col md:flex-row gap-6 overflow-hidden">
        
        {/* Lado Izquierdo: Sidebar de Estadísticas (Se ve siempre pero se achica) */}
        <aside className={`transition-all duration-500 flex flex-col gap-4 ${activeSection === 'OVERVIEW' ? 'w-full md:w-1/3' : 'w-full md:w-1/4'}`}>
          <div className="bg-white border border-gainsboro rounded-xl p-5 shadow-sm">
            <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">Métricas Globales</h3>
            <div className="space-y-4">
              {stats.map((s) => (
                <div key={s.id} className="flex justify-between items-center group cursor-pointer" onClick={() => setActiveSection(s.id as Section)}>
                  <span className="text-xs text-zinc-600 group-hover:text-gold transition-colors">{s.label}</span>
                  <span className={`text-xs font-mono font-bold ${s.color}`}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-950 text-white rounded-xl p-5 shadow-xl flex-1 hidden md:block">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
              <span className="text-[10px] font-mono text-gold uppercase tracking-tighter">Live Telemetry</span>
            </div>
            <div className="h-full border-l border-white/10 ml-1 pl-4 space-y-4">
              <div className="text-[10px] font-mono text-white/40 italic">-- System Logs --</div>
              <div className="text-[9px] font-mono text-green-400 opacity-70"> [LOG] Drone-01 connected at 12:54:40</div>
              <div className="text-[9px] font-mono text-gold/70"> [WARN] Digital Twin sync latency: 12ms</div>
            </div>
          </div>
        </aside>

        {/* Lado Derecho: Contenido Expandido (Toma más espacio según selección) */}
        <main className="flex-1 bg-white border border-gainsboro rounded-xl shadow-sm relative overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gainsboro flex justify-between items-center bg-zinc-50/50">
            <h2 className="text-sm font-black uppercase tracking-widest text-heading">{activeSection}</h2>
            <div className="flex gap-2">
               <button className="px-3 py-1 text-[10px] font-bold bg-white border border-gainsboro rounded-md shadow-sm hover:bg-zinc-50 transition-all">Export CSV</button>
               <button className="px-3 py-1 text-[10px] font-bold bg-zinc-900 text-white rounded-md shadow-sm hover:bg-black transition-all">New Twin</button>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            {/* El contenido cambia dinámicamente aquí */}
            {activeSection === 'OVERVIEW' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-32 border border-dashed border-gainsboro rounded-lg flex items-center justify-center text-zinc-300 text-[10px] uppercase font-bold tracking-widest">
                    Telemetry Card {i}
                  </div>
                ))}
              </div>
            )}
            {activeSection === 'DIGITAL_TWINS' && (
              <div className="space-y-4">
                <div className="p-4 bg-zinc-50 border border-gainsboro rounded-lg flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-gold/20 rounded flex items-center justify-center text-gold font-bold italic">DT</div>
                     <div>
                       <p className="text-xs font-bold">Edificio_Bogota_Norte.mp4</p>
                       <p className="text-[10px] text-zinc-400 font-mono italic">Created: 2026-02-20</p>
                     </div>
                   </div>
                   <button className="text-[10px] font-bold text-gold uppercase underline">View Stream</button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}