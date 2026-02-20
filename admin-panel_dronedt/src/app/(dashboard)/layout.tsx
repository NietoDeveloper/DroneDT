"use client";

import React, { ReactNode } from 'react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  MessageSquare, 
  Video, 
  Settings,
  Menu,
  X
} from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  const { isSidebarOpen, toggleSidebar, userProfile } = useDashboardStore();

  const navigation = [
    { name: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Inventario RT', icon: Package, href: '/dashboard/inventory' },
    { name: 'Ventas', icon: ShoppingCart, href: '/dashboard/sales' },
    { name: 'Usuarios', icon: Users, href: '/dashboard/users' },
    { name: 'Mensajería', icon: MessageSquare, href: '/dashboard/messages' },
    { name: 'Digital Twins Video', icon: Video, href: '/dashboard/videos' },
  ];

  return (
    <div className="min-h-screen bg-[#DCDCDC] text-black flex">
      {/* SIDEBAR AEROESPACIAL */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-[#000000] transition-all duration-300 ease-in-out flex flex-col border-r border-[#FFD700]/30`}
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && (
            <span className="text-[#FFD700] font-bold text-xl tracking-tighter">
              DRONE <span className="text-[#FEB60D]">DT</span>
            </span>
          )}
          <button onClick={toggleSidebar} className="text-[#DCDCDC] hover:text-[#FFD700]">
            {isSidebarOpen ? <X size={20} /> : <Menu size={24} />}
          </button>
        </div>

        <nav className="flex-1 mt-4 px-3 space-y-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center p-3 text-[#DCDCDC] hover:bg-[#FFD700] hover:text-black rounded-lg transition-colors group"
            >
              <item.icon size={22} className="min-w-[22px]" />
              {isSidebarOpen && <span className="ml-4 font-medium">{item.name}</span>}
            </a>
          ))}
        </nav>

        {/* PROFILE SECTION (ZUSTAND DATA) */}
        {isSidebarOpen && (
          <div className="p-4 border-t border-[#FFD700]/20 bg-zinc-900">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FEB60D] border border-[#FFD700]" />
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-white truncate">{userProfile?.name}</p>
                <p className="text-[10px] text-[#FFD700] uppercase tracking-widest">{userProfile?.role}</p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* TOPBAR */}
        <header className="h-16 bg-white border-b border-[#DCDCDC] flex items-center justify-between px-8 shadow-sm">
          <h2 className="text-lg font-semibold text-[#000000]">Control Panel / System</h2>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              LIVE SYSTEM
            </span>
            <span className="bg-[#FFD700] px-2 py-1 rounded text-[10px] font-bold">
              MVP 30-MAR
            </span>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <section className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </section>
      </main>
    </div>
  );
}