'use client';

import { AlertTriangle, RefreshCcw } from 'lucide-react';

export const ErrorShield = ({ message, retry }: { message: string, retry: () => void }) => {
  return (
    <div className="col-span-full py-20 flex flex-col items-center justify-center border border-red-900/20 bg-red-950/5 rounded-sm">
      <AlertTriangle className="text-red-500 mb-4 animate-pulse" size={32} />
      <h3 className="text-red-500 font-black tracking-tighter text-sm uppercase">Cluster Connection Lost</h3>
      <p className="text-zinc-500 text-[10px] mt-1 font-mono uppercase">{message || 'Uplink_Failure_Node_BOG'}</p>
      <button 
        onClick={retry}
        className="mt-6 flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white text-[10px] font-bold uppercase transition-all"
      >
        <RefreshCcw size={12} />
        Re-establish Uplink
      </button>
    </div>
  );
};