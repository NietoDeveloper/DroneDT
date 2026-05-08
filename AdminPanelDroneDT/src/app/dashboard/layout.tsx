'use client';

import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation'; // Hook para detectar la ruta actual
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
  const pathname = usePathname();
  const isSidebarOpen = useDashboardStore((state) => state.isSidebarOpen);
  const toggleSidebar = useDashboardStore((state) => state.toggleSidebar);
  const userProfile = useDashboardStore((state) => state.userProfile);

  // 1. DETECCIÓN DE MODO TERMINAL (DRONE DT)
  // Si la ruta es exactamente /dashboard, renderizamos el contenido "Raw" 
  // porque el componente DashboardL5 ya trae su propia interfaz.
  const isTerminalMode = pathname === '/dashboard';

  if (isTerminalMode) {
    return (
      <div className="h-screen w-screen overflow-hidden bg-black">
        {children}
      </div>
    );
  }

  // 2. LAYOUT ESTÁNDAR PARA EL RESTO DE PÁGINAS (Ventas, Usuarios, etc.)
  const navigation = [
    { name: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Inventario RT', icon: Package, href: '/dashboard/inventory' },
    { name: 'Ventas', icon: ShoppingCart, href: '/dashboard/sales' },
    { name: 'Usuarios', icon: Users, href: '/dashboard/users' },
    { name: 'Mensajería', icon: MessageSquare, href: '/dashboard/messages' },
    { name: 'Digital Twins Video', icon: Video, href: '/dashboard/videos' },
  ];

  return (
    <div className="h-screen w-full bg-main text-black flex overflow-hidden font-body">
      
      {/* SIDEBAR */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} h-full bg-black transition-[width] duration-500 flex flex-col border-r border-gold/20 z-50`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/5 flex-shrink-0">
          {isSidebarOpen && (
            <span className="text-gold font-black text-xl tracking-tighter uppercase">
              EMERALD <span className="text-yellow-color">DT</span>
            </span>
          )}
          <button onClick={toggleSidebar} className="text-gainsboro hover:text-gold p-1 cursor-pointer outline-none">
            {isSidebarOpen ? <X size={18} /> : <Menu size={22} />}
          </button>
        </div>

        <nav className="flex-1 mt-6 px-3 space-y-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="flex items-center p-3 text-gainsboro hover:bg-gold hover:text-black rounded-lg transition-all duration-300 group relative">
              <item.icon size={20} className="min-w-[20px] flex-shrink-0" />
              {isSidebarOpen && <span className="ml-4 text-[10px] font-black uppercase tracking-widest">{item.name}</span>}
            </a>
          ))}
        </nav>

        <div className={`p-4 border-t border-white/5 bg-zinc-950/50 ${!isSidebarOpen && 'flex justify-center'}`}>
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-yellow-color border border-gold flex items-center justify-center">
                <ShieldCheck size={14} className="text-black" />
             </div>
             {isSidebarOpen && (
               <div>
                 <p className="text-[11px] font-black text-white truncate uppercase">{userProfile?.name || 'MANUEL NIETO'}</p>
                 <p className="text-[9px] text-gold/60 uppercase font-mono">{userProfile?.role || 'SYSTEM_ADMIN'}</p>
               </div>
             )}
          </div>
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <main className="flex-1 flex flex-col min-w-0 relative h-full overflow-hidden">
        <header className="h-16 bg-white/90 backdrop-blur-md border-b border-gainsboro flex items-center justify-between px-8 z-40 flex-shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-[10px] font-black text-heading uppercase tracking-[0.3em]">
              Control Panel / <span className="text-zinc-400 font-medium">L5_Architecture</span>
            </h2>
          </div>
        </header>

        <section className="flex-1 relative bg-main overflow-hidden">
          <div className="absolute inset-0 p-4 md:p-8 overflow-y-auto custom-scrollbar">
            <div className="min-h-full w-full max-w-[1900px] min-w-[310px] mx-auto z-10">
              {children}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}