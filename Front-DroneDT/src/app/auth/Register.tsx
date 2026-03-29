// src/app/auth/Register.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

/**
 * Componente: Register
 * Registro de nuevos usuarios y flotas en el ecosistema Drone DT.
 */
export const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí conectarás con tu API de Node.js / MongoDB
    console.log('Registrando usuario:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#DCDCDC] px-4 py-12">
      {/* Card de Registro */}
      <div className="max-w-lg w-full bg-white shadow-2xl overflow-hidden border-t-8 border-[#FEB60D]">
        
        <div className="p-8 md:p-10">
          {/* Encabezado */}
          <div className="mb-8">
            <h1 className="text-3xl font-black text-[#000000] tracking-tighter uppercase">
              UNIRSE A <span className="text-[#FFD700]">DRONE DT</span>
            </h1>
            <p className="text-[10px] font-bold text-gray-400 mt-1 tracking-widest uppercase italic">
              // Fleet Management Registration
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Full Name */}
            <div className="md:col-span-2">
              <label className="label-style">Full Name / Operator Name</label>
              <input
                type="text"
                name="fullName"
                required
                onChange={handleChange}
                className="input-style"
                placeholder="Manuel Nieto"
              />
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <label className="label-style">Work Email</label>
              <input
                type="email"
                name="email"
                required
                onChange={handleChange}
                className="input-style"
                placeholder="developer@softwaredt.com"
              />
            </div>

            {/* Company Name */}
            <div className="md:col-span-2">
              <label className="label-style">Company Name (Optional)</label>
              <input
                type="text"
                name="company"
                onChange={handleChange}
                className="input-style"
                placeholder="Software DT Inc."
              />
            </div>

            {/* Password */}
            <div className="md:col-span-1">
              <label className="label-style">Access Key</label>
              <input
                type="password"
                name="password"
                required
                onChange={handleChange}
                className="input-style"
                placeholder="••••••••"
              />
            </div>

            {/* Confirm Password */}
            <div className="md:col-span-1">
              <label className="label-style">Confirm Key</label>
              <input
                type="password"
                name="confirmPassword"
                required
                onChange={handleChange}
                className="input-style"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                className="w-full bg-[#000000] hover:bg-[#FFD700] text-[#FFD700] hover:text-[#000000] font-black py-4 uppercase tracking-[0.2em] transition-all duration-300"
              >
                Create Account
              </button>
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-8 pt-6 border-t border-[#DCDCDC] text-center">
            <p className="text-xs text-gray-500 font-medium">
              Already part of the fleet?{' '}
              <Link href="/auth/login" className="text-[#000000] font-black hover:text-[#FEB60D] underline underline-offset-4">
                Login here
              </Link>
            </p>
          </div>
        </div>

        {/* Technical Notice */}
        <div className="bg-[#F8F8F8] py-3 px-8">
          <p className="text-[8px] text-gray-400 font-mono text-center uppercase tracking-widest">
            By registering, you agree to the Drone DT operational protocols & privacy policy.
          </p>
        </div>
      </div>

      <style jsx>{`
        .label-style {
          display: block;
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          color: #6B7280;
          margin-bottom: 4px;
          margin-left: 4px;
        }
        .input-style {
          width: 100%;
          padding: 12px 16px;
          background-color: #F5F5F5;
          border-bottom: 2px solid transparent;
          color: #000000;
          outline: none;
          transition: all 0.3s;
          font-size: 14px;
        }
        .input-style:focus {
          border-color: #FFD700;
          background-color: #FFFFFF;
        }
      `}</style>
    </div>
  );
};