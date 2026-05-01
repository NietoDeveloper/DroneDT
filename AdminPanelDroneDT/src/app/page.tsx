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
          
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-70" />
          
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="mb-6 transform transition-all duration-700 hover:scale-105 hover:rotate-3 cursor-crosshair">
              <div className="bg-zinc-950 p-6 rounded-2xl border border-gold/20 shadow-xl relative group">
                <div className="absolute -inset-2 bg-gold/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <Logo iconSize={42} className="relative z-10" />
              </div>
            </div>
            
            <div className="inline-block px-3 py-1 rounded-full bg-gold/10 border border-gold/20 mb-4">
              <span className="text-[10px] font-mono font-bold text-gold tracking-[0.2em] uppercase flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full bg-gold ${isAuthorizing ? 'animate-ping' : 'animate-pulse'}`} />
                {isAuthorizing ? 'Authorizing...' : 'Secure Access Node'}
              </span>
            </div>
            
            <h2 className="text-xl font-black text-heading uppercase tracking-tight mb-1">
              Panel Control Empresa Drone DT
            </h2>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em]">
              Management Intelligence System
            </p>
          </div>
          
          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="group">

            </div>
            


            <div className="pt-2 relative group">
              {/* Resplandor Gold Flotante - Se expande en hover */}
              <div className="absolute -inset-1 bg-gold blur opacity-20 group-hover:opacity-80 group-hover:blur-xl transition duration-500 rounded-xl" />
              

                <span className="
                  text-gold group-hover:text-black group-hover:translate-x-2 
                  transition-all duration-300 font-bold text-xl
                ">
                  {isAuthorizing ? '●' : '→'}
                </span>
              </button>
            </div>
          </form>
          
          <div className="mt-8 flex justify-between items-center border-t border-gainsboro pt-6">
            <div className="text-[9px] font-mono text-zinc-400 leading-relaxed uppercase text-left">
              ID: <span className="text-zinc-600 font-bold">NIETO_DEV_01</span> <br />

              Security: <span className="text-zinc-600 font-bo
        </div>

      </div>
    </div>
  );
}