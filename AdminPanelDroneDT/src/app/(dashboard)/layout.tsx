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
          isSideba
        </nav>

        {/* PROFILE SECTION (ZUSTAND DATA) */}
        {isSidebarOpen && (
          <div className="p-4 nt-bold text-white truncate">{userProfile?.name}</p>
  
          </div>
        )}

          </div>
        </section>
      </main>
    </div>
  );
}