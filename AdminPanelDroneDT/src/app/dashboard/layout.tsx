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
  Menu,
  X,
  ShieldCheck
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
    { name: 'Usuarios', icon: '/dashboard/users', iconComponent: Users },
    { name: 'Mensajería', icon: MessageSquare, href: '/dashboard/messages' },
    { name: 'Digital Twins Video', icon: Video, href: '/dashboard/videos' },
  ];

  return (
    /* Contenedor Maestro: h-screen y overflow-hidden bloquean el scroll del navegador */
    <div className="h-screen w-full bg-main text-black flex overflow-hidden">
      
      {/* SIDEBAR AEROESPACIAL: Altura fija al 100% */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } h-full bg-black transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col border-r border-gold/20 z-50`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/5">
          {isSidebarOpen && (
            <span className="text-gold font-bold text-xl tracking-tighter animate-in fade-in duration-700">
              DRONE <span className="text-yellow-color">DT</span>
            </span>
          )}
          <button 
            onClick={toggleSidebar} 
            className="text-gainsboro hover:text-gold transition-colors p-1"
          >
            {isSidebarOpen ? <X size={18} /> : <Menu size={22} />}
          </button>
        </div>

        <nav className="flex-1 mt-6 px-3 space-y-1 overflow-y-auto custom-scrollbar">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center p-3 text-gainsboro hover:bg-gold hover:text-black rounded-lg transition-all duration-300 group relative"
            >
              <item.icon size={20} className="min-w-[20px]" />
              {isSidebarOpen && (
                <span className="ml-4 text-xs font-bold uppercase tracking-tight animate-in slide-in-from-left-2">
                  {item.name}
                </span>
              )}
              {!isSidebarOpen && (
                <div className="absolute left-14 bg-black text-gold text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity border border-gold/30 whitespace-nowrap z-50">
                  {item.name}
                </div>
              )}
            </a>
          ))}
