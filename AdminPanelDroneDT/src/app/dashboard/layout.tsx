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

  // Navegación refinada y corregida
  const navigation = [
    { name: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Inventario RT', icon: Package, href: '/dashboard/inventory' },
    { name: 'Ventas', icon: ShoppingCart, href: '/dashboard/sales' },
    { name: 'Usuarios', icon: Users, href: '/dashboard/users' },
    { name: 'Mensajería', icon: MessageSquare, href: '/dashboard/messages' },
    { name: 'Digital Twins Video', icon: Video, href: '/dashboard/videos' },
  ];

  return (
    /* Contenedor Maestro: No Scroll Global */
    <div className="h-screen w-full bg-main text-black flex overflow-hidden font-body">
      
      {/* SIDEBAR AEROESPACIAL */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } h-full bg-black transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col border-r border-gold/20 z-50`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/5">
          {isSidebarOpen && (
            <span className="text-gold font-black text-xl tracking-tighter animate-in fade-in duration-700">
              DRONE <span className="text-yellow-color">DT</span>
            </span>
          )}
          <button 
            onClick={toggleSidebar} 
            className="text-gainsboro hover:text-gold transition-colors p-1 cursor-pointer"
          >
            {isSidebarOpen ? <X size={18} /> : <Menu size={22} />}
          </button>
        </div>

            
            {/* Decoración de fondo minimalista */}
            <div className="absolute bottom-4 right-8 pointer-events-none opacity-[0.03] select-none">
              <span className="text-[120px] font-black text-black tracking-tighter">DT</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}