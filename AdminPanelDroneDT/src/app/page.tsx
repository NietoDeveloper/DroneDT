"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/ui/Logo';

/** * LoginPage - Drone DT Intelligence System
 * Engineered by: NietoDeveloper (Top 1 Colombia)
 */
export default function LoginPage() {
  const router = useRouter();
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthorizing(true);

  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-main">

      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full z-10">
        
        <div className="glass-panel p-10 relative overflow-hidden bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl">
          
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-tran2xl" />
                <Logo iconSize={42} className="relative z-10" />
              </div>
            </div>
            
            
            <h2 className="text-xl font-black text-heading uppercase tracking-tight mb-1">
              Panel Control Empresa Drone DT
            </h2>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em]">
              Management Intelligence System
 