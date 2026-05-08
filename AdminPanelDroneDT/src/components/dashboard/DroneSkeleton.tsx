'use client';

import React from 'react';

export const DroneSkeleton = () => {
  return (
    <div className="relative h-[120px] w-full bg-zinc-950 border border-white/5 p-3 flex flex-col gap-3 overflow-hidden">
      
      {/* 1. ANIMACIÓN SHIMMER (BARRIDO DE LUZ) */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full" />
      </div>

      {/* 2. HEADER SKELETON */}
      <div className="relative z-10 flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <div className="h-2.5 w-16 bg-zinc-900 rounded-sm animate-pulse" />
          <div className="h-1.5 w-10 bg-zinc-900/50 rounded-sm animate-pulse" />
        </div>
        <div className="h-4 w-8 bg-zinc-900 rounded-sm animate-pulse" />
      </div>

      {/* 3. CENTER SKELETON (TELEMETRÍA) */}
      <div className="relative z-10 flex flex-col gap-2 mt-1">
        <div className="h-2 w-20 bg-zinc-900 rounded-sm animate-pulse" />
        <div className="w-full h-[2px] bg-zinc-900 rounded-full" />
      </div>

      {/* 4. FOOTER SKELETON */}
      <div className="relative z-10 flex justify-between items-end mt-auto pt-2 border-t border-white/5">
        <div className="h-1.5 w-12 bg-zinc-900 rounded-sm animate-pulse" />
        <div className="flex gap-[2px]">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-1 h-2 bg-zinc-900 rounded-sm animate-pulse" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>

      {/* ESTILOS CSS INLINE PARA LA ANIMACIÓN SHIMMER */}
      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};