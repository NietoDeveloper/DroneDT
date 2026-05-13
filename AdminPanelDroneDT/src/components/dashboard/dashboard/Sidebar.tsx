'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Box, Settings, LogOut, Terminal } from 'lucide-react';

/**
 * SIDEBAR L5 - COMMAND CENTER
 * Estética: SpaceX Minimalist / Fixed Position
 */
export const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'HANGAR', icon: <Box size={20} />, path: '/dashboard' },
    { name: 'OPERATORS', icon: <Users size={20} />, path: '/dashboard/users' },
    { name: 'SYSTEM_LOGS', icon: <Terminal size={20} />, path: '/dashboard/logs' },
    { name: 'CONFIG', icon: <Settings size={20} />, path: '/dashboard/settings' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-[60px] lg:w-[240px] bg-black border-r border-white/10 flex flex-col z-50">
      {/* BRANDING */}
      <div className="h-[70px] flex items-center justify-center lg:justify-start lg:px-6 border-b border-white/5">
        <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
          <span className="text-black font-black text-xs">DT</span>
        </div>
        <span className="hidden lg:block ml-3 font-black tracking-widest text-sm text-white uppercase">
          Drone_DT <span className="text-emerald-500">L5</span>
        </span>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex items-center justify-center lg:justify-start lg:px-6 h-12 transition-all relative group
                ${isActive ? 'text-emerald-400 bg-emerald-500/5' : 'text-zinc-500 hover:text-white hover:bg-white/5'}
              `}
            >
              {isActive && (
                <div className="absolute left-0 w-[3px] h-6 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,1)]" />
              )}
              {item.icon}
              <span className="hidden lg:block ml-4 text-[11px] font-black tracking-[0.1em] uppercase">
                {item.name}
              </span>
              
              {/* Tooltip para mobile */}
              <iv className="lg:hidden absolute left-14 bg-emerald-500 text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
                {item.name}

  );
};