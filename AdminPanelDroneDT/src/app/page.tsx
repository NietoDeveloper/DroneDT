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
             
            </h2>
            
