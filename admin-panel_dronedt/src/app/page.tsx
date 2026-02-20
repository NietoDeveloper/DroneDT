"use client";

import React from 'react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-main">
      {/* Malla de fondo futurista con el color Gold de Drone DT */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, #FFD700 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />


            <div className="pt-2">
              <button 
                type="submit"
                className="w-full bg-headingColor text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-gold/30 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <span className="text-sm tracking-widest uppercase">Authorize Access</span>
                <span className="text-gold group-hover:translate-x-1 transition-transform font-bold">→</span>
              </button>
            </div>
          </form>
          
          {/* Metadata de la sesión (Estilo Committer #1) */}
          <div className="mt-8 flex justify-between items-center border-t border-gainsboro/50 pt-6">
            <div className="text-[9px] font-mono text-gray-400 leading-relaxed">
              ID: NIETO_DEV_01 <br />
              LOC: COL_BOG_CLUSTER
            </div>
            <div className="text-[9px] font-mono text-right text-gray-400 uppercase leading-relaxed">
              Encrypted Session <br />
              AES-256 Bit
            </div>
          </div>
        </div>

        {/* Footer legal fuera del panel */}
        <p className="text-center mt-6 text-[10px] text-gray-400 font-mono tracking-widest uppercase opacity-80">
          DroneDT Operational Engine &copy; 2026
        </p>
      </div>
    </div>
  );
}