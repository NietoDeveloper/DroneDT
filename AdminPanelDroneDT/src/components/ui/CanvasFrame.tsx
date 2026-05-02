"use client";

import React, { ReactNode } from 'react';

interface CanvasFrameProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function CanvasFrame({ children, title, subtitle, className = "" }: CanvasFrameProps) {
  return (
    <div className={`flex flex-col h-full bg-white border border-gainsboro rounded-sm shadow-sm overflow-hidden group hover:border-gold/30 transition-colors duration-500 ${className}`}>
      
      {/* FRAME HEADER: Estilo Instrumental */}
      {(title || subtitle) && (
        <div className="px-5 py-3 border-b border-gainsboro bg-zinc-50/50 flex items-center justify-between flex-shrink-0">
          <div className="flex flex-col">
            {title && (
              <h3 className="text-[10px] font-black text-black uppercase tracking-[0.2em]">
                {title}
              </h3>
            )}
            {subtitle && (
              <span className="text-[8px] text-zinc-400 font-mono uppercase tracking-tighter mt-0.5">
                {subtitle}
              </span>
            )}
          </div>
          
          {/* Decoración técnica: Puntos de anclaje */}
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-gold/40 rounded-full" />
            <div className="w-1 h-1 bg-zinc-200 rounded-full" />
          </div>
        </div>
      )}

      {/* CANVAS CONTENT: Scroll Interno Nivel L5 */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar relative">
        {/* Grilla de fondo sutil (opcional, estilo blueprint) */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />
        
        <div className="relative z-10 h-full">
          {children}
        </div>
      </div>

      {/* FOOTER DE ESTADO: Minimalista */}
      <div className="h-1 bg-transparent group-hover:bg-gold/10 transition-colors duration-700" />
    </div>
  );
}