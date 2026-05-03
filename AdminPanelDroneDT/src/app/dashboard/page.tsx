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
    /* Contenedor principal que llena exactamente el espacio del layout */
    <div className="h-full flex flex-col gap-6 overflow-hidden">
      
      {/* HEADER SECCIÓN */}
      <header className="flex flex-col gap-4 flex-shrink-0 animate-in fade-in slide-in-from-top-2 duration-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-black p-2 rounded-lg">
              <Logo iconSize={20} hideText={true} className="brightness-100 invert" />
            </div>
            <div>
              <h1 className="text-sm font-black text-heading uppercase tracking-[0.2em]">
                Personal <span className="text-gold">System</span>
              </h1>
              <p className="text-[10px] text-zinc-400 font-mono tracking-tighter">root/users_management/access_control</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-zinc-100 px-3 py-1.5 rounded-full border border-gainsboro">
            <Activity size={12} className="text-green-500 animate-pulse" />
            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Live Syncing</span>
          </div>
        </div>

        {/* GitHub Style Tabs */}
        <nav className="flex gap-1 border-b border-gainsboro">
          {['ALL', 'ACTIVE', 'BANNED', 'PENDING'].map((tab) => (
            <button
              key={tab}
    
}