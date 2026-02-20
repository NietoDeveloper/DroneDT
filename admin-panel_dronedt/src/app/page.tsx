"use client";

import React from 'react';

/** * LoginPage - Drone DT Intelligence System
 * Integrado con el flujo de Software DT y la identidad visual de la marca.
 */
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-main">
      {/* Fondo de malla futurista - Uso de variable Gold de Drone DT */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, #FFD700 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />
      
      <div className="max-w-md w-full z-10">
        {/* Panel principal usando la clase glass-panel del globals.css */}
        <div className="glass-panel p-10 relative overflow-hidden">
          
          {/* Línea superior dorada - Identidad de Marca Drone DT */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />
          
          <div className="text-center mb-10">
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-gold/10 border border-gold/20">
              <span className="text-[10px] font-mono font-bold text-gold tracking-widest uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                Secure Access Node
              </span>
            </div>
            
            <h1 className="text-4xl font-black text-heading tracking-tighter uppercase">
              DRONE <span className="text-gold">DT</span>
            </h1>
            <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-[0.2em] mt-2">
              Management Intelligence System
            </p>
          </div>
          
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="group">
              <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2 ml-1">
                Operator Credentials
              </label>
              <input 
                type="email" 
                className="w-full p-4 bg-gainsboro/30 border border-transparent rounded-xl focus:border-gold/50 focus:bg-white/80 transition-all duration-300 outline-none text-sm font-medium text-heading"
                placeholder="EMAIL_ADDRESS"
              />
            </div>
            
            <div className="group">
              <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2 ml-1">
                Access Key
              </label>
              <input 
                type="password" 
                className="w-full p-4 bg-gainsboro/30 border border-transparent rounded-xl focus:border-gold/50 focus:bg-white/80 transition-all duration-300 outline-none text-sm font-medium text-heading"
                placeholder="••••••••"
              />
            </div>

            <div className="pt-2">
              <button 
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-3 group"
              >
                <span className="text-sm tracking-widest uppercase">Authorize Access</span>
                <span className="text-black group-hover:translate-x-1 transition-transform font-bold">→</span>
              </button>
            </div>
          </form>
          
          {/* Metadata de Sesión - Ingeniería NietoDeveloper */}
          <div className="mt-8 flex justify-between items-center border-t border-gainsboro pt-6">
            <div className="text-[9px] font-mono text-zinc-400 leading-relaxed">
              ID: NIETO_DEV_01 <br />
              LOC: COL_BOG_CLUSTER
            </div>
            <div className="text-[9px] font-mono text-right text-zinc-400 uppercase leading-relaxed">
              Encrypted Session <br />
              AES-256 Bit
            </div>
          </div>
        </div>

        {/* Footer Minimalista */}
        <p className="text-center mt-6 text-[10px] text-zinc-500 font-mono tracking-widest uppercase opacity-80">
          DroneDT Operational Engine &copy; 2026
        </p>
      </div>
    </div>
  );
}