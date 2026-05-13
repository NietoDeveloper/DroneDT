'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Box, 
  Settings, 
  LogOut, 
  ShieldCheck, 
  Cpu,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * SIDEBAR L5 - MISSION CONTROL
 * Engineered for: Nieto Laboratory // Drone DT
 * Optimized: No-Scroll // High-Density UI (310px - 1900px)
 */
export const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'DASHBOARD', icon: <LayoutDashboard size={18} />, path: '/dashboard' },
    { name: 'HANGAR_ASSETS', icon: <Box size={18} />, path: '/dashboard/hangar' },
    { name: 'OPERATORS', icon: <Users size={18} />, path: '/dashboard/users' },
    { name: 'SYSTEM_STATUS', icon: <Activity size={18} />, path: '/dashboard/status' },
    { name: 'LAB_SETTINGS', icon: <Settings size={18} />, path: '/dashboard/settings' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-[60px] lg:w-[260px] bg-[#050505] border-r border-white/5 flex flex-col z-[100] shadow-2xl">
      
      {/* 1. HEADER: BRANDING L5 */}
      <div className="h-[80px] flex items-center justify-center lg:justify-start lg:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-9 h-9 bg-zinc-900 border border-emerald-500/30 rounded-lg flex items-center justify-center group cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.1)] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all">
            <Cpu className="text-emerald-500 w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
          </div>
          <div className="hidden lg:flex flex-col">
            <span className="font-black text-[13px] tracking-[0.2em] text-white leading-none">
              NIETO_LABS
            </span>
            <span className="text-[9px] font-mono text-emerald-500/60 mt-1 tracking-widest">
              UPLINK_STABLE_L5
            </span>
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION: ATOMIC ITEMS */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto no-scrollbar">
        <div className="hidden lg:block px-4 mb-4">
          <p className="text-[9px] font-black text-zinc-600 tracking-[0.3em] uppercase">Core_Modules</p>
        </div>

        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex items-center justify-center lg:justify-start lg:px-4 h-[44px] rounded-lg transition-all duration-300 relative group
                ${isActive 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[inset_0_0_10px_rgba(16,185,129,0.05)]' 
                  : 'text-zinc-500 hover:text-white hover:bg-white/[0.03]'
                }
              `}
            >
              {/* Active Indicator Glow */}
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active"
                  className="absolute left-[-12px] w-[4px] h-5 bg-emerald-500 rounded-r-full shadow-[0_0_15px_rgba(16,185,129,1)]" 
                />
              )}

              <span className={`${isActive ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>
                {item.icon}
              </span>

              <span className="hidden lg:block ml-4 text-[11px] font-bold tracking-wider uppercase">
                {item.name}
              </span>
              
              {/* Mobile Tooltip */}
              <div className="lg:hidden absolute left-16 px-3 py-2 bg-zinc-900 border border-white/10 text-emerald-500 text-[10px] font-bold rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-[-10px] group-hover:translate-x-0 whitespace-nowrap shadow-xl z-50">
                {item.name}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* 3. SECURITY FOOTER: STATUS CARD */}
      <div className="p-3 mt-auto">
        <div className="hidden lg:flex flex-col p-4 mb-4 bg-zinc-950/50 border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span className="text-[10px] font-black text-white uppercase tracking-tighter">Secure_Mode</span>
          </div>
          <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2 }}
              className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
            />
          </div>
          <span className="text-[8px] font-mono text-zinc-600 mt-2 uppercase tracking-widest text-center">
            Verification: Rank_S+
          </span>
        </div>

        <button className="flex items-center justify-center lg:justify-start lg:px-4 w-full h-[44px] rounded-lg text-zinc-600 hover:text-rose-500 hover:bg-rose-500/5 transition-all group">
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="hidden lg:block ml-4 text-[11px] font-black uppercase tracking-widest">
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
};