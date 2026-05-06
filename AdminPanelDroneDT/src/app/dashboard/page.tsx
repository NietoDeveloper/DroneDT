"use client";

import React, { useState } from 'react';
import Logo from '@/components/ui/Logo';
import { ShieldCheck, UserMinus, UserPlus, ShieldAlert, Search, Activity } from 'lucide-react';

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
  const [searchTerm, setSearchTerm] = useState('');

  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Manuel Nieto', email: 'manuel@softwaredt.com', role: 'ADMIN', status: 'ACTIVE', lastLogin: '2 mins ago' },
    { id: '2', name: 'Juan Perez', email: 'juan@dronedt.com', role: 'EMPLOYEE', status: 'ACTIVE', lastLogin: '1 hour ago' },
    { id: '3', name: 'User Test', email: 'test@client.com', role: 'CLIENT', status: 'BANNED', lastLogin: '2 days ago' },
  ]);

  const handleStatusChange = (id: string, newStatus: UserStatus) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u));
  };

  const filteredUsers = users.filter(u => {
    const matchesFilter = filter === 'ALL' || u.status === filter;
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden animate-in fade-in duration-700">
      
      {/* HEADER SECCIÓN - Identidad Aeronáutica */}
      <header className="flex flex-col gap-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-black p-2 rounded-sm border border-gold/20 shadow-gold-glow">
              <Logo iconSize={20} hideText={true} className="brightness-100 invert" />
            </div>
            <div>
              <h1 className="text-sm font-black text-heading uppercase tracking-[0.25em]">
                Personal <span className="text-gold">System</span>
              </h1>
              <p className="text-[9px] text-zinc-400 font-mono tracking-tighter uppercase">root/users_management/access_control</p>
            </div>
          </div>
          
          <div className="hidden xs:flex items-center gap-2 bg-zinc-100 px-3 py-1.5 rounded-sm border border-gainsboro">
            <Activity size={12} className="text-green-500 animate-pulse" />
            <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Live_Sync: Active</span>
          </div>
        </div>

        {/* GitHub Style Tabs - Operación L5 */}
        <nav className="flex gap-1 border-b border-gainsboro">
          {['ALL', 'ACTIVE', 'BANNED', 'PENDING'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab as any)}
              className={`px-4 md:px-8 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative cursor-pointer ${
                filter === tab 
                ? 'text-black after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[2px] after:bg-gold' 
                : 'text-zinc-400 hover:text-zinc-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </header>

      {/* CUERPO DEL DASHBOARD - Grid System 1900px Optimized */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
        
        {/* PANEL IZQUIERDO: ACCIONES Y LOGS CRÍTICOS */}
        <aside className="w-full lg:w-72 flex flex-col gap-4 flex-shrink-0">
          <div className="bg-white border border-gainsboro rounded-sm p-5 shadow-sm">
            <h3 className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-4">Security Protocol</h3>
            <button className="w-full flex items-center justify-between p-3 bg-black text-white hover:bg-zinc-800 rounded-sm transition-all group border border-transparent hover:border-gold/50 cursor-pointer">
              <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                <UserPlus size={14} className="text-gold" /> Add Operator
              </span>
              <kbd className="text-[9px] bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400 font-mono">N</kbd>
            </button>
          </div>

          <div className="bg-zinc-950 text-white rounded-sm p-5 shadow-2xl flex-1 flex flex-col overflow-hidden border-t-2 border-gold/30">
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Audit_Logs</span>
              </div>
              <span className="text-[8px] text-zinc-600 font-mono italic">v2.0.4</span>
            </div>
            
            <div className="flex-1 overflow-y-auto font-mono text-[9px] space-y-3 custom-scrollbar pr-2 leading-relaxed">
              <div className="text-zinc-500 border-l border-zinc-800 pl-3">
                <span className="text-gold/50">[09:22:10]</span> SYSTEM_READY: Double cluster initialized.
              </div>
              <div className="text-green-400 border-l border-zinc-800 pl-3 bg-green-500/5 py-1">
                <span className="text-zinc-600">[09:45:02]</span> AUTH_SUCCESS: Operator "M. Nieto" logged in.
              </div>
              <div className="text-red-400 border-l border-zinc-800 pl-3 bg-red-500/5 py-1">
                <span className="text-zinc-600">[10:12:44]</span> BAN_TRIGGER: Level_5_Security active.
              </div>
              <div className="text-zinc-500 border-l border-zinc-800 pl-3">
                <span className="text-zinc-600">[11:05:19]</span> DB_SYNC: Inventory updated (Railway.app).
              </div>
            </div>
          </div>
        </aside>

        {/* PANEL DERECHO: DATAGRID INDUSTRIAL */}
        <main className="flex-1 bg-white border border-gainsboro rounded-sm shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gainsboro flex justify-between items-center bg-zinc-50 flex-shrink-0">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={12} />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="FILTRAR IDENTIDAD O ACCESO..." 
                className="w-full pl-9 pr-4 py-2.5 text-[10px] bg-white border border-gainsboro rounded-sm focus:outline-none focus:border-gold font-black uppercase tracking-[0.15em] placeholder:text-zinc-300 transition-all shadow-inner"
              />
            </div>
          </div>

          <div className="flex-1 overflow-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead className="bg-zinc-50 border-b border-gainsboro sticky top-0 z-20">
                <tr>
                  <th className="px-6 py-4 text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em]">Operator_Identity</th>
                  <th className="px-6 py-4 text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em]">Security_Level</th>
                  <th className="px-6 py-4 text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em]">Status</th>
                  <th className="px-6 py-4 text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] text-right px-10">Commands</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gainsboro">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="group hover:bg-zinc-50/80 transition-all duration-200">
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-[11px] font-black text-heading uppercase tracking-tight">{user.name}</span>
                        <span className="text-[9px] text-zinc-400 font-mono italic tracking-tighter">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`text-[9px] px-2.5 py-1 rounded-sm font-black border tracking-widest ${
                        user.role === 'ADMIN' 

                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
  
                        <span className="text-[10px] font-black uppercase tracking-tighter text-zinc-700">{user.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right px-10">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                        {user.status === 'ACTIVE' ? (
                          <button 
                            onClick={() => handleStatusChange(user.id, 'BANNED')}
                            className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-sm transition-colors cursor-pointer"
                            title="Restrict Access"
                          >
                            <UserMinus size={15} />
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleStatusChange(user.id, 'ACTIVE')}
                            className="p-2 text-zinc-400 hover:text-green-500 hover:bg-green-50 rounded-sm transition-colors cursor-pointer"
                            title="Restore Access"
                          >
                            <ShieldCheck size={15} />
                          </button>
                        )}
                        <button className="p-2 text-zinc-400 hover:text-gold hover:bg-zinc-950 rounded-sm transition-all cursor-pointer">
                          <ShieldAlert size={15} />
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