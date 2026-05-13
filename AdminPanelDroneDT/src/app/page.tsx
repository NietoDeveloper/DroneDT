"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/ui/Logo';

/** 
 * LoginPage - Drone DT Intelligence System
 * Componente de Acceso de Alta Seguridad
 * Engineered by: Manuel Nieto (Top 1 Colombia)
 */
export default function LoginPage() {
  const router = useRouter();
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthorizing(true);
    
    // Simulación de latencia de red para el handshake del sistema MERN
    setTimeout(() => {
      router.push('/dashboard'); 
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-zinc-950">
      
      {/* 1. FONDO ESTRUCTURAL: Malla de precisión industrial */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, #fbbf24 0.5px, transparent 0.5px)', 
          backgroundSize: '30px 30px' 
        }} 
      />
      
      {/* 2. ATMÓSFERA: Brillo ambiental Drone DT para profundidad */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-md lg:max-w-lg w-full z-10 transition-all duration-500">
        
        {/* PANEL DE CRISTAL INDUSTRIAL */}
        <div className="glass-panel p-8 lg:p-12 relative overflow-hidden bg-white/95 backdrop-blur-2xl border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-3xl">
          
          {/* Línea de escaneo superior */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-80" />
          
          <div className="flex flex-col items-center mb-12 text-center">
            {/* Contenedor del Logo con escalado en hover */}
            <div className="mb-8 transform transition-all duration-700 hover:scale-110 hover:-rotate-2 cursor-none">
              <div className="bg-zinc-950 p-7 lg:p-9 rounded-[2rem] border border-amber-500/30 shadow-2xl relative group">
                <div className="absolute -inset-3 bg-amber-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                <Logo iconSize={54} className="relative z-10" />
              </div>
            </div>
            
            {/* Status Indicator */}
            <div className="inline-block px-4 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 mb-6">
              <span className="text-[10px] lg:text-[12px] font-mono font-black text-zinc-800 tracking-[0.3em] uppercase flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full bg-amber-500 ${isAuthorizing ? 'animate-ping' : 'animate-pulse shadow-[0_0_8px_#f59e0b]'}`} />
                {isAuthorizing ? 'AUTHORIZING_UPLINK...' : 'SECURE_NODE_READY'}
              </span>
            </div>
            
            <h2 className="text-2xl lg:text-3xl font-black text-zinc-950 uppercase tracking-tighter mb-2 italic">
              CENTRAL_CONTROL
            </h2>
            <p className="text-[10px] lg:text-[12px] font-mono text-zinc-500 uppercase tracking-[0.4em] font-bold">
              Drone DT Intelligence System
            </p>
          </div>
          
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Input: Operator */}
            <div className="group">
              <label className="block text-[9px] lg:text-[11px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-3 ml-2">
                Operator_ID
              </label>
              <input 
                type="email" 
                required
                className="w-full p-5 bg-zinc-50 border-2 border-zinc-100 rounded-2xl focus:border-amber-500/50 focus:bg-white transition-all duration-300 outline-none text-sm font-bold text-zinc-900 shadow-sm placeholder:text-zinc-300 placeholder:font-normal uppercase"
                placeholder="ENTER_CREDENTIALS"
              />
            </div>
            
            {/* Input: Access Key */}
            <div className="group">
              <label className="block text-[9px] lg:text-[11px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-3 ml-2">
                Access_Passkey
              </label>
              <input 
                type="password" 
              <button 
                type="submit"
                disabled={isAuthorizing}
                className="
                  relative w-full flex items-center justify-center gap-4 h-16 lg:h-20
                  bg-zinc-950 text-white rounded-2xl border border-white/10
                  hover:bg-amber-500 hover:text-black hover:border-amber-400
                  hover:-translate-y-1.5 text-black group-hove:translate-x-3 transition-all duration-500 font-black text-2xl relative z-10">
                  {isAuth
