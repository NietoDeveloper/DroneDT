// src/app/auth/DeleteAccount.tsx
'use client';

import React, { useState } from 'react';

/**
 * Componente: DeleteAccount
 * Lógica y UI para la eliminación segura de perfiles en el ecosistema Drone DT.
 */
export const DeleteAccount = () => {
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  const VALIDATION_PHRASE = "DELETE-MY-FLEET";

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (confirmText !== VALIDATION_PHRASE) return;

    setIsDeleting(true);
    
    try {
      // Aquí conectarás con tu API de Node.js (DELETE /api/users/:id)
      console.log('Solicitando eliminación definitiva de la cuenta...');
      // Simulando delay de red
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Cuenta eliminada exitosamente.');
      // Redirigir al home o login
    } catch (error) {
      console.error('Error al eliminar cuenta:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white border-2 border-[#DCDCDC] p-8 mt-12 shadow-sm">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-red-600 flex items-center justify-center text-white font-black text-2xl">
          !
        </div>
        <div>
          <h3 className="text-xl font-black text-[#000000] uppercase tracking-tighter">
            Zona de Peligro
          </h3>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
            Danger Zone / Irreversible Action
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-gray-700 leading-relaxed">
          Al eliminar tu cuenta, se perderán todos los datos de vuelo, historial de servicios en 
          <span className="font-bold text-[#000000]"> Drone DT</span> y configuraciones de flota. 
          Esta acción no se puede deshacer.
        </p>

        <form onSubmit={handleDelete} className="space-y-4 pt-4 border-t border-[#DCDCDC]">
          <div>
            <label className="block text-[10px] font-black uppercase text-gray-500 mb-2">
              Escribe <span className="text-red-600">"{VALIDATION_PHRASE}"</span> para confirmar
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="w-full px-4 py-3 bg-[#F5F5F5] border-2 border-transparent focus:border-red-600 outline-none transition-all font-mono text-sm"
              placeholder="Confirm phrase..."
            />
          </div>

          <button
            type="submit"
            disabled={confirmText !== VALIDATION_PHRASE || isDeleting}
            className={`w-full py-4 font-black uppercase tracking-[0.2em] transition-all duration-300 ${
              confirmText === VALIDATION_PHRASE && !isDeleting
                ? 'bg-red-600 text-white hover:bg-black cursor-pointer shadow-lg'
                : 'bg-[#DCDCDC] text-gray-400 cursor-not-allowed'
            }`}
          >
            {isDeleting ? 'Processing Termination...' : 'Delete Account Permanently'}
          </button>
        </form>
      </div>

      <div className="mt-6 pt-4 text-center">
        <p className="text-[9px] text-gray-400 font-mono uppercase tracking-widest italic">
          System Protocol: Security Override Required for Account Purge
        </p>
      </div>
    </div>
  );
};