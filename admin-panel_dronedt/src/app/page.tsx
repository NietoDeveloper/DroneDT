"use client";

import React from 'react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-main">
      {/* Elementos decorativos futuristas (Malla de fondo) */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #FFD700 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-md w-full z-10">
        <div className="bg-white/80 backdrop-blur-xl p-10 rounded-2xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.25)] border border-white/40 relative overflow-hidden">
          
          {/* Indicador de Seguridad Superior */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
          
          <div className="text-center mb-10">
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-gold/10 border border-gold/20">
              <span className="text-[10px] font-mono font-bold text-gold tracking-widest uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                Secure Access Node
              </span>
            </div>
            
            <h1 className="text-4xl font-black text-headingColor tracking-tighter">
              DRONE <span className="text-gold">DT</span>
            </h1>
            <p className="text-[11px] font-mono text-gray-400 uppercase tracking-[0.2em] mt-2">
              Management Intelligence System
            </p>
          </div>
          
          <form className="space-y-5">
            <div className="group">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
                Operator Credentials
              </label>
              <input 
                type="email" 
                className="w-full p-4 bg-gainsboro/50 border border-transparent rounded-xl focus:border-gold/50 focus:bg-white transition-all duration-300 outline-none text-sm font-medium"
                placeholder="EMAIL_ADDRESS"
              />
            </div>
            
            <div className="group">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
                Access Key
              </label>
              <input 
                type="password" 
                className="w-full p-4 bg-gainsboro/50 border border-transparent rounded-xl focus:border-gold/50 focus:bg-white transition-all duration-300 outline-none text-sm font-medium"
                placeholder="••••••••"
              />
            </div>

            <div className="pt-2">
              <button 
                type="submit"
                className="w-full bg-headingColor text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-gold/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <span className="text-sm tracking-widest uppercase">Authorize Access</span>
                <span className="text-gold group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </form>
          
          <div className="mt-8 flex justify-between items-center border-t border-gainsboro pt-6">
            <div className="text-[9px] font-mono text-gray-400">
              ID: NIETO_DEV_01 <br />
              LOC: COL_BOG
            </div>
            <div className="text-[9px] font-mono text-right text-gray-400 uppercase">
              Encrypted Session <br />
              AES-256 Bit
            </div>
          </div>
        </div>

        {/* Footer minimalista fuera del card */}
        <p className="text-center mt-6 text-[10px] text-gray-400 font-mono tracking-widest uppercase">
          DroneDT Operational Engine &copy; 2026
        </p>
      </div>
    </div>
  );
}