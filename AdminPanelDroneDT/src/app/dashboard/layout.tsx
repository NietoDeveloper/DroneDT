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
          >
            {isSidebarOpen ? <X size={18} /> : <Menu size={22} />}
          </button>
        </div>

        <nav className="flex-1 mt-6 px-3 space-y-1 overflow-y-auto custom-scrollbar overflow-x-hidden">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center p-3 text-gainsboro hover:bg-gold hover:text-black rounded-lg transition-all duration-300 group relative"
            >
              <item.icon size={20} className="min-w-[20px] flex-shrink-0" />
              {isSidebarOpen && (
                <span className="ml-4 text-[10px] font-black uppercase tracking-widest animate-in slide-in-from-left-4 duration-300">
                  {item.name}
                </span>
              )}
              {!isSidebarOpen && (
                <div className="absolute left-14 bg-black text-gold text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity border border-gold/30 whitespace-nowrap z-50 font-mono shadow-xl">
                  {item.name}
                </div>
              )}
            </a>
          ))}
        </nav>

        {/* PROFILE SECTION - Safe Hydration Check */}
        <div className={`p-4 border-t border-white/5 bg-zinc-950/50 ${!isSidebarOpen && 'flex justify-center'}`}>
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
               <div className="w-8 h-8 rounded-full bg-yellow-color border border-gold flex items-center justify-center shadow-[0_0_10px_rgba(255,184,0,0.3)]">
                  <ShieldCheck size={14} className="text-black" />
               </div>
               <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full" />
            </div>
            {isSidebarOpen && (
              <div className="overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-500">
                <p className="text-[11px] font-black text-white truncate leading-none mb-1 uppercase tracking-tighter">
                  {userProfile?.name || 'MANUEL NIETO'}
                </p>
                <p className="text-[9px] text-gold/60 uppercase tracking-[0.2em] font-mono">
                  {userProfile?.role || 'SYSTEM_ADMIN'}
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* MAIN VIEWPORT CANVAS */}
      <main className="flex-1 flex flex-col min-w-0 relative h-full overflow-hidden">
        
        {/* TOPBAR - Glassmorphism ready */}
        <header className="h-16 bg-white/90 backdrop-blur-md border-b border-gainsboro flex items-center justify-between px-8 z-40 flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="h-4 w-[2px] bg-gold hidden md:block" />
            <h2 className="text-[10px] font-black text-heading uppercase tracking-[0.3em]">
              Control Panel / <span className="text-zinc-400 font-medium">L5_Architecture</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex flex-col items-end font-mono">
              <span className="flex items-center gap-1.5 text-[9px] font-black text-black">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                SISTEMA_ACTIVO
              </span>
              <span className="text-[8px] text-zinc-400 tracking-tighter uppercase">Latency: 14ms</span>
            </div>
            <div className="h-8 w-[1px] bg-gainsboro" />
            <span className="bg-black text-gold px-3 py-1 rounded-sm text-[9px] font-black tracking-widest border border-gold/20 shadow-sm uppercase">
              MVP_Q2_2026
            </span>
          </div>
        </header>

        {/* LIENZO DE COMPONENTES - Responsive 310px to 1900px */}
        <section className="flex-1 relative bg-main overflow-hidden">
          <div className="absolute inset-0 p-4 md:p-8 overflow-y-auto custom-scrollbar">
            <div className="min-h-full w-full max-w-[1900px] min-w-[310px] mx-auto relative z-10">
              {children}
            </div>
            
            {/* Watermark Logo */}
            <div className="fixed bottom-4 right-8 pointer-events-none opacity-[0.03] select-none z-0">
              <span className="text-[120px] font-black text-black tracking-tighter">DT</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}