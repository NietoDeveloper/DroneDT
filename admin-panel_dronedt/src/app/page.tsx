"use client";

import React from 'react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-card p-8 rounded-lg shadow-xl border-t-4 border-gold">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-headingColor">DRONE <span className="text-gold">DT</span></h1>
          <p className="text-gray-600 mt-2">Admin Access Control</p>
        </div>
        
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full p-3 bg-gainsboro border-none rounded focus:ring-2 focus:ring-gold outline-none"
              placeholder="admin@dronedt.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input 
              type="password" 
              className="w-full p-3 bg-gainsboro border-none rounded focus:ring-2 focus:ring-gold outline-none"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-gold hover:bg-yellowColor text-black font-bold py-3 rounded transition-colors duration-300"
          >
            Sign In
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          Developed by NietoDeveloper &copy; 2026
        </div>
      </div>
    </div>
  );
}