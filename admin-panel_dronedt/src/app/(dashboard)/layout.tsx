import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar Placeholder */}
      <aside className="w-64 bg-black text-white hidden md:flex flex-col">
        <div className="p-6 text-xl font-bold border-b border-gray-800">
          Drone <span className="text-gold">DT</span>
        </div>
        <nav className="flex-1 p-4">
          {/* Aquí irán tus links de navegación */}
          <div className="text-gray-400 text-xs uppercase mb-4">Core</div>
          <div className="space-y-2">
            <div className="p-2 hover:bg-gray-900 rounded cursor-pointer">Dashboard</div>
            <div className="p-2 hover:bg-gray-900 rounded cursor-pointer">Orders</div>
          </div>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Header Placeholder */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8">
          <h2 className="font-semibold text-lg italic">Control Center</h2>
          <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center font-bold">
            MN
          </div>
        </header>

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}