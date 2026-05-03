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