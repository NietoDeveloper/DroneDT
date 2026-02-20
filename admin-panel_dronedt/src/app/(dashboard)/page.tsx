"use client";

import React, { useState } from 'react';
import Logo from '@/components/ui/Logo';
import { ShieldCheck, UserMinus, UserPlus, ShieldAlert, Search } from 'lucide-react';

// Tipos específicos para administración de usuarios
type UserStatus = 'ACTIVE' | 'BANNED' | 'PENDING';
type UserRole = 'ADMIN' | 'EMPLOYEE' | 'CLIENT';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastLogin: string;
}

export default function UsersPage() {
  const [filter, setFilter] = useState<UserStatus | 'ALL'>('ALL');

  // Datos simulados (Esto vendría de tu backend Express)
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Manuel Nieto', email: 'manuel@softwaredt.com', role: 'ADMIN', status: 'ACTIVE', lastLogin: '2 mins ago' },
    { id: '2', name: 'Juan Perez', email: 'juan@dronedt.com', role: 'EMPLOYEE', status: 'ACTIVE', lastLogin: '1 hour ago' },
    { id: '3', name: 'User Test', email: 'test@client.com', role: 'CLIENT', status: 'BANNED', lastLogin: '2 days ago' },
  ]);

  const handleStatusChange = (id: string, newStatus: UserStatus) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u));
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col p-4 md:p-6 gap-6 bg-main overflow-hidden">
      
      {/* Header Estilo GitHub Tabs */}
      <header className="flex flex-col gap-4 border-b border-gainsboro pb-2">
        <div className="flex items-center gap-4">
          <Logo iconSize={30} hideText={true} className="brightness-0" />
          <h1 className="text-sm font-bold text-heading uppercase tracking-tighter">
            Control de Personal / <span className="text-zinc-500 font-medium lowercase">users_management</span>
          </h1>
        </div>

        <nav className="flex gap-1">
          {['ALL', 'ACTIVE', 'BANNED', 'PENDING'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab as any)}
              className={`px-4 py-2 text-xs font-semibold rounded-t-lg border-b-2 transition-all ${
                filter === tab 
                ? 'border-gold bg-white text-heading shadow-sm' 
                : 'border-transparent text-zinc-500 hover:bg-zinc-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </header>

      <div className="flex-1 flex flex-col md:flex-row gap-6 overflow-hidden">
        
        {/* Lado Izquierdo: Acciones Rápidas */}
        <aside className="w-full md:w-1/4 flex flex-col gap-4">
          <div className="bg-white border border-gainsboro rounded-xl p-5 shadow-sm">
            <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">Autorizaciones</h3>
            <button className="w-full flex items-center justify-between p-3 bg-zinc-50 hover:bg-[#FFD700]/10 border border-gainsboro rounded-lg transition-all group">
              <span className="text-xs font-bold flex items-center gap-2">
                <UserPlus size={14} className="text-zinc-400 group-hover:text-gold" /> Crear Usuario
              </span>
              <span className="text-[10px] bg-zinc-200 px-1.5 rounded text-zinc-500">N</span>
            </button>
          </div>

          <div className="bg-zinc-950 text-white rounded-xl p-5 shadow-xl flex-1 hidden md:block">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-mono text-red-500 uppercase tracking-tighter">Security Logs</span>
            </div>
            <div className="h-full border-l border-white/10 ml-1 pl-4 space-y-4">
              <div className="text-[9px] font-mono text-white/40 italic">-- Access Control --</div>
              <div className="text-[9px] font-mono text-zinc-400"> [AUTH] Admin authorized new employee</div>
              <div className="text-[9px] font-mono text-red-400"> [BAN] User_ID: 03 restricted by System</div>
            </div>
          </div>
        </aside>

        {/* Lado Derecho: Tabla de Usuarios */}
        <main className="flex-1 bg-white border border-gainsboro rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gainsboro flex justify-between items-center bg-zinc-50/50">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
              <input 
                type="text" 
                placeholder="Buscar por email o nombre..." 
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-white border border-gainsboro rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-left">
              <thead className="bg-zinc-50 border-b border-gainsboro">
                <tr>
                  <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Usuario</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Rol</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gainsboro">
                {users.filter(u => filter === 'ALL' || u.status === filter).map((user) => (
                  <tr key={user.id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-heading">{user.name}</span>
                        <span className="text-[10px] text-zinc-400 font-mono">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        user.role === 'ADMIN' ? 'bg-black text-gold' : 'bg-zinc-100 text-zinc-600'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          user.status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                        <span className="text-[10px] font-medium">{user.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {user.status === 'ACTIVE' ? (
                          <button 
                            onClick={() => handleStatusChange(user.id, 'BANNED')}
                            className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                            title="Banear Usuario"
                          >
                            <UserMinus size={14} />
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleStatusChange(user.id, 'ACTIVE')}
                            className="p-1.5 text-zinc-400 hover:text-green-500 hover:bg-green-50 rounded-md transition-all"
                            title="Activar Usuario"
                          >
                            <ShieldCheck size={14} />
                          </button>
                        )}
                        <button className="p-1.5 text-zinc-400 hover:text-gold hover:bg-gold/5 rounded-md transition-all">
                          <ShieldAlert size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}