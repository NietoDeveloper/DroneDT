// src/app/auth/Login.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

/**
 * Componente: Login
 * Gestión de acceso para clientes y operadores de Drone DT.
 */
export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí conectarás con tu lógica de Auth (NextAuth o JWT en Node.js)
    console.log('Iniciando sesión con:', { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#DCDCDC] px-4">
      {/* Card de Autenticación */}
      <div className="max-w-md w-full bg-white shadow-2xl overflow-hidden border-t-8 border-[#FFD700]">
        
        <div className="p-8 md:p-12">
          {/* Logo y Título */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-[#000000] tracking-tighter uppercase">
              DRONE <span className="text-[#FFD700]">DT</span>
            </h1>
            <p className="text-xs font-bold text-gray-400 mt-2 tracking-[0.2em] uppercase">
              Secure Access Terminal
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Email */}
            <div>
              <label className="block text-[10px] font-black uppercase text-gray-500 mb-1 ml-1">
                Corporate Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#F5F5F5] border-b-2 border-transparent focus:border-[#FFD700] text-[#000000] outline-none transition-all font-medium"
                placeholder="n.developer@softwaredt.com"
              />
            </div>

            {/* Campo Password */}
            <div>
              <label className="block text-[10px] font-black uppercase text-gray-500 mb-1 ml-1">
                Access Key
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#F5F5F5] border-b-2 border-transparent focus:border-[#FFD700] text-[#000000] outline-none transition-all font-medium"
                placeholder="••••••••"
              />
            </div>

            {/* Botón de Acción */}
            <button
              type="submit"
              className="w-full bg-[#000000] hover:bg-[#FFD700] text-[#FFD700] hover:text-[#000000] font-black py-4 uppercase tracking-widest transition-all duration-300 shadow-lg"
            >
              Authorize Entry
            </button>
          </form>

          {/* Enlaces de Recuperación y Registro */}
          <div className="mt-10 pt-6 border-t border-[#DCDCDC] flex flex-col gap-3 text-center">
            <Link 
              href="/auth/forgot-password" 
              className="text-[10px] font-bold text-gray-500 hover:text-[#FEB60D] uppercase transition-colors"
            >
              Forgot your credentials?
            </Link>
            <p className="text-xs text-gray-400">
              Don't have an account?{' '}
              <Link href="/auth/register" className="text-[#000000] font-black hover:underline">
                Register Fleet
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Técnico */}
        <div className="bg-[#F8F8F8] py-4 px-8 border-t border-[#DCDCDC]">
          <p className="text-[9px] text-center text-gray-400 font-mono italic">
            Encryption: AES-256-GCM | Node v20.x | Software DT Security Protocol
          </p>
        </div>
      </div>
    </div>
  );
};