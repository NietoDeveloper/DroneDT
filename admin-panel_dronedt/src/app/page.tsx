"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/ui/Logo';

/** * LoginPage - Drone DT Intelligence System
 * Engineered by: NietoDeveloper (Top 1 Colombia)
 */
export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulación de autorización para el flujo del MVP
    router.push('/dashboard'); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-main">
      
      {/* Fondo de malla futurista - Identidad Drone DT */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, #FFD700 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />
      
      {/* Brillo ambiental sutil para profundidad */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full z-10">
        
        {/* Panel principal Glassmorphism */}
        <div className="glass-panel p-10 relative overflow-hidden bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl">
          
          {/* Línea superior dorada de acento */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-70" />
          
          <div className="flex flex-col items-center mb-10 text-center">
            {/* Integración del Logo SVG con contenedor industrial */}
            <div className="mb-6 transform transition-all duration-700 hover:scale-105">
              <div className="bg-zinc-950 p-6 rounded-2xl border border-gold/20 shadow-xl relative group">
                <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <Logo iconSize={42} className="relative z-10" />
              </div>
            </div>
            
            <div className="inline-block px-3 py-1 rounded-full bg-gold/10 border border-gold/20 mb-4">
              <span className="text-[10px] font-mono font-bold text-gold tracking-[0.2em] uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                Secure Access Node
              </span>
            </div>
            
            {/* Título de la Aplicación */}
            <h2 className="text-xl font-black text-heading uppercase tracking-tight mb-1">
              Panel Control Empresa Drone DT
            </h2>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em]">
              Management Intelligence System
            </p>
          </div>
          
          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="group">
              <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 ml-1">
                Operator Credentials
              </label>
              <input 
                required
                type="email" 
                className="w-full p-4 bg-gainsboro/30 border border-transparent rounded-xl focus:border-gold/50 focus:bg-white/90 transition-all duration-300 outline-none text-sm font-medium text-heading shadow-inner"
                placeholder="EMAIL_ADDRESS"
              />
            </div>
            
            <div className="group">
              <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 ml-1">
                Access Key
              </label>
              <input 
                required
                type="password" 
                className="w-full p-4 bg-gainsboro/30 border border-transparent rounded-xl focus:border-gold/50 focus:bg-white/90 transition-all duration-300 outline-none text-sm font-medium text-heading shadow-inner"
                placeholder="••••••••"
              />
            </div>

            <div className="pt-2">
              <button 
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-3 group h-14"
              >
                <span className="text-xs font-black tracking-widest uppercase italic">Ingresar</span>
                <span className="text-black group-hover:translate-x-1 transition-transform font-bold text-xl">→</span>
              </button>
            </div>
          </form>
          
          {/* Metadata de Sesión - Integridad Técnica */}
          <div className="mt-8 flex justify-between items-center border-t border-gainsboro pt-6">
            <div className="text-[9px] font-mono text-zinc-400 leading-relaxed uppercase text-left">
              ID: <span className="text-zinc-600 font-bold">NIETO_DEV_01</span> <br />
              LOC: <span className="text-zinc-600 font-bold">COL_BOG_CLUSTER</span>
            </div>
            <div className="text-[9px] font-mono text-right text-zinc-400 uppercase leading-relaxed">
              Security: <span className="text-zinc-600 font-bold">AES-256</span> <br />
              Status: <span className="text-green-600 font-bold animate-pulse">Encrypted</span>
            </div>
          </div>
        </div>

        {/* Footer Minimalista */}
        <p className="text-center mt-8 text-[10px] text-zinc-400 font-mono tracking-[0.4em] uppercase opacity-70">
          DroneDT Operational Engine &copy; 2026
        </p>
      </div>
    </div>
  );
}