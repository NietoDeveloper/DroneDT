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

          </div>
        </section>
      </main>
    </div>
  );
}