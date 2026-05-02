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
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </header> tracking-tighter">Security Logs</span>
            </div>items-center bg-zinc-50/50 flex-shrink-0">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
              <input 
                type="text" 
                placeholder="Buscar por email o nombre..." 
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-white border border-gainsboro rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>
          </div>

          {/* Contenedor de tabla con scroll interno para no romper el layout */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <table className="w-full text-left">
              <thead className="bg-zinc-50 border-b border-gainsboro sticky top-0 z-10">
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