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
  // Acceso al Store con selector para optimizar re-renders
  const isSidebarOpen = useDashboardStore((state) => state.isSidebarOpen);
  const toggleSidebar = useDashboardStore((state) => state.toggleSidebar);
  const userProfile = useDashboardStore((state) => state.userProfile);

  const navigation = [
    { name: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Inventario RT', icon: Package, href: '/dashboard/inventory' },
    { name: 'Ventas', icon: ShoppingCart, href: '/dashboard/sales' },
    { name: 'Usuarios', icon: Users, href: '/dashboard/users' },
    { name: 'Mensajería', icon: MessageSquare, href: '/dashboard/messages' },
    { name: 'Digital Twins Video', icon: Video, href: '/dashboard/videos' },
  ];

  return (
    <div className="h-screen w-full bg-main text-black flex overflow-hidden font-body selection:bg-gold/30">
      
      {/* SIDEBAR AEROESPACIAL - Ajuste de performance en width transition */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } h-full bg-black transition-[width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col border-r border-gold/20 z-50`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/5 flex-shrink-0">
          {isSidebarOpen && (
            <span className="text-gold font-black text-xl tracking-tighter animate-in fade-in zoom-in-95 duration-500">
              DRONE <span className="text-yellow-color">DT</span>
            </span>
          )}
          <button 
            onClick={toggleSidebar} 
            className="text-gainsboro hover:text-gold transition-colors p-1 cursor-pointer outline-none focus:ring-1 focus:ring-gold/30 rounded"
            aria-label="Toggle Sidebar"

      </main>
    </div>
  );
}